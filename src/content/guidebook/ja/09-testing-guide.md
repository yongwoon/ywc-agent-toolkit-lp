[« 目次に戻る](./README.md)

# 09. Test を作成して実行する

## いつこのフローを使うか

機能実装が終わった後、「本当に意図通りに動作するか」を検証する必要があるときに使います。検証は性質の異なる 2 つの系統に分かれます。自動化されたコード test と、人が判断すべき手動検証です。

## 全体フロー

```
1. test case 작성 → 2. test sheet 실행 (code test + e2e test) → 3. 기대와 다르면 수정 후 재실행
```

| 段階 | 何をするか |
|---|---|
| 1. test case 作成 | `ywc-gen-testcase` で PR / Task / diff ベースの手動検証用 testsheet を生成 (開発者 + QA 兼用) |
| 2a. code test | unit / integration test を実行 (project 既存の test runner を使用) |
| 2b. e2e test | `ywc-e2e-test-strategy` で生成した flow を実行 — 詳細は [10. E2E Test 自動化戦略](./10-e2e-test-strategy.md) |
| 3. 再実行 | 期待と一致しない結果は修正後、その test だけ再実行 |

## `ywc-gen-testcase` 実行例

**PR 番号で dev+QA 兼用 testsheet を生成**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-gen-testcase 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-gen-testcase 250" />
  </ToolTabsPanel>
</ToolTabs>

**現在の diff 基準、QA 専用のみ、日本語で生成**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-gen-testcase --from-diff --audience qa --lang ja" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-gen-testcase --from-diff --audience qa --lang ja" />
  </ToolTabsPanel>
</ToolTabs>

**Task ベース、regression 項目を含む**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-gen-testcase 000020-010 --include-regression" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-gen-testcase 000020-010 --include-regression" />
  </ToolTabsPanel>
</ToolTabs>

## 手動検証 vs 自動化、何をいつ使うか

| 検証対象 | 方法 |
|---|---|
| Visual/pixel 精度、探索的 UX 判断 | `ywc-gen-testcase` (手動) — 人の判断が必須の領域 |
| 1 回限りの migration、3rd-party OAuth flow、email/SMS 認証 | `ywc-gen-testcase` (手動) — 毎回自動化するには費用対効果が低い |
| ログイン/ログアウト、核心機能 happy path、繰り返し回帰が発生する flow | `ywc-e2e-test-strategy` (自動化) — [10](./10-e2e-test-strategy.md) 参照 |
| 関数/モジュール単位のロジック | project 既存の unit/integration test runner |

2 つの方式は代替関係ではなく**相互補完**関係です。自動化では拾えない UX 判断は、リリースごとに `ywc-gen-testcase` で手動 QA チェックリストを補完してください。

---

[← 前: 08. 既存 Repo に初めて入る](./08-onboarding-existing-repo.md) · [次: 10. E2E Test 自動化戦略 →](./10-e2e-test-strategy.md)
