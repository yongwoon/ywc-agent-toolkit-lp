[« 목차로 돌아가기](./README.md)

# 09. Test 작성 및 실행하기

## 언제 이 흐름을 쓰는가

기능 구현이 끝난 뒤 "정말 의도대로 동작하는지" 검증해야 할 때 사용합니다. 검증은 성격이 다른 두 갈래로 나뉩니다 — 자동화된 코드 test 와, 사람이 판단해야 하는 수기 검증입니다.

## 전체 흐름

```
1. test case 작성 → 2. test sheet 실행 (code test + e2e test) → 3. 기대와 다르면 수정 후 재실행
```

| 단계 | 무엇을 하는가 |
|---|---|
| 1. test case 작성 | `ywc-gen-testcase` 로 PR / Task / diff 기반 수기 검증용 testsheet 생성 (개발자 + QA 겸용) |
| 2a. code test | unit / integration test 실행 (project 의 기존 test runner 사용) |
| 2b. e2e test | `ywc-e2e-test-strategy` 로 생성한 flow 실행 — 상세는 [10. E2E Test 자동화 전략](./10-e2e-test-strategy.md) |
| 3. 재실행 | 기대와 맞지 않는 결과는 수정 후 해당 test 만 다시 실행 |

## `ywc-gen-testcase` 실행 예시

**PR 번호로 dev+QA 겸용 testsheet 생성**
```
ywc-gen-testcase 250
```

**현재 diff 기준, QA 전용으로만, 일본어로 생성**
```
ywc-gen-testcase --from-diff --audience qa --lang ja
```

**Task 기반, regression 항목 포함**
```
ywc-gen-testcase 000020-010 --include-regression
```

## 수기 검증 vs 자동화, 무엇을 언제 쓰는가

| 검증 대상 | 방법 |
|---|---|
| Visual/pixel 정확도, 탐색적 UX 판단 | `ywc-gen-testcase` (수기) — 사람의 판단이 꼭 필요한 영역 |
| 1회성 migration, 3rd-party OAuth flow, email/SMS 인증 | `ywc-gen-testcase` (수기) — 매번 자동화하기엔 비용 대비 효과가 낮음 |
| 로그인/로그아웃, 핵심 기능 happy path, 반복적으로 회귀가 발생하는 flow | `ywc-e2e-test-strategy` (자동화) — [10](./10-e2e-test-strategy.md) 참고 |
| 함수/모듈 단위 로직 | project 의 기존 unit/integration test runner |

두 방식은 대체 관계가 아니라 **상호 보완** 관계입니다 — 자동화가 못 잡는 UX 판단은 릴리스 때마다 `ywc-gen-testcase` 로 수동 QA 체크리스트를 보완하세요.

---

[← 이전: 08. 기존 Repo 에 처음 진입하기](./08-onboarding-existing-repo.md) · [다음: 10. E2E Test 자동화 전략 →](./10-e2e-test-strategy.md)
