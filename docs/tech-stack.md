# ywc-agent-toolkit-lp Directory Structure

> **Stack**: TypeScript + Next.js 16 (App Router) + Tailwind v4 + next-intl
> **Architecture**: Section-based composition (marketing landing page, no domain/application layers)
> **Scale**: small (single static site, 1-3 contributors, no backend)

## Directory Structure

```
ywc-agent-toolkit-lp/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout — only <html>/<body> shell, no locale knowledge
│   │   ├── page.tsx                    # Root "/" — static <meta refresh> stub to /en/, with hreflang links to all 5 locales for no-JS/crawlers
│   │   ├── globals.css                 # @import "tailwindcss"; @import design-tokens.css (raw --tokens, see Design System below)
│   │   └── [locale]/
│   │       ├── layout.tsx              # Locale-scoped layout — NextIntlClientProvider, <html lang>, JSON-LD, hreflang alternates, next/font (Space Grotesk/IBM Plex Sans/IBM Plex Mono + CJK)
│   │       ├── page.tsx                # Landing page composition — imports and orders section components
│   │       └── guidebook/               # Docs-page section (Phase 000004, see Design System note below) — Laravel-docs-style layout
│   │           ├── layout.tsx          # Top bar + sidebar + TOC shell (docs/design-system/docs-page.md)
│   │           └── [[...slug]]/
│   │               └── page.tsx        # Catch-all route rendering guidebook markdown content
│   ├── components/
│   │   ├── sections/                   # One component per LP section, mirrors ohmyclaudecode.com structure
│   │   │   ├── site-header.tsx         # Wordmark, nav links, LocaleSwitcher, GitHub star Badge, Install Button
│   │   │   ├── hero.tsx                # Headline ("expert agents", no fixed agent count), CTA Buttons, Terminal (animated CLI demo)
│   │   │   ├── problem-solution.tsx    # "Before/After" two-column comparison (✗/✓)
│   │   │   ├── feature-grid.tsx        # 4× StatCard (lane="claude" amber / lane="codex" cyan) + skill-category chips
│   │   │   ├── install-steps.tsx       # Numbered steps, CodeBlock per step (tabbed Claude Code / Codex)
│   │   │   ├── social-proof.tsx        # Pull quotes / community references
│   │   │   ├── faq.tsx                 # Single-open list composed of FaqItem primitives
│   │   │   └── site-footer.tsx         # Link columns, copyright
│   │   └── ui/                         # The 7 design-system primitives — section-agnostic, self-contained (docs/design-system/components.md)
│   │       ├── button.tsx              # variant: primary/secondary/outline/ghost, size: sm/md/lg
│   │       ├── badge.tsx               # variant: neutral/amber/cyan/pass/fail/agent, optional glow dot
│   │       ├── code-block.tsx          # Copy-to-clipboard command block (the signature element) — clipboard failure falls back to text selection
│   │       ├── terminal.tsx            # CLI transcript window-chrome (Terminal.Line sub-component), used by hero's animated demo
│   │       ├── stat-card.tsx           # Feature-grid stat tile, lane="claude"|"codex" accent
│   │       ├── faq-item.tsx            # Accordion row, grid-template-rows height animation, +/× glyph toggle
│   │       └── locale-switcher.tsx     # Dropdown for 5 locales, native language names, next-intl navigation wired
│   ├── i18n/
│   │   ├── routing.ts                  # defineRouting({ locales: [en, ja, ko, zh, es], defaultLocale, localePrefix: 'always' })
│   │   ├── request.ts                  # getRequestConfig — loads messages/<locale>.json per request
│   │   └── navigation.ts               # Locale-aware Link/redirect/usePathname wrappers (createNavigation)
│   ├── messages/                       # Translation catalogs, flat key-value per locale
│   │   ├── en.json                     # Source of truth — authored first, others translated from this
│   │   ├── ja.json
│   │   ├── ko.json
│   │   ├── zh.json
│   │   └── es.json
│   └── lib/
│       └── seo.ts                      # Builds <Metadata> + JSON-LD (WebSite/SoftwareApplication) per locale
├── public/
│   ├── favicon.svg
│   └── og-image.png                    # Open Graph image (static export can't hit github's dynamic og image endpoint)
├── next.config.ts                      # output: 'export', images.unoptimized: true, trailingSlash: true
├── tailwind.config.ts                  # theme.extend mirrors docs/design-system/tailwind-theme.css's @theme mapping (ported manually, not imported)
├── tsconfig.json
├── package.json
└── README.md
```

## Key Directory Descriptions

### `src/app/[locale]/`
Route segment that carries every locale-aware page. Next.js App Router requires the dynamic `[locale]` folder for `generateStaticParams` to pre-render one static HTML file per locale at build time — this is what makes 5-locale static export possible without a server.

**Reason for this structure**: next-intl's documented pattern for `output: 'export'` skips `middleware.ts` entirely (Next.js Middleware does not run on statically-exported/GitHub Pages output) and instead relies on build-time `generateStaticParams` inside `[locale]/layout.tsx`. The plain `src/app/page.tsx` (outside `[locale]`) exists only as a static redirect stub to `/en/` — it renders a real (non-blank) HTML body with a `<meta http-equiv="refresh" content="0; url=/en/">` tag, `hreflang` links to all 5 locale homepages, and a `useEffect` that upgrades the redirect to the visitor's `navigator.language`-matched locale as progressive enhancement only (never the sole mechanism), since GitHub Pages serves `index.html` at the bare root and no-JS visitors/search crawlers must still reach content.
**Example files**: `[locale]/layout.tsx`, `[locale]/page.tsx`
**Dependency direction**: `page.tsx` imports from `components/sections/*`, which import from `components/ui/*`. Nothing in `components/` imports from `app/`.

### `src/components/sections/`
One file per landing-page section, matching the ohmyclaudecode.com content order (header → hero → problem/solution → features → install → social proof → FAQ → footer).

**Reason for this structure**: A marketing LP has no business/domain logic — the only meaningful seam is "one section = one reviewable, reorderable unit." This avoids the `features/` or `domain/` layering conventions used by application projects, which would be over-scaffolding for a single static page.
**Example files**: `hero.tsx`, `install-steps.tsx`
**Dependency direction**: Sections depend on `components/ui/` and `messages/*.json` (via `useTranslations`). Sections never depend on each other.

### `src/components/ui/`
The 7 design-system primitives (`docs/design-system/components.md`) — self-contained, read styling from CSS custom properties / Tailwind utilities mapped in `tailwind-theme.css`, never hardcode colors.

**Reason for this structure**: `code-block.tsx` is reused by both `hero.tsx` (CLI demo) and `install-steps.tsx` (install commands) — promoting it here avoids duplicating copy-to-clipboard logic. `stat-card.tsx` and `faq-item.tsx` are likewise promoted from section-local to `ui/` because the design system defines them as reusable primitives with their own prop contracts, not one-off section markup — `faq.tsx` (section) composes `faq-item.tsx` (primitive) rather than inlining accordion logic.
**Example files**: `code-block.tsx`, `locale-switcher.tsx`, `terminal.tsx`

### `src/i18n/`
next-intl's routing/request/navigation configuration, kept separate from UI components so the locale strategy can be audited in one place.

**Reason for this structure**: `routing.ts` is the single source of truth for the 5 supported locales — `[locale]/layout.tsx`'s `generateStaticParams`, `navigation.ts`'s typed `Link`, and `middleware`-free redirect logic in root `page.tsx` all read from it. Centralizing avoids the locale list drifting out of sync across files.
**Example files**: `routing.ts`, `request.ts`

### `src/messages/`
Flat JSON translation catalogs, one per locale, keyed by section (`hero.title`, `faq.items[0].question`, etc.).

**Reason for this structure**: next-intl loads these via `getRequestConfig` at build time per static-exported locale page — no runtime translation fetch. `en.json` is authored first (source of truth); `ja/ko/zh/es.json` are translated from it, mirroring the `README.en.md` → `README.ja.md`/`README.ko.md` pattern already used in `ywc-agent-toolkit`.
**Example files**: `en.json`, `ja.json`

## Design System

`docs/design-system/` is the implementation reference and visual source of truth for every UI task (not generated by this skill — maintained separately, read here for cross-reference):

| File | Role |
|------|------|
| `docs/design-system/design-tokens.css` | All CSS custom properties (`:root { --… }`) — imported into `src/app/globals.css` (`@import "./design-tokens.css"`), the only design-system file actually imported at build time |
| `docs/design-system/tailwind-theme.css` | **Reference only** — shows the intended `bg-surface`/`text-accent`/`font-mono`/`rounded-md` utility-name → token mapping as a Tailwind v4 `@theme` block. This project ports the same mapping into `tailwind.config.ts`'s `theme.extend` (referencing the CSS variables via `var(--token)`) instead of importing this file directly, per project preference for a JS config file over CSS-first `@theme` |
| `docs/design-system/foundations.md` | Color / type / spacing / corners / shadows / motion / iconography rules |
| `docs/design-system/components.md` | Contracts for the 7 `ui/` primitives + LP section composition |
| `docs/design-system/docs-page.md` | Layout spec for the `guidebook/` route (top bar / sidebar / content / TOC, Laravel-docs-style) |
| `docs/design-system/content-voice.md` | Copy voice, casing, localization tolerance, the hero "expert agents" rule |

Direction in one line: terminal-native, warm near-black canvas (`--bg: #0b0a09`, never blue-black), amber `--accent: #f5a623` primary (used sparingly), cyan `--link: #45c7ce` secondary, pipeline-state colors as glowing dots/badges (not fills), nearly-square radii (capped at `--radius-lg: 12px`), IBM Plex Mono as the signature font for commands/labels/badges/nav, no emoji, no invented logo (`$ ywc-agent-toolkit` mono wordmark only). Dark is the deliberate default — no light-theme requirement, though the token structure (`[data-theme="light"]` override on the semantic aliases) leaves room for one later.

Fonts load via `next/font/google` in `[locale]/layout.tsx` (Space Grotesk → `--font-display`, IBM Plex Sans → `--font-sans`, IBM Plex Mono → `--font-mono`; Noto Sans JP/KR/SC appended as `--cjk-fallback` for CJK locales) — no local font binaries.

## Extras

- **Static export + i18n constraint (important)**: `output: 'export'` in `next.config.ts` disables Next.js Middleware, Route Handlers with dynamic behavior, and Image Optimization. next-intl's usual `middleware.ts`-based locale negotiation does **not** work here — locale pages must be fully pre-rendered via `generateStaticParams` in `[locale]/layout.tsx`. `localePrefix` is set to `'always'` (every locale including `en` lives under its own `/en/`, `/ja/`, … prefix) so the bare `/` route stays a pure, deterministic redirect stub rather than ambiguously doubling as default-locale content. The stub uses a static `<meta http-equiv="refresh" content="0; url=/en/">` (works with JS disabled) with a `useEffect`-based `navigator.language` match layered on top as progressive enhancement only.
- **No `middleware.ts`**: intentionally absent from the tree above — GitHub Pages cannot execute it. If future hosting moves to Vercel, `middleware.ts` can be reintroduced for proper `Accept-Language` negotiation instead of the static-redirect workaround.
- **`next.config.ts` key settings**: `output: 'export'`, `images: { unoptimized: true }` (GitHub Pages has no image optimization server), `trailingSlash: true` (avoids GitHub Pages' directory-index 404 behavior for locale sub-paths like `/ja/`).
- **No `lib/api/`, `prisma/`, or `stores/`**: this project has no backend, no database, and no client-side app state — omitted per the "only include directories with a current purpose" rule, unlike the general Next.js Medium/Large references.
- **Scaling trigger**: if a blog/changelog section is added later, introduce `src/content/` (MDX) rather than growing `messages/*.json` — translation catalogs and long-form content have different update cadences and reviewers.
