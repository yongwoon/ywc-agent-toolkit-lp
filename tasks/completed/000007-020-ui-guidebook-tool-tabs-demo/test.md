# 000007-020-ui-guidebook-tool-tabs-demo — Manual Test Plan

## Preconditions
- [ ] `000007-010`, `000004-020`, `000004-030` 모두 merge됨
- [ ] `npm run build` 또는 `npm run dev` 가능한 로컬 환경

## Test Scenarios

### Scenario 1: 실제 가이드북 페이지에서 ToolTabs 렌더링
**Steps:**
1. `npm run dev` 실행 후 `/ko/guidebook/03-quickstart` 접속
2. "Step 1 — 계획 세우기" 섹션 확인

**Expected Result:**
- 기존 단일 코드블록 대신 "Claude Code"/"Codex" 탭 헤더와 패널이 보임
- Claude Code 패널에는 기존 `ywc-plan ...` 커맨드가 그대로 보임
- Codex 패널에는 "예시" 표시가 있는 placeholder 커맨드가 보임

### Scenario 2: 정적 빌드 산출물에 두 패널 모두 포함
**Steps:**
1. `npm run build` 실행
2. 생성된 `/ko/guidebook/03-quickstart` 정적 HTML을 열어 소스 확인 (또는 `out/`의 해당 HTML 파일 직접 열람)

**Expected Result:**
- 빌드가 에러 없이 완료됨
- 생성된 HTML에 Claude Code/Codex 두 패널의 콘텐츠와 탭 헤더 마크업이 모두 존재함(어느 탭이 초기 활성인지와 무관하게)

### Scenario 3: 페이지 내 탭 전환 동작
**Steps:**
1. `/ko/guidebook/03-quickstart`에서 "Codex" 탭 클릭

**Expected Result:**
- Codex 패널로 전환되고, 페이지 내 다른 곳에 `ToolTabs`가 더 있다면(이번 데모는 1개 블록이므로 해당 없음) 함께 전환됨
- 페이지 새로고침 없이 즉시 반영

### Scenario 4: 다른 페이지 이동 후 상태 유지
**Steps:**
1. Codex 탭 선택 후 사이드바에서 다른 가이드북 페이지로 이동
2. 다시 `/ko/guidebook/03-quickstart`로 복귀

**Expected Result:**
- Codex 선택이 유지됨 (약간의 초기 flash는 허용)
