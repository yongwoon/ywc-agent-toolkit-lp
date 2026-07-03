# 000009-020-config-sync-docs-skill-counts — Implementation Checklist

## Prerequisites
- [ ] `000008-010-config-verify-upstream-language-setup-status`가 완료되어 있고, `docs/ywc-plans/sync-skill-count-language-setup.verification.md`에 재검증 값이 기록되어 있다

## Allowed Edit Scope
- [ ] `docs/design-system/content-voice.md`, `docs/design-system/components.md`, `docs/specification/01-overview.md`, `02-features.md`, `03-data.md`, `05-user-flows.md`, `docs/mission.md`, 저장소 루트 `CLAUDE.md`에만 수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 멈추고 보고한다

## Stop Conditions
- [ ] 검증 파일이 "PR #125 still unmerged"를 기록하고 있으면 즉시 멈춘다 — 어떤 숫자도 편집하지 않는다

## Implementation Steps
- [ ] **재검증 값 확인**
  - [ ] `docs/ywc-plans/sync-skill-count-language-setup.verification.md`에서 재검증된 skill/agent 개수 확인
- [ ] **`docs/design-system/content-voice.md` 갱신**
  - [ ] "41 skills is true on both tools" 규칙 문단 및 ✅/❌ 예시 갱신 (수렴 시 규칙 문구 유지, 발산 시 규칙 자체를 tool-agnostic으로 재서술)
- [ ] **`docs/design-system/components.md` 갱신**
  - [ ] Badge/StatCard 일러스트레이션 예시 값 갱신
- [ ] **`docs/specification/02-features.md` 갱신**
  - [ ] line 33 부근("41개 skill"만 있는 문구)과 line 57 부근(quad-number 전체 문구)을 각각 정확히 구분해 갱신
- [ ] **`docs/specification/03-data.md` 갱신**
  - [ ] "What it represents" 예시 문장의 숫자 갱신 (Key attributes 헤딩과 혼동하지 않도록 주의)
- [ ] **`docs/specification/01-overview.md`, `05-user-flows.md` 갱신**
  - [ ] 각각의 quad-number/서술 문구 갱신
- [ ] **`docs/mission.md` 갱신**
  - [ ] skill 개수 갱신 + "12 custom agents for Claude Code and Codex" 모호한 표현을 "12 for Claude Code, 7 for Codex" 형태로 명시적 분리
- [ ] **저장소 루트 `CLAUDE.md` 갱신**
  - [ ] Project Overview 섹션의 skill/agent 개수 갱신

## Task Verify
- [ ] `grep -rn "41\|42" docs/design-system/*.md docs/specification/0{1,2,3,5}-*.md docs/mission.md CLAUDE.md` — 재검증된 숫자만 남아있는지 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 문서)
- [ ] app builds without error (`npm run build`)
