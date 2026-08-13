# Publish `public/llms.txt`: a build-time-generated skill/agent catalog for AI agents

> Status: Draft
> Scale: Medium
> Created: 2026-08-13
> Author: ywc-plan (Claude)
> Spec Reference: `N/A — no docs/specification section owns this; this is a new capability proposed after benchmarking aihero.dev's footer "Agents" resources (sitemap.md/llms.txt/skills.md/rss.xml), not a change to an existing spec'd requirement.`
> Related: `docs/ywc-plans/20260813-changelog-section.md` (sibling spec from the same benchmarking review; independent feature, no shared code path other than both extending the `prebuild` script chain)

## Purpose

`ywc-agent-toolkit-lp` markets a toolkit whose entire product is "skills and agents that AI coding agents install and invoke." Today the site itself offers nothing an AI agent can machine-parse — only human-oriented HTML pages. aihero.dev, a comparable AI-coding-skills marketing site, resolves this by publishing `llms.txt`/`skills.md`/`sitemap.md` and linking them from a dedicated footer "Agents" section, explicitly treating agents as a first-class audience alongside human visitors.

This spec adds a build-time-generated `public/llms.txt` — a plain-Markdown catalog of every skill and agent in `ywc-agent-toolkit` (Claude Code + Codex), following the [llms.txt convention](https://llmstxt.org) — and a corresponding footer link, so the product's own value proposition ("built for agents") is reflected in the page that markets it.

## Scope

- New build script `scripts/generate-llms-txt.mjs`, wired into the existing `prebuild` chain in `package.json` (alongside `fetch-github-stars.mjs`), that:
  1. Fetches the `ywc-agent-toolkit` repo's file tree via the GitHub Trees API (`GET /repos/yongwoon/ywc-agent-toolkit/git/trees/main?recursive=1`, 1 API call).
  2. Filters to skill directories containing a `SKILL.md` under `claude-code/skills/*` and `codex/skills/*`, and agent files under `claude-code/agents/*.md` and `codex/agents/*.md` (excluding `README*.md`, `CLAUDE.md`, `AGENTS.md`).
  3. Fetches each matched file's raw content via `raw.githubusercontent.com/yongwoon/ywc-agent-toolkit/main/<path>` (bounded concurrency, e.g. 8 in flight), parses YAML frontmatter with the existing `gray-matter` dependency, and extracts `name` + a truncated one-line summary derived from `description` (see Data Model).
  4. Writes the parsed catalog to `src/data/agent-catalog.json` (cache/fallback source, mirroring `src/data/github-stats.json`'s role) and renders `public/llms.txt` from that cache.
  5. On any network failure (tree API, individual raw fetch, or timeout), falls back to the last-committed `src/data/agent-catalog.json` and regenerates `public/llms.txt` from it without failing the build — same resilience contract as `scripts/fetch-github-stars.mjs`.
- New footer link group ("Agents" or its localized equivalent) added to `footer.groups` in `src/messages/{en,ja,ko,zh,es}.json`, containing one entry linking to `/llms.txt`.
- `public/llms.txt` ships at the site root (not locale-prefixed) since `output: 'export'` copies `public/` verbatim into `out/`; no `route.ts` or server logic needed.

## Out of Scope

- `skills.md` (llms.txt's fuller companion file per the convention) — deferred; `llms.txt` alone satisfies the "agent-readable catalog" goal for v1. Revisit only if `llms.txt`'s single-line-per-entry format proves insufficient.
- `sitemap.md` — the project already generates `sitemap.xml` per `docs/specification/06-requirements.md`; a separate Markdown sitemap is not requested here.
- `rss.xml` — this project has no blog/post feed (per `CLAUDE.md`, documentation-only content model), so there is no content to syndicate.
- Any change to how skills/agents are documented inside this project's own Guidebook (`14-skill-reference.md` etc.) — `llms.txt` is a separate, purely mechanical export, not a rewrite of the curated human-facing catalog.
- Reconciling the exact skill/agent counts shown in the Hero/Feature Grid ("46 skills", "13 agents") against the live counts this script will discover — see Open Questions; that reconciliation is a separate, pre-existing staleness concern, not created by this spec.
- Any change to `ywc-agent-toolkit` itself (e.g., adding a canonical short-description field to `SKILL.md` frontmatter) — this spec only reads that repo's public content as-is.

## Existing Constraints Touched

| Existing artifact | Behavior (verified by reading the file) | Change classification |
|---|---|---|
| `scripts/fetch-github-stars.mjs` | Fetches `https://api.github.com/repos/yongwoon/ywc-agent-toolkit`, on failure falls back to the last value cached in `src/data/github-stats.json` (or `0` if none), never throws — the exact resilience pattern this spec's new script must replicate | pattern to reuse — new script follows the same fetch → cache-to-JSON → fallback-on-failure shape |
| `package.json:7` (`"prebuild"` script) | `node scripts/fetch-github-stars.mjs && node scripts/generate-search-index.mjs && node test/check-guidebook-nav-registration.mjs && node scripts/check-message-keys.mjs` | must-change — append `&& node scripts/generate-llms-txt.mjs` to this chain |
| `src/data/github-stats.json` | `{ "stars": 8 }`, single-purpose cache file consumed by `SocialProof`/`SiteHeader` React components | pattern to reuse for `src/data/agent-catalog.json`'s shape (JSON committed to the repo, safe to be stale between builds) |
| `src/messages/en.json` `footer.groups` | Array of `{ title, links: [{ label, target }] }`; existing groups are "Product" and "Resources"; "Resources" already links to `CHANGELOG.md` on GitHub (external, `target` starting with `http`) | must-change — append one new group object to this array, in all 5 locale files |
| `src/components/sections/site-footer.tsx` | > ⚠️ SUPERSEDED by Iteration 1 — see Iteration 1 Amendments. Fully data-driven: iterates `t.raw("groups")`, resolves `isExternalLink(target)` to decide `target="_blank"`/`rel="noreferrer"` vs. `resolveLocalizedHref` | ~~no change needed~~ — see Iteration 1 Amendments (FR8) for the corrected classification |
| `scripts/check-message-keys.mjs` | Diffs leaf-key sets between `en.json` (source of truth) and `ja/ko/zh/es.json`; a missing key in any locale fails the build | comply — the new footer group's `title`/`label` keys must be added to all 5 locale files in the same task, or `prebuild` fails as designed |
| `package.json` `dependencies` | `gray-matter@^4.0.3` already installed (used elsewhere for MDX/guidebook frontmatter) | reuse — no new dependency needed for frontmatter parsing |
| `docs/specification/06-requirements.md:46` | Build-time `sitemap.xml` + `robots.txt` generation already spec'd and implemented (`scripts/generate-sitemap.mjs`) | precedent — confirms build-time-generated root-level static files are an established pattern in this project, not a new category of risk |
| `claude-code/skills/` (in `ywc-agent-toolkit`, verified via local checkout) | 51 directory entries; 2 are not skills (`references/`, `scripts/`) and one is `CLAUDE.md` (a file, not a dir) — only directories containing `SKILL.md` are real skills | must-filter — the tree-walk must check for `SKILL.md` presence, not just directory listing |
| `claude-code/agents/` (verified via local checkout) | 14 `.md` files including `README.md` (a catalog doc, not an agent) | must-filter — exclude `README*.md`, `CLAUDE.md`, `AGENTS.md` by filename |
| `codex/skills/`, `codex/agents/` (verified via local checkout) | 52 and 8 entries respectively (same `README.md`-exclusion caveat applies) | same filter rule applies to the Codex-side tree |
| A sample `SKILL.md` frontmatter (`ywc-adr`, verified) | `description` is a long multi-line YAML block-scalar containing a mission statement, "Triggers: ..." list, and "Do not use for: ..." clause — not a short one-liner | must-handle — Functional Requirements below define a truncation rule; a curated short-description source (e.g. a root `README.md` skills table) was not conclusively located during this spec's investigation and is left as an Open Question for the implementer to re-check before finalizing the truncation-only approach |

## Acceptance Criteria

- **AC1**: Running `npm run build` with network access produces `public/llms.txt` (and thus `out/llms.txt` after export) containing one entry per skill directory with a `SKILL.md` under `claude-code/skills/*` and `codex/skills/*`, and one entry per agent file under `claude-code/agents/*.md` and `codex/agents/*.md` (excluding `README*.md`/`CLAUDE.md`/`AGENTS.md`).
- **AC2**: When the GitHub Trees API or any raw-content fetch fails (simulate via a forced network error), `npm run prebuild` still completes successfully, and `public/llms.txt` is regenerated from the last-committed `src/data/agent-catalog.json` rather than failing the build.
- **AC3**: `/llms.txt` is reachable at the site root of the exported `out/` build (not locale-prefixed) — verified by a build-verification check analogous to the existing `verify:bundle` script, or a Playwright smoke assertion.
- **AC4**: The footer renders a new "Agents"-labeled group linking to `/llms.txt` on all 5 locale pages, and `scripts/check-message-keys.mjs` passes (no missing-key regression).
- **AC5**: `public/llms.txt`'s top-level structure follows the llms.txt convention: an H1 title, a one-paragraph blockquote summary, and `##`-level sections grouping entries by `Skills (Claude Code)` / `Agents (Claude Code)` / `Skills (Codex)` / `Agents (Codex)`, each entry as `- [name](url): one-line description`.

## Functional Requirements

- **FR1**: `scripts/generate-llms-txt.mjs` MUST fetch the toolkit repo's tree via the GitHub Trees API in exactly one request (`?recursive=1`), then fetch only the filtered subset of matching files via `raw.githubusercontent.com` with a concurrency cap (recommend 8) and a per-request timeout (recommend 10s), matching the network-defensiveness of the existing star-count script.
- **FR2**: For each matched file, parse YAML frontmatter with `gray-matter`; the canonical entry name is the frontmatter `name:` field (not the directory/file name), since the toolkit treats `name` as the invocation identifier.
- **FR3**: The one-line description shown in `llms.txt` MUST be derived from the frontmatter `description` field by taking text up to the first sentence boundary (`. ` or `.\n`) and hard-capping at 160 characters (ellipsis if truncated), with the "Triggers:"/"Do not use for:" clauses excluded even if they appear before the character cap (split on the first occurrence of `Triggers:` or `Do not use for:` and drop everything from there onward before applying the sentence/length cap).
- **FR4**: Each `llms.txt` entry MUST link to the file's canonical GitHub URL (`https://github.com/yongwoon/ywc-agent-toolkit/blob/main/<path>`), not the raw content URL — so a human or agent following the link lands on GitHub's rendered view.
- **FR5**: The script MUST write `src/data/agent-catalog.json` (array of `{ name, kind: "skill" | "agent", tool: "claude-code" | "codex", description, path }`) as an intermediate, committed cache file, then render `public/llms.txt` deterministically from that JSON — so a fetch failure can regenerate identical output from the last good cache without any network access.
- **FR6**: `public/llms.txt`'s blockquote summary line MUST state the live counts discovered during generation (e.g. "N skills and M agents for Claude Code and Codex") computed from the actual filtered list length, never a hardcoded number — this avoids adding a fourth place (beyond Hero/Feature Grid/FAQ) that can drift out of sync with the toolkit's real catalog size.
- **FR7**: The footer link's `href` for `/llms.txt` MUST be a bare root-relative path passed through unchanged (not through `resolveLocalizedHref`, which prefixes locale segments) — `llms.txt` is one file shared across all locales, not a per-locale asset.

## Non-Functional Requirements

- **Build resilience**: A total failure of the GitHub Trees API or raw-content fetching must never fail `npm run build` — this is a hard requirement matching the existing star-count script's contract, since this repo builds via CI on every push and an external GitHub API outage must not block deploys.
- **Build time budget**: With ~120 files to fetch (51 + 52 skill dirs, minus non-skill entries, plus 14 + 8 agent files), bounded concurrency (FR1) should keep added `prebuild` time under ~15s in the common case; if this proves too slow in practice, lowering fetch frequency (e.g., only re-fetch when `src/data/agent-catalog.json`'s cached commit SHA differs from the tree API's current SHA) is an acceptable follow-up optimization, not required for v1.
- **No new runtime dependency**: `public/llms.txt` is a static file copied verbatim by `output: 'export'`; it adds zero client-side JavaScript and has no bundle-budget impact.
- **Freshness is build-time only**: Like the star count, `llms.txt`'s content reflects the toolkit's state as of the last landing-page deploy, not real time — acceptable for a static GitHub Pages site, but worth noting in case an agent expects live data.

## Data Model / API Contract

`src/data/agent-catalog.json` (illustrative — values are real public skill/agent names discovered during this spec's investigation, not fabricated):

```json
{
  "generatedAt": "2026-08-13",
  "sourceCommit": "<tree API's resolved commit SHA, or null on fallback>",
  "entries": [
    {
      "name": "ywc-plan",
      "kind": "skill",
      "tool": "claude-code",
      "description": "Converts a rough idea or change request into a direct execution plan or a spec document.",
      "path": "claude-code/skills/ywc-plan/SKILL.md"
    }
  ]
}
```

`public/llms.txt` (rendered, illustrative excerpt):

```markdown
# ywc-agent-toolkit

> 49 skills and 22 agents for Claude Code and Codex — an opinionated engineering workflow (plan → spec → tasks → execute → review) distributed as installable skills. MIT licensed.

## Skills (Claude Code)
- [ywc-plan](https://github.com/yongwoon/ywc-agent-toolkit/blob/main/claude-code/skills/ywc-plan/SKILL.md): Converts a rough idea or change request into a direct execution plan or a spec document.

## Agents (Claude Code)
- [ywc-architect](https://github.com/yongwoon/ywc-agent-toolkit/blob/main/claude-code/agents/ywc-architect.md): Use when an architectural decision or design trade-off requires Opus-level judgment.

## Skills (Codex)
...

## Agents (Codex)
...
```

## Edge Cases

- A skill/agent directory or file is renamed or removed between the Trees API call and the raw-content fetch (race with a concurrent toolkit release) → skip that single entry with a warning logged to the build output; do not fail the whole script (partial catalogs are acceptable, an empty catalog is not — see next row).
- The Trees API call itself fails or returns zero matching files → treat as a full fetch failure and fall back to cached `agent-catalog.json` (FR5), never publish an empty `llms.txt`.
- A `description` field is missing entirely (malformed frontmatter) → fall back to the entry's `name` as the description, log a warning, do not crash the script.
- Two entries resolve to the same `name` (a Claude Code and a Codex skill sharing an identical `name:` value, which is the common case for mirrored skills) → both are legitimate, separate entries (different `tool`/`path`); do not de-duplicate by `name` alone.

## Open Questions

- Whether `ywc-agent-toolkit`'s root `README.md` (or `claude-code/agents/README.md`) contains a better-curated one-line description table than frontmatter truncation would produce — this spec's investigation found a matching-table pattern in `claude-code/agents/README.md` (tier/model/description columns) but did not conclusively confirm an equivalent for `claude-code/skills/`. Recommend the implementer re-check this before writing FR3's truncation logic, since a curated source (if one exists for skills too) would read better than an algorithmic truncation of the trigger-heavy frontmatter description.
- Whether to pin `raw.githubusercontent.com` fetches to `main` (freshest, may include Unreleased changes) or to the latest tagged release (matches what `npx`/plugin installers actually ship) — this spec defaults to `main` for consistency with the existing star-count script's "current state" philosophy, but a tagged-release pin may be more honest for an agent-facing catalog. Needs a decision before implementation.
- Whether the pre-existing Hero/Feature Grid/FAQ hardcoded skill-and-agent counts should be updated to read from this same `agent-catalog.json` cache once it exists (would eliminate a whole class of staleness bug going forward) — flagged as a natural follow-up, explicitly Out of Scope for this spec.

## Dependencies

None new. Reuses `gray-matter` (already a dependency) and Node's built-in `fetch`. No dependency on the sibling `20260813-changelog-section.md` spec — both extend `prebuild` independently and can be implemented/merged in either order.

## Operative Sections

The `site-footer.tsx` row in **Existing Constraints Touched** is superseded by **Iteration 1 Amendments** below (FR8) — treat FR8, not the original row's "no change needed" classification, as authoritative.

## Iteration 1 Amendments

**Addressed finding** (from `ywc-spec-validate`, Critical #1): the original spec claimed `site-footer.tsx` needs "no change needed" while FR7 required `/llms.txt`'s href to bypass `resolveLocalizedHref` — but the component's actual code (`href={external ? link.target : resolveLocalizedHref(locale, link.target)}`) and `isExternalLink()` (matches only `http://`/`https://` prefixes) have no branch that does this. As written, FR7 could not be satisfied without a code change the spec never declared.

**Amended approach**: extend `isExternalLink()` (or add a sibling helper, e.g. `isRootRelativeAsset()`) so that a `target` starting with `/` and containing a `.` in its final path segment (i.e., a bare static-asset path like `/llms.txt`, as opposed to a locale-routable page path like `/guidebook/`) is treated as pass-through — rendered with `href={target}` unchanged, no `target="_blank"`, no `resolveLocalizedHref`. This is a minimal, additive change to the existing ternary's condition, not a rewrite of `site-footer.tsx`'s rendering logic.

- **FR8** (new): `src/components/sections/site-footer.tsx`'s link-resolution logic MUST classify `target` values into three cases, not two: (a) external (`http://`/`https://` prefix) → `target="_blank"`, `rel="noreferrer"`, href unchanged; (b) root-relative static asset (starts with `/`, final path segment contains a `.`, e.g. `/llms.txt`) → href unchanged, no locale prefix, no `target="_blank"`; (c) everything else (locale-routable page path) → `resolveLocalizedHref(locale, target)`, current behavior unchanged for all existing footer links.
- **Updated Acceptance Criteria**: AC4 now also requires — verified via a Playwright/E2E assertion or equivalent — that the rendered `/llms.txt` footer link's `href` attribute is exactly `/llms.txt` on every one of the 5 locale pages (not `/en/llms.txt`, `/ja/llms.txt`, etc.).
- **No other existing footer link is affected**: every current `footer.groups` entry across all 5 locale message files is either external (`http://...`) or a locale-routable path without a `.` in its final segment (`#install`, `/guidebook/`, etc.) — verified during this amendment pass by re-reading `src/messages/en.json`'s `footer.groups` — so case (c)'s behavior is unchanged for all pre-existing entries and this is a strictly additive classification, not a behavior change to any current link.

### Iteration 1 Self-Consistency Re-check (Pass B + C)

- **Pass B (claim ↔ reality)**: FR8's classification rule was re-checked against the actual `footer.groups` content in `src/messages/en.json` (both existing groups — "Product": `#features`, `#install`, `/guidebook/`; "Resources": all four entries are `https://...` external links) — confirmed none of the 5 existing entries has a `.` in its final path segment, so FR8's new case (b) cannot misclassify any pre-existing link.
- **Pass C**: N/A — this spec has no database/schema surface; Pass C's checklist does not apply.

Iteration 1 resolves the single Critical from the `ywc-spec-validate` pass; the 2 Warnings and 2 Suggestions from that pass are non-blocking (Warning-tier and Suggestion-tier) and are carried forward as implementation guidance rather than re-amended here.
