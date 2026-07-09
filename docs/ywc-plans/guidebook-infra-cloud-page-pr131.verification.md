# Guidebook Infra/Cloud Page (PR #131) — Content Verification

> Verified: 2026-07-09
> Target upstream repo: `yongwoon/ywc-agent-toolkit`
> Upstream PR: `#131`

## Question-First Gate

No rewrite-forcing ambiguity was identified after reading:

- `tasks/000017-010-config-verify-upstream-infra-page-content/README.md`
- `tasks/000017-010-config-verify-upstream-infra-page-content/task.md`
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md` (`### FR-1`, `## Dependencies`, `## Edge Cases`, `## Iteration 1 Amendments` A8)

This task has no public API, schema, library choice, or interface contract. It creates only this verification artifact, sourced entirely from upstream `SKILL.md` files actually read below (no fabricated command syntax).

## Hardening Note

RED-first exception: documentation-only verification artifact. No production behavior, executable code, public API, shared module boundary, or critical data-integrity surface is changed.

## PR #131 Status (re-checked at task execution time)

Command:

```bash
gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt,headRefOid
```

Output:

```json
{"headRefOid":"513df53499c5e4f82ce23349d3eb614fcf65a33a","mergedAt":"2026-07-08T21:16:34Z","state":"MERGED"}
```

Result: PR #131 is `MERGED` (headRefOid `513df53499c5e4f82ce23349d3eb614fcf65a33a`). This matches the planning-time observation recorded in `README.md`'s Notes section, re-confirmed rather than trusted from cache. Per FR-1 (`## Dependencies`: "Soft dependency, not a hard blocker"), this is a soft dependency only — but since it is in fact merged, all 4 skill files below were read from `main` (not a PR head SHA).

## 4 New Skills — Claude Code (`claude-code/skills/**/SKILL.md`, ref: `main`)

All 4 files were found and read successfully at their exact expected paths. No path errors, no renames.

### 1. `claude-code/skills/ywc-infra-design/SKILL.md`

- **Description summary**: Use when designing cloud/infrastructure architecture *before* any IaC is written — requirements gathering, provider selection, network/compute/storage/IAM topology, and a reliability/cost/security 3-lens pre-check that produces `infra-design.md`, the input contract `ywc-iac-author` consumes. Never writes IaC itself.
- **Frontmatter**: `category: spec`, `phase: planning`, `requires: []`, `advisor_budget: 2`
- **Representative command example** (Arguments table):
  ```bash
  --provider aws|gcp|azure|k8s   # e.g. --provider aws — declare an already-decided provider, skip ywc-tech-research delegation
  --scope <system-name>          # e.g. --scope payments-api
  --skip-cloud-consult           # flag — skip the optional read-only ywc-cloud-engineer feasibility consult (Step 3)
  ```
- **Trigger phrases** (from description): "인프라 설계", "클라우드 아키텍처", "infra design", "cloud architecture", "design the infrastructure", "インフラ設計", "ywc-infra-design"

### 2. `claude-code/skills/ywc-iac-author/SKILL.md`

- **Description summary**: Use when authoring or modifying Infrastructure-as-Code from a design — Terraform modules/resources for AWS/GCP/Azure/Kubernetes (K8s/Helm via Terraform `kubernetes`/`helm` providers only, never raw manifests or a second IaC tool), including `terraform validate`/`plan` verification and a blast-radius summary.
- **Frontmatter**: `category: implement`, `phase: implementation`, `requires: []`
- **Representative command example**:
  ```bash
  --design-doc infra-design.md          # path to ywc-infra-design output to load as authoring input
  --scope infra/modules/network         # restrict authoring/fan-out to a single Terraform module
  --skip-review-recommendation          # flag — skip closing ywc-infra-review recommendation
  ```
- **Dispatch pattern**: fans out per Terraform module via `Task(subagent_type: ywc-cloud-engineer)` (Step 3), then verifies with `terraform validate`/`terraform plan` (Step 4).
- **Trigger phrases**: "IaC 작성", "terraform 작성", "write terraform", "author IaC", "provision infrastructure", "ywc-iac-author"

### 3. `claude-code/skills/ywc-infra-review/SKILL.md`

- **Description summary**: Use when reviewing IaC/cloud configuration for misconfiguration, least-privilege, cost, and reliability *before applying* — fans out to security/cost/reliability lenses and aggregates severity-rated findings across AWS/GCP/Azure/K8s Terraform. Diagnosis-only, never writes IaC.
- **Frontmatter**: `category: review`, `phase: quality`, `requires: []`, `advisor_budget: 3`
- **Representative command example**:
  ```bash
  --scope infra/modules/network          # restrict the 3-lens fan-out to a single module/path
  --skip-optimize-recommendation         # flag — skip closing ywc-infra-optimize recommendation
  ```
- **Dispatch pattern**: `Task(subagent_type: ywc-security-engineer)` (security lens, Step 2), `Task(subagent_type: ywc-performance-engineer)` (cost lens, Step 3), `Task(subagent_type: ywc-cloud-engineer)` in review mode (reliability lens, Step 4). Any CRITICAL/HIGH finding recommends **BLOCK** apply.
- **Trigger phrases**: "인프라 리뷰", "IaC 리뷰", "terraform 검토", "infra review", "review my terraform", "ywc-infra-review"

### 4. `claude-code/skills/ywc-infra-optimize/SKILL.md`

- **Description summary**: Use when improving *existing* infrastructure: cost right-sizing, removing unused resources, reserved/spot adoption, drift detection & remediation, and reliability hardening for AWS/GCP/Azure/K8s — "the safe change-loop equivalent of refactor-clean for infra." Diagnoses **and executes** SAFE items (per-item `terraform plan` verification, one commit per item); CAUTION/DANGER items are escalated, never auto-executed.
- **Frontmatter**: `category: maintenance`, `phase: cleanup`, `requires: []`, `advisor_budget: 2`
- **Representative command example**:
  ```bash
  --scope infra/modules/compute   # restrict gather/classify/execute to a single module/path
  --dry-run                       # flag — gather+classify only, no SAFE execution
  --skip-verify-done              # flag — skip final ywc-verify-done handoff
  ```
- **Dispatch pattern**: `Task(subagent_type: ywc-performance-engineer)` for cost/utilization signal (Step 1); `Task(subagent_type: ywc-cloud-engineer)` per SAFE item to execute the minimal `.tf` change and run `terraform plan` (Step 3) — **never `apply`**.
- **Trigger phrases**: "인프라 개선", "비용 최적화", "right-sizing", "drift 점검", "cost optimization", "optimize infrastructure", "terraform drift", "ywc-infra-optimize"

## 4 New Skills — Codex Equivalents (`codex/skills/**/SKILL.md`, ref: `main`)

All 4 Codex-side equivalents exist at the same skill names (confirmed via directory listing of `codex/skills/`, which includes `ywc-infra-design`, `ywc-iac-author`, `ywc-infra-review`, `ywc-infra-optimize` alongside the other 38 shared skills). All 4 `SKILL.md` files were read successfully.

**Structural difference (applies to all 4)**: Codex `SKILL.md` frontmatter has only `name` and `description` — no `category`/`phase`/`requires`/`advisor_budget` fields exist on the Codex side. Reference paths also differ (`../references/infra/lenses/*.md`, `../references/infra/providers/*.md`, `../references/infra/iac/terraform.md` on Codex vs. `../references/lenses/*.md`, `../references/providers/*.md`, `../references/iac-tools/terraform.md` on Claude Code).

**Command-example differences per skill** (at least 1 each, for `<ToolTabsPanel tool="codex">`):

1. **`ywc-infra-design`**: Same `--provider`/`--scope`/`--skip-cloud-consult` flags as Claude Code. Dispatch language differs: Step 3 reads "optionally dispatch a Codex worker carrying the `ywc-cloud-engineer` persona in read-only feasibility-consult mode" instead of `Task(subagent_type: ywc-cloud-engineer)`. Provider delegation uses `$ywc-tech-research` invocation syntax (Step 2) instead of a bare skill-name reference.
2. **`ywc-iac-author`**: Same `--design-doc`/`--scope`/`--skip-review-recommendation` flags. Key behavioral difference: Step 3 is titled "Author per Terraform module **with optional advisory consult**" — the current Codex session itself authors the `.tf` files directly (no fan-out dispatch); the `ywc-cloud-engineer` persona is only an optional read-only advisory consult for feasibility/reliability/blast-radius judgment, never the primary author. Recommends `$ywc-infra-review` (Step 7) using `$`-prefixed invocation.
3. **`ywc-infra-review`**: Same `--scope`/`--skip-optimize-recommendation` flags. Lens dispatch language: "Dispatch a Codex worker carrying the `ywc-security-engineer` persona" / `ywc-performance-engineer` persona / `ywc-cloud-engineer` persona (Steps 2–4) — functionally equivalent to Claude Code's `Task(subagent_type: ...)` fan-out but phrased as "worker carrying a persona." Recommends `$ywc-infra-optimize` / `$ywc-iac-author` (Step 6) using `$`-prefixed syntax.
4. **`ywc-infra-optimize`**: Same `--scope`/`--dry-run`/`--skip-verify-done` flags, but **significant behavioral difference from Claude Code**: the Codex version is explicitly "a **planning and classification surface, not an execution worker**" in "Codex v1" — it never executes SAFE items or commits `.tf` changes itself. Step 3 is renamed "SAFE **planning** loop" (vs. Claude Code's "SAFE **execution** loop") and its Iron Law reads "NEVER **RECOMMEND** A CHANGE AS READY WITHOUT..." (vs. Claude Code's "NEVER **EXECUTE** A CHANGE WITHOUT..."). SAFE items are recorded as "Planned next actions" routed to `$ywc-iac-author` for the actual authoring pass, not committed directly.

## `ywc-cloud-engineer` Agent Existence

Command (per tool):

```bash
gh api "repos/yongwoon/ywc-agent-toolkit/contents/claude-code/agents?ref=main" --jq '.[].name'
gh api "repos/yongwoon/ywc-agent-toolkit/contents/codex/agents?ref=main" --jq '.[].name'
```

| Tool | Path checked | `ywc-cloud-engineer` present? |
|---|---|---|
| Claude Code | `claude-code/agents/ywc-cloud-engineer.md` | Yes |
| Codex | `codex/agents/ywc-cloud-engineer.toml` | Yes |

Both tools also already have `ywc-security-engineer` and `ywc-performance-engineer` agents in their `agents/` directories (both listed in the same directory listings above) — these are the two lenses `ywc-infra-review` and `ywc-infra-optimize` dispatch to alongside `ywc-cloud-engineer`, confirming the guidebook prose can reference all three agent dispatches as already-existing (no new agent files were required by PR #131 beyond `ywc-cloud-engineer` itself).

## Downstream Decision

Use the command syntax, frontmatter values, and dispatch-pattern language recorded above verbatim (not re-derived) when authoring the `17-infrastructure-and-cloud` Guidebook page and its `<ToolTabsPanel tool="claude-code">` / `<ToolTabsPanel tool="codex">` examples in task `000018-010-ui-guidebook-infra-cloud-page-registration`. In particular:

- Claude Code examples should use `Task(subagent_type: ywc-cloud-engineer)`-style dispatch language; Codex examples should use `$skill-name` invocation and "Codex worker carrying the `<persona>` persona" dispatch language — these are not interchangeable phrasings and should not be copy-pasted across tabs.
- The `ywc-infra-optimize` Codex tab must not claim it executes/commits changes — that is a Claude-Code-only capability in the source material; Codex's version is planning/classification-only ("Codex v1").
- The 4-phase classification (`spec`/planning, `implement`/implementation, `review`/quality, `maintenance`/cleanup) is Claude-Code-only frontmatter and has no direct Codex equivalent; do not imply Codex skills carry the same `category`/`phase` metadata.
