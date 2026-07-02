# Documentation Page — pattern

The layout for skill / API reference pages (like `laravel.com/docs`), in the ywc-agent-toolkit
terminal-native brand. Reference implementation:
`ui_kits/skill-docs/index.html` in the design-system project. Self-contained (only `styles.css`
tokens, no bundle) so it drops straight into a Next.js docs route.

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  TOP BAR (sticky, blur)                                      │
│  wordmark · Docs Skills Agents Hooks · ⌕search ⌘K · v1.x · ◍ · ★│
├──────────┬──────────────────────────────────┬───────────────┤
│ SIDEBAR  │  CONTENT (prose)                 │  ON THIS PAGE │
│ skill    │  breadcrumb                      │  (TOC)        │
│ nav,     │  h1 + badges + lead              │  anchor links │
│ grouped, │  h2 sections, code, tables,      │  scroll-spy   │
│ collapsi-│  callouts, related chips         │  active=amber │
│ ble      │  edit-on-github · prev/next      │               │
└──────────┴──────────────────────────────────┴───────────────┘
```

Grid: `264px · minmax(0,1fr) · 232px`, max-width ~1560px. Sidebar and TOC are
`position: sticky; top: 60px` with their own scroll.

## Rules

**Top bar** — 60px, `rgba(11,10,9,.85)` + `backdrop-filter: blur(12px)`, bottom hairline.
Wordmark + mono nav (active = `--accent`). Search is a mono chip with a `⌘K` key hint. Version
selector, locale, and GitHub star sit at the right.

**Sidebar** — mono nav. Group headers are UPPERCASE `--text-label` eyebrows with a `›` toggle
(rotates 90° when open). Links are `--text-mono-sm`, muted; **active link = amber text +
`--amber-tint` background + 2px amber left-border**. Groups are collapsible; the active skill's
group starts open.

**Content / prose**
- `h1` = `--font-display` `--text-h1`; `h2` = `--text-h3` with a hover-reveal `#` anchor in amber; `h3` = `--text-h4`.
- Body `--text-body`, `--lh-relaxed`, `max-width: 70ch`, `text-wrap: pretty`.
- Badge row under the title: tool lanes (Claude Code amber / Codex cyan) + category.
- Lead paragraph is `--text-lead`, `--text-secondary`.
- **Inline code**: mono, `--surface-raised` bg, hairline border, `--amber-300` text.
- **Code blocks**: the CodeBlock pattern — `--ink-850`, hairline, uppercase label bar, amber
  `$`/`/` prompt (non-selectable), comments in `--text-faint`, a Copy button that falls back to
  text selection on clipboard failure. Horizontal scroll for long commands.
- **Tables**: hairline row borders, mono uppercase `th`, first column `--text-bright`.
- **Callouts** (safety / notes): `--amber-tint` bg, `rgba(245,166,35,.3)` border, `!` glyph in amber.
- **Bullets**: amber `▪` marker.
- **Links** in prose: `--link` (cyan) with a subtle underline.
- **Related skills**: mono pill chips with a `→` prefix; hover → amber border.

**Footer of content** — an edit-on-GitHub row (hairline top) then a two-up **prev / next**
card nav (skill names in amber mono).

**TOC (right)** — "On this page" eyebrow, anchor links with a `--border-subtle` left-rail;
active section (via `IntersectionObserver` scroll-spy) turns amber with an amber rail.

## Interactions

- Copy buttons on every code block (safe clipboard fallback).
- Collapsible sidebar groups.
- TOC scroll-spy highlighting the current `h2`.
- `scroll-behavior: smooth` + `scroll-margin-top: 76px` on headings so anchor jumps clear the sticky bar.

## Responsive

- `≤1180px`: hide the TOC (2 columns).
- `≤860px`: sidebar becomes a fixed off-canvas drawer toggled by a `≡` button in the top bar; top-bar nav + search collapse.

## Motion & a11y

Compositor-friendly only (transform/opacity). Respect `prefers-reduced-motion`. Keyboard focus
uses `--focus-ring`. Every heading has an `id` for deep-linking; the skip target is the content region.

## Next.js notes

- Render MDX/Markdown into `.content`; map heading levels to the styles above.
- Drive the sidebar and TOC from the doc's frontmatter / heading tree.
- Wire the locale selector to next-intl (same `LocaleSwitcher` contract as the marketing site).
- Search (`⌘K`) is a visual mock here — back it with a client-side index (e.g. FlexSearch/Pagefind) for static export.
