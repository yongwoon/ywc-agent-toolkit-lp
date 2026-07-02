[« 목차로 돌아가기](./README.md)

# 07. 새 Project 시작하기

## 언제 이 흐름을 쓰는가

Git repository 자체가 없거나, 있어도 코드가 거의 없는 백지 상태에서 project 를 설계할 때 사용합니다. 이미 코드가 있는 낯선 repo 를 파악하려는 것이라면 이 페이지가 아니라 [08. 기존 Repo 에 처음 진입하기](./08-onboarding-existing-repo.md)로 이동하세요 — 두 흐름은 반대 방향이며 같은 세션에서 함께 쓰지 않습니다.

## 전체 흐름

| 단계 | Skill | 역할 |
|---|---|---|
| 1 | `ywc-project-scaffold` | tech stack / architecture pattern 확정 후 directory 구조 설계 (Markdown plan 산출) |
| 2 | `ywc-mission` | `docs/mission.md` 에 project 의 why, success criteria, rejected-approach log 기록 |
| 3 | `ywc-spec-writer --full` | `docs/specification/` 에 전체 사양서 작성 (goal / feature / data model / user flow) |
| 4 | `ywc-spec-validate` | 사양서 completeness / consistency / feasibility / code-compatibility 검증 |
| 5 | `ywc-project-docs` | Architecture / Product / Operations 등 부가 문서 (필요한 경우) |
| 6 | `ywc-task-generator` | `DONE` 된 spec 을 dependency-safe Task 로 분해 |
| 7 | [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) 로 진입 | 실제 구현 시작 |

## 실행 예시

**1. Directory 구조 설계**
```
ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale
```
Language 는 필수이고 나머지는 비어 있으면 되물으므로, 가능한 한 Framework / Architecture / Scale 을 함께 명시하세요. 이 skill 은 **Markdown plan 만** 산출합니다 — 실제 file 생성은 `ywc-code-gen` 의 몫입니다.

**2. Project 의 why 를 기록**
```
ywc-mission 이 project 의 목표는 소규모 건설업체가 별도 앱 없이 출퇴근을 기록하게 하는 것. 성공 기준은 관리자 1명이 인력 10명 이하의 근태를 5분 안에 마감할 수 있는가
```

**3. 전체 사양서 작성**
```
ywc-spec-writer --full --lang korean
```

**4. 사양서 검증**
```
ywc-spec-validate --spec docs/specification/01-overview.md
```
`DONE_WITH_CONCERNS` 가 나오면 `ywc-spec-writer` 로 돌아가 보완 후 재검증합니다 — `DONE` 이 될 때까지 반복하세요. (`ywc-spec-ready` 는 `ywc-plan` 이 만든 spec 전용 자동 수렴 loop 이므로 여기서는 사용하지 않습니다.)

**5. 부가 문서 (필요시)**
```
ywc-project-docs --lang kr
```

**6. Task 분해**
```
ywc-task-generator --lang korean
```

## 참고

- 규모가 작아 spec 분해 없이 바로 구현 가능하면 `ywc-plan` 이 Small path 로 routing 해 이 흐름 전체를 건너뛸 수 있습니다.
- `ywc-onboard-repo` 는 이 흐름의 반대 방향(기존 repo 조사)이므로 새 project 생성 시에는 사용하지 않습니다.

---

[← 이전: 06. 목표 하나로 자동 완료하기](./06-agentic-autonomous-loop.md) · [다음: 08. 기존 Repo 에 처음 진입하기 →](./08-onboarding-existing-repo.md)
