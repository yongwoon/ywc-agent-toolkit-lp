# 000006-040-config-guidebook-i18n-es

## Purpose
`src/content/guidebook/ko/`(이 task 실행 시점에 존재하는 모든 페이지)의 한국어 guidebook 콘텐츠를 스페인어(es)로 번역하고, `src/content/guidebook/es/`에 배치하며, guidebook route/sidebar가 es locale도 서빙하도록 확장한다.

## Scope
- `src/content/guidebook/es/**` — ko 콘텐츠를 es로 번역한 markdown 파일 전체
- guidebook route(`src/app/[locale]/guidebook/`)와 sidebar가 `locale=es`일 때 `src/content/guidebook/es/`를 참조하도록 확장

## Spec Reference

### Primary Sources
- `N/A — no spec doc yet in this repo; source content and TOC structure defined externally at develop-with-llm/docs/guides/guidebook/README.md (see Notes)`

### Summary
이 task는 `000005-020-test-build-verification`(core LP + guidebook KO 배치의 마지막 task)이 완전히 검증된 이후에만 시작하는 명시적 hard gate가 걸려 있다 — 사용자가 "마지막 task 이후"로 명시적으로 지정했기 때문이다. 번역 대상은 이 task 실행 시점에 `src/content/guidebook/ko/`에 실제로 존재하는 페이지 전체이며, 정확한 페이지 수는 upstream(develop-with-llm)에서 06–12가 얼마나 작성되었는지에 따라 달라질 수 있다(`tasks/dependency-graph.md`의 Open Questions #3 참고). guidebook route/sidebar 자체의 구조는 `000004-020`이 이미 locale-parameterized로 설계해 두었으므로, 이 task는 새로운 locale의 콘텐츠 디렉터리를 추가하고 route가 이를 인식하도록 최소한의 배선만 추가한다.

### Out of Scope (from spec)
- `(None — spec has no deferred items; 이 영역 자체가 spec 외 신규 범위)`

## Criticality
`normal` — 정적 번역 콘텐츠 추가, 런타임 보안 표면 없음

## Dependencies

### Depends On
- `000005-020-test-build-verification` — "core LP + guidebook KO" 배치가 완전히 검증된 이후에만 시작 가능한 명시적 hard gate (사용자 지정)

### Depended By
- `(None)`

## Key Files
- `src/content/guidebook/es/**`

## Notes
- **병렬 실행 가능**: 이 task는 `000006-010`(ja), `000006-020`(en), `000006-030`(zh)와 서로 disjoint한 디렉터리(`src/content/guidebook/es/`)만 소유하므로, 4개 locale task는 `000005-020` 완료 후 서로 병렬로 실행 가능하다.
- 번역 대상 페이지 수는 이 task 착수 시점의 `src/content/guidebook/ko/` 실제 파일 목록을 기준으로 한다.
- 기술 용어(Skill명, Agent명, 커맨드 예시 등)는 원문 그대로 유지하고 설명 문구만 번역한다.

## Parallel Execution Metadata

### Ownership
- `src/content/guidebook/es/**`

### Shared Surfaces
- guidebook route(`src/app/[locale]/guidebook/**`)의 locale 인식 로직 — 다른 3개 locale task와 공유하는 구조이나, route가 이미 범용 설계이므로 콘텐츠 디렉터리 추가만으로 충분해야 한다

### Conflicts With
- `(None identified)` — 각 locale task는 disjoint한 콘텐츠 디렉터리만 소유하므로 000006-010/020/030/040은 서로 병렬 실행 가능

### Parallelizable After
- `000005-020-test-build-verification`

### Task Verify
- `npm run build` — `/es/guidebook/*` 페이지가 정상 생성되는지 확인
- ko/es 파일 목록 1:1 대조

## Out of Scope
- guidebook route/sidebar의 구조적 변경 — `000004-020`이 이미 완료한 범위
- ja/en/zh 번역 — 각각 `000006-010`/`000006-020`/`000006-030`의 책임
