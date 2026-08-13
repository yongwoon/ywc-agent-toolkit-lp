# 000026-020-test-llms-build-verification — Manual Test Plan

## Preconditions

- [ ] `000025-010-config-generate-llms-catalog` 및 `000026-010-ui-footer-llms-link`이 merged 상태다.
- [ ] Node dependencies와 Playwright browsers가 설치되어 있다.

## Test Scenarios

### Scenario 1: Exported root artifact

**Steps:**

1. `npm run build`를 실행한다.
2. `out/llms.txt`를 열고 첫 줄과 section headers를 확인한다.

**Expected Result:**

- `out/llms.txt`가 존재한다.
- H1, blockquote count summary, Claude Code/Codex의 Skills/Agents 4개 section, canonical GitHub links가 존재한다.

### Scenario 2: Network fallback

**Steps:**

1. generator의 tree/raw request를 controlled failure로 실행한다.
2. `npm run prebuild`를 실행한다.
3. 실행 전후 `src/data/agent-catalog.json`와 `public/llms.txt`를 비교한다.

**Expected Result:**

- prebuild가 성공한다.
- last committed cache에서 llms output이 재생성된다.
- 빈 catalog가 배포되지 않는다.

### Scenario 3: Five locale footer href

**Steps:**

1. `npm run test:e2e`를 실행한다.
2. 다섯 locale home page의 `Agents` link assertion 결과를 확인한다.

**Expected Result:**

- 모든 locale에서 href가 정확히 `/llms.txt`이다.
