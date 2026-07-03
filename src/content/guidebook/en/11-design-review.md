[Back to table of contents](./README.md)

# 11. Reviewing and improving design

## When to use this flow

The two Skills answer different questions. Choose based on the question you are trying to answer.

| What you want to do | Question | Skill to use |
|---|---|---|
| Check whether a screen is easy to use | "Does this screen have any usability / accessibility issues?" | `ywc-ui-ux-review` |
| A screen feels bland or looks AI-generated | "Does this screen have distinctive character?" | `ywc-design-renew` |
| Build a completely new UI/component from scratch | Neither of the above - this is new creation | Use a UI creation Skill outside this Guidebook's scope |

## `ywc-ui-ux-review` - Usability / Accessibility audit

Combines static code analysis with actual UI execution (Chrome DevTools MCP) to audit Information Architecture, Visual Design, Usability, and Accessibility (WCAG 2.2 AA). The result is a four-level report: Critical / High / Medium / Low.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ui-ux-review Check the usability of the payment screen" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ui-ux-review Check the usability of the payment screen" />
  </ToolTabsPanel>
</ToolTabs>

Because live UI exploration is included, results are more accurate when a staging or preview URL is available.

## `ywc-design-renew` - Visual De-slop & Renewal

Use this when an existing screen is ordinary or feels "AI-generated." It adds visual character or checks for AI-slop tells such as gradient text / cyan-on-dark / Inter / uniform card grids.

**Code renewal (default mode)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-design-renew --target setup-collection/default-project/docs/design/README.md --url http://localhost:3000" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-design-renew --target setup-collection/default-project/docs/design/README.md --url http://localhost:3000" />
  </ToolTabsPanel>
</ToolTabs>

**Check only, without touching code**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-design-renew --mode check --target setup-collection/default-project/docs/design/README.md --fail-on high" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-design-renew --mode check --target setup-collection/default-project/docs/design/README.md --fail-on high" />
  </ToolTabsPanel>
</ToolTabs>

If you pass `--url`, Before/After screenshots are also provided. If omitted, it proceeds with code analysis only, which is less accurate. `--fail-on` is the gate threshold for check mode, and defaults to `critical`.

## New creation is not what these Skills are for

`ywc-design-renew` is **only for renewal of existing screens**. UI/components built from scratch are better handled by a dedicated UI creation workflow, not the `ywc-*` review/renewal flow in this Guidebook. You cannot "de-slop" something that does not exist yet.

---

[Previous: 10. E2E Test automation strategy](./10-e2e-test-strategy.md) - [Next: 12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md)
