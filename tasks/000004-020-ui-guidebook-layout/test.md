# 000004-020-ui-guidebook-layout — Manual Test Plan

## Preconditions
- [ ] `000004-010-lib-mdx-content-pipeline`이 merge되어 있다
- [ ] 최소 1개 이상의 샘플 markdown 콘텐츠가 존재한다 (임시 샘플 또는 `000004-030` 이전 상태의 placeholder)

## Test Scenarios

### Scenario 1: Sidebar 4개 그룹 구조 확인
**Steps:**
1. `/ko/guidebook/` (또는 첫 페이지)로 이동한다
2. Sidebar를 확인한다

**Expected Result:**
- Prologue, 시작하기, 워크플로우 가이드, 레퍼런스 4개 그룹이 순서대로 노출된다
- 그룹 라벨이 develop-with-llm README.md의 표현과 동일하다

### Scenario 2: 2컬럼 레이아웃 및 반응형 확인
**Steps:**
1. 데스크톱 폭(1440px)에서 sidebar와 content area가 나란히 배치되는지 확인한다
2. 320px 폭으로 축소해 sidebar 표시 방식을 확인한다

**Expected Result:**
- 데스크톱에서 좌측 sidebar + 우측 content 2컬럼 레이아웃이 노출된다
- 모바일(320px)에서 sidebar가 토글 가능한 형태로 축소된다

### Scenario 3: Prev/Next 네비게이션 확인
**Steps:**
1. TOC 순서상 중간에 위치한 페이지로 이동한다
2. 페이지 하단의 prev/next 링크를 확인한다

**Expected Result:**
- 이전 페이지, 다음 페이지 링크가 TOC 순서와 일치하게 노출된다
- 첫 페이지에서는 prev 링크가, 마지막 작성된 페이지에서는 next 링크가 적절히 비활성화되거나 숨겨진다

### Scenario 4: catch-all 라우트 동작 확인
**Steps:**
1. 존재하는 slug(예: `/ko/guidebook/01-introduction`)로 접근한다
2. 존재하지 않는 slug로 접근한다

**Expected Result:**
- 존재하는 slug는 해당 markdown 콘텐츠가 렌더링된다
- 존재하지 않는 slug는 사이트의 404 처리로 이어진다 (Phase 000001의 404 메커니즘과 일관됨)
