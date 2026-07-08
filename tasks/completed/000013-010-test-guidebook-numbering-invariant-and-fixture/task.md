# 000013-010-test-guidebook-numbering-invariant-and-fixture — Implementation Checklist

## Prerequisites
- [ ] `000011-010-refactor-guidebook-nav-remove-order` 완료(merge) 확인
- [ ] `000011-020-refactor-guidebook-slug-discovery-scripts` 완료(merge) 확인
- [ ] `000012-010-ui-guidebook-render-sites-display-number` 완료(merge) 확인

## Allowed Edit Scope
- [ ] `README.md`에 선언된 Ownership 내에서만 수정
- [ ] `guidebook-nav.ts` 편집은 fixture 검증 목적의 일시적 편집만 허용 — task 완료 시점에 반드시 원상복구

## Stop Conditions
- [ ] 세 선행 task 중 하나라도 merge되지 않았으면 멈추고 보고
- [ ] fixture 정리(생성한 6개 파일 + `guidebook-nav.ts`의 임시 entry 제거) 전에 다른 이유로 task를 중단해야 하면, 정리를 완료하기 전에는 task를 "완료"로 보고하지 않음 — fixture 잔존은 이 task 자체가 만들려는 invariant를 위반하는 상태
- [ ] `guidebookNavGroups`의 slug 수가 시작 시점(16)과 다르면(fixture 추가/제거 단계 제외) 멈추고 보고

## Implementation Steps
- [ ] **Invariant 스크립트 작성**
  - [ ] `test/check-guidebook-nav-registration.mjs` 신설 — `guidebookNavGroups`(또는 000011-020이 만든 공유 slug 소스)의 slug 집합과 `src/content/guidebook/en/`의 실제 `.md` 파일(non-content 파일 제외) 집합을 양방향 비교
  - [ ] 불일치 시 orphan slug 이름을 stdout에 출력하고 non-zero exit
  - [ ] `test/check-guidebook-paths.mjs`의 코드 스타일/구조를 참고해 일관성 유지
- [ ] **`package.json` prebuild 연결**
  - [ ] `prebuild` 스크립트 체인(`fetch-github-stars.mjs && generate-search-index.mjs && check-message-keys.mjs`)에 새 invariant 실행을 추가 (순서는 `generate-search-index.mjs` 이후 권장 — 이미 slug 목록이 파생되어 있으므로)
- [ ] **Negative test (invariant가 실제로 orphan을 잡는지 확인)**
  - [ ] `src/content/guidebook/en/`에 `guidebookNavGroups`에 등록되지 않은 임시 파일을 하나 만들고 invariant 스크립트를 단독 실행 — non-zero exit + 파일명 출력 확인
  - [ ] 임시 파일 제거
- [ ] **AC6 fixture 절차**
  - [ ] `src/content/guidebook/{en,ko,ja,zh,es}/fixture-numbering-test.md`를 5개 locale 모두에 생성(숫자 prefix 없는 파일명, 각 locale에 맞는 최소 H1 포함)
  - [ ] `guidebookNavGroups`에 `fixture-numbering-test` slug를 가진 entry를 임시로 추가(적절한 groupId 지정)
  - [ ] `npm run build` 실행 — 성공 확인
  - [ ] 5개 `src/data/guidebook-search.<locale>.json` 모두에서 fixture slug가 포함되어 있는지 확인(`jq 'length'`가 `17`)
  - [ ] fixture의 정적 HTML 출력이 build output 디렉터리에 존재하는지 확인
  - [ ] sidebar에 fixture 페이지가 올바른 `displayNumber`와 함께 표시되는지 확인
  - [ ] **fixture 6개 파일 + `guidebookNavGroups`의 임시 entry를 전부 제거** — 제거 후 `jq 'length'`가 다시 `16`으로 복귀하는지 확인
- [ ] **(Suggestion, A9) FR-2 mechanical check**
  - [ ] `grep -n "title: \"[0-9]" src/components/guidebook/guidebook-nav.ts`가 매치 없음을 확인하는 체크를 invariant 스크립트 또는 AC1 검증 절차에 추가(선택 사항)

## Task Verify
- [ ] `node test/check-guidebook-nav-registration.mjs` — exit 0
- [ ] Negative test 통과(위 Implementation Steps 참고)
- [ ] AC6 fixture 절차 전체 통과, fixture 정리 완료 확인(최종 diff에 fixture 관련 변경 없음)

## Verification
- [ ] lint 통과 (`npm run lint`)
- [ ] typecheck 통과 (`npm run typecheck`)
- [ ] `npm run build` 전체 통과 (새 invariant 포함된 prebuild 체인)
- [ ] `npm run test:content` 통과
- [ ] `git status`로 fixture 관련 파일이 최종 커밋에 남아있지 않은지 확인
