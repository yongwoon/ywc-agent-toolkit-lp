# 000009-030-config-guidebook-language-setup-entry

## Purpose
가이드북 전체 스킬 레퍼런스(`13-skill-reference.md`)에 신규 언어 설정 스킬(Claude Code용 `ywc-setup-language`, Codex용 `ywc-setup`)을 5개 로케일 모두에 문서화하고, 기존에 이미 문서화된 개별 스킬의 일회성 `--lang` 플래그와의 우선순위 관계를 설명한다.

## Scope
- `src/content/guidebook/{en,ja,ko,zh,es}/13-skill-reference.md` — 상단 lookup 테이블에 신규 행 1개 추가, "extend the toolkit itself" 섹션 아래 `<ToolTabs>` 예시 서브섹션 1개 추가 (5개 로케일 각각의 번역된 문체로)

## Spec Reference

### Primary Sources
- `docs/ywc-plans/sync-skill-count-language-setup.md` — `## Existing Constraints Touched`(`13-skill-reference.md` 행), `AC5`, `### FR-4`

### Summary
`000008-010`이 재확인한 신규 스킬의 최종 이름(계획 시점 가정: `ywc-setup-language`/`ywc-setup`, PR 리뷰 중 바뀌었을 수 있음)을 사용해 문서화한다. 배치 위치는 `13-skill-reference.md`의 기존 "extend the toolkit itself" 섹션(이미 `ywc-worktrees`, `ywc-docker-isolate` 등 인프라/설정류 스킬을 문서화하는 곳)이며, `07-starting-a-new-project.md`/`14-prerequisites-installation.md`는 검토 후 배제되었다. 신규 스킬은 "영속적 기본값 설정"이라는 점에서, 이미 가이드북에 문서화된 `ywc-create-pr --lang ko` 등 개별 커맨드의 일회성 `--lang` 플래그와 다르며, 우선순위(explicit `--lang` > project/user 영속 기본값 > 질문)를 명시적으로 설명해야 사용자 혼란을 방지한다. 가이드북 README의 "Quick links by goal" 테이블에는 행을 추가하지 않는다 — `ywc-skill-author`/`ywc-worktrees`/`ywc-docker-isolate` 등 동일 카테고리 스킬들이 이미 그 테이블에 없다는 기존 선례를 따른다(검증됨).

### Out of Scope (from spec)
- 가이드북 전체 재구성 — 신규 행 1개 + 서브섹션 1개 추가로 범위 한정
- `src/content/guidebook/en/README.md`의 "Quick links by goal" 테이블에 행 추가 — 동일 카테고리 스킬들의 기존 선례상 불필요

## Criticality
`normal` — 정적 가이드북 콘텐츠 추가, 런타임 보안 표면 없음

## Dependencies

### Depends On
- `000008-010-config-verify-upstream-language-setup-status` — 재검증된 신규 스킬 최종 이름 제공

### Depended By
- `000010-010-test-verify-full-build` — 이 task의 변경 포함 전체 빌드 검증 필요

## Key Files
- `src/content/guidebook/en/13-skill-reference.md`
- `src/content/guidebook/ja/13-skill-reference.md`
- `src/content/guidebook/ko/13-skill-reference.md`
- `src/content/guidebook/zh/13-skill-reference.md`
- `src/content/guidebook/es/13-skill-reference.md`

## Notes
- **동기화 스크립트 위험**: `scripts/sync-guidebook-content.mjs`(수동 실행 전용, `prebuild`/CI에 연결되어 있지 않음)는 외부 sibling 저장소 경로(`../develop-with-llm/docs/guides/guidebook`)에서 `src/content/guidebook/ko/`를 완전히 삭제 후 재생성한다. 이 task가 추가한 ko 편집 직후에 누군가 그 스크립트를 수동 실행하면 편집 내용이 조용히 사라진다 — 이 task 완료 후 동기화 스크립트가 실행되지 않도록 주의하거나, 실행되었다면 이 task의 편집을 재적용해야 한다.
- 신규 헤딩의 목차 앵커(`github-slugger` 자동 생성, `package.json` 의존성)가 파일 내 기존 앵커와 충돌하지 않는지 추가 후 확인한다.
- 각 로케일의 서브섹션 문체는 그 파일에 이미 존재하는 다른 스킬 항목들의 문체를 그대로 따른다(기계적 직역 금지).

## Parallel Execution Metadata

### Ownership
- `src/content/guidebook/{en,ja,ko,zh,es}/13-skill-reference.md`

### Shared Surfaces
- `(None)` — 다른 task와 파일 범위가 겹치지 않음

### Conflicts With
- `(None identified)` — `000009-010`, `000009-020`과 파일 범위 disjoint

### Parallelizable After
- `000008-010-config-verify-upstream-language-setup-status`

### Task Verify
- 5개 로케일 파일 각각에서 신규 행의 앵커 링크가 같은 파일 내 실제 헤딩으로 정상 resolve되는지 확인
- `npm run test:content` (`test/check-guidebook-paths.mjs`) 통과 확인

## Out of Scope
- `src/messages/*.json`, `hero.tsx`, `docs/design-templates/**` — `000009-010`
- `docs/design-system/*.md`, `docs/specification/*.md`, `docs/mission.md`, `CLAUDE.md` — `000009-020`
- `src/content/guidebook/en/README.md` — spec 근거상 편집 불필요
