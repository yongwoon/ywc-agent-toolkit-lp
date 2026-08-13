# 000026-010-ui-footer-llms-link — Implementation Checklist

## Prerequisites

- [ ] `000025-010-config-generate-llms-catalog` is completed and merged
- [ ] `public/llms.txt` is generated at the site root by `npm run prebuild`

## Allowed Edit Scope

- [ ] `src/components/sections/site-footer.tsx`와 다섯 locale의 `footer.groups`만 수정한다.
- [ ] generator/output/test Ownership로 확장되면 중단하고 보고한다.

## Stop Conditions

- [ ] 기존 `/guidebook/`, hash, external link의 behavior가 유지되지 않으면 중단한다.
- [ ] locale message leaf-key mismatch가 발생하면 중단한다.
- [ ] `/llms.txt`를 root-relative pass-through로 표현할 수 없도록 routing contract가 바뀌어야 하면 중단한다.

## Hardening Gate

- [ ] Task를 user-visible behavior change로 분류한다.
- [ ] Production edit 전에 `/llms.txt` exact href에 대한 RED-first assertion 계획을 기록한다.
- [ ] 3-way footer link contract와 impacted locale smoke tests를 기록한다.
- [ ] Data Integrity와 Critical Surface Review는 N/A이다.

## Implementation Steps

- [ ] `src/components/sections/site-footer.tsx`에 root-relative static asset 판별 helper를 추가한다.
  - `http://`/`https://`는 기존 external behavior를 유지한다.
  - `/llms.txt`처럼 `/`로 시작하고 final path segment에 `.`이 있는 target은 href를 그대로 사용한다.
  - 나머지는 기존 `resolveLocalizedHref(locale, target)` 경로를 사용한다.
- [ ] `src/messages/en.json`의 `footer.groups`에 `Agents` group과 `/llms.txt` link를 추가한다.
- [ ] `ja.json`, `ko.json`, `zh.json`, `es.json`에 동등한 group/label을 추가해 source key set을 맞춘다.
- [ ] 기존 footer links가 새 static asset 판별에 오인되지 않는지 확인하고 `check-message-keys`를 실행한다.

## Task Verify

- [ ] `node scripts/check-message-keys.mjs`
- [ ] `npm run lint`
- [ ] `npx tsc --noEmit`
- [ ] `git diff --check`

## Verification

- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (N/A — no test runner configured)
- [ ] integration/browser tests pass (`000026-020`)
- [ ] app builds without error (`npm run build`)

## Implementation Notes

