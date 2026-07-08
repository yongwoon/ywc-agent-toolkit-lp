[« 目次に戻る](./README.md)

# 14. クラウドインフラの管理

## いつこの Skill を使うか

4 つの Skill は「設計 → 実装 → レビュー → 改善」という一続きのライフサイクルをカバーしますが、それぞれ答える質問が異なります。今どの段階にいるかで選んでください。

| やりたいこと | 質問 | 使う Skill |
|---|---|---|
| IaC を書く前にクラウドアーキテクチャを設計したい | "provider/network/compute/storage/IAM の構成はどうあるべきか?" | `ywc-infra-design` |
| 完成した設計を実際の Infrastructure-as-Code にしたい | "この Terraform をどう書くか?" | `ywc-iac-author` |
| apply する前に misconfiguration/コスト/信頼性の問題を見つけたい | "この IaC は apply して安全か?" | `ywc-infra-review` |
| すでに稼働中のインフラを改善したい | "この既存インフラは無駄がある、drift している、脆弱ではないか?" | `ywc-infra-optimize` |

## `ywc-infra-design` — クラウドアーキテクチャ設計

要件を集め、provider を決定(または決定を委譲)し、network/compute/storage/IAM のトポロジーを reliability/cost/security の pre-check とともに設計します。IaC 自体は書かず、成果物 `infra-design.md` が次の `ywc-iac-author` の入力契約になります。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
</ToolTabs>

`--provider` はすでに決まっている provider を宣言し、その選定 delegation をスキップします。省略すると provider 調査に委譲されますが、Claude Code では `ywc-tech-research` へのベア参照、Codex では `$ywc-tech-research` invocation 構文になります。`--skip-cloud-consult` は Step 3 の任意 feasibility consult をスキップする flag です — Claude Code では `Task(subagent_type: ywc-cloud-engineer)`、Codex では「read-only モードで `ywc-cloud-engineer` persona を担う Codex worker を任意で dispatch する」という表現になります。同じ意図でも tool ごとに dispatch の語彙が異なります。

## `ywc-iac-author` — Infrastructure-as-Code の作成

`ywc-infra-design` の doc を基に AWS/GCP/Azure/Kubernetes 向けの Terraform module/resource を作成・修正します(K8s/Helm も Terraform の `kubernetes`/`helm` provider 経由のみ — raw manifest や別の IaC tool は使いません)。作成後は `terraform validate`/`plan` で検証し、blast-radius summary を出します。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

2 つの tool では作成の仕方自体が異なります。Claude Code では Step 3 で Terraform module ごとに `Task(subagent_type: ywc-cloud-engineer)` へ fan-out します。Codex では現在のセッション自身が `.tf` ファイルを直接作成し、fan-out dispatch はありません — `ywc-cloud-engineer` は feasibility/reliability/blast-radius 判断のための任意の read-only advisory consult にとどまり、主担当にはなりません。`--skip-review-recommendation` は次の Skill 実行を推奨する締めのメッセージをスキップします。Claude Code ではベアの `ywc-infra-review` 参照、Codex では `$ywc-infra-review` という表現です。

## `ywc-infra-review` — Apply 前の IaC レビュー

security/cost/reliability の 3 つの lens に fan-out し、`apply` する前に AWS/GCP/Azure/K8s Terraform の misconfiguration・least-privilege の欠如・信頼性リスクを見つけます。診断専用で IaC は書き換えません。CRITICAL/HIGH の指摘があれば apply の block を推奨します。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

3-lens の fan-out も tool ごとに dispatch 表現が異なります。Claude Code は security lens に `Task(subagent_type: ywc-security-engineer)`、cost lens に `Task(subagent_type: ywc-performance-engineer)`、reliability lens に review mode の `Task(subagent_type: ywc-cloud-engineer)` を使います。Codex は同じ 3 つの dispatch を「`ywc-security-engineer` persona を担う Codex worker」「`ywc-performance-engineer` persona」「`ywc-cloud-engineer` persona」と表現します。`--skip-optimize-recommendation` は `ywc-infra-optimize` 実行を推奨する締めのメッセージをスキップします — Claude Code ではベア参照、Codex では `$ywc-infra-optimize`(再設計が必要な指摘なら `$ywc-iac-author`)です。

## `ywc-infra-optimize` — コスト・Drift・信頼性の改善

古い codebase に対する `ywc-refactor-clean` の infra 版です。コストの right-sizing、未使用リソースの削除、reserved/spot 移行の検討、drift の検知と是正、そして AWS/GCP/Azure/K8s の信頼性強化を行います。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

2 つの tool の違いが最も大きいのがここです。Claude Code では SAFE 項目を診断し、**そのまま実行もします** — `Task(subagent_type: ywc-performance-engineer)` がコスト/使用率のシグナルを出し、`Task(subagent_type: ywc-cloud-engineer)` が SAFE 項目ごとに最小限の `.tf` 変更を行って `terraform plan` を実行し(`apply` はしません)、1 項目ずつ commit します。CAUTION/DANGER 項目は常に escalate されるだけです。Codex ではこの Skill は明確に planning/classification の surface であり、execution worker ではありません — `.tf` の変更や commit を自分では一切実行しません。SAFE のステップは execution loop ではなく planning loop で、SAFE 項目は「計画された次のアクション」として `$ywc-iac-author` へ routing され、実際の作成は別パスに任せます。`--dry-run` は(両 tool とも)gather と classify のみで終わります。`--skip-verify-done` は最終的な `ywc-verify-done` への引き渡しをスキップします。

## 4 つの Skill が一緒に働く流れ

4 つの Skill は「インフラがまだ存在しない状態」から「インフラが存在し、安全で、時間とともにより安く・より信頼できるようになり続ける状態」へ持っていく 1 本のパイプラインを形成します。

**Step 1: トポロジーを設計する — `ywc-infra-design`**

Terraform を書く前に、provider と network/compute/storage/IAM の形、そして reliability/cost/security の pre-check を決めます。成果物の `infra-design.md` だけが次のステップに必要なすべてです。

**Step 2: IaC を作成する — `ywc-iac-author`**

その設計 doc を、module ごとに `terraform validate`/`plan` で検証しながら実際の Terraform にします。Claude Code では module ごとに `ywc-cloud-engineer` へ fan-out し、Codex では同じセッションが直接作成し、`ywc-cloud-engineer` は任意の advisory consult としてのみ使えます。

**Step 3: Apply する前にレビューする — `ywc-infra-review`**

誰かが `apply` する前に、security/cost/reliability の各 lens でレビューを受けます — それぞれ `ywc-security-engineer`・`ywc-performance-engineer`・`ywc-cloud-engineer` に dispatch されます(この Guidebook の他所で `ywc-impl-review` が使っているのと同じ lens 拡張 agent を、アプリケーションコードではなくインフラに対して適用したものです)。CRITICAL/HIGH の指摘があれば、修正されるまで apply は block されます。

**Step 4: 時間が経っても無駄なく保つ — `ywc-infra-optimize`**

インフラが稼働し始めたら、この Skill が継続的なメンテナンスパスになります。コストの right-sizing、drift の検知、信頼性強化を、ここでも `ywc-cloud-engineer` と `ywc-performance-engineer` のシグナルと実行力を借りながら行います。再作成が必要な指摘は `ywc-iac-author` へ、システムの形そのものを見直す必要がある指摘は `ywc-infra-design` まで遡って戻ります。

---

[← 前: 13. コード構造と保守性の管理](./16-code-structure-and-maintainability.md) · [次: 15. Executor / Code-gen Prompt パターン →](./13-executor-and-codegen-patterns.md)
