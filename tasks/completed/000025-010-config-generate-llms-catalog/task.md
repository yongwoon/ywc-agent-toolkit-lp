# 000025-010-config-generate-llms-catalog — Implementation Checklist

## Prerequisites

- [ ] `000024-010-test-verify-guidebook-auth-implement-build` is completed and merged
- [ ] `gray-matter` remains available in `package.json`
- [ ] upstream `ywc-agent-toolkit` README/agent catalog를 재확인하고, v1 fetch ref는 명세 기본값인 `main`으로 확정

## Allowed Edit Scope

- [ ] `scripts/generate-llms-txt.mjs`, `src/data/agent-catalog.json`, `public/llms.txt`, `package.json`의 `prebuild`만 수정한다.
- [ ] 다른 task Ownership로 확장되면 중단하고 보고한다.

## Stop Conditions

- [ ] GitHub API contract 또는 cache schema가 명세와 달라져야 하면 중단한다.
- [ ] `package.json`의 sibling prebuild 변경을 안전하게 병합할 수 없으면 중단하고 보고한다.
- [ ] empty cache만 남아 fallback catalog를 보장할 수 없으면 중단한다.

## Hardening Gate

- [ ] Task를 generated-file/config + behavior-change로 분류한다.
- [ ] Production edit 전에 forced network failure, deterministic render, schema assertion을 RED-first 대체 증거로 기록한다.
- [ ] `agent-catalog.json`과 renderer 사이의 field contract를 먼저 기록한다.
- [ ] Data Integrity trigger는 N/A로 기록한다. 파일 write는 deterministic single-process build output이다.
- [ ] Critical surface review는 N/A이다.

## Implementation Steps

- [ ] `scripts/generate-llms-txt.mjs`에 recursive Trees API 1회 조회, `claude-code/skills/*/SKILL.md`, `codex/skills/*/SKILL.md`, 두 tool의 agent `.md` filtering과 제외 filename 규칙을 구현한다.
  - raw URL은 `main/<path>`를 사용하고 concurrency cap 8 및 request timeout을 적용한다.
  - frontmatter `name`을 canonical name으로 사용하고 `description`에서 `Triggers:`/`Do not use for:` 이후를 제거한 뒤 sentence boundary와 160자 cap을 적용한다.
- [ ] `src/data/agent-catalog.json`의 `generatedAt`, `sourceCommit`, `entries` schema를 작성하고 성공 시에만 새 catalog를 commit 가능한 형태로 저장한다.
  - 동일 name을 tool/path 기준으로 보존하고, malformed description은 name fallback과 warning을 사용한다.
- [ ] cache를 입력으로 `public/llms.txt`를 deterministic하게 render한다.
  - live/cached catalog count를 blockquote에 반영하고 4개 tool/kind section과 canonical GitHub blob link를 출력한다.
- [ ] tree/raw fetch 실패, timeout, zero match에서 기존 cache로 render하고 process를 성공 종료하도록 구현한다.
- [ ] `package.json` `prebuild` chain에 `node scripts/generate-llms-txt.mjs`를 추가하고 기존 command 순서를 보존한다.

## Task Verify

- [ ] `npm run prebuild`
- [ ] `node scripts/generate-llms-txt.mjs`
- [ ] `node -e "const c=require('./src/data/agent-catalog.json'); if(!Array.isArray(c.entries)||!c.entries.length) process.exit(1)"`
- [ ] forced network failure에서 prebuild가 성공하고 `public/llms.txt`가 cache로 재생성되는지 확인
- [ ] `git diff --check`

## Verification

- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (N/A — no test runner configured)
- [ ] integration tests pass (handled by `000026-020`)
- [ ] app builds without error (`npm run build`)

## Implementation Notes

