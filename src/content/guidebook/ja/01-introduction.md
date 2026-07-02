[« 目次に戻る](./README.md)

# 01. 概要

## この Guidebook が扱うこと

この repository には、`tools/claude-code/skills/` 配下に `ywc-*` 接頭辞を持つ 30 個以上の Skill と、`tools/claude-code/agents/` 配下にいくつかの専用 Agent が定義されています。これらは「アイデア → Spec → Task 分解 → 実装 → コードレビュー → PR → Merge」へ続く開発 Lifecycle 全体を、Claude Code 上で構造化された手順として実行するためのツール群です。

この Guidebook は、それらのツールを**初めて使う人**が「今の状況ではどの Skill を、どの順序で、どんな prompt で実行すべきか」をすぐに見つけられるように整理した実践ガイドです。Skill の内部実装原理(Rationalization Defense, Advisor Pattern など)は深く説明せず、**ユーザーが入力する command とその結果**に焦点を当てます。内部動作が気になる場合は、各 Skill の `SKILL.md` を直接参照してください。

## 誰のための文書か

- この project で初めて `ywc-*` Skill を使う開発者
- Skill は何度か使ったことがあるが、毎回どの順序で組み合わせるべきか迷う開発者
- `ywc-sequential-executor`, `ywc-parallel-executor`, `ywc-code-gen` のようにオプションが多い Skill の正確な syntax が必要な開発者

## 始める前に確認すること

| 項目 | 確認方法 |
|---|---|
| Claude Code がこの repository を認識しているか | 会話欄で `/` を入力したとき、`ywc-*` Skill 一覧が自動補完に表示されるか確認 |
| `gh` CLI が認証済みか | `gh auth status` — PR 作成/merge を扱う多くの Skill が必要とする |
| project に `CLAUDE.md` があるか | なければ [08. 既存 Repo に初めて入る](./08-onboarding-existing-repo.md) を参照 — Skill は言語・commit convention をここから推論する |
| 作業対象が新規 project か、既存コード変更か | 新規なら [07. 新しい Project を始める](./07-starting-a-new-project.md)、既存変更なら [02. 核心概念](./02-core-concepts.md) から |

## Skill 呼び出し文法

この Guidebook のすべての例は、Claude Code の会話欄に以下の形でそのまま入力することを前提にしています。

```
ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움
```

先頭に `/` を付けた `/ywc-plan` 形式でも同じように動作します。この文書では可読性のため `/` を省略します。`--flag value` 形式のオプションは Skill ごとに異なり、各 Skill ページまたは [12. Executor / Code-gen Prompt パターン](./12-executor-and-codegen-patterns.md)に実例として整理しています。

---

[次: 02. 核心概念 →](./02-core-concepts.md)
