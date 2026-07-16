# 000023-010-refactor-guidebook-renumber-core-pages — Manual Test Plan

## Scenario 1: 리넘버링된 4개 페이지의 사이드바 순서와 번호
**Steps:**
1. `npm run build && npm run start`로 로컬 서버 구동
2. `/en/guidebook/` 사이드바에서 "Managing Cloud Infrastructure"(14) → 신규 페이지(15) → "Executor / Code-gen Prompt patterns"(16) → "Full Skill Reference"(17) → "Prerequisites and installation"(18) 순서 확인

**Expected Result:**
- 사이드바에 표시되는 번호가 순서대로 14/15/16/17/18로 표시됨(컴포넌트가 `guidebookNavGroups` 배열 위치에서 자동 계산하므로, 실제 검증 포인트는 배열 순서 자체가 아니라 마크다운 파일 내 H1/footer 텍스트가 이 번호와 일치하는지임)

## Scenario 2: 각 페이지의 markdown 임베디드 footer 텍스트
**Steps:**
1. GitHub(또는 로컬 파일)에서 `17-infrastructure-and-cloud.md`, `13-executor-and-codegen-patterns.md`, `14-skill-reference.md`, `15-prerequisites-installation.md`를 직접 열어 footer 확인(en 기준, 이후 ja/ko/zh/es 동일 패턴 확인)

**Expected Result:**
- `17-infrastructure-and-cloud.md`: `[Next: 15. <신규 페이지 제목>](./18-authentication-implementation.md)`
- `13-executor-and-codegen-patterns.md`: H1 `# 16. ...`, Next 텍스트 `17. Full Skill Reference`
- `14-skill-reference.md`: H1 `# 17. ...`, Previous `16. ...`, Next `18. ...`
- `15-prerequisites-installation.md`: H1 `# 18. ...`, Previous `17. ...`

## Scenario 3: Full Skill Index (A-Z) 테이블 번호 충돌 없음
**Steps:**
1. `/en/guidebook/14-skill-reference/` 접속, "Full Skill Index (A-Z)" 테이블에서 `ywc-auth-implement`, `ywc-code-gen`, `ywc-parallel-executor`, `ywc-sequential-executor` 행 확인

**Expected Result:**
- `ywc-auth-implement` 행이 `[15]`로 신규 페이지를 가리킴
- 나머지 3행이 `[16]`으로 executor 페이지를 가리킴
- 동일한 대괄호 번호를 가진 두 행이 서로 다른 링크 대상을 가리키는 경우가 없음
