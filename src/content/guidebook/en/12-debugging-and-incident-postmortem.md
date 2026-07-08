[Back to table of contents](./README.md)

# 12. Debugging and incident postmortems

## When to use this flow

The two Skills answer different questions. Choose based on where you are in the incident.

| What you want to do | Question | Skill to use |
|---|---|---|
| You can't figure out why a bug keeps happening | "What is actually causing this to fail?" | `ywc-debug-rootcause` |
| A Production incident already happened and you need a written record | "What do we tell the team (and customers)?" | `ywc-incident-postmortem` |

## `ywc-debug-rootcause` - Root-cause investigation

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-debug-rootcause The payment webhook is sometimes processed twice. I can't find the cause" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-debug-rootcause The payment webhook is sometimes processed twice. I can't find the cause" />
  </ToolTabsPanel>
</ToolTabs>

This prevents patches that only address symptoms and forces a four-step root-cause investigation. If fixes fail at the same point three or more times, it guides you to question the architecture itself.

## `ywc-incident-postmortem` - Postmortem authoring

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
</ToolTabs>

`--client` additionally creates a customer-facing summary that omits internal details.

## How the two connect

`ywc-debug-rootcause` runs while the incident is still live and answers *why* it happened. `ywc-incident-postmortem` runs after the fix has shipped and turns that root cause into a timeline, impact assessment, and prevention action items — it can take a root-cause verdict as one input to its own analysis rather than repeating the investigation from scratch. Use them in that order: find the cause first, then write it up.

---

[Previous: 11. Reviewing and improving design](./11-design-review.md) - [Next: 13. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md)
