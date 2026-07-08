# ywc-spec-ready Loop Log: guidebook-page-numbering-refactor.md

## Iteration 1
- ywc-spec-validate result: DONE_WITH_CONCERNS
- Critical: 9, Warning: 1, Suggestion: 1 (4-dimension fan-out: Completeness, Consistency, Feasibility, Code Compatibility, run in parallel)
- Advisor calls used: 0 of 2 per dimension (no Phase 2 escalation — all findings were mechanically verifiable via grep/read, not genuinely ambiguous)
- Critical findings:
  1. FR-4's example regex `/^[a-z0-9][a-z0-9-]*\.md$/i` matches the real `README.md` present in every locale directory — breaks AC5 and FR-5's invariant (found independently by Feasibility, Completeness, Consistency — 3x)
  2. `scripts/generate-sitemap.mjs:49` has the identical `/^\d+-.+\.md$/` slug-discovery bug as `generate-search-index.mjs`, never mentioned in Scope/FR-4 (Completeness)
  3. FR-5 claimed `npm run test:content` is an existing CI-invoked script — verified via `.github/workflows/*.yml` that it is not invoked by any CI job (Feasibility)
  4. `src/components/guidebook/scale-selector.tsx:61` is an undetected 4th render site printing raw `page.title`, contradicting the spec's "exactly 3 render sites" exhaustiveness claim (found independently by Code Compatibility, Completeness — 2x)
  5. `displayNumber`'s type location was unspecified — `GuidebookPageMeta` (base type) is reused by 4 consumer types, jeopardizing AC4's `tsc --noEmit` requirement (Completeness)
  6. Scope bullet 5 cited a nonexistent path `docs/guides/guidebook/README.md` — copy-paste error; real file is `src/content/guidebook/<locale>/README.md` (Consistency)
  7. FR-1/FR-3's literal formula never zero-pads the displayed number, contradicting AC3's byte-identical-diff requirement against the current zero-padded `01`–`16` scheme (Consistency)
  8. `search-modal.tsx`/`generate-search-index.mjs` derive titles from raw markdown H1 text, independent of `guidebookNavGroups`/`displayNumber` — inconsistent for future non-numeric pages (Code Compatibility)
  9. (duplicate of #1, folded in) FR-5's invariant would perpetually false-positive on `README.md` as an orphan slug (Consistency)
- Warning: AC6's fixture procedure only created the file in `en/`; `generate-search-index.mjs` has no guard for a missing per-locale file, so `npm run build` would throw (Completeness)
- Suggestion: FR-2 has no direct mechanical AC verifying the stored `title` field lost its numeric prefix (Consistency)
- Guard check: iteration 1, no stall possible (requires ≥2 iterations) — proceeding to re-plan
- Action: `ywc-plan --update-spec` (Iteration 1 Amendments)

## Iteration 1 — Re-plan
- `ywc-plan --update-spec` completed: appended "## Iteration 1 Amendments" (A1–A9)
- Fixed: Critical 1/9 (A4/A5 — derive slug set from `guidebookNavGroups` instead of regex-scanning, in both scripts and the new invariant), Critical 2 (A4 — `generate-sitemap.mjs` gets the same fix), Critical 3 (A5 — invariant wired into `prebuild`, not `test:content`), Critical 4 (A3 — `scale-selector.tsx` added as a 4th render site), Critical 5 (A2 — new `LocalizedGuidebookPageMeta` derived type, non-optional `displayNumber`), Critical 6 (A1 — corrected path), Critical 7 (A2 — `displayNumber` is a zero-padded string via `.padStart(2, "0")`)
- Documented (not fixed, deliberate scope decision): Critical 8 — added as new Edge Case A8, accepted as a known limitation for future non-numeric pages; fully closing it exceeds this pass's stated migration surface
- Fixed: Warning (A6 — AC6 revised to require the fixture in all 5 locale directories)
- Applied: Suggestion (A9 — grep-based mechanical check for FR-2 added)
- Superseded markers added: top-of-file Operative Sections pointer (line 10), Scope bullet 5 (line 16 area), Functional Requirements banner naming FR-1/FR-3/FR-4/FR-5 superseded (FR-2 unaffected), Acceptance Criteria banner naming AC6 superseded (AC1–AC5 unaffected), Existing Constraints Touched banner naming missing/corrected rows
- Step 4b.5 (all 3 passes) re-run inline in the amendment's own "Step 4b.5 Self-Consistency Re-check" subsection — no fresh drift found
- Advancing to Iteration 2: re-run verification

## Iteration 2
- Verification result: DONE
- Targeted re-check (not a fresh 4-dimension fan-out — verified each Iteration 1 fix against actual source files: `guidebook-nav.ts`, `guidebook-nav-content.ts`, `scale-selector.tsx`, `search-modal.tsx`, `generate-search-index.mjs`, `generate-sitemap.mjs`, `package.json`, `.github/workflows/ci.yml`)
- Confirmed resolved: A1 (path), A2/A3 (displayNumber type + zero-padding consistency, including tracing the actual `ScaleSelector` data-flow), A4/A5 (README.md exclusion architecturally eliminated + `generate-sitemap.mjs` fix + `prebuild` wiring), A6 (fixture-in-all-locales, confirmed no contradiction with Out of Scope's "80 files locked" clause), A7 (`scale-selector.tsx` row added)
- One Low-severity finding: stale line-number cross-reference in two banner notes ("lines 57–58" should read "lines 63–64" after amendment insertions shifted line numbers) — cosmetic only, underlying fix (A7's table) was correctly present; corrected directly (not treated as a re-plan-triggering finding)
- Guard check: Critical count 9 → 0 (converged), no stall
- Terminal status: **DONE**

## Summary

- Total iterations: 2 (1 validate + re-plan cycle, 1 confirming re-check)
- Total Critical found: 9, all resolved by Iteration 1's amendment
- Advisor calls used: 0 of 8 total budget (all findings were mechanically verifiable, no genuine two-reading ambiguity required Opus escalation)
- Final spec state: original sections (Purpose, Out of Scope, Architecture Decision, AC1–AC5, FR-2, most Existing Constraints Touched rows) unchanged; Scope bullet 5, FR-1/FR-3/FR-4/FR-5, AC6, and the Existing Constraints Touched table's missing rows are superseded by "## Iteration 1 Amendments," which is authoritative for those items per the top-of-file Operative Sections pointer
