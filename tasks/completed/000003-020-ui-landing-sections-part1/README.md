# 000003-020-ui-landing-sections-part1

## Purpose
Landing page의 앞부분 4개 section(site-header, hero, problem-solution, feature-grid)과 이들을 조합하는 `[locale]/page.tsx`의 초기 skeleton을 구현한다.

## Scope
- `src/components/sections/site-header.tsx` — 워드마크, nav 링크, `LocaleSwitcher`, GitHub star `Badge`, Install `Button`
- `src/components/sections/hero.tsx` — 헤드라인("expert agents"), 서브헤딩, CTA `Button`, `Terminal`(CLI 데모)
- `src/components/sections/problem-solution.tsx` — before/after 2컬럼 비교(✗/✓)
- `src/components/sections/feature-grid.tsx` — 4× `StatCard`(lane="claude" amber / lane="codex" cyan) + skill-category chip
- `src/app/[locale]/page.tsx` — 위 4개 section을 순서대로 조합하는 초기 skeleton (나머지 4개 section은 `000003-030`이 추가)

## Spec Reference

### Primary Sources
- `docs/specification/02-features.md#Header & Navigation` — 로고 클릭 시 최상단 이동, nav 클릭 시 섹션 스크롤 이동, locale 전환 UI와 GitHub 링크 항상 노출, 모바일에서 nav 축약/접힘
- `docs/specification/02-features.md#Hero` — 헤드라인은 "41개 skill"처럼 tool 공통 수치만 구체적으로 명시하고 agent 개수는 특정 숫자로 명시하지 않음("expert agents" 등 tool-무관 표현), Install/Star on GitHub CTA, CLI 데모 영역
- `docs/specification/02-features.md#Problem / Solution` — before/after 2컬럼, 각 컬럼 최소 3개 항목
- `docs/specification/02-features.md#Feature Grid` — Claude Code 41개 skill/12개 agent, Codex 41개 skill/7개 agent 수치 노출, 각 카드에 보충 설명 포함
- `docs/specification/05-user-flows.md#신규 방문자의 발견-설치 여정` — hero → problem/solution → feature-grid → install-steps 순서로 이어지는 방문자 여정
- `docs/tech-stack.md#src/components/sections/` — section은 서로 의존하지 않으며 각각 `components/ui/`와 `messages/*.json`(useTranslations)에만 의존한다는 dependency 방향
- `docs/design-system/components.md#Section composition (LP)` — `site-header`(wordmark·nav·GitHub star Badge·LocaleSwitcher·Install Button) → `hero`(headline+CTA+CodeBlock+animated Terminal) → `problem-solution`(2-col ✗/✓) → `feature-grid`(4× StatCard + chip)의 정확한 조합 계약
- `docs/design-system/content-voice.md` — "you"로 독자 지칭, sentence case, 이모지/느낌표/과장 금지, skill 이름은 lowercase-mono 그대로(`ywc-plan` 등)

### Summary
이 task는 ohmyclaudecode.com 순서(header → hero → problem/solution → feature)를 따르는 앞부분 section을 구현한다. **spec-validate Critical fix 반영**: Hero 헤드라인은 Claude Code(12개)/Codex(7개)처럼 tool마다 다른 agent 수치를 특정하지 않고 "expert agents" 등 tool-무관 표현을 사용해야 한다 — 이는 Hero와 Feature Grid가 같은 스크롤 내에서 서로 다른 agent 수치를 주장하면 방문자에게 자기모순으로 읽히기 때문이다. Feature Grid는 반대로 Claude Code/Codex의 정확한 수치(각각 41 skill 공통, 12 agent/7 agent 차이)를 분리해 정확히 보여준다. `[locale]/page.tsx`는 이 task에서 4개 section만 조합하는 초기 skeleton으로 시작하고, `000003-030`이 나머지 4개 section을 추가해 최종 8-section 구성을 완성한다.

### Out of Scope (from spec)
- install-steps, social-proof, faq, site-footer section — `000003-030-ui-landing-sections-part2`에서 처리
- Not Found(404) 관련 locale-aware 링크, CSP hash 최종 계산 — `000003-030`에서 처리 (마지막으로 페이지를 완성하는 task의 책임)

## Criticality
`normal` — 사용자 입력을 받지 않는 정적 마케팅 콘텐츠 section 구현

## Dependencies

### Depends On
- `000002-010-config-translation-catalogs` — `hero`/`problemSolution`/`featureGrid`/`nav` 카탈로그 key가 필요
- `000002-020-ui-locale-layout-seo` — `[locale]/layout.tsx`가 제공하는 `NextIntlClientProvider` 컨텍스트가 필요
- `000003-010-ui-primitives-clipboard` — `button.tsx`(CTA), `terminal.tsx`+`code-block.tsx`(hero CLI 데모), `locale-switcher.tsx`+`badge.tsx`(site-header), `stat-card.tsx`(feature-grid)가 필요

### Depended By
- `000003-030-ui-landing-sections-part2` — 동일한 `src/app/[locale]/page.tsx`를 확장(순차 실행 필요, Conflicts With 참고)

## Key Files
- `src/components/sections/site-header.tsx`
- `src/components/sections/hero.tsx`
- `src/components/sections/problem-solution.tsx`
- `src/components/sections/feature-grid.tsx`
- `src/app/[locale]/page.tsx` (초기 skeleton — `000003-030`이 최종 완성)

## Notes
- hero의 CLI 데모는 `terminal.tsx` primitive(`glow` prop으로 amber halo 활성화)를 사용하고, `Terminal.Line`의 caret 깜빡임은 JS 애니메이션 라이브러리 없이 **CSS 기반(compositor-friendly property만 사용)**으로 구현한다 (`06-requirements.md#Performance` — 150kb JS 예산 준수를 위함, `docs/design-system/foundations.md#Motion`).
- `site-header.tsx`의 GitHub star는 `badge.tsx`(`variant="neutral"` 또는 `dot`)로 렌더하며, `04-interfaces.md#GitHub Star 배지`가 명시한 대로 Shields.io 정적 이미지를 감싸는 형태로 구현한다.
- 각 section은 서로 의존하지 않는다 — `problem-solution.tsx`가 `hero.tsx`를 import하는 등의 교차 참조를 만들지 않는다.
- `site-header.tsx`의 nav 링크는 같은 페이지 내 앵커(`#features`, `#install`, `#faq`)로 스크롤 이동하므로, section 컴포넌트의 실제 `id` 속성은 `000003-030`이 나머지 section을 추가할 때까지 일부(`#install`, `#faq`)가 비어있을 수 있다 — 이 task에서는 `#features`(feature-grid)까지만 유효한 앵커로 연결하고 나머지는 `000003-030`이 채운다.
- 모바일 breakpoint(320px)에서 nav가 축약/접히는 구현은 이 task에서 완료한다 (`02-features.md#상단 내비게이션` Notes).

## Parallel Execution Metadata

### Ownership
- `src/components/sections/site-header.tsx`
- `src/components/sections/hero.tsx`
- `src/components/sections/problem-solution.tsx`
- `src/components/sections/feature-grid.tsx`
- `src/app/[locale]/page.tsx` (초기 작성 — `000003-030`이 최종 편집)

### Shared Surfaces
- `src/app/[locale]/page.tsx` — `000003-030`이 이어서 편집하는 동일 파일 (Conflicts With 참고)
- `src/messages/*.json`의 `nav`/`hero`/`problemSolution`/`featureGrid` namespace — `000002-010` 소유 카탈로그를 read-only로 참조

### Conflicts With
- `000003-030-ui-landing-sections-part2` — 둘 다 `src/app/[locale]/page.tsx`를 수정하므로 병렬 실행 불가. `000003-020`이 먼저 완전히 merge된 후 `000003-030`이 시작해야 한다.

### Parallelizable After
- `000002-010-config-translation-catalogs`
- `000002-020-ui-locale-layout-seo`
- `000003-010-ui-primitives-clipboard`

### Task Verify
- `npx tsc --noEmit`
- `npm run build`
- `npm run lint`
- test.md의 Scenario 1~3 수동 확인 (아래 test.md 참고)

## Out of Scope
- install-steps/social-proof/faq/site-footer — `000003-030`
- sitemap/robots, Lighthouse 검증 — Phase 000005
