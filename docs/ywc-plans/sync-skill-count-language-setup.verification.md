# Sync Skill Count & Language-Setup Verification

> Verified: 2026-07-03
> Target upstream repo: `yongwoon/ywc-agent-toolkit`
> Upstream PR: `#125`

## Question-First Gate

No rewrite-forcing ambiguity was identified after reading:

- `tasks/000008-010-config-verify-upstream-language-setup-status/task.md`
- `docs/ywc-plans/sync-skill-count-language-setup.md`

This task has no public API, schema, library choice, or interface contract. It creates only this verification artifact.

## Hardening Note

RED-first exception: documentation-only verification artifact. No production behavior, executable code, public API, shared module boundary, or critical data-integrity surface is changed.

## PR #125 Status

Command:

```bash
gh pr view 125 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt
```

Output:

```json
{"mergedAt":"2026-07-03T11:48:54Z","state":"MERGED"}
```

Result: PR #125 is merged. The stop condition does not apply. Phase 000009 tasks are not blocked by the PR merge-status gate.

## Skill Count Evidence

Counting rule: count actual skill directories under each tool's `skills/` directory. Exclude non-skill support directories and root docs (`scripts`, `references`, `CLAUDE.md`, `README.md`).

Claude Code command:

```bash
gh api repos/yongwoon/ywc-agent-toolkit/contents/claude-code/skills --jq '[.[] | select(.type == "dir" and .name != "scripts" and .name != "references") | .name] | {count:length,names:.}'
```

Claude Code output:

```json
{"count":42,"names":["ywc-agentic","ywc-brainstorm","ywc-changelog-release-notes","ywc-code-gen","ywc-commit","ywc-confidence-gate","ywc-create-pr","ywc-debug-rootcause","ywc-design-renew","ywc-docker-isolate","ywc-e2e-test-strategy","ywc-finish-branch","ywc-gen-testcase","ywc-handle-pr-reviews","ywc-impl-review","ywc-incident-postmortem","ywc-merge-dependabot","ywc-onboard-repo","ywc-parallel-executor","ywc-plan","ywc-product-review","ywc-project-docs","ywc-project-mission","ywc-project-scaffold","ywc-receive-review","ywc-refactor-clean","ywc-release-pr-list","ywc-review-learnings","ywc-security-audit","ywc-sequential-executor","ywc-setup-language","ywc-skill-author","ywc-spec-ready","ywc-spec-validate","ywc-spec-writer","ywc-task-generator","ywc-tdd-ritual","ywc-tech-research","ywc-ubiquitous-language","ywc-ui-ux-review","ywc-verify-done","ywc-worktrees"]}
```

Codex command:

```bash
gh api repos/yongwoon/ywc-agent-toolkit/contents/codex/skills --jq '[.[] | select(.type == "dir" and .name != "scripts" and .name != "references") | .name] | {count:length,names:.}'
```

Codex output:

```json
{"count":42,"names":["ywc-agentic","ywc-brainstorm","ywc-changelog-release-notes","ywc-code-gen","ywc-commit","ywc-confidence-gate","ywc-create-pr","ywc-debug-rootcause","ywc-design-renew","ywc-docker-isolate","ywc-e2e-test-strategy","ywc-finish-branch","ywc-gen-testcase","ywc-handle-pr-reviews","ywc-impl-review","ywc-incident-postmortem","ywc-merge-dependabot","ywc-onboard-repo","ywc-parallel-executor","ywc-plan","ywc-product-review","ywc-project-docs","ywc-project-scaffold","ywc-receive-review","ywc-refactor-clean","ywc-release-pr-list","ywc-review-learnings","ywc-security-audit","ywc-sequential-executor","ywc-setup","ywc-skill-author","ywc-spec-ready","ywc-spec-validate","ywc-spec-writer","ywc-task-generator","ywc-tdd-ritual","ywc-team-assemble","ywc-tech-research","ywc-ubiquitous-language","ywc-ui-ux-review","ywc-verify-done","ywc-worktrees"]}
```

## Convergence / Divergence

- Claude Code skill count: 42
- Codex skill count: 42
- Verdict: converged. There is no Claude Code/Codex skill-count divergence after PR #125 merged.

## New Language-Setup Skill Names

Claude Code final skill name: `ywc-setup-language`

Claude Code `SKILL.md` description:

> `(ywc) Use when the user wants to set or inspect the persistent output language for ywc-generated documents, PRs, and commit messages so they stop passing --lang on every call.`

Codex final skill name: `ywc-setup`

Codex `SKILL.md` description:

> `(ywc) Use when configuring the default output language for Codex ywc skills.`

## Downstream Decision

Use 42 as the merged upstream skill count for both Claude Code and Codex in Phase 000009 tasks. Because the counts converged, downstream tasks should follow the converged-count branch rather than the divergent-count blocking branch.
