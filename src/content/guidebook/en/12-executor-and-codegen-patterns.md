[Back to table of contents](./README.md)

# 12. Executor / Code-gen Prompt patterns

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

**Run one Task with defaults**
```
ywc-sequential-executor 000020-010
```
Default `normal-pr` mode automatically handles PR creation -> CI -> bot review -> merge.

**Automatically run code review before opening the PR**
```
ywc-sequential-executor 000020-010 --review --base-branch develop
```

**Run multiple Tasks at once and receive the PR description in Japanese**
```
ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja
```

**Finish quickly with local merge, without a PR**
```
ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally
```
In PR mode, CI runs tests for you. With `--local-merge`, there is no remote CI, so it is better to require passing local tests before merge with `--run-tests-locally`.

**Deliver multiple Tasks as one PR (`--aggregate-pr`)**
```
ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review
```
Tasks are stacked sequentially on one `work/project-health` branch and delivered as **one** PR. See the "Shared concept" section above for the full `--aggregate-pr` and `--group-name` model.

**Create only a PR and let a human merge later**
```
ywc-sequential-executor 000020-010 --draft
```

**You do not know what to run; preview the plan first**
```
ywc-sequential-executor --dry-run
```
If no Task is specified, it automatically detects the next executable target from `dependency-graph` and prints only the execution plan (nothing actually runs).

**Run in isolation so it does not interfere with other work in the main checkout (`--worktree`)**
```
ywc-sequential-executor 000020-010..000025-010 --worktree --review
```

`--worktree` runs the entire range **inside one git worktree**. The original clone is left untouched so you can continue other work. The key point is that this is **run-level isolation**: one worktree wraps the whole range, and Tasks inside it still run sequentially. (By contrast, `ywc-parallel-executor` creates a separate worktree **per Task** - see the parallel executor section below.)

- It is an **independent flag**. It is not mutually exclusive with the four delivery modes (`normal-pr` / `--local-merge` / `--draft` / `--aggregate-pr`) or `--review`; you can combine it freely. Turning `--worktree` on or off does not change the delivery mode itself.
- **Post-completion handling depends on delivery mode:**
  - `normal-pr` / `--local-merge` / `--draft` combinations -> when execution finishes (Completion Status `DONE`), the worktree is deleted, but the **integration branch is preserved**. The report includes a note that "the integration branch has not yet been merged to trunk," so you must open the `integration/run-<slug> -> trunk` PR yourself with `ywc-create-pr` - it is not opened automatically.
  - Used with `--aggregate-pr` -> the manual step above is unnecessary. The `work/<name>` branch is created inside the worktree, and the `work -> base` PR is opened automatically at the end.
- **If it fails midway (`BLOCKED` / `DONE_WITH_CONCERNS`)**, the worktree is not deleted and remains in place. You can later enter the path printed in the report and resume.
- With `--dry-run`, it does not create an actual worktree; it only previews which path and name would be used:
  ```
  ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run
  ```

**`--worktree` + `--aggregate-pr` - isolated execution and single-PR delivery at the same time**
```
ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review
```
This is the most complete combination when you want to leave the main checkout untouched while bundling multiple Tasks into one PR through deployment.

> **Note**: `--local-merge` / `--draft` / `--skip-ci-wait` / `--aggregate-pr` are mutually exclusive. If you use two or more together, execution stops and asks for clarification. `--review` and `--worktree` can be combined with any of those modes.

## ywc-parallel-executor - when you want to run independent Tasks concurrently

**Run independent Tasks in parallel, creating and merging one PR per Task**
```
ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review
```
They run concurrently by wave, and each Task independently completes PR creation -> CI -> bot review -> **merge**.

**Quickly local-merge each Task without PRs**
```
ywc-parallel-executor 000020-010..000025-010 --local-merge --review
```

**Run all Tasks in parallel and deliver them as one PR (`--aggregate-pr`)**
```
ywc-parallel-executor --all --aggregate-pr --group-name payments --review
```
Tasks are stacked by wave on one `aggregate/payments` branch and delivered as **one** PR. See the "Shared concept" section at the top of this page for the full `--aggregate-pr` and `--group-name` model. It is exactly the same concept as `ywc-sequential-executor`, with only the shared branch prefix changing from `work/` to `aggregate/`.

**After all work completes, let a human review and merge everything at once**
```
ywc-parallel-executor 000020-010..000025-010 --draft
```
After all waves complete, one draft PR is created and merge is manual.

> **Note**: If none of `--local-merge` / `--draft` / `--per-task-pr` / `--aggregate-pr` is specified, it asks which of the four modes you want instead of silently choosing a default. `--review` can be combined with any mode. (For reference, `ywc-parallel-executor` has no separate `--worktree` flag because per-Task worktree isolation is this Skill's default behavior.)

## ywc-code-gen - when you want to generate code directly without Task decomposition

**Generate Backend + Frontend + QA at once**
```
ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature "improve architecture skill docs"
```

**Build carefully with TDD for sensitive functionality such as payment/auth**
```
ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature "payment webhook hardening" --tdd
```
Keywords such as `payment` are automatically classified as `critical`, which forbids gray-box delegation (checking only interfaces without reading internal code). `--tdd` enforces RED -> GREEN -> REFACTOR commit boundaries.

**You already checked reusable code and want to skip duplicate detection**
```
ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature "notification settings UI" --skip-reuse-check
```

> **Note**: `--spec` and `--feature` are both required. If either is empty, it stops with `NEEDS_CONTEXT`. If the work already has a `tasks/` directory, use `ywc-sequential-executor` / `ywc-parallel-executor` instead of this Skill.

---

[Previous: 11. Reviewing and improving design](./11-design-review.md) - [Next: 13. Full Skill Reference](./13-skill-reference.md)
