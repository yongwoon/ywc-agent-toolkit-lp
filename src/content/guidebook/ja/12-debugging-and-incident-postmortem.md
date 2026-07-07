[« 目次に戻る](./README.md)

# 12. デバッグとインシデント事後分析

## いつこのフローを使うか

2 つの Skill は異なる質問に答えます。今したい質問が何かに応じて選んでください。

| やりたいこと | 質問 | 使用する Skill |
|---|---|---|
| バグの原因が見つからず困っている | "この不具合は本当に何が原因か?" | `ywc-debug-rootcause` |
| Production 障害が起き、振り返りを書く必要がある | "何が起きたか、どう対応すればよいか?" | `ywc-incident-postmortem` |

## `ywc-debug-rootcause` — バグの根本原因調査

不具合の症状だけを直す patch を防ぎ、4 段階の root-cause 調査を強制します。同じ地点で 3 回以上修正に失敗した場合、architecture 自体を疑うよう案内します。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-debug-rootcause 決済 webhook がたまに重複処理される。原因が見つからない" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-debug-rootcause 決済 webhook がたまに重複処理される。原因が見つからない" />
  </ToolTabsPanel>
</ToolTabs>

## `ywc-incident-postmortem` — インシデント事後分析

Production 障害が起きたとき、事後分析 (postmortem) 文書を作成します。`--client` を指定すると、内部詳細を除いた顧客向け要約を追加で作ります。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
</ToolTabs>

## 2 つの Skill を組み合わせる

`ywc-debug-rootcause` はインシデント発生時にリアルタイムで実行し、「何が起きたのか」を調査します。その結果を基に、修正が完了した後に `ywc-incident-postmortem` を実行して、root-cause の結論を timeline / impact assessment / prevention action items へ転換します。

順序としては、まず root-cause を見つけ、その結論をもとに事後分析の文書を書く、という流れが標準です。`ywc-incident-postmortem` は `--verdict` flag で root-cause の結論を受け取ることで、調査を省略して直接文書作成へ進むこともできます。

---

[Previous: 11. デザインをレビューして改善する](./11-design-review.md) - [Next: 13. Executor / Code-gen Prompt パターン](./13-executor-and-codegen-patterns.md)
