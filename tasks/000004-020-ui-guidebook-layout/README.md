# 000004-020-ui-guidebook-layout

## Purpose
`docs/design-system/docs-page.md`가 정의하는 3컬럼 레이아웃(top bar + sidebar + content + TOC, laravel.com/docs 스타일)을 구현한다. Sidebar는 Prologue / 시작하기 / 워크플로우 가이드 / 레퍼런스 4개 그룹으로 구성되며, v1은 한국어 콘텐츠만 다루지만 route 자체는 이후 Phase 000006의 다른 locale 확장을 대비해 locale-parameterized 구조로 설계한다.

## Scope
- `src/app/[locale]/guidebook/layout.tsx` — top bar(sticky, 60px, blur) + sidebar(264px) + content(minmax(0,1fr)) + TOC(232px) 그리드 shell, max-width ~1560px
- `src/app/[locale]/guidebook/[[...slug]]/page.tsx` — catch-all 라우트, markdown 콘텐츠를 렌더링 (v1은 ko 콘텐츠만 실제 존재)
- `src/components/guidebook/top-bar.tsx` — 워드마크 + mono nav(활성=amber) + 검색 chip(⌘K, v1은 시각적 mock만 — 아래 Notes 참고) + 버전/locale/GitHub star
- `src/components/guidebook/sidebar-nav.tsx` — Prologue/시작하기/워크플로우 가이드/레퍼런스 4개 그룹 nav, 그룹 헤더는 UPPERCASE `--text-label` + `›` 토글(접기/펼치기), 활성 링크는 amber 텍스트 + tint 배경 + 2px amber 좌측 border
- `src/components/guidebook/toc.tsx` — "On this page" eyebrow + anchor 목록, `IntersectionObserver` 기반 scroll-spy로 현재 h2 섹션 amber 강조
- `src/components/guidebook/prev-next-nav.tsx` — content 하단 edit-on-GitHub row + 2-up prev/next card nav

## Spec Reference

### Primary Sources
- `N/A — no spec doc yet in this repo; source content and TOC structure defined externally at develop-with-llm/docs/guides/guidebook/README.md (see Notes)`
- `docs/design-system/docs-page.md` — 레이아웃 anatomy(grid `264px · minmax(0,1fr) · 232px`, max-width ~1560px), top bar/sidebar/content/TOC 각각의 정확한 스타일 규칙, 반응형 breakpoint(≤1180px TOC 숨김, ≤860px sidebar가 off-canvas drawer로 전환), motion/a11y 규칙
- `docs/design-system/components.md#LocaleSwitcher` — top bar의 locale selector가 마케팅 LP와 동일한 LocaleSwitcher 계약을 재사용해야 한다는 요구사항

### Summary
`develop-with-llm/docs/guides/guidebook/README.md`가 정의하는 TOC는 Prologue(01 소개, 02 핵심 개념), 시작하기(03 quickstart), 워크플로우 가이드(04–10), 레퍼런스(11–12) 4개 그룹, 총 12개 페이지로 구성되며 현재 01–05만 upstream에 작성되어 있다. 이 task는 그 구조를 반영하는 sidebar를, `docs/design-system/docs-page.md`가 정의하는 정확한 레이아웃(top bar 60px sticky+blur, sidebar 264px, content flexible, TOC 232px, 모두 `position: sticky; top: 60px`)으로 구현한다. 실제 마크다운 콘텐츠 동기화는 `000004-030`이 담당하므로 이 task는 top bar/sidebar/content-shell/TOC/라우팅 뼈대만 구현한다(콘텐츠가 존재하는 01–05 페이지는 정상 링크, 아직 없는 06–12는 sidebar에 노출되더라도 콘텐츠 부재를 명시하는 방식으로 처리 가능). Route는 `src/app/[locale]/guidebook/[[...slug]]/page.tsx` 형태로 locale을 이미 파라미터로 받고 있으므로, v1이 한국어 콘텐츠만 제공하더라도 이후 `Phase 000006`이 다른 locale의 콘텐츠 디렉터리만 추가하면 되고 라우트 구조 자체를 재작업할 필요가 없다. Top bar의 검색(⌘K)은 `docs-page.md`도 "시각적 mock, 실제 구현은 별도 client-side index(FlexSearch/Pagefind)로 뒷받침"이라고 명시하므로, 이 task에서는 검색 UI만 mock으로 구현하고 실제 인덱싱 라이브러리 도입은 범위에서 제외한다(Out of Scope 참고 — 별도 결정 필요 시 새 lib 도입 task로 분리).

### Out of Scope (from spec)
- `(None — spec has no deferred items; 이 영역 자체가 spec 외 신규 범위)`

## Criticality
`normal` — 사용자 입력이 없는 정적 문서 사이트 레이아웃

## Dependencies

### Depends On
- `000001-010-lib-nextjs-i18n-setup` — 프로젝트 scaffold, `src/i18n/routing.ts`(locale 파라미터)가 필요
- `000004-010-lib-mdx-content-pipeline` — MDX 렌더링 라이브러리와 `guidebook-content.ts` loader가 필요

### Depended By
- `000004-030-config-guidebook-content-sync` — 이 task가 만든 sidebar TOC 데이터 구조와 route를 실제 콘텐츠에 연결
- `000005-010-config-sitemap-robots` — guidebook 페이지 URL을 sitemap에 포함하기 위해 route 구조가 필요
- `000005-020-test-build-verification` — guidebook 페이지가 빌드에 포함되는지 검증하기 위해 필요

## Key Files
- `src/app/[locale]/guidebook/layout.tsx`
- `src/app/[locale]/guidebook/[[...slug]]/page.tsx`
- `src/components/guidebook/top-bar.tsx`
- `src/components/guidebook/sidebar-nav.tsx`
- `src/components/guidebook/toc.tsx`
- `src/components/guidebook/prev-next-nav.tsx`

## Notes
- v1은 한국어(ko) 콘텐츠만 실제로 존재하지만, route는 `[locale]` 세그먼트를 그대로 유지해 이후 Phase 000006이 라우트 구조를 재작업하지 않고 콘텐츠 디렉터리만 추가하면 되도록 설계한다.
- `generateStaticParams`는 이 task 시점에는 ko 콘텐츠(001004-030에서 채워질 slug 목록)만 반영하거나, `000004-030`이 콘텐츠 동기화 후 최종화할 수 있도록 loader 함수에 위임하는 형태로 구현한다.
- sidebar 그룹 순서와 라벨(Prologue/시작하기/워크플로우 가이드/레퍼런스)은 upstream README.md의 표현을 그대로 따른다(번역하지 않음 — v1은 한국어 콘텐츠이므로 원문 그대로).
- 반응형: `≤1180px`에서 TOC 컬럼을 숨기고 2컬럼(sidebar+content)으로 전환, `≤860px`에서 sidebar가 top bar의 `≡` 버튼으로 토글되는 off-canvas drawer로 전환한다 (`docs-page.md#Responsive`).
- 스크롤 앵커: 모든 heading에 `id`를 부여하고 `scroll-behavior: smooth` + `scroll-margin-top: 76px`을 적용해 TOC/prev-next 링크로 점프해도 sticky top bar에 콘텐츠가 가려지지 않도록 한다.
- TOC의 scroll-spy(`IntersectionObserver`)와 sidebar의 그룹 접기 애니메이션은 `transform`/`opacity`만 사용하는 compositor-friendly 방식이며 `prefers-reduced-motion`을 존중한다.
- 검색(⌘K)은 v1에서 **시각적 mock만** 구현한다 — 실제 client-side 인덱싱(FlexSearch/Pagefind 등)은 새 라이브러리 도입이 필요하므로 이 task 범위 밖이며, 필요 시 별도 `lib` 카테고리 task로 분리한다 (Out of Scope 참고).
- **Open Question 상속**: `docs/specification/08-guidebook.md`가 아직 없으므로 이 task 착수 전 spec 작성을 권장한다.

## Parallel Execution Metadata

### Ownership
- `src/app/[locale]/guidebook/**`
- `src/components/guidebook/**`

### Shared Surfaces
- `src/lib/guidebook-content.ts` — `000004-010`이 소유한 loader를 read-only로 참조

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000001-010-lib-nextjs-i18n-setup`
- `000004-010-lib-mdx-content-pipeline`

### Task Verify
- `npx tsc --noEmit`
- `npm run build`
- `npm run lint`
- test.md 시나리오 수동 확인

## Out of Scope
- 실제 markdown 콘텐츠 파일 배치 및 sidebar TOC 데이터를 소스 README.md와 완전히 동기화하는 작업 — `000004-030`의 책임
- 다른 locale(ja/en/zh/es) 콘텐츠 — Phase 000006의 책임
- 실제 검색 인덱싱 라이브러리(FlexSearch/Pagefind) 도입 및 연동 — v1은 ⌘K UI mock까지만, 실 검색 기능은 이 task 범위 밖 (필요 시 별도 lib 도입 task로 분리)
