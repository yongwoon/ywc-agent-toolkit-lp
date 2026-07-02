# 000003-020-ui-landing-sections-part1 — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000002-010-config-translation-catalogs` is completed (merged)
- [ ] `000002-020-ui-locale-layout-seo` is completed (merged)
- [ ] `000003-010-ui-primitives-clipboard` is completed (merged)

## Allowed Edit Scope
- [ ] `src/components/sections/site-header.tsx`, `hero.tsx`, `problem-solution.tsx`, `feature-grid.tsx`, `src/app/[locale]/page.tsx`에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] 선행 task가 merge되지 않았으면 멈춘다
- [ ] Hero 헤드라인 문구가 특정 agent 개수(12개/7개)를 명시하게 되면 멈추고 tool-무관 표현으로 수정한다
- [ ] `000003-030`이 이미 `src/app/[locale]/page.tsx`를 수정 중인 것이 확인되면(다른 in-flight task) 멈추고 조율한다

## Implementation Steps
- [ ] **`site-header.tsx` 구현**
  - [ ] 로고(클릭 시 페이지 최상단 스크롤), nav 링크(Features/Install/FAQ 앵커), `locale-switcher.tsx`, GitHub star 배지(Shields.io 이미지) 배치
  - [ ] 모바일(320px) breakpoint에서 nav 항목을 축약/햄버거 메뉴로 전환
- [ ] **`hero.tsx` 구현**
  - [ ] `useTranslations('hero')`로 headline/subheading 렌더링 — headline에 agent 개수 미포함 확인
  - [ ] Install/Star on GitHub CTA 버튼(`button.tsx` 재사용)
  - [ ] `code-block.tsx`로 CLI 데모 명령 표시, CSS 기반(compositor-friendly property만 사용) 애니메이션 적용
- [ ] **`problem-solution.tsx` 구현**
  - [ ] before/after 2컬럼 레이아웃, 각 컬럼 최소 3개 항목 렌더링 (`useTranslations('problemSolution')`)
- [ ] **`feature-grid.tsx` 구현**
  - [ ] Claude Code(41 skill/12 agent), Codex(41 skill/7 agent) 통계 카드 렌더링, 각 카드에 보충 설명 포함
  - [ ] `id="features"` 앵커 부여 (site-header nav의 Features 링크 대상)
- [ ] **`[locale]/page.tsx` 초기 skeleton 작성**
  - [ ] site-header → hero → problem-solution → feature-grid 순서로 조합
  - [ ] 이후 `000003-030`이 이어서 4개 section을 추가할 수 있도록 명확한 삽입 지점을 남김(주석 등)

## Task Verify
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] test.md Scenario 1~3 수동 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 컴포넌트 unit test suite 미보유, test.md의 수동 시나리오로 대체)
- [ ] integration tests pass (test.md 참고)
- [ ] app builds without error (`npm run build`)
