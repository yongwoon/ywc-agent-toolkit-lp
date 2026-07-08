# 000016-010-test-verify-full-build — Implementation Checklist

## Prerequisites
- [ ] `000015-010-ui-sync-skill-agent-counts` 완료

## Allowed Edit Scope
- [ ] 이 task는 어떤 파일도 편집하지 않는다 — 검증 실패 시 `000015-010`을 재오픈해 보고한다

## Stop Conditions
- [ ] `000015-010`이 미완료 상태이면 시작하지 않는다

## Implementation Steps
- [ ] **전체 빌드 실행**
  - [ ] `npm run build` 실행 (prebuild: `fetch-github-stars.mjs` → `generate-search-index.mjs` → `check-message-keys.mjs`; postbuild: `generate-sitemap.mjs` → `strip-landing-next-runtime.mjs` → `inject-csp.mjs`) — 에러 없이 완료되는지 확인
- [ ] **번들 예산 검증**
  - [ ] `npm run verify:bundle` 실행
- [ ] **가이드북 경로 검증**
  - [ ] `npm run test:content` 실행
- [ ] **전체 grep 스윕 (amended AC2 3단계)**
  - [ ] `LC_ALL=C grep -rn -E "\b42\b|\b12\b|\b7\b" src/messages/*.json src/components/sections/hero.tsx docs/design-system/*.md docs/mission.md CLAUDE.md docs/design-templates/landing-page/messages.js` 실행, must-change 파일에서 재검증된 새 숫자만 남아있는지 확인
  - [ ] `grep -rn -E "42개|12개|7개" docs/specification/0{1,2,3,5}-*.md` 실행, 옛 한국어 표기 잔존 없음 확인
  - [ ] 불일치 발견 시 `000015-010`을 재오픈 대상으로 보고
- [ ] **AC4a/AC4b 최종 상태 확인**
  - [ ] (FR-4a 경로) `featureGrid.items` 값 합산이 `featureGrid.description` 총계와 일치, `featureGrid.title`이 실제 `items` 길이와 일치 — 5개 로케일 모두
  - [ ] (FR-4b 경로) `git diff`에 `featureGrid.items`/`.title`/agent 카테고리 값 편집이 전혀 없고, `000015-010` 보고에 blocking 문구가 존재하는지 확인
- [ ] **`docs/design-templates/landing-page/messages.js` 최종 확인 (AC6)**
  - [ ] 5개 로케일 블록 구조가 `en` 블록과 동일한지 최종 diff 확인
- [ ] **검색 인덱스 부산물 확인 (AC7)**
  - [ ] `src/data/guidebook-search.*.json`의 git diff가 `npm run build`의 자동 재생성 결과와 일치하는지 확인 (수동 편집 흔적 없어야 함)

## Task Verify
- [ ] `npm run build` exit code 0
- [ ] `npm run verify:bundle` exit code 0
- [ ] `npm run test:content` exit code 0
- [ ] grep 스윕(2개 명령) 모두에서 stale한 이전 숫자가 발견되지 않음
- [ ] AC4a 또는 AC4b 중 실제 경로에 해당하는 조건이 충족됨

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠 배치)
- [ ] app builds without error (`npm run build`)
