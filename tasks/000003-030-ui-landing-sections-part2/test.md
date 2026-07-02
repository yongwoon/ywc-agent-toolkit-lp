# 000003-030-ui-landing-sections-part2 — Manual Test Plan

## Preconditions
- [ ] `000003-020-ui-landing-sections-part1`이 merge되어 있다
- [ ] `npm run build` 후 로컬 정적 서버로 산출물을 서빙할 수 있다

## Test Scenarios

### Scenario 1: 8-section 최종 순서 확인
**Steps:**
1. `/en/` 페이지를 처음부터 끝까지 스크롤한다

**Expected Result:**
- site-header → hero → problem-solution → feature-grid → install-steps → social-proof → faq → site-footer 순서로 노출된다

### Scenario 2: install-steps 복사 및 두 경로 확인
**Steps:**
1. install-steps section에서 마켓플레이스 설치 명령의 복사 버튼을 클릭한다
2. Codex 플러그인 설치 명령의 복사 버튼을 클릭한다

**Expected Result:**
- 두 경로 모두 명령이 클립보드에 복사된다 (또는 실패 시에도 텍스트가 선택 가능한 상태로 남는다)
- README.md의 bash script fallback(git/bash/jq 요구) 관련 언급이 없다

### Scenario 3: FAQ 아코디언 키보드 접근성 확인
**Steps:**
1. Tab 키로 FAQ section까지 포커스를 이동한다
2. Enter/Space로 첫 번째 질문을 펼친다

**Expected Result:**
- 키보드만으로 아코디언을 펼치고 닫을 수 있다
- 최소 5개 질문이 존재하며 "이게 무엇인가요", "설치 요구사항", "비용/토큰 영향" 질문이 포함되어 있다

### Scenario 4: Social Proof 빈 상태 처리 확인
**Steps:**
1. 카탈로그의 `socialProof.quotes`가 빈 배열인 상태에서 페이지를 로드한다

**Expected Result:**
- 섹션이 아예 렌더링되지 않거나 "Coming soon" 상태로만 표시되며, 빈 카드/깨진 레이아웃이 노출되지 않는다

### Scenario 5: CSP 적용 및 콘솔 오류 확인
**Steps:**
1. 브라우저 개발자 도구 콘솔을 열고 `/en/` 페이지를 로드한다

**Expected Result:**
- "Refused to execute inline script" 등 CSP 위반 오류가 콘솔에 나타나지 않는다
- 페이지의 hydration이 정상적으로 완료된다 (예: locale-switcher, FAQ 아코디언이 클릭 가능한 상태)

### Scenario 6: 404 페이지 locale 링크 확인
**Steps:**
1. 존재하지 않는 경로(예: `/fr/`)로 접근한다

**Expected Result:**
- 정적 404 페이지가 en 문구로 노출된다
- en/ja/ko/zh/es 5개 locale 홈으로 돌아가는 링크가 모두 존재하고 정상 동작한다

### Scenario 7: 4개 breakpoint 레이아웃 확인
**Steps:**
1. 320/768/1024/1440px 폭에서 install-steps, social-proof, faq, site-footer를 확인한다

**Expected Result:**
- 4개 breakpoint 모두에서 overflow, 텍스트 잘림, 겹침이 없다
