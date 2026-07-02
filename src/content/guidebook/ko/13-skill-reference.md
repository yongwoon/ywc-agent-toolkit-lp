[« 목차로 돌아가기](./README.md)

# 13. 전체 Skill 레퍼런스

앞선 워크플로우 가이드에서 다루지 않은 나머지 Skill 을 **하려는 일** 기준으로 묶어 정리했습니다. 각 흐름(Small/Medium/Large cycle, 신규 project, onboarding, testing, design)의 중간중간 필요할 때 참고하세요.

## PR / Review 를 다루고 싶을 때

**열려있는 PR 의 review comment 에 대응하고, CI/conflict 도 함께 정리하고 싶다**
```
ywc-handle-pr-reviews 250
```
PR 번호를 생략하면 현재 branch 의 PR 을 자동으로 찾습니다.

**변경사항을 commit 하고 draft PR 을 열고 싶다**
```
ywc-create-pr --title "fix: correct timezone offset in report export" --lang ko
```
[04](./04-general-cycle-small.md), [05](./05-general-cycle-medium-large.md)의 흐름에 이미 포함되어 있으므로, 그 흐름 밖에서 단독으로 PR 만 열고 싶을 때 씁니다.

**쌓여있는 Dependabot PR 을 한번에 정리하고 싶다**
```
ywc-merge-dependabot security parallel-auto
```
`security` 를 생략하면 전체 Dependabot PR 대상, `parallel-auto` 를 생략하면 PR 번호 순으로 하나씩 순차 처리합니다.

**지금까지 한 작업을 그냥 commit 만 하고 싶다**
```
ywc-commit authentication 관련 변경만 커밋해줘
```
PR 생성이나 코드 변경 자체에는 사용하지 않습니다 — commit 전용입니다.

## 아직 계획이 없거나, 사람 개입 없이 끝까지 돌리고 싶을 때

**아이디어가 아직 구체적이지 않아서 정리부터 하고 싶다**
```
ywc-brainstorm 알림 기능을 만들고 싶은데 아직 어떻게 할지 구체적이지 않음
```
Socratic 대화로 목적/제약/성공 기준과 대안 2~3개를 도출한 뒤 `ywc-plan` 으로 handoff 합니다.

**목표 하나만 던지고 계획부터 구현까지 사람 개입 없이 맡기고 싶다**

`ywc-agentic` 전용 페이지로 옮겼습니다 — 자세한 사용법과 예시는 [06. 목표 하나로 자동 완료하기](./06-agentic-autonomous-loop.md)를 참고하세요.

## 품질과 보안을 점검하고 싶을 때

**인증/결제처럼 민감한 코드의 보안 취약점을 점검하고 싶다**
```
ywc-security-audit --code tools/codex-skill/skills/ywc-security-audit/SKILL.md
```

**버그의 원인을 못 찾아서 답답하다**
```
ywc-debug-rootcause 결제 webhook 이 가끔 중복 처리됨. 원인을 못 찾겠음
```
증상만 고치는 patch 를 막고 4단계 root-cause 조사를 강제합니다. 같은 지점에서 3회 이상 수정에 실패하면 architecture 자체를 의심하도록 안내합니다.

**오래된 dead code (미사용 함수/export/의존성)를 정리하고 싶다**
```
ywc-refactor-clean --scope tools/codex-skill/skills/ywc-refactor-clean/ --tier safe
```

**Production 장애가 나서 회고 문서를 써야 한다**
```
ywc-incident-postmortem --client
```
`--client` 는 내부 세부사항을 뺀 고객용 요약을 추가로 만듭니다.

## Project 의 지식을 누적하고 싶을 때 (Stateful Skills)

이 Skill 들은 한 번 쓰고 끝나는 것이 아니라, 대화가 끝나도 project 에 남아 다음 session 에서도 참고되는 지식을 관리합니다.

**Code review 에서 반복 지적되는 내용을 학습시켜서 다음부터 다시 지적하지 않게 하고 싶다**
```
ywc-review-learnings 이 지적은 false positive 야, 학습해둬
```

**개발자·도메인 전문가·LLM 이 공유할 도메인 용어집을 만들거나 갱신하고 싶다**
```
ywc-ubiquitous-language --context billing --ddd
```
`--ddd` 는 Entity / Value Object / Aggregate 같은 DDD Type 컬럼을 추가합니다.

**Project 의 why 와 rejected-approach 를 기록하고 싶다**
```
ywc-mission 이 project 의 목표는 ...
```
[07. 새 Project 시작하기](./07-starting-a-new-project.md)에서 이미 다뤘습니다 — project 진행 중 방향이 바뀔 때도 다시 사용할 수 있습니다.

## Release 를 준비하고 싶을 때

**Release PR (develop→main 등)에 포함된 merged PR 목록을 정리하고 싶다**
```
ywc-release-pr-list 301
```

**CHANGELOG.md 나 사용자용 release note 를 작성하고 싶다**
```
ywc-changelog-release-notes --both --version 1.4.0
```
`--pr-list <ywc-release-pr-list 의 결과 파일>` 을 넘기면 git log 대신 그 목록을 근거로 생성합니다.

---

[← 이전: 12. Executor / Code-gen Prompt 패턴](./12-executor-and-codegen-patterns.md) · [목차로 돌아가기 »](./README.md)
