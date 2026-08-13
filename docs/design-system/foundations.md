# Foundations — ywc-agent-toolkit

Calm, readable, trustworthy (see `.impeccable.md` for the full design-context brief behind the
2026-08-13 renewal). Warm-paper light canvas, humanist body type, one amber accent, one cyan
secondary, pipeline-state semantics carried over unchanged. Token names below are the ones
defined in `design-tokens.css` — always reference the **semantic alias**, never a raw hex.

## Color

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Page background | `--bg` | `#f8f3e8` | body; warm paper (never stark `#fff`) |
| Subtle band | `--bg-subtle` | `#efe8d8` | alternating section / footer |
| Surface | `--surface` | `#fdfbf5` | cards, panels — brighter than `--bg` ("raised paper") |
| Raised surface | `--surface-raised` | `#fdfbf5` | buttons (secondary), menus, chips |
| Border | `--border` / `--border-strong` / `--border-subtle` | `#c9b998` / `#a89273` / `#ded3ba` | hairline 1px only |
| Text | `--text` | `#241d15` | body (warm near-black) |
| Bright text | `--text-bright` | `#0b0a09` | headlines / high-emphasis |
| Secondary / muted / faint | `--text-secondary` / `--text-muted` / `--text-faint` | `#493c2c` / `#5c4c38` / `#6e5c44` | de-emphasis ladder, all ≥4.5:1 on `--bg` |
| **Primary accent** | `--accent` | `#8a540a` | prompts, primary CTA, active, focus — deepened from the original `#f5a623` for AA text contrast on light |
| Accent hover | `--accent-hover` | `#9c5c0a` | |
| On accent | `--text-on-accent` | `#fdfbf5` | text on amber fills |
| **Secondary / link** | `--link` | `#1a6e6a` | links, Codex lane — deepened from `#45c7ce` |
| Tool lanes | `--lane-claude` / `--lane-codex` | amber / cyan | distinguish Claude Code vs Codex (unchanged mapping) |
| States | `--state-pass` / `--state-fail` / `--state-warn` / `--state-agent` | green `#227a3c` / red `#c73a31` / amber / violet `#6d4fd1` | pass·merged / fail·block / warn·active / read-only agent |

**Rules:** one primary accent (amber), used sparingly. Cyan is the only secondary. State colors
appear as small dots and badges — never as large fills. No purple gradients, no gradient blobs,
no photography. The original bright `amber-400 #f5a623` / `cyan-400 #45c7ce` survive only as
tint/fill sources (badges, dot glows) — never as text, since they fail AA contrast on the light
background.

## Type

Three roles — set `font-family` from the token:

- **Display** `--font-display` (Source Serif 4) — headlines only. Bold `700`, tracking `--ls-tighter` (−0.02em), `text-wrap: balance`, line-height `--lh-tight`/`--lh-snug`. Never leaks into body copy.
- **Body/UI** `--font-sans` (Source Sans 3) — reading text, the readability-priority face. `--lh-normal`→`--lh-relaxed` (slightly more relaxed than the prior IBM Plex Sans setting), `text-wrap: pretty`.
- **Mono** `--font-mono` (IBM Plex Mono, unchanged) — reserved for UI chrome, not prose: commands, labels, badges, nav, buttons, and all uppercase "status-line" eyebrows (`--text-label`, tracking `--ls-label` 0.18em, UPPERCASE).

Sizes are fluid `clamp()` tokens: `--text-display` → `--text-h1..h4` → `--text-lead` → `--text-body` → `--text-mono*` → `--text-label`. CJK: `--cjk-fallback` (Noto Sans JP/KR/SC) is appended to every family; `:lang(ja|ko|zh)` gets `--lh-relaxed`.

**Fonts load from Google Fonts** (see `README.md → Fonts`). No local binaries.

## Spacing & layout

4px grid (`--space-1..32`). Section rhythm `--section-y` (4→8rem), inner `--section-gap`.
Content widths: `--container` 1200 / `--container-wide` 1360 / `--container-narrow` 760, side
padding `--gutter`. Lay rows/grids out with flex/grid + `gap` (not margins). Collapse breakpoints
used in the kit: 1040 (hero → 1col), 900 (4-up → 2-up, 2-col → 1col), 560 (→ 1col).

## Corners, borders, cards

Nearly-square: radii cap at `--radius-lg` 12px (terminal windows), `--radius-md` 8px (cards),
`--radius-sm` 5px (buttons), `--radius-xs` 3px (inline code / tags). Borders are **1px hairline**
only. Cards are **flat surfaces with an inset top highlight** (`--edge-top`), not floating
drop-shadowed panels. Recurring container motifs: box-drawing frame `┌─ … ─┐` and the terminal
window (traffic-light dots + centered mono title).

## Shadows, depth & focus

On light, shadows are soft and low-opacity, warm-tinted black (`--shadow-md/lg`), not the heavy
black shadows a dark canvas needs. Primary depth cue = a subtle contact shadow (`--edge-top`)
plus a hairline border — no lit inset highlight (that only reads on dark). Interactive/active
chrome gets a restrained **amber ring + soft shadow** (`--glow-accent` / `--glow-accent-soft`) —
deliberately not the blooming neon halo the prior dark theme used; a "phosphor glow" contradicts
calm. Keyboard focus = `--focus-ring` (2px amber ring offset from bg, unchanged — accessibility
here doesn't get softened).

## Motion

Compositor-friendly only: `transform`, `opacity`, `clip-path`, and `grid-template-rows` for
accordions. Easings: `--ease-out` (decisive settle) for most transitions, `--ease-linear` for
the blinking block caret / typing. Durations `--dur-fast..slower` (90–680ms). Buttons lift 1px on
hover + amber glow (primary), press scales 0.98. Cards lift 2px + reveal lane border. **Always**
guard decorative motion behind `@media (prefers-reduced-motion: no-preference)` and make the
end-state the base style (so no-JS / reduced-motion shows content, not a hidden pre-animation state).

## Iconography

No icon font/sprite was provided. Use **inline stroke glyphs at 1.7–2px, rounded caps/joins,
`currentColor`** — the [Lucide](https://lucide.dev) visual language (link from CDN if you need
more; keep that stroke weight). Most iconography is **typographic**: the amber `$`/`/` prompt,
the block caret, box-drawing (`┌ ─ ┐ ▶`), and glowing state dots. **No emoji.** **No invented
logo** — the brand mark is the mono wordmark `$ ywc-agent-toolkit` (amber `$`, bright `ywc`,
muted remainder).
