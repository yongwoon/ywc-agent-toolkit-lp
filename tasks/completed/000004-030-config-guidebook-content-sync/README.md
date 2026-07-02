# 000004-030-config-guidebook-content-sync

## Purpose
`develop-with-llm/docs/guides/guidebook/`(README.md + 01–05, upstream에서 06–12로 계속 확장 중)의 한국어 guidebook markdown 콘텐츠를 이 저장소의 콘텐츠 디렉터리로 빌드 타임에 가져오는 content-sync 메커니즘을 구축하고, sidebar TOC를 소스 README.md의 구조와 정확히 일치시킨다.

## Scope
- 콘텐츠 디렉터리(예: `src/content/guidebook/ko/`) 확정 및 실제 파일 배치
- sync 스크립트 또는 빌드 타임 copy step 구현
- `000004-020`이 만든 sidebar TOC 데이터를 소스 README.md의 그룹/순서와 정확히 맞춤

## Spec Reference

### Primary Sources
- `N/A — no spec doc yet in this repo; source content and TOC structure defined externally at develop-with-llm/docs/guides/guidebook/README.md (see Notes)`

### Summary
소스 저장소(`develop-with-llm`)는 이 프로젝트와 별도의 저장소이므로, 콘텐츠를 참조하는 방식(git submodule, 빌드 스크립트를 통한 파일 copy, 또는 수동 동기화 후 커밋)을 확정해야 한다. 현재 upstream에는 README.md와 01–05 페이지만 존재하며 06–12는 계속 작성 중이다 — 따라서 이 task가 만드는 sync 메커니즘은 "현재 존재하는 페이지만 가져오고, 존재하지 않는 페이지는 sidebar에 노출하되 콘텐츠 없음 상태로 처리하거나 sidebar에서 제외"하는 두 가지 전략 중 하나를 선택해 구현해야 한다. sidebar TOC는 소스 README.md의 목차 표(Prologue/시작하기/워크플로우 가이드/레퍼런스, 01–12 순서)를 그대로 반영해야 하며, 페이지 설명 문구도 가능한 한 원본과 일치시킨다.

### Out of Scope (from spec)
- `(None — spec has no deferred items; 이 영역 자체가 spec 외 신규 범위)`

## Criticality
`normal` — 외부 저장소의 정적 콘텐츠를 가져오는 빌드 타임 동기화 작업, 런타임 보안 표면 없음

## Dependencies

### Depends On
- `000004-010-lib-mdx-content-pipeline` — content-loader가 파싱할 수 있는 파일 형식/구조가 필요
- `000004-020-ui-guidebook-layout` — sidebar TOC 데이터 구조와 route(`[[...slug]]`)가 필요

### Depended By
- `000005-010-config-sitemap-robots` — 실제 존재하는 guidebook 페이지 목록이 있어야 sitemap URL 생성 가능
- `000005-020-test-build-verification` — 실제 콘텐츠가 채워진 상태에서 빌드 전체를 검증

## Key Files
- `src/content/guidebook/ko/**` — 동기화된 한국어 markdown 콘텐츠
- 콘텐츠 sync 스크립트 (예: `scripts/sync-guidebook-content.mjs` 또는 동등 빌드 훅)

## Notes
- 소스 저장소 경로(`develop-with-llm/docs/guides/guidebook/`)는 로컬 파일시스템 상의 형제 디렉터리이므로, sync 스크립트는 상대 경로 또는 환경 변수로 소스 위치를 설정 가능하게 만들어 CI 환경(소스 저장소가 없을 수 있음)에서도 실패하지 않도록 graceful fallback(예: 이미 동기화된 마지막 스냅샷 사용)을 고려한다.
- **Open Question 상속**: 06–12 페이지가 upstream에서 계속 작성되고 있으므로, 이 task 완료 후에도 sidebar TOC 와이어링은 재확인이 필요하다(`tasks/dependency-graph.md`의 Open Questions #2 참고).
- README.md의 "당신이 하려는 일은 무엇인가요?" 목적별 바로가기 표는 이 task의 필수 반영 대상이 아니며(부가 콘텐츠), 최소 요건은 12개 페이지의 그룹/순서/제목 목록이다.

## Parallel Execution Metadata

### Ownership
- `src/content/guidebook/**`
- 콘텐츠 sync 스크립트

### Shared Surfaces
- sidebar TOC 데이터 — `000004-020`이 만든 데이터 구조를 이 task가 실제 콘텐츠 존재 여부에 맞춰 채움 (구조 자체는 변경하지 않고 데이터만 채움)

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000004-010-lib-mdx-content-pipeline`
- `000004-020-ui-guidebook-layout`

### Task Verify
- `npm run build` — 동기화된 콘텐츠가 포함된 상태로 guidebook 페이지들이 정적 생성되는지 확인
- 수동 확인: sidebar에 노출되는 페이지 개수/제목이 소스 README.md의 목차와 일치하는지 대조

## Out of Scope
- 06–12 페이지의 실제 콘텐츠 작성 — develop-with-llm 저장소(외부)의 책임, 이 저장소 범위 밖
- 다른 locale로의 번역 — Phase 000006의 책임
