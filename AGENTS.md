# Repository Guidelines

## Project Structure & Module Organization

This repository is currently in a spec-and-task-planning phase. There is no `package.json`, `src/`, or application code yet. Current sources of truth are:

- `CLAUDE.md` for agent-facing project constraints.
- `docs/mission.md` and `docs/specification/` for product scope and behavior.
- `docs/tech-stack.md` for the target Next.js directory structure.
- `docs/design-system/` for UI tokens, component contracts, and content voice.
- `tasks/NNNNNN-NNN-<category>-<slug>/` for ordered implementation work. Each task contains `README.md`, `task.md`, and sometimes `test.md`.

When implementation begins, build toward the planned `src/app`, `src/components`, `src/i18n`, `src/messages`, and `public` layout described in `docs/tech-stack.md`.

## Build, Test, and Development Commands

No commands are runnable until task `000001-010-lib-nextjs-i18n-setup` creates the Node/Next.js project files. After that task lands, use:

```bash
npm install       # install dependencies
npm run dev       # start the local Next.js dev server
npm run build     # produce the static export for GitHub Pages
npm run lint      # run lint checks
npx tsc --noEmit  # typecheck without emitting files
```

`npm run build`, lint, and typecheck should pass before handing off implementation work.

## Coding Style & Naming Conventions

Target stack: Next.js 16 App Router, TypeScript, Tailwind v4, and `next-intl`. Use English for code identifiers and comments. Keep specification and task documentation in Korean unless updating existing English docs. Use lowercase kebab-case filenames such as `site-header.tsx`, `code-block.tsx`, and `install-steps.tsx`.

Do not add `middleware.ts`; this site must work as a static GitHub Pages export. Keep UI composition section-based: `components/sections/*` may import `components/ui/*`, but sections should not depend on each other.

## Testing Guidelines

There is no test runner configured yet. Follow each task's `test.md` when present, and verify responsive behavior at 320, 768, 1024, and 1440 px. Required checks are static build success, TypeScript, lint, keyboard navigation, reduced-motion behavior, and WCAG 2.2 AA accessibility expectations.

## Commit & Pull Request Guidelines

Git history currently contains only `first commit`, so no detailed convention is established. Use short, imperative commit messages such as `Add i18n routing setup` or `Implement hero section`. Pull requests should include a summary, linked task directory, verification commands run, screenshots for UI changes, and any unresolved spec questions.

## Security & Configuration Tips

Keep the project backend-free: no API routes, database, auth, forms, `prisma/`, or global client stores. Translation catalogs must keep `en.json` as the source of truth, with matching keys across `ja`, `ko`, `zh`, and `es`. CSP must be static/hash-based, not nonce-based.
