# 000018-010-ui-guidebook-infra-cloud-page-registration — Manual Test Plan

## Scenario 1: 신규 페이지가 사이드바와 URL에 노출됨
**Steps:**
1. `npm run build && npm run start` (또는 `npm run dev`)로 로컬 서버 구동
2. `/en/guidebook/` 접속, 사이드바의 "Situational guides"(workflow-guides) 그룹에서 마지막 항목으로 신규 페이지가 보이는지 확인
3. `/en/guidebook/17-infrastructure-and-cloud/` 직접 접속

**Expected Result:**
- 신규 페이지가 사이드바의 `16-code-structure-and-maintainability` 바로 다음(그룹 마지막)에 표시됨
- 페이지가 404 없이 정상 렌더링됨

## Scenario 2: 결정 테이블과 4개 ToolTabs 예제 렌더링
**Steps:**
1. 신규 페이지에서 "When to use these Skills" 결정 테이블 확인(4행: design/author/review/optimize)
2. 4개 skill 섹션 각각에서 `<ToolTabs>`의 Claude Code / Codex 탭 전환 확인, 코드 블록 표시 확인

**Expected Result:**
- 결정 테이블이 4개 skill을 모두 나열하고, 각 행의 질문이 서로 구분됨
- 4개 skill 섹션 모두 탭 전환이 정상 동작하고 커맨드 예제가 표시됨(`000017-010` 검증 노트의 실제 문법과 일치)

## Scenario 3: 5개 로케일 렌더링 및 번역 확인
**Steps:**
1. `/ja/guidebook/17-infrastructure-and-cloud/`, `/ko/...`, `/zh/...`, `/es/...` 각각 접속
2. 각 로케일의 prose가 자연스러운 번역인지(기계적 영어 복사가 아닌지) 확인

**Expected Result:**
- 5개 로케일 모두 페이지가 정상 렌더링되고, 각 언어의 자연스러운 표현으로 콘텐츠가 작성되어 있음
- 페이지 렌더링 에러 없음

## Scenario 4: Prev/Next 푸터 링크
**Steps:**
1. 신규 페이지 하단의 markdown 임베디드 footer(`[Previous: ...] - [Next: ...]`) 확인
2. GitHub에서 직접 `.md` 파일을 열었을 때도 동일 footer 텍스트가 보이는지 확인(라이브 사이트의 `prev-next-nav.tsx` 렌더링과는 별개의 GitHub-reading용 텍스트)

**Expected Result:**
- footer가 `Previous: 13. Managing Code Structure and Maintainability` / `Next: 15. Executor / Code-gen Prompt patterns`를 정확히 가리킴(post-insertion 번호 기준)
