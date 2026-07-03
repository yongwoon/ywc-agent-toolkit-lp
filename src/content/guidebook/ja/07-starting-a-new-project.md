[« 目次に戻る](./README.md)

# 07. 新しい Project を始める

## いつこのフローを使うか

Git repository 自体がない、またはあってもコードがほとんどない白紙の状態で project を設計するときに使います。すでにコードがある未知の repo を把握したい場合は、このページではなく [08. 既存 Repo に初めて入る](./08-onboarding-existing-repo.md)へ移動してください。この 2 つのフローは逆方向であり、同じセッションで一緒に使いません。

## 全体フロー

| 段階 | Skill | 役割 |
|---|---|---|
| 1 | `ywc-project-scaffold` | tech stack / architecture pattern 確定後、directory 構造を設計 (Markdown plan を出力) |
| 2 | `ywc-project-mission` | `docs/mission.md` に project の why、success criteria、rejected-approach log を記録 |
| 3 | `ywc-spec-writer --full` | `docs/specification/` に全体仕様書を作成 (goal / feature / data model / user flow) |
| 4 | `ywc-spec-validate` | 仕様書の completeness / consistency / feasibility / code-compatibility を検証 |
| 5 | `ywc-project-docs` | Architecture / Product / Operations などの補助文書 (必要な場合) |
| 6 | `ywc-task-generator` | `DONE` になった spec を dependency-safe Task に分解 |
| 7 | [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) へ入る | 実際の実装を開始 |

## 実行例

**1. Directory 構造を設計**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
</ToolTabs>
Language は必須で、それ以外が空なら聞き返されるため、可能な限り Framework / Architecture / Scale を一緒に明示してください。この skill は **Markdown plan のみ**を出力します。実際の file 生成は `ywc-code-gen` の役割です。

**2. Project の why を記録**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission この project の目標は、小規模建設会社が専用アプリなしで出退勤を記録できるようにすること。成功基準は、管理者 1 名が作業員 10 名以下の勤怠を 5 分以内に締められるか" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission この project の目標は、小規模建設会社が専用アプリなしで出退勤を記録できるようにすること。成功基準は、管理者 1 名が作業員 10 名以下の勤怠を 5 分以内に締められるか" />
  </ToolTabsPanel>
</ToolTabs>

**3. 全体仕様書を作成**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**4. 仕様書を検証**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
</ToolTabs>
`DONE_WITH_CONCERNS` が出たら `ywc-spec-writer` に戻って補完し、再検証します。`DONE` になるまで繰り返してください。(`ywc-spec-ready` は `ywc-plan` が作った spec 専用の自動収束 loop なので、ここでは使いません。)

**5. 補助文書 (必要なら)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
</ToolTabs>

**6. Task 分解**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

## 参考

- 規模が小さく spec 分解なしで直接実装できる場合は、`ywc-plan` が Small path へ routing し、このフロー全体を飛ばすことがあります。
- `ywc-onboard-repo` はこのフローの逆方向(既存 repo 調査)なので、新しい project 作成時には使いません。

---

[← 前: 06. 目標 1 つで自動完了する](./06-agentic-autonomous-loop.md) · [次: 08. 既存 Repo に初めて入る →](./08-onboarding-existing-repo.md)
