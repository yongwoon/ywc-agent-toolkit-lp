# 000011-010-refactor-guidebook-nav-remove-order

## Purpose
Guidebook 페이지 순서/번호의 duplication 문제를 근본적으로 해결하기 위한 첫 단계로, `order` 필드를 타입 시스템 전체에서 제거하고 `guidebookNavGroups` 배열의 위치(array position)를 순서의 유일한 source of truth로 만든다. 이 task는 이후 render-site task(000012-010)와 검증 task(000013-010)가 딛고 설 기반(foundation) 레이어다.

## Scope
- `GuidebookPageMeta.order`, `GuidebookFrontmatter.order` 필드 삭제
- `guidebookNavGroups`의 16개 entry에서 `order: N` 필드 제거, `title` 문자열에서 `"NN. "` prefix 제거(예: `"16. Managing Code Structure and Maintainability"` → `"Managing Code Structure and Maintainability"`)
- `inferOrderFromFilePath` 함수 삭제 (dead code)
- 새 파생 타입 `LocalizedGuidebookPageMeta`(`GuidebookPageMeta`를 extend, `displayNumber: string` 필드 추가) 도입
- `loadLocalizedGuidebookNav`가 각 page에 대해 zero-padded `displayNumber`(`String(1 + guidebookPages.findIndex(...)).padStart(2, "0")`)를 계산해 `LocalizedGuidebookPageMeta[]`로 반환하도록 수정

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-page-numbering-refactor.md` — `## Iteration 1 Amendments` §A2 (`FR-1` 대체), §A7 (Existing Constraints Touched corrected rows), 원본 `## Existing Constraints Touched` 표 (superseded 되지 않은 행: `guidebook-nav.ts:12-19`, `guidebook-nav.ts:73-227`, `guidebook-content.ts:154-168`, `guidebook-content.ts:236-244`, `guidebook-content.ts:229-234`, `guidebook-nav-content.ts:22-42`)

### Summary
`order` 필드는 현재 `guidebook-nav.ts`(하드코딩 16개 literal)와 `guidebook-content.ts`(파일명에서 정규식으로 추출)에 중복 존재한다. 이 task는 `guidebook-nav.ts`의 배열 위치를 유일한 순서 source로 만들고, `displayNumber`(zero-padded string, 예: `"01"`, `"16"`)를 계산하는 로직을 `guidebook-nav-content.ts`에 둔다. `displayNumber`는 반드시 문자열이며 이미 zero-padding 되어 있어야 한다 — render-site task(000012-010)가 추가 padding 없이 그대로 사용한다.

### Out of Scope (from spec)
- 렌더 사이트(`sidebar-nav.tsx` 등)에서 실제로 `displayNumber`를 사용하는 것 — `000012-010`이 담당
- `generate-search-index.mjs`/`generate-sitemap.mjs` 스크립트 수정 — `000011-020`이 담당
- 기존 80개 markdown 파일(16 page × 5 locale)의 H1 텍스트나 파일명 수정 — spec 원본 Out of Scope, 이번 리팩터링 전체에서 다루지 않음

## Criticality
`normal` — 인증/결제 등 민감 표면과 무관한 내부 리팩터링

## Dependencies

### Depends On
- `(None)` — 이 배치의 root task

### Depended By
- `000012-010-ui-guidebook-render-sites-display-number` — `LocalizedGuidebookPageMeta` 타입과 `displayNumber` 계산 로직을 소비
- `000013-010-test-guidebook-numbering-invariant-and-fixture` — `order` 필드가 완전히 제거되었는지, `guidebookNavGroups`가 유일한 source인지 검증

## Key Files
- `src/components/guidebook/guidebook-nav.ts` — `GuidebookPageMeta` 타입에서 `order` 제거, `guidebookNavGroups`의 16개 entry에서 `order` 필드 삭제 및 `title` prefix 제거
- `src/lib/guidebook-content.ts` — `GuidebookFrontmatter`에서 `order` 필드 제거, `normalizeGuidebookFrontmatter`에서 order 해석 로직 삭제, `inferOrderFromFilePath` 함수 삭제
- `src/lib/guidebook-nav-content.ts` — `LocalizedGuidebookPageMeta` 타입 신설, `loadLocalizedGuidebookNav`의 반환 타입을 `LocalizedGuidebookNavGroup`(`pages: LocalizedGuidebookPageMeta[]`)으로 변경하고 `displayNumber` 계산 로직 추가

## Notes
- `displayNumber`는 group-local이 아니라 **global** index 기준이다 (`guidebookPages`, 즉 `guidebookNavGroups.flatMap(g => g.pages)` 전체에서의 위치) — group별로 재시작하지 않는다.
- `findIndex`를 페이지마다 호출하면 O(n²)이지만 `n=16`이라 무시 가능한 수준이다(spec Feasibility 검증 완료, 5 locale × 16² ≈ 1,280 비교). 단일 pass로 index map을 미리 만드는 최적화는 선택 사항이다.
- `inferTitleFromFilePath`는 삭제하지 않는다 — H1이 없을 때의 최후 fallback으로 유지.
- `guidebookPages` 배열은 `as const`(readonly)다. `readonly ... as const` 배열에서 `order` 필드를 제거하는 것은 spec의 Feasibility 검증에서 이미 type-safe함을 확인했다(`tsconfig.json`에 `exactOptionalPropertyTypes` 등 충돌 옵션 없음).

## Parallel Execution Metadata

### Ownership
- `src/components/guidebook/guidebook-nav.ts`
- `src/lib/guidebook-content.ts`
- `src/lib/guidebook-nav-content.ts`

### Shared Surfaces
- `Shared type: GuidebookPageMeta` (base type, 이 task가 필드를 제거) — `000012-010`이 파생 타입 `LocalizedGuidebookPageMeta`를 소비
- `Shared type: GuidebookFrontmatter`

### Conflicts With
- `(None identified)` — `000011-020`은 다른 파일(`scripts/`)만 건드리므로 병렬 실행 가능

### Parallelizable After
- `(Root task — no predecessor required)`

### Task Verify
- `grep -n "order" src/components/guidebook/guidebook-nav.ts src/lib/guidebook-content.ts` — `order`를 포함한 무관한 식별자(`orderBy` 등)를 제외하고 매치가 없어야 함
- `grep -n "inferOrderFromFilePath" src/lib/guidebook-content.ts` — 매치 없어야 함(함수 완전 삭제 확인)

## Out of Scope
- 렌더 사이트 4곳(`sidebar-nav.tsx`, `prev-next-nav.tsx`, `page.tsx`, `scale-selector.tsx`)의 실제 `displayNumber` 사용 — `000012-010` 담당, 이 task는 타입과 계산 로직만 제공
- `generate-search-index.mjs`/`generate-sitemap.mjs` 수정 — `000011-020` 담당
- 새 build-time invariant 스크립트 작성 — `000013-010` 담당
