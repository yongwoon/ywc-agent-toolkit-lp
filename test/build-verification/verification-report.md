# Build Verification Report

Date: 2026-07-02

## Commands

- `npm run lint` — passed.
- `npm run build` — passed. Includes `scripts/check-message-keys.mjs`, sitemap generation, landing runtime stripping, and CSP injection.
- `npm run verify:bundle` — passed.

## Bundle Budget

Measured by `test/build-verification/check-bundle-budget.mjs` against `out/en/index.html`.

- JS gzip: 0.0 KB (`/_next/` runtime scripts stripped from locale home pages after static export)
- CSS gzip: 7.8 KB
- Budget: JS <= 150 KB, CSS <= 30 KB

## Lighthouse

Target: `http://127.0.0.1:4173/en/`

- Performance: 1.00
- Accessibility: 1.00
- Best Practices: 0.96
- SEO: 0.83
- FCP: 1.3 s
- LCP: 1.5 s
- TBT: 0 ms
- CLS: 0

Notes:
- The SEO score is reduced by relative canonical/hreflang URLs in local static-server output.
- Best Practices is reduced by the local server returning 404 for `/favicon.ico`.
- `npx @axe-core/cli` could not run because its ChromeDriver version did not match the installed Chrome. Lighthouse Accessibility 1.00 was used as the equivalent automated accessibility check.

## Breakpoints

Representative screenshots were captured with Playwright CLI and system Chrome:

- Landing page: 320, 768, 1024, 1440 px
- Guidebook page: 320, 768, 1024, 1440 px

Observed result: no major overflow, text overlap, or broken layout in the inspected mobile and desktop captures.
