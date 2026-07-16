# 000024-010-test-verify-guidebook-auth-implement-build — Implementation Checklist

## Prerequisites
- [ ] `000023-010-refactor-guidebook-renumber-core-pages` 완료
- [ ] `000023-020-config-guidebook-cross-reference-sweep` 완료

## Allowed Edit Scope
- [ ] 파일 수정 없음 — 검증 전용 task
- [ ] 문제가 발견되면 해당 Ownership task로 되돌려 보고하고, 이 task 자체는 수정하지 않는다

## Stop Conditions
- [ ] 어떤 검증 명령이든 실패하면 즉시 멈추고, 실패 원인이 어느 선행 task의 Ownership에 속하는지 명시해 보고한다
- [ ] AC1-AC9 중 하나라도 미충족이면 멈추고 미충족 AC 번호와 근거를 보고한다

## Implementation Steps
- [ ] **빌드/린트/타입체크/콘텐츠 검사 실행**
  - [ ] `npm run build`, `npm run lint`, `npx tsc --noEmit`, `npm run test:content`, `npm run verify:bundle` 순서로 실행하고 각 종료 코드 기록
- [ ] **AC1 — 슬러그 셋 일치**
  - [ ] `node test/check-guidebook-nav-registration.mjs` 통과 확인(위 `npm run build`의 prebuild 단계에 포함되므로 별도 실행은 재확인 목적)
- [ ] **AC2 — 5개 로케일 콘텐츠 완결성**
  - [ ] `src/content/guidebook/{en,ja,ko,zh,es}/18-authentication-implementation.md` 5개 파일 모두 존재, 각 1개의 `<ToolTabs>` 블록과 필수 헤딩 확인
- [ ] **AC3 — 리넘버링 캐스케이드 pairing**
  - [ ] `rg -n "\[1[4-8]\.\s" -g '*.md' src/content/guidebook`와 `rg -n "\]\(\./(13-executor-and-codegen|14-skill-reference|15-prerequisites|17-infrastructure|18-authentication)" -g '*.md' src/content/guidebook` 결과를 대조해 번호/대상 pairing이 스펙 표와 정확히 일치하는지 확인(raw match count가 아니라 pairing 자체를 확인)
- [ ] **AC4 — README TOC/Quick Links**
  - [ ] 5개 로케일 `README.md` 각각에서 bracketed 번호가 `guidebookNavGroups`의 현재 배열 위치와 일치하는지 수동 대조
- [ ] **AC5 — A-Z 테이블 번호 충돌 없음**
  - [ ] `src/content/guidebook/en/14-skill-reference.md`의 A-Z 테이블에서 동일 bracketed 번호를 가진 두 행이 서로 다른 링크 대상을 가리키지 않는지 확인
- [ ] **AC6 — skill-links.ts 라우팅**
  - [ ] `grep -n "ywc-auth-implement" src/lib/skill-links.ts` 결과가 `"18-authentication-implementation"`을 가리키는지 확인
- [ ] **AC8 — 검색 인덱스 미수동편집**
  - [ ] `git diff src/data/guidebook-search.*.json`이 신선한 `npm run build` 재실행 결과와 동일한지 확인(수동 편집 흔적 없음)
- [ ] **AC9 — 신규 페이지 내용이 실제 SKILL.md와 일치**
  - [ ] `docs/ywc-plans/guidebook-auth-implement-page.verification.md`(000021-010 산출물)와 `18-authentication-implementation.md`(en)의 커맨드 예제·플로우 설명을 대조

## Task Verify
- [ ] 위 Implementation Steps의 모든 체크박스가 통과로 표시됨

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 프로젝트에 별도 유닛 테스트 러너 없음)
- [ ] app builds without error (`npm run build`)
