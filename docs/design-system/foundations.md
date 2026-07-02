# Foundations — ywc-agent-toolkit

Terminal-native. Dark warm near-black canvas, monospace-forward, one amber accent, one
cyan secondary, pipeline-state semantics. Token names below are the ones defined in
`design-tokens.css` — always reference the **semantic alias**, never a raw hex.

## Color

| Role | Token | Value | Use |
|------|-------|-------|-----|
| Page background | `--bg` | `#0b0a09` | body; warm near-black (never blue-black) |
| Subtle band | `--bg-subtle` | `#100e0b` | alternating section / footer |
| Surface | `--surface` | `#16130f` | cards, panels |
| Raised surface | `--surface-raised` | `#221d16` | buttons (secondary), menus, chips |
| Border | `--border` / `--border-strong` / `--border-subtle` | `#443a2c` / `#342c21` / `#221d16` | hairline 1px only |
| Text | `--text` | `#e9e1d1` | body (warm off-white) |
| Bright text | `--text-bright` | `#f8f3e8` | headlines / high-emphasis |
| Secondary / muted / faint | `--text-secondary` / `--text-muted` / `--text-faint` | `#b8ab93` / `#8f7f68` / `#766752` | de-emphasis ladder |
| **Primary accent** | `--accent` | `#f5a623` | prompts, primary CTA, active, focus |
| Accent hover | `--accent-hover` | `#ffbb4d` | |
| On accent | `--text-on-accent` | `#1a1204` | text on amber fills |
| **Secondary / link** | `--link` | `#45c7ce` | links, Codex lane |
| Tool lanes | `--lane-claude` / `--lane-codex` | amber / cyan | distinguish Claude Code vs Codex |
| States | `--state-pass` / `--state-fail` / `--state-warn` / `--state-agent` | green `#57c877` / red `#f0574e` / amber / violet `#a78bfa` | pass·merged / fail·block / warn·active / read-only agent |

**Rules:** one primary accent (amber), used sparingly. Cyan is the only secondary. State colors
appear as small **glowing dots** (`box-shadow: 0 0 8px <color>`) and badges — never as large
fills. No purple gradients, no gradient blobs, no photography.

## Type

Three roles — set `font-family` from the token:

- **Display** `--font-display` (Space Grotesk) — headlines. Bold `700`, tracking `--ls-tighter` (−0.03em), `text-wrap: balance`, line-height `--lh-tight`/`--lh-snug`.
- **Body/UI** `--font-sans` (IBM Plex Sans) — reading text. `--lh-normal`→`--lh-relaxed`, `text-wrap: pretty`.
- **Mono** `--font-mono` (IBM Plex Mono) — **the signature**: commands, labels, badges, nav, buttons, and all uppercase "status-line" eyebrows (`--text-label`, tracking `--ls-label` 0.18em, UPPERCASE).

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

On dark, shadows are low/diffuse (`--shadow-md/lg`). Primary depth cue = lit top edge
(`--edge-top`). Interactive/active chrome gets an **amber glow** (`--glow-accent` /
`--glow-accent-soft`). Keyboard focus = `--focus-ring` (2px amber ring offset from bg).

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
