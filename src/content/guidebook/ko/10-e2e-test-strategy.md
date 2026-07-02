[« 목차로 돌아가기](./README.md)

# 10. E2E Test 자동화 전략

## 언제 이 흐름을 쓰는가

프로젝트에 Playwright 기반 E2E test 가 아직 없거나, 있어도 커버리지가 흩어져 있어 "어떤 flow 부터 자동화해야 하는가"가 불명확할 때 `ywc-e2e-test-strategy` 를 사용합니다. 반복적으로 회귀가 발생하는 핵심 flow(로그인, 결제 등)를 최소 비용으로 자동화하는 것이 목표입니다.

## 최초 설정 (`--init`)

```
ywc-e2e-test-strategy --init
```

`playwright.config.*` 가 없으면 자동으로 이 모드에 진입합니다. 진행 순서:

1. Critical flow 3~5개를 먼저 확정합니다 (미확정 시 다음 단계로 진행하지 않음). 기본 후보: 로그인/로그아웃, 핵심 기능 happy path, error state 처리
2. `npx playwright install --with-deps chromium` 실행
3. `baseURL` 은 항상 `process.env.BASE_URL` 참조 — 하드코딩 금지
4. `.github/workflows/e2e.yml` 자동 생성 (기존 workflow 가 있으면 새 파일 대신 job 추가)

## 실행

**Flow 하나씩 추가 생성**
```
ywc-e2e-test-strategy --flow "checkout happy path"
```
entry URL, 순서대로의 action, 기대하는 최종 상태를 명확히 지정할수록 결과 품질이 좋아집니다.

**기존 커버리지 점검**
```
ywc-e2e-test-strategy --audit
```
`playwright.config.*` 가 있고 다른 flag 가 없으면 자동으로 이 모드로 진입합니다. `waitForTimeout` / CSS class selector(`.btn-*`) / `expect()` 없는 test 는 fragile 로 표시되며, priority matrix(revenue impact × failure frequency)로 gap 을 채점해 총점 5 이상만 자동화 대상으로 제안합니다.

**파일 작성 전 계획만 확인**
```
ywc-e2e-test-strategy --dry-run
```

## Flow 선정 기준 (처음 시작하는 5개, ROI 높은 순)

1. Authentication (login/logout)
2. Core feature happy path
3. Form validation + error state
4. Navigation / routing
5. API error handling

5~8개로 시작해 flakiness 를 측정하며 확장하세요. "다 테스트하자"는 유지보수 부담만 키웁니다 — 커버되지 않는 나머지는 [09. Test 작성 및 실행하기](./09-testing-guide.md)의 `ywc-gen-testcase` 로 남겨두는 편이 낫습니다.

## 자동화 대신 수기 검증(`ywc-gen-testcase`)으로 남길 것

Visual/pixel 정확도, 탐색적 UX, 1회성 migration, 3rd-party OAuth flow, email/SMS 인증 — 이 항목들은 자동화 비용 대비 효과가 낮습니다.

## 코드 작성 규칙

- selector 우선순위: `data-testid` > ARIA role > visible text > CSS(최후 수단)
- `waitForTimeout(N)` 금지 — `locator.waitFor()` / `waitForURL()` / `waitForResponse()` 로 대체 (Reconnaissance Before Action: 상태 확인 → 액션 → 결과 확인)
- critical flow 마다 negative case(에러 경로) 최소 1개 포함
- `beforeEach` 로 state 초기화 — test 간 순서 의존성 금지

## CI 설정 핵심

- Chromium only in CI (Safari/Firefox 는 비용 대비 효과 낮음)
- `retries: 2`, `workers: 1` (dev server 공유 시 race condition 방지)
- 실패 시 항상 trace/screenshot artifact 업로드
- Playwright 브라우저 cache (`package-lock.json` 해시 키) — run 마다 ~300MB 재다운로드 방지
- `timeout-minutes: 30` (hung job 이 큐를 막지 않도록)

## 완료 조건 체크리스트

- [ ] `playwright.config.ts` 의 `baseURL` 이 env 참조인지
- [ ] 생성된 spec 마다 `expect()` 최소 1개
- [ ] `waitForTimeout()` 이 없는지
- [ ] GitHub Actions 가 `push(main)` + `pull_request` 양쪽에서 트리거되는지

## 이후 연계

자동화가 못 잡는 UX 판단(디자인 어색함, 문구 오류)은 `ywc-gen-testcase` 로 해당 릴리스의 수동 QA 체크리스트를 보완하세요.

---

[← 이전: 09. Test 작성 및 실행하기](./09-testing-guide.md) · [다음: 11. 디자인 검토 및 개선하기 →](./11-design-review.md)
