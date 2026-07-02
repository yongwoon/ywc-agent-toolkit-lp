[Back to table of contents](./README.md)

# 05. Handling work split into multiple Tasks (general cycle - medium/large)

## When to use this flow

If any of the following applies, `ywc-plan` routes to this path.

- The change is hard to fit into a single reviewable PR (multiple screens, multiple APIs, multiple subsystems)
- It includes a DB migration (always this path regardless of scale - Safety Invariant)
- It introduces a new Library/Framework (also always this path)

## Overall flow

```
ywc-plan -> ywc-spec-ready -> ywc-task-generator -> ywc-sequential-executor --review or ywc-parallel-executor --review
```

| Step | Skill | Role |
|---|---|---|
| 1 | `ywc-plan` | Analyze the request and create a `docs/ywc-plans/<slug>.md` spec |
| 2 | `ywc-spec-ready` | Automatically repeat `ywc-plan --update-spec` and `ywc-spec-validate` until the spec is `DONE` |
| 3 | `ywc-task-generator` | Decompose the `DONE` spec into dependency-safe Tasks (`tasks/<phase>-<sequence>-<slug>/`) |
| 4 | `ywc-sequential-executor` or `ywc-parallel-executor` | Actually implement Tasks -> PR -> Merge |

**How to choose Sequential vs Parallel**

| Situation | Choice |
|---|---|
| Task order matters, or Tasks depend on one another's outputs | `ywc-sequential-executor` |
| Tasks are independent and grouped into parallelizable waves in `dependency-graph.md` | `ywc-parallel-executor` (isolated with Git Worktrees) |

## Example run

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan 사용자가 알림 종류별로 켜고 끌 수 있는 설정 화면과 API 가 필요함. 이메일/푸시/인앱 3채널 지원" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan 사용자가 알림 종류별로 켜고 끌 수 있는 설정 화면과 API 가 필요함. 이메일/푸시/인앱 3채널 지원" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang korean" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang korean" />
  </ToolTabsPanel>
</ToolTabs>

The execution commands after this have many options, so they are covered on a separate page: [12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md). The simplest starting point is:

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
</ToolTabs>

If you omit the task, it automatically finds the next executable Task from `dependency-graph.md`.

## Always include `--review`

Both executors use the `--review` flag to automatically run `/ywc-impl-review` before PR creation/merge for each Task. Running without this flag is equivalent to completely skipping the review step in the small cycle from [04](./04-general-cycle-small.md). There is no good reason to omit it. (If a Task has `Criticality: critical`, review is forced regardless of the flag.)

## When you get blocked at each step

| Situation | Action |
|---|---|
| `ywc-spec-ready` reaches the iteration limit | A fundamental spec issue is preventing automatic convergence - read the partial report and edit the spec directly |
| `ywc-task-generator` tries to create 20 or more Tasks | This signals that the spec itself is too large - consider splitting the spec first |
| A dependency is not completed during Task execution | The executor stops automatically and reports which Task must precede the current one |

---

[Previous: 04. Handling a small change](./04-general-cycle-small.md) - [Next: 06. Finish automatically from one goal](./06-agentic-autonomous-loop.md)
