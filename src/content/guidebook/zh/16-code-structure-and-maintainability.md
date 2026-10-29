[« 返回目录](./README.md)

# 14. 管理代码结构与可维护性

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

运行 Architecture / Design / Devex / Security / QA 五个维度的并行评审。在 [05](./04-general-cycle-small.md)、[06](./05-general-cycle-medium-large.md) 中已作为 PR 前验证步骤内置，但也可以在这些流程之外针对已有代码单独运行。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
</ToolTabs>

这是不修改代码的只读分析——发现的问题的实际修复会另行分派给 Backend/Frontend 负责的 agent。

**值得了解的选项**

- 必须且只能选择一个评审目标：`--code <path>`、`--git-range <sha>..<sha>` 或 `--working-tree`（包含已暂存、未暂存和未跟踪的改动，无需提交）。在 Claude Code 中，`--spec` 为可选。
- `--profile chill|assertive`（默认 `chill`）：`chill` 隐藏 Low/Info 级别的风格建议；`assertive` 会显示这些建议。Critical/High/Medium 永远不会被隐藏。
- `--no-advisor` 跳过 Phase 2 的 advisor 调用；`--advisor-budget <n>` 限制其次数（默认 5）。
- `--format html` 会在 `claudedocs/` 中写入自包含报告（默认 `markdown`）。
- `--non-interactive`（仅 Claude Code）：跳过 learnings 晋升提示，并改为在报告中列出 learning 候选项。

**独立验证（Independent verification）**：每个已确认的 Critical 或 High 发现都会由一名全新的评审者重新核对一次，该评审者只看到 `file:line` 和声称的严重程度。无法复现的发现会交给 Phase 2 advisor 处理（Security 发现除外），否则标记为 unverified。每次运行最多验证 20 个发现。

**范围护栏（Scope guardrail）**：当评审范围内超过 200 个文件或超过 5,000 行改动时，评审会拒绝启动（`NEEDS_CONTEXT`）。它会报告文件数与行数，列出最大的 5 个文件，并要求你缩小评审目标。不会对任何内容抽样或截断。

## 2 个 Skill 如何协同工作

清理陌生或年久失修、让人不敢轻易下手的 codebase 时，常见的顺序如下。

**第 1 步：从最安全的开始 — `ywc-refactor-clean`**

先处理最容易撤销的步骤。它只删除 detection tool、grep、test 三者都认可的内容，风险较低。

**第 2 步：最终验证 — `ywc-impl-review`**

在打开 PR 之前用五维度评审确认没有遗留问题。这里发现的问题会回到第 1 步，或回到常规的实现流程。

---

[← 上一页: 13. 审查和改进设计](./11-design-review.md) · [下一页: 15. 根本原因调查和事后分析 →](./12-debugging-and-incident-postmortem.md)
