# 000024-010-test-verify-guidebook-auth-implement-build

## Purpose
`000021-010`~`000023-020` 전체 편집 이후, 빌드/린트/타입체크/콘텐츠 검사가 모두 통과하고 스펙의 9개 Acceptance Criteria가 모두 충족되는지 최종 확인한다. 코드/콘텐츠 편집은 하지 않는다.

## Scope
- `npm run build` 전체 실행(prebuild: `fetch-github-stars.mjs` → `generate-search-index.mjs` → `check-guidebook-nav-registration.mjs` → `check-message-keys.mjs`, postbuild 포함)
- `npm run lint`, `npx tsc --noEmit`
- `npm run test:content`(`check-guidebook-paths.mjs`)
- `npm run verify:bundle`(캐비어트: 랜딩 페이지 번들만 측정, 가이드북 콘텐츠 자체는 커버하지 않는 일반 회귀 sanity check)
- 저장소 전체에 걸친 최종 grep 스윕 재실행(`000023-010`/`000023-020` 각각의 Task Verify를 전체 `src/content/guidebook/**` 범위로 재확인)
- AC1(슬러그 셋 일치), AC2(5개 로케일 콘텐츠 완결성), AC3(리넘버링 캐스케이드 pairing), AC4(README TOC/Quick Links), AC5(A-Z 테이블 번호 충돌 없음), AC6(skill-links.ts 라우팅), AC7(빌드/린트/타입체크/콘텐츠 검사 전부 통과), AC8(검색 인덱스 미수동편집), AC9(신규 페이지 내용이 실제 SKILL.md와 일치) 각각 최종 확인
- anchor collision 확인(NFR) — 신규 페이지의 heading 목록에 중복 텍스트가 없는지 확인

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-auth-implement-page.md` — `## Acceptance Criteria`(AC1-AC9 전체), `## Non-Functional Requirements`

### Summary
스펙의 모든 AC를 한 자리에서 재확인하는 최종 게이트 task. 코드/콘텐츠를 직접 수정하지 않고, 앞선 4개 task의 산출물이 서로 정합적인지 검증만 한다.

### Out of Scope (from spec)
- 발견된 문제의 수정 — 문제가 발견되면 해당 Ownership을 가진 task(000022-010/000023-010/000023-020)로 되돌려 보고한다

## Criticality
`critical` — task 이름에 "auth-implement"가 포함되어 keyword heuristic이 적용됨(spec에 별도 Critical Surfaces 선언 없음). 실제 작업은 빌드/린트/grep 검증뿐으로 파일 편집이 전혀 없으며, 애플리케이션 인증 로직과 무관하다. 실행자가 이를 오탐(false positive)으로 판단해 `normal`로 하향할 수 있다.

## Dependencies

### Depends On
- `000023-010-refactor-guidebook-renumber-core-pages`
- `000023-020-config-guidebook-cross-reference-sweep`

### Depended By
- (None — 이 배치의 마지막 task)

## Key Files
- (없음 — 파일 수정 없음, 검증 전용)

## Notes
- 검증 중 하나라도 실패하면, 실패 지점을 근거로 어느 선행 task(000022-010/000023-010/000023-020)의 Ownership에 해당하는지 판단해 그 task로 되돌려 보고한다 — 이 task 자체는 수정 권한이 없다.

## Out of Scope
- 신규 페이지 콘텐츠의 문체/번역 품질에 대한 주관적 판단 — 기계적 검증(빌드/린트/grep)만 수행한다

## Parallel Execution Metadata

### Ownership
- `(None)` — 파일 수정 없음, 검증 전용

### Shared Surfaces
- `(None)`

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000023-010-refactor-guidebook-renumber-core-pages`
- `000023-020-config-guidebook-cross-reference-sweep`

### Task Verify
- `npm run build` — 종료 코드 0
- `npm run lint` — 종료 코드 0
- `npx tsc --noEmit` — 종료 코드 0
- `npm run test:content` — 종료 코드 0
- `npm run verify:bundle` — 종료 코드 0(또는 예산 초과 없음)
