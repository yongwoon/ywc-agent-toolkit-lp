# 000019-010-refactor-guidebook-renumber-core-pages — Manual Test Plan

## Scenario 1: 라이브 사이트의 Prev/Next 네비게이션은 영향받지 않음
**Steps:**
1. `npm run build && npm run start`로 로컬 서버 구동
2. `/en/guidebook/16-code-structure-and-maintainability/` 접속, 페이지 하단 Prev/Next 카드 확인
3. `/en/guidebook/13-executor-and-codegen-patterns/`, `/en/guidebook/14-skill-reference/`, `/en/guidebook/15-prerequisites-installation/` 각각 접속, Prev/Next 카드 확인

**Expected Result:**
- 4개 페이지 모두 Prev/Next 카드에 표시되는 번호가 이 task 이전과 **동일**하다(라이브 렌더링은 `guidebookNavGroups`의 배열 위치에서 자동 계산되므로, 이 task가 편집하는 markdown 내부 텍스트와 무관하게 이미 올바른 번호를 표시하고 있었어야 함) — 이 task는 markdown 파일 자체의 텍스트만 동기화하는 것이지 라이브 렌더링을 바꾸는 것이 아님을 확인하는 회귀 체크
- 사이드바에서 신규 페이지가 `16-code-structure-and-maintainability` 다음(마지막에서 두 번째... 그룹 마지막)에 정상 표시됨

## Scenario 2: GitHub에서 직접 읽을 때의 markdown 텍스트 정확성
**Steps:**
1. `src/content/guidebook/en/16-code-structure-and-maintainability.md`를 에디터에서 열어 footer의 "Next" 링크 텍스트/href 확인
2. `src/content/guidebook/en/14-skill-reference.md`의 "Full Skill Index (A-Z)" 테이블에서 `ywc-code-gen`, `ywc-infra-design` 행의 Location 컬럼 확인

**Expected Result:**
- `16-code-structure-and-maintainability.md`의 "Next"가 신규 페이지(`17-infrastructure-and-cloud.md`)를 정확한 제목으로 가리킴
- `ywc-code-gen`은 `[15](./13-executor-and-codegen-patterns.md)`, `ywc-infra-design`은 `[14](./17-infrastructure-and-cloud.md)`로 표시되어 서로 다른 번호/대상을 가짐

## Scenario 3: 5개 로케일 구조 파리티
**Steps:**
1. ja/ko/zh/es 각 로케일의 4개 리넘버링 대상 파일을 열어 H1과 footer가 en과 동일한 패턴(숫자만 현지화 규칙에 맞게, 텍스트는 현지어)으로 갱신되었는지 확인

**Expected Result:**
- 5개 로케일 모두 동일한 리넘버링 패턴을 따르며, 어느 로케일도 en만 갱신되고 방치된 상태가 아님
