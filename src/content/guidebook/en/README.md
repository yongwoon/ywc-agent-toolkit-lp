# ywc Skill & Agent Guidebook

> This Guidebook is a user manual reorganized for people encountering `ywc-*` Skills and Agents for the first time. Each page is written with conversion into a standalone web documentation page in mind, and the table of contents below is also the site's sidebar structure.

## How to read this Guidebook

- If this is your first time, follow **Getting started** after the Prologue (01 -> 02 -> 03 -> 04), then read **Core pipeline** (05-08).
- If you already know the basic concepts and are looking for a specific task, jump to the matching page in **Starting a project**, **Quality and verification**, or **Operations and specialized domains**.
- Skills with many options that make you look up syntax repeatedly are collected in **Reference**, centered around command examples.

## What are you trying to do? (Quick links by goal)

This is organized around **what you are trying to do now**, not "which Skills exist." Find your situation below and jump straight in.

### Plan and build

| What you want to do | Starting Skill | Guide |
|---|---|---|
| Fix a bug or add one small feature | `ywc-plan` | [04](./03-quickstart.md), [05](./04-general-cycle-small.md) |
| Build a larger feature that needs to be split into multiple Tasks | `ywc-plan` -> `ywc-task-generator` | [06](./05-general-cycle-medium-large.md) |
| Give one goal and have the system finish from planning through implementation automatically | `ywc-agentic` | [07](./06-agentic-autonomous-loop.md) |
| Execute Tasks that are already decomposed (sequential/parallel) | `ywc-sequential-executor` / `ywc-parallel-executor` | [18](./13-executor-and-codegen-patterns.md) |
| Design a completely new project from scratch | `ywc-project-scaffold` | [09](./07-starting-a-new-project.md) |
| Understand an unfamiliar repo/codebase for the first time | `ywc-onboard-repo` | [10](./08-onboarding-existing-repo.md) |
| Clarify an idea that is not concrete yet | `ywc-brainstorm` | [19](./14-skill-reference.md) |
| Compare libraries or implementation approaches to decide what to use | `ywc-tech-research` | [19](./14-skill-reference.md) |
| Explore a large, uncertain change across several sessions (Codex only) | `ywc-wayfinder` | [08](./19-skill-combination-recipes.md) |
| Implement an authentication feature (login, OAuth, MFA) | `ywc-auth-implement` | [17](./18-authentication-implementation.md) |
| See how Skills hand off to each other | - | [08](./19-skill-combination-recipes.md) |

### Quality and verification

| What you want to do | Starting Skill | Guide |
|---|---|---|
| Create a manual test document for PR verification | `ywc-gen-testcase` | [11](./09-testing-guide.md) |
| Set up or expand E2E test automation | `ywc-e2e-test-strategy` | [12](./10-e2e-test-strategy.md) |
| Check screen usability or accessibility | `ywc-ui-ux-review` | [13](./11-design-review.md) |
| Improve a screen that feels visually ordinary | `ywc-design-renew` | [13](./11-design-review.md) |
| Check code for security vulnerabilities | `ywc-security-audit` | [19](./14-skill-reference.md) |
| Clean up old dead code | `ywc-refactor-clean` | [14](./16-code-structure-and-maintainability.md) |
| I want an independent check of implementation quality and maintainability | `ywc-impl-review` | [14](./16-code-structure-and-maintainability.md) |
| Prove completion with explicit, re-runnable gates | `ywc-verify-done` | [19](./14-skill-reference.md) |
| Review a project from the business and user perspective | `ywc-product-review` | [19](./14-skill-reference.md) |

### PRs, reviews and releases

| What you want to do | Starting Skill | Guide |
|---|---|---|
| Respond to review comments on an open PR | `ywc-handle-pr-reviews` | [19](./14-skill-reference.md) |
| Check whether a reviewer's comment is actually right before acting on it | `ywc-receive-review` | [19](./14-skill-reference.md) |
| Stop the same review comments from coming back | `ywc-review-learnings` | [08](./19-skill-combination-recipes.md) |
| Clean up a backlog of Dependabot PRs at once | `ywc-merge-dependabot` | [19](./14-skill-reference.md) |
| Write a CHANGELOG or release note | `ywc-changelog-release-notes` | [19](./14-skill-reference.md) |
| Just commit the work done so far | `ywc-commit` | [19](./14-skill-reference.md) |

### Debugging and incidents

| What you want to do | Starting Skill | Guide |
|---|---|---|
| You are stuck because you cannot find the root cause of a bug | `ywc-debug-rootcause` | [15](./12-debugging-and-incident-postmortem.md) |
| A production incident happened and you need to write a postmortem | `ywc-incident-postmortem` | [15](./12-debugging-and-incident-postmortem.md) |

### Project knowledge and decisions

| What you want to do | Starting Skill | Guide |
|---|---|---|
| Manage knowledge (glossary/review learnings/mission) that persists in the project after the conversation ends | `ywc-ubiquitous-language` | [19](./14-skill-reference.md) |
| Record a hard-to-reverse architecture decision (Claude Code only) | `ywc-adr` | [19](./14-skill-reference.md) |

For situations not covered in this table, see [19. Full Skill Reference](./14-skill-reference.md).

## Table of contents

### Prologue

| Page | Description |
|---|---|
| [01. Introduction](./01-introduction.md) | What this Skill/Agent ecosystem is, who it is for, and what problems it solves |
| [02. Core concepts](./02-core-concepts.md) | Terms such as Skill / Agent / Executor / Task, invocation syntax, and the four completion states such as `DONE` |

### Getting started

| Page | Description |
|---|---|
| [03. Prerequisites and installation](./15-prerequisites-installation.md) | The required and optional tools you need in place before ywc-* Skills run reliably |
| [04. Ship your first feature in 5 minutes](./03-quickstart.md) | The first hands-on exercise, following one small feature from idea to merge |

### Core pipeline

| Page | Description |
|---|---|
| [05. Handling a small change (general cycle - small)](./04-general-cycle-small.md) | The standard flow for a change that finishes as a single PR without Task decomposition |
| [06. Handling work split into multiple Tasks (general cycle - medium/large)](./05-general-cycle-medium-large.md) | The flow for changes that need spec validation and Task decomposition |
| [07. Finish automatically from one goal (ywc-agentic)](./06-agentic-autonomous-loop.md) | Instead of the manual control in 05/06, automatically repeat Plan -> Execute -> Evaluate -> Repeat from a single goal |
| [08. Skill combination recipes](./19-skill-combination-recipes.md) | How Skills hand off to each other: review learning loop, bug-to-prevention, PR gates, decision records, discovery, parallel execution, and release |

### Starting a project

| Page | Description |
|---|---|
| [09. Starting a new Project](./07-starting-a-new-project.md) | From a blank slate to project design and the first completed spec |
| [10. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) | An onboarding flow that reverse-engineers conventions from an unfamiliar codebase and creates `CLAUDE.md` |

### Quality and verification

| Page | Description |
|---|---|
| [11. Writing and running Tests](./09-testing-guide.md) | How to operate manual verification testsheets together with automated tests |
| [12. E2E Test automation strategy](./10-e2e-test-strategy.md) | An advanced guide to setting up, expanding, and maintaining a Playwright-based E2E Suite |
| [13. Reviewing and improving design](./11-design-review.md) | How to distinguish and apply usability audits and visual De-slop Renewal |
| [14. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) | How to use the 2 Skills that clean up and verify code with poor structure or maintainability, and the order they work together in |

### Operations and specialized domains

| Page | Description |
|---|---|
| [15. Debugging and incident postmortems](./12-debugging-and-incident-postmortem.md) | How ywc-debug-rootcause drives a root-cause investigation and ywc-incident-postmortem writes the follow-up report |
| [16. Managing Cloud Infrastructure](./17-infrastructure-and-cloud.md) | A decision table and 4-step pipeline for `ywc-infra-design`, `ywc-iac-author`, `ywc-infra-review`, and `ywc-infra-optimize`, dispatching to the `ywc-cloud-engineer` agent |
| [17. Implementing Authentication](./18-authentication-implementation.md) | How `ywc-auth-implement` runs the preflight -> policy interview -> recommendation -> dispatch flow, and the security / E2E / PR gates it enforces |

### Reference

| Page | Description |
|---|---|
| [18. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) | Practical command examples for option-heavy `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` |
| [19. Full Skill Reference](./14-skill-reference.md) | An index of the remaining Skills not covered in the guides above, organized by situation |

## Source material

All command syntax and options in this Guidebook were verified against each Skill's `SKILL.md` (`claude-code/skills/<skill-name>/SKILL.md`). If an option seems different from the actual behavior, that Skill's `SKILL.md` is the current source of truth. This document is a user-friendly secondary presentation of that material.
