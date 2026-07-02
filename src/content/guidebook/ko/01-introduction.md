[« 목차로 돌아가기](./README.md)

# 01. 소개

## 이 Guidebook 은 무엇을 다루는가

이 repository 에는 `tools/claude-code/skills/` 아래 `ywc-*` 접두사를 가진 Skill 30여 개와, `tools/claude-code/agents/` 아래 전용 Agent 몇 개가 정의되어 있습니다. 이들은 "아이디어 → Spec → Task 분해 → 구현 → 코드 리뷰 → PR → Merge" 로 이어지는 개발 Lifecycle 전체를 Claude Code 위에서 구조화된 절차로 실행하기 위한 도구 모음입니다.

이 Guidebook 은 그 도구들을 **처음 사용하는 사람**이 "지금 내 상황엔 어떤 Skill 을, 어떤 순서로, 어떤 prompt 로 실행해야 하는가"를 바로 찾을 수 있도록 정리한 실전 설명서입니다. Skill 내부 구현 원리(Rationalization Defense, Advisor Pattern 등)를 깊게 설명하지 않고, **사용자가 입력할 command 와 그 결과**에 초점을 맞춥니다. 내부 동작 원리가 궁금하다면 각 Skill 의 `SKILL.md` 를 직접 참고하세요.

## 누구를 위한 문서인가

- 이 project 에서 처음으로 `ywc-*` Skill 을 사용해보는 개발자
- Skill 은 몇 번 써봤지만 매번 어떤 순서로 조합해야 하는지 헷갈리는 개발자
- `ywc-sequential-executor`, `ywc-parallel-executor`, `ywc-code-gen` 처럼 옵션이 많은 Skill 의 정확한 syntax 가 필요한 개발자

## 시작하기 전에 확인할 것

| 항목 | 확인 방법 |
|---|---|
| Claude Code 가 이 repository 를 인식하고 있는가 | 대화창에서 `/` 를 입력했을 때 `ywc-*` Skill 목록이 자동완성으로 뜨는지 확인 |
| `gh` CLI 인증이 되어 있는가 | `gh auth status` — PR 생성/merge 를 다루는 대부분의 Skill 이 필요로 함 |
| project 에 `CLAUDE.md` 가 있는가 | 없다면 [08. 기존 Repo 에 처음 진입하기](./08-onboarding-existing-repo.md) 참고 — Skill 들이 언어·commit 컨벤션을 여기서 추론함 |
| 작업 대상이 신규 project 인가, 기존 코드 변경인가 | 신규라면 [07. 새 Project 시작하기](./07-starting-a-new-project.md), 기존 변경이라면 [02. 핵심 개념](./02-core-concepts.md) 부터 |

## Skill 호출 문법

이 Guidebook 의 모든 예시는 Claude Code 대화창에 아래 형태로 그대로 입력하는 것을 전제로 합니다.

```
ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움
```

`/` 를 앞에 붙인 `/ywc-plan` 형태도 동일하게 동작합니다 — 이 문서에서는 가독성을 위해 `/` 를 생략합니다. `--flag value` 형태의 옵션은 Skill 마다 다르며, 각 Skill 페이지 또는 [12. Executor / Code-gen Prompt 패턴](./12-executor-and-codegen-patterns.md)에 실제 예시로 정리되어 있습니다.

---

[다음: 02. 핵심 개념 →](./02-core-concepts.md)
