[Back to table of contents](./README.md)

# 19. Full Skill Reference

This page groups the remaining Skills not covered in the previous workflow guides by **what you want to do**. Use it when needed in the middle of each flow: Small/Medium/Large cycle, new project, onboarding, testing, or design.

Find your situation in the table below and click a Skill name to jump straight to its explanation.

| Skill | When to use it |
|---|---|
| [`ywc-handle-pr-reviews`](#respond-to-review-comments-on-an-open-pr-and-clean-up-ciconflicts-too) | Respond to review comments on an open PR and clean up CI/conflicts too |
| [`ywc-create-pr`](#commit-changes-and-open-a-draft-pr) | Commit changes and open a draft PR |
| [`ywc-merge-dependabot`](#clean-up-accumulated-dependabot-prs-at-once) | Clean up accumulated Dependabot PRs at once |
| [`ywc-commit`](#just-commit-the-work-done-so-far) | Just commit the work done so far |
| [`ywc-receive-review`](#you-dont-want-to-accept-a-reviewers-human-or-coderabbitcodexclaude-feedback-unconditionally--you-want-to-verify-it-technically-before-responding) | You don't want to accept a reviewer's (human or CodeRabbit/Codex/Claude) feedback unconditionally — you want to verify it technically before responding |
| [`ywc-brainstorm`](#your-idea-is-not-concrete-yet-and-you-want-to-clarify-it-first) | Your idea is not concrete yet and you want to clarify it first |
| [`ywc-tech-research`](#you-want-to-compare-libraries-or-implementation-approaches-to-decide-what-to-use) | You want to compare libraries or implementation approaches to decide what to use |
| [`ywc-agentic`](#you-want-to-give-one-goal-and-leave-planning-through-implementation-to-run-without-human-intervention) | You want to give one goal and leave planning through implementation to run without human intervention |
| [`ywc-security-audit`](#check-security-vulnerabilities-in-sensitive-code-such-as-authpayment) | Check security vulnerabilities in sensitive code such as auth/payment |
| [`ywc-refactor-clean`](#clean-up-old-dead-code-unused-functionsexportsdependencies) | Clean up old dead code (unused functions/exports/dependencies) |
| [`ywc-impl-review`](#check-implementation-quality-and-maintainability-outside-the-general-cycle-standalone) | Check implementation quality and maintainability outside the general cycle, standalone |
| [`ywc-tdd-ritual`](#you-want-to-strictly-follow-the-documented-red--green--refactor-procedure-while-implementing) | You want to strictly follow the documented RED → GREEN → REFACTOR procedure while implementing |
| [`ywc-verify-done`](#i-want-to-prove-completion-with-explicit-re-runnable-gates) | I want to prove completion with explicit, re-runnable gates |
| [`ywc-e2e-test-strategy`](#you-want-to-automate-a-critical-user-flow-with-playwright-or-check-gaps-in-existing-e2e-coverage) | You want to automate a critical user flow with Playwright, or check gaps in existing E2E coverage |
| [`ywc-product-review`](#you-want-a-review-of-the-project-from-a-businessservice-perspective-not-a-code-perspective) | You want a review of the project from a business/service perspective, not a code perspective |
| [`ywc-review-learnings`](#teach-the-system-about-repeated-code-review-feedback-so-it-does-not-raise-the-same-false-positive-again) | Teach the system about repeated code review feedback so it does not raise the same false positive again |
| [`ywc-mine-review-history`](#i-want-to-scan-many-already-merged-prs-at-once-and-find-review-defects-that-keep-recurring) | I want to scan many already-merged PRs at once and find review defects that keep recurring |
| [`ywc-ubiquitous-language`](#create-or-update-a-domain-glossary-shared-by-developers-domain-experts-and-llms) | Create or update a domain glossary shared by developers, domain experts, and LLMs |
| [`ywc-project-mission`](#record-the-projects-mission-success-criteria-and-non-goals) *(Claude Code only)* | Record the project's mission, success criteria, and non-goals |
| [`ywc-adr`](#i-want-to-record-a-hard-to-reverse-architecture-decision-together-with-the-alternatives-that-were-rejected) *(Claude Code only)* | I want to record a hard-to-reverse architecture decision together with the alternatives that were rejected |
| [`ywc-release-pr-list`](#summarize-the-list-of-merged-prs-included-in-a-release-pr-develop-main-etc) | Summarize the list of merged PRs included in a Release PR (develop->main, etc.) |
| [`ywc-changelog-release-notes`](#write-changelogmd-or-user-facing-release-notes) | Write CHANGELOG.md or user-facing release notes |
| [`ywc-skill-author`](#you-want-to-create-a-new-ywc--skill-or-tidy-upaudit-an-existing-skill-against-the-rules) | You want to create a new ywc-* skill, or tidy up/audit an existing skill against the rules |
| [`ywc-setup-language` / `ywc-setup`](#set-a-persistent-output-language-so-skills-stop-asking-for-language-each-time) | Set a persistent output language so skills stop asking for language each time |
| [`ywc-worktrees`](#you-want-to-create-an-isolated-worktree-path-or-auditclean-it-up) | You want to create an isolated worktree path, or audit/clean it up |
| [`ywc-docker-isolate`](#you-want-to-fix-docker-ports-colliding-across-parallel-worktrees) | You want to fix Docker ports colliding across parallel worktrees |

## When you want to handle PR / Review

### Respond to review comments on an open PR and clean up CI/conflicts too

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
</ToolTabs>
If you omit the PR number, it automatically finds the PR for the current branch. *(Claude Code only)* CodeRabbit "Nitpick comments" (which have no review thread) are also detected and classified like other comments. Addressed items are recorded in a single PR-level comment with hidden markers, so they do not resurface.

### Commit changes and open a draft PR

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
This is already included in the flows from [05](./04-general-cycle-small.md) and [06](./05-general-cycle-medium-large.md), so use it when you want to open only a standalone PR outside those flows.

When a task README or a plan under `docs/ywc-plans/` is found, the PR body gets a `Design Background` section (the goal, plus Alternatives Considered and Trade-offs if the plan has them). `--plan-doc <path.md>` picks the plan explicitly (a repo-relative path inside the repo). `--no-plan-ref` disables the lookup. If both are given, `--plan-doc` wins. If several plans match, the skill lists them and asks you to re-run with `--plan-doc`.

### Clean up accumulated Dependabot PRs at once

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
</ToolTabs>
If you omit `security`, it targets all Dependabot PRs. If you omit `parallel-auto`, it processes PRs sequentially by PR number.

### Just commit the work done so far

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-commit Commit only the authentication-related changes" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-commit Commit only the authentication-related changes" />
  </ToolTabsPanel>
</ToolTabs>
This is not for PR creation or code changes themselves. It is commit-only.

### You don't want to accept a reviewer's (human or CodeRabbit/Codex/Claude) feedback unconditionally — you want to verify it technically before responding

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-receive-review The reviewer says this helper function is unused and should be deleted, but verify that first" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-receive-review The reviewer says this helper function is unused and should be deleted, but verify that first" />
  </ToolTabsPanel>
</ToolTabs>
This blocks the default behavior of agreeing first and implementing second, and treats every piece of feedback as a "suggestion to verify." It's the judgment layer that complements `ywc-handle-pr-reviews`'s automation.

## When you do not have a plan yet, or want it to run to completion without human intervention

### Your idea is not concrete yet and you want to clarify it first

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm I want to build a notification feature but I'm not sure how yet" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm I want to build a notification feature but I'm not sure how yet" />
  </ToolTabsPanel>
</ToolTabs>
Through Socratic dialogue, it derives the goal / constraints / success criteria and 2-3 alternatives, then hands off to `ywc-plan`. Before the hand-off, the design lists its load-bearing premises with evidence (`file:line` and a quoted snippet) and a status of VERIFIED or UNVERIFIED. Unverified premises are recorded as failure modes or moved to out-of-scope, instead of being silently assumed.

### You want to compare libraries or implementation approaches to decide what to use

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research &quot;Hono SSE implementation&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research &quot;Hono SSE implementation&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
</ToolTabs>
Use `--depth` to control research depth (25 summary-only ~ 100 exhaustive) and `--format html` for a self-contained report.

### You want to give one goal and leave planning through implementation to run without human intervention

This has moved to the dedicated `ywc-agentic` page. See [07. Finish automatically from one goal](./06-agentic-autonomous-loop.md) for usage and examples.

## When you want to check quality, security, and the product perspective

### Check security vulnerabilities in sensitive code such as auth/payment

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
</ToolTabs>

### You are stuck because you cannot find the cause of a bug

This has moved to the dedicated page. See [15. Debugging and incident postmortems](./12-debugging-and-incident-postmortem.md) for usage and examples.

### Clean up old dead code (unused functions/exports/dependencies)

This has moved to the dedicated `ywc-refactor-clean` page. See [14. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) for usage and examples.

### Check implementation quality and maintainability outside the general cycle, standalone

This has moved to the dedicated `ywc-impl-review` page. See [14. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) for usage and examples.

### Write a postmortem for a Production incident

This has moved to the dedicated page. See [15. Debugging and incident postmortems](./12-debugging-and-incident-postmortem.md) for usage and examples.

### You want to strictly follow the documented RED → GREEN → REFACTOR procedure while implementing

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tdd-ritual Implement the specific login-failure-reason feature with TDD" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tdd-ritual Implement the specific login-failure-reason feature with TDD" />
  </ToolTabsPanel>
</ToolTabs>
This is the actual skill behind the opt-in `--tdd` procedure mentioned in `ywc-code-gen`, `ywc-sequential-executor`, etc. — it forces a verification step at every RED/GREEN/REFACTOR transition.

### I want to prove completion with explicit, re-runnable gates

`ywc-verify-done` can check completion against a markdown ledger you write. Each gate has a `CHECK:` line (a shell command), an `EXPECT:` line (a substring or a `/regex/` that the output must match), and an `EVIDENCE:` field. Run the ledger with the gate checker:

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="python3 claude-code/skills/ywc-verify-done/scripts/gate-check.py --status gate-ledger.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="python3 &quot;${CODEX_HOME:-$HOME/.codex}/skills/ywc-verify-done/scripts/gate-check.py&quot; --status gate-ledger.md" />
  </ToolTabsPanel>
</ToolTabs>

Dropping `--status` runs the gates, and `--reverify` re-runs everything.

- Exit code 0 means every runnable gate is met.
- A gate with neither `CHECK:` nor `EXPECT:` is manual, and it never blocks.
- A cached PASS is trusted only while the gate text is unchanged.
- Each gate has a 120-second timeout.
- `CHECK:` lines run arbitrary commands with your permissions, so read a ledger you did not write before you run it.

The ledger is optional. The default single-command verification is unchanged. This is available in both tools.

### You want to automate a critical user flow with Playwright, or check gaps in existing E2E coverage

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
</ToolTabs>
Use `--init` to set up Playwright from scratch, or `--audit` to check only the gaps in existing coverage.

### You want a review of the project from a business/service perspective, not a code perspective

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-product-review --format html" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-product-review --format html" />
  </ToolTabsPanel>
</ToolTabs>
Reviews the project from a business angle — user value, UX, growth, risk. Use `ywc-impl-review` for code review, `ywc-security-audit` for security review.

## When you want to accumulate project knowledge (Stateful Skills)

These Skills are not one-off utilities. They manage knowledge that remains in the project after the conversation ends and can be referenced in later sessions.

### Teach the system about repeated code review feedback so it does not raise the same false positive again

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings This comment is a false positive, remember it" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings This comment is a false positive, remember it" />
  </ToolTabsPanel>
</ToolTabs>

### I want to scan many already-merged PRs at once and find review defects that keep recurring

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-mine-review-history --limit 50 --min-recurrence 3" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-mine-review-history --limit 50 --min-recurrence 3" />
  </ToolTabsPanel>
</ToolTabs>
It sweeps bot review comments (CodeRabbit / Codex Review / Claude Review) across N merged PRs, classifies each comment as accepted or dismissed, and clusters them into defect classes. Classes that recur in at least `--min-recurrence` distinct PRs (default 3) are offered to `ywc-review-learnings`. At least one of `--limit` or `--since` is required, because it never scans everything. It never writes `docs/review-learnings.md` itself — promotion goes through the confirmation step in `ywc-review-learnings`. For one open PR, use `ywc-handle-pr-reviews` instead.

### Create or update a domain glossary shared by developers, domain experts, and LLMs

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
</ToolTabs>
`--ddd` adds DDD Type columns such as Entity / Value Object / Aggregate.

### Record the project's mission, success criteria, and non-goals

*(Claude Code only)* Use this to record the project's mission, measurable success criteria, and out-of-scope non-goals in `docs/project-mission.md`. The full flow is in [09. Starting a new Project](./07-starting-a-new-project.md). Use `ywc-project-mission` again to update the mission when the project direction changes.

<CodeBlock label="claude code" code="ywc-project-mission This project's goal is ..." />

### I want to record a hard-to-reverse architecture decision together with the alternatives that were rejected

*(Claude Code only)* `ywc-adr` writes the decision to `docs/adr/NNNN-<slug>.md` with Context, Decision, Alternatives Considered, and Consequences sections. Modes are new / read / list / curate. Record a decision only when it is hard to reverse, surprising without context, and a real trade-off. Never edit an old ADR; to replace one, create a new record with `--supersedes ADR-NNNN`.

<CodeBlock label="claude code" code="ywc-adr --mode new we chose X over Y because ..." />

## When you want to prepare a Release

### Summarize the list of merged PRs included in a Release PR (develop->main, etc.)

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
</ToolTabs>

### Write CHANGELOG.md or user-facing release notes

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>
If you pass `--pr-list <result file from ywc-release-pr-list>`, it uses that list as the source instead of git log.

## When you want to extend the toolkit itself or handle execution infrastructure

### You want to create a new ywc-* skill, or tidy up/audit an existing skill against the rules

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-skill-author I want to create a new skill for handling payment webhook retries" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-skill-author I want to create a new skill for handling payment webhook retries" />
  </ToolTabsPanel>
</ToolTabs>
Validates and aligns a `ywc-*` skill's frontmatter/body/references rules. Use it when creating or restructuring a skill itself, not when editing a skill's content.

### Set a persistent output language so skills stop asking for language each time

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-setup-language ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-setup --scope project --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
Use this when you want generated documents, PR text, and commit messages to keep using the same output language without passing `--lang` on every skill call. It sets a persistent project or user default; it does not change the current chat language.

One-off flags still win. The resolution order is: explicit `--lang` on the consuming skill > persistent project/user default > ask.

- Codex `ywc-setup` also stores collaborator initials (`--initials yk`). `--scope project|user` chooses `.codex/ywc.json` (project) or `~/.codex/ywc.json` (user).
- Claude Code `ywc-setup-language` is language-only. It writes a `## Language Policy` section into `CLAUDE.md`. Initials in Claude Code come from `--initials` or the `## Task Initials` section of `CLAUDE.md` (see [06](./05-general-cycle-medium-large.md#task-ids-and-collaborator-initials)).

### You want to create an isolated worktree path, or audit/clean it up

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>
Usually called internally by `ywc-parallel-executor`, but you can also audit/prune/resolve it directly with `--mode audit`/`prune`/`resolve`.

### You want to fix Docker ports colliding across parallel worktrees

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
</ToolTabs>
The deterministic port-allocation skill that `ywc-parallel-executor` calls automatically for every task worktree — it assigns each worktree its own `COMPOSE_PROJECT_NAME` and port block to prevent "port is already allocated" collisions.

## Skills available in only one tool

Most Skills exist in both tools, but some are provided by only one of them. The table below lists those tool-specific Skills.

| Tool | Skill | What it does |
|---|---|---|
| Codex only | `ywc-wayfinder` | Multi-session discovery for large or uncertain changes: a local map with exactly one active ticket, before planning or implementation |
| Codex only | `ywc-architecture-invariants` | Validates an optional repo-root `architecture-invariants.json` contract against bounded, normalized dependency-edge evidence |
| Codex only | `ywc-implement` | Implements exactly one approved spec or ticket through a focused, review-gated change |
| Codex only | `ywc-team-assemble` | Assembles a specialist team and delegates to subagents when you explicitly ask for it |
| Codex only | `ywc-setup` | Sets the default output language or collaborator initials (Codex counterpart of `ywc-setup-language`) |
| Claude Code only | [`ywc-adr`](#i-want-to-record-a-hard-to-reverse-architecture-decision-together-with-the-alternatives-that-were-rejected) | Records hard-to-reverse decisions with their rejected alternatives (see the section above) |
| Claude Code only | [`ywc-project-mission`](#record-the-projects-mission-success-criteria-and-non-goals) | Records the project's mission, measurable success criteria, and non-goals (see the section above) |
| Claude Code only | `ywc-setup-language` | Sets the persistent output language so `--lang` is not needed every time |

## Full Skill Index (A-Z)

All `ywc-*` skills in this toolkit, listed alphabetically. See each skill's location (a dedicated page, or the situational entry above) for detailed usage.

| Skill | Description | Location |
|---|---|---|
| `ywc-adr` | I want to record a hard-to-reverse architecture decision together with the alternatives that were rejected *(Claude Code only)* | [here](#i-want-to-record-a-hard-to-reverse-architecture-decision-together-with-the-alternatives-that-were-rejected) |
| `ywc-agentic` | You want to give one goal and leave planning through implementation to run without human intervention | [here](#you-want-to-give-one-goal-and-leave-planning-through-implementation-to-run-without-human-intervention) |
| `ywc-architecture-invariants` | Validates an optional repo-root `architecture-invariants.json` contract against bounded, normalized dependency-edge evidence *(Codex only)* | [here](#skills-available-in-only-one-tool) |
| `ywc-auth-implement` | Implement an authentication feature with the policy decisions settled before any code is written | [17](./18-authentication-implementation.md) |
| `ywc-brainstorm` | Your idea is not concrete yet and you want to clarify it first | [here](#your-idea-is-not-concrete-yet-and-you-want-to-clarify-it-first) |
| `ywc-changelog-release-notes` | Write CHANGELOG.md or user-facing release notes | [here](#write-changelogmd-or-user-facing-release-notes) |
| `ywc-code-gen` | Multi-layer code generation skill that generates Backend/Frontend/QA in parallel | [18](./13-executor-and-codegen-patterns.md) |
| `ywc-commit` | Just commit the work done so far | [here](#just-commit-the-work-done-so-far) |
| `ywc-confidence-gate` | A confidence gate that scores PROCEED/REVIEW/STOP to decide whether an artifact can move to the next stage | [07](./06-agentic-autonomous-loop.md) |
| `ywc-create-pr` | Commit changes and open a draft PR | [here](#commit-changes-and-open-a-draft-pr) |
| `ywc-debug-rootcause` | You are stuck because you cannot find the root cause of a bug | [15](./12-debugging-and-incident-postmortem.md) |
| `ywc-design-renew` | Visually de-slop-renews a screen that feels ordinary | [13](./11-design-review.md) |
| `ywc-docker-isolate` | You want to fix Docker ports colliding across parallel worktrees | [here](#you-want-to-fix-docker-ports-colliding-across-parallel-worktrees) |
| `ywc-e2e-test-strategy` | You want to automate a critical user flow with Playwright, or check gaps in existing E2E coverage | [here](#you-want-to-automate-a-critical-user-flow-with-playwright-or-check-gaps-in-existing-e2e-coverage) |
| `ywc-finish-branch` | Finishes a completed feature branch — PR creation through merge and cleanup | [05](./04-general-cycle-small.md) |
| `ywc-gen-testcase` | Generates a manual test document (testsheet) from a spec for PR verification | [11](./09-testing-guide.md) |
| `ywc-handle-pr-reviews` | Respond to review comments on an open PR and clean up CI/conflicts too | [here](#respond-to-review-comments-on-an-open-pr-and-clean-up-ciconflicts-too) |
| `ywc-iac-author` | Turn a finished cloud architecture design into actual Infrastructure-as-Code | [16](./17-infrastructure-and-cloud.md) |
| `ywc-impl-review` | Check implementation quality and maintainability outside the general cycle, standalone | [14](./16-code-structure-and-maintainability.md) |
| `ywc-implement` | Implements exactly one approved spec or ticket through a focused, review-gated change *(Codex only)* | [here](#skills-available-in-only-one-tool) |
| `ywc-incident-postmortem` | A production incident happened and you need to write a postmortem | [15](./12-debugging-and-incident-postmortem.md) |
| `ywc-infra-design` | Design a system's cloud architecture before any IaC exists | [16](./17-infrastructure-and-cloud.md) |
| `ywc-infra-optimize` | Improve or right-size infrastructure that's already running | [16](./17-infrastructure-and-cloud.md) |
| `ywc-infra-review` | Catch misconfiguration, cost, or reliability problems before applying IaC | [16](./17-infrastructure-and-cloud.md) |
| `ywc-merge-dependabot` | Clean up accumulated Dependabot PRs at once | [here](#clean-up-accumulated-dependabot-prs-at-once) |
| `ywc-mine-review-history` | I want to scan many already-merged PRs at once and find review defects that keep recurring | [here](#i-want-to-scan-many-already-merged-prs-at-once-and-find-review-defects-that-keep-recurring) |
| `ywc-onboard-repo` | Onboarding skill that reverse-engineers an unfamiliar repo's conventions into a CLAUDE.md | [10](./08-onboarding-existing-repo.md) |
| `ywc-parallel-executor` | Executes multiple Tasks in parallel using isolated worktrees | [18](./13-executor-and-codegen-patterns.md) |
| `ywc-plan` | Entry-point skill that drafts an implementation plan for a feature or change | [05](./04-general-cycle-small.md) |
| `ywc-product-review` | You want a review of the project from a business/service perspective, not a code perspective | [here](#you-want-a-review-of-the-project-from-a-businessservice-perspective-not-a-code-perspective) |
| `ywc-project-docs` | Generates project docs that follow the docs/ directory structure | [09](./07-starting-a-new-project.md) |
| `ywc-project-mission` | Records the project's mission, measurable success criteria, and non-goals *(Claude Code only)* | [here](#record-the-projects-mission-success-criteria-and-non-goals) |
| `ywc-project-scaffold` | Designs the directory structure for a completely new project | [09](./07-starting-a-new-project.md) |
| `ywc-receive-review` | You don't want to accept a reviewer's (human or CodeRabbit/Codex/Claude) feedback unconditionally — you want to verify it technically before responding | [here](#you-dont-want-to-accept-a-reviewers-human-or-coderabbitcodexclaude-feedback-unconditionally--you-want-to-verify-it-technically-before-responding) |
| `ywc-refactor-clean` | Clean up old dead code (unused functions/exports/dependencies) | [14](./16-code-structure-and-maintainability.md) |
| `ywc-release-pr-list` | Summarize the list of merged PRs included in a Release PR (develop->main, etc.) | [here](#summarize-the-list-of-merged-prs-included-in-a-release-pr-develop-main-etc) |
| `ywc-review-learnings` | Teach the system about repeated code review feedback so it does not raise the same false positive again | [here](#teach-the-system-about-repeated-code-review-feedback-so-it-does-not-raise-the-same-false-positive-again) |
| `ywc-security-audit` | Check security vulnerabilities in sensitive code such as auth/payment | [here](#check-security-vulnerabilities-in-sensitive-code-such-as-authpayment) |
| `ywc-sequential-executor` | Executes multiple Tasks one at a time, in order | [18](./13-executor-and-codegen-patterns.md) |
| `ywc-setup` | Set a persistent output language so skills stop asking for language each time *(Codex only)* | [here](#set-a-persistent-output-language-so-skills-stop-asking-for-language-each-time) |
| `ywc-setup-language` | Set a persistent output language so skills stop asking for language each time *(Claude Code only)* | [here](#set-a-persistent-output-language-so-skills-stop-asking-for-language-each-time) |
| `ywc-skill-author` | You want to create a new ywc-* skill, or tidy up/audit an existing skill against the rules | [here](#you-want-to-create-a-new-ywc--skill-or-tidy-upaudit-an-existing-skill-against-the-rules) |
| `ywc-spec-ready` | Gate that verifies a spec document is ready to implement | [06](./05-general-cycle-medium-large.md) |
| `ywc-spec-validate` | Checks a spec document for contradictions and gaps | [06](./05-general-cycle-medium-large.md) |
| `ywc-spec-writer` | Writes a PRD/spec document | [09](./07-starting-a-new-project.md) |
| `ywc-task-generator` | Decomposes a spec into executable Tasks | [06](./05-general-cycle-medium-large.md) |
| `ywc-tdd-ritual` | You want to strictly follow the documented RED → GREEN → REFACTOR procedure while implementing | [here](#you-want-to-strictly-follow-the-documented-red--green--refactor-procedure-while-implementing) |
| `ywc-team-assemble` | Assembles a specialist team and delegates to subagents when you explicitly ask for it *(Codex only)* | [here](#skills-available-in-only-one-tool) |
| `ywc-tech-research` | You want to compare libraries or implementation approaches to decide what to use | [here](#you-want-to-compare-libraries-or-implementation-approaches-to-decide-what-to-use) |
| `ywc-ubiquitous-language` | Create or update a domain glossary shared by developers, domain experts, and LLMs | [here](#create-or-update-a-domain-glossary-shared-by-developers-domain-experts-and-llms) |
| `ywc-ui-ux-review` | Checks screen usability and accessibility | [13](./11-design-review.md) |
| `ywc-verify-done` | Mechanically verifies completion by running lint/typecheck/test/build | [here](#i-want-to-prove-completion-with-explicit-re-runnable-gates) |
| `ywc-wayfinder` | Multi-session discovery for large or uncertain changes: a local map with exactly one active ticket, before planning or implementation *(Codex only)* | [here](#skills-available-in-only-one-tool) |
| `ywc-worktrees` | You want to create an isolated worktree path, or audit/clean it up | [here](#you-want-to-create-an-isolated-worktree-path-or-auditclean-it-up) |

---

[Previous: 18. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) · [Back to table of contents »](./README.md)
