[« 목차로 돌아가기](./README.md)

# 11. 디자인 검토 및 개선하기

## 언제 이 흐름을 쓰는가

두 Skill 은 서로 다른 질문에 답합니다. 지금 하려는 질문이 무엇인지에 따라 골라 쓰세요.

| 하려는 일 | 질문 | 사용할 Skill |
|---|---|---|
| 화면이 쓰기 편한지 확인하고 싶다 | "이 화면이 usability / accessibility 관점에서 문제 없는가?" | `ywc-ui-ux-review` |
| 화면이 밋밋하거나 AI가 만든 것처럼 보인다 | "이 화면이 특색 있는가?" | `ywc-design-renew` |
| 완전히 새로운 UI/component 를 처음부터 만들고 싶다 | (위 둘 다 해당 없음 — 신규 제작) | 이 Guidebook 범위 밖의 UI 제작 Skill 사용 |

## `ywc-ui-ux-review` — Usability / Accessibility 감사

정적 코드 분석과 실제 UI 실행(Chrome DevTools MCP)을 결합해 Information Architecture, Visual Design, Usability, Accessibility(WCAG 2.2 AA)를 감사합니다. 결과는 Critical / High / Medium / Low 4단계 리포트로 나옵니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ui-ux-review 결제 화면 usability 점검해줘" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ui-ux-review 결제 화면 usability 점검해줘" />
  </ToolTabsPanel>
</ToolTabs>

Live UI 탐색이 포함되므로 staging 또는 preview URL 이 준비되어 있으면 더 정확한 결과가 나옵니다.

## `ywc-design-renew` — 시각적 De-slop & Renewal

기존 화면이 평범하거나 "AI가 만든 것 같은" 디자인일 때 시각적 개성을 부여하거나, gradient text / cyan-on-dark / Inter / 균일한 card grid 같은 AI-slop tell 을 점검합니다.

**코드 renewal (기본 모드)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-design-renew --target setup-collection/default-project/docs/design/README.md --url http://localhost:3000" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-design-renew --target setup-collection/default-project/docs/design/README.md --url http://localhost:3000" />
  </ToolTabsPanel>
</ToolTabs>

**점검만 하고 코드는 건드리지 않기**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-design-renew --mode check --target setup-collection/default-project/docs/design/README.md --fail-on high" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-design-renew --mode check --target setup-collection/default-project/docs/design/README.md --fail-on high" />
  </ToolTabsPanel>
</ToolTabs>

`--url` 을 지정하면 Before/After 스크린샷까지 함께 제공되고, 생략하면 코드 분석만으로 진행합니다(정확도는 낮아짐). `--fail-on` 은 check 모드의 gate 기준으로, 기본값은 `critical` 입니다.

## 신규 제작은 이 Skill 들이 아니다

`ywc-design-renew` 는 **기존 화면 renewal 전용**입니다. 처음부터 새로 만드는 UI/component 는 이 Guidebook 의 `ywc-*` review/renewal 흐름이 아니라 UI 제작 전용 workflow 로 다루는 것이 적절합니다 — 아직 존재하지 않는 것을 "de-slop" 할 수는 없기 때문입니다.

---

[← 이전: 10. E2E Test 자동화 전략](./10-e2e-test-strategy.md) · [다음: 12. 버그 디버깅과 장애 사후분석 →](./12-debugging-and-incident-postmortem.md)
