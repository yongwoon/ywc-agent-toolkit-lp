[« 返回目录](./README.md)

# 13. 管理代码结构与可维护性

## 何时使用这 2 个 Skill

这 2 个 Skill 都从同一个症状出发——"代码不好"——但回答的是不同的问题。根据你现在真正想问的问题来选择。

| 你想做什么 | 问题 | 使用的 Skill |
|---|---|---|
| 想删除未使用的函数/导出/依赖 | "这段代码真的被使用了吗？" | `ywc-refactor-clean` |
| 想在 PR cycle 之外获得实现质量和 spec 符合度的评审 | "这个实现在 architecture/design/devex/security/QA 方面是否可靠？" | `ywc-impl-review` |

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

`--tier safe` 只删除 detection tool、grep、test 三者都同意"未使用"的项目。此 skill 本身不会重构结构。若需要找出架构/设计问题，请使用 `ywc-impl-review`，然后通过常规流程修复。

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

## 2 个 Skill 如何协同工作

清理陌生或年久失修、让人不敢轻易下手的 codebase 时，常见的顺序如下。

**第 1 步：从最安全的开始 — `ywc-refactor-clean`**

先处理最容易撤销的步骤。它只删除 detection tool、grep、test 三者都认可的内容，风险较低。

**第 2 步：最终验证 — `ywc-impl-review`**

在打开 PR 之前用五维度评审确认没有遗留问题。这里发现的问题会回到第 1 步，或回到常规的实现流程。

---

[Previous: 12. 根本原因调查和事后分析](./12-debugging-and-incident-postmortem.md) - [Next: 14. 管理云基础设施](./17-infrastructure-and-cloud.md)
