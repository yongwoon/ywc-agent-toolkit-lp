[Back to table of contents](./README.md)

# 19. Skill 组合用法

其他页面每次只讲解一个流程或一个 Skill。本页展示 Skill 之间如何相互衔接：一个 Skill 留下了什么，又由哪个 Skill 接手。下面的每一个衔接都是 Skill 自己完成的动作（读取共享文件、提议 hand-off），而不是需要你记住的约定。

| 你想做什么 | 组合用法 |
|---|---|
| 不让同样的 review 意见反复出现 | [Review 学习循环](#review-学习循环) |
| 把修复过的 Bug 变成长期有效的经验 | [从修复 Bug 到预防复发](#从修复-bug-到预防复发) |
| 了解 PR 前后各个 gate 在何时运行 | [PR 前后的 gate](#pr-前后的-gate) |
| 保留难以逆转的决策背后的理由 | [在规划时记录决策](#在规划时记录决策) |
| 启动一个范围仍不明确的大型变更 | [规划前的探索](#规划前的探索) |
| 并行运行 Task 而不产生冲突 | [并行执行环境](#并行执行环境) |
| 准备一次 Release | [Release 准备](#release-准备) |

## Review 学习循环

`docs/review-learnings.md` 是项目的 review 记忆。该文件由 `ywc-review-learnings` 负责管理；其他 Skill 读取它，或向它补充内容。

1. **接收** — 在处理一条 comment 之前，`ywc-receive-review` 会先检查它在技术上是否正确，这样你就不会仅仅因为审查者要求就实现一个错误的修复。
2. **处理** — `ywc-handle-pr-reviews` 逐个修复或回复每个 thread，并让 PR 保持可 merge 的状态（CI 通过，与 base 无 conflict）。
3. **记录** — 值得保留的经验通过 `ywc-review-learnings` 写入 `docs/review-learnings.md`。使用 `--source pr --pr <编号>` 时，它会提炼一个 PR 的 bot review comment。每个新条目都会以 changeset 的形式展示给你，只有在你确认后才会写入。
4. **回溯收集** — 对于过去的 PR，`ywc-mine-review-history` 会一次扫描多个已 merge 的 PR，并把反复出现的缺陷类别提供给 `ywc-review-learnings`。
5. **复用** — `ywc-impl-review` 在每次 review 开始时都会加载这些经验（可用 `--skip-learnings` 跳过），因此已知的 false positive 不会再次被提出，已知的 `DO-NOT` 也会更早被发现。Review 结束后，它会提议记录反复出现的 finding。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
</ToolTabs>

这个循环在两个工具中都能运行。每走一轮，下一次 review 就会更安静：团队已经驳回的意见不再出现，团队认同的意见会在 PR 打开之前就被发现。

## 从修复 Bug 到预防复发

1. `ywc-debug-rootcause` 找出根本原因，添加 regression test，并用 `ywc-verify-done` 对修复进行把关（[12](./12-debugging-and-incident-postmortem.md)）。
2. 如果同一类缺陷可能出现在其他地方，它会提议将其记录为 review 经验（`ywc-review-learnings --mode update --source debug`）。
3. 发生生产事故后，`ywc-incident-postmortem` 会撰写报告，并以同样的方式提议记录其中用于防止复发的 action item（`--source incident`）。
4. 从此以后，`ywc-impl-review` 会读取这些经验，因此同一类缺陷会在 review 阶段而不是在生产环境中被发现。

第 2 步和第 3 步仅限 Claude Code。在 Codex 中，这两个 Skill 不会 hand-off 给 `ywc-review-learnings`；如果有值得保留的经验，请自己用 `ywc-review-learnings` 记录（默认的 `feedback` source）。

## PR 前后的 gate

| 时机 | Skill | 检查内容 |
|---|---|---|
| 实现之前 | `ywc-confidence-gate` | 从五个维度为准备情况打分：PROCEED（90 及以上）、REVIEW（70-89）、STOP（低于 70）。低于 90 时，实现会等待，直到最弱的维度得到提升或你接受风险 |
| 实现之后 | `ywc-impl-review` | 对照 spec 的五个方面的 review（[13](./16-code-structure-and-maintainability.md)） |
| 变更涉及安全时 | `ywc-security-audit` | 静态安全 review（OWASP Top 10、secret、threat model） |
| 说"完成"之前 | `ywc-verify-done` | 为每一个完成声明提供新的证据（test 或 build 输出） |
| 打开 PR 时 | `ywc-create-pr` | Commit、push，以及基于 task 或 plan 生成的 PR 正文 |
| 审查者回复之后 | `ywc-handle-pr-reviews` | Comment、CI 和 conflict，与上面的循环相同 |
| Merge 时 | `ywc-finish-branch` | 等待 CI 和 bot review、merge、merge 后检查、清理 branch |

你很少需要直接调用 `ywc-verify-done`：`ywc-code-gen` 和两个 executor 会在各自的完成步骤中调用它。当你手动完成工作时，请自己调用它。

## 在规划时记录决策

此组合用法仅限 Claude Code。

- 在规划之前，如果 `docs/adr/` 和 `docs/project-mission.md` 存在，`ywc-plan` 会先读取它们。计划不会悄悄地与已确定的决策相矛盾；如有冲突，会展示给你。
- 当计划中的某个架构决策难以逆转、会让缺乏背景的后来读者感到意外、并且是真正的 trade-off 时，`ywc-plan` 会提议一次，通过 `ywc-adr` 将其保存为 ADR。当计划确定了一个新的长期 success criterion 时，它会提议将其添加到 `docs/project-mission.md`。
- 如果决策是库或实现方式的比较，请先运行 `ywc-tech-research`，再基于其结果进行规划。

<CodeBlock label="claude code" code="ywc-tech-research &quot;Hono SSE 实现&quot; --compare &quot;Redis,Valkey&quot;" />

Codex 既没有 `ywc-adr` 也没有 `ywc-project-mission`；请改为把决策理由保留在 plan 或 spec 文档中。

## 规划前的探索

此组合用法仅限 Codex。

1. `ywc-wayfinder` 在 `docs/ywc-plans/<slug>-wayfinder.md` 中保存一份本地 map，并跨 session 延续。Map 可以包含多个 ticket，但同一时间只有一个处于 active 状态，而且该 Skill 自己从不实现任何东西。
2. 一旦某个 ticket 的路线明确，它就会 hand-off 给 `ywc-plan`（如果该 ticket 卡在技术比较上，则交给 `ywc-tech-research`）。
3. 之后按照通常的流程继续：`ywc-spec-ready` → `ywc-task-generator` → executor（[05](./05-general-cycle-medium-large.md)）。当只需要实现一个已批准的 spec 或 ticket 时，`ywc-implement` 会将其作为一个聚焦的、经过 review gate 的变更来完成。

<CodeBlock label="codex" code="ywc-wayfinder 想把计费功能从 monolith 中拆分为独立的 service。范围还不明确" />

仅在工作规模大、不确定或跨越多个 session 时使用它。普通的规划属于 `ywc-plan`，想法的梳理属于 `ywc-brainstorm`。

## 并行执行环境

`ywc-parallel-executor` 通过 `ywc-worktrees` 为每个 task 创建 worktree。在 Docker 项目中，它还会通过 `ywc-docker-isolate` 为每个 worktree 分配独立的 host 端口区块，使各个 stack 互不冲突（"port is already allocated"）。Merge 之后，`ywc-finish-branch` 会用 `ywc-worktrees --mode prune` 删除 worktree。

通常你不需要自己调用其中任何一个；在两个工具中都由 executor 驱动它们。若要在 executor 运行之外创建或清理 worktree，请使用 [17](./14-skill-reference.md) 中的命令。

## Release 准备

1. 先处理掉待处理的依赖更新：`ywc-merge-dependabot security parallel-auto`。
2. 打开 release PR（例如 `develop` → `main`），然后用 `ywc-release-pr-list <release PR 编号>` 生成它的描述，该命令会按作者对已 merge 的 PR 进行分组。
3. 用 `ywc-changelog-release-notes` 编写 `CHANGELOG.md` 和面向用户的 release note。通过 `--pr-list` 传入第 2 步的结果文件，它就会使用该列表而不是 git log。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>

---

[Previous: 18. 前置条件与安装](./15-prerequisites-installation.md) - [返回目录](./README.md)
