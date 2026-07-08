[Back to table of contents](./README.md)

# 15. 前置条件与安装

要稳定使用 `ywc-*` Skill，需要预先准备好一些 Tool。通过 Plugin marketplace 或 Codex plugin 安装时，文件复制和注册会自动处理，但当 Skill **实际运行**时，以下 Tool 需要存在于你的系统中才能正常工作。顺序如下 —— **① 安装必需 Tool → ② 安装 ywc-agent-toolkit 本身（Claude Code / Codex）** → 之后是根据情况准备的可选 Tool。

## 必需 Tool

| Tool | 需要的原因 | macOS 安装示例 |
|---|---|---|
| `git` | clone、branch、worktree、commit、PR workflow | 通常已预装 |
| `bash`（3.2 及以上） | 运行 `install.sh`、hook script | `brew install bash` |
| `jq` | 处理 plugin manifest、GitHub API、hook registry JSON | `brew install jq` |
| `python3`（3.9 及以上） | 运行 executor helper、Dependabot grouping、eval script | `brew install python3` |
| `gh` | 创建 PR、查看 PR check、处理 review comment、merge | `brew install gh` |
| `curl` | translation script、API 调用 | 通常已预装 |
| `uv` | 运行 Claude Code Python hook | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| `ripgrep`（`rg`） | repository scan、onboarding、validation search | `brew install ripgrep` |

其中只有 `uv` 是 **Claude Code 专用**，其余在 Claude Code 和 Codex 中都是共同必需的。

仅安装 `gh` 是不够的，必须完成认证，处理 PR 的 Skill（`ywc-create-pr`、`ywc-handle-pr-reviews`、`ywc-merge-dependabot` 等）才能正常工作。

```bash
gh auth login
gh auth setup-git
gh auth status
```

### 环境变量（仅在需要时设置）

默认值下大部分功能都能正常工作，以下是想要改变位置或行为时才需要设置的可选项。

| 变量 | 用途 |
|---|---|
| `CODEX_HOME` | 覆盖 Codex Skill 和 Agent 的安装位置 |
| `CLAUDE_SKILLS_DIR` | 覆盖 Claude Code Skill 的安装位置 |
| `CLAUDE_AGENTS_DIR` | 覆盖 Claude Code Agent 的安装位置 |
| `ANTHROPIC_API_KEY` | 运行 Tier 2 翻译 script |
| `CCH_SLA_WEBHOOK` | Claude Code 权限等待的 Slack 通知 hook |

## 安装 ywc-agent-toolkit

请选择你正在使用的 Tool 标签页。两种路径都没有前提条件。

### 方式 1 — Plugin 市场（推荐）

<ToolTabs>
<ToolTabsPanel tool="claude-code" label="Claude Code">
<CodeBlock label="claude code" code="plugin marketplace add yongwoon/ywc-agent-toolkit" />
<CodeBlock label="claude code" code="plugin install ywc-agent-toolkit@ywc-agent-toolkit" />
</ToolTabsPanel>
<ToolTabsPanel tool="codex" label="Codex">
<CodeBlock label="codex" code="codex plugin marketplace add yongwoon/ywc-agent-toolkit" />
<CodeBlock label="codex" code="codex plugin add ywc-agent-toolkit@ywc-agent-toolkit" />
</ToolTabsPanel>
</ToolTabs>

第一条命令注册 marketplace source，第二条命令实际安装 `ywc-agent-toolkit`。如果你在 Codex 中已经添加过 marketplace，可以用 `codex plugin marketplace upgrade ywc-agent-toolkit` 获取最新 snapshot。

### 方式 2 — Bash 脚本 fallback

在难以安装 plugin 的环境中，clone 仓库后使用 fallback script。可安装的 skill/agent 列表可以通过以下命令查看。

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

如果同时使用 Claude Code 和 Codex，可以一次性安装。

```bash
bash scripts/install.sh --all
```

## 可选 Tool — 本地 CI 级别验证（推荐贡献者/维护者使用）

如果想在打开 PR 前以与 GitHub Actions 相同的标准在本地预先验证，请额外安装以下内容。这些不是使用 Skill 本身所必需的。

```bash
brew install shellcheck
npm install -g markdownlint-cli2
```

`node`、`npm`、`npx` 是运行 `markdownlint-cli2`、Playwright、JS/TS cleanup Tool 所需要的 —— 建议用 version manager（nvm、volta 等）安装，更便于管理。

```bash
node --version
npm --version
npx --version
shellcheck --version
markdownlint-cli2 --version
```

## 可选 Tool — 准备设计相关 Skill

如果你经常使用设计相关 Skill，建议先安装 [`impeccable`](https://github.com/pbakaus/impeccable)。像 `ywc-design-renew`、`ywc-ui-ux-review` 这类处理 UI 质量的 Skill，在项目已有设计上下文和 anti-pattern 检测规则时，结果会更稳定。

```bash
npx impeccable install
```

安装后重新打开 Claude Code 或 Codex。对于新项目，先运行 `/impeccable init` 创建设计上下文，之后的设计相关 Skill 就可以参考这些标准。

## 可选 Tool — 按场景选择的语言/领域 Tool

以下 Tool 不需要在每个项目中全局安装，只在你经常使用相应语言或 Skill 时准备即可。

| 场景 | Tool | 主要使用的 Skill |
|---|---|---|
| JS/TS 无用代码清理 | `knip`、`depcheck`、`ts-prune` | `ywc-refactor-clean` |
| Python 清理/审查 | `ruff`、`mypy`、`pyright`、`pytest`、`vulture` | `ywc-impl-review`、`ywc-refactor-clean` |
| Go 清理/审查 | `staticcheck`、`golangci-lint`、`govulncheck`、`deadcode` | `ywc-impl-review`、`ywc-refactor-clean` |
| Rust 依赖清理 | `cargo-udeps`、nightly toolchain | `ywc-refactor-clean` |
| E2E 测试策略 | `@playwright/test`、Chromium browser dependency | `ywc-e2e-test-strategy` |
| 安全扫描 | `semgrep`、`gitleaks`、`hadolint`、`trivy` | `ywc-security-audit`、`ywc-impl-review` |
| 性能调查 | `py-spy`、Chrome DevTools/Lighthouse、`node --prof`、`pprof`、`perf` | `ywc-performance-engineer`、`ywc-impl-review` |

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

## 安装确认命令

在第一次运行 Skill 之前，可以用以下命令一次性确认必需 Tool 是否都能正确识别。

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

如果你打算使用基于 PR 的 Skill，最好单独再确认一次 `gh` 的状态。

```bash
gh auth status
gh repo view --json nameWithOwner --jq .nameWithOwner
gh pr checks --watch
```

---

[Previous: 15. 完整 Skill 参考](./14-skill-reference.md) - [返回目录](./README.md)
