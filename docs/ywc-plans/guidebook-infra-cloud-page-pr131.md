# New Guidebook Page: Infrastructure & Cloud Skills (upstream PR #131)

> Status: Draft
> Scale: Medium
> Created: 2026-07-09
> Author: ywc-plan (Claude)
> Spec Reference: `N/A — no docs/specification section owns individual guidebook page content; this is guidebook-content work governed by CLAUDE.md's "Working From the Task List" / docs/tech-stack.md structure references, not a spec-owned feature.`
> Related: `docs/ywc-plans/sync-skill-count-infra-suite-pr131.md` (sibling spec — site-wide skill/agent count sync for the same upstream PR, intentionally split from this spec so each converges independently through `ywc-spec-validate`); `docs/ywc-plans/guidebook-page-numbering-refactor.md` (prior spec that established the array-position-based `displayNumber` model this spec's renumbering cascade must respect)

> **Operative Sections** (per Iteration 1 Amendments): **AC3**, **AC5**, and **FR-5** (including its `14-skill-reference.md` row in `Existing Constraints Touched`) are superseded by [`## Iteration 1 Amendments`](#iteration-1-amendments) §A1 and §A2 respectively (A1 → AC3; A2 → AC5, FR-5, and the `14-skill-reference.md` Existing Constraints row) — treat the amendment text as authoritative for those items. **FR-4** is supplemented (scope widened, not contradicted) by §A1's additional cross-reference file list. AC1, AC4, AC7, the NFR section, FR-1, FR-2, and the `Existing Constraints Touched` rows for `scripts/guidebook-slugs.mjs` and `test/check-guidebook-nav-registration.mjs` are supplemented (narrowed or extended in place, not contradicted) by §A3–A8 — read both the original text and its matching amendment sub-section together. All other sections (Purpose, Scope, Out of Scope, AC2, AC6, AC8, FR-3, FR-6, Data Model, Edge Cases, Open Questions, Dependencies) remain authoritative as originally written.

## Purpose

`ywc-agent-toolkit` (the upstream toolkit this landing page's Guidebook documents) has an **open, unmerged** PR — [#131](https://github.com/yongwoon/ywc-agent-toolkit/pull/131) — that adds a 4-skill infrastructure pipeline (`ywc-infra-design` → `ywc-iac-author` → `ywc-infra-review` → `ywc-infra-optimize`) to both Claude Code and Codex, backed by a new `ywc-cloud-engineer` agent and lens extensions to the existing `ywc-security-engineer`/`ywc-performance-engineer` agents.

This 4-skill cluster is structurally analogous to the existing Guidebook page **13 (`16-code-structure-and-maintainability.md`)** — "Managing Code Structure and Maintainability" — which already documents a 4-skill decision table plus a step-by-step pipeline for `ywc-refactor-clean` / `ywc-improve-architecture` / `ywc-impl-review` / `ywc-agent-legibility-audit`. Per user decision during planning, this spec creates a **new dedicated Workflow Guide page** following that exact precedent, rather than appending rows to the existing "Full Skill Reference" page (14-skill-reference.md) as a smaller prior sync spec did for a single unrelated skill.

## Scope

- Add one new Guidebook page to the `workflow-guides` group, positioned at the end of that group (immediately after `16-code-structure-and-maintainability.md`), across all 5 locales (en/ja/ko/zh/es):
  - `src/components/guidebook/guidebook-nav.ts` — new `GuidebookPageMeta` entry (slug `17-infrastructure-and-cloud`, title, description, `groupId: "workflow-guides"`, `status: "pending"`)
  - `scripts/guidebook-slugs.mjs` — the same slug added at the matching array position (per its own header comment: "Kept in the same order as guidebookNavGroups so a reviewer can diff this file against guidebook-nav.ts's 16 entries to catch drift")
  - `src/content/guidebook/{en,ja,ko,zh,es}/17-infrastructure-and-cloud.md` — new content: a decision table (which of the 4 skills to use) + one `<ToolTabs>` example section per skill + a "how the skills work together" pipeline walkthrough (design → author → review → optimize), each locale's own translated prose, following the exact structure of `16-code-structure-and-maintainability.md`
- **Renumber the cascade this insertion causes.** Because `displayNumber` is computed from flat array position (not stored per-file), inserting a new page at the end of `workflow-guides` shifts every page in the `reference` group that follows it. Concretely (current → after insertion): `13-executor-and-codegen-patterns.md` 14→15, `14-skill-reference.md` 15→16, `15-prerequisites-installation.md` 16→17. The new page itself becomes display number 14. `16-code-structure-and-maintainability.md` stays display number 13 (unaffected) but its own "Next" footer link must be repointed from the old 14-numbered page to the new page. This is the same class of cascade the prior page-numbering refactor already executed once (commit `4a9c6d1`, "sync H1 numbers for pages shifted by the reorder") — the pattern and file set are proven, not novel.
- Add the 4 new skill names (`ywc-iac-author`, `ywc-infra-design`, `ywc-infra-review`, `ywc-infra-optimize`) to `14-skill-reference.md`'s "Full Skill Index (A-Z)" table across all 5 locales, each row's Location column linking to the new page (matching the existing precedent where `ywc-refactor-clean` etc. link to `[13](./16-code-structure-and-maintainability.md)` rather than being explained inline).
- Add the 4 new skill names to `src/lib/skill-links.ts`'s `SKILL_GUIDEBOOK_SLUG_OVERRIDES` map, pointing at the new page's slug, so an inline `ywc-infra-design`-style mention elsewhere in the site links directly to the new page instead of falling back to the generic skill-reference page.
- Add the new page's row to each locale's `README.md` "Table of contents" (Workflow Guides section) and, where a "what you are trying to do" Quick Links row fits the new skills' situational framing (e.g., "Design or review cloud infrastructure before applying it"), one new Quick Links row pointing at the new page.
- Let the build's existing `scripts/generate-search-index.mjs` (runs automatically via `prebuild`) regenerate `src/data/guidebook-search.*.json` — no manual edit of those files. Note: this script extracts each page's search-index title from its literal H1 (depth-1 heading) text, so a stale H1 number would surface as a wrong number in site search results — this is a concrete, verified reason the H1 renumbering above is not cosmetic.

## Out of Scope

- **Merging PR #131 itself** — a different repository's hard-to-reverse action; requires the repo owner to merge it directly there.
- Any site-wide marketing-copy skill/agent count (hero, Feature Grid, FAQ, `docs/specification/*`, `docs/mission.md`, root `CLAUDE.md`, `docs/design-templates/landing-page/messages.js`) — that is the sibling spec `docs/ywc-plans/sync-skill-count-infra-suite-pr131.md`'s scope entirely. This spec's new page content does not state any aggregate skill/agent count, so it has no numeric overlap with the sibling spec.
- A dedicated Guidebook mention of `ywc-cloud-engineer` as a standalone agent entry — the Guidebook does not document individual agents as first-class pages anywhere today (verified: agents are mentioned only illustratively, e.g. `02-core-concepts.md`'s terminology table and `15-prerequisites-installation.md`'s tool-mapping table). This spec mentions `ywc-cloud-engineer` only as "the agent these skills dispatch to," inside the new page's prose, consistent with that existing precedent — not as a separate entry anywhere else.
- A dedicated mention of the `ywc-security-engineer` / `ywc-performance-engineer` lens extensions — these are capability additions to already-documented agents, not new Guidebook-addressable surface; at most, the new page's prose may note in passing that `ywc-infra-review` can delegate to these agents' new infra/cloud lenses, matching how the existing page prose already names specific agents in passing (e.g. `15-prerequisites-installation.md:127`'s `ywc-performance-engineer` row) — this is optional polish, not a required Acceptance Criterion.
- Any behavioral/logic change to the LP application (page rendering, sidebar, search) — verified `sidebar-nav.tsx`, `prev-next-nav.tsx`, and `feature-grid.tsx` are all pure data-driven components with no hardcoded slugs or page counts (confirmed by a repo-wide grep for hardcoded slug/number literals outside `guidebook-nav.ts` and `guidebook-slugs.mjs` — none found), so adding a page requires no component code change.
- `tasks/completed/**` entries and other historical plan documents referencing the old page numbering (frozen historical records).
- Adding a 6th locale or changing the existing 5-locale set (en/ja/ko/zh/es).
- Running `scripts/sync-guidebook-content.mjs` as part of this work — see risk note in Existing Constraints Touched.

## Existing Constraints Touched

| Existing artifact | Behavior (verified by reading the file) | Change classification |
|---|---|---|
| `src/components/guidebook/guidebook-nav.ts` — `guidebookNavGroups`, `workflow-guides` group (currently 7 pages ending at `16-code-structure-and-maintainability`, array positions 7–13) | `displayNumber` for every page is computed purely from flat array position via `formatGuidebookPageTitle`, not stored per-file (verified: the file's own comment block, lines 80-96, documents this explicitly and warns that markdown H1 text must be kept in sync manually) | must-change — append new `GuidebookPageMeta` entry after the `16-code-structure-and-maintainability` entry, inside the `workflow-guides` group's `pages` array |
| `scripts/guidebook-slugs.mjs` (16 entries today, frozen array, consumed by `generate-search-index.mjs` and `generate-sitemap.mjs`) | Header comment states it must be kept in the same order as `guidebookNavGroups` "so a reviewer can diff this file against guidebook-nav.ts's 16 entries to catch drift" | must-change — add the new slug at the matching position (index 13, 0-based, immediately after `16-code-structure-and-maintainability`) |
| `test/check-guidebook-nav-registration.mjs` (run via `prebuild`, per `package.json`) | Diffs 3 sources — the `src/content/guidebook/en/` directory listing, `guidebookNavGroups`'s parsed slugs, and `guidebookSlugs` from `guidebook-slugs.mjs` — and fails the build if any of the three disagree | comply — the new page's content file, nav entry, and slugs-array entry must all land in the same commit/task, or this build gate fails loud |
| `src/content/guidebook/en/16-code-structure-and-maintainability.md:3` (H1) | `# 13. Managing Code Structure and Maintainability` | no change needed — this page's own display number (13) is unaffected by the insertion (it stays the last `workflow-guides` page before the new one) |
| `src/content/guidebook/en/16-code-structure-and-maintainability.md:98` (footer) | `[Previous: 12. Debugging and incident postmortems](./12-debugging-and-incident-postmortem.md) - [Next: 14. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)` | must-change — the "Next" link must be repointed to the new page (new display number 14), both its text and its `href` target |
| `src/content/guidebook/en/13-executor-and-codegen-patterns.md:3` (H1) | `# 14. Executor / Code-gen Prompt patterns` | must-change — 14 → 15 |
| `src/content/guidebook/en/13-executor-and-codegen-patterns.md` (footer) | `[Previous: 13. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) - [Next: 15. Full Skill Reference](./14-skill-reference.md)` | must-change — "Previous" link's number-in-text stays "13" (target page unchanged) but "Next" text must become "16. Full Skill Reference" (number only; target file unchanged) |
| `src/content/guidebook/en/14-skill-reference.md:3` (H1) | `# 15. Full Skill Reference` | must-change — 15 → 16 |
| `src/content/guidebook/en/14-skill-reference.md:371` (footer) | `[Previous: 14. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) - [Next: 16. Prerequisites and installation](./15-prerequisites-installation.md)` | must-change — "Previous" text 14→15 (target unchanged), "Next" text 16→17 (target unchanged) |
| `src/content/guidebook/en/14-skill-reference.md:318-368` ("Full Skill Index (A-Z)" table, alphabetically sorted) | Lists every `ywc-*` skill with a Description and Location column; entries for skills documented on a dedicated page link there (e.g. `ywc-refactor-clean` → `[13](./16-code-structure-and-maintainability.md)`) | must-change — insert 4 new alphabetically-sorted rows (`ywc-iac-author`, `ywc-infra-design`, `ywc-infra-optimize`, `ywc-infra-review`) each linking to `[14](./17-infrastructure-and-cloud.md)` (using the new display number) |
| `src/content/guidebook/en/15-prerequisites-installation.md:3` (H1) | `# 16. Prerequisites and installation` | must-change — 16 → 17 |
| `src/content/guidebook/en/15-prerequisites-installation.md` (footer, last page, no "Next") | `[Previous: 15. Full Skill Reference](./14-skill-reference.md) · [Back to table of contents »](./README.md)` | must-change — "Previous" text 15→16 (target unchanged) |
| `src/content/guidebook/{ja,ko,zh,es}/{16-code-structure-and-maintainability,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md` | Same H1-number-and-footer-link structure as the `en` files above, each locale's own translated prose around the numbers (not verified line-by-line per locale in this planning pass — the pattern is structurally identical, per `test/check-guidebook-nav-registration.mjs` only checking the `en` directory against the shared nav, which implies the other 4 locales are expected to mirror `en`'s structure without being build-gated on it) | must-change — same renumbering pattern as `en`, applied in each locale's own language; **the executor must visually confirm each non-en file's H1 and footer follow the same pattern before editing**, since no automated check enforces ja/ko/zh/es structural parity with `en` for this file |
| `src/content/guidebook/{en,ja,ko,zh,es}/README.md` — "Table of contents" → "Workflow Guides" table | Lists all `workflow-guides` pages with their current display numbers (en: lines 70-78 span `[13]`...`[16]`) | must-change — add a new row for the new page (`[14]`), and bump the 3 shifted rows' leading numbers (`[14]`→`[15]`, `[15]`→`[16]`, `[16]`→`[17]`) — link targets (`.md` filenames) are unchanged, only the bracketed display numbers |
| `src/content/guidebook/{en,ja,ko,zh,es}/README.md` — "What are you trying to do? (Quick links by goal)" table | En verified: ~9 rows link to `[15](./14-skill-reference.md)` (brainstorm, security-audit, handle-pr-reviews, merge-dependabot, changelog-release-notes, commit, tech-research, ubiquitous-language, plus one prose sentence) and 1 row links to `[14](./13-executor-and-codegen-patterns.md)` (sequential/parallel executor row) | must-change — bump every `[15]` reference to `[16]` and the one `[14]` reference to `[15]` (link targets unchanged); optionally add one new row for the infra pipeline pointing at `[14](./17-infrastructure-and-cloud.md)` |
| `src/lib/skill-links.ts` — `SKILL_GUIDEBOOK_SLUG_OVERRIDES` (currently 3 entries: `ywc-agentic`, `ywc-debug-rootcause`, `ywc-incident-postmortem`) | Maps a skill mention to its topically-exact Guidebook page; everything else falls back to `DEFAULT_SKILL_GUIDEBOOK_SLUG = "14-skill-reference"` | must-change — add 4 entries mapping `ywc-iac-author`, `ywc-infra-design`, `ywc-infra-optimize`, `ywc-infra-review` to the new page's slug `"17-infrastructure-and-cloud"` |
| `src/components/guidebook/prev-next-nav.tsx` | Pure props-driven (`previous`/`next` passed in, rendered via `formatGuidebookPageTitle`); no hardcoded slug or page count (verified directly) | no change needed — the live site's Prev/Next footer auto-updates once `guidebookNavGroups` changes; only the markdown-embedded footer text (a separate, GitHub-reading-oriented block within each `.md` file, not rendered by this component) needs the manual edits above |
| `src/components/guidebook/sidebar-nav.tsx`, `guidebook-frame.tsx`, `top-bar.tsx`, `toc.tsx`, `search-modal.tsx`, `scale-selector.tsx` | Repo-wide grep for hardcoded guidebook slugs/numbers outside `guidebook-nav.ts` and `guidebook-slugs.mjs` returned zero matches in any of these files | no change needed — confirmed via complement grep, not assumed |
| `scripts/generate-search-index.mjs` (run via `prebuild`) | Extracts each page's search-index title from the file's literal depth-1 markdown heading (verified: `extractTitleAndSummary`'s `node.depth === 1` check) | comply — no manual edit; regenerates automatically from the corrected H1s once this spec's content edits land |
| `scripts/sync-guidebook-content.mjs` (manual dev-only tool; not wired into `prebuild` or CI) | Deletes and fully repopulates `src/content/guidebook/ko/` from an external sibling-repo path (`../develop-with-llm/docs/guides/guidebook`) | risk note — a later manual run of this script would silently wipe this spec's `ko/17-infrastructure-and-cloud.md` and the `ko/` renumbering edits, replacing them from the external source; do not run this script immediately after this spec's `ko` edits, or re-apply this spec's `ko` changes after any sync run (identical risk note to the precedent sync spec) |
| `test/check-guidebook-paths.mjs` (run via `npm run test:content`) | Scans `src/content/guidebook/**` for forbidden stale source-repo path patterns | comply — the new page's content is scanned; run `npm run test:content` as part of verification |
| (complement check) `grep -rn "ywc-iac-author\|ywc-infra-design\|ywc-infra-review\|ywc-infra-optimize\|ywc-cloud-engineer" src/` → no matches (shared with sibling spec's equivalent check) | No LP content currently references any of the 4 new skills or the new agent by name | confirms this spec's Guidebook content is purely additive — no existing wrong reference to correct |
| (complement check) `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` → `OPEN` / `null` | Upstream PR not yet merged | this spec's content-authoring can proceed now (skill names/descriptions are unlikely to change before merge, unlike the precedent spec's single-skill-name uncertainty), but final command-syntax examples in the `<ToolTabs>` sections should be re-verified against each skill's actual `SKILL.md` at execution time per this Guidebook's own stated sourcing policy (`README.md`'s "Source material" section) |

## Acceptance Criteria

- [ ] **AC1 — New page registered consistently in all 3 required places**: `guidebook-nav.ts`, `guidebook-slugs.mjs`, and `src/content/guidebook/en/17-infrastructure-and-cloud.md` all exist and agree. Observable as: `npm run build` (which runs `test/check-guidebook-nav-registration.mjs` via `prebuild`) completes without a registration-mismatch error.
- [ ] **AC2 — New page content exists and is complete in all 5 locales**: `src/content/guidebook/{en,ja,ko,zh,es}/17-infrastructure-and-cloud.md` each contain a decision table (4 skills), one `<ToolTabs>` example section per skill, and a pipeline walkthrough section, in that locale's own translated prose (not copy-pasted English). Observable as: all 5 files exist, each with 4 `<ToolTabs>` blocks and a "how the skills work together" (or locally-translated equivalent) heading.
> ⚠️ SUPERSEDED by Iteration 1 — see [A1](#a1-cascade-renumbering--additional-stale-cross-reference-sites-critical)

- [ ] **AC3 — Renumbering cascade fully applied, no stale numbers remain**: Every H1 and footer Previous/Next reference in `16-code-structure-and-maintainability.md`, `13-executor-and-codegen-patterns.md`, `14-skill-reference.md`, and `15-prerequisites-installation.md` — across all 5 locales — reflects the new display numbers (13/14/15/16/17 respectively for the code-structure/new-page/executor/skill-reference/prerequisites sequence). Observable as: for each of the 4 existing files in each locale, the H1 number matches the page's array position in `guidebookNavGroups`, and the footer's Previous/Next numbers match their linked pages' array positions.
- [ ] **AC4 — README.md TOC and Quick Links consistent in all 5 locales**: Every `[N]` reference to the 3 shifted pages is bumped, and a new row exists for the new page in the Workflow Guides TOC table. Observable as: manually cross-checking each `README.md`'s bracketed numbers against `guidebookNavGroups`'s current array positions.
- [ ] **AC5 — Full Skill Index (A-Z) includes the 4 new skills**: `14-skill-reference.md` in all 5 locales lists `ywc-iac-author`, `ywc-infra-design`, `ywc-infra-optimize`, `ywc-infra-review` alphabetically, each linking to the new page. Observable as: the 4 rows exist and their links resolve (anchor/file both exist).
- [ ] **AC6 — `skill-links.ts` routes the 4 new skills to the new page**: `getSkillGuidebookTarget("ywc-infra-design")` (and the other 3) returns a path containing `17-infrastructure-and-cloud`. Observable as: reading the updated `SKILL_GUIDEBOOK_SLUG_OVERRIDES` map.
- [ ] **AC7 — Build and content checks pass**: `npm run build` (prebuild gates: `check-guidebook-nav-registration.mjs`, `generate-search-index.mjs`) and `npm run test:content` (`check-guidebook-paths.mjs`) both complete without error.
- [ ] **AC8 — No manual search-index edits**: `src/data/guidebook-search.*.json` changes in the diff, if any, are identical to what a fresh `npm run build` produces from the edited markdown — not hand-authored.

## Functional Requirements

### FR-1: Ground-Truth Re-Verification (must run first)

Before authoring content, the executor re-runs `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` to confirm current merge state, and re-reads each new skill's actual `SKILL.md` (`claude-code/skills/ywc-{iac-author,infra-design,infra-review,infra-optimize}/SKILL.md` on the PR's branch, or on `main` post-merge) to source accurate command syntax and option flags for the `<ToolTabs>` examples — per this Guidebook's own "Source material" policy (`README.md`'s closing section: "All command syntax and options in this Guidebook were verified against each Skill's `SKILL.md`"). Unlike the sibling numeric-sync spec, this FR is **not a hard blocker on merge** — content authoring may proceed against the PR's current (open) diff, since skill names/interfaces are unlikely to change before merge, but the executor should re-check if a significant delay occurs between planning and execution.

### FR-2: New Page Registration (atomic 3-way edit)

Add the new page to `guidebook-nav.ts`'s `workflow-guides` group (after `16-code-structure-and-maintainability`) and to `guidebook-slugs.mjs` at the matching position, in the same task/commit as creating `src/content/guidebook/en/17-infrastructure-and-cloud.md` — `test/check-guidebook-nav-registration.mjs` fails the build if these three drift out of sync even temporarily.

Suggested page metadata (executor may refine wording): `slug: "17-infrastructure-and-cloud"`, title along the lines of "Managing Cloud Infrastructure" (parallel to page 13's "Managing Code Structure and Maintainability"), description summarizing the 4-skill pipeline and the `ywc-cloud-engineer` agent it dispatches to.

### FR-3: New Page Content (5 locales)

Author `src/content/guidebook/{en,ja,ko,zh,es}/17-infrastructure-and-cloud.md` following `16-code-structure-and-maintainability.md`'s proven structure:

1. A "When to use these Skills" decision table (4 rows: design, author, review, optimize — each with its own question and skill name).
2. One `## `ywc-<skill>`` section per skill with a short description and a `<ToolTabs>` `<ToolTabsPanel tool="claude-code">`/`<ToolTabsPanel tool="codex">` example, syntax sourced from FR-1's re-read `SKILL.md` files.
3. A "How the Skills work together" section walking through the design → author → review → optimize pipeline, mentioning that `ywc-infra-review` and `ywc-infra-optimize` can delegate to `ywc-cloud-engineer` and the lens-extended `ywc-security-engineer`/`ywc-performance-engineer` agents (prose mention only, consistent with how agents are named in passing elsewhere in this Guidebook — not a dedicated agent section).
4. The standard `[Back to table of contents]` header link and `[Previous: 13. ...] - [Next: 15. ...]` footer, using the post-insertion display numbers.

Each locale's content is its own translated prose, not a mechanical copy of `en`.

### FR-4: Renumbering Cascade

Update the H1 heading and footer Previous/Next text (and, for `16-code-structure-and-maintainability.md`'s "Next" link, the link target too) in `16-code-structure-and-maintainability.md`, `13-executor-and-codegen-patterns.md`, `14-skill-reference.md`, and `15-prerequisites-installation.md`, across all 5 locales, per the exact mapping in Existing Constraints Touched. Apply the same numeral bump to each locale's `README.md` TOC and Quick Links tables (FR-5 covers `README.md` specifically).

> ⚠️ SUPERSEDED by Iteration 1 — see [A2](#a2-full-skill-index-a-z--existing-14-rows-must-also-bump-critical)

### FR-5: README.md and Skill Index Updates

In each locale's `README.md`: add a Workflow Guides TOC row for the new page, bump the 3 shifted pages' bracketed numbers in both the TOC table and the Quick Links table, and optionally add one new Quick Links row for the infra pipeline. In each locale's `14-skill-reference.md`: insert the 4 new skills alphabetically into the "Full Skill Index (A-Z)" table, each linking to the new page via its post-insertion display number.

### FR-6: `skill-links.ts` Overrides

Add `ywc-iac-author`, `ywc-infra-design`, `ywc-infra-optimize`, `ywc-infra-review` to `SKILL_GUIDEBOOK_SLUG_OVERRIDES`, each mapped to `"17-infrastructure-and-cloud"`.

## Non-Functional Requirements

- **i18n structural parity**: all 5 locale content files, README updates, and skill-index rows must exist before this spec is considered complete — no locale left with only the `en` version (there is no automated key-parity gate for guidebook markdown the way `check-message-keys.mjs` covers `messages/*.json`, so this is the executor's manual responsibility, verified in AC2/AC4).
- **No behavioral/performance regression**: content-only change; no new client-side JS, no new dependencies. Re-run `npm run verify:bundle` as a sanity check.
- **Anchor collision check**: the new page's headings (auto-slugified via `github-slugger`, per `package.json`) must not collide with each other within the same file; verify after drafting.

## Data Model / API Contract

N/A — no schema, no API surface. Pure static content (Markdown pages, one TypeScript nav-data file, one plain-JS slug array, one TypeScript lookup map).

## Edge Cases

- **Upstream skill names or command syntax change before merge** (PR still open) — FR-1's re-verification step protects against building stale command examples into the Guidebook; re-check `SKILL.md` sources if execution happens significantly after this spec is written.
- **A future page is inserted before this one** — this spec's new page (display number 14) would itself become subject to the same renumbering cascade it is now applying to others; this is expected, ongoing maintenance already established by the `guidebook-nav.ts` array-position model, not a defect this spec introduces.
- **Non-en locale files structurally diverge from `en`** (e.g., a missing footer line, a differently-ordered TOC) — since no automated check enforces ja/ko/zh/es structural parity with `en` for guidebook markdown (only the `en` directory is checked against `guidebookNavGroups`/`guidebook-slugs.mjs`), the executor must visually inspect each non-en file before editing rather than assuming `en`'s line numbers apply identically.
- **`scripts/sync-guidebook-content.mjs` run against `ko/` after this spec's edits** — would silently wipe this spec's Korean content and renumbering; see the risk note in Existing Constraints Touched.

## Open Questions

- Exact final title/description wording for the new page (`"Managing Cloud Infrastructure"` vs. an alternative) — left to the executor's content-authoring judgment at FR-2, not blocking spec approval.
- Whether to add a new Quick Links row in `README.md` for the infra pipeline (FR-5 optional bullet) — left to the executor's judgment; not required for AC4 to pass.

## Dependencies

- **Soft dependency, not a hard blocker**: PR #131 merging is not required before this spec's content-authoring work begins (unlike the sibling numeric-sync spec), since skill names and interfaces are stable in the current diff. FR-1 still requires re-verification if significant time passes before execution.
- **No dependency on the sibling spec** `docs/ywc-plans/sync-skill-count-infra-suite-pr131.md` — the two specs can execute in either order or in parallel; neither spec's Acceptance Criteria references an artifact the other spec creates.

## Iteration 1 Amendments

> Addresses `ywc-spec-validate` iteration 1 findings: Critical 2 / Warning 5 / Suggestion 4. Appends to — does not replace — the sections above. Where an amendment below narrows or extends an original AC/FR's scope, the amendment is authoritative for that specific item; all other original content stands as written.

### A1. Cascade renumbering — additional stale cross-reference sites (Critical)

The original Existing Constraints Touched table and FR-4 covered H1 and footer text in only the 4 directly-renumbered pages (`16-code-structure-and-maintainability.md`, `13-executor-and-codegen-patterns.md`, `14-skill-reference.md`, `15-prerequisites-installation.md`). A repo-wide grep of `src/content/guidebook/en/**/*.md` for the patterns `\[1[3-6]\.\s` and `\]\(\./1[3-6]-(code-structure|executor-and-codegen|skill-reference|prerequisites)` (re-run against the actual current file contents while drafting this amendment) surfaced additional prose cross-references elsewhere in the guidebook that embed the SAME stale display numbers and were never in the original table. These must be corrected in the same pass, across all 5 locales (verify each locale's own equivalent line before editing — do not assume identical line numbers across locales):

| File (`en` citation; verify the equivalent line in ja/ko/zh/es) | Current text | Required change |
|---|---|---|
| `01-introduction.md:23` | `[15. Prerequisites and installation](./15-prerequisites-installation.md)` | → `[17. Prerequisites and installation](./15-prerequisites-installation.md)` (link target unchanged, number only) |
| `01-introduction.md:47` | `[13. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)` | → `[15. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)` |
| `02-core-concepts.md:57` | `[13. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)` | → `[15. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)` |
| `03-quickstart.md:90` | `[14. Full Skill Reference](./14-skill-reference.md)` | → `[16. Full Skill Reference](./14-skill-reference.md)` |
| `05-general-cycle-medium-large.md:62` | `[13. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)` | → `[15. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)` |

**No change needed** (verified, stays correct): every reference to "13. Managing Code Structure and Maintainability" / `./16-code-structure-and-maintainability.md` anywhere in the guidebook (`12-debugging-and-incident-postmortem.md:46`, `14-skill-reference.md:148,152,156,160,324,339,340,351`, `README.md:31,36,70`) — this page's own display number (13) is unaffected by the insertion, per the original spec's Existing Constraints Touched.

> ⚠️ **AC3 is SUPERSEDED by Iteration 1 — see A1.** Amended AC3: "Renumbering cascade fully applied, no stale numbers remain — across the 4 directly-renumbered pages AND every other guidebook page containing an inline cross-reference to one of the 3 shifted display numbers (13→15, 14→16, 15→17), across all 5 locales." Observable: a repo-wide grep across `src/content/guidebook/**/*.md` for the patterns `\[1[3-6]\.\s` and `\]\(\./1[3-6]-(code-structure|executor-and-codegen|skill-reference|prerequisites)` returns **only** these pairings (any other pairing is stale) — `[13.` ↔ `./16-code-structure-and-maintainability.md` (unaffected, stays 13), `[14.` ↔ `./17-infrastructure-and-cloud.md` (new page), `[15.` ↔ `./13-executor-and-codegen-patterns.md`, `[16.` ↔ `./14-skill-reference.md`, `[17.` ↔ `./15-prerequisites-installation.md`. (A blanket "zero matches" reading of the grep is incorrect — legitimate post-fix references will still match these patterns; check the number/target **pairing**, not raw match count.)

### A2. Full Skill Index (A-Z) — existing `[14]` rows must also bump (Critical)

`14-skill-reference.md`'s A-Z table (and its ja/ko/zh/es equivalents) has 3 existing rows whose Location column reads `[14](./13-executor-and-codegen-patterns.md)`: `ywc-code-gen` (:328), `ywc-parallel-executor` (:345), `ywc-sequential-executor` (:355). The original spec's FR-5 only directed adding 4 new rows at `[14](./17-infrastructure-and-cloud.md)` — leaving these 3 existing rows unchanged would make the same table show two different link targets both labeled `[14]`.

> ⚠️ **FR-5 and the `14-skill-reference.md` row of Existing Constraints Touched are SUPERSEDED by Iteration 1 — see A2.** Amended FR-5: in the same edit that adds the 4 new alphabetical rows at `[14](./17-infrastructure-and-cloud.md)`, also bump the 3 existing `[14](./13-executor-and-codegen-patterns.md)` rows to `[15](./13-executor-and-codegen-patterns.md)` (link target unchanged, bracket number only) — all 5 locales.

Amended AC5 observable: the A-Z table contains no two rows whose bracketed number is identical unless their link targets are also identical.

### A3. Atomic edit unit is nav + slugs + all 5 locale files, not just `en` (Warning)

`scripts/generate-search-index.mjs` runs before `test/check-guidebook-nav-registration.mjs` in `prebuild` (see `package.json`'s `prebuild` script) and hard-throws if any locale's content file for a `guidebook-slugs.mjs`-registered slug is missing. Amended FR-2: the "atomic 3-way edit" must land `guidebook-nav.ts`, `scripts/guidebook-slugs.mjs`, AND all 5 locale content files (`src/content/guidebook/{en,ja,ko,zh,es}/17-infrastructure-and-cloud.md`) in the same commit/task — a partial-locale commit fails `npm run build` at the `generate-search-index` step before the registration check ever runs.

### A4. AC1 wording narrowed to what the build gate actually checks (Warning)

`test/check-guidebook-nav-registration.mjs` diffs slug SET membership across 3 sources; it does not check array order, group placement, or position. Amended AC1 text: "New page registered consistently in all 3 required places (same slug set)." The observable (`npm run build` completes without a registration-mismatch error) is unchanged, but the criterion no longer implies position/order is build-gated — the new page's correct array position (end of `workflow-guides`, immediately after `16-code-structure-and-maintainability`) remains a manual-review requirement, not an automated one.

### A5. Non-en locale parity — concrete verification procedure (Warning)

Amended AC3/AC4 observable: in addition to visual inspection, run a grep-based check per non-en locale before considering the cascade complete — for each of the 4 renumbered files in each locale, confirm the H1 line matches the expected new number (e.g. `rg "^# (13|14|15|16|17)\." src/content/guidebook/<locale>/{16-code-structure-and-maintainability,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md`) and that the file's footer Previous/Next numeral text matches the corrected values.

### A6. Anchor-collision verification method named (Warning)

Amended NFR (Anchor collision check): verification method is "read the new page's rendered heading list and confirm no two headings would produce the same slug via the same slugification approach `guidebook-mdx.tsx` already uses for TOC/anchor generation (`github-slugger`) — in practice, avoid two headings with identical text within the same file."

### A7. `guidebook-slugs.mjs` header comment (Warning)

Amended Existing Constraints Touched (`scripts/guidebook-slugs.mjs` row): the must-change edit also includes updating the file's header comment if it states a stale numeric entry count or size-specific description — reword generically (e.g. "kept in the same order as guidebookNavGroups") rather than leaving a stale count after the array grows to 17 entries.

### A8. Suggestions folded in

- Amended AC7: also list `npm run lint` and `npx tsc --noEmit` alongside `npm run build` / `npm run test:content`, matching actual CI parity for a content-only change.
- Amended NFR (`npm run verify:bundle`): caveat added — this script measures the landing page bundle only and does not exercise guidebook content; kept as a general regression sanity check, not a guidebook-specific gate.
- Amended FR-1: add an observable — note the verified PR head SHA / merge state in the PR description or final commit message, so FR-1's re-verification step is checkable after the fact.
- Amended AC4 observable: explicitly include `README.md:40`'s prose sentence ("For situations not covered in this table, see [15. Full Skill Reference]", all 5 locales) as a required bump target, not just the two tables.

### Iteration 1 — Step 4b.5 Self-Consistency Re-check (whole spec)

- **Pass A** (cross-section): amended AC3/AC5 now match the widened FR-4/FR-5 scope introduced in A1/A2; no new orphan AC/FR introduced by this amendment.
- **Pass B** (claim↔reality): every new file:line citation in A1/A2 (`01-introduction.md:23,47`; `02-core-concepts.md:57`; `03-quickstart.md:90`; `05-general-cycle-medium-large.md:62`; `14-skill-reference.md:328,345,355`) was verified directly against current file contents while drafting this amendment, not assumed.
- **Pass C** (schema invariants): N/A — no DB/schema surface in this spec.

No further cross-section drift identified as of this amendment.
