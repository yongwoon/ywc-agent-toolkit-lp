# 000015-010-ui-sync-skill-agent-counts — Manual Test Plan

## Scenario 1: (FR-4a, 수렴 시) Hero와 Feature Grid 숫자 일치
**Steps:**
1. `npm run build && npm run start` (또는 `npm run dev`)로 로컬 서버 구동
2. `/en/` 접속, hero headline과 `SectionEyebrow`의 skill 개수 확인
3. `#features` 섹션까지 스크롤, Feature Grid 카테고리 타일 7개(기존) + 신규 "Infrastructure & Cloud" 타일 1개 = 8개 확인
4. Feature Grid 섹션 제목("Eight categories...")과 실제 타일 개수 일치 확인

**Expected Result:**
- Hero의 skill 개수와 Feature Grid 카테고리 값 합산이 서로 일치
- Feature Grid 제목의 "Eight categories" 문구와 실제 렌더링된 타일 개수(8)가 일치
- 신규 "Infrastructure & Cloud" 타일의 lane이 `codex`로 표시되어 4/4 균형을 이룸

## Scenario 2: (FR-4b, 발산 시) Feature Grid 숫자 편집이 수행되지 않음
**Steps:**
1. `/en/` 접속, hero 영역 확인
2. `#features` 섹션까지 스크롤, 타일 개수가 기존 7개 그대로인지 확인
3. task 실행 보고에서 "Feature Grid skill-count divergence unresolved — human decision required" blocking 문구 확인

**Expected Result:**
- Feature Grid 섹션은 카테고리 산술 편집이 수행되지 않은 상태(신규 카테고리 미추가, 타이틀 "Seven categories..." 그대로 유지)
- 어떤 hero/Feature Grid 문자열도 특정 tool에 대해 틀린 숫자를 노출하지 않음
- blocking 보고가 명시적으로 존재

## Scenario 3: 5개 로케일 렌더링 확인
**Steps:**
1. `/ja/`, `/ko/`, `/zh/`, `/es/` 각각 접속
2. hero와 Feature Grid의 숫자/문구가 자연스러운 현지어로 표시되는지 확인

**Expected Result:**
- 5개 로케일 모두 동일한 숫자를 반영하며, 기계적 직역이 아닌 각 언어의 기존 표현 스타일 유지
- 페이지 렌더링 에러 없음 (`check-message-keys.mjs` 통과 결과와 일치)
