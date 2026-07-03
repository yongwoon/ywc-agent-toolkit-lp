[« 목차로 돌아가기](./README.md)

# 02. 핵심 개념

이 페이지의 용어와 개념을 알고 나면 나머지 모든 가이드 페이지의 예시를 그대로 응용할 수 있습니다.

## Skill, Agent, Executor, Task

| 용어 | 의미 |
|---|---|
| **Skill** | `/ywc-plan` 처럼 사용자가 직접 호출하는 절차. `claude-code/skills/<name>/SKILL.md` 에 정의되어 있으며, 이 Guidebook 이 다루는 대부분의 대상입니다. |
| **Agent (Subagent)** | Skill 이 내부적으로 위임하는 전문 역할 실행 단위 (예: `ywc-backend-coder`, `ywc-security-engineer`). 사용자가 직접 호출하지 않고 Skill 이 Task 도구로 dispatch 합니다. |
| **Executor** | Task 를 실제로 실행하는 두 Skill, `ywc-sequential-executor` (순차) 와 `ywc-parallel-executor` (병렬)를 함께 부르는 말. |
| **Task** | `ywc-task-generator` 가 spec 을 분해해서 만든, `tasks/<phase>-<sequence>-<slug>/` 디렉토리 하나. `README.md`(metadata) + `task.md`(구현 checklist) 로 구성됩니다. |

## 규모(Scale) 가 흐름을 결정한다

모든 작업은 `ywc-plan` 에서 시작하며, `ywc-plan` 이 요청의 규모를 판단해 두 흐름 중 하나로 routing 합니다.

| 규모 | 판단 기준 | 산출물 | 다음 단계 |
|---|---|---|---|
| **Small** | 단일 PR 로 끝나는 변경, DB migration/새 Library 도입이 없음 | `plan.md` | [04. general cycle (small)](./04-general-cycle-small.md) |
| **Medium/Large** | 여러 Task 로 쪼개야 함, DB migration 또는 새 Library 도입 포함 | `docs/ywc-plans/<slug>.md` | [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) |

DB migration 이나 새 Library 도입은 규모와 무관하게 **항상 별도 취급**됩니다 — `ywc-plan` 과 `ywc-task-generator` 모두의 안전 불변식(Safety Invariant)입니다.

## 4가지 완료 상태

거의 모든 Skill 은 작업을 마칠 때 아래 4가지 상태 중 하나로 끝맺습니다. 이 어휘를 알아두면 어떤 Skill 의 결과 보고서를 읽어도 다음에 뭘 해야 할지 바로 판단할 수 있습니다.

| 상태 | 의미 | 사용자가 할 일 |
|---|---|---|
| `DONE` | 완전히 끝남, 문제 없음 | 다음 단계로 진행 |
| `DONE_WITH_CONCERNS` | 끝났지만 주의할 점이 있음 | Concern 을 읽고 correctness 문제면 수정, observation 이면 그냥 진행 |
| `BLOCKED` | 진행 불가 — 사람의 판단이 필요함 | 제시된 blocker 를 확인하고 직접 해결 후 재실행 |
| `NEEDS_CONTEXT` | 정보가 부족해 시작할 수 없음 | 요청된 정보를 채워서 다시 호출 |

## 전체 흐름 한눈에 보기

<FlowDiagram>
  <FlowStep>아이디어</FlowStep>
  <FlowStep>ywc-plan (규모 판단)</FlowStep>
  <FlowBranch label="Small">
    <FlowChain items="plan.md, ywc-spec-ready, ywc-code-gen, ywc-impl-review, ywc-create-pr" />
  </FlowBranch>
  <FlowBranch label="Medium/Large">
    <FlowChain items="docs/ywc-plans/<slug>.md, ywc-spec-ready, ywc-task-generator" />
    <FlowStep>ywc-sequential-executor --review 또는 ywc-parallel-executor --review</FlowStep>
    <FlowChain items="PR, CI, Bot Review, Merge (Executor 가 자동 처리)" />
  </FlowBranch>
</FlowDiagram>

이 흐름의 각 갈래는 [04](./04-general-cycle-small.md), [05](./05-general-cycle-medium-large.md) 페이지에서 실제 command 예시와 함께 자세히 다룹니다.

## PR Delivery 모드 공통 개념

`ywc-finish-branch`, `ywc-sequential-executor`, `ywc-parallel-executor` 는 task 기반 delivery 에서 아래 모드 개념을 공유합니다. `plan.md` 기반 Small 흐름은 task artifact 가 없으므로 `ywc-create-pr` 로 PR 을 열고 이후 review/merge 를 별도로 처리합니다. 정확한 flag 조합은 [12. Executor / Code-gen Prompt 패턴](./12-executor-and-codegen-patterns.md)에서 다룹니다.

| 모드 | 의미 |
|---|---|
| `normal-pr` (기본값) | PR 생성 → CI 대기 → Bot Review 대응 → Merge 까지 전부 자동 처리 |
| `--draft` | PR 만 생성하고 멈춤 — Merge 는 사람이 수동으로 |
| `--local-merge` | PR 없이 로컬에서 base branch 로 직접 merge |
| `--aggregate-pr` (executor 전용) | 여러 Task 를 브랜치 하나에 모아 PR **1개**로 묶어 delivery |

---

[← 이전: 01. 소개](./01-introduction.md) · [다음: 03. 5분 안에 첫 기능 배포하기 →](./03-quickstart.md)
