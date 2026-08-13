# Add a "Recent updates" section sourced from `ywc-agent-toolkit`'s CHANGELOG.md

> Status: Draft
> Scale: Medium
> Created: 2026-08-13
> Author: ywc-plan (Claude)
> Spec Reference: `N/A — no docs/specification section owns this; this is a new capability proposed after benchmarking aihero.dev's /skills page "What changed recently" section, not a change to an existing spec'd requirement.`
> Related: `docs/ywc-plans/20260813-llms-txt-agent-catalog.md` (sibling spec from the same benchmarking review; independent feature, no shared code path other than both extending the `prebuild` script chain)

## Purpose

aihero.dev's `/skills` page includes a "What changed recently" section listing the last several release entries (version, date, one-line highlights) with links to full release notes — a lightweight, low-cost trust signal that the product is actively maintained, and a natural reason for a returning visitor to check back.

`ywc-agent-toolkit` already produces exactly the raw material for this: a release-please-generated `CHANGELOG.md` (currently at `v1.32.0`, with an `Unreleased` section actively accumulating entries) following the Keep a Changelog format. This spec adds a "Recent updates" section to the landing page that parses the top few tagged releases from that file at build time and renders them as static markup — reusing the toolkit's existing release process with no new authoring burden.

## Scope

- New build script `scripts/generate-toolkit-changelog.mjs`, wired into the existing `prebuild` chain in `package.json`, that:
  1. Fetches `https://raw.githubusercontent.com/yongwoon/ywc-agent-toolkit/main/CHANGELOG.md` (single request, no GitHub API rate-limit exposure).
  2. Parses the file by splitting on `^## ` headings, keeping only entries that have both a version number and a parseable date (excluding the leading `## Unreleased` block, which has neither) — see Edge Cases.
  3. Takes the top **5** such entries (most recent first — file order is already newest-first, verified during investigation).
  4. For each entry, extracts up to 3 bullet lines from its `### Added` / `### Changed` / `### Fixed` subsections (in that priority order, combined across subsections up to the 3-item cap), stripping the trailing `([#NNN](...)) ([hash](...))` PR/commit-link noise for landing-page readability.
  5. Writes `src/data/toolkit-changelog.json` (committed cache/fallback file, same role as `src/data/github-stats.json`) and, on any fetch failure, falls back to the last-committed copy without failing the build.
- New `ChangelogSection` component (`src/components/sections/changelog.tsx`) rendering the parsed entries as a list of version/date/highlights cards, with a "Full history on GitHub" link to `https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md`.
- Wire `ChangelogSection` into `src/app/[locale]/page.tsx`, positioned between `<SocialProof />` and `<Faq />` — placed after Social Proof (numeric trust) and before FAQ (objection handling), so the page's trust-building block reads: stats → recent activity → FAQ.
- New i18n keys under a `changelog` namespace in `src/messages/{en,ja,ko,zh,es}.json` for the section's own chrome (eyebrow, title, description, "Full history on GitHub" label) — the changelog entry content itself (version titles/highlights) stays English-only across all locales (see Edge Cases).

## Out of Scope

- A dedicated Guidebook changelog page (e.g. a new `19-changelog.md`) — this spec places the section on the landing page only, matching the "1-page landing page" scope decision in `docs/specification/01-overview.md`. A Guidebook page is a larger, separate decision (new nav entry, renumbering cascade per the precedent in `docs/ywc-plans/guidebook-auth-implement-page.md`) and not requested here.
- An RSS feed for the changelog — this project has no feed infrastructure and no other syndicated content; out of scope per the same reasoning as the sibling `llms.txt` spec.
- Translating individual changelog entry content (version highlights) into ja/ko/zh/es — explicitly deferred; see Edge Cases for the stated asymmetry.
- Any change to `ywc-agent-toolkit`'s own `CHANGELOG.md` format or release-please configuration — this spec only reads that file as-is.
- Historical changelog entries beyond the most recent 5 (no "load more" / pagination) — the "Full history on GitHub" link is the only path to older entries.

## Existing Constraints Touched

| Existing artifact | Behavior (verified by reading the file) | Change classification |
|---|---|---|
| `scripts/fetch-github-stars.mjs` | Fetch → cache-to-JSON → fallback-on-failure pattern; never throws on network failure | pattern to reuse — new script follows the identical shape |
| `package.json:7` (`"prebuild"` script) | `node scripts/fetch-github-stars.mjs && node scripts/generate-search-index.mjs && node test/check-guidebook-nav-registration.mjs && node scripts/check-message-keys.mjs` | must-change — append `&& node scripts/generate-toolkit-changelog.mjs` to this chain (order relative to `generate-llms-txt.mjs`, if that sibling spec is implemented too, does not matter — independent scripts) |
| `src/app/[locale]/page.tsx` | `<Hero /> <ProblemSolution /> <Pipeline /> <FeatureGrid /> <InstallSteps /> <SocialProof /> <Faq />` — flat ordered list of section components | must-change — insert `<ChangelogSection />` between `<SocialProof />` and `<Faq />` |
| `src/components/sections/social-proof.tsx` | Server component (`async function SocialProof()`), fetches translations via `getTranslations`, reads a committed JSON data file (`github-stats.json`) directly (not via prop/fetch) | pattern to reuse — `ChangelogSection` follows the identical server-component + committed-JSON-import shape, no new client-side data fetching |
| `src/messages/en.json` `footer.groups` → "Resources" group | Already links to `CHANGELOG.md` on GitHub (`{ "label": "CHANGELOG", "target": "https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md" }`) | no change needed — this existing external link remains; the new on-page section is additive, not a replacement, and both can coexist (footer = quick external jump, new section = in-page preview) |
| `scripts/check-message-keys.mjs` | Fails the build on any leaf-key mismatch between `en.json` and the other 4 locale files | comply — new `changelog.*` keys must land in all 5 locale files in the same task |
| `ywc-agent-toolkit/CHANGELOG.md` (verified via local checkout, 513 lines) | Keep a Changelog format; starts with `## Unreleased` (no date, in-progress entries), followed by dated/tagged entries like `## [1.32.0] (2026-08-12)` and `## [1.31.0](https://github.com/.../compare/v1.30.1...v1.31.0) (2026-07-30)` — note the tag-comparison-link format is NOT always present (the `[1.32.0]` entry has no link, `[1.31.0]` does) | must-handle — the version-heading regex must tolerate both `## [X.Y.Z] (date)` and `## [X.Y.Z](url) (date)` shapes; do not assume every version number is a link |
| `docs/specification/06-requirements.md` §Web Performance (via `rules/web/performance.md`) | Landing page JS budget < 150kb gzipped | comply — `ChangelogSection` is a server component rendering static markup with zero client JS, so it does not consume this budget; `test/build-verification/check-bundle-budget.mjs` (`npm run verify:bundle`) must still pass unchanged |

## Acceptance Criteria

- **AC1**: Running `npm run prebuild` with network access produces `src/data/toolkit-changelog.json` containing the 5 most recent dated/tagged `CHANGELOG.md` entries (excluding `## Unreleased`), each with `{ version, date, url, highlights: string[] }`.
- **AC2**: The landing page (all 5 locales) renders a "Recent updates" (or localized equivalent) section between Social Proof and FAQ, listing each parsed entry's version, date, and highlights, plus a "Full history on GitHub" link.
- **AC3**: When the `CHANGELOG.md` fetch fails, `npm run prebuild` still completes, and the section renders from the last-committed `src/data/toolkit-changelog.json` rather than failing the build or rendering an empty section.
- **AC4**: `npm run verify:bundle` passes with no budget regression (new section adds no client-side JS).
- **AC5**: `scripts/check-message-keys.mjs` passes — new `changelog.*` message keys exist in all 5 locale files.

## Functional Requirements

- **FR1**: `scripts/generate-toolkit-changelog.mjs` MUST fetch `CHANGELOG.md` via a single `raw.githubusercontent.com` request (no GitHub REST API call, so no rate-limit exposure for this script).
- **FR2**: The parser MUST split on `^## ` headings and classify each block as a real release entry only if the heading text contains both a `[X.Y.Z]`-shaped version token and a trailing `(YYYY-MM-DD)`-shaped date — this excludes `## Unreleased` (no date) by construction, with no special-cased string match on the literal word "Unreleased" required.
- **FR3**: For each retained entry, the version-heading regex MUST accept both `## [X.Y.Z] (date)` and `## [X.Y.Z](url) (date)` forms (verified both exist in the source file — see Existing Constraints Touched), extracting the version number and date in either case, and discarding the `(url)` portion if present (the rendered card links to the toolkit's `CHANGELOG.md#` anchor, not to a GitHub compare view).
- **FR4**: Highlight extraction MUST pull bullet lines (`* ` or `- ` prefixed) from `### Added`, `### Changed`, `### Fixed` subsections in that priority order, capped at 3 total per entry, with each line's trailing ` ([#NNN](...)) ([hash](...))` markdown-link noise stripped via regex before display.
- **FR5**: The script MUST write `src/data/toolkit-changelog.json` as the committed cache/fallback, and `ChangelogSection` MUST import that JSON directly (server-component static import, matching `SocialProof`'s `github-stats.json` pattern) rather than fetching at request time — this is a static export site with no server to fetch from at runtime.
- **FR6**: `ChangelogSection`'s per-entry "read more" / version link MUST point to `https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md#<slugified-version-heading>` (GitHub auto-generates heading anchors), and the section's closing link MUST point to the unanchored `CHANGELOG.md` URL for full history.

## Non-Functional Requirements

- **Build resilience**: A `CHANGELOG.md` fetch failure must never fail `npm run build`, matching the existing star-count script's contract.
- **No new runtime dependency**: Static server-rendered markup; zero client JS; no bundle-budget impact.
- **i18n asymmetry is explicit, not accidental**: Every other piece of visible page copy in this project is fully localized across 5 locales (per `docs/specification/01-overview.md`'s stated goal of lowering the entry barrier for non-English developers). This section's chrome (headings, labels) follows that norm, but the changelog entry content itself does not — it is sourced from an English-only upstream file with no translation pipeline. This spec accepts that asymmetry rather than building a translation step for auto-generated release notes; see Edge Cases for the reasoning.

## Data Model / API Contract

`src/data/toolkit-changelog.json` (illustrative — values are the real, most-recent entries in the toolkit's public `CHANGELOG.md` as of this spec's investigation):

```json
{
  "generatedAt": "2026-08-13",
  "entries": [
    {
      "version": "1.32.0",
      "date": "2026-08-12",
      "url": "https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md#1320-2026-08-12",
      "highlights": [
        "context safety: add executable evaluation coverage for verified artifact authority, non-interactive closure, context handoff, claim isolation, and privacy boundaries across the affected Codex skills.",
        "Codex distribution: synchronize the eight affected skills, release metadata, and generated plugin bundle for the context-safety contract."
      ]
    },
    {
      "version": "1.31.0",
      "date": "2026-07-30",
      "url": "https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md#1310-2026-07-30",
      "highlights": [
        "add ywc-adr, ywc-implement skills and Codex SDLC v1.1 gap closure",
        "ywc-brainstorm: add self-review pass and existing-code guidance",
        "ywc-security-engineer: promote to Opus tier, remove Phase 2 escalation"
      ]
    }
  ]
}
```

## Edge Cases

- `## Unreleased` section (present today, confirmed in investigation) → excluded by FR2's date-presence rule; never rendered, since an in-progress, unversioned entry reads as "unfinished" to a marketing-page visitor and could reference a skill not yet actually released.
- A release entry has bullets under only one subsection (e.g. `v1.30.1` in the source file has only `### Fixed`, verified during investigation) → still rendered normally; FR4's cap simply yields fewer than 3 highlights for that entry.
- An individual bullet line is very long (some `CHANGELOG.md` entries wrap full sentences, others are terse) → truncate rendered text at a fixed character budget (recommend ~140 chars) with an ellipsis, matching the copy-length conventions already used in `feature-grid`/`pipeline` card descriptions.
- `CHANGELOG.md` is English-only; this section's entry content (version highlights) is NOT translated for ja/ko/zh/es locales — only the section's own UI chrome is. This mirrors how the GitHub star count is a raw, untranslated number embedded in an otherwise fully-localized page; unlike the star count, this is a deliberate scope decision (not a "nothing to translate" numeric-field case) and should be called out explicitly to whoever reviews this spec, since it is the one place this landing page ships English-only prose by design.
- Fewer than 5 dated entries exist in the source file (unlikely given 513 lines / v1.32.0 history, but possible for a fresh fork) → render however many are found; do not pad or error.

## Open Questions

- Whether 5 is the right number of entries to show, versus aihero.dev's own choice of 5 on `/skills` (this spec matches that count as a reasonable default, not a hard requirement) — confirm before implementation.
- Whether the section should also appear on the Guidebook (out of scope here per the Scope section) once the landing page version ships and its value is validated.
- Whether future toolkit releases might introduce a `## Unreleased` entry that later needs a "Breaking" or "Security" subsection FR4 does not currently prioritize — not a concern with the current file's subsection set (`Added`/`Changed`/`Fixed`/`Removed` per Keep a Changelog), but worth re-checking if the toolkit's changelog conventions evolve.

## Dependencies

None new. Reuses Node's built-in `fetch`. No dependency on the sibling `20260813-llms-txt-agent-catalog.md` spec — both extend `prebuild` independently and can be implemented/merged in either order.
