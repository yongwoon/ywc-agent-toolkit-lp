[Back to table of contents](./README.md)

# 03. 在5分钟内发布你的第一个功能

此页面是您的第一个动手练习：跟踪一个小错误修复从构思阶段到合并的整个过程。示例场景：处理请求 **“登录失败的错误信息过于笼统，因此很难理解原因。”**

这个流程背后的概念在 [04. general cycle (small)](./04-general-cycle-small.md) 中有更详细的解释。本页重点是实践。

## 第1步 - 制定计划

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan 登录失败的错误信息过于笼统，因此很难理解原因。希望显示账号锁定/输入错误/未注册等具体原因" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan 登录失败的错误信息过于笼统，因此很难理解原因。希望显示账号锁定/输入错误/未注册等具体原因" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-plan` 首先读取代码库，然后决定这个变更是否 **足够小** 可以作为单个 PR 完成。如果被判断为小变更，则会创建一个 `plan.md` 文件。检查四个部分——是什么 / 为什么 / 不在范围内 / 完成标准——是否已填写完整。

## 步骤 2 - 汇总计划

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
</ToolTabs>

如果 `plan.md` 仍有顾虑，它们会被自动优化并重新验证。如果已经清晰，则会原样交给下一步。

## 步骤 3 - 生成代码

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

这会并行生成后端 / 前端 / QA 层。生成完成后，您会得到一个以 `DONE`、`DONE_WITH_CONCERNS`、`BLOCKED` 或 `NEEDS_CONTEXT` 结尾的完成报告。有关每个状态的含义，请参见 [02. Core concepts](./02-core-concepts.md)。

## 第4步 - 在开设PR之前进行审查

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-code-gen` 没有自动审查标志。如果你跳过此步骤，PR 将在没有代码审查的情况下被打开。**不要跳过它。**

## 步骤5 - 创建PR并处理审核

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-create-pr` 处理提交、机密扫描、本地验证、草稿 PR 创建以及远程 CI/机器人审查检查。如果机器人审查评论或合并准备问题仍然存在，请像这样运行单独的 PR 健康扫描：

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
</ToolTabs>

小流程基于`plan.md`，所以它没有`tasks/<task-name>/`的缺陷。因此，在审阅者批准后，通过GitHub界面或`gh pr merge`进行合并比使用包含任务完成处理的`ywc-finish-branch`更安全。

## 如果你已经看到这里

你已经从头到尾完成了一次更改。接下来的好页面：

- 如果更改大于此，并且需要拆分为多个 Tasks -> [05. general cycle (medium/large)](./05-general-cycle-medium-large.md)
- 如果想法还不具体，不像这个练习中问题已经很清楚 -> 从 `ywc-brainstorm` 开始（参见 [14. Full Skill Reference](./14-skill-reference.md)）
- 如果您想交出一个目标，并让系统自动进行到结束，而不是自己管理每一步 -> [06. Finish automatically from one goal](./06-agentic-autonomous-loop.md)

---

[Previous: 02. Core concepts](./02-core-concepts.md) - [Next: 04. Handling a small change](./04-general-cycle-small.md)
