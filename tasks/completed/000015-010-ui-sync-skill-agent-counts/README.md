# 000015-010-ui-sync-skill-agent-counts

## Purpose
`000014-010`에서 재검증된 skill/agent 개수와 수렴/발산 판정에 따라, 라이브 Next.js 앱(5개 로케일 `messages.json`, `hero.tsx`), 디자인 템플릿 파일, 디자인 시스템 문서, 프로젝트 미션/스펙 문서, 저장소 루트 `CLAUDE.md`에 하드코딩된 "42 skills"/"12 agents"/"7 agents" 계열 숫자를 전부 갱신한다. 수렴 시(FR-4a) Feature Grid에 신규 카테고리를 추가하고 카테고리-개수 단어를 갱신하며, 발산 시(FR-4b) Feature Grid 숫자·타이틀 편집을 전혀 수행하지 않고 blocking 상태로 보고한다. (llm 모드 — 이 change class의 전례인 Phase 000009는 human 모드로 3개 task에 나뉘어 있었으나, 이번 배치는 하나의 수직 슬라이스로 통합한다. 가이드북 콘텐츠 동기화는 이 스펙의 범위 밖이므로 대응하는 task가 없다.)

## Scope
- `src/messages/{en,ja,ko,zh,es}.json` — hero headline, `hero.demoInstalled`, pipeline description, `featureGrid.description`/`.title`/`.items`, FAQ 답변(1곳, `en.json:248`), SEO title/description의 숫자 갱신 + (FR-4a) `featureGrid.items`에 신규 카테고리 추가 + `featureGrid.title`의 카테고리 개수 단어 갱신
- `src/components/sections/hero.tsx` — `SectionEyebrow`(line 29 부근) 갱신
- `docs/design-templates/landing-page/messages.js` — 5개 로케일 블록(en/ja/ko/zh/es)의 동일 숫자 갱신
- `docs/design-system/content-voice.md` — "42 skills is true on both tools" 규칙 문단 및 ✅/❌ 예시 갱신
- `docs/design-system/components.md` — Badge/StatCard 일러스트레이션 예시 값 갱신
- `docs/design-system/README.md` — 12/7 agent-count 언급(line 58 부근) 갱신 (Iteration 1 Amendments Fix 4로 추가된 must-change 파일)
- `docs/specification/01-overview.md`, `02-features.md`, `03-data.md`, `05-user-flows.md` — 한국어 quad-number 인용/예시 문구 갱신
- `docs/mission.md` — Mission 섹션의 skill/agent 개수 문구 갱신
- 저장소 루트 `CLAUDE.md` — Project Overview 섹션의 skill/agent 개수 문구 갱신

## Spec Reference

### Primary Sources
- `docs/ywc-plans/sync-skill-count-infra-suite-pr131.md` — `## Existing Constraints Touched`(전체), `### FR-2`, `### FR-3`, `## Iteration 1 Amendments` → Fix 1 (FR-4a/FR-4b, AC4a/AC4b), Fix 2 (AC2 3단계 grep), Fix 4 (`docs/design-system/README.md` 추가)

### Summary
`en.json`을 source of truth로 먼저 편집한 뒤 ja/ko/zh/es를 각 로케일의 자연스러운 표현으로 갱신한다(기계적 치환 금지). **FR-4a(수렴 case, 기본)**: `featureGrid.items`에 새 카테고리(label "Infrastructure & Cloud" 또는 로케일별 자연스러운 대응 표현, value = `재검증된 skill 총합 − 42`, `lane: "codex"`)를 5개 로케일 모두에 추가하고, 두 기존 agent 카테고리 값(`"12 agents"`→재검증된 Claude Code 값, `"7 agents"`→재검증된 Codex 값)을 갱신하며, `featureGrid.title`의 카테고리 개수 단어("Seven"→"Eight" 등)를 같은 5개 파일에서 갱신한다. 신규 카테고리의 description은 특정 skill 이름을 나열해 "증거"로 삼지 않는다(이 저장소 어디에도 skill-to-category 매핑이 없음, 검증됨). **FR-4b(발산 case)**: `featureGrid.items`/`.title`/두 agent 카테고리 값 중 어느 것도 편집하지 않고, "Feature Grid skill-count divergence unresolved — human decision required" 형태로 명시적으로 멈추고 보고한다(Task Verify에서 이 상태를 확인 가능해야 함). Task Verify는 Iteration 1 Amendments Fix 2가 재작성한 amended AC2의 3단계 grep을 그대로 사용한다 — 원본의 단일 `\b42\b|\b12\b|\b7\b` 패턴은 UTF-8 로케일에서 한국어 "42개"류 표기의 단어 경계를 인식하지 못해 조용히 통과하는 버그가 있으므로 절대 사용하지 않는다.

### Out of Scope (from spec)
- `src/content/guidebook/**`, `src/components/guidebook/guidebook-nav.ts`, `scripts/guidebook-slugs.mjs`, `src/lib/skill-links.ts` — 형제 스펙 `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md`의 책임
- `ywc-security-engineer`/`ywc-performance-engineer` lens-extension 설명의 prose 수정 — 개수 변경이 아니므로 이 스펙의 필수 범위가 아님
- `tasks/completed/**`의 41/42/12/7 하드코딩 — 이미 merge된 작업의 동결된 역사적 기록
- `docs/ywc-plans/guidebook-tool-tabs.md`, `docs/ywc-plans/sync-skill-count-language-setup.md` 자체 — 역사적 plan 문서

## Criticality
`normal` — 정적 마케팅 콘텐츠 갱신, 런타임 보안 표면 없음

## Dependencies

### Depends On
- `000014-010-config-verify-upstream-infra-suite-status` — 재검증된 skill/agent 개수와 수렴/발산 판정 제공

### Depended By
- `000016-010-test-verify-full-build` — 이 task의 변경 포함 전체 빌드·grep 스윕 검증 필요

## Key Files
- `src/messages/en.json`, `ja.json`, `ko.json`, `zh.json`, `es.json`
- `src/components/sections/hero.tsx`
- `docs/design-templates/landing-page/messages.js`
- `docs/design-system/content-voice.md`
- `docs/design-system/components.md`
- `docs/design-system/README.md`
- `docs/specification/01-overview.md`, `02-features.md`, `03-data.md`, `05-user-flows.md`
- `docs/mission.md`
- `CLAUDE.md` (저장소 루트)

## Notes
- `docs/specification/02-features.md`는 **세 곳**을 구분해서 갱신한다: line 33 부근은 skill 개수만("42개 skill" 형태), line 34 부근은 hero가 특정 agent 숫자를 노출하지 않는 근거로 인용하는 agent 개수("Claude Code(12개)"/"Codex(7개)" 형태), line 57 부근은 quad-number 전체 문구("Claude Code 42개 skill / 12개 agent, Codex 42개 skill / 7개 agent" 형태) — 각각 정확히 대응하는 값으로 갱신한다.
- `docs/specification/03-data.md:28`은 Feature Item 엔티티의 "What it represents" 예시 문장이지 "Key attributes" 헤딩이 아니다 — 예시 값이므로 라이브 데이터가 아님을 유지한 채 숫자만 갱신한다.
- `docs/design-system/components.md`의 예시 값들은 일러스트레이션 목적이며 라이브 데이터가 아니다 — 형식/스타일은 그대로 두고 숫자만 갱신한다. line 32는 bare "42 skills", line 64는 "42/12"와 "42/7"이 한 줄에 함께, line 68은 bare "42"만 있다(각각 정확히 대응하는 값으로 갱신).
- `docs/design-templates/landing-page/messages.js`는 5개 로케일 블록(en/ja/ko/zh/es) 구조를 서로 diff해 누락된 블록이 없는지 수동으로 확인한다(`check-message-keys.mjs`가 이 파일을 커버하지 않으므로 자동 안전망 없음).
- **원본 AC2의 grep을 사용하지 말 것.** 반드시 Iteration 1 Amendments Fix 2의 3단계 체크를 사용한다:
  1. `LC_ALL=C grep -rn -E "\b42\b|\b12\b|\b7\b" src/messages/*.json src/components/sections/hero.tsx docs/design-system/*.md docs/mission.md CLAUDE.md docs/design-templates/landing-page/messages.js` — negative check(영어/JSON 파일)
  2. `grep -rn -E "42개|12개|7개" docs/specification/0{1,2,3,5}-*.md` — negative check(한국어 spec 문서, `LC_ALL=C` 불필요)
  3. 위 두 명령을 재검증된 새 숫자(`000014-010`의 판정값)로 치환한 positive check
- `docs/design-system/README.md:58`은 "Hero says "expert agents" (agent counts differ 12/7); exact counts only in the feature grid."라는 문구를 갖고 있다 — `content-voice.md`/루트 `CLAUDE.md`와 동일한 사실을 담고 있으므로 반드시 함께 갱신한다(Iteration 1 Amendments Fix 4).

## Parallel Execution Metadata

### Ownership
- `src/messages/en.json`, `ja.json`, `ko.json`, `zh.json`, `es.json`
- `src/components/sections/hero.tsx`
- `docs/design-templates/landing-page/messages.js`
- `docs/design-system/content-voice.md`
- `docs/design-system/components.md`
- `docs/design-system/README.md`
- `docs/specification/01-overview.md`, `02-features.md`, `03-data.md`, `05-user-flows.md`
- `docs/mission.md`
- `CLAUDE.md` (저장소 루트)

### Shared Surfaces
- `(None)` — `000014-010`(검증 파일 전용)과 disjoint, 형제 스펙(guidebook 콘텐츠)과도 disjoint

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000014-010-config-verify-upstream-infra-suite-status`

### Task Verify
- amended AC2의 3단계 grep 체크 통과 (negative × 2 + positive)
- (FR-4a 경로) `featureGrid.items` 값 합산이 `featureGrid.description`의 총계와 일치, 두 agent 카테고리 값이 재검증된 개수와 일치, `featureGrid.title`의 카테고리 개수 단어가 실제 `items` 배열 길이와 일치 — 5개 로케일 모두
- (FR-4b 경로) `git diff`에 `featureGrid.items`/`.title`/agent 카테고리 값 편집이 전혀 없고, blocking 보고가 존재
- `npm run build` 성공 (prebuild의 `check-message-keys.mjs` 통과 포함)

## Out of Scope
- `src/content/guidebook/**` 등 가이드북 콘텐츠 — 형제 스펙 책임
- `tasks/completed/**`, `docs/ywc-plans/guidebook-tool-tabs.md` — 역사적 기록, out of scope
