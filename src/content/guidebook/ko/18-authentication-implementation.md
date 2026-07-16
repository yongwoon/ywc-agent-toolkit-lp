[« 목차로 돌아가기](./README.md)

# 15. 인증 기능 구현

## 언제 이 Skill 을 쓰는가

`ywc-auth-implement` 는 로그인/회원가입, OAuth, MFA, 세션 처리, 비밀번호 재설정, 계정 삭제, 동의 플로우 등 새로운 인증 기능이 필요할 때, 코드를 쓰기 전에 정책 결정을 명시적으로 먼저 확정하고 싶을 때 사용합니다. 다만 "인증과 관련된 모든 것"을 다루는 건 아닙니다.

- 인증 코드가 이미 존재하고 그에 대한 보안 리뷰만 하고 싶다면 [`ywc-security-audit`](./14-skill-reference.md) 을 대신 사용하세요 — 이 Skill 은 빌드를 주도하는 것이지 사후 리뷰가 아닙니다.
- 인증과 무관한 일반적인 기능 계획에는 [`ywc-plan`](./14-skill-reference.md) 을 사용하세요 — 이 Skill 의 정책 인터뷰는 인증에 특화되어 있어 일반 계획 작업을 대체하지 않습니다.
- 인증 플로우 외의 E2E 커버리지를 작성하려면 [11. E2E 테스트 자동화 전략](./10-e2e-test-strategy.md) 을 사용하세요 — 이 Skill 이 주도하는 것은 아래 설명하는 인증 플로우 한정 E2E 게이트뿐이며, 프로젝트 전체 테스트 스위트는 대상이 아닙니다.

## 플로우가 작동하는 방식

**1단계: Preflight gate**

질문을 시작하기 전, 다섯 가지 idempotent 체크를 실행합니다:

- 기존 `feature/<auth-slug>` 브랜치가 있으면 재사용합니다(새 브랜치는 long-lived 브랜치에서 시작할 때만 생성).
- `.env.example` 에는 누락된 placeholder 만 추가하며 기존 값은 절대 덮어쓰거나 노출하지 않습니다.
- 프레임워크/DB 근거가 부족하면 먼저 `ywc-tech-research` 로 라우팅합니다.
- 기존 인증이 감지되면 `new`/`extend`/`migrate` 중 하나를 선택할 때까지 `NEEDS_CONTEXT` 로 hard-stop 합니다.
- ToS/개인정보처리방침 초안에는 첫 줄부터 "법적 검토 대기 중인 초안" 라벨을 붙입니다.

**2단계: 9개 카테고리 정책 인터뷰**

한 번의 집중된 라운드에서 다음을 다룹니다:

- 로그인 방식과 OAuth provider 준비 상태
- MFA 등록 및 복구
- 세션 저장/TTL/로테이션/철회/디바이스 관리
- 비밀번호 재설정과 해싱 라이브러리 경계
- 프로필 필드
- 계정 삭제 및 재인증
- 얕은 RBAC(role, 기본값, claims)
- 동의 버전 관리/수집/철회
- 남용 방지(rate limiting, 검증, 복구 제어)

각 답변은 승인됨, 리스크를 명시한 채 명시적으로 보류됨, 해당 없음 중 하나로 기록됩니다.

**3단계: 동적 추천**

스택 근거와 승인된 정책 답변으로부터 실전에서 검증된 라이브러리나 매니지드 서비스를 추천합니다 — 고정된 "지원 스택" 목록은 절대 쓰지 않습니다. 근거가 부족하면 `ywc-tech-research` 를 통한 실시간 조사로 fallback 합니다.

**4단계: 구현 dispatch**

이 Skill 은 오케스트레이션만 하며 인증 코드 자체를 작성하지 않습니다. 각각 `ywc-tdd-ritual`(RED → RED 검증 → GREEN → GREEN 검증 → REFACTOR → GREEN 검증)을 따르는 세 개의 agent 로 dispatch 합니다:

- `ywc-backend-coder` — 승인된 백엔드 정책을 담당(비밀번호 해싱, 토큰 서명, 비밀값 암호화를 직접 구현하지 않음)
- `ywc-frontend-coder` — 로그인/회원가입 폼, MFA 등록 UI, 세션 인지 라우팅을 담당
- `ywc-doc-writer` — ToS/개인정보처리방침 초안을 담당

**5단계: 보안·E2E·PR 게이트**

dispatch 된 작업이 반영되면 그 diff 에 대해 `ywc-security-audit` 를 실행합니다:

| 감사 결과 | 다음에 일어나는 일 |
|---|---|
| Critical/High 0건 | 승인된 플로우(이메일/비밀번호를 선택한 경우에만 회원가입/로그인/재설정, 활성화된 경우에만 계정 삭제, 설정된 OAuth provider 별로 하나의 플로우, 승인된 경우에만 MFA)만을 대상으로 하는 `ywc-e2e-test-strategy` 의 정책 조건부 E2E 로 진행 |
| Critical/High 1건 이상 | `DONE_WITH_CONCERNS` 를 반환하고 시정될 때까지 E2E 와 PR 생성을 건너뜀 |

두 게이트를 모두 통과해야만 이 Skill 은 `ywc-create-pr` 을 제안합니다 — 자동으로 실행하지 않습니다.

## `ywc-auth-implement`

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-auth-implement" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-auth-implement" />
  </ToolTabsPanel>
</ToolTabs>

flag 없이 실행합니다 — 인터뷰와 이후의 모든 판단이 preflight gate 부터 전부 대화형으로 진행되므로, 미리 넘겨줄 "scope" 나 "flow" 같은 인자가 없습니다.

## Claude Code 와 Codex 의 차이

인터뷰 내용, 고정 스택을 쓰지 않는 추천 규칙, `new`/`extend`/`migrate` hard stop, 그리고 보안/E2E 게이트는 두 tool 에서 동일합니다. 다른 것은 dispatch 방식입니다. Claude Code 는 `Task(subagent_type: ...)` 를 이용해 `ywc-backend-coder`, `ywc-frontend-coder`, `ywc-doc-writer` 로 직접 fan-out 합니다. Codex 는 현재 세션 안에서 오케스트레이션을 계속하며, 대신(자동 실행하지 않고) `$ywc-plan → $ywc-spec-ready → $ywc-task-generator → $ywc-code-gen --tdd --review` 라는 skill-chain 경로를 출력합니다 — 애플리케이션 구현과 그 보안 리뷰는 `$ywc-code-gen` 이 담당합니다. 문서 작업만 위임하는 경우, Codex 는 named-agent fan-out 대신 경계가 명확한 general subagent 하나를 사용합니다.

---

[« 이전: 14. 클라우드 인프라 관리](./17-infrastructure-and-cloud.md) · [다음: 16. Executor / Code-gen Prompt 패턴 →](./13-executor-and-codegen-patterns.md)
