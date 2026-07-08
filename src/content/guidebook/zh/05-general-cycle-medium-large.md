[Back to table of contents](./README.md)

# 05. 处理分成多个 Tasks 的工作（通用周期 - 中/大型）

## 何时使用此流程

如果以下情况中的任何一种适用，`ywc-plan` 将路由到此路径。

- 这个变更很难纳入单一可审查的PR（多个屏幕、多个API、多个子系统）
- 它包括一个数据库迁移（无论规模如何，总是这条路径——安全不变式）
- 它引入了一个新的库/框架（路径也总是这个）

## 整体流程

```
ywc-plan -> ywc-spec-ready -> ywc-task-generator -> ywc-sequential-executor --review or ywc-parallel-executor --review
```

| 步骤 | Skill | 角色 |
|---|---|---|
| 一 | `ywc-plan` | 分析请求并创建 `docs/ywc-plans/<slug>.md` 规格 |
| 二 | `ywc-spec-ready` | 自动重复 `ywc-plan --update-spec` 和 `ywc-spec-validate`，直到规格为 `DONE` |
| 三 | `ywc-task-generator` | 将 `DONE` 规范分解为依赖安全的 Tasks（`tasks/<phase>-<sequence>-<slug>/`） |
| 四 | `ywc-sequential-executor` 或 `ywc-parallel-executor` | 实际执行 Tasks -> PR -> 合并 |

**如何选择顺序与并行**

| 情况 | 选择 |
|---|---|
| Task 的顺序很重要，或者 Tasks 依赖彼此的输出 | `ywc-sequential-executor` |
| Tasks 是独立的，并在 `dependency-graph.md` 中分组为可并行处理的波 | `ywc-parallel-executor`（使用 Git 工作树隔离） |

## 示例运行

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan 用户需要一个可以按通知类型开关的设置界面和 API。支持邮件/推送/应用内 3 个渠道" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan 用户需要一个可以按通知类型开关的设置界面和 API。支持邮件/推送/应用内 3 个渠道" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

之后的执行命令有许多选项，因此它们在单独的页面上介绍：[15. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)。最简单的起点是：

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
</ToolTabs>

如果你省略任务，它会自动从 `dependency-graph.md` 查找下一个可执行的 Task。

## 始终包括 `--review`

两个执行器都使用 `--review` 标志在每个 Task 的 PR 创建/合并之前自动运行 `/ywc-impl-review`。不使用此标志相当于完全跳过从 [04](./04-general-cycle-small.md) 的小周期中的审核步骤。没有充分的理由省略它。（如果 Task 有 `Criticality: critical`，无论标志如何，审核都是强制执行的。）

## 当你在每一步都被阻挡时

| 情况 | 动作 |
|---|---|
| `ywc-spec-ready` 达到迭代限制 | 一个基本的规格问题阻止了自动收敛——阅读部分报告并直接编辑规格 |
| `ywc-task-generator` 尝试创建 20 个或更多 Tasks | 这表明规范本身太大——考虑先拆分规范 |
| 在 Task 执行期间，某个依赖项未完成 | 执行器会自动停止并报告哪个 Task 必须在当前的之前 |

---

[Previous: 04. Handling a small change](./04-general-cycle-small.md) - [Next: 06. Finish automatically from one goal](./06-agentic-autonomous-loop.md)
