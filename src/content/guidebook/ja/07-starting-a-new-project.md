[« 目次に戻る](./README.md)

# 07. 新しい Project を始める

## いつこのフローを使うか

Git repository 自体がない、またはあってもコードがほとんどない白紙の状態で project を設計するときに使います。すでにコードがある未知の repo を把握したい場合は、このページではなく [08. 既存 Repo に初めて入る](./08-onboarding-existing-repo.md)へ移動してください。この 2 つのフローは逆方向であり、同じセッションで一緒に使いません。

> 始める前に: 毎回 `--lang` を付けたくない場合は、`ywc-setup-language` で出力言語を一度固定しておきましょう。以降、下記の skill はその設定に従います。

## 全体フロー

このフローは **発散 → 決定 → 収束 → 着手ゲート** の漏斗型です。アイデアを広く展開し(1)、why と何を作るかを固め(2〜3)、構造と仕様へ絞り込み(4〜9)、着手してよいかのゲートを通過し(10)、実装へ進みます。*(任意)* と付いた段階は、すでに確定していれば飛ばせます。

| 段階 | Skill | 役割 |
|---|---|---|
| 1 | `ywc-brainstorm` *(任意)* | アイデアがまだ曖昧なとき、目的・制約・success criteria・代替案 2〜3 個を、一問ずつの Socratic 対話で固める。意図がすでに明確なら飛ばす |
| 2 | `ywc-project-mission` | project の why、success criteria、rejected-approach log を `docs/mission.md` に記録。**構造を設計する前に why を先に固める** |
| 3 | `ywc-tech-research` *(任意)* | tech stack / library の候補を並列で比較し、選定理由を記録。stack がすでに決まっていれば飛ばす |
| 4 | `ywc-project-scaffold` | 確定した stack を基準に directory 構造を設計 (Markdown plan を出力) |
| 5 | `ywc-ubiquitous-language` *(ドメイン中心の project に推奨)* | 開発者・ドメイン専門家・LLM が共有する標準用語集を `docs/ubiquitous-language.md` に定義 → 以降の spec と `ywc-code-gen` が canonical term を使う |
| 6 | `ywc-spec-writer --full` | `docs/specification/` に全体仕様書を作成 (goal / feature / data model / user flow) |
| 7 | `ywc-spec-validate` | 仕様書の completeness / consistency / feasibility / code-compatibility を検証。`DONE` になるまで 6↔7 を繰り返す |
| 8 | `ywc-project-docs` | Architecture / Product / Operations などの補助文書 (必要な場合) |
| 9 | `ywc-task-generator` | `DONE` になった spec を dependency-safe Task に分解 |
| 10 | `ywc-confidence-gate` | 実装着手の前に準備度を 5 つの軸で採点 (PROCEED ≥90 / REVIEW 70–89 / STOP &lt;70) |
| 11 | [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) へ入る | 実際の実装を開始 |

## 実行例

**1. アイデアを整理 (任意)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm 小規模建設会社が専用アプリなしで出退勤を記録できるようにしたいが、どこから始めればいいか分からない" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm 小規模建設会社が専用アプリなしで出退勤を記録できるようにしたいが、どこから始めればいいか分からない" />
  </ToolTabsPanel>
</ToolTabs>
一問ずつ聞き返す Socratic 対話で、目的・制約・代替案を絞り込みます。何を作るかがすでに明確なら、この段階は飛ばして 2 番から始めてください。

**2. Project の why を記録**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission この project の目標は、小規模建設会社が専用アプリなしで出退勤を記録できるようにすること。成功基準は、管理者 1 名が作業員 10 名以下の勤怠を 5 分以内に締められるか" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission この project の目標は、小規模建設会社が専用アプリなしで出退勤を記録できるようにすること。成功基準は、管理者 1 名が作業員 10 名以下の勤怠を 5 分以内に締められるか" />
  </ToolTabsPanel>
</ToolTabs>
directory 構造や仕様よりも先に **why と成功基準** を固めます — 以降のすべての段階は、この mission を基準に判断されます。

**3. Tech stack を決定 (任意)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
</ToolTabs>
4 番の scaffold は「stack 確定後」に構造を描くため、stack がまだ決まっていなければ、ここで候補を比較し理由を残してから進めてください。すでに決まっていれば飛ばします。

**4. Directory 構造を設計**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
</ToolTabs>
Language は必須で、それ以外が空なら聞き返されるため、可能な限り Framework / Architecture / Scale を一緒に明示してください。この skill は **Markdown plan のみ**を出力します。実際の file 生成は `ywc-code-gen` の役割です。

**5. ドメイン用語集 (ドメイン中心の project に推奨)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
</ToolTabs>
標準用語を先に定義しておくと、次の段階の spec と `ywc-code-gen` が同じ名前を使うようになり、同義語がコードに混ざるのを防げます。用語が単純な project なら飛ばして構いません。

**6. 全体仕様書を作成**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**7. 仕様書を検証**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
</ToolTabs>
`DONE_WITH_CONCERNS` が出たら 6 番の `ywc-spec-writer` に戻って補完し、再検証します。`DONE` になるまで繰り返してください。(`ywc-spec-ready` は `ywc-plan` が作った spec 専用の自動収束 loop なので、ここでは使いません。)

**8. 補助文書 (必要なら)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
</ToolTabs>

**9. Task 分解**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**10. 着手ゲート**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-confidence-gate この spec と task で実装に着手してよいか点検" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-confidence-gate この spec と task で実装に着手してよいか点検" />
  </ToolTabsPanel>
</ToolTabs>
scope clarity / architecture compliance / evidence quality / reuse verified / root cause の 5 軸を採点します。`PROCEED`(≥90)なら [05. general cycle](./05-general-cycle-medium-large.md) へ進み、`STOP`(&lt;70)なら指摘された軸を先に補完してください。

## 参考

- `ywc-brainstorm`・`ywc-tech-research`・`ywc-ubiquitous-language` は状況に応じて飛ばせる補助段階です。意図・stack・ドメイン用語がすでに明確なら、コアの背骨 **2 → 4 → 6 → 7 → 9 → 10** だけを辿れば十分です。
- `ywc-confidence-gate` が `STOP`(&lt;70)を返したら実装へ進まず、指摘された軸を先に埋めてから、もう一度ゲートを通してください。
- 規模が小さく spec 分解なしで直接実装できる場合は、`ywc-plan` が Small path へ routing し、このフロー全体を飛ばすことがあります。
- `ywc-onboard-repo` はこのフローの逆方向(既存 repo 調査)なので、新しい project 作成時には使いません。

---

[← 前: 06. 目標 1 つで自動完了する](./06-agentic-autonomous-loop.md) · [次: 08. 既存 Repo に初めて入る →](./08-onboarding-existing-repo.md)
