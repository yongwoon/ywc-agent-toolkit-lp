# 000014-010-config-verify-upstream-infra-suite-status

## Purpose
`ywc-agent-toolkit` 저장소의 PR #131(4-skill 인프라 스위트 `ywc-iac-author`/`ywc-infra-design`/`ywc-infra-review`/`ywc-infra-optimize` + 신규 agent `ywc-cloud-engineer` 추가)이 실제로 merge되었는지, 그리고 merge되었다면 Claude Code/Codex의 최종 skill·agent 개수와 수렴/발산 여부를 재검증한다. 이 task의 결과가 Phase 000015의 모든 후속 task를 게이팅한다.

## Scope
- `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` 실행
- merge 확인 시, **4개의 개별** `gh api` 호출로 실제 개수 재산정 (중괄호 확장 단일 명령 금지 — 무효한 2-인자 호출이 된다):
  - `gh api repos/yongwoon/ywc-agent-toolkit/contents/claude-code/skills`
  - `gh api repos/yongwoon/ywc-agent-toolkit/contents/codex/skills`
  - `gh api repos/yongwoon/ywc-agent-toolkit/contents/claude-code/agents`
  - `gh api repos/yongwoon/ywc-agent-toolkit/contents/codex/agents`
- 필터: skills 응답은 `type == "dir"` AND `name`이 `ywc-`로 시작하는 항목만 카운트(`references/`, `scripts/` 제외); agents 응답은 Claude Code는 `ywc-*.md`, Codex는 `ywc-*.toml` 패턴에 매칭하는 파일만 카운트(`CLAUDE.md`, `README*.md` 등 제외)
- 검증 결과를 `docs/ywc-plans/sync-skill-count-infra-suite-pr131.verification.md`에 기록

## Spec Reference

### Primary Sources
- `docs/ywc-plans/sync-skill-count-infra-suite-pr131.md` — `## Purpose`, `## Scope`(Stop condition), `### FR-1`, `## Iteration 1 Amendments` → Fix 3 (AC1이 supersede된 전체 내용)

### Summary
스펙은 계획 시점에 PR #131이 `state: OPEN`, `mergedAt: null`이었음을 명시하고, 46개 skill / Claude Code 13개 agent / Codex 8개 agent라는 수치는 in-flight diff에서 가져온 잠정치이므로 실행 시점에 반드시 재검증해야 한다고 규정한다(FR-1). `ywc-spec-ready` Iteration 1 Amendments의 Fix 3는 원본 AC1의 `gh api repos/.../contents/{claude-code,codex}/skills` 형태(셸 중괄호 확장으로 2-인자가 되어 `gh api`가 거부함)와 "non-skill/non-agent directories 제외"라는 불명확한 제외 규칙(타입 필터만으로는 `references/`/`scripts/`를 못 거르고, agents 쪽은 디렉터리가 아닌 파일 오염이라 애초에 "디렉터리 제외"로는 못 거름 — 방치 시 48/48/18/9로 overcounting)을 모두 수정했다. 이 task는 반드시 amended AC1(4개 개별 호출 + 구체적 필터)을 그대로 따른다. 재검증 결과 PR이 아직 unmerged라면 `## Scope`에 명시된 stop condition에 따라 이 task 이후 어떤 숫자도 편집해서는 안 된다. Merge되었다면 두 tool의 최종 skill 개수가 같은지(수렴) 다른지(발산)를 판정해 기록해야 한다 — 이 판정이 FR-4a(산술 갱신)/FR-4b(blocking) 중 어느 분기를 실행할지 결정한다.

### Out of Scope (from spec)
- PR #131 자체를 merge하는 행위 — 다른 저장소(`ywc-agent-toolkit`)에 대한 변경이며 저장소 소유자만 수행 가능 (`## Out of Scope` 첫 항목)

## Criticality
`normal` — 외부 API 조회 및 판정 기록만 수행, 코드/콘텐츠 변경 없음

## Dependencies

### Depends On
- `(None)` — 이 배치의 첫 task

### Depended By
- `000015-010-ui-sync-skill-agent-counts` — 재검증된 skill/agent 개수와 수렴/발산 판정 필요
- `000016-010-test-verify-full-build` — (간접, `000015-010`을 통해) 최종 판정과의 일관성 검증 필요

## Key Files
- `docs/ywc-plans/sync-skill-count-infra-suite-pr131.verification.md` (신규 생성 — 검증 결과 기록)

## Notes
- 이 task는 다른 저장소(`yongwoon/ywc-agent-toolkit`)에 대한 읽기 전용 `gh` 조회만 수행한다. 실행 환경에 `gh` CLI가 설치·인증되어 있고 해당 저장소에 대한 read 권한이 있어야 한다(사전 조건으로 명시). 인증이 안 되어 있어도 공개 저장소이므로 비인증 공개 REST 호출(`api.github.com/repos/...`)로 대체 가능하다.
- **원본 AC1의 중괄호 확장 명령을 그대로 실행하지 말 것** — `gh api repos/.../contents/{claude-code,codex}/skills`는 셸이 두 개의 위치 인자로 확장하며 `gh api`는 인자 1개만 받으므로 즉시 오류가 난다(`accepts 1 arg(s), received 2`). 반드시 4개의 개별 호출을 순차 실행한다.
- 필터를 `type=="dir"` 만으로 적용하면 `references/`, `scripts/` 디렉터리가 함께 카운트되어 skill 개수가 실제보다 2개 많게(overcounting) 나온다 — 반드시 `ywc-` 접두사 조건을 함께 적용한다.
- agents 응답의 오염은 디렉터리가 아니라 **파일**(`CLAUDE.md`, `README.md`, `README.en.md`, `README.ja.md`, `README.ko.md` 등)이므로, "디렉터리 제외"로는 걸러지지 않는다 — 반드시 `ywc-*.md`(Claude Code) / `ywc-*.toml`(Codex) 파일명 패턴으로 필터링한다.
- 재검증 시점의 skill/agent 최종 개수가 스펙의 잠정치(46/46/13/8)와 다르게 나올 수 있다 — 가정치를 그대로 믿지 말고 반드시 실제 `gh api` 결과를 기록한다.

## Parallel Execution Metadata

### Ownership
- `docs/ywc-plans/sync-skill-count-infra-suite-pr131.verification.md`

### Shared Surfaces
- `(None)` — 신규 파일 1개만 생성, 기존 파일 수정 없음

### Conflicts With
- `(None identified)`

### Parallelizable After
- `(None)` — 첫 task

### Task Verify
- `docs/ywc-plans/sync-skill-count-infra-suite-pr131.verification.md`가 생성되어 있고, PR 상태(`state`/`mergedAt`), (merge된 경우) Claude Code/Codex 각각의 최종 skill·agent 개수, 수렴/발산 판정이 명시적으로 기록되어 있는지 확인

## Out of Scope
- 실제 숫자 편집(`src/messages/*.json` 등) — 이 task는 판정만 하고, 편집은 Phase 000015 task의 책임
