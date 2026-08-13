# 000026-010-ui-footer-llms-link — Manual Test Plan

## Preconditions

- [ ] `000025-010-config-generate-llms-catalog` is merged
- [ ] `npm run build`로 `out/llms.txt`가 생성된다.

## Test Scenarios

### Scenario 1: Locale footer root asset link

**Steps:**

1. 각 locale home page(`/en/`, `/ja/`, `/ko/`, `/zh/`, `/es/`)를 연다.
2. Footer의 `Agents` group에서 `llms.txt` link를 확인한다.
3. DOM `href` attribute를 확인한다.

**Expected Result:**

- 다섯 페이지 모두 href가 정확히 `/llms.txt`이다.
- link는 locale prefix를 갖지 않고 새 탭으로 열리지 않는다.

### Scenario 2: Existing footer link regression

**Steps:**

1. Product의 hash/guidebook link와 Resources의 external link를 각각 선택한다.
2. href 및 external link attributes를 확인한다.

**Expected Result:**

- 기존 locale-routable link는 현재 locale 경로로 유지된다.
- 기존 external link는 href, `target="_blank"`, `rel="noreferrer"` 동작을 유지한다.
