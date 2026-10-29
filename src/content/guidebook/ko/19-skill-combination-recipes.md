[« 목차로 돌아가기](./README.md)

# 08. Skill 조합 레시피

다른 페이지는 흐름 하나, 또는 Skill 하나씩을 설명합니다. 이 페이지는 Skill 들이 서로 어떻게 이어지는지 — 한 Skill 이 무엇을 남기고, 그것을 어느 Skill 이 이어받는지 — 를 보여줍니다. 아래의 연결은 모두 Skill 이 스스로 하는 동작(공유 파일 읽기, 다음 Skill 로의 hand-off 제안)이며, 사용자가 따로 외워야 하는 관례가 아닙니다.

| 하고 싶은 일 | 레시피 |
|---|---|
| 같은 review 지적이 반복되지 않게 하고 싶다 | [Review 학습 루프](#review-학습-루프) |
| 고친 버그를 오래 남는 교훈으로 만들고 싶다 | [버그 수정에서 재발 방지까지](#버그-수정에서-재발-방지까지) |
| PR 전후로 어떤 gate 가 언제 도는지 알고 싶다 | [PR 전후의 gate](#pr-전후의-gate) |
| 되돌리기 어려운 결정의 이유를 남기고 싶다 | [계획하면서 결정 기록하기](#계획하면서-결정-기록하기) |
| 범위가 아직 불확실한 큰 변경을 시작하고 싶다 | [계획 전 탐색](#계획-전-탐색) |
| Task 를 충돌 없이 병렬로 실행하고 싶다 | [병렬 실행 환경](#병렬-실행-환경) |
| Release 를 준비하고 싶다 | [Release 준비](#release-준비) |

## Review 학습 루프

`docs/review-learnings.md` 는 project 의 review 기억입니다. 이 파일은 `ywc-review-learnings` 가 관리하고, 다른 Skill 들은 이 파일을 읽거나 내용을 채워 넣습니다.

1. **받기** — comment 에 대응하기 전에 `ywc-receive-review` 가 그 지적이 기술적으로 맞는지 먼저 확인합니다. 리뷰어가 요청했다는 이유만으로 잘못된 수정을 하지 않게 해줍니다.
2. **대응** — `ywc-handle-pr-reviews` 가 thread 마다 수정하거나 답변하고, PR 을 merge 가능한 상태(CI 통과, base 와 conflict 없음)로 만듭니다.
3. **기록** — 남길 가치가 있는 교훈은 `ywc-review-learnings` 를 통해 `docs/review-learnings.md` 에 기록합니다. `--source pr --pr <번호>` 를 주면 PR 하나의 bot review comment 를 정리해 학습 후보로 만듭니다. 새 항목은 모두 changeset 으로 보여지고, 사용자가 확인한 뒤에만 기록됩니다.
4. **소급 수집** — 과거 PR 은 `ywc-mine-review-history` 가 merge 된 PR 여러 개를 한 번에 훑어, 반복되는 결함 유형을 `ywc-review-learnings` 에 제안합니다.
5. **재사용** — `ywc-impl-review` 는 review 를 시작할 때마다 학습 내용을 읽습니다(`--skip-learnings` 로 생략 가능). 그래서 이미 false positive 로 정리된 지적은 다시 나오지 않고, `DO-NOT` 으로 등록된 패턴은 더 일찍 잡힙니다. Review 가 끝나면 반복되는 finding 을 기록할지 제안합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
</ToolTabs>

이 루프는 두 도구 모두에서 동작합니다. 한 바퀴 돌 때마다 다음 review 가 조용해집니다. 팀이 이미 기각한 지적은 다시 나오지 않고, 팀이 동의한 지적은 PR 을 열기 전에 잡힙니다.

## 버그 수정에서 재발 방지까지

1. `ywc-debug-rootcause` 가 근본 원인을 찾고 regression test 를 추가한 뒤, `ywc-verify-done` 으로 수정을 검증합니다([15](./12-debugging-and-incident-postmortem.md)).
2. 같은 유형의 결함이 다른 곳에서도 생길 수 있다면, 이를 review 학습으로 기록할지 제안합니다(`ywc-review-learnings --mode update --source debug`).
3. Production 장애 후에는 `ywc-incident-postmortem` 이 보고서를 작성하고, 재발 방지 action item 을 같은 방식으로 제안합니다(`--source incident`).
4. 이후 `ywc-impl-review` 가 그 학습 내용을 읽으므로, 같은 유형의 결함이 Production 이 아니라 review 단계에서 잡힙니다.

2·3 단계는 Claude Code 전용입니다. Codex 에서는 두 Skill 이 `ywc-review-learnings` 로 넘겨주지 않으므로, 남길 교훈이 있다면 `ywc-review-learnings` 로 직접 기록하세요(기본 source 인 `feedback`).

## PR 전후의 gate

| 시점 | Skill | 확인하는 것 |
|---|---|---|
| 구현 전 | `ywc-confidence-gate` | 준비 상태를 5개 차원으로 채점합니다: PROCEED(90 이상), REVIEW(70-89), STOP(70 미만). 90 미만이면 가장 약한 차원을 보강하거나 사용자가 위험을 수용할 때까지 구현을 시작하지 않습니다 |
| 구현 후 | `ywc-impl-review` | Spec 대비 5개 관점 review([14](./16-code-structure-and-maintainability.md)) |
| 보안과 관련된 변경일 때 | `ywc-security-audit` | 정적 보안 review(OWASP Top 10, secret, threat model) |
| "완료"라고 말하기 전 | `ywc-verify-done` | 모든 완료 주장에 대한 새로운 증거(test 또는 build 출력) |
| PR 생성 | `ywc-create-pr` | Commit, push, 그리고 task 나 plan 을 바탕으로 한 PR 본문 |
| 리뷰어 응답 후 | `ywc-handle-pr-reviews` | 위 루프와 같이 comment, CI, conflict 정리 |
| Merge | `ywc-finish-branch` | CI 와 bot review 대기, merge, merge 후 확인, branch 정리 |

`ywc-verify-done` 을 직접 호출할 일은 많지 않습니다. `ywc-code-gen` 과 두 executor 가 각자의 완료 단계에서 호출하기 때문입니다. 작업을 손으로 마무리했을 때 직접 호출하세요.

## 계획하면서 결정 기록하기

이 레시피는 Claude Code 전용입니다.

- `ywc-plan` 은 계획을 세우기 전에 `docs/adr/` 와 `docs/project-mission.md` 가 있으면 읽습니다. 계획이 이미 정해진 결정과 조용히 어긋나지 않으며, 충돌이 있으면 사용자에게 보여줍니다.
- 계획 속 아키텍처 결정이 되돌리기 어렵고, 맥락 없이 보면 의외이며, 실제 trade-off 가 있는 경우 `ywc-plan` 이 `ywc-adr` 로 ADR 을 남길지 한 번 제안합니다. 계획이 오래 유지될 새 success criterion 을 확정하면 `docs/project-mission.md` 에 추가할지도 제안합니다.
- 라이브러리나 구현 방식을 비교해야 하는 결정이라면 `ywc-tech-research` 를 먼저 실행하고, 그 결과를 바탕으로 계획하세요.

<CodeBlock label="claude code" code="ywc-tech-research &quot;Hono SSE 구현&quot; --compare &quot;Redis,Valkey&quot;" />

Codex 에는 `ywc-adr` 와 `ywc-project-mission` 이 없으므로, 결정 이유는 plan 이나 spec 문서에 남기세요.

## 계획 전 탐색

이 레시피는 Codex 전용입니다.

1. `ywc-wayfinder` 는 `docs/ywc-plans/<slug>-wayfinder.md` 에 local map 을 두고 여러 session 에 걸쳐 이어갑니다. Map 에는 ticket 이 여러 개 있을 수 있지만 active 상태는 항상 하나뿐이며, 이 Skill 이 직접 구현하지는 않습니다.
2. Ticket 의 경로가 분명해지면 `ywc-plan` 으로 넘깁니다(기술 비교가 막혀 있다면 `ywc-tech-research` 로 넘깁니다).
3. 그다음은 평소 흐름대로 `ywc-spec-ready` → `ywc-task-generator` → executor 로 이어집니다([06](./05-general-cycle-medium-large.md)). 승인된 spec 이나 ticket 하나를 구현하기만 하면 되는 경우에는 `ywc-implement` 가 범위를 좁힌, review gate 를 거치는 변경 하나로 처리합니다.

<CodeBlock label="codex" code="ywc-wayfinder 결제 기능을 monolith 에서 별도 service 로 분리하고 싶음. 아직 범위가 불분명함" />

크거나 불확실하거나 여러 session 에 걸치는 작업에만 쓰세요. 일반적인 계획은 `ywc-plan`, 아이디어 정리는 `ywc-brainstorm` 의 역할입니다.

## 병렬 실행 환경

`ywc-parallel-executor` 는 task 마다 `ywc-worktrees` 로 worktree 를 만듭니다. Docker project 에서는 `ywc-docker-isolate` 로 worktree 마다 별도의 host port 대역을 배정해 stack 끼리 충돌("port is already allocated")하지 않게 합니다. Merge 후에는 `ywc-finish-branch` 가 `ywc-worktrees --mode prune` 으로 worktree 를 정리합니다.

보통은 이 Skill 들을 직접 호출할 필요가 없습니다. 두 도구 모두 executor 가 알아서 호출합니다. Executor 밖에서 worktree 를 만들거나 정리하려면 [19](./14-skill-reference.md) 의 명령을 사용하세요.

## Release 준비

1. 먼저 쌓인 의존성 업데이트를 정리합니다: `ywc-merge-dependabot security parallel-auto`.
2. Release PR(예: `develop` → `main`)을 연 뒤, `ywc-release-pr-list <release PR 번호>` 로 merge 된 PR 을 작성자별로 묶어 PR 설명을 만듭니다.
3. `ywc-changelog-release-notes` 로 `CHANGELOG.md` 와 사용자용 release note 를 작성합니다. 2단계의 결과 파일을 `--pr-list` 로 넘기면 git log 대신 그 목록을 사용합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>

---

[← 이전: 07. 목표 하나로 자동 완료하기 (ywc-agentic)](./06-agentic-autonomous-loop.md) · [다음: 09. 새 Project 시작하기 →](./07-starting-a-new-project.md)
