[« 返回目录](./README.md)

# 14. 管理云基础设施

## 何时使用这些 Skill

这 4 个 Skill 覆盖的是"设计 → 编写 → 评审 → 改进"这一个连续的生命周期，但各自回答不同的问题。根据你现在处于哪个阶段来选择。

| 你想做什么 | 问题 | 使用的 Skill |
|---|---|---|
| 在写任何 IaC 之前先设计云架构 | "provider/network/compute/storage/IAM 的拓扑应该是什么样？" | `ywc-infra-design` |
| 把完成的设计变成实际的 Infrastructure-as-Code | "这段 Terraform 该怎么写？" | `ywc-iac-author` |
| 在 apply 之前发现 misconfiguration/成本/可靠性问题 | "这份 IaC apply 之后安全吗？" | `ywc-infra-review` |
| 改进已经在运行的基础设施 | "这套现有基础设施是否浪费、drift 或脆弱？" | `ywc-infra-optimize` |

## `ywc-infra-design` — 云架构设计

收集需求、确定 provider（或委派这个决策），并给出 network/compute/storage/IAM 的拓扑设计，同时附带一次 reliability/cost/security 三方面的预检查。它本身不写 IaC——它的产出物 `infra-design.md` 是下一步 `ywc-iac-author` 的输入契约。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
</ToolTabs>

`--provider` 用来声明一个已经确定的 provider，从而跳过该项委派；不加这个 flag 就会把 provider 调研委派出去——在 Claude Code 中是直接引用 `ywc-tech-research`，在 Codex 中则是 `$ywc-tech-research` 这种 invocation 写法。`--skip-cloud-consult` 用来跳过 Step 3 中可选的 feasibility consult：Claude Code 里是 `Task(subagent_type: ywc-cloud-engineer)`，Codex 里的表述是"以只读模式选择性地 dispatch 一个承载 `ywc-cloud-engineer` persona 的 Codex worker"——同样的意图，两个工具的 dispatch 措辞并不相同。

## `ywc-iac-author` — 编写 Infrastructure-as-Code

根据 `ywc-infra-design` 的文档，为 AWS/GCP/Azure/Kubernetes 编写或修改 Terraform module/resource（K8s 和 Helm 也只通过 Terraform 的 `kubernetes`/`helm` provider 处理——不使用原始 manifest，也不引入第二个 IaC 工具），随后用 `terraform validate`/`plan` 验证并给出 blast-radius 摘要。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

两个工具的编写方式本身不同。Claude Code 在 Step 3 中按 Terraform module 逐个 fan-out 给 `Task(subagent_type: ywc-cloud-engineer)`。Codex 则由当前会话自己直接编写 `.tf` 文件，没有 fan-out dispatch——`ywc-cloud-engineer` 在这里只是一个可选的、只读的 advisory consult，用于 feasibility/reliability/blast-radius 判断，从不是主要作者。`--skip-review-recommendation` 用来跳过结尾处推荐运行下一个 Skill 的提示：Claude Code 是直接引用 `ywc-infra-review`，Codex 则写作 `$ywc-infra-review`。

## `ywc-infra-review` — Apply 前的 IaC 评审

分派到 security、cost、reliability 三个 lens，在有人运行 `apply` 之前找出 AWS/GCP/Azure/K8s Terraform 中的 misconfiguration、least-privilege 缺失和可靠性风险。它只做诊断，不会修改 IaC；一旦出现 CRITICAL/HIGH 级别的问题就会建议阻止 apply。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

3 个 lens 的 fan-out 在两个工具间的 dispatch 表述也不同。Claude Code 用 `Task(subagent_type: ywc-security-engineer)` 处理 security lens、`Task(subagent_type: ywc-performance-engineer)` 处理 cost lens、review 模式下的 `Task(subagent_type: ywc-cloud-engineer)` 处理 reliability lens。Codex 把同样这三处 dispatch 表述为"承载 `ywc-security-engineer` persona 的 Codex worker""`ywc-performance-engineer` persona"和"`ywc-cloud-engineer` persona"。`--skip-optimize-recommendation` 用来跳过结尾处推荐运行 `ywc-infra-optimize` 的提示——Claude Code 是直接引用，Codex 则是 `$ywc-infra-optimize`（如果问题需要重新编写，则是 `$ywc-iac-author`）。

## `ywc-infra-optimize` — 成本、Drift 与可靠性改进

相当于面向陈旧代码库的 `ywc-refactor-clean` 的 infra 版本：进行成本 right-sizing、删除未使用的资源、评估 reserved/spot 迁移、检测并修复 drift，并加强 AWS/GCP/Azure/K8s 的可靠性。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

这里是两个工具差异最大的地方。Claude Code 会诊断 SAFE 项并**直接执行**——`Task(subagent_type: ywc-performance-engineer)` 提供成本/使用率信号，然后 `Task(subagent_type: ywc-cloud-engineer)` 针对每个 SAFE 项做最小化的 `.tf` 修改，运行 `terraform plan`（绝不 `apply`），并逐项 commit；CAUTION/DANGER 级别的项只会被上报升级。Codex 中这个 Skill 明确是一个 planning/classification 层面的工具，而不是 execution worker——它自己从不执行或提交 `.tf` 修改。它的 SAFE 步骤是 planning loop 而不是 execution loop，SAFE 项会作为"已规划的下一步操作"记录下来，routing 给 `$ywc-iac-author` 去完成实际的编写。`--dry-run`（在两个工具上）只做收集和分类。`--skip-verify-done` 用来跳过最后交给 `ywc-verify-done` 的环节。

## 这些 Skill 如何协同工作

这 4 个 Skill 组成一条流水线，把系统从"基础设施尚不存在"带到"基础设施存在、安全，并且随时间推移变得更便宜、更可靠"：

**第 1 步：设计拓扑 — `ywc-infra-design`**

在写任何 Terraform 之前，先确定 provider、network/compute/storage/IAM 的形态，并完成 reliability/cost/security 预检查。产出的 `infra-design.md` 就是下一步所需要的全部内容。

**第 2 步：编写 IaC — `ywc-iac-author`**

把这份设计文档逐个 module 地变成真正的 Terraform，过程中用 `terraform validate`/`plan` 验证。在 Claude Code 上按 module fan-out 给 `ywc-cloud-engineer`；在 Codex 上由同一会话直接编写，`ywc-cloud-engineer` 只能作为可选的 advisory consult 使用。

**第 3 步：Apply 前评审 — `ywc-infra-review`**

在有人运行 `apply` 之前，让改动接受 security/cost/reliability 各个 lens 的评审——分别 dispatch 给 `ywc-security-engineer`、`ywc-performance-engineer`、`ywc-cloud-engineer`（和这本 Guidebook 其他地方 `ywc-impl-review` 使用的是同一批 lens 扩展 agent，只是这里作用于基础设施而非应用代码）。一旦出现 CRITICAL/HIGH 级别的问题，apply 就会一直被 block，直到问题修复。

**第 4 步：让它长期保持精简 — `ywc-infra-optimize`**

基础设施上线之后，这个 Skill 就成为持续性的维护环节：成本 right-sizing、drift 检测、可靠性加固，同样借助 `ywc-cloud-engineer` 和 `ywc-performance-engineer` 提供信号和执行力。需要重新编写的问题会回流到 `ywc-iac-author`，需要重新审视系统整体形态的问题则会一路回流到 `ywc-infra-design`。

---

[Previous: 13. 管理代码结构与可维护性](./16-code-structure-and-maintainability.md) - [Next: 15. Executor / 代码生成提示模式](./13-executor-and-codegen-patterns.md)
