# 000009-030-config-guidebook-language-setup-entry — Implementation Checklist

## Prerequisites
- [ ] `000008-010-config-verify-upstream-language-setup-status`가 완료되어 있고, `docs/ywc-plans/sync-skill-count-language-setup.verification.md`에 신규 스킬의 최종 이름이 기록되어 있다

## Allowed Edit Scope
- [ ] `src/content/guidebook/{en,ja,ko,zh,es}/13-skill-reference.md`에만 수정한다
- [ ] Ownership 범위를 벗어나는 수정(예: README.md 테이블 추가)이 필요하다고 판단되면 멈추고 보고한다 — spec은 이를 명시적으로 out of scope로 규정한다

## Stop Conditions
- [ ] 검증 파일이 "PR #125 still unmerged"를 기록하고 있으면 즉시 멈춘다
- [ ] 검증 파일에 신규 스킬의 최종 이름이 기록되어 있지 않으면 멈추고 `000008-010`을 다시 확인하도록 보고한다

## Implementation Steps
- [ ] **재검증 값 확인**
  - [ ] `docs/ywc-plans/sync-skill-count-language-setup.verification.md`에서 신규 스킬의 최종 이름과 SKILL.md 설명 확인
- [ ] **`en/13-skill-reference.md` 갱신**
  - [ ] 상단 lookup 테이블에 신규 행 추가 (기존 행 스타일과 동일한 형식, 상황 설명 예: "You want downstream skills to stop asking for `--lang` every time")
  - [ ] line 275 부근 "extend the toolkit itself" 섹션 아래 `<ToolTabs><ToolTabsPanel tool="claude-code">...<ToolTabsPanel tool="codex">...` 구조로 예시 서브섹션 추가
  - [ ] 기존 개별 스킬의 일회성 `--lang` 플래그와 이 스킬의 영속적 기본값의 차이, 우선순위(explicit `--lang` > project/user 영속 기본값 > 질문)를 설명하는 문단 추가
- [ ] **ja/ko/zh/es 갱신**
  - [ ] 각 로케일 파일에 동일 구조를 그 파일의 기존 문체로 번역해 추가 (기계적 직역 금지)

## Task Verify
- [ ] 5개 로케일 파일 모두에서 신규 행의 앵커 링크가 정상 resolve되는지 확인
- [ ] `npm run test:content`

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠)
- [ ] app builds without error (`npm run build`)
