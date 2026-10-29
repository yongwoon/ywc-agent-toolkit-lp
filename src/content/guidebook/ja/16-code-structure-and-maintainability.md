[« 目次に戻る](./README.md)

# 13. コード構造と保守性の管理

## いつこの 2 つの Skill を使うか

2 つの Skill はどちらも「コードが良くない」という同じ症状から出発しますが、答える質問が異なります。今何を聞きたいかで選んでください。

| やりたいこと | 質問 | 使う Skill |
|---|---|---|
| 未使用の関数/export/依存関係を削除したい | "この code は実際に使われているか?" | `ywc-refactor-clean` |
| PR cycle の外で実装品質と spec 適合性のレビューを受けたい | "この実装は architecture/design/devex/security/QA の観点で問題ないか?" | `ywc-impl-review` |

## `ywc-refactor-clean` — Dead Code の整理

古い dead code (未使用の関数/export/依存関係)を knip / depcheck / ts-prune のようなツールで見つけて安全に削除します。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
</ToolTabs>

`--tier safe` は detection tool + grep + test の 3 つすべてが「未使用」に同意した項目だけを削除します。構造そのものは再構成しません。構造や設計上の問題は `ywc-impl-review` で洗い出し、その後は通常の cycle で修正してください。

## `ywc-impl-review` — 実装品質レビュー(単独実行)

Architecture / Design / Devex / Security / QA の 5 軸並列レビューを実行します。[04](./04-general-cycle-small.md)、[05](./05-general-cycle-medium-large.md)の PR 前検証ステップとしてすでに組み込まれていますが、その流れの外で既存の code を対象に単独実行することもできます。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
</ToolTabs>

コードを変更しない読み取り専用の分析です — 見つかった項目の実際の修正は Backend/Frontend 担当 agent に別途 dispatch します。

**知っておくと便利なオプション**

- レビュー対象は次の 3 つのうち 1 つだけを選びます: `--code <path>`、`--git-range <sha>..<sha>`、`--working-tree`(staged・unstaged・untracked の変更すべて。commit は不要です)。`--spec` は Claude Code では省略できます。
- `--profile chill|assertive`(既定は `chill`): `chill` は Low/Info のスタイル上の細かな指摘を隠し、`assertive` はそれらも表示します。Critical/High/Medium は隠されません。
- `--no-advisor` は Phase 2 の advisor 呼び出しを省略します。`--advisor-budget <n>` で呼び出し回数の上限を指定できます(既定は 5)。
- `--format html` は、自己完結型のレポートを `claudedocs/` に書き出します(既定は `markdown`)。
- `--non-interactive`(Claude Code のみ): learnings 昇格の確認を省略し、learning の候補をレポートに列挙します。

**独立した検証**: 確認済みの Critical / High の指摘は、それぞれ `file:line` と主張された severity だけを見る新しい reviewer によって 1 回ずつ再確認されます。再現できなかった指摘は Phase 2 の advisor に送られます(Security の指摘は除きます)。または unverified とマークされます。1 回の実行で検証されるのは最大 20 件です。

**スコープのガードレール**: 対象に 200 ファイルを超える変更、または変更行数が 5,000 行を超える変更が含まれる場合、レビューは開始を拒否して `NEEDS_CONTEXT` を返します。件数と変更量の多い上位 5 ファイルを報告し、対象を絞り込むよう求めます。サンプリングや切り詰めは行いません。

## 2 つの Skill が一緒に働く流れ

見知らぬ、あるいは古くて手を付けるのが不安な codebase を整理するときの一般的な順序は次のとおりです。

**Step 1: 最も安全なものから — `ywc-refactor-clean`**

dead code が見つかった場合は、最も元に戻しやすいこのステップから対応します。detection tool + grep + test の 3 つすべてが同意するものだけを削除するため、リスクが低いです。

**Step 2: 最終検証 — `ywc-impl-review`**

PR を開く前に 5 軸レビューで残った問題がないか確認します。ここで出た指摘は、Step 1 に戻って dead code を整理するか、通常の実装 cycle で修正する入力になります。

---

[← 前: 12. デバッグとインシデント事後分析](./12-debugging-and-incident-postmortem.md) · [次: 14. クラウドインフラの管理 →](./17-infrastructure-and-cloud.md)
