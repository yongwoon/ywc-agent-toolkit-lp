[Back to table of contents](./README.md)

# 07. 开始一个新项目

## 何时使用此流程

当还没有 Git 仓库，或者仓库存在但本质上是一个几乎没有代码的空白状态时，请使用此方法。如果你试图理解一个已经有代码的不熟悉的仓库，请改用 [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md)。这些流程方向相反，不应在同一会话中同时使用。

## 整体流程

| 步骤 | Skill | 角色 |
|---|---|---|
| 一 | `ywc-project-scaffold` | 决定技术栈/架构模式，然后设计目录结构（输出一个 Markdown 计划） |
| 二 | `ywc-project-mission` | 在 `docs/mission.md` 中记录项目的原因、成功标准以及被拒绝的方法记录 |
| 三 | `ywc-spec-writer --full` | 在 `docs/specification/` 下撰写完整规格（目标 / 功能 / 数据模型 / 用户流程） |
| 四 | `ywc-spec-validate` | 验证规范的完整性 / 一致性 / 可行性 / 代码兼容性 |
| 五 | `ywc-project-docs` | 如有需要，附加的文档，如架构/产品/运营 |
| 六 | `ywc-task-generator` | 将 `DONE` 规范分解为依赖安全的 Tasks |
| 七 | 输入 [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) | 开始实际实施 |

## 示例运行

**1. 设计目录结构**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
</ToolTabs>
必须提供语言。如果其他详细信息缺失，Skill会提出后续问题，因此尽可能同时指定框架/架构/规模。此技能仅输出**Markdown计划**。实际文件创建由`ywc-code-gen`处理。

**2. 记录项目的原因**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission 이 project 의 목표는 소규모 건설업체가 별도 앱 없이 출퇴근을 기록하게 하는 것. 성공 기준은 관리자 1명이 인력 10명 이하의 근태를 5분 안에 마감할 수 있는가" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission 이 project 의 목표는 소규모 건설업체가 별도 앱 없이 출퇴근을 기록하게 하는 것. 성공 기준은 관리자 1명이 인력 10명 이하의 근태를 5분 안에 마감할 수 있는가" />
  </ToolTabsPanel>
</ToolTabs>

**3. 写出完整规格**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**4. 验证规范**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
</ToolTabs>
如果返回 `DONE_WITH_CONCERNS`，则回到 `ywc-spec-writer`，完善规格，并再次验证。重复此过程，直到返回 `DONE`。（`ywc-spec-ready` 是仅用于 `ywc-plan` 创建的规格的自动收敛循环，因此此处不要使用它。）

**5. 额外文件（如有需要）**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
</ToolTabs>

**6. 分解为 Tasks**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

## 笔记

- 如果范围足够小，可以直接实现而无需规格分解，`ywc-plan` 可以路由到小路径并跳过整个流程。
- `ywc-onboard-repo` 的移动方向与此流程（调查现有仓库）相反，因此在创建新项目时不要使用它。

---

[Previous: 06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) - [Next: 08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md)
