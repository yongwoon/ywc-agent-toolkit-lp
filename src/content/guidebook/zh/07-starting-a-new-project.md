[Back to table of contents](./README.md)

# 07. 开始一个新项目

## 何时使用此流程

当还没有 Git 仓库，或者仓库存在但本质上是一个几乎没有代码的空白状态时，请使用此方法。如果你试图理解一个已经有代码的不熟悉的仓库，请改用 [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md)。这些流程方向相反，不应在同一会话中同时使用。

> 开始之前：如果你不想每次都传 `--lang`，可以先用 `ywc-setup-language` 把输出语言固定一次。之后下面的 skill 都会遵循该设置。

## 整体流程

此流程是一个漏斗：**发散 → 决定 → 收敛 → 着手闸门**。先把想法广泛铺开(一)，敲定为什么与做什么(二~三)，收窄为结构与规格(四~九)，通过"可以开始构建"的闸门(十)，然后进入实现。标注 *(可选)* 的步骤在已确定时可以跳过。

| 步骤 | Skill | 角色 |
|---|---|---|
| 一 | `ywc-brainstorm` *(可选)* | 当想法还模糊时，通过每次一个问题的苏格拉底式对话敲定目的、约束、成功标准以及 2~3 个备选方案。若意图已明确则跳过 |
| 二 | `ywc-project-mission` | 在 `docs/mission.md` 中记录项目的原因、成功标准以及被拒绝的方法记录。**在设计任何结构之前先敲定为什么** |
| 三 | `ywc-tech-research` *(可选)* | 并行比较技术栈/库的候选并记录选择理由。若技术栈已决定则跳过 |
| 四 | `ywc-project-scaffold` | 基于已确定的技术栈，设计目录结构（输出一个 Markdown 计划） |
| 五 | `ywc-ubiquitous-language` *(以领域为核心的项目推荐)* | 在 `docs/ubiquitous-language.md` 中定义开发者、领域专家与 LLM 共享的标准术语表 → 之后的规格与 `ywc-code-gen` 便使用规范术语 |
| 六 | `ywc-spec-writer --full` | 在 `docs/specification/` 下撰写完整规格（目标 / 功能 / 数据模型 / 用户流程） |
| 七 | `ywc-spec-validate` | 验证规范的完整性 / 一致性 / 可行性 / 代码兼容性。循环六↔七 直到 `DONE` |
| 八 | `ywc-project-docs` | 如有需要，附加的文档，如架构/产品/运营 |
| 九 | `ywc-task-generator` | 将 `DONE` 规范分解为依赖安全的 Tasks |
| 十 | `ywc-confidence-gate` | 在实现之前，用五个维度对准备度打分（PROCEED ≥90 / REVIEW 70–89 / STOP &lt;70） |
| 十一 | 进入 [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) | 开始实际实施 |

## 示例运行

**1. 梳理想法（可选）**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm 我想让一家小型建筑公司无需单独的应用即可记录上下班打卡，但不知道从哪里开始" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm 我想让一家小型建筑公司无需单独的应用即可记录上下班打卡，但不知道从哪里开始" />
  </ToolTabsPanel>
</ToolTabs>
它通过每次一个问题的苏格拉底式对话收窄目的、约束与备选方案。如果你已经清楚要构建什么，跳过此步，从第 2 步开始。

**2. 记录项目的原因**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission 这个 project 的目标是让小型建筑公司无需单独的应用即可记录员工的上下班打卡。成功标准是一名管理员能否在 5 分钟内完成 10 名以下员工的考勤结算" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission 这个 project 的目标是让小型建筑公司无需单独的应用即可记录员工的上下班打卡。成功标准是一名管理员能否在 5 分钟内完成 10 名以下员工的考勤结算" />
  </ToolTabsPanel>
</ToolTabs>
在目录结构或规格之前先敲定 **为什么与成功标准** —— 之后的每一步都以此 mission 为判断基准。

**3. 决定技术栈（可选）**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
</ToolTabs>
第 4 步（scaffold）是在*技术栈确定之后*才绘制结构，所以如果技术栈尚未敲定，就在这里比较候选并留下理由，然后再继续。若已决定则跳过。

**4. 设计目录结构**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
</ToolTabs>
必须提供语言。如果其他详细信息缺失，Skill 会提出后续问题，因此尽可能同时指定框架/架构/规模。此技能仅输出 **Markdown 计划**。实际文件创建由 `ywc-code-gen` 处理。

**5. 领域术语表（以领域为核心的项目推荐）**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
</ToolTabs>
预先定义规范术语，可让后续的规格与 `ywc-code-gen` 使用相同的名称，防止同义词渗入代码。术语简单的项目可以跳过。

**6. 写出完整规格**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**7. 验证规范**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
</ToolTabs>
如果返回 `DONE_WITH_CONCERNS`，则回到第 6 步 `ywc-spec-writer`，完善规格，并再次验证。重复此过程，直到返回 `DONE`。（`ywc-spec-ready` 是仅用于 `ywc-plan` 创建的规格的自动收敛循环，因此此处不要使用它。）

**8. 额外文件（如有需要）**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
</ToolTabs>

**9. 分解为 Tasks**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**10. 着手闸门**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-confidence-gate 检查用这份 spec 和 task 是否可以开始实现" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-confidence-gate 检查用这份 spec 和 task 是否可以开始实现" />
  </ToolTabsPanel>
</ToolTabs>
它对五个维度打分：scope clarity / architecture compliance / evidence quality / reuse verified / root cause。若为 `PROCEED`（≥90）则进入 [05. general cycle](./05-general-cycle-medium-large.md)；若为 `STOP`（&lt;70），先补齐被指出的维度。

## 笔记

- `ywc-brainstorm`、`ywc-tech-research`、`ywc-ubiquitous-language` 是可根据情况跳过的辅助步骤。如果意图、技术栈与领域术语都已清晰，只沿着核心主干 **二 → 四 → 六 → 七 → 九 → 十** 即可。
- 如果 `ywc-confidence-gate` 返回 `STOP`（&lt;70），不要进入实现——先补齐被指出的维度，然后再次通过闸门。
- 如果范围足够小，可以直接实现而无需规格分解，`ywc-plan` 可以路由到小路径并跳过整个流程。
- `ywc-onboard-repo` 的移动方向与此流程（调查现有仓库）相反，因此在创建新项目时不要使用它。

---

[Previous: 06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) - [Next: 08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md)
