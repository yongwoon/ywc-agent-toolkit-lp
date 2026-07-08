[« 目次に戻る](./README.md)

# 13. コード構造と保守性の管理

## いつこの 4 つの Skill を使うか

4 つの Skill はすべて「コードが良くない」という同じ症状から出発しますが、答える質問が異なります。今何を聞きたいかで選んでください。

| やりたいこと | 質問 | 使う Skill |
|---|---|---|
| 未使用の関数/export/依存関係を削除したい | "この code は実際に使われているか?" | `ywc-refactor-clean` |
| shallow module が絡み合っていて構造自体を再構成したい | "この構造を deep module に作り直す必要があるか?" | `ywc-improve-architecture` |
| PR cycle の外で実装品質と spec 適合性のレビューを受けたい | "この実装は architecture/design/devex/security/QA の観点で問題ないか?" | `ywc-impl-review` |
| agent がこの code を直すのにかかるコストを先に測定したい | "ここを直すには agent が token をどれだけ使う必要があるか?" | `ywc-agent-legibility-audit` |

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

`--tier safe` は detection tool + grep + test の 3 つすべてが「未使用」に同意した項目だけを削除します。構造そのものは再構成しません — それは `ywc-improve-architecture` の役割です。

## `ywc-improve-architecture` — Shallow → Deep Module 再構造化

絡み合った shallow module の山を deep module(シンプルな interface の裏に完全な実装を隠す module)へ、behavior-preserving で一度に一単位ずつ再構造化します。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

まず `--dry-run` で Opportunity Backlog だけを確認し、問題なければ flag を外して実際の consolidation を実行します。codebase 全体を一度に対象にすることはできません(Scope Gate) — 必ず module/directory 単位で範囲を絞る必要があります。

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

## `ywc-agent-legibility-audit` — Agent 視点の可読性測定

Correctness やセキュリティではなく、「この code を agent が安全に修正するのに token がどれだけかかるか」を deep/shallow module 比率と change-point の明示性を基準に測定します。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
</ToolTabs>

読み取り専用のレポートです。構造そのものは実際には修正しません。見つかった項目は `ywc-improve-architecture`(shallow→deep 再構造化) または `ywc-refactor-clean`(dead code 削除) に routing されます。

## 4 つの Skill が一緒に働く流れ

見知らぬ、あるいは古くて手を付けるのが不安な codebase を整理するときの一般的な順序は次のとおりです。

**Step 1: まず測定する — `ywc-agent-legibility-audit`**

何も直す前に、どこから手を付けるのが費用対効果として最も高いかを読み取り専用で測定します。deep/shallow module 比率と change-point の明示性を基準に、legibility が最も悪い箇所を示します。

**Step 2: 最も安全なものから — `ywc-refactor-clean`**

測定結果で dead code が legibility を下げているなら、最も元に戻しやすいこのステップから対応します。detection tool + grep + test の 3 つすべてが同意するものだけを削除するため、リスクが低いです。

**Step 3: 構造そのものを再構成する — `ywc-improve-architecture`**

dead code を取り除いても shallow module の山が残っているなら、ここで構造を deep module に再構成します。behavior-preserving で一度に一単位ずつ、green test suite の裏で進めます。

**Step 4: 最終検証 — `ywc-impl-review`**

再構造化が終わったら、PR を開く前に 5 軸レビューで残った問題がないか確認します。ここで出た指摘は、再び Step 1(`ywc-agent-legibility-audit`)や Step 2〜3 に戻る入力になることがあります。

---

[← 前: 12. デバッグとインシデント事後分析](./12-debugging-and-incident-postmortem.md) · [次: 14. Executor / Code-gen Prompt パターン →](./13-executor-and-codegen-patterns.md)
