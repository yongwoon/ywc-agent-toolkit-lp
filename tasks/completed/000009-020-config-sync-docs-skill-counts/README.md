# 000009-020-config-sync-docs-skill-counts

## Purpose
디자인 시스템 문서, 프로젝트 미션 문서, 저장소 루트 `CLAUDE.md`, 한국어 스펙 문서(`docs/specification/`)에 하드코딩된 skill/agent 개수를 `000008-010`에서 재검증된 값으로 갱신한다.

## Scope
- `docs/design-system/content-voice.md` — "41 skills" hard-constraint 규칙 문단, 예시
- `docs/design-system/components.md` — Badge/StatCard 예시 값
- `docs/specification/01-overview.md`, `02-features.md`, `03-data.md`, `05-user-flows.md` — 한국어 quad-number 인용/예시 문구
- `docs/mission.md` — Mission 섹션의 skill/agent 개수 문구 (기존 표현의 모호함도 함께 수정)
- 저장소 루트 `CLAUDE.md` — Project Overview 섹션의 skill/agent 개수 문구

## Spec Reference

### Primary Sources
- `docs/ywc-plans/sync-skill-count-language-setup.md` — `## Existing Constraints Touched`(해당 파일 행들), `AC2`, `### FR-2`

### Summary
이 파일들은 모두 `en.json`이나 앱 코드와 무관한 순수 문서 파일이며, `000009-010`과 파일 범위가 겹치지 않아 병렬 실행 가능하다. `docs/mission.md`의 기존 문구는 "12 custom agents for Claude Code and Codex"처럼 두 tool 모두 12개 agent를 받는 것처럼 읽히는 기존의 모호한 표현을 담고 있으므로, 숫자 갱신과 함께 `01-overview.md`/루트 `CLAUDE.md`가 이미 쓰는 tool별 명시적 분리 표현("12 for Claude Code, 7 for Codex")으로 정정한다.

### Out of Scope (from spec)
- `tasks/completed/000002-010-*`, `tasks/completed/000003-020-*` (및 기타 `tasks/completed/**`)의 41/12/7 하드코딩 — 이미 merge된 작업의 동결된 역사적 기록이므로 편집하지 않는다
- `docs/ywc-plans/guidebook-tool-tabs.md:188`의 "41/12 vs 41/7" 인용 — 과거 디자인 결정의 근거를 기록한 역사적 plan 문서이므로 편집하지 않는다

## Criticality
`normal` — 정적 문서 콘텐츠 갱신, 런타임 보안 표면 없음

## Dependencies

### Depends On
- `000008-010-config-verify-upstream-language-setup-status` — 재검증된 skill/agent 개수 제공

### Depended By
- `000010-010-test-verify-full-build` — 이 task의 변경 포함 전체 빌드 검증 필요

## Key Files
- `docs/design-system/content-voice.md`
- `docs/design-system/components.md`
- `docs/specification/01-overview.md`
- `docs/specification/02-features.md`
- `docs/specification/03-data.md`
- `docs/specification/05-user-flows.md`
- `docs/mission.md`
- `CLAUDE.md` (저장소 루트)

## Notes
- `docs/specification/02-features.md`는 두 곳을 구분해서 갱신한다: line 33 부근은 skill 개수만("41개 skill" 형태), line 57 부근은 quad-number 전체 문구("Claude Code 41개 skill / 12개 agent, Codex 41개 skill / 7개 agent" 형태) — 두 줄의 내용이 다르므로 각각 정확히 대응하는 값으로 갱신한다.
- `docs/specification/03-data.md:28`은 "Key attributes" 섹션이 아니라 Feature Item 엔티티의 "What it represents" 예시 문장이다(실제 "Key attributes" 헤딩은 별도 줄에 있고 예시 숫자를 포함하지 않음) — 예시 값이므로 라이브 데이터가 아님을 유지한 채 숫자만 갱신한다.
- `docs/design-system/components.md`의 예시 값들은 일러스트레이션 목적이며 라이브 데이터가 아니다 — 형식/스타일은 그대로 두고 숫자만 갱신한다.

## Parallel Execution Metadata

### Ownership
- `docs/design-system/content-voice.md`
- `docs/design-system/components.md`
- `docs/specification/01-overview.md`
- `docs/specification/02-features.md`
- `docs/specification/03-data.md`
- `docs/specification/05-user-flows.md`
- `docs/mission.md`
- `CLAUDE.md` (저장소 루트)

### Shared Surfaces
- `(None)` — 다른 task와 파일 범위가 겹치지 않음

### Conflicts With
- `(None identified)` — `000009-010`(앱 코드/design-templates), `000009-030`(가이드북)과 파일 범위 disjoint

### Parallelizable After
- `000008-010-config-verify-upstream-language-setup-status`

### Task Verify
- `grep -rn "41\|42" docs/design-system/*.md docs/specification/0{1,2,3,5}-*.md docs/mission.md CLAUDE.md` — 재검증된 숫자만 일관되게 남아있는지 확인 (재검증 숫자가 41/42가 아니면 이 grep 패턴을 그 숫자로 교체)

## Out of Scope
- `src/messages/*.json`, `hero.tsx`, `docs/design-templates/landing-page/messages.js` — `000009-010`
- `src/content/guidebook/**` — `000009-030`
- `tasks/completed/**`, `docs/ywc-plans/guidebook-tool-tabs.md` — 역사적 기록, out of scope (spec 근거)
