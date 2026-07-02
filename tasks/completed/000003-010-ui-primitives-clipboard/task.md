# 000003-010-ui-primitives-clipboard — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000001-010-lib-nextjs-i18n-setup` is completed (merged) — Tailwind, `src/i18n/navigation.ts` 존재

## Allowed Edit Scope
- [ ] `src/components/ui/**`에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] `src/i18n/navigation.ts`가 아직 존재하지 않으면 멈춘다
- [ ] Clipboard API 실패 시나리오를 처리하다 예외가 상위로 전파되어 페이지 전체가 깨지는 상황이 발생하면 멈추고 fallback 로직을 재검토한다

## Implementation Steps
- [ ] **`button.tsx` 구현** (`docs/design-system/components.md#Button`)
  - [ ] `variant`: `primary`(amber fill) / `secondary`(raised surface) / `outline`(hairline) / `ghost`(text), `size`: `sm|md|lg` 지원
  - [ ] `href` prop 지정 시 `<a>`로 렌더, 미지정 시 `<button>`. `icon`/`iconRight`/`block`/`disabled` prop 지원
  - [ ] hover: 1px lift(+ primary는 amber glow `--glow-accent`), press: `scale(0.98)`. font는 `font-mono`, radius는 `rounded-sm`, 높이는 `--control-h*` 토큰
- [ ] **`badge.tsx` 구현** (`docs/design-system/components.md#Badge`)
  - [ ] `variant`: `neutral|amber|cyan|pass|fail|agent`, `dot` prop으로 glow 상태 인디케이터 추가
  - [ ] `pill` radius(`rounded-full` 또는 `--radius-pill`), `text-label` 크기의 mono 텍스트
- [ ] **`code-block.tsx` 구현** (`docs/design-system/components.md#CodeBlock`)
  - [ ] `'use client'` 선언, `code`/`prompt`(기본 `$`, slash-command는 `/`)/`label`(대문자 caption bar)/`multiline` prop 지원
  - [ ] prompt 글리프는 amber 색상 + `user-select: none`(복사된 텍스트에 프롬프트가 섞이지 않도록)
  - [ ] 복사 버튼 클릭 핸들러에서 `navigator.clipboard?.writeText(text)`를 시도하고 성공 시 "Copied" 상태를 잠시 표시
  - [ ] 실패(reject 또는 API 부재) 시 catch하여 조용히 무시하고, 명령 텍스트 요소의 `user-select`가 항상 `text`(선택 가능)로 유지되도록 보장
- [ ] **`terminal.tsx` 구현** (`docs/design-system/components.md#Terminal`)
  - [ ] `title`/`glow`(hero 전용 amber halo) prop, traffic-light dots + 중앙 정렬 mono title의 title bar, radius `--radius-lg`
  - [ ] `Terminal.Line` 서브컴포넌트 — `type`: `prompt|output|comment|success|error|info`별 색상(prompt/caret는 amber, success는 `--state-pass`, error는 `--state-fail`), 마지막 줄 `caret` prop으로 깜빡이는 block cursor
- [ ] **`stat-card.tsx` 구현** (`docs/design-system/components.md#StatCard`)
  - [ ] `value`/`unit`/`label`/`description`/`eyebrow`/`lane`(`claude`=amber, `codex`=cyan) prop 지원
  - [ ] 큰 display 숫자(`value`+`unit`), hover 시 2px lift + lane accent border 노출
- [ ] **`faq-item.tsx` 구현** (`docs/design-system/components.md#FaqItem`)
  - [ ] `question`/`defaultOpen`(uncontrolled) 또는 `open`+`onToggle`(controlled, 단일-오픈 아코디언용) prop 지원
  - [ ] 열림/닫힘 전환은 `grid-template-rows`(compositor-friendly) 애니메이션, `+`→`×` 회전 glyph 토글, 열림 시 amber 좌측 rule
- [ ] **`locale-switcher.tsx` 구현** (`docs/design-system/components.md#LocaleSwitcher`)
  - [ ] `src/i18n/navigation.ts`의 `usePathname`/`useRouter` 사용, 현재 locale을 표시하고 5개 locale을 **native language name**(English/日本語/한국어/中文/Español)으로 드롭다운에 노출
  - [ ] 선택 시 현재 pathname의 locale segment만 교체하고 `window.location.hash`를 유지한 채 이동, 바깥 클릭 시 드롭다운 닫힘, 활성 locale은 amber-tint 표시

## Task Verify
- [ ] `npx tsc --noEmit`
- [ ] `npm run lint`
- [ ] 수동 확인: 임시 렌더링(개발 서버 또는 Storybook 부재 시 `[locale]/page.tsx`에 임시로 마운트)에서 복사 버튼 동작과 locale-switcher 동작을 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 이 프로젝트는 별도 컴포넌트 unit test suite를 두지 않음, Phase 000005의 빌드/Lighthouse 검증으로 흡수)
- [ ] integration tests pass (해당 없음)
- [ ] app builds without error (`npm run build`)
