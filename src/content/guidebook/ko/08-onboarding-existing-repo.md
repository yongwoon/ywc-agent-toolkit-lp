[« 목차로 돌아가기](./README.md)

# 08. 기존 Repo 에 처음 진입하기

## 언제 이 흐름을 쓰는가

이미 코드가 존재하는 낯선 repository 에 처음 들어가서 "이 codebase 가 어떻게 생겼는지" 파악해야 할 때 사용합니다. 반대로 백지 상태에서 새 project 를 설계하는 것이라면 [07. 새 Project 시작하기](./07-starting-a-new-project.md)로 이동하세요 — 두 흐름은 반대 방향이라 같은 세션에서 함께 쓰지 않습니다.

## 무엇을 해주는가

`ywc-onboard-repo` 는 Glob/Grep reconnaissance 로 tech stack / architecture / convention 을 추출해 두 가지를 만듭니다.

1. **Onboarding Guide** — 대화창에 바로 출력되는 문서 (Tech Stack, Architecture, Key Entry Points, Directory Map, Request Lifecycle, Conventions 등)
2. **Starter CLAUDE.md** — repo root 에 기록되는 파일. 기존 `CLAUDE.md` 가 있으면 덮어쓰지 않고 `## Detected Conventions` 섹션으로 보강합니다.

## 실행 예시

**기본 실행** — repo 전체를 조사해 Onboarding Guide + Starter CLAUDE.md 둘 다 생성
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo" />
  </ToolTabsPanel>
</ToolTabs>

**monorepo 에서 특정 workspace 만 조사**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --scope apps/web/" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --scope apps/web/" />
  </ToolTabsPanel>
</ToolTabs>

**Starter CLAUDE.md 는 필요 없고 설명 문서만 필요할 때**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --guide-only" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --guide-only" />
  </ToolTabsPanel>
</ToolTabs>

**Onboarding Guide 는 필요 없고 CLAUDE.md 만 필요할 때**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --claude-md-only" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --claude-md-only" />
  </ToolTabsPanel>
</ToolTabs>

## 이후에 할 일

- reconnaissance 중 dead code 누적이 발견되면 결과 보고서에 안내가 함께 나옵니다 — `ywc-refactor-clean` 으로 후속 cleanup PR 을 별도로 분리하세요 (onboarding PR 에 섞지 않습니다).
- Onboarding Guide 를 다 읽었다면, 이제 기존 코드에 변경을 가하는 일반적인 개발 흐름으로 넘어갑니다 → [02. 핵심 개념](./02-core-concepts.md)에서 규모(Small/Medium/Large) 판단 기준을 확인하세요.

---

[← 이전: 07. 새 Project 시작하기](./07-starting-a-new-project.md) · [다음: 09. Test 작성 및 실행하기 →](./09-testing-guide.md)
