# Guidebook Tool Tabs (Claude Code / Codex)

> Status: Draft
> Scale: Medium
> Created: 2026-07-02
> Author: ywc-plan (Claude)
> Spec Reference: `N/A — no docs/specification/08-guidebook.md exists yet; same gap already accepted by `tasks/completed/000004-010-lib-mdx-content-pipeline/README.md`, `tasks/000004-020-ui-guidebook-layout/README.md`, and `tasks/000004-030-config-guidebook-content-sync/README.md`, all of which proceeded on `develop-with-llm/docs/guides/guidebook/README.md` alone.

> **Operative Sections** (per Iteration 1 Amendments): `## Dependencies`, `### FR-1: ToolTabs UI Primitive`, and the `## Existing Constraints Touched` table rows for `tasks/000004-020-ui-guidebook-layout/README.md`, `docs/design-system/docs-page.md`, and `src/lib/guidebook-content.ts` (`GuidebookFrontmatter`) are superseded by `## Iteration 1 Amendments` below — read the amendment section as authoritative for those, not the marked originals. All other sections remain authoritative as originally written, supplemented (not replaced) by the amendment's additions to Acceptance Criteria, FR-5, and Edge Cases.

## Purpose

`ywc-agent-toolkit`은 Claude Code(12 agents)와 Codex(7 agents) 두 툴을 동시에 지원하지만, 가이드북 문서 페이지의 코드/커맨드 예시는 현재 툴 구분 없이 단일 블록으로만 표현할 수 있다. Anthropic Agent SDK 문서(`code.claude.com/docs/ja/agent-sdk/overview`)의 Python/TypeScript 탭 패턴처럼, 방문자가 자신이 쓰는 툴(Claude Code 또는 Codex)에 맞는 커맨드만 골라 볼 수 있는 탭 UI가 필요하다. 이 스펙은 그 탭 컴포넌트를 설계·구현하고, 가이드북 콘텐츠 파이프라인에 실제로 연결한다.

## Scope

- 새 UI primitive `ToolTabs`(+`ToolTabs.Panel`) — 제목/설명/탭 헤더/코드 콘텐츠 구조 (스크린샷 참고: 탭 헤더, 활성 탭 표시, 코드 블록, 복사 버튼은 기존 `CodeBlock`을 그대로 재사용)
- 페이지 전역 공유 + `localStorage` 유지되는 탭 선택 상태 (React Context)
- 가이드북 MDX 렌더링 파이프라인(`<MDXRemote>`)에 `ToolTabs`를 커스텀 컴포넌트로 등록
- `docs/design-system/components.md`에 8번째 primitive로 계약 문서화
- `docs/design-system/docs-page.md`의 Code blocks 규칙에 탭 변형 언급 추가
- 최소 1개 실제 가이드북 페이지(`src/content/guidebook/ko/03-quickstart.md`, Step 1)에 `<ToolTabs>` 적용 데모

## Out of Scope

- 랜딩페이지 Install Steps 섹션(`000003-030`의 "Claude Code/Codex 탭 구분")에 이 컴포넌트를 실제로 적용하는 작업 — `000003-030`은 아직 구현되지 않았고, 사용자가 이번 범위를 가이드북 코드블록 전용으로 명시적으로 한정함. 다만 컴포넌트를 재사용 가능한 `src/components/ui/` primitive로 설계해 향후 `000003-030`이 그대로 가져다 쓸 수 있게는 한다.
- 전체 가이드북 콘텐츠(01–13 페이지)를 `<ToolTabs>` 형식으로 마이그레이션하는 작업 — 사용자가 "최소 1개 페이지 적용"으로 완료 조건을 한정함
- Codex용 quickstart 커맨드의 실제 정확성 검증 — upstream(`develop-with-llm`) 저장소에 아직 Codex 대응 커맨드가 문서화되어 있지 않음 (Open Questions 참고)
- `docs/specification/08-guidebook.md` 정식 spec 작성 — Phase 000004의 기존 3개 task가 이미 이 spec 부재 상태로 진행된 선례를 따름
- 검색(⌘K) 인덱싱, sidebar/TOC 구조 변경 — `000004-020`/`000004-030` 책임, 이 스펙과 무관

## Existing Constraints Touched

> ⚠️ SUPERSEDED (rows for `tasks/000004-020-ui-guidebook-layout/README.md`, `docs/design-system/docs-page.md`, `src/lib/guidebook-content.ts` `GuidebookFrontmatter`, and the complement-check row) by Iteration 1 — see [Iteration 1 Amendments § Corrected Citations](#iteration-1-amendments)

| Existing artifact | Behavior (verified by reading the file) | New code's interaction |
|---|---|---|
| `src/lib/guidebook-content.ts:86-99` `serializeGuidebookMdx` | `next-mdx-remote/serialize`를 `format: "mdx"`, `blockJS: true`, `blockDangerousJS: true`로 호출 — MDX 안에서 JSX 태그는 허용하지만 `{}` JS 표현식은 차단됨 | comply — `<ToolTabs>`/`<ToolTabs.Panel>`은 정적 문자열 리터럴 prop(`tool="claude-code"`)만 받는 순수 JSX 태그로 설계, 콘텐츠 저자가 동적 JS 표현식을 쓸 필요가 없도록 함 |
| `docs/design-system/components.md:35-43` `CodeBlock` | Clipboard 복사 버튼, `code`/`prompt`/`label`/`multiline` prop 계약, 복사 실패 시 텍스트 선택 유지 fallback | extend — `ToolTabs.Panel` 내부 콘텐츠는 기존 `CodeBlock`을 그대로 감싸 재사용하며, `CodeBlock` 자체의 prop 계약이나 fallback 로직은 변경하지 않음 |
| `docs/design-system/components.md:98` (Section composition) | `install-steps` 섹션이 "tabbed Claude Code / Codex"라는 동일한 탭 패턴을 이미 전방 참조하고 있음 (아직 미구현, `000003-030` 소관) | extend — 이 스펙에서 만드는 `ToolTabs`를 향후 `install-steps.tsx`도 재사용할 수 있도록 `src/components/ui/`의 범용 primitive로 설계 (단, 실제 wiring은 Out of Scope) |
| `docs/design-system/docs-page.md:43-46` (Code blocks) | 현재 단일 `CodeBlock` 패턴만 문서화, 탭 변형 언급 없음 | extend — 기존 규칙 문단은 그대로 두고 탭 변형 설명 문장만 추가 |
| `tasks/000004-020-ui-guidebook-layout/README.md:9,42-43` | `src/app/[locale]/guidebook/[[...slug]]/page.tsx`(catch-all route)와 `layout.tsx`는 `000004-020`이 소유(Ownership) | comply — 이 스펙의 구현 task는 해당 파일들을 신규 소유하지 않고, `000004-020`이 완전히 merge된 뒤 `<MDXRemote components={{...}}>` wiring만 추가하는 좁은 edit으로 수행 |
| `tasks/000004-030-config-guidebook-content-sync/README.md:36,46-47` | `src/content/guidebook/ko/**`는 `000004-030`이 소유(Ownership), sync 스크립트가 upstream에서 덮어씀 | comply — 데모 적용은 `000004-030`이 완전히 merge된 뒤, 이미 동기화된 파일 1개에 대한 surgical 단일 파일 edit으로 한정 (전체 디렉터리 소유권을 가져가지 않음). 이후 실제 upstream 재동기화 시 이 edit이 덮어써질 수 있음을 인지하고 진행 (Edge Case 참고) |
| `src/lib/guidebook-content.ts:22-30` `GuidebookFrontmatter` | frontmatter는 `title/description/order/slug/group`만 정의, `tool`/`agent` 관련 필드 없음 | N/A — ToolTabs는 순수 클라이언트 렌더링 컴포넌트로 frontmatter 스키마 변경이 필요 없음 |
| (complement check) `find src/content -type f` → 결과 없음 | `000004-030`이 아직 실행되지 않아 `src/content/guidebook/**`에 실제 동기화된 파일이 존재하지 않음 | 이 스펙의 구현 task는 `000004-030` 완료를 선행 조건으로 명시 (Dependencies) |
| (complement check) `grep -rn "tab\|Tab" docs/specification/*.md docs/design-system/*.md` → `components.md:98`만 매치 | 기존에 완성된 Tabs/ToolTabs primitive가 전혀 없음(전방 참조 1건 제외) | 이 스펙이 신규로 최초의 실제 구현을 만듦 — 이름 충돌 없음 |

## Acceptance Criteria

- [ ] **AC1 — 탭 전환이 페이지 전체에 동기화됨**: 방문자가 한 `ToolTabs` 블록에서 "Codex" 탭 헤더를 클릭하면, 시스템은 같은 페이지의 모든 `ToolTabs` 블록을 동시에 Codex 패널로 전환하며, 관찰 가능한 결과는 모든 탭의 `aria-selected` 상태가 동기화되고 페이지 리로드 없이 즉시 반영되는 것이다.
- [ ] **AC2 — 선택 상태가 새로고침/재방문 후에도 유지됨**: 방문자가 "Codex"를 선택한 뒤 페이지를 새로고침하거나 다른 가이드북 페이지로 이동하면, 시스템은 Codex를 기본 선택 상태로 렌더링하며, 관찰 가능한 결과는 `localStorage.getItem('ywc-tool-preference') === 'codex'`이고 hydration 이후 첫 렌더에서 Codex 탭이 활성 상태인 것이다.
- [ ] **AC3 — 키보드로 전체 조작 가능**: 방문자가 탭 헤더에 포커스한 상태에서 오른쪽 화살표 키를 누르면, 시스템은 포커스를 다음 탭 헤더로 이동시키고 해당 탭을 활성화하며(WAI-ARIA Tabs 패턴의 automatic activation), 관찰 가능한 결과는 `document.activeElement`가 다음 탭 버튼과 일치하고 그 패널이 보이는 것이다.
- [ ] **AC4 — 최초 방문 시 기본값**: `localStorage`에 `ywc-tool-preference`가 없는 상태로 가이드북 페이지를 처음 로드하면, 시스템은 모든 `ToolTabs` 블록을 "Claude Code" 패널로 기본 표시하며, 관찰 가능한 결과는 첫 페인트에서 Claude Code 탭이 `aria-selected="true"`인 것이다.
- [ ] **AC5 — MDX 파이프라인 종단 검증**: `03-quickstart.md`의 Step 1이 `serializeGuidebookMdx`/`<MDXRemote>`로 빌드 타임에 컴파일되면, 시스템은 `ToolTabs` 블록을 2개 패널(Claude Code/Codex)로 정상 렌더링하며, 관찰 가능한 결과는 `npm run build`가 에러 없이 완료되고 생성된 정적 HTML에 두 패널의 콘텐츠와 탭 헤더 마크업이 모두 존재하는 것이다.
- [ ] **AC6 — reduced-motion 존중**: 방문자의 OS/브라우저 설정이 `prefers-reduced-motion: reduce`이면, 시스템은 탭 패널 전환 시 애니메이션 없이 즉시 전환하며, 관찰 가능한 결과는 패널 전환 시 transition-duration이 0(또는 애니메이션 클래스 미적용)인 것이다.
- [ ] **AC7 — localStorage 미지원/차단 환경에서도 동작**: 방문자의 브라우저가 `localStorage` 접근을 차단(프라이버시 모드 등)하면, 시스템은 예외를 던지지 않고 세션 내 메모리 상태(Context)만으로 탭 전환 기능을 계속 제공하며, 관찰 가능한 결과는 콘솔 에러 없이 탭 클릭이 정상 동작하는 것이다(새로고침 시에는 유지되지 않음 — AC2와 별개 케이스).

## Functional Requirements

### FR-1: ToolTabs UI Primitive

> ⚠️ SUPERSEDED (code sample and active-tab color) by Iteration 1 — see [Iteration 1 Amendments § FR-1 Amendment](#iteration-1-amendments)

`src/components/ui/tool-tabs.tsx`에 새 클라이언트 컴포넌트를 구현한다. 스크린샷의 Agent SDK 문서 패턴(제목 + 설명 + 탭 헤더 + 코드 콘텐츠)을 따르되, 제목/설명은 이 컴포넌트의 책임이 아니라 MDX 콘텐츠(주변 heading/paragraph)가 담당하고, `ToolTabs` 자체는 탭 헤더 + 콘텐츠 영역만 렌더링한다. Compound component API:

```tsx
<ToolTabs>
  <ToolTabs.Panel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code={"ywc-plan ..."} />
  </ToolTabs.Panel>
  <ToolTabs.Panel tool="codex" label="Codex">
    <CodeBlock label="codex" code={"codex exec ..."} />
  </ToolTabs.Panel>
</ToolTabs>
```

탭 헤더는 `role="tablist"`, 각 탭은 `role="tab"` + `aria-selected` + `aria-controls`, 패널은 `role="tabpanel"` + `aria-labelledby`. 활성 탭 스타일은 기존 primitive들의 active-state 관례(amber 텍스트/underline, `sidebar-nav`의 active link와 동일 계열)를 따른다. `docs/design-system/components.md`에 8번째 primitive로 문서화한다(Button/Badge/CodeBlock/Terminal/StatCard/FaqItem/LocaleSwitcher와 동일한 포맷).

### FR-2: 공유 선택 상태 + localStorage 영속화

`ToolTabsProvider`(React Context)를 가이드북 layout(`src/app/[locale]/guidebook/layout.tsx`, `000004-020` 소유 — 이 스펙은 provider 마운트 지점만 추가)에서 한 번 마운트한다. Provider는 마운트 시 `localStorage.getItem('ywc-tool-preference')`를 읽어 초기값을 설정(없거나 유효하지 않으면 `"claude-code"` 기본값), 값이 바뀔 때마다 `localStorage.setItem`으로 저장한다. `localStorage` 접근이 실패(차단/미지원)하면 예외를 삼키지 않되 메모리 전용 상태로 계속 동작한다(AC7). 같은 페이지의 모든 `ToolTabs` 인스턴스는 이 Context를 구독해 하나의 선택 상태를 공유한다.

### FR-3: MDX Integration

`src/app/[locale]/guidebook/[[...slug]]/page.tsx`(`000004-020` 소유)의 `<MDXRemote>` 호출에 `components={{ ToolTabs, ... }}` 형태로 `ToolTabs`/`ToolTabs.Panel`을 등록해, 가이드북 markdown/MDX 콘텐츠 안에서 `<ToolTabs>` JSX 태그를 직접 쓸 수 있게 한다. 이는 `serializeGuidebookMdx`가 이미 `format: "mdx"`로 설정되어 있으므로(위 Existing Constraints Touched 참고) 추가 파이프라인 변경 없이 가능하다.

### FR-4: 데모 적용 (1개 실제 페이지)

`src/content/guidebook/ko/03-quickstart.md`(`000004-030` 소유, 완전히 merge된 뒤 진행)의 "Step 1 — 계획 세우기" 커맨드 블록을 `<ToolTabs>`로 감싼다. Claude Code 패널은 기존 `ywc-plan ...` 커맨드를 그대로 사용하고, Codex 패널은 대표성 있는 placeholder 커맨드를 사용하되 "예시" 성격임을 명시한다(Open Questions #1 참고). 이 edit은 `src/content/guidebook/ko/` 디렉터리 전체가 아니라 이 1개 파일에 대한 surgical edit으로 한정한다.

### FR-5: Design System 문서화

`docs/design-system/components.md`에 `## ToolTabs` 섹션을 기존 7개 primitive와 동일한 포맷(설명 + Props + 예시 코드)으로 추가한다. `docs/design-system/docs-page.md`의 "Code blocks" 규칙(현재 43–46번째 줄)에 탭 변형에 대한 한 문장을 추가한다(기존 문단은 유지, 신규 문장만 append).

## Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | 신규 npm 의존성 추가 없음(순수 React state/Context로 구현) — `docs/tech-stack.md`/`06-requirements.md#Performance`의 번들 예산 준수. `ToolTabs`/Provider만 `'use client'` 경계로 최소화하고, 이를 감싸는 나머지 가이드북 페이지는 서버 컴포넌트로 유지 (`code-block.tsx`의 최소 클라이언트 경계 선례 준용) |
| Accessibility | WAI-ARIA Tabs 패턴 준수(키보드 화살표 네비게이션, Home/End, Enter/Space), WCAG 2.2 AA 대비, `prefers-reduced-motion` 존중 (`06-requirements.md#Accessibility`, `docs/design-system/foundations.md#Motion`) |
| Compatibility | `output: 'export'` 정적 빌드와 완전히 호환 — 서버 의존 없이 빌드 타임에 모든 마크업이 사전 렌더링되고, `localStorage` 접근은 반드시 클라이언트 hydration 이후에만 발생 |
| i18n | 탭 라벨("Claude Code"/"Codex")은 툴 이름이므로 번역 대상이 아님. 주변 가이드북 콘텐츠는 Phase 000004 v1 범위상 한국어만 지원 |

## Critical Surfaces

N/A — no critical surface. 사용자 입력이 서버로 전송되지 않는 정적 클라이언트 UI이며, `localStorage`는 브라우저 로컬에만 존재하는 비민감 선호값(선택된 툴 이름)만 저장한다.

## Data Model

N/A — no data model change. 신규 DB/스키마 없음, frontmatter 스키마 변경 없음 (Existing Constraints Touched 참고).

## API Contract

N/A — no API contract change. 정적 export 사이트이며 이 기능은 신규 엔드포인트를 만들지 않는다.

## Edge Cases

- **Codex용 실콘텐츠 부재**: upstream `develop-with-llm` 가이드북이 아직 Codex 전용 커맨드를 문서화하지 않았으므로, 데모 페이지의 Codex 패널은 명시적으로 "예시" 표시가 있는 placeholder 커맨드를 사용한다 — 실제 Codex 커맨드 검증은 Out of Scope.
- **`000004-030` 재동기화 시 데모 edit 덮어쓰기 위험**: `03-quickstart.md`에 대한 이 스펙의 edit은 향후 upstream 재동기화(sync 스크립트 재실행) 시 덮어써질 수 있다. 이는 허용 가능한 트레이드오프로 간주하며(콘텐츠 소유권은 여전히 `000004-030`에 있음), 재동기화 후 `<ToolTabs>` 마크업 재적용이 필요할 수 있다는 점을 구현 task의 Notes에 명시한다.
- **한 페이지에 여러 `ToolTabs` 블록, 툴별 콘텐츠 존재 여부가 다른 경우**: 이번 데모(1개 페이지, 1개 블록)에는 해당하지 않지만, 컴포넌트 설계상 `ToolTabs.Panel`이 없는 툴은 탭 자체가 노출되지 않도록 한다(패널이 정의된 툴만 탭 헤더에 표시) — 향후 다른 페이지 확장 시 일관된 동작을 보장.
- **JS 표현식 사용 불가**: `blockJS: true`로 인해 MDX 콘텐츠 저자는 `<ToolTabs>`에 정적 문자열 prop만 전달할 수 있다 — 동적 조건부 렌더링이 필요하면 이 컴포넌트로는 불가능하다는 점을 컴포넌트 문서에 명시.
- **reduced-motion**: 애니메이션 없이 최종 상태가 즉시 표시.

## Dependencies

> ⚠️ SUPERSEDED by Iteration 1 — see [Iteration 1 Amendments § Dependencies Amendment](#iteration-1-amendments)

- N/A — no external dependencies. 기존 `next-mdx-remote`(000004-010이 도입), 기존 `CodeBlock` primitive(000003-010이 구현 예정)만 재사용.

## Open Questions

- [ ] **Codex placeholder 커맨드 표현 방식**: `03-quickstart.md` 데모의 Codex 패널에 "예시(example)" 라벨이 붙은 placeholder 커맨드를 쓰는 것으로 진행해도 괜찮은가, 아니면 실제 Codex 커맨드가 upstream에 추가될 때까지 이 데모 자체를 보류해야 하는가? (Decision needed from user — 이 스펙은 placeholder 방식으로 기본 진행하되, `ywc-spec-validate`/구현 전 최종 확인 필요)
- [ ] **`docs/specification/08-guidebook.md` 신설 여부**: Phase 000004의 4번째 task로서 이 gap을 계속 이월할지, 아니면 이번 기회에 최소한의 가이드북 spec 섹션을 신설할지 — 이번 스펙은 기존 3개 task와 동일하게 이월하는 것으로 가정.

## References

- `https://code.claude.com/docs/ja/agent-sdk/overview` — Python/TypeScript 탭 UI 참고 패턴 (스크린샷: 제목 + 설명 + 탭 헤더 + 코드 블록 + 복사 버튼)
- `docs/design-system/components.md`, `docs/design-system/docs-page.md`
- `tasks/completed/000004-010-lib-mdx-content-pipeline/`, `tasks/000004-020-ui-guidebook-layout/`, `tasks/000004-030-config-guidebook-content-sync/`
- `tasks/dependency-graph.md`

## Iteration 1 Amendments

> Source: `ywc-spec-validate` review of the initial draft — 4 Critical, 9 Warning, 5 Suggestion findings, 2 Opus advisor escalations (both resolved below). This section addresses only the failing items; all other sections of the spec above remain valid as originally written except where marked `⚠️ SUPERSEDED`.

### Failed Requirements (from ywc-spec-validate)

- **CRITICAL** — Dependencies section said "N/A" but the feature genuinely depends on 3 unmerged sibling tasks.
- **CRITICAL** — FR-1's code sample used a `{}` JS expression (`code={"ywc-plan ..."}`), contradicting the spec's own `blockJS: true` static-literal-only claim.
- **CRITICAL** — FR-2 had no initial-`localStorage`-read strategy for SSG + hydration, risking either a hydration mismatch or an unstated visible flash.
- **CRITICAL** — No Edge Case for an invalid/mistyped `tool` prop value on `ToolTabs.Panel`.
- **WARNING** — Three `file:line` citations in Existing Constraints Touched were wrong (off-by-N or pointing at the wrong section).
- **WARNING** — AC3/AC6 weren't grounded in FR-1 text (only in the NFR table), and AC3 only covered the right-arrow key, not the full WAI-ARIA keyset.
- **WARNING** — `components.md`'s "The 7 reusable primitives" intro line would go stale once ToolTabs ships as an 8th, and FR-5 didn't require updating it or having an AC.
- **WARNING** — The complement-grep claim in Existing Constraints Touched doesn't reproduce as literally stated.
- **WARNING** — No fallback rule for a `ToolTabs` block whose panels don't include the page's globally-selected tool.
- **WARNING** — No `useId()`/unique-ID strategy for ARIA wiring across multiple `ToolTabs` instances on one page.
- **SUGGESTION (advisor-resolved)** — Active-tab color convention (uniform amber vs. claude=amber/codex=cyan lane color) was left undecided.

### Dependencies Amendment

Replaces the `## Dependencies` section body:

- This feature depends on the following tasks merging to `main` **before implementation starts**:
  - `000003-010-ui-primitives-clipboard` — provides `src/components/ui/code-block.tsx`, which `ToolTabs.Panel` wraps. Confirmed absent from `main` as of this spec (only exists on branch `feature/000003-010-ui-primitives-clipboard`).
  - `000004-020-ui-guidebook-layout` — provides `src/app/[locale]/guidebook/layout.tsx` and `src/app/[locale]/guidebook/[[...slug]]/page.tsx`, which FR-2/FR-3 edit narrowly (Provider mount point, `<MDXRemote components={{...}}>` wiring).
  - `000004-030-config-guidebook-content-sync` — provides `src/content/guidebook/ko/03-quickstart.md`, which FR-4 edits.
- No new npm dependency is introduced (this part of the original Dependencies section still holds — `next-mdx-remote` and `CodeBlock` are reused, not newly added).
- The task(s) `ywc-task-generator` derives from this spec must express these three as `Depends On` / `Parallelizable After` entries in `tasks/dependency-graph.md`, consistent with this project's existing convention (verified against `tasks/dependency-graph.md`'s format for other Phase 000004 tasks).

### FR-1 Amendment

Replaces FR-1's code sample and active-tab color sentence (the rest of FR-1's original body — compound API shape, ARIA roles — still holds):

```tsx
<ToolTabs>
  <ToolTabs.Panel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan ..." />
  </ToolTabs.Panel>
  <ToolTabs.Panel tool="codex" label="Codex">
    <CodeBlock label="codex" code="codex exec ..." />
  </ToolTabs.Panel>
</ToolTabs>
```

All props passed to `ToolTabs`/`ToolTabs.Panel`/`CodeBlock` inside MDX content must be static string literals (`code="..."`, never `code={"..."}"` or any `{}` expression) — this constraint applies to every component rendered inside guidebook MDX, not just ToolTabs's own props, since `blockJS: true` blocks `{}` JS expressions but not JSX component/attribute syntax itself.

**Active-tab color** (resolves Opus advisor escalation #2): the active-tab indicator adopts the `StatCard` `lane` color convention — amber when the Claude Code tab is active, cyan when the Codex tab is active — rather than the uniform amber used by tool-neutral active states (Button/sidebar-nav/FaqItem). Rationale: unlike those tool-neutral primitives, `ToolTabs` exists specifically to distinguish the two tools, and the design system already color-codes them elsewhere (`StatCard`'s claude=amber/codex=cyan split for the 41/12 vs 41/7 skill-count tiles).

**Keyboard support** (resolves AC3/FR-1 traceability gap): FR-1's ARIA-role sentence is extended — tab headers additionally support `Home` (focus + activate first tab), `End` (focus + activate last tab), and `Enter`/`Space` (activate the focused tab), per the WAI-ARIA Tabs pattern's automatic-activation model. AC3 (below) is extended to cover this.

**Multi-instance ARIA IDs**: each `ToolTabs` instance must generate its own unique ID prefix (e.g. via React's `useId()`) for `aria-controls`/`aria-labelledby` wiring, so multiple `ToolTabs` blocks on one page never collide on ARIA IDs.

**Panel-mount behavior**: all `ToolTabs.Panel` content stays mounted in the DOM (inactive panels use the `hidden` attribute, not conditional unmounting) — required so AC5's static-HTML check (both panels' content present in the generated markup) holds regardless of which tab was active at build time.

### FR-2 Amendment (resolves Opus advisor escalation #1 — localStorage FOUC/hydration-mismatch tradeoff)

`ToolTabsProvider`'s initial state **must** default to `"claude-code"` (matching the server-rendered HTML exactly), and read `localStorage` **only** inside a post-mount `useEffect`, updating state if a valid stored preference differs from the default. Lazy/synchronous `localStorage` reads inside a `useState` initializer are explicitly prohibited (they would cause a first-client-render mismatch against the SSR output). An inline pre-hydration `<script>` (which would avoid both the mismatch and the flash) is explicitly rejected as disproportionate complexity for this feature's scope.

Accepted trade-off: a returning visitor whose stored preference is `"codex"` sees a brief (one-frame-to-a-few-hundred-ms) flash of the Claude Code panel before the `useEffect` swaps to Codex. This is acceptable for a docs/marketing static site with no CLS-sensitive business metric attached to this interaction.

**AC2 reconciliation**: AC2's existing wording ("hydration 이후 첫 렌더에서 Codex 탭이 활성 상태") is read as "the first render **after the `useEffect` reconciliation runs**", not the very first paint — the brief pre-reconciliation flash to the default is expected and does not violate AC2.

### Acceptance Criteria Amendment

Extends AC3 (original AC3 — right-arrow — still holds, this adds coverage):

- [ ] **AC3b — Home/End/Enter/Space**: When a visitor focuses a tab header and presses `Home`, `End`, `Enter`, or `Space`, the system moves focus to the first tab / last tab / activates the currently-focused tab respectively (per the WAI-ARIA Tabs automatic-activation model), observable the same way as AC3 (`document.activeElement` and panel visibility).

Adds a new AC for FR-5 (design-system documentation, previously unverified by any AC):

- [ ] **AC8 — Design-system docs updated**: When `ToolTabs` ships, `docs/design-system/components.md` contains a `## ToolTabs` section in the same format as the other 7 primitives, its intro line/list reflects 8 primitives (not 7), and `docs/design-system/docs-page.md`'s Code blocks rule (lines 44-46) references the tabbed variant — observable as a diff review confirming all three edits landed.

### FR-5 Amendment

FR-5's scope is extended: in addition to adding the `## ToolTabs` section to `components.md`, this task must also update `components.md`'s intro line ("The 7 reusable primitives...") and its parenthetical primitive name list to reflect 8 primitives, so the document doesn't contradict itself after the addition.

### Edge Cases Amendment

Adds two edge cases (the four original Edge Cases entries still hold unchanged):

- **잘못된/오탈자 `tool` prop 값**: `<ToolTabs.Panel tool="claudecode">`처럼 인식되지 않는 `tool` 값이 MDX 콘텐츠에 사용되면, 시스템은 빌드 타임 에러로 실패한다(런타임 fallback이 아님) — 이 프로젝트는 정적 export이며 모든 페이지가 빌드 타임에 생성되므로, 콘텐츠 오류를 빌드에서 잡는 쪽이 조용한 런타임 오동작보다 안전하다.
- **공유 선택 상태가 현재 블록의 패널과 일치하지 않는 경우**: 한 `ToolTabs` 블록에 정의된 `Panel`들이 페이지 전역에서 현재 선택된 툴을 포함하지 않으면(예: 향후 다른 페이지에서 Codex 패널이 아직 없는 경우), 그 블록은 자신의 첫 번째 `Panel`을 기본 활성 상태로 표시하고 그 동기화 사이클에서는 열외로 처리한다 — AC1의 "모든 블록이 동기화된다"는 요구는 각 블록이 매칭되는 패널을 가진 경우에 한정된다.

### Corrected Citations

Replaces the following rows in the `## Existing Constraints Touched` table (artifact column → corrected citation; behavior/interaction columns unchanged unless noted):

| Original citation | Corrected citation | Note |
|---|---|---|
| `tasks/000004-020-ui-guidebook-layout/README.md:9,42-43` | `tasks/000004-020-ui-guidebook-layout/README.md:7-8,61-63` | Line 9 was an unrelated `top-bar.tsx` Scope bullet; lines 61-63 are the actual `### Ownership` section proving file ownership. |
| `docs/design-system/docs-page.md:43-46` | `docs/design-system/docs-page.md:44-46` | Line 43 is the "Inline code" bullet; "Code blocks" itself is lines 44-46. |
| `src/lib/guidebook-content.ts:22-30` | `src/lib/guidebook-content.ts:23-30` | Line 22 is blank; the `GuidebookFrontmatter` type starts at line 23. Note also: the type has an open index signature (`[key: string]: unknown`), so the "no `tool`/`agent` field" claim describes current usage, not a closed/rejecting type — the N/A conclusion for Data Model still holds since no such field is needed. |
| `(complement check) grep -rn "tab\|Tab" docs/specification/*.md docs/design-system/*.md → components.md:98만 매치` | Re-running this exact command returns additional matches (`components.md:38`, `docs-page.md:18/45/47`, `content-voice.md:24`, `README.md:11`) that are word-fragment false positives (substrings of "selectable", "tables", "portable", etc.), not real Tabs-primitive references. The corrected claim: no *whole-word* match for `Tab`/`Tabs` as a component/primitive name exists outside `components.md:98`'s forward-reference — verified via `grep -rnw` (word-boundary) re-run. The original conclusion (no naming collision) still holds; only the cited command/result was imprecise. |

### Re-run Self-Consistency Pass (Step 4b.5) — post-amendment

**Pass A (cross-section)**: AC3b and AC8 now map to FR-1 (keyboard) and FR-5 (docs) respectively — no orphan ACs introduced. FR-2's amended localStorage strategy is now referenced by AC2's reconciled wording — no drift. No HTTP status codes or Data Model fields involved (both still N/A) — Pass A clean.

**Pass B (claim↔reality)**: The Dependencies amendment's "confirmed absent from main" claim for `code-block.tsx` was verified via `find src/components -iname "code-block*"` (empty on `main`) during the original review. The corrected citations were verified by re-reading each cited file's actual line numbers. The complement-grep claim was re-run and corrected as shown above. No new "follows X" or closure/liveness claims were introduced by this amendment — Pass B clean.

**Pass C (schema)**: N/A — no Data Model change in this spec or amendment.

All three passes resolve to a concrete pointer; no further re-plan iteration needed for this amendment's own content.
