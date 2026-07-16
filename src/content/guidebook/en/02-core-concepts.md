[Back to table of contents](./README.md)

# 02. Core concepts

Once you understand the terms and concepts on this page, you can apply the examples from every other guide page directly.

## Skill, Agent, Executor, Task

| Term | Meaning |
|---|---|
| **Skill** | A procedure users invoke directly, such as `/ywc-plan`. It is defined in `claude-code/skills/<name>/SKILL.md`, and most of this Guidebook is about Skills. |
| **Agent (Subagent)** | A specialized execution unit delegated to internally by a Skill, such as `ywc-backend-coder` or `ywc-security-engineer`. Users do not invoke these directly; Skills dispatch them through the Task tool. |
| **Executor** | A collective term for the two Skills that actually execute Tasks: `ywc-sequential-executor` (sequential) and `ywc-parallel-executor` (parallel). |
| **Task** | One `tasks/<phase>-<sequence>-<slug>/` directory created when `ywc-task-generator` decomposes a spec. It consists of `README.md` (metadata) and `task.md` (implementation checklist). |

## Scale determines the flow

Every work item starts with `ywc-plan`. `ywc-plan` judges the scale of the request and routes it into one of two flows.

| Scale | Decision criteria | Output | Next step |
|---|---|---|---|
| **Small** | A change that can finish in a single PR, with no DB migration or new Library adoption | `plan.md` | [04. general cycle (small)](./04-general-cycle-small.md) |
| **Medium/Large** | Must be split into multiple Tasks, or includes a DB migration or new Library adoption | `docs/ywc-plans/<slug>.md` | [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) |

DB migrations and new Library adoption are **always handled separately**, regardless of scale. This is a Safety Invariant for both `ywc-plan` and `ywc-task-generator`.

## The four completion states

Almost every Skill finishes with one of the four states below. Once you know this vocabulary, you can read any Skill's completion report and immediately decide what to do next.

| State | Meaning | What the user should do |
|---|---|---|
| `DONE` | Fully finished, no issues | Move to the next step |
| `DONE_WITH_CONCERNS` | Finished, but with something to watch | Read the Concern; fix it if it is a correctness issue, otherwise proceed |
| `BLOCKED` | Cannot proceed - human judgment is needed | Review the stated blocker, resolve it directly, then rerun |
| `NEEDS_CONTEXT` | Not enough information to start | Provide the requested information and invoke again |

## Overall flow at a glance

<FlowDiagram>
  <FlowStep>Idea</FlowStep>
  <FlowStep>ywc-plan (scale decision)</FlowStep>
  <FlowBranch label="Small">
    <FlowChain items="plan.md, ywc-spec-ready, ywc-code-gen, ywc-impl-review, ywc-create-pr" />
  </FlowBranch>
  <FlowBranch label="Medium/Large">
    <FlowChain items="docs/ywc-plans/<slug>.md, ywc-spec-ready, ywc-task-generator" />
    <FlowStep>ywc-sequential-executor --review or ywc-parallel-executor --review</FlowStep>
    <FlowChain items="PR, CI, Bot Review, Merge (automated by Executor)" />
  </FlowBranch>
</FlowDiagram>

Each branch of this flow is covered in detail with concrete command examples on pages [04](./04-general-cycle-small.md) and [05](./05-general-cycle-medium-large.md).

## Shared PR Delivery mode concepts

`ywc-finish-branch`, `ywc-sequential-executor`, and `ywc-parallel-executor` share the mode concepts below for task-based delivery. The Small flow based on `plan.md` has no task artifact, so it opens a PR with `ywc-create-pr` and handles review/merge separately. Exact flag combinations are covered in [16. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md).

| Mode | Meaning |
|---|---|
| `normal-pr` (default) | Automatically handle PR creation -> CI wait -> Bot Review response -> Merge |
| `--draft` | Create only a PR and stop - Merge is manual |
| `--local-merge` | Merge directly into the base branch locally without a PR |
| `--aggregate-pr` (executor only) | Collect multiple Tasks onto one branch and deliver them as **one** PR |

---

[Previous: 01. Introduction](./01-introduction.md) - [Next: 03. Ship your first feature in 5 minutes](./03-quickstart.md)
