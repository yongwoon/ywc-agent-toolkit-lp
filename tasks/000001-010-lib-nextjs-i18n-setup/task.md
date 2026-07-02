# 000001-010-lib-nextjs-i18n-setup — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] (없음 — 이 task는 프로젝트의 첫 번째 task이며 선행 의존성이 없다)

## Allowed Edit Scope
- [ ] `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/i18n/**`에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] `docs/tech-stack.md`가 명시한 디렉터리 구조와 다른 구조가 필요해지면 멈추고 보고한다
- [ ] next-intl 버전이 `defineRouting`/`createNavigation` API를 지원하지 않으면(구버전 API만 제공) 멈추고 보고한다
- [ ] Tailwind v4 설정이 `docs/tech-stack.md`가 전제한 `tailwind.config.ts` 파일 기반 설정과 호환되지 않으면 멈추고 보고한다

## Implementation Steps
- [ ] **프로젝트 scaffold 초기화**
  - [ ] `npx create-next-app@latest`(또는 동등한 수동 구성)로 `package.json`, `tsconfig.json` 생성 — App Router, TypeScript 사용, src 디렉터리 사용 옵션 선택
  - [ ] `package.json`에 `next-intl` 의존성 추가
  - [ ] `tsconfig.json`에 ES2017 target, bundler moduleResolution, `@/*` → `src/*` path alias 설정
- [ ] **Tailwind v4 설정 (`tailwind.config.ts` 파일 기반 — CSS-first `@theme` import는 사용하지 않음, 프로젝트 방침)**
  - [ ] `tailwindcss`, `@tailwindcss/postcss`(또는 v4가 요구하는 동등 패키지) 의존성 추가
  - [ ] `src/app/globals.css`에 2개 entry 작성: `@import "tailwindcss";` → `docs/design-system/design-tokens.css` 내용을 `@import`하거나 그대로 복사 (raw `:root { --… }` 토큰만 — `tailwind-theme.css`는 import하지 않음)
  - [ ] `tailwind.config.ts` 생성 — `docs/design-system/tailwind-theme.css`의 `@theme { … }` 매핑을 동일한 의미로 `theme.extend`에 수동으로 옮겨 적는다 (예: `colors: { bg: 'var(--bg)', surface: 'var(--surface)', accent: 'var(--accent)', link: 'var(--link)', 'lane-claude': 'var(--lane-claude)', 'lane-codex': 'var(--lane-codex)', 'state-pass': 'var(--state-pass)', … }`, `fontFamily: { display: 'var(--font-display)', sans: 'var(--font-sans)', mono: 'var(--font-mono)' }`, `borderRadius: { xs: '3px', sm: '5px', md: '8px', lg: '12px' }`) — `tailwind-theme.css`에 있는 모든 `--color-*`/`--font-*`/`--text-*`/`--radius-*`/`--shadow-*` 매핑을 빠짐없이 포함
  - [ ] `body`에 `docs/design-system/design-tokens.css`가 정의하는 canvas 스타일(`background-color: var(--bg)`, dot-grid `background-image`, `font-family: var(--font-sans)`) 적용
- [ ] **폰트 로딩 (design-tokens.css의 `--font-*` 토큰과 매칭)**
  - [ ] `next/font/google`로 Space Grotesk(`--font-display`), IBM Plex Sans(`--font-sans`), IBM Plex Mono(`--font-mono`) 로드 — 실제 적용은 `000002-020`의 `[locale]/layout.tsx`에서 수행하되, 이 task에서 폰트 로딩 방식(로컬 바이너리 없이 Google Fonts만 사용)을 확정
  - [ ] CJK locale(ja/ko/zh)용 Noto Sans JP/KR/SC를 `--cjk-fallback`으로 추가 로드할지, 시스템 폰트 폴백만 사용할지 결정하고 `docs/tech-stack.md`에 반영
- [ ] **Static export 설정**
  - [ ] `next.config.ts`에 `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true` 설정
- [ ] **next-intl 기본 설정**
  - [ ] `src/i18n/routing.ts` 작성 — `defineRouting({ locales: ['en','ja','ko','zh','es'], defaultLocale: 'en', localePrefix: 'always' })`
  - [ ] `src/i18n/request.ts` 작성 — `getRequestConfig`로 `src/messages/<locale>.json` 로드 (파일이 아직 없어도 경로 규칙만 확정)
  - [ ] `src/i18n/navigation.ts` 작성 — `createNavigation(routing)`으로 `Link`, `redirect`, `usePathname`, `useRouter` export
- [ ] **Root layout 작성**
  - [ ] `src/app/layout.tsx`에 locale을 알지 못하는 최소 `<html>/<body>` shell만 작성 (next-intl Provider 없음 — 이는 `000002-020`의 `[locale]/layout.tsx` 책임)

## Task Verify
- [ ] `npx tsc --noEmit` — `src/i18n/**` 및 root layout이 타입 오류 없이 컴파일되는지 확인
- [ ] `npm run build` — static export 설정(`output: 'export'`)이 오류 없이 빌드되는지 확인 (이 시점에는 locale 페이지가 없으므로 최소 빌드만 통과하면 됨)

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 이 task는 설정/scaffold만 다루며 테스트 대상 로직이 없음)
- [ ] integration tests pass (해당 없음)
- [ ] app builds without error (`npm run build`)

<!-- 이 task 완료 시점부터 위 커맨드들이 실제로 실행 가능해진다. -->
