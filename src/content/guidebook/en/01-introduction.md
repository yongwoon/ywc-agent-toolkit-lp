[Back to table of contents](./README.md)

# 01. Introduction

## What this Guidebook covers

This repository defines around 30 Skills with the `ywc-*` prefix under `tools/claude-code/skills/`, plus several dedicated Agents under `tools/claude-code/agents/`. Together, they are a toolkit for running the full development Lifecycle on Claude Code through structured procedures: "idea -> Spec -> Task decomposition -> implementation -> code review -> PR -> Merge."

This Guidebook is a practical manual for **first-time users** of those tools, so you can quickly find "which Skill should I run, in what order, with what prompt, for my current situation?" It does not go deep into Skill internals such as Rationalization Defense or Advisor Pattern. Instead, it focuses on **the commands users enter and the results they should expect**. If you want to understand the internal operating principles, refer directly to each Skill's `SKILL.md`.

## Who this document is for

- Developers using `ywc-*` Skills in this project for the first time
- Developers who have used Skills a few times but still get confused about the order in which to combine them
- Developers who need exact syntax for option-heavy Skills such as `ywc-sequential-executor`, `ywc-parallel-executor`, and `ywc-code-gen`

## What to check before starting

| Item | How to check |
|---|---|
| Does Claude Code recognize this repository? | Type `/` in the conversation and confirm that the `ywc-*` Skill list appears in autocomplete |
| Is the `gh` CLI authenticated? | `gh auth status` - required by most Skills that create or merge PRs |
| Does the project have `CLAUDE.md`? | If not, see [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) - Skills infer language and commit conventions from this file |
| Is the target a new project or a change to existing code? | For a new project, go to [07. Starting a new Project](./07-starting-a-new-project.md); for an existing change, start with [02. Core concepts](./02-core-concepts.md) |

## Skill invocation syntax

All examples in this Guidebook assume you type the following form directly into the Claude Code conversation.

```
ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움
```

The `/ywc-plan` form with a leading `/` works the same way. This document omits `/` for readability. Options in the form `--flag value` differ by Skill, and concrete examples are collected on each Skill page or in [12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md).

---

[Next: 02. Core concepts](./02-core-concepts.md)
