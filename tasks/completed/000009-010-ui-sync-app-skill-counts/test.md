# 000009-010-ui-sync-app-skill-counts — Manual Test Plan

## Scenario 1: (수렴 시) Hero와 Feature Grid 숫자 일치
**Steps:**
1. `npm run build && npm run start` (또는 `npm run dev`)로 로컬 서버 구동
2. `/en/` 접속, hero headline과 `SectionEyebrow`의 skill 개수 확인
3. `#features` 섹션까지 스크롤, Feature Grid 카테고리 타일 6개(기존) + 신규 "Toolkit & Setup" 타일 1개 = 7개 확인
4. Feature Grid 섹션 제목("Seven categories...")과 실제 타일 개수 일치 확인

**Expected Result:**
- Hero의 skill 개수와 Feature Grid 카테고리 값 합산이 서로 일치
- Feature Grid 제목의 "Seven categories" 문구와 실제 렌더링된 타일 개수(7)가 일치

## Scenario 2: (발산 시) Hero가 tool-specific 숫자를 노출하지 않음
**Steps:**
1. `/en/` 접속, hero 영역의 Claude Code/Codex 탭 각각 확인
2. hero headline, `SectionEyebrow`, 두 Terminal 데모 성공 라인 텍스트 확인

**Expected Result:**
- 어떤 hero 문자열도 특정 tool에 대해 틀린 숫자를 노출하지 않음 (tool-agnostic 문구)
- Feature Grid 섹션은 카테고리 산술 편집이 수행되지 않은 상태(신규 카테고리 미추가)로 유지되며, blocking 보고가 존재함

## Scenario 3: 5개 로케일 렌더링 확인
**Steps:**
1. `/ja/`, `/ko/`, `/zh/`, `/es/` 각각 접속
2. hero와 Feature Grid의 숫자/문구가 자연스러운 현지어로 표시되는지 확인

**Expected Result:**
- 5개 로케일 모두 동일한 숫자를 반영하며, 기계적 직역이 아닌 각 언어의 기존 표현 스타일 유지
- 페이지 렌더링 에러 없음 (`check-message-keys.mjs` 통과 결과와 일치)
