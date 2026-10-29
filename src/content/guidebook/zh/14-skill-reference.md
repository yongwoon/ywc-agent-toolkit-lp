[Back to table of contents](./README.md)

# 19. 完整 Skill 参考

本页面将之前工作流程指南中未涵盖的剩余技能按**你想做的事情**进行分组。在每个流程（小/中/大周期、新项目、入职、测试或设计）中需要时使用它。

在下表中找到你的场景，点击 Skill 名称即可跳转到对应说明。

| Skill | 何时使用 |
|---|---|
| [`ywc-handle-pr-reviews`](#回应开放-pr-的审查意见并清理-ci冲突) | 回应开放 PR 的审查意见，并清理 CI/冲突 |
| [`ywc-create-pr`](#提交更改并打开草稿-pr) | 提交更改并打开草稿 PR |
| [`ywc-merge-dependabot`](#一次性清理累积的-dependabot-pr) | 一次性清理累积的 Dependabot PR |
| [`ywc-commit`](#只提交目前完成的工作) | 只提交目前完成的工作 |
| [`ywc-receive-review`](#不想无条件接受审查者人类或-coderabbitcodexclaude的意见想先进行技术验证再回应) | 不想无条件接受审查者（人类或 CodeRabbit/Codex/Claude）的意见，想先进行技术验证再回应 |
| [`ywc-brainstorm`](#你的想法还不具体你想先把它弄清楚) | 你的想法还不具体，你想先把它弄清楚 |
| [`ywc-tech-research`](#想比较库或实现方式决定要用什么) | 想比较库或实现方式，决定要用什么 |
| [`ywc-agentic`](#你想设定一个目标然后让整个从规划到执行的过程在无人干预下运行) | 你想设定一个目标，然后让整个从规划到执行的过程在无人干预下运行 |
| [`ywc-security-audit`](#检查敏感代码中的安全漏洞例如认证支付) | 检查敏感代码中的安全漏洞，例如认证/支付 |
| [`ywc-refactor-clean`](#清理旧的无用代码未使用的函数导出依赖) | 清理旧的无用代码（未使用的函数/导出/依赖） |
| [`ywc-impl-review`](#想在常规-cycle-之外独立检查实现质量和-maintenance-角度) | 想在常规 cycle 之外，独立检查实现质量和 maintenance 角度 |
| [`ywc-tdd-ritual`](#想严格按照文档化的流程执行-red--green--refactor) | 想严格按照文档化的流程执行 RED → GREEN → REFACTOR |
| [`ywc-verify-done`](#想用明确可重复运行的-gate-证明完成情况) | 想用明确、可重复运行的 gate 证明完成情况 |
| [`ywc-e2e-test-strategy`](#想用-playwright-自动化-critical-user-flow或检查现有-e2e-覆盖率的缺口) | 想用 Playwright 自动化 critical user flow，或检查现有 E2E 覆盖率的缺口 |
| [`ywc-product-review`](#想从业务服务角度而不是代码角度获得项目评审) | 想从业务/服务角度而不是代码角度获得项目评审 |
| [`ywc-review-learnings`](#教系统关于重复代码审查反馈的内容这样它就不会再次提出相同的误报) | 教系统关于重复代码审查反馈的内容，这样它就不会再次提出相同的误报 |
| [`ywc-mine-review-history`](#想扫描大量已合并的-pr找出反复出现的审查缺陷) | 扫描大量已合并的 PR，找出反复出现的审查缺陷 |
| [`ywc-ubiquitous-language`](#创建或更新由开发人员领域专家和大型语言模型共享的领域词汇表) | 创建或更新由开发人员、领域专家和大型语言模型共享的领域词汇表 |
| [`ywc-project-mission`](#想记录-project-的-mission成功标准和非目标) | 记录 project 的 mission、成功标准和非目标（仅限 Claude Code） |
| [`ywc-adr`](#想记录难以逆转的架构决策及被拒绝的备选方案) | 记录难以逆转的架构决策及被拒绝的备选方案（仅限 Claude Code） |
| [`ywc-release-pr-list`](#总结包含在发布版本-prdevelop-main-等中的已合并-pr-列表) | 总结包含在发布版本 PR（develop->main 等）中的已合并 PR 列表 |
| [`ywc-changelog-release-notes`](#编写-changelogmd-或面向用户的版本说明) | 编写 CHANGELOG.md 或面向用户的版本说明 |
| [`ywc-skill-author`](#想创建新的-ywc--skill或按规则整理检查现有-skill) | 想创建新的 ywc-* skill，或按规则整理/检查现有 skill |
| [`ywc-setup-language` / `ywc-setup`](#设置持久输出语言让技能不再每次询问-language) | 设置持久输出语言，让技能不再每次询问 language |
| [`ywc-worktrees`](#想创建隔离的-worktree-路径或检查清理它) | 想创建隔离的 worktree 路径，或检查/清理它 |
| [`ywc-docker-isolate`](#并行启动的-worktree-之间-docker-端口互相冲突想解决这个问题) | 并行启动的 worktree 之间 Docker 端口互相冲突，想解决这个问题 |

## 当您想处理 PR / 审查时

### 回应开放 PR 的审查意见，并清理 CI/冲突

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
</ToolTabs>
如果你省略 PR 号码，它会自动为当前分支找到 PR。

*（仅限 Claude Code）* CodeRabbit 的 "Nitpick comments"（没有 review thread）同样会被检测并分类；已处理的条目会记录在一条 PR 级别的评论中，并带有隐藏标记，因此不会再次出现。

### 提交更改并打开草稿 PR

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
这已经包含在来自 [05](./04-general-cycle-small.md) 和 [06](./05-general-cycle-medium-large.md) 的流程中，因此当你想在这些流程之外仅打开独立的 PR 时使用它。

当任务 README 或 `docs/ywc-plans/` 下的计划被找到时，PR 正文会加入 `Design Background` 部分（目标；若计划中有，则包括 Alternatives Considered / Trade-offs）。`--plan-doc <path.md>` 可显式指定计划（仓库内的相对路径，且位于仓库内部）；`--no-plan-ref` 禁用此查找；同时指定两者时，`--plan-doc` 优先。若多个计划匹配，Skill 会列出它们，并要求你使用 `--plan-doc` 重新运行。

### 一次性清理累积的 Dependabot PR

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
</ToolTabs>
如果省略 `security`，它将针对所有 Dependabot PR。如果省略 `parallel-auto`，它将按 PR 编号依次处理 PR。

### 只提交目前完成的工作

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-commit 只提交 authentication 相关的更改" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-commit 只提交 authentication 相关的更改" />
  </ToolTabsPanel>
</ToolTabs>
这不是为了 PR 的创建或代码更改本身。它只是提交用的。

### 不想无条件接受审查者（人类或 CodeRabbit/Codex/Claude）的意见，想先进行技术验证再回应

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-receive-review 审查者说这个辅助函数没有被使用，要求删除，但请先确认它是否真的没被使用" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-receive-review 审查者说这个辅助函数没有被使用，要求删除，但请先确认它是否真的没被使用" />
  </ToolTabsPanel>
</ToolTabs>
这可以防止先同意再实现的默认行为，将每一条意见都当作"待验证的建议"来处理。它是对 `ywc-handle-pr-reviews` 自动化的补充判断层。

## 当你还没有计划，或者希望它在没有人工干预的情况下完成

### 你的想法还不具体，你想先把它弄清楚

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm 想做一个通知功能，但还不确定具体怎么做" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm 想做一个通知功能，但还不确定具体怎么做" />
  </ToolTabsPanel>
</ToolTabs>
通过苏格拉底式对话，它推导出目标/约束条件/成功标准以及2-3个备选方案，然后交给`ywc-plan`。

在交给 `ywc-plan` 之前，设计文档会列出其关键前提（load-bearing premises）及证据（`file:line` 与引用的代码片段），并标注状态 VERIFIED 或 UNVERIFIED。未经验证的前提会被记录为失败模式，或移入范围之外，而不会被默默假设。

### 想比较库或实现方式，决定要用什么

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research &quot;Hono SSE 实现&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research &quot;Hono SSE 实现&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
</ToolTabs>
可以用 `--depth` 控制调查深度（25 仅摘要 ~ 100 详尽调查），用 `--format html` 输出自包含报告。

### 你想设定一个目标，然后让整个从规划到执行的过程在无人干预下运行

这已移至专用的 `ywc-agentic` 页面。用法和示例请参见 [07. Finish automatically from one goal](./06-agentic-autonomous-loop.md)。

## 当你想要检查质量、安全和产品视角时

### 检查敏感代码中的安全漏洞，例如认证/支付

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
</ToolTabs>

### 你被卡住了，因为你找不到错误的原因

此技能已移至专用页面 [15. 根本原因调查和事后分析](./12-debugging-and-incident-postmortem.md)。

### 清理旧的无用代码（未使用的函数/导出/依赖）

这已移至专用的 `ywc-refactor-clean` 页面。用法和示例请参见 [14. 管理代码结构与可维护性](./16-code-structure-and-maintainability.md)。

### 想在常规 cycle 之外，独立检查实现质量和 maintenance 角度

这已移至专用的 `ywc-impl-review` 页面。用法和示例请参见 [14. 管理代码结构与可维护性](./16-code-structure-and-maintainability.md)。

### 为生产事故撰写事后分析报告

此技能已移至专用页面 [15. 根本原因调查和事后分析](./12-debugging-and-incident-postmortem.md)。

### 想严格按照文档化的流程执行 RED → GREEN → REFACTOR

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tdd-ritual 用 TDD 实现显示具体登录失败原因的功能" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tdd-ritual 用 TDD 实现显示具体登录失败原因的功能" />
  </ToolTabsPanel>
</ToolTabs>
`ywc-code-gen`、`ywc-sequential-executor` 等提到的可选 `--tdd` 流程，指的正是这个 skill —— 它会在每次 RED/GREEN/REFACTOR 转换时强制执行验证步骤。

### 想用明确、可重复运行的 gate 证明完成情况

你可以编写一份 markdown 账本（ledger），其中每个 gate 都包含以下字段：

- `CHECK:`：一条 shell 命令
- `EXPECT:`：子串或 `/regex/`
- `EVIDENCE:`：证据

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="python3 claude-code/skills/ywc-verify-done/scripts/gate-check.py --status gate-ledger.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="python3 &quot;${CODEX_HOME:-$HOME/.codex}/skills/ywc-verify-done/scripts/gate-check.py&quot; --status gate-ledger.md" />
  </ToolTabsPanel>
</ToolTabs>

去掉 `--status` 会运行这些 gate；`--reverify` 会重新运行全部 gate。

- 退出码 0 表示所有可运行的 gate 均已满足。
- 既没有 CHECK 也没有 EXPECT 的 gate 为人工检查项，永远不会阻塞。
- 缓存的 PASS 仅在 gate 文本未变化时才被信任。
- 每个 gate 的超时时间为 120 秒。
- CHECK 行会以你的权限运行任意命令，因此请先阅读你未亲自编写的账本。

账本是可选的，默认的单命令验证方式保持不变。两种工具均可使用。

### 想用 Playwright 自动化 critical user flow，或检查现有 E2E 覆盖率的缺口

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
</ToolTabs>
可以用 `--init` 从零搭建 Playwright，或用 `--audit` 只检查现有覆盖率的缺口。

### 想从业务/服务角度而不是代码角度获得项目评审

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-product-review --format html" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-product-review --format html" />
  </ToolTabsPanel>
</ToolTabs>
从用户价值、UX、增长、风险等业务角度审视项目 —— 代码审查请用 `ywc-impl-review`，安全审查请用 `ywc-security-audit`。

## 当你想积累项目知识（有状态技能）

这些技能不是一次性的工具。它们管理在对话结束后仍保留在项目中的知识，并且可以在以后的会话中被引用。

### 教系统关于重复代码审查反馈的内容，这样它就不会再次提出相同的误报

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings 这个意见是 false positive，记住它" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings 这个意见是 false positive，记住它" />
  </ToolTabsPanel>
</ToolTabs>

### 想扫描大量已合并的 PR，找出反复出现的审查缺陷

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-mine-review-history --limit 50 --min-recurrence 3" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-mine-review-history --limit 50 --min-recurrence 3" />
  </ToolTabsPanel>
</ToolTabs>
它会扫描多个已合并 PR 中的机器人审查评论（CodeRabbit / Codex Review / Claude Review），将每条评论分类为已采纳或已驳回，再将其聚类为缺陷类别。在至少 `--min-recurrence`（默认 3）个不同 PR 中重复出现的类别，会提交给 `ywc-review-learnings`。`--limit` 与 `--since` 至少需要指定一个（它不会扫描全部内容）。它本身不会写入 `docs/review-learnings.md`——晋升必须经过 `ywc-review-learnings` 的确认步骤。若只针对一个开放 PR，请使用 `ywc-handle-pr-reviews`。

### 创建或更新由开发人员、领域专家和大型语言模型共享的领域词汇表

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
</ToolTabs>
`--ddd` 会添加 DDD 类型列，例如实体 / 值对象 / 聚合。

### 想记录 project 的 mission、成功标准和非目标

此 Skill 仅在 Claude Code 中提供。

<CodeBlock label="claude code" code="ywc-project-mission 这个 project 的目标是 ..." />

完整流程见 [09. 开始一个新项目](./07-starting-a-new-project.md)。当项目方向发生变化时，可再次使用 `ywc-project-mission` 更新 mission。

### 想记录难以逆转的架构决策及被拒绝的备选方案

此 Skill 仅在 Claude Code 中提供。

<CodeBlock label="claude code" code="ywc-adr --mode new 我们选择 X 而不是 Y，因为 ..." />

它会写入 `docs/adr/NNNN-<slug>.md`（Context / Decision / Alternatives Considered / Consequences）。模式包括 new / read / list / curate。仅当决策难以逆转、缺少上下文时会让人意外、并且确实存在取舍时才记录。不要编辑旧的 ADR——如需替换，请用 `--supersedes ADR-NNNN` 新建一条记录。

## 当你想要准备一个发布版本时

### 总结包含在发布版本 PR（develop->main 等）中的已合并 PR 列表

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
</ToolTabs>

### 编写 CHANGELOG.md 或面向用户的版本说明

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>
如果你传递 `--pr-list <result file from ywc-release-pr-list>`，它会使用该列表作为来源，而不是 git log。

## 当你想扩展 Toolkit 本身或处理执行基础设施时

### 想创建新的 ywc-* skill，或按规则整理/检查现有 skill

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-skill-author 我想创建一个处理支付 webhook 重试的新 skill" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-skill-author 我想创建一个处理支付 webhook 重试的新 skill" />
  </ToolTabsPanel>
</ToolTabs>
验证并统一 `ywc-*` skill 的 frontmatter/body/references 规则。用于新建或重构 skill 本身，而不是修改 skill 的内容。

### 设置持久输出语言让技能不再每次询问 language

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-setup-language ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-setup --scope project --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
当你希望生成的文档、PR 文本和 commit message 一直使用同一种输出语言，而不是每次调用 skill 都传 `--lang` 时使用它。它设置 project 或 user 的持久默认值，不会更改当前聊天语言。

一次性标志仍然优先。解析顺序是：消费方 skill 上显式传入的 `--lang` > project/user 持久默认值 > 询问用户。

- Codex 的 `ywc-setup` 还会保存协作者缩写（`--initials yk`）。`--scope project|user` 用于选择保存位置：`.codex/ywc.json`（项目）或 `~/.codex/ywc.json`（用户）。
- Claude Code 的 `ywc-setup-language` 仅设置语言，并将 `## Language Policy` 部分写入 `CLAUDE.md`。Claude Code 中的协作者缩写来自 `--initials` 或 `CLAUDE.md` 中的 `## Task Initials` 部分（参见 [06](./05-general-cycle-medium-large.md)）。

### 想创建隔离的 worktree 路径，或检查/清理它

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>
通常由 `ywc-parallel-executor` 内部调用，但你也可以用 `--mode audit`/`prune`/`resolve` 直接检查/清理。

### 并行启动的 worktree 之间 Docker 端口互相冲突，想解决这个问题

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
</ToolTabs>
`ywc-parallel-executor` 为每个 task worktree 自动调用的确定性端口分配 skill —— 为每个 worktree 分配独立的 `COMPOSE_PROJECT_NAME` 和端口区块，避免"port is already allocated"冲突。

## 工具专属 Skill

大多数 Skill 在两个工具中都可用，但有些仅存在于其中一个工具中。

| 工具 | Skill | 作用 |
|---|---|---|
| Codex | `ywc-wayfinder` | 用于大型或不确定变更的多会话探索：在规划或实现之前，建立本地地图并仅保留一个活动 ticket |
| Codex | `ywc-architecture-invariants` | 基于范围受限且已规范化的依赖边（dependency edge）证据，校验可选的仓库根目录 `architecture-invariants.json` 契约 |
| Codex | `ywc-implement` | 以范围聚焦、需通过评审关卡的变更，只实现一个已批准的 spec 或 ticket |
| Codex | `ywc-team-assemble` | 仅在你明确要求时，组建专家团队/委派给 subagent |
| Codex | `ywc-setup` | 设置默认输出语言或协作者缩写（`ywc-setup-language` 的 Codex 对应 skill） |
| Claude Code | [`ywc-adr`](#想记录难以逆转的架构决策及被拒绝的备选方案) | 记录难以逆转的架构决策及被拒绝的备选方案 |
| Claude Code | [`ywc-project-mission`](#想记录-project-的-mission成功标准和非目标) | 记录 project 的 mission、成功标准和非目标 |
| Claude Code | `ywc-setup-language` | 设置持久输出语言，使 `--lang` 无需每次传入 |

## 全部 Skill 索引 (A-Z)

按字母顺序列出此 toolkit 中的所有 `ywc-*` skill。详细用法请参见各 skill 的位置(专用页面或上方的情境条目)。

| Skill | 说明 | 位置 |
|---|---|---|
| `ywc-adr` | 想记录难以逆转的架构决策及被拒绝的备选方案 *（仅限 Claude Code）* | [此处](#想记录难以逆转的架构决策及被拒绝的备选方案) |
| `ywc-agentic` | 你想设定一个目标，然后让整个从规划到执行的过程在无人干预下运行 | [此处](#你想设定一个目标然后让整个从规划到执行的过程在无人干预下运行) |
| `ywc-architecture-invariants` | 基于范围受限且已规范化的依赖边证据，校验可选的 `architecture-invariants.json` 契约 *（仅限 Codex）* | [此处](#工具专属-skill) |
| `ywc-auth-implement` | 在写任何代码之前先确定策略决策，再实现身份验证功能 | [17](./18-authentication-implementation.md) |
| `ywc-brainstorm` | 你的想法还不具体，你想先把它弄清楚 | [此处](#你的想法还不具体你想先把它弄清楚) |
| `ywc-changelog-release-notes` | 编写 CHANGELOG.md 或面向用户的版本说明 | [此处](#编写-changelogmd-或面向用户的版本说明) |
| `ywc-code-gen` | 并行同时生成 Backend/Frontend/QA 三层的多层代码生成 skill | [18](./13-executor-and-codegen-patterns.md) |
| `ywc-commit` | 只提交目前完成的工作 | [此处](#只提交目前完成的工作) |
| `ywc-confidence-gate` | 用 PROCEED/REVIEW/STOP 判定成果是否可以进入下一阶段的信心 gate | [07](./06-agentic-autonomous-loop.md) |
| `ywc-create-pr` | 提交更改并打开草稿 PR | [此处](#提交更改并打开草稿-pr) |
| `ywc-debug-rootcause` | 你被卡住了，因为你找不到一个错误的根本原因 | [15](./12-debugging-and-incident-postmortem.md) |
| `ywc-design-renew` | 对看起来平凡的界面进行视觉 De-slop renewal 的 skill | [13](./11-design-review.md) |
| `ywc-docker-isolate` | 并行启动的 worktree 之间 Docker 端口互相冲突，想解决这个问题 | [此处](#并行启动的-worktree-之间-docker-端口互相冲突想解决这个问题) |
| `ywc-e2e-test-strategy` | 想用 Playwright 自动化 critical user flow，或检查现有 E2E 覆盖率的缺口 | [此处](#想用-playwright-自动化-critical-user-flow或检查现有-e2e-覆盖率的缺口) |
| `ywc-finish-branch` | 将已完成的 feature branch 从创建 PR 到 merge、清理全部收尾的 skill | [05](./04-general-cycle-small.md) |
| `ywc-gen-testcase` | 根据 spec 生成用于 PR 验证的手动测试文档（testsheet）的 skill | [11](./09-testing-guide.md) |
| `ywc-handle-pr-reviews` | 回应开放 PR 的审查意见，并清理 CI/冲突 | [此处](#回应开放-pr-的审查意见并清理-ci冲突) |
| `ywc-iac-author` | 把完成的设计变成实际的 Infrastructure-as-Code | [16](./17-infrastructure-and-cloud.md) |
| `ywc-impl-review` | 想在常规 cycle 之外，独立检查实现质量和 maintenance 角度 | [14](./16-code-structure-and-maintainability.md) |
| `ywc-implement` | 以范围聚焦、需通过评审关卡的变更，只实现一个已批准的 spec 或 ticket *（仅限 Codex）* | [此处](#工具专属-skill) |
| `ywc-incident-postmortem` | 发生了生产事故，你需要写一份事后分析报告 | [15](./12-debugging-and-incident-postmortem.md) |
| `ywc-infra-design` | 在写任何 IaC 之前先设计云架构 | [16](./17-infrastructure-and-cloud.md) |
| `ywc-infra-optimize` | 改进已经在运行的基础设施 | [16](./17-infrastructure-and-cloud.md) |
| `ywc-infra-review` | 在 apply 之前发现 misconfiguration/成本/可靠性问题 | [16](./17-infrastructure-and-cloud.md) |
| `ywc-merge-dependabot` | 一次性清理累积的 Dependabot PR | [此处](#一次性清理累积的-dependabot-pr) |
| `ywc-mine-review-history` | 扫描大量已合并的 PR，找出反复出现的审查缺陷 | [此处](#想扫描大量已合并的-pr找出反复出现的审查缺陷) |
| `ywc-onboard-repo` | 反推陌生 repo 的约定并生成 CLAUDE.md 的 onboarding skill | [10](./08-onboarding-existing-repo.md) |
| `ywc-parallel-executor` | 在隔离的 worktree 中并行执行多个 Task 的 executor | [18](./13-executor-and-codegen-patterns.md) |
| `ywc-plan` | 为功能/变更制定实现计划的入口 skill | [05](./04-general-cycle-small.md) |
| `ywc-product-review` | 想从业务/服务角度而不是代码角度获得项目评审 | [此处](#想从业务服务角度而不是代码角度获得项目评审) |
| `ywc-project-docs` | 按照 docs/ 目录结构生成 project 文档的 skill | [09](./07-starting-a-new-project.md) |
| `ywc-project-mission` | 记录 project 的 mission、成功标准和非目标 *（仅限 Claude Code）* | [此处](#想记录-project-的-mission成功标准和非目标) |
| `ywc-project-scaffold` | 从零设计全新 project 目录结构的 skill | [09](./07-starting-a-new-project.md) |
| `ywc-receive-review` | 不想无条件接受审查者（人类或 CodeRabbit/Codex/Claude）的意见，想先进行技术验证再回应 | [此处](#不想无条件接受审查者人类或-coderabbitcodexclaude的意见想先进行技术验证再回应) |
| `ywc-refactor-clean` | 清理旧的无用代码（未使用的函数/导出/依赖） | [14](./16-code-structure-and-maintainability.md) |
| `ywc-release-pr-list` | 总结包含在发布版本 PR（develop->main 等）中的已合并 PR 列表 | [此处](#总结包含在发布版本-prdevelop-main-等中的已合并-pr-列表) |
| `ywc-review-learnings` | 教系统关于重复代码审查反馈的内容，这样它就不会再次提出相同的误报 | [此处](#教系统关于重复代码审查反馈的内容这样它就不会再次提出相同的误报) |
| `ywc-security-audit` | 检查敏感代码中的安全漏洞，例如认证/支付 | [此处](#检查敏感代码中的安全漏洞例如认证支付) |
| `ywc-sequential-executor` | 按顺序逐个执行多个 Task 的 executor | [18](./13-executor-and-codegen-patterns.md) |
| `ywc-setup` | 设置持久输出语言让技能不再每次询问 language *（仅限 Codex）* | [此处](#设置持久输出语言让技能不再每次询问-language) |
| `ywc-setup-language` | 设置持久输出语言，使 `--lang` 无需每次传入 *（仅限 Claude Code）* | [此处](#设置持久输出语言让技能不再每次询问-language) |
| `ywc-skill-author` | 想创建新的 ywc-* skill，或按规则整理/检查现有 skill | [此处](#想创建新的-ywc--skill或按规则整理检查现有-skill) |
| `ywc-spec-ready` | 验证 spec 文档是否已达到可实现程度的 gate | [06](./05-general-cycle-medium-large.md) |
| `ywc-spec-validate` | 检查 spec 文档中矛盾与遗漏的验证 skill | [06](./05-general-cycle-medium-large.md) |
| `ywc-spec-writer` | 编写 PRD/spec 文档的 skill | [09](./07-starting-a-new-project.md) |
| `ywc-task-generator` | 将 spec 拆解为可执行 Task 的 skill | [06](./05-general-cycle-medium-large.md) |
| `ywc-tdd-ritual` | 想严格按照文档化的流程执行 RED → GREEN → REFACTOR | [此处](#想严格按照文档化的流程执行-red--green--refactor) |
| `ywc-team-assemble` | 仅在你明确要求时，组建专家团队/委派给 subagent *（仅限 Codex）* | [此处](#工具专属-skill) |
| `ywc-tech-research` | 想比较库或实现方式，决定要用什么 | [此处](#想比较库或实现方式决定要用什么) |
| `ywc-ubiquitous-language` | 创建或更新由开发人员、领域专家和大型语言模型共享的领域词汇表 | [此处](#创建或更新由开发人员领域专家和大型语言模型共享的领域词汇表) |
| `ywc-ui-ux-review` | 检查界面可用性和可访问性的 skill | [13](./11-design-review.md) |
| `ywc-verify-done` | 通过运行 lint/typecheck/test/build 机械化验证完成情况的 skill | [此处](#想用明确可重复运行的-gate-证明完成情况) |
| `ywc-wayfinder` | 用于大型或不确定变更的多会话探索，在规划或实现前建立本地地图 *（仅限 Codex）* | [此处](#工具专属-skill) |
| `ywc-worktrees` | 想创建隔离的 worktree 路径，或检查/清理它 | [此处](#想创建隔离的-worktree-路径或检查清理它) |

---

[← 上一页: 18. Executor / 代码生成提示模式](./13-executor-and-codegen-patterns.md) · [返回目录 »](./README.md)
