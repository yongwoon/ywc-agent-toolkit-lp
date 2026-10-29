[« 目次に戻る](./README.md)

# 05. 複数の Task に分けて処理する (general cycle · medium/large)

## いつこのフローを使うか

次のいずれかに該当すると、`ywc-plan` はこの経路へ routing します。

- 変更内容をレビュー可能な単一 PR 1 つに収めるのが難しい (複数画面、複数 API、複数 subsystem)
- DB migration が含まれる (規模に関係なく常にこの経路 — 安全不変式)
- 新 Library/Framework 導入が含まれる (これも常にこの経路)

## 全体フロー

```
ywc-plan → ywc-spec-ready → ywc-task-generator → ywc-sequential-executor --review または ywc-parallel-executor --review
```

| 段階 | Skill | 役割 |
|---|---|---|
| 1 | `ywc-plan` | リクエストを分析して `docs/ywc-plans/<slug>.md` spec を生成 |
| 2 | `ywc-spec-ready` | spec が `DONE` になるまで `ywc-plan --update-spec` ↔ `ywc-spec-validate` を自動反復 |
| 3 | `ywc-task-generator` | `DONE` になった spec を dependency-safe な複数 Task に分解 (`tasks/<phase>-<sequence>-<slug>/`) |
| 4 | `ywc-sequential-executor` または `ywc-parallel-executor` | Task を実際に実装 → PR → Merge |

**Sequential vs Parallel の選択基準**

| 状況 | 選択 |
|---|---|
| Task 間の順序が重要、または互いの成果物に依存する | `ywc-sequential-executor` |
| Task 同士が独立しており、`dependency-graph.md` 上で並列実行可能な wave にまとまる | `ywc-parallel-executor` (Git Worktree で隔離) |

## Task ID と協力者イニシャル

`ywc-task-generator` は、複数の人が Task を生成しても番号が衝突しないように、Task ID の先頭に協力者のイニシャルを付けるようになりました。

- 旧形式: `000001-010-db-create-user-table`
- 新形式: `yk-000001-010-db-create-user-table`

Task ディレクトリも同じ名前になります。イニシャルのない旧形式の ID は引き続き有効で、番号が振り直されることもありません。新旧の ID は同じ project 内で共存できます。

イニシャルは小文字の英字・数字 2〜4 文字です。`--initials yk` で明示するか、skill に解決させることができます。

- **Claude Code**: `--initials` → project の `CLAUDE.md` 内 `## Task Initials` セクション → `git config user.email` / `user.name` からの導出(初回に確認し、結果を `CLAUDE.md` にキャッシュ)の順に解決します。いずれも解決できない場合は、イニシャルなしの旧形式の番号付けに戻ります。
- **Codex**: `--initials` → project の `.codex/ywc.json` → user の `~/.codex/ywc.json` → 導出(初回に確認し、`ywc-setup` で保存)の順に解決します。非対話実行で何も保存されていない場合は、`--initials` を求めて `NEEDS_CONTEXT` で停止します。

番号はイニシャルごとに数えます。各自のカウンターは、自分自身の最大 phase 番号の続きから進みます。

`--mode human|llm`(エイリアス `--granularity`)で Task の粒度を指定します。`human` は人が約 1 時間でレビューできる大きさ、`llm` は agent 向けのより大きな Task です。フラグを省略すると skill は必ず質問し、黙って選ぶことはありません。

`tasks/dependency-graph.md` が 300 行を超えている場合、生成前に skill が自動で圧縮します(完了した phase は「done」の 1 行見出しにまとめられます)。executor も各 Task の後に同じ処理を行うため、利用者が設定することは何もありません。

## 実行例

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan ユーザーが通知の種類ごとにオン/オフを切り替えられる設定画面と API が必要。メール/プッシュ/アプリ内の 3 チャンネルに対応" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan ユーザーが通知の種類ごとにオン/オフを切り替えられる設定画面と API が必要。メール/プッシュ/アプリ内の 3 チャンネルに対応" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

以降の実行 command はオプションが多いため、別ページで扱います → [16. Executor / Code-gen Prompt パターン](./13-executor-and-codegen-patterns.md)。最も単純な開始は以下です。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
</ToolTabs>

task 指定を省略すると、`dependency-graph.md` から次に実行可能な Task を自動で探します。

## `--review` を必ず付けてください

両 executor とも `--review` flag によって、各 Task の PR 作成/merge 前に `/ywc-impl-review` を自動実行します。この flag なしで実行すると、[04](./04-general-cycle-small.md) の small cycle と同様にレビュー段階が完全に抜けます。付けない理由はありません。(ただし、Task の `Criticality: critical` が設定されている場合は flag の有無に関係なく常に強制実行されます。)

## 各段階で詰まったとき

| 状況 | 対応 |
|---|---|
| `ywc-spec-ready` が iteration 上限に達した | 自動収束できない根本的な spec 問題 — 部分レポートを読み、直接 spec を修正 |
| `ywc-task-generator` が Task を 20 個以上作ろうとする | spec 自体が過大であるサイン — まず spec 分割を検討 |
| Task 実行中に dependency がまだ完了していない | executor が自動で停止し、どの Task が先行する必要があるか報告する |

---

[← 前: 04. 小さな変更を処理する](./04-general-cycle-small.md) · [次: 06. 目標 1 つで自動完了する →](./06-agentic-autonomous-loop.md)
