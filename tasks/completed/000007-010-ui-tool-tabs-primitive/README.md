# 000007-010-ui-tool-tabs-primitive

## Purpose
Anthropic Agent SDK 문서(Python/TypeScript 탭)와 동일한 패턴으로, Claude Code/Codex 커맨드를 탭으로 전환해 보여주는 새 UI primitive `ToolTabs`(+`ToolTabs.Panel`)를 구현하고 `docs/design-system/components.md`에 8번째 primitive로 문서화한다. 이 task는 컴포넌트 자체와 design-system 문서만 다루며, 실제 가이드북 페이지 연결은 `000007-020`이 담당한다.

## Scope
- `src/components/ui/tool-tabs.tsx` — `ToolTabs`(Provider 소비 + 탭 헤더 렌더) + `ToolTabs.Panel`(패널 콘텐츠) compound component, WAI-ARIA Tabs 패턴 준수
- `src/components/ui/tool-tabs-provider.tsx`(또는 동일 파일 내) — `ToolTabsProvider` React Context: 선택된 툴(`"claude-code" | "codex"`) 공유 상태 + `localStorage` 영속화
- `docs/design-system/components.md` — `## ToolTabs` 섹션 추가(8번째 primitive), 인트로 문구/목록을 "7개"→"8개"로 갱신
- `docs/design-system/docs-page.md` — Code blocks 규칙(44–46번째 줄)에 탭 변형 한 문장 추가

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-tool-tabs.md` — 이 기능 전체의 spec (Iteration 1 Amendments 포함, `ywc-spec-validate` DONE 확정본). Operative Sections 안내를 먼저 확인할 것: `## Dependencies`, `### FR-1: ToolTabs UI Primitive`, `## Existing Constraints Touched`의 일부 행은 원문이 아니라 `## Iteration 1 Amendments`가 authoritative.
- `docs/ywc-plans/guidebook-tool-tabs.md#FR-1: ToolTabs UI Primitive` (+ Iteration 1의 FR-1 Amendment) — compound API 형태, ARIA role 계약, 활성 탭 색상(StatCard `lane` 컨벤션: claude=amber/codex=cyan), 키보드 지원(화살표+Home/End+Enter/Space), `useId()` 기반 ARIA id 고유성, 패널은 항상 DOM에 유지(`hidden` attribute)
- `docs/ywc-plans/guidebook-tool-tabs.md#FR-2: 공유 선택 상태 + localStorage 영속화` (+ Iteration 1의 FR-2 Amendment) — `ToolTabsProvider`의 정확한 초기화/영속화 전략(SSR-matching default + `useEffect`-only read, lazy initializer 금지)
- `docs/ywc-plans/guidebook-tool-tabs.md#FR-5: Design System 문서화` (+ Iteration 1의 FR-5 Amendment) — `components.md` 신규 섹션 포맷 + 인트로 문구 갱신 요구
- `docs/design-system/components.md:35-43` `#CodeBlock` — `ToolTabs.Panel` 내부 콘텐츠가 감싸는 기존 primitive의 정확한 prop 계약(`code`/`prompt`/`label`/`multiline`), 반드시 static string literal로만 사용

### Summary
`ToolTabs`는 탭 헤더(`role="tablist"`)와 패널(`role="tabpanel"`)로 구성된 순수 클라이언트 컴포넌트이며, 실제 선택 상태는 `ToolTabsProvider`(React Context)가 소유한다. 초기 렌더는 항상 `"claude-code"`로 SSR과 일치시키고, `localStorage`(`ywc-tool-preference` 키) 읽기는 반드시 mount 이후 `useEffect`에서만 수행해 hydration mismatch를 피한다 — 이로 인해 저장된 선호가 `"codex"`인 재방문자는 한 프레임 정도 Claude Code 패널이 먼저 보였다가 전환되는 것을 허용된 트레이드오프로 받아들인다. 활성 탭 색상은 `StatCard`의 `lane` 컨벤션(claude=amber, codex=cyan)을 따른다. 여러 `ToolTabs` 인스턴스가 한 페이지에 있어도 ARIA id가 충돌하지 않도록 `useId()`로 인스턴스별 고유 prefix를 생성한다. 이 task는 컴포넌트/Provider/design-system 문서만 만들고, 실제 가이드북 페이지에 연결하는 것은 `000007-020`이 담당한다.

### Out of Scope (from spec)
- 가이드북 layout(`src/app/[locale]/guidebook/layout.tsx`)에 `ToolTabsProvider`를 실제로 mount하는 작업 — `000007-020`의 책임 (이 task는 Provider 컴포넌트 자체만 구현)
- 가이드북 MDX 파이프라인에 `ToolTabs`를 `components` 맵으로 등록하는 작업 — `000007-020`의 책임
- 실제 가이드북 콘텐츠에 `<ToolTabs>` 적용 — `000007-020`의 책임
- 랜딩페이지 Install Steps 섹션(`000003-030`)에 이 컴포넌트를 실제로 적용하는 작업 — spec의 Out of Scope, 이 컴포넌트는 향후 재사용 가능하도록만 설계

## Criticality
`normal` — 사용자 입력이 서버로 전송되지 않는 정적 클라이언트 UI. `localStorage`는 비민감 선호값(선택된 툴 이름)만 저장한다.

## Dependencies

### Depends On
- `000003-010-ui-primitives-clipboard` — `src/components/ui/code-block.tsx`(`CodeBlock` primitive)가 필요, `ToolTabs.Panel` 내부 예시 콘텐츠가 이를 감싼다

### Depended By
- `000007-020-ui-guidebook-tool-tabs-demo` — 이 task가 만든 `ToolTabs`/`ToolTabs.Panel`/`ToolTabsProvider`를 가이드북 layout/페이지에 연결

## Key Files
- `src/components/ui/tool-tabs.tsx`
- `src/components/ui/tool-tabs-provider.tsx` (또는 `tool-tabs.tsx` 내부에 함께 구현)
- `docs/design-system/components.md`
- `docs/design-system/docs-page.md`

## Notes
- MDX 콘텐츠 안에서 `<ToolTabs>`가 쓰일 것을 전제로, `ToolTabs`/`ToolTabs.Panel`/내부에서 감싸는 `CodeBlock`은 모두 정적 문자열 리터럴 prop만 받도록 설계한다 — `serializeGuidebookMdx`(`src/lib/guidebook-content.ts:86-99`)가 `blockJS: true`로 `{}` JS 표현식을 차단하기 때문이다(JSX 태그 자체는 허용).
- `tool` prop에 인식되지 않는 값이 들어오면 런타임 fallback이 아니라 빌드 타임 에러로 실패하도록 설계한다(정적 export 사이트이므로 콘텐츠 오류를 빌드에서 잡는 것이 안전).
- 한 `ToolTabs` 블록의 `Panel`들이 페이지 전역에서 선택된 툴을 포함하지 않는 경우, 그 블록은 자신의 첫 번째 `Panel`을 기본 표시하고 그 동기화 사이클에서는 열외로 처리한다.
- 애니메이션은 `transform`/`opacity`만 사용하고 `prefers-reduced-motion`을 존중한다 (`docs/design-system/foundations.md#Motion`).
- `docs/design-system/components.md`의 인트로 문구("The 7 reusable primitives...")와 컴포넌트 이름 목록을 8개로 갱신하는 것을 빠뜨리지 않는다 — 빠뜨리면 문서가 자기모순 상태가 된다.

## Parallel Execution Metadata

### Ownership
- `src/components/ui/tool-tabs.tsx`
- `src/components/ui/tool-tabs-provider.tsx` (또는 동등 파일)
- `docs/design-system/components.md`
- `docs/design-system/docs-page.md`

### Shared Surfaces
- `(None identified)` — 이 task가 신규로 만드는 파일/섹션이며, 이후 task는 import/참조만 한다

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000003-010-ui-primitives-clipboard`

### Task Verify
- `npx tsc --noEmit`
- `npm run lint`
- 수동 확인: 임시 페이지 또는 Storybook 부재 시 간이 렌더 테스트로 `ToolTabs` 키보드 조작(화살표/Home/End/Enter/Space), `localStorage` 저장/복원, `prefers-reduced-motion` 동작 확인

## Out of Scope
- 가이드북 layout/페이지 연결, 실제 콘텐츠 적용 — `000007-020`
- 랜딩페이지 install-steps 탭 wiring — 별도 미래 task(`000003-030` 이후)
