[Back to table of contents](./README.md)

# 02. 核心概念

一旦你理解了本页上的术语和概念，你就可以直接应用其他指南页的示例。

## Skill, Agent, Executor, Task

| 术语 | 意义 |
|---|---|
| **Skill** | 用户直接调用的过程，例如 `/ywc-plan`。它在 `claude-code/skills/<name>/SKILL.md` 中定义，本指南的大部分内容都是关于技能的。 |
| **Agent（子代理）** | 一个由 Skill 内部委派的专用执行单元，例如 `ywc-backend-coder` 或 `ywc-security-engineer`。用户不会直接调用它们；技能通过 Task 工具调度它们。 |
| **Executor** | 实际执行 Tasks 的两种技能的统称：`ywc-sequential-executor`（顺序）和 `ywc-parallel-executor`（并行）。 |
| **Task** | 当 `ywc-task-generator` 分解规范时，会创建一个 `tasks/<phase>-<sequence>-<slug>/` 目录。它由 `README.md`（元数据）和 `task.md`（实施清单）组成。 |

## 规模决定流动

每个工作项都以 `ywc-plan` 开始。`ywc-plan` 判断请求的规模，并将其导入两个流程之一。

| 刻度 | 决策标准 | 输出 | 下一步 |
|---|---|---|---|
| **小** | 一个可以在单次 PR 中完成的更改，无需数据库迁移或采用新库 | `plan.md` | [04. general cycle (small)](./04-general-cycle-small.md) |
| **中/大** | 必须拆分为多个 Tasks，或包含数据库迁移或新库采用 | `docs/ywc-plans/<slug>.md` | [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) |

数据库迁移和新库的采用**总是单独处理**，无论规模如何。这是 `ywc-plan` 和 `ywc-task-generator` 的安全不变量。

## 四个完成状态

几乎每一个 Skill 都以下面四种状态之一结束。一旦你掌握了这些词汇，你就可以阅读任何 Skill 的完成报告，并立即决定下一步该做什么。

| 州 | 意义 | 用户应该做什么 |
|---|---|---|
| `DONE` | 完全完成，没有问题 | 进入下一步 |
| `DONE_WITH_CONCERNS` | 完成了，但还有东西可以看 | 阅读问题；如果是正确性问题，请修正，否则继续 |
| `BLOCKED` | 无法继续 - 需要人工判断 | 查看所述的阻塞问题，直接解决它，然后重新运行 |
| `NEEDS_CONTEXT` | 信息不足，无法开始 | 提供所需的信息并再次调用 |

## 整体流程一览

<FlowDiagram>
  <FlowStep>想法</FlowStep>
  <FlowStep>ywc-plan (规模判断)</FlowStep>
  <FlowBranch label="Small">
    <FlowChain items="plan.md, ywc-spec-ready, ywc-code-gen, ywc-impl-review, ywc-create-pr" />
  </FlowBranch>
  <FlowBranch label="Medium/Large">
    <FlowChain items="docs/ywc-plans/<slug>.md, ywc-spec-ready, ywc-task-generator" />
    <FlowStep>ywc-sequential-executor --review 或 ywc-parallel-executor --review</FlowStep>
    <FlowChain items="PR, CI, Bot Review, Merge (由 Executor 自动处理)" />
  </FlowBranch>
</FlowDiagram>

本流程的每个分支在第 [04](./04-general-cycle-small.md) 页和 [05](./05-general-cycle-medium-large.md) 页上都有详细说明，并附有具体命令示例。

## 共享 PR 交付模式概念

`ywc-finish-branch`、`ywc-sequential-executor` 和 `ywc-parallel-executor` 共享以下用于基于任务交付的模式概念。基于 `plan.md` 的小流程没有任务工件，因此它使用 `ywc-create-pr` 打开 PR，并单独处理审查/合并。精确的标志组合在 [15. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) 中有说明。

| 模式 | 意义 |
|---|---|
| `normal-pr`（默认） | 自动处理 PR 创建 -> CI 等待 -> 机器人审核响应 -> 合并 |
| `--draft` | 只创建一个 PR 并停止 - 合并是手动的 |
| `--local-merge` | 在本地直接合并到主分支，无需 PR |
| `--aggregate-pr`（仅执行者） | 将多个 Tasks 收集到一个分支上，并作为 **一个** PR 交付 |

---

[Previous: 01. Introduction](./01-introduction.md) - [Next: 03. Ship your first feature in 5 minutes](./03-quickstart.md)
