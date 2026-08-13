# 000027-020-ui-changelog-section — Manual Test Plan

## Preconditions

- [ ] `000027-010-config-generate-toolkit-changelog` is merged
- [ ] `src/data/toolkit-changelog.json`에 최소 1개 entry가 있다.

## Test Scenarios

### Scenario 1: All locale rendering

**Steps:**

1. 각 `/en/`, `/ja/`, `/ko/`, `/zh/`, `/es/` landing page를 static export 또는 local server에서 연다.
2. Social Proof와 FAQ 사이에서 Recent updates section을 찾는다.

**Expected Result:**

- 모든 locale에서 section chrome이 해당 locale로 표시된다.
- 각 entry의 version, date, highlight가 표시되고 English-only upstream prose가 보존된다.

### Scenario 2: External links and keyboard access

**Steps:**

1. version link와 Full history on GitHub link를 Tab으로 이동한다.
2. 각 link의 href를 확인하고 activation을 시도한다.

**Expected Result:**

- version link는 해당 CHANGELOG heading anchor, closing link는 unanchored CHANGELOG URL이다.
- focus indicator가 보이고 link activation이 GitHub로 이동한다.

### Scenario 3: Responsive layout

**Steps:**

1. viewport를 320, 768, 1024, 1440px로 바꾼다.
2. 긴 highlight가 있는 entry를 확인한다.

**Expected Result:**

- 가로 overflow나 겹침 없이 card list가 읽힌다.
- highlight는 명세의 고정 길이 budget에 맞춰 표시된다.
