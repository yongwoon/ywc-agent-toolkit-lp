# 000004-010-lib-mdx-content-pipeline

## Purpose
`output: 'export'`와 호환되는 markdown/MDX 렌더링 라이브러리(예: `next-mdx-remote` 또는 `@next/mdx`)를 도입하고, guidebook markdown 파일(frontmatter + heading 기반 TOC)을 파싱하는 content-loader 유틸리티를 구현한다. 이는 Guidebook section(Phase 000004)의 기반 라이브러리 task다.

## Scope
- MDX/markdown 렌더링 라이브러리 의존성 추가 (`package.json`)
- `src/lib/guidebook-content.ts`(또는 동등 이름의 loader) — frontmatter 파싱, heading 추출(TOC 생성), markdown → HTML/React 변환

## Spec Reference

### Primary Sources
- `N/A — no spec doc yet in this repo; source content and TOC structure defined externally at develop-with-llm/docs/guides/guidebook/README.md (see Notes)`

### Summary
Guidebook은 `docs/specification/`이 현재 다루지 않는 신규 범위다 — 검증된 spec은 단일 페이지 마케팅 랜딩 페이지만 다루며, `01-overview.md`의 Out of Scope는 블로그/콘텐츠 관리를 명시적으로 제외한다. Guidebook은 세션 중간에 사용자가 추가한 신규 범위로, Laravel 공식 문서(laravel.com/docs) 스타일의 sidebar + 다중 페이지 문서 사이트를 지향한다. 소스 콘텐츠는 별도 저장소 `develop-with-llm/docs/guides/guidebook/`에 위치하며, 그 저장소의 `README.md`가 TOC/sidebar 구조(Prologue, 시작하기, 워크플로우 가이드, 레퍼런스 4개 그룹, 총 12개 예정 페이지, 현재 01–05만 작성 완료, 06–12는 upstream에서 계속 작성 중)를 정의한다. 이 task는 그 콘텐츠를 렌더링할 수 있는 markdown/MDX 파이프라인만 구축하며, 실제 콘텐츠 동기화는 `000004-030`의 책임이다.

### Out of Scope (from spec)
- `(None — spec has no deferred items; 이 영역 자체가 spec 외 신규 범위)`

## Criticality
`normal` — 사용자 입력이 없는 정적 콘텐츠 렌더링 라이브러리 도입

## Dependencies

### Depends On
- `000001-010-lib-nextjs-i18n-setup` — 프로젝트 scaffold(package.json, tsconfig, next.config.ts)가 필요

### Depended By
- `000004-020-ui-guidebook-layout` — MDX 렌더링 라이브러리와 content-loader가 필요
- `000004-030-config-guidebook-content-sync` — content-loader가 파싱할 수 있는 콘텐츠 디렉터리 구조를 이 task가 전제

## Key Files
- `package.json` — 새 MDX 관련 의존성 추가 (Safety Invariant: 라이브러리 도입은 이 task에서만 발생)
- `src/lib/guidebook-content.ts` (또는 동등 명칭) — frontmatter 파싱 + heading TOC 추출 loader

## Notes
- **Safety Invariant 준수**: 새로운 라이브러리(MDX 관련 패키지) 도입은 이 task에서만 이루어지며, 다른 task가 `package.json`에 새 의존성을 추가하지 않는다.
- static export(`output: 'export'`) 환경과 호환되는 MDX 솔루션을 선택해야 한다 — 런타임에 서버가 markdown을 컴파일하는 방식(예: 요청 시점 컴파일)은 사용할 수 없으며, 빌드 타임에 모든 guidebook 페이지가 사전 렌더링되어야 한다.
- **Open Question 상속**: `docs/specification/08-guidebook.md`가 아직 작성되지 않았으므로, 이 task 착수 전 `ywc-spec-writer`로 정식 spec을 추가하는 것을 권장한다(`tasks/dependency-graph.md`의 Open Questions 참고). 이 task는 spec 부재 상태에서 develop-with-llm의 README.md만을 근거로 진행되므로, 향후 spec이 작성되면 재검토가 필요할 수 있다.

## Parallel Execution Metadata

### Ownership
- MDX 관련 신규 의존성 항목 (`package.json` 내 해당 부분)
- `src/lib/guidebook-content.ts`

### Shared Surfaces
- `package.json` — Phase 000001의 `000001-010`이 최초 스키마를 소유하며, 이 task는 새 의존성만 추가(다른 필드 수정 금지)

### Conflicts With
- `(None identified)` — Phase 000003과 파일 단위로 겹치지 않아 이론상 병렬 가능하나, 실제로는 Phase 순서(000003 완료 후 000004 시작)를 따른다

### Parallelizable After
- `000001-010-lib-nextjs-i18n-setup`

### Task Verify
- `npm install`
- `npx tsc --noEmit`
- `npm run build`

## Out of Scope
- Guidebook UI 레이아웃(sidebar, prev/next) — `000004-020`의 책임
- 실제 guidebook markdown 콘텐츠 동기화 — `000004-030`의 책임
- Locale별 guidebook 번역 — Phase 000006의 책임
