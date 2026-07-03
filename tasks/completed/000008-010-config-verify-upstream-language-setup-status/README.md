# 000008-010-config-verify-upstream-language-setup-status

## Purpose
`ywc-agent-toolkit` 저장소의 PR #125(언어 설정 스킬 `ywc-setup-language`/`ywc-setup` 추가)가 실제로 merge되었는지, 그리고 merge되었다면 Claude Code/Codex의 최종 skill 개수와 수렴/발산 여부를 재검증한다. 이 task의 결과가 Phase 000009의 모든 후속 task를 게이팅한다.

## Scope
- `gh pr view 125 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` 실행
- merge 확인 시 `gh api repos/yongwoon/ywc-agent-toolkit/contents/{claude-code,codex}/skills` (`scripts/` 디렉터리 제외)로 실제 skill 개수 재산정
- 검증 결과를 `docs/ywc-plans/sync-skill-count-language-setup.verification.md`에 기록

## Spec Reference

### Primary Sources
- `docs/ywc-plans/sync-skill-count-language-setup.md` — `## Purpose`, `## Scope`(Stop condition), `AC1`, `### FR-1`

### Summary
스펙은 계획 시점에 PR #125가 `state: OPEN`, `mergedAt: null`이었음을 명시하고, 이 스펙의 모든 숫자(Codex 42/Claude Code 41)는 in-flight diff에서 가져온 잠정치이므로 실행 시점에 반드시 재검증해야 한다고 규정한다. 재검증 결과 PR이 아직 unmerged라면 Scope에 명시된 stop condition에 따라 이 task 이후 어떤 숫자도 편집해서는 안 된다. Merge되었다면 Claude Code/Codex 두 tool의 최종 skill 개수를 각각 산정하고, 두 값이 같은지(수렴) 다른지(발산)를 판정해 기록해야 한다 — 이 판정이 FR-5(Feature Grid 카테고리)의 두 분기(산술 갱신 vs. blocking) 중 어느 쪽을 실행할지 결정한다.

### Out of Scope (from spec)
- PR #125 자체를 merge하는 행위 — 다른 저장소(`ywc-agent-toolkit`)에 대한 변경이며 저장소 소유자만 수행 가능 (`## Out of Scope` 첫 항목)

## Criticality
`normal` — 외부 API 조회 및 판정 기록만 수행, 코드/콘텐츠 변경 없음

## Dependencies

### Depends On
- `(None)` — 이 배치의 첫 task

### Depended By
- `000009-010-ui-sync-app-skill-counts` — 재검증된 skill 개수와 수렴/발산 판정 필요
- `000009-020-config-sync-docs-skill-counts` — 재검증된 skill 개수 필요
- `000009-030-config-guidebook-language-setup-entry` — 재검증된 최종 skill 이름(`ywc-setup-language`/`ywc-setup` 또는 PR 최종 확정명) 필요

## Key Files
- `docs/ywc-plans/sync-skill-count-language-setup.verification.md` (신규 생성 — 검증 결과 기록)

## Notes
- 이 task는 다른 저장소(`yongwoon/ywc-agent-toolkit`)에 대한 읽기 전용 `gh` 조회만 수행한다. 실행 환경에 `gh` CLI가 설치·인증되어 있고 해당 저장소에 대한 read 권한이 있어야 한다(사전 조건으로 명시).
- PR이 merge되었더라도 Claude Code skill 개수가 diff 시점 가정(41 유지)과 다르게 나올 수 있다 — spec의 Edge Cases가 이 가능성을 명시적으로 경고한다. 가정치를 그대로 믿지 말고 반드시 실제 `gh api` 결과를 기록한다.
- 새 skill의 최종 이름이 PR 리뷰 과정에서 `ywc-setup-language`/`ywc-setup`이 아닌 다른 이름으로 바뀌었을 수 있다 — `000009-030`이 가이드북에 기재할 정확한 이름과 SKILL.md 설명을 이 task에서 함께 재확인해 기록한다.

## Parallel Execution Metadata

### Ownership
- `docs/ywc-plans/sync-skill-count-language-setup.verification.md`

### Shared Surfaces
- `(None)` — 신규 파일 1개만 생성, 기존 파일 수정 없음

### Conflicts With
- `(None identified)`

### Parallelizable After
- `(None)` — 첫 task

### Task Verify
- `docs/ywc-plans/sync-skill-count-language-setup.verification.md`가 생성되어 있고, PR 상태(`state`/`mergedAt`)와 (merge된 경우) Claude Code/Codex 각각의 최종 skill 개수, 수렴/발산 판정이 명시적으로 기록되어 있는지 확인

## Out of Scope
- 실제 숫자 편집(`src/messages/*.json` 등) — 이 task는 판정만 하고, 편집은 Phase 000009 task들의 책임
