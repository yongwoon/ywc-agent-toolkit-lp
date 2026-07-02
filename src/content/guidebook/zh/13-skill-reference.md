[Back to table of contents](./README.md)

# 13. 完整 Skill 参考

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
| [`ywc-debug-rootcause`](#你被卡住了因为你找不到错误的原因) | 你被卡住了，因为你找不到错误的原因 |
| [`ywc-refactor-clean`](#清理旧的无用代码未使用的函数导出依赖) | 清理旧的无用代码（未使用的函数/导出/依赖） |
| [`ywc-incident-postmortem`](#为生产事故撰写事后分析报告) | 为生产事故撰写事后分析报告 |
| [`ywc-tdd-ritual`](#想严格按照文档化的流程执行-red--green--refactor) | 想严格按照文档化的流程执行 RED → GREEN → REFACTOR |
| [`ywc-e2e-test-strategy`](#想用-playwright-自动化-critical-user-flow或检查现有-e2e-覆盖率的缺口) | 想用 Playwright 自动化 critical user flow，或检查现有 E2E 覆盖率的缺口 |
| [`ywc-product-review`](#想从业务服务角度而不是代码角度获得项目评审) | 想从业务/服务角度而不是代码角度获得项目评审 |
| [`ywc-review-learnings`](#教系统关于重复代码审查反馈的内容这样它就不会再次提出相同的误报) | 教系统关于重复代码审查反馈的内容，这样它就不会再次提出相同的误报 |
| [`ywc-ubiquitous-language`](#创建或更新由开发人员领域专家和大型语言模型共享的领域词汇表) | 创建或更新由开发人员、领域专家和大型语言模型共享的领域词汇表 |
| [`ywc-project-mission`](#记录项目的原因和被拒绝的方法) | 记录项目的原因和被拒绝的方法 |
| [`ywc-release-pr-list`](#总结包含在发布版本-prdevelop-main-等中的已合并-pr-列表) | 总结包含在发布版本 PR（develop->main 等）中的已合并 PR 列表 |
| [`ywc-changelog-release-notes`](#编写-changelogmd-或面向用户的版本说明) | 编写 CHANGELOG.md 或面向用户的版本说明 |
| [`ywc-skill-author`](#想创建新的-ywc--skill或按规则整理检查现有-skill) | 想创建新的 ywc-* skill，或按规则整理/检查现有 skill |
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

### 提交更改并打开草稿 PR

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
这已经包含在来自 [04](./04-general-cycle-small.md) 和 [05](./05-general-cycle-medium-large.md) 的流程中，因此当你想在这些流程之外仅打开独立的 PR 时使用它。

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
    <CodeBlock label="claude code" code="ywc-commit authentication 관련 변경만 커밋해줘" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-commit authentication 관련 변경만 커밋해줘" />
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
    <CodeBlock label="claude code" code="ywc-brainstorm 알림 기능을 만들고 싶은데 아직 어떻게 할지 구체적이지 않음" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm 알림 기능을 만들고 싶은데 아직 어떻게 할지 구체적이지 않음" />
  </ToolTabsPanel>
</ToolTabs>
通过苏格拉底式对话，它推导出目标/约束条件/成功标准以及2-3个备选方案，然后交给`ywc-plan`。

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

这已移至专用的 `ywc-agentic` 页面。用法和示例请参见 [06. Finish automatically from one goal](./06-agentic-autonomous-loop.md)。

## 当你想要检查质量、安全和产品视角时

### 检查敏感代码中的安全漏洞，例如认证/支付

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-security-audit --code tools/codex-skill/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-security-audit --code tools/codex-skill/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
</ToolTabs>

### 你被卡住了，因为你找不到错误的原因

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-debug-rootcause 결제 webhook 이 가끔 중복 처리됨. 원인을 못 찾겠음" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-debug-rootcause 결제 webhook 이 가끔 중복 처리됨. 원인을 못 찾겠음" />
  </ToolTabsPanel>
</ToolTabs>
这可以防止仅解决症状的补丁，并强制进行四步根本原因调查。如果修复在同一点失败三次或更多次，它会引导你质疑架构本身。

### 清理旧的无用代码（未使用的函数/导出/依赖）

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-refactor-clean --scope tools/codex-skill/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-refactor-clean --scope tools/codex-skill/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
</ToolTabs>

### 为生产事故撰写事后分析报告

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
</ToolTabs>
`--client` 另外会创建一个面向客户的摘要，省略内部细节。

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
    <CodeBlock label="claude code" code="ywc-review-learnings 이 지적은 false positive 야, 학습해둬" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings 이 지적은 false positive 야, 학습해둬" />
  </ToolTabsPanel>
</ToolTabs>

### 创建或更新由开发人员、领域专家和大型语言模型共享的领域词汇表

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
</ToolTabs>
`--ddd` 添加了 DDD 类型列，例如实体 / 值对象 / 聚合。

### 记录项目的原因和被拒绝的方法

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission 이 project 의 목표는 ..." />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission 이 project 의 목표는 ..." />
  </ToolTabsPanel>
</ToolTabs>
这已经在 [07. Starting a new Project](./07-starting-a-new-project.md) 中涵盖，并且当项目方向发生变化时也可以重复使用。

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

---

[Previous: 12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md) - [Next: 14. Prerequisites and installation](./14-prerequisites-installation.md)
