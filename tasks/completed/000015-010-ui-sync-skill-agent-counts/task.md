# 000015-010-ui-sync-skill-agent-counts — Implementation Checklist

## Prerequisites
- [ ] `000014-010-config-verify-upstream-infra-suite-status`가 완료되어 있고, `docs/ywc-plans/sync-skill-count-infra-suite-pr131.verification.md`에 PR merge 확인, 4개 개수(Claude Code/Codex × skill/agent), 수렴/발산 판정이 기록되어 있다

## Allowed Edit Scope
- [ ] `src/messages/{en,ja,ko,zh,es}.json`, `src/components/sections/hero.tsx`, `docs/design-templates/landing-page/messages.js`, `docs/design-system/content-voice.md`, `docs/design-system/components.md`, `docs/design-system/README.md`, `docs/specification/01-overview.md`/`02-features.md`/`03-data.md`/`05-user-flows.md`, `docs/mission.md`, 저장소 루트 `CLAUDE.md`에만 수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 멈추고 보고한다

## Stop Conditions
- [ ] 검증 파일이 "PR #131 still unmerged"를 기록하고 있으면 즉시 멈춘다 — 어떤 숫자도 편집하지 않는다
- [ ] 검증 파일에 수렴/발산 판정이 기록되어 있지 않거나 모호하면 멈추고 `000014-010`을 다시 확인하도록 보고한다

## Implementation Steps
- [ ] **재검증 값 확인**
  - [ ] `docs/ywc-plans/sync-skill-count-infra-suite-pr131.verification.md`에서 PR merge 상태, 4개 개수(Claude Code skill/agent, Codex skill/agent), 수렴/발산 판정을 읽는다
- [ ] **`en.json` 갱신 (source of truth)**
  - [ ] hero headline, `hero.demoInstalled`, pipeline description, `featureGrid.description`, FAQ 답변(1곳, line 248 부근), SEO `metadata.title`/`.description`(line 324-325 부근)의 숫자를 재검증 값으로 갱신
  - [ ] **(FR-4a, 수렴 시)** `featureGrid.items`에 새 카테고리 `{ label: "Infrastructure & Cloud", value: "<재검증 skill 총합 - 42> skills", description: "...", lane: "codex" }` 추가 (특정 skill 이름을 나열해 산술 근거로 삼지 않는다), `featureGrid.title`을 "Eight categories, one pipeline, two tools."로 갱신, 두 agent 카테고리 값(`"12 agents"`/`"7 agents"`) 갱신
  - [ ] **(FR-4b, 발산 시)** `featureGrid.items`/`.title`/agent 카테고리 값은 전혀 편집하지 않는다 — hero/`featureGrid.description`의 skill 개수만 tool-agnostic 문구로 전환 (필요 시)하고, "Feature Grid skill-count divergence unresolved — human decision required"를 이 task의 보고에 명시적으로 기록한다
- [ ] **ja/ko/zh/es 갱신**
  - [ ] 각 로케일의 기존 표현 스타일을 유지하며 `en.json`과 동일한 구조/값으로 미러링 (기계적 치환 금지)
- [ ] **`hero.tsx` 갱신**
  - [ ] `SectionEyebrow` 문자열(line 29 부근) 갱신
- [ ] **`docs/design-templates/landing-page/messages.js` 갱신**
  - [ ] `en` 블록을 먼저 갱신, 이어서 `ja`/`ko`/`zh`/`es` 블록 순서대로 갱신
  - [ ] 5개 블록 구조를 서로 diff해 누락된 블록이 없는지 수동 확인 (자동 검증 없음)
- [ ] **`docs/design-system/content-voice.md` 갱신**
  - [ ] "42 skills is true on both tools" 규칙 문단 및 ✅/❌ 예시 갱신
- [ ] **`docs/design-system/components.md` 갱신**
  - [ ] line 32(bare "42 skills"), line 64("42/12"와 "42/7"이 한 줄에 함께), line 68(bare "42")을 각각 정확히 대응하는 값으로 갱신
- [ ] **`docs/design-system/README.md` 갱신**
  - [ ] line 58 부근 "agent counts differ 12/7" 문구를 재검증된 agent 개수로 갱신
- [ ] **`docs/specification/02-features.md` 갱신**
  - [ ] line 33 부근("42개 skill"만 있는 문구), line 34 부근(hero가 특정 agent 숫자를 노출하지 않는 근거로 인용하는 "Claude Code(12개)"/"Codex(7개)"), line 57 부근(quad-number 전체 문구)을 각각 구분해 갱신
- [ ] **`docs/specification/03-data.md` 갱신**
  - [ ] "What it represents" 예시 문장의 숫자 갱신
- [ ] **`docs/specification/01-overview.md`, `05-user-flows.md` 갱신**
  - [ ] 각각의 quad-number/서술 문구 갱신
- [ ] **`docs/mission.md` 갱신**
  - [ ] skill/agent 개수 갱신
- [ ] **저장소 루트 `CLAUDE.md` 갱신**
  - [ ] Project Overview 섹션의 skill/agent 개수 갱신

## Task Verify
- [ ] `LC_ALL=C grep -rn -E "\b42\b|\b12\b|\b7\b" src/messages/*.json src/components/sections/hero.tsx docs/design-system/*.md docs/mission.md CLAUDE.md docs/design-templates/landing-page/messages.js` — 재검증된 새 숫자만 남고 옛 숫자(42/12/7)는 no-count-context를 제외하고 남아있지 않음
- [ ] `grep -rn -E "42개|12개|7개" docs/specification/0{1,2,3,5}-*.md` — 옛 한국어 표기가 남아있지 않음
- [ ] 위 두 명령을 재검증된 새 숫자로 치환한 positive check — must-change 위치에서만 새 숫자가 발견됨
- [ ] (FR-4a 경로) `featureGrid.items` 값 합산이 `featureGrid.description`과 일치, `featureGrid.title`이 실제 `items` 길이와 일치 — 5개 로케일 모두
- [ ] (FR-4b 경로) `git diff`에 `featureGrid.items`/`.title`/agent 값 편집이 없음
- [ ] `npm run build` 성공, hero/Feature Grid 섹션 렌더링 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠)
- [ ] app builds without error (`npm run build`, `check-message-keys.mjs` prebuild 단계 통과 포함)
