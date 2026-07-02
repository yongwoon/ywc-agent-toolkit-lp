[Back to table of contents](./README.md)

# 08. Entering an existing Repo for the first time

## When to use this flow

Use this when you first enter an unfamiliar repository that already has code and need to understand "what this codebase looks like." Conversely, if you are designing a new project from a blank slate, go to [07. Starting a new Project](./07-starting-a-new-project.md). These two flows move in opposite directions and should not be used together in the same session.

## What it does

`ywc-onboard-repo` uses Glob/Grep reconnaissance to extract tech stack / architecture / conventions and produce two things.

1. **Onboarding Guide** - A document printed directly in the conversation (Tech Stack, Architecture, Key Entry Points, Directory Map, Request Lifecycle, Conventions, and more)
2. **Starter CLAUDE.md** - A file written to the repo root. If `CLAUDE.md` already exists, it is not overwritten; it is augmented with a `## Detected Conventions` section.

## Example run

**Default run** - inspect the whole repo and generate both Onboarding Guide and Starter CLAUDE.md
```
ywc-onboard-repo
```

**Inspect only a specific workspace in a monorepo**
```
ywc-onboard-repo --scope apps/web/
```

**When you need only the explanatory document, not Starter CLAUDE.md**
```
ywc-onboard-repo --guide-only
```

**When you need only CLAUDE.md, not the Onboarding Guide**
```
ywc-onboard-repo --claude-md-only
```

## What to do next

- If reconnaissance finds accumulated dead code, the result report includes guidance. Split follow-up cleanup into a separate PR with `ywc-refactor-clean`; do not mix it into the onboarding PR.
- Once you have read the Onboarding Guide, move on to the normal development flow for changing existing code. Start with [02. Core concepts](./02-core-concepts.md) to confirm the Small/Medium/Large scale criteria.

---

[Previous: 07. Starting a new Project](./07-starting-a-new-project.md) - [Next: 09. Writing and running Tests](./09-testing-guide.md)
