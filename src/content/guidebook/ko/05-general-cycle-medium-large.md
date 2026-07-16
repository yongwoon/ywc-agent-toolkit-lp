[« 목차로 돌아가기](./README.md)

# 05. 여러 Task 로 나누어 처리하기 (general cycle · medium/large)

## 언제 이 흐름을 쓰는가

다음 중 하나라도 해당되면 `ywc-plan` 이 이 경로로 routing 합니다.

- 변경 사항을 검토 가능한 단일 PR 하나로 담기 어렵다 (여러 화면, 여러 API, 여러 subsystem)
- DB migration 이 포함된다 (규모와 무관하게 항상 이 경로 — 안전 불변식)
- 새 Library/Framework 도입이 포함된다 (역시 항상 이 경로)

## 전체 흐름

```
ywc-plan → ywc-spec-ready → ywc-task-generator → ywc-sequential-executor --review 또는 ywc-parallel-executor --review
```

| 단계 | Skill | 역할 |
|---|---|---|
| 1 | `ywc-plan` | 요청을 분석해 `docs/ywc-plans/<slug>.md` spec 생성 |
| 2 | `ywc-spec-ready` | spec 이 `DONE` 될 때까지 `ywc-plan --update-spec` ↔ `ywc-spec-validate` 자동 반복 |
| 3 | `ywc-task-generator` | `DONE` 된 spec 을 dependency-safe 한 여러 Task 로 분해 (`tasks/<phase>-<sequence>-<slug>/`) |
| 4 | `ywc-sequential-executor` 또는 `ywc-parallel-executor` | Task 를 실제로 구현 → PR → Merge |

**Sequential vs Parallel 선택 기준**

| 상황 | 선택 |
|---|---|
| Task 간 순서가 중요하거나, 서로의 결과물에 의존한다 | `ywc-sequential-executor` |
| Task 들이 서로 독립적이고, `dependency-graph.md` 상 병렬 실행 가능한 wave 로 묶인다 | `ywc-parallel-executor` (Git Worktree 로 격리) |

## 실행 예시

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan 사용자가 알림 종류별로 켜고 끌 수 있는 설정 화면과 API 가 필요함. 이메일/푸시/인앱 3채널 지원" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan 사용자가 알림 종류별로 켜고 끌 수 있는 설정 화면과 API 가 필요함. 이메일/푸시/인앱 3채널 지원" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

이후 실행 command 는 옵션이 많아 별도 페이지에서 다룹니다 → [16. Executor / Code-gen Prompt 패턴](./13-executor-and-codegen-patterns.md). 가장 단순한 시작은 아래와 같습니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
</ToolTabs>

task 지정을 생략하면 `dependency-graph.md` 에서 다음 실행 가능한 Task 를 자동으로 찾습니다.

## `--review` 를 반드시 붙이세요

두 executor 모두 `--review` flag 로 각 Task 의 PR 생성/merge 전에 `/ywc-impl-review` 를 자동 실행합니다. 이 flag 없이 실행하면 [04](./04-general-cycle-small.md)의 small cycle 처럼 리뷰 단계가 완전히 빠지는 것과 같습니다 — 붙이지 않을 이유가 없습니다. (단, Task 의 `Criticality: critical` 이 설정된 경우 flag 유무와 무관하게 항상 강제 실행됩니다.)

## 각 단계에서 막혔을 때

| 상황 | 조치 |
|---|---|
| `ywc-spec-ready` 가 iteration 상한에 도달함 | 자동 수렴이 안 되는 근본적인 spec 문제 — 부분 리포트를 읽고 직접 spec 을 수정 |
| `ywc-task-generator` 가 Task 20개 이상을 만들려 함 | spec 자체가 과도하게 큰 신호 — spec 분할을 먼저 고려 |
| Task 실행 중 dependency 가 아직 완료되지 않음 | executor 가 자동으로 멈추고 어떤 Task 가 선행되어야 하는지 보고함 |

---

[← 이전: 04. 작은 변경 처리하기](./04-general-cycle-small.md) · [다음: 06. 목표 하나로 자동 완료하기 →](./06-agentic-autonomous-loop.md)
