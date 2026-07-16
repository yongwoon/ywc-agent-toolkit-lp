# 000021-010-config-verify-upstream-auth-content

## Purpose
새 Guidebook 페이지(`18-authentication-implementation`)를 작성하기 전에, upstream `ywc-agent-toolkit` PR #144의 현재 merge 상태를 재확인하고, `ywc-auth-implement` skill의 실제 `SKILL.md`(Claude Code / Codex 양쪽)를 재독해 정확한 커맨드 문법·9-category 인터뷰 라벨·dispatch 대상 이름을 확보한다. 이 task의 결과물(재확인 노트)이 `000022-010`의 `<ToolTabs>` 예제 및 플로우 설명 작성 근거가 된다.

## Scope
- `gh pr view 144 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt,headRefOid` 실행하여 현재 merge 상태 재확인(스펙 작성 시점에는 이미 `MERGED`, `mergedAt: 2026-07-16T05:54:48Z`로 확인되었으나, 실행 시점에 재조회한 값을 기록해야 함)
- 다음 2개 파일을 `main`에서 읽어 커맨드 문법·9-category 인터뷰 라벨·preflight gate 단계·dispatch 대상(`ywc-backend-coder`/`ywc-frontend-coder`/`ywc-doc-writer`)·security/E2E gate 동작을 정리:
  - `claude-code/skills/ywc-auth-implement/SKILL.md`
  - `codex/skills/ywc-auth-implement/SKILL.md`
- 두 파일의 dispatch 메커니즘 차이(Claude Code의 `Task(subagent_type: ...)` fan-out vs. Codex의 세션 내 orchestration)를 정확한 현재 문구로 정리 — 신규 페이지의 "How Claude Code and Codex differ" 섹션 근거
- 재확인 결과를 `docs/ywc-plans/guidebook-auth-implement-page.verification.md`에 기록

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-auth-implement-page.md` — `### FR-1`, `## Dependencies`, `## Edge Cases`(마지막 항목), `## Existing Constraints Touched`(PR #144 merge state 행)

### Summary
스펙 FR-1은 콘텐츠 작성 전에 실행자가 upstream `SKILL.md` 두 파일을 재확인하도록 요구한다. PR #144는 이미 merge되어 있어 브랜치 모호성은 없지만, 실행 시점 사이에 `main`이 추가로 갱신되었을 가능성은 남아있으므로 재조회가 필요하다.

### Out of Scope (from spec)
- `ywc-cloud-engineer`, `ywc-security-engineer`, `ywc-performance-engineer` 등 agent 자체의 상세 스펙 확인 — 이 skill은 그런 agent를 직접 dispatch하지 않는다(대신 `ywc-backend-coder`/`ywc-frontend-coder`/`ywc-doc-writer`를 dispatch하고 `ywc-security-audit`/`ywc-e2e-test-strategy`를 skill-call한다)
- 신규 페이지 콘텐츠 작성 자체 — `000022-010`의 범위

## Criticality
`critical` — task 이름에 "auth" 키워드가 포함되어 keyword heuristic이 적용됨(spec에 별도 Critical Surfaces 선언 없음). 다만 실제 작업은 upstream 문서 재확인 및 노트 기록뿐으로, 애플리케이션 인증 코드나 비밀값을 다루지 않는 순수 문서 조사 작업이다. 실행자가 이 판단을 오탐(false positive)으로 보아 `normal`로 하향할 수 있다.

## Dependencies

### Depends On
- (None — root task)

### Depended By
- `000022-010-ui-guidebook-auth-implement-page-registration` — PR 상태 재확인 결과와 `SKILL.md` 두 파일의 실제 커맨드 문법·플로우 설명(ToolTabs 예제 및 tool-difference 노트 소싱 근거) 제공

## Key Files
- `docs/ywc-plans/guidebook-auth-implement-page.verification.md` — 신규 생성, 재확인 결과 기록

## Notes
- `gh` CLI가 설치·인증되어 있고 `yongwoon/ywc-agent-toolkit`에 대한 read 권한이 있다고 가정한다. 실행 환경에 따라 이 전제조건이 충족되지 않을 수 있으므로, 착수 전 `gh auth status`로 사전 확인을 권장한다.
- `claude-code/skills/ywc-auth-implement/SKILL.md`와 `codex/skills/ywc-auth-implement/SKILL.md`는 별도 리포지토리(`ywc-agent-toolkit`)에 있으므로, 로컬에 그 리포지토리의 sibling checkout이 있으면 그것을 사용하고, 없으면 `gh api`나 얕은 클론으로 파일 내용을 가져온다(스펙 자체는 정확한 접근 방식을 강제하지 않음 — spec-validate Suggestion으로 지적된 항목).

## Out of Scope
- `ywc-auth-implement`가 dispatch하는 `ywc-backend-coder`/`ywc-frontend-coder`/`ywc-doc-writer`의 자체 `SKILL.md` 재확인 — 신규 페이지는 이들을 "dispatch 대상"으로만 prose 언급하며 상세 스펙을 옮기지 않는다
- PR #144 자체에 대한 재검토나 반박 — merge된 upstream 변경 사항을 그대로 소스로 사용한다

## Parallel Execution Metadata

### Ownership
- `docs/ywc-plans/guidebook-auth-implement-page.verification.md`

### Shared Surfaces
- `(None identified)`

### Conflicts With
- `(None identified)`

### Parallelizable After
- `(Root task — no predecessor required)`

### Task Verify
- `gh pr view 144 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt,headRefOid` 실행 결과가 `docs/ywc-plans/guidebook-auth-implement-page.verification.md`에 기록되어 있는지 확인
- `docs/ywc-plans/guidebook-auth-implement-page.verification.md`에 `ywc-auth-implement`(Claude Code)와 `ywc-auth-implement`(Codex) 두 SKILL.md 각각의 커맨드 문법·9-category 라벨·dispatch 대상·tool-difference 요약이 모두 포함되어 있는지 확인
