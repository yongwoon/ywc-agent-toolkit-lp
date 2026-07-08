# 000012-010-ui-guidebook-render-sites-display-number — Manual Test Plan

## Scenario 1: Sidebar 번호 표시
**Steps**
1. `npm run dev` 실행
2. `http://localhost:3000/en/guidebook/`로 접속
3. Sidebar를 육안으로 확인

**Expected Result**
- Sidebar의 각 page 링크가 `01. Introduction`부터 `16. Managing Code Structure and Maintainability`까지 순서대로, 기존과 동일한 zero-padded 2자리 번호로 표시됨

## Scenario 2: Prev/Next 카드 번호 표시
**Steps**
1. 임의의 guidebook page(예: `08-onboarding-existing-repo`)로 이동
2. 페이지 하단의 Previous/Next 카드 확인

**Expected Result**
- Previous 카드에 `07. Starting a new Project`, Next 카드에 `09. Writing and running Tests`가 표시됨(정확한 문구는 실제 title에 맞게 확인)

## Scenario 3: 페이지 `<h1>` 번호 표시
**Steps**
1. 임의의 guidebook page 접속
2. 페이지 상단 `<h1>` 확인

**Expected Result**
- `<h1>`에 `NN. {Title}` 형식으로 번호가 표시됨(sidebar/prev-next와 동일한 번호)

## Scenario 4: Scale-selector 카드 번호 표시
**Steps**
1. `04-general-cycle-small` 페이지로 이동
2. 페이지 내 scale-selector 위젯(04/05/06 세 옵션 카드) 확인

**Expected Result**
- 세 카드 모두 `04. ...`, `05. ...`, `06. ...` 형식으로 번호가 표시됨(이전에는 번호 없이 title만 표시되던 버그가 수정됨)

## Scenario 5: 5개 locale 전체 회귀 확인
**Steps**
1. `ko`/`ja`/`zh`/`es` locale에 대해서도 Scenario 1–4를 반복

**Expected Result**
- 모든 locale에서 번호 표시가 동일하게 정상 동작 (locale별 punctuation 차이 없음 — spec Edge Cases에서 5개 locale 모두 동일한 `"NN. "` ASCII 컨벤션 사용 확인됨)

## Scenario 6: SEO `<title>` 태그 회귀 없음 확인
**Steps**
1. 브라우저 개발자 도구로 임의 페이지의 `<title>` 태그 확인 (또는 `curl`로 정적 HTML의 `<title>` 확인)

**Expected Result**
- SEO `<title>`은 리팩터링 전과 동일하게 번호가 포함된 형태 그대로 — 이 task에서 SEO title의 번호를 제거하지 않았는지 확인
