[Back to table of contents](./README.md)

# 14. Managing Cloud Infrastructure

## When to use these Skills

All four Skills cover one continuous lifecycle — designing, authoring, reviewing, and improving cloud infrastructure — but each answers a different question. Pick based on where you are in that lifecycle right now.

| What you want to do | Question | Skill to use |
|---|---|---|
| Design a system's cloud architecture before any IaC exists | "What should the provider/network/compute/storage/IAM topology even look like?" | `ywc-infra-design` |
| Turn a finished design into actual Infrastructure-as-Code | "How do I author the Terraform for this?" | `ywc-iac-author` |
| Catch misconfiguration, cost, or reliability problems before applying | "Is this IaC safe to apply?" | `ywc-infra-review` |
| Improve or right-size infrastructure that's already running | "Is this existing infrastructure wasteful, drifting, or fragile?" | `ywc-infra-optimize` |

## `ywc-infra-design` — Cloud Architecture Design

Gathers requirements, picks a provider (or delegates that decision), and lays out network/compute/storage/IAM topology together with a reliability/cost/security pre-check. It never writes IaC itself — its output is `infra-design.md`, the input contract `ywc-iac-author` consumes next.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
</ToolTabs>

`--provider` declares an already-decided provider so the run can skip delegating that choice; leave it off and the Skill hands provider research off instead — in Claude Code that's a bare `ywc-tech-research` reference, in Codex it's the `$ywc-tech-research` invocation syntax. `--skip-cloud-consult` skips the optional feasibility consult in Step 3: in Claude Code that step is `Task(subagent_type: ywc-cloud-engineer)`, while in Codex it reads as "optionally dispatch a Codex worker carrying the `ywc-cloud-engineer` persona" in read-only mode — same idea, different dispatch vocabulary per tool.

## `ywc-iac-author` — Infrastructure-as-Code Authoring

Authors or modifies Terraform modules/resources for AWS/GCP/Azure/Kubernetes from an `ywc-infra-design` doc (K8s and Helm only through Terraform's `kubernetes`/`helm` providers — never raw manifests or a second IaC tool), then verifies with `terraform validate`/`plan` and produces a blast-radius summary.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

The two tools author differently: in Claude Code, Step 3 fans out per Terraform module via `Task(subagent_type: ywc-cloud-engineer)`. In Codex, the current session authors the `.tf` files directly with no fan-out dispatch — `ywc-cloud-engineer` there is only an optional, read-only advisory consult for feasibility/reliability/blast-radius judgment, never the primary author. `--skip-review-recommendation` skips the closing recommendation to run the next Skill, which Claude Code phrases as a bare `ywc-infra-review` reference and Codex phrases as `$ywc-infra-review`.

## `ywc-infra-review` — Pre-Apply IaC Review

Fans out across security, cost, and reliability lenses to catch misconfiguration, least-privilege gaps, and reliability risk in Terraform for AWS/GCP/Azure/K8s before anyone runs `apply`. It's diagnosis-only and never writes IaC; any CRITICAL/HIGH finding recommends blocking the apply.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

The 3-lens fan-out is dispatched differently per tool. Claude Code uses `Task(subagent_type: ywc-security-engineer)` for the security lens, `Task(subagent_type: ywc-performance-engineer)` for the cost lens, and `Task(subagent_type: ywc-cloud-engineer)` in review mode for the reliability lens. Codex phrases the same three dispatches as "a Codex worker carrying the `ywc-security-engineer` persona," the `ywc-performance-engineer` persona, and the `ywc-cloud-engineer` persona. `--skip-optimize-recommendation` skips the closing recommendation to run `ywc-infra-optimize` — a bare reference in Claude Code, `$ywc-infra-optimize` (or `$ywc-iac-author`, if the finding calls for re-authoring instead) in Codex.

## `ywc-infra-optimize` — Cost, Drift, and Reliability Cleanup

The infra equivalent of `ywc-refactor-clean` for an aging codebase: right-sizes cost, removes unused resources, evaluates reserved/spot adoption, detects and remediates drift, and hardens reliability across AWS/GCP/Azure/K8s.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

This is where the two tools diverge most: in Claude Code, the Skill diagnoses **and executes** SAFE items directly — `Task(subagent_type: ywc-performance-engineer)` supplies the cost/utilization signal, then `Task(subagent_type: ywc-cloud-engineer)` makes the minimal `.tf` change per SAFE item, runs `terraform plan` (never `apply`), and commits one item at a time; CAUTION/DANGER items are only ever escalated. In Codex, this Skill is explicitly a planning-and-classification surface, not an execution worker — it never executes or commits a `.tf` change itself. Its SAFE step is a planning loop, not an execution loop, and SAFE items come out as "planned next actions" routed to `$ywc-iac-author` for the actual authoring pass. `--dry-run` gathers and classifies only (on both tools); `--skip-verify-done` skips the final `ywc-verify-done` handoff.

## How the Skills work together

The four Skills form one pipeline for taking a system from "no infrastructure exists yet" to "infrastructure exists, is safe, and keeps getting cheaper and more reliable over time":

**Step 1: Design the topology — `ywc-infra-design`**

Before any Terraform gets written, decide the provider, the network/compute/storage/IAM shape, and run the reliability/cost/security pre-check. The output, `infra-design.md`, is the only thing the next step needs.

**Step 2: Author the IaC — `ywc-iac-author`**

Turn that design doc into real Terraform, module by module, verified along the way with `terraform validate`/`plan`. On Claude Code this fans out per module to `ywc-cloud-engineer`; on Codex the same session authors directly, with `ywc-cloud-engineer` only available as an optional advisory consult.

**Step 3: Review before applying — `ywc-infra-review`**

Before anyone runs `apply`, get the change reviewed across security, cost, and reliability lenses — dispatched to `ywc-security-engineer`, `ywc-performance-engineer`, and `ywc-cloud-engineer` respectively (the same lens-extended agents `ywc-impl-review` uses elsewhere in this Guidebook, applied here to infrastructure instead of application code). Any CRITICAL/HIGH finding blocks the apply until it's fixed.

**Step 4: Keep it lean over time — `ywc-infra-optimize`**

Once infrastructure is live, this Skill is the recurring maintenance pass: cost right-sizing, drift detection, and reliability hardening, again drawing on `ywc-cloud-engineer` and `ywc-performance-engineer` for signal and execution. Findings that need re-authoring loop back to `ywc-iac-author`, and findings that need a fresh look at the shape of the system loop all the way back to `ywc-infra-design`.

---

[Previous: 13. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) - [Next: 15. Implementing Authentication](./18-authentication-implementation.md)
