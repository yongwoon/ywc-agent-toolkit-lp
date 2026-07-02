# ywc-agent-toolkit — Design System (developer reference)

This folder is the **implementation reference** for building `ywc-agent-toolkit-lp`
(Next.js 16 App Router · Tailwind v4 · next-intl · static export · GitHub Pages).
It distills the full design system into copy-paste tokens and component contracts so
Claude Code (or any developer) can implement on-brand UI directly.

> The **full** design system — live React components, foundation specimen cards, and the
> complete landing-page UI kit — lives one level up in the design-system project
> (`components/core/`, `guidelines/`, `ui_kits/landing/`, root `readme.md`). This folder is
> the portable subset meant to sit inside the app repo at `docs/design-system/`.

## Direction, in one line

Terminal-native: warm near-black canvas, monospace-forward (IBM Plex Mono is the signature
voice), **amber-phosphor** primary accent + **cyan** secondary, pipeline-state semantics, box-
drawing / prompt motifs. **Dark is the deliberate default** (the audience lives in dark
terminals; the product *is* a CLI tool). Semantic tokens are structured so a `[data-theme="light"]`
scope could override the aliases later — client-only, since the site is a static export.

## Files

| File | What it is |
|------|-----------|
| `design-tokens.css` | All tokens as `:root { --… }`. Paste into `src/app/globals.css`. |
| `tailwind-theme.css` | Tailwind v4 `@theme` mapping so `bg-surface`, `text-accent`, `font-mono`, etc. resolve to tokens. |
| `foundations.md` | Color / type / spacing / corners / shadows / motion / iconography rules + token names. |
| `components.md` | Contracts for the 7 primitives + LP section composition. |
| `content-voice.md` | Copy voice, casing, the hero "expert agents" rule, localization. |

## Wire-up (globals.css)

```css
@import "tailwindcss";
@import "./design-tokens.css";   /* raw :root tokens + body canvas */
@import "./tailwind-theme.css";  /* Tailwind v4 @theme mapping */
```

## Fonts

Loaded from **Google Fonts** (no local binaries). In `app/[locale]/layout.tsx` use `next/font`:

```ts
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
// Space Grotesk → --font-display, IBM Plex Sans → --font-sans, IBM Plex Mono → --font-mono
// For CJK locales also load Noto Sans JP / KR / SC (subset by locale where possible).
```

Map each `next/font` `variable` onto the matching `--font-*` token (or set the token's first
family to the generated CSS variable). CJK families are already appended in `--cjk-fallback`.

## Non-negotiables

- One primary accent (amber), used sparingly; cyan is the only secondary; state colors are dots/badges, not fills.
- Hairline 1px borders; nearly-square radii; flat cards with a lit top edge — **not** floating drop-shadows.
- Mono for commands, labels, badges, nav, buttons, eyebrows. **No emoji. No invented logo.**
- Motion is transform/opacity/clip-path only, guarded by `prefers-reduced-motion`.
- Hero says "expert agents" (agent counts differ 12/7); exact counts only in the feature grid.

See `../../readme.md` (design-system project root) for the exhaustive CONTENT and VISUAL foundations.
