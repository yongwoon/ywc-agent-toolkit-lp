# 000010-010-test-verify-full-build — Implementation Checklist

## Prerequisites
- [ ] `000009-010-ui-sync-app-skill-counts` 완료
- [ ] `000009-020-config-sync-docs-skill-counts` 완료
- [ ] `000009-030-config-guidebook-language-setup-entry` 완료

## Allowed Edit Scope
- [ ] 이 task는 어떤 파일도 편집하지 않는다 — 검증 실패 시 해당 Phase 000009 task를 재오픈해 보고한다

## Stop Conditions
- [ ] Phase 000009 세 task 중 하나라도 미완료 상태이면 시작하지 않는다

## Implementation Steps
- [ ] **전체 빌드 실행**
  - [ ] `npm run build` 실행 (prebuild: `fetch-github-stars.mjs` → `generate-search-index.mjs` → `check-message-keys.mjs`; postbuild: `generate-sitemap.mjs` → `strip-landing-next-runtime.mjs` → `inject-csp.mjs`) — 에러 없이 완료되는지 확인
- [ ] **번들 예산 검증**
  - [ ] `npm run verify:bundle` 실행
- [ ] **가이드북 경로 검증**
  - [ ] `npm run test:content` 실행
- [ ] **전체 grep 스윕**
  - [ ] `grep -rn "41\|42" src/messages/*.json src/components/sections/hero.tsx docs/design-system/*.md docs/specification/0{1,2,3,5}-*.md docs/mission.md CLAUDE.md docs/design-templates/landing-page/messages.js` 실행, must-change 파일에서 재검증된 숫자만 남아있는지 확인
  - [ ] 불일치 발견 시 어느 Phase 000009 task의 Ownership에 해당하는지 식별해 보고
- [ ] **검색 인덱스 부산물 확인**
  - [ ] `src/data/guidebook-search.*.json`의 git diff가 `npm run build`의 자동 재생성 결과와 일치하는지 확인 (수동 편집 흔적 없어야 함)

## Task Verify
- [ ] `npm run build` exit code 0
- [ ] `npm run verify:bundle` exit code 0
- [ ] `npm run test:content` exit code 0
- [ ] grep 스윕에서 stale한 이전 숫자가 발견되지 않음

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠 배치)
- [ ] app builds without error (`npm run build`)
