[« 目次に戻る](./README.md)

# 02. 核心概念

このページの用語と概念を理解すると、残りのすべてのガイドページの例をそのまま応用できます。

## Skill, Agent, Executor, Task

| 用語 | 意味 |
|---|---|
| **Skill** | `/ywc-plan` のようにユーザーが直接呼び出す手順。`claude-code/skills/<name>/SKILL.md` に定義されており、この Guidebook が扱う対象の大半です。 |
| **Agent (Subagent)** | Skill が内部的に委任する専門ロールの実行単位 (例: `ywc-backend-coder`, `ywc-security-engineer`)。ユーザーが直接呼び出すのではなく、Skill が Task ツールで dispatch します。 |
| **Executor** | Task を実際に実行する 2 つの Skill、`ywc-sequential-executor` (順次) と `ywc-parallel-executor` (並列) をまとめて呼ぶ言葉。 |
| **Task** | `ywc-task-generator` が spec を分解して作る、`tasks/<phase>-<sequence>-<slug>/` ディレクトリ 1 つ。`README.md`(metadata) + `task.md`(実装 checklist) で構成されます。 |

## 規模(Scale) がフローを決める

すべての作業は `ywc-plan` から始まり、`ywc-plan` がリクエストの規模を判断して 2 つのフローのどちらかへ routing します。

| 規模 | 判断基準 | 成果物 | 次の段階 |
|---|---|---|---|
| **Small** | 単一 PR で終わる変更、DB migration/新 Library 導入がない | `plan.md` | [04. general cycle (small)](./04-general-cycle-small.md) |
| **Medium/Large** | 複数 Task に分ける必要がある、DB migration または新 Library 導入を含む | `docs/ywc-plans/<slug>.md` | [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) |

DB migration や新 Library 導入は、規模に関係なく**常に別扱い**されます。これは `ywc-plan` と `ywc-task-generator` の両方に共通する安全不変式(Safety Invariant)です。

## 4 種類の完了状態

ほぼすべての Skill は、作業を終えるときに以下 4 種類の状態のいずれかで締めくくります。この語彙を知っておけば、どの Skill の結果レポートを読んでも次に何をすべきかすぐ判断できます。

| 状態 | 意味 | ユーザーがすること |
|---|---|---|
| `DONE` | 完全に完了、問題なし | 次の段階へ進む |
| `DONE_WITH_CONCERNS` | 完了したが注意点がある | Concern を読み、correctness 問題なら修正、observation ならそのまま進む |
| `BLOCKED` | 進行不可 — 人の判断が必要 | 提示された blocker を確認し、直接解決してから再実行 |
| `NEEDS_CONTEXT` | 情報不足で開始できない | 求められた情報を補って再度呼び出す |

## 全体フローをひと目で見る

<FlowDiagram>
  <FlowStep>アイデア</FlowStep>
  <FlowStep>ywc-plan (規模判断)</FlowStep>
  <FlowBranch label="Small">
    <FlowChain items="plan.md, ywc-spec-ready, ywc-code-gen, ywc-impl-review, ywc-create-pr" />
  </FlowBranch>
  <FlowBranch label="Medium/Large">
    <FlowChain items="docs/ywc-plans/<slug>.md, ywc-spec-ready, ywc-task-generator" />
    <FlowStep>ywc-sequential-executor --review または ywc-parallel-executor --review</FlowStep>
    <FlowChain items="PR, CI, Bot Review, Merge (Executor が自動処理)" />
  </FlowBranch>
</FlowDiagram>

このフローの各分岐は、[04](./04-general-cycle-small.md), [05](./05-general-cycle-medium-large.md) ページで実際の command 例とともに詳しく扱います。

## PR Delivery モードの共通概念

`ywc-finish-branch`, `ywc-sequential-executor`, `ywc-parallel-executor` は、task ベースの delivery で以下のモード概念を共有します。`plan.md` ベースの Small フローには task artifact がないため、`ywc-create-pr` で PR を開き、その後の review/merge は別途処理します。正確な flag の組み合わせは [16. Executor / Code-gen Prompt パターン](./13-executor-and-codegen-patterns.md)で扱います。

| モード | 意味 |
|---|---|
| `normal-pr` (デフォルト) | PR 作成 → CI 待機 → Bot Review 対応 → Merge まで全て自動処理 |
| `--draft` | PR だけ作成して停止 — Merge は人が手動で行う |
| `--local-merge` | PR なしでローカルから base branch へ直接 merge |
| `--aggregate-pr` (executor 専用) | 複数 Task を 1 つのブランチにまとめ、PR **1 個**として delivery |

---

[← 前: 01. 概要](./01-introduction.md) · [次: 03. 5 分で最初の機能をデプロイする →](./03-quickstart.md)
