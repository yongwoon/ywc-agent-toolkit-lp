# ywc Skill & Agent Guidebook

> This Guidebook is a user manual reorganized for people encountering `ywc-*` Skills and Agents for the first time. Each page is written with conversion into a standalone web documentation page in mind, and the table of contents below is also the site's sidebar structure.

## How to read this Guidebook

- If this is your first time, follow the **Getting Started** sequence as-is (01 -> 02 -> 03).
- If you already know the basic concepts and are looking for a specific task, jump directly to the relevant page in **Workflow Guides**.
- Skills with many options that make you look up syntax repeatedly are collected in **Reference**, centered around command examples.

## What are you trying to do? (Quick links by goal)

This is organized around **what you are trying to do now**, not "which Skills exist." Find your situation below and jump straight in.

| What you want to do | Starting Skill | Guide |
|---|---|---|
| Fix a bug or add one small feature | `ywc-plan` | [03](./03-quickstart.md), [04](./04-general-cycle-small.md) |
| Build a larger feature that needs to be split into multiple Tasks | `ywc-plan` -> `ywc-task-generator` | [05](./05-general-cycle-medium-large.md) |
| Give one goal and have the system finish from planning through implementation automatically | `ywc-agentic` | [06](./06-agentic-autonomous-loop.md) |
| Design a completely new project from scratch | `ywc-project-scaffold` | [07](./07-starting-a-new-project.md) |
| Understand an unfamiliar repo/codebase for the first time | `ywc-onboard-repo` | [08](./08-onboarding-existing-repo.md) |
| Execute Tasks that are already decomposed (sequential/parallel) | `ywc-sequential-executor` / `ywc-parallel-executor` | [13](./13-executor-and-codegen-patterns.md) |
| Clarify an idea that is not concrete yet | `ywc-brainstorm` | [14](./14-skill-reference.md) |
| Create a manual test document for PR verification | `ywc-gen-testcase` | [09](./09-testing-guide.md) |
| Set up or expand E2E test automation | `ywc-e2e-test-strategy` | [10](./10-e2e-test-strategy.md) |
| Check screen usability or accessibility | `ywc-ui-ux-review` | [11](./11-design-review.md) |
| Improve a screen that feels visually ordinary | `ywc-design-renew` | [11](./11-design-review.md) |
| Check code for security vulnerabilities | `ywc-security-audit` | [14](./14-skill-reference.md) |
| You are stuck because you cannot find the root cause of a bug | `ywc-debug-rootcause` | [12](./12-debugging-and-incident-postmortem.md) |
| A production incident happened and you need to write a postmortem | `ywc-incident-postmortem` | [12](./12-debugging-and-incident-postmortem.md) |
| Clean up old dead code | `ywc-refactor-clean` | [14](./14-skill-reference.md) |
| Respond to review comments on an open PR | `ywc-handle-pr-reviews` | [14](./14-skill-reference.md) |
| Clean up a backlog of Dependabot PRs at once | `ywc-merge-dependabot` | [14](./14-skill-reference.md) |
| Write a CHANGELOG or release note | `ywc-changelog-release-notes` | [14](./14-skill-reference.md) |
| Just commit the work done so far | `ywc-commit` | [14](./14-skill-reference.md) |
| Structure is tangled or implementation quality is poor from a maintainability standpoint | `ywc-improve-architecture` | [14](./14-skill-reference.md) |
| Compare libraries or implementation approaches to decide what to use | `ywc-tech-research` | [14](./14-skill-reference.md) |
| Manage knowledge (glossary/review learnings/mission) that persists in the project after the conversation ends | `ywc-ubiquitous-language` | [14](./14-skill-reference.md) |

For situations not covered in this table, see [14. Full Skill Reference](./14-skill-reference.md).

## Table of contents

### Prologue

| Page | Description |
|---|---|
| [01. Introduction](./01-introduction.md) | What this Skill/Agent ecosystem is, who it is for, and what problems it solves |
| [02. Core concepts](./02-core-concepts.md) | Terms such as Skill / Agent / Executor / Task, invocation syntax, and the four completion states such as `DONE` |

### Getting Started

| Page | Description |
|---|---|
| [03. Ship your first feature in 5 minutes](./03-quickstart.md) | The first hands-on exercise, following one small feature from idea to merge |

### Workflow Guides

| Page | Description |
|---|---|
| [04. Handling a small change (general cycle - small)](./04-general-cycle-small.md) | The standard flow for a change that finishes as a single PR without Task decomposition |
| [05. Handling work split into multiple Tasks (general cycle - medium/large)](./05-general-cycle-medium-large.md) | The flow for changes that need spec validation and Task decomposition |
| [06. Finish automatically from one goal (ywc-agentic)](./06-agentic-autonomous-loop.md) | Instead of the manual control in 04/05, automatically repeat Plan -> Execute -> Evaluate -> Repeat from a single goal |
| [07. Starting a new Project](./07-starting-a-new-project.md) | From a blank slate to project design and the first completed spec |
| [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) | An onboarding flow that reverse-engineers conventions from an unfamiliar codebase and creates `CLAUDE.md` |
| [09. Writing and running Tests](./09-testing-guide.md) | How to operate manual verification testsheets together with automated tests |
| [10. E2E Test automation strategy](./10-e2e-test-strategy.md) | An advanced guide to setting up, expanding, and maintaining a Playwright-based E2E Suite |
| [11. Reviewing and improving design](./11-design-review.md) | How to distinguish and apply usability audits and visual De-slop Renewal |
| [12. Debugging and incident postmortems](./12-debugging-and-incident-postmortem.md) | How ywc-debug-rootcause drives a root-cause investigation and ywc-incident-postmortem writes the follow-up report |

### Reference

| Page | Description |
|---|---|
| [13. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) | Practical command examples for option-heavy `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` |
| [14. Full Skill Reference](./14-skill-reference.md) | An index of the remaining Skills not covered in the guides above, organized by situation |

## Source material

All command syntax and options in this Guidebook were verified against each Skill's `SKILL.md` (`claude-code/skills/<skill-name>/SKILL.md`). If an option seems different from the actual behavior, that Skill's `SKILL.md` is the current source of truth. This document is a user-friendly secondary presentation of that material.
