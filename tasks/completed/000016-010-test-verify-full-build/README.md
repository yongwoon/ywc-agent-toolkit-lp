# 000016-010-test-verify-full-build

## Purpose
Phase 000015가 완료된 후, 전체 저장소에 걸쳐 skill/agent 개수가 일관되게 갱신되었는지(또는 FR-4b 발산 경로에서 blocking이 올바르게 지켜졌는지) 통합 검증하고, 정식 빌드·번들 예산·검색 인덱스 파이프라인이 정상 동작하는지 최종 확인한다.

## Scope
- 코드/콘텐츠 편집 없음 — 순수 검증만 수행
- `npm run build` 전체 실행 (prebuild: `fetch-github-stars.mjs` → `generate-search-index.mjs` → `check-message-keys.mjs`, postbuild 포함)
- `npm run verify:bundle`
- `npm run test:content`
- 저장소 전체에 걸친 최종 grep 스윕 (amended AC2의 3단계 체크를 전체 must-change 파일 범위에 대해 재실행)
- AC4a/AC4b 최종 상태 확인
- AC7(검색 인덱스 파일 미수동편집) 확인

## Spec Reference

### Primary Sources
- `docs/ywc-plans/sync-skill-count-infra-suite-pr131.md` — `AC5`, `AC6`, `AC7`, `## Iteration 1 Amendments` → Fix 1 (AC4a/AC4b), Fix 2 (amended AC2), `## Non-Functional Requirements`

### Summary
AC5(빌드 시 `check-message-keys.mjs` 통과)와 AC7(검색 인덱스 파일이 수동 편집되지 않고 빌드 부산물로만 갱신됨)은 `000015-010` 단독이 아니라 전체 빌드 파이프라인 수준에서만 검증 가능하다. AC6(`docs/design-templates/landing-page/messages.js` 5개 블록 수동 diff)의 최종 확인도 이 task에서 재확인한다. amended AC2의 3단계 grep(영어/JSON `LC_ALL=C` negative, 한국어 spec 문서 negative, 재검증 숫자 positive)을 `000015-010`이 이미 실행했더라도, 이 task에서 저장소 전체 파일 범위에 대해 한 번 더 실행해 교차 누락이 없는지 확인한다.

### Out of Scope (from spec)
- `src/data/guidebook-search.*.json`의 수동 편집 — `npm run build`가 자동 재생성하므로 편집하지 않음

## Criticality
`normal` — 검증 전용, 코드/콘텐츠 변경 없음

## Dependencies

### Depends On
- `000015-010-ui-sync-skill-agent-counts`

### Depended By
- `(None)` — 이 배치의 마지막 task

## Key Files
- `(없음 — 검증 전용, 파일 수정 없음)`

## Notes
- 이 task에서 grep 스윕이 실패하면(즉 갱신 안 된 옛 숫자가 발견되면), `000015-010`을 재오픈해야 한다 — 이 task 자체는 편집 권한이 없다.
- FR-4b(발산) 경로였다면, `git diff`에서 `featureGrid.items`/`.title`/agent 카테고리 값 편집이 전혀 없어야 하고, `000015-010`의 보고에 blocking 문구가 존재해야 한다 — 이 상태 자체가 이 task의 정상 통과 조건 중 하나다(오류가 아님).
- `src/data/guidebook-search.*.json`의 diff가 존재한다면, `npm run build`가 생성한 결과와 정확히 일치하는지 확인한다(수동 편집 흔적이 있으면 안 됨).

## Parallel Execution Metadata

### Ownership
- `(None)` — 파일 수정 없음, 검증 전용

### Shared Surfaces
- `(None)`

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000015-010-ui-sync-skill-agent-counts`

### Task Verify
- `npm run build` 성공 (전체 prebuild/postbuild 파이프라인 포함)
- `npm run verify:bundle` 성공
- `npm run test:content` 성공
- `LC_ALL=C grep -rn -E "\b42\b|\b12\b|\b7\b" src/messages/*.json src/components/sections/hero.tsx docs/design-system/*.md docs/mission.md CLAUDE.md docs/design-templates/landing-page/messages.js` — must-change 파일에서 재검증된 새 숫자만 일관되게 남아있는지 최종 확인 (no-count-context 히트는 수동 판별)
- `grep -rn -E "42개|12개|7개" docs/specification/0{1,2,3,5}-*.md` — 옛 한국어 표기 잔존 없음 최종 확인

## Out of Scope
- Phase 000015 task의 실제 편집 — 이 task는 검증만 수행
