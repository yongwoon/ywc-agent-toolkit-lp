[« 목차로 돌아가기](./README.md)

# 03. 5분 안에 첫 기능 배포하기

이 페이지는 작은 버그 수정 하나를 아이디어 단계부터 merge 까지 실제로 따라가 보는 첫 실습입니다. 예시 시나리오: **"로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어렵다"** 는 요청을 처리합니다.

이 흐름의 개념 설명은 [04. general cycle (small)](./04-general-cycle-small.md)에서 더 자세히 다룹니다 — 이 페이지는 실습에 집중합니다.

## Step 1 — 계획 세우기

<ToolTabs>
<ToolTabsPanel tool="claude-code" label="Claude Code">
<CodeBlock label="claude code" code="ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움. 잠김/오타/미가입 등 구체적 사유를 보여주고 싶음" />
</ToolTabsPanel>
<ToolTabsPanel tool="codex" label="Codex">
<CodeBlock label="codex" code="ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움. 잠김/오타/미가입 등 구체적 사유를 보여주고 싶음" />
</ToolTabsPanel>
</ToolTabs>

`ywc-plan` 이 codebase 를 먼저 읽고, 이 변경이 단일 PR 로 끝날 수 있는 **Small** 규모인지 판단합니다. Small 로 판단되면 `plan.md` 파일이 생성됩니다 — What / Why / Out of Scope / Done When 4가지 항목이 채워져 있는지 확인하세요.

## Step 2 — 계획을 수렴시키기

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
</ToolTabs>

`plan.md` 에 아직 남은 concern 이 있으면 자동으로 보완 후 재검증하고, 이미 깨끗하면 그대로 다음 단계로 handoff 됩니다.

## Step 3 — 코드 생성

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

Backend / Frontend / QA 세 layer 를 병렬로 생성합니다. 생성이 끝나면 `DONE`, `DONE_WITH_CONCERNS`, `BLOCKED`, `NEEDS_CONTEXT` 중 하나로 끝나는 완료 보고서가 나옵니다 — 각 상태의 의미는 [02. 핵심 개념](./02-core-concepts.md)을 참고하세요.

## Step 4 — PR 열기 전에 리뷰하기

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-code-gen` 은 자동 리뷰 flag 가 없으므로, 이 단계를 건너뛰면 코드 리뷰 없이 바로 PR 이 열립니다. **생략하지 마세요.**

## Step 5 — PR 생성 및 Review

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-create-pr` 이 commit, secret scan, local validation, draft PR 생성, remote CI/Bot Review 확인을 처리합니다. Bot review comment 나 merge-readiness 문제가 남으면 아래처럼 PR health sweep 을 별도로 실행합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
</ToolTabs>

Small 흐름은 `plan.md` 기반이라 `tasks/<task-name>/` artifact 가 없습니다. 따라서 task 완료 처리까지 포함하는 `ywc-finish-branch` 대신, reviewer 승인 후 GitHub UI 또는 `gh pr merge` 로 merge 하는 흐름이 더 안전합니다.

## 여기까지 왔다면

축하합니다 — 하나의 변경을 처음부터 끝까지 완주했습니다. 다음에 볼만한 페이지:

- 변경 규모가 이보다 커서 Task 여러 개로 쪼개야 한다면 → [05. general cycle (medium/large)](./05-general-cycle-medium-large.md)
- 아직 아이디어가 구체적이지 않다면 (이 실습처럼 이미 문제가 명확한 경우가 아니라면) → `ywc-brainstorm` 부터 시작 ([17. 전체 Skill 레퍼런스](./14-skill-reference.md) 참고)
- 매번 직접 챙기지 않고 목표 하나만 던져서 자동으로 끝까지 진행시키고 싶다면 → [06. 목표 하나로 자동 완료하기](./06-agentic-autonomous-loop.md)

---

[← 이전: 02. 핵심 개념](./02-core-concepts.md) · [다음: 04. 작은 변경 처리하기 →](./04-general-cycle-small.md)
