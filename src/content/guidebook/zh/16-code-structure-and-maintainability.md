[« 返回目录](./README.md)

# 13. 管理代码结构与可维护性

## 何时使用这 4 个 Skill

这 4 个 Skill 都从同一个症状出发——"代码不好"——但回答的是不同的问题。根据你现在真正想问的问题来选择。

| 你想做什么 | 问题 | 使用的 Skill |
|---|---|---|
| 想删除未使用的函数/导出/依赖 | "这段代码真的被使用了吗？" | `ywc-refactor-clean` |
| shallow module 纠缠在一起，想重构结构本身 | "这个结构需要重构为 deep module 吗？" | `ywc-improve-architecture` |
| 想在 PR cycle 之外获得实现质量和 spec 符合度的评审 | "这个实现在 architecture/design/devex/security/QA 方面是否可靠？" | `ywc-impl-review` |
| 想先衡量 agent 修改这段代码需要多少成本 | "改这里 agent 需要花多少 token？" | `ywc-agent-legibility-audit` |

## `ywc-refactor-clean` — 清理 Dead Code

用 knip / depcheck / ts-prune 等工具找出旧的 dead code（未使用的函数/导出/依赖）并安全删除。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
</ToolTabs>

`--tier safe` 只删除 detection tool、grep、test 三者都同意"未使用"的项目。它不会重构结构本身——那是 `ywc-improve-architecture` 的职责。

## `ywc-improve-architecture` — Shallow → Deep Module 重构

将纠缠不清的 shallow module 堆重构为 deep module（用简单的 interface 隐藏完整实现的 module），behavior-preserving，一次处理一个可评审的单元。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

先用 `--dry-run` 只查看 Opportunity Backlog，确认没问题后去掉该 flag 执行实际的 consolidation。不能一次性针对整个 codebase（Scope Gate）——必须缩小到 module/directory 级别指定范围。

## `ywc-impl-review` — 实现质量评审（独立运行）

运行 Architecture / Design / Devex / Security / QA 五个维度的并行评审。在 [04](./04-general-cycle-small.md)、[05](./05-general-cycle-medium-large.md) 中已作为 PR 前验证步骤内置，但也可以在这些流程之外针对已有代码单独运行。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
</ToolTabs>

这是不修改代码的只读分析——发现的问题的实际修复会另行分派给 Backend/Frontend 负责的 agent。

## `ywc-agent-legibility-audit` — 从 Agent 视角衡量可读性

衡量的不是 correctness 或安全性，而是"agent 安全修改这段代码需要多少 token 成本"，依据是 deep/shallow module 比例以及 change-point 的明确程度。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
</ToolTabs>

这是一份只读报告。它本身不会真正修改结构，发现的问题会 routing 到 `ywc-improve-architecture`（shallow→deep 重构）或 `ywc-refactor-clean`（删除 dead code）。

## 4 个 Skill 如何协同工作

清理陌生或年久失修、让人不敢轻易下手的 codebase 时，常见的顺序如下。

**第 1 步：先衡量 — `ywc-agent-legibility-audit`**

在改动任何东西之前，先以只读方式衡量从哪里下手性价比最高。它会根据 deep/shallow module 比例和 change-point 的明确程度，指出 legibility 最差的地方。

**第 2 步：从最安全的开始 — `ywc-refactor-clean`**

如果衡量结果显示 dead code 拖累了 legibility，先处理这个最容易撤销的步骤。它只删除 detection tool、grep、test 三者都认可的内容，风险较低。

**第 3 步：重构结构本身 — `ywc-improve-architecture`**

清除 dead code 后如果仍残留一堆 shallow module，现在把它重构为 deep module——behavior-preserving，一次一个单元，在 green test suite 的保护下进行。

**第 4 步：最终验证 — `ywc-impl-review`**

重构完成后，在打开 PR 之前用五维度评审确认没有遗留问题。这里发现的问题可能会再次回到第 1 步（`ywc-agent-legibility-audit`）或第 2~3 步。

---

[Previous: 12. 根本原因调查和事后分析](./12-debugging-and-incident-postmortem.md) - [Next: 14. 管理云基础设施](./17-infrastructure-and-cloud.md)
