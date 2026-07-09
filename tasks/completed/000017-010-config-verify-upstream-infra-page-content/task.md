# 000017-010-config-verify-upstream-infra-page-content — Implementation Checklist

## Prerequisites
- [ ] (없음 — 배치의 첫 task)

## Allowed Edit Scope
- [ ] `docs/ywc-plans/guidebook-infra-cloud-page-pr131.verification.md` 신규 생성만 수행한다
- [ ] 그 외 어떤 파일도 수정하지 않는다

## Stop Conditions
- [ ] `gh` CLI가 설치되어 있지 않고, 비인증 공개 REST 호출(`api.github.com/repos/yongwoon/ywc-agent-toolkit/...`)도 실패하면 멈추고 보고한다
- [ ] 4개 skill 중 하나라도 `SKILL.md`를 찾을 수 없으면(경로 오류, 이름 변경 등) 멈추고 실제 경로를 재확인하도록 보고한다 — 추측으로 진행하지 않는다

## Implementation Steps
- [ ] **PR 상태 재확인**
  - [ ] `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt,headRefOid` 실행, 결과 기록
- [ ] **4개 신규 skill의 `SKILL.md` 재독해**
  - [ ] `claude-code/skills/ywc-infra-design/SKILL.md` 조회(머지되었으면 `main`, 아니면 PR head SHA 기준) — description, category/phase, 대표 커맨드 예시 정리
  - [ ] `claude-code/skills/ywc-iac-author/SKILL.md` 조회 — 동일하게 정리
  - [ ] `claude-code/skills/ywc-infra-review/SKILL.md` 조회 — 동일하게 정리
  - [ ] `claude-code/skills/ywc-infra-optimize/SKILL.md` 조회 — 동일하게 정리
  - [ ] `codex/skills/` 아래 동일 이름의 Codex 대응 skill이 존재하는지 확인하고, 존재하면 Codex 전용 커맨드 차이가 있는지 확인
- [ ] **agent 확인 (경량)**
  - [ ] `ywc-cloud-engineer` agent가 `claude-code/agents/`와 `codex/agents/`에 존재하는지 확인(존재 여부만, 상세 스펙까지는 불필요 — 새 페이지 prose에서 "이 skill들이 dispatch하는 agent"로만 언급됨)
- [ ] **검증 결과 파일 작성**
  - [ ] `docs/ywc-plans/guidebook-infra-cloud-page-pr131.verification.md` 생성 — PR 상태(state/mergedAt/headRefOid), 4개 skill 각각의 description 요약 + 대표 커맨드 예시(claude-code/codex 각 최소 1개), `ywc-cloud-engineer` 존재 여부를 명시적으로 기록

## Task Verify
- [ ] `docs/ywc-plans/guidebook-infra-cloud-page-pr131.verification.md` 파일 존재 확인
- [ ] 해당 파일에 PR 상태와 4개 skill의 커맨드 예시가 모두 기록되어 있는지 확인

## Verification
- [ ] lint passes (`npm run lint`) — 신규 마크다운 파일만 추가하므로 영향 없음, 형식상 실행
- [ ] typecheck passes (`npx tsc --noEmit`) — 코드 변경 없음, 형식상 실행
- [ ] unit tests pass (해당 없음 — 코드 변경 없음)
- [ ] app builds without error (`npm run build`) — 콘텐츠/코드 변경이 없으므로 기존과 동일하게 통과해야 함
