[Back to table of contents](./README.md)

# 13. Managing Code Structure and Maintainability

## When to use these 4 Skills

All four Skills start from the same symptom — "the code is bad" — but answer different questions. Pick based on which question you're actually asking right now.

| What you want to do | Question | Skill to use |
|---|---|---|
| Delete unused functions/exports/dependencies | "Is this code actually used?" | `ywc-refactor-clean` |
| Shallow modules are tangled and you want to restructure them | "Does this structure need to become a deep module?" | `ywc-improve-architecture` |
| Get implementation quality and spec conformance reviewed outside the PR cycle | "Is this implementation sound from an architecture/design/devex/security/QA standpoint?" | `ywc-impl-review` |
| Measure how expensive this code is for an agent to change before touching it | "How many tokens would an agent need to spend to change this?" | `ywc-agent-legibility-audit` |

## `ywc-refactor-clean` — Dead Code Cleanup

Finds old dead code (unused functions/exports/dependencies) with tools like knip / depcheck / ts-prune and safely deletes it.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
</ToolTabs>

`--tier safe` only deletes items where the detection tool, grep, and tests all three agree the code is unused. It does not restructure anything — that's `ywc-improve-architecture`'s job.

## `ywc-improve-architecture` — Shallow → Deep Module Restructuring

Restructures a tangled pile of shallow modules into deep modules (a simple interface hiding a complete implementation), behavior-preserving and one reviewable unit at a time.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

Check the Opportunity Backlog first with `--dry-run`, then drop the flag and run the actual consolidation once it looks right. You cannot target the whole codebase at once (Scope Gate) — you must scope it to a module/directory.

## `ywc-impl-review` — Implementation Quality Review (standalone)

Runs a parallel 5-axis review: Architecture / Design / Devex / Security / QA. This is already built into the pre-PR verification step in [04](./04-general-cycle-small.md) and [05](./05-general-cycle-medium-large.md), but you can also run it standalone against existing code outside those flows.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
</ToolTabs>

It is a read-only analysis that does not change code — any fix for a found item is dispatched separately to the Backend/Frontend agent.

## `ywc-agent-legibility-audit` — Legibility From the Agent's Perspective

Measures — not correctness or security, but "how many tokens it costs an agent to safely change this code" — based on the deep/shallow module ratio and how clearly the change point is named.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
</ToolTabs>

A read-only report. It does not restructure anything itself; findings route to `ywc-improve-architecture` (shallow→deep restructuring) or `ywc-refactor-clean` (dead code deletion).

## How the 4 Skills work together

A common order for cleaning up an unfamiliar or aging codebase that feels too risky to touch:

**Step 1: Measure first — `ywc-agent-legibility-audit`**

Before changing anything, measure read-only where the cost-to-benefit ratio of touching the code is worst. It points to the spots with the worst legibility based on the deep/shallow module ratio and how clearly change points are named.

**Step 2: Start with the safest move — `ywc-refactor-clean`**

If the measurement shows dead code is dragging legibility down, handle this most-reversible step first. It only deletes what the detection tool, grep, and tests all three agree on, so the risk is low.

**Step 3: Restructure the shape itself — `ywc-improve-architecture`**

If a pile of shallow modules remains after removing dead code, restructure it into deep modules now — behavior-preserving, one unit at a time, behind a green test suite.

**Step 4: Final verification — `ywc-impl-review`**

Once the restructuring is done, run a 5-axis review before opening the PR to catch anything left over. Findings here can loop back into Step 1 (`ywc-agent-legibility-audit`) or Steps 2–3.

---

[Previous: 12. Debugging and incident postmortems](./12-debugging-and-incident-postmortem.md) - [Next: 14. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)
