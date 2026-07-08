# Sync Skill/Agent Counts for Infra Suite (upstream PR #131)

> Status: Draft
> Scale: Medium
> Created: 2026-07-09
> Author: ywc-plan (Claude)
> Spec Reference: `N/A — no docs/specification section owns "upstream toolkit sync"; this spec touches docs/specification/01-overview.md`, `02-features.md`, `03-data.md`, `05-user-flows.md` directly (see Existing Constraints Touched) rather than superseding a dedicated spec file.
> Related: `docs/ywc-plans/sync-skill-count-language-setup.md` (precedent for this exact change class, 41→42 skills); `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md` (sibling spec — new guidebook page for the same upstream PR, intentionally split from this spec so each converges independently through `ywc-spec-validate`)

> **Operative Sections** (per Iteration 1 Amendments — see bottom of file): the `featureGrid.title` row in **Existing Constraints Touched**, **AC1**, **AC2**, **AC4**, and FR-3's closing sentence are marked `SUPERSEDED` in place; their Iteration 1 Amendments versions are authoritative. All other sections are unchanged and remain authoritative as originally written.

## Purpose

`ywc-agent-toolkit` (the upstream toolkit this landing page markets) has an **open, unmerged** PR — [#131](https://github.com/yongwoon/ywc-agent-toolkit/pull/131) — that adds a 4-skill infrastructure suite (`ywc-iac-author`, `ywc-infra-design`, `ywc-infra-review`, `ywc-infra-optimize`) to **both** Claude Code and Codex, plus a new `ywc-cloud-engineer` agent shipped to **both** tools, plus lens extensions (no count change) to the existing `ywc-security-engineer` and `ywc-performance-engineer` agents.

**Critical precondition verified during planning**: `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` reports `state: OPEN`, `mergedAt: null`. The PR's file list confirms the 4 new skills and the new agent are added under **both** `claude-code/` and `codex/` trees symmetrically (no per-tool divergence, unlike the precedent sync spec's provisional divergence risk). This spec's numeric assumptions (42→46 skills on both tools; Claude Code agents 12→13; Codex agents 7→8) are therefore provisional, taken from an in-flight, unmerged diff — **every numeric edit in this spec is gated on re-verifying this at execution time (FR-1)**, exactly as the precedent spec required.

This spec exists to make the landing page (LP) ready to absorb that upstream change the moment it merges, keeping every hardcoded skill/agent count in the site, its i18n messages, and its specification/mission docs mutually consistent — the exact failure mode this repo's `CLAUDE.md` calls out as load-bearing ("Hero and Feature Grid must never contradict each other on agent counts").

## Scope

> ⚠️ SUPERSEDED (file list) by Iteration 1 — see §Iteration 1 Amendments → Fix 4. `docs/design-system/README.md` is an additional must-change file not listed below.

- Update every hardcoded "42" skill count and "12"/"7" agent count occurrence in the LP to match the **actual, re-verified** upstream counts at the time this work executes (default assumption: 46 skills on both tools, 13 Claude Code agents, 8 Codex agents) — not blindly trusting this spec's provisional numbers. Full file list: `src/messages/{en,ja,ko,zh,es}.json`, `src/components/sections/hero.tsx`, `docs/design-system/content-voice.md`, `docs/design-system/components.md`, `docs/specification/01-overview.md`, `02-features.md`, `03-data.md`, `05-user-flows.md`, `docs/mission.md`, this repo's root `CLAUDE.md`, and `docs/design-templates/landing-page/messages.js`.
- **Stop condition**: If AC1's re-verification (FR-1) finds PR #131 still unmerged (`mergedAt: null`), stop immediately after AC1 — do not edit any numeric value anywhere in this Scope. Re-attempt this spec's execution only after re-confirming the PR has merged.
- Reconcile the Feature Grid category-count arithmetic: `src/messages/*.json` `featureGrid.items` currently sums 5 skill categories (Planning & Spec 10 + Task & Execution 8 + Review & Verification 12 + Git & Release 7 + Toolkit & Setup 5 = 42) plus 2 agent categories (Claude Code 12, Codex 7) = 7 tiles total, matching the current "Seven categories" title. Add one new skill category sized **purely arithmetically** (`new total − 42`, default 4) covering the infra suite, and bump the two agent-category values (12→13, 7→8) — update `featureGrid.title`'s category-count word ("Seven" → "Eight") in lockstep across all 5 locales.
- Let the build's existing `scripts/generate-search-index.mjs` (runs automatically via `prebuild`) regenerate `src/data/guidebook-search.*.json` — no manual edit of those files. (This spec does not touch any `src/content/guidebook/**` markdown; that is the sibling spec's scope.)

## Out of Scope

- **Merging PR #131 itself.** That is a change to a different repository (`ywc-agent-toolkit`) and is a hard-to-reverse action on shared upstream state; it requires the repo owner to merge it directly there, not something this LP-repo spec authorizes.
- Any behavioral/logic change to the LP application — this is a content/copy-only sync.
- Authoring or editing any file under `src/content/guidebook/**`, `src/components/guidebook/guidebook-nav.ts`, `scripts/guidebook-slugs.mjs`, or `src/lib/skill-links.ts` — that is the sibling spec `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md`'s scope. This spec's Feature Grid CTA (`"Browse the full skill reference" → /guidebook/14-skill-reference/`) is unaffected by whether the sibling spec's new page exists yet, so the two specs have no execution-order dependency on each other.
- Prose-only accuracy touch-ups to the `ywc-security-engineer` / `ywc-performance-engineer` lens-extension descriptions in Feature Grid's "Review & Verification" category — these agents gained capability, not count, so no number changes; a prose refresh is optional and not required by this spec's Acceptance Criteria.
- `tasks/completed/**` entries that hardcode 41/42/12/7 (frozen historical records of already-merged work).
- `docs/ywc-plans/guidebook-tool-tabs.md` and `docs/ywc-plans/sync-skill-count-language-setup.md` themselves (historical plan documents recording past design decisions, not live content).
- Adding a 6th locale or changing the existing 5-locale set (en/ja/ko/zh/es).
- Verifying or updating any other unrelated upstream toolkit change not part of PR #131.

## Existing Constraints Touched

> ⚠️ SUPERSEDED (row: `src/messages/en.json:113` / `featureGrid.title`) by Iteration 1 — see §Iteration 1 Amendments → Fix 1. A row for `docs/design-system/README.md:58` is added by Iteration 1 — see §Iteration 1 Amendments → Fix 4.

| Existing artifact | Behavior (verified by reading the file) | Change classification |
|---|---|---|
| `src/messages/en.json:32` (`hero.headline`) | `"42 skills and expert agents for Claude Code and Codex."` | must-change — `en.json` is the single source of truth (per repo `CLAUDE.md`), edited first, then mirrored into ja/ko/zh/es with matching key structure and each locale's own idiomatic phrasing |
| `src/messages/en.json:45` (`hero.demoInstalled`) | `"installed 42 skills for Claude Code and Codex"` | must-change |
| `src/messages/en.json:71` (`pipeline.description`) | `"Most of the 42 skills chain into one sequence..."` | must-change |
| `src/messages/en.json:114` (`featureGrid.description`) | `"42 skills organized by what they do, not just how many there are."` | must-change |
| `src/messages/en.json:113` (`featureGrid.title`) | `"Seven categories, one pipeline, two tools."` — matches current 7 `items` entries (5 skill + 2 agent categories, verified by counting) | must-change **only in the converged-count case** — adding one new skill category makes `items` 8 entries, so this title's category-count word must become "Eight" in lockstep. If FR-1 finds divergent per-tool skill counts, apply the tool-agnostic fallback pattern instead (see FR-3) and leave this title's numeral logic to that fallback. |
| `src/messages/en.json:115-158` (`featureGrid.items`, 7 entries) | 5 skill categories (10+8+12+7+5=42) + `"Claude Code agents"` value `"12 agents"` (line 148) + `"Codex agents"` value `"7 agents"` (line 154) | must-change — add one new skill-category entry (default label "Infrastructure & Cloud", value `"4 skills"`, description describing the *kind* of skill without claiming an exhaustive roster, per the precedent spec's guardrail against naming a specific skill list as arithmetic "proof"); bump `"12 agents"` → `"13 agents"` and `"7 agents"` → `"8 agents"` |
| `src/messages/en.json:248` (FAQ answer) | `"Yes. Both tools receive 42 skills. Claude Code includes 12 custom agents, while Codex includes 7 custom agents."` | must-change |
| `src/messages/en.json:324-325` (page `metadata.title`/`.description`) | `"ywc-agent-toolkit — 42 skills and expert agents..."` / `"...with 42 skills for Claude Code and Codex plus tool-specific custom agents."` | must-change |
| `src/messages/{ja,ko,zh,es}.json` | Mirror the same keys as `en.json` above, each in its own locale's idiomatic phrasing (verified: `ja`/`ko`/`zh`/`es` all currently state "42" equivalents in the same key positions) | must-change — mirrored from `en.json` after it is edited, never edited first |
| `scripts/check-message-keys.mjs` (run via `prebuild`) | Fails the build if any locale is missing a key present in `en.json` | comply — this task only edits *values* of existing keys, plus adds the same new `featureGrid.items[]` array entry to all 5 locale files atomically (same array length, same key shape, per-locale value) — never adds a key to one locale without the other 4 |
| `scripts/generate-search-index.mjs` (run via `prebuild`) | Regenerates `src/data/guidebook-search.*.json` from `src/content/guidebook/**` | not applicable — this spec makes no guidebook content edits, so no regeneration is triggered by this spec's changes |
| `src/components/sections/hero.tsx:29` | One hardcoded string: `<SectionEyebrow>42 skills</SectionEyebrow>`. (Verified directly — this is the file's only "42" occurrence; the demo-install line lives in `messages.json`'s `hero.demoInstalled`, not hardcoded here.) | must-change |
| `src/components/sections/feature-grid.tsx` | Pure `items.map()` over `t.raw("items")`, responsive CSS grid with no fixed item-count assumption (verified directly) | no change needed — adding an 8th tile is a pure content change |
| `docs/design-system/content-voice.md:15-18,38,41` | Documents `"42 skills"` as **the one hard constraint true on both tools**, and documents that differing agent counts (12/7) force the hero to say "expert agents" with no number, exact counts only in the Feature Grid | must-change — update the skill-count number; if FR-1 finds the new skill count also converges across tools (expected, per the PR's symmetric file list), the "true on both tools" rule stays intact and only the number changes. If it diverges, apply the same tool-agnostic treatment already documented here for agent counts (see FR-3). |
| `docs/design-system/components.md:32,64,68` | Component examples hardcode `42 skills` / `42/12` / `42/7` as illustrative `StatCard` values | must-change to match re-verified counts, kept as *illustrative* example values (not live data) |
| `docs/specification/01-overview.md:5` | Korean: `"...42개 skill과, tool별로 서로 다른 규모의 custom agent(Claude Code 12개, Codex 7개)를 제공하는..."` | must-change to re-verified counts |
| `docs/specification/02-features.md:33` | `"...42개 skill"처럼 Claude Code/Codex 공통으로 참인 수치만...` (headline acceptance-criteria item) | must-change to re-verified skill count |
| `docs/specification/02-features.md:34` | States the hero must not name a specific agent number, citing `Claude Code(12개)`/`Codex(7개)` as the reason | must-change agent counts cited as the rationale |
| `docs/specification/02-features.md:57` | `"Claude Code 42개 skill / 12개 agent, Codex 42개 skill / 7개 agent 수치가 노출된다"` | must-change to re-verified counts |
| `docs/specification/03-data.md:28` | Feature Item entity's "What it represents" example sentence: `예: "42개 skill", "12개 agent"` | must-change (example value, not live data) |
| `docs/specification/05-user-flows.md:10` | User-flow narrative: `"...tool별 skill/agent 규모(Claude Code 42개/12개, Codex 42개/7개)를 확인한다"` | must-change to re-verified counts |
| `docs/mission.md:15-16` | `"a distribution toolkit of 42 skills, plus 12 custom agents for Claude Code and 7 for Codex, hosted as a public GitHub..."` | must-change to re-verified counts |
| `CLAUDE.md:17` (this repo's root, not the global user CLAUDE.md) | `"a distribution toolkit of 42 skills and per-tool custom agents — 12 for Claude Code, 7 for Codex — published on GitHub"` | must-change to re-verified counts |
| `docs/design-templates/landing-page/messages.js` — 5 locale blocks at `hero_badge`/`hero_sub`/`fg_sub`/FAQ answer (en: lines 7,9,30,53; ja: 63,65,86,109; ko: 119,121,142,165; zh: 175,177,198,221; es: 231,233,254,277) | Standalone design-template file (header comment: "EN is the source of truth; others translated from it") hardcoding `"42 skills"`/localized equivalents and `12`/`7` agent counts across all 5 locale blocks — verified already fully synced to 42/12/7 by the precedent spec, confirming this file is live-maintained and must be kept in lockstep | must-change — follows the same source-of-truth-first pattern as `en.json`. **After editing all 5 locale blocks, manually diff each block's structure against `en`'s to confirm no block was skipped or left stale — `check-message-keys.mjs` does not cover this file, so this step has no automated safety net**, exactly as the precedent spec required. |
| `src/messages/*.json` `featureGrid.items` (10+8+12+7+5=42, matches stated 42 today — no pre-existing mismatch, unlike the precedent spec's discovery) | Verified: current arithmetic is already internally consistent | must-change only by *adding* the new category — no pre-existing gap to fix this time |
| (complement check) `grep -rn "ywc-iac-author\|ywc-infra-design\|ywc-infra-review\|ywc-infra-optimize\|ywc-cloud-engineer" src/` → no matches | No LP content currently references any of the 4 new skills or the new agent by name | confirms this spec's edits are purely additive/arithmetic — no existing wrong reference to correct |
| (complement check) `gh api repos/yongwoon/ywc-agent-toolkit/pulls/131 --jq '.state,.mergedAt'` (via `gh pr view`) → `OPEN` / `null` | Upstream PR not yet merged | this task's numeric edits must be gated on re-running this exact check at execution time, not on this spec's assumed post-merge numbers |
| (complement check) PR #131 file list: `claude-code/skills/ywc-{iac-author,infra-design,infra-review,infra-optimize}/**` and `codex/skills/ywc-{iac-author,infra-design,infra-review,infra-optimize}/**` both present; `claude-code/agents/ywc-cloud-engineer.md` and `codex/agents/ywc-cloud-engineer.toml` both added | All 4 skills and the 1 new agent ship symmetrically to both tools in the current diff | supports (but does not guarantee, per FR-1's re-verification requirement) the default assumption of a converged skill count and a matched +1 agent bump on both tools |

## Acceptance Criteria

> ⚠️ SUPERSEDED (AC1, AC2, AC4) by Iteration 1 — see §Iteration 1 Amendments → Fix 2, Fix 3.

- [ ] **AC1 — Ground truth re-verified before any numeric edit**: When implementation begins, the executor re-runs `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` and, if merged, `gh api repos/yongwoon/ywc-agent-toolkit/contents/{claude-code,codex}/skills` and `.../agents` (excluding non-skill/non-agent directories) to get the actual final skill/agent counts, rather than trusting this spec's assumed "46/13/8" split. Observable as: the PR/commit description for this work cites the exact command output used.
- [ ] **AC2 — Skill/agent counts consistent everywhere**: After the edit, every row marked **must-change** in the Existing Constraints Touched table states the same, re-verified counts. Rows marked "no change needed" or "(complement check)" are excluded. Observable as: `grep -rn "\b42\b\|\b12\b\|\b7\b" src/messages/*.json src/components/sections/hero.tsx docs/design-system/*.md docs/specification/0{1,2,3,5}-*.md docs/mission.md CLAUDE.md docs/design-templates/landing-page/messages.js` (adjusted to the actual re-verified numbers if FR-1 finds different ones) returns only the new, mutually consistent numbers in must-change files, with no stray "42"/"12"/"7" remaining in a skill/agent-count context.
- [ ] **AC3 — Hero never states a per-tool-wrong skill count**: If FR-1 finds the skill counts diverge per tool (not expected per the PR's symmetric file list, but possible if the PR changes before merge), the hero headline/eyebrow/demo line use tool-agnostic skill-count language (FR-3), mirroring the existing agent-count pattern. Observable as: `content-voice.md`'s hero rule is satisfied — no single hero string states one number that is wrong for either tool.
- [ ] **AC4 — Feature Grid category sum matches the stated total**: In every locale's `featureGrid.items`, the sum of all `"N skills"` category values equals the total stated in `featureGrid.description`, and the two `"N agents"` values match the re-verified per-tool agent counts. Observable as: manually summing the `value` fields in each of the 5 `messages/*.json` files equals the stated total; `featureGrid.title`'s category-count word matches the actual `items` array length in every locale.
- [ ] **AC5 — 5-locale key parity holds (for `src/messages/*.json`)**: `npm run build` completes without the `check-message-keys.mjs` prebuild step failing. Observable as: a clean `npm run build` exit code with no missing-key error printed.
- [ ] **AC6 — `docs/design-templates/landing-page/messages.js` manually verified in sync**: After editing all 5 locale blocks, a manual diff of each block's structure against `en`'s block shows no skipped or stale block. Observable as: the executor's verification notes list each of the 5 blocks' edited line numbers.
- [ ] **AC7 — No manual search-index edits**: `src/data/guidebook-search.*.json` are not hand-edited in the diff (this spec makes no guidebook content changes, so they should not appear in the diff at all). Observable as: `git status` / PR diff shows no changes under `src/data/guidebook-search.*.json`.

## Functional Requirements

> ⚠️ SUPERSEDED (FR-3's closing sentence, FR-4 in full) by Iteration 1 — see §Iteration 1 Amendments → Fix 1, Fix 3.

### FR-1: Ground-Truth Verification Step (must run first)

Before editing any file, the executor confirms PR #131's merge state and, once merged, re-derives the exact skill and agent counts per tool via the `gh` commands in AC1 — not by trusting this spec's provisional "46 skills / 13 Claude Code agents / 8 Codex agents" numbers, which were read from an in-flight, unmerged diff. If the final upstream numbers differ from this spec's assumption, every downstream FR below uses the re-verified numbers instead.

`ywc-task-generator` must emit this ground-truth verification as a **standalone first task**; every other task generated from this spec lists it under `Depends On`, so no numeric edit can execute before both the PR-merge-state check and the per-tool-count-convergence check resolve.

### FR-2: Skill/Agent-Count Copy Update

Update the numeric strings in every **must-change** row of the Existing Constraints Touched table to the re-verified counts (FR-1). `en.json` is edited first as source of truth, then ja/ko/zh/es are updated to match — each locale's own natural phrasing, not a mechanical string substitution. `docs/design-templates/landing-page/messages.js` follows the same source-of-truth-first pattern. **After editing all 5 locale blocks in `messages.js`, manually diff each block's structure against `en`'s block to confirm no block was skipped or left stale.**

### FR-3: Tool-Agnostic Hero Fallback (conditional on FR-1's result)

If FR-1 confirms the per-tool skill counts diverge (contrary to the PR's currently-symmetric file list), rewrite the hero headline, `SectionEyebrow`, and demo-install copy to state skill count without a tool-specific number (parallel structure to how `content-voice.md` already handles the agent-count split), and update `content-voice.md`'s own rule text to document that skill count is no longer a "true on both tools" hard constraint. Agent counts already use this tool-agnostic pattern in the hero today and require no further change beyond the Feature Grid's exact-number bump (FR-4).

### FR-4: Feature Grid Category and Agent-Count Reconciliation

Add one new `featureGrid.items` category — label "Infrastructure & Cloud" (or the executor's closest natural-language equivalent per locale) — sized as `new_skill_total − 42` (default 4, per FR-1's re-verified number). Apply consistently across en/ja/ko/zh/es. Bump the two existing agent-category values (`"12 agents"` → re-verified Claude Code count, `"7 agents"` → re-verified Codex count) in the same 5 files. **Also update `featureGrid.title`**'s category-count word (currently "Seven") to match the new `items` array length (default "Eight") in the same 5 files.

The new category's `description` should describe the *kind* of skill it broadly represents (infrastructure design, Terraform authoring, IaC/cloud review, cost and reliability optimization) without claiming to enumerate an exact, exhaustive skill list — no file in this repository maps individual skill names to `featureGrid.items` categories, so do not cite specific skill names as "proof" the count is correct (same guardrail the precedent spec established).

**`lane` assignment**: the current 7 entries split 4 `claude` / 3 `codex`. Assign the new category `lane: "codex"` for an even 4/4 visual balance across the resulting 8 tiles — a decorative grouping choice, not a claim of tool-exclusivity, since the infra suite ships identically to both tools.

## Non-Functional Requirements

- **i18n structural parity**: every edited JSON key must exist, with the same nesting, across all 5 locale files (enforced by `check-message-keys.mjs`; `docs/design-templates/landing-page/messages.js` requires the manual diff step from FR-2 since no automated gate covers it).
- **No behavioral/performance regression**: this is a content-only change; no new client-side JS, no new dependencies, no bundle-budget impact expected. Re-run `npm run verify:bundle` as a sanity check.
- **Design-system rule compliance**: any hero/Feature Grid copy change must satisfy `content-voice.md`'s existing "never let hero and Feature Grid contradict" rule.

## Data Model / API Contract

N/A — no schema, no API surface. Pure static content (JSON message catalogs + one JS message-object file + Markdown specification/mission docs).

## Edge Cases

- **Upstream skill/agent counts change before merge** (PR still open, subject to review changes) — FR-1's re-verification step protects against building this spec's provisional numbers into the LP prematurely.
- **Per-tool skill count divergence** (would contradict the PR's currently-symmetric file list, but review changes could introduce it) — governed by FR-3's tool-agnostic fallback; if this happens, `ywc-task-generator` must emit a single blocking task (mirroring the precedent spec's FR-5 divergence handling) rather than generating a numeric Feature Grid edit task on an unresolved divergence.
- **Feature Grid category reconciliation choice affects existing category boundaries** — adding an 8th tile changes the visual grid from 5 skill-categories + 2 agent-categories to 6 + 2. Verified: `feature-grid.tsx` is a pure `items.map()` with a responsive CSS grid and no fixed item-count assumption, so this requires no component code change.

## Open Questions

N/A — none identified. (The precedent spec's equivalent open question — new category vs. folding into an existing one — is resolved here identically: new category, sized purely by arithmetic, never by naming a specific skill roster.)

## Dependencies

- **Hard blocker**: PR #131 must actually merge on `yongwoon/ywc-agent-toolkit` before any numeric value in this spec's Scope can be safely finalized (FR-1). Content-only prep (identifying exact file locations, drafting category description prose) can proceed now; committing final numbers cannot.
- **No dependency on the sibling spec** `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md` — the two specs can execute in either order or in parallel; neither spec's Acceptance Criteria references an artifact the other spec creates.

## Iteration 1 Amendments

> Source: `ywc-spec-ready` Iteration 1 — `ywc-spec-validate` returned `DONE_WITH_CONCERNS` (Critical: 3, Warning: 3, Suggestion: 3; advisor calls used: 0 of 2). This section addresses the 3 Critical findings and the 2 Warnings that signal cross-section drift within the same edit surface. The remaining Warning (FR-2's "natural phrasing" requirement has no verifiable AC) and all 3 Suggestions are deferred — none block a `DONE` verdict (which requires zero Criticals), and none is fixed as an incidental side effect of the edits below.

### Fix 1 (Critical — Consistency): Divergence-handling logic contradicted itself in three places

**Failed requirement**: The original spec gave three mutually contradictory answers to "what happens to the Feature Grid category-add / title bump / agent-count bump if FR-1 finds skill counts diverge per tool?" — the `featureGrid.title` row said "leave this title's numeral logic to that fallback [FR-3]" (but FR-3 specifies no title logic anywhere); FR-3's closing sentence said the Feature Grid bump proceeds normally "regardless" of divergence; Edge Cases said the opposite — `ywc-task-generator` emits a single blocking task and no Feature Grid edit task is generated at all. FR-4 and AC4 themselves contained no conditional language, so none of these three claims had an actual operative mechanism.

**Amended approach** — FR-4 is now split into two explicit, mutually exclusive branches, mirroring the precedent spec's FR-5 divergence handling:

**FR-4 (amended, supersedes the original FR-4 in full):**

- **FR-4a (converged case — default, per PR #131's currently-symmetric file list)**: When FR-1's re-verification confirms the skill count is identical on both tools, proceed exactly as the original FR-4 described: add one new `featureGrid.items` category (label "Infrastructure & Cloud" or the executor's closest natural-language equivalent per locale, sized as `new_skill_total − 42`, default 4, `lane: "codex"`) across en/ja/ko/zh/es; bump the two existing agent-category values (`"12 agents"` → re-verified Claude Code count, `"7 agents"` → re-verified Codex count); bump `featureGrid.title`'s category-count word (default "Seven" → "Eight") in the same 5 files. The category's `description` still must not name a specific skill roster as "proof" of the count (unchanged guardrail from the original FR-4).
- **FR-4b (diverged case)**: When FR-1 finds the skill counts differ per tool, `ywc-task-generator` must emit **one single blocking task** — "Resolve per-tool Feature Grid skill-count divergence" — with no other task in this spec's task set permitted to edit `featureGrid.items`, `featureGrid.title`, or the two agent-category values until a human explicitly resolves which number(s) to use. No numeric Feature Grid edit task is generated in the same task-generation pass. The `featureGrid.title` bump does not happen in this branch (title stays "Seven categories..." until the blocking task resolves).

**AC4 (amended, supersedes the original AC4 in full):**

- [ ] **AC4a — Feature Grid category sum matches the stated total (converged case)**: When FR-1 confirms converged per-tool skill counts, in every locale's `featureGrid.items`, the sum of all `"N skills"` category values equals the total stated in `featureGrid.description`, and the two `"N agents"` values match the re-verified per-tool agent counts. `featureGrid.title`'s category-count word matches the actual `items` array length in every locale. Observable as: manually summing the `value` fields in each of the 5 `messages/*.json` files equals the stated total.
- [ ] **AC4b — No Feature Grid numeric edit ships on unresolved divergence**: When FR-1 finds diverged per-tool skill counts, `git diff` / the generated task set shows no edit to `featureGrid.items`, `featureGrid.title`, or the two agent-category values outside the single blocking task from FR-4b. Observable as: the blocking task exists in the task directory and is the sole task with write scope over those fields.

**Existing Constraints Touched — `featureGrid.title` row (amended, supersedes the original row in full):**

| `src/messages/en.json:113` (`featureGrid.title`) | `"Seven categories, one pipeline, two tools."` — matches current 7 `items` entries (5 skill + 2 agent categories, verified by counting) | must-change **only under FR-4a** (converged case) — becomes "Eight" in lockstep with the new category. Under **FR-4b** (diverged case), this row is untouched until the blocking task resolves — no edit task targets it in the initial task-generation pass. |

**FR-3's closing sentence (amended, supersedes the original sentence in full):** "Agent counts already use this tool-agnostic pattern in the hero today. Under FR-4a they require no further change beyond the Feature Grid's exact-number bump; under FR-4b, no agent-count or title edit ships until the blocking task resolves the skill-count divergence, per FR-4b."

### Fix 2 (Critical — Completeness): AC2's grep silently false-passes on Korean digit-glued numbers

**Failed requirement**: AC2's `grep -rn "\b42\b\|\b12\b\|\b7\b" ...` returns zero matches against `docs/specification/01-overview.md`, `02-features.md`, `03-data.md`, `05-user-flows.md` under the default UTF-8 locale, because `\b` does not treat the Korean counter suffix ("개") as a word boundary after the digit. Empirically verified: `grep -nE "\b42\b" docs/specification/01-overview.md` returns nothing under UTF-8 but matches under `LC_ALL=C`. An executor who runs the literal AC2 command would see a clean, empty result for these 4 Korean-language files and wrongly conclude the sync is complete even if the Korean numbers were never edited.

**Amended AC2 (supersedes the original AC2 in full):**

- [ ] **AC2 — Skill/agent counts consistent everywhere.** After the edit, every row marked **must-change** in the Existing Constraints Touched table states the same, re-verified counts. Rows marked "no change needed" or "(complement check)" are excluded. Observable as three separate checks (do not rely on one combined pattern — old and new numbers do not overlap the way 41/42 did in the precedent spec, and `\b` is locale-sensitive against Korean digit-suffix text):
  1. **Negative check, English/JSON must-change files**: `LC_ALL=C grep -rn -E "\b42\b|\b12\b|\b7\b" src/messages/*.json src/components/sections/hero.tsx docs/design-system/*.md docs/mission.md CLAUDE.md docs/design-templates/landing-page/messages.js` returns no hits in a skill/agent-count context (hits like "7 primitives" or a decimal "1.7" are not count-context and may be ignored, but must be manually triaged, not assumed absent).
  2. **Negative check, Korean spec docs**: `grep -rn -E "42개|12개|7개" docs/specification/0{1,2,3,5}-*.md` returns no hits.
  3. **Positive check, both file sets**: re-run checks 1 and 2 with the FR-1 re-verified new numbers substituted (e.g. if re-verified as 46/13/8: `LC_ALL=C grep -rn -E "\b46\b|\b13\b|\b8\b" <same English/JSON file set>` and `grep -rn -E "46개|13개|8개" <same Korean file set>`) and confirms hits appear only in the must-change locations named in the Existing Constraints Touched table.

### Fix 3 (Critical — Feasibility): FR-1/AC1's ground-truth command is syntactically invalid and its exclusion rule silently overcounts

**Failed requirement**: (a) `gh api repos/yongwoon/ywc-agent-toolkit/contents/{claude-code,codex}/skills` as literally written brace-expands into two positional arguments before `gh api` sees it, and `gh api` only accepts one endpoint arg — confirmed by direct execution (`accepts 1 arg(s), received 2`). (b) The instruction "(excluding non-skill/non-agent directories)" is underspecified: live inspection of `yongwoon/ywc-agent-toolkit` shows `claude-code/skills`/`codex/skills` each contain 2 non-skill directories (`references/`, `scripts/`) with the same `type: "dir"` as real skill folders — a type-only filter overcounts skills by 2 per tool (48 vs. actual 46). The `agents` endpoints are contaminated by non-agent **files** (`CLAUDE.md`, several `README*.md` in claude-code; one `README.md` in codex), not directories — "excluding non-skill/non-agent directories" would not catch these, overcounting Claude Code agents as 18 (vs. actual 13) and Codex agents as 9 (vs. actual 8).

**Amended AC1 (supersedes the original AC1 in full):**

- [ ] **AC1 — Ground truth re-verified before any numeric edit**: When implementation begins, the executor re-runs `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` and, if merged, runs **four separate** `gh api` calls (not a single braced command): `gh api repos/yongwoon/ywc-agent-toolkit/contents/claude-code/skills`, `gh api repos/yongwoon/ywc-agent-toolkit/contents/codex/skills`, `gh api repos/yongwoon/ywc-agent-toolkit/contents/claude-code/agents`, `gh api repos/yongwoon/ywc-agent-toolkit/contents/codex/agents`. For the two `/skills` responses, count only entries where `type == "dir"` AND `name` starts with `ywc-` (excludes `references/`, `scripts/`, and any other non-skill directory). For the two `/agents` responses, count only entries whose `name` matches a `ywc-*` agent file pattern (`.md` for Claude Code, `.toml` for Codex) — excludes `CLAUDE.md`, any `README*.md`, and any other non-agent file. Rather than trusting this spec's assumed "46/13/8" split, use these exact counts. Observable as: the PR/commit description for this work cites the four raw `gh api` command outputs and the applied filter, not just the final numbers.

### Fix 4 (Warning — Completeness): `docs/design-system/README.md:58` missing from must-change list

**Failed requirement**: `docs/design-system/README.md:58` states `"Hero says "expert agents" (agent counts differ 12/7); exact counts only in the feature grid."` — the same 12/7 fact `content-voice.md` and root `CLAUDE.md` already document — but was absent from Scope's file list and the Existing Constraints Touched table, even though AC2's own `docs/design-system/*.md` glob matches it.

**Amendment**: Add to Scope's file list and to Existing Constraints Touched (new row, does not supersede any existing row):

| `docs/design-system/README.md:58` | `"Hero says "expert agents" (agent counts differ 12/7); exact counts only in the feature grid."` | must-change to re-verified agent counts, consistent with the identical fact already tracked in `content-voice.md` and root `CLAUDE.md` |

### Re-run of Step 4b.5 (Pass A + Pass B) on the whole spec

- **Pass A (cross-section consistency)**: Re-checked AC4a/AC4b against FR-4a/FR-4b (now 1:1 mapped, no orphan branch); re-checked the `featureGrid.title` row against FR-4a/FR-4b (now consistent — title only bumps under FR-4a); re-checked AC2's three-part check against FR-2's requirement (now covers both English/JSON and Korean file sets with locale-correct patterns); re-checked AC1 against FR-1 (four explicit `gh api` calls, explicit filter, both now match). No new orphan AC/FR pairs introduced.
- **Pass B (claim ↔ reality verification)**: The amended AC1's exclusion filter (`type=="dir"` AND `name` starts with `ywc-` for skills; `ywc-*.md`/`.toml` for agents) was verified against the actual current directory contents of `yongwoon/ywc-agent-toolkit` at amendment time (46 skill dirs each tool, 13 Claude Code agent files, 8 Codex agent files — matching this spec's original provisional default exactly). The amended AC2's `LC_ALL=C` requirement and Korean-suffix pattern were both verified empirically against the actual specification files. No new "follows X" or closure/liveness claims were introduced by this amendment.

No fresh drift found. This amendment is ready for re-validation.
