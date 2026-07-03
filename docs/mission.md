# Mission — ywc-agent-toolkit-lp

<!-- updated: 2026-07-02 -->

## How this file is used

Loaded at session start (add `@docs/mission.md` to CLAUDE.md) to anchor the agent on
the project's why, its success criteria, and the approaches already ruled out — each
with the reason why. ywc-mission reads this file in `read` mode and emits a compact
Mission Anchor block; it writes here only in `update` / `curate` mode after a user
confirmation round.

## Mission

ywc-agent-toolkit-lp exists to give ywc-agent-toolkit (a distribution toolkit of 42
skills, plus 12 custom agents for Claude Code and 7 for Codex, hosted as a public GitHub
repository) a public marketing landing page that communicates its value. Target
outcome: a landing page at ohmyclaudecode.com's level of polish that drives
installs/adoption for new users across 5 locales (en/ja/ko/zh/es).

## Success Criteria

| ID | Criterion | Rationale | Status | Provenance |
|----|-----------|-----------|--------|-----------|
| SC001 | The LP is publicly reachable via GitHub Pages and serves all 5 locales (en/ja/ko/zh/es) with correct hreflang alternates | ywc-agent-toolkit's README already supports ko/zh/ja/es, so the LP must match that language coverage to remove the entry barrier for non-English users | active | brainstorm 2026-07-02 |
| SC002 | The build produces a pure static export (`output: 'export'`) with zero server dependency | GitHub Pages is free/zero-config hosting; preserving this infra simplicity keeps operational overhead at parity with ohmyclaudecode.com | active | brainstorm 2026-07-02 |
| SC003 | The page follows ohmyclaudecode.com's section structure (hero → problem/solution → features → install → social proof → FAQ) | This is a proven information structure for the same audience (Claude Code developer-tool users), reducing the risk of designing the layout from scratch | active | brainstorm 2026-07-02 |

## Rejected Approaches

| ID | Approach | Reason | Status | Provenance |
|----|----------|--------|--------|-----------|
| RA001 | Plain static HTML/CSS with no framework (the same approach ohmyclaudecode.com itself uses) | Would require manually keeping 5 locale HTML files in sync by hand; the workspace already has a Next.js + next-intl precedent (our-assets-lp/homepage) that is more maintainable long-term despite the added build step | active | brainstorm 2026-07-02 |
| RA002 | Astro + Tailwind | No existing precedent in the workspace; would introduce and maintain a new framework for a single project | active | brainstorm 2026-07-02 |
| RA003 | next-intl's standard `middleware.ts`-based locale negotiation | Next.js Middleware does not execute on GitHub Pages static export, so this approach cannot work — build-time pre-rendering via `generateStaticParams` in `[locale]/layout.tsx` was adopted instead | active | brainstorm 2026-07-02 |

## Deprecated

| ID | Kind | Text | Deprecated | Reason / Superseded-by |
|----|------|------|-----------|-----------------------|

## Change log

- 2026-07-02 — Mission set; +SC001; +SC002; +SC003; +RA001; +RA002; +RA003
