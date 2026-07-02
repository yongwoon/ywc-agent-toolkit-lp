[Back to table of contents](./README.md)

# 07. Starting a new Project

## When to use this flow

Use this when there is no Git repository yet, or when the repository exists but is essentially a blank slate with little code. If you are trying to understand an unfamiliar repo that already has code, go to [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) instead. These flows move in opposite directions and should not be used together in the same session.

## Overall flow

| Step | Skill | Role |
|---|---|---|
| 1 | `ywc-project-scaffold` | Decide tech stack / architecture pattern, then design the directory structure (outputs a Markdown plan) |
| 2 | `ywc-project-mission` | Record the project's why, success criteria, and rejected-approach log in `docs/mission.md` |
| 3 | `ywc-spec-writer --full` | Write the full specification under `docs/specification/` (goal / feature / data model / user flow) |
| 4 | `ywc-spec-validate` | Validate specification completeness / consistency / feasibility / code-compatibility |
| 5 | `ywc-project-docs` | Additional docs such as Architecture / Product / Operations, when needed |
| 6 | `ywc-task-generator` | Decompose the `DONE` spec into dependency-safe Tasks |
| 7 | Enter [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) | Start actual implementation |

## Example run

**1. Design the directory structure**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
</ToolTabs>
Language is required. If the other details are missing, the Skill asks follow-up questions, so specify Framework / Architecture / Scale together when possible. This skill outputs **only a Markdown plan**. Actual file creation is handled by `ywc-code-gen`.

**2. Record the project's why**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission 이 project 의 목표는 소규모 건설업체가 별도 앱 없이 출퇴근을 기록하게 하는 것. 성공 기준은 관리자 1명이 인력 10명 이하의 근태를 5분 안에 마감할 수 있는가" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission 이 project 의 목표는 소규모 건설업체가 별도 앱 없이 출퇴근을 기록하게 하는 것. 성공 기준은 관리자 1명이 인력 10명 이하의 근태를 5분 안에 마감할 수 있는가" />
  </ToolTabsPanel>
</ToolTabs>

**3. Write the full specification**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-writer --full --lang korean" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-writer --full --lang korean" />
  </ToolTabsPanel>
</ToolTabs>

**4. Validate the specification**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
</ToolTabs>
If it returns `DONE_WITH_CONCERNS`, go back to `ywc-spec-writer`, refine the spec, and validate again. Repeat until it returns `DONE`. (`ywc-spec-ready` is an automatic convergence loop only for specs created by `ywc-plan`, so do not use it here.)

**5. Additional docs (when needed)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
</ToolTabs>

**6. Decompose into Tasks**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang korean" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang korean" />
  </ToolTabsPanel>
</ToolTabs>

## Notes

- If the scope is small enough to implement directly without spec decomposition, `ywc-plan` can route to the Small path and skip this whole flow.
- `ywc-onboard-repo` moves in the opposite direction from this flow (investigating an existing repo), so do not use it when creating a new project.

---

[Previous: 06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) - [Next: 08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md)
