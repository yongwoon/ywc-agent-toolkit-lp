[« 목차로 돌아가기](./README.md)

# 13. 코드 구조와 유지보수성 관리

## 언제 이 4개 Skill 을 쓰는가

네 Skill 은 모두 "코드가 안 좋다"는 같은 증상에서 출발하지만 서로 다른 질문에 답합니다. 지금 하려는 질문이 무엇인지에 따라 골라 쓰세요.

| 하려는 일 | 질문 | 사용할 Skill |
|---|---|---|
| 안 쓰는 함수/export/의존성을 지우고 싶다 | "이 코드가 실제로 쓰이는가?" | `ywc-refactor-clean` |
| shallow module 이 뒤엉켜 있어 구조 자체를 재구성하고 싶다 | "이 구조를 deep module 로 다시 짜야 하는가?" | `ywc-improve-architecture` |
| PR cycle 밖에서 구현 품질과 spec 적합성을 검증받고 싶다 | "이 구현이 architecture/design/devex/security/QA 관점에서 괜찮은가?" | `ywc-impl-review` |
| agent 가 이 코드를 고치는 데 드는 비용을 먼저 측정하고 싶다 | "여기를 고치려면 agent 가 token 을 얼마나 써야 하는가?" | `ywc-agent-legibility-audit` |

## `ywc-refactor-clean` — Dead Code 정리

오래된 dead code (미사용 함수/export/의존성)를 knip / depcheck / ts-prune 같은 도구로 찾아 안전하게 삭제합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
</ToolTabs>

`--tier safe` 는 detection tool + grep + test 세 가지가 모두 "안 쓰임"에 동의하는 항목만 삭제합니다. 구조 자체를 재구성하지는 않습니다 — 그건 `ywc-improve-architecture` 의 역할입니다.

## `ywc-improve-architecture` — Shallow → Deep Module 재구조화

뒤엉킨 shallow module 더미를 deep module(단순한 interface 뒤에 완전한 구현을 숨기는 module)로 behavior-preserving 하게, 한 번에 한 단위씩 재구조화합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

`--dry-run` 으로 먼저 Opportunity Backlog 만 확인한 뒤, 문제 없으면 flag 를 빼고 실제 consolidation 을 실행합니다. 전체 codebase 를 한 번에 대상으로 지정할 수는 없습니다(Scope Gate) — 반드시 module/directory 단위로 좁혀서 지정해야 합니다.

## `ywc-impl-review` — 구현 품질 리뷰 (단독 실행)

Architecture / Design / Devex / Security / QA 5축 병렬 리뷰를 실행합니다. [04](./04-general-cycle-small.md), [05](./05-general-cycle-medium-large.md)의 PR 전 검증 단계로 이미 내장되어 있지만, 그 흐름 밖에서 이미 존재하는 코드를 대상으로 단독 실행할 수도 있습니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
</ToolTabs>

코드를 고치지 않는 읽기 전용 분석입니다 — 발견된 항목의 실제 수정은 Backend/Frontend 담당 agent 로 별도 dispatch 합니다.

## `ywc-agent-legibility-audit` — Agent 관점 가독성 측정

Correctness/보안이 아니라 "이 코드를 agent 가 안전하게 고치는 데 token 이 얼마나 드는가"를 deep/shallow module 비율과 change-point 명시성 기준으로 측정합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
</ToolTabs>

읽기 전용 리포트입니다. 구조를 실제로 고치지는 않으며, 발견된 항목은 `ywc-improve-architecture`(shallow→deep 재구조화) 또는 `ywc-refactor-clean`(dead code 삭제)으로 routing 됩니다.

## 4개 Skill 이 함께 작동하는 방식

낯설거나 오래되어 손대기 부담스러운 codebase 를 정리할 때의 일반적인 순서는 다음과 같습니다.

**1단계: 먼저 측정 — `ywc-agent-legibility-audit`**

아무것도 고치기 전에, 어디부터 손대야 비용 대비 효과가 가장 큰지 읽기 전용으로 측정합니다. Deep/shallow module 비율과 change-point 명시성을 기준으로 legibility 가 가장 나쁜 지점을 짚어줍니다.

**2단계: 가장 안전한 것부터 — `ywc-refactor-clean`**

측정 결과에서 dead code 가 legibility 를 깎아먹고 있다면, 가장 되돌리기 쉬운 이 단계부터 처리합니다. Detection tool + grep + test 세 witness 가 모두 동의하는 것만 삭제하므로 위험이 낮습니다.

**3단계: 구조 자체를 재구성 — `ywc-improve-architecture`**

Dead code 를 걷어내고도 shallow module 더미가 남아있다면, 이제 구조를 deep module 로 재구성합니다. Behavior-preserving 하게 한 번에 한 단위씩, green test suite 뒤에서 진행됩니다.

**4단계: 최종 검증 — `ywc-impl-review`**

재구조화가 끝나면 PR 을 열기 전에 5축 리뷰로 남은 문제가 없는지 확인합니다. 여기서 나온 지적은 다시 1단계(`ywc-agent-legibility-audit`)나 2~3단계로 되돌아가는 입력이 될 수 있습니다.

---

[← 이전: 12. 버그 디버깅과 장애 사후분석](./12-debugging-and-incident-postmortem.md) · [다음: 14. 클라우드 인프라 관리 →](./17-infrastructure-and-cloud.md)
