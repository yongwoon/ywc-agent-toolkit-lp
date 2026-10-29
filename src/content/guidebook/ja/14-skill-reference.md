[« 目次に戻る](./README.md)

# 17. 全 Skill リファレンス

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
| [`ywc-impl-review`](#一般-cycle-の外で独立して実装品質と-maintenance-観点を点検したい) | 一般 cycle の外で、独立して実装品質と maintenance 観点を点検したい |
| [`ywc-tdd-ritual`](#red--green--refactor-を文書化された手順どおり厳格に守りながら実装したい) | RED → GREEN → REFACTOR を文書化された手順どおり厳格に守りながら実装したい |
| [`ywc-verify-done`](#明示的で再実行可能な-gate-で完了を証明したい) | 明示的で再実行可能な gate で完了を証明したい |
| [`ywc-e2e-test-strategy`](#critical-user-flow-を-playwright-で自動化したいまたは既存の-e2e-カバレッジの穴を点検したい) | critical user flow を Playwright で自動化したい、または既存の E2E カバレッジの穴を点検したい |
| [`ywc-product-review`](#コードではなくビジネスサービスの観点でプロジェクトをレビューしてほしい) | コードではなくビジネス/サービスの観点でプロジェクトをレビューしてほしい |
| [`ywc-review-learnings`](#code-review-で繰り返し指摘される内容を学習させ次から再指摘しないようにしたい) | Code review で繰り返し指摘される内容を学習させ、次から再指摘しないようにしたい |
| [`ywc-mine-review-history`](#多数の-merged-pr-を一度に見直して繰り返される-review-指摘を見つけたい) | 多数の merged PR を一度に見直して、繰り返される review 指摘を見つけたい |
| [`ywc-ubiquitous-language`](#開発者ドメイン専門家llm-が共有するドメイン用語集を作成または更新したい) | 開発者・ドメイン専門家・LLM が共有するドメイン用語集を作成または更新したい |
| [`ywc-project-mission`](#project-の-mission-と-success-criteria-と-non-goal-を記録したい) | Project の mission、success criteria、non-goal を記録したい |
| [`ywc-adr`](#取り消しにくいアーキテクチャ決定を却下した代替案と一緒に記録したい) | 取り消しにくいアーキテクチャ決定を、却下した代替案と一緒に記録したい |
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

*(Claude Code のみ)* CodeRabbit の「Nitpick comments」(review thread を持たないもの)も検出され、他の comment と同じように分類されます。対応済みの項目は、非表示マーカー付きの PR 全体コメント 1 件に記録され、再表示されません。

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

task README または `docs/ywc-plans/` 配下の plan が見つかると、PR 本文に `Design Background` セクションが追加されます(goal と、plan に記載がある場合は Alternatives Considered / Trade-offs を含みます)。`--plan-doc <path.md>` で plan を明示的に指定できます(リポジトリ内の相対パス)。`--no-plan-ref` で plan の検索を無効化できます。両方指定された場合は `--plan-doc` が優先されます。複数の plan が該当する場合は一覧を表示し、`--plan-doc` を付けて再実行するよう求めます。

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
Socratic 対話で目的/制約/成功基準と代替案 2〜3 個を導き、その後 `ywc-plan` へ handoff します。handoff の前に、設計ドキュメントでは依拠している前提(premise)を根拠(`file:line` と引用した snippet)とともに列挙し、各前提に VERIFIED / UNVERIFIED のステータスを付けます。未検証の前提は、黙って仮定するのではなく failure mode として記録するか、out-of-scope に移します。

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

### 一般 cycle の外で、独立して実装品質と maintenance 観点を点検したい

`ywc-impl-review` 専用ページへ移しました。詳しい使い方と例は [13. コード構造と保守性の管理](./16-code-structure-and-maintainability.md)を参照してください。

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

### 明示的で再実行可能な gate で完了を証明したい

gate の条件を markdown の ledger として書いておくと、完了の判定を同じ手順で何度でも再実行できます。各 gate には次の 3 つを記述します。

- `CHECK:`: 実行する shell コマンド
- `EXPECT:`: 出力に含まれるべき substring、または `/regex/`
- `EVIDENCE:`: 証拠として残す内容

次のコマンドで ledger の判定状況を確認できます。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="python3 claude-code/skills/ywc-verify-done/scripts/gate-check.py --status gate-ledger.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="python3 &quot;${CODEX_HOME:-$HOME/.codex}/skills/ywc-verify-done/scripts/gate-check.py&quot; --status gate-ledger.md" />
  </ToolTabsPanel>
</ToolTabs>

`--status` を省略すると gate を実行します。`--reverify` を付けると、キャッシュを使わずにすべての gate を再実行します。

- 終了コードが 0 なら、実行可能なすべての gate が満たされています。
- `CHECK` も `EXPECT` もない gate は manual 扱いで、判定をブロックしません。
- 過去の PASS は、gate の本文が変わっていない場合にのみ信頼されます。
- 各 gate は 120 秒でタイムアウトします。
- `CHECK` の行は、あなたの権限で任意のコマンドを実行します。自分で書いたものでない ledger は、先に内容を読んでから実行してください。

ledger は任意です。従来の単一コマンドによる検証(lint / typecheck / test / build)は、そのまま使えます。どちらのツールでも利用できます。

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

### 多数の merged PR を一度に見直して繰り返される review 指摘を見つけたい

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-mine-review-history --limit 50 --min-recurrence 3" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-mine-review-history --limit 50 --min-recurrence 3" />
  </ToolTabsPanel>
</ToolTabs>
マージ済みの PR を N 件まとめて対象に、CodeRabbit / Codex Review / Claude Review などの bot review comment を収集します。各指摘は accepted / dismissed に分類し、欠陥クラスにまとめます。少なくとも `--min-recurrence`(既定は 3)件の異なる PR で繰り返し現れたクラスだけを `ywc-review-learnings` へ提案します。`--limit` と `--since` のうち少なくとも一方が必須です(すべての PR を無条件に走査することはありません)。`docs/review-learnings.md` を直接書き換えることはなく、昇格は `ywc-review-learnings` の確認ステップを経ます。開いている PR 1 件だけを対象にする場合は [`ywc-handle-pr-reviews`](#開いている-pr-の-review-comment-に対応しciconflict-も一緒に整理したい) を使ってください。

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

### Project の mission と success criteria と non-goal を記録したい

`ywc-project-mission` *(Claude Code のみ)*

<CodeBlock label="claude code" code="ywc-project-mission この project の目標は ..." />
[07. 新しい Project を始める](./07-starting-a-new-project.md)ですでに扱いました。project の方向が変わったときも、`ywc-project-mission` で mission を更新できます。Codex には対応する skill がありません。

### 取り消しにくいアーキテクチャ決定を却下した代替案と一緒に記録したい

`ywc-adr` *(Claude Code のみ)*

<CodeBlock label="claude code" code="ywc-adr --mode new 認証基盤は自前実装ではなく既存の IdP を採用する。自前で保守する運用コストを避けたいため" />
`docs/adr/NNNN-<slug>.md` に Context / Decision / Alternatives Considered / Consequences の構成で記録します。モードは new / read / list / curate です。記録するのは、取り消しにくく、文脈を知らないと意外に映り、実際のトレードオフを伴う決定だけにしてください。古い ADR は直接編集せず、置き換える場合は `--supersedes ADR-NNNN` を使います。

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

- Codex の `ywc-setup` は、作業者のイニシャル(`--initials yk`)も保存します。`--scope project|user` で保存先を選べます(project は `.codex/ywc.json`、user は `~/.codex/ywc.json`)。
- Claude Code の `ywc-setup-language` は言語のみを扱い、`CLAUDE.md` に `## Language Policy` セクションを書き込みます。Claude Code のイニシャルは `--initials` または `CLAUDE.md` の `## Task Initials` セクションから取得されます([05](./05-general-cycle-medium-large.md) を参照)。

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

## ツール固有の Skill

ほとんどの Skill は Claude Code と Codex の両方で使えますが、一部はどちらか一方のツールでのみ提供されます。以下はそのツール固有の Skill の一覧です。

| ツール | Skill | 内容 |
|---|---|---|
| Codex | `ywc-wayfinder` | 大きい、または不確かな変更のための複数セッションの discovery。active な ticket を 1 つだけ持つローカルの map を作り、計画や実装の前に使います |
| Codex | `ywc-architecture-invariants` | 任意の repo root にある `architecture-invariants.json` contract を、上限付きで正規化された依存エッジの根拠に照らして検証します |
| Codex | `ywc-implement` | 承認済みの spec または ticket を 1 つだけ、レビューゲート付きの焦点を絞った変更として実装します |
| Codex | `ywc-team-assemble` | 明示的に依頼されたときに専門 team を組み、subagent へ委任します |
| Codex | `ywc-setup` | 出力言語や 作業者のイニシャルの永続デフォルトを設定します(Claude Code の `ywc-setup-language` に相当) |
| Claude Code | `ywc-adr` | 取り消しにくい決定を、却下した代替案と一緒に記録します。[こちら](#取り消しにくいアーキテクチャ決定を却下した代替案と一緒に記録したい) |
| Claude Code | `ywc-project-mission` | Project の mission、success criteria、non-goal を記録します。[こちら](#project-の-mission-と-success-criteria-と-non-goal-を記録したい) |
| Claude Code | `ywc-setup-language` | 出力言語を永続化し、毎回 `--lang` を渡さなくて済むようにします。[こちら](#出力言語の永続デフォルトを設定し毎回-language-を聞かれないようにしたい) |

## 全 Skill 索引 (A-Z)

この toolkit のすべての `ywc-*` skill を名前順に整理しました。詳しい使い方は各 skill の場所(専用ページまたは上の状況別項目)を参照してください。

| Skill | 説明 | 場所 |
|---|---|---|
| `ywc-adr` | 取り消しにくいアーキテクチャ決定を、却下した代替案と一緒に記録したい *(Claude Code のみ)* | [こちら](#取り消しにくいアーキテクチャ決定を却下した代替案と一緒に記録したい) |
| `ywc-agentic` | 目標だけ渡し、計画から実装まで人の介入なしで任せたい | [こちら](#目標だけ渡し計画から実装まで人の介入なしで任せたい) |
| `ywc-architecture-invariants` | 任意の `architecture-invariants.json` contract を、依存エッジの根拠に照らして検証する *(Codex のみ)* | [こちら](#ツール固有の-skill) |
| `ywc-auth-implement` | コードを書く前に認証ポリシーを確定させたうえで認証機能を実装したい | [15](./18-authentication-implementation.md) |
| `ywc-brainstorm` | アイデアがまだ具体的でないので、整理から始めたい | [こちら](#アイデアがまだ具体的でないので整理から始めたい) |
| `ywc-changelog-release-notes` | CHANGELOG.md やユーザー向け release note を作成したい | [こちら](#changelogmd-やユーザー向け-release-note-を作成したい) |
| `ywc-code-gen` | Backend/Frontend/QA の 3 layer を並列に同時生成する多層 code 生成 skill | [16](./13-executor-and-codegen-patterns.md) |
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
| `ywc-iac-author` | 完成した設計を実際の Infrastructure-as-Code にしたい | [14](./17-infrastructure-and-cloud.md) |
| `ywc-impl-review` | 一般 cycle の外で、独立して実装品質と maintenance 観点を点検したい | [13](./16-code-structure-and-maintainability.md) |
| `ywc-implement` | 承認済みの spec または ticket を、レビューゲート付きで 1 つだけ実装する *(Codex のみ)* | [こちら](#ツール固有の-skill) |
| `ywc-incident-postmortem` | Production 障害が起き、振り返り文書を書く必要がある | [12](./12-debugging-and-incident-postmortem.md) |
| `ywc-infra-design` | IaC を書く前にクラウドアーキテクチャを設計したい | [14](./17-infrastructure-and-cloud.md) |
| `ywc-infra-optimize` | すでに稼働中のインフラを改善したい | [14](./17-infrastructure-and-cloud.md) |
| `ywc-infra-review` | apply する前に misconfiguration/コスト/信頼性の問題を見つけたい | [14](./17-infrastructure-and-cloud.md) |
| `ywc-merge-dependabot` | 溜まっている Dependabot PR を一度に整理したい | [こちら](#溜まっている-dependabot-pr-を一度に整理したい) |
| `ywc-mine-review-history` | 多数の merged PR を横断して、繰り返される review 指摘を見つけたい | [こちら](#多数の-merged-pr-を一度に見直して繰り返される-review-指摘を見つけたい) |
| `ywc-onboard-repo` | 未知の repo の慣習を逆算して CLAUDE.md を生成する onboarding skill | [08](./08-onboarding-existing-repo.md) |
| `ywc-parallel-executor` | 複数の Task を隔離された worktree で並列実行する executor | [16](./13-executor-and-codegen-patterns.md) |
| `ywc-plan` | 機能/変更の実装計画を立てる入口 skill | [04](./04-general-cycle-small.md) |
| `ywc-product-review` | コードではなくビジネス/サービスの観点でプロジェクトをレビューしてほしい | [こちら](#コードではなくビジネスサービスの観点でプロジェクトをレビューしてほしい) |
| `ywc-project-docs` | docs/ ディレクトリ構造に沿って project 文書を生成する skill | [07](./07-starting-a-new-project.md) |
| `ywc-project-mission` | Project の mission、success criteria、non-goal を記録したい *(Claude Code のみ)* | [こちら](#project-の-mission-と-success-criteria-と-non-goal-を記録したい) |
| `ywc-project-scaffold` | 完全に新しい project のディレクトリ構造を設計する skill | [07](./07-starting-a-new-project.md) |
| `ywc-receive-review` | レビュアー(人間または CodeRabbit/Codex/Claude)の指摘を無条件に受け入れず、技術的に検証してから対応したい | [こちら](#レビュアー人間または-coderabbitcodexclaudeの指摘を無条件に受け入れず技術的に検証してから対応したい) |
| `ywc-refactor-clean` | 古い dead code (未使用関数/export/依存関係)を整理したい | [13](./16-code-structure-and-maintainability.md) |
| `ywc-release-pr-list` | Release PR (develop→main など)に含まれる merged PR 一覧を整理したい | [こちら](#release-pr-developmain-などに含まれる-merged-pr-一覧を整理したい) |
| `ywc-review-learnings` | Code review で繰り返し指摘される内容を学習させ、次から再指摘しないようにしたい | [こちら](#code-review-で繰り返し指摘される内容を学習させ次から再指摘しないようにしたい) |
| `ywc-security-audit` | 認証/決済のような敏感なコードのセキュリティ脆弱性を点検したい | [こちら](#認証決済のような敏感なコードのセキュリティ脆弱性を点検したい) |
| `ywc-sequential-executor` | 複数の Task を順番に 1 つずつ実行する executor | [16](./13-executor-and-codegen-patterns.md) |
| `ywc-setup` | 出力言語の永続デフォルトを設定し毎回 language を聞かれないようにしたい *(Codex のみ)* | [こちら](#出力言語の永続デフォルトを設定し毎回-language-を聞かれないようにしたい) |
| `ywc-setup-language` | 出力言語を永続化し、毎回 `--lang` を渡さなくて済むようにする *(Claude Code のみ)* | [こちら](#出力言語の永続デフォルトを設定し毎回-language-を聞かれないようにしたい) |
| `ywc-skill-author` | 新しい ywc-* skill を作りたい、または既存の skill をルールに沿って整理/点検したい | [こちら](#新しい-ywc--skill-を作りたいまたは既存の-skill-をルールに沿って整理点検したい) |
| `ywc-spec-ready` | spec 文書が実装可能なレベルまで準備できているか検証する gate | [05](./05-general-cycle-medium-large.md) |
| `ywc-spec-validate` | spec 文書内の矛盾・欠落を点検する検証 skill | [05](./05-general-cycle-medium-large.md) |
| `ywc-spec-writer` | PRD/spec 文書を作成する skill | [07](./07-starting-a-new-project.md) |
| `ywc-task-generator` | spec を実行可能な Task 単位に分解する skill | [05](./05-general-cycle-medium-large.md) |
| `ywc-tdd-ritual` | RED → GREEN → REFACTOR を文書化された手順どおり厳格に守りながら実装したい | [こちら](#red--green--refactor-を文書化された手順どおり厳格に守りながら実装したい) |
| `ywc-team-assemble` | 明示的に依頼されたときに専門 team を組み、subagent へ委任する *(Codex のみ)* | [こちら](#ツール固有の-skill) |
| `ywc-tech-research` | ライブラリや実装方式を比較して何を使うか決めたい | [こちら](#ライブラリや実装方式を比較して何を使うか決めたい) |
| `ywc-ubiquitous-language` | 開発者・ドメイン専門家・LLM が共有するドメイン用語集を作成または更新したい | [こちら](#開発者ドメイン専門家llm-が共有するドメイン用語集を作成または更新したい) |
| `ywc-ui-ux-review` | 画面の usability とアクセシビリティを点検する skill | [11](./11-design-review.md) |
| `ywc-verify-done` | lint/typecheck/test/build を実行して完了を機械的に検証する skill | [こちら](#明示的で再実行可能な-gate-で完了を証明したい) |
| `ywc-wayfinder` | 大きい、または不確かな変更のための複数セッションの discovery *(Codex のみ)* | [こちら](#ツール固有の-skill) |
| `ywc-worktrees` | 隔離された worktree のパスを作りたい、または点検/整理したい | [こちら](#隔離された-worktree-のパスを作りたいまたは点検整理したい) |

---

[← 前: 16. Executor / Code-gen Prompt パターン](./13-executor-and-codegen-patterns.md) · [次: 18. 事前準備とインストール →](./15-prerequisites-installation.md)
