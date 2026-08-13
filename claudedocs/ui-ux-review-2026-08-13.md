# UI/UX Review — ywc-agent-toolkit-lp

> **Reviewer**: Claude Code (`ywc-ui-ux-review`)
> **Date**: 2026-08-13
> **Stack**: Next.js 16 (App Router) + TypeScript + Tailwind v4 + next-intl, static export
> **Scope**: Landing page full flow (Hero → Problem/Solution → Pipeline → Feature Grid → Install Steps → Social Proof → Changelog → FAQ → Footer), Guidebook documentation pages (MDX rendering, sidebar nav, code blocks), header/nav (site-header.tsx, guidebook top-bar.tsx)
> **Live URL**: http://localhost:3000 (local dev server, English + Korean locales exercised)
> **Frameworks applied**: Nielsen 10 Heuristics · WCAG 2.2 AA · (no platform HIG — web-only product) · Internal Design System (`docs/design-system/design-tokens.css`)

## Resolution (2026-08-13, same-day follow-up)

All 8 findings were triaged for a fix pass:

| Finding | Outcome |
|---|---|
| C-01 (header wordmark collapse) | **Fixed** — `shrink-0` on the logo anchor + nav breakpoint moved `md:flex`→`lg:flex` in `site-header.tsx`; same anchor fix in `top-bar.tsx`. Verified: wordmark renders at full width at 768px, no viewport in the 640–1440px sweep shows collapse or garbling. |
| H-01 (guidebook duplicate H1/paragraph) | **Fixed** — `guidebook-content.ts` now strips the leading back-to-TOC link and H1 before the body reaches `GuidebookMdx`; the redundant synthesized `<p>` in `page.tsx` was removed (the SEO `<meta description>` still uses the extracted text). Verified in both dev and the production static export: exactly one `<h1>` per guidebook page. |
| M-01 (generic skill-mention links) | **Partially fixed** — `ywc-plan`, `ywc-spec-ready`, `ywc-task-generator`, `ywc-sequential-executor` now route to `05-general-cycle-medium-large` (confirmed via content grep to be documented there); `ywc-impl-review` routes to its specific anchor on `14-skill-reference`. `ywc-code-gen` and `ywc-gen-testcase` were left on the generic fallback — no single authoritative target page could be confirmed with evidence, and a wrong guess would be worse than the honest generic fallback. |
| M-02 (hero eyebrow not localized) | **Fixed** — added `hero.eyebrow` to all 5 locale files, `hero.tsx` now reads it via `t()`. |
| M-03 (locale switcher loses scroll position) | **Not a real issue — corrected.** `public/locale-hash-sync.js` (already present, referenced from `layout.tsx`) rewrites `[data-locale-link]` hrefs to carry the current `window.location.hash` on load/hashchange. Live-verified: switching from `/en/#install` correctly offers `/ko/#install`. The original finding was a static-code-only false positive that missed this runtime script — no fix applied. |
| M-04 (breadcrumb "Guidebook" hardcoded/inconsistent) | **Fixed** — breadcrumb root now reads the same `nav.links` "Docs" label used everywhere else, via `getTranslations("nav")` in `page.tsx`. Verified on `/ko/`: breadcrumb reads "문서 / 프롤로그", matching the top nav's "문서" label. |
| M-05 (amber-tint border literal drift) | **Fixed** — all 3 call sites (`page.tsx` ×2, `guidebook-mdx.tsx`) now reference the existing `--amber-tint-strong` token instead of hand-picked `rgba()` literals. |
| M-06 (translucent header bg literal drift) | **Fixed** — added `--bg-translucent` token to `design-tokens.css`; both `site-header.tsx` and `top-bar.tsx` now reference it instead of two slightly-mismatched `rgba()` literals. |

Verification: `npx tsc --noEmit`, `npm run lint`, and `npm run build` (full static export, 103 pages) all pass clean after the fix pass.

## Executive Summary

| Tier | Count |
|---|---|
| 🔴 Critical | 1 |
| 🟠 High | 1 |
| 🟡 Medium | 6 |
| 🟢 Low | 0 |
| **Total** | **8** |

### Top 3 Systemic Patterns

1. **Duplicated flex-shrink header bug** — the identical `min-w-0`-on-logo layout pattern is copy-pasted across `site-header.tsx` (landing) and `top-bar.tsx` (guidebook), so the brand wordmark collapses/garbles across the same viewport band in both places. One root-cause fix, applied in both files, resolves the only Critical finding (C-01).
2. **Guidebook content pipeline duplicates its own metadata** — the page template synthesizes a title + description header from nav/frontmatter data, then renders the raw MDX body underneath, which independently repeats its own H1 and opening paragraph. This is systemic across all ~16+ guidebook pages × 5 locales, not a one-off authoring mistake (H-01).
3. **Design tokens exist but aren't consistently enforced** — the token system (`design-tokens.css`) is well-built and mostly followed (contrast, motion-reduce, and dark-theme-literal audits all came back clean), but several literal `rgba()`/opacity values drifted independently of their semantic tokens in 3+ locations (M-05, M-06), suggesting no lint rule currently catches raw color literals creeping back in.

### Recommended Top 5 Actions

1. Fix the header logo flex-shrink collapse in both `site-header.tsx` and `top-bar.tsx` (C-01) — this is a confirmed WCAG 2.2 AA violation, fix before next release.
2. Stop the guidebook page template and MDX body from independently rendering the same title/paragraph (H-01) — fix once at the loader/renderer level, it cascades correctly to all pages and locales.
3. Preserve scroll/anchor position when switching locale on the landing page, matching the guidebook's existing (correct) behavior (M-03).
4. Consolidate the three drifted amber-tint border values and the two mismatched translucent-header-background values into named tokens (M-05, M-06).
5. Route the Hero "46 skills" eyebrow and the guidebook breadcrumb root label through `next-intl` `t()` to close the last two hardcoded-string gaps (M-02, M-04).

---

## 🔴 Critical

> Issues that block usage, violate WCAG 2.2 AA, or risk data / security harm. **Fix before next release.**

### C-01 · Header wordmark collapses to a near-zero-width, effectively untappable home link across the 768–1050px band

- **Location**: `src/components/sections/site-header.tsx:27-37` (landing header) and identically `src/components/guidebook/top-bar.tsx:42-48` (guidebook top bar) — same `flex min-w-0 items-center gap-1.5` anchor structure in both files, the same two inner `<span>`s, only one of which (`ywc`) has `truncate`; the `$` prefix span has neither `truncate` nor is the anchor given `overflow-hidden`.
- **Breakpoint(s)**: 768–1050px (measured precisely, see table below); recovers fully at 1100px+.
- **Heuristic**: WCAG SC 2.5.8 (Target Size Minimum, Level AA) · Nielsen #4 (Consistency and standards)
- **Observed**: `getBoundingClientRect()` on `header a[aria-label*="home"]` across viewport widths:

  | viewport | anchor width | visual result |
  |---|---|---|
  | 768px | 0px | text fully invisible; bare "$" glyph floats free of its 0-width parent |
  | 800px | 1.9px | still effectively invisible |
  | 900px | 97.9px | garbled: renders `"$ y… -agen…"` (each span truncates independently) |
  | 1000px | 166.6px | still garbled: `"$ y… -agent-tool…"` |
  | 1100px | full | renders correctly: `"$ywc-agent-toolkit"` |

  Root cause: at the `md` breakpoint (768px) the primary nav (`md:flex`, 5 links) and the control cluster (`sm:flex`: locale switcher + GitHub-stars button + Install button) become simultaneously visible, and together they demand more width than the header container provides. `min-w-0` on the logo `<a>` makes it the only flex-shrinkable child, so it gets squeezed to near-zero across the entire band, not a single-pixel edge case.
- **Expected**: The site's own wordmark — the primary brand identifier and home link — must remain visible and meet the 24×24px minimum interactive target at every supported breakpoint (project's own documented test breakpoints: 320/768/1024/1440).
- **User-facing impact**: At 768px the home link's actual clickable/visible area shrinks to roughly 10×24px, well under the WCAG minimum, and the brand name is entirely invisible from 768px through ~1050px — a band that covers iPad-landscape-class and small-laptop windows, i.e. common real-world traffic, not a synthetic edge case.
- **Evidence**:
  - Screenshot: full-viewport capture at 768×1024 on `/en/` (session transcript) — nav wraps to two lines, only a floating "$" glyph visible where the wordmark should be.
  - DOM measurement: `document.querySelector('header a[aria-label*="home"]').getBoundingClientRect()` → `{width: 0, height: 24}` at 768×1024, `textContent: "$ywc-agent-toolkit"`.
- **Recommendation**:
  ```tsx
  // site-header.tsx and top-bar.tsx — give the logo a size floor instead of min-w-0,
  // and push the nav breakpoint higher so it doesn't collide with the sm: control cluster.
  <a
    aria-label={`${t("wordmark")} home`}
    className="flex shrink-0 items-center gap-1.5 font-mono ..."
    href="#top"
  >
  ```
  Change the primary nav's visibility breakpoint from `md:flex` to `lg:flex` (or hide the GitHub-stars button in the 768–1050px band) so the three competing groups (logo, nav, controls) never all fight for space at once. Apply the same fix to both files — this is one root cause duplicated in two components.

---

## 🟠 High

> Major usability degradation. **Fix in the current cycle.**

### H-01 · Guidebook pages render a duplicate H1 and near-duplicate lead paragraph before any unique content

- **Location**: `src/app/[locale]/guidebook/[[...slug]]/page.tsx:131-170` (synthesized breadcrumb/H1/badges/description block) + `src/lib/guidebook-content.ts:~161` (`description: readOptionalString(data, "description") ?? extractFirstParagraphText(content)`) + `src/components/guidebook/guidebook-mdx.tsx:65` (MDX `# ` maps to the identical `text-h1 font-bold` class string as the page template's own `<h1>`) + every file under `src/content/guidebook/*/*.md` (each repeats its own `# H1` and opening paragraph in the MD body, preceded by an orphaned `[Back to table of contents]` link).
- **Breakpoint(s)**: all — most damaging at 360px, where both duplicate H1s wrap to 2–3 lines each and push all unique content below the fold.
- **Heuristic**: Nielsen #8 (Aesthetic and Minimalist Design) · Nielsen #4 (Consistency and standards)
- **Observed**: DOM query on `/en/guidebook/03-quickstart/`: `h1s = ["03. Ship your first feature in 5 minutes", "03. Ship your first feature in 5 minutes"]` (identical text, identical `text-h1 font-bold` visual scale, rendered twice). Paragraphs 1 and 3 are near-identical, with the orphaned "Back to table of contents" link sandwiched between them. Confirmed on `/en/guidebook/01-introduction/` and `/ko/guidebook/03-quickstart/` (locale-independent) at both 1440px and 360px — this is a systemic template/content-pipeline issue affecting all ~16+ guidebook pages across all 5 locales, not an isolated authoring mistake.
- **Expected**: One clear H1 per page, with page-chrome (breadcrumb/badges/synthesized lead) visually and structurally distinct from where the actual content begins.
- **User-facing impact**: Every guidebook visit opens with what reads as a broken or double-rendered page — the toolkit's documentation is its primary trust surface for a "first-time user" audience (per the Guidebook's own stated purpose), and this duplication undermines that first impression on literally every page.
- **Evidence**:
  - Screenshot: `/en/guidebook/01-introduction/` at 1440px and 360px (session transcript) — two full-scale "01. Introduction" headings stacked with only a badge row + one paragraph + a small link between them.
  - Snapshot excerpt (a11y tree, 360px, `/en/guidebook/01-introduction/`):
    ```
    heading "01. Introduction" level="1"
    ... [badges, lead paragraph] ...
    link "Back to table of contents"
    heading "01. Introduction" level="1"   <- duplicate
    heading "What this Guidebook covers" level="2"
    ... [near-identical paragraph text repeated] ...
    ```
- **Recommendation**:
  ```ts
  // src/lib/guidebook-content.ts — only surface a synthesized description
  // when the frontmatter explicitly supplies one; don't fall back to
  // extracting the MD body's own first paragraph, since that paragraph is
  // about to be rendered again by GuidebookMdx immediately below it.
  description: readOptionalString(data, "description") // no ?? extractFirstParagraphText(content) fallback

  // AND strip the leading "# H1" + "[Back to table of contents]" link from
  // each src/content/guidebook/**/*.md body before it reaches GuidebookMdx,
  // since the page template already renders the title via navPage.title.
  ```
  Either fix alone resolves the duplication; doing both closes it at both the data layer and the content-authoring layer.

---

## 🟡 Medium

> Friction or inconsistency. **Schedule into the backlog.**

### M-01 · Inline skill-mention links all resolve to the same generic reference page

- **Location**: `src/lib/skill-links.ts` (`getSkillGuidebookTarget`, `DEFAULT_SKILL_GUIDEBOOK_SLUG = "14-skill-reference"`, returns a bare `/guidebook/${slug}/` with no anchor fragment).
- **Breakpoint(s)**: all.
- **Heuristic**: Nielsen #4 (Consistency) · Nielsen #6 (Recognition rather than recall)
- **Observed**: Live a11y snapshot of `/en/` confirms `ywc-plan`, `ywc-task-generator`, `ywc-code-gen`, `ywc-impl-review`, `ywc-spec-ready`, and `ywc-gen-testcase` — six distinct inline skill mentions in the Problem/Solution and Pipeline sections — all resolve to the identical URL `.../guidebook/14-skill-reference/`. Only `/ywc-agentic` and three infra-related skills have topic-specific overrides in `SKILL_GUIDEBOOK_SLUG_OVERRIDES`.
- **Expected**: A link labeled with a specific skill name should land the user at (or near) that skill's specific content, not always the same generic top-of-page destination.
- **User-facing impact**: Recoverable in seconds (the destination page is a correct, on-topic reference), but breaks the same way 6+ times per page visit, training users to distrust inline links.
- **Evidence**: Code review of `skill-links.ts`; live click-through confirmed identical destination URL for multiple distinct link labels.
- **Recommendation**: Add anchor fragments (`#<skill-slug>`) once the skill-reference page has per-skill anchors, or extend `SKILL_GUIDEBOOK_SLUG_OVERRIDES` the way 4 skills already have.

### M-02 · Hero eyebrow badge "46 skills" is hardcoded English and does not localize

- **Location**: `src/components/sections/hero.tsx:29` — `<SectionEyebrow>46 skills</SectionEyebrow>`, a literal string, unlike every sibling string in the same component (`t("headline")`, `t("subheading")`, `nav.raw("github")`).
- **Breakpoint(s)**: all; locale-specific (ja/ko/zh/es).
- **Heuristic**: Nielsen #4 (Consistency and standards) — also violates this project's own documented i18n rule that every UI string routes through `next-intl` with `en.json` as source of truth.
- **Observed**: Live on `/ko/`: the eyebrow renders "46 skills" in English while the H1 directly below and all surrounding copy is Korean.
- **Expected**: All UI copy renders in the active locale.
- **User-facing impact**: Low-severity comprehension gap (a number + common English word is broadly understood), but a clear, easily-caught inconsistency in an otherwise fully-localized hero.
- **Evidence**: Code diff against sibling `t()` calls in the same file; live screenshot of `/ko/` hero.
- **Recommendation**: Add `hero.eyebrow` to `src/messages/*.json`, replace the literal with `{t("eyebrow")}`.

### M-03 · Landing-page locale switcher drops the user to the locale root instead of preserving position

- **Location**: `src/components/sections/site-header.tsx:55` (`<LocaleSwitcher value={locale} />`, no `getHref` prop) → `src/components/ui/locale-switcher.tsx:66-67` default href is the bare `/${code}/`. Contrast with `src/components/guidebook/top-bar.tsx:71-75`, which correctly supplies `getHref={(code) => withBasePath(getGuidebookHref(code, activeSlug))}` to preserve the current page across a locale switch.
- **Breakpoint(s)**: all.
- **Heuristic**: Nielsen #7 (Flexibility and efficiency of use)
- **Observed**: Every locale option on the landing header's switcher points to `/${code}/` regardless of the user's current scroll position or anchor (`#install`, `#faq`, etc.). The guidebook's equivalent switcher already solves this correctly for its own page context.
- **Expected**: A non-destructive locale switch should preserve the user's place when the destination structure is identical across locales — true here, since every locale's landing page shares the same single-page anchor layout.
- **User-facing impact**: Recoverable in seconds via re-scrolling, but is a clear inconsistency given the codebase already implements the correct behavior one component over.
- **Evidence**: Code comparison of `site-header.tsx:55` vs. `top-bar.tsx:71-75`.
- **Recommendation**: Pass a `getHref` to the landing page's `LocaleSwitcher` that preserves `window.location.hash`.

### M-04 · Guidebook breadcrumb root label is hardcoded/unlocalized and inconsistent with the nav label used to reach it

- **Location**: `src/app/[locale]/guidebook/[[...slug]]/page.tsx:135` — literal JSX text `Guidebook`, not routed through `t()` — versus every entry point that leads to this section, which calls it "Docs" (`src/components/guidebook/top-bar.tsx:55`, `src/messages/en.json` `nav.links[0].label`, used in both `site-header.tsx` and the footer).
- **Breakpoint(s)**: all; most visible in non-English locales.
- **Heuristic**: Nielsen #4 (Consistency and standards)
- **Observed**: Live on `/ko/guidebook/03-quickstart/`: breadcrumb reads "Guidebook / 시작하기" — an untranslated English root label glued to a translated Korean group label — while every navigational entry point that leads here is labeled "Docs".
- **Expected**: The same destination should carry one consistent name across nav, breadcrumb, and page chrome.
- **User-facing impact**: Functional navigation still resolves correctly; the dual-naming plus mid-breadcrumb language switch is a wayfinding/trust wrinkle, sharper for non-English locales.
- **Evidence**: Code review of `page.tsx:135` plus live screenshot of `/ko/guidebook/03-quickstart/`.
- **Recommendation**: Standardize on one label ("Docs" or "Guidebook") across nav, breadcrumb, and metadata; route the breadcrumb root text through `t()`.

### M-05 · Amber-tint border opacity drifts across three uncoordinated literal values

- **Location**: `src/app/[locale]/guidebook/[[...slug]]/page.tsx:153` (badge border `rgba(245,166,35,.35)`), `page.tsx:174` (content-status card border `rgba(245,166,35,.3)`), `src/components/guidebook/guidebook-mdx.tsx:138` (blockquote border `rgba(245,166,35,.3)`).
- **Breakpoint(s)**: all.
- **Heuristic**: Design System — token adoption (`docs/design-system/design-tokens.css` defines `--amber-tint: rgba(245,166,35,0.14)` and `--amber-tint-strong: rgba(245,166,35,0.22)`; none of the three literals above match either).
- **Observed**: Three near-identical, hand-picked opacity values (`.35`, `.3`, `.3`) for what is conceptually the same "amber accent border, medium strength" role.
- **Expected**: One shared token for one shared visual role.
- **User-facing impact**: Not consciously noticeable today; will drift further at each future edit without a shared reference.
- **Evidence**: Grep across the three call sites plus `design-tokens.css`.
- **Recommendation**: Add a `--amber-border-tint` token (or reuse `--amber-tint-strong`) and point all three call sites at it.

### M-06 · Translucent header background is a raw literal duplicated with mismatched alpha

- **Location**: `src/components/sections/site-header.tsx:25` (`bg-[rgba(248,243,232,.86)]`) vs. `src/components/guidebook/top-bar.tsx:28` (`bg-[rgba(248,243,232,.85)]`).
- **Breakpoint(s)**: all.
- **Heuristic**: Design System — token adoption (`rgb(248,243,232)` is exactly `--ink-050`/`--bg`, hardcoded with an ad hoc alpha rather than referencing the token).
- **Observed**: Two nearly-identical sticky-header components picked slightly different alpha values (`.86` vs `.85`) for the same visual role (backdrop-blur scrim).
- **Expected**: One token carrying the alpha variant, referenced by both headers.
- **User-facing impact**: Imperceptible today; same class of drift risk as M-05.
- **Evidence**: Code comparison of the two literal values.
- **Recommendation**: Introduce `--bg-translucent: rgba(248,243,232,.86)` (or use Tailwind's opacity-modifier syntax against `--bg`) and use it in both headers.

---

## 🟢 Low

> Polish opportunities. **Address opportunistically.**

(no findings — no issues surfaced during this review met the Low-tier bar with concrete evidence; see Verified/No-Issue items below for checklist items that passed cleanly)

---

## Verified — checklist items reviewed with no issue found

- **Hero/Feature-Grid agent-count contradiction** (explicit `CLAUDE.md` constraint): Hero headline stays tool-agnostic ("expert agents"); Feature Grid states exact counts ("13 agents" Claude Code / "8 agents" Codex) with no contradiction. Verified live via a11y snapshot of `/en/`.
- **FAQ accordion**: `src/components/ui/faq-item.tsx` uses native `<details name="landing-faq">` — accessible, single-open-at-a-time, no JS required.
- **Guidebook sidebar hierarchy**: groups (Prologue / Getting Started / Core Pipeline / Situational Guides) correctly reflect parent-child structure.
- **Top-level nav item count**: 5 items, within the 7±2 guideline; mobile drawer mirrors the same link set.
- **Guidebook locale switch preserves position** (contrast with M-03's landing-page gap): confirmed correct via code and live check.
- **Raw dark-theme color leftovers**: fresh `grep -rn "text-amber-\|bg-amber-\|border-amber-\|text-ink-\|bg-ink-\|border-ink-"` across `src/` returned zero matches — the light-theme migration from the earlier session holds.
- **Contrast (WCAG 2.2 AA)**: sampled nav links, muted text, faint/label text, footer links, and body copy at 360px — all ratios comfortably above threshold (nav link 5.66:1, text-muted 7.45:1, text-faint 5.25:1, footer link 5.45:1, body text 9.65:1).
- **`prefers-reduced-motion` handling**: correctly implemented via `motion-safe:` on transform-based hover/press states and `motion-reduce:transition-none` on genuine transform-driven motion (sidebar slide-in, accordion chevrons, tab underline). No unguarded transform-based motion found.
- **CJK rendering** (`/ko/`): `--cjk-fallback` stack renders cleanly, no tofu boxes, no obvious weight clash between Source Serif 4 and the Noto Sans KR fallback within mixed-script headings.
- **Anti-generic design patterns**: asymmetric bento-style category grid, a distinct 5-node pipeline diagram, product-specific section headings and CTA copy — clears the anti-template bar.
- **Component consistency**: Button, Badge, and radius usage hold steady across 15 sampled card instances.
- **Icon/glyph rendering**: `$`, `≡`/`×`, `★` render cleanly at all tested widths (independent of the Finding C-01 flex-collapse bug).

---

## Appendix A — Methodology

This review followed the six-phase workflow defined in `ywc-ui-ux-review/SKILL.md`:

`Scope → Code Reconnaissance → Live UI Exploration → Per-Domain Review → Severity Triage → Report`

Code reconnaissance covered routing (`src/app/**`), layouts, design tokens (`docs/design-system/design-tokens.css`), shared UI primitives (`src/components/ui/*`), and the i18n surface (`src/messages/*.json`, `src/lib/skill-links.ts`). Live UI evidence was gathered via Chrome DevTools MCP (`take_snapshot`, `take_screenshot`, `lighthouse_audit`, `resize_page`, `list_console_messages`, `evaluate_script`) against a local dev server, across 360/768/1024/1440px plus a fine-grained sweep (700/768/800/900/1000/1100px) to bound the C-01 collapse band precisely. Two parallel Sonnet subagents conducted the IA and Visual Design per-domain reviews independently against `references/ia-checklist.md` and `references/visual-design-checklist.md`; their outputs were merged and deduplicated where both reviewers independently surfaced the same header-collapse and duplicate-H1 issues from different angles.

Lighthouse (desktop, navigation mode) against `/en/`: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100 (54/54 audits passed). No console errors observed on any page tested.

## Appendix B — Out of Scope

- Authenticated or dynamic app surfaces — none exist; this is a fully static marketing/documentation site by design.
- Cross-browser testing (Firefox/Safari) — this session used Chrome DevTools MCP only; the project's own `rules/web/testing.md` calls for a Chrome/Firefox/Safari minimum, so a follow-up pass in the other two engines is recommended before a release sign-off.
- True 360px CSS-pixel viewport: the resize tool used in this session floored around 500px CSS width in one sub-review; layout at ~500px showed no breakage, but exact 320–360px touch-target sizing should be re-verified with a tool that honors that exact viewport.
- The 8793-port tab found already open at session start (a stale static-export preview from a prior session) was deliberately excluded from all evidence gathering in favor of a freshly started dev server, to avoid citing stale build output.

## Appendix C — Open Questions

- Per `docs/specification/06-requirements.md#Open Questions`, the Social Proof section explicitly ships without customer quotes at launch ("No customer quotes yet — here's what you can verify yourself before installing"). This review treated that as an intentional, already-resolved product decision rather than a finding — confirm that remains the current call before this report is acted on.
- M-01's fix (per-skill anchors on the skill-reference page) depends on whether `14-skill-reference.md` is structured with addressable per-skill headings today; this review did not audit that page's internal structure in depth.
