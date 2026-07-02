[« 목차로 돌아가기](./README.md)

# 06. 목표 하나로 자동 완료하기 (ywc-agentic)

## 언제 이 흐름을 쓰는가

[04](./04-general-cycle-small.md), [05](./05-general-cycle-medium-large.md)는 각 단계(`ywc-plan` → ... → executor)를 사용자가 직접 하나씩 호출하는 **수동 제어** 흐름입니다. `ywc-agentic` 은 자연어 목표 하나만 주면 이 전체 파이프라인을 **Plan → Execute → Evaluate → Repeat** 루프로 자동 반복하며, 검증을 통과할 때까지(또는 반복 상한에 도달할 때까지) 사람 개입 없이 끝까지 진행합니다.

- 매번 다음 skill 을 직접 챙기지 않고 목표 하나만 던지고 싶을 때 → 이 페이지
- Task 단위로 직접 통제하고 싶을 때 (어떤 task 를 언제 실행할지 내가 정함) → [05](./05-general-cycle-medium-large.md)의 executor 를 직접 사용
- Task 분해 없이 기존 tasks/ backlog 를 그대로 실행할 때 → `ywc-sequential-executor` / `ywc-parallel-executor` 를 직접 호출 (agentic 이 아니라)

## 무엇을 자동으로 해주는가

```
Goal → [Plan → Execute → Evaluate → Repeat] → Result
```

내부적으로 기존 `ywc-*` skill 들을 그대로 오케스트레이션합니다 — 새로운 코드 생성 로직을 갖고 있지 않습니다.

| Phase | 하는 일 |
|---|---|
| Plan | `ywc-plan --non-interactive` 로 계획 수립 (Small 이면 `plan.md`, Medium/Large 면 `ywc-spec-ready` 로 spec 을 `DONE` 까지 수렴) |
| Task | (Medium/Large 만) `ywc-task-generator` 로 분해, `dependency-graph.md` 기준으로 executor 자동 선택 |
| Execute | Small 은 `ywc-code-gen`, Medium/Large 는 executor 를 `--local-merge` 모드로 실행 (PR 없이 빠르게 반복) |
| Evaluate | `ywc-impl-review` 로 이번 iteration 의 변경분만 검토 + `ywc-verify-done` 으로 lint/typecheck/test/build 확인 |
| Repeat | 검증 실패 시 `ywc-plan --update-spec` 으로 재계획, `--max-iterations` 상한까지 반복 |

**Success Oracle** — 매 run 마다 "무엇이 되면 끝인가"를 미리 falsifiable 하게 정의해서 끝까지 들고 다닙니다: Target(목표 동작) / Quality threshold(최소 통과 기준) / Evidence required(필요한 증거) / Stop condition(중단 조건). Pass 판정은 `ywc-impl-review` 가 `DONE` 을 반환**하고 동시에** `ywc-verify-done` 이 green 이어야만 성립합니다 — review 만 `DONE` 이고 test 가 빨간불이면 여전히 Fail 입니다.

## 실행 예시

**목표 하나만 자연어로 던지기 (기본, 최대 3회 반복)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**반복 상한을 늘려서 더 끈질기게 시도하게 하기**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --max-iterations 5" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --max-iterations 5" />
  </ToolTabsPanel>
</ToolTabs>
`--max-iterations` 는 사용자가 정하는 안전장치입니다 — 수렴이 안 된다고 agent 가 스스로 상한을 올리는 일은 없습니다.

**executor 를 명시적으로 지정하고 싶을 때**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;알림 설정 화면과 API 추가&quot; --executor sequential" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;알림 설정 화면과 API 추가&quot; --executor sequential" />
  </ToolTabsPanel>
</ToolTabs>
기본값 `auto` 는 `dependency-graph.md` 를 보고 sequential/parallel 을 자동 선택합니다.

**중단된 run 을 이어서 진행하기**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic --resume" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic --resume" />
  </ToolTabsPanel>
</ToolTabs>
`tasks/` 에 아직 완료되지 않은 task 가 남아있으면 Plan Phase 를 건너뛰고 그 지점부터 재개합니다.

**실제로 실행하지 않고 어떤 phase 가 순서대로 돌지만 미리 보기**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

## 목표가 애매하면 멈춥니다

"자율적으로 실행한다"는 말이 "빈 칸을 알아서 채운다"는 뜻은 아닙니다. Plan Phase 전에 목표를 분류해 애매하면 **먼저 멈춥니다**:

| 목표의 상태 | 동작 |
|---|---|
| 구체적 (무엇을/어디에/완료 조건이 다 있음) | 바로 진행 |
| Why 만 빠짐 (구현 방식과 완료 조건은 명확) | 진행하되 defaulted 로 표시 |
| 불명확 (완료 조건이 없거나, 해석이 2가지 이상 가능) | `NEEDS_CONTEXT` 로 멈추고 대화 가능하면 `ywc-brainstorm` 으로 안내 |
| 위험/비가역적 (인증, 결제, 권한, 데이터 삭제, schema migration) | `ywc-confidence-gate` 를 먼저 통과해야 진행 |

## 각 단계에서 막혔을 때

| 상황 | 조치 |
|---|---|
| `NEEDS_CONTEXT` 로 시작 자체가 안 됨 | 목표가 애매하다는 뜻 — 목표를 더 구체적으로 다시 쓰거나, 대화형으로 먼저 정리하려면 `ywc-brainstorm` 사용 |
| `BLOCKED` (merge conflict, CI 하드 에러) | 자동 복구를 시도하지 않습니다 — `tasks/agentic-log.md` 에 기록된 내용을 보고 직접 해결 후 재실행 |
| 반복 상한(`--max-iterations`)에 도달 | `DONE_WITH_CONCERNS` 로 종료, 남은 CRITICAL/HIGH finding 목록이 함께 보고됨 — 직접 고치거나 상한을 올려 재실행 |
| 재계획해도 계속 같은 범위로 되돌아옴 | 정체(recursion guard)로 판단해 자동 중단됩니다 — spec 이나 목표 자체를 다시 봐야 함 |

## 완료 후 확인할 것

- `tasks/agentic-log.md` — iteration 별 phase, 통과/실패, finding, Success Oracle 이 append-only 로 기록됨
- 반복되는 CRITICAL/HIGH finding 이 있었다면 완료 보고서에 `Learning candidate` 로 표시 — 확인 후 원한다면 `ywc-review-learnings` 로 직접 등록 (자동으로 기록되지 않음)

---

[← 이전: 05. 여러 Task 로 나누어 처리하기](./05-general-cycle-medium-large.md) · [다음: 07. 새 Project 시작하기 →](./07-starting-a-new-project.md)
