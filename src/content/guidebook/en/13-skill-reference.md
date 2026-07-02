[Back to table of contents](./README.md)

# 13. Full Skill Reference

This page groups the remaining Skills not covered in the previous workflow guides by **what you want to do**. Use it when needed in the middle of each flow: Small/Medium/Large cycle, new project, onboarding, testing, or design.

## When you want to handle PR / Review

**Respond to review comments on an open PR and clean up CI/conflicts too**
```
ywc-handle-pr-reviews 250
```
If you omit the PR number, it automatically finds the PR for the current branch.

**Commit changes and open a draft PR**
```
ywc-create-pr --title "fix: correct timezone offset in report export" --lang ko
```
This is already included in the flows from [04](./04-general-cycle-small.md) and [05](./05-general-cycle-medium-large.md), so use it when you want to open only a standalone PR outside those flows.

**Clean up accumulated Dependabot PRs at once**
```
ywc-merge-dependabot security parallel-auto
```
If you omit `security`, it targets all Dependabot PRs. If you omit `parallel-auto`, it processes PRs sequentially by PR number.

**Just commit the work done so far**
```
ywc-commit authentication 관련 변경만 커밋해줘
```
This is not for PR creation or code changes themselves. It is commit-only.

## When you do not have a plan yet, or want it to run to completion without human intervention

**Your idea is not concrete yet and you want to clarify it first**
```
ywc-brainstorm 알림 기능을 만들고 싶은데 아직 어떻게 할지 구체적이지 않음
```
Through Socratic dialogue, it derives the goal / constraints / success criteria and 2-3 alternatives, then hands off to `ywc-plan`.

**You want to give one goal and leave planning through implementation to run without human intervention**

This has moved to the dedicated `ywc-agentic` page. See [06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) for usage and examples.

## When you want to check quality and security

**Check security vulnerabilities in sensitive code such as auth/payment**
```
ywc-security-audit --code tools/codex-skill/skills/ywc-security-audit/SKILL.md
```

**You are stuck because you cannot find the cause of a bug**
```
ywc-debug-rootcause 결제 webhook 이 가끔 중복 처리됨. 원인을 못 찾겠음
```
This prevents patches that only address symptoms and forces a four-step root-cause investigation. If fixes fail at the same point three or more times, it guides you to question the architecture itself.

**Clean up old dead code (unused functions/exports/dependencies)**
```
ywc-refactor-clean --scope tools/codex-skill/skills/ywc-refactor-clean/ --tier safe
```

**Write a postmortem for a Production incident**
```
ywc-incident-postmortem --client
```
`--client` additionally creates a customer-facing summary that omits internal details.

## When you want to accumulate project knowledge (Stateful Skills)

These Skills are not one-off utilities. They manage knowledge that remains in the project after the conversation ends and can be referenced in later sessions.

**Teach the system about repeated code review feedback so it does not raise the same false positive again**
```
ywc-review-learnings 이 지적은 false positive 야, 학습해둬
```

**Create or update a domain glossary shared by developers, domain experts, and LLMs**
```
ywc-ubiquitous-language --context billing --ddd
```
`--ddd` adds DDD Type columns such as Entity / Value Object / Aggregate.

**Record the project's why and rejected approaches**
```
ywc-mission 이 project 의 목표는 ...
```
This is already covered in [07. Starting a new Project](./07-starting-a-new-project.md), and can also be reused when the project direction changes.

## When you want to prepare a Release

**Summarize the list of merged PRs included in a Release PR (develop->main, etc.)**
```
ywc-release-pr-list 301
```

**Write CHANGELOG.md or user-facing release notes**
```
ywc-changelog-release-notes --both --version 1.4.0
```
If you pass `--pr-list <result file from ywc-release-pr-list>`, it uses that list as the source instead of git log.

---

[Previous: 12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md) - [Back to table of contents](./README.md)
