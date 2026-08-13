# 000027-010-config-generate-toolkit-changelog — Implementation Checklist

## Prerequisites

- [ ] `000026-020-test-llms-build-verification` is completed and merged
- [ ] `package.json`의 현재 `prebuild` chain과 `scripts/fetch-github-stars.mjs` fallback 패턴을 확인한다.

## Allowed Edit Scope

- [ ] `scripts/generate-toolkit-changelog.mjs`, `src/data/toolkit-changelog.json`, `package.json`의 `prebuild`만 수정한다.
- [ ] parser 검증 fixture가 필요하면 `test/changelog-verification.mjs`만 추가한다.
- [ ] 다른 task Ownership로 확장되면 중단하고 보고한다.

## Stop Conditions

- [ ] upstream heading 형식이 명세의 두 regex shape으로 표현되지 않으면 중단한다.
- [ ] 기존 cache가 없을 때의 fallback 정책이 새로 결정되어야 하면 중단한다.
- [ ] sibling prebuild command를 재배치하거나 제거해야 하면 중단한다.

## Hardening Gate

- [ ] Task를 build-time behavior change 및 generated-file task로 분류한다.
- [ ] production edit 전에 heading parser, highlight priority, fallback 보존에 대한 RED-first fixture 계획을 기록한다.
- [ ] `toolkit-changelog.json` output contract의 inputs, outputs, error model을 README와 일치시킨다.
- [ ] Data Integrity와 Critical Surface Review는 N/A이다.

## Implementation Steps

- [ ] `scripts/generate-toolkit-changelog.mjs`에 raw GitHub CHANGELOG URL과 `src/data/toolkit-changelog.json` output path를 정의한다.
- [ ] `parseChangelog(text)` 순수 함수가 `^## ` block을 순서대로 분리하고 `[X.Y.Z]` token과 trailing `(YYYY-MM-DD)`가 모두 있는 block만 유지하도록 구현한다.
- [ ] heading parser가 compare link 유무와 무관하게 version/date를 추출하고 `Unreleased`를 문자열 특수처리 없이 제외하도록 구현한다.
- [ ] `Added`, `Changed`, `Fixed` subsection을 우선순위 순으로 읽어 `*` 또는 `-` bullet을 최대 3개까지 수집하도록 구현한다.
- [ ] highlight에서 trailing PR/commit markdown-link noise를 제거하고 140자 budget과 ellipsis 규칙을 적용한다.
- [ ] 각 entry의 GitHub CHANGELOG heading anchor URL을 생성하고 output shape을 `{ generatedAt, entries }`로 고정한다.
- [ ] fetch 성공 시 JSON을 pretty-print하고, fetch 또는 parse 실패 시 기존 committed JSON을 보존하면서 warning만 출력하도록 구현한다.
- [ ] `package.json`의 `prebuild` chain에 `node scripts/generate-toolkit-changelog.mjs`를 추가하되 기존 명령 순서와 실패 semantics를 보존한다.
- [ ] `test/changelog-verification.mjs`에서 compare-link heading, no-link heading, `Unreleased`, subsection priority, cap, noise stripping, fallback contract를 fixture로 검증한다.

## Task Verify

- [ ] `node test/changelog-verification.mjs`
- [ ] `node scripts/generate-toolkit-changelog.mjs`
- [ ] `node scripts/check-message-keys.mjs`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `git diff --check`

## Verification

- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npm run typecheck`)
- [ ] unit tests pass (`node test/changelog-verification.mjs`)
- [ ] integration tests pass (N/A — UI/export verification is `000027-030`)
- [ ] app builds without error (`npm run build`)

## Implementation Notes

