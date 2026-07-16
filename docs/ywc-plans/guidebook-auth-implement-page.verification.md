# Upstream `ywc-auth-implement` Ground-Truth Verification

> Source task: `000021-010-config-verify-upstream-auth-content`
> Satisfies FR-1 ("Ground-Truth Re-Verification (must run first)") of
> `docs/ywc-plans/guidebook-auth-implement-page.md`.
> This note is the sourcing basis for `000022-010`'s `<ToolTabs>` examples,
> flow prose, and the "How Claude Code and Codex differ" section. It is a
> re-verification record only — it does **not** author new Guidebook content.

## 1. PR #144 Merge-Status Re-Query

Command run at execution time:

```bash
gh pr view 144 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt,headRefOid
```

Live output:

```json
{"headRefOid":"e354da801805725fc143a68904c10b3d7d452890","mergedAt":"2026-07-16T05:54:48Z","state":"MERGED"}
```

- **state**: `MERGED`
- **mergedAt**: `2026-07-16T05:54:48Z` (unchanged from spec-time value)
- **headRefOid**: `e354da801805725fc143a68904c10b3d7d452890`

**Interpretation**: PR #144 remains `MERGED`; the spec precondition holds and there
is no branch ambiguity. Content-authoring must source from `main`'s current
`SKILL.md` files (verified below), not from any PR branch.

### Sibling-checkout provenance

The two `SKILL.md` files were read from a local sibling checkout rather than via
`gh api` / shallow clone:

- Path: `/Users/yongwoon.kim/Desktop/yongwoon/source/private/ywc-agent-toolkit`
- Branch: `main`
- HEAD at read time: `0aa63967fc4bb80bb6cf22f4d4ff337bccc2788a` — `chore(main): release 1.29.0 (#145)`

No further edits to either `ywc-auth-implement/SKILL.md` were observed on `main`
between plan time and execution time; release 1.29.0 (#145) is the current HEAD
and post-dates the PR #144 merge.

---

## 2. Claude Code — `claude-code/skills/ywc-auth-implement/SKILL.md`

### 2.1 Skill identity and framing

- Front-matter: `category: spec`, `phase: planning`, `requires: []`, `advisor_budget: 2`.
- **The skill never writes application auth code itself** — it interviews,
  recommends, and dispatches. Announcement string:
  "I'm using the ywc-auth-implement skill to run the auth policy interview and
  dispatch a battle-tested implementation."

### 2.2 Preflight Gate (5 steps, ordered, idempotent)

1. **Branch reuse** — reuse `feature/<auth-slug>` if it exists; create a new
   branch only when starting from a long-lived branch (main/develop).
2. **`.env.example` placeholders** — add only missing secret placeholders; never
   overwrite existing values or expose real secrets.
3. **Stack evidence routing** — if framework/DB evidence is insufficient, route
   to `ywc-tech-research` before any policy question; resume once evidence exists.
4. **Existing-auth hard stop** — if existing auth is detected, return
   `NEEDS_CONTEXT` until the user picks `new` / `extend` / `migrate`; no
   scaffolding or dispatch before that choice.
5. **Legal draft labeling** — any ToS/Privacy Policy draft is always labeled
   **"draft pending legal review"**, from first generation through hand-off.

### 2.3 Policy Interview — 9 categories (canonical labels)

Asked in one focused round. Canonical labels from
`claude-code/.../references/policy-interview.md`:

1. **Sign-in Method and OAuth Provider Readiness**
2. **MFA Enrollment and Recovery**
3. **Session Storage, TTL, Rotation, Revocation, Device Management**
4. **Password Reset and Hashing Library Boundary**
5. **Profile Fields**
6. **Account Deletion and Re-authentication**
7. **Shallow RBAC — Roles, Defaults, Claims**
8. **Consent Versioning, Collection, Withdrawal**
9. **Abuse Prevention — Rate Limiting, Verification, Recovery Controls**

Each answer is recorded as **question / response-default / approval-deferral
state** (approved, explicitly deferred with stated risk, or not-applicable).
Interview language follows the target project's resolved language convention.

### 2.4 Dynamic Recommendation

Recommend battle-tested libraries or managed services from stack evidence plus
approved (or explicitly risk-accepted) policy answers — **never a fixed
"supported stack" list** (AC5). When evidence is insufficient, fall back to
real-time research and route to `ywc-tech-research`. A new stack playbook is
cache-eligible only after a zero-Critical/High `ywc-security-audit` pass **and**
the policy-conditional E2E passes.

### 2.5 Implementation Dispatch — three named `Task(subagent_type:)` targets

The skill **dispatches, it does not implement**. Three direct-dispatch prompts,
each instructing the agent to follow `ywc-tdd-ritual` (RED → verify RED → GREEN →
verify GREEN → REFACTOR → verify GREEN) and to run `ywc-verify-done` before
claiming completion:

| Dispatch target | Invocation | Responsibility |
|---|---|---|
| Backend | `Task(subagent_type: ywc-backend-coder)` | Backend half of approved policy + recommendation; never hand-roll password hashing, token signing, or secret crypto. |
| Frontend | `Task(subagent_type: ywc-frontend-coder)` | Sign-in/sign-up forms, MFA enrollment UI, session-aware routing, FR-7 consent checkbox; no client-side secret handling. |
| Legal pages | `Task(subagent_type: ywc-doc-writer)` | ToS + Privacy Policy draft; label **"draft pending legal review"** in title and body top; label must survive every hand-off. |

Every dispatch applies the shared §3.5 Return-payload contract verbatim:
`Status | 1-line summary | artifact paths | (Concerns ≤ 10 lines | Blocker ≤ 5
lines | Missing-context bullets)` — no code, findings, diffs, restated prompt, or
chain-of-thought returned inline (write to files, return paths).

### 2.6 Security / E2E / PR Gate routing

Subagent-status contract is applied to each dispatch result first (`DONE`
integrates; `DONE_WITH_CONCERNS` requires resolving concerns; `NEEDS_CONTEXT`
requires re-dispatch; `BLOCKED` requires triage). Then:

`ywc-security-audit --code <auth-diff-path>` (a **skill call**, not a §3.5 dispatch):

| Audit result | Route | Cache |
|---|---|---|
| Critical/High = 0 | Proceed to policy-conditional E2E | Pending — eligible only after E2E passes |
| Critical/High ≥ 1 | `DONE_WITH_CONCERNS`; skip E2E, PR, caching; remediate + re-audit | Not eligible |
| Audit command fails to run | `BLOCKED` with command + error evidence | Not eligible |
| Scope/trust boundary insufficient | `NEEDS_CONTEXT` naming the missing item | Not eligible |

**E2E** covers only interview-approved items (sign-up/sign-in/reset only if
email/password chosen; account deletion only if enabled; one flow per configured
OAuth provider; MFA only if approved and not deferred). Check `playwright.config.*`
first: absent → `ywc-e2e-test-strategy --init` once; present → `--audit`. Run
`--flow <name>` only for approved-but-missing flows (generation is never itself a
pass). Run the project's real E2E command fresh and capture `ywc-verify-done`-style
evidence. Only after gates pass, propose `ywc-create-pr` **non-blockingly** —
never automatically.

---

## 3. Codex — `codex/skills/ywc-auth-implement/SKILL.md`

### 3.1 Skill identity and framing

- Announcement string: "I'm using the ywc-auth-implement skill to turn the
  authentication intent into a policy-backed, security-gated implementation route."
- Same orchestration-only stance: does not write application auth code, prescribe
  a fixed stack, or expose secrets.

### 3.2 Step 1 — Read-only Preflight

Read-only and rerunnable. Reports: branch reuse (`feature/<auth-slug>`),
missing placeholder **key names only** (never values, no `.env.example` change),
existing-auth evidence (requires `new`/`extend`/`migrate`), missing stack evidence
(routes to `$ywc-tech-research`), and a legal-draft warning **`법적 검토 전 임시본`**.
Detached HEAD / no establishable base branch / no clean-tree transition returns
`NEEDS_CONTEXT` before any mutation.

### 3.3 Step 2 — Policy Interview (same 9 categories)

Same nine mandatory sections as Claude Code (§2.3 above), sourced from the shared
`references/policy-interview.md`, mandatory even for OAuth-only work. Selected
methods record question / response-default / approved-deferred state; unselected
methods are recorded as **approved-policy exclusions** (their readiness fields and
E2E flows are not produced). Never record or output a real credential. Required
unresolved policy returns `NEEDS_CONTEXT`.

### 3.4 Step 3 — Evidence-Based Recommendation

Same evidence-only, no-fixed-playbook rule; insufficient evidence follows
`generic-fallback.md`, invokes `$ywc-tech-research`, resumes after a decision.
Cache eligible only after zero Critical/High audit findings and applicable E2E
success.

### 3.5 Step 4 — Plan and Implementation Route (the structural difference)

Codex does **not** fan out to `ywc-backend-coder` / `ywc-frontend-coder` /
`ywc-doc-writer` via `Task(subagent_type:)`. Instead it passes the approved
policy + recommendation to `$ywc-plan` and prints (never auto-invokes) a
skill-chain route:

```text
$ywc-plan → $ywc-spec-ready → $ywc-task-generator → $ywc-code-gen --spec <path> --feature <auth feature> --tdd --review
```

- `$ywc-task-generator` is not printed until `$ywc-spec-ready` is `DONE`;
  decomposition is never skipped.
- `$ywc-code-gen` owns application implementation **and its critical-path
  security review**.
- Documentation-only work may use **one bounded general subagent** (with target,
  oracle, stop condition, evidence required, legal warning, and the shared status
  actions) — not the three named agents.

### 3.6 Steps 5–7 — Security / E2E / PR Gates

- **Security (Step 5)**: for application code, **consume `$ywc-code-gen --review`'s
  authoritative `$ywc-security-audit` evidence — do not run a duplicate audit**.
  For documentation-only delegation, run `$ywc-security-audit --code <changed-auth-path>`
  exactly once. Same 4-row transition table (zero Critical/High → continue; any
  Critical/High → `DONE_WITH_CONCERNS`; command can't run → `BLOCKED`; missing
  scope/trust boundary → `NEEDS_CONTEXT`).
- **E2E (Step 6)**: after a clean security gate, run exactly one
  `$ywc-e2e-test-strategy --init --ci` (Playwright absent) or one `--audit`
  (present), then one `--flow <name>` per approved capability. Run the configured
  Playwright script, else `npx playwright test` when Playwright is installed;
  record command, exit code, result. Nonzero → `DONE_WITH_CONCERNS`; absent
  server/credential/env → `BLOCKED` (except an explicitly deferred non-security
  item → `DONE_WITH_CONCERNS`).
- **PR (Step 7)**: offer `$ywc-create-pr` only after all applicable E2E flows pass
  and the user opts in; a declined PR is not a failure.

---

## 4. Dispatch-Mechanism Difference (source for "How Claude Code and Codex differ")

| Dimension | Claude Code | Codex |
|---|---|---|
| Core mechanism | **`Task(subagent_type:)` fan-out** — the skill directly dispatches named agents | **In-session skill-chain orchestration** — the skill prints a required skill route and delegates, no `Task()` fan-out |
| Implementation actors | Three named agents dispatched directly: `ywc-backend-coder`, `ywc-frontend-coder`, `ywc-doc-writer` | `$ywc-code-gen` owns app implementation (backend + frontend + its own review); docs-only work → **one bounded general subagent** |
| Route to implementation | Interview → recommend → dispatch three agents → gates | Interview → recommend → `$ywc-plan → $ywc-spec-ready → $ywc-task-generator → $ywc-code-gen --spec … --feature … --tdd --review` |
| TDD discipline | Each dispatched agent follows `ywc-tdd-ritual` + `ywc-verify-done` | Carried by `$ywc-code-gen --tdd --review` |
| Security audit | Skill calls `ywc-security-audit --code <auth-diff-path>` itself | **Reuses `$ywc-code-gen --review`'s audit evidence** for app code; runs `$ywc-security-audit` itself only for docs-only delegation |
| Legal-draft label | **"draft pending legal review"** (English) | **`법적 검토 전 임시본`** (Korean) |
| Return-payload contract | Explicit §3.5 contract embedded verbatim in each dispatch prompt | Shared status actions referenced for the single bounded docs subagent; not copied inline |
| Shared, identical elements | 9-category policy interview (same canonical labels), no-fixed-stack recommendation rule, evidence→`ywc-tech-research` fallback, existing-auth `new`/`extend`/`migrate` hard stop, Critical/High audit → `DONE_WITH_CONCERNS`, policy-conditioned E2E, non-automatic PR proposal, four literal completion statuses | (same) |

**One-line framing for the new page**: *Claude Code executes the auth build by
fanning out to three named implementation agents via `Task(subagent_type:)`,
whereas Codex keeps orchestration in-session and routes the build through the
`$ywc-plan → $ywc-spec-ready → $ywc-task-generator → $ywc-code-gen` skill chain —
the interview, recommendation discipline, and security/E2E gates are otherwise
identical across both tools.*

### Out-of-scope confirmation

Both variants dispatch only `ywc-backend-coder` / `ywc-frontend-coder` /
`ywc-doc-writer` (Claude Code) or `$ywc-code-gen` / a bounded general subagent
(Codex), and **skill-call** `ywc-security-audit` / `ywc-e2e-test-strategy`. Neither
directly dispatches `ywc-cloud-engineer`, `ywc-security-engineer`, or
`ywc-performance-engineer`; the new Guidebook page names the three implementation
agents as "dispatch targets" in prose only and does not transcribe their specs.

---

## 5. Criticality Note

This task's README marks Criticality `critical` due to a keyword heuristic firing
on "auth" in the task name. The actual work is upstream-document re-verification
and note-taking only — no application authentication code and no secret values are
touched. **Assessed as a false positive and downgraded to `normal`** for this
task, consistent with the README's explicit allowance to do so.
