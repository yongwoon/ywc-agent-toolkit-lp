# 000027-030-test-changelog-build-verification

## Purpose

Recent updates 기능의 parser/cache fallback, 5 locale 렌더링, section order, external links, static export 및 bundle budget을 최종 검증한다.

## Scope

- deterministic changelog parser/fallback fixture 검증
- all-locale static DOM 또는 browser smoke 검증
- SocialProof–Changelog–Faq 순서와 link contract 검증
- message parity, lint, typecheck, build, bundle budget 실행

## Spec Reference

### Primary Sources

- [`docs/ywc-plans/20260813-changelog-section.md`](../../../docs/ywc-plans/20260813-changelog-section.md) — AC1–AC5, FR1–FR6, NFR, Edge Cases
- [`test/build-verification/check-bundle-budget.mjs`](../../../test/build-verification/check-bundle-budget.mjs) — 기존 bundle verification contract
- [`test/e2e-static-server.mjs`](../../../test/e2e-static-server.mjs) — static export server behavior

### Summary

이 task는 네트워크에 의존하지 않는 fixture로 parser의 heading variant, `Unreleased` 제외, highlight cap/정리, fallback 보존을 확인한다. build 후 5개 locale의 HTML에서 section 존재, 순서, entry/link contract를 확인하고 static export가 기존 JS budget을 침범하지 않는지 검증한다. 실패 원인이 선행 generator/UI task의 구현 계약에 있으면 해당 task로 되돌려 보고한다.

### Out of Scope (from spec)

- parser/cache implementation — `000027-010-config-generate-toolkit-changelog`
- component/message implementation — `000027-020-ui-changelog-section`
- Guidebook page, RSS, pagination, upstream changelog changes

## Criticality

`normal` — read-only build verification과 static DOM assertions이다.

## Dependencies

### Depends On

- `000027-020-ui-changelog-section` — UI, message, page order 구현을 제공한다.

### Depended By

- (None — final verification task)

## Key Files

- `test/changelog-verification.mjs` — parser/fallback deterministic checks
- `test/changelog-section-static.mjs` — built HTML locale/order/link checks
- `test/build-verification/verification-report.md` — verification evidence update when project convention requires it

## Notes

- upstream fetch를 test pass condition으로 사용하지 않는다. fixture와 committed cache를 이용해 재현성을 확보한다.
- test task는 production source ownership을 수정하지 않는다.
- browser-dependent checks는 existing Playwright/static-server convention을 따르며, 환경상 dedicated runner가 불가능하면 built HTML assertion으로 동일 contract를 검증한다.

## Hardening Evidence

### Test Feedback Path

- RED-first target: parser fixture와 all-locale section/order/link assertions
- Existing coverage: `npm run verify:bundle`, `npm run build`, `node scripts/check-message-keys.mjs`
- Named exception: 네트워크 장애를 직접 재현하는 대신 deterministic mock/fixture로 fallback contract를 검증한다.

### Interface Contract

- Contract: built landing page changelog DOM
- Inputs: generated JSON and five locale routes
- Outputs: section between SocialProof and Faq, version/date/highlight nodes, exact GitHub hrefs
- Error model: missing section, wrong order, missing locale key, wrong href, build/bundle failure는 verification failure
- Impacted tests: `test/changelog-verification.mjs`, static/browser verification script

### Critical Surface Review

- Review requirement: N/A

### Data Integrity Hardening

- Trigger surface: N/A — read-only verification
- Atomic / locking strategy: N/A
- Transaction boundary: N/A
- Idempotency guard: N/A
- Required tests: N/A

## Parallel Execution Metadata

### Ownership

- `test/changelog-verification.mjs`
- `test/changelog-section-static.mjs`
- `test/build-verification/verification-report.md`의 이 task evidence 범위

### Shared Surfaces

- generated JSON contract
- landing page DOM and section order
- npm build/prebuild scripts

### Conflicts With

- `000027-020-ui-changelog-section` — same DOM/message contract를 검증하므로 구현 중 동시 실행하지 않는다.

### Parallelizable After

- `000027-020-ui-changelog-section` merged

### Task Verify

- `node test/changelog-verification.mjs`
- `node scripts/check-message-keys.mjs`
- `npm run lint`
- `npm run typecheck`
- `npm run verify:bundle`
- `npm run build`
- `git diff --check`

## Out of Scope

- production generator, UI, page, message implementation
- upstream network availability as a required test dependency
