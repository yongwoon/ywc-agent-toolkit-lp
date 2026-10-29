[Back to table of contents](./README.md)

# 19. Skill combination recipes

The other pages explain one flow or one Skill at a time. This page shows how Skills feed each other: what one Skill leaves behind, and which Skill picks it up next. Every link below is something the Skills do themselves (read a shared file, offer a hand-off), not a convention you have to remember.

| What you want | Recipe |
|---|---|
| Stop the same review comment from coming back | [Review learning loop](#review-learning-loop) |
| Turn a fixed bug into a lasting lesson | [From bug fix to prevention](#from-bug-fix-to-prevention) |
| Know which gate runs when, before and after a PR | [Gates before and after a PR](#gates-before-and-after-a-pr) |
| Keep the reason behind hard-to-reverse decisions | [Recording decisions while planning](#recording-decisions-while-planning) |
| Start a large change whose scope is still unclear | [Discovery before planning](#discovery-before-planning) |
| Run tasks in parallel without collisions | [Parallel execution environment](#parallel-execution-environment) |
| Prepare a release | [Release preparation](#release-preparation) |

## Review learning loop

`docs/review-learnings.md` is the project's review memory. `ywc-review-learnings` owns the file; the other Skills read from it and feed it.

1. **Receive** — before acting on a comment, `ywc-receive-review` checks whether it is technically correct, so you don't implement a wrong fix just because a reviewer asked for it.
2. **Handle** — `ywc-handle-pr-reviews` fixes or answers each thread and leaves the PR mergeable (CI green, no conflict with the base).
3. **Record** — lessons worth keeping go into `docs/review-learnings.md` through `ywc-review-learnings`. With `--source pr --pr <number>` it distills the bot review comments of one PR. Every new entry is shown to you as a changeset and written only after you confirm it.
4. **Backfill** — for past PRs, `ywc-mine-review-history` scans many merged PRs at once and offers defect classes that keep recurring to `ywc-review-learnings`.
5. **Reuse** — `ywc-impl-review` loads the learnings at the start of every review (skip with `--skip-learnings`), so a known false positive is not raised again and a known `DO-NOT` is caught earlier. After the review it offers to record findings that recur.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
</ToolTabs>

The loop works in both tools. Each pass makes the next review quieter: comments the team already rejected stop coming back, and comments the team agreed with are caught before the PR is opened.

## From bug fix to prevention

1. `ywc-debug-rootcause` finds the root cause, adds a regression test, and gates the fix with `ywc-verify-done` ([12](./12-debugging-and-incident-postmortem.md)).
2. If the same class of defect could appear elsewhere, it offers to record it as a review learning (`ywc-review-learnings --mode update --source debug`).
3. After a Production incident, `ywc-incident-postmortem` writes the report and offers its recurrence-preventing action items the same way (`--source incident`).
4. From then on `ywc-impl-review` reads those learnings, so the same class of defect is caught in review instead of in Production.

Steps 2 and 3 are Claude Code only. In Codex the two Skills do not hand off to `ywc-review-learnings`; if a lesson is worth keeping, record it yourself with `ywc-review-learnings` (the default `feedback` source).

## Gates before and after a PR

| When | Skill | What it checks |
|---|---|---|
| Before implementation | `ywc-confidence-gate` | Scores readiness on five dimensions: PROCEED (90 or more), REVIEW (70-89), STOP (below 70). Below 90, implementation waits until the weakest dimension is raised or you accept the risk |
| After implementation | `ywc-impl-review` | Five-aspect review against the spec ([13](./16-code-structure-and-maintainability.md)) |
| When the change touches security | `ywc-security-audit` | Static security review (OWASP Top 10, secrets, threat model) |
| Before saying "done" | `ywc-verify-done` | Fresh evidence (test or build output) for every completion claim |
| Opening the PR | `ywc-create-pr` | Commit, push, and a PR body built from the task or plan |
| After reviewers respond | `ywc-handle-pr-reviews` | Comments, CI and conflicts, as in the loop above |
| Merging | `ywc-finish-branch` | CI and bot-review wait, merge, post-merge check, branch cleanup |

You rarely call `ywc-verify-done` directly: `ywc-code-gen` and both executors call it at their own completion step. Call it yourself when you finished the work by hand.

## Recording decisions while planning

This recipe is Claude Code only.

- Before planning, `ywc-plan` reads `docs/adr/` and `docs/project-mission.md` if they exist. A plan does not silently contradict a settled decision; a conflict is shown to you.
- When an architecture decision in the plan is hard to reverse, would surprise a later reader without context, and is a real trade-off, `ywc-plan` offers once to save it as an ADR through `ywc-adr`. When the plan settles a new lasting success criterion, it offers to add it to `docs/project-mission.md`.
- When the decision is a library or approach comparison, run `ywc-tech-research` first and plan on its findings.

<CodeBlock label="claude code" code="ywc-tech-research &quot;Hono SSE implementation&quot; --compare &quot;Redis,Valkey&quot;" />

Codex has neither `ywc-adr` nor `ywc-project-mission`; keep the reasoning in the plan or spec document instead.

## Discovery before planning

This recipe is Codex only.

1. `ywc-wayfinder` keeps a local map at `docs/ywc-plans/<slug>-wayfinder.md` across sessions. The map can hold many tickets, but exactly one is active at a time, and the Skill never implements anything itself.
2. Once a ticket's route is clear, it hands off to `ywc-plan` (or to `ywc-tech-research` when the ticket is blocked on a technical comparison).
3. From there the usual flow continues: `ywc-spec-ready` → `ywc-task-generator` → executor ([05](./05-general-cycle-medium-large.md)). When a single approved spec or ticket only needs implementing, `ywc-implement` does it as one focused, review-gated change.

<CodeBlock label="codex" code="ywc-wayfinder Split billing out of the monolith into its own service. The scope is still unclear" />

Use it only for work that is large, uncertain, or spans several sessions. Ordinary planning belongs to `ywc-plan`, and idea clarification to `ywc-brainstorm`.

## Parallel execution environment

`ywc-parallel-executor` creates each task's worktree through `ywc-worktrees`. In Docker projects it also gives each worktree its own host-port block through `ywc-docker-isolate`, so the stacks don't collide ("port is already allocated"). After the merge, `ywc-finish-branch` removes the worktree with `ywc-worktrees --mode prune`.

You normally call none of these yourself; the executor drives them in both tools. To make or clean up a worktree outside an executor run, use the commands in [17](./14-skill-reference.md).

## Release preparation

1. Clear pending dependency updates first: `ywc-merge-dependabot security parallel-auto`.
2. Open the release PR (for example `develop` → `main`), then build its description with `ywc-release-pr-list <release PR number>`, which groups the merged PRs by author.
3. Write `CHANGELOG.md` and user-facing notes with `ywc-changelog-release-notes`. Passing the result file from step 2 with `--pr-list` makes it use that list instead of git log.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>

---

[Previous: 18. Prerequisites and installation](./15-prerequisites-installation.md) · [Back to table of contents »](./README.md)
