[« 目次に戻る](./README.md)

# 14. Executor / Code-gen Prompt パターン

`ywc-sequential-executor`, `ywc-parallel-executor`, `ywc-code-gen` はオプションが多く、毎回正確な syntax を探しがちな 3 つの Skill です。このページでは Skill 名ではなく、**「今やりたいこと」**を基準に例を整理しました。やりたいことを見つけて、そのままコピーして使ってください。

## 共通概念: 複数 Task を 1 つの PR にまとめる (`--aggregate-pr`, `--group-name`)

`--aggregate-pr` と `--group-name` は、`ywc-sequential-executor` と `ywc-parallel-executor` **どちらでも同じ概念**として動作します。ここで一度理解すれば、下の 2 つの Skill セクションの例をすべて応用できます。

**`--aggregate-pr` がないとき (デフォルト動作)**: Task ごとにそれぞれ feature branch と PR が作られます。Task 5 個を処理すると PR も 5 個です。

**`--aggregate-pr` があるとき**: すべての Task が 1 つの共有ブランチ上に順番に(sequential)または wave 単位で(parallel) merge され、全体作業が終わった後、その共有ブランチ 1 つで PR **1 個**だけが開かれます。Reviewer からは「関連する変更が複数」ではなく「1 つで完結したバッチ」として見えます。

| こういうときに使う | こういうときは使わない |
|---|---|
| 強く関連する Task 群を 1 つの論理的なリリース単位にまとめたいとき (例: 通知機能の API + UI + migration Task 5 個) | Task 1 つ 1 つを独立して review してもらう必要があるとき — この場合はデフォルト動作(Task ごとに PR 1 個)が適切 |
| PR 数を減らして review 負荷を下げたいとき | どの Task が失敗したかを PR 単位ですぐ区別したいとき |

**共有ブランチ名は `--group-name` で直接指定します。** 省略すると `<base-branch>-<timestamp>` 形式で自動生成されますが、後でどのブランチが何の作業だったか分かりにくくなるため、意味のある名前を直接指定することを推奨します。

| Skill | 共有ブランチ名の形式 |
|---|---|
| `ywc-sequential-executor --aggregate-pr --group-name <name>` | `work/<name>` |
| `ywc-parallel-executor --aggregate-pr --group-name <name>` | `aggregate/<name>` |

ブランチ名の接頭辞(`work/` vs `aggregate/`)だけが違い、動作原理は同じです。各 Task がこの共有ブランチにローカルで merge され、最後にこのブランチ → base への PR 1 個が自動生成され、CI/bot review/merge まで処理されます。**この共有ブランチは実際の base ブランチではありません**。最終 PR が merge されるまで base はまったく変更されません。

## ywc-sequential-executor — Task を順番に実行したいとき

> **注記**: `ywc-sequential-executor` 自体には独立した `--tdd` flag はありません。各 Task の実装ステップは、内部的に `ywc-code-gen` と同じデフォルトの TDD gate(実装前に失敗するテストを先に確認)に従います。RED → GREEN → REFACTOR の完全な儀式と段階ごとの checkpoint commit が必要な場合は、下記の `ywc-code-gen` セクションの `--tdd` flag を参照し、該当 Task の実装依頼に明示的に含めてください。

**Task 1 つだけをデフォルトで実行したい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
</ToolTabs>
デフォルトの `normal-pr` モード — PR 作成 → CI → bot review → merge まで全て自動処理されます。

**PR を開く前に自動でコードレビューも受けたい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>

**複数 Task を一度に、PR 説明は日本語で受け取りたい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
</ToolTabs>

**PR なしで素早くローカルから merge まで終えたい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
</ToolTabs>
PR モードでは CI が test を代わりに回しますが、`--local-merge` はリモート CI がないため、`--run-tests-locally` で merge 前のローカル test 通過を強制するのがよいです。

**複数 Task を 1 つの PR にまとめて配布したい (`--aggregate-pr`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
`work/project-health` ブランチ 1 つに順次積み上げた後、PR **1 個**で delivery されます。`--aggregate-pr` と `--group-name` の全体概念は、すぐ上の「共通概念」節を参照してください。

**ひとまず PR だけ作り、merge は後で人が行いたい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>

**何を実行すべきか分からないので、先に計画だけ見たい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
</ToolTabs>
Task を指定しなければ dependency-graph から次の実行対象を自動検出し、実行計画だけを出力します (実際には何も実行しません)。

**他の作業(main checkout)を邪魔しないように隔離して実行したい (`--worktree`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
</ToolTabs>

`--worktree` は range **全体を 1 つの git worktree 内で**実行します。元の clone はそのままに、別作業を続けられます。要点は、これが **run 単位の隔離**であることです。worktree 1 つが range 全体を包み、その中で Task は引き続き順次実行されます。(逆に `ywc-parallel-executor` は **Task ごとに**別 worktree を作ります。下の並列 executor 節を参照。)

- **独立 flag**です。4 つの delivery モード(`normal-pr` / `--local-merge` / `--draft` / `--aggregate-pr`)や `--review` と排他的ではなく、自由に組み合わせられます。`--worktree` をオン/オフしても delivery モード自体の動作は変わりません。
- **完了後の処理は delivery モードによって異なります:**
  - `normal-pr` / `--local-merge` / `--draft` の組み合わせ → 実行が終わると(Completion Status `DONE`) worktree は削除されますが、**integration branch は保持**されます。Report に「integration branch がまだ trunk へ merge されていない」という案内が一緒に出るため、`ywc-create-pr` で `integration/run-<slug> → trunk` PR を**直接開く必要があります**。自動では開かれません。
  - `--aggregate-pr` と一緒に使う場合 → この手動段階は不要です。`work/<name>` ブランチが worktree 内で作られ、そのブランチの `work → base` PR が最後に自動で開かれるためです。
- **途中で失敗した場合(`BLOCKED` / `DONE_WITH_CONCERNS`)** worktree は削除されず、そのまま保持されます。Report に表示されたパスへ後で入り直し、続きから進める(resume)ことができます。
- `--dry-run` と一緒に使うと、実際には worktree を作らず、どのパスにどんな名前で作られるかだけを事前に見せます:
  <ToolTabs>
    <ToolTabsPanel tool="claude-code" label="Claude Code">
      <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
    <ToolTabsPanel tool="codex" label="Codex">
      <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
  </ToolTabs>

**`--worktree` + `--aggregate-pr` の組み合わせ — 隔離実行と単一 PR 配布を同時に**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
main checkout は触らず、複数 Task を 1 つの PR にまとめて配布まで自動で終えたいときに最も完結した組み合わせです。

> **注意**: `--local-merge` / `--draft` / `--skip-ci-wait` / `--aggregate-pr` は互いに排他的です。2 つ以上を一緒に使うと実行前に停止して聞き返します。`--review` と `--worktree` は上記のどのモードとも組み合わせられます。

## ywc-parallel-executor — 独立した Task を同時に実行したいとき

**独立した Task を並列に実行し、それぞれ PR を作って merge まで終えたい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
</ToolTabs>
wave 単位で同時実行され、Task ごとに PR 作成 → CI → bot review → **merge** まで個別に完結します。

**PR なしで素早く各 Task をローカル merge したい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
</ToolTabs>

**全 Task を並列実行後、1 つの PR にまとめて配布したい (`--aggregate-pr`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
</ToolTabs>
`aggregate/payments` ブランチ 1 つに wave 単位で積み上げた後、PR **1 個**で delivery されます。`--aggregate-pr` と `--group-name` の全体概念は、このページ上部の「共通概念」節を参照してください。`ywc-sequential-executor` と完全に同じ概念で、共有ブランチ名の接頭辞だけが `work/` ではなく `aggregate/` です。

**すべての作業が終わった後、まとめて人が確認して merge したい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>
すべての wave 完了後に draft PR 1 個が生成され、merge は人が手動で行います。

> **注意**: `--local-merge` / `--draft` / `--per-task-pr` / `--aggregate-pr` のどれも指定しない場合、4 つのモードのうち何を望むか聞き返します。デフォルトで静かに進むことはありません。`--review` はどのモードとも組み合わせられます。(参考: `ywc-parallel-executor` には `--worktree` という別 flag はありません。Task ごとに worktree で隔離することが、この Skill のデフォルト動作だからです。)

## ywc-code-gen — Task 分解なしでコードを直接生成したいとき

**Backend + Frontend + QA を一度に生成したい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**決済/認証のように敏感な機能なので、丁寧に TDD で作りたい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
</ToolTabs>
`payment` のような keyword は自動的に `critical` 判定を受け、gray-box 委任(内部コードを読まずインターフェースだけ確認すること)が禁止されます。`--tdd` は RED → GREEN → REFACTOR のコミット境界を強制します。

**再利用可能なコードをすでに確認したので、重複検査をスキップしたい**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
</ToolTabs>

> **注意**: `--spec` と `--feature` はどちらも必須です。どちらかが空なら `NEEDS_CONTEXT` で停止します。`tasks/` ディレクトリがすでにある作業なら、この Skill ではなく `ywc-sequential-executor` / `ywc-parallel-executor` を使ってください。

---

[← 前: 13. コード構造と保守性の管理](./16-code-structure-and-maintainability.md) · [次: 15. 全 Skill リファレンス →](./14-skill-reference.md)
