# 000020-010-test-verify-guidebook-infra-cloud-build

## Purpose
`000018-010`, `000019-010`, `000019-020`이 완료된 후, 신규 Guidebook 페이지 등록 + 전체 리넘버링 캐스케이드가 8개 Acceptance Criteria(AC1-AC8, amended 버전 포함) 전부를 충족하는지 통합 검증하고, 정식 빌드/린트/타입체크/콘텐츠 검사/번들 예산 파이프라인이 정상 동작하는지 최종 확인한다.

## Scope
- 코드/콘텐츠 편집 없음 — 순수 검증만 수행
- `npm run build` 전체 실행(prebuild: `fetch-github-stars.mjs` → `generate-search-index.mjs` → `check-guidebook-nav-registration.mjs` → `check-message-keys.mjs`, postbuild 포함)
- `npm run lint`, `npx tsc --noEmit`(A8)
- `npm run test:content`(`check-guidebook-paths.mjs`)
- `npm run verify:bundle`(A8 — 캐비어트: 랜딩 페이지 번들만 측정, 가이드북 콘텐츠 자체는 커버하지 않는 일반 회귀 sanity check)
- 저장소 전체에 걸친 최종 grep 스윕 재실행(A1 pairing 체크, `000019-010`/`000019-020` 각각의 Task Verify를 전체 `src/content/guidebook/**` 범위로 재확인)
- AC1(슬러그 셋 일치, A4 narrowed), AC2(5개 로케일 콘텐츠 완결성), AC3(amended, A1 pairing), AC4(README TOC/Quick Links, A8 prose 포함), AC5(amended, A2 — A-Z 테이블 번호 충돌 없음), AC6(skill-links.ts 라우팅), AC7(빌드/린트/타입체크/콘텐츠 검사 전부 통과), AC8(검색 인덱스 미수동편집) 각각 최종 확인
- anchor collision 확인(NFR, A6) — 신규 페이지의 heading 목록에 중복 텍스트가 없는지 확인

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md` — `## Acceptance Criteria`(AC1-AC8 전체), `## Non-Functional Requirements`, `## Iteration 1 Amendments`(A1-A8 전체)

### Summary
이 spec은 8개 AC 중 다수(AC1, AC3, AC5, AC7)가 개별 편집 task 단독으로는 검증 불가능하고 전체 저장소 범위의 빌드/grep이 필요하다고 명시한다. 특히 AC7은 amended(A8)로 `npm run lint`와 `npx tsc --noEmit`을 `npm run build`/`npm run test:content`와 나란히 명시적으로 요구한다. AC8(검색 인덱스 파일 미수동편집)은 `npm run build`가 자동 재생성한 `src/data/guidebook-search.*.json`의 diff가 수작업 흔적 없이 정확히 빌드 산출물과 일치해야 함을 의미한다. 이 task는 `000019-010`과 `000019-020`이 각자 Task Verify에서 자신의 파일 범위만 확인했던 것과 달리, 저장소 전체 `src/content/guidebook/**/*.md`에 대해 A1의 5개 pairing 체크를 재실행해 두 task 사이의 경계에서 누락된 파일이 없는지 교차 확인한다.

### Out of Scope (from spec)
- `src/data/guidebook-search.*.json`의 수동 편집 — `npm run build`가 자동 재생성하므로 편집하지 않음

## Criticality
`normal` — 검증 전용, 코드/콘텐츠 변경 없음

## Dependencies

### Depends On
- `000019-010-refactor-guidebook-renumber-core-pages`
- `000019-020-config-guidebook-cross-reference-sweep`

### Depended By
- `(None)` — 이 배치의 마지막 task

## Key Files
- `(없음 — 검증 전용, 파일 수정 없음)`

## Notes
- 이 task에서 grep 스윕이 실패하면(stale 페어링 발견) `000019-010` 또는 `000019-020` 중 해당 파일을 소유한 task를 재오픈해야 한다 — 이 task 자체는 편집 권한이 없다.
- `src/data/guidebook-search.*.json`의 diff가 존재한다면, `npm run build`가 생성한 결과와 정확히 일치하는지 확인한다(수동 편집 흔적이 있으면 안 됨).
- anchor collision 확인은 자동화된 도구가 없으므로 신규 페이지(`17-infrastructure-and-cloud.md`) 5개 로케일의 heading 목록을 육안으로 검토해 동일 텍스트의 heading이 두 번 나타나지 않는지 확인한다(A6).

## Parallel Execution Metadata

### Ownership
- `(None)` — 파일 수정 없음, 검증 전용

### Shared Surfaces
- `(None)`

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000019-010-refactor-guidebook-renumber-core-pages`, `000019-020-config-guidebook-cross-reference-sweep`

### Task Verify
- `npm run build` 성공(전체 prebuild/postbuild 파이프라인 포함)
- `npm run lint` 성공
- `npx tsc --noEmit` 성공
- `npm run test:content` 성공
- `npm run verify:bundle` 성공
- `rg -n "\[1[3-6]\.\s" src/content/guidebook/**/*.md` 및 `rg -n "\]\(\./1[3-6]-(code-structure|executor-and-codegen|skill-reference|prerequisites)" src/content/guidebook/**/*.md` — 저장소 전체 범위에서 A1의 5개 pairing만 존재
- `14-skill-reference.md`(5개 로케일) A-Z 테이블에서 동일 대괄호 번호가 서로 다른 대상을 가리키는 사례 없음(amended AC5)

## Out of Scope
- Phase 000018/000019 task의 실제 편집 — 이 task는 검증만 수행
