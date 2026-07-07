[« 목차로 돌아가기](./README.md)

# 13. 전체 Skill 레퍼런스

앞선 워크플로우 가이드에서 다루지 않은 나머지 Skill 을 **하려는 일** 기준으로 묶어 정리했습니다. 각 흐름(Small/Medium/Large cycle, 신규 project, onboarding, testing, design)의 중간중간 필요할 때 참고하세요.

아래 표에서 원하는 상황을 찾아 Skill 이름을 클릭하면 해당 설명으로 바로 이동합니다.

| Skill | 언제 사용하나요 |
|---|---|
| [`ywc-handle-pr-reviews`](#열려있는-pr-의-review-comment-에-대응하고-ciconflict-도-함께-정리하고-싶다) | 열려있는 PR 의 review comment 에 대응하고, CI/conflict 도 함께 정리하고 싶다 |
| [`ywc-create-pr`](#변경사항을-commit-하고-draft-pr-을-열고-싶다) | 변경사항을 commit 하고 draft PR 을 열고 싶다 |
| [`ywc-merge-dependabot`](#쌓여있는-dependabot-pr-을-한번에-정리하고-싶다) | 쌓여있는 Dependabot PR 을 한번에 정리하고 싶다 |
| [`ywc-commit`](#지금까지-한-작업을-그냥-commit-만-하고-싶다) | 지금까지 한 작업을 그냥 commit 만 하고 싶다 |
| [`ywc-receive-review`](#리뷰어사람-또는-coderabbitcodexclaude의-지적을-무조건-수용하지-않고-기술적으로-검증한-뒤-대응하고-싶다) | 리뷰어(사람 또는 CodeRabbit/Codex/Claude)의 지적을 무조건 수용하지 않고, 기술적으로 검증한 뒤 대응하고 싶다 |
| [`ywc-brainstorm`](#아이디어가-아직-구체적이지-않아서-정리부터-하고-싶다) | 아이디어가 아직 구체적이지 않아서 정리부터 하고 싶다 |
| [`ywc-tech-research`](#라이브러리나-구현-방식을-비교해서-뭘-쓸지-결정하고-싶다) | 라이브러리나 구현 방식을 비교해서 뭘 쓸지 결정하고 싶다 |
| [`ywc-agentic`](#목표-하나만-던지고-계획부터-구현까지-사람-개입-없이-맡기고-싶다) | 목표 하나만 던지고 계획부터 구현까지 사람 개입 없이 맡기고 싶다 |
| [`ywc-security-audit`](#인증결제처럼-민감한-코드의-보안-취약점을-점검하고-싶다) | 인증/결제처럼 민감한 코드의 보안 취약점을 점검하고 싶다 |
| [`ywc-refactor-clean`](#오래된-dead-code-미사용-함수export의존성를-정리하고-싶다) | 오래된 dead code (미사용 함수/export/의존성)를 정리하고 싶다 |
| [`ywc-tdd-ritual`](#red--green--refactor-를-문서화된-절차대로-엄격하게-지키면서-구현하고-싶다) | RED → GREEN → REFACTOR 를 문서화된 절차대로 엄격하게 지키면서 구현하고 싶다 |
| [`ywc-e2e-test-strategy`](#critical-user-flow-를-playwright-로-자동화하거나-기존-e2e-커버리지의-빈틈을-점검하고-싶다) | critical user flow 를 Playwright 로 자동화하거나, 기존 E2E 커버리지의 빈틈을 점검하고 싶다 |
| [`ywc-product-review`](#코드가-아니라-비즈니스서비스-관점에서-프로젝트를-리뷰받고-싶다) | 코드가 아니라 비즈니스/서비스 관점에서 프로젝트를 리뷰받고 싶다 |
| [`ywc-review-learnings`](#code-review-에서-반복-지적되는-내용을-학습시켜서-다음부터-다시-지적하지-않게-하고-싶다) | Code review 에서 반복 지적되는 내용을 학습시켜서 다음부터 다시 지적하지 않게 하고 싶다 |
| [`ywc-ubiquitous-language`](#개발자도메인-전문가llm-이-공유할-도메인-용어집을-만들거나-갱신하고-싶다) | 개발자·도메인 전문가·LLM 이 공유할 도메인 용어집을 만들거나 갱신하고 싶다 |
| [`ywc-project-mission`](#project-의-why-와-rejected-approach-를-기록하고-싶다) | Project 의 why 와 rejected-approach 를 기록하고 싶다 |
| [`ywc-release-pr-list`](#release-pr-developmain-등에-포함된-merged-pr-목록을-정리하고-싶다) | Release PR (develop→main 등)에 포함된 merged PR 목록을 정리하고 싶다 |
| [`ywc-changelog-release-notes`](#changelogmd-나-사용자용-release-note-를-작성하고-싶다) | CHANGELOG.md 나 사용자용 release note 를 작성하고 싶다 |
| [`ywc-skill-author`](#새-ywc--skill-을-만들거나-기존-skill-을-규칙에-맞게-정리점검하고-싶다) | 새 ywc-* skill 을 만들거나, 기존 skill 을 규칙에 맞게 정리/점검하고 싶다 |
| [`ywc-setup-language` / `ywc-setup`](#출력-언어의-영속-기본값을-설정해서-매번-language-를-묻지-않게-하고-싶다) | 출력 언어의 영속 기본값을 설정해서 매번 language 를 묻지 않게 하고 싶다 |
| [`ywc-worktrees`](#격리된-worktree-경로를-만들거나-점검정리하고-싶다) | 격리된 worktree 경로를 만들거나, 점검/정리하고 싶다 |
| [`ywc-docker-isolate`](#병렬로-띄운-worktree-들의-docker-포트가-서로-겹쳐서-충돌하는-문제를-해결하고-싶다) | 병렬로 띄운 worktree 들의 Docker 포트가 서로 겹쳐서 충돌하는 문제를 해결하고 싶다 |

## PR / Review 를 다루고 싶을 때

### 열려있는 PR 의 review comment 에 대응하고, CI/conflict 도 함께 정리하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
</ToolTabs>
PR 번호를 생략하면 현재 branch 의 PR 을 자동으로 찾습니다.

### 변경사항을 commit 하고 draft PR 을 열고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
[04](./04-general-cycle-small.md), [05](./05-general-cycle-medium-large.md)의 흐름에 이미 포함되어 있으므로, 그 흐름 밖에서 단독으로 PR 만 열고 싶을 때 씁니다.

### 쌓여있는 Dependabot PR 을 한번에 정리하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
</ToolTabs>
`security` 를 생략하면 전체 Dependabot PR 대상, `parallel-auto` 를 생략하면 PR 번호 순으로 하나씩 순차 처리합니다.

### 지금까지 한 작업을 그냥 commit 만 하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-commit authentication 관련 변경만 커밋해줘" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-commit authentication 관련 변경만 커밋해줘" />
  </ToolTabsPanel>
</ToolTabs>
PR 생성이나 코드 변경 자체에는 사용하지 않습니다 — commit 전용입니다.

### 리뷰어(사람 또는 CodeRabbit/Codex/Claude)의 지적을 무조건 수용하지 않고, 기술적으로 검증한 뒤 대응하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-receive-review 리뷰어가 이 헬퍼 함수는 안 쓰인다며 삭제하라는데, 진짜 안 쓰이는지 확인부터 해줘" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-receive-review 리뷰어가 이 헬퍼 함수는 안 쓰인다며 삭제하라는데, 진짜 안 쓰이는지 확인부터 해줘" />
  </ToolTabsPanel>
</ToolTabs>
동의부터 하고 구현하는 기본 동작을 막고, 모든 지적을 "검증해야 할 제안"으로 취급합니다. `ywc-handle-pr-reviews` 의 자동화를 보완하는 판단 레이어입니다.

## 아직 계획이 없거나, 사람 개입 없이 끝까지 돌리고 싶을 때

### 아이디어가 아직 구체적이지 않아서 정리부터 하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm 알림 기능을 만들고 싶은데 아직 어떻게 할지 구체적이지 않음" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm 알림 기능을 만들고 싶은데 아직 어떻게 할지 구체적이지 않음" />
  </ToolTabsPanel>
</ToolTabs>
Socratic 대화로 목적/제약/성공 기준과 대안 2~3개를 도출한 뒤 `ywc-plan` 으로 handoff 합니다.

### 라이브러리나 구현 방식을 비교해서 뭘 쓸지 결정하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research &quot;Hono SSE 구현&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research &quot;Hono SSE 구현&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
</ToolTabs>
`--depth` 로 조사 깊이(25 요약 ~ 100 전수조사)를, `--format html` 로 self-contained 리포트 출력을 조절할 수 있습니다.

### 목표 하나만 던지고 계획부터 구현까지 사람 개입 없이 맡기고 싶다

`ywc-agentic` 전용 페이지로 옮겼습니다 — 자세한 사용법과 예시는 [06. 목표 하나로 자동 완료하기](./06-agentic-autonomous-loop.md)를 참고하세요.

## 품질, 보안, 프로덕트 관점을 점검하고 싶을 때

### 인증/결제처럼 민감한 코드의 보안 취약점을 점검하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
</ToolTabs>

### 버그의 원인을 못 찾아서 답답하다

`ywc-debug-rootcause` 전용 페이지로 옮겼습니다 — 자세한 사용법과 예시는 [12. 버그 디버깅과 장애 사후분석](./12-debugging-and-incident-postmortem.md)를 참고하세요.

### 오래된 dead code (미사용 함수/export/의존성)를 정리하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
</ToolTabs>

### Production 장애가 나서 회고 문서를 써야 한다

`ywc-incident-postmortem` 전용 페이지로 옮겼습니다 — 자세한 사용법과 예시는 [12. 버그 디버깅과 장애 사후분석](./12-debugging-and-incident-postmortem.md)를 참고하세요.

### RED → GREEN → REFACTOR 를 문서화된 절차대로 엄격하게 지키면서 구현하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tdd-ritual 로그인 실패 사유를 구체적으로 보여주는 기능을 TDD 로 구현해줘" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tdd-ritual 로그인 실패 사유를 구체적으로 보여주는 기능을 TDD 로 구현해줘" />
  </ToolTabsPanel>
</ToolTabs>
`ywc-code-gen`, `ywc-sequential-executor` 등에서 언급되는 opt-in `--tdd` 절차가 바로 이 skill 입니다 — 매 RED/GREEN/REFACTOR 전환마다 검증 단계를 강제합니다.

### critical user flow 를 Playwright 로 자동화하거나, 기존 E2E 커버리지의 빈틈을 점검하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
</ToolTabs>
`--init` 으로 Playwright 를 처음부터 세팅하고, `--audit` 으로 기존 커버리지 빈틈만 점검할 수도 있습니다.

### 코드가 아니라 비즈니스/서비스 관점에서 프로젝트를 리뷰받고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-product-review --format html" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-product-review --format html" />
  </ToolTabsPanel>
</ToolTabs>
User value, UX, growth, risk 등 비즈니스 관점에서 프로젝트를 되짚어봅니다 — 코드 리뷰는 `ywc-impl-review`, 보안 리뷰는 `ywc-security-audit` 을 대신 씁니다.

## Project 의 지식을 누적하고 싶을 때 (Stateful Skills)

이 Skill 들은 한 번 쓰고 끝나는 것이 아니라, 대화가 끝나도 project 에 남아 다음 session 에서도 참고되는 지식을 관리합니다.

### Code review 에서 반복 지적되는 내용을 학습시켜서 다음부터 다시 지적하지 않게 하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings 이 지적은 false positive 야, 학습해둬" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings 이 지적은 false positive 야, 학습해둬" />
  </ToolTabsPanel>
</ToolTabs>

### 개발자·도메인 전문가·LLM 이 공유할 도메인 용어집을 만들거나 갱신하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
</ToolTabs>
`--ddd` 는 Entity / Value Object / Aggregate 같은 DDD Type 컬럼을 추가합니다.

### Project 의 why 와 rejected-approach 를 기록하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission 이 project 의 목표는 ..." />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission 이 project 의 목표는 ..." />
  </ToolTabsPanel>
</ToolTabs>
[07. 새 Project 시작하기](./07-starting-a-new-project.md)에서 이미 다뤘습니다 — project 진행 중 방향이 바뀔 때도 다시 사용할 수 있습니다.

## Release 를 준비하고 싶을 때

### Release PR (develop→main 등)에 포함된 merged PR 목록을 정리하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
</ToolTabs>

### CHANGELOG.md 나 사용자용 release note 를 작성하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>
`--pr-list <ywc-release-pr-list 의 결과 파일>` 을 넘기면 git log 대신 그 목록을 근거로 생성합니다.

## Toolkit 자체를 확장하거나 실행 인프라를 다루고 싶을 때

### 새 ywc-* skill 을 만들거나, 기존 skill 을 규칙에 맞게 정리/점검하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-skill-author 결제 webhook 재시도 로직을 처리하는 새 skill 을 만들고 싶어" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-skill-author 결제 webhook 재시도 로직을 처리하는 새 skill 을 만들고 싶어" />
  </ToolTabsPanel>
</ToolTabs>
`ywc-*` skill 의 frontmatter/body/references 규칙을 검증하고 맞춰줍니다. skill 내용을 고치는 게 아니라 skill "자체"를 새로 만들거나 구조를 정리할 때 씁니다.

### 출력 언어의 영속 기본값을 설정해서 매번 language 를 묻지 않게 하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-setup-language ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-setup --scope project --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
생성 문서, PR 문구, commit message 의 출력 언어를 매번 skill 호출마다 `--lang` 로 넘기지 않고 고정하고 싶을 때 씁니다. project 또는 user 의 영속 기본값을 설정하는 용도이며, 현재 chat 언어를 바꾸지는 않습니다.

일회성 지정은 계속 우선합니다. 해석 순서는 대상 skill 에 명시한 `--lang` > project/user 영속 기본값 > 질문입니다.

### 격리된 worktree 경로를 만들거나, 점검/정리하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>
보통 `ywc-parallel-executor` 가 내부적으로 호출하지만, `--mode audit`/`prune`/`resolve` 로 직접 점검·정리할 수도 있습니다.

### 병렬로 띄운 worktree 들의 Docker 포트가 서로 겹쳐서 충돌하는 문제를 해결하고 싶다

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
</ToolTabs>
`ywc-parallel-executor` 가 각 task worktree 마다 자동으로 호출하는 결정론적 port 할당 skill 입니다 — worktree 마다 고유한 `COMPOSE_PROJECT_NAME` 과 port 블록을 배정해 "port is already allocated" 충돌을 막습니다.

---

[← 이전: 13. Executor / Code-gen Prompt 패턴](./13-executor-and-codegen-patterns.md) · [다음: 15. 사전 준비와 설치 →](./15-prerequisites-installation.md)
