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
| Execute Tasks that are already decomposed (sequential/parallel) | `ywc-sequential-executor` / `ywc-parallel-executor` | [16](./13-executor-and-codegen-patterns.md) |
| Clarify an idea that is not concrete yet | `ywc-brainstorm` | [17](./14-skill-reference.md) |
| Create a manual test document for PR verification | `ywc-gen-testcase` | [09](./09-testing-guide.md) |
| Set up or expand E2E test automation | `ywc-e2e-test-strategy` | [10](./10-e2e-test-strategy.md) |
| Check screen usability or accessibility | `ywc-ui-ux-review` | [11](./11-design-review.md) |
| Improve a screen that feels visually ordinary | `ywc-design-renew` | [11](./11-design-review.md) |
| Check code for security vulnerabilities | `ywc-security-audit` | [17](./14-skill-reference.md) |
| Implement an authentication feature (login, OAuth, MFA) | `ywc-auth-implement` | [15](./18-authentication-implementation.md) |
| You are stuck because you cannot find the root cause of a bug | `ywc-debug-rootcause` | [12](./12-debugging-and-incident-postmortem.md) |
| A production incident happened and you need to write a postmortem | `ywc-incident-postmortem` | [12](./12-debugging-and-incident-postmortem.md) |
| Clean up old dead code | `ywc-refactor-clean` | [13](./16-code-structure-and-maintainability.md) |
| Respond to review comments on an open PR | `ywc-handle-pr-reviews` | [17](./14-skill-reference.md) |
| Clean up a backlog of Dependabot PRs at once | `ywc-merge-dependabot` | [17](./14-skill-reference.md) |
| Write a CHANGELOG or release note | `ywc-changelog-release-notes` | [17](./14-skill-reference.md) |
| Just commit the work done so far | `ywc-commit` | [17](./14-skill-reference.md) |
| Structure is tangled or implementation quality is poor from a maintainability standpoint | `ywc-improve-architecture` | [13](./16-code-structure-and-maintainability.md) |
| Compare libraries or implementation approaches to decide what to use | `ywc-tech-research` | [17](./14-skill-reference.md) |
| Manage knowledge (glossary/review learnings/mission) that persists in the project after the conversation ends | `ywc-ubiquitous-language` | [17](./14-skill-reference.md) |

For situations not covered in this table, see [17. Full Skill Reference](./14-skill-reference.md).

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
| [13. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) | How to use the 4 Skills that clean up, restructure, and verify code with poor structure or maintainability, and the order they work together in |
| [14. Managing Cloud Infrastructure](./17-infrastructure-and-cloud.md) | A decision table and 4-step pipeline for `ywc-infra-design`, `ywc-iac-author`, `ywc-infra-review`, and `ywc-infra-optimize`, dispatching to the `ywc-cloud-engineer` agent |
| [15. Implementing Authentication](./18-authentication-implementation.md) | How `ywc-auth-implement` runs the preflight -> policy interview -> recommendation -> dispatch flow, and the security / E2E / PR gates it enforces |

### Reference

| Page | Description |
|---|---|
| [16. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) | Practical command examples for option-heavy `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` |
| [17. Full Skill Reference](./14-skill-reference.md) | An index of the remaining Skills not covered in the guides above, organized by situation |
| [18. Prerequisites and installation](./15-prerequisites-installation.md) | The required and optional tools you need in place before ywc-* Skills run reliably |

## Source material

All command syntax and options in this Guidebook were verified against each Skill's `SKILL.md` (`claude-code/skills/<skill-name>/SKILL.md`). If an option seems different from the actual behavior, that Skill's `SKILL.md` is the current source of truth. This document is a user-friendly secondary presentation of that material.
