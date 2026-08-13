# 000027-030-test-changelog-build-verification — Implementation Checklist

## Prerequisites

- [ ] `000027-020-ui-changelog-section` is completed and merged
- [ ] `npm install` dependencies and static export prerequisites are available.

## Allowed Edit Scope

- [ ] `test/changelog-verification.mjs`, `test/changelog-section-static.mjs`, verification report evidence만 수정한다.
- [ ] production generator/component/page/message를 수정해야 하면 중단하고 해당 predecessor task로 보고한다.

## Stop Conditions

- [ ] 테스트가 upstream network availability에 의존하게 되면 중단하고 fixture/mock 방식으로 전환한다.
- [ ] generated JSON contract가 깨졌으면 UI를 우회해 수정하지 말고 `000027-010`으로 되돌린다.
- [ ] DOM order/link/message failure가 구현 버그인지 spec ambiguity인지 판별할 수 없으면 중단하고 보고한다.

## Hardening Gate

- [ ] Task를 verification-only task로 분류하고 production behavior edit은 수행하지 않는다.
- [ ] parser fixture와 built DOM assertions를 RED-first feedback path로 기록한다.
- [ ] generated JSON 및 built DOM contract의 inputs/outputs/error model을 README와 일치시킨다.
- [ ] Data Integrity와 Critical Surface Review는 N/A이다.

## Implementation Steps

- [ ] `test/changelog-verification.mjs`에서 두 heading variant와 dated/versioned filtering을 검증한다.
- [ ] 같은 fixture에서 `Unreleased` 제외, subsection priority, 3-item cap, markdown-link noise stripping, long-text truncation을 검증한다.
- [ ] fetch failure mock 또는 temporary cache fixture로 기존 committed JSON 보존과 non-zero exit 방지 contract를 검증한다.
- [ ] `test/changelog-section-static.mjs`에 build output을 대상으로 5 locale 모두 changelog section이 생성되는지 확인하는 static assertion을 추가한다.
- [ ] generated HTML에서 `SocialProof → ChangelogSection → Faq` 순서, version/date/highlight 존재, anchored/full-history href를 확인한다.
- [ ] `scripts/check-message-keys.mjs`, `npm run verify:bundle`, `npm run build`를 실행하고 결과를 기록한다.
- [ ] 320/768/1024/1440 viewport 및 keyboard/focus/reduced-motion 요구사항을 manual test plan 또는 Playwright/static check로 확인한다.

## Task Verify

- [ ] `node test/changelog-verification.mjs`
- [ ] `node scripts/check-message-keys.mjs`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run verify:bundle`
- [ ] `npm run build`
- [ ] `git diff --check`

## Verification

- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npm run typecheck`)
- [ ] unit/fixture tests pass (`node test/changelog-verification.mjs`)
- [ ] integration/browser tests pass (changelog static/browser assertions)
- [ ] app builds without error (`npm run build`)

## Implementation Notes
