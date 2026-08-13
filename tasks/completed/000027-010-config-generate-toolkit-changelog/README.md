# 000027-010-config-generate-toolkit-changelog

## Purpose

빌드 시 `ywc-agent-toolkit`의 최신 릴리스 정보를 가져와 정적 랜딩 페이지가 사용할 committed cache를 생성한다. 네트워크 장애가 있어도 마지막 cache로 build를 계속할 수 있게 한다.

## Scope

- `CHANGELOG.md`를 raw GitHub URL에서 단일 요청으로 fetch
- version/date heading 파싱과 `Added`/`Changed`/`Fixed` highlight 추출
- 최대 5개 release와 최대 3개 highlight를 `src/data/toolkit-changelog.json`에 기록
- fetch 실패 시 기존 JSON을 보존하는 fallback
- 기존 `prebuild` chain에 generator 연결
- 검증 task가 사용할 수 있는 순수 parser 계약 제공

## Spec Reference

### Primary Sources

- [`docs/ywc-plans/20260813-changelog-section.md`](../../../docs/ywc-plans/20260813-changelog-section.md) — Scope, AC1/AC3, FR1–FR5, Data Model, Edge Cases
- [`scripts/fetch-github-stars.mjs`](../../../scripts/fetch-github-stars.mjs) — fetch/cache/fallback 구현 패턴
- [`package.json`](../../../package.json) — 현재 `prebuild` chain

### Summary

이 task는 English Keep a Changelog 형식에서 날짜가 있는 semantic-version release만 추출하고 `Unreleased`를 날짜 부재로 자동 제외한다. heading은 compare link가 있거나 없는 두 형식을 모두 허용하며, landing page용 링크는 version/date heading anchor로 만든다. 생성 실패는 build 실패가 아니라 committed JSON fallback으로 처리하고, parser는 결정적인 fixture 검증을 위해 분리된 순수 함수 계약을 유지한다.

### Out of Scope (from spec)

- `ChangelogSection` 렌더링과 locale message — `000027-020-ui-changelog-section`
- 브라우저/static export/bundle 최종 검증 — `000027-030-test-changelog-build-verification`
- Guidebook changelog page, RSS, upstream CHANGELOG format 변경, pagination, entry translation

## Criticality

`normal` — build-time generated content와 static cache 변경이며 security-sensitive surface는 아니다.

## Dependencies

### Depends On

- `000026-020-test-llms-build-verification` — Phase 000026의 `prebuild`/build chain 변경이 완료되어 이 task가 `package.json`을 안전하게 갱신할 수 있다.

### Depended By

- `000027-020-ui-changelog-section` — `toolkit-changelog.json`의 entry shape과 URL contract를 정적 import한다.
- `000027-030-test-changelog-build-verification` — parser와 fallback 동작을 검증한다.

## Key Files

- `scripts/generate-toolkit-changelog.mjs` — fetch, parse, normalize, fallback generator
- `src/data/toolkit-changelog.json` — committed cache/fallback output
- `package.json` — `prebuild` command chain

## Notes

- `raw.githubusercontent.com` 한 번의 fetch만 사용하고 GitHub REST API는 사용하지 않는다.
- JSON entry는 `{ version, date, url, highlights }` shape을 유지한다.
- `url`은 `https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md#<slug>` 형식이며 compare URL은 버린다.
- 생성 script는 현재 `package.json`의 sibling prebuild 변경을 덮어쓰지 않고 기존 chain 뒤에 명시적으로 추가한다.

## Hardening Evidence

### Test Feedback Path

- RED-first target: release heading 두 형식, `Unreleased` 제외, fallback 보존을 확인하는 `node test/changelog-verification.mjs`
- Existing coverage: `npm run lint`, `npm run typecheck`, `node scripts/check-message-keys.mjs`
- Named exception: 별도 unit-test runner가 없어 순수 parser export와 fixture 기반 Node 검증으로 대체한다.

### Interface Contract

- Contract: `toolkit-changelog` generated JSON
- Inputs: Keep a Changelog text with `## [X.Y.Z] (date)` 또는 `## [X.Y.Z](url) (date)` headings
- Outputs: `{ generatedAt: string, entries: Array<{ version: string, date: string, url: string, highlights: string[] }> }`
- Error model: fetch/parse failure logs warning and preserves valid committed cache; build does not fail
- Impacted tests: `node test/changelog-verification.mjs`, `000027-030` static/export checks

### Critical Surface Review

- Review requirement: N/A

### Data Integrity Hardening

- Trigger surface: N/A — generated-file/cache update without shared mutable runtime state
- Atomic / locking strategy: N/A
- Transaction boundary: N/A
- Idempotency guard: N/A
- Required tests: N/A

## Parallel Execution Metadata

### Ownership

- `scripts/generate-toolkit-changelog.mjs`
- `src/data/toolkit-changelog.json`
- `package.json`의 `scripts.prebuild` 값

### Shared Surfaces

- `prebuild` command chain
- `toolkit-changelog.json` data contract

### Conflicts With

- `(None identified)` — 기존 Phase 000026 완료 후 실행한다.

### Parallelizable After

- `000026-020-test-llms-build-verification` merged

### Task Verify

- `node scripts/generate-toolkit-changelog.mjs`
- `node test/changelog-verification.mjs`
- `npm run lint`
- `npm run typecheck`
- `git diff --check`

## Out of Scope

- React component, page ordering, locale message edits
- Browser smoke test와 bundle budget 최종 판정
- 새로운 npm dependency 도입
