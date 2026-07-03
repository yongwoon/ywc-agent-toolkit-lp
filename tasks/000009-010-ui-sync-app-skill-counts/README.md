# 000009-010-ui-sync-app-skill-counts

## Purpose
라이브 Next.js 앱(5개 로케일 `messages.json`, `hero.tsx`)과 디자인 템플릿 파일(`docs/design-templates/landing-page/messages.js`)에 하드코딩된 skill 개수를 `000008-010`에서 재검증된 값으로 갱신하고, tool별 개수가 발산하는 경우 hero 문구를 tool-agnostic으로 전환하며, Feature Grid에 새 카테고리를 추가한다.

## Scope
- `src/messages/{en,ja,ko,zh,es}.json` — hero headline, pipeline description, featureGrid description/title/items, FAQ, SEO 문자열의 숫자 갱신 + `featureGrid.items`에 새 카테고리 추가 + `featureGrid.title`의 카테고리 개수 단어 갱신(수렴 시)
- `src/components/sections/hero.tsx` — `SectionEyebrow`와 Terminal 데모 성공 라인(2곳) 갱신, 발산 시 tool-agnostic 문구로 전환
- `docs/design-templates/landing-page/messages.js` — 5개 로케일 블록의 동일 숫자 갱신 (자동 key-parity 검증 없음, 수동 diff 필요)

## Spec Reference

### Primary Sources
- `docs/ywc-plans/sync-skill-count-language-setup.md` — `## Existing Constraints Touched`(해당 파일 행들), `AC2`, `AC3`, `AC4`, `AC6`, `### FR-2`, `### FR-3`, `### FR-5`

### Summary
`000008-010`이 기록한 검증 결과(`docs/ywc-plans/sync-skill-count-language-setup.verification.md`)를 먼저 읽고, PR이 unmerged였다면 이 task는 실행하지 않는다(Stop Condition). Merge되었고 수렴한 경우: `en.json`을 source of truth로 먼저 편집한 뒤 ja/ko/zh/es를 각 로케일의 자연스러운 표현으로 갱신하고, `featureGrid.items`에 "Toolkit & Setup" 카테고리를 `total − 37` 값으로 추가하며, `featureGrid.title`의 "Six categories"를 "Seven categories"(및 각 로케일 대응)로 갱신한다. 발산한 경우: hero 문구를 `content-voice.md:16-18`의 기존 agent-count 발산 처리 패턴과 동일하게 tool-agnostic으로 전환하고, `featureGrid.description`에서도 단일 총계를 제거하며, Feature Grid 카테고리 값 편집(FR-5)은 이 task의 범위가 아니다(`000009-020`이 아니라 별도 blocking 처리 — Notes 참고).

### Out of Scope (from spec)
- Feature Grid 카테고리에 특정 skill 이름을 나열해 산술 근거로 삼는 것 — 스펙이 명시적으로 금지 (이 저장소 어디에도 skill-to-category 매핑이 존재하지 않음, 검증됨)
- `docs/design-system/*.md`, `docs/specification/*.md`, `docs/mission.md`, 루트 `CLAUDE.md` 갱신 — `000009-020`의 책임

## Criticality
`normal` — 정적 마케팅 콘텐츠 갱신, 런타임 보안 표면 없음

## Dependencies

### Depends On
- `000008-010-config-verify-upstream-language-setup-status` — 재검증된 skill 개수와 수렴/발산 판정 제공

### Depended By
- `000010-010-test-verify-full-build` — 이 task의 변경 포함 전체 빌드 검증 필요

## Key Files
- `src/messages/en.json`
- `src/messages/ja.json`
- `src/messages/ko.json`
- `src/messages/zh.json`
- `src/messages/es.json`
- `src/components/sections/hero.tsx`
- `docs/design-templates/landing-page/messages.js`

## Notes
- **발산 시 FR-5 실행 금지**: `000008-010`의 판정이 발산이면, `featureGrid.items`에 새 카테고리를 추가하는 산술 편집(FR-5)과 `featureGrid.title` 갱신은 수행하지 않는다 — 스펙은 이 경우 "사람이 해결할 때까지 편집하지 말고 멈추라"는 명시적 blocking을 요구한다. 이 task는 hero의 tool-agnostic 전환과 `featureGrid.description`의 단일 총계 제거까지만 수행하고, Feature Grid 카테고리 편집 부분은 진행하지 않은 채 보고한다.
- `docs/design-templates/landing-page/messages.js`는 `scripts/check-message-keys.mjs`의 key-parity 검증 대상이 아니다 — 5개 로케일 블록을 모두 수정한 뒤 `en` 블록 구조와 나머지 블록 구조를 수동으로 diff해 빠진 블록이 없는지 확인해야 한다(자동 안전장치 없음).
- `feature-grid.tsx`는 `items.map()` 기반이라 새 카테고리 추가에 컴포넌트 코드 수정이 필요 없다(검증됨) — 신규 항목의 `lane` 값은 `"claude"`로 지정한다(장식적 그룹핑, tool 배타성 주장 아님 — 스펙 FR-5 참고).

## Parallel Execution Metadata

### Ownership
- `src/messages/{en,ja,ko,zh,es}.json`
- `src/components/sections/hero.tsx`
- `docs/design-templates/landing-page/messages.js`

### Shared Surfaces
- `src/messages/*.json`의 JSON 키 구조 — `scripts/check-message-keys.mjs`(prebuild)가 5개 로케일 키 존재 여부를 검증하므로, 값만 수정하고 키를 편측 추가하지 않는다

### Conflicts With
- `(None identified)` — `000009-020`(문서 파일), `000009-030`(가이드북)과 파일 범위가 겹치지 않아 병렬 실행 가능

### Parallelizable After
- `000008-010-config-verify-upstream-language-setup-status`

### Task Verify
- `grep -rn "41\|42" src/messages/*.json src/components/sections/hero.tsx docs/design-templates/landing-page/messages.js` — `000008-010`이 기록한 재검증 숫자만 남아있는지 확인 (재검증 숫자가 41/42가 아니면 이 grep 패턴을 그 숫자로 교체)
- `npm run build` — 정상 빌드 및 hero/Feature Grid 렌더링 확인

## Out of Scope
- `docs/design-system/*.md`, `docs/specification/*.md`, `docs/mission.md`, 루트 `CLAUDE.md` — `000009-020`
- `src/content/guidebook/**` — `000009-030`
