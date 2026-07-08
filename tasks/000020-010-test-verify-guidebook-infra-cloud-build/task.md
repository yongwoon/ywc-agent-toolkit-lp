# 000020-010-test-verify-guidebook-infra-cloud-build — Implementation Checklist

## Prerequisites
- [ ] `000019-010-refactor-guidebook-renumber-core-pages` 완료
- [ ] `000019-020-config-guidebook-cross-reference-sweep` 완료

## Allowed Edit Scope
- [ ] 이 task는 어떤 파일도 편집하지 않는다 — 검증 실패 시 해당 파일을 소유한 task를 재오픈해 보고한다

## Stop Conditions
- [ ] `000019-010` 또는 `000019-020`이 미완료 상태이면 시작하지 않는다

## Implementation Steps
- [ ] **전체 빌드 실행**
  - [ ] `npm run build` 실행 — 에러 없이 완료되는지 확인
- [ ] **린트/타입체크**
  - [ ] `npm run lint` 실행
  - [ ] `npx tsc --noEmit` 실행
- [ ] **콘텐츠/번들 검증**
  - [ ] `npm run test:content` 실행
  - [ ] `npm run verify:bundle` 실행
- [ ] **전체 grep 스윕 (A1 pairing, 저장소 전체 범위)**
  - [ ] `rg -n "\[1[3-6]\.\s" src/content/guidebook/**/*.md` 실행, 5개 pairing만 존재하는지 확인
  - [ ] `rg -n "\]\(\./1[3-6]-(code-structure|executor-and-codegen|skill-reference|prerequisites)" src/content/guidebook/**/*.md` 실행, 동일하게 확인
  - [ ] 불일치 발견 시 해당 파일을 소유한 task(`000019-010` 또는 `000019-020`)를 재오픈 대상으로 보고
- [ ] **AC1/AC2 최종 확인**
  - [ ] `node test/check-guidebook-nav-registration.mjs` — slug 셋 일치(A4 narrowed scope)
  - [ ] 5개 로케일 `17-infrastructure-and-cloud.md`에 각각 4개 `<ToolTabs>` 블록 존재 확인
- [ ] **AC4 최종 확인**
  - [ ] 5개 로케일 `README.md`의 TOC/Quick Links 테이블 및 line 40 부근 prose가 모두 bump되었는지 확인
- [ ] **AC5 최종 확인 (amended, A2)**
  - [ ] `14-skill-reference.md`(5개 로케일) A-Z 테이블에서 `[14]`와 `[15]`로 표시된 행들의 대상이 서로 일관되는지 확인(동일 번호 = 동일 대상)
- [ ] **AC6 최종 확인**
  - [ ] `skill-links.ts`의 4개 신규 엔트리가 모두 `17-infrastructure-and-cloud`를 가리키는지 확인
- [ ] **AC8 확인 (검색 인덱스 부산물)**
  - [ ] `src/data/guidebook-search.*.json`의 git diff가 `npm run build`의 자동 재생성 결과와 일치하는지 확인(수동 편집 흔적 없어야 함)
- [ ] **anchor collision 확인 (NFR, A6)**
  - [ ] 신규 페이지 5개 로케일의 heading 목록을 육안으로 검토, 동일 텍스트의 heading 중복 없음 확인

## Task Verify
- [ ] `npm run build` exit code 0
- [ ] `npm run lint` exit code 0
- [ ] `npx tsc --noEmit` exit code 0
- [ ] `npm run test:content` exit code 0
- [ ] `npm run verify:bundle` exit code 0
- [ ] grep 스윕(2개 명령) 모두에서 stale pairing 없음
- [ ] AC1-AC8(amended 포함) 전부 충족

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠 배치)
- [ ] app builds without error (`npm run build`)
