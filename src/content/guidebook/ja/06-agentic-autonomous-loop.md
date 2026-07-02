[« 目次に戻る](./README.md)

# 06. 目標 1 つで自動完了する (ywc-agentic)

## いつこのフローを使うか

[04](./04-general-cycle-small.md), [05](./05-general-cycle-medium-large.md) は、各段階(`ywc-plan` → ... → executor)をユーザーが 1 つずつ直接呼び出す**手動制御**フローです。`ywc-agentic` は自然言語の目標を 1 つ渡すだけで、このパイプライン全体を **Plan → Execute → Evaluate → Repeat** ループで自動反復し、検証に通るまで(または反復上限に達するまで)人の介入なしで最後まで進めます。

- 毎回次の skill を自分で管理せず、目標だけ渡したいとき → このページ
- Task 単位で直接制御したいとき (どの task をいつ実行するか自分で決める) → [05](./05-general-cycle-medium-large.md) の executor を直接使用
- Task 分解なしで既存の tasks/ backlog をそのまま実行するとき → `ywc-sequential-executor` / `ywc-parallel-executor` を直接呼び出す (agentic ではない)

## 何を自動化するのか

```
Goal → [Plan → Execute → Evaluate → Repeat] → Result
```

内部的には既存の `ywc-*` skill をそのままオーケストレーションします。新しいコード生成ロジックを持っているわけではありません。

| Phase | すること |
|---|---|
| Plan | `ywc-plan --non-interactive` で計画作成 (Small なら `plan.md`、Medium/Large なら `ywc-spec-ready` で spec を `DONE` まで収束) |
| Task | (Medium/Large のみ) `ywc-task-generator` で分解し、`dependency-graph.md` を基準に executor を自動選択 |
| Execute | Small は `ywc-code-gen`、Medium/Large は executor を `--local-merge` モードで実行 (PR なしで素早く反復) |
| Evaluate | `ywc-impl-review` で今回の iteration の差分だけをレビュー + `ywc-verify-done` で lint/typecheck/test/build を確認 |
| Repeat | 検証失敗時は `ywc-plan --update-spec` で再計画し、`--max-iterations` 上限まで反復 |

**Success Oracle** — run ごとに「何が満たされれば完了か」をあらかじめ falsifiable に定義し、最後まで保持します: Target(目標動作) / Quality threshold(最低通過基準) / Evidence required(必要な証拠) / Stop condition(停止条件)。Pass 判定は、`ywc-impl-review` が `DONE` を返し**かつ同時に** `ywc-verify-done` が green の場合にのみ成立します。review だけ `DONE` で test が赤なら、依然として Fail です。

## 実行例

**目標 1 つを自然言語で渡す (デフォルト、最大 3 回反復)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**反復上限を増やして、より粘り強く試行させる**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --max-iterations 5" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --max-iterations 5" />
  </ToolTabsPanel>
</ToolTabs>
`--max-iterations` はユーザーが決める安全装置です。収束しないからといって agent が自分で上限を上げることはありません。

**executor を明示的に指定したいとき**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;알림 설정 화면과 API 추가&quot; --executor sequential" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;알림 설정 화면과 API 추가&quot; --executor sequential" />
  </ToolTabsPanel>
</ToolTabs>
デフォルト値 `auto` は `dependency-graph.md` を見て sequential/parallel を自動選択します。

**中断された run を続きから進める**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic --resume" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic --resume" />
  </ToolTabsPanel>
</ToolTabs>
`tasks/` にまだ完了していない task が残っていれば Plan Phase を飛ばし、その地点から再開します。

**実際には実行せず、どの phase が順番に回るか事前に見る**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

## 目標が曖昧なら停止します

「自律的に実行する」とは「空欄を勝手に埋める」という意味ではありません。Plan Phase の前に目標を分類し、曖昧であれば**先に停止**します。

| 目標の状態 | 動作 |
|---|---|
| 具体的 (何を/どこに/完了条件がすべてある) | すぐ進行 |
| Why だけ抜けている (実装方法と完了条件は明確) | 進行するが defaulted として表示 |
| 不明確 (完了条件がない、または 2 通り以上に解釈可能) | `NEEDS_CONTEXT` で停止し、会話可能なら `ywc-brainstorm` へ案内 |
| 危険/不可逆 (認証、決済、権限、データ削除、schema migration) | `ywc-confidence-gate` を先に通過する必要がある |

## 各段階で詰まったとき

| 状況 | 対応 |
|---|---|
| `NEEDS_CONTEXT` で開始自体ができない | 目標が曖昧という意味 — 目標をより具体的に書き直すか、対話的に先に整理するなら `ywc-brainstorm` を使用 |
| `BLOCKED` (merge conflict, CI ハードエラー) | 自動復旧は試みません — `tasks/agentic-log.md` に記録された内容を見て直接解決後、再実行 |
| 反復上限(`--max-iterations`)に到達 | `DONE_WITH_CONCERNS` で終了し、残った CRITICAL/HIGH finding 一覧が一緒に報告される — 直接直すか、上限を上げて再実行 |
| 再計画しても同じ範囲に戻り続ける | 停滞(recursion guard)と判断して自動停止します — spec や目標自体を見直す必要がある |

## 完了後に確認すること

- `tasks/agentic-log.md` — iteration ごとの phase、通過/失敗、finding、Success Oracle が append-only で記録される
- 反復する CRITICAL/HIGH finding があった場合は完了レポートに `Learning candidate` として表示 — 確認後、必要なら `ywc-review-learnings` で直接登録 (自動では記録されない)

---

[← 前: 05. 複数の Task に分けて処理する](./05-general-cycle-medium-large.md) · [次: 07. 新しい Project を始める →](./07-starting-a-new-project.md)
