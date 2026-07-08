# 000014-010-config-verify-upstream-infra-suite-status — Implementation Checklist

## Prerequisites
- [ ] (없음 — 배치의 첫 task)

## Allowed Edit Scope
- [ ] `docs/ywc-plans/sync-skill-count-infra-suite-pr131.verification.md` 신규 생성만 수행한다
- [ ] 그 외 어떤 파일도 수정하지 않는다

## Stop Conditions
- [ ] `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` 결과가 `state: OPEN`, `mergedAt: null`이면(즉 아직 merge되지 않았으면) 즉시 멈추고, 검증 파일에 "PR #131 still unmerged — Phase 000015 tasks blocked"를 명시적으로 기록한 뒤 보고한다. Phase 000015 task는 실행하지 않는다.
- [ ] `gh` CLI가 설치되어 있지 않거나 `yongwoon/ywc-agent-toolkit` 저장소에 대한 조회 권한이 없으면(비인증 공개 REST 호출도 실패하면) 멈추고 보고한다

## Implementation Steps
- [ ] **PR 머지 상태 확인**
  - [ ] `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` 실행, 결과 기록
- [ ] **(merge된 경우에만) 4개 개별 `gh api` 호출로 최종 개수 재산정** — 중괄호 확장 단일 명령을 사용하지 않는다
  - [ ] `gh api repos/yongwoon/ywc-agent-toolkit/contents/claude-code/skills` 실행 → `type=="dir"` AND `name`이 `ywc-`로 시작하는 항목만 카운트
  - [ ] `gh api repos/yongwoon/ywc-agent-toolkit/contents/codex/skills` 실행 → 동일 필터로 카운트
  - [ ] `gh api repos/yongwoon/ywc-agent-toolkit/contents/claude-code/agents` 실행 → `name`이 `ywc-*.md` 패턴에 매칭하는 항목만 카운트 (`CLAUDE.md`, `README*.md` 제외)
  - [ ] `gh api repos/yongwoon/ywc-agent-toolkit/contents/codex/agents` 실행 → `name`이 `ywc-*.toml` 패턴에 매칭하는 항목만 카운트 (`README.md` 제외)
  - [ ] 두 skill 개수를 비교해 수렴(같음) 또는 발산(다름) 판정
- [ ] **검증 결과 파일 작성**
  - [ ] `docs/ywc-plans/sync-skill-count-infra-suite-pr131.verification.md` 생성 — PR 상태, (merge 시) Claude Code/Codex 각각의 skill·agent 개수, 수렴/발산 판정, 사용한 4개 `gh api` 명령의 raw 출력을 명시적으로 기록

## Task Verify
- [ ] `docs/ywc-plans/sync-skill-count-infra-suite-pr131.verification.md` 파일 존재 확인
- [ ] 해당 파일에 PR 상태와 (merge 시) 4개 개수 및 수렴/발산 판정이 명확한 문장으로 기록되어 있는지 확인

## Verification
- [ ] lint passes (`npm run lint`) — 신규 마크다운 파일만 추가하므로 영향 없음, 형식상 실행
- [ ] typecheck passes (`npx tsc --noEmit`) — 코드 변경 없음, 형식상 실행
- [ ] unit tests pass (해당 없음 — 코드 변경 없음)
- [ ] app builds without error (`npm run build`) — 콘텐츠/코드 변경이 없으므로 기존과 동일하게 통과해야 함
