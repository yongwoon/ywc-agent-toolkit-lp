# 000001-010-lib-nextjs-i18n-setup

## Purpose
Next.js 16 App Router 프로젝트를 Tailwind v4, next-intl과 함께 scaffold하고, GitHub Pages 정적 호스팅을 위한 static export 설정(`output: 'export'`)을 완료한다. 이 task는 전체 프로젝트의 첫 번째 task이며, 이후 모든 task가 이 위에서 작업을 시작한다.

## Scope
- Next.js 16 프로젝트 초기화 (package.json, tsconfig.json)
- Tailwind v4 설정
- next.config.ts의 static export 설정 (`output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`)
- next-intl의 routing/request 기본 설정 (locale 목록, defaultLocale, localePrefix)
- Root layout(`src/app/layout.tsx`) — locale 정보를 알지 못하는 순수 `<html>/<body>` shell만 포함
- Tailwind entry(`src/app/globals.css`)

## Spec Reference

### Primary Sources
- `docs/tech-stack.md` — 전체 디렉터리 구조, `next.config.ts` 핵심 설정값(`output: 'export'`, `images.unoptimized`, `trailingSlash`), `src/i18n/` 구성(`routing.ts`/`request.ts`/`navigation.ts`)의 역할과 근거
- `docs/specification/01-overview.md#Constraints` — GitHub Pages 배포 제약(서버 실행 환경 없음, Middleware/API Route 불가), en.json 기준 빌드 타임 key-parity 검사 요구사항의 출발점
- `docs/mission.md#Success Criteria` — SC001(5개 locale 지원), SC002(순수 static export, zero server dependency)
- `docs/mission.md#Rejected Approaches` — RA003(next-intl 표준 `middleware.ts` 기반 locale negotiation은 GitHub Pages static export에서 동작하지 않으므로 채택하지 않음 — `generateStaticParams` 기반 빌드 타임 사전 렌더링으로 대체)
- `docs/design-system/design-tokens.css`(globals.css에 import), `docs/design-system/tailwind-theme.css`(참고용 — `tailwind.config.ts`에 수동 이식), `docs/design-system/README.md#Fonts` — `next/font/google` 폰트 로딩 방식(로컬 바이너리 없음)

### Summary
이 프로젝트는 서버가 없는 순수 정적 사이트이므로 next-intl의 표준 `middleware.ts` 기반 locale negotiation을 사용할 수 없다. 대신 `src/i18n/routing.ts`에서 `defineRouting({ locales: ['en','ja','ko','zh','es'], defaultLocale: 'en', localePrefix: 'always' })`을 정의하고, 이후 task(000002-020)의 `[locale]/layout.tsx`가 `generateStaticParams`로 5개 locale 페이지를 빌드 타임에 모두 사전 렌더링한다. 이 task는 그 기반이 되는 프로젝트 scaffold와 `routing.ts`/`request.ts`/`navigation.ts`까지만 다루며, locale-aware 페이지 자체는 이후 task의 책임이다. Root `layout.tsx`는 locale을 전혀 알지 못하는 최소 shell로 유지한다 — locale 관련 처리는 전부 `[locale]/layout.tsx`(000002-020)에서 이루어진다.

### Out of Scope (from spec)
- `[locale]/layout.tsx`, `generateStaticParams`, hreflang, JSON-LD — `000002-020-ui-locale-layout-seo`에서 처리
- 번역 카탈로그(en/ja/ko/zh/es.json) 콘텐츠 작성 — `000002-010-config-translation-catalogs`에서 처리
- `/` 루트 stub 페이지, 404 페이지 — `000001-020-ui-root-redirect-404`에서 처리
- MDX/markdown 렌더링 라이브러리 도입 — `000004-010-lib-mdx-content-pipeline`에서 처리 (guidebook 전용 의존성이므로 이 task에서 함께 넣지 않음)

## Criticality
`normal` — 인증/결제/민감 데이터가 없는 순수 정적 마케팅 페이지의 프로젝트 scaffold 작업

## Dependencies

### Depends On
- (None — 프로젝트의 첫 번째 task)

### Depended By
- `000001-020-ui-root-redirect-404` — `src/i18n/routing.ts`의 locale 목록과 프로젝트 scaffold(Tailwind, tsconfig)가 필요
- `000002-010-config-translation-catalogs` — 번역 카탈로그가 로드될 프로젝트 구조(package.json, tsconfig)가 필요
- `000002-020-ui-locale-layout-seo` — `src/i18n/routing.ts`/`request.ts`, root `layout.tsx`가 필요
- `000004-010-lib-mdx-content-pipeline` — 프로젝트 scaffold(package.json, tsconfig, next.config.ts) 위에 MDX 의존성을 추가

## Key Files
- `package.json` — Next.js 16, Tailwind v4, next-intl, TypeScript 의존성 선언
- `next.config.ts` — `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`
- `tailwind.config.ts` — `theme.extend`에 `docs/design-system/tailwind-theme.css`의 `@theme` 매핑(색상/폰트/radius/shadow 토큰)을 `var(--token)` 참조 형태로 수동 이식
- `tsconfig.json` — ES2017 target, bundler moduleResolution, `@/*` path alias
- `src/app/layout.tsx` — root shell (locale 비관여)
- `src/app/globals.css` — `@import "tailwindcss";` → `docs/design-system/design-tokens.css`(raw `:root { --… }` 토큰) 내용, 이 순서로 2단 구성. `tailwind-theme.css`는 import하지 않고 `tailwind.config.ts`에 수동 이식 (프로젝트가 CSS-first `@theme`보다 `tailwind.config.ts` 파일 기반 설정을 선호)
- `src/i18n/routing.ts` — `defineRouting({ locales: [en, ja, ko, zh, es], defaultLocale: 'en', localePrefix: 'always' })`
- `src/i18n/request.ts` — `getRequestConfig` — locale별 `messages/<locale>.json` 로드
- `src/i18n/navigation.ts` — `createNavigation`으로 locale-aware `Link`/`redirect`/`usePathname` wrapper 생성

## Notes
- `middleware.ts`는 의도적으로 생성하지 않는다 — GitHub Pages는 이를 실행할 수 없다 (`docs/tech-stack.md` Extras 참고).
- `src/messages/*.json`은 이 task에서 빈 파일 또는 최소 placeholder만 두거나 아예 생성하지 않아도 되며, 실제 카탈로그 콘텐츠는 `000002-010`의 책임이다. 다만 `request.ts`가 참조할 파일 경로 규칙(`src/messages/<locale>.json`)은 이 task에서 확정한다.
- `docs/design-system/tailwind-theme.css`는 Tailwind v4의 CSS-first `@theme {}` 블록으로 제공되지만, 이 프로젝트는 `tailwind.config.ts` 파일 기반 설정을 선호하는 방침이므로 그대로 import하지 않는다 — 동일한 매핑 내용을 `tailwind.config.ts`의 `theme.extend`에 수동으로 옮겨 적어 참고 자료로만 사용한다. `design-tokens.css`(raw `:root` 토큰)는 컴포넌트가 `var(--bg)` 등을 직접 참조하는 경우가 있어 계속 `globals.css`에 import한다.
- 이 시점에는 아직 `package.json`이 없으므로, task.md의 Verification 커맨드는 이 task 완료 이후부터 실행 가능하다.

## Parallel Execution Metadata

### Ownership
- `package.json`
- `next.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`
- `src/app/layout.tsx`
- `src/app/globals.css` (design-tokens.css `@import` 대상)
- `src/i18n/**`

### Shared Surfaces
- Workspace-level configuration: `package.json`, `tsconfig.json` — 이후 모든 task가 의존성을 추가/확장하므로 최초 스키마를 여기서 확정
- `src/i18n/routing.ts`의 locale 목록 — `000001-020`, `000002-020`, `000004-020`이 동일 locale 목록을 참조

### Conflicts With
- `(None identified)` — 첫 task이므로 병렬 실행 대상이 없음

### Parallelizable After
- `(Root task — no predecessor required)`

### Task Verify
- `npm install`
- `npx tsc --noEmit`
- `npm run build`

## Out of Scope
- Locale-aware 페이지, section 컴포넌트, UI 프리미티브 — Phase 000003의 책임
- SEO metadata, JSON-LD 빌더 — `000002-020`의 책임
- 실제 번역 문구 콘텐츠 — `000002-010`의 책임
