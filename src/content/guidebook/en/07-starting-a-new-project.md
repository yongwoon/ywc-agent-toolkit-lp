[Back to table of contents](./README.md)

# 07. Starting a new Project

## When to use this flow

Use this when there is no Git repository yet, or when the repository exists but is essentially a blank slate with little code. If you are trying to understand an unfamiliar repo that already has code, go to [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) instead. These flows move in opposite directions and should not be used together in the same session.

> Before you start: if you would rather not pass `--lang` on every call, pin the output language once with `ywc-setup-language`. The skills below then follow that setting.

## Overall flow

This flow is a funnel: **diverge → decide → converge → readiness gate**. Spread the idea out wide (1), pin down the why and the what (2–3), narrow it into structure and specification (4–9), pass the gate that says you are ready to build (10), then move into implementation. Steps marked *(optional)* can be skipped when they are already settled.

| Step | Skill | Role |
|---|---|---|
| 1 | `ywc-brainstorm` *(optional)* | When the idea is still fuzzy, pin down purpose, constraints, success criteria, and 2–3 alternative approaches through one-question-at-a-time Socratic dialogue. Skip if intent is already firm |
| 2 | `ywc-mission` | Record the project's why, success criteria, and rejected-approach log in `docs/mission.md`. **Pin down the why before designing any structure** |
| 3 | `ywc-tech-research` *(optional)* | Compare tech stack / library candidates in parallel and record the rationale for the choice. Skip if the stack is already decided |
| 4 | `ywc-project-scaffold` | With the decided stack, design the directory structure (outputs a Markdown plan) |
| 5 | `ywc-ubiquitous-language` *(recommended for domain-rich projects)* | Define the shared vocabulary for developers, domain experts, and the LLM in `docs/ubiquitous-language.md` → the spec and `ywc-code-gen` then use canonical terms |
| 6 | `ywc-spec-writer --full` | Write the full specification under `docs/specification/` (goal / feature / data model / user flow) |
| 7 | `ywc-spec-validate` | Validate specification completeness / consistency / feasibility / code-compatibility. Loop 6↔7 until `DONE` |
| 8 | `ywc-project-docs` | Additional docs such as Architecture / Product / Operations, when needed |
| 9 | `ywc-task-generator` | Decompose the `DONE` spec into dependency-safe Tasks |
| 10 | `ywc-confidence-gate` | Score readiness across five dimensions before implementation (PROCEED ≥90 / REVIEW 70–89 / STOP &lt;70) |
| 11 | Enter [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) | Start actual implementation |

## Example run

**1. Shape the idea (optional)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm I want a small construction company to record check-in/check-out without a separate app, but I don't know where to start" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm I want a small construction company to record check-in/check-out without a separate app, but I don't know where to start" />
  </ToolTabsPanel>
</ToolTabs>
It narrows purpose, constraints, and alternatives through one-question-at-a-time Socratic dialogue. If you already know clearly what to build, skip this and start from step 2.

**2. Record the project's why**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-mission This project's goal is to let a small construction company record employee check-in/check-out without a separate app. Success criterion: can one manager close out attendance for 10 or fewer workers within 5 minutes" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-mission This project's goal is to let a small construction company record employee check-in/check-out without a separate app. Success criterion: can one manager close out attendance for 10 or fewer workers within 5 minutes" />
  </ToolTabsPanel>
</ToolTabs>
Pin down the **why and success criteria** before the directory structure or the spec — every later step is judged against this mission.

**3. Decide the tech stack (optional)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
</ToolTabs>
Step 4 (scaffold) draws the structure *after the stack is decided*, so if the stack is not settled yet, compare the candidates here and leave the rationale behind before moving on. Skip it if it's already decided.

**4. Design the directory structure**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
</ToolTabs>
Language is required. If the other details are missing, the Skill asks follow-up questions, so specify Framework / Architecture / Scale together when possible. This skill outputs **only a Markdown plan**. Actual file creation is handled by `ywc-code-gen`.

**5. Domain glossary (recommended for domain-rich projects)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
</ToolTabs>
Defining canonical terms up front makes the following spec and `ywc-code-gen` use the same names, preventing synonyms from creeping into the code. Skip it for projects with simple vocabulary.

**6. Write the full specification**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**7. Validate the specification**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
</ToolTabs>
If it returns `DONE_WITH_CONCERNS`, go back to step 6 `ywc-spec-writer`, refine the spec, and validate again. Repeat until it returns `DONE`. (`ywc-spec-ready` is an automatic convergence loop only for specs created by `ywc-plan`, so do not use it here.)

**8. Additional docs (when needed)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
</ToolTabs>

**9. Decompose into Tasks**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**10. Readiness gate**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-confidence-gate check whether it's safe to start implementing with this spec and tasks" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-confidence-gate check whether it's safe to start implementing with this spec and tasks" />
  </ToolTabsPanel>
</ToolTabs>
It scores five dimensions: scope clarity / architecture compliance / evidence quality / reuse verified / root cause. On `PROCEED` (≥90) move into [05. general cycle](./05-general-cycle-medium-large.md); on `STOP` (&lt;70), shore up the flagged dimension first.

## Notes

- `ywc-brainstorm`, `ywc-tech-research`, and `ywc-ubiquitous-language` are auxiliary steps you can skip depending on the situation. If intent, stack, and domain vocabulary are already clear, following just the core spine **2 → 4 → 6 → 7 → 9 → 10** is enough.
- If `ywc-confidence-gate` returns `STOP` (&lt;70), do not move into implementation — fill in the flagged dimension first, then pass the gate again.
- If the scope is small enough to implement directly without spec decomposition, `ywc-plan` can route to the Small path and skip this whole flow.
- `ywc-onboard-repo` moves in the opposite direction from this flow (investigating an existing repo), so do not use it when creating a new project.

---

[Previous: 06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) - [Next: 08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md)
