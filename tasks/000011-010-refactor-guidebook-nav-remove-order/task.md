# 000011-010-refactor-guidebook-nav-remove-order — Implementation Checklist

## Prerequisites
- [ ] `(None)` — root task, 사전 조건 없음

## Allowed Edit Scope
- [ ] `README.md`에 선언된 Ownership(`guidebook-nav.ts`, `guidebook-content.ts`, `guidebook-nav-content.ts`) 내에서만 수정
- [ ] Ownership 밖의 수정이 필요하면 진행을 멈추고 보고

## Stop Conditions
- [ ] `guidebookNavGroups`의 16개 entry 개수가 예상과 다르면(16이 아니면) 멈추고 보고 — 다른 작업이 병행되어 배열이 변경되었을 가능성
- [ ] `GuidebookPageMeta`/`GuidebookFrontmatter`를 이 task의 Ownership 밖 파일이 이미 참조하고 있어 타입 변경이 파급되면 멈추고 보고
- [ ] `tsconfig.json`에 `readonly as const` 배열의 필드 제거를 막는 옵션(예: `exactOptionalPropertyTypes`)이 실제로 존재해 타입 에러가 나면 멈추고 보고 (spec Feasibility 검증에서는 없는 것으로 확인됐으나 재확인 필요)

## Implementation Steps
- [ ] **`src/components/guidebook/guidebook-nav.ts` 수정**
  - [ ] `GuidebookPageMeta` 타입에서 `order: number` 필드 제거
  - [ ] `guidebookNavGroups` 배열의 16개 entry 전부에서 `order: N,` 라인 삭제
  - [ ] 16개 entry의 `title` 문자열에서 `"NN. "` prefix 제거(예: `"01. Introduction"` → `"Introduction"`) — 16개 전부 확인, 하나라도 누락 없이
- [ ] **`src/lib/guidebook-content.ts` 수정**
  - [ ] `GuidebookFrontmatter` 타입에서 `order?: number` 필드 제거
  - [ ] `normalizeGuidebookFrontmatter` 함수에서 `order = readOptionalNumber(data, "order") ?? inferOrderFromFilePath(filePath)` 라인 및 반환 객체의 `order` 필드 삭제
  - [ ] `inferOrderFromFilePath` 함수 전체 삭제(더 이상 호출자 없음)
  - [ ] `inferTitleFromFilePath` 함수는 그대로 유지(삭제하지 않음)
- [ ] **`src/lib/guidebook-nav-content.ts` 수정**
  - [ ] `LocalizedGuidebookPageMeta` 타입 신설: `GuidebookPageMeta`를 extend하고 `displayNumber: string` 필드 추가
  - [ ] `LocalizedGuidebookNavGroup.pages`의 타입을 `GuidebookPageMeta[]`에서 `LocalizedGuidebookPageMeta[]`로 변경
  - [ ] `loadLocalizedGuidebookNav` 내부에서 각 group의 `pages`를 빌드한 뒤, `guidebookPages`(전체 flatten 배열) 기준 global index로 `displayNumber = String(1 + guidebookPages.findIndex((p) => p.slug === page.slug)).padStart(2, "0")`를 계산해 각 page 객체에 추가

## Task Verify
- [ ] `grep -n "order" src/components/guidebook/guidebook-nav.ts src/lib/guidebook-content.ts` — `order`가 무관한 식별자(`orderBy` 등)를 제외하고 매치 없음
- [ ] `grep -n "inferOrderFromFilePath" src/lib/guidebook-content.ts` — 매치 없음
- [ ] `grep -c "title: \"" src/components/guidebook/guidebook-nav.ts` 결과의 각 title 값이 숫자로 시작하지 않는지 육안 확인(16개 전부)

## Verification
- [ ] lint 통과 (`npm run lint`)
- [ ] typecheck 통과 (`npm run typecheck`)
- [ ] `npm run build` 통과 — 이 시점에서는 render-site task(000012-010)가 아직 `displayNumber`를 소비하지 않으므로 unused-field 경고만 있을 수 있음, 에러는 없어야 함
