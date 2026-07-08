# 000012-010-ui-guidebook-render-sites-display-number

## Purpose
`000011-010`이 만든 `LocalizedGuidebookPageMeta.displayNumber`(zero-padded 문자열)를 실제로 사용해, 지금까지 raw `page.title`만 렌더링하던 4개 사이트(sidebar, prev/next, 페이지 `<h1>`, scale-selector)가 기존과 동일한 `"NN. Title"` 형식을 계산된 값으로 표시하도록 만든다. Spec 원본은 3개 사이트만 언급했으나, spec 검증(Code Compatibility + Completeness 2개 dimension이 독립적으로 발견)에서 `scale-selector.tsx`가 4번째 렌더 사이트임이 확인되어 이 task에 포함된다.

## Scope
- `sidebar-nav.tsx`: `{page.title}` → `` {page.displayNumber}. {page.title} `` (또는 동등한 포맷)
- `prev-next-nav.tsx`(`NavCard`): 동일 포맷 적용
- `page.tsx`: `<h1>`에 표시되는 `pageTitle` 구성 시 `displayNumber` prefix 적용. SEO `<title>` 태그(`generateMetadata`)는 spec 원본 Edge Cases 결정에 따라 기존과 동일하게 번호를 유지(변경하지 않음)
- `scale-selector.tsx`: 동일 포맷 적용, `ScaleSelectorProps.pages` 타입을 `readonly GuidebookPageMeta[]`에서 `readonly LocalizedGuidebookPageMeta[]`로 변경

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-page-numbering-refactor.md` — `## Iteration 1 Amendments` §A3(`FR-3` 대체), §A7(`scale-selector.tsx` 신규 행), 원본 `## Existing Constraints Touched`의 `sidebar-nav.tsx`/`prev-next-nav.tsx`/`page.tsx` 행(superseded 아님, 그대로 유효)

### Summary
4개 사이트 모두 `displayNumber`를 **그대로** 소비한다 — 이미 zero-padded 문자열이므로 추가 padding 로직이 필요 없다(`000011-010`이 이미 처리). AC3(spec 원본)은 이 리팩터링이 순수 렌더링 메커니즘 변경이며 실제 화면에 보이는 숫자는 리팩터링 전후로 byte-identical해야 한다고 요구한다.

### Out of Scope (from spec)
- `displayNumber`의 계산 로직 자체 — `000011-010`이 제공, 이 task는 소비만
- `search-modal.tsx`의 title 표시 — spec Iteration 1 Amendments §A8에서 명시적으로 이번 pass의 범위 밖으로 결정(향후 별도 follow-up)

## Criticality
`normal`

## Dependencies

### Depends On
- `000011-010-refactor-guidebook-nav-remove-order` — `LocalizedGuidebookPageMeta` 타입과 `displayNumber` 필드가 존재해야 이 task가 타입 체크를 통과할 수 있음. 또한 `guidebookNavGroups`의 `title` 문자열에서 숫자 prefix가 이미 제거되어 있어야, 이 task의 `${displayNumber}. ${title}` 포맷이 "01. 01. Introduction" 같은 이중 번호를 만들지 않는다.

### Depended By
- `000013-010-test-guidebook-numbering-invariant-and-fixture` — AC6 fixture 검증이 4개 렌더 사이트 전부에서 번호가 정상 표시되는지 확인하려면 이 task가 완료되어 있어야 함

## Key Files
- `src/components/guidebook/sidebar-nav.tsx`
- `src/components/guidebook/prev-next-nav.tsx`
- `src/app/[locale]/guidebook/[[...slug]]/page.tsx`
- `src/components/guidebook/scale-selector.tsx`

## Notes
- `page.tsx`의 `generateMetadata`가 사용하는 SEO `<title>`은 spec 원본 Edge Cases에서 "기존과 동일하게 번호 유지"로 이미 결정되어 있다 — 이 task에서 별도 판단 없이 그대로 따른다(번호를 빼는 것은 별도 follow-up).
- `scale-selector.tsx`는 04/05/06 페이지에서만 표시되는 컴포넌트이므로 놓치기 쉽다 — spec 검증에서 실제로 원본 spec이 이를 놓쳤던 이력이 있으니 반드시 포함.
- 4개 사이트 모두 동일한 `${displayNumber}. ${title}` 포맷 문자열을 쓰므로, 공통 포맷 헬퍼 함수를 만들어 4곳에서 재사용하는 것을 권장한다(중복 로직 방지) — 다만 이는 구현 재량이며 spec이 강제하지는 않는다.

## Parallel Execution Metadata

### Ownership
- `src/components/guidebook/sidebar-nav.tsx`
- `src/components/guidebook/prev-next-nav.tsx`
- `src/app/[locale]/guidebook/[[...slug]]/page.tsx`
- `src/components/guidebook/scale-selector.tsx`

### Shared Surfaces
- `Shared type: LocalizedGuidebookPageMeta` (000011-010이 정의, 이 task가 4곳에서 소비)

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000011-010-refactor-guidebook-nav-remove-order`

### Task Verify
- `npx tsc --noEmit` — `page.displayNumber` 접근이 4개 파일 모두에서 타입 에러 없이 통과
- `npm run build` 후 정적 HTML에서 4개 사이트 모두 `"01"`부터 `"16"`까지의 번호가 기존과 동일하게 표시되는지 확인(리팩터링 전 스냅샷과 비교, 또는 육안 확인)

## Out of Scope
- `search-modal.tsx` 수정 — spec에서 명시적으로 이번 pass 범위 밖(Edge Case A8)
- SEO `<title>` 태그에서 번호 제거 — 별도 follow-up (spec Edge Cases 결정)
- `displayNumber` 계산 로직 자체 변경 — `000011-010`의 Ownership
