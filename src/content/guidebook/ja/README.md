# ywc Skill & Agent Guidebook

> この Guidebook は、`ywc-*` Skill と Agent に初めて触れるユーザー向けに再構成した利用ガイドです。各ページは独立した Web ドキュメントページに変換されることを想定して書かれており、以下の目次がそのままサイトの sidebar 構造に対応します。

## この Guidebook の読み方

- 初めて使う場合は **はじめに** の順序(01 → 02 → 03)に沿って進めてください。
- 基本概念をすでに理解していて特定の作業だけを探している場合は、**ワークフローガイド**から状況に合うページへ直接移動してください。
- オプションが多く毎回 syntax を確認したくなる skill は、**リファレンス**に command 例を中心に整理しています。

## 何をしたいですか? (目的別ショートカット)

"どんな Skill があるか" ではなく、**今やりたいこと**を基準に探せるように整理しています。以下から状況を見つけて直接移動してください。

| やりたいこと | 最初に使う Skill | ガイド |
|---|---|---|
| バグを直す、または小さな機能を 1 つ追加したい | `ywc-plan` | [03](./03-quickstart.md), [04](./04-general-cycle-small.md) |
| 複数の Task に分割すべき大きな機能を作りたい | `ywc-plan` → `ywc-task-generator` | [05](./05-general-cycle-medium-large.md) |
| 目標だけ渡して、計画から実装まで自動で完了させたい | `ywc-agentic` | [06](./06-agentic-autonomous-loop.md) |
| 完全に新しい project を最初から設計したい | `ywc-project-scaffold` | [07](./07-starting-a-new-project.md) |
| 初めて見る未知の repo/codebase を把握したい | `ywc-onboard-repo` | [08](./08-onboarding-existing-repo.md) |
| すでに分解された Task を実行したい (順次/並列) | `ywc-sequential-executor` / `ywc-parallel-executor` | [13](./13-executor-and-codegen-patterns.md) |
| アイデアがまだ具体的でなく、整理から始めたい | `ywc-brainstorm` | [14](./14-skill-reference.md) |
| PR を検証するための手動 test 文書を作りたい | `ywc-gen-testcase` | [09](./09-testing-guide.md) |
| E2E test 自動化を設定/拡張したい | `ywc-e2e-test-strategy` | [10](./10-e2e-test-strategy.md) |
| 画面の usability やアクセシビリティを点検したい | `ywc-ui-ux-review` | [11](./11-design-review.md) |
| 画面デザインが平凡に見えるので改善したい | `ywc-design-renew` | [11](./11-design-review.md) |
| コードにセキュリティ脆弱性がないか点検したい | `ywc-security-audit` | [14](./14-skill-reference.md) |
| バグの根本原因が見つからず困っている | `ywc-debug-rootcause` | [12](./12-debugging-and-incident-postmortem.md) |
| Production 障害が起き、振り返りを書く必要がある | `ywc-incident-postmortem` | [12](./12-debugging-and-incident-postmortem.md) |
| 古い dead code を整理したい | `ywc-refactor-clean` | [14](./14-skill-reference.md) |
| 開いている PR の review comment に対応する必要がある | `ywc-handle-pr-reviews` | [14](./14-skill-reference.md) |
| Dependabot PR が溜まっているので一度に整理したい | `ywc-merge-dependabot` | [14](./14-skill-reference.md) |
| CHANGELOG や release note を書きたい | `ywc-changelog-release-notes` | [14](./14-skill-reference.md) |
| ここまでの作業をそのまま commit したい | `ywc-commit` | [14](./14-skill-reference.md) |

この表にない状況は、[14. 全 Skill リファレンス](./14-skill-reference.md)で全体一覧を確認してください。

## 目次

### Prologue

| ページ | 説明 |
|---|---|
| [01. 概要](./01-introduction.md) | この Skill/Agent エコシステムが何であり、誰のためのもので、どんな問題を解くのか |
| [02. 核心概念](./02-core-concepts.md) | Skill / Agent / Executor / Task の用語整理、呼び出し文法、4 種類の完了状態(`DONE` など) |

### はじめに (Getting Started)

| ページ | 説明 |
|---|---|
| [03. 5 分で最初の機能をデプロイする](./03-quickstart.md) | 小さな機能 1 つを、アイデアから merge まで実際にたどる最初の演習 |

### ワークフローガイド (Workflow Guides)

| ページ | 説明 |
|---|---|
| [04. 小さな変更を処理する (general cycle · small)](./04-general-cycle-small.md) | Task 分解なしで単一 PR に収まる変更の標準フロー |
| [05. 複数の Task に分けて処理する (general cycle · medium/large)](./05-general-cycle-medium-large.md) | Spec 検証と Task 分解が必要な規模の変更フロー |
| [06. 目標 1 つで自動完了する (ywc-agentic)](./06-agentic-autonomous-loop.md) | 04/05 の手動制御の代わりに、目標 1 つで Plan → Execute → Evaluate → Repeat を自動反復するフロー |
| [07. 新しい Project を始める](./07-starting-a-new-project.md) | 白紙の状態から project を設計し、最初の spec を完成させるまで |
| [08. 既存 Repo に初めて入る](./08-onboarding-existing-repo.md) | 未知の codebase の慣習を逆抽出し、CLAUDE.md を作る onboarding フロー |
| [09. Test を作成して実行する](./09-testing-guide.md) | 手動検証 testsheet と自動化 test を一緒に運用する方法 |
| [10. E2E Test 自動化戦略](./10-e2e-test-strategy.md) | Playwright ベースの E2E Suite を設定・拡張・保守する詳細ガイド |
| [11. デザインをレビューして改善する](./11-design-review.md) | Usability 監査と視覚的 De-slop Renewal を区別して適用する方法 |
| [12. デバッグとインシデント事後分析](./12-debugging-and-incident-postmortem.md) | バグの根本原因調査と Production 障害の事後分析を扱う 2 つの Skill を使い分ける方法 |

### リファレンス (Reference)

| ページ | 説明 |
|---|---|
| [13. Executor / Code-gen Prompt パターン](./13-executor-and-codegen-patterns.md) | オプションが多い `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` の実践 command 集 |
| [14. 全 Skill リファレンス](./14-skill-reference.md) | 上記ガイドで扱わなかった残りの Skill を状況別に整理した索引 |

## 原資料

この Guidebook のすべての command syntax とオプションは、各 Skill の `SKILL.md` (`claude-code/skills/<skill-name>/SKILL.md`)を根拠に検証されています。オプションが実際の動作と違うように感じる場合は、その Skill の `SKILL.md` が最新の基準です。この文書は、その内容をユーザー向けに再構成した二次資料です。
