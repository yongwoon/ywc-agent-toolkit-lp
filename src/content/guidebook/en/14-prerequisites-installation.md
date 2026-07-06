[Back to table of contents](./README.md)

# 14. Prerequisites and installation

To use `ywc-*` Skills reliably, a few tools need to be in place beforehand. Installing via the Plugin marketplace or Codex plugin handles file copying and registration automatically, but when a Skill actually **runs**, it needs the tools below available on your system. The order is: **① install the required tools → ② install ywc-agent-toolkit itself (Claude Code / Codex)** — everything below that is an optional tool you prepare as needed.

## Required tools

| Tool | Why it's needed | macOS install example |
|---|---|---|
| `git` | clone, branch, worktree, commit, PR workflow | Usually preinstalled |
| `bash` (3.2+) | Runs `install.sh` and hook scripts | `brew install bash` |
| `jq` | Processes plugin manifest, GitHub API, and hook registry JSON | `brew install jq` |
| `python3` (3.9+) | Runs executor helpers, Dependabot grouping, eval scripts | `brew install python3` |
| `gh` | Creates PRs, checks PR status, handles review comments, merges | `brew install gh` |
| `curl` | Translation script, API calls | Usually preinstalled |
| `uv` | Runs Claude Code Python hooks | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| `ripgrep` (`rg`) | Repository scan, onboarding, validation search | `brew install ripgrep` |

Of these, only `uv` is **Claude Code–only** — the rest are required for both Claude Code and Codex.

Installing `gh` isn't enough on its own — it must be authenticated before Skills that handle PRs (`ywc-create-pr`, `ywc-handle-pr-reviews`, `ywc-merge-dependabot`, etc.) work correctly.

```bash
gh auth login
gh auth setup-git
gh auth status
```

### Environment variables (only when you need them)

Everything works with the defaults; the following are optional overrides for when you want to change a location or behavior.

| Variable | Purpose |
|---|---|
| `CODEX_HOME` | Overrides where Codex Skills and Agents are installed |
| `CLAUDE_SKILLS_DIR` | Overrides where Claude Code Skills are installed |
| `CLAUDE_AGENTS_DIR` | Overrides where Claude Code Agents are installed |
| `ANTHROPIC_API_KEY` | Runs the Tier 2 translation script |
| `CCH_SLA_WEBHOOK` | Slack notification hook for Claude Code permission waits |

## Installing ywc-agent-toolkit

Pick the tab for the tool you use. Neither path has any prerequisites.

### Method 1 — Plugin marketplace (recommended)

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

The first command registers the marketplace source, and the second actually installs `ywc-agent-toolkit`. If you've already added the marketplace in Codex, run `codex plugin marketplace upgrade ywc-agent-toolkit` to pull the latest snapshot.

### Method 2 — Bash script fallback

In environments where a plugin install is hard, clone the repository and use the fallback script. You can check the list of installable skills/agents below.

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

If you use both Claude Code and Codex, install both at once.

```bash
bash scripts/install.sh --all
```

## Optional tools — Local CI-level validation (recommended for contributors / maintainers)

If you want to validate at the same level as GitHub Actions locally before opening a PR, install the following. These are not required to use the Skills themselves.

```bash
brew install shellcheck
npm install -g markdownlint-cli2
```

`node`, `npm`, and `npx` are needed to run `markdownlint-cli2`, Playwright, and JS/TS cleanup tools — installing them via a version manager (nvm, volta, etc.) is easier to maintain.

```bash
node --version
npm --version
npx --version
shellcheck --version
markdownlint-cli2 --version
```

## Optional tools — Preparing design-related Skills

If you plan to use design-related Skills often, install [`impeccable`](https://github.com/pbakaus/impeccable) first. Skills such as `ywc-design-renew` and `ywc-ui-ux-review` work better when the project already has design context and anti-pattern detection rules available.

```bash
npx impeccable install
```

After installation, reopen Claude Code or Codex. For a new project, run `/impeccable init` first so later design-related Skills can use that design context.

## Optional tools — Situational language/domain tools

You don't need to install the tools below globally for every project. Prepare them only when you use the relevant language or Skill frequently.

| Situation | Tools | Skill mostly used |
|---|---|---|
| JS/TS dead code cleanup | `knip`, `depcheck`, `ts-prune` | `ywc-refactor-clean` |
| Python cleanup / review | `ruff`, `mypy`, `pyright`, `pytest`, `vulture` | `ywc-impl-review`, `ywc-refactor-clean` |
| Go cleanup / review | `staticcheck`, `golangci-lint`, `govulncheck`, `deadcode` | `ywc-impl-review`, `ywc-refactor-clean` |
| Rust dependency cleanup | `cargo-udeps`, nightly toolchain | `ywc-refactor-clean` |
| E2E test strategy | `@playwright/test`, Chromium browser dependency | `ywc-e2e-test-strategy` |
| Security scan | `semgrep`, `gitleaks`, `hadolint`, `trivy` | `ywc-security-audit`, `ywc-impl-review` |
| Performance investigation | `py-spy`, Chrome DevTools/Lighthouse, `node --prof`, `pprof`, `perf` | `ywc-performance-engineer`, `ywc-impl-review` |

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

## Verification commands

Before running a Skill for the first time, you can check that the required tools are all recognized at once.

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

If you plan to work with PR-based Skills, it's worth checking `gh` status once more separately.

```bash
gh auth status
gh repo view --json nameWithOwner --jq .nameWithOwner
gh pr checks --watch
```

---

[Previous: 13. Full Skill Reference](./13-skill-reference.md) - [Back to table of contents](./README.md)
