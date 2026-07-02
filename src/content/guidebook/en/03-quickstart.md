[Back to table of contents](./README.md)

# 03. Ship your first feature in 5 minutes

This page is your first hands-on exercise: follow one small bug fix from the idea stage to merge. Example scenario: handling the request **"The login failure error message is too generic, so it is hard to understand the cause."**

The concepts behind this flow are explained in more detail in [04. general cycle (small)](./04-general-cycle-small.md). This page focuses on practice.

## Step 1 - Create a plan

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움. 잠김/오타/미가입 등 구체적 사유를 보여주고 싶음" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움. 잠김/오타/미가입 등 구체적 사유를 보여주고 싶음" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-plan` reads the codebase first and decides whether this change is **Small** enough to finish as a single PR. If it is judged Small, a `plan.md` file is created. Check that the four sections - What / Why / Out of Scope / Done When - are filled in.

## Step 2 - Converge the plan

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
</ToolTabs>

If `plan.md` still has concerns, they are automatically refined and revalidated. If it is already clean, it is handed off to the next step unchanged.

## Step 3 - Generate code

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

This generates the Backend / Frontend / QA layers in parallel. When generation finishes, you get a completion report ending in one of `DONE`, `DONE_WITH_CONCERNS`, `BLOCKED`, or `NEEDS_CONTEXT`. See [02. Core concepts](./02-core-concepts.md) for what each state means.

## Step 4 - Review before opening a PR

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-code-gen` has no automatic review flag. If you skip this step, the PR is opened without code review. **Do not skip it.**

## Step 5 - Create the PR and handle Review

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-create-pr` handles commit, secret scan, local validation, draft PR creation, and remote CI/Bot Review checks. If Bot review comments or merge-readiness issues remain, run a separate PR health sweep like this:

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
</ToolTabs>

The Small flow is based on `plan.md`, so it has no `tasks/<task-name>/` artifact. Therefore, after reviewer approval, merging through the GitHub UI or `gh pr merge` is safer than using `ywc-finish-branch`, which includes task completion handling.

## If you got this far

You have completed one change from start to finish. Good next pages:

- If the change is larger than this and needs to be split into multiple Tasks -> [05. general cycle (medium/large)](./05-general-cycle-medium-large.md)
- If the idea is not concrete yet, unlike this exercise where the problem is already clear -> start with `ywc-brainstorm` (see [13. Full Skill Reference](./13-skill-reference.md))
- If you want to hand over one goal and have the system proceed automatically to the end instead of managing each step yourself -> [06. Finish automatically from one goal](./06-agentic-autonomous-loop.md)

---

[Previous: 02. Core concepts](./02-core-concepts.md) - [Next: 04. Handling a small change](./04-general-cycle-small.md)
