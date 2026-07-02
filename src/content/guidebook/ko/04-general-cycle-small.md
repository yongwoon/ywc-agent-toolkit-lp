[« 목차로 돌아가기](./README.md)

# 04. 작은 변경 처리하기 (general cycle · small)

## 언제 이 흐름을 쓰는가

`ywc-plan` 이 요청을 **Small** 로 판단했을 때 자동으로 이 경로에 들어섭니다. 판단 기준은 "Task 분해 없이 단일 PR 로 끝낼 수 있는가" 이며, 아래에 하나라도 해당되면 Small 이 아니라 Medium/Large 로 격상됩니다 ([05](./05-general-cycle-medium-large.md) 참고).

- DB migration 이 포함된다
- 새 Library/Framework 도입이 포함된다
- 여러 subsystem 에 걸친 변경이다

## 전체 흐름

```
ywc-plan → ywc-spec-ready → ywc-code-gen → ywc-impl-review → ywc-create-pr
```

| 단계 | Skill | 역할 |
|---|---|---|
| 1 | `ywc-plan` | 요청을 분석해 `plan.md` 생성 (What / Why / Out of Scope / Done When) |
| 2 | `ywc-spec-ready` | `plan.md` 에 남은 concern 을 자동 수렴 |
| 3 | `ywc-code-gen` | Backend + Frontend + QA 병렬 코드 생성 |
| 4 | `ywc-impl-review` | PR 열기 전 최종 코드 리뷰 |
| 5 | `ywc-create-pr` | PR 생성 → CI → Bot Review 확인 |

> **주의**: `ywc-code-gen` 에는 `--review` 같은 자동 리뷰 flag 가 없습니다. 4단계(`ywc-impl-review`)를 생략하면 코드 리뷰 없이 그대로 PR 이 열리므로, 이 흐름에서는 반드시 명시적으로 실행해야 합니다. (Medium/Large 흐름의 executor 는 `--review` flag 로 이 단계를 자동화할 수 있습니다 — [05](./05-general-cycle-medium-large.md) 참고.)

## 실행 예시

```
ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움. 잠김/오타/미가입 등 구체적 사유를 보여주고 싶음
```
```
ywc-spec-ready --spec plan.md
```
```
ywc-code-gen --spec plan.md --feature "specific login failure reason"
```
```
ywc-impl-review
```
```
ywc-create-pr --title "fix: show specific login failure reason"
```

Bot review comment, failed CI, merge-readiness 문제가 남아 있으면 이어서 `ywc-handle-pr-reviews <pr-number>` 를 실행합니다. Small 흐름은 `plan.md` 기반이라 `tasks/<task-name>/` directory 가 없으므로, `ywc-finish-branch` 의 task 완료 처리와 맞지 않습니다.

## 각 단계에서 막혔을 때

| 상황 | 조치 |
|---|---|
| `ywc-plan` 이 Small 이 아니라 Medium 으로 판단함 | 정상입니다 — [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) 로 이동 |
| `ywc-code-gen` 이 `BLOCKED` 반환 | spec 이 불명확하거나 project context 를 읽지 못한 경우 — 보고된 blocker 를 확인 |
| `ywc-impl-review` 가 `DONE_WITH_CONCERNS` 반환 | correctness 문제면 수정 후 재실행, observation 성격이면 PR 설명에 남기고 진행 |
| PR 이 CI 를 통과하지 못함 | `ywc-create-pr` 또는 `ywc-handle-pr-reviews` 가 failure log 를 확인하고 최대 2회까지 수정 시도 — 그래도 실패하면 `DONE_WITH_CONCERNS` 또는 `BLOCKED` 로 표면화됨 |

---

[← 이전: 03. 5분 안에 첫 기능 배포하기](./03-quickstart.md) · [다음: 05. 여러 Task 로 나누어 처리하기 →](./05-general-cycle-medium-large.md)
