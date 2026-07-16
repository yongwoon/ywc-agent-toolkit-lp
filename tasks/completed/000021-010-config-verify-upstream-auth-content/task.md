# 000021-010-config-verify-upstream-auth-content — Implementation Checklist

## Prerequisites
- [ ] (None — root task)

## Allowed Edit Scope
- [ ] `docs/ywc-plans/guidebook-auth-implement-page.verification.md`(신규 생성)에만 기록한다
- [ ] 다른 어떤 파일도 수정하지 않는다(순수 조사·기록 task)

## Stop Conditions
- [ ] `gh auth status`가 실패하거나 `yongwoon/ywc-agent-toolkit`에 대한 read 권한이 없으면 멈추고 보고한다
- [ ] `claude-code/skills/ywc-auth-implement/SKILL.md` 또는 `codex/skills/ywc-auth-implement/SKILL.md` 중 하나라도 접근 불가능하면 멈추고 보고한다(둘 다 확보되어야 `000022-010`이 진행 가능)
- [ ] PR #144가 실행 시점에 재조회 결과 `MERGED`가 아니라면(원칙적으로는 이미 merge되어 있어야 하지만) 멈추고 사용자에게 보고한다 — 이는 스펙의 전제 자체가 깨진 상황이다

## Implementation Steps
- [ ] **PR 상태 재확인**
  - [ ] `gh pr view 144 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt,headRefOid` 실행, 결과를 노트에 기록
- [ ] **Claude Code SKILL.md 재독**
  - [ ] `claude-code/skills/ywc-auth-implement/SKILL.md` 전체를 읽고 preflight gate 5단계, 9-category 인터뷰 라벨, dynamic recommendation 규칙, 3개 dispatch 프롬프트 대상(`ywc-backend-coder`/`ywc-frontend-coder`/`ywc-doc-writer`), security/E2E/PR gate 라우팅 표를 노트에 요약
- [ ] **Codex SKILL.md 재독**
  - [ ] `codex/skills/ywc-auth-implement/SKILL.md` 전체를 읽고 Claude Code 버전과의 구조적 차이(특히 `Task(subagent_type:...)` fan-out이 없고 세션 내 orchestration으로 처리되는 부분)를 노트에 요약
- [ ] **노트 작성**
  - [ ] `docs/ywc-plans/guidebook-auth-implement-page.verification.md`에 위 결과를 통합 정리(PR 상태, 두 SKILL.md 요약, tool-difference 요약)

## Task Verify
- [ ] `docs/ywc-plans/guidebook-auth-implement-page.verification.md` 파일이 존재하고 PR 상태 + 두 SKILL.md 요약 + tool-difference 요약을 모두 포함하는지 확인

## Verification
- [ ] lint passes (해당 없음 — 마크다운 노트 작성만, 소스 코드 변경 없음)
- [ ] typecheck passes (해당 없음)
- [ ] unit tests pass (해당 없음)
- [ ] app builds without error (해당 없음 — 이 task는 `npm run build`에 영향을 주는 파일을 수정하지 않음)
