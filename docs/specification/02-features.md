# Features

> **디자인/카피 원천**: 아래 모든 섹션의 시각적 구현은 `docs/design-system/components.md`(Button/Badge/CodeBlock/Terminal/StatCard/FaqItem/LocaleSwitcher 7개 primitive 계약)를, 문구 톤은 `docs/design-system/content-voice.md`("you"로 독자 지칭, sentence case, 이모지·느낌표·과장 금지, skill 이름 lowercase-mono 그대로)를 따른다. 개별 섹션 Notes에는 spec 고유의 제약만 기술하고, 디자인 시스템과 중복되는 스타일 세부사항은 반복하지 않는다.

## Header & Navigation

### 상단 내비게이션
**User story**: 방문자로서, 페이지 상단에서 로고와 주요 섹션(Features, Install, FAQ)으로 바로 이동할 수 있어야 한다. 그래야 원하는 정보를 스크롤 없이 빠르게 찾을 수 있기 때문이다.

**Acceptance criteria**:
- [ ] 로고 클릭 시 페이지 최상단으로 이동한다
- [ ] 내비게이션 항목 클릭 시 해당 섹션으로 스크롤 이동한다
- [ ] 현재 선택된 locale과 GitHub 저장소 바로가기가 항상 노출된다

**Notes**: 좁은 화면(모바일)에서는 내비게이션 항목이 축약되거나 접혀야 한다.

### Locale 전환
**User story**: 비영어권 방문자로서, 내가 이해하는 언어로 페이지를 바로 볼 수 있어야 한다. 그래야 번역 없이도 프로젝트 가치를 정확히 파악할 수 있기 때문이다.

**Acceptance criteria**:
- [ ] 헤더의 locale 전환 UI에서 en/ja/ko/zh/es 5개 언어 중 하나를 선택할 수 있다
- [ ] locale을 전환해도 현재 보고 있던 섹션 위치가 유지된다
- [ ] 각 locale 페이지에 다른 locale로의 hreflang 상호 참조가 포함되어, 검색엔진이 올바른 언어 버전을 사용자에게 보여줄 수 있다

**Notes**: 서버가 없는 정적 배포 특성상, `/`는 `/en/`으로 가는 정적 `<meta refresh>` stub이며(JS 없이도 동작), `navigator.language` 기반 브라우저 언어 매칭은 이 stub 위에 progressive enhancement로만 얹힌다(유일한 메커니즘이 아님). no-JS 방문자·검색엔진 크롤러는 stub에 포함된 5개 locale hreflang 링크를 통해 원하는 언어로 진입할 수 있다. (자세한 구현은 docs/tech-stack.md 참고)

## Hero

### 핵심 가치 제안
**User story**: 처음 방문한 개발자로서, 페이지에 진입한 순간 이 프로젝트가 무엇을 해결해주는지 한눈에 알 수 있어야 한다. 그래야 몇 초 안에 더 볼지 말지를 결정할 수 있기 때문이다.

**Acceptance criteria**:
- [ ] 헤드라인이 프로젝트의 핵심 가치를 한 문장으로 전달하며, "41개 skill"처럼 Claude Code/Codex 공통으로 참인 수치만 구체적으로 명시한다
- [ ] 헤드라인은 agent 개수를 특정 숫자로 명시하지 않는다("expert agents" 등 tool-무관 표현 사용) — Claude Code(12개)와 Codex(7개)의 agent 개수가 다르기 때문
- [ ] "Install" CTA와 "Star on GitHub" CTA가 함께 노출된다
- [ ] 예시 CLI 명령을 보여주는 데모 영역이 포함된다

**Notes**: 카피는 ohmyclaudecode.com처럼 구체적 수치를 포함해 신뢰도를 높이되, tool마다 다른 수치(agent 개수)는 Hero가 아닌 Feature Grid에서 정확히 분리해 보여준다. Hero와 Feature Grid가 같은 스크롤 내에서 서로 다른 agent 수치를 주장하면 방문자에게 자기모순으로 읽히므로, 이 두 섹션 간 수치 일관성은 반드시 지켜야 한다.

## Problem / Solution

### Before-After 비교
**User story**: 방문자로서, 이 toolkit을 쓰기 전과 후의 차이를 구체적으로 비교해 볼 수 있어야 한다. 그래야 내 현재 워크플로우의 어떤 문제가 해결되는지 납득할 수 있기 때문이다.

**Acceptance criteria**:
- [ ] "toolkit 없이"와 "toolkit 사용 시"를 두 컬럼으로 대비해 보여준다
- [ ] 각 컬럼에 최소 3개 이상의 구체적 항목(예: 수동 계획 수립 vs 자동 planning skill)이 나열된다

**Notes**: 과장된 수치보다 ywc-agent-toolkit README에 실제로 명시된 기능(예: ywc-plan, ywc-code-gen 등 skill 체계)에 근거한 문구를 사용한다.

## Feature Grid

### 기능/통계 하이라이트
**User story**: 방문자로서, toolkit이 제공하는 skill과 agent의 규모를 숫자로 확인할 수 있어야 한다. 그래야 이 프로젝트의 성숙도를 빠르게 판단할 수 있기 때문이다.

**Acceptance criteria**:
- [ ] Claude Code 41개 skill / 12개 agent, Codex 41개 skill / 7개 agent 수치가 노출된다
- [ ] 각 통계 카드에 한두 문장의 보충 설명이 포함된다

**Notes**: 수치는 ywc-agent-toolkit README.md의 "Supported Tools" 표와 항상 일치해야 하며, 값이 바뀌면 이 섹션도 함께 갱신되어야 한다.

## Install Steps

### 설치 안내
**User story**: 설치를 결심한 방문자로서, 내가 사용하는 도구(Claude Code 또는 Codex)에 맞는 설치 명령을 바로 복사해서 실행할 수 있어야 한다. 그래야 별도 문서를 찾아보지 않고도 몇 분 안에 설치를 마칠 수 있기 때문이다.

**Acceptance criteria**:
- [ ] 번호가 매겨진 단계별로 설치 절차가 제시된다
- [ ] 각 명령 블록에 복사 버튼이 있어 클릭 한 번으로 클립보드에 복사된다
- [ ] Claude Code 플러그인 마켓플레이스 설치와 Codex 플러그인 설치 두 경로가 모두 안내된다
- [ ] 클립보드 복사(Clipboard API)가 실패해도(비보안 컨텍스트, 권한 거부, 미지원 브라우저 등) 명령 텍스트가 육안으로 선택 가능한 상태로 남아 있어 수동 복사가 가능하다

**Notes**: 설치 명령 문구는 ywc-agent-toolkit README.md의 Installation 섹션과 항상 일치해야 한다. 이 섹션은 마켓플레이스/플러그인 설치 2가지 경로만 다루며, README의 "bash script fallback" 경로(git/bash/jq 요구)는 이 LP의 범위에 포함하지 않는다 — FAQ의 설치 요구사항 답변도 이 2가지 경로 기준으로만 작성한다(FAQ 섹션 Notes 참고).

## Social Proof

### 커뮤니티 인용
**User story**: 방문자로서, 다른 개발자나 매체가 이 프로젝트를 어떻게 평가했는지 확인할 수 있어야 한다. 그래야 내가 직접 써보기 전에 신뢰를 얻을 수 있기 때문이다.

**Acceptance criteria**:
- [ ] 최소 1개 이상의 인용구가 출처와 함께 노출된다
- [ ] 인용 출처 링크가 외부 원문으로 연결된다

**Notes**: 초기 버전에는 인용구가 없을 수 있으며, 이 경우 섹션 자체를 노출하지 않거나 "Coming soon" 상태로 대체한다 (Open Questions 참고).

## FAQ

### 자주 묻는 질문
**User story**: 설치를 망설이는 방문자로서, 흔한 의문(요구사항, 비용, 학습 곡선 등)에 대한 답을 스크롤 한 번으로 확인할 수 있어야 한다. 그래야 남은 불확실성 때문에 이탈하지 않을 수 있기 때문이다.

**Acceptance criteria**:
- [ ] 최소 5개 이상의 질문-답변 쌍이 아코디언 형태로 제공된다
- [ ] "이게 무엇인가요", "설치 요구사항", "비용/토큰 영향" 질문이 반드시 포함된다

**Notes**: "설치 요구사항" 답변은 이 페이지의 install-steps가 실제로 안내하는 마켓플레이스/플러그인 설치 경로 기준으로 작성한다 — 두 경로 모두 별도 사전 요구사항이 없다("Plugin marketplace and Codex plugin installation have no prerequisites"). README.md의 git/bash/jq/python3/gh CLI 요구사항은 install-steps에서 다루지 않는 bash script fallback 경로에 해당하므로 FAQ 답변에 포함하지 않는다.

## Not Found (404)

### 잘못된 경로 처리
**User story**: 오타 URL이나 지원하지 않는 locale 경로(예: `/fr/`)로 진입한 방문자로서, 막다른 빈 화면이 아니라 원하는 곳으로 돌아갈 방법을 안내받아야 한다. 그래야 페이지를 이탈하지 않고 탐색을 이어갈 수 있기 때문이다.

**Acceptance criteria**:
- [ ] GitHub Pages 배포용 정적 `404.html`이 빌드 산출물에 포함된다
- [ ] 404 페이지는 기본 locale(en) 문구로 노출되며, 5개 locale 홈으로 돌아가는 링크를 제공한다

**Notes**: 정적 export 환경에서는 Route Handler로 404를 동적 처리할 수 없으므로, 빌드 시점에 고정된 `404.html` 하나로 모든 미매칭 경로를 커버한다.

## Footer

### 링크 모음
**User story**: 방문자로서, 페이지 하단에서 문서·변경 이력·이슈 트래커 등 추가 정보로 이동할 수 있어야 한다. 그래야 더 깊은 정보가 필요할 때 헤매지 않을 수 있기 때문이다.

**Acceptance criteria**:
- [ ] Product 링크 그룹(Features, Install)과 Resources 링크 그룹(GitHub, CHANGELOG, Issues, License)이 구분되어 노출된다
- [ ] 저작권 표기가 포함된다

