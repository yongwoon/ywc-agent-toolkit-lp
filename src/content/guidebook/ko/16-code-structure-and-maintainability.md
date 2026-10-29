[« 목차로 돌아가기](./README.md)

# 13. 코드 구조와 유지보수성 관리

## 언제 이 2개 Skill 을 쓰는가

두 Skill 은 모두 "코드가 안 좋다"는 같은 증상에서 출발하지만 서로 다른 질문에 답합니다. 지금 하려는 질문이 무엇인지에 따라 골라 쓰세요.

| 하려는 일 | 질문 | 사용할 Skill |
|---|---|---|
| 안 쓰는 함수/export/의존성을 지우고 싶다 | "이 코드가 실제로 쓰이는가?" | `ywc-refactor-clean` |
| PR cycle 밖에서 구현 품질과 spec 적합성을 검증받고 싶다 | "이 구현이 architecture/design/devex/security/QA 관점에서 괜찮은가?" | `ywc-impl-review` |

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

`--tier safe` 는 detection tool + grep + test 세 가지가 모두 "안 쓰임"에 동의하는 항목만 삭제합니다. 구조 자체를 재구성하지는 않습니다. 구조 문제가 의심된다면 `ywc-impl-review` 로 architecture/design 문제를 짚어낸 뒤, 그 수정은 평소의 cycle 에서 처리하세요.

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

## 2개 Skill 이 함께 작동하는 방식

낯설거나 오래되어 손대기 부담스러운 codebase 를 정리할 때의 일반적인 순서는 다음과 같습니다.

**1단계: 가장 안전한 것부터 — `ywc-refactor-clean`**

dead code 가 남아 있다면, 가장 되돌리기 쉬운 이 단계부터 처리합니다. Detection tool + grep + test 세 witness 가 모두 동의하는 것만 삭제하므로 위험이 낮습니다.

**2단계: 최종 검증 — `ywc-impl-review`**

정리가 끝나면 PR 을 열기 전에 5축 리뷰로 남은 문제가 없는지 확인합니다. 여기서 나온 지적은 다시 1단계로 되돌아가거나, 평소의 구현 cycle 에서 고칠 입력이 됩니다.

---

[← 이전: 12. 버그 디버깅과 장애 사후분석](./12-debugging-and-incident-postmortem.md) · [다음: 14. 클라우드 인프라 관리 →](./17-infrastructure-and-cloud.md)
