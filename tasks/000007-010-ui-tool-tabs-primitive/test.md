# 000007-010-ui-tool-tabs-primitive — Manual Test Plan

## Preconditions
- [ ] `000003-010-ui-primitives-clipboard` merged — `code-block.tsx` available
- [ ] 이 task의 `ToolTabs`/`ToolTabs.Panel`/`ToolTabsProvider`를 렌더링할 수 있는 임시 확인 페이지(또는 `npm run dev` + 브라우저 devtools)

## Test Scenarios

### Scenario 1: 탭 클릭 시 페이지 전역 동기화
**Steps:**
1. `ToolTabsProvider`로 감싼 페이지에 `ToolTabs` 인스턴스 2개를 나란히 렌더링
2. 첫 번째 인스턴스에서 "Codex" 탭 헤더 클릭

**Expected Result:**
- 두 인스턴스 모두 Codex 패널로 동시에 전환됨 (`aria-selected` 상태 동기화)
- 페이지 리로드 없이 즉시 반영

### Scenario 2: localStorage 영속화 + 초기 flash 허용
**Steps:**
1. Codex 탭을 선택한 상태에서 브라우저 개발자도구로 `localStorage.getItem('ywc-tool-preference')` 확인
2. 페이지 새로고침

**Expected Result:**
- 1단계에서 값이 `'codex'`로 저장되어 있음
- 새로고침 직후 잠깐(한 프레임~수백ms) Claude Code 패널이 보였다가 Codex로 전환됨(허용된 트레이드오프) — 이후 Codex가 유지됨

### Scenario 3: 키보드 전체 조작
**Steps:**
1. 탭 헤더 중 하나에 Tab 키로 포커스 이동
2. 오른쪽 화살표 → 다음 탭으로 이동+활성화 확인
3. `Home` → 첫 탭으로 이동+활성화 확인
4. `End` → 마지막 탭으로 이동+활성화 확인
5. `Enter`/`Space` → 포커스된 탭 활성화 확인

**Expected Result:**
- 각 단계마다 `document.activeElement`가 해당 탭 버튼과 일치하고 대응 패널이 보임

### Scenario 4: localStorage 차단 환경
**Steps:**
1. 브라우저 프라이버시 모드 또는 devtools에서 `localStorage` 접근을 시뮬레이션으로 차단
2. 탭 클릭

**Expected Result:**
- 콘솔 에러 없이 탭 전환이 정상 동작 (메모리 상태로만 동작, 새로고침 시에는 유지되지 않음)

### Scenario 5: reduced-motion
**Steps:**
1. OS/브라우저 설정에서 `prefers-reduced-motion: reduce` 활성화
2. 탭 전환

**Expected Result:**
- 애니메이션 없이 즉시 전환됨

### Scenario 6: 잘못된 tool 값 (빌드 타임 실패)
**Steps:**
1. 임시로 `<ToolTabs.Panel tool="claudecode" ...>` (오탈자)를 포함한 콘텐츠로 `npm run build` 실행

**Expected Result:**
- 빌드가 명확한 에러 메시지와 함께 실패함 (런타임까지 전파되지 않음)
