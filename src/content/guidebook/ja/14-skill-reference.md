[« 目次に戻る](./README.md)

# 14. 全 Skill リファレンス

前のワークフローガイドで扱わなかった残りの Skill を、**やりたいこと**基準でまとめて整理しました。各フロー(Small/Medium/Large cycle、新規 project、onboarding、testing、design)の途中で必要になったときに参照してください。

下の表で該当する状況を探し、Skill 名をクリックすると該当の説明にジャンプします。

| Skill | いつ使うか |
|---|---|
| [`ywc-handle-pr-reviews`](#開いている-pr-の-review-comment-に対応しciconflict-も一緒に整理したい) | 開いている PR の review comment に対応し、CI/conflict も一緒に整理したい |
| [`ywc-create-pr`](#変更を-commit-して-draft-pr-を開きたい) | 変更を commit して draft PR を開きたい |
| [`ywc-merge-dependabot`](#溜まっている-dependabot-pr-を一度に整理したい) | 溜まっている Dependabot PR を一度に整理したい |
| [`ywc-commit`](#ここまでの作業を-commit-だけしたい) | ここまでの作業を commit だけしたい |
| [`ywc-receive-review`](#レビュアー人間または-coderabbitcodexclaudeの指摘を無条件に受け入れず技術的に検証してから対応したい) | レビュアー(人間または CodeRabbit/Codex/Claude)の指摘を無条件に受け入れず、技術的に検証してから対応したい |
| [`ywc-brainstorm`](#アイデアがまだ具体的でないので整理から始めたい) | アイデアがまだ具体的でないので、整理から始めたい |
| [`ywc-tech-research`](#ライブラリや実装方式を比較して何を使うか決めたい) | ライブラリや実装方式を比較して何を使うか決めたい |
| [`ywc-agentic`](#目標だけ渡し計画から実装まで人の介入なしで任せたい) | 目標だけ渡し、計画から実装まで人の介入なしで任せたい |
| [`ywc-security-audit`](#認証決済のような敏感なコードのセキュリティ脆弱性を点検したい) | 認証/決済のような敏感なコードのセキュリティ脆弱性を点検したい |
| [`ywc-refactor-clean`](#古い-dead-code-未使用関数export依存関係を整理したい) | 古い dead code (未使用関数/export/依存関係)を整理したい |
| [`ywc-improve-architecture`](#絡み合った-shallow-module-構造を-deep-module-に再構造化したい) | 絡み合った shallow module 構造を deep module に再構造化したい |
| [`ywc-impl-review`](#一般-cycle-の外で独立して実装品質と-maintenance-観点を点検したい) | 一般 cycle の外で、独立して実装品質と maintenance 観点を点検したい |
| [`ywc-agent-legibility-audit`](#agent-がコードを修正する際にかかる-token-コストと可読性を測定したい) | Agent がコードを修正する際にかかる token コストと可読性を測定したい |
| [`ywc-tdd-ritual`](#red--green--refactor-を文書化された手順どおり厳格に守りながら実装したい) | RED → GREEN → REFACTOR を文書化された手順どおり厳格に守りながら実装したい |
| [`ywc-e2e-test-strategy`](#critical-user-flow-を-playwright-で自動化したいまたは既存の-e2e-カバレッジの穴を点検したい) | critical user flow を Playwright で自動化したい、または既存の E2E カバレッジの穴を点検したい |
| [`ywc-product-review`](#コードではなくビジネスサービスの観点でプロジェクトをレビューしてほしい) | コードではなくビジネス/サービスの観点でプロジェクトをレビューしてほしい |
| [`ywc-review-learnings`](#code-review-で繰り返し指摘される内容を学習させ次から再指摘しないようにしたい) | Code review で繰り返し指摘される内容を学習させ、次から再指摘しないようにしたい |
| [`ywc-ubiquitous-language`](#開発者ドメイン専門家llm-が共有するドメイン用語集を作成または更新したい) | 開発者・ドメイン専門家・LLM が共有するドメイン用語集を作成または更新したい |
| [`ywc-mission`](#project-の-why-と-rejected-approach-を記録したい) | Project の why と rejected-approach を記録したい |
| [`ywc-release-pr-list`](#release-pr-developmain-などに含まれる-merged-pr-一覧を整理したい) | Release PR (develop→main など)に含まれる merged PR 一覧を整理したい |
| [`ywc-changelog-release-notes`](#changelogmd-やユーザー向け-release-note-を作成したい) | CHANGELOG.md やユーザー向け release note を作成したい |
| [`ywc-skill-author`](#新しい-ywc--skill-を作りたいまたは既存の-skill-をルールに沿って整理点検したい) | 新しい ywc-* skill を作りたい、または既存の skill をルールに沿って整理/点検したい |
| [`ywc-setup-language` / `ywc-setup`](#出力言語の永続デフォルトを設定し毎回-language-を聞かれないようにしたい) | 出力言語の永続デフォルトを設定し、毎回 language を聞かれないようにしたい |
| [`ywc-worktrees`](#隔離された-worktree-のパスを作りたいまたは点検整理したい) | 隔離された worktree のパスを作りたい、または点検/整理したい |
| [`ywc-docker-isolate`](#並列で立ち上げた-worktree-の-docker-ポートが衝突する問題を解決したい) | 並列で立ち上げた worktree の Docker ポートが衝突する問題を解決したい |

## PR / Review を扱いたいとき

### 開いている PR の review comment に対応し、CI/conflict も一緒に整理したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
</ToolTabs>
PR 番号を省略すると、現在の branch の PR を自動で探します。

### 変更を commit して draft PR を開きたい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
[04](./04-general-cycle-small.md), [05](./05-general-cycle-medium-large.md) のフローにはすでに含まれているため、そのフローの外で単独で PR だけ開きたいときに使います。

### 溜まっている Dependabot PR を一度に整理したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
</ToolTabs>
`security` を省略するとすべての Dependabot PR が対象となり、`parallel-auto` を省略すると PR 番号順に 1 つずつ順次処理します。

### ここまでの作業を commit だけしたい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-commit authentication 関連の変更だけを commit して" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-commit authentication 関連の変更だけを commit して" />
  </ToolTabsPanel>
</ToolTabs>
PR 作成やコード変更そのものには使いません。commit 専用です。

### レビュアー(人間または CodeRabbit/Codex/Claude)の指摘を無条件に受け入れず、技術的に検証してから対応したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-receive-review レビュアーがこのヘルパー関数は未使用だから削除しろと言っているが、本当に未使用か先に確認して" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-receive-review レビュアーがこのヘルパー関数は未使用だから削除しろと言っているが、本当に未使用か先に確認して" />
  </ToolTabsPanel>
</ToolTabs>
先に同意してから実装する既定の挙動を防ぎ、すべての指摘を「検証すべき提案」として扱います。`ywc-handle-pr-reviews` の自動化を補う判断レイヤーです。

## まだ計画がない、または人の介入なしで最後まで回したいとき

### アイデアがまだ具体的でないので、整理から始めたい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm 通知機能を作りたいが、まだどうするか具体的でない" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm 通知機能を作りたいが、まだどうするか具体的でない" />
  </ToolTabsPanel>
</ToolTabs>
Socratic 対話で目的/制約/成功基準と代替案 2〜3 個を導き、その後 `ywc-plan` へ handoff します。

### ライブラリや実装方式を比較して何を使うか決めたい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research &quot;Hono SSE 実装&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research &quot;Hono SSE 実装&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
</ToolTabs>
`--depth` で調査の深さ(25 要約のみ 〜 100 網羅的調査)を、`--format html` で self-contained レポート出力を調整できます。

### 目標だけ渡し、計画から実装まで人の介入なしで任せたい

`ywc-agentic` 専用ページへ移しました。詳しい使い方と例は [06. 目標 1 つで自動完了する](./06-agentic-autonomous-loop.md)を参照してください。

## 品質・セキュリティ・プロダクト観点を点検したいとき

### 認証/決済のような敏感なコードのセキュリティ脆弱性を点検したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
</ToolTabs>

### バグの原因が見つからず困っている

`ywc-debug-rootcause` 専用ページへ移しました。詳しい使い方と例は [12. デバッグとインシデント事後分析](./12-debugging-and-incident-postmortem.md)を参照してください。

### 古い dead code (未使用関数/export/依存関係)を整理したい

`ywc-refactor-clean` 専用ページへ移しました。詳しい使い方と例は [13. コード構造と保守性の管理](./16-code-structure-and-maintainability.md)を参照してください。

### 絡み合った shallow module 構造を deep module に再構造化したい

`ywc-improve-architecture` 専用ページへ移しました。詳しい使い方と例は [13. コード構造と保守性の管理](./16-code-structure-and-maintainability.md)を参照してください。

### 一般 cycle の外で、独立して実装品質と maintenance 観点を点検したい

`ywc-impl-review` 専用ページへ移しました。詳しい使い方と例は [13. コード構造と保守性の管理](./16-code-structure-and-maintainability.md)を参照してください。

### Agent がコードを修正する際にかかる token コストと可読性を測定したい

`ywc-agent-legibility-audit` 専用ページへ移しました。詳しい使い方と例は [13. コード構造と保守性の管理](./16-code-structure-and-maintainability.md)を参照してください。

### Production 障害が起き、振り返り文書を書く必要がある

`ywc-incident-postmortem` 専用ページへ移しました。詳しい使い方と例は [12. デバッグとインシデント事後分析](./12-debugging-and-incident-postmortem.md)を参照してください。

### RED → GREEN → REFACTOR を文書化された手順どおり厳格に守りながら実装したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tdd-ritual ログイン失敗理由を具体的に表示する機能を TDD で実装して" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tdd-ritual ログイン失敗理由を具体的に表示する機能を TDD で実装して" />
  </ToolTabsPanel>
</ToolTabs>
`ywc-code-gen`、`ywc-sequential-executor` などで言及される opt-in の `--tdd` 手順とは、まさにこの skill のことです — RED/GREEN/REFACTOR の各遷移ごとに検証ステップを強制します。

### critical user flow を Playwright で自動化したい、または既存の E2E カバレッジの穴を点検したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
</ToolTabs>
`--init` で Playwright を最初からセットアップし、`--audit` で既存カバレッジの穴だけを点検することもできます。

### コードではなくビジネス/サービスの観点でプロジェクトをレビューしてほしい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-product-review --format html" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-product-review --format html" />
  </ToolTabsPanel>
</ToolTabs>
User value、UX、growth、risk などビジネス観点でプロジェクトを見直します — コードレビューは `ywc-impl-review`、セキュリティレビューは `ywc-security-audit` を使ってください。

## Project の知識を蓄積したいとき (Stateful Skills)

これらの Skill は一度使って終わりではなく、会話が終わっても project に残り、次の session でも参照される知識を管理します。

### Code review で繰り返し指摘される内容を学習させ、次から再指摘しないようにしたい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings この指摘は false positive だから、学習しておいて" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings この指摘は false positive だから、学習しておいて" />
  </ToolTabsPanel>
</ToolTabs>

### 開発者・ドメイン専門家・LLM が共有するドメイン用語集を作成または更新したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
</ToolTabs>
`--ddd` は Entity / Value Object / Aggregate のような DDD Type 列を追加します。

### Project の why と rejected-approach を記録したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-mission この project の目標は ..." />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-mission この project の目標は ..." />
  </ToolTabsPanel>
</ToolTabs>
[07. 新しい Project を始める](./07-starting-a-new-project.md)ですでに扱いました。project 進行中に方向が変わったときも再利用できます。

## Release を準備したいとき

### Release PR (develop→main など)に含まれる merged PR 一覧を整理したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
</ToolTabs>

### CHANGELOG.md やユーザー向け release note を作成したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>
`--pr-list <ywc-release-pr-list の結果ファイル>` を渡すと、git log ではなくその一覧を根拠に生成します。

## Toolkit 自体を拡張したり、実行インフラを扱いたいとき

### 新しい ywc-* skill を作りたい、または既存の skill をルールに沿って整理/点検したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-skill-author 決済 webhook のリトライ処理を扱う新しい skill を作りたい" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-skill-author 決済 webhook のリトライ処理を扱う新しい skill を作りたい" />
  </ToolTabsPanel>
</ToolTabs>
`ywc-*` skill の frontmatter/body/references のルールを検証し、揃えます。skill の内容を直すのではなく、skill「自体」を新規作成・再構成するときに使います。

### 出力言語の永続デフォルトを設定し毎回 language を聞かれないようにしたい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-setup-language ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-setup --scope project --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
生成される文書、PR 文、commit message の出力言語を、毎回 skill 呼び出しで `--lang` を渡さずに揃えたいときに使います。project または user の永続デフォルトを設定するもので、現在の chat 言語を切り替えるものではありません。

一回だけの指定は引き続き優先されます。解決順は、対象 skill に明示した `--lang` > project/user の永続デフォルト > 質問、です。

### 隔離された worktree のパスを作りたい、または点検/整理したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>
通常は `ywc-parallel-executor` が内部的に呼び出しますが、`--mode audit`/`prune`/`resolve` で直接点検・整理することもできます。

### 並列で立ち上げた worktree の Docker ポートが衝突する問題を解決したい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
</ToolTabs>
`ywc-parallel-executor` が各 task worktree ごとに自動的に呼び出す、決定論的な port 割り当て skill です — worktree ごとに固有の `COMPOSE_PROJECT_NAME` と port ブロックを割り当て、「port is already allocated」衝突を防ぎます。

## 全 Skill 索引 (A-Z)

この toolkit のすべての `ywc-*` skill を名前順に整理しました。詳しい使い方は各 skill の場所(専用ページまたは上の状況別項目)を参照してください。

| Skill | 説明 | 場所 |
|---|---|---|
| `ywc-agent-legibility-audit` | Agent がコードを修正する際にかかる token コストと可読性を測定したい | [13](./16-code-structure-and-maintainability.md) |
| `ywc-agentic` | 目標だけ渡し、計画から実装まで人の介入なしで任せたい | [こちら](#目標だけ渡し計画から実装まで人の介入なしで任せたい) |
| `ywc-brainstorm` | アイデアがまだ具体的でないので、整理から始めたい | [こちら](#アイデアがまだ具体的でないので整理から始めたい) |
| `ywc-changelog-release-notes` | CHANGELOG.md やユーザー向け release note を作成したい | [こちら](#changelogmd-やユーザー向け-release-note-を作成したい) |
| `ywc-code-gen` | Backend/Frontend/QA の 3 layer を並列に同時生成する多層 code 生成 skill | [14](./13-executor-and-codegen-patterns.md) |
| `ywc-commit` | ここまでの作業を commit だけしたい | [こちら](#ここまでの作業を-commit-だけしたい) |
| `ywc-confidence-gate` | 成果物が次の段階に進んでよいかを PROCEED/REVIEW/STOP で判定する信頼度 gate | [06](./06-agentic-autonomous-loop.md) |
| `ywc-create-pr` | 変更を commit して draft PR を開きたい | [こちら](#変更を-commit-して-draft-pr-を開きたい) |
| `ywc-debug-rootcause` | バグの根本原因が見つからず困っている | [12](./12-debugging-and-incident-postmortem.md) |
| `ywc-design-renew` | 平凡に見える画面を視覚的に De-slop renewal する skill | [11](./11-design-review.md) |
| `ywc-docker-isolate` | 並列で立ち上げた worktree の Docker ポートが衝突する問題を解決したい | [こちら](#並列で立ち上げた-worktree-の-docker-ポートが衝突する問題を解決したい) |
| `ywc-e2e-test-strategy` | critical user flow を Playwright で自動化したい、または既存の E2E カバレッジの穴を点検したい | [こちら](#critical-user-flow-を-playwright-で自動化したいまたは既存の-e2e-カバレッジの穴を点検したい) |
| `ywc-finish-branch` | 完了した feature branch を PR 作成から merge・整理まで仕上げる skill | [04](./04-general-cycle-small.md) |
| `ywc-gen-testcase` | PR 検証用の手動 test 文書(testsheet)を spec から生成する skill | [09](./09-testing-guide.md) |
| `ywc-handle-pr-reviews` | 開いている PR の review comment に対応し、CI/conflict も一緒に整理したい | [こちら](#開いている-pr-の-review-comment-に対応しciconflict-も一緒に整理したい) |
| `ywc-impl-review` | 一般 cycle の外で、独立して実装品質と maintenance 観点を点検したい | [13](./16-code-structure-and-maintainability.md) |
| `ywc-improve-architecture` | 絡み合った shallow module 構造を deep module に再構造化したい | [13](./16-code-structure-and-maintainability.md) |
| `ywc-incident-postmortem` | Production 障害が起き、振り返り文書を書く必要がある | [12](./12-debugging-and-incident-postmortem.md) |
| `ywc-merge-dependabot` | 溜まっている Dependabot PR を一度に整理したい | [こちら](#溜まっている-dependabot-pr-を一度に整理したい) |
| `ywc-mission` | Project の why と rejected-approach を記録したい | [こちら](#project-の-why-と-rejected-approach-を記録したい) |
| `ywc-onboard-repo` | 未知の repo の慣習を逆算して CLAUDE.md を生成する onboarding skill | [08](./08-onboarding-existing-repo.md) |
| `ywc-parallel-executor` | 複数の Task を隔離された worktree で並列実行する executor | [14](./13-executor-and-codegen-patterns.md) |
| `ywc-plan` | 機能/変更の実装計画を立てる入口 skill | [04](./04-general-cycle-small.md) |
| `ywc-product-review` | コードではなくビジネス/サービスの観点でプロジェクトをレビューしてほしい | [こちら](#コードではなくビジネスサービスの観点でプロジェクトをレビューしてほしい) |
| `ywc-project-docs` | docs/ ディレクトリ構造に沿って project 文書を生成する skill | [07](./07-starting-a-new-project.md) |
| `ywc-project-scaffold` | 完全に新しい project のディレクトリ構造を設計する skill | [07](./07-starting-a-new-project.md) |
| `ywc-receive-review` | レビュアー(人間または CodeRabbit/Codex/Claude)の指摘を無条件に受け入れず、技術的に検証してから対応したい | [こちら](#レビュアー人間または-coderabbitcodexclaudeの指摘を無条件に受け入れず技術的に検証してから対応したい) |
| `ywc-refactor-clean` | 古い dead code (未使用関数/export/依存関係)を整理したい | [13](./16-code-structure-and-maintainability.md) |
| `ywc-release-pr-list` | Release PR (develop→main など)に含まれる merged PR 一覧を整理したい | [こちら](#release-pr-developmain-などに含まれる-merged-pr-一覧を整理したい) |
| `ywc-review-learnings` | Code review で繰り返し指摘される内容を学習させ、次から再指摘しないようにしたい | [こちら](#code-review-で繰り返し指摘される内容を学習させ次から再指摘しないようにしたい) |
| `ywc-security-audit` | 認証/決済のような敏感なコードのセキュリティ脆弱性を点検したい | [こちら](#認証決済のような敏感なコードのセキュリティ脆弱性を点検したい) |
| `ywc-sequential-executor` | 複数の Task を順番に 1 つずつ実行する executor | [14](./13-executor-and-codegen-patterns.md) |
| `ywc-setup` | 出力言語の永続デフォルトを設定し毎回 language を聞かれないようにしたい | [こちら](#出力言語の永続デフォルトを設定し毎回-language-を聞かれないようにしたい) |
| `ywc-skill-author` | 新しい ywc-* skill を作りたい、または既存の skill をルールに沿って整理/点検したい | [こちら](#新しい-ywc--skill-を作りたいまたは既存の-skill-をルールに沿って整理点検したい) |
| `ywc-spec-ready` | spec 文書が実装可能なレベルまで準備できているか検証する gate | [05](./05-general-cycle-medium-large.md) |
| `ywc-spec-validate` | spec 文書内の矛盾・欠落を点検する検証 skill | [05](./05-general-cycle-medium-large.md) |
| `ywc-spec-writer` | PRD/spec 文書を作成する skill | [07](./07-starting-a-new-project.md) |
| `ywc-task-generator` | spec を実行可能な Task 単位に分解する skill | [05](./05-general-cycle-medium-large.md) |
| `ywc-tdd-ritual` | RED → GREEN → REFACTOR を文書化された手順どおり厳格に守りながら実装したい | [こちら](#red--green--refactor-を文書化された手順どおり厳格に守りながら実装したい) |
| `ywc-tech-research` | ライブラリや実装方式を比較して何を使うか決めたい | [こちら](#ライブラリや実装方式を比較して何を使うか決めたい) |
| `ywc-ubiquitous-language` | 開発者・ドメイン専門家・LLM が共有するドメイン用語集を作成または更新したい | [こちら](#開発者ドメイン専門家llm-が共有するドメイン用語集を作成または更新したい) |
| `ywc-ui-ux-review` | 画面の usability とアクセシビリティを点検する skill | [11](./11-design-review.md) |
| `ywc-verify-done` | lint/typecheck/test/build を実行して完了を機械的に検証する skill | [06](./06-agentic-autonomous-loop.md) |
| `ywc-worktrees` | 隔離された worktree のパスを作りたい、または点検/整理したい | [こちら](#隔離された-worktree-のパスを作りたいまたは点検整理したい) |

---

[← 前: 14. Executor / Code-gen Prompt パターン](./13-executor-and-codegen-patterns.md) · [次: 16. 事前準備とインストール →](./15-prerequisites-installation.md)
