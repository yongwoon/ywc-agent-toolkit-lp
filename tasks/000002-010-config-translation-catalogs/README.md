# 000002-010-config-translation-catalogs

## Purpose
`docs/specification/03-data.md`가 정의한 7개 콘텐츠 엔티티(Hero Content, Feature Item, Install Step, FAQ Item, Social Proof Quote, Navigation Link, SEO Metadata)를 담는 번역 카탈로그를 `en.json`(source of truth)으로 먼저 작성하고, 이를 ja/ko/zh/es로 번역한다.

## Scope
- `src/messages/en.json` 작성 (source of truth, 최초 작성)
- `src/messages/ja.json`, `src/messages/ko.json`, `src/messages/zh.json`, `src/messages/es.json` 번역
- 7개 콘텐츠 엔티티에 대응하는 key 구조 설계 (section별로 구획)

## Spec Reference

### Primary Sources
- `docs/specification/03-data.md` — Locale Message Catalog가 포함해야 하는 7개 콘텐츠 엔티티(Hero Content, Feature Item, Install Step, FAQ Item, Social Proof Quote, Navigation Link, SEO Metadata)의 attributes 정의
- `docs/specification/02-features.md` — 각 섹션의 acceptance criteria(예: Hero 헤드라인은 agent 개수를 특정 숫자로 명시하지 않음, Feature Grid는 Claude Code 41개 skill/12개 agent·Codex 41개 skill/7개 agent 수치를 노출, FAQ는 최소 5개 질문-답변 쌍과 "이게 무엇인가요"/"설치 요구사항"/"비용·토큰 영향" 질문 포함)
- `docs/specification/01-overview.md#Constraints` — 5개 locale 모두 en.json을 원본으로 번역해야 하며, key 누락 시 빌드를 실패시켜야 한다는 요구사항
- `docs/tech-stack.md#src/messages/` — 번역 카탈로그는 section별 key-value 구조(`hero.title`, `faq.items[0].question` 등)를 가지며 next-intl `getRequestConfig`가 빌드 타임에 로드한다는 설계

### Summary
`en.json`을 먼저 작성해 source of truth로 삼고, 이후 ja/ko/zh/es로 번역한다. 카탈로그는 section별 최상위 key(hero, problemSolution, featureGrid, installSteps, socialProof, faq, nav, seo 등)로 구획하며, 각 section 내부에 `03-data.md`가 정의한 attributes를 매핑한다. Hero 헤드라인은 "41개 skill"처럼 tool 공통 수치만 구체적으로 명시하고 agent 개수는 특정하지 않는다("expert agents" 같은 tool-무관 표현 사용) — Claude Code(12개)와 Codex(7개)의 agent 개수가 다르기 때문이며, 정확한 수치는 Feature Grid에서만 노출한다. FAQ의 "설치 요구사항" 답변은 install-steps가 실제로 안내하는 마켓플레이스/플러그인 설치 경로 기준으로만 작성하며, README.md의 git/bash/jq 등 bash script fallback 요구사항은 포함하지 않는다.

### Out of Scope (from spec)
- Social Proof 인용구의 실제 콘텐츠 확정 — `06-requirements.md#Open Questions`에 따라 아직 미확정이며, 이 task는 카탈로그 key 구조(quote text/source name/source link)만 준비하고 실제 인용구가 없으면 빈 배열 또는 "Coming soon" placeholder 문구로 둔다
- 커스텀 도메인 여부에 따른 SEO canonical URL 값 확정 — `06-requirements.md#Open Questions`에 따라 미결정 상태이므로, 이 task는 상대 경로 기반 canonical 구조만 준비한다

## Criticality
`normal` — 사용자 입력을 받지 않는 정적 번역 카탈로그 콘텐츠 작성

## Dependencies

### Depends On
- `000001-010-lib-nextjs-i18n-setup` — 번역 카탈로그가 로드될 프로젝트 구조(`src/i18n/request.ts`의 로드 경로 규칙)가 필요

### Depended By
- `000002-020-ui-locale-layout-seo` — SEO Metadata 카탈로그 entry(title/description/OG image reference)가 필요
- `000003-020-ui-landing-sections-part1` — Hero/Problem-Solution/Feature Grid 콘텐츠 key가 필요
- `000003-030-ui-landing-sections-part2` — Install Step/Social Proof/FAQ/Footer 콘텐츠 key가 필요

## Key Files
- `src/messages/en.json` — source of truth
- `src/messages/ja.json`
- `src/messages/ko.json`
- `src/messages/zh.json`
- `src/messages/es.json`

## Notes
- key 구조는 section 컴포넌트(Phase 000003)가 `useTranslations('hero')`처럼 section 단위로 namespace를 지정할 수 있도록 최상위 key를 section 이름과 맞춘다.
- ja/ko/zh/es 번역은 기계 번역 초안이라도 문서화 언어 정책(`~/.claude/skills/ywc-task-generator/references/language-policy.md`)에 준해 기술 용어(Claude Code, Codex, GitHub, CLI 등 고유명사/기술 용어)는 번역하지 않고 원문 그대로 유지한다.
- en.json에 존재하는 key가 다른 locale에 누락되면 빌드가 실패해야 한다(`01-overview.md` Constraints) — 이 key-parity 검사 자체의 구현(스크립트/빌드 훅)은 `000005-020-test-build-verification`의 책임이며, 이 task는 4개 언어 모두 key가 완전히 일치하도록 콘텐츠를 작성하는 것까지만 담당한다.

## Parallel Execution Metadata

### Ownership
- `src/messages/*.json`

### Shared Surfaces
- `src/messages/en.json`의 key 구조 — Phase 000003의 모든 section 컴포넌트가 이 key 구조에 의존하므로, key 이름 변경 시 하위 task와 조율 필요

### Conflicts With
- `(None identified)` — `000001-020`과 Ownership이 겹치지 않아 병렬 실행 가능

### Parallelizable After
- `000001-010-lib-nextjs-i18n-setup`

### Task Verify
- `node -e "require('./src/messages/en.json')"` 등으로 4개 언어 JSON이 valid JSON인지 확인
- key-parity 수동 대조: en.json의 모든 key가 ja/ko/zh/es.json에도 동일하게 존재하는지 확인 (자동 스크립트는 `000005-020`에서 구현)

## Out of Scope
- 번역 카탈로그를 실제로 렌더링하는 UI 컴포넌트 — Phase 000003의 책임
- 빌드 타임 key-parity 자동 검사 스크립트 구현 — `000005-020`의 책임
- Guidebook 콘텐츠(마크다운 문서) 번역 — Phase 000004/000006의 책임 (이 task는 LP 번역 카탈로그만 다룸)
