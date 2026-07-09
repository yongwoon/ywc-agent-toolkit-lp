[« 目次に戻る](./README.md)

# 03. 5 分で最初の機能をデプロイする

このページは、小さなバグ修正 1 つをアイデア段階から merge まで実際にたどってみる最初の演習です。例のシナリオ: **「ログイン失敗時のエラーメッセージが一般的すぎて原因を把握しにくい」** というリクエストを処理します。

このフローの概念説明は [04. general cycle (small)](./04-general-cycle-small.md)でより詳しく扱います。このページでは演習に集中します。

## Step 1 — 計画を立てる

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan ログイン失敗時のエラーメッセージが一般的すぎて原因を把握しにくい。ロック/入力ミス/未登録など具体的な理由を表示したい" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan ログイン失敗時のエラーメッセージが一般的すぎて原因を把握しにくい。ロック/入力ミス/未登録など具体的な理由を表示したい" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-plan` が codebase を先に読み、この変更が単一 PR で終わる **Small** 規模かどうかを判断します。Small と判断されると `plan.md` ファイルが生成されます。What / Why / Out of Scope / Done When の 4 項目が埋まっているか確認してください。

## Step 2 — 計画を収束させる

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
</ToolTabs>

`plan.md` にまだ concern が残っていれば自動で補完して再検証し、すでにきれいならそのまま次の段階へ handoff されます。

## Step 3 — コード生成

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

Backend / Frontend / QA の 3 layer を並列に生成します。生成が終わると、`DONE`, `DONE_WITH_CONCERNS`, `BLOCKED`, `NEEDS_CONTEXT` のいずれかで終わる完了レポートが出ます。各状態の意味は [02. 核心概念](./02-core-concepts.md)を参照してください。

## Step 4 — PR を開く前にレビューする

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-code-gen` には自動レビュー flag がないため、この段階を飛ばすとコードレビューなしでそのまま PR が開かれます。**省略しないでください。**

## Step 5 — PR 作成と Review

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-create-pr` が commit、secret scan、local validation、draft PR 作成、remote CI/Bot Review 確認を処理します。Bot review comment や merge-readiness の問題が残った場合は、以下のように PR health sweep を別途実行します。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
</ToolTabs>

Small フローは `plan.md` ベースなので、`tasks/<task-name>/` artifact がありません。そのため task 完了処理まで含む `ywc-finish-branch` ではなく、reviewer 承認後に GitHub UI または `gh pr merge` で merge するフローの方が安全です。

## ここまで来たら

これで、1 つの変更を最初から最後まで完走しました。次に見るとよいページ:

- 変更規模がこれより大きく、Task を複数に分ける必要がある場合 → [05. general cycle (medium/large)](./05-general-cycle-medium-large.md)
- まだアイデアが具体的でない場合 (この演習のように問題がすでに明確な場合ではないなら) → `ywc-brainstorm` から開始 ([16. 全 Skill リファレンス](./14-skill-reference.md) 参照)
- 毎回自分で進行を管理せず、目標だけ渡して最後まで自動で進めたい場合 → [06. 目標 1 つで自動完了する](./06-agentic-autonomous-loop.md)

---

[← 前: 02. 核心概念](./02-core-concepts.md) · [次: 04. 小さな変更を処理する →](./04-general-cycle-small.md)
