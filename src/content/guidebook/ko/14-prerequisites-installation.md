[« 목차로 돌아가기](./README.md)

# 14. 사전 준비와 설치

`ywc-*` Skill 을 안정적으로 쓰려면 몇 가지 Tool 이 미리 준비되어 있어야 합니다. Plugin marketplace 나 Codex plugin 으로 설치하면 파일 복사와 등록은 자동으로 처리되지만, Skill 을 **실제로 실행**할 때는 아래 Tool 들이 System 에 있어야 정상 동작합니다. 필수 Tool 과 선택 Tool 을 구분해 정리했습니다.

## 필수 Tool

| Tool | 필요한 이유 | macOS 설치 예 |
|---|---|---|
| `git` | clone, branch, worktree, commit, PR workflow | 보통 기본 설치 |
| `bash` (3.2 이상) | `install.sh`, hook script 실행 | `brew install bash` |
| `jq` | plugin manifest, GitHub API, hook registry JSON 처리 | `brew install jq` |
| `python3` (3.9 이상) | executor helper, Dependabot grouping, eval script 실행 | `brew install python3` |
| `gh` | PR 생성, PR check 조회, review comment 처리, merge | `brew install gh` |
| `curl` | translation script, API 호출 | 보통 기본 설치 |
| `uv` | Claude Code Python hook 실행 | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| `ripgrep` (`rg`) | repository scan, onboarding, validation search | `brew install ripgrep` |

`gh` 는 설치만으로는 부족하고, 인증까지 끝나야 PR 을 다루는 Skill(`ywc-create-pr`, `ywc-handle-pr-reviews`, `ywc-merge-dependabot` 등)이 정상 동작합니다.

```bash
gh auth login
gh auth setup-git
gh auth status
```

### 환경 변수 (필요할 때만)

기본값으로도 대부분 동작하며, 아래는 위치나 동작을 바꾸고 싶을 때만 설정하는 선택 항목입니다.

| 변수 | 용도 |
|---|---|
| `CODEX_HOME` | Codex Skill 과 Agent 설치 위치 override |
| `CLAUDE_SKILLS_DIR` | Claude Code Skill 설치 위치 override |
| `CLAUDE_AGENTS_DIR` | Claude Code Agent 설치 위치 override |
| `ANTHROPIC_API_KEY` | Tier 2 번역 script 실행 |
| `CCH_SLA_WEBHOOK` | Claude Code permission 대기 Slack 알림 hook |

## ywc-agent-toolkit 설치

### Claude Code 플러그인 마켓플레이스 (권장)

```bash
# 마켓플레이스 소스 추가 (최초 1회)
/plugin marketplace add yongwoon/ywc-agent-toolkit
```

명령 실행 후 Plugin UI의 **Marketplaces** 탭에서 **ywc-agent-toolkit**을 설치하세요.
클론이나 bash 없이 `~/.claude/skills/`에 자동 설치됩니다.

### Codex plugin 경로

```bash
codex plugin marketplace add yongwoon/ywc-agent-toolkit
codex plugin add ywc-agent-toolkit@ywc-agent-toolkit
```

이미 marketplace 를 추가했다면 최신 snapshot 으로 갱신합니다.

```bash
codex plugin marketplace upgrade ywc-agent-toolkit
```

### Bash fallback 경로

Plugin 설치가 어려운 환경에서는 repository 를 clone 한 뒤 fallback script 를 사용합니다.

```bash
bash scripts/install.sh --list
bash scripts/install.sh --codex
bash scripts/install.sh --codex-agents
```

Claude Code 까지 함께 쓴다면 다음 중 하나를 선택합니다.

```bash
bash scripts/install.sh --cc
bash scripts/install.sh --cc-agents
bash scripts/install.sh --all
```

## 선택 Tool — 로컬 CI 수준 검증 (기여자 · maintainer 권장)

PR 을 열기 전에 GitHub Actions 와 같은 수준으로 로컬에서 미리 검증하고 싶다면 아래를 추가로 설치합니다. Skill 사용 자체에는 필수가 아닙니다.

```bash
brew install shellcheck
npm install -g markdownlint-cli2
```

`node`, `npm`, `npx` 는 `markdownlint-cli2`, Playwright, JS/TS cleanup Tool 실행에 필요합니다 — version manager(nvm, volta 등)로 설치하는 편이 관리가 쉽습니다.

```bash
node --version
npm --version
npx --version
shellcheck --version
markdownlint-cli2 --version
```

## 선택 Tool — 디자인 관련 Skill 준비

디자인 관련 Skill 을 자주 쓸 계획이라면 [`impeccable`](https://github.com/pbakaus/impeccable) 을 미리 설치해 두는 것을 권장합니다. 특히 `ywc-design-renew`, `ywc-ui-ux-review` 처럼 UI 품질을 다루는 Skill 은 프로젝트의 디자인 컨텍스트와 anti-pattern 검출 기준이 준비되어 있을수록 결과가 안정적입니다.

```bash
npx impeccable install
```

설치 후 Claude Code 또는 Codex 를 다시 열고, 새 프로젝트에서는 `/impeccable init` 으로 디자인 컨텍스트를 먼저 만들어 두면 이후 디자인 관련 Skill 이 그 기준을 참고할 수 있습니다.

## 선택 Tool — 상황별 Language/도메인 Tool

아래 Tool 은 모든 project 에 전역 설치할 필요는 없습니다. 해당 language 나 Skill 을 자주 쓸 때만 준비하면 됩니다.

| 상황 | Tool | 주로 쓰는 Skill |
|---|---|---|
| JS/TS dead code cleanup | `knip`, `depcheck`, `ts-prune` | `ywc-refactor-clean` |
| Python cleanup / review | `ruff`, `mypy`, `pyright`, `pytest`, `vulture` | `ywc-impl-review`, `ywc-refactor-clean` |
| Go cleanup / review | `staticcheck`, `golangci-lint`, `govulncheck`, `deadcode` | `ywc-impl-review`, `ywc-refactor-clean` |
| Rust dependency cleanup | `cargo-udeps`, nightly toolchain | `ywc-refactor-clean` |
| E2E test 전략 | `@playwright/test`, Chromium browser dependency | `ywc-e2e-test-strategy` |
| Security scan | `semgrep`, `gitleaks`, `hadolint`, `trivy` | `ywc-security-audit`, `ywc-impl-review` |
| Performance 조사 | `py-spy`, Chrome DevTools/Lighthouse, `node --prof`, `pprof`, `perf` | `ywc-performance-engineer`, `ywc-impl-review` |

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

## 설치 확인 Command

Skill 을 처음 실행하기 전에, 아래로 필수 Tool 이 제대로 잡히는지 한 번에 확인할 수 있습니다.

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

PR 기반 Skill 을 다룰 예정이라면 `gh` 상태를 별도로 한 번 더 확인해 두면 좋습니다.

```bash
gh auth status
gh repo view --json nameWithOwner --jq .nameWithOwner
gh pr checks --watch
```

---

[← 이전: 13. 전체 Skill 레퍼런스](./13-skill-reference.md) · [목차로 돌아가기 »](./README.md)
