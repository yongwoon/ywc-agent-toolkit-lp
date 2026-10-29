# ywc Skill & Agent Guidebook

> 이 Guidebook 은 `ywc-*` Skill 과 Agent 를 처음 접하는 사용자를 위해 재구성한 사용 설명서입니다. 각 페이지는 독립된 웹 문서 페이지로 변환될 것을 염두에 두고 작성되었으며, 아래 목차가 곧 사이트의 sidebar 구조에 해당합니다.

## 이 Guidebook 을 읽는 방법

- 처음 사용한다면 프롤로그에 이어 **시작하기** 순서(01 → 02 → 03 → 04)를 따라간 뒤, **핵심 파이프라인**(05-08)을 읽으세요.
- 이미 기본 개념을 알고 있고 특정 작업만 찾고 있다면 **프로젝트 시작**, **품질과 검증**, **운영과 전문 영역**에서 상황에 맞는 페이지로 바로 이동하세요.
- 옵션이 많아 매번 syntax 를 찾게 되는 skill 은 **레퍼런스**에 command 예시 중심으로 정리되어 있습니다.

## 당신이 하려는 일은 무엇인가요? (목적별 바로가기)

"어떤 Skill 이 있는가" 가 아니라 **지금 하려는 일**을 기준으로 찾을 수 있도록 정리했습니다. 아래에서 상황을 찾아 바로 이동하세요.

### 계획과 구현

| 하려는 일 | 시작할 Skill | 가이드 |
|---|---|---|
| 버그를 고치거나 작은 기능 하나를 추가하고 싶다 | `ywc-plan` | [04](./03-quickstart.md), [05](./04-general-cycle-small.md) |
| 여러 Task 로 쪼개야 하는 큰 기능을 만들고 싶다 | `ywc-plan` → `ywc-task-generator` | [06](./05-general-cycle-medium-large.md) |
| 목표 하나만 던지고 계획부터 구현까지 자동으로 끝내고 싶다 | `ywc-agentic` | [07](./06-agentic-autonomous-loop.md) |
| 이미 분해된 Task 들을 실행하고 싶다 (순차/병렬) | `ywc-sequential-executor` / `ywc-parallel-executor` | [18](./13-executor-and-codegen-patterns.md) |
| 완전히 새로운 project 를 처음부터 설계하고 싶다 | `ywc-project-scaffold` | [09](./07-starting-a-new-project.md) |
| 처음 보는 낯선 repo/codebase 를 파악하고 싶다 | `ywc-onboard-repo` | [10](./08-onboarding-existing-repo.md) |
| 아이디어가 아직 구체적이지 않아 정리부터 하고 싶다 | `ywc-brainstorm` | [19](./14-skill-reference.md) |
| 라이브러리나 구현 방식을 비교해서 뭘 쓸지 결정하고 싶다 | `ywc-tech-research` | [19](./14-skill-reference.md) |
| 범위가 불확실한 큰 변경을 여러 session 에 걸쳐 탐색하고 싶다 (Codex 전용) | `ywc-wayfinder` | [08](./19-skill-combination-recipes.md) |
| 인증 기능(login, OAuth, MFA)을 구현하고 싶다 | `ywc-auth-implement` | [17](./18-authentication-implementation.md) |
| Skill 들이 서로 어떻게 이어지는지 알고 싶다 | - | [08](./19-skill-combination-recipes.md) |

### 품질과 검증

| 하려는 일 | 시작할 Skill | 가이드 |
|---|---|---|
| PR 을 검증할 수기 test 문서를 만들고 싶다 | `ywc-gen-testcase` | [11](./09-testing-guide.md) |
| E2E test 자동화를 설정/확장하고 싶다 | `ywc-e2e-test-strategy` | [12](./10-e2e-test-strategy.md) |
| 화면 usability 나 접근성을 점검하고 싶다 | `ywc-ui-ux-review` | [13](./11-design-review.md) |
| 화면 디자인이 평범해 보여서 개선하고 싶다 | `ywc-design-renew` | [13](./11-design-review.md) |
| 코드에 보안 취약점이 없는지 점검하고 싶다 | `ywc-security-audit` | [19](./14-skill-reference.md) |
| 오래된 dead code 를 정리하고 싶다 | `ywc-refactor-clean` | [14](./16-code-structure-and-maintainability.md) |
| 구현 품질과 maintainability 를 독립적으로 점검받고 싶다 | `ywc-impl-review` | [14](./16-code-structure-and-maintainability.md) |
| 다시 실행할 수 있는 명시적인 gate 로 완료를 증명하고 싶다 | `ywc-verify-done` | [19](./14-skill-reference.md) |
| 비즈니스·사용자 관점에서 project 를 점검받고 싶다 | `ywc-product-review` | [19](./14-skill-reference.md) |

### PR · 리뷰 · 릴리스

| 하려는 일 | 시작할 Skill | 가이드 |
|---|---|---|
| 열려있는 PR 의 review comment 에 대응해야 한다 | `ywc-handle-pr-reviews` | [19](./14-skill-reference.md) |
| 리뷰어의 지적이 정말 맞는지 확인한 뒤 대응하고 싶다 | `ywc-receive-review` | [19](./14-skill-reference.md) |
| 같은 review 지적이 반복되지 않게 하고 싶다 | `ywc-review-learnings` | [08](./19-skill-combination-recipes.md) |
| Dependabot PR 이 쌓여서 한번에 정리하고 싶다 | `ywc-merge-dependabot` | [19](./14-skill-reference.md) |
| CHANGELOG 나 release note 를 작성하고 싶다 | `ywc-changelog-release-notes` | [19](./14-skill-reference.md) |
| 지금까지 한 작업을 그냥 commit 하고 싶다 | `ywc-commit` | [19](./14-skill-reference.md) |

### 디버깅과 장애 대응

| 하려는 일 | 시작할 Skill | 가이드 |
|---|---|---|
| 버그의 근본 원인을 못 찾아 답답하다 | `ywc-debug-rootcause` | [15](./12-debugging-and-incident-postmortem.md) |
| Production 장애가 나서 회고를 써야 한다 | `ywc-incident-postmortem` | [15](./12-debugging-and-incident-postmortem.md) |

### 프로젝트 지식과 결정 기록

| 하려는 일 | 시작할 Skill | 가이드 |
|---|---|---|
| 대화가 끝나도 project 에 남는 지식(용어집/리뷰 학습/mission)을 관리하고 싶다 | `ywc-ubiquitous-language` | [19](./14-skill-reference.md) |
| 되돌리기 어려운 아키텍처 결정을 기록하고 싶다 (Claude Code 전용) | `ywc-adr` | [19](./14-skill-reference.md) |

이 표에 없는 상황은 [19. 전체 Skill 레퍼런스](./14-skill-reference.md)에서 전체 목록을 확인하세요.

## 목차

### 프롤로그

| 페이지 | 설명 |
|---|---|
| [01. 소개](./01-introduction.md) | 이 Skill/Agent 생태계가 무엇이고, 누구를 위한 것이며, 어떤 문제를 해결하는지 |
| [02. 핵심 개념](./02-core-concepts.md) | Skill / Agent / Executor / Task 용어 정리, 호출 문법, 4가지 완료 상태(`DONE` 등) |

### 시작하기

| 페이지 | 설명 |
|---|---|
| [03. 사전 준비와 설치](./15-prerequisites-installation.md) | ywc-* Skill 을 안정적으로 실행하기 위해 미리 준비해야 할 필수/선택 Tool 목록 |
| [04. 5분 안에 첫 기능 배포하기](./03-quickstart.md) | 작은 기능 하나를 아이디어부터 merge 까지 실제로 따라 해보는 첫 실습 |

### 핵심 파이프라인

| 페이지 | 설명 |
|---|---|
| [05. 작은 변경 처리하기 (general cycle · small)](./04-general-cycle-small.md) | Task 분해 없이 단일 PR 로 끝나는 변경의 표준 흐름 |
| [06. 여러 Task 로 나누어 처리하기 (general cycle · medium/large)](./05-general-cycle-medium-large.md) | Spec 검증과 Task 분해가 필요한 규모의 변경 흐름 |
| [07. 목표 하나로 자동 완료하기 (ywc-agentic)](./06-agentic-autonomous-loop.md) | 05/06 의 수동 제어 대신, 목표 하나로 Plan → Execute → Evaluate → Repeat 를 자동 반복하는 흐름 |
| [08. Skill 조합 레시피](./19-skill-combination-recipes.md) | Skill 끼리 이어지는 방식: review 학습 루프, 버그 재발 방지, PR gate, 결정 기록, 탐색, 병렬 실행, release |

### 프로젝트 시작

| 페이지 | 설명 |
|---|---|
| [09. 새 Project 시작하기](./07-starting-a-new-project.md) | 백지 상태에서 project 를 설계하고 첫 spec 을 완성하기까지 |
| [10. 기존 Repo 에 처음 진입하기](./08-onboarding-existing-repo.md) | 낯선 codebase 의 관행을 역추출해 CLAUDE.md 를 만드는 onboarding 흐름 |

### 품질과 검증

| 페이지 | 설명 |
|---|---|
| [11. Test 작성 및 실행하기](./09-testing-guide.md) | 수기 검증 testsheet 와 자동화 test 를 함께 운영하는 방법 |
| [12. E2E Test 자동화 전략](./10-e2e-test-strategy.md) | Playwright 기반 E2E Suite 를 설정 · 확장 · 유지보수하는 심화 가이드 |
| [13. 디자인 검토 및 개선하기](./11-design-review.md) | Usability 감사와 시각적 De-slop Renewal 을 구분해 적용하는 방법 |
| [14. 코드 구조와 유지보수성 관리](./16-code-structure-and-maintainability.md) | 구조가 안 좋거나 유지보수가 어려운 코드를 정리하고 검증하는 2개 Skill 사용법과 함께 작동하는 순서 |

### 운영과 전문 영역

| 페이지 | 설명 |
|---|---|
| [15. 버그 디버깅과 장애 사후분석](./12-debugging-and-incident-postmortem.md) | 근본 원인 규명과 장애 회고를 구분해 적용하는 방법 |
| [16. 클라우드 인프라 관리](./17-infrastructure-and-cloud.md) | `ywc-infra-design`, `ywc-iac-author`, `ywc-infra-review`, `ywc-infra-optimize` 를 판단표와 4단계 파이프라인으로 정리하고 `ywc-cloud-engineer` agent 로 이어주는 가이드 |
| [17. 인증 기능 구현](./18-authentication-implementation.md) | `ywc-auth-implement` 이 preflight -> 정책 인터뷰 -> 추천 -> dispatch 흐름을 어떻게 진행하고 security / E2E / PR gate 를 어떻게 강제하는지 |

### 레퍼런스

| 페이지 | 설명 |
|---|---|
| [18. Executor / Code-gen Prompt 패턴](./13-executor-and-codegen-patterns.md) | 옵션이 많은 `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` 실전 명령어 모음 |
| [19. 전체 Skill 레퍼런스](./14-skill-reference.md) | 위 가이드에서 다루지 않은 나머지 Skill 을 상황별로 정리한 색인 |

## 원본 자료

이 Guidebook 의 모든 command syntax 와 옵션은 각 Skill 의 `SKILL.md` (`claude-code/skills/<skill-name>/SKILL.md`)를 근거로 검증되었습니다. 옵션이 실제 동작과 다르게 느껴진다면 해당 Skill 의 `SKILL.md` 가 최신 기준입니다 — 이 문서는 그 내용을 사용자 친화적으로 재구성한 2차 자료입니다.
