[« 目次に戻る](./README.md)

# 15. 認証機能の実装

## いつこの Skill を使うか

`ywc-auth-implement` は、サインイン/サインアップ、OAuth、MFA、セッション管理、パスワードリセット、アカウント削除、同意フローなど、新しい認証機能をプロジェクトに追加したいとき、コードを書き始める前にポリシー判断を明示的に確定させたい場合に使います。ただし「認証に関わること全般」をカバーするわけではありません。

- 認証コードがすでに存在していて、それに対するセキュリティレビューをしたいだけなら [`ywc-security-audit`](./14-skill-reference.md) を使ってください — この Skill は実装を駆動するものであり、事後レビューではありません。
- 認証と無関係な一般的な機能計画には [`ywc-plan`](./14-skill-reference.md) を使ってください — このポリシーインタビューは認証に特化しており、一般的な計画作業の代わりにはなりません。
- 認証フロー以外の E2E テストを書くには [11. E2E テスト自動化戦略](./10-e2e-test-strategy.md) を使ってください — この Skill が駆動するのは後述の認証フロー限定の E2E ゲートのみで、プロジェクト全体のテストスイートは対象外です。

## フローの流れ

**Preflight gate。** 質問を始める前に、5 つの冪等なチェックを実行します: 既存の `feature/<auth-slug>` ブランチがあれば再利用し(新規ブランチを切るのは long-lived ブランチから始める場合のみ)、`.env.example` には不足しているプレースホルダーだけを追加して既存の値は上書き・露出させず、フレームワーク/データベースの根拠が不十分なら先に `ywc-tech-research` へルーティングし、既存の認証を検知した場合は `new`/`extend`/`migrate` のいずれかを選ぶまで `NEEDS_CONTEXT` として停止し、ToS/プライバシーポリシーのドラフトには最初の行から「法的レビュー待ちのドラフト」というラベルを付けます。

**9 カテゴリのポリシーインタビュー。** 1 回の集中したラウンドで、サインイン方式と OAuth provider の準備状況、MFA の登録とリカバリー、セッションの保存/TTL/ローテーション/失効/デバイス管理、パスワードリセットとハッシュ化ライブラリの境界、プロフィール項目、アカウント削除と再認証、簡易 RBAC(role・デフォルト・claims)、同意のバージョニング/収集/撤回、そして不正利用対策(レート制限・検証・リカバリー制御)を扱います。各回答は「承認」「明示的にリスクを認めた上で保留」「非該当」のいずれかとして記録されます。

**動的なレコメンデーション。** スタックの根拠と承認済みのポリシー回答から、実績のあるライブラリやマネージドサービスを推奨します — 固定の「サポート済みスタック」リストは使いません。根拠が薄い場合は `ywc-tech-research` によるリアルタイム調査にフォールバックします。

**実装の dispatch。** この Skill はオーケストレーションのみを行い、認証コード自体は書きません。それぞれ `ywc-tdd-ritual`(RED → RED 確認 → GREEN → GREEN 確認 → REFACTOR → GREEN 確認)に従う 3 つの agent へ dispatch します: 承認されたバックエンドポリシーを担う `ywc-backend-coder`(パスワードハッシュ化・トークン署名・秘密情報の暗号化を自前実装しません)、サインイン/サインアップフォーム・MFA 登録 UI・セッション対応ルーティングを担う `ywc-frontend-coder`、ToS/プライバシーポリシーのドラフトを担う `ywc-doc-writer` です。

**ゲート。** dispatch された作業が反映されたら、その diff に対して `ywc-security-audit` を実行します。Critical/High が 0 件なら、承認済みのフロー(メール/パスワードを選んだ場合のみサインアップ/サインイン/リセット、有効な場合のみアカウント削除、設定した OAuth provider ごとに 1 フロー、承認されていれば MFA)だけを対象にした `ywc-e2e-test-strategy` によるポリシー条件付きの E2E に進みます。Critical/High が 1 件でもあれば `DONE_WITH_CONCERNS` を返し、是正されるまで E2E と PR 作成をスキップします。両方のゲートを通過して初めて、この Skill は `ywc-create-pr` を提案します — 自動実行はしません。

## `ywc-auth-implement`

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-auth-implement" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-auth-implement" />
  </ToolTabsPanel>
</ToolTabs>

flag なしで実行します — インタビューとそれ以降のあらゆる判断は preflight gate からすべて対話的に進むため、事前に渡す「scope」や「flow」といった引数はありません。

## Claude Code と Codex の違い

インタビュー内容、固定スタックを使わないレコメンデーションのルール、`new`/`extend`/`migrate` の hard stop、そしてセキュリティ/E2E ゲートは両方の tool で同一です。異なるのは dispatch の仕組みです。Claude Code は `Task(subagent_type: ...)` を使って `ywc-backend-coder`・`ywc-frontend-coder`・`ywc-doc-writer` へ直接 fan-out します。Codex は現在のセッション内でオーケストレーションを続け、代わりに(自動実行はせず)`$ywc-plan → $ywc-spec-ready → $ywc-task-generator → $ywc-code-gen --tdd --review` という skill-chain のルートを提示します — アプリケーション実装とそのセキュリティレビューは `$ywc-code-gen` が担います。ドキュメントのみの委譲であれば、Codex は named-agent の fan-out ではなく、1 つの境界が明確な general subagent を使います。

---

[« 前: 14. クラウドインフラの管理](./17-infrastructure-and-cloud.md) · [次: 16. Executor / Code-gen Prompt パターン →](./13-executor-and-codegen-patterns.md)
