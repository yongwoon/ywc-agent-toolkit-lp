[« 目次に戻る](./README.md)

# 08. Skill 組み合わせレシピ

他のページはフロー 1 つ、または Skill 1 つずつを説明しています。このページでは、Skill 同士がどうつながるか — ある Skill が何を残し、それをどの Skill が引き継ぐか — を示します。以下のつながりはすべて Skill 自身が行う動作(共有ファイルの読み込み、次の Skill への hand-off の提案)であり、ユーザーが覚えておくべき慣習ではありません。

| やりたいこと | レシピ |
|---|---|
| 同じ review 指摘が繰り返されないようにしたい | [Review 学習ループ](#review-学習ループ) |
| 直したバグを長く残る教訓にしたい | [バグ修正から再発防止まで](#バグ修正から再発防止まで) |
| PR の前後でどの gate がいつ動くか知りたい | [PR 前後の gate](#pr-前後の-gate) |
| 元に戻しにくい決定の理由を残したい | [計画しながら決定を記録する](#計画しながら決定を記録する) |
| 範囲がまだ不確かな大きな変更を始めたい | [計画前の探索](#計画前の探索) |
| Task を衝突なく並列で実行したい | [並列実行環境](#並列実行環境) |
| Release を準備したい | [Release 準備](#release-準備) |

## Review 学習ループ

`docs/review-learnings.md` は project の review の記憶です。このファイルは `ywc-review-learnings` が管理し、他の Skill はこのファイルを読んだり、内容を追加したりします。

1. **受け取る** — comment に対応する前に、`ywc-receive-review` がその指摘が技術的に正しいかを確認します。レビュアーに求められたというだけで誤った修正を実装することを防ぎます。
2. **対応する** — `ywc-handle-pr-reviews` が thread ごとに修正または返信し、PR を merge 可能な状態(CI green、base との conflict なし)にします。
3. **記録する** — 残す価値のある教訓は、`ywc-review-learnings` を通じて `docs/review-learnings.md` に記録します。`--source pr --pr <番号>` を指定すると、PR 1 件の bot review comment を整理します。新しい項目はすべて changeset として提示され、ユーザーが確認した後にのみ書き込まれます。
4. **遡って収集する** — 過去の PR については、`ywc-mine-review-history` が merge 済みの PR を複数まとめて走査し、繰り返し現れる欠陥クラスを `ywc-review-learnings` に提案します。
5. **再利用する** — `ywc-impl-review` は review を始めるたびに学習内容を読み込みます(`--skip-learnings` で省略可能)。そのため、既知の false positive は再び指摘されず、既知の `DO-NOT` はより早く検出されます。Review の後には、繰り返し現れる finding を記録するか提案します。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
</ToolTabs>

このループは両方のツールで動作します。1 周するたびに次の review は静かになります。チームがすでに却下した指摘は再び出てこなくなり、チームが同意した指摘は PR を開く前に検出されます。

## バグ修正から再発防止まで

1. `ywc-debug-rootcause` が根本原因を見つけて regression test を追加し、`ywc-verify-done` で修正を gate します([15](./12-debugging-and-incident-postmortem.md))。
2. 同じ種類の欠陥が他の場所でも起こりうる場合は、それを review 学習として記録するか提案します(`ywc-review-learnings --mode update --source debug`)。
3. Production 障害の後には、`ywc-incident-postmortem` が報告書を作成し、再発防止の action item を同じ方法で提案します(`--source incident`)。
4. 以降は `ywc-impl-review` がその学習内容を読み込むため、同じ種類の欠陥が Production ではなく review の段階で検出されます。

ステップ 2 と 3 は Claude Code のみです。Codex では 2 つの Skill が `ywc-review-learnings` へ hand-off しないため、残す価値のある教訓があれば `ywc-review-learnings` で自分で記録してください(既定の `feedback` source)。

## PR 前後の gate

| タイミング | Skill | 確認する内容 |
|---|---|---|
| 実装前 | `ywc-confidence-gate` | 準備状況を 5 つの次元で採点します: PROCEED(90 以上)、REVIEW(70-89)、STOP(70 未満)。90 未満の場合、最も弱い次元が引き上げられるか、ユーザーがリスクを受け入れるまで実装は待機します |
| 実装後 | `ywc-impl-review` | Spec に対する 5 観点の review([14](./16-code-structure-and-maintainability.md)) |
| 変更がセキュリティに関わるとき | `ywc-security-audit` | 静的セキュリティ review(OWASP Top 10、secret、threat model) |
| 「完了」と言う前 | `ywc-verify-done` | すべての完了主張に対する新しい証拠(test または build の出力) |
| PR を開くとき | `ywc-create-pr` | Commit、push、そして task や plan をもとにした PR 本文 |
| レビュアーの返答後 | `ywc-handle-pr-reviews` | 上のループと同様に comment、CI、conflict |
| Merge するとき | `ywc-finish-branch` | CI と bot review の待機、merge、merge 後の確認、branch の整理 |

`ywc-verify-done` を直接呼び出すことはあまりありません。`ywc-code-gen` と 2 つの executor がそれぞれの完了ステップで呼び出すためです。手動で作業を完了したときは、自分で呼び出してください。

## 計画しながら決定を記録する

このレシピは Claude Code のみです。

- `ywc-plan` は計画を立てる前に、`docs/adr/` と `docs/project-mission.md` があれば読み込みます。計画がすでに決まった決定と黙って矛盾することはなく、衝突があればユーザーに提示されます。
- 計画内の architecture 決定が元に戻しにくく、文脈を知らない後の読み手を驚かせうるもので、かつ実際の trade-off がある場合、`ywc-plan` は `ywc-adr` を通じて ADR として保存するかを一度だけ提案します。計画が長く続く新しい success criterion を確定した場合は、`docs/project-mission.md` に追加するかを提案します。
- 決定がライブラリや実装方式の比較である場合は、まず `ywc-tech-research` を実行し、その結果をもとに計画してください。

<CodeBlock label="claude code" code="ywc-tech-research &quot;Hono SSE 実装&quot; --compare &quot;Redis,Valkey&quot;" />

Codex には `ywc-adr` も `ywc-project-mission` もないため、決定の理由は plan や spec 文書に残してください。

## 計画前の探索

このレシピは Codex のみです。

1. `ywc-wayfinder` は `docs/ywc-plans/<slug>-wayfinder.md` に local map を置き、複数の session にわたって引き継ぎます。Map は多くの ticket を保持できますが、active なものは常に 1 つだけで、この Skill 自身が何かを実装することはありません。
2. Ticket の進め方が明確になると、`ywc-plan` へ hand-off します(ticket が技術比較で止まっている場合は `ywc-tech-research` へ)。
3. そこからは通常のフローが続きます: `ywc-spec-ready` → `ywc-task-generator` → executor([06](./05-general-cycle-medium-large.md))。承認済みの spec や ticket を 1 つ実装するだけでよい場合は、`ywc-implement` が範囲を絞った、review gate 付きの変更 1 つとして処理します。

<CodeBlock label="codex" code="ywc-wayfinder 課金機能を monolith から独立した service に分離したい。まだ範囲が不明確" />

規模が大きい作業、不確実な作業、または複数の session にまたがる作業にのみ使ってください。通常の計画は `ywc-plan`、アイデアの整理は `ywc-brainstorm` の役割です。

## 並列実行環境

`ywc-parallel-executor` は task ごとの worktree を `ywc-worktrees` で作成します。Docker project では、`ywc-docker-isolate` によって worktree ごとに専用の host port ブロックを割り当て、stack 同士が衝突しないようにします("port is already allocated")。Merge の後は、`ywc-finish-branch` が `ywc-worktrees --mode prune` で worktree を削除します。

通常、これらを自分で呼び出す必要はありません。両方のツールで executor がこれらを駆動します。Executor の実行とは別に worktree を作成または整理するには、[19](./14-skill-reference.md) の command を使ってください。

## Release 準備

1. まず保留中の依存関係の更新を片付けます: `ywc-merge-dependabot security parallel-auto`。
2. Release PR(例: `develop` → `main`)を開き、`ywc-release-pr-list <release PR 番号>` でその説明文を作成します。merge 済みの PR が作成者ごとにまとめられます。
3. `ywc-changelog-release-notes` で `CHANGELOG.md` とユーザー向けの release note を作成します。ステップ 2 の結果ファイルを `--pr-list` で渡すと、git log の代わりにその一覧を使います。

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>

---

[← 前へ: 07. 目標 1 つで自動完了する (ywc-agentic)](./06-agentic-autonomous-loop.md) · [次へ: 09. 新しい Project を始める →](./07-starting-a-new-project.md)
