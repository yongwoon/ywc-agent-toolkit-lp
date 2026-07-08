# 000013-010-test-guidebook-numbering-invariant-and-fixture

## Purpose
새 build-time invariant 스크립트를 도입해 "`guidebookNavGroups`에 등록되지 않은 페이지가 조용히 sidebar에서 누락되는" 실패 클래스(이번 리팩터링의 직접적 동기가 된 실제 인시던트 — page 16이 `guidebook-nav.ts`에 등록되지 않아 sidebar에서 안 보였던 사례)를 CI/빌드 시점에 기계적으로 차단한다. 또한 임시 fixture 페이지로 전체 파이프라인(sidebar/prev-next/scale-selector/search-index/sitemap/`generateStaticParams`)이 신규 non-numeric 페이지에 대해 end-to-end로 정상 동작하는지 검증한다.

## Scope
- `test/check-guidebook-nav-registration.mjs`(또는 동등한 이름) 신설 — `guidebookNavGroups`의 slug 집합과 `src/content/guidebook/en/`의 실제 `.md` 파일 집합(README.md 등 non-content 파일 제외)을 양방향 비교, 불일치 시 orphan slug 이름을 출력하고 non-zero exit
- 이 invariant를 `package.json`의 `prebuild` 스크립트 체인에 추가(`test:content`가 아님 — spec 검증에서 `test:content`가 CI에 연결되어 있지 않음이 확인됨)
- AC6 fixture 절차 실행: 숫자 prefix 없는 임시 페이지를 5개 locale 모두에 생성하고, `guidebookNavGroups`에 임시 등록한 뒤, sidebar/search-index/`generateStaticParams` 전부에서 정상 동작하는지 확인 후 fixture를 제거

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-page-numbering-refactor.md` — `## Iteration 1 Amendments` §A5(`FR-5` 대체), §A6(`AC6` 대체), §A9(FR-2 mechanical check suggestion), 원본 `AC2`

### Summary
FR-5(개정)는 invariant를 `prebuild`에 연결하도록 명시적으로 요구한다(원본 spec의 `test:content` 연결 주장은 spec 검증에서 사실이 아님이 확인되어 폐기됨 — `.github/workflows/*.yml`에 `test:content` 호출이 전혀 없었음). AC6(개정)는 fixture를 5개 locale 모두에 생성해야 함을 요구한다(원본은 `en/`에만 생성하도록 되어 있어 `generate-search-index.mjs`가 나머지 4개 locale 파일을 읽으려다 예외를 던지는 버그가 있었음).

### Out of Scope (from spec)
- `search-modal.tsx`/`generate-search-index.mjs`의 title이 `displayNumber`와 별개로 raw H1에서 파생되는 문제(Edge Case A8) — 이번 pass에서 고치지 않음, invariant 스크립트도 이 불일치를 검사 대상으로 삼지 않음
- FR-2 mechanical check(A9, Suggestion) — 이 task에 포함하되 blocking 요구사항은 아님(Suggestion 수준)

## Criticality
`normal`

## Dependencies

### Depends On
- `000011-010-refactor-guidebook-nav-remove-order` — `order` 필드가 완전히 제거되었는지 최종 확인 대상
- `000011-020-refactor-guidebook-slug-discovery-scripts` — 이 task의 invariant 스크립트는 `000011-020`이 확립한 "guidebookNavGroups에서 파생" 패턴을 그대로 따름
- `000012-010-ui-guidebook-render-sites-display-number` — AC6 fixture가 4개 렌더 사이트 전부에서 번호 표시를 검증하려면 이 task가 완료되어 있어야 함

### Depended By
- `(None)` — 이 배치의 마지막 task

## Key Files
- `test/check-guidebook-nav-registration.mjs` — 신규 invariant 스크립트
- `package.json` — `prebuild` 스크립트 체인에 새 invariant 추가
- (일시적) `src/content/guidebook/{en,ko,ja,zh,es}/fixture-numbering-test.md` — AC6 검증용, 검증 후 즉시 삭제
- (일시적) `src/components/guidebook/guidebook-nav.ts` — AC6 fixture용 임시 entry 추가/제거 (000011-010의 Ownership이지만, 이 task가 완료 시점에 되돌리는 조건으로 일시적으로 편집)

## Notes
- `src/components/guidebook/guidebook-nav.ts`를 일시적으로 편집하는 것은 `000011-010`의 Ownership과 형식적으로 겹치지만, (a) `000011-010`이 이미 merge된 후에만 실행되고 (b) fixture 검증이 끝나면 반드시 원상복구(entry 제거)하므로 최종 diff에는 남지 않는다 — Stop Condition에 "fixture 정리 실패 시 task를 완료 처리하지 않음"을 명시한다.
- Invariant 스크립트의 이름은 기존 `test/check-guidebook-paths.mjs`의 위치 관례(`test/` 디렉터리, `check-guidebook-*.mjs` 네이밍)를 따른다.
- AC2(원본 spec)의 "invariant가 orphan slug를 실제로 잡아내는지" 검증은, 의도적으로 미등록 fixture 파일을 만들어 invariant가 실패하는지 먼저 확인(negative test)한 뒤, 정상 등록 상태로 되돌려 invariant가 통과하는지 재확인(positive test)하는 2단계로 수행한다.

## Parallel Execution Metadata

### Ownership
- `test/check-guidebook-nav-registration.mjs`
- `package.json` (`prebuild` 라인만)
- (일시적, 검증 후 원상복구) `src/content/guidebook/{en,ko,ja,zh,es}/fixture-numbering-test.md`, `guidebook-nav.ts`의 fixture entry

### Shared Surfaces
- `package.json`의 `prebuild` 스크립트 체인 — 다른 task가 동시에 `prebuild`를 편집하지 않는지 확인 필요
- `guidebookNavGroups` — 일시적 fixture entry 추가/제거, 최종 상태는 000011-010이 만든 상태와 동일해야 함

### Conflicts With
- `000011-010-refactor-guidebook-nav-remove-order` — `guidebook-nav.ts`에 대한 일시적 편집이 겹치므로 `000011-010`이 완전히 merge된 후에만 시작

### Parallelizable After
- `000011-010-refactor-guidebook-nav-remove-order`
- `000011-020-refactor-guidebook-slug-discovery-scripts`
- `000012-010-ui-guidebook-render-sites-display-number`

### Task Verify
- `node test/check-guidebook-nav-registration.mjs` — 정상 상태에서 exit 0
- Negative test: 의도적으로 `guidebookNavGroups`에 없는 fixture 파일만 만든 상태에서 위 스크립트가 non-zero exit + fixture 이름을 출력하는지 확인
- `npm run build` (prebuild 체인에 invariant 포함) 전체 통과
- AC6 fixture 시나리오: `npm run build` 성공, `jq 'length' src/data/guidebook-search.<locale>.json`이 5개 locale 모두에서 `17`(fixture 포함) — 검증 후 fixture 제거하고 다시 `16`으로 복귀 확인

## Out of Scope
- `search-modal.tsx` title 소스를 `displayNumber`와 일치시키는 작업 — Edge Case A8, 별도 follow-up
- `000011-010`/`000011-020`/`000012-010`의 실제 구현 — 이 task는 검증만 수행(단, fixture 목적의 일시적 `guidebook-nav.ts` 편집은 예외)
