[« 返回目录](./README.md)

# 15. 实现身份验证

## 何时使用这个 Skill

当项目需要新增身份验证功能——登录/注册、OAuth、MFA、会话处理、密码重置、账户删除或同意流程——并且你希望在写任何代码之前就明确做出策略决策时，使用 `ywc-auth-implement`。但它并不覆盖所有与认证相关的事情：

- 如果认证代码已经存在，你只是想对它做一次安全审查，请改用 [`ywc-security-audit`](./14-skill-reference.md)——这个 Skill 负责驱动构建，而不是事后审查。
- 对于与认证无关的一般功能规划，请使用 [`ywc-plan`](./14-skill-reference.md)——这个 Skill 的策略访谈是认证专属的，不能替代一般规划工作。
- 要为认证流程之外的场景编写 E2E 覆盖，请使用 [11. E2E 测试自动化策略](./10-e2e-test-strategy.md)——这个 Skill 只驱动下文描述的、限定在认证流程内的 E2E 关卡，不涉及项目更广泛的测试套件。

## 流程如何运作

**第 1 步：Preflight gate**

在提出任何问题之前，先执行五项幂等检查：

- 如果已存在 `feature/<auth-slug>` 分支就复用它（只有从 long-lived 分支开始时才会新建分支）
- `.env.example` 只补充缺失的占位符，绝不覆盖或暴露已有的值
- 如果框架/数据库方面的证据不足，先路由到 `ywc-tech-research`
- 如果检测到已有认证，则以 `NEEDS_CONTEXT` 硬性停止，直到你选择 `new`/`extend`/`migrate` 之一
- 任何 ToS/隐私政策草案从第一行起就标注"待法务审查的草案"

**第 2 步：9 类策略访谈**

在一轮集中的访谈中覆盖：

- 登录方式与 OAuth provider 就绪情况
- MFA 注册与恢复
- 会话存储/TTL/轮换/撤销/设备管理
- 密码重置与哈希库边界
- 资料字段
- 账户删除与重新认证
- 浅层 RBAC（角色、默认值、claims）
- 同意的版本管理/收集/撤回
- 滥用防范（限流、验证、恢复控制）

每个回答都会被记录为已批准、已明确说明风险后延后处理，或不适用。

**第 3 步：动态推荐**

根据你的技术栈证据和已批准的策略回答，这个 Skill 会推荐经过实战检验的库或托管服务——绝不使用固定的"支持栈"清单。如果证据不足，就会回退到通过 `ywc-tech-research` 进行的实时调研。

**第 4 步：实现 dispatch**

这个 Skill 只负责编排，不会自己编写认证代码。它会分派给三个 agent，每个都遵循 `ywc-tdd-ritual`（RED → 验证 RED → GREEN → 验证 GREEN → REFACTOR → 验证 GREEN）：

- `ywc-backend-coder` — 负责已批准的后端策略（绝不自行实现密码哈希、令牌签名或密钥加密）
- `ywc-frontend-coder` — 负责登录/注册表单、MFA 注册 UI、以及会话感知路由
- `ywc-doc-writer` — 负责 ToS/隐私政策草案

**第 5 步：安全、E2E 与 PR 关卡**

dispatch 出去的工作落地后，会对该 diff 运行 `ywc-security-audit`：

| 审计结果 | 接下来发生什么 |
|---|---|
| Critical/High 为 0 项 | 进入只覆盖已批准流程（仅当选择了邮箱/密码时才有注册/登录/重置、仅当启用时才有账户删除、每个已配置的 OAuth provider 各一条流程、仅当批准时才有 MFA）的、由 `ywc-e2e-test-strategy` 执行的策略条件式 E2E |
| 只要有 1 项 Critical/High | 返回 `DONE_WITH_CONCERNS`，并跳过 E2E 和 PR 创建，直到问题被修复 |

只有两道关卡都通过后，这个 Skill 才会建议使用 `ywc-create-pr`——绝不会自动执行。

## `ywc-auth-implement`

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-auth-implement" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-auth-implement" />
  </ToolTabsPanel>
</ToolTabs>

不带任何 flag 运行——从 preflight gate 开始，访谈和之后的每一个决策都是交互式驱动的，因此不存在需要预先提供的"scope"或"flow"参数。

## Claude Code 与 Codex 的区别

访谈内容、不使用固定技术栈的推荐规则、`new`/`extend`/`migrate` 的硬性停止，以及安全/E2E 关卡，在两个工具上都是相同的。不同的是 dispatch 机制：Claude Code 通过 `Task(subagent_type: ...)` 直接 fan-out 给 `ywc-backend-coder`、`ywc-frontend-coder`、`ywc-doc-writer`。Codex 则在当前会话内继续编排，转而（绝不自动调用）打印出一条 skill-chain 路线——`$ywc-plan → $ywc-spec-ready → $ywc-task-generator → $ywc-code-gen --tdd --review`——由 `$ywc-code-gen` 负责应用层实现及其自身的安全审查。如果只是委托文档类工作，Codex 会使用一个边界明确的通用 subagent，而不是 named-agent 的 fan-out。

---

[Previous: 14. 管理云基础设施](./17-infrastructure-and-cloud.md) - [Next: 16. Executor / 代码生成提示模式](./13-executor-and-codegen-patterns.md)
