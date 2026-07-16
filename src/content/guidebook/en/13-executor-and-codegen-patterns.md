[Back to table of contents](./README.md)

# 16. Executor / Code-gen Prompt patterns

`ywc-sequential-executor`, `ywc-parallel-executor`, and `ywc-code-gen` are the three Skills whose many options make you repeatedly look up exact syntax. This page organizes examples by **"what you are trying to do now"**, not by Skill name. Find your task and copy the command as-is.

## Shared concept: grouping multiple Tasks into one PR (`--aggregate-pr`, `--group-name`)

`--aggregate-pr` and `--group-name` work as the **same concept** in both `ywc-sequential-executor` and `ywc-parallel-executor`. Once you understand it here, you can apply all examples in the two Skill sections below.

**Without `--aggregate-pr` (default behavior)**: each Task gets its own feature branch and PR. If you process 5 Tasks, you get 5 PRs.

**With `--aggregate-pr`**: all Tasks are merged onto one shared branch, either in sequence (sequential) or by wave (parallel), and after the whole batch finishes, one PR is opened from that shared branch. From a reviewer's point of view, it looks like "one complete batch" rather than "several related changes."

| Use it when | Do not use it when |
|---|---|
| You want to group strongly related Tasks into one logical deployment unit (for example, 5 Tasks for notification API + UI + migration) | Each Task needs independent review - in that case, the default behavior (1 PR per Task) is correct |
| You want to reduce PR count and review fatigue | You want to identify which Task failed directly at the PR level |

**Set the shared branch name directly with `--group-name`.** If omitted, it is generated automatically as `<base-branch>-<timestamp>`, but that makes it harder to tell later which branch represented which work. A meaningful explicit name is recommended.

| Skill | Shared branch name format |
|---|---|
| `ywc-sequential-executor --aggregate-pr --group-name <name>` | `work/<name>` |
| `ywc-parallel-executor --aggregate-pr --group-name <name>` | `aggregate/<name>` |

Only the branch name prefix differs (`work/` vs `aggregate/`); the operating principle is the same: each Task is merged locally into the shared branch, and at the end one PR is automatically created from that branch to the base, including CI/bot review/merge handling. **This shared branch is not the real base branch** - the base is untouched until the final PR is merged.

## ywc-sequential-executor - when you want to run Tasks in order

> **Note**: `ywc-sequential-executor` itself has no separate `--tdd` flag. Each Task's implementation step internally follows the same default TDD gate as `ywc-code-gen` (confirming a failing test before implementation). If you need the full RED → GREEN → REFACTOR ritual with per-stage checkpoint commits, use the `--tdd` flag from the `ywc-code-gen` section below and include it explicitly in that Task's implementation request.

**Run one Task with defaults**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
</ToolTabs>
Default `normal-pr` mode automatically handles PR creation -> CI -> bot review -> merge.

**Automatically run code review before opening the PR**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>

**Run multiple Tasks at once and receive the PR description in Japanese**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
</ToolTabs>

**Finish quickly with local merge, without a PR**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
</ToolTabs>
In PR mode, CI runs tests for you. With `--local-merge`, there is no remote CI, so it is better to require passing local tests before merge with `--run-tests-locally`.

**Deliver multiple Tasks as one PR (`--aggregate-pr`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
Tasks are stacked sequentially on one `work/project-health` branch and delivered as **one** PR. See the "Shared concept" section above for the full `--aggregate-pr` and `--group-name` model.

**Create only a PR and let a human merge later**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>

**You do not know what to run; preview the plan first**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
</ToolTabs>
If no Task is specified, it automatically detects the next executable target from `dependency-graph` and prints only the execution plan (nothing actually runs).

**Run in isolation so it does not interfere with other work in the main checkout (`--worktree`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
</ToolTabs>

`--worktree` runs the entire range **inside one git worktree**. The original clone is left untouched so you can continue other work. The key point is that this is **run-level isolation**: one worktree wraps the whole range, and Tasks inside it still run sequentially. (By contrast, `ywc-parallel-executor` creates a separate worktree **per Task** - see the parallel executor section below.)

- It is an **independent flag**. It is not mutually exclusive with the four delivery modes (`normal-pr` / `--local-merge` / `--draft` / `--aggregate-pr`) or `--review`; you can combine it freely. Turning `--worktree` on or off does not change the delivery mode itself.
- **Post-completion handling depends on delivery mode:**
  - `normal-pr` / `--local-merge` / `--draft` combinations -> when execution finishes (Completion Status `DONE`), the worktree is deleted, but the **integration branch is preserved**. The report includes a note that "the integration branch has not yet been merged to trunk," so you must open the `integration/run-<slug> -> trunk` PR yourself with `ywc-create-pr` - it is not opened automatically.
  - Used with `--aggregate-pr` -> the manual step above is unnecessary. The `work/<name>` branch is created inside the worktree, and the `work -> base` PR is opened automatically at the end.
- **If it fails midway (`BLOCKED` / `DONE_WITH_CONCERNS`)**, the worktree is not deleted and remains in place. You can later enter the path printed in the report and resume.
- With `--dry-run`, it does not create an actual worktree; it only previews which path and name would be used:
  <ToolTabs>
    <ToolTabsPanel tool="claude-code" label="Claude Code">
      <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
    <ToolTabsPanel tool="codex" label="Codex">
      <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
  </ToolTabs>

**`--worktree` + `--aggregate-pr` - isolated execution and single-PR delivery at the same time**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
This is the most complete combination when you want to leave the main checkout untouched while bundling multiple Tasks into one PR through deployment.

> **Note**: `--local-merge` / `--draft` / `--skip-ci-wait` / `--aggregate-pr` are mutually exclusive. If you use two or more together, execution stops and asks for clarification. `--review` and `--worktree` can be combined with any of those modes.

## ywc-parallel-executor - when you want to run independent Tasks concurrently

**Run independent Tasks in parallel, creating and merging one PR per Task**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
</ToolTabs>
They run concurrently by wave, and each Task independently completes PR creation -> CI -> bot review -> **merge**.

**Quickly local-merge each Task without PRs**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
</ToolTabs>

**Run all Tasks in parallel and deliver them as one PR (`--aggregate-pr`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
</ToolTabs>
Tasks are stacked by wave on one `aggregate/payments` branch and delivered as **one** PR. See the "Shared concept" section at the top of this page for the full `--aggregate-pr` and `--group-name` model. It is exactly the same concept as `ywc-sequential-executor`, with only the shared branch prefix changing from `work/` to `aggregate/`.

**After all work completes, let a human review and merge everything at once**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>
After all waves complete, one draft PR is created and merge is manual.

> **Note**: If none of `--local-merge` / `--draft` / `--per-task-pr` / `--aggregate-pr` is specified, it asks which of the four modes you want instead of silently choosing a default. `--review` can be combined with any mode. (For reference, `ywc-parallel-executor` has no separate `--worktree` flag because per-Task worktree isolation is this Skill's default behavior.)

## ywc-code-gen - when you want to generate code directly without Task decomposition

**Generate Backend + Frontend + QA at once**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**Build carefully with TDD for sensitive functionality such as payment/auth**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
</ToolTabs>
Keywords such as `payment` are automatically classified as `critical`, which forbids gray-box delegation (checking only interfaces without reading internal code). `--tdd` enforces RED -> GREEN -> REFACTOR commit boundaries.

**You already checked reusable code and want to skip duplicate detection**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
</ToolTabs>

> **Note**: `--spec` and `--feature` are both required. If either is empty, it stops with `NEEDS_CONTEXT`. If the work already has a `tasks/` directory, use `ywc-sequential-executor` / `ywc-parallel-executor` instead of this Skill.

---

[Previous: 14. Managing Cloud Infrastructure](./17-infrastructure-and-cloud.md) - [Next: 17. Full Skill Reference](./14-skill-reference.md)
