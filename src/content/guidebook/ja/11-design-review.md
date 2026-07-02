[« 目次に戻る](./README.md)

# 11. デザインをレビューして改善する

## いつこのフローを使うか

2 つの Skill は異なる質問に答えます。今したい質問が何かに応じて選んでください。

| やりたいこと | 質問 | 使用する Skill |
|---|---|---|
| 画面が使いやすいか確認したい | "この画面は usability / accessibility 観点で問題ないか?" | `ywc-ui-ux-review` |
| 画面が地味、または AI が作ったように見える | "この画面に特色があるか?" | `ywc-design-renew` |
| 完全に新しい UI/component を最初から作りたい | (上のどちらにも該当しない — 新規制作) | この Guidebook 範囲外の UI 制作 Skill を使用 |

## `ywc-ui-ux-review` — Usability / Accessibility 監査

静的コード分析と実際の UI 実行(Chrome DevTools MCP)を組み合わせ、Information Architecture、Visual Design、Usability、Accessibility(WCAG 2.2 AA)を監査します。結果は Critical / High / Medium / Low の 4 段階レポートとして出ます。

```
ywc-ui-ux-review 결제 화면 usability 점검해줘
```

Live UI 探索が含まれるため、staging または preview URL が用意されていると、より正確な結果になります。

## `ywc-design-renew` — 視覚的 De-slop & Renewal

既存画面が平凡、または「AI が作ったような」デザインに見えるとき、視覚的な個性を付与したり、gradient text / cyan-on-dark / Inter / 均一な card grid のような AI-slop tell を点検します。

**コード renewal (デフォルトモード)**
```
ywc-design-renew --target setup-collection/default-project/docs/design/README.md --url http://localhost:3000
```

**点検だけ行い、コードは触らない**
```
ywc-design-renew --mode check --target setup-collection/default-project/docs/design/README.md --fail-on high
```

`--url` を指定すると Before/After スクリーンショットも一緒に提供され、省略するとコード分析だけで進行します(精度は下がります)。`--fail-on` は check モードの gate 基準で、デフォルト値は `critical` です。

## 新規制作はこの Skill ではない

`ywc-design-renew` は**既存画面 renewal 専用**です。最初から新しく作る UI/component は、この Guidebook の `ywc-*` review/renewal フローではなく、UI 制作専用 workflow で扱うのが適切です。まだ存在しないものを "de-slop" することはできないためです。

---

[← 前: 10. E2E Test 自動化戦略](./10-e2e-test-strategy.md) · [次: 12. Executor / Code-gen Prompt パターン →](./12-executor-and-codegen-patterns.md)
