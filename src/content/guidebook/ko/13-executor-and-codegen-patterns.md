[« 목차로 돌아가기](./README.md)

# 16. Executor / Code-gen Prompt 패턴

`ywc-sequential-executor`, `ywc-parallel-executor`, `ywc-code-gen` 은 모두 "코드를 만들게 하는" Skill 이지만 쓰는 순간이 다릅니다. 이 페이지는 Skill 이름보다 **지금 하려는 일**을 기준으로 정리했습니다. 먼저 아래 표에서 상황을 고른 뒤, 해당 섹션의 명령을 그대로 복사해 쓰세요.

| 지금 하려는 일 | 고를 Skill |
|---|---|
| 이미 `tasks/` 로 쪼개진 작업을 순서대로 처리한다 | `ywc-sequential-executor` |
| 서로 독립적인 여러 Task 를 동시에 처리한다 | `ywc-parallel-executor` |
| 아직 Task 로 쪼개지 않은 기능을 spec 하나로 바로 구현한다 | `ywc-code-gen` |

## 먼저 이해할 것: Task, branch, PR 의 관계

Executor 를 처음 쓸 때 헷갈리는 지점은 "Task 를 여러 개 실행하면 branch 와 PR 이 몇 개 생기나?"입니다. 기본값은 단순합니다.

- **Task**: 구현해야 할 작업 단위입니다. 예: `000020-010`, `000021-010`.
- **Branch**: 코드 변경을 임시로 쌓는 Git 줄기입니다.
- **PR**: branch 의 변경을 `main` / `develop` 같은 base branch 로 합치기 위한 review 단위입니다.

`--aggregate-pr` 를 쓰지 않으면 **Task 하나가 branch 하나와 PR 하나**가 됩니다. `--aggregate-pr` 를 쓰면 **여러 Task 를 공유 branch 하나에 모은 뒤 PR 하나**로 보냅니다.

<FlowDiagram>
  <FlowStep>Tasks 선택</FlowStep>
  <FlowStep>구현</FlowStep>
  <FlowStep>Branch 생성</FlowStep>
  <FlowStep>PR 생성</FlowStep>
  <FlowBranch label="기본 동작">
    <FlowChain items="Task 000020 → branch 1 → PR 1, Task 000021 → branch 2 → PR 2, Task 000022 → branch 3 → PR 3" />
  </FlowBranch>
  <FlowBranch label="--aggregate-pr">
    <FlowChain items="Task 000020, Task 000021, Task 000022, 공유 branch 1개, PR 1개" />
  </FlowBranch>
</FlowDiagram>

## 여러 Task 를 PR 하나로 묶기 (`--aggregate-pr`, `--group-name`)

`--aggregate-pr` 와 `--group-name` 은 `ywc-sequential-executor` 와 `ywc-parallel-executor` 둘 다에서 같은 역할을 합니다.

**`--aggregate-pr` 는 delivery 단위를 바꿉니다.** Task 를 몇 개 실행하든 마지막에 PR 을 하나만 만들고 싶을 때 켭니다.

**`--group-name` 은 그 공유 branch 의 이름을 정합니다.** 생략하면 `<base-branch>-<timestamp>` 같은 자동 이름이 붙지만, 나중에 branch 목록에서 무엇을 위한 작업이었는지 알기 어렵습니다. 그래서 `--aggregate-pr` 를 쓸 때는 `--group-name project-health` 처럼 의미 있는 이름을 같이 주는 편이 좋습니다.

예를 들어 Task 3개를 실행한다고 가정하면 branch 는 이렇게 보입니다.

**`--aggregate-pr` 를 쓰지 않을 때: Task 마다 PR 이 따로 생김**

```txt
main
├─ task/000020-010-project-health-api      → PR #101
├─ task/000021-010-project-health-ui       → PR #102
└─ task/000022-010-project-health-tests    → PR #103
```

**`ywc-sequential-executor --aggregate-pr --group-name project-health` 를 쓸 때: 하나의 `work/` branch 로 묶임**

```txt
main
└─ work/project-health                     → PR #101
   ├─ 000020-010 변경
   ├─ 000021-010 변경
   └─ 000022-010 변경
```

**`ywc-parallel-executor --aggregate-pr --group-name payments` 를 쓸 때: 하나의 `aggregate/` branch 로 묶임**

```txt
main
└─ aggregate/payments                      → PR #101
   ├─ wave 1: 독립 Task 변경
   ├─ wave 2: 다음 독립 Task 변경
   └─ wave 3: 마지막 독립 Task 변경
```

| 구분 | `--aggregate-pr` 없음 | `--aggregate-pr` 있음 |
|---|---|---|
| Branch 수 | Task 수만큼 | 공유 branch 1개 |
| PR 수 | Task 수만큼 | PR 1개 |
| Review 방식 | Task 별로 작게 review | 관련 변경을 한 번에 review |
| 실패 파악 | 어떤 Task PR 이 실패했는지 바로 보임 | 공유 branch 안에서 어느 Task 가 막혔는지 report 를 봐야 함 |
| 추천 상황 | 독립적인 변경, 따로 배포해도 되는 변경 | 한 기능을 이루는 API + UI + test + migration 묶음 |

| Skill | 공유 branch 이름 형식 |
|---|---|
| `ywc-sequential-executor --aggregate-pr --group-name <name>` | `work/<name>` |
| `ywc-parallel-executor --aggregate-pr --group-name <name>` | `aggregate/<name>` |

중요한 점은 공유 branch 가 **실제 base branch 가 아니라는 것**입니다. `work/project-health` 나 `aggregate/payments` 에 Task 변경이 먼저 모이고, 마지막 PR 이 merge 되기 전까지 `main` / `develop` 은 그대로 유지됩니다.

## ywc-sequential-executor — Task 를 순서대로 실행하고 싶을 때

> **참고**: `ywc-sequential-executor` 자체에는 별도의 `--tdd` flag가 없습니다. 각 Task 구현 단계는 내부적으로 `ywc-code-gen`과 동일한 기본 TDD gate(구현 전에 실패하는 테스트를 먼저 확인)를 따릅니다. RED → GREEN → REFACTOR 전체 의식과 단계별 checkpoint commit이 필요하면, 아래 `ywc-code-gen` 섹션의 `--tdd` flag를 참고해 해당 Task의 구현 요청에 명시적으로 포함시키세요.

**Task 하나만 기본값으로 실행하고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
</ToolTabs>
기본 `normal-pr` 모드 — PR 생성 → CI → bot review → merge 까지 전부 자동 처리됩니다.

**PR 을 열기 전에 자동으로 코드 리뷰까지 받고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>

**여러 Task 를 한번에, PR 설명은 일본어로 받고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
</ToolTabs>

**PR 없이 빠르게 로컬에서 merge 까지 끝내고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
</ToolTabs>
PR 모드에선 CI 가 test 를 대신 돌려주지만, `--local-merge` 는 원격 CI 가 없으므로 `--run-tests-locally` 로 merge 전 로컬 test 통과를 강제하는 것이 좋습니다.

**여러 Task 를 PR 하나로 묶어서 배포하고 싶다 (`--aggregate-pr`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
`work/project-health` 브랜치 하나에 순차로 쌓은 뒤 PR **1개**로 delivery 됩니다. `--aggregate-pr` 와 `--group-name` 의 전체 개념은 위의 "여러 Task 를 PR 하나로 묶기" 절을 참고하세요.

**일단 PR 만 만들고 merge 는 나중에 사람이 하고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>

**뭘 실행해야 할지 모르겠다, 계획만 먼저 보고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
</ToolTabs>
Task 를 지정하지 않으면 dependency-graph 에서 다음 실행 대상을 자동 감지하고, 실행 계획만 출력합니다 (아무 것도 실제로 실행하지 않음).

**다른 작업(main checkout)에 방해되지 않게 격리해서 실행하고 싶다 (`--worktree`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
</ToolTabs>

`worktree` 는 Git 이 같은 repository 를 **다른 폴더에 한 벌 더 펼쳐 주는 기능**입니다. 새 clone 을 받는 것은 아니고, 같은 `.git` 정보를 공유하면서 작업 폴더만 분리합니다.

```txt
원래 작업 폴더
/repo
└─ main checkout                         # 사용자가 계속 작업해도 됨

executor 가 만든 임시 작업 폴더
/repo/.worktrees/run-project-health
└─ integration/run-project-health        # executor 가 여기서 Task 실행
```

`ywc-sequential-executor --worktree` 는 range **전체를 worktree 하나 안에서** 실행합니다. Task 들은 여전히 순서대로 실행되지만, 실행 장소가 원래 checkout 이 아니라 임시 worktree 로 바뀝니다.

<FlowDiagram>
  <FlowStep>원래 checkout 유지</FlowStep>
  <FlowStep>임시 worktree 생성</FlowStep>
  <FlowStep>Task range 순차 실행</FlowStep>
  <FlowStep>결과 branch / PR 처리</FlowStep>
  <FlowBranch label="성공">
    <FlowChain items="worktree 삭제, integration branch 또는 aggregate branch 보존, delivery 모드에 따라 PR 처리" />
  </FlowBranch>
  <FlowBranch label="실패 또는 보류">
    <FlowChain items="worktree 보존, report 의 경로로 이동, 이어서 수정 또는 resume" />
  </FlowBranch>
</FlowDiagram>

처음 쓸 때는 이렇게 이해하면 됩니다.

| 질문 | 답 |
|---|---|
| 원래 `main` checkout 이 바뀌나? | 아니요. executor 는 별도 폴더에서 실행됩니다. |
| Task 마다 worktree 가 하나씩 생기나? | `ywc-sequential-executor --worktree` 에서는 아닙니다. range 전체가 worktree 하나를 공유합니다. |
| PR 방식도 바뀌나? | 아니요. `--worktree` 는 실행 장소만 바꿉니다. PR 을 어떻게 만들지는 `normal-pr`, `--draft`, `--local-merge`, `--aggregate-pr` 가 결정합니다. |
| 실패하면 폴더가 사라지나? | 아니요. `BLOCKED` / `DONE_WITH_CONCERNS` 상태에서는 나중에 이어서 볼 수 있도록 worktree 를 남깁니다. |

완료 후 처리는 delivery 모드에 따라 다릅니다.

- `normal-pr` / `--local-merge` / `--draft` 조합: 실행이 `DONE` 으로 끝나면 worktree 는 삭제되지만 **integration branch 는 보존**됩니다. Report 에 "integration branch 가 아직 trunk 로 merge 되지 않았다"는 안내가 나오면, `ywc-create-pr` 로 `integration/run-<slug> → trunk` PR 을 직접 열어야 합니다.
- `--aggregate-pr` 조합: 수동 PR 단계가 필요 없습니다. `work/<name>` branch 가 worktree 안에서 만들어지고, 마지막에 `work/<name> → base` PR 이 자동으로 열립니다.
- 실패 또는 보류 상태: worktree 를 삭제하지 않습니다. Report 에 찍힌 경로로 들어가 상태를 확인하고 이어서 진행할 수 있습니다.

`--dry-run` 과 함께 쓰면 실제로 worktree 를 만들지 않고, 어떤 경로에 어떤 이름으로 만들어질지만 미리 보여줍니다:
  <ToolTabs>
    <ToolTabsPanel tool="claude-code" label="Claude Code">
      <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
    <ToolTabsPanel tool="codex" label="Codex">
      <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
  </ToolTabs>

**`--worktree` + `--aggregate-pr` 조합 — 격리 실행과 단일 PR 배포를 동시에**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
main checkout 은 건드리지 않으면서, 여러 Task 를 하나의 PR 로 묶어 배포까지 자동으로 끝내고 싶을 때 가장 완결된 조합입니다.

> **주의**: `--local-merge` / `--draft` / `--skip-ci-wait` / `--aggregate-pr` 는 서로 배타적입니다 — 두 개 이상 같이 쓰면 실행 전에 멈추고 되묻습니다. `--review` 와 `--worktree` 는 위 어느 모드와도 조합할 수 있습니다.

## ywc-parallel-executor — 독립적인 Task 를 동시에 실행하고 싶을 때

**독립적인 Task 들을 병렬로, 각각 PR 을 만들어 merge 까지 끝내고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
</ToolTabs>
wave 단위로 동시 실행되며, Task 마다 PR 생성 → CI → bot review → **merge** 까지 개별 완결됩니다.

**PR 없이 빠르게 각 Task 를 로컬 merge 하고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
</ToolTabs>

**전체 Task 를 병렬 실행 후 PR 하나로 묶어 배포하고 싶다 (`--aggregate-pr`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
</ToolTabs>
`aggregate/payments` 브랜치 하나에 wave 단위로 쌓은 뒤 PR **1개**로 delivery 됩니다. `--aggregate-pr` 와 `--group-name` 의 전체 개념은 위의 "여러 Task 를 PR 하나로 묶기" 절을 참고하세요 — `ywc-sequential-executor` 와 완전히 동일한 개념이며, 공유 브랜치 이름 접두사만 `work/` 대신 `aggregate/` 를 씁니다.

**모든 작업이 끝난 뒤 한 번에 사람이 검토하고 merge 하고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>
모든 wave 완료 후 draft PR 1개가 생성되고, merge 는 사람이 수동으로 합니다.

> **주의**: `--local-merge` / `--draft` / `--per-task-pr` / `--aggregate-pr` 중 아무것도 지정하지 않으면 4가지 모드 중 무엇을 원하는지 되묻습니다 — 기본값으로 조용히 넘어가지 않습니다. `--review` 는 어느 모드와도 조합할 수 있습니다. (참고: `ywc-parallel-executor` 는 `--worktree` 라는 별도 flag 가 없습니다 — Task 마다 worktree 로 격리하는 것이 이 Skill 의 기본 동작이기 때문입니다.)

## ywc-code-gen — Task 분해 없이 코드를 바로 생성하고 싶을 때

**Backend + Frontend + QA 를 한번에 생성하고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**결제/인증처럼 민감한 기능이라 꼼꼼하게, TDD 로 만들고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
</ToolTabs>
`payment` 같은 keyword 는 자동으로 `critical` 판정을 받아 gray-box 위임(내부 코드를 안 읽고 인터페이스만 확인)이 금지됩니다. `--tdd` 는 RED → GREEN → REFACTOR 커밋 경계를 강제합니다.

**이미 재사용 가능한 코드를 확인했으니 중복 검사를 건너뛰고 싶다**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
</ToolTabs>

> **주의**: `--spec` 과 `--feature` 는 둘 다 필수입니다 — 하나라도 비어 있으면 `NEEDS_CONTEXT` 로 멈춥니다. `tasks/` 디렉토리가 이미 있는 작업이라면 이 Skill 대신 `ywc-sequential-executor` / `ywc-parallel-executor` 를 사용하세요.

---

[← 이전: 14. 클라우드 인프라 관리](./17-infrastructure-and-cloud.md) · [다음: 17. 전체 Skill 레퍼런스 →](./14-skill-reference.md)
