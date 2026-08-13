# 000025-010-config-generate-llms-catalog

## Purpose

Build 시점에 `ywc-agent-toolkit`의 Claude Code/Codex skill과 agent catalog를 수집하고, 정적 agent-readable 문서인 `public/llms.txt`를 생성한다. GitHub 장애가 발생해도 committed cache로 build를 계속할 수 있게 한다.

## Scope

- GitHub Trees API 1회 조회와 filtered raw-content fetch
- `gray-matter` frontmatter parsing, description 요약, deterministic catalog rendering
- `src/data/agent-catalog.json` cache와 `public/llms.txt` 생성
- `npm run prebuild` chain 등록 및 network fallback

## Criticality

`normal` — build-time generated cache와 static Markdown output을 다루며, security-sensitive surface는 아니다.

## Spec Reference

### Primary Sources

- [`docs/ywc-plans/20260813-llms-txt-agent-catalog.md`](../../../docs/ywc-plans/20260813-llms-txt-agent-catalog.md) — Scope, AC1–AC2, AC5, FR1–FR6, Data Model, Edge Cases, Open Questions
- [`scripts/fetch-github-stars.mjs`](../../../scripts/fetch-github-stars.mjs) — 기존 fetch/cache/fallback pattern

### Summary

이 task는 upstream toolkit의 tree를 한 번 조회한 뒤 실제 `SKILL.md`와 agent Markdown만 선별하고, frontmatter의 `name`과 정제된 `description`을 committed JSON cache에 기록한다. 성공 시 새 catalog를 저장하고, tree/raw fetch 중 하나라도 실패하면 기존 cache를 사용해 `llms.txt`를 재생성하되 build를 실패시키지 않는다. 명세의 기본 upstream 기준인 `main`을 사용하며, 구현 시작 전에 upstream README의 curated description 존재 여부를 재확인한다.

### Out of Scope (from spec)

- Footer group 및 locale link resolution 변경 — `000026-010-ui-footer-llms-link`에서 처리
- Export/fallback/5-locale browser 검증 — `000026-020-test-llms-build-verification`에서 처리
- `skills.md`, `sitemap.md`, `rss.xml`, Hero/Feature Grid/FAQ count 동기화
- upstream `ywc-agent-toolkit` 자체 변경 및 신규 runtime dependency 추가

## Dependencies

### Depends On

- `000024-010-test-verify-guidebook-auth-implement-build` — 기존 Phase의 build baseline과 task numbering 경계를 제공한다.

### Depended By

- `000026-010-ui-footer-llms-link` — 생성되는 root asset contract와 build integration을 전제로 한다.
- `000026-020-test-llms-build-verification` — cache, rendered output, fallback behavior를 검증한다.

## Key Files

- `scripts/generate-llms-txt.mjs` — catalog fetch, parse, fallback, render
- `src/data/agent-catalog.json` — committed fallback cache
- `public/llms.txt` — generated static output
- `package.json` — `prebuild` chain entry

## Notes

- `gray-matter`는 이미 설치되어 있으므로 Library Introduction task가 필요 없다.
- raw fetch concurrency는 최대 8, request timeout은 약 10초로 제한한다.
- partial fetch는 경고 후 해당 entry를 skip할 수 있지만, tree failure/zero matches/empty cache는 빈 catalog를 배포하지 않도록 처리한다.
- sibling changelog task도 `package.json`의 `prebuild`를 수정할 수 있으므로 병합 시 두 chain append를 보존한다.
- Open Question: upstream의 curated one-line description 표를 확인하되, v1은 명세의 frontmatter truncation 규칙과 `main` 기준을 따른다.

## Hardening Evidence

### Test Feedback Path

- RED-first target: `node scripts/generate-llms-txt.mjs`의 fixture/mock network 검증
- Existing coverage: `npm run prebuild` 및 `scripts/fetch-github-stars.mjs` fallback pattern
- Named exception: 생성기 전용 test runner는 없으므로 deterministic output, forced network failure, schema assertion으로 대체한다.

### Interface Contract

- Contract: `src/data/agent-catalog.json` → `public/llms.txt` build contract
- Inputs: `{ generatedAt, sourceCommit, entries[] }`, entry는 `name`, `kind`, `tool`, `description`, `path`
- Outputs: H1, blockquote count summary, 4개 `##` sections, GitHub blob links
- Error model: fetch/timeout/parse failure는 warning 후 last committed cache fallback; empty result은 publish 금지
- Impacted tests: `000026-020`의 generator/build verification

### Critical Surface Review

- Review requirement: N/A — no security-sensitive or irreversible state surface

### Data Integrity Hardening

- Trigger surface: N/A — committed generated cache only
- Atomic / locking strategy: N/A
- Transaction boundary: N/A
- Idempotency guard: deterministic cache/output rewrite
- Required tests: forced failure regeneration and repeated render equality

## Parallel Execution Metadata

### Ownership

- `scripts/generate-llms-txt.mjs`
- `src/data/agent-catalog.json`
- `public/llms.txt`
- `package.json`의 `scripts.prebuild` entry

### Shared Surfaces

- Workspace build configuration: `package.json` `prebuild`
- Static output contract: `public/llms.txt`, `out/llms.txt`

### Conflicts With

- sibling changelog implementation task — `package.json` `prebuild` chain overlap

### Parallelizable After

- `000024-010-test-verify-guidebook-auth-implement-build` merged

### Task Verify

- `npm run prebuild`
- `node scripts/generate-llms-txt.mjs`
- `git diff --check`

## Out of Scope

- Footer UI, locale translations, and route resolution
- Playwright/browser assertions and final export verification
- Hardcoded marketing count synchronization
