[Back to table of contents](./README.md)

# 14. Full Skill Reference

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
| [`ywc-improve-architecture`](#restructure-a-tangled-shallow-module-structure-into-a-deep-module) | Restructure a tangled shallow module structure into a deep module |
| [`ywc-impl-review`](#check-implementation-quality-and-maintainability-outside-the-general-cycle-standalone) | Check implementation quality and maintainability outside the general cycle, standalone |
| [`ywc-agent-legibility-audit`](#measure-the-token-cost-and-legibility-of-code-from-an-agents-perspective) | Measure the token cost and legibility of code from an agent's perspective |
| [`ywc-tdd-ritual`](#you-want-to-strictly-follow-the-documented-red--green--refactor-procedure-while-implementing) | You want to strictly follow the documented RED → GREEN → REFACTOR procedure while implementing |
| [`ywc-e2e-test-strategy`](#you-want-to-automate-a-critical-user-flow-with-playwright-or-check-gaps-in-existing-e2e-coverage) | You want to automate a critical user flow with Playwright, or check gaps in existing E2E coverage |
| [`ywc-product-review`](#you-want-a-review-of-the-project-from-a-businessservice-perspective-not-a-code-perspective) | You want a review of the project from a business/service perspective, not a code perspective |
| [`ywc-review-learnings`](#teach-the-system-about-repeated-code-review-feedback-so-it-does-not-raise-the-same-false-positive-again) | Teach the system about repeated code review feedback so it does not raise the same false positive again |
| [`ywc-ubiquitous-language`](#create-or-update-a-domain-glossary-shared-by-developers-domain-experts-and-llms) | Create or update a domain glossary shared by developers, domain experts, and LLMs |
| [`ywc-mission`](#record-the-projects-why-and-rejected-approaches) | Record the project's why and rejected approaches |
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

This has moved to the dedicated page. See [12. Debugging and incident postmortems](./12-debugging-and-incident-postmortem.md) for usage and examples.

### Clean up old dead code (unused functions/exports/dependencies)

This has moved to the dedicated `ywc-refactor-clean` page. See [16. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) for usage and examples.

### Restructure a tangled shallow module structure into a deep module

This has moved to the dedicated `ywc-improve-architecture` page. See [16. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) for usage and examples.

### Check implementation quality and maintainability outside the general cycle, standalone

This has moved to the dedicated `ywc-impl-review` page. See [16. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) for usage and examples.

### Measure the token cost and legibility of code from an agent's perspective

This has moved to the dedicated `ywc-agent-legibility-audit` page. See [16. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) for usage and examples.

### Write a postmortem for a Production incident

This has moved to the dedicated page. See [12. Debugging and incident postmortems](./12-debugging-and-incident-postmortem.md) for usage and examples.

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
    <CodeBlock label="claude code" code="ywc-mission This project's goal is ..." />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-mission This project's goal is ..." />
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

## Full Skill Index (A-Z)

All `ywc-*` skills in this toolkit, listed alphabetically. See each skill's location (a dedicated page, or the situational entry above) for detailed usage.

| Skill | Description | Location |
|---|---|---|
| `ywc-agent-legibility-audit` | Measure the token cost and legibility of code from an agent's perspective | [16](./16-code-structure-and-maintainability.md) |
| `ywc-agentic` | You want to give one goal and leave planning through implementation to run without human intervention | [here](#you-want-to-give-one-goal-and-leave-planning-through-implementation-to-run-without-human-intervention) |
| `ywc-brainstorm` | Your idea is not concrete yet and you want to clarify it first | [here](#your-idea-is-not-concrete-yet-and-you-want-to-clarify-it-first) |
| `ywc-changelog-release-notes` | Write CHANGELOG.md or user-facing release notes | [here](#write-changelogmd-or-user-facing-release-notes) |
| `ywc-code-gen` | Multi-layer code generation skill that generates Backend/Frontend/QA in parallel | [13](./13-executor-and-codegen-patterns.md) |
| `ywc-commit` | Just commit the work done so far | [here](#just-commit-the-work-done-so-far) |
| `ywc-confidence-gate` | A confidence gate that scores PROCEED/REVIEW/STOP to decide whether an artifact can move to the next stage | [06](./06-agentic-autonomous-loop.md) |
| `ywc-create-pr` | Commit changes and open a draft PR | [here](#commit-changes-and-open-a-draft-pr) |
| `ywc-debug-rootcause` | You are stuck because you cannot find the root cause of a bug | [12](./12-debugging-and-incident-postmortem.md) |
| `ywc-design-renew` | Visually de-slop-renews a screen that feels ordinary | [11](./11-design-review.md) |
| `ywc-docker-isolate` | You want to fix Docker ports colliding across parallel worktrees | [here](#you-want-to-fix-docker-ports-colliding-across-parallel-worktrees) |
| `ywc-e2e-test-strategy` | You want to automate a critical user flow with Playwright, or check gaps in existing E2E coverage | [here](#you-want-to-automate-a-critical-user-flow-with-playwright-or-check-gaps-in-existing-e2e-coverage) |
| `ywc-finish-branch` | Finishes a completed feature branch — PR creation through merge and cleanup | [04](./04-general-cycle-small.md) |
| `ywc-gen-testcase` | Generates a manual test document (testsheet) from a spec for PR verification | [09](./09-testing-guide.md) |
| `ywc-handle-pr-reviews` | Respond to review comments on an open PR and clean up CI/conflicts too | [here](#respond-to-review-comments-on-an-open-pr-and-clean-up-ciconflicts-too) |
| `ywc-impl-review` | Check implementation quality and maintainability outside the general cycle, standalone | [16](./16-code-structure-and-maintainability.md) |
| `ywc-improve-architecture` | Restructure a tangled shallow module structure into a deep module | [16](./16-code-structure-and-maintainability.md) |
| `ywc-incident-postmortem` | A production incident happened and you need to write a postmortem | [12](./12-debugging-and-incident-postmortem.md) |
| `ywc-merge-dependabot` | Clean up accumulated Dependabot PRs at once | [here](#clean-up-accumulated-dependabot-prs-at-once) |
| `ywc-mission` | Record the project's why and rejected approaches | [here](#record-the-projects-why-and-rejected-approaches) |
| `ywc-onboard-repo` | Onboarding skill that reverse-engineers an unfamiliar repo's conventions into a CLAUDE.md | [08](./08-onboarding-existing-repo.md) |
| `ywc-parallel-executor` | Executes multiple Tasks in parallel using isolated worktrees | [13](./13-executor-and-codegen-patterns.md) |
| `ywc-plan` | Entry-point skill that drafts an implementation plan for a feature or change | [04](./04-general-cycle-small.md) |
| `ywc-product-review` | You want a review of the project from a business/service perspective, not a code perspective | [here](#you-want-a-review-of-the-project-from-a-businessservice-perspective-not-a-code-perspective) |
| `ywc-project-docs` | Generates project docs that follow the docs/ directory structure | [07](./07-starting-a-new-project.md) |
| `ywc-project-scaffold` | Designs the directory structure for a completely new project | [07](./07-starting-a-new-project.md) |
| `ywc-receive-review` | You don't want to accept a reviewer's (human or CodeRabbit/Codex/Claude) feedback unconditionally — you want to verify it technically before responding | [here](#you-dont-want-to-accept-a-reviewers-human-or-coderabbitcodexclaude-feedback-unconditionally--you-want-to-verify-it-technically-before-responding) |
| `ywc-refactor-clean` | Clean up old dead code (unused functions/exports/dependencies) | [16](./16-code-structure-and-maintainability.md) |
| `ywc-release-pr-list` | Summarize the list of merged PRs included in a Release PR (develop->main, etc.) | [here](#summarize-the-list-of-merged-prs-included-in-a-release-pr-develop-main-etc) |
| `ywc-review-learnings` | Teach the system about repeated code review feedback so it does not raise the same false positive again | [here](#teach-the-system-about-repeated-code-review-feedback-so-it-does-not-raise-the-same-false-positive-again) |
| `ywc-security-audit` | Check security vulnerabilities in sensitive code such as auth/payment | [here](#check-security-vulnerabilities-in-sensitive-code-such-as-authpayment) |
| `ywc-sequential-executor` | Executes multiple Tasks one at a time, in order | [13](./13-executor-and-codegen-patterns.md) |
| `ywc-setup` | Set a persistent output language so skills stop asking for language each time | [here](#set-a-persistent-output-language-so-skills-stop-asking-for-language-each-time) |
| `ywc-skill-author` | You want to create a new ywc-* skill, or tidy up/audit an existing skill against the rules | [here](#you-want-to-create-a-new-ywc--skill-or-tidy-upaudit-an-existing-skill-against-the-rules) |
| `ywc-spec-ready` | Gate that verifies a spec document is ready to implement | [05](./05-general-cycle-medium-large.md) |
| `ywc-spec-validate` | Checks a spec document for contradictions and gaps | [05](./05-general-cycle-medium-large.md) |
| `ywc-spec-writer` | Writes a PRD/spec document | [07](./07-starting-a-new-project.md) |
| `ywc-task-generator` | Decomposes a spec into executable Tasks | [05](./05-general-cycle-medium-large.md) |
| `ywc-tdd-ritual` | You want to strictly follow the documented RED → GREEN → REFACTOR procedure while implementing | [here](#you-want-to-strictly-follow-the-documented-red--green--refactor-procedure-while-implementing) |
| `ywc-tech-research` | You want to compare libraries or implementation approaches to decide what to use | [here](#you-want-to-compare-libraries-or-implementation-approaches-to-decide-what-to-use) |
| `ywc-ubiquitous-language` | Create or update a domain glossary shared by developers, domain experts, and LLMs | [here](#create-or-update-a-domain-glossary-shared-by-developers-domain-experts-and-llms) |
| `ywc-ui-ux-review` | Checks screen usability and accessibility | [11](./11-design-review.md) |
| `ywc-verify-done` | Mechanically verifies completion by running lint/typecheck/test/build | [06](./06-agentic-autonomous-loop.md) |
| `ywc-worktrees` | You want to create an isolated worktree path, or audit/clean it up | [here](#you-want-to-create-an-isolated-worktree-path-or-auditclean-it-up) |

---

[Previous: 13. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) - [Next: 15. Prerequisites and installation](./15-prerequisites-installation.md)
