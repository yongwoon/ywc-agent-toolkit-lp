[« 목차로 돌아가기](./README.md)

# 12. 버그 디버깅과 장애 사후분석

## 언제 이 두 Skill 을 쓰는가

두 Skill 은 서로 다른 질문에 답합니다. 지금 하려는 질문이 무엇인지에 따라 골라 쓰세요.

| 하려는 일 | 질문 | 사용할 Skill |
|---|---|---|
| 버그를 반복적으로 고치지만 계속 같은 곳에서 실패한다 | "이 버그의 근본 원인이 정말 무엇인가?" | `ywc-debug-rootcause` |
| Production 장애가 이미 발생했고 기록을 남겨야 한다 | "무엇이 일어났고, 어떻게 대응하며, 다음에 뭘 할 것인가?" | `ywc-incident-postmortem` |

## `ywc-debug-rootcause` — 버그 원인 규명

버그 증상만 보고 근본 원인을 찾을 수 없을 때 씁니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-debug-rootcause 결제 webhook 이 가끔 중복 처리됨. 원인을 못 찾겠음" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-debug-rootcause 결제 webhook 이 가끔 중복 처리됨. 원인을 못 찾겠음" />
  </ToolTabsPanel>
</ToolTabs>

증상만 고치는 patch 를 막고 4단계 root-cause 조사를 강제합니다. 같은 지점에서 3회 이상 수정에 실패하면 architecture 자체를 의심하도록 안내합니다.

## `ywc-incident-postmortem` — 장애 회고와 정리

Production 장애가 발생하고 근본 원인도 알았을 때, 이를 문서화해 팀(그리고 필요하면 고객)과 공유합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
</ToolTabs>

`--client` 는 내부 세부사항을 뺀 고객용 요약을 추가로 만듭니다.

## 두 Skill 이 함께 작동하는 방식

장애 대응의 일반적인 순서는 다음과 같습니다.

**1단계: 라이브 장애 중 — `ywc-debug-rootcause` 사용**

장애가 발생했을 때는 빠르게 근본 원인을 찾아야 합니다. `ywc-debug-rootcause` 는 증상에서부터 출발해 네 단계 조사(현상 재현 → 가설 수립 → 가설 검증 → 근본 원인 확정)를 강제합니다. 임시방편(workaround)이 아니라 진짜 원인을 찾을 때까지 진행됩니다.

**2단계: 수정 후 — `ywc-incident-postmortem` 사용**

근본 원인을 찾았고 수정도 배포했다면, 이제 그 경험을 기록할 차례입니다. `ywc-debug-rootcause` 에서 나온 원인 판정문(예: "세션 캐시 만료 시점 계산 오류")을 input 으로 받으면, `ywc-incident-postmortem` 은 다시 조사하지 않고 그대로 활용해 timeline, impact assessment, 재발 방지 액션 아이템을 작성합니다. 팀 전체가 이해할 수 있도록 내부 기술 세부사항은 축약하고, 필요하면 `--client` 로 고객 공개용 요약도 함께 생성합니다.

---

[← 이전: 11. 디자인 검토 및 개선하기](./11-design-review.md) · [다음: 13. Executor / Code-gen Prompt 패턴 →](./13-executor-and-codegen-patterns.md)
