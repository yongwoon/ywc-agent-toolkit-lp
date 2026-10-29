# 중국어 간체 (Simplified Chinese) 원어민 검수 시트

총 198줄 (+ 사이드바 그룹 이름, 페이지 이동 링크 문구)
검수 대상: 2026-10-29 가이드북 갱신(PR #48~#58)에서 추가/수정된 문장만 발췌했습니다. 번호만 바뀐 줄, 코드 블록, 표 구분선은 제외했습니다.
검수 관점: (1) 자연스러운 표현인가 (2) 용어가 일관적인가 (3) 의미가 영어 원문과 어긋나지 않는가.
기술 용어(Skill, agent, worktree, PR 등)는 원문 그대로 두는 것이 기본입니다.
영어 원문: 같은 파일명의 `src/content/guidebook/en/<파일>` (https://github.com/yongwoon/ywc-agent-toolkit-lp/tree/main/src/content/guidebook/en)
회신 방법: 수정이 필요한 줄의 `L<번호>` 옆에 수정안과 이유를 적어 주세요. 문제가 없는 줄은 그대로 두시면 됩니다.

## 사이드바 그룹 이름 (src/components/guidebook/guidebook-nav.ts)

- prologue: "前言",
- "getting-started": "快速开始",
- "core-pipeline": "核心流程",
- "project-setup": "项目起步",
- quality: "质量与验证",
- operations: "运维与专项领域",
- reference: "参考"

## 페이지 하단 이동 링크 문구 (모든 페이지 공통 형식)

- [← 上一页: 07. …](…) · [下一页: 09. … →](…) / 最后一页: [返回目录 »](./README.md)

## 02-core-concepts.md

- L16: ### 各工具的 Agent
- L18: Agent 在 Skill 内部运行，用户不会直接调用它们。两个工具提供的 agent 并不相同：Claude Code 有 13 个，Codex 有 10 个。在 Claude Code 中，由 worker agent 编写服务端、UI 和测试代码。在 Codex 中，由运行 Skill 的会话自己编写代码，大多数 agent 是只读的顾问和审查者。
- L20: | Agent | 角色 | 主要调用它的 Skill | Claude Code | Codex |
- L22: | `ywc-architect` | 架构决策与 trade-off 建议（只读） | `ywc-plan`, `ywc-impl-review` | ✓ | ✓ |
- L23: | `ywc-security-engineer` | 静态安全审查（只读） | `ywc-security-audit`, `ywc-impl-review`, `ywc-infra-review` | ✓ | ✓ |
- L24: | `ywc-root-cause-analyst` | 根本原因分析（只读） | `ywc-debug-rootcause` | ✓ | ✓ |
- L25: | `ywc-performance-engineer` | 性能分析与 profiling 建议（只读） | `ywc-impl-review` | ✓ | ✓ |
- L26: | `ywc-typescript-reviewer` / `ywc-python-reviewer` / `ywc-go-reviewer` | 特定语言的审查（只读） | `ywc-impl-review` | ✓ | ✓ |
- L27: | `ywc-cloud-engineer` | Terraform IaC。在 Claude Code 中负责编写和审查，在 Codex 中只负责审查（只读） | `ywc-iac-author`, `ywc-infra-review`, `ywc-infra-optimize` | ✓ | ✓ |
- L28: | `ywc-backend-coder` / `ywc-frontend-coder` / `ywc-qa-engineer` | 编写服务端代码 / UI 代码 / 测试代码 | `ywc-code-gen`、两个 executor | ✓ | |
- L29: | `ywc-refactor-cleaner` | 执行安全的死代码删除循环 | `ywc-refactor-clean` | ✓ | |
- L30: | `ywc-doc-writer` | 编写文档 | `ywc-auth-implement`, `ywc-project-docs` | ✓ | |
- L31: | `ywc-complexity-cleaner` / `ywc-test-hardener` | Quality gate 的 worker：降低生产代码的复杂度 / 针对存活的 mutant 加强测试 | Executor 的 quality gate（[18](./13-executor-and-codegen-patterns.md)） | | ✓ |

## 05-general-cycle-medium-large.md

- L33: ## Task ID 与协作者缩写（initials）
- L35: `ywc-task-generator` 现在会在 Task ID 前加上协作者的缩写，使多人同时生成 Tasks 时不会出现编号冲突。例如旧格式 `000001-010-db-create-user-table` 会变为 `yk-000001-010-db-create-user-table`，Task 目录名也会加上同样的前缀。旧的无前缀 ID 继续有效，不会重新编号，并可与新 ID 共存。
- L37: - 缩写为 2–4 个小写字母或数字。可以显式传入 `--initials yk`，也可以让 Skill 自动解析。
- L38: - **Claude Code**：`--initials` → 项目 `CLAUDE.md` 中的 `## Task Initials` 部分 → 从 `git config user.email` / `user.name` 推导并确认一次（之后缓存到 `CLAUDE.md`）。若都无法解析，则回退为旧的无前缀编号。
- L39: - **Codex**：`--initials` → 项目 `.codex/ywc.json` → 用户 `~/.codex/ywc.json` → 推导并确认一次（通过 `ywc-setup` 保存）。在非交互运行且没有已保存的缩写时，会以 `NEEDS_CONTEXT` 停止，并要求传入 `--initials`。
- L40: - 编号按缩写分别计算：每个人的计数器从自己最高的 phase 继续。
- L41: - `--mode human|llm`（别名 `--granularity`）决定 Task 的大小。`human` 使每个 Task 的规模约为人工审查一小时的量；`llm` 表示面向 agent 的较大 Task。若省略此标志，Skill 一定会询问，不会擅自选择。
- L42: - 生成前，若 `tasks/dependency-graph.md` 超过 300 行，Skill 会自动压缩（已完成的 phase 折叠为一行 "done" 标题）；执行器在每个 Task 完成后也会这样处理。无需用户手动操作。

## 07-starting-a-new-project.md

- L18: | 二 | `ywc-project-mission` *(仅限 Claude Code)* | 在 `docs/project-mission.md` 中记录项目的 mission、可衡量的成功标准以及非目标。**先明确“为什么”，再设计结构** |
- L45: 此步骤仅限 Claude Code —— Codex 没有 mission skill；在 Codex 上，请改为在第 6 步的规格中写明成功标准。
- L47: 在目录结构或规格之前先敲定 **mission 与成功标准** —— 之后的每一步都以此 mission 为判断基准。
- L140: - `ywc-project-mission` 不记录被拒绝的方法。如需同时记录难以逆转的决策及被你拒绝的备选方案，请使用 `ywc-adr`（仅 Claude Code）。
- L141: - 对于大型 TypeScript 产品，`ywc-project-scaffold` 可以提议 pnpm workspaces monorepo（`apps/web`、`apps/server`、`packages/{contracts,core,db,…}`，根目录 `tests/{architecture,contract,integration,e2e}`）。其中 `contracts` 没有内部依赖，`core` 不导入框架或基础设施，禁止的依赖由 `tests/architecture` 强制检查。
- L142: - 新 UI 默认采用移动优先规划（从最窄的视口开始，再用 `min-width` 断点向上扩展）。如果某个界面仅面向 PC 或平板（例如管理后台工具），请用一行文字明确说明。

## 13-executor-and-codegen-patterns.md

- L33: **用于脚本与 CI 的标志**
- L35: | Flag | 作用 | 可用范围 |
- L37: | `--terse` | 只输出任务表（名称、状态、PR URL 或合并 SHA）以及最终的 `Completion Status` 行，便于 CI 解析 | 两个 executor，两种工具 |
- L38: | `--non-interactive` | 抑制所有提示；原本需要用户回答的决策，都改为以固定状态结束：缺少信息时为 `NEEDS_CONTEXT`，冲突、工作树存在未提交改动或 `gh` 未认证时为 `BLOCKED`，CI 超时为 `DONE_WITH_CONCERNS` | Claude Code：仅 `ywc-sequential-executor`；Codex：仅 `ywc-parallel-executor` |
- L40: `--worktree` 已在下文说明，此处不再重复。
- L188: Tasks 按 wave 在一个 `aggregate/payments` 分支上堆叠，并作为 **一个** PR 交付。有关完整的 `--aggregate-pr` 和 `--group-name` 模型，请参见本页顶部的“共享概念”部分。它与 `ywc-sequential-executor` 的概念完全相同，只是共享分支前缀从 `work/` 变为 `aggregate/`。
- L203: ### Quality gate 与 wave hardener（可选启用）
- L205: 如果某个 Task 声明了 `## Quality Gate Contract`（CRAP 分数 ≤ 6–8 且 mutation score ≥ 90%，或哨兵值 `N/A — no quality gate contract`），执行器会运行 cleaner（重构生产代码）和 hardener（只编写测试，不能修改生产代码）。hardener 在每个 wave 的 Tasks 合并后运行一次。
- L207: - 使用 `--local-merge`、`--draft` 或 `--aggregate-pr` 时，wave 会先合并到 `wave-int/<N>` 分支，只有 hardener 结论为 PASS（或没有适用的 gate）时，才会提升到基础分支。结论为 `BLOCKED` / `NEEDS_CONTEXT` 时，基础分支保持不变，并保留该分支与工作树，以便修复后恢复。
- L208: - 恢复时，执行器会核对 `wave-int/<N>` 分支是否仍与其记录的 tip SHA 一致；若无法核对，则阻止该 wave，而不会复用这个分支。
- L209: - 使用 `--per-task-pr` 时，hardener 只报告，不会阻止。
- L210: - 未声明契约的 Task 不受影响。

## 14-skill-reference.md

- L23: | [`ywc-verify-done`](#想用明确可重复运行的-gate-证明完成情况) | 想用明确、可重复运行的 gate 证明完成情况 |
- L27: | [`ywc-mine-review-history`](#想扫描大量已合并的-pr找出反复出现的审查缺陷) | 扫描大量已合并的 PR，找出反复出现的审查缺陷 |
- L29: | [`ywc-project-mission`](#想记录-project-的-mission成功标准和非目标) | 记录 project 的 mission、成功标准和非目标（仅限 Claude Code） |
- L30: | [`ywc-adr`](#想记录难以逆转的架构决策及被拒绝的备选方案) | 记录难以逆转的架构决策及被拒绝的备选方案（仅限 Claude Code） |
- L52: *（仅限 Claude Code）* CodeRabbit 的 "Nitpick comments"（没有 review thread）同样会被检测并分类；已处理的条目会记录在一条 PR 级别的评论中，并带有隐藏标记，因此不会再次出现。
- L66: 当任务 README 或 `docs/ywc-plans/` 下的计划被找到时，PR 正文会加入 `Design Background` 部分（目标；若计划中有，则包括 Alternatives Considered / Trade-offs）。`--plan-doc <path.md>` 可显式指定计划（仓库内的相对路径，且位于仓库内部）；`--no-plan-ref` 禁用此查找；同时指定两者时，`--plan-doc` 优先。若多个计划匹配，Skill 会列出它们，并要求你使用 `--plan-doc` 重新运行。
- L118: 在交给 `ywc-plan` 之前，设计文档会列出其关键前提（load-bearing premises）及证据（`file:line` 与引用的代码片段），并标注状态 VERIFIED 或 UNVERIFIED。未经验证的前提会被记录为失败模式，或移入范围之外，而不会被默默假设。
- L177: ### 想用明确、可重复运行的 gate 证明完成情况
- L179: 你可以编写一份 markdown 账本（ledger），其中每个 gate 都包含以下字段：
- L181: - `CHECK:`：一条 shell 命令
- L182: - `EXPECT:`：子串或 `/regex/`
- L183: - `EVIDENCE:`：证据
- L194: 去掉 `--status` 会运行这些 gate；`--reverify` 会重新运行全部 gate。
- L196: - 退出码 0 表示所有可运行的 gate 均已满足。
- L197: - 既没有 CHECK 也没有 EXPECT 的 gate 为人工检查项，永远不会阻塞。
- L198: - 缓存的 PASS 仅在 gate 文本未变化时才被信任。
- L199: - 每个 gate 的超时时间为 120 秒。
- L200: - CHECK 行会以你的权限运行任意命令，因此请先阅读你未亲自编写的账本。
- L202: 账本是可选的，默认的单命令验证方式保持不变。两种工具均可使用。
- L243: ### 想扫描大量已合并的 PR，找出反复出现的审查缺陷
- L253: 它会扫描多个已合并 PR 中的机器人审查评论（CodeRabbit / Codex Review / Claude Review），将每条评论分类为已采纳或已驳回，再将其聚类为缺陷类别。在至少 `--min-recurrence`（默认 3）个不同 PR 中重复出现的类别，会提交给 `ywc-review-learnings`。`--limit` 与 `--since` 至少需要指定一个（它不会扫描全部内容）。它本身不会写入 `docs/review-learnings.md`——晋升必须经过 `ywc-review-learnings` 的确认步骤。若只针对一个开放 PR，请使用 `ywc-handle-pr-reviews`。
- L265: `--ddd` 会添加 DDD 类型列，例如实体 / 值对象 / 聚合。
- L267: ### 想记录 project 的 mission、成功标准和非目标
- L269: 此 Skill 仅在 Claude Code 中提供。
- L273: 完整流程见 [09. 开始一个新项目](./07-starting-a-new-project.md)。当项目方向发生变化时，可再次使用 `ywc-project-mission` 更新 mission。
- L275: ### 想记录难以逆转的架构决策及被拒绝的备选方案
- L277: 此 Skill 仅在 Claude Code 中提供。
- L281: 它会写入 `docs/adr/NNNN-<slug>.md`（Context / Decision / Alternatives Considered / Consequences）。模式包括 new / read / list / curate。仅当决策难以逆转、缺少上下文时会让人意外、并且确实存在取舍时才记录。不要编辑旧的 ADR——如需替换，请用 `--supersedes ADR-NNNN` 新建一条记录。
- L336: - Codex 的 `ywc-setup` 还会保存协作者缩写（`--initials yk`）。`--scope project|user` 用于选择保存位置：`.codex/ywc.json`（项目）或 `~/.codex/ywc.json`（用户）。
- L337: - Claude Code 的 `ywc-setup-language` 仅设置语言，并将 `## Language Policy` 部分写入 `CLAUDE.md`。Claude Code 中的协作者缩写来自 `--initials` 或 `CLAUDE.md` 中的 `## Task Initials` 部分（参见 [06](./05-general-cycle-medium-large.md)）。
- L363: ## 工具专属 Skill
- L365: 大多数 Skill 在两个工具中都可用，但有些仅存在于其中一个工具中。
- L367: | 工具 | Skill | 作用 |
- L369: | Codex | `ywc-wayfinder` | 用于大型或不确定变更的多会话探索：在规划或实现之前，建立本地地图并仅保留一个活动 ticket |
- L370: | Codex | `ywc-architecture-invariants` | 基于范围受限且已规范化的依赖边（dependency edge）证据，校验可选的仓库根目录 `architecture-invariants.json` 契约 |
- L371: | Codex | `ywc-implement` | 以范围聚焦、需通过评审关卡的变更，只实现一个已批准的 spec 或 ticket |
- L372: | Codex | `ywc-team-assemble` | 仅在你明确要求时，组建专家团队/委派给 subagent |
- L373: | Codex | `ywc-setup` | 设置默认输出语言或协作者缩写（`ywc-setup-language` 的 Codex 对应 skill） |
- L374: | Claude Code | [`ywc-adr`](#想记录难以逆转的架构决策及被拒绝的备选方案) | 记录难以逆转的架构决策及被拒绝的备选方案 |
- L375: | Claude Code | [`ywc-project-mission`](#想记录-project-的-mission成功标准和非目标) | 记录 project 的 mission、成功标准和非目标 |
- L376: | Claude Code | `ywc-setup-language` | 设置持久输出语言，使 `--lang` 无需每次传入 |
- L384: | `ywc-adr` | 想记录难以逆转的架构决策及被拒绝的备选方案 *（仅限 Claude Code）* | [此处](#想记录难以逆转的架构决策及被拒绝的备选方案) |
- L386: | `ywc-architecture-invariants` | 基于范围受限且已规范化的依赖边证据，校验可选的 `architecture-invariants.json` 契约 *（仅限 Codex）* | [此处](#工具专属-skill) |
- L403: | `ywc-implement` | 以范围聚焦、需通过评审关卡的变更，只实现一个已批准的 spec 或 ticket *（仅限 Codex）* | [此处](#工具专属-skill) |
- L409: | `ywc-mine-review-history` | 扫描大量已合并的 PR，找出反复出现的审查缺陷 | [此处](#想扫描大量已合并的-pr找出反复出现的审查缺陷) |
- L415: | `ywc-project-mission` | 记录 project 的 mission、成功标准和非目标 *（仅限 Claude Code）* | [此处](#想记录-project-的-mission成功标准和非目标) |
- L423: | `ywc-setup` | 设置持久输出语言让技能不再每次询问 language *（仅限 Codex）* | [此处](#设置持久输出语言让技能不再每次询问-language) |
- L424: | `ywc-setup-language` | 设置持久输出语言，使 `--lang` 无需每次传入 *（仅限 Claude Code）* | [此处](#设置持久输出语言让技能不再每次询问-language) |
- L431: | `ywc-team-assemble` | 仅在你明确要求时，组建专家团队/委派给 subagent *（仅限 Codex）* | [此处](#工具专属-skill) |
- L435: | `ywc-verify-done` | 通过运行 lint/typecheck/test/build 机械化验证完成情况的 skill | [此处](#想用明确可重复运行的-gate-证明完成情况) |
- L436: | `ywc-wayfinder` | 用于大型或不确定变更的多会话探索，在规划或实现前建立本地地图 *（仅限 Codex）* | [此处](#工具专属-skill) |

## 16-code-structure-and-maintainability.md

- L27: `--tier safe` 只删除 detection tool、grep、test 三者都同意"未使用"的项目。此 skill 本身不会重构结构。若需要找出架构/设计问题，请使用 `ywc-impl-review`，然后通过常规流程修复。
- L44: **值得了解的选项**
- L46: - 必须且只能选择一个评审目标：`--code <path>`、`--git-range <sha>..<sha>` 或 `--working-tree`（包含已暂存、未暂存和未跟踪的改动，无需提交）。在 Claude Code 中，`--spec` 为可选。
- L47: - `--profile chill|assertive`（默认 `chill`）：`chill` 隐藏 Low/Info 级别的风格建议；`assertive` 会显示这些建议。Critical/High/Medium 永远不会被隐藏。
- L48: - `--no-advisor` 跳过 Phase 2 的 advisor 调用；`--advisor-budget <n>` 限制其次数（默认 5）。
- L49: - `--format html` 会在 `claudedocs/` 中写入自包含报告（默认 `markdown`）。
- L50: - `--non-interactive`（仅 Claude Code）：跳过 learnings 晋升提示，并改为在报告中列出 learning 候选项。
- L52: **独立验证（Independent verification）**：每个已确认的 Critical 或 High 发现都会由一名全新的评审者重新核对一次，该评审者只看到 `file:line` 和声称的严重程度。无法复现的发现会交给 Phase 2 advisor 处理（Security 发现除外），否则标记为 unverified。每次运行最多验证 20 个发现。
- L54: **范围护栏（Scope guardrail）**：当评审范围内超过 200 个文件或超过 5,000 行改动时，评审会拒绝启动（`NEEDS_CONTEXT`）。它会报告文件数与行数，列出最大的 5 个文件，并要求你缩小评审目标。不会对任何内容抽样或截断。
- L62: 先处理最容易撤销的步骤。它只删除 detection tool、grep、test 三者都认可的内容，风险较低。
- L66: 在打开 PR 之前用五维度评审确认没有遗留问题。这里发现的问题会回到第 1 步，或回到常规的实现流程。

## 19-skill-combination-recipes.md

- L3: # 08. Skill 组合用法
- L5: 其他页面每次只讲解一个流程或一个 Skill。本页展示 Skill 之间如何相互衔接：一个 Skill 留下了什么，又由哪个 Skill 接手。下面的每一个衔接都是 Skill 自己完成的动作（读取共享文件、提议 hand-off），而不是需要你记住的约定。
- L7: | 你想做什么 | 组合用法 |
- L9: | 不让同样的 review 意见反复出现 | [Review 学习循环](#review-学习循环) |
- L10: | 把修复过的 Bug 变成长期有效的经验 | [从修复 Bug 到预防复发](#从修复-bug-到预防复发) |
- L11: | 了解 PR 前后各个 gate 在何时运行 | [PR 前后的 gate](#pr-前后的-gate) |
- L12: | 保留难以逆转的决策背后的理由 | [在规划时记录决策](#在规划时记录决策) |
- L13: | 启动一个范围仍不明确的大型变更 | [规划前的探索](#规划前的探索) |
- L14: | 并行运行 Task 而不产生冲突 | [并行执行环境](#并行执行环境) |
- L15: | 准备一次 Release | [Release 准备](#release-准备) |
- L17: ## Review 学习循环
- L19: `docs/review-learnings.md` 是项目的 review 记忆。该文件由 `ywc-review-learnings` 负责管理；其他 Skill 读取它，或向它补充内容。
- L21: 1. **接收** — 在处理一条 comment 之前，`ywc-receive-review` 会先检查它在技术上是否正确，这样你就不会仅仅因为审查者要求就实现一个错误的修复。
- L22: 2. **处理** — `ywc-handle-pr-reviews` 逐个修复或回复每个 thread，并让 PR 保持可 merge 的状态（CI 通过，与 base 无 conflict）。
- L23: 3. **记录** — 值得保留的经验通过 `ywc-review-learnings` 写入 `docs/review-learnings.md`。使用 `--source pr --pr <编号>` 时，它会提炼一个 PR 的 bot review comment。每个新条目都会以 changeset 的形式展示给你，只有在你确认后才会写入。
- L24: 4. **回溯收集** — 对于过去的 PR，`ywc-mine-review-history` 会一次扫描多个已 merge 的 PR，并把反复出现的缺陷类别提供给 `ywc-review-learnings`。
- L25: 5. **复用** — `ywc-impl-review` 在每次 review 开始时都会加载这些经验（可用 `--skip-learnings` 跳过），因此已知的 false positive 不会再次被提出，已知的 `DO-NOT` 也会更早被发现。Review 结束后，它会提议记录反复出现的 finding。
- L36: 这个循环在两个工具中都能运行。每走一轮，下一次 review 就会更安静：团队已经驳回的意见不再出现，团队认同的意见会在 PR 打开之前就被发现。
- L38: ## 从修复 Bug 到预防复发
- L40: 1. `ywc-debug-rootcause` 找出根本原因，添加 regression test，并用 `ywc-verify-done` 对修复进行把关（[15](./12-debugging-and-incident-postmortem.md)）。
- L41: 2. 如果同一类缺陷可能出现在其他地方，它会提议将其记录为 review 经验（`ywc-review-learnings --mode update --source debug`）。
- L42: 3. 发生生产事故后，`ywc-incident-postmortem` 会撰写报告，并以同样的方式提议记录其中用于防止复发的 action item（`--source incident`）。
- L43: 4. 从此以后，`ywc-impl-review` 会读取这些经验，因此同一类缺陷会在 review 阶段而不是在生产环境中被发现。
- L45: 第 2 步和第 3 步仅限 Claude Code。在 Codex 中，这两个 Skill 不会 hand-off 给 `ywc-review-learnings`；如果有值得保留的经验，请自己用 `ywc-review-learnings` 记录（默认的 `feedback` source）。
- L47: ## PR 前后的 gate
- L49: | 时机 | Skill | 检查内容 |
- L51: | 实现之前 | `ywc-confidence-gate` | 从五个维度为准备情况打分：PROCEED（90 及以上）、REVIEW（70-89）、STOP（低于 70）。低于 90 时，实现会等待，直到最弱的维度得到提升或你接受风险 |
- L52: | 实现之后 | `ywc-impl-review` | 对照 spec 的五个方面的 review（[14](./16-code-structure-and-maintainability.md)） |
- L53: | 变更涉及安全时 | `ywc-security-audit` | 静态安全 review（OWASP Top 10、secret、threat model） |
- L54: | 说"完成"之前 | `ywc-verify-done` | 为每一个完成声明提供新的证据（test 或 build 输出） |
- L55: | 打开 PR 时 | `ywc-create-pr` | Commit、push，以及基于 task 或 plan 生成的 PR 正文 |
- L56: | 审查者回复之后 | `ywc-handle-pr-reviews` | Comment、CI 和 conflict，与上面的循环相同 |
- L57: | Merge 时 | `ywc-finish-branch` | 等待 CI 和 bot review、merge、merge 后检查、清理 branch |
- L59: 你很少需要直接调用 `ywc-verify-done`：`ywc-code-gen` 和两个 executor 会在各自的完成步骤中调用它。当你手动完成工作时，请自己调用它。
- L61: ## 在规划时记录决策
- L63: 此组合用法仅限 Claude Code。
- L65: - 在规划之前，如果 `docs/adr/` 和 `docs/project-mission.md` 存在，`ywc-plan` 会先读取它们。计划不会悄悄地与已确定的决策相矛盾；如有冲突，会展示给你。
- L66: - 当计划中的某个架构决策难以逆转、会让缺乏背景的后来读者感到意外、并且是真正的 trade-off 时，`ywc-plan` 会提议一次，通过 `ywc-adr` 将其保存为 ADR。当计划确定了一个新的长期 success criterion 时，它会提议将其添加到 `docs/project-mission.md`。
- L67: - 如果决策是库或实现方式的比较，请先运行 `ywc-tech-research`，再基于其结果进行规划。
- L71: Codex 既没有 `ywc-adr` 也没有 `ywc-project-mission`；请改为把决策理由保留在 plan 或 spec 文档中。
- L73: ## 规划前的探索
- L75: 此组合用法仅限 Codex。
- L77: 1. `ywc-wayfinder` 在 `docs/ywc-plans/<slug>-wayfinder.md` 中保存一份本地 map，并跨 session 延续。Map 可以包含多个 ticket，但同一时间只有一个处于 active 状态，而且该 Skill 自己从不实现任何东西。
- L78: 2. 一旦某个 ticket 的路线明确，它就会 hand-off 给 `ywc-plan`（如果该 ticket 卡在技术比较上，则交给 `ywc-tech-research`）。
- L79: 3. 之后按照通常的流程继续：`ywc-spec-ready` → `ywc-task-generator` → executor（[06](./05-general-cycle-medium-large.md)）。当只需要实现一个已批准的 spec 或 ticket 时，`ywc-implement` 会将其作为一个聚焦的、经过 review gate 的变更来完成。
- L83: 仅在工作规模大、不确定或跨越多个 session 时使用它。普通的规划属于 `ywc-plan`，想法的梳理属于 `ywc-brainstorm`。
- L85: ## 并行执行环境
- L87: `ywc-parallel-executor` 通过 `ywc-worktrees` 为每个 task 创建 worktree。在 Docker 项目中，它还会通过 `ywc-docker-isolate` 为每个 worktree 分配独立的 host 端口区块，使各个 stack 互不冲突（"port is already allocated"）。Merge 之后，`ywc-finish-branch` 会用 `ywc-worktrees --mode prune` 删除 worktree。
- L89: 通常你不需要自己调用其中任何一个；在两个工具中都由 executor 驱动它们。若要在 executor 运行之外创建或清理 worktree，请使用 [19](./14-skill-reference.md) 中的命令。
- L91: ## Release 准备
- L93: 1. 先处理掉待处理的依赖更新：`ywc-merge-dependabot security parallel-auto`。
- L94: 2. 打开 release PR（例如 `develop` → `main`），然后用 `ywc-release-pr-list <release PR 编号>` 生成它的描述，该命令会按作者对已 merge 的 PR 进行分组。
- L95: 3. 用 `ywc-changelog-release-notes` 编写 `CHANGELOG.md` 和面向用户的 release note。通过 `--pr-list` 传入第 2 步的结果文件，它就会使用该列表而不是 git log。

## README.md

- L7: - 如果这是你第一次使用，请在前言之后按 **快速开始** 的顺序（01 -> 02 -> 03 -> 04）进行，然后阅读 **核心流程**（05-08）。
- L8: - 如果你已经了解基本概念并且正在寻找特定任务，请直接跳转到 **项目起步**、**质量与验证** 或 **运维与专项领域** 中的相关页面。
- L9: - 选项较多、需要反复查阅语法的技能已收录在**参考**中，并以命令示例为主进行整理。
- L15: ### 规划与实现
- L17: | 你想做什么 | 开始 Skill | 指南 |
- L27: | 想跨多个会话探索一个范围不确定的大型变更（仅限 Codex） | `ywc-wayfinder` | [08](./19-skill-combination-recipes.md) |
- L29: | 想了解 Skill 之间如何衔接 | - | [08](./19-skill-combination-recipes.md) |
- L31: ### 质量与验证
- L33: | 你想做什么 | 开始 Skill | 指南 |
- L41: | 想从独立的角度检查实现质量和可维护性 | `ywc-impl-review` | [14](./16-code-structure-and-maintainability.md) |
- L42: | 想用明确、可重复运行的 gate 证明完成情况 | `ywc-verify-done` | [19](./14-skill-reference.md) |
- L43: | 想从业务和用户角度评审 project | `ywc-product-review` | [19](./14-skill-reference.md) |
- L45: ### PR、评审与发布
- L47: | 你想做什么 | 开始 Skill | 指南 |
- L50: | 想先确认审查者的意见是否真的正确，再采取行动 | `ywc-receive-review` | [19](./14-skill-reference.md) |
- L51: | 不想让同样的 review 意见反复出现 | `ywc-review-learnings` | [08](./19-skill-combination-recipes.md) |
- L56: ### 调试与故障处理
- L58: | 你想做什么 | 开始 Skill | 指南 |
- L63: ### 项目知识与决策记录
- L68: | 想记录难以逆转的架构决策（仅限 Claude Code） | `ywc-adr` | [19](./14-skill-reference.md) |
- L74: ### 前言
- L76: | 页面 | 描述 |
- L78: | [01. 介绍](./01-introduction.md) | 这个 Skill/Agent 生态系统是什么，它适合谁，以及它解决了哪些问题 |
- L79: | [02. 核心概念](./02-core-concepts.md) | 诸如 Skill / Agent / Executor / Task 之类的术语，调用语法，以及诸如 `DONE` 的四种完成状态 |
- L81: ### 快速开始
- L83: | 页面 | 描述 |
- L86: | [04. 在5分钟内发布你的第一个功能](./03-quickstart.md) | 第一次动手练习，将一个小功能从构想到合并 |
- L88: ### 核心流程
- L90: | 页面 | 描述 |
- L92: | [05. 处理小变动（一般周期 - 小）](./04-general-cycle-small.md) | 一个以单个 PR 完成且没有 Task 分解的更改的标准流程 |
- L93: | [06. 处理分成多个 Tasks 的工作（通用周期 - 中/大型）](./05-general-cycle-medium-large.md) | 需要规格验证和 Task 分解的变更流程 |
- L94: | [07. 从一个目标自动完成 (ywc-agentic)](./06-agentic-autonomous-loop.md) | 不是在05/06中手动控制，而是从单一目标自动重复计划 -> 执行 -> 评估 -> 重复 |
- L95: | [08. Skill 组合用法](./19-skill-combination-recipes.md) | Skill 之间如何相互交接：review 学习循环、从 Bug 到预防、PR gate、决策记录、探索、并行执行与 release |
- L97: ### 项目起步
- L101: | [09. 开始一个新项目](./07-starting-a-new-project.md) | 从一张白纸到项目设计和第一个完成的规格 |
- L102: | [10. 第一次进入现有的仓库](./08-onboarding-existing-repo.md) | 一个入职流程，能够从不熟悉的代码库中反向工程约定，并创建 `CLAUDE.md` |
- L104: ### 质量与验证
- L108: | [11. 编写和运行测试](./09-testing-guide.md) | 如何将手动验证测试表与自动化测试一起操作 |
- L109: | [12. E2E 测试自动化策略](./10-e2e-test-strategy.md) | 基于 Playwright 的 E2E 套件的高级设置、扩展和维护指南 |
- L110: | [13. 审查和改进设计](./11-design-review.md) | 如何区分和应用可用性审核与视觉去倾斜更新 |
- L111: | [14. 管理代码结构与可维护性](./16-code-structure-and-maintainability.md) | 整理和验证结构不佳或难以维护的代码的 2 个 Skill 的用法，以及它们协同工作的顺序 |
- L113: ### 运维与专项领域
- L125: | [18. Executor / 代码生成提示模式](./13-executor-and-codegen-patterns.md) | 针对选项繁多的 `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` 的实用命令示例 |
- L126: | [19. 完整 Skill 参考](./14-skill-reference.md) | 未在上述指南中涵盖的剩余技能索引，按情境分类 |
