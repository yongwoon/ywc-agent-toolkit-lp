# 000012-010-ui-guidebook-render-sites-display-number — Implementation Checklist

## Prerequisites
- [ ] `000011-010-refactor-guidebook-nav-remove-order` 완료(merge) 확인 — `LocalizedGuidebookPageMeta`/`displayNumber`가 존재해야 함

## Allowed Edit Scope
- [ ] `README.md`에 선언된 4개 Ownership 파일 내에서만 수정
- [ ] Ownership 밖(예: `search-modal.tsx`) 수정이 필요해 보이면 멈추고 보고 — 명시적으로 Out of Scope

## Stop Conditions
- [ ] `000011-010`이 merge되지 않았거나 `LocalizedGuidebookPageMeta`/`displayNumber`가 존재하지 않으면 멈추고 보고
- [ ] `guidebookNavGroups`의 `title` 문자열에 여전히 숫자 prefix가 남아있으면(즉 `000011-010`이 불완전하면) 멈추고 보고 — 이중 번호 버그 방지
- [ ] 5번째 render site를 새로 발견하면(예: 다른 컴포넌트도 `page.title`을 raw로 렌더링) 멈추고 보고 — spec의 "정확히 4개" 주장이 틀렸을 가능성

## Implementation Steps
- [ ] **`src/components/guidebook/sidebar-nav.tsx` 수정**
  - [ ] `{page.title}` 렌더링 부분을 `${page.displayNumber}. ${page.title}` 형식으로 변경
- [ ] **`src/components/guidebook/prev-next-nav.tsx` 수정**
  - [ ] `NavCard` 컴포넌트의 `{page.title}` 렌더링 부분을 동일 포맷으로 변경
- [ ] **`src/app/[locale]/guidebook/[[...slug]]/page.tsx` 수정**
  - [ ] `pageTitle` 변수 구성 시 `${navPage.displayNumber}. ${navPage.title}` 형식 적용, `<h1>`이 이 값을 사용하도록 확인
  - [ ] `generateMetadata`의 SEO `<title>`(`navPage.title` 사용 부분)은 그대로 유지 — **번호를 빼지 않음**(기존 동작과 동일하게)
- [ ] **`src/components/guidebook/scale-selector.tsx` 수정**
  - [ ] `ScaleSelectorProps.pages` 타입을 `readonly LocalizedGuidebookPageMeta[]`로 변경
  - [ ] `{page.title}` 렌더링 부분을 동일 포맷으로 변경
  - [ ] `page.tsx`에서 `scaleChoicePages`를 넘기는 호출부가 새 타입과 일치하는지 확인(자동으로 일치해야 함 — `nav.flatMap`이 이미 `LocalizedGuidebookPageMeta[]`를 반환하므로)

## Task Verify
- [ ] `npx tsc --noEmit` — 4개 파일 모두 타입 에러 없음
- [ ] `npm run build` 후 `en` locale의 sidebar 정적 HTML에서 `01`부터 `16`까지 순서대로 번호가 표시되는지 확인
- [ ] `04-general-cycle-small`, `05-general-cycle-medium-large`, `06-agentic-autonomous-loop` 페이지의 scale-selector 카드에 번호가 정상 표시되는지 확인(04/05/06에서만 렌더링됨)

## Verification
- [ ] lint 통과 (`npm run lint`)
- [ ] typecheck 통과 (`npm run typecheck`)
- [ ] `npm run build` 통과
- [ ] `npm run test:e2e` 통과(가능한 범위에서 — sidebar/prev-next 렌더링에 영향)
