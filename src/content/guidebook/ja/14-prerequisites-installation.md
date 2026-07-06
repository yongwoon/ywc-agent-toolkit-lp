[« 目次に戻る](./README.md)

# 14. 事前準備とインストール

`ywc-*` Skill を安定して使うには、いくつかの Tool を事前に準備しておく必要があります。Plugin marketplace や Codex plugin からインストールすればファイルコピーと登録は自動で処理されますが、Skill を**実際に実行**するときは以下の Tool が System に入っている必要があります。手順は次のとおりです — **① 必須 Tool のインストール → ② ywc-agent-toolkit 自体のインストール(Claude Code / Codex)** → その下は状況に応じて準備する選択 Tool です。

## 必須 Tool

| Tool | 必要な理由 | macOS インストール例 |
|---|---|---|
| `git` | clone、branch、worktree、commit、PR workflow | 通常はプリインストール済み |
| `bash` (3.2 以上) | `install.sh`、hook script の実行 | `brew install bash` |
| `jq` | plugin manifest、GitHub API、hook registry JSON の処理 | `brew install jq` |
| `python3` (3.9 以上) | executor helper、Dependabot grouping、eval script の実行 | `brew install python3` |
| `gh` | PR 作成、PR check 確認、review comment 処理、merge | `brew install gh` |
| `curl` | translation script、API 呼び出し | 通常はプリインストール済み |
| `uv` | Claude Code Python hook の実行 | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| `ripgrep` (`rg`) | repository scan、onboarding、validation search | `brew install ripgrep` |

このうち `uv` のみ **Claude Code 専用**で、それ以外は Claude Code と Codex の両方で共通して必要です。

`gh` はインストールだけでは不十分で、認証まで終えないと PR を扱う Skill(`ywc-create-pr`、`ywc-handle-pr-reviews`、`ywc-merge-dependabot` など)が正常に動作しません。

```bash
gh auth login
gh auth setup-git
gh auth status
```

### 環境変数(必要なときだけ)

デフォルトのままでもほとんど動作します。以下は場所や挙動を変えたいときだけ設定する選択項目です。

| 変数 | 用途 |
|---|---|
| `CODEX_HOME` | Codex Skill と Agent のインストール先を override |
| `CLAUDE_SKILLS_DIR` | Claude Code Skill のインストール先を override |
| `CLAUDE_AGENTS_DIR` | Claude Code Agent のインストール先を override |
| `ANTHROPIC_API_KEY` | Tier 2 翻訳 script の実行 |
| `CCH_SLA_WEBHOOK` | Claude Code permission 待ちの Slack 通知 hook |

## ywc-agent-toolkit のインストール

使っている Tool のタブを選んでください。どちらの経路にも前提条件はありません。

### 方法 1 — Plugin マーケットプレイス(推奨)

<ToolTabs>
<ToolTabsPanel tool="claude-code" label="Claude Code">
<CodeBlock label="claude code" code="/plugin marketplace add yongwoon/ywc-agent-toolkit" />
<CodeBlock label="claude code" code="/plugin install ywc-agent-toolkit@ywc-agent-toolkit" />
</ToolTabsPanel>
<ToolTabsPanel tool="codex" label="Codex">
<CodeBlock label="codex" code="codex plugin marketplace add yongwoon/ywc-agent-toolkit" />
<CodeBlock label="codex" code="codex plugin add ywc-agent-toolkit@ywc-agent-toolkit" />
</ToolTabsPanel>
</ToolTabs>

1 つ目のコマンドが marketplace source を登録し、2 つ目のコマンドが `ywc-agent-toolkit` を実際にインストールします。Codex で既に marketplace を追加済みなら、`codex plugin marketplace upgrade ywc-agent-toolkit` で最新 snapshot を取得できます。

### 方法 2 — Bash script fallback

Plugin のインストールが難しい環境では、repository を clone してから fallback script を使います。インストール可能な skill/agent の一覧は以下で確認できます。

```bash
bash scripts/install.sh --list
```

<ToolTabs>
<ToolTabsPanel tool="claude-code" label="Claude Code">
<CodeBlock label="claude code" code="bash scripts/install.sh --cc" prompt="$" />
<CodeBlock label="claude code" code="bash scripts/install.sh --cc-agents" prompt="$" />
</ToolTabsPanel>
<ToolTabsPanel tool="codex" label="Codex">
<CodeBlock label="codex" code="bash scripts/install.sh --codex" />
<CodeBlock label="codex" code="bash scripts/install.sh --codex-agents" />
</ToolTabsPanel>
</ToolTabs>

Claude Code と Codex を両方使うなら、まとめてインストールできます。

```bash
bash scripts/install.sh --all
```

## 選択 Tool — ローカル CI レベルの検証(contributor・maintainer 向け推奨)

PR を開く前に GitHub Actions と同水準でローカル検証したい場合は、以下を追加でインストールします。Skill の利用自体には必須ではありません。

```bash
brew install shellcheck
npm install -g markdownlint-cli2
```

`node`、`npm`、`npx` は `markdownlint-cli2`、Playwright、JS/TS cleanup Tool の実行に必要です — version manager(nvm、volta など)でインストールする方が管理しやすくなります。

```bash
node --version
npm --version
npx --version
shellcheck --version
markdownlint-cli2 --version
```

## 選択 Tool — デザイン関連 Skill の準備

デザイン関連 Skill をよく使う予定なら、先に [`impeccable`](https://github.com/pbakaus/impeccable) をインストールしておくことを推奨します。`ywc-design-renew` や `ywc-ui-ux-review` のように UI 品質を扱う Skill は、project のデザインコンテキストと anti-pattern 検出ルールが準備されているほど安定した結果を出しやすくなります。

```bash
npx impeccable install
```

インストール後は Claude Code または Codex を開き直してください。新しい project では、先に `/impeccable init` を実行してデザインコンテキストを作っておくと、以降のデザイン関連 Skill がその基準を参照できます。

## 選択 Tool — 状況別 Language/ドメイン Tool

以下の Tool はすべての project に全体インストールする必要はありません。該当する language や Skill をよく使うときだけ準備すれば十分です。

| 状況 | Tool | 主に使う Skill |
|---|---|---|
| JS/TS dead code cleanup | `knip`、`depcheck`、`ts-prune` | `ywc-refactor-clean` |
| Python cleanup / review | `ruff`、`mypy`、`pyright`、`pytest`、`vulture` | `ywc-impl-review`、`ywc-refactor-clean` |
| Go cleanup / review | `staticcheck`、`golangci-lint`、`govulncheck`、`deadcode` | `ywc-impl-review`、`ywc-refactor-clean` |
| Rust dependency cleanup | `cargo-udeps`、nightly toolchain | `ywc-refactor-clean` |
| E2E test 戦略 | `@playwright/test`、Chromium browser dependency | `ywc-e2e-test-strategy` |
| Security scan | `semgrep`、`gitleaks`、`hadolint`、`trivy` | `ywc-security-audit`、`ywc-impl-review` |
| Performance 調査 | `py-spy`、Chrome DevTools/Lighthouse、`node --prof`、`pprof`、`perf` | `ywc-performance-engineer`、`ywc-impl-review` |

```bash
npx knip
npx depcheck
npx ts-prune
ruff check .
mypy .
pyright
go install golang.org/x/tools/cmd/deadcode@latest
npx playwright install --with-deps chromium
```

## インストール確認 Command

Skill を初めて実行する前に、以下で必須 Tool が正しく認識されているか一度に確認できます。

```bash
git --version
bash --version
jq --version
python3 --version
gh auth status
curl --version
uv --version
rg --version
```

PR ベースの Skill を扱う予定なら、`gh` の状態を別途もう一度確認しておくと安心です。

```bash
gh auth status
gh repo view --json nameWithOwner --jq .nameWithOwner
gh pr checks --watch
```

---

[← 前: 13. 全 Skill リファレンス](./13-skill-reference.md) · [目次に戻る »](./README.md)
