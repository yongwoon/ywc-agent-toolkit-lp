# 000011-020-refactor-guidebook-slug-discovery-scripts

## Purpose
`generate-search-index.mjs`와 `generate-sitemap.mjs`가 각각 독립적으로 `src/content/guidebook/en/` 디렉터리를 정규식(`/^\d+-.+\.md$/`)으로 스캔해 페이지 목록을 만드는 방식은, 실제로 존재하는 `README.md`를 페이지로 오인하거나(spec 검증에서 발견된 실제 버그) 향후 숫자 prefix 없는 신규 페이지를 놓치는 두 가지 실패 모드를 갖는다. 이 task는 두 스크립트 모두 `guidebookNavGroups`(이미 이 repo의 유일한 route/slug source of truth)에서 slug 목록을 파생하도록 바꿔, 두 실패 모드를 구조적으로 제거한다.

## Scope
- `scripts/generate-search-index.mjs`의 `readSlugs()`를 디렉터리 정규식 스캔 대신 `guidebookNavGroups`(또는 그로부터 파생된 slug 목록)를 사용하도록 변경
- `scripts/generate-sitemap.mjs`의 `readGuidebookSlugs()`도 동일한 방식으로 변경
- 두 스크립트는 순수 `.mjs`이므로 TypeScript 모듈(`guidebook-nav.ts`)을 직접 import할 수 없다 — `generate-search-index.mjs`의 기존 주석("Duplicated rather than imported... Node can't import directly")과 동일한 제약. slug 목록을 두 스크립트가 공유할 수 있는 형태로 만드는 구체적 방법(예: 빌드 시점에 한 번 생성되는 JSON, 또는 두 스크립트에 동일한 slug 배열을 각각 하드코딩하지 않고 공유 `.mjs` 헬퍼로 분리)은 구현 시점에 결정한다 — 단, `guidebookNavGroups`가 진짜 source이고 두 스크립트가 그로부터 파생되어야 한다는 원칙은 지켜야 한다.

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-page-numbering-refactor.md` — `## Iteration 1 Amendments` §A4(`FR-4` 대체), §A7(`generate-sitemap.mjs` 신규 행)

### Summary
Spec 검증(Feasibility + Completeness + Consistency, 3개 dimension이 독립적으로 발견)에서 `README.md`가 `src/content/guidebook/<locale>/`에 실제로 존재하며, FR-4의 예시 정규식이 이를 오매칭한다는 것이 확인됐다. 또한 `generate-sitemap.mjs`가 `generate-search-index.mjs`와 동일한 구식 정규식 버그를 갖고 있다는 것도 발견됐다(원본 spec에서는 언급되지 않았던 항목). 두 문제 모두 "정규식으로 파일명을 매칭"하는 접근 자체가 근본 원인이므로, `guidebookNavGroups`에서 파생하는 방식으로 구조적으로 해결한다.

### Out of Scope (from spec)
- 새 build-time invariant 스크립트(orphan slug 검출) 작성 — `000013-010` 담당
- `package.json`의 `prebuild`에 새 invariant를 추가하는 작업 — `000013-010` 담당
- `README.md`를 `guidebookNavGroups`에 명시적으로 블록리스트로 추가하는 방식은 채택하지 않는다 — spec에서 명시적으로 "derive from guidebookNavGroups" 방식이 채택됨(블록리스트 유지 방식 대비 아키텍처적으로 더 일관됨)

## Criticality
`normal` — 빌드 스크립트 리팩터링, 민감 표면 없음

## Dependencies

### Depends On
- `(None)` — `guidebookNavGroups`의 `slug` 필드는 `000011-010`의 변경(order/title 필드 조작)과 무관하게 이미 존재하며 영향받지 않음. 따라서 이 task는 `000011-010`과 독립적으로, 병렬로 진행 가능하다.

### Depended By
- `000013-010-test-guidebook-numbering-invariant-and-fixture` — 이 task가 확립한 "guidebookNavGroups에서 파생" 패턴을 invariant 스크립트도 동일하게 따라야 함

## Key Files
- `scripts/generate-search-index.mjs` — `readSlugs()` 함수 변경
- `scripts/generate-sitemap.mjs` — `readGuidebookSlugs()` 함수 변경

## Notes
- 이 task는 `000011-010`과 **파일이 완전히 분리**되어 있고 서로의 산출물에 의존하지 않는다 — `guidebookNavGroups`의 `slug` 필드는 order/title 리팩터링과 무관하게 변하지 않기 때문이다. `ywc-parallel-executor`로 `000011-010`과 동시 실행 가능.
- `src/content/guidebook/en/`에 `README.md` 외 다른 non-content 파일이 향후 추가될 가능성을 대비해, "디렉터리에 있는 모든 것" 대신 "guidebookNavGroups에 등록된 것"을 기준으로 삼는 것이 핵심이다 — 이렇게 하면 `README.md`뿐 아니라 미래의 임의 non-content 파일도 자동으로 제외된다.
- 두 스크립트가 slug 목록을 공유하는 구체적 메커니즘(JSON 파일 생성 vs. 공유 헬퍼 모듈)은 구현 재량이나, `guidebookNavGroups`가 아닌 별도의 하드코딩된 slug 배열을 두 스크립트에 각각 유지하는 방식은 이 spec 전체의 목적(단일 source of truth)에 반하므로 피한다.

## Parallel Execution Metadata

### Ownership
- `scripts/generate-search-index.mjs`
- `scripts/generate-sitemap.mjs`

### Shared Surfaces
- `guidebookNavGroups`의 `slug` 필드를 읽기 전용으로 참조 (수정하지 않음 — `000011-010`의 Ownership)

### Conflicts With
- `(None identified)` — `000011-010`과 파일 겹침 없음, 병렬 실행 가능

### Parallelizable After
- `(Root task — no predecessor required)`

### Task Verify
- `npm run build`(prebuild가 `generate-search-index.mjs` 실행) 후 `jq 'length' src/data/guidebook-search.en.json` — `16` 출력 확인(README.md가 포함되지 않았음을 확인)
- 생성된 `src/data/guidebook-search.en.json`에 `"slug": "README"` 항목이 없는지 확인
- `npm run postbuild`(또는 `generate-sitemap.mjs` 단독 실행) 후 생성된 sitemap에 `README` slug가 없는지 확인

## Out of Scope
- `000011-010`의 `guidebookNavGroups` 타입/필드 변경 — 이 task는 `slug` 필드만 읽기 전용으로 참조
- render-site(`sidebar-nav.tsx` 등) 수정 — `000012-010` 담당
- 새 invariant 스크립트 작성 — `000013-010` 담당
