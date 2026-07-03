[Back to table of contents](./README.md)

# 06. Finish automatically from one goal (ywc-agentic)

## When to use this flow

[04](./04-general-cycle-small.md) and [05](./05-general-cycle-medium-large.md) are **manual control** flows where the user invokes each step one by one (`ywc-plan` -> ... -> executor). `ywc-agentic` takes one natural-language goal and automatically repeats the full pipeline as a **Plan -> Execute -> Evaluate -> Repeat** loop until verification passes or the iteration limit is reached, without human intervention.

- If you want to give one goal instead of manually tracking the next skill every time -> this page
- If you want direct control at the Task level, deciding which task runs when -> use the executor directly from [05](./05-general-cycle-medium-large.md)
- If you want to run an existing `tasks/` backlog as-is without Task decomposition -> invoke `ywc-sequential-executor` / `ywc-parallel-executor` directly, not agentic

## What it automates

```
Goal -> [Plan -> Execute -> Evaluate -> Repeat] -> Result
```

Internally, it orchestrates the existing `ywc-*` skills as-is. It does not have a separate code generation logic.

| Phase | What happens |
|---|---|
| Plan | Create a plan with `ywc-plan --non-interactive` (for Small: `plan.md`; for Medium/Large: converge the spec to `DONE` with `ywc-spec-ready`) |
| Task | Medium/Large only: decompose with `ywc-task-generator`, then automatically choose an executor based on `dependency-graph.md` |
| Execute | For Small, run `ywc-code-gen`; for Medium/Large, run the executor in `--local-merge` mode for fast iteration without PRs |
| Evaluate | Review only the current iteration's diff with `ywc-impl-review`, then verify lint/typecheck/test/build with `ywc-verify-done` |
| Repeat | If verification fails, replan with `ywc-plan --update-spec` and repeat up to the `--max-iterations` limit |

**Success Oracle** - At every run, it defines in advance what makes the work finished in a falsifiable way and carries that definition through the process: Target / Quality threshold / Evidence required / Stop condition. A Pass is valid only when `ywc-impl-review` returns `DONE` **and** `ywc-verify-done` is green. If review is `DONE` but tests are red, the run still fails.

## Example run

**Give one natural-language goal (default, up to 3 iterations)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;Add automatic retry logic for payment failures&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;Add automatic retry logic for payment failures&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**Increase the iteration limit so it keeps trying longer**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;Add automatic retry logic for payment failures&quot; --max-iterations 5" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;Add automatic retry logic for payment failures&quot; --max-iterations 5" />
  </ToolTabsPanel>
</ToolTabs>
`--max-iterations` is a user-defined safety limit. If the run does not converge, the agent never raises the limit on its own.

**Explicitly choose the executor**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;Add a notification settings screen and API&quot; --executor sequential" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;Add a notification settings screen and API&quot; --executor sequential" />
  </ToolTabsPanel>
</ToolTabs>
The default `auto` inspects `dependency-graph.md` and chooses sequential or parallel automatically.

**Resume an interrupted run**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic --resume" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic --resume" />
  </ToolTabsPanel>
</ToolTabs>
If unfinished tasks remain in `tasks/`, it skips the Plan Phase and resumes from that point.

**Preview the phases without actually running them**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;Add automatic retry logic for payment failures&quot; --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;Add automatic retry logic for payment failures&quot; --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

## It stops when the goal is ambiguous

"Runs autonomously" does not mean "fills in blanks on its own." Before the Plan Phase, it classifies the goal and stops first if it is ambiguous:

| Goal state | Behavior |
|---|---|
| Specific (what/where/done condition are all present) | Proceed immediately |
| Missing only Why (implementation method and done condition are clear) | Proceed, but mark as defaulted |
| Ambiguous (no done condition, or multiple interpretations possible) | Stop with `NEEDS_CONTEXT`; if conversation is available, guide to `ywc-brainstorm` |
| Risky/irreversible (auth, payment, permissions, data deletion, schema migration) | Must pass `ywc-confidence-gate` before proceeding |

## When you get blocked at each step

| Situation | Action |
|---|---|
| It cannot even start and returns `NEEDS_CONTEXT` | The goal is ambiguous - rewrite it more specifically, or use `ywc-brainstorm` first for an interactive clarification |
| `BLOCKED` (merge conflict, hard CI error) | It does not attempt automatic recovery - read the content recorded in `tasks/agentic-log.md`, resolve directly, then rerun |
| Iteration limit (`--max-iterations`) is reached | Ends as `DONE_WITH_CONCERNS`, with remaining CRITICAL/HIGH findings listed - fix directly or raise the limit and rerun |
| Replanning keeps returning to the same scope | Treated as a recursion guard stall and automatically stopped - the spec or goal itself needs another look |

## What to check after completion

- `tasks/agentic-log.md` - phase, pass/fail, findings, and Success Oracle for each iteration are recorded append-only
- If repeated CRITICAL/HIGH findings existed, they are marked as `Learning candidate` in the completion report - review them and, if desired, register them manually with `ywc-review-learnings` (they are not recorded automatically)

---

[Previous: 05. Handling work split into multiple Tasks](./05-general-cycle-medium-large.md) - [Next: 07. Starting a new Project](./07-starting-a-new-project.md)
