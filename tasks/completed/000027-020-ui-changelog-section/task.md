# 000027-020-ui-changelog-section — Implementation Checklist

## Prerequisites

- [ ] `000027-010-config-generate-toolkit-changelog` is completed and merged
- [ ] `src/data/toolkit-changelog.json`이 README의 entry contract를 만족한다.

## Allowed Edit Scope

- [ ] `src/components/sections/changelog.tsx`, `src/app/[locale]/page.tsx`, 다섯 locale의 `changelog` namespace만 수정한다.
- [ ] generator/cache 또는 unrelated section으로 확장되면 중단하고 보고한다.

## Stop Conditions

- [ ] JSON shape이 version/date/url/highlights contract를 만족하지 않으면 중단한다.
- [ ] section order를 바꾸기 위해 다른 section component를 수정해야 하면 중단한다.
- [ ] locale key parity를 맞추기 위해 `en.json` 외의 기존 namespace를 변경해야 하면 중단한다.

## Hardening Gate

- [ ] Task를 user-visible behavior change로 분류한다.
- [ ] production edit 전에 all-locale order와 exact GitHub href에 대한 RED-first static assertion 계획을 기록한다.
- [ ] `ChangelogEntry` data boundary의 input/output/error model을 README와 일치시킨다.
- [ ] Data Integrity와 Critical Surface Review는 N/A이다.

## Implementation Steps

- [ ] `src/components/sections/changelog.tsx`에 `toolkit-changelog.json`을 static import하는 async server component를 생성한다.
- [ ] `getTranslations("changelog")`로 eyebrow, title, description, full-history label을 읽는다.
- [ ] JSON entries를 version/date/highlights card list로 렌더링하고 highlight text는 upstream English 그대로 표시한다.
- [ ] 각 version link가 JSON의 CHANGELOG heading anchor를 사용하고 `target="_blank"`/`rel="noreferrer"`를 기존 external-link convention에 맞춰 적용하는지 확인한다.
- [ ] section 하단에 unanchored `https://github.com/yongwoon/ywc-agent-toolkit/blob/main/CHANGELOG.md` CTA를 추가한다.
- [ ] `src/app/[locale]/page.tsx`에서 `SocialProof` 다음, `Faq` 이전에 `ChangelogSection` import/render를 삽입한다.
- [ ] `src/messages/en.json`에 `changelog` namespace와 4개 chrome leaf key를 source of truth로 추가한다.
- [ ] `ja.json`, `ko.json`, `zh.json`, `es.json`에 동일한 leaf-key shape의 자연스러운 번역을 추가한다.
- [ ] 320/768/1024/1440px에서 card list, long highlight, external link focus style가 기존 responsive/token contract를 따르는지 확인한다.

## Task Verify

- [ ] `node scripts/check-message-keys.mjs`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `git diff --check`

## Verification

- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npm run typecheck`)
- [ ] unit tests pass (N/A — dedicated component unit-test runner 없음)
- [ ] integration/browser tests pass (`000027-030`)
- [ ] app builds without error (`npm run build`)

## Implementation Notes

