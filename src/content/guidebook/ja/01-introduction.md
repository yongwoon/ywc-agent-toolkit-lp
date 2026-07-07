[« 目次に戻る](./README.md)

# 01. 概要

## この Guidebook が扱うこと

この repository には、`claude-code/skills/` 配下に `ywc-*` 接頭辞を持つ 30 個以上の Skill と、`claude-code/agents/` 配下にいくつかの専用 Agent が定義されています。これらは「アイデア → Spec → Task 分解 → 実装 → コードレビュー → PR → Merge」へ続く開発 Lifecycle 全体を、Claude Code 上で構造化された手順として実行するためのツール群です。

この Guidebook は、それらのツールを**初めて使う人**が「今の状況ではどの Skill を、どの順序で、どんな prompt で実行すべきか」をすぐに見つけられるように整理した実践ガイドです。Skill の内部実装原理(Rationalization Defense, Advisor Pattern など)は深く説明せず、**ユーザーが入力する command とその結果**に焦点を当てます。内部動作が気になる場合は、各 Skill の `SKILL.md` を直接参照してください。

各 Skill の詳しいオプション、前提条件、内部処理の流れは、元 repository の Skill フォルダに整理されています。Claude Code 用 Skill は [`claude-code/skills`](https://github.com/yongwoon/ywc-agent-toolkit/tree/main/claude-code/skills)、Codex 用 Skill は [`codex/skills`](https://github.com/yongwoon/ywc-agent-toolkit/tree/main/codex/skills) を参照してください。この Guidebook ではよく使う実行フローを素早く確認し、詳細なリファレンスが必要なときに該当する `SKILL.md` を開く、という使い分けを想定しています。

## 誰のための文書か

- この project で初めて `ywc-*` Skill を使う開発者
- Skill は何度か使ったことがあるが、毎回どの順序で組み合わせるべきか迷う開発者
- `ywc-sequential-executor`, `ywc-parallel-executor`, `ywc-code-gen` のようにオプションが多い Skill の正確な syntax が必要な開発者

## 前提条件と推奨セットアップ

Plugin marketplace または Codex plugin からインストールする場合、追加の前提条件はありません。必要なファイルコピーと登録はインストーラが自動で処理します。

ただし Skill を実際に実行するときは `git`、`gh`、`python3` などいくつかの Tool が System に必要で、デザイン関連 Skill を使うなら別途セットアップしておくと安定します。必須 Tool と選択 Tool の一覧、インストール方法は [15. 事前準備とインストール](./15-prerequisites-installation.md) にまとめました — 始める前に一度目を通しておくことをおすすめします。

## 始める前に確認すること

| 項目 | 確認方法 |
|---|---|
| Claude Code がこの repository を認識しているか | 会話欄で `/` を入力したとき、`ywc-*` Skill 一覧が自動補完に表示されるか確認 |
| `gh` CLI が認証済みか | `gh auth status` — PR 作成/merge を扱う多くの Skill が必要とする |
| project に `CLAUDE.md` があるか | なければ [08. 既存 Repo に初めて入る](./08-onboarding-existing-repo.md) を参照 — Skill は言語・commit convention をここから推論する |
| 作業対象が新規 project か、既存コード変更か | 新規なら [07. 新しい Project を始める](./07-starting-a-new-project.md)、既存変更なら [02. 核心概念](./02-core-concepts.md) から |

## Skill 呼び出し文法

この Guidebook のすべての例は、Claude Code の会話欄に以下の形でそのまま入力することを前提にしています。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan ログイン失敗時のエラーメッセージが一般的すぎて原因を把握しにくい" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan ログイン失敗時のエラーメッセージが一般的すぎて原因を把握しにくい" />
  </ToolTabsPanel>
</ToolTabs>

先頭に `/` を付けた `/ywc-plan` 形式でも同じように動作します。この文書では可読性のため `/` を省略します。`--flag value` 形式のオプションは Skill ごとに異なり、各 Skill ページまたは [13. Executor / Code-gen Prompt パターン](./13-executor-and-codegen-patterns.md)に実例として整理しています。

---

[次: 02. 核心概念 →](./02-core-concepts.md)
