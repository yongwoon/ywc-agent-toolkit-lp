[Back to table of contents](./README.md)

# 15. Implementing Authentication

## When to use this Skill

Use `ywc-auth-implement` when a project needs a new authentication feature — sign-in/sign-up, OAuth, MFA, session handling, password reset, account deletion, or a consent flow — and you want the policy decisions made explicitly before any code gets written. It is not for everything auth-adjacent, though:

- After the auth code already exists and you want a security pass on it, use [`ywc-security-audit`](./14-skill-reference.md) instead — this Skill drives the build, not a post-hoc review.
- For general feature planning that has nothing to do with authentication, use [`ywc-plan`](./14-skill-reference.md) — this Skill's policy interview is auth-specific and does not replace a general planning pass.
- For authoring E2E coverage outside auth flows, use [11. E2E Test automation strategy](./10-e2e-test-strategy.md) — this Skill only drives the auth-flow E2E gate described below, not the project's broader test suite.

## How the flow works

**Preflight gate.** Before any question is asked, the Skill runs five idempotent checks: reuse a `feature/<auth-slug>` branch if one exists (only cutting a new branch from a long-lived branch); add only missing `.env.example` placeholders, never overwriting or exposing real values; route to `ywc-tech-research` first if framework/database evidence is insufficient; hard-stop with `NEEDS_CONTEXT` if existing auth is detected, until you choose `new`, `extend`, or `migrate`; and label any ToS/Privacy Policy draft "draft pending legal review" from its first line onward.

**9-category policy interview.** One focused round covers: sign-in method and OAuth provider readiness, MFA enrollment and recovery, session storage/TTL/rotation/revocation/device management, password reset and the hashing-library boundary, profile fields, account deletion and re-authentication, shallow RBAC (roles, defaults, claims), consent versioning/collection/withdrawal, and abuse prevention (rate limiting, verification, recovery controls). Each answer is recorded as approved, explicitly deferred with its risk stated, or not applicable.

**Dynamic recommendation.** From your stack evidence and approved policy answers, the Skill recommends a battle-tested library or managed service — never a fixed "supported stack" list. When evidence is thin, it falls back to real-time research via `ywc-tech-research`.

**Implementation dispatch.** The Skill orchestrates; it does not write the auth code itself. It dispatches three agents, each following `ywc-tdd-ritual` (RED → verify RED → GREEN → verify GREEN → REFACTOR → verify GREEN): `ywc-backend-coder` for the approved backend policy (never hand-rolling password hashing, token signing, or secret crypto), `ywc-frontend-coder` for sign-in/sign-up forms, MFA enrollment UI, and session-aware routing, and `ywc-doc-writer` for the ToS/Privacy Policy draft.

**Gates.** Once the dispatched work lands, `ywc-security-audit` runs against the diff: zero Critical/High findings proceeds to a policy-conditional `ywc-e2e-test-strategy` pass covering only the approved flows (sign-up/sign-in, password reset, account deletion, one flow per configured OAuth provider, MFA if approved); any Critical/High finding returns `DONE_WITH_CONCERNS` and skips E2E and PR creation until remediated. Only after both gates pass does the Skill suggest `ywc-create-pr` — never automatically.

## `ywc-auth-implement`

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-auth-implement" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-auth-implement" />
  </ToolTabsPanel>
</ToolTabs>

Run it with no flags — the interview and every downstream decision are driven interactively from the preflight gate onward, so there is no "scope" or "flow" argument to pre-supply.

## How Claude Code and Codex differ

The interview, the no-fixed-stack recommendation rule, the `new`/`extend`/`migrate` hard stop, and the security/E2E gates are identical on both tools. What differs is the dispatch mechanism: Claude Code fans out directly to `ywc-backend-coder`, `ywc-frontend-coder`, and `ywc-doc-writer` via `Task(subagent_type: ...)`. Codex keeps orchestration in the current session and instead prints (never auto-invokes) a skill-chain route — `$ywc-plan → $ywc-spec-ready → $ywc-task-generator → $ywc-code-gen --tdd --review` — letting `$ywc-code-gen` own the application implementation and its own security review; for documentation-only delegation, Codex uses one bounded general subagent instead of a named-agent fan-out.

---

[Previous: 14. Managing Cloud Infrastructure](./17-infrastructure-and-cloud.md) - [Next: 16. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)
