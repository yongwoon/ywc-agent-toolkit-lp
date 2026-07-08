[Back to table of contents](./README.md)

# 01. Introduction

## What this Guidebook covers

This repository defines around 30 Skills with the `ywc-*` prefix under `claude-code/skills/`, plus several dedicated Agents under `claude-code/agents/`. Together, they are a toolkit for running the full development Lifecycle on Claude Code through structured procedures: "idea -> Spec -> Task decomposition -> implementation -> code review -> PR -> Merge."

This Guidebook is a practical manual for **first-time users** of those tools, so you can quickly find "which Skill should I run, in what order, with what prompt, for my current situation?" It does not go deep into Skill internals such as Rationalization Defense or Advisor Pattern. Instead, it focuses on **the commands users enter and the results they should expect**. If you want to understand the internal operating principles, refer directly to each Skill's `SKILL.md`.

For deeper details on each Skill's options, prerequisites, and internal flow, refer to the source repository's Skill folders. Claude Code Skills are documented under [`claude-code/skills`](https://github.com/yongwoon/ywc-agent-toolkit/tree/main/claude-code/skills), and Codex Skills are documented under [`codex/skills`](https://github.com/yongwoon/ywc-agent-toolkit/tree/main/codex/skills). Use this Guidebook to find the common execution path quickly, then open the relevant `SKILL.md` when you need the full reference.

## Who this document is for

- Developers using `ywc-*` Skills in this project for the first time
- Developers who have used Skills a few times but still get confused about the order in which to combine them
- Developers who need exact syntax for option-heavy Skills such as `ywc-sequential-executor`, `ywc-parallel-executor`, and `ywc-code-gen`

## Prerequisites and recommended setup

Plugin marketplace installation and Codex plugin installation have no separate prerequisites. The installer handles the required file copying and registration automatically.

That said, actually running a Skill needs a few tools in place on your system — `git`, `gh`, `python3`, and more — and design-related Skills work better with some extra setup. See [17. Prerequisites and installation](./15-prerequisites-installation.md) for the full list of required and optional tools plus install steps — worth a quick read before you get started.

## What to check before starting

| Item | How to check |
|---|---|
| Does Claude Code recognize this repository? | Type `/` in the conversation and confirm that the `ywc-*` Skill list appears in autocomplete |
| Is the `gh` CLI authenticated? | `gh auth status` - required by most Skills that create or merge PRs |
| Does the project have `CLAUDE.md`? | If not, see [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) - Skills infer language and commit conventions from this file |
| Is the target a new project or a change to existing code? | For a new project, go to [07. Starting a new Project](./07-starting-a-new-project.md); for an existing change, start with [02. Core concepts](./02-core-concepts.md) |

## Skill invocation syntax

All examples in this Guidebook assume you type the following form directly into the Claude Code conversation.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan Login failure error messages are too generic to understand the cause" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan Login failure error messages are too generic to understand the cause" />
  </ToolTabsPanel>
</ToolTabs>

The `/ywc-plan` form with a leading `/` works the same way. This document omits `/` for readability. Options in the form `--flag value` differ by Skill, and concrete examples are collected on each Skill page or in [15. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md).

---

[Next: 02. Core concepts](./02-core-concepts.md)
