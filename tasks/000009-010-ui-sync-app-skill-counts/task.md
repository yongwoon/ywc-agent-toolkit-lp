# 000009-010-ui-sync-app-skill-counts — Implementation Checklist

## Prerequisites
- [ ] `000008-010-config-verify-upstream-language-setup-status`가 완료되어 있고, `docs/ywc-plans/sync-skill-count-language-setup.verification.md`에 PR merge 확인 및 수렴/발산 판정이 기록되어 있다

## Allowed Edit Scope
- [ ] `src/messages/{en,ja,ko,zh,es}.json`, `src/components/sections/hero.tsx`, `docs/design-templates/landing-page/messages.js`에만 수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 멈추고 보고한다

## Stop Conditions
- [ ] 검증 파일이 "PR #125 still unmerged"를 기록하고 있으면 즉시 멈춘다 — 어떤 숫자도 편집하지 않는다
- [ ] 검증 파일에 판정이 기록되어 있지 않거나 모호하면 멈추고 `000008-010`을 다시 확인하도록 보고한다

## Implementation Steps
- [ ] **재검증 값 확인**
  - [ ] `docs/ywc-plans/sync-skill-count-language-setup.verification.md`에서 PR merge 상태, 최종 skill 개수(Claude Code/Codex 각각), 수렴/발산 판정을 읽는다
- [ ] **`en.json` 갱신 (source of truth)**
  - [ ] hero headline, pipeline description, featureGrid description, FAQ 답변 2곳, SEO title/description의 숫자를 재검증 값으로 갱신
  - [ ] (수렴 시) `featureGrid.items`에 새 카테고리 `{ label: "Toolkit & Setup", value: "<total-37> skills", description: "...", lane: "claude" }` 추가, `featureGrid.title`을 "Seven categories, one pipeline, two tools."로 갱신
  - [ ] (발산 시) `featureGrid.description`에서 단일 총계를 제거해 tool-agnostic 문구로 전환, `featureGrid.items` 신규 카테고리 추가는 수행하지 않음
- [ ] **ja/ko/zh/es 갱신**
  - [ ] 각 로케일의 기존 표현 스타일을 유지하며 `en.json`과 동일한 구조/값으로 미러링
- [ ] **`hero.tsx` 갱신**
  - [ ] `SectionEyebrow` 문자열(line 29 부근), 두 Terminal 데모 성공 라인(line 90, 105 부근) 갱신
  - [ ] (발산 시) 세 곳 모두 tool-specific 숫자 없이 tool-agnostic 문구로 전환
- [ ] **`docs/design-templates/landing-page/messages.js` 갱신**
  - [ ] `en` 블록을 먼저 갱신 (헤더 주석이 "EN is the source of truth"를 명시)
  - [ ] `ja`/`ko`/`zh`/`es` 블록을 순서대로 갱신
  - [ ] 5개 블록 구조를 서로 diff해 누락된 블록이 없는지 수동 확인 (자동 검증 없음)

## Task Verify
- [ ] `grep -rn "41\|42" src/messages/*.json src/components/sections/hero.tsx docs/design-templates/landing-page/messages.js` — 재검증된 숫자만 일관되게 남아있는지 확인
- [ ] `npm run build` 성공, hero/Feature Grid 섹션 렌더링 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠)
- [ ] app builds without error (`npm run build`, `check-message-keys.mjs` prebuild 단계 통과 포함)
