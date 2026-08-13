# 000026-020-test-llms-build-verification — Implementation Checklist

## Prerequisites

- [ ] `000025-010-config-generate-llms-catalog` is completed and merged
- [ ] `000026-010-ui-footer-llms-link` is completed and merged
- [ ] Playwright/static server commands are available in the repository

## Allowed Edit Scope

- [ ] `test/build-verification/**`, selected `test/e2e/**`, and verification scripts in `package.json` only 수정한다.
- [ ] production source가 필요하면 중단하고 predecessor task로 scope를 되돌린다.

## Stop Conditions

- [ ] test가 live GitHub network에 의존해야만 재현되면 중단한다.
- [ ] generated output cleanup/restore를 보장할 수 없으면 중단한다.
- [ ] footer DOM contract가 predecessor와 달라져 명세 AC4를 판단할 수 없으면 중단한다.

## Hardening Gate

- [ ] Task를 test-only behavior verification으로 분류한다.
- [ ] generator fallback, root artifact, exact locale href에 대한 RED-first assertions를 먼저 추가한다.
- [ ] exported artifact와 footer href assertion contract를 기록한다.
- [ ] Data Integrity trigger는 N/A이며 temporary fixture cleanup/idempotency를 기록한다.
- [ ] Critical Surface Review는 N/A이다.

## Implementation Steps

- [ ] build-verification helper 또는 script에 `out/llms.txt` 존재, UTF-8 Markdown, H1/blockquote/4개 section, non-empty entry 및 canonical GitHub URL assertions를 추가한다.
- [ ] controlled network failure에서 `npm run prebuild`가 non-zero가 아니고 committed cache 기반 output을 남기는지 검증한다.
  - 기존 cache와 generated files를 안전하게 backup/restore하고 test 종료 후 workspace를 원상복구한다.
- [ ] Playwright/static smoke에 5개 locale home route를 순회하는 footer assertion을 추가한다.
  - `Agents` group link의 DOM `href`가 각 locale에서 정확히 `/llms.txt`인지 확인한다.
  - 기존 locale route와 external link behavior의 최소 regression도 확인한다.
- [ ] `package.json`에 필요한 verification command만 연결하고 `npm run prebuild`, `npm run build`, `npm run verify:bundle`, `npm run test:e2e`를 순서대로 실행한다.

## Task Verify

- [ ] `npm run prebuild`
- [ ] `npm run build`
- [ ] `npm run verify:bundle`
- [ ] `npm run test:e2e`
- [ ] `npm run lint`
- [ ] `npx tsc --noEmit`
- [ ] `git diff --check`

## Verification

- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (N/A — no test runner configured)
- [ ] integration/browser tests pass (`npm run test:e2e`)
- [ ] app builds without error (`npm run build`)

## Implementation Notes

