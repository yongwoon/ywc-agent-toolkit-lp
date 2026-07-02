# 000007-010-ui-tool-tabs-primitive — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000003-010-ui-primitives-clipboard` is completed (merged) — `src/components/ui/code-block.tsx` must exist on `main`

## Allowed Edit Scope
- [ ] `src/components/ui/tool-tabs.tsx`(+ Provider 파일), `docs/design-system/components.md`, `docs/design-system/docs-page.md`에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] `000003-010`이 실제로 merge되지 않았거나 `code-block.tsx`의 prop 계약이 spec과 다르면 멈추고 보고한다
- [ ] `docs/design-system/components.md`의 기존 7개 primitive 계약을 변경해야 하는 상황이 생기면 멈추고 보고한다 (이 task는 추가만 함)

## Implementation Steps
- [ ] **`ToolTabsProvider` 구현** (`docs/ywc-plans/guidebook-tool-tabs.md#FR-2` + Iteration 1 FR-2 Amendment)
  - [ ] React Context 생성: 선택된 툴(`"claude-code" | "codex"`) state + setter
  - [ ] 초기 state는 항상 `"claude-code"`(SSR과 일치) — lazy initializer로 `localStorage`를 동기 읽기하지 않는다
  - [ ] mount 이후 `useEffect`에서 `localStorage.getItem('ywc-tool-preference')`를 읽어 유효한 값이면 state 갱신
  - [ ] state 변경 시 `localStorage.setItem('ywc-tool-preference', ...)`으로 저장, `localStorage` 접근 실패 시 예외를 던지지 않고 메모리 전용으로 계속 동작
- [ ] **`ToolTabs`/`ToolTabs.Panel` 구현** (`docs/ywc-plans/guidebook-tool-tabs.md#FR-1` + Iteration 1 FR-1 Amendment)
  - [ ] `ToolTabs`가 자식 `ToolTabs.Panel` 목록에서 탭 헤더(`role="tablist"`, 각 탭 `role="tab"` + `aria-selected` + `aria-controls`)를 생성
  - [ ] `useId()`로 인스턴스별 고유 ID prefix 생성해 `aria-controls`/`aria-labelledby` 충돌 방지
  - [ ] 모든 `ToolTabs.Panel` 콘텐츠는 항상 DOM에 유지하고 비활성 패널은 `hidden` attribute로 처리(조건부 unmount 금지)
  - [ ] 키보드 지원: 오른쪽/왼쪽 화살표(다음/이전 탭 포커스+활성화), `Home`(첫 탭), `End`(마지막 탭), `Enter`/`Space`(포커스된 탭 활성화) — WAI-ARIA Tabs automatic-activation 모델
  - [ ] 활성 탭 색상: `tool="claude-code"`일 때 amber, `tool="codex"`일 때 cyan (`StatCard` `lane` 컨벤션과 동일 토큰 사용)
  - [ ] 페이지 전역 선택 상태가 현재 블록의 어떤 `Panel`과도 매칭되지 않으면 첫 번째 `Panel`을 기본 활성으로 표시
  - [ ] `tool` prop에 `"claude-code"`/`"codex"` 외의 값이 오면 빌드 타임에 에러를 던지도록 처리(타입 레벨 리터럴 유니온 + 런타임 assertion)
  - [ ] `prefers-reduced-motion: no-preference`일 때만 패널 전환 애니메이션(`transform`/`opacity`) 적용, reduced-motion에서는 즉시 전환
- [ ] **`docs/design-system/components.md` 갱신**
  - [ ] 기존 7개 primitive와 동일한 포맷으로 `## ToolTabs` 섹션 추가(설명 + Props + 예시 코드, `code="..."` static literal 사용)
  - [ ] 파일 상단 인트로 문구("The 7 reusable primitives...")와 괄호 안 컴포넌트 이름 목록을 8개로 갱신
- [ ] **`docs/design-system/docs-page.md` 갱신**
  - [ ] "Code blocks" 규칙(44–46번째 줄) 뒤에 탭 변형(`ToolTabs`)을 언급하는 한 문장 추가, 기존 문단은 그대로 유지

## Task Verify
- [ ] `npx tsc --noEmit`
- [ ] `npm run lint`
- [ ] 수동 확인: 임시 페이지(또는 브라우저 devtools)에서 `ToolTabs` 2개 인스턴스를 나란히 렌더링해 (a) 한쪽 탭 클릭 시 다른 인스턴스도 동기화되는지, (b) 키보드 화살표/Home/End/Enter/Space 전체 동작, (c) `localStorage` 저장 후 새로고침 시 복원(약간의 flash 허용), (d) `localStorage` 비활성화 상태에서도 클릭이 정상 동작하는지, (e) `prefers-reduced-motion` 활성화 시 애니메이션 없이 즉시 전환되는지 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 이 프로젝트는 별도 테스트 러너 미구성, task verification은 build/lint/typecheck + 수동 확인)
- [ ] integration tests pass (해당 없음)
- [ ] app builds without error (`npm run build`)
