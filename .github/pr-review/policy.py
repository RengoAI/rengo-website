"""Deterministic safety policy for automated pull-request reviews."""

from __future__ import annotations

import re
from dataclasses import dataclass

APPROVE = "approve"
REQUEST_CHANGES = "request_changes"
COMMENT = "comment"

MAX_FILE_BYTES = 100 * 1024
MAX_PROMPT_CHARS = 400_000
PULL_FILES_PAGE_SIZE = 100
PULL_FILES_CAP = 3000

NO_APPROVE_LOGINS = frozenset({"dependabot[bot]", "github-actions[bot]"})
# Authors whose PRs may still be approved when the diff is too large to review in
# full. Every other guard still applies to them.
TRUSTED_AUTHOR_LOGINS = frozenset({"eronning", "grantgustafson"})
VALID_VERDICTS = frozenset({APPROVE, REQUEST_CHANGES, COMMENT})
VALID_SEVERITIES = frozenset({"bug", "suggestion", "nit"})

_INJECTION_RE = re.compile(
    r"(?is)("
    r"ignore (all )?(previous|prior|above) instructions"
    r"|note to (the )?(automated |ai )?reviewer"
    r"|you are now"
    r")"
)


@dataclass(frozen=True)
class Issue:
    severity: str
    path: str
    line: int | None
    body: str


@dataclass(frozen=True)
class ProposedReview:
    verdict: str
    summary: str
    issues: tuple[Issue, ...]


@dataclass(frozen=True)
class PolicyInput:
    author_login: str
    review_app_slug: str
    added_text: str
    empty_diff: bool
    incomplete_diff: bool
    no_approve_logins: frozenset[str] = frozenset()
    trusted_author_logins: frozenset[str] = frozenset()


@dataclass(frozen=True)
class PolicyDecision:
    reasons: tuple[str, ...]
    skip_llm: bool = False
    skip_review: bool = False
    cannot_approve: bool = False


def added_lines(patch: str | None) -> list[str]:
    if not patch:
        return []
    return [
        line[1:]
        for line in patch.splitlines()
        if line.startswith("+") and not line.startswith("+++")
    ]


def decide_before_llm(policy: PolicyInput) -> PolicyDecision:
    slug = policy.review_app_slug.strip()
    if slug and policy.author_login == f"{slug}[bot]":
        return PolicyDecision(("author is this review app",), skip_review=True)

    if policy.empty_diff:
        return PolicyDecision(("empty diff",), skip_llm=True)

    reasons: list[str] = []
    skip_llm = False
    no_approve_logins = NO_APPROVE_LOGINS | policy.no_approve_logins
    cannot_approve = policy.author_login.casefold() in {
        login.casefold() for login in no_approve_logins
    }
    if cannot_approve:
        reasons.append(f"author {policy.author_login} is excluded from auto-approval")

    trusted_author = policy.author_login.casefold() in {
        login.casefold()
        for login in TRUSTED_AUTHOR_LOGINS | policy.trusted_author_logins
    }
    if policy.incomplete_diff:
        # Binary files are not incomplete_diff: there is no text to review, so
        # this reason does not apply to them. Approval never covered binaries.
        if trusted_author:
            reasons.append(
                "one or more patches were not reviewed in full"
                " (trusted author, so this does not block approval)"
            )
        else:
            cannot_approve = True
            reasons.append("one or more patches were not reviewed in full")

    if policy.added_text and _INJECTION_RE.search(policy.added_text):
        cannot_approve = True
        skip_llm = True
        reasons.append("added lines look like reviewer-directed instructions")

    return PolicyDecision(tuple(reasons), skip_llm, False, cannot_approve)


def resolve_verdict(
    decision: PolicyDecision,
    *,
    review_completed: bool,
) -> str:
    if review_completed and not decision.cannot_approve:
        return APPROVE
    return COMMENT
