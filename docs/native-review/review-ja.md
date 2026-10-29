# 일본어 (Japanese) 원어민 검수 시트

총 186줄 (+ 사이드바 그룹 이름, 페이지 이동 링크 문구)
검수 대상: 2026-10-29 가이드북 갱신(PR #48~#58)에서 추가/수정된 문장만 발췌했습니다. 번호만 바뀐 줄, 코드 블록, 표 구분선은 제외했습니다.
검수 관점: (1) 자연스러운 표현인가 (2) 용어가 일관적인가 (3) 의미가 영어 원문과 어긋나지 않는가.
기술 용어(Skill, agent, worktree, PR 등)는 원문 그대로 두는 것이 기본입니다.
영어 원문: 같은 파일명의 `src/content/guidebook/en/<파일>` (https://github.com/yongwoon/ywc-agent-toolkit-lp/tree/main/src/content/guidebook/en)
회신 방법: 수정이 필요한 줄의 `L<번호>` 옆에 수정안과 이유를 적어 주세요. 문제가 없는 줄은 그대로 두시면 됩니다.

## 사이드바 그룹 이름 (src/components/guidebook/guidebook-nav.ts)

- prologue: "プロローグ",
- "getting-started": "はじめに",
- "core-pipeline": "コアパイプライン",
- "project-setup": "プロジェクトの開始",
- quality: "品質と検証",
- operations: "運用と専門領域",
- reference: "リファレンス"

## 페이지 하단 이동 링크 문구 (모든 페이지 공통 형식)

- [← 前へ: 07. …](…) · [次へ: 09. … →](…) / 最終ページ: [目次に戻る »](./README.md)

## 02-core-concepts.md

- L16: ### ツール別の Agent 構成
- L18: Agent は Skill の中で実行され、ユーザーが直接呼び出すことはありません。2 つのツールが提供する agent は異なり、Claude Code は 13 個、Codex は 10 個です。Claude Code では worker agent が server・UI・test のコードを書きます。Codex では Skill を実行する session 自身がコードを書き、agent の大半は読み取り専用の助言・レビュー役です。
- L20: | Agent | 役割 | 主な呼び出し元 Skill | Claude Code | Codex |
- L22: | `ywc-architect` | アーキテクチャ判断と trade-off の助言 (読み取り専用) | `ywc-plan`, `ywc-impl-review` | ✓ | ✓ |
- L23: | `ywc-security-engineer` | 静的セキュリティレビュー (読み取り専用) | `ywc-security-audit`, `ywc-impl-review`, `ywc-infra-review` | ✓ | ✓ |
- L24: | `ywc-root-cause-analyst` | 根本原因分析 (読み取り専用) | `ywc-debug-rootcause` | ✓ | ✓ |
- L25: | `ywc-performance-engineer` | 性能分析と profiling の推奨 (読み取り専用) | `ywc-impl-review` | ✓ | ✓ |
- L26: | `ywc-typescript-reviewer` / `ywc-python-reviewer` / `ywc-go-reviewer` | 言語別レビュー (読み取り専用) | `ywc-impl-review` | ✓ | ✓ |
- L27: | `ywc-cloud-engineer` | Terraform IaC。Claude Code では作成とレビュー、Codex ではレビューのみ (読み取り専用) | `ywc-iac-author`, `ywc-infra-review`, `ywc-infra-optimize` | ✓ | ✓ |
- L28: | `ywc-backend-coder` / `ywc-frontend-coder` / `ywc-qa-engineer` | Server コード / UI コード / test コードを作成 | `ywc-code-gen`, 2 つの executor | ✓ | |
- L29: | `ywc-refactor-cleaner` | 安全な dead code 削除ループを実行 | `ywc-refactor-clean` | ✓ | |
- L30: | `ywc-doc-writer` | ドキュメントを作成 | `ywc-auth-implement`, `ywc-project-docs` | ✓ | |
- L31: | `ywc-complexity-cleaner` / `ywc-test-hardener` | 品質ゲートの worker: production コードの複雑度を下げる / 生き残った mutant に対して test を強化する | Executor の品質ゲート ([18](./13-executor-and-codegen-patterns.md)) | | ✓ |

## 05-general-cycle-medium-large.md

- L33: ## Task ID と作業者イニシャル
- L35: `ywc-task-generator` は、複数の人が Task を生成しても番号が衝突しないように、Task ID の先頭に作業者のイニシャルを付けるようになりました。
- L37: - 旧形式: `000001-010-db-create-user-table`
- L38: - 新形式: `yk-000001-010-db-create-user-table`
- L40: Task ディレクトリも同じ名前になります。イニシャルのない旧形式の ID は引き続き有効で、番号が振り直されることもありません。新旧の ID は同じ project 内で共存できます。
- L42: イニシャルは小文字の英字・数字 2〜4 文字です。`--initials yk` で明示するか、skill に解決させることができます。
- L44: - **Claude Code**: `--initials` → project の `CLAUDE.md` 内 `## Task Initials` セクション → `git config user.email` / `user.name` からの導出(初回に確認し、結果を `CLAUDE.md` にキャッシュ)の順に解決します。いずれも解決できない場合は、イニシャルなしの旧形式の番号付けに戻ります。
- L45: - **Codex**: `--initials` → project の `.codex/ywc.json` → user の `~/.codex/ywc.json` → 導出(初回に確認し、`ywc-setup` で保存)の順に解決します。非対話実行で何も保存されていない場合は、`--initials` を求めて `NEEDS_CONTEXT` で停止します。
- L47: 番号はイニシャルごとに数えます。各自のカウンターは、自分自身の最大 phase 番号の続きから進みます。
- L49: `--mode human|llm`(エイリアス `--granularity`)で Task の粒度を指定します。`human` は人が約 1 時間でレビューできる大きさ、`llm` は agent 向けのより大きな Task です。フラグを省略すると skill は必ず質問し、黙って選ぶことはありません。
- L51: `tasks/dependency-graph.md` が 300 行を超えている場合、生成前に skill が自動で圧縮します(完了した phase は「done」の 1 行見出しにまとめられます)。executor も各 Task の後に同じ処理を行うため、利用者が設定することは何もありません。

## 07-starting-a-new-project.md

- L18: | 2 | `ywc-project-mission` *(Claude Code のみ)* | project の mission、測定可能な success criteria、非目標を `docs/project-mission.md` に記録。**構造を設計する前に why を先に固める** |
- L44: この手順は Claude Code 専用です。Codex には mission skill がないため、Codex では 6 番の仕様書の中で成功基準を明記してください。
- L46: directory 構造や仕様よりも先に **mission と成功基準** を固めます — 以降のすべての段階は、この mission を基準に判断されます。
- L139: - 大規模な TypeScript product では、`ywc-project-scaffold` が pnpm workspaces の monorepo を提案できます。構成は `apps/web`、`apps/server`、`packages/{contracts,core,db,…}`、root の `tests/{architecture,contract,integration,e2e}` です。`contracts` は内部依存を持たず、`core` は framework や infrastructure を import しません。禁止された依存は `tests/architecture` で検査されます。
- L140: - 新しい UI は、既定で mobile-first で計画されます(最も狭い viewport から始め、`min-width` の breakpoint で広げます)。PC/tablet 専用の画面(例: 管理ツール)の場合は、その旨を 1 行で明記してください。

## 13-executor-and-codegen-patterns.md

- L33: **スクリプトや CI から実行するときのフラグ**
- L35: | フラグ | 動作 | 利用できる場所 |
- L37: | `--terse` | Task の一覧(名前、status、PR URL または merge SHA)と最後の `Completion Status` 行だけを出力します。CI での解析を想定しています。 | 両 executor、両ツール |
- L38: | `--non-interactive` | すべての確認を抑止します。回答が必要な判断は質問せず、固定の status で終了します。情報不足は `NEEDS_CONTEXT`、conflict・作業ツリーの未コミット変更・`gh` の未認証は `BLOCKED`、CI の timeout は `DONE_WITH_CONCERNS` です。 | Claude Code は `ywc-sequential-executor` のみ、Codex は `ywc-parallel-executor` のみ |
- L201: ### 品質ゲートと wave hardener (opt-in)
- L203: task に `## Quality Gate Contract` が宣言されている場合(CRAP スコアが 6〜8 以下かつ mutation スコアが 90% 以上、または sentinel の `N/A — no quality gate contract`)、executor は次の 2 つを実行します。
- L205: - **cleaner**: 本番コードのリファクタリングを行います。
- L206: - **hardener**: テストのみを対象とし、本番コードは編集できません。wave 内の Task がすべて merge された後に、wave ごとに 1 回だけ実行されます。
- L208: `--local-merge`、`--draft`、`--aggregate-pr` を使う場合、wave はまず `wave-int/<N>` ブランチへ merge されます。hardener の判定が PASS(または gate が適用されない)の場合にのみ、そのブランチが base ブランチへ反映(promote)されます。判定が `BLOCKED` / `NEEDS_CONTEXT` の場合は base ブランチを変更せず、ブランチと worktree を残すため、修正して再開できます。再開時、executor は `wave-int/<N>` ブランチの tip SHA が記録と一致するかを確認します。検証できないブランチは再利用せず、その wave をブロックします。
- L210: `--per-task-pr` の場合、hardener は結果を報告するだけで、wave を止めることはありません。contract のない Task は影響を受けません。

## 14-skill-reference.md

- L23: | [`ywc-verify-done`](#明示的で再実行可能な-gate-で完了を証明したい) | 明示的で再実行可能な gate で完了を証明したい |
- L27: | [`ywc-mine-review-history`](#多数の-merged-pr-を一度に見直して繰り返される-review-指摘を見つけたい) | 多数の merged PR を一度に見直して、繰り返される review 指摘を見つけたい |
- L29: | [`ywc-project-mission`](#project-の-mission-と-success-criteria-と-non-goal-を記録したい) | Project の mission、success criteria、non-goal を記録したい |
- L30: | [`ywc-adr`](#取り消しにくいアーキテクチャ決定を却下した代替案と一緒に記録したい) | 取り消しにくいアーキテクチャ決定を、却下した代替案と一緒に記録したい |
- L52: *(Claude Code のみ)* CodeRabbit の「Nitpick comments」(review thread を持たないもの)も検出され、他の comment と同じように分類されます。対応済みの項目は、非表示マーカー付きの PR 全体コメント 1 件に記録され、再表示されません。
- L66: task README または `docs/ywc-plans/` 配下の plan が見つかると、PR 本文に `Design Background` セクションが追加されます(goal と、plan に記載がある場合は Alternatives Considered / Trade-offs を含みます)。`--plan-doc <path.md>` で plan を明示的に指定できます(リポジトリ内の相対パス)。`--no-plan-ref` で plan の検索を無効化できます。両方指定された場合は `--plan-doc` が優先されます。複数の plan が該当する場合は一覧を表示し、`--plan-doc` を付けて再実行するよう求めます。
- L116: Socratic 対話で目的/制約/成功基準と代替案 2〜3 個を導き、その後 `ywc-plan` へ handoff します。handoff の前に、設計ドキュメントでは依拠している前提(premise)を根拠(`file:line` と引用した snippet)とともに列挙し、各前提に VERIFIED / UNVERIFIED のステータスを付けます。未検証の前提は、黙って仮定するのではなく failure mode として記録するか、out-of-scope に移します。
- L175: ### 明示的で再実行可能な gate で完了を証明したい
- L177: gate の条件を markdown の ledger として書いておくと、完了の判定を同じ手順で何度でも再実行できます。各 gate には次の 3 つを記述します。
- L179: - `CHECK:`: 実行する shell コマンド
- L180: - `EXPECT:`: 出力に含まれるべき substring、または `/regex/`
- L181: - `EVIDENCE:`: 証拠として残す内容
- L183: 次のコマンドで ledger の判定状況を確認できます。
- L194: `--status` を省略すると gate を実行します。`--reverify` を付けると、キャッシュを使わずにすべての gate を再実行します。
- L196: - 終了コードが 0 なら、実行可能なすべての gate が満たされています。
- L197: - `CHECK` も `EXPECT` もない gate は manual 扱いで、判定をブロックしません。
- L198: - 過去の PASS は、gate の本文が変わっていない場合にのみ信頼されます。
- L199: - 各 gate は 120 秒でタイムアウトします。
- L200: - `CHECK` の行は、あなたの権限で任意のコマンドを実行します。自分で書いたものでない ledger は、先に内容を読んでから実行してください。
- L202: ledger は任意です。従来の単一コマンドによる検証(lint / typecheck / test / build)は、そのまま使えます。どちらのツールでも利用できます。
- L243: ### 多数の merged PR を一度に見直して繰り返される review 指摘を見つけたい
- L253: マージ済みの PR を N 件まとめて対象に、CodeRabbit / Codex Review / Claude Review などの bot review comment を収集します。各指摘は accepted / dismissed に分類し、欠陥クラスにまとめます。少なくとも `--min-recurrence`(既定は 3)件の異なる PR で繰り返し現れたクラスだけを `ywc-review-learnings` へ提案します。`--limit` と `--since` のうち少なくとも一方が必須です(すべての PR を無条件に走査することはありません)。`docs/review-learnings.md` を直接書き換えることはなく、昇格は `ywc-review-learnings` の確認ステップを経ます。開いている PR 1 件だけを対象にする場合は [`ywc-handle-pr-reviews`](#開いている-pr-の-review-comment-に対応しciconflict-も一緒に整理したい) を使ってください。
- L267: ### Project の mission と success criteria と non-goal を記録したい
- L269: `ywc-project-mission` *(Claude Code のみ)*
- L272: [09. 新しい Project を始める](./07-starting-a-new-project.md)ですでに扱いました。project の方向が変わったときも、`ywc-project-mission` で mission を更新できます。Codex には対応する skill がありません。
- L274: ### 取り消しにくいアーキテクチャ決定を却下した代替案と一緒に記録したい
- L276: `ywc-adr` *(Claude Code のみ)*
- L279: `docs/adr/NNNN-<slug>.md` に Context / Decision / Alternatives Considered / Consequences の構成で記録します。モードは new / read / list / curate です。記録するのは、取り消しにくく、文脈を知らないと意外に映り、実際のトレードオフを伴う決定だけにしてください。古い ADR は直接編集せず、置き換える場合は `--supersedes ADR-NNNN` を使います。
- L334: - Codex の `ywc-setup` は、作業者のイニシャル(`--initials yk`)も保存します。`--scope project|user` で保存先を選べます(project は `.codex/ywc.json`、user は `~/.codex/ywc.json`)。
- L335: - Claude Code の `ywc-setup-language` は言語のみを扱い、`CLAUDE.md` に `## Language Policy` セクションを書き込みます。Claude Code のイニシャルは `--initials` または `CLAUDE.md` の `## Task Initials` セクションから取得されます([06](./05-general-cycle-medium-large.md) を参照)。
- L361: ## ツール固有の Skill
- L363: ほとんどの Skill は Claude Code と Codex の両方で使えますが、一部はどちらか一方のツールでのみ提供されます。以下はそのツール固有の Skill の一覧です。
- L365: | ツール | Skill | 内容 |
- L367: | Codex | `ywc-wayfinder` | 大きい、または不確かな変更のための複数セッションの discovery。active な ticket を 1 つだけ持つローカルの map を作り、計画や実装の前に使います |
- L368: | Codex | `ywc-architecture-invariants` | 任意の repo root にある `architecture-invariants.json` contract を、上限付きで正規化された依存エッジの根拠に照らして検証します |
- L369: | Codex | `ywc-implement` | 承認済みの spec または ticket を 1 つだけ、レビューゲート付きの焦点を絞った変更として実装します |
- L370: | Codex | `ywc-team-assemble` | 明示的に依頼されたときに専門 team を組み、subagent へ委任します |
- L371: | Codex | `ywc-setup` | 出力言語や 作業者のイニシャルの永続デフォルトを設定します(Claude Code の `ywc-setup-language` に相当) |
- L372: | Claude Code | `ywc-adr` | 取り消しにくい決定を、却下した代替案と一緒に記録します。[こちら](#取り消しにくいアーキテクチャ決定を却下した代替案と一緒に記録したい) |
- L373: | Claude Code | `ywc-project-mission` | Project の mission、success criteria、non-goal を記録します。[こちら](#project-の-mission-と-success-criteria-と-non-goal-を記録したい) |
- L374: | Claude Code | `ywc-setup-language` | 出力言語を永続化し、毎回 `--lang` を渡さなくて済むようにします。[こちら](#出力言語の永続デフォルトを設定し毎回-language-を聞かれないようにしたい) |
- L382: | `ywc-adr` | 取り消しにくいアーキテクチャ決定を、却下した代替案と一緒に記録したい *(Claude Code のみ)* | [こちら](#取り消しにくいアーキテクチャ決定を却下した代替案と一緒に記録したい) |
- L384: | `ywc-architecture-invariants` | 任意の `architecture-invariants.json` contract を、依存エッジの根拠に照らして検証する *(Codex のみ)* | [こちら](#ツール固有の-skill) |
- L401: | `ywc-implement` | 承認済みの spec または ticket を、レビューゲート付きで 1 つだけ実装する *(Codex のみ)* | [こちら](#ツール固有の-skill) |
- L407: | `ywc-mine-review-history` | 多数の merged PR を横断して、繰り返される review 指摘を見つけたい | [こちら](#多数の-merged-pr-を一度に見直して繰り返される-review-指摘を見つけたい) |
- L413: | `ywc-project-mission` | Project の mission、success criteria、non-goal を記録したい *(Claude Code のみ)* | [こちら](#project-の-mission-と-success-criteria-と-non-goal-を記録したい) |
- L421: | `ywc-setup` | 出力言語の永続デフォルトを設定し毎回 language を聞かれないようにしたい *(Codex のみ)* | [こちら](#出力言語の永続デフォルトを設定し毎回-language-を聞かれないようにしたい) |
- L422: | `ywc-setup-language` | 出力言語を永続化し、毎回 `--lang` を渡さなくて済むようにする *(Claude Code のみ)* | [こちら](#出力言語の永続デフォルトを設定し毎回-language-を聞かれないようにしたい) |
- L429: | `ywc-team-assemble` | 明示的に依頼されたときに専門 team を組み、subagent へ委任する *(Codex のみ)* | [こちら](#ツール固有の-skill) |
- L433: | `ywc-verify-done` | lint/typecheck/test/build を実行して完了を機械的に検証する skill | [こちら](#明示的で再実行可能な-gate-で完了を証明したい) |
- L434: | `ywc-wayfinder` | 大きい、または不確かな変更のための複数セッションの discovery *(Codex のみ)* | [こちら](#ツール固有の-skill) |

## 16-code-structure-and-maintainability.md

- L7: 2 つの Skill はどちらも「コードが良くない」という同じ症状から出発しますが、扱う問いが異なります。今どの問いに答えが欲しいかで選んでください。
- L27: `--tier safe` は detection tool + grep + test の 3 つすべてが「未使用」に同意した項目だけを削除します。構造そのものは再構成しません。構造や設計上の問題は `ywc-impl-review` で洗い出し、その後は通常の cycle で修正してください。
- L44: **知っておくと便利なオプション**
- L46: - レビュー対象は次の 3 つのうち 1 つだけを選びます: `--code <path>`、`--git-range <sha>..<sha>`、`--working-tree`(staged・unstaged・untracked の変更すべて。commit は不要です)。`--spec` は Claude Code では省略できます。
- L47: - `--profile chill|assertive`(既定は `chill`): `chill` は Low/Info のスタイル上の細かな指摘を隠し、`assertive` はそれらも表示します。Critical/High/Medium は隠されません。
- L48: - `--no-advisor` は Phase 2 の advisor 呼び出しを省略します。`--advisor-budget <n>` で呼び出し回数の上限を指定できます(既定は 5)。
- L49: - `--format html` は、自己完結型のレポートを `claudedocs/` に書き出します(既定は `markdown`)。
- L50: - `--non-interactive`(Claude Code のみ): learnings 昇格の確認を省略し、learning の候補をレポートに列挙します。
- L52: **独立した検証**: 確認済みの Critical / High の指摘は、それぞれ `file:line` と主張された severity だけを見る新しい reviewer によって 1 回ずつ再確認されます。再現できなかった指摘は、Phase 2 の advisor に送られるか(Security の指摘は対象外)、unverified としてマークされます。1 回の実行で検証されるのは最大 20 件です。
- L54: **スコープのガードレール**: 対象に 200 ファイルを超える変更、または変更行数が 5,000 行を超える変更が含まれる場合、レビューは開始を拒否して `NEEDS_CONTEXT` を返します。件数と変更量の多い上位 5 ファイルを報告し、対象を絞り込むよう求めます。サンプリングや切り詰めは行いません。
- L62: dead code が見つかった場合は、最も元に戻しやすいこのステップから対応します。detection tool + grep + test の 3 つすべてが同意するものだけを削除するため、リスクが低いです。
- L66: PR を開く前に 5 軸レビューで残った問題がないか確認します。ここで出た指摘は、Step 1 に戻って dead code を整理するか、通常の実装 cycle で修正する入力になります。

## 19-skill-combination-recipes.md

- L3: # 08. Skill 組み合わせレシピ
- L5: 他のページはフロー 1 つ、または Skill 1 つずつを説明しています。このページでは、Skill 同士がどうつながるか — ある Skill が何を残し、それをどの Skill が引き継ぐか — を示します。以下のつながりはすべて Skill 自身が行う動作(共有ファイルの読み込み、次の Skill への hand-off の提案)であり、ユーザーが覚えておくべき慣習ではありません。
- L7: | やりたいこと | レシピ |
- L9: | 同じ review 指摘が繰り返されないようにしたい | [Review 学習ループ](#review-学習ループ) |
- L10: | 直したバグを長く残る教訓にしたい | [バグ修正から再発防止まで](#バグ修正から再発防止まで) |
- L11: | PR の前後でどの gate がいつ動くか知りたい | [PR 前後の gate](#pr-前後の-gate) |
- L12: | 元に戻しにくい決定の理由を残したい | [計画しながら決定を記録する](#計画しながら決定を記録する) |
- L13: | 範囲がまだ不確かな大きな変更を始めたい | [計画前の探索](#計画前の探索) |
- L14: | Task を衝突なく並列で実行したい | [並列実行環境](#並列実行環境) |
- L15: | Release を準備したい | [Release 準備](#release-準備) |
- L17: ## Review 学習ループ
- L19: `docs/review-learnings.md` は project の review の記憶です。このファイルは `ywc-review-learnings` が管理し、他の Skill はこのファイルを読んだり、内容を追加したりします。
- L21: 1. **受け取る** — comment に対応する前に、`ywc-receive-review` がその指摘が技術的に正しいかを確認します。レビュアーに求められたというだけで誤った修正を実装することを防ぎます。
- L22: 2. **対応する** — `ywc-handle-pr-reviews` が thread ごとに修正または返信し、PR を merge 可能な状態(CI green、base との conflict なし)にします。
- L23: 3. **記録する** — 残す価値のある教訓は、`ywc-review-learnings` を通じて `docs/review-learnings.md` に記録します。`--source pr --pr <番号>` を指定すると、PR 1 件の bot review comment を整理します。新しい項目はすべて changeset として提示され、ユーザーが確認した後にのみ書き込まれます。
- L24: 4. **遡って収集する** — 過去の PR については、`ywc-mine-review-history` が merge 済みの PR を複数まとめて走査し、繰り返し現れる欠陥クラスを `ywc-review-learnings` に提案します。
- L25: 5. **再利用する** — `ywc-impl-review` は review を始めるたびに学習内容を読み込みます(`--skip-learnings` で省略可能)。そのため、既知の false positive は再び指摘されず、既知の `DO-NOT` はより早く検出されます。Review の後には、繰り返し現れる finding を記録するか提案します。
- L36: このループは両方のツールで動作します。1 周するたびに次の review は静かになります。チームがすでに却下した指摘は再び出てこなくなり、チームが同意した指摘は PR を開く前に検出されます。
- L38: ## バグ修正から再発防止まで
- L40: 1. `ywc-debug-rootcause` が根本原因を見つけて regression test を追加し、`ywc-verify-done` で修正を gate します([15](./12-debugging-and-incident-postmortem.md))。
- L41: 2. 同じ種類の欠陥が他の場所でも起こりうる場合は、それを review 学習として記録するか提案します(`ywc-review-learnings --mode update --source debug`)。
- L42: 3. Production 障害の後には、`ywc-incident-postmortem` が報告書を作成し、再発防止の action item を同じ方法で提案します(`--source incident`)。
- L43: 4. 以降は `ywc-impl-review` がその学習内容を読み込むため、同じ種類の欠陥が Production ではなく review の段階で検出されます。
- L45: ステップ 2 と 3 は Claude Code のみです。Codex では 2 つの Skill が `ywc-review-learnings` へ hand-off しないため、残す価値のある教訓があれば `ywc-review-learnings` で自分で記録してください(既定の `feedback` source)。
- L47: ## PR 前後の gate
- L49: | タイミング | Skill | 確認する内容 |
- L51: | 実装前 | `ywc-confidence-gate` | 準備状況を 5 つの次元で採点します: PROCEED(90 以上)、REVIEW(70-89)、STOP(70 未満)。90 未満の場合、最も弱い次元が引き上げられるか、ユーザーがリスクを受け入れるまで実装は待機します |
- L52: | 実装後 | `ywc-impl-review` | Spec に対する 5 観点の review([14](./16-code-structure-and-maintainability.md)) |
- L53: | 変更がセキュリティに関わるとき | `ywc-security-audit` | 静的セキュリティ review(OWASP Top 10、secret、threat model) |
- L54: | 「完了」と言う前 | `ywc-verify-done` | すべての完了主張に対する新しい証拠(test または build の出力) |
- L55: | PR を開くとき | `ywc-create-pr` | Commit、push、そして task や plan をもとにした PR 本文 |
- L56: | レビュアーの返答後 | `ywc-handle-pr-reviews` | 上のループと同様に comment、CI、conflict |
- L57: | Merge するとき | `ywc-finish-branch` | CI と bot review の待機、merge、merge 後の確認、branch の整理 |
- L59: `ywc-verify-done` を直接呼び出すことはあまりありません。`ywc-code-gen` と 2 つの executor がそれぞれの完了ステップで呼び出すためです。手動で作業を完了したときは、自分で呼び出してください。
- L61: ## 計画しながら決定を記録する
- L63: このレシピは Claude Code のみです。
- L65: - `ywc-plan` は計画を立てる前に、`docs/adr/` と `docs/project-mission.md` があれば読み込みます。計画がすでに決まった決定と黙って矛盾することはなく、衝突があればユーザーに提示されます。
- L66: - 計画内の architecture 決定が元に戻しにくく、文脈を知らない後の読み手を驚かせうるもので、かつ実際の trade-off がある場合、`ywc-plan` は `ywc-adr` を通じて ADR として保存するかを一度だけ提案します。計画が長く続く新しい success criterion を確定した場合は、`docs/project-mission.md` に追加するかを提案します。
- L67: - 決定がライブラリや実装方式の比較である場合は、まず `ywc-tech-research` を実行し、その結果をもとに計画してください。
- L71: Codex には `ywc-adr` も `ywc-project-mission` もないため、決定の理由は plan や spec 文書に残してください。
- L73: ## 計画前の探索
- L75: このレシピは Codex のみです。
- L77: 1. `ywc-wayfinder` は `docs/ywc-plans/<slug>-wayfinder.md` に local map を置き、複数の session にわたって引き継ぎます。Map は多くの ticket を保持できますが、active なものは常に 1 つだけで、この Skill 自身が何かを実装することはありません。
- L78: 2. Ticket の進め方が明確になると、`ywc-plan` へ hand-off します(ticket が技術比較で止まっている場合は `ywc-tech-research` へ)。
- L79: 3. そこからは通常のフローが続きます: `ywc-spec-ready` → `ywc-task-generator` → executor([06](./05-general-cycle-medium-large.md))。承認済みの spec や ticket を 1 つ実装するだけでよい場合は、`ywc-implement` が範囲を絞った、review gate 付きの変更 1 つとして処理します。
- L83: 規模が大きい作業、不確実な作業、または複数の session にまたがる作業にのみ使ってください。通常の計画は `ywc-plan`、アイデアの整理は `ywc-brainstorm` の役割です。
- L85: ## 並列実行環境
- L87: `ywc-parallel-executor` は task ごとの worktree を `ywc-worktrees` で作成します。Docker project では、`ywc-docker-isolate` によって worktree ごとに専用の host port ブロックを割り当て、stack 同士が衝突しないようにします("port is already allocated")。Merge の後は、`ywc-finish-branch` が `ywc-worktrees --mode prune` で worktree を削除します。
- L89: 通常、これらを自分で呼び出す必要はありません。両方のツールで executor がこれらを駆動します。Executor の実行とは別に worktree を作成または整理するには、[19](./14-skill-reference.md) の command を使ってください。
- L91: ## Release 準備
- L93: 1. まず保留中の依存関係の更新を片付けます: `ywc-merge-dependabot security parallel-auto`。
- L94: 2. Release PR(例: `develop` → `main`)を開き、`ywc-release-pr-list <release PR 番号>` でその説明文を作成します。merge 済みの PR が作成者ごとにまとめられます。
- L95: 3. `ywc-changelog-release-notes` で `CHANGELOG.md` とユーザー向けの release note を作成します。ステップ 2 の結果ファイルを `--pr-list` で渡すと、git log の代わりにその一覧を使います。

## README.md

- L7: - 初めて使う場合は、プロローグに続けて **はじめに** の順序(01 → 02 → 03 → 04)に沿って進め、その後 **コアパイプライン**(05-08)を読んでください。
- L8: - 基本概念をすでに理解していて特定の作業だけを探している場合は、**プロジェクトの開始**、**品質と検証**、**運用と専門領域**から状況に合うページへ直接移動してください。
- L15: ### 計画と実装
- L17: | やりたいこと | 最初に使う Skill | ガイド |
- L27: | 範囲が不確かな大きな変更を、複数の session にわたって探索したい (Codex のみ) | `ywc-wayfinder` | [08](./19-skill-combination-recipes.md) |
- L29: | Skill 同士がどうつながるかを知りたい | - | [08](./19-skill-combination-recipes.md) |
- L31: ### 品質と検証
- L33: | やりたいこと | 最初に使う Skill | ガイド |
- L41: | 実装品質と保守性について、独立した点検を受けたい | `ywc-impl-review` | [14](./16-code-structure-and-maintainability.md) |
- L42: | 再実行できる明示的な gate で完了を証明したい | `ywc-verify-done` | [19](./14-skill-reference.md) |
- L43: | ビジネス・ユーザーの観点で project を点検してほしい | `ywc-product-review` | [19](./14-skill-reference.md) |
- L45: ### PR・レビュー・リリース
- L47: | やりたいこと | 最初に使う Skill | ガイド |
- L50: | レビュアーの指摘が本当に正しいか確認してから対応したい | `ywc-receive-review` | [19](./14-skill-reference.md) |
- L51: | 同じ review 指摘が繰り返されないようにしたい | `ywc-review-learnings` | [08](./19-skill-combination-recipes.md) |
- L56: ### デバッグと障害対応
- L58: | やりたいこと | 最初に使う Skill | ガイド |
- L63: ### プロジェクトの知識と意思決定の記録
- L68: | 取り消しにくいアーキテクチャ決定を記録したい (Claude Code のみ) | `ywc-adr` | [19](./14-skill-reference.md) |
- L74: ### プロローグ
- L81: ### はじめに
- L83: | ページ | 説明 |
- L88: ### コアパイプライン
- L90: | ページ | 説明 |
- L95: | [08. Skill 組み合わせレシピ](./19-skill-combination-recipes.md) | Skill 同士の引き継ぎ方: review 学習ループ、バグから再発防止へ、PR gate、決定の記録、探索、並列実行、release |
- L97: ### プロジェクトの開始
- L104: ### 品質と検証
- L111: | [14. コード構造と保守性の管理](./16-code-structure-and-maintainability.md) | 構造が悪い、または保守しづらいコードを整理・検証する 2 つの Skill の使い方と、それらが連携して働く順序 |
- L113: ### 運用と専門領域
- L115: | ページ | 説明 |
- L121: ### リファレンス
