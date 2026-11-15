# Rengo Website Agent Guide

Shared instructions for all coding agents. Claude Code reads this file via the
`@AGENTS.md` import in `CLAUDE.md`.

The marketing site (rengoai.com) lives entirely in `/frontend`: a React 18 SPA
built with Vite, TypeScript and Chakra UI v3, routed with React Router v7.
Import router APIs from `react-router` (`RouterProvider` from
`react-router/dom`); `react-router-dom` is not installed.

## Commands

Run these from `frontend/`.

- Use pnpm 9.15.2, the version pinned in `packageManager`. A global pnpm 10
  rewrites `pnpm-lock.yaml` in a newer format, so if `pnpm -v` is not 9.15.2,
  use `corepack pnpm` or `npx pnpm@9.15.2`.
- `pnpm gen` before `pnpm lint` or a build. It regenerates
  `src/app/app-routes.ts` (do not edit it by hand) and Chakra's recipe types;
  without them `tsc` fails on `<Text variant=...>`.
- `pnpm lint` runs `tsc`, eslint and prettier; `pnpm lint:fix` fixes what it
  can.
- `pnpm start` runs the dev server; `pnpm build production` builds the release.
- CI installs with `pnpm install --frozen-lockfile`, so commit
  `pnpm-lock.yaml` with any `package.json` change.

## Style

- Font weights go no heavier than medium (500). Never use semibold (600) or
  bold (700+), in props (`fontWeight`), SVG text, or CSS. The theme maps the
  `semibold`, `bold`, `extrabold` and `black` tokens to 500, and sets `b`,
  `strong` and `th` to 500, but a raw number like `fontWeight={600}` is not
  caught, so don't write one. Emphasis comes from size, colour or medium
  weight.
- Titles and headings are regular (400) or lighter: Geist at medium reads
  as bold at title sizes. Keep medium for emphasis within text and for tiny
  spaced-capital labels (12px and under), which need it to stay legible.
- Blog post body text (paragraphs and lists) is EB Garamond, the Business
  Overview's face; everything else, including figures and tables, is Geist.
  In Garamond, medium (500) reads as bold, so emphasis stays at 500.
- Secondary text uses `site.fg.muted` (a dark, neutral grey), not a lighter
  grey. Descriptions under a title stay in the body ink at a smaller size,
  as in the app's settings cards; keep grey for small details such as dates.
- Copy comes word for word from Rengo's own materials (the Business Overview,
  the sales deck), in their structure. Don't write or paraphrase new copy.

## Pull requests

- PRs are squash-merged and the PR title becomes the commit title. Titles are
  `type: subject` with no scope, e.g. `feat: add careers page`. Types: fix,
  feat, docs, style, refactor, perf, test, ci, chore, revert.
- `Lint` and `Test` are required checks on `main`.
- AI Review (`.github/pr-review/`, ported from RengoAI/rengo) posts an advisory
  review as the `rengo-ai-review` App. Keep it in sync with the rengo copy
  rather than editing it here only.
- Dependabot opens monthly npm and GitHub Actions updates.

## Deployment

Every push to `main` runs "Deploy to Production", which builds the site and
pushes the artifacts to the `production` branch that GitHub Pages serves. See
`README.md` for details.
