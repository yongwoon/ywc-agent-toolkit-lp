# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This repository is currently in the **spec-and-task-planning phase** — there is no `package.json`, `src/`, or any application code yet. What exists is:

- `docs/mission.md` — why this project exists, success criteria, rejected approaches
- `docs/specification/` — the full specification (Korean), split into 7 sections
- `tasks/NNNNNN-NNN-<category>-<name>/` — implementation-ready task checklists decomposed from the spec, not yet executed

Do not assume any source files exist beyond what `ls`/`find` confirms. Treat `docs/tech-stack.md` as the target directory layout to build toward, not a description of current state.

## What This Project Is

A public, 5-locale (en/ja/ko/zh/es) marketing landing page for `ywc-agent-toolkit` (a distribution toolkit of 46 skills and per-tool custom agents — 13 for Claude Code, 8 for Codex — published on GitHub). It targets the information structure and polish level of ohmyclaudecode.com: hero → problem/solution → features → install → social proof → FAQ. Deployed as a zero-server static export to GitHub Pages.

Full context: `docs/mission.md` (success criteria SC001–SC003, rejected approaches RA001–RA003) and `docs/specification/01-overview.md` (scope, constraints, stakeholders).

## Target Architecture

Stack: **Next.js 16 (App Router) + TypeScript + Tailwind v4 + next-intl**, `output: 'export'`.

The full intended directory tree, rationale for each directory, and the static-export/i18n constraints are documented in `docs/tech-stack.md` — read it before creating new files or directories, since it is the authoritative structure reference for this repo (structure decisions should not be improvised).

Load-bearing constraints (all from `docs/tech-stack.md` and `docs/specification/06-requirements.md`):

- **No `middleware.ts`, ever** — GitHub Pages static export cannot execute Next.js Middleware. Locale routing instead relies entirely on build-time `generateStaticParams` inside `src/app/[locale]/layout.tsx`, driven by `src/i18n/routing.ts`'s `defineRouting({ locales: ['en','ja','ko','zh','es'], defaultLocale: 'en', localePrefix: 'always' })`.
- **Root `src/app/page.tsx` is a static redirect stub**, not real content — a `<meta http-equiv="refresh" content="0; url=/en/">` plus hreflang links to all 5 locales (works with JS disabled), with a `useEffect` `navigator.language` match layered on top only as progressive enhancement.
- **`en.json` is the source of truth** for `src/messages/*.json`; other locales are translated from it. A missing key in any non-en catalog must **fail the build** (build-time key-parity check), not silently ship a broken locale page.
- **CSP is hash-based, not nonce-based** (`<meta http-equiv="Content-Security-Policy">` with `'sha256-<hash>'`) — GitHub Pages can't set response headers, and nonces don't work against a pre-built static HTML file served identically to every visitor.
- **Hero and Feature Grid must never contradict each other on agent counts.** Hero copy uses tool-agnostic language ("expert agents") because Claude Code (13) and Codex (8) have different agent counts; only Feature Grid states the exact per-tool numbers. This is a recurring spec-validation failure mode — check it whenever touching either section.
- No backend, no database, no auth, no forms — anything resembling `lib/api/`, `prisma/`, or client-side app state stores is out of scope by design.

## Working From the Task List

`tasks/` decomposes the spec into ordered, dependency-tracked units. Task directory naming: `NNNNNN-NNN-<category>-<slug>` (e.g. `000001-010-lib-nextjs-i18n-setup`), where the first number is the phase and the second is the step within it — lower numbers must land first. Each task directory has:

- `README.md` — purpose, spec references (primary sources to re-read before starting), scope boundaries, dependency graph (`Depends On` / `Depended By`), file ownership, and parallel-execution metadata (`Conflicts With`, `Parallelizable After`)
- `task.md` — the implementation checklist: prerequisites, allowed edit scope, stop conditions, step-by-step implementation, and verification commands
- `test.md` (where present) — manual test plan for that task

Before implementing any task, read its `README.md` Spec Reference section and the linked spec files — task checklists intentionally omit rationale that lives in the spec. Respect each task's "Allowed Edit Scope" and "Out of Scope" — tasks are designed to be parallelizable by non-overlapping file ownership; editing outside scope breaks that.

Task 000001 (`000001-010-lib-nextjs-i18n-setup`) is the project's first task — it creates `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, and `src/i18n/**`. No build/lint/test commands are runnable until it is complete.

## Commands (available once `000001-010` is complete)

```bash
npm install
npm run dev          # dev server
npm run build         # static export build (output: 'export') — must succeed with zero server dependency
npm run lint
npx tsc --noEmit      # typecheck
```

There is no test runner configured — task verification is build success (`npm run build`), typecheck, lint, and (per-task) a manual test plan in `test.md` against documented breakpoints (320/768/1024/1440) and accessibility (WCAG 2.2 AA, keyboard nav, reduced-motion).

## Specification Documents

`docs/specification/` is the single source of truth for product behavior; it is written in Korean. When a task's `README.md` cites a spec section, read that section directly rather than relying on the task summary — task files intentionally compress the spec and can omit edge cases (e.g. the Clipboard API failure-mode fallback in `04-interfaces.md`, or the install-steps scope boundary excluding the README's bash-script-fallback path in `02-features.md`).

The spec has open questions not yet resolved (`06-requirements.md#Open Questions`): whether Social Proof ships without quotes at launch, and custom-domain vs. `<owner>.github.io/...` path — both affect implementation decisions in later tasks (social-proof section conditional rendering, CNAME/canonical URL setup).

## Language Conventions

- **Assistant responses: Korean.** Always reply to the user in Korean for every session, regardless of the language of the prompt, code, or documentation. Code identifiers and comments stay English (below); only the conversational replies are Korean.
- Specification and task documentation: Korean
- UI-facing content: en/ja/ko/zh/es per `src/messages/*.json`, with `en.json` authored first
- Code (identifiers, comments): English
