[Back to table of contents](./README.md)

# 08. 第一次进入现有的仓库

## 何时使用此流程

当你第一次进入一个已经有代码的陌生仓库并且需要了解“这个代码库的样子”时，使用这个方法。相反，如果你正在从零开始设计一个新项目，请前往 [07. Starting a new Project](./07-starting-a-new-project.md)。这两种流程的方向相反，不应在同一会话中一起使用。

## 它的作用

`ywc-onboard-repo` 使用 Glob/Grep 侦察来提取技术栈 / 架构 / 规范，并生成两样东西。

1. **入职指南** - 一份直接在对话中打印的文档（技术栈、架构、关键入口点、目录结构图、请求生命周期、规范等）
2. **Starter CLAUDE.md** - 一个写入到仓库根目录的文件。如果 `CLAUDE.md` 已经存在，它不会被覆盖；而是会增加一个 `## Detected Conventions` 部分。

## 示例运行

**默认运行** - 检查整个仓库并生成入门指南和入门 CLAUDE.md
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo" />
  </ToolTabsPanel>
</ToolTabs>

**仅检查 monorepo 中的特定工作区**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --scope apps/web/" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --scope apps/web/" />
  </ToolTabsPanel>
</ToolTabs>

**当你只需要说明性文件，而不是 Starter CLAUDE.md**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --guide-only" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --guide-only" />
  </ToolTabsPanel>
</ToolTabs>

**当你只需要 CLAUDE.md，而不是入职指南时**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --claude-md-only" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --claude-md-only" />
  </ToolTabsPanel>
</ToolTabs>

## 下一步做什么

- 如果侦察发现累积的死代码，结果报告将包括指导。将后续清理拆分到一个单独的 PR 与 `ywc-refactor-clean`；不要将其混入入职 PR。
- 一旦你阅读了入职指南，就进入修改现有代码的正常开发流程。首先从 [02. Core concepts](./02-core-concepts.md) 开始，以确认小/中/大规模的标准。

---

[Previous: 07. Starting a new Project](./07-starting-a-new-project.md) - [Next: 09. Writing and running Tests](./09-testing-guide.md)
