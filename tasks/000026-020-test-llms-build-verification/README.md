# 000026-020-test-llms-build-verification

## Purpose

`llms.txt` feature의 정적 export, cache fallback, catalog structure, 5개 locale footer href를 배포 전에 자동 검증한다.

## Scope

- build-verification 또는 Playwright smoke coverage 추가
- root `out/llms.txt` 존재 및 llms.txt structure 확인
- forced network failure fallback과 다섯 locale의 exact `/llms.txt` href 확인
- 최종 lint/typecheck/build/e2e gate 정리

## Criticality

`normal` — read-only build/browser verification task이며, security-sensitive surface는 아니다.

## Spec Reference

### Primary Sources

- [`docs/ywc-plans/20260813-llms-txt-agent-catalog.md`](../../../docs/ywc-plans/20260813-llms-txt-agent-catalog.md) — AC1–AC5, FR5–FR8, Edge Cases
- [`test/build-verification/check-bundle-budget.mjs`](../../../test/build-verification/check-bundle-budget.mjs) — 기존 build verification pattern
- [`test/e2e-static-server.mjs`](../../../test/e2e-static-server.mjs) — static export smoke test 환경

### Summary

이 task는 앞선 generator와 footer task가 약속한 산출물과 URL contract를 실제 build/export 관점에서 확인한다. network failure에도 prebuild가 성공하는지, `out/llms.txt`가 locale root가 아닌 site root에 있는지, 모든 locale footer link의 HTML href가 정확히 `/llms.txt`인지 검증한다. 검증 코드는 기존 test layout과 command를 재사용한다.

### Out of Scope (from spec)

- generator 및 footer production implementation — `000025-010`, `000026-010`
- `skills.md`, `sitemap.md`, `rss.xml`
- Hero/Feature Grid/FAQ count synchronization

## Dependencies

### Depends On

- `000025-010-config-generate-llms-catalog` — cache, generated document, fallback contract
- `000026-010-ui-footer-llms-link` — footer group와 root-relative href behavior

### Depended By

- (None — final verification task)

## Key Files

- `test/build-verification/*` 또는 `test/*` — static artifact/catalog assertions
- `test/e2e/*` 또는 기존 Playwright config 범위 — all-locale footer smoke
- 필요 시 `package.json`의 verification script만 추가

## Notes

- test가 generated `public/llms.txt`를 무심코 덮어쓰지 않도록 fixture/cache backup과 cleanup을 명확히 한다.
- 실제 GitHub network에 의존하는 test는 허용하지 말고, fallback은 controlled failure injection으로 검증한다.
- `out/llms.txt`는 Next static export 후 root에 있어야 한다.

## Hardening Evidence

### Test Feedback Path

- RED-first target: root artifact, fallback, all-locale href assertions
- Existing coverage: `npm run verify:bundle`, `npm run test:e2e`, `npm run build`
- Named exception: 없음 — 이 task 자체가 required automated verification을 추가한다.

### Interface Contract

- Contract: exported root asset and footer href
- Inputs: built `out/`, locale home pages, cached catalog
- Outputs: `out/llms.txt`, exact anchor `href="/llms.txt"`, valid catalog sections/entries
- Error model: any assertion failure exits non-zero and blocks handoff
- Impacted tests: new/extended build verification and Playwright smoke

### Critical Surface Review

- Review requirement: N/A

### Data Integrity Hardening

- Trigger surface: N/A — read-only build verification with temporary fixture handling
- Atomic / locking strategy: N/A
- Transaction boundary: N/A
- Idempotency guard: restore generated/cache fixtures in cleanup
- Required tests: forced fetch failure and repeated verification

## Parallel Execution Metadata

### Ownership

- `test/build-verification/**` additions for llms catalog/export
- `test/e2e/**` or existing Playwright test files selected for locale smoke
- `package.json` verification script additions only, if required

### Shared Surfaces

- `out/`, `public/llms.txt`, `src/data/agent-catalog.json`
- Playwright static server and build verification commands

### Conflicts With

- `000026-010-ui-footer-llms-link` — test assertions must be added after its final DOM contract
- existing bundle verification task if it edits the same verification file

### Parallelizable After

- `000025-010-config-generate-llms-catalog` merged
- `000026-010-ui-footer-llms-link` merged

### Task Verify

- `npm run prebuild`
- `npm run build`
- `npm run verify:bundle`
- `npm run test:e2e`
- `npm run lint`
- `npx tsc --noEmit`

## Out of Scope

- Production catalog generation, footer rendering, and translation authoring
- External GitHub API availability as a test prerequisite
