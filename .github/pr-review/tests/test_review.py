import json

import pytest

from policy import MAX_FILE_BYTES
from review import (
    Config,
    LlmError,
    PullFile,
    PullRequest,
    build_prompt,
    config_from_env,
    run,
)


def _config() -> Config:
    return Config(
        token="token",
        repository="RengoAI/rengo",
        pr_number=7,
        api_key="key",
        app_slug="ai-review",
        dry_run=False,
        skip_llm=False,
        no_approve_logins=frozenset(),
    )


def _pull() -> PullRequest:
    return PullRequest(
        number=7,
        title="feat: change",
        body="why",
        author_login="erik",
        head_sha="deadbeef",
        draft=False,
        head_repo="RengoAI/rengo",
    )


def test_ai_review_environment_names_load_config() -> None:
    config = config_from_env(
        {
            "AI_REVIEW_GITHUB_TOKEN": "token",
            "AI_REVIEW_OPENAI_API_KEY": "key",
            "AI_REVIEW_APP_SLUG": "ai-review",
            "AI_REVIEW_NO_APPROVE_LOGINS": "jouanchen2, another-user",
            "GITHUB_REPOSITORY": "RengoAI/rengo",
            "PR_NUMBER": "7",
        },
        dry_run=False,
        skip_llm=False,
    )
    assert config is not None
    assert config.app_slug == "ai-review"
    assert config.no_approve_logins == frozenset({"jouanchen2", "another-user"})


class FakeGitHub:
    def __init__(self, files: list[PullFile]) -> None:
        self.files = files
        self.posts: list[dict[str, str]] = []

    def get_pull(self, number: int) -> PullRequest:
        return PullRequest(
            number=number,
            title="feat: change",
            body="why",
            author_login="erik",
            head_sha="deadbeef",
            draft=False,
            head_repo="RengoAI/rengo",
        )

    def list_files(self, number: int) -> list[PullFile]:
        del number
        return self.files

    def post_review(self, number: int, *, commit_id: str, event: str, body: str) -> None:
        self.posts.append(
            {
                "number": str(number),
                "commit_id": commit_id,
                "event": event,
                "body": body,
            }
        )


def _approve(**kwargs: object) -> str:
    del kwargs
    return json.dumps({"verdict": "approve", "summary": "clean", "issues": []})


def test_complete_patch_can_approve() -> None:
    github = FakeGitHub(
        [PullFile("backend/foo.py", "modified", "@@ -1 +1 @@\n+x\n")]
    )
    assert run(_config(), github, complete_fn=_approve) == 0  # type: ignore[arg-type]
    assert github.posts[0]["event"] == "APPROVE"
    assert github.posts[0]["commit_id"] == "deadbeef"


def test_workflow_change_is_reviewed_and_approved_with_the_application_diff() -> None:
    github = FakeGitHub([
        PullFile(".github/workflows/rengen-runner-image.yml", "modified", "+      - backend/rengo_github_app/**\n"),
        PullFile("backend/rengo_github_app/__init__.py", "added", "+def mint_token(): pass\n"),
    ])
    prompts: list[str] = []

    def complete_review(**kwargs: object) -> str:
        prompts.append(str(kwargs["user"]))
        return _approve()

    assert run(_config(), github, complete_fn=complete_review) == 0  # type: ignore[arg-type]
    assert len(prompts) == 1
    assert all(item.patch in prompts[0] for item in github.files)
    assert github.posts[0]["event"] == "APPROVE"
    assert github.posts[0]["commit_id"] == "deadbeef"
    assert "No high-confidence actionable findings" in github.posts[0]["body"]
    assert "recused" not in github.posts[0]["body"]


@pytest.mark.parametrize(
    "files",
    [
        [PullFile("backend/security.py", "modified", None, changes=4)],
        [
            PullFile(
                "backend/security.py",
                "modified",
                "@@ -1 +1 @@\n+" + "x" * (MAX_FILE_BYTES + 1),
            )
        ],
        [
            PullFile(
                f"backend/a{i}.py",
                "modified",
                "@@ -1 +1 @@\n+" + "x" * (80 * 1024),
            )
            for i in range(6)
        ],
    ],
    ids=["missing-patch", "large-patch", "truncated-prompt"],
)
def test_unreviewed_code_cannot_approve(files: list[PullFile]) -> None:
    github = FakeGitHub(files)
    assert run(_config(), github, complete_fn=_approve) == 0  # type: ignore[arg-type]
    assert github.posts[0]["event"] == "COMMENT"
    assert "not reviewed in full" in github.posts[0]["body"]


def test_binary_file_does_not_mark_prompt_incomplete() -> None:
    files = [
        PullFile("backend/foo.py", "modified", "@@ -1 +1 @@\n+x\n", changes=1),
        PullFile(
            "backend/estates/metric-backfill-test/source/q2_2026.pdf",
            "added",
            None,
            changes=0,
        ),
    ]
    prompt, incomplete = build_prompt(_pull(), files)
    assert incomplete is False
    assert "[binary file: not reviewable as text]" in prompt
    assert "q2_2026.pdf" in prompt
    assert "[patch unavailable]" not in prompt


def test_unavailable_text_patch_marks_prompt_incomplete() -> None:
    files = [PullFile("backend/security.py", "modified", None, changes=12)]
    prompt, incomplete = build_prompt(_pull(), files)
    assert incomplete is True
    assert "[patch unavailable]" in prompt
    assert "[binary file: not reviewable as text]" not in prompt


def test_oversize_patch_marks_prompt_incomplete() -> None:
    files = [
        PullFile(
            "backend/security.py",
            "modified",
            "@@ -1 +1 @@\n+" + "x" * (MAX_FILE_BYTES + 1),
            changes=1,
        )
    ]
    prompt, incomplete = build_prompt(_pull(), files)
    assert incomplete is True
    assert "[patch exceeds per-file review limit]" in prompt


def test_binary_file_with_text_diff_can_approve() -> None:
    github = FakeGitHub(
        [
            PullFile("backend/foo.py", "modified", "@@ -1 +1 @@\n+x\n", changes=1),
            PullFile(
                "backend/estates/metric-backfill-test/source/q2_2026.pdf",
                "added",
                None,
                changes=0,
            ),
        ]
    )
    prompts: list[str] = []

    def complete_review(**kwargs: object) -> str:
        prompts.append(str(kwargs["user"]))
        return _approve()

    assert run(_config(), github, complete_fn=complete_review) == 0  # type: ignore[arg-type]
    assert len(prompts) == 1
    assert "[binary file: not reviewable as text]" in prompts[0]
    assert github.posts[0]["event"] == "APPROVE"
    assert "not reviewed in full" not in github.posts[0]["body"]


def test_malformed_model_output_comments() -> None:
    github = FakeGitHub([PullFile("a.py", "modified", "+x\n")])
    assert run(
        _config(), github, complete_fn=lambda **kwargs: "not json"
    ) == 0  # type: ignore[arg-type]
    assert github.posts[0]["event"] == "COMMENT"


@pytest.mark.parametrize("verdict", [None, "invalid", 123])
def test_invalid_verdict_is_not_a_completed_review(verdict: object) -> None:
    github = FakeGitHub([PullFile("a.py", "modified", "+x\n")])
    response = json.dumps({"verdict": verdict, "issues": []})
    assert run(_config(), github, complete_fn=lambda **kwargs: response) == 0  # type: ignore[arg-type]
    assert github.posts[0]["event"] == "COMMENT"
    assert "invalid verdict" in github.posts[0]["body"]


def test_model_outage_comments_and_fails_check() -> None:
    github = FakeGitHub([PullFile("a.py", "modified", "+x\n")])

    def fail(**kwargs: object) -> str:
        del kwargs
        raise LlmError("timeout", infra=True)

    assert run(_config(), github, complete_fn=fail) == 1  # type: ignore[arg-type]
    assert github.posts[0]["event"] == "COMMENT"


@pytest.mark.parametrize("path", [
    ".github/workflows/rengen-runner-image.yml",
    ".github/workflows/pr-review-tests.yml",
    ".github/actions/build/action.yml",
    ".github/CODEOWNERS",
    ".github/pr-review/review.py",
    ".github/pr-review/policy.py",
    ".github/workflows/pr-review.yml",
])
def test_all_repository_files_run_the_model_and_can_approve(path: str) -> None:
    github = FakeGitHub([PullFile(path, "modified", "+x\n")])
    prompts: list[str] = []

    def complete_review(**kwargs: object) -> str:
        prompts.append(str(kwargs["user"]))
        return _approve()

    assert run(_config(), github, complete_fn=complete_review) == 0  # type: ignore[arg-type]
    assert len(prompts) == 1
    assert path in prompts[0]
    assert github.posts[0]["event"] == "APPROVE"


@pytest.mark.parametrize("severity", ["suggestion", "nit"])
def test_approval_includes_high_confidence_nonblocking_feedback(severity: str) -> None:
    github = FakeGitHub([PullFile("a.py", "modified", "+x\n")])
    response = json.dumps({
        "verdict": "approve",
        "summary": "unused model summary",
        "issues": [{
            "severity": severity,
            "confidence": "high",
            "evidence": "The same value is calculated twice in this expression.",
            "path": "a.py",
            "line": 1,
            "body": "Reuse the calculated value.",
        }],
    })
    assert run(_config(), github, complete_fn=lambda **kwargs: response) == 0  # type: ignore[arg-type]
    assert github.posts[0]["event"] == "APPROVE"
    assert "Reuse the calculated value" in github.posts[0]["body"]
    assert "calculated twice" in github.posts[0]["body"]


@pytest.mark.parametrize("confidence", ["medium", "low", None, 0.99])
@pytest.mark.parametrize("verdict", ["approve", "request_changes", "comment"])
def test_uncertain_findings_cannot_block_or_leak_into_summary(confidence: object, verdict: str) -> None:
    github = FakeGitHub([PullFile("a.py", "modified", "+x\n")])
    response = json.dumps({
        "verdict": verdict,
        "summary": "SPECULATIVE LOOP",
        "issues": [{
            "severity": "bug",
            "confidence": confidence,
            "evidence": "Unverified dependency behavior.",
            "path": "a.py",
            "body": "SPECULATIVE LOOP",
        }],
    })
    assert run(_config(), github, complete_fn=lambda **kwargs: response) == 0  # type: ignore[arg-type]
    assert github.posts[0]["event"] == "APPROVE"
    assert "SPECULATIVE LOOP" not in github.posts[0]["body"]
    assert "Findings:" not in github.posts[0]["body"]
    assert "did not recommend approval" not in github.posts[0]["body"]


@pytest.mark.parametrize("evidence", [None, "", "  ", 123])
def test_high_confidence_requires_evidence(evidence: object) -> None:
    from review import parse_review

    proposed = parse_review(json.dumps({
        "verdict": "approve",
        "issues": [{
            "severity": "bug", "confidence": "high", "evidence": evidence,
            "path": "a.py", "body": "Unsupported allegation",
        }],
    }))
    assert not proposed.issues
    assert "Unsupported allegation" not in proposed.summary


def test_confirmed_bug_is_advisory() -> None:
    github = FakeGitHub([PullFile("a.py", "modified", "+return 1 / 0\n")])
    response = json.dumps({
        "verdict": "approve",
        "issues": [{
            "severity": "bug", "confidence": "high",
            "evidence": "Calling this function evaluates 1 / 0 and raises ZeroDivisionError.",
            "path": "a.py", "body": "Division by zero",
        }],
    })
    assert run(_config(), github, complete_fn=lambda **kwargs: response) == 0  # type: ignore[arg-type]
    assert github.posts[0]["event"] == "APPROVE"
    assert "Division by zero" in github.posts[0]["body"]


def test_model_request_changes_is_advisory() -> None:
    github = FakeGitHub([PullFile("a.py", "modified", "+return 1 / 0\n")])
    response = json.dumps({
        "verdict": "request_changes",
        "issues": [{
            "severity": "bug", "confidence": "high",
            "evidence": "Calling this function evaluates 1 / 0 and raises ZeroDivisionError.",
            "path": "a.py", "body": "Division by zero",
        }],
    })
    assert run(_config(), github, complete_fn=lambda **kwargs: response) == 0  # type: ignore[arg-type]
    assert github.posts[0]["event"] == "APPROVE"
    assert "Division by zero" in github.posts[0]["body"]
