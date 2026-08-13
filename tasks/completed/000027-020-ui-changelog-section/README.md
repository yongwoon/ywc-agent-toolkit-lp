# 000027-020-ui-changelog-section

## Purpose

빌드된 changelog cache를 사용해 모든 locale 랜딩 페이지에 최근 업데이트 섹션을 표시하고, 방문자가 전체 release history로 이동할 수 있게 한다.

## Scope

- `ChangelogSection` server component
- version/date/highlights card list 및 per-entry GitHub anchor link
- Social Proof와 FAQ 사이의 landing page section order
- 5개 locale의 `changelog` chrome message keys

## Spec Reference

### Primary Sources

- [`docs/ywc-plans/20260813-changelog-section.md`](../../../docs/ywc-plans/20260813-changelog-section.md) — Scope, AC2/AC5, FR5–FR6, NFR, Edge Cases
- [`src/components/sections/social-proof.tsx`](../../../src/components/sections/social-proof.tsx) — server component와 committed JSON import 패턴
- [`src/app/[locale]/page.tsx`](../../../src/app/%5Blocale%5D/page.tsx) — 현재 section order
- [`docs/design-system/components.md`](../../../docs/design-system/components.md) — section/card UI contracts

### Summary

`ChangelogSection`은 request-time fetch 없이 `src/data/toolkit-changelog.json`을 직접 import하는 async server component다. section chrome만 `next-intl`로 번역하고, upstream release highlight prose는 모든 locale에서 English-only로 유지한다. 각 version은 CHANGELOG heading anchor로, 하단 CTA는 unanchored CHANGELOG URL로 연결하며 Social Proof와 FAQ 사이에 삽입한다.

### Out of Scope (from spec)

- fetch/parser/cache generation — `000027-010-config-generate-toolkit-changelog`
- browser/static export/bundle 최종 검증 — `000027-030-test-changelog-build-verification`
- Guidebook page, RSS, older-entry pagination, individual entry translation

## Criticality

`normal` — 공개 정적 UI와 번역 catalog 변경이며 security-sensitive surface는 아니다.

## Dependencies

### Depends On

- `000027-010-config-generate-toolkit-changelog` — 정적 import할 JSON schema와 GitHub URL contract를 제공한다.

### Depended By

- `000027-030-test-changelog-build-verification` — all-locale rendering, order, link, bundle/build 결과를 검증한다.

## Key Files

- `src/components/sections/changelog.tsx` — new server-rendered section
- `src/app/[locale]/page.tsx` — section insertion
- `src/messages/{en,ja,ko,zh,es}.json` — `changelog` namespace

## Notes

- client component, runtime fetch, new dependency를 추가하지 않는다.
- `SectionEyebrow`와 기존 section spacing/card token을 재사용한다.
- message leaf-key set은 `en.json`을 source of truth로 하고 5개 locale을 동시에 수정한다.

## Hardening Evidence

### Test Feedback Path

- RED-first target: all-locale section order와 exact href를 확인하는 `000027-030` browser/static assertion
- Existing coverage: `node scripts/check-message-keys.mjs`, `npm run lint`, `npm run typecheck`
- Named exception: dedicated component unit-test runner가 없어 static export DOM 검증으로 대체한다.

### Interface Contract

- Contract: `ChangelogEntry` JSON-to-component boundary
- Inputs: `version`, ISO `date`, GitHub anchor `url`, `highlights: string[]`
- Outputs: localized section chrome와 release cards의 static HTML
- Error model: cache entry가 없으면 UI task가 임의 fallback을 만들지 않고 dependency task에 보고한다.
- Impacted tests: `000027-030` static/browser assertions

### Critical Surface Review

- Review requirement: N/A

### Data Integrity Hardening

- Trigger surface: N/A — read-only static rendering
- Atomic / locking strategy: N/A
- Transaction boundary: N/A
- Idempotency guard: N/A
- Required tests: N/A

## Parallel Execution Metadata

### Ownership

- `src/components/sections/changelog.tsx`
- `src/app/[locale]/page.tsx`
- `src/messages/{en,ja,ko,zh,es}.json`의 `changelog` namespace

### Shared Surfaces

- `toolkit-changelog.json` data contract
- locale message-key parity
- landing page section order

### Conflicts With

- `000027-030-test-changelog-build-verification` — 검증 task가 동일 UI/message surface를 읽고 browser contract를 대상으로 한다.

### Parallelizable After

- `000027-010-config-generate-toolkit-changelog` merged

### Task Verify

- `node scripts/check-message-keys.mjs`
- `npm run lint`
- `npm run typecheck`
- `git diff --check`

## Out of Scope

- generator script와 JSON cache 수정
- runtime data fetching 또는 client-side state
- Guidebook, RSS, pagination, changelog prose translation
