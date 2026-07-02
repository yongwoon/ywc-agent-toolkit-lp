# 000001-020-ui-root-redirect-404

## Purpose
GitHub Pages가 `index.html`을 서빙하는 루트 경로(`/`)를 위한 정적 redirect stub과, 미매칭 경로를 위한 정적 `404.html`을 구현한다. 서버가 없는 static export 환경에서 `/`가 콘텐츠를 직접 갖지 않고 `/en/`으로 안내하는 것이 이 task의 핵심이다.

## Scope
- `src/app/page.tsx` — 루트 `/` 페이지: `<meta http-equiv="refresh" content="0; url=/en/">` 기반 정적 stub + 5개 locale hreflang 링크(no-JS/크롤러 대응) + `navigator.language` 매칭 기반 progressive enhancement(JS 활성 시에만 동작하는 부가 기능)
- 정적 404 처리(Next.js static export 관례에 따른 `src/app/not-found.tsx` 또는 GitHub Pages가 인식하는 `404.html` 산출물)
- `000002-020`이 재사용할 수 있도록 5개 locale 목록을 별도 모듈로 추출한 shared constant

## Spec Reference

### Primary Sources
- `docs/tech-stack.md#src/app/[locale]/` — 루트 `page.tsx`가 `/en/`으로 가는 정적 redirect stub이어야 하는 이유와 구현 방식(정적 `<meta refresh>` + `useEffect` 기반 `navigator.language` progressive enhancement)
- `docs/specification/02-features.md#Locale 전환` — `/`가 `/en/`으로 가는 정적 stub이며 JS 없이도 동작해야 한다는 요구사항, no-JS 방문자/크롤러는 stub에 포함된 hreflang 링크로 진입한다는 요구사항
- `docs/specification/02-features.md#Not Found (404)` — 정적 `404.html`이 빌드 산출물에 포함되어야 하고, 기본 locale(en) 문구로 노출되며 5개 locale 홈으로 돌아가는 링크를 제공해야 한다는 요구사항
- `docs/specification/06-requirements.md#Availability` — 미매칭 경로에서 방문자가 막다른 빈 화면을 보지 않아야 한다는 NFR
- `docs/specification/06-requirements.md#SEO` — 루트 `/`는 `localePrefix: 'always'` 정책에 따라 콘텐츠를 직접 갖지 않는 정적 리다이렉트 stub이라는 명시

### Summary
`localePrefix: 'always'` 설정 하에서는 모든 locale(기본 locale인 en 포함)이 `/en/`, `/ja/` 같은 prefix를 갖는다. 따라서 루트 `/`는 콘텐츠를 갖지 않고, `<meta http-equiv="refresh" content="0; url=/en/">`로 즉시 `/en/`을 가리키는 정적 HTML만 반환한다. 이 stub은 JS 없이도(meta refresh) 동작해야 하며, JS가 활성화된 경우에만 `navigator.language`를 읽어 방문자의 브라우저 언어에 맞는 locale로 리다이렉트를 보강하는 progressive enhancement를 추가한다 — 이것이 유일한 메커니즘이 되어서는 안 된다. no-JS 방문자와 검색엔진 크롤러는 stub에 포함된 5개 locale hreflang 링크를 통해 원하는 언어로 직접 진입한다. 404 페이지는 static export 환경에서 Route Handler로 동적 처리가 불가능하므로, 빌드 시점에 고정된 `404.html` 하나로 모든 미매칭 경로를 커버하며 기본(en) 문구와 5개 locale 홈 링크를 제공한다.

### Out of Scope (from spec)
- `[locale]/layout.tsx`의 canonical hreflang(locale별로 서로를 참조하는 완전한 hreflang alternate set) — `000002-020-ui-locale-layout-seo`에서 처리. 이 task의 루트 stub은 no-JS fallback용 hreflang 링크만 다루며, `[locale]/layout.tsx`의 canonical hreflang과 중복 구현하지 않는다
- 실제 locale 페이지 콘텐츠(hero, feature 등 section) — Phase 000003의 책임

## Criticality
`normal` — 인증/결제 등 민감 데이터가 없는 정적 redirect stub 및 404 페이지 구현

## Dependencies

### Depends On
- `000001-010-lib-nextjs-i18n-setup` — `src/i18n/routing.ts`의 locale 목록, 프로젝트 scaffold(Tailwind, tsconfig, next.config.ts)가 필요

### Depended By
- `000002-020-ui-locale-layout-seo` — 이 task가 추출한 shared locale-list constant(예: `src/i18n/locale-list.ts`)를 canonical hreflang 생성에 재사용

## Key Files
- `src/app/page.tsx` — 루트 `/` 정적 redirect stub
- `src/app/not-found.tsx` (또는 Next.js static export 관례에 따른 동등한 정적 404 메커니즘)
- `src/i18n/locale-list.ts` — 5개 locale 목록을 담은 shared constant 모듈 (Phase1 stub과 Phase2 `[locale]/layout.tsx`가 공유)

## Notes
- Planning Advisor 노트: Phase1 stub은 루트 `/`의 fallback hreflang 링크만 소유하고, Phase2의 canonical per-locale hreflang은 `000002-020`이 소유한다 — hreflang 중복 구현을 피하기 위해 locale 목록 자체를 별도 constant 모듈로 추출해 두 task가 각자의 용도로 재사용한다.
- `navigator.language` 매칭은 반드시 `useEffect` 내부에서 client-side로만 실행하고, 정적 `<meta refresh>`를 대체하는 것이 아니라 그 위에 얹는 방식으로 구현한다(먼저 meta refresh가 걸려있고, JS가 로드되면 더 정확한 language 매칭으로 override할 수 있는 여지만 남긴다). 두 메커니즘이 충돌하지 않도록 주의한다.
- Next.js static export에서 404 처리 방식은 버전에 따라 `not-found.tsx`를 빌드 시 `404.html`로 변환하는 방식과, 별도 `public/404.html`을 직접 두는 방식이 있을 수 있다 — 이 task는 실제 사용하는 Next.js 16 static export 관례를 확인 후 하나의 방식으로 확정한다.

## Parallel Execution Metadata

### Ownership
- `src/app/page.tsx`
- `src/app/not-found.tsx` (또는 채택한 정적 404 메커니즘 파일)
- `src/i18n/locale-list.ts`

### Shared Surfaces
- `src/i18n/locale-list.ts` — `000002-020`이 canonical hreflang 생성 시 동일 constant를 import하여 재사용 (locale 목록이 두 곳에서 drift하지 않도록)

### Conflicts With
- `(None identified)` — `000002-010`과는 Ownership이 겹치지 않으며 병렬 실행 가능

### Parallelizable After
- `000001-010-lib-nextjs-i18n-setup`

### Task Verify
- `npx tsc --noEmit`
- `npm run build` — 빌드 산출물에 루트 `index.html`과 `404.html`(또는 채택한 동등 산출물)이 생성되는지 확인
- 수동 확인: 빌드 산출물의 루트 `index.html`을 브라우저에서 열어 `/en/`으로 즉시 리다이렉트되는지 확인 (JS 비활성화 상태 포함)

## Out of Scope
- `[locale]/layout.tsx`의 canonical hreflang, JSON-LD, `generateStaticParams` — `000002-020`의 책임
- 실제 section 콘텐츠(hero 등) — Phase 000003의 책임
- Guidebook 관련 404/라우팅 — Phase 000004의 책임
