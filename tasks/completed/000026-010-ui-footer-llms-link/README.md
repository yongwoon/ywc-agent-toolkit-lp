# 000026-010-ui-footer-llms-link

## Purpose

모든 locale footer에 `Agents` link group을 추가하고, `/llms.txt`가 locale prefix 없이 site root asset로 연결되도록 footer link classification을 확장한다.

## Scope

- `site-footer.tsx`의 external/root-relative static asset/locale route 3-way classification
- en, ja, ko, zh, es footer translation entries
- 기존 footer link behavior 보존

## Criticality

`normal` — public footer routing과 translation configuration 변경이며, security-sensitive surface는 아니다.

## Spec Reference

### Primary Sources

- [`docs/ywc-plans/20260813-llms-txt-agent-catalog.md`](../../../docs/ywc-plans/20260813-llms-txt-agent-catalog.md) — AC4, FR7, Iteration 1 Amendments FR8
- [`src/components/sections/site-footer.tsx`](../../../src/components/sections/site-footer.tsx) — current link resolution behavior

### Summary

Footer는 현재 external link와 locale-routable link만 구분하므로 `/llms.txt`도 locale path로 잘못 해석된다. 이 task는 final path segment에 extension이 있는 root-relative static asset을 pass-through로 분류하고, 기존 external 및 locale-routable link 동작은 그대로 유지한다. 다섯 locale의 message-key shape도 동시에 맞춘다.

### Out of Scope (from spec)

- Catalog generator/cache/output — `000025-010-config-generate-llms-catalog`
- Export artifact 및 browser smoke verification — `000026-020-test-llms-build-verification`
- `skills.md`, `sitemap.md`, `rss.xml`, hardcoded marketing counts

## Dependencies

### Depends On

- `000025-010-config-generate-llms-catalog` — `/llms.txt` static asset contract와 build generation을 제공한다.

### Depended By

- `000026-020-test-llms-build-verification` — all-locale exact href와 기존 link regression을 검증한다.

## Key Files

- `src/components/sections/site-footer.tsx` — 3-way target classification
- `src/messages/en.json`
- `src/messages/ja.json`
- `src/messages/ko.json`
- `src/messages/zh.json`
- `src/messages/es.json`

## Notes

- `Agents` title/label은 각 locale의 기존 voice에 맞추되 message leaf-key set은 en source of truth와 일치해야 한다.
- `/llms.txt`는 `target="_blank"`나 `rel="noreferrer"`를 사용하지 않는다.

## Hardening Evidence

### Test Feedback Path

- RED-first target: root-relative `/llms.txt` href assertion
- Existing coverage: `npm run lint`, `npx tsc --noEmit`, `node scripts/check-message-keys.mjs`
- Named exception: dedicated component unit test runner가 없어 `000026-020` Playwright/static assertion으로 대체한다.

### Interface Contract

- Contract: footer `target` classification
- Inputs: external URL, `/asset.ext`, locale-routable target
- Outputs: unchanged external href, unchanged root asset href, or `resolveLocalizedHref` result
- Error model: none; unknown target keeps current locale-routable behavior
- Impacted tests: `000026-020` locale smoke assertions

### Critical Surface Review

- Review requirement: N/A

### Data Integrity Hardening

- Trigger surface: N/A — static message/config and pure rendering logic
- Atomic / locking strategy: N/A
- Transaction boundary: N/A
- Idempotency guard: N/A
- Required tests: N/A

## Parallel Execution Metadata

### Ownership

- `src/components/sections/site-footer.tsx`
- `src/messages/{en,ja,ko,zh,es}.json`의 `footer.groups`

### Shared Surfaces

- Shared message-key contract
- Footer link-resolution behavior

### Conflicts With

- `000026-020-test-llms-build-verification` — e2e/static verification path overlap

### Parallelizable After

- `000025-010-config-generate-llms-catalog` merged

### Task Verify

- `node scripts/check-message-keys.mjs`
- `npm run lint`
- `npx tsc --noEmit`
- `git diff --check`

## Out of Scope

- `scripts/generate-llms-txt.mjs`와 generated output
- Playwright fixture/server 및 final `npm run build`
