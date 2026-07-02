# 000003-010-ui-primitives-clipboard

## Purpose
`docs/design-system/components.md`가 정의하는 7개 design-system primitive(Button, Badge, CodeBlock, Terminal, StatCard, FaqItem, LocaleSwitcher)를 `src/components/ui/`에 구현한다. Phase 000003의 모든 section 컴포넌트(`-020`/`-030`)가 이 primitive들을 조합해 만들어진다.

## Scope
- `src/components/ui/button.tsx` — `variant`: primary(amber fill)/secondary(raised surface)/outline(hairline)/ghost(text), `size`: sm/md/lg, `href` 지정 시 `<a>` 렌더
- `src/components/ui/badge.tsx` — `variant`: neutral/amber/cyan/pass/fail/agent, 상태 dot(glow) 옵션 — GitHub star 배지, "merged"/"read-only" 등 lane/state 표시에 사용
- `src/components/ui/code-block.tsx` — Clipboard API 기반 복사 버튼(COPY), `prompt`(기본 `$`, slash-command는 `/`), `label`(대문자 caption bar), 복사 실패 시 수동 선택 fallback 포함
- `src/components/ui/terminal.tsx` — CLI transcript window-chrome, `Terminal.Line` 서브컴포넌트(`type`: prompt/output/comment/success/error/info), 마지막 줄 `caret` 깜빡임, hero의 애니메이션 데모에 사용
- `src/components/ui/stat-card.tsx` — feature-grid의 통계 타일, `lane`: claude(amber)/codex(cyan) accent, hover 시 2px lift + lane border 노출
- `src/components/ui/faq-item.tsx` — 아코디언 행, `grid-template-rows` 높이 애니메이션(compositor-friendly), `+`→`×` glyph 토글, 열림 상태 amber 좌측 rule
- `src/components/ui/locale-switcher.tsx` — 현재 locale을 읽어 다른 locale의 동일 페이지로 이동하는 드롭다운(native language name 표시), 현재 hash(섹션 위치) 유지

## Spec Reference

### Primary Sources
- `docs/specification/04-interfaces.md#Clipboard API` — 복사 버튼 클릭 시 브라우저 Clipboard API를 호출하고, 비보안 컨텍스트·권한 거부·미지원 브라우저 등으로 실패해도 명령 텍스트가 계속 선택 가능한 상태로 남아야 한다는 요구사항
- `docs/specification/02-features.md#Install Steps` — 각 명령 블록에 복사 버튼이 있어 클릭 한 번으로 클립보드에 복사되어야 하고, 복사 실패 시에도 수동 복사가 가능해야 한다는 acceptance criteria
- `docs/specification/02-features.md#Locale 전환` — locale 전환 UI에서 5개 언어 중 하나를 선택할 수 있어야 하고, 전환 후에도 현재 보고 있던 섹션 위치가 유지되어야 한다는 acceptance criteria
- `docs/tech-stack.md#src/components/ui/` — `code-block.tsx`가 `hero.tsx`(CLI 데모)와 `install-steps.tsx`(설치 명령) 양쪽에서 재사용되어 복사-to-클립보드 로직 중복을 피한다는 설계 근거
- `docs/design-system/components.md` — 7개 primitive 각각의 정확한 prop 계약과 사용 예시(Button/Badge/CodeBlock/Terminal/StatCard/FaqItem/LocaleSwitcher)
- `docs/design-system/design-tokens.css`, `docs/design-system/tailwind-theme.css`(참고용, `tailwind.config.ts`에 이식됨 — `000001-010` 참고) — 각 primitive가 참조할 색상/radius/spacing 토큰

### Summary
`code-block.tsx`는 복사 버튼 클릭 시 `navigator.clipboard.writeText()`를 시도하고, 실패(비보안 컨텍스트, 권한 거부, API 미지원)하면 예외를 삼키지 않고 명령 텍스트를 담은 `<pre>`/`<code>` 요소가 계속 육안으로 선택 가능한 상태로 남도록 한다 — 즉 복사 실패가 방문자의 설치 흐름을 막지 않는다(`docs/design-system/components.md`도 이 fallback을 CodeBlock의 필수 계약으로 명시). `locale-switcher.tsx`는 `next-intl`의 `usePathname`/`useRouter`(navigation.ts에서 export)를 사용해 현재 경로의 locale segment만 교체하고, 현재 URL의 hash(예: `#install`)를 유지한 채 이동해 방문자가 보고 있던 섹션 위치가 유지되도록 한다. 나머지 4개 primitive(Badge/Terminal/StatCard/FaqItem)는 `components.md`의 prop 계약을 그대로 따르되 색상/spacing은 반드시 `tailwind.config.ts`에 이식된 semantic token(예: `bg-accent`, `text-lane-codex`)을 통해서만 참조하고 raw hex 값을 하드코딩하지 않는다.

### Out of Scope (from spec)
- 실제 section 레이아웃(hero, install-steps 자체의 배치/카피) — Phase 000003의 `-020`/`-030` task에서 처리, 이 task는 primitive만 구현

## Criticality
`normal` — 사용자 입력을 서버로 전송하지 않는 클라이언트 전용 UI primitive (Clipboard API는 브라우저 로컬 동작)

## Dependencies

### Depends On
- `000001-010-lib-nextjs-i18n-setup` — Tailwind 설정, `src/i18n/navigation.ts`(locale-switcher가 사용)가 필요

### Depended By
- `000003-020-ui-landing-sections-part1` — `hero.tsx`가 `terminal.tsx`(CLI 데모)와 `code-block.tsx`, `button.tsx`(CTA)를, `site-header.tsx`가 `locale-switcher.tsx`와 `badge.tsx`(GitHub star)를, `feature-grid.tsx`가 `stat-card.tsx`를 사용
- `000003-030-ui-landing-sections-part2` — `install-steps.tsx`가 `code-block.tsx`를, `faq.tsx`가 `faq-item.tsx`를 사용

## Key Files
- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/code-block.tsx`
- `src/components/ui/terminal.tsx`
- `src/components/ui/stat-card.tsx`
- `src/components/ui/faq-item.tsx`
- `src/components/ui/locale-switcher.tsx`

## Notes
- `code-block.tsx`의 Clipboard API 호출은 `'use client'` 경계가 필요하다 — 이 컴포넌트만 클라이언트 컴포넌트로 분리하고, 이를 사용하는 `hero.tsx`/`install-steps.tsx`의 나머지 부분은 서버 컴포넌트로 유지할 수 있도록 최소 클라이언트 경계로 설계한다 (`06-requirements.md#Performance`의 번들 최소화 요구사항 반영).
- `locale-switcher.tsx`는 hash 유지 로직을 `window.location.hash`를 읽어 대상 locale URL에 그대로 append하는 방식으로 구현한다.
- 접근성: 복사 버튼은 클릭 후 "Copied" 상태를 스크린리더에도 전달할 수 있도록 `aria-live` 영역 또는 동등한 처리를 고려한다 (`06-requirements.md#Accessibility` WCAG 2.2 AA 참고).
- `terminal.tsx`의 caret 깜빡임과 `faq-item.tsx`의 열림/닫힘 애니메이션은 `transform`/`opacity`/`grid-template-rows`만 사용하는 compositor-friendly 방식이어야 하며, 반드시 `@media (prefers-reduced-motion: no-preference)`로 감싼다 — reduced-motion 환경에서는 애니메이션 없이 최종 상태(열린 FAQ 콘텐츠, 정적 caret)가 바로 보여야 한다 (`docs/design-system/foundations.md#Motion`).
- 아이콘/글리프는 `docs/design-system/foundations.md#Iconography`가 정의하는 typographic/stroke glyph만 사용한다 — 이모지 금지. `faq-item.tsx`의 토글은 `+`/`×` 문자, `code-block.tsx`의 prompt는 amber `$`/`/` 문자(non-selectable)로 구현한다.

## Parallel Execution Metadata

### Ownership
- `src/components/ui/**`

### Shared Surfaces
- `(None identified)` — 이 task가 신규로 만드는 primitive는 이후 task가 import만 하며 파일을 직접 수정하지 않음

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000001-010-lib-nextjs-i18n-setup`

### Task Verify
- `npx tsc --noEmit`
- `npm run lint`
- 수동 확인: 브라우저(또는 Storybook 부재 시 임시 페이지)에서 code-block 복사 버튼 클릭 시 클립보드에 텍스트가 기록되는지, Clipboard API를 비활성화한 상태(예: 비보안 컨텍스트 시뮬레이션)에서도 텍스트가 선택 가능한지 확인

## Out of Scope
- section 레이아웃과 카피 — Phase 000003의 `-020`/`-030`
- SEO, locale routing 설정 — Phase 000001/000002
