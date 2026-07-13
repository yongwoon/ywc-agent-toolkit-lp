[Back to table of contents](./README.md)

# 04. Handling a small change (general cycle - small)

## When to use this flow

When `ywc-plan` judges a request as **Small**, it automatically enters this path. The decision criterion is "can this finish as a single PR without Task decomposition?" If any item below applies, it is elevated to Medium/Large instead of Small (see [05](./05-general-cycle-medium-large.md)).

- Includes a DB migration
- Introduces a new Library/Framework
- Spans multiple subsystems

## Overall flow

```
ywc-plan -> ywc-code-gen -> ywc-impl-review -> ywc-create-pr
```

| Step | Skill | Role |
|---|---|---|
| 1 | `ywc-plan` | Analyze the request and create `plan.md` (What / Why / Out of Scope / Done When) |
| 2 | `ywc-code-gen` | Generate Backend + Frontend + QA code in parallel |
| 3 | `ywc-impl-review` | Final code review before opening a PR |
| 4 | `ywc-create-pr` | PR creation -> CI -> Bot Review check |

> **Note**: The Small flow has `ywc-plan` produce `plan.md` (not a spec document) directly, so `ywc-spec-ready` - which operates on a spec document - is not part of this path. `ywc-spec-ready` is the spec-convergence step of the Medium/Large flow (see [05](./05-general-cycle-medium-large.md)).
>
> **Note**: `ywc-code-gen` does not have an automatic review flag such as `--review`. If you skip step 3 (`ywc-impl-review`), the PR is opened without code review, so this flow must run it explicitly. Executors in the Medium/Large flow can automate this step with the `--review` flag - see [05](./05-general-cycle-medium-large.md).

## Example run

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan Login failure error messages are too generic to understand the cause. Want to show specific reasons like account locked / typo / not signed up" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan Login failure error messages are too generic to understand the cause. Want to show specific reasons like account locked / typo / not signed up" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

If Bot review comments, failed CI, or merge-readiness issues remain, continue with `ywc-handle-pr-reviews <pr-number>`. The Small flow is based on `plan.md`, so there is no `tasks/<task-name>/` directory and it does not fit `ywc-finish-branch`'s task completion handling.

## When you get blocked at each step

| Situation | Action |
|---|---|
| `ywc-plan` judges the work as Medium instead of Small | This is normal - move to [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) |
| `ywc-code-gen` returns `BLOCKED` | The spec may be unclear or project context could not be read - check the reported blocker |
| `ywc-impl-review` returns `DONE_WITH_CONCERNS` | If it is a correctness issue, fix and rerun; if it is an observation, record it in the PR description and proceed |
| The PR fails CI | `ywc-create-pr` or `ywc-handle-pr-reviews` checks the failure log and attempts fixes up to two times - if it still fails, the issue is surfaced as `DONE_WITH_CONCERNS` or `BLOCKED` |

---

[Previous: 03. Ship your first feature in 5 minutes](./03-quickstart.md) - [Next: 05. Handling work split into multiple Tasks](./05-general-cycle-medium-large.md)
