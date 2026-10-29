[« 목차로 돌아가기](./README.md)

# 06. 여러 Task 로 나누어 처리하기 (general cycle · medium/large)

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

## Task ID 와 협업자 initials

`ywc-task-generator` 는 Task ID 앞에 협업자의 initials 를 붙입니다. 여러 사람이 동시에 Task 를 만들어도 번호가 겹치지 않게 하기 위해서입니다.

- 예: 기존 `000001-010-db-create-user-table` → 새 `yk-000001-010-db-create-user-table`. Task 디렉터리 이름도 같습니다.
- initials 가 없는 기존 ID 는 그대로 유효하며 번호를 바꾸지 않습니다. 두 방식의 ID 가 함께 있어도 괜찮습니다.
- initials 는 소문자 영문과 숫자 2–4자입니다. `--initials yk` 로 직접 지정하거나, skill 이 아래 순서로 확인하게 할 수 있습니다.
  - Claude Code: `--initials` → 프로젝트 `CLAUDE.md` 의 `## Task Initials` 섹션 → `git config user.email` / `user.name` 에서 유도한 뒤 한 번 확인 (확인된 값은 `CLAUDE.md` 에 저장됩니다). 어디에서도 값을 얻지 못하면 initials 없는 기존 번호 방식으로 되돌아갑니다.
  - Codex: `--initials` → 프로젝트 `.codex/ywc.json` → 사용자 `~/.codex/ywc.json` → 유도한 뒤 한 번 확인 (`ywc-setup` 으로 저장됩니다). 비대화형 실행에서 저장된 값도 없으면 `NEEDS_CONTEXT` 로 멈추고 `--initials` 를 요청합니다.
- 번호는 initials 마다 따로 셉니다. 각자의 번호는 자기 initials 로 만든 Task 중 가장 높은 phase 에서 이어집니다.

Task 생성 옵션 두 가지도 알아 두면 좋습니다.

- `--mode human|llm` (별칭 `--granularity`): Task 의 크기를 정합니다. `human` 은 사람이 약 1시간 안에 검토할 수 있는 크기, `llm` 은 agent 가 처리하도록 더 크게 묶은 크기입니다. flag 를 생략하면 skill 이 매번 묻고, 임의로 고르지 않습니다.
- `tasks/dependency-graph.md` 가 300줄을 넘으면 Task 생성 전에 skill 이 자동으로 압축합니다. 완료된 phase 는 "done" 한 줄짜리 heading 으로 접힙니다. executor 도 Task 를 끝낼 때마다 같은 압축을 합니다. 사용자가 따로 할 일은 없습니다.

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

이후 실행 command 는 옵션이 많아 별도 페이지에서 다룹니다 → [18. Executor / Code-gen Prompt 패턴](./13-executor-and-codegen-patterns.md). 가장 단순한 시작은 아래와 같습니다.

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

두 executor 모두 `--review` flag 로 각 Task 의 PR 생성/merge 전에 `/ywc-impl-review` 를 자동 실행합니다. 이 flag 없이 실행하면 [05](./04-general-cycle-small.md)의 small cycle 처럼 리뷰 단계가 완전히 빠지는 것과 같습니다 — 붙이지 않을 이유가 없습니다. (단, Task 의 `Criticality: critical` 이 설정된 경우 flag 유무와 무관하게 항상 강제 실행됩니다.)

## 각 단계에서 막혔을 때

| 상황 | 조치 |
|---|---|
| `ywc-spec-ready` 가 iteration 상한에 도달함 | 자동 수렴이 안 되는 근본적인 spec 문제 — 부분 리포트를 읽고 직접 spec 을 수정 |
| `ywc-task-generator` 가 Task 20개 이상을 만들려 함 | spec 자체가 과도하게 큰 신호 — spec 분할을 먼저 고려 |
| Task 실행 중 dependency 가 아직 완료되지 않음 | executor 가 자동으로 멈추고 어떤 Task 가 선행되어야 하는지 보고함 |

---

[← 이전: 05. 작은 변경 처리하기 (general cycle · small)](./04-general-cycle-small.md) · [다음: 07. 목표 하나로 자동 완료하기 (ywc-agentic) →](./06-agentic-autonomous-loop.md)
