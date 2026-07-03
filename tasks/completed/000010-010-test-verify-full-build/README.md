# 000010-010-test-verify-full-build

## Purpose
Phase 000009의 세 병렬 task(앱 콘텐츠, 문서, 가이드북)가 모두 완료된 후, 전체 저장소에 걸쳐 skill/agent 개수가 일관되게 갱신되었는지 통합 검증하고, 정식 빌드·번들 예산·검색 인덱스 파이프라인이 정상 동작하는지 최종 확인한다.

## Scope
- 코드/콘텐츠 편집 없음 — 순수 검증만 수행
- `npm run build` 전체 실행 (prebuild: `fetch-github-stars.mjs` → `generate-search-index.mjs` → `check-message-keys.mjs`, postbuild 포함)
- `npm run verify:bundle`
- `npm run test:content`
- 저장소 전체에 걸친 최종 grep 스윕 (Phase 000009의 세 task가 개별적으로 놓쳤을 수 있는 교차 불일치 탐지)

## Spec Reference

### Primary Sources
- `docs/ywc-plans/sync-skill-count-language-setup.md` — `AC2`, `AC6`, `AC7`, `## Non-Functional Requirements`

### Summary
AC6(빌드 시 `check-message-keys.mjs` 통과)과 AC7(검색 인덱스 파일이 수동 편집되지 않고 빌드 부산물로만 갱신됨)은 Phase 000009 개별 task 각각이 아니라 전체 빌드 파이프라인 수준에서만 검증 가능하다. 또한 AC2의 grep 스윕을 세 task가 개별 파일 범위로 나눠 수행했으므로, 이 task에서 전체 파일 범위에 대해 한 번 더 실행해 교차 누락이 없는지 확인한다.

### Out of Scope (from spec)
- `src/data/guidebook-search.*.json`의 수동 편집 — `npm run build`가 자동 재생성하므로 편집하지 않음

## Criticality
`normal` — 검증 전용, 코드/콘텐츠 변경 없음

## Dependencies

### Depends On
- `000009-010-ui-sync-app-skill-counts`
- `000009-020-config-sync-docs-skill-counts`
- `000009-030-config-guidebook-language-setup-entry`

### Depended By
- `(None)` — 이 배치의 마지막 task

## Key Files
- `(없음 — 검증 전용, 파일 수정 없음)`

## Notes
- 이 task에서 AC2 grep 스윕이 실패하면(즉 갱신 안 된 "41"/"42"가 발견되면), 어느 Phase 000009 task의 범위인지 확인해 해당 task를 재오픈해야 한다 — 이 task 자체는 편집 권한이 없다.
- `src/data/guidebook-search.*.json`의 diff가 존재한다면, 그것이 `npm run build`가 생성한 결과와 정확히 일치하는지 확인한다(수동 편집 흔적이 있으면 안 됨).

## Parallel Execution Metadata

### Ownership
- `(None)` — 파일 수정 없음, 검증 전용

### Shared Surfaces
- `(None)`

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000009-010-ui-sync-app-skill-counts`
- `000009-020-config-sync-docs-skill-counts`
- `000009-030-config-guidebook-language-setup-entry`

### Task Verify
- `npm run build` 성공 (전체 prebuild/postbuild 파이프라인 포함)
- `npm run verify:bundle` 성공
- `npm run test:content` 성공
- `grep -rn "41\|42" src/messages/*.json src/components/sections/hero.tsx docs/design-system/*.md docs/specification/0{1,2,3,5}-*.md docs/mission.md CLAUDE.md docs/design-templates/landing-page/messages.js` — must-change 파일에서 재검증된 숫자만 일관되게 남아있는지 최종 확인

## Out of Scope
- Phase 000009 세 task의 실제 편집 — 이 task는 검증만 수행
