# 000008-010-config-verify-upstream-language-setup-status — Implementation Checklist

## Prerequisites
- [ ] (없음 — 배치의 첫 task)

## Allowed Edit Scope
- [ ] `docs/ywc-plans/sync-skill-count-language-setup.verification.md` 신규 생성만 수행한다
- [ ] 그 외 어떤 파일도 수정하지 않는다

## Stop Conditions
- [ ] `gh pr view 125 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` 결과가 `state: OPEN`, `mergedAt: null`이면(즉 아직 merge되지 않았으면) 즉시 멈추고, 검증 파일에 "PR #125 still unmerged — Phase 000009 tasks blocked" 를 명시적으로 기록한 뒤 보고한다. Phase 000009 task는 실행하지 않는다.
- [ ] `gh` CLI가 설치되어 있지 않거나 `yongwoon/ywc-agent-toolkit` 저장소에 대한 인증/권한이 없으면 멈추고 보고한다

## Implementation Steps
- [ ] **PR 머지 상태 확인**
  - [ ] `gh pr view 125 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt` 실행, 결과 기록
- [ ] **(merge된 경우에만) 최종 skill 개수 재산정**
  - [ ] `gh api repos/yongwoon/ywc-agent-toolkit/contents/claude-code/skills` 실행, `scripts/` 항목 제외한 skill 개수 산정
  - [ ] `gh api repos/yongwoon/ywc-agent-toolkit/contents/codex/skills` 실행, `scripts/` 항목 제외한 skill 개수 산정
  - [ ] 두 값을 비교해 수렴(같음) 또는 발산(다름) 판정
- [ ] **(merge된 경우에만) 신규 skill 최종 이름 확인**
  - [ ] `claude-code/skills/`와 `codex/skills/` 목록에서 신규 언어 설정 skill의 실제 디렉터리명 확인 (계획 시점 가정: `ywc-setup-language`/`ywc-setup`, 다를 수 있음)
- [ ] **검증 결과 파일 작성**
  - [ ] `docs/ywc-plans/sync-skill-count-language-setup.verification.md` 생성 — PR 상태, (merge 시) Claude Code/Codex 각 skill 개수, 수렴/발산 판정, 신규 skill 최종 이름을 명시적으로 기록

## Task Verify
- [ ] `docs/ywc-plans/sync-skill-count-language-setup.verification.md` 파일 존재 확인
- [ ] 해당 파일에 PR 상태와 (merge 시) 수렴/발산 판정이 명확한 문장으로 기록되어 있는지 확인

## Verification
- [ ] lint passes (`npm run lint`) — 신규 마크다운 파일만 추가하므로 영향 없음, 형식상 실행
- [ ] typecheck passes (`npx tsc --noEmit`) — 코드 변경 없음, 형식상 실행
- [ ] unit tests pass (해당 없음 — 코드 변경 없음)
- [ ] app builds without error (`npm run build`) — 콘텐츠/코드 변경이 없으므로 기존과 동일하게 통과해야 함
