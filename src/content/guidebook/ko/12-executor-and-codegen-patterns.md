[« 목차로 돌아가기](./README.md)

# 12. Executor / Code-gen Prompt 패턴

`ywc-sequential-executor`, `ywc-parallel-executor`, `ywc-code-gen` 은 옵션이 많아 매번 정확한 syntax 를 찾게 되는 세 Skill 입니다. 이 페이지는 Skill 이름이 아니라 **"지금 하려는 일"**을 기준으로 예시를 정리했습니다 — 하려는 일을 찾아 그대로 복사해 쓰세요.

## 공통 개념: 여러 Task 를 PR 하나로 묶기 (`--aggregate-pr`, `--group-name`)

`--aggregate-pr` 와 `--group-name` 은 `ywc-sequential-executor` 와 `ywc-parallel-executor` **둘 다에서 동일한 개념**으로 동작합니다. 여기서 한 번만 이해하면 아래 두 Skill 섹션의 예시를 모두 응용할 수 있습니다.

**`--aggregate-pr` 가 없을 때 (기본 동작)**: Task 마다 각자의 feature branch 와 PR 이 생깁니다. Task 5개를 처리하면 PR 도 5개입니다.

**`--aggregate-pr` 가 있을 때**: 모든 Task 가 하나의 공유 브랜치 위에 순서대로(sequential) 또는 wave 단위로(parallel) merge 되고, 전체 작업이 끝난 뒤 그 공유 브랜치 하나로 PR **1개**만 열립니다. Reviewer 입장에서는 "관련된 변경 여러 개"가 아니라 "하나로 완결된 배치"로 보입니다.

| 이럴 때 쓰세요 | 이럴 때는 쓰지 마세요 |
|---|---|
| 서로 강하게 연관된 Task 묶음을 하나의 논리적 배포 단위로 묶고 싶을 때 (예: 알림 기능의 API + UI + migration Task 5개) | Task 하나하나를 독립적으로 review 받아야 할 때 — 이 경우 기본 동작(Task 당 PR 1개)이 맞습니다 |
| PR 개수를 줄여 review 피로도를 낮추고 싶을 때 | 어떤 Task 가 실패했는지 PR 단위로 바로 구분하고 싶을 때 |

**공유 브랜치 이름은 `--group-name` 으로 직접 지정합니다.** 생략하면 `<base-branch>-<timestamp>` 형태로 자동 생성되지만, 나중에 어떤 브랜치가 무슨 작업이었는지 알아보기 어려워지므로 의미 있는 이름을 직접 지정하는 것을 권장합니다.

| Skill | 공유 브랜치 이름 형식 |
|---|---|
| `ywc-sequential-executor --aggregate-pr --group-name <name>` | `work/<name>` |
| `ywc-parallel-executor --aggregate-pr --group-name <name>` | `aggregate/<name>` |

브랜치 이름 접두사(`work/` vs `aggregate/`)만 다를 뿐 동작 원리는 같습니다: 각 Task 가 이 공유 브랜치에 로컬로 merge 되고, 마지막에 이 브랜치 → base 로 PR 1개가 자동 생성되어 CI/bot review/merge 까지 처리됩니다. **이 공유 브랜치는 실제 base 브랜치가 아닙니다** — 최종 PR 이 merge 되기 전까지 base 는 전혀 변경되지 않습니다.

## ywc-sequential-executor — Task 를 순서대로 실행하고 싶을 때

**Task 하나만 기본값으로 실행하고 싶다**
```
ywc-sequential-executor 000020-010
```
기본 `normal-pr` 모드 — PR 생성 → CI → bot review → merge 까지 전부 자동 처리됩니다.

**PR 을 열기 전에 자동으로 코드 리뷰까지 받고 싶다**
```
ywc-sequential-executor 000020-010 --review --base-branch develop
```

**여러 Task 를 한번에, PR 설명은 일본어로 받고 싶다**
```
ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja
```

**PR 없이 빠르게 로컬에서 merge 까지 끝내고 싶다**
```
ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally
```
PR 모드에선 CI 가 test 를 대신 돌려주지만, `--local-merge` 는 원격 CI 가 없으므로 `--run-tests-locally` 로 merge 전 로컬 test 통과를 강제하는 것이 좋습니다.

**여러 Task 를 PR 하나로 묶어서 배포하고 싶다 (`--aggregate-pr`)**
```
ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review
```
`work/project-health` 브랜치 하나에 순차로 쌓은 뒤 PR **1개**로 delivery 됩니다. `--aggregate-pr` 와 `--group-name` 의 전체 개념은 바로 위 "공통 개념" 절을 참고하세요.

**일단 PR 만 만들고 merge 는 나중에 사람이 하고 싶다**
```
ywc-sequential-executor 000020-010 --draft
```

**뭘 실행해야 할지 모르겠다, 계획만 먼저 보고 싶다**
```
ywc-sequential-executor --dry-run
```
Task 를 지정하지 않으면 dependency-graph 에서 다음 실행 대상을 자동 감지하고, 실행 계획만 출력합니다 (아무 것도 실제로 실행하지 않음).

**다른 작업(main checkout)에 방해되지 않게 격리해서 실행하고 싶다 (`--worktree`)**
```
ywc-sequential-executor 000020-010..000025-010 --worktree --review
```

`--worktree` 는 range **전체를 하나의 git worktree 안에서** 실행합니다 — 원래 clone 은 그대로 두고 다른 작업을 계속할 수 있습니다. 핵심은 이것이 **run 단위 격리**라는 점입니다: worktree 하나가 range 전체를 감싸고, 그 안에서 Task 들은 여전히 순차적으로 실행됩니다. (반대로 `ywc-parallel-executor` 는 **Task 마다** 별도 worktree 를 만듭니다 — 아래 병렬 executor 절 참고.)

- **독립 flag**입니다 — 4가지 delivery 모드(`normal-pr` / `--local-merge` / `--draft` / `--aggregate-pr`)나 `--review` 와 배타 관계가 아니라 자유롭게 조합됩니다. `--worktree` 를 껐다 켜도 delivery 모드 자체의 동작은 바뀌지 않습니다.
- **완료 후 처리가 delivery 모드에 따라 다릅니다:**
  - `normal-pr` / `--local-merge` / `--draft` 조합 → 실행이 끝나면(Completion Status `DONE`) worktree 는 삭제되지만 **integration branch 는 보존**됩니다. Report 에 "integration branch 가 아직 trunk 로 merge 되지 않았다"는 안내가 함께 나오므로, `ywc-create-pr` 로 `integration/run-<slug> → trunk` PR 을 **직접 열어야** 합니다 — 자동으로 열리지 않습니다.
  - `--aggregate-pr` 와 함께 쓰면 → 이 수동 단계가 필요 없습니다. `work/<name>` 브랜치가 worktree 안에서 만들어지고, 그 브랜치의 `work → base` PR 이 끝에 자동으로 열리기 때문입니다.
- **중간에 실패하면(`BLOCKED` / `DONE_WITH_CONCERNS`)** worktree 는 삭제되지 않고 그대로 보존됩니다. Report 에 찍힌 경로로 나중에 다시 들어가 이어서 진행(resume)할 수 있습니다.
- `--dry-run` 과 함께 쓰면 실제로 worktree 를 만들지 않고, 어떤 경로에 어떤 이름으로 만들어질지만 미리 보여줍니다:
  ```
  ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run
  ```

**`--worktree` + `--aggregate-pr` 조합 — 격리 실행과 단일 PR 배포를 동시에**
```
ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review
```
main checkout 은 건드리지 않으면서, 여러 Task 를 하나의 PR 로 묶어 배포까지 자동으로 끝내고 싶을 때 가장 완결된 조합입니다.

> **주의**: `--local-merge` / `--draft` / `--skip-ci-wait` / `--aggregate-pr` 는 서로 배타적입니다 — 두 개 이상 같이 쓰면 실행 전에 멈추고 되묻습니다. `--review` 와 `--worktree` 는 위 어느 모드와도 조합할 수 있습니다.

## ywc-parallel-executor — 독립적인 Task 를 동시에 실행하고 싶을 때

**독립적인 Task 들을 병렬로, 각각 PR 을 만들어 merge 까지 끝내고 싶다**
```
ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review
```
wave 단위로 동시 실행되며, Task 마다 PR 생성 → CI → bot review → **merge** 까지 개별 완결됩니다.

**PR 없이 빠르게 각 Task 를 로컬 merge 하고 싶다**
```
ywc-parallel-executor 000020-010..000025-010 --local-merge --review
```

**전체 Task 를 병렬 실행 후 PR 하나로 묶어 배포하고 싶다 (`--aggregate-pr`)**
```
ywc-parallel-executor --all --aggregate-pr --group-name payments --review
```
`aggregate/payments` 브랜치 하나에 wave 단위로 쌓은 뒤 PR **1개**로 delivery 됩니다. `--aggregate-pr` 와 `--group-name` 의 전체 개념은 이 페이지 상단의 "공통 개념" 절을 참고하세요 — `ywc-sequential-executor` 와 완전히 동일한 개념이며, 공유 브랜치 이름 접두사만 `work/` 대신 `aggregate/` 를 씁니다.

**모든 작업이 끝난 뒤 한 번에 사람이 검토하고 merge 하고 싶다**
```
ywc-parallel-executor 000020-010..000025-010 --draft
```
모든 wave 완료 후 draft PR 1개가 생성되고, merge 는 사람이 수동으로 합니다.

> **주의**: `--local-merge` / `--draft` / `--per-task-pr` / `--aggregate-pr` 중 아무것도 지정하지 않으면 4가지 모드 중 무엇을 원하는지 되묻습니다 — 기본값으로 조용히 넘어가지 않습니다. `--review` 는 어느 모드와도 조합할 수 있습니다. (참고: `ywc-parallel-executor` 는 `--worktree` 라는 별도 flag 가 없습니다 — Task 마다 worktree 로 격리하는 것이 이 Skill 의 기본 동작이기 때문입니다.)

## ywc-code-gen — Task 분해 없이 코드를 바로 생성하고 싶을 때

**Backend + Frontend + QA 를 한번에 생성하고 싶다**
```
ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature "improve architecture skill docs"
```

**결제/인증처럼 민감한 기능이라 꼼꼼하게, TDD 로 만들고 싶다**
```
ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature "payment webhook hardening" --tdd
```
`payment` 같은 keyword 는 자동으로 `critical` 판정을 받아 gray-box 위임(내부 코드를 안 읽고 인터페이스만 확인)이 금지됩니다. `--tdd` 는 RED → GREEN → REFACTOR 커밋 경계를 강제합니다.

**이미 재사용 가능한 코드를 확인했으니 중복 검사를 건너뛰고 싶다**
```
ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature "notification settings UI" --skip-reuse-check
```

> **주의**: `--spec` 과 `--feature` 는 둘 다 필수입니다 — 하나라도 비어 있으면 `NEEDS_CONTEXT` 로 멈춥니다. `tasks/` 디렉토리가 이미 있는 작업이라면 이 Skill 대신 `ywc-sequential-executor` / `ywc-parallel-executor` 를 사용하세요.

---

[← 이전: 11. 디자인 검토 및 개선하기](./11-design-review.md) · [다음: 13. 전체 Skill 레퍼런스 →](./13-skill-reference.md)
