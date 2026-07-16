# ywc Skill & Agent 指南

> 本指南是为首次接触 `ywc-*` 技能和代理的人整理的用户手册。每一页都以转换为独立网页文档页面为目的编写，下面的目录也即网站的侧栏结构。

## 如何阅读本指南

- 如果这是你第一次，请按原顺序完成 **入门指南**（01 -> 02 -> 03）。
- 如果你已经了解基本概念并且正在寻找特定任务，请直接跳转到 **工作流程指南** 中的相关页面。
- 拥有许多选项、需要你反复查找语法的技能被收集在**参考**中，围绕命令示例为中心。

## 你在尝试做什么？（按目标快速链接）

这是围绕**你现在正在尝试做的事情**来组织的，而不是“存在哪些技能”。在下面找到你的情况，然后直接开始。

| 你想做什么 | 开始 Skill | 指南 |
|---|---|---|
| 修复一个漏洞或添加一个小功能 | `ywc-plan` | [03](./03-quickstart.md), [04](./04-general-cycle-small.md) |
| 构建一个需要拆分为多个 Tasks 的更大功能 | `ywc-plan` -> `ywc-task-generator` | [05](./05-general-cycle-medium-large.md) |
| 给出一个目标，并让系统自动完成从规划到实施的全过程 | `ywc-agentic` | [06](./06-agentic-autonomous-loop.md) |
| 从零开始设计一个全新的项目 | `ywc-project-scaffold` | [07](./07-starting-a-new-project.md) |
| 第一次理解不熟悉的仓库/代码库 | `ywc-onboard-repo` | [08](./08-onboarding-existing-repo.md) |
| 执行已经分解的 Tasks（顺序/并行） | `ywc-sequential-executor` / `ywc-parallel-executor` | [16](./13-executor-and-codegen-patterns.md) |
| 澄清一个尚不具体的想法 | `ywc-brainstorm` | [17](./14-skill-reference.md) |
| 为 PR 验证创建手动测试文档 | `ywc-gen-testcase` | [09](./09-testing-guide.md) |
| 建立或扩展 E2E 测试自动化 | `ywc-e2e-test-strategy` | [10](./10-e2e-test-strategy.md) |
| 检查屏幕可用性或可访问性 | `ywc-ui-ux-review` | [11](./11-design-review.md) |
| 改善看起来视觉上普通的屏幕 | `ywc-design-renew` | [11](./11-design-review.md) |
| 检查代码中的安全漏洞 | `ywc-security-audit` | [17](./14-skill-reference.md) |
| 实现身份验证功能（登录、OAuth、MFA） | `ywc-auth-implement` | [15](./18-authentication-implementation.md) |
| 你被卡住了，因为你找不到一个错误的根本原因 | `ywc-debug-rootcause` | [12](./12-debugging-and-incident-postmortem.md) |
| 发生了生产事故，你需要写一份事后分析报告 | `ywc-incident-postmortem` | [12](./12-debugging-and-incident-postmortem.md) |
| 清理旧的死代码 | `ywc-refactor-clean` | [13](./16-code-structure-and-maintainability.md) |
| 回复有关开放 PR 的评审意见 | `ywc-handle-pr-reviews` | [17](./14-skill-reference.md) |
| 一次性清理积压的 Dependabot PR | `ywc-merge-dependabot` | [17](./14-skill-reference.md) |
| 编写 CHANGELOG 或发布说明 | `ywc-changelog-release-notes` | [17](./14-skill-reference.md) |
| 只提交到目前为止完成的工作 | `ywc-commit` | [17](./14-skill-reference.md) |
| 结构混乱，或从 maintenance 角度看实现质量不佳 | `ywc-improve-architecture` | [13](./16-code-structure-and-maintainability.md) |
| 想比较库或实现方式，决定要用什么 | `ywc-tech-research` | [17](./14-skill-reference.md) |
| 想管理对话结束后仍留在 project 中的知识（术语表/评审学习/mission） | `ywc-ubiquitous-language` | [17](./14-skill-reference.md) |

对于本表未涵盖的情况，请参见 [17. Full Skill Reference](./14-skill-reference.md)。

## 目录

### 序言

| 页面 | 描述 |
|---|---|
| [01. Introduction](./01-introduction.md) | 这个 Skill/Agent 生态系统是什么，它适合谁，以及它解决了哪些问题 |
| [02. Core concepts](./02-core-concepts.md) | 诸如 Skill / Agent / Executor / Task 之类的术语，调用语法，以及诸如 `DONE` 的四种完成状态 |

### 入门

| 页面 | 描述 |
|---|---|
| [03. Ship your first feature in 5 minutes](./03-quickstart.md) | 第一次动手练习，将一个小功能从构想到合并 |

### 工作流程指南

| 页面 | 描述 |
|---|---|
| [04. Handling a small change (general cycle - small)](./04-general-cycle-small.md) | 一个以单个 PR 完成且没有 Task 分解的更改的标准流程 |
| [05. Handling work split into multiple Tasks (general cycle - medium/large)](./05-general-cycle-medium-large.md) | 需要规格验证和 Task 分解的变更流程 |
| [06. Finish automatically from one goal (ywc-agentic)](./06-agentic-autonomous-loop.md) | 不是在04/05中手动控制，而是从单一目标自动重复计划 -> 执行 -> 评估 -> 重复 |
| [07. Starting a new Project](./07-starting-a-new-project.md) | 从一张白纸到项目设计和第一个完成的规格 |
| [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) | 一个入职流程，能够从不熟悉的代码库中反向工程约定，并创建 `CLAUDE.md` |
| [09. Writing and running Tests](./09-testing-guide.md) | 如何将手动验证测试表与自动化测试一起操作 |
| [10. E2E Test automation strategy](./10-e2e-test-strategy.md) | 基于 Playwright 的 E2E 套件的高级设置、扩展和维护指南 |
| [11. Reviewing and improving design](./11-design-review.md) | 如何区分和应用可用性审核与视觉去倾斜更新 |
| [12. 根本原因调查和事后分析](./12-debugging-and-incident-postmortem.md) | 如何使用 `ywc-debug-rootcause` 进行根本原因调查，以及使用 `ywc-incident-postmortem` 编写事后分析报告 |
| [13. 管理代码结构与可维护性](./16-code-structure-and-maintainability.md) | 整理、重构和验证结构不佳或难以维护的代码的 4 个 Skill 的用法，以及它们协同工作的顺序 |
| [14. 管理云基础设施](./17-infrastructure-and-cloud.md) | 用一张决策表和 4 步流水线整理 `ywc-infra-design`、`ywc-iac-author`、`ywc-infra-review`、`ywc-infra-optimize`，并对接到 `ywc-cloud-engineer` agent |
| [15. 实现身份验证](./18-authentication-implementation.md) | `ywc-auth-implement` 如何推进 preflight -> 策略访谈 -> 推荐 -> dispatch 流程，以及它强制执行的 security / E2E / PR gate |

### 参考

| 页面 | 描述 |
|---|---|
| [16. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) | 针对选项繁多的 `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` 的实用命令示例 |
| [17. Full Skill Reference](./14-skill-reference.md) | 未在上述指南中涵盖的剩余技能索引，按情境分类 |
| [18. 前置条件与安装](./15-prerequisites-installation.md) | 为了让 ywc-* Skill 稳定运行，需要预先准备的必需/可选 Tool 列表 |

## 源材料

本指南中的所有命令语法和选项均已根据每个 Skill 的 `SKILL.md`（`claude-code/skills/<skill-name>/SKILL.md`）进行验证。如果某个选项与实际行为看起来不同，则该 Skill 的 `SKILL.md` 是当前的真实来源。本文档是该材料的用户友好型次要呈现。
