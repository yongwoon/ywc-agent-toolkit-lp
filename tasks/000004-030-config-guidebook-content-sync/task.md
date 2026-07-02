# 000004-030-config-guidebook-content-sync — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000004-010-lib-mdx-content-pipeline` is completed (merged)
- [ ] `000004-020-ui-guidebook-layout` is completed (merged)
- [ ] `develop-with-llm/docs/guides/guidebook/`가 로컬에 접근 가능한 상태인지 확인

## Allowed Edit Scope
- [ ] `src/content/guidebook/**`, 콘텐츠 sync 스크립트 파일에만 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정(예: `guidebook-content.ts` loader 자체의 파싱 로직 변경)이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] 소스 저장소 경로에 접근할 수 없으면(예: CI 환경) 멈추고 fallback 전략(마지막 동기화 스냅샷 사용 등)을 확정한다
- [ ] 소스 README.md의 TOC 구조와 sidebar 데이터가 어긋나면 멈추고 재동기화한다

## Implementation Steps
- [ ] **콘텐츠 디렉터리 확정**
  - [ ] `src/content/guidebook/ko/` 디렉터리 생성, 파일명 규칙(예: `01-introduction.md`)을 소스와 동일하게 유지
- [ ] **sync 스크립트 구현**
  - [ ] `develop-with-llm/docs/guides/guidebook/README.md` + 01–05 markdown 파일을 읽어 `src/content/guidebook/ko/`로 복사하는 스크립트 작성
  - [ ] 소스 경로를 설정 가능하게(상대 경로 또는 env var) 만들고, 접근 불가 시 에러 대신 마지막 동기화 결과를 유지하는 fallback 처리
- [ ] **sidebar TOC 데이터 동기화**
  - [ ] `000004-020`이 만든 sidebar TOC 데이터 구조에 실제 존재하는 페이지(01–05)를 채워 넣고, 아직 없는 06–12는 "작성 중" 표시 또는 목록에서 제외하는 방식으로 처리
  - [ ] 그룹 라벨(Prologue/시작하기/워크플로우 가이드/레퍼런스)과 순서가 소스 README.md와 정확히 일치하는지 대조
- [ ] **빌드 검증**
  - [ ] `npm run build` 실행 후 5개(현재 존재하는) guidebook 페이지가 정적 생성되는지 확인

## Task Verify
- [ ] `npm run build`
- [ ] 수동 대조: sidebar에 노출된 페이지 제목/그룹이 소스 README.md 목차 표와 1:1 대응하는지 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 콘텐츠 동기화 스크립트는 `000005-020`의 빌드 통합 검증으로 흡수)
- [ ] integration tests pass (해당 없음)
- [ ] app builds without error (`npm run build`)
