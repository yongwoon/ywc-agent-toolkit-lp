# 000005-020-test-build-verification — Manual Test Plan

## Preconditions
- [ ] `000005-010-config-sitemap-robots`가 merge되어 있다
- [ ] `npm run build` 산출물을 로컬 정적 서버(`npx serve out` 등)로 서빙할 수 있다
- [ ] Lighthouse(Chrome DevTools 또는 CLI), axe-core(또는 동등 접근성 검사 확장)를 사용할 수 있다

## Test Scenarios

### Scenario 1: 5개 locale + guidebook KO 전체 빌드 성공 확인
**Steps:**
1. `npm run build` 실행

**Expected Result:**
- 빌드가 오류 없이 완료된다
- 산출물에 `/en/`, `/ja/`, `/ko/`, `/zh/`, `/es/`, `/ko/guidebook/*` 페이지가 모두 존재한다
- en.json 대비 다른 locale에서 key가 하나라도 누락되면 빌드가 실패한다 (의도적으로 key 하나를 삭제해 빌드 실패를 재현하는 negative test 권장)

### Scenario 2: 번들 예산 확인
**Steps:**
1. 대표 페이지(`/en/`)의 Lighthouse 리포트에서 JS/CSS 전송 크기(gzip 기준)를 확인한다

**Expected Result:**
- JS 번들 < 150kb (gzip)
- CSS < 30kb (gzip)

### Scenario 3: Core Web Vitals 확인
**Steps:**
1. `/en/`에서 Lighthouse Performance 리포트를 실행한다

**Expected Result:**
- LCP < 2.5s, INP < 200ms(또는 실험실 환경 대체 지표), CLS < 0.1, FCP < 1.5s, TBT < 200ms

### Scenario 4: WCAG 2.2 AA 접근성 확인
**Steps:**
1. axe-core로 `/en/`, `/ko/guidebook/01-introduction`(또는 존재하는 첫 페이지) 자동 검사 실행
2. 키보드만으로 헤더 nav, FAQ 아코디언, locale switcher를 조작해본다
3. `prefers-reduced-motion: reduce` 설정 시 애니메이션이 축소/제거되는지 확인한다

**Expected Result:**
- 심각도 High 이상의 axe 위반이 0건이다
- 키보드만으로 모든 인터랙티브 요소에 접근 가능하다
- reduced-motion 설정 시 CSS 애니메이션이 최소화된다

### Scenario 5: 4개 breakpoint 레이아웃 확인
**Steps:**
1. 320/768/1024/1440px 폭에서 LP 전체와 guidebook 페이지를 스크린샷 비교한다

**Expected Result:**
- 4개 breakpoint 모두에서 overflow, 텍스트 잘림, 겹침이 없다
