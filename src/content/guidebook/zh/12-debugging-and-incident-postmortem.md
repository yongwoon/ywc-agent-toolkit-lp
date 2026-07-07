[Back to table of contents](./README.md)

# 12. 根本原因调查和事后分析

## 何时使用此流程

这两项技能回答不同的问题。根据你在事故中的位置来选择。

| 情况 | 问题 | Skill 使用 |
|---|---|---|
| 无法搞清楚一个 Bug 为什么一直在发生 | 实际上是什么导致了这个故障？ | `ywc-debug-rootcause` |
| 生产事故已经发生了，你需要写一份记录 | 我们应该告诉团队（和客户）什么？ | `ywc-incident-postmortem` |

## `ywc-debug-rootcause` - 根本原因调查

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-debug-rootcause 支付 webhook 有时会被重复处理。找不到原因" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-debug-rootcause 支付 webhook 有时会被重复处理。找不到原因" />
  </ToolTabsPanel>
</ToolTabs>

这可以防止仅解决症状的补丁，并强制进行四步根本原因调查。如果修复在同一点失败三次或更多次，它会引导你质疑架构本身。

## `ywc-incident-postmortem` - 事后分析编写

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
</ToolTabs>

`--client` 另外会创建一个面向客户的摘要，省略内部细节。

## 两个 Skill 如何协同工作

`ywc-debug-rootcause` 在事故发生时运行，并回答"为什么会发生这个？"这个问题。`ywc-incident-postmortem` 在修复已经部署后运行，将根本原因转化为时间线、影响评估和预防行动项。它可以接受根本原因调查的结论作为输入，而不是重复调查过程。使用的顺序是：先找出原因，然后将其记录下来。

---

[Previous: 11. 审查和改进设计](./11-design-review.md) - [Next: 13. Executor / 代码生成提示模式](./13-executor-and-codegen-patterns.md)
