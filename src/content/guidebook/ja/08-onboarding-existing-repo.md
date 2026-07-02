[« 目次に戻る](./README.md)

# 08. 既存 Repo に初めて入る

## いつこのフローを使うか

すでにコードが存在する未知の repository に初めて入り、「この codebase がどういう構造か」を把握する必要があるときに使います。逆に白紙状態から新しい project を設計する場合は、[07. 新しい Project を始める](./07-starting-a-new-project.md)へ移動してください。この 2 つのフローは逆方向なので、同じセッションで一緒に使いません。

## 何をしてくれるか

`ywc-onboard-repo` は Glob/Grep reconnaissance によって tech stack / architecture / convention を抽出し、2 つの成果物を作ります。

1. **Onboarding Guide** — 会話欄に直接出力される文書 (Tech Stack, Architecture, Key Entry Points, Directory Map, Request Lifecycle, Conventions など)
2. **Starter CLAUDE.md** — repo root に記録されるファイル。既存の `CLAUDE.md` がある場合は上書きせず、`## Detected Conventions` セクションで補強します。

## 実行例

**基本実行** — repo 全体を調査し、Onboarding Guide + Starter CLAUDE.md の両方を生成
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo" />
  </ToolTabsPanel>
</ToolTabs>

**monorepo で特定 workspace だけを調査**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --scope apps/web/" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --scope apps/web/" />
  </ToolTabsPanel>
</ToolTabs>

**Starter CLAUDE.md は不要で、説明文書だけ必要なとき**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --guide-only" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --guide-only" />
  </ToolTabsPanel>
</ToolTabs>

**Onboarding Guide は不要で、CLAUDE.md だけ必要なとき**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --claude-md-only" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --claude-md-only" />
  </ToolTabsPanel>
</ToolTabs>

## その後にすること

- reconnaissance 中に dead code の蓄積が見つかった場合、結果レポートに案内も一緒に出ます。`ywc-refactor-clean` で後続 cleanup PR を別に分けてください (onboarding PR に混ぜません)。
- Onboarding Guide を読み終えたら、既存コードに変更を加える通常の開発フローへ移ります → [02. 核心概念](./02-core-concepts.md)で規模(Small/Medium/Large)の判断基準を確認してください。

---

[← 前: 07. 新しい Project を始める](./07-starting-a-new-project.md) · [次: 09. Test を作成して実行する →](./09-testing-guide.md)
