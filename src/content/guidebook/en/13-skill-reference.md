[Back to table of contents](./README.md)

# 13. Full Skill Reference

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
| [`ywc-debug-rootcause`](#you-are-stuck-because-you-cannot-find-the-cause-of-a-bug) | You are stuck because you cannot find the cause of a bug |
| [`ywc-refactor-clean`](#clean-up-old-dead-code-unused-functionsexportsdependencies) | Clean up old dead code (unused functions/exports/dependencies) |
| [`ywc-incident-postmortem`](#write-a-postmortem-for-a-production-incident) | Write a postmortem for a Production incident |
| [`ywc-tdd-ritual`](#you-want-to-strictly-follow-the-documented-red--green--refactor-procedure-while-implementing) | You want to strictly follow the documented RED → GREEN → REFACTOR procedure while implementing |
| [`ywc-e2e-test-strategy`](#you-want-to-automate-a-critical-user-flow-with-playwright-or-check-gaps-in-existing-e2e-coverage) | You want to automate a critical user flow with Playwright, or check gaps in existing E2E coverage |
| [`ywc-product-review`](#you-want-a-review-of-the-project-from-a-businessservice-perspective-not-a-code-perspective) | You want a review of the project from a business/service perspective, not a code perspective |
| [`ywc-review-learnings`](#teach-the-system-about-repeated-code-review-feedback-so-it-does-not-raise-the-same-false-positive-again) | Teach the system about repeated code review feedback so it does not raise the same false positive again |
| [`ywc-ubiquitous-language`](#create-or-update-a-domain-glossary-shared-by-developers-domain-experts-and-llms) | Create or update a domain glossary shared by developers, domain experts, and LLMs |
| [`ywc-project-mission`](#record-the-projects-why-and-rejected-approaches) | Record the project's why and rejected approaches |
| [`ywc-release-pr-list`](#summarize-the-list-of-merged-prs-included-in-a-release-pr-develop-main-etc) | Summarize the list of merged PRs included in a Release PR (develop->main, etc.) |
| [`ywc-changelog-release-notes`](#write-changelogmd-or-user-facing-release-notes) | Write CHANGELOG.md or user-facing release notes |
| [`ywc-skill-author`](#you-want-to-create-a-new-ywc--skill-or-tidy-upaudit-an-existing-skill-against-the-rules) | You want to create a new ywc-* skill, or tidy up/audit an existing skill against the rules |
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
If you omit the PR number, it automatically finds the PR for the current branch.

### Commit changes and open a draft PR

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
This is already included in the flows from [04](./04-general-cycle-small.md) and [05](./05-general-cycle-medium-large.md), so use it when you want to open only a standalone PR outside those flows.

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
Through Socratic dialogue, it derives the goal / constraints / success criteria and 2-3 alternatives, then hands off to `ywc-plan`.

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

This has moved to the dedicated `ywc-agentic` page. See [06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) for usage and examples.

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

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-debug-rootcause The payment webhook is sometimes processed twice. I can't find the cause" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-debug-rootcause The payment webhook is sometimes processed twice. I can't find the cause" />
  </ToolTabsPanel>
</ToolTabs>
This prevents patches that only address symptoms and forces a four-step root-cause investigation. If fixes fail at the same point three or more times, it guides you to question the architecture itself.

### Clean up old dead code (unused functions/exports/dependencies)

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
</ToolTabs>

### Write a postmortem for a Production incident

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
</ToolTabs>
`--client` additionally creates a customer-facing summary that omits internal details.

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

### Record the project's why and rejected approaches

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission This project's goal is ..." />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission This project's goal is ..." />
  </ToolTabsPanel>
</ToolTabs>
This is already covered in [07. Starting a new Project](./07-starting-a-new-project.md), and can also be reused when the project direction changes.

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

---

[Previous: 12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md) - [Next: 14. Prerequisites and installation](./14-prerequisites-installation.md)
