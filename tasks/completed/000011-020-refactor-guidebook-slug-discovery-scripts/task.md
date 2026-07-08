# 000011-020-refactor-guidebook-slug-discovery-scripts — Implementation Checklist

## Prerequisites
- [ ] `(None)` — `000011-010`과 독립적으로 실행 가능한 root task

## Allowed Edit Scope
- [ ] `README.md`에 선언된 Ownership(`scripts/generate-search-index.mjs`, `scripts/generate-sitemap.mjs`) 내에서만 수정
- [ ] `guidebookNavGroups`(`guidebook-nav.ts`)는 읽기 전용 참조만 — 수정하지 않음

## Stop Conditions
- [ ] `guidebookNavGroups`를 두 `.mjs` 스크립트에서 직접 import할 수 없다는 사실이 예상과 다르면(예: 빌드 설정이 이미 TS→JS 상호 import를 허용하면) 접근 방식을 재검토하고 진행 전 보고
- [ ] `README.md`를 제외한 다른 non-content 파일이 `src/content/guidebook/en/`에 이미 존재하는 것을 발견하면(현재 spec 검증 시점 기준 없음 확인됨) 진행을 멈추고 보고 — 새로운 예외 케이스일 수 있음
- [ ] `guidebookNavGroups`의 slug 개수가 16이 아니면 멈추고 보고

## Implementation Steps
- [ ] **공유 slug 소스 준비**
  - [ ] `guidebookNavGroups`(`src/components/guidebook/guidebook-nav.ts`)에서 slug 목록을 파생하는 방법 결정 — 예: `prebuild` 단계에서 slug 목록만 담은 JSON을 한 번 생성하는 작은 헬퍼 스크립트를 추가하거나, 두 `.mjs` 스크립트가 공통으로 import하는 순수 `.mjs` 헬퍼 모듈을 만들어 그 안에 slug 배열을 (컴파일 시점이 아닌) 명시적으로 유지하고 `guidebook-nav.ts`와 나란히 두어 리뷰 시 diff로 drift를 잡을 수 있게 함 — 구현 재량이나 반드시 "정규식으로 디렉터리 스캔"은 제거해야 함
- [ ] **`scripts/generate-search-index.mjs` 수정**
  - [ ] `readSlugs()` 함수를 위에서 준비한 공유 소스에서 slug 목록을 가져오도록 변경 (기존 `readdir` + 정규식 필터링 로직 제거)
  - [ ] 나머지 로직(`readFile`로 각 slug의 markdown 읽어 title/summary 추출)은 그대로 유지
- [ ] **`scripts/generate-sitemap.mjs` 수정**
  - [ ] `readGuidebookSlugs()` 함수를 동일한 공유 소스 기반으로 변경
- [ ] **README.md 오매칭 제거 확인**
  - [ ] 두 스크립트 어디에도 `README`가 slug로 등장하지 않는지 최종 확인

## Task Verify
- [ ] `npm run build` 실행 (prebuild가 `generate-search-index.mjs` 실행) → `jq 'length' src/data/guidebook-search.en.json` 결과가 `16`
- [ ] `jq '.[].slug' src/data/guidebook-search.en.json | grep -i readme` — 매치 없음
- [ ] `generate-sitemap.mjs` 실행 결과(sitemap.xml 또는 해당 산출물)에 `README` slug가 없음

## Verification
- [ ] lint 통과 (`npm run lint`)
- [ ] `npm run build` 전체 통과 (prebuild + build + postbuild)
- [ ] `npm run test:content` 통과
