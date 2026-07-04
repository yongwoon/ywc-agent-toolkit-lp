[« 목차로 돌아가기](./README.md)

# 07. 새 Project 시작하기

## 언제 이 흐름을 쓰는가

Git repository 자체가 없거나, 있어도 코드가 거의 없는 백지 상태에서 project 를 설계할 때 사용합니다. 이미 코드가 있는 낯선 repo 를 파악하려는 것이라면 이 페이지가 아니라 [08. 기존 Repo 에 처음 진입하기](./08-onboarding-existing-repo.md)로 이동하세요 — 두 흐름은 반대 방향이며 같은 세션에서 함께 쓰지 않습니다.

> 시작하기 전에: 매번 `--lang` 을 붙이기 싫다면 `ywc-setup-language` 로 출력 언어를 한 번 고정해 두세요. 이후 아래 skill 들이 그 설정을 따릅니다.

## 전체 흐름

이 흐름은 **발산 → 결정 → 수렴 → 착수 게이트**의 깔때기 모양입니다. 아이디어를 넓게 펼친 뒤(1), 왜와 무엇을 못박고(2~3), 구조와 사양으로 좁힌 다음(4~9), 착수해도 되는지 게이트를 통과(10)하고 구현으로 넘어갑니다. *(선택)* 으로 표시된 단계는 이미 확정된 경우 건너뛸 수 있습니다.

| 단계 | Skill | 역할 |
|---|---|---|
| 1 | `ywc-brainstorm` *(선택)* | 아이디어가 아직 흐릿할 때, 목적·제약·success criteria·대안 2~3개를 한 질문씩 Socratic 대화로 확정. 의도가 이미 확고하면 건너뜀 |
| 2 | `ywc-project-mission` | project 의 why, success criteria, rejected-approach log 를 `docs/mission.md` 에 기록. **구조를 짜기 전에 왜를 먼저 못박음** |
| 3 | `ywc-tech-research` *(선택)* | tech stack / library 후보를 병렬 비교하고 선택 근거를 기록. stack 이 이미 정해졌으면 건너뜀 |
| 4 | `ywc-project-scaffold` | 확정된 stack 기준으로 directory 구조 설계 (Markdown plan 산출) |
| 5 | `ywc-ubiquitous-language` *(도메인 중심 project 권장)* | 개발자·도메인 전문가·LLM 이 공유할 표준 용어집을 `docs/ubiquitous-language.md` 에 정의 → 이후 spec 과 `ywc-code-gen` 이 canonical term 을 사용 |
| 6 | `ywc-spec-writer --full` | `docs/specification/` 에 전체 사양서 작성 (goal / feature / data model / user flow) |
| 7 | `ywc-spec-validate` | 사양서 completeness / consistency / feasibility / code-compatibility 검증. `DONE` 이 될 때까지 6↔7 반복 |
| 8 | `ywc-project-docs` | Architecture / Product / Operations 등 부가 문서 (필요한 경우) |
| 9 | `ywc-task-generator` | `DONE` 된 spec 을 dependency-safe Task 로 분해 |
| 10 | `ywc-confidence-gate` | 구현 착수 전 준비도를 5개 축으로 점수화 (PROCEED ≥90 / REVIEW 70–89 / STOP &lt;70) |
| 11 | [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) 로 진입 | 실제 구현 시작 |

## 실행 예시

**1. 아이디어 정리 (선택)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm 소규모 건설업체가 앱 없이 출퇴근을 기록하게 하고 싶은데 어디서부터 시작할지 모르겠어" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm 소규모 건설업체가 앱 없이 출퇴근을 기록하게 하고 싶은데 어디서부터 시작할지 모르겠어" />
  </ToolTabsPanel>
</ToolTabs>
한 번에 하나씩 되묻는 Socratic 대화로 목적·제약·대안을 좁혀 줍니다. 무엇을 만들지 이미 분명하다면 이 단계는 건너뛰고 2번부터 시작하세요.

**2. Project 의 why 를 기록**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission 이 project 의 목표는 소규모 건설업체가 별도 앱 없이 출퇴근을 기록하게 하는 것. 성공 기준은 관리자 1명이 인력 10명 이하의 근태를 5분 안에 마감할 수 있는가" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission 이 project 의 목표는 소규모 건설업체가 별도 앱 없이 출퇴근을 기록하게 하는 것. 성공 기준은 관리자 1명이 인력 10명 이하의 근태를 5분 안에 마감할 수 있는가" />
  </ToolTabsPanel>
</ToolTabs>
directory 구조나 사양보다 먼저 **왜와 성공 기준**을 못박습니다 — 이후 모든 단계가 이 mission 을 기준으로 판단됩니다.

**3. Tech stack 결정 (선택)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
</ToolTabs>
4번 scaffold 는 "stack 확정 후" 구조를 그리므로, stack 이 아직 안 정해졌다면 여기서 후보를 비교하고 근거를 남긴 뒤 넘어가세요. 이미 정해졌으면 건너뜁니다.

**4. Directory 구조 설계**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
</ToolTabs>
Language 는 필수이고 나머지는 비어 있으면 되물으므로, 가능한 한 Framework / Architecture / Scale 을 함께 명시하세요. 이 skill 은 **Markdown plan 만** 산출합니다 — 실제 file 생성은 `ywc-code-gen` 의 몫입니다.

**5. 도메인 용어집 (도메인 중심 project 권장)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
</ToolTabs>
표준 용어를 먼저 정의해 두면 다음 단계의 spec 과 `ywc-code-gen` 이 같은 이름을 쓰게 되어, 동의어가 코드에 뒤섞이는 것을 막습니다. 용어가 단순한 project 라면 건너뛰어도 됩니다.

**6. 전체 사양서 작성**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**7. 사양서 검증**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
</ToolTabs>
`DONE_WITH_CONCERNS` 가 나오면 6번 `ywc-spec-writer` 로 돌아가 보완 후 재검증합니다 — `DONE` 이 될 때까지 반복하세요. (`ywc-spec-ready` 는 `ywc-plan` 이 만든 spec 전용 자동 수렴 loop 이므로 여기서는 사용하지 않습니다.)

**8. 부가 문서 (필요시)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
</ToolTabs>

**9. Task 분해**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**10. 착수 게이트**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-confidence-gate 이 spec 과 task 로 구현에 착수해도 되는지 점검" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-confidence-gate 이 spec 과 task 로 구현에 착수해도 되는지 점검" />
  </ToolTabsPanel>
</ToolTabs>
scope clarity / architecture compliance / evidence quality / reuse verified / root cause 5개 축을 점수화합니다. `PROCEED`(≥90)면 [05. general cycle](./05-general-cycle-medium-large.md)로 넘어가고, `STOP`(&lt;70)이면 지적된 축을 먼저 보완하세요.

## 참고

- `ywc-brainstorm` · `ywc-tech-research` · `ywc-ubiquitous-language` 는 상황에 따라 건너뛸 수 있는 보조 단계입니다. 의도·stack·도메인 용어가 이미 명확하다면 **2 → 4 → 6 → 7 → 9 → 10** 의 핵심 spine 만 따라도 됩니다.
- `ywc-confidence-gate` 가 `STOP`(&lt;70)을 주면 구현으로 넘어가지 말고, 부족하다고 지적된 축을 먼저 채운 뒤 다시 통과시키세요.
- 규모가 작아 spec 분해 없이 바로 구현 가능하면 `ywc-plan` 이 Small path 로 routing 해 이 흐름 전체를 건너뛸 수 있습니다.
- `ywc-onboard-repo` 는 이 흐름의 반대 방향(기존 repo 조사)이므로 새 project 생성 시에는 사용하지 않습니다.

---

[← 이전: 06. 목표 하나로 자동 완료하기](./06-agentic-autonomous-loop.md) · [다음: 08. 기존 Repo 에 처음 진입하기 →](./08-onboarding-existing-repo.md)
