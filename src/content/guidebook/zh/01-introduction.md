[Back to table of contents](./README.md)

# 01. 介绍

## 本指南涵盖的内容

本仓库在 `claude-code/skills/` 下定义了大约 30 个带有 `ywc-*` 前缀的技能，以及在 `claude-code/agents/` 下的几个专用代理。它们一起构成了一个工具包，通过结构化流程在 Claude Code 上运行完整的开发生命周期："创意 -> Spec -> Task 分解 -> 实现 -> 代码审查 -> PR -> 合并。"

本指南是针对这些工具的**首次使用者**的实用手册，因此你可以快速找到“在当前情况下，我应该以什么顺序、用什么提示运行哪一个 Skill？” 它不会深入探讨 Skill 的内部机制，例如理性化防御或顾问模式。相反，它关注于**用户输入的命令以及他们应预期的结果**。如果你想了解内部操作原理，请直接参考每个 Skill 的 `SKILL.md`。

每个 Skill 的详细选项、前置条件和内部处理流程，都整理在原始仓库的 Skill 文件夹中。Claude Code 的 Skill 请参考 [`claude-code/skills`](https://github.com/yongwoon/ywc-agent-toolkit/tree/main/claude-code/skills)，Codex 的 Skill 请参考 [`codex/skills`](https://github.com/yongwoon/ywc-agent-toolkit/tree/main/codex/skills)。本指南用于快速找到常见执行流程；需要完整参考时，再打开对应的 `SKILL.md`。

## 此文件适用于谁

- 开发者首次在此项目中使用 `ywc-*` 技能
- 已经使用过 Skills 几次但仍然对如何组合它们的顺序感到困惑的开发者
- 需要精确语法的开发者，用于选项繁多的技能，例如 `ywc-sequential-executor`、`ywc-parallel-executor` 和 `ywc-code-gen`

## 前置条件和建议设置

通过 Plugin marketplace 或 Codex plugin 安装时，没有额外前置条件。安装工具会自动处理所需的文件复制和注册。

不过，实际运行 Skill 时需要系统中准备好 `git`、`gh`、`python3` 等几个 Tool，如果要使用设计相关 Skill，额外的设置也会有帮助。必需 Tool 与可选 Tool 的完整列表和安装方法整理在 [18. 前置条件与安装](./15-prerequisites-installation.md) —— 建议在开始之前先浏览一遍。

## 开始前需要检查的事项

| 物品 | 如何检查 |
|---|---|
| Claude Code 识别这个仓库吗？ | 在对话中输入 `/` 并确认自动完成中出现 `ywc-*` Skill 列表 |
| `gh` CLI 已被认证吗？ | `gh auth status` - 大多数创建或合并 PR 的技能所需 |
| 这个项目有 `CLAUDE.md` 吗？ | 如果没有，请参阅 [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) - 从此文件推断语言和提交约定的技能 |
| 目标是一个新项目还是对现有代码的更改？ | 对于新项目，请访问 [07. Starting a new Project](./07-starting-a-new-project.md)；对于已有更改，请从 [02. Core concepts](./02-core-concepts.md) 开始 |

## Skill 调用语法

本指南中的所有示例都假设你直接将以下表单输入到 Claude Code 对话中。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan 登录失败的错误信息过于笼统，因此很难理解原因" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan 登录失败的错误信息过于笼统，因此很难理解原因" />
  </ToolTabsPanel>
</ToolTabs>

带有前导 `/` 的 `/ywc-plan` 表单工作方式相同。为了可读性，本文件省略了 `/`。表单 `--flag value` 中的选项因 Skill 而异，具体示例收集在每个 Skill 页面或 [16. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) 中。

---

[Next: 02. Core concepts](./02-core-concepts.md)
