[« 目次に戻る](./README.md)

# 04. 小さな変更を処理する (general cycle · small)

## いつこのフローを使うか

`ywc-plan` がリクエストを **Small** と判断したとき、自動的にこの経路に入ります。判断基準は「Task 分解なしで単一 PR に収められるか」であり、以下のいずれかに該当すると Small ではなく Medium/Large に格上げされます ([05](./05-general-cycle-medium-large.md) 参照)。

- DB migration が含まれる
- 新 Library/Framework 導入が含まれる
- 複数 subsystem にまたがる変更である

## 全体フロー

```
ywc-plan → ywc-spec-ready → ywc-code-gen → ywc-impl-review → ywc-create-pr
```

| 段階 | Skill | 役割 |
|---|---|---|
| 1 | `ywc-plan` | リクエストを分析して `plan.md` を生成 (What / Why / Out of Scope / Done When) |
| 2 | `ywc-spec-ready` | `plan.md` に残った concern を自動収束 |
| 3 | `ywc-code-gen` | Backend + Frontend + QA の並列コード生成 |
| 4 | `ywc-impl-review` | PR を開く前の最終コードレビュー |
| 5 | `ywc-create-pr` | PR 作成 → CI → Bot Review 確認 |

> **注意**: `ywc-code-gen` には `--review` のような自動レビュー flag がありません。4 段階目(`ywc-impl-review`)を省略するとコードレビューなしでそのまま PR が開かれるため、このフローでは必ず明示的に実行してください。(Medium/Large フローの executor は `--review` flag でこの段階を自動化できます — [05](./05-general-cycle-medium-large.md) 参照。)

## 実行例

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움. 잠김/오타/미가입 등 구체적 사유를 보여주고 싶음" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움. 잠김/오타/미가입 등 구체적 사유를 보여주고 싶음" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

Bot review comment、failed CI、merge-readiness の問題が残っている場合は、続けて `ywc-handle-pr-reviews <pr-number>` を実行します。Small フローは `plan.md` ベースで `tasks/<task-name>/` directory がないため、`ywc-finish-branch` の task 完了処理とは合いません。

## 各段階で詰まったとき

| 状況 | 対応 |
|---|---|
| `ywc-plan` が Small ではなく Medium と判断した | 正常です — [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) へ移動 |
| `ywc-code-gen` が `BLOCKED` を返した | spec が不明確、または project context を読めていない場合 — 報告された blocker を確認 |
| `ywc-impl-review` が `DONE_WITH_CONCERNS` を返した | correctness 問題なら修正して再実行、observation 的な内容なら PR 説明に残して進行 |
| PR が CI を通過しない | `ywc-create-pr` または `ywc-handle-pr-reviews` が failure log を確認し、最大 2 回まで修正を試みる。それでも失敗する場合は `DONE_WITH_CONCERNS` または `BLOCKED` として表面化される |

---

[← 前: 03. 5 分で最初の機能をデプロイする](./03-quickstart.md) · [次: 05. 複数の Task に分けて処理する →](./05-general-cycle-medium-large.md)
