[Back to table of contents](./README.md)

# 06. 从一个目标自动完成 (ywc-agentic)

## 何时使用此流程

[04](./04-general-cycle-small.md) 和 [05](./05-general-cycle-medium-large.md) 是**手动控制**流程，用户逐步调用每个步骤（`ywc-plan` -> ... -> 执行器）。`ywc-agentic` 接收一个自然语言目标，并自动将完整流程重复作为**计划 -> 执行 -> 评估 -> 重复**的循环，直到验证通过或达到迭代上限，无需人工干预。

- 如果你想设定一个目标，而不是每次手动跟踪下一个技能 -> 这个页面
- 如果你想在 Task 级别上直接控制，决定哪个任务何时运行 -> 直接使用 [05](./05-general-cycle-medium-large.md) 的执行器
- 如果你想按原样运行现有的 `tasks/` 积压任务而不进行 Task 分解 -> 直接调用 `ywc-sequential-executor` / `ywc-parallel-executor`，而不是通过代理

## 它自动化的内容

```
Goal -> [Plan -> Execute -> Evaluate -> Repeat] -> Result
```

在内部，它按原样协调现有的 `ywc-*` 技能。它没有单独的代码生成逻辑。

| 阶段 | 会发生什么 |
|---|---|
| 计划 | 与 `ywc-plan --non-interactive` 制定计划（小型：`plan.md`；中型/大型：将规格汇总到 `DONE` 与 `ywc-spec-ready`） |
| Task | 仅限中/大型：使用 `ywc-task-generator` 分解，然后根据 `dependency-graph.md` 自动选择执行者 |
| 执行 | 对于小型，运行 `ywc-code-gen`；对于中型/大型，以 `--local-merge` 模式运行执行器，以便在不提交 PR 的情况下快速迭代 |
| 评估 | 只与 `ywc-impl-review` 查看当前迭代的差异，然后使用 `ywc-verify-done` 验证 lint/typecheck/test/build |
| 重复 | 如果验证失败，使用 `ywc-plan --update-spec` 重新规划，并重复直到达到 `--max-iterations` 限制 |

**成功预言器** - 在每次运行时，它提前以可证伪的方式定义工作完成的标准，并在整个过程中遵循该定义：目标 / 质量阈值 / 所需证据 / 停止条件。只有当 `ywc-impl-review` 返回 `DONE` **且** `ywc-verify-done` 为绿色时，才认为通过。如果评审是 `DONE` 但测试为红色，该运行仍然失败。

## 示例运行

**给出一个自然语言目标（默认，最多三次迭代）**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**增加迭代限制，这样它会尝试更长时间**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --max-iterations 5" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --max-iterations 5" />
  </ToolTabsPanel>
</ToolTabs>
`--max-iterations` 是一个用户定义的安全限制。如果运行未收敛，代理不会自行提高该限制。

**明确选择执行者**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;알림 설정 화면과 API 추가&quot; --executor sequential" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;알림 설정 화면과 API 추가&quot; --executor sequential" />
  </ToolTabsPanel>
</ToolTabs>
默认的 `auto` 会检查 `dependency-graph.md` 并自动选择顺序或并行。

**恢复中断的运行**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic --resume" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic --resume" />
  </ToolTabsPanel>
</ToolTabs>
如果 `tasks/` 中仍有未完成的任务，它将跳过计划阶段并从该点继续。

**在不实际运行的情况下预览各阶段**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

## 当目标不明确时，它会停止

“自主运行”并不意味着“自动填写空白”。在计划阶段之前，它会对目标进行分类，如果目标模糊，它会首先停止：

| 目标状态 | 行为 |
|---|---|
| 具体（所有条件：什么/哪里/完成都存在） | 立即进行 |
| 只缺少原因（实现方法和完成条件已明确） | 继续，但标记为违约 |
| 含糊不清（没有完成条件，或者可能有多种解释） | 停止使用 `NEEDS_CONTEXT`；如果有对话可用，请引导至 `ywc-brainstorm` |
| 有风险/不可逆（认证、支付、权限、数据删除、模式迁移） | 必须在继续之前通过 `ywc-confidence-gate` |

## 当你在每一步都被阻挡时

| 情况 | 动作 |
|---|---|
| 它甚至无法启动，并返回 `NEEDS_CONTEXT` | 目标不明确——请将其更具体地重写，或先使用 `ywc-brainstorm` 进行交互式澄清 |
| `BLOCKED`（合并冲突，严重 CI 错误） | 它不尝试自动恢复——读取记录在 `tasks/agentic-log.md` 中的内容，直接解决，然后重新运行 |
| 迭代次数限制 (`--max-iterations`) 已达到 | 以 `DONE_WITH_CONCERNS` 结束，列出剩余的 CRITICAL/HIGH 问题 - 直接修复或提高限制后重新运行 |
| 重新计划总是回到相同的范围 | 被视为递归保护停滞并自动停止——规范或目标本身需要重新审视 |

## 完成后要检查什么

- `tasks/agentic-log.md` - 每次迭代的阶段、通过/未通过、发现和成功预测都以追加方式记录
- 如果存在重复的 CRITICAL/HIGH 发现，它们会在完成报告中标记为 `Learning candidate` - 请审查它们，并在需要时使用 `ywc-review-learnings` 手动注册（它们不会自动记录）

---

[Previous: 05. Handling work split into multiple Tasks](./05-general-cycle-medium-large.md) - [Next: 07. Starting a new Project](./07-starting-a-new-project.md)
