# 000022-010-ui-guidebook-auth-implement-page-registration

## Purpose
`workflow-guides` 그룹 끝에 `ywc-auth-implement` skill을 다루는 신규 Guidebook 페이지(`18-authentication-implementation`)를 5개 로케일 전체에 등록·작성한다. 이 task가 완료되어야 이후 renumbering cascade(`000023-010`)와 cross-reference sweep(`000023-020`)이 정확한 신규 페이지 slug/제목을 참조할 수 있다.

## Scope
- `src/components/guidebook/guidebook-nav.ts` — `workflow-guides` 그룹의 `pages` 배열에 `17-infrastructure-and-cloud` 엔트리 바로 다음 위치로 새 `GuidebookPageMeta` 엔트리 추가: `slug: "18-authentication-implementation"`, `title`(예: "Implementing Authentication" 또는 동등 문구, 최종 문구는 실행자 재량), `description`(preflight → 9-category 정책 인터뷰 → 추천 → 3개 named agent dispatch → security/E2E gate 플로우를 요약), `groupId: "workflow-guides"`, `status: "pending"`
- `scripts/guidebook-slugs.mjs` — 같은 slug를 배열의 **동일한 상대 위치**(`"17-infrastructure-and-cloud"` 다음, `"13-executor-and-codegen-patterns"` 이전)에 추가
- `src/content/guidebook/{en,ja,ko,zh,es}/18-authentication-implementation.md` — 5개 로케일 모두 신규 생성, `10-e2e-test-strategy.md`/`11-design-review.md` 규모(약 500-700 단어)를 따름:
  1. `[Back to table of contents](./README.md)` 헤더 링크
  2. `# 15. <제목>` H1 (신규 페이지의 계산된 display number는 15 — 뒤 task의 리넘버링 캐스케이드 전제)
  3. "When to use this Skill" 섹션 — `000021-010` 노트의 SKILL.md "Do not use for" 경계(`ywc-security-audit`/`ywc-plan`/`ywc-e2e-test-strategy`와의 구분) 사용
  4. 플로우 walkthrough — preflight gate → 9-category 정책 인터뷰(라벨 나열, 스크립트 전체 재현 아님) → dynamic recommendation → `ywc-backend-coder`/`ywc-frontend-coder`/`ywc-doc-writer` dispatch(TDD discipline) → `ywc-security-audit` + policy-conditional `ywc-e2e-test-strategy` gate → non-blocking `ywc-create-pr` 제안
  5. `` ## `ywc-auth-implement` `` 섹션 1개 — `<ToolTabs>`/`<ToolTabsPanel tool="claude-code">`/`<ToolTabsPanel tool="codex">` 예제, `000021-010`에서 재확인한 실제 커맨드 문법 사용
  6. "How Claude Code and Codex differ" 짧은 노트 — `000021-010` 노트의 tool-difference 요약 사용
  7. footer: `[Previous: 14. Managing Cloud Infrastructure](./17-infrastructure-and-cloud.md) - [Next: 16. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)` (post-insertion display number 기준)
  - 각 로케일은 기계적 복사가 아닌 자연스러운 번역 prose로 작성

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-auth-implement-page.md` — `## Scope`(1-2번째 bullet), `### FR-2`, `### FR-3`, `## Existing Constraints Touched`(`guidebook-nav.ts`, `guidebook-slugs.mjs`, `17-infrastructure-and-cloud.md:3`/footer 행), `## Acceptance Criteria`(AC1, AC2)

### Summary
스펙 FR-2/FR-3은 신규 페이지를 `guidebook-nav.ts` + `guidebook-slugs.mjs` + 5개 로케일 콘텐츠 파일에 원자적으로(atomic, 같은 커밋/task 내에서) 등록하도록 요구한다. `scripts/generate-search-index.mjs`가 `prebuild`에서 `test/check-guidebook-nav-registration.mjs`보다 먼저 실행되며, 등록된 slug에 대응하는 로케일 콘텐츠가 하나라도 없으면 `npm run build`가 그 단계에서 hard-throw한다(형제 spec의 Iteration 1 A3에서 이미 확인된 패턴).

### Out of Scope (from spec)
- 기존 페이지(`17-infrastructure-and-cloud.md` 등)의 리넘버링 편집 — `000023-010`의 범위(단, `17-infrastructure-and-cloud.md`의 footer "Next" 링크 텍스트/대상 갱신 자체는 이 task가 아니라 `000023-010`이 담당)
- `14-skill-reference.md`의 A-Z 인덱스 행 추가 — `000023-010`의 범위
- `README.md`/`skill-links.ts` 갱신 — `000023-020`의 범위

## Criticality
`critical` — task 이름과 신규 파일 경로(`18-authentication-implementation.md`)에 "auth" 키워드가 포함되어 keyword heuristic이 적용됨(spec에 별도 Critical Surfaces 선언 없음). 실제 작업은 `ywc-auth-implement` skill의 *사용법을 설명하는 정적 문서*를 작성하는 것으로, 애플리케이션 인증 로직·비밀값·토큰을 다루지 않는다. 실행자가 이를 오탐(false positive)으로 판단해 `normal`로 하향할 수 있다.

## Dependencies

### Depends On
- `000021-010-config-verify-upstream-auth-content` — PR 상태 재확인 결과와 `ywc-auth-implement`의 실제 커맨드 문법·플로우 요약(ToolTabs 예제 및 tool-difference 노트 소싱 근거) 제공

### Depended By
- `000023-010-refactor-guidebook-renumber-core-pages` — 신규 페이지가 실제로 존재하고 제목이 확정되어야, `17-infrastructure-and-cloud.md`의 "Next" 링크가 정확한 제목/대상을 가리킬 수 있음
- `000023-020-config-guidebook-cross-reference-sweep` — 신규 페이지의 slug(`18-authentication-implementation`)와 제목이 확정되어야 README.md의 신규 행과 `skill-links.ts`의 매핑 대상이 정확함

## Key Files
- `src/components/guidebook/guidebook-nav.ts` — 신규 엔트리 추가
- `scripts/guidebook-slugs.mjs` — 신규 slug 추가
- `src/content/guidebook/{en,ja,ko,zh,es}/18-authentication-implementation.md` — 신규 생성

## Notes
- H1의 "15"는 이 task 시점에는 아직 리넘버링 캐스케이드가 적용되지 않은 상태에서 미리 계산된 최종값이다 — `000023-010`/`000023-020`이 다른 파일들을 이 값에 맞춰 조정하므로, 이 task는 처음부터 최종 display number로 작성한다.
- 신규 alphabetical 행(`ywc-auth-implement`)은 `ywc-agentic`과 `ywc-brainstorm` 사이에 위치한다(`docs/ywc-plans/guidebook-auth-implement-page.md`의 Open Questions에서 확인) — 단, 그 행 자체를 추가하는 것은 `000023-010`의 범위다.

## Out of Scope
- `ywc-backend-coder`/`ywc-frontend-coder`/`ywc-doc-writer` 개별 agent에 대한 전용 섹션 — prose 내 "dispatch 대상" 언급으로만 한정(Guidebook은 개별 agent를 1급 페이지로 문서화하지 않는 기존 관례를 따름)
- Codex SKILL.md의 내부 스텝 번호(Step 1 Read-only Preflight 등) 축자적 이식 — tool-difference 노트는 dispatch 메커니즘 차이 수준에 머무른다

## Parallel Execution Metadata

### Ownership
- `src/components/guidebook/guidebook-nav.ts` (해당 배열의 신규 엔트리 추가 부분만 — 기존 엔트리 수정 없음)
- `scripts/guidebook-slugs.mjs`
- `src/content/guidebook/{en,ja,ko,zh,es}/18-authentication-implementation.md`

### Shared Surfaces
- `(None identified)`

### Conflicts With
- `000023-010-refactor-guidebook-renumber-core-pages`, `000023-020-config-guidebook-cross-reference-sweep` — 둘 다 이 task의 산출물(신규 페이지 제목/slug)을 참조하므로 이 task 완료 전에는 시작하지 않는다

### Parallelizable After
- `000021-010-config-verify-upstream-auth-content`

### Task Verify
- `node test/check-guidebook-nav-registration.mjs` 통과
- `rg -c "<ToolTabs>" src/content/guidebook/{en,ja,ko,zh,es}/18-authentication-implementation.md` — 5개 파일 모두 1개씩 카운트
- `npx tsc --noEmit` 통과
- `npm run build` 실행(prebuild의 `generate-search-index.mjs`가 5개 로케일 콘텐츠를 정상적으로 찾는지 확인)
