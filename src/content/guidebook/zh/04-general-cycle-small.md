[Back to table of contents](./README.md)

# 04. 处理小变动（一般周期 - 小）

## 何时使用此流程

当 `ywc-plan` 将请求判断为 **Small** 时，它会自动进入此路径。判定标准是“是否可以作为单个 PR 完成而无需 Task 拆解？” 如果以下任何一项适用，它将被提升为 Medium/Large 而不是 Small（参见 [05](./05-general-cycle-medium-large.md)）。

- 包括数据库迁移
- 介绍一个新的库/框架
- 跨多个子系统

## 整体流程

```
ywc-plan -> ywc-spec-ready -> ywc-code-gen -> ywc-impl-review -> ywc-create-pr
```

| 步骤 | Skill | 角色 |
|---|---|---|
| 一 | `ywc-plan` | 分析请求并创建 `plan.md`（什么 / 为什么 / 不在范围内 / 完成条件） |
| 二 | `ywc-spec-ready` | 自动在 `plan.md` 中汇总剩余问题 |
| 三 | `ywc-code-gen` | 同时生成后端 + 前端 + 测试代码 |
| 四 | `ywc-impl-review` | 在打开 PR 之前的最终代码审查 |
| 五 | `ywc-create-pr` | PR 创建 -> CI -> 机器人审核检查 |

> **注意**：`ywc-code-gen` 没有像 `--review` 那样的自动审查标志。如果跳过第 4 步（`ywc-impl-review`），PR 将在没有代码审查的情况下被打开，因此此流程必须显式运行它。中/大型流程的执行者可以使用 `--review` 标志自动执行此步骤——参见 [05](./05-general-cycle-medium-large.md)。

## 示例运行

```
ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움. 잠김/오타/미가입 등 구체적 사유를 보여주고 싶음
```
```
ywc-spec-ready --spec plan.md
```
```
ywc-code-gen --spec plan.md --feature "specific login failure reason"
```
```
ywc-impl-review
```
```
ywc-create-pr --title "fix: show specific login failure reason"
```

如果机器人审查意见、CI 失败或合并准备问题仍然存在，请继续使用 `ywc-handle-pr-reviews <pr-number>`。Small 流程基于 `plan.md`，因此没有 `tasks/<task-name>/` 目录，并且它不适合 `ywc-finish-branch` 的任务完成处理。

## 当你在每一步都被阻挡时

| 情况 | 动作 |
|---|---|
| `ywc-plan` 将这项工作评为中等，而不是小型 | 这是正常的 - 移动到 [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) |
| `ywc-code-gen` 返回 `BLOCKED` | 规格可能不清楚或无法读取项目上下文 - 请检查报告的阻塞因素 |
| `ywc-impl-review` 返回 `DONE_WITH_CONCERNS` | 如果是正确性问题，修复并重新运行；如果是观察结果，将其记录在PR描述中并继续 |
| PR 失败 CI | `ywc-create-pr` 或 `ywc-handle-pr-reviews` 会检查失败日志并尝试修复最多两次——如果仍然失败，该问题会显示为 `DONE_WITH_CONCERNS` 或 `BLOCKED` |

---

[Previous: 03. Ship your first feature in 5 minutes](./03-quickstart.md) - [Next: 05. Handling work split into multiple Tasks](./05-general-cycle-medium-large.md)
