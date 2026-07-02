# 000001-020-ui-root-redirect-404 — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000001-010-lib-nextjs-i18n-setup` is completed (merged) — `src/i18n/routing.ts`, `next.config.ts`, Tailwind/tsconfig scaffold가 존재해야 한다

## Allowed Edit Scope
- [ ] `src/app/page.tsx`, `src/app/not-found.tsx`(또는 채택한 정적 404 메커니즘), `src/i18n/locale-list.ts`에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] `000001-010`이 실제로 merge되지 않았거나 `src/i18n/routing.ts`가 존재하지 않으면 멈춘다
- [ ] Next.js 16 static export가 `not-found.tsx`를 `404.html`로 변환하지 않는 것으로 확인되면(별도 `public/404.html` 필요), 대체 접근법을 결정하기 전에 멈추고 보고한다
- [ ] hreflang 링크 목록을 `[locale]/layout.tsx`(000002-020)의 canonical hreflang과 중복 구현하게 되는 상황이면 멈추고 `src/i18n/locale-list.ts` 재사용 여부를 재확인한다

## Implementation Steps
- [ ] **Shared locale-list constant 추출**
  - [ ] `src/i18n/locale-list.ts`에 5개 locale 코드(`en`, `ja`, `ko`, `zh`, `es`)와 표시용 라벨을 담은 배열/객체 export (routing.ts의 locales와 값이 drift하지 않도록 동일 소스 참조 또는 동기화)
- [ ] **루트 `/` 정적 redirect stub 구현**
  - [ ] `src/app/page.tsx` 작성 — `<meta http-equiv="refresh" content="0; url=/en/">`를 포함하는 최소 HTML body 반환
  - [ ] 5개 locale 각각으로의 `<link rel="alternate" hreflang="...">` 태그를 `src/i18n/locale-list.ts` 기반으로 렌더링
  - [ ] `useEffect` 내부에서 `navigator.language`를 읽어 지원 locale 중 일치하는 항목이 있으면 해당 locale로 client-side redirect (meta refresh를 대체하지 않고 보강하는 방식)
- [ ] **정적 404 처리 구현**
  - [ ] Next.js 16 static export의 실제 404 산출물 생성 방식을 확인 (`not-found.tsx` → `404.html` 자동 변환 여부)
  - [ ] 확인된 방식에 따라 `src/app/not-found.tsx` 작성 — 기본(en) 문구 + 5개 locale 홈(`/en/`, `/ja/`, `/ko/`, `/zh/`, `/es/`)으로 돌아가는 링크 목록
- [ ] **빌드 산출물 검증**
  - [ ] `npm run build` 실행 후 산출물 디렉터리에 루트 `index.html`과 404 산출물이 실제로 생성되는지 확인

## Task Verify
- [ ] `npx tsc --noEmit`
- [ ] `npm run build` — 빌드 산출물에 루트 `index.html`, 404 산출물이 포함되는지 확인
- [ ] 브라우저에서 빌드 산출물의 루트 `index.html`을 열어 `/en/`으로 즉시 리다이렉트되는지 수동 확인 (JS 비활성화 상태에서도 meta refresh로 동작하는지 확인)

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 순수 정적 stub이며 로직 단위 테스트 대상이 제한적)
- [ ] integration tests pass (해당 없음 — Phase 000005에서 빌드 전체 검증으로 흡수)
- [ ] app builds without error (`npm run build`)
