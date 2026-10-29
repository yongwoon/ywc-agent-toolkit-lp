[Back to table of contents](./README.md)

# 13. Managing Code Structure and Maintainability

## When to use these 2 Skills

Both Skills start from the same symptom — "the code is bad" — but answer different questions. Pick based on which question you're actually asking right now.

| What you want to do | Question | Skill to use |
|---|---|---|
| Delete unused functions/exports/dependencies | "Is this code actually used?" | `ywc-refactor-clean` |
| Get implementation quality and spec conformance reviewed outside the PR cycle | "Is this implementation sound from an architecture/design/devex/security/QA standpoint?" | `ywc-impl-review` |

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

`--tier safe` only deletes items where the detection tool, grep, and tests all three agree the code is unused. The structure itself is not reshaped by this skill — use `ywc-impl-review` to surface architecture/design problems, then fix them through the normal cycle.

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

**Options worth knowing**

- Choose exactly one review target: `--code <path>`, `--git-range <sha>..<sha>`, or `--working-tree` (staged, unstaged, and untracked changes; no commit needed). `--spec` is optional in Claude Code.
- `--profile chill|assertive` (default `chill`): `chill` hides Low/Info style nits; `assertive` shows them. Critical, High, and Medium findings are never hidden.
- `--no-advisor` skips the Phase 2 advisor calls. `--advisor-budget <n>` caps them (default 5).
- `--format html` writes a self-contained report to `claudedocs/` (default `markdown`).
- `--non-interactive` (Claude Code only) skips the learnings-promotion prompt and lists learning candidates in the report instead.

**Independent verification.** Every confirmed Critical or High finding is re-checked once by a fresh reviewer that sees only the `file:line` and the claimed severity. A finding that cannot be reproduced is sent to the Phase 2 advisor (not for Security findings) or marked unverified. At most 20 findings are verified per run.

**Scope guardrail.** The review refuses to start (`NEEDS_CONTEXT`) when more than 200 files or more than 5,000 changed lines are in scope. It reports the counts and the 5 largest files, and asks you to narrow the target. Nothing is sampled or truncated.

## How the 2 Skills work together

A common order for cleaning up an unfamiliar or aging codebase that feels too risky to touch:

**Step 1: Start with the safest move — `ywc-refactor-clean`**

If dead code is dragging legibility down, handle this most-reversible step first. It only deletes what the detection tool, grep, and tests all three agree on, so the risk is low.

**Step 2: Final verification — `ywc-impl-review`**

Before opening the PR, run a 5-axis review to catch anything left over. Findings can loop back into Step 1 (`ywc-refactor-clean`) or into normal implementation, where architecture or design problems are fixed through the regular cycle.

---

[Previous: 12. Debugging and incident postmortems](./12-debugging-and-incident-postmortem.md) - [Next: 14. Managing Cloud Infrastructure](./17-infrastructure-and-cloud.md)
