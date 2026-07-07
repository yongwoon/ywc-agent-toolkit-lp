[Back to table of contents](./README.md)

# 13. Executor / 代码生成提示模式

`ywc-sequential-executor`、`ywc-parallel-executor` 和 `ywc-code-gen` 是三个技能，其众多选项会让你反复查找准确的语法。本页按 **“你现在想要做什么”** 来组织示例，而不是按 Skill 名称。找到你的任务并按原样复制命令。

## 共享概念：将多个 Tasks 组合成一个 PR（`--aggregate-pr`、`--group-name`）

`--aggregate-pr` 和 `--group-name` 在 `ywc-sequential-executor` 和 `ywc-parallel-executor` 中作为**相同的概念**。一旦你在这里理解了它，你就可以将所有例子应用到下面两个 Skill 部分中。

**没有 `--aggregate-pr`（默认行为）**：每个 Task 都有自己的功能分支和 PR。如果你处理 5 个 Tasks，你会得到 5 个 PR。

**使用 `--aggregate-pr`**：所有 Tasks 都合并到一个共享分支上，可以按顺序（顺序）或按波次（并行）进行合并，整批完成后，从该共享分支上打开一个 PR。从审查者的角度来看，它看起来像“一个完整的批次”，而不是“几个相关的更改”。

| 使用它时 | 使用时请勿 |
|---|---|
| 你希望将强相关的 Tasks 组合到一个逻辑部署单元中（例如，5 个 Tasks 用于通知 API + 用户界面 + 迁移） | 每个 Task 都需要独立审查——在这种情况下，默认行为（每个 Task 一个 PR）是正确的 |
| 您想减少 PR 的数量并减轻审查疲劳 | 你想直接在 PR 级别识别哪个 Task 失败了 |

**直接用 `--group-name` 设置共享分支名称。** 如果省略，它会自动生成为 `<base-branch>-<timestamp>`，但这样以后就更难区分哪个分支代表哪项工作。建议使用有意义的显式名称。

| Skill | 共享分支名称格式 |
|---|---|
| `ywc-sequential-executor --aggregate-pr --group-name <name>` | `work/<name>` |
| `ywc-parallel-executor --aggregate-pr --group-name <name>` | `aggregate/<name>` |

只有分支名称前缀不同（`work/` 与 `aggregate/`）；操作原理相同：每个 Task 在本地合并到共享分支，最后从该分支自动创建一个 PR 到基分支，包括 CI/机器人审核/合并处理。**此共享分支不是实际的基分支**——基分支在最终 PR 合并之前保持不变。

## ywc-sequential-executor - 当你想按顺序运行 Tasks 时

> **提示**：`ywc-sequential-executor` 本身没有单独的 `--tdd` flag。每个 Task 的实现步骤内部遵循与 `ywc-code-gen` 相同的默认 TDD gate(实现前先确认一个失败的测试)。如果需要完整的 RED → GREEN → REFACTOR 仪式和分阶段 checkpoint commit，请参考下方 `ywc-code-gen` 部分的 `--tdd` flag，并在该 Task 的实现请求中明确加入。

**使用默认设置运行一个 Task**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
</ToolTabs>
默认 `normal-pr` 模式会自动处理 PR 创建 -> CI -> 机器人审核 -> 合并。

**在打开 PR 之前自动运行代码审查**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>

**同时运行多个 Tasks 并以日语接收 PR 描述**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
</ToolTabs>

**使用本地合并快速完成，无需 PR**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
</ToolTabs>
在 PR 模式下，CI 会为你运行测试。使用 `--local-merge` 时，没有远程 CI，因此在与 `--run-tests-locally` 合并之前，最好要求通过本地测试。

**将多个 Tasks 作为一个 PR（`--aggregate-pr`）交付**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
Tasks 顺序堆叠在一个 `work/project-health` 分支上，并作为 **一个** PR 交付。完整的 `--aggregate-pr` 和 `--group-name` 模型请参见上面的“共享概念”部分。

**仅创建一个 PR，让人类稍后合并**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>

**您不知道要运行什么；请先预览计划**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
</ToolTabs>
如果未指定 Task，它会自动从 `dependency-graph` 检测下一个可执行目标，并仅打印执行计划（实际上不会运行任何内容）。

**在隔离环境中运行，以免干扰主结账（`--worktree`）的其他工作**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
</ToolTabs>

`--worktree` 在 **一个 git 工作树内** 运行整个范围。原始克隆保持不变，因此你可以继续其他工作。关键点是这是 **运行级隔离**：一个工作树包裹整个范围，而其中的 Tasks 仍然顺序运行。（相比之下，`ywc-parallel-executor` 为 **每个 Task** 创建一个单独的工作树——参见下面的并行执行器部分。）

- 这是一个**独立标志**。它与四种交付模式（`normal-pr` / `--local-merge` / `--draft` / `--aggregate-pr`）或 `--review` 并不互斥；你可以自由组合。打开或关闭 `--worktree` 并不会改变交付模式本身。
- **完成后的处理取决于交付模式：**
  - `normal-pr` / `--local-merge` / `--draft` 组合 -> 当执行完成（完成状态 `DONE`）时，工作树将被删除，但**集成分支会被保留**。报告中包含一条说明：“集成分支尚未合并到主干”，因此你必须自己使用 `ywc-create-pr` 打开 `integration/run-<slug> -> trunk` PR —— 它不会自动打开。
  - 与 `--aggregate-pr` 一起使用 -> 上面的手动步骤是不必要的。`work/<name>` 分支是在工作树中创建的，并且 `work -> base` PR 会在最后自动打开。
- **如果在中途失败（`BLOCKED` / `DONE_WITH_CONCERNS`）**，工作树不会被删除，会保留在原处。您可以稍后进入报告中打印的路径并继续。
- 使用 `--dry-run`，它不会创建实际的工作树；它只会预览将使用的路径和名称：
  <ToolTabs>
    <ToolTabsPanel tool="claude-code" label="Claude Code">
      <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
    <ToolTabsPanel tool="codex" label="Codex">
      <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
  </ToolTabs>

**`--worktree` + `--aggregate-pr` - 同时进行隔离执行和单PR交付**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
当你想在不修改主结账的情况下，通过部署将多个 Tasks 捆绑成一个 PR 时，这是最完整的组合。

> **注意**：`--local-merge` / `--draft` / `--skip-ci-wait` / `--aggregate-pr` 互斥。如果同时使用两个或更多，执行将停止并要求澄清。`--review` 和 `--worktree` 可以与任何这些模式组合使用。

## ywc-parallel-executor - 当你想同时运行独立的 Tasks 时

**并行运行独立的 Tasks，为每个 Task 创建并合并一个 PR**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
</ToolTabs>
它们按波次并行运行，每个 Task 独立完成 PR 创建 -> CI -> 机器人审查 -> **合并**。

**快速本地合并每个 Task，无需 PR**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
</ToolTabs>

**并行运行所有 Tasks，并将它们作为一个 PR (`--aggregate-pr`) 提交**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
</ToolTabs>
Tasks 按波浪在一个 `aggregate/payments` 分支上堆叠，并作为 **一个** PR 交付。有关完整的 `--aggregate-pr` 和 `--group-name` 模型，请参见本页顶部的“共享概念”部分。它与 `ywc-sequential-executor` 的概念完全相同，只是共享分支前缀从 `work/` 变为 `aggregate/`。

**在所有工作完成后，让人工一次性审查并合并所有内容**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>
在所有波次完成后，会创建一个草稿 PR，并且合并是手动的。

> **注意**：如果没有指定 `--local-merge` / `--draft` / `--per-task-pr` / `--aggregate-pr` 中的任何一个，它会询问你想要哪种模式，而不是默默选择一个默认值。`--review` 可以与任何模式结合使用。（供参考，`ywc-parallel-executor` 没有单独的 `--worktree` 标志，因为每个 Task 工作区隔离是这个 Skill 的默认行为。）

## ywc-code-gen - 当你想在不进行 Task 分解的情况下直接生成代码

**同时生成后端 + 前端 + 测试**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**对于支付/认证等敏感功能，请使用 TDD 小心构建**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
</ToolTabs>
像 `payment` 这样的关键词会被自动分类为 `critical`，这禁止灰箱委派（只检查接口而不阅读内部代码）。`--tdd` 强制执行 RED -> GREEN -> REFACTOR 提交边界。

**您已经检查了可重用代码，并希望跳过重复检测**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
</ToolTabs>

> **注意**：`--spec` 和 `--feature` 都是必需的。如果任一为空，将使用 `NEEDS_CONTEXT` 停止。如果工作目录中已经存在 `tasks/` 目录，请使用 `ywc-sequential-executor` / `ywc-parallel-executor` 代替此 Skill。

---

[Previous: 12. 根本原因调查和事后分析](./12-debugging-and-incident-postmortem.md) - [Next: 14. 完整 Skill 参考](./14-skill-reference.md)
