[Back to table of contents](./README.md)

# 11. 审查和改进设计

## 何时使用此流程

这两项技能回答不同的问题。根据你想回答的问题来选择。

| 你想做什么 | 问题 | Skill 使用 |
|---|---|---|
| 检查屏幕是否易于使用 | 这个屏幕有可用性/无障碍性问题吗？ | `ywc-ui-ux-review` |
| 屏幕感觉平淡或看起来像人工智能生成的 | 这块屏幕有独特的特点吗？ | `ywc-design-renew` |
| 从头构建一个全新的用户界面/组件 | 以上都不是——这是新的创作 | 在本指南的范围之外使用 UI 创建 Skill |

## `ywc-ui-ux-review` - 可用性 / 可访问性审计

将静态代码分析与实际的用户界面执行（Chrome DevTools MCP）相结合，以审核信息架构、视觉设计、可用性和可访问性（WCAG 2.2 AA）。结果生成四级报告：关键 / 高 / 中 / 低。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ui-ux-review 检查支付界面的 usability" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ui-ux-review 检查支付界面的 usability" />
  </ToolTabsPanel>
</ToolTabs>

由于包含了实时 UI 探索，当有暂存或预览 URL 可用时，结果会更准确。

## `ywc-design-renew` - 视觉去坡与更新

当现有屏幕普通或感觉“AI生成”时使用。它可以增加视觉特色，或检查AI产生的痕迹，例如渐变文本 / 深色上的青色 / Inter 字体 / 统一的卡片网格。

**代码更新（默认模式）**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-design-renew --target setup-collection/default-project/docs/design/README.md --url http://localhost:3000" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-design-renew --target setup-collection/default-project/docs/design/README.md --url http://localhost:3000" />
  </ToolTabsPanel>
</ToolTabs>

**仅检查，不要触碰代码**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-design-renew --mode check --target setup-collection/default-project/docs/design/README.md --fail-on high" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-design-renew --mode check --target setup-collection/default-project/docs/design/README.md --fail-on high" />
  </ToolTabsPanel>
</ToolTabs>

如果你通过 `--url`，也会提供前/后截图。如果省略，则仅进行代码分析，这样准确性较低。`--fail-on` 是检查模式的门限，默认为 `critical`。

## 新创作不是这些技能的用途

`ywc-design-renew` **仅用于现有屏幕的更新**。从零构建的 UI/组件更适合通过专门的 UI 创建工作流程处理，而不是本指南中的 `ywc-*` 审查/更新流程。你无法“去除杂乱”一个尚不存在的东西。

---

[Previous: 10. E2E Test automation strategy](./10-e2e-test-strategy.md) - [Next: 12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md)
