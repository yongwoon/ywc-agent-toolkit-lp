# 000003-020-ui-landing-sections-part1 — Manual Test Plan

## Preconditions
- [ ] `000002-020-ui-locale-layout-seo`, `000003-010-ui-primitives-clipboard`가 merge되어 있다
- [ ] `npm run build` 후 로컬 정적 서버(`npx serve out` 등)로 산출물을 서빙할 수 있다

## Test Scenarios

### Scenario 1: Hero 헤드라인의 agent 수치 미노출 확인
**Steps:**
1. `/en/` 페이지를 로드한다
2. Hero section의 헤드라인 텍스트를 확인한다

**Expected Result:**
- 헤드라인에 특정 agent 개수(12, 7 등)가 등장하지 않는다 ("expert agents" 등 tool-무관 표현만 사용)
- 헤드라인에 "41 skills"류의 tool 공통 수치는 등장할 수 있다

### Scenario 2: Feature Grid의 tool별 수치 정확성 확인
**Steps:**
1. `/en/` 페이지에서 Feature Grid section(`#features`)까지 스크롤한다
2. Claude Code, Codex 각각의 카드 수치를 확인한다

**Expected Result:**
- Claude Code 카드: 41 skill / 12 agent
- Codex 카드: 41 skill / 7 agent
- Hero의 문구와 Feature Grid의 수치가 서로 모순되지 않는다 (Hero는 특정 수치 미언급, Feature Grid는 정확한 수치 명시)

### Scenario 3: 반응형 nav 및 320px breakpoint 확인
**Steps:**
1. 브라우저 폭을 320px로 조정한다
2. site-header의 nav 항목 표시 방식을 확인한다
3. 폭을 768/1024/1440px로 순차 조정하며 레이아웃 깨짐 여부를 확인한다

**Expected Result:**
- 320px에서 nav 항목이 축약되거나 햄버거 메뉴로 접힌다
- 4개 breakpoint 모두에서 레이아웃 overflow나 텍스트 잘림이 없다

### Scenario 4: nav 앵커 스크롤 이동 확인
**Steps:**
1. site-header의 "Features" nav 항목을 클릭한다

**Expected Result:**
- feature-grid section(`#features`)으로 부드럽게 스크롤 이동한다
