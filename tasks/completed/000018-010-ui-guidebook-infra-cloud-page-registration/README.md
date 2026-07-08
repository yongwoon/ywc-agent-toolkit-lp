# 000018-010-ui-guidebook-infra-cloud-page-registration

## Purpose
`workflow-guides` 그룹 끝(현재 마지막 페이지 `16-code-structure-and-maintainability` 바로 다음)에 신규 Guidebook 페이지(slug `17-infrastructure-and-cloud`)를 추가한다. `guidebook-nav.ts`의 nav entry, `guidebook-slugs.mjs`의 slug entry, 5개 로케일의 실제 콘텐츠 파일을 **같은 task 안에서 원자적으로** 등록하여, `test/check-guidebook-nav-registration.mjs`(slug set 비교)와 `scripts/generate-search-index.mjs`(로케일 누락 시 hard-throw)가 어느 시점에도 드리프트를 감지하지 않도록 한다.

## Scope
- `src/components/guidebook/guidebook-nav.ts` — `workflow-guides` 그룹의 `pages` 배열에 `16-code-structure-and-maintainability` 엔트리 바로 다음 위치로 새 `GuidebookPageMeta` 엔트리 추가: `slug: "17-infrastructure-and-cloud"`, `title`(예: "Managing Cloud Infrastructure" 또는 동등 문구, 최종 문구는 실행자 재량), `description`(4-skill 파이프라인과 `ywc-cloud-engineer` agent를 요약), `groupId: "workflow-guides"`, `status: "pending"`
- `scripts/guidebook-slugs.mjs` — 같은 slug를 배열의 **동일한 상대 위치**(`16-code-structure-and-maintainability` 다음, `13-executor-and-codegen-patterns` 이전)에 추가. 헤더 주석이 엔트리 개수나 크기 관련 문구를 갖고 있다면 일반화된 표현으로 갱신(예: 특정 개수를 명시하지 않고 "kept in the same order as guidebookNavGroups" 형태 유지)
- `src/content/guidebook/{en,ja,ko,zh,es}/17-infrastructure-and-cloud.md` — 5개 로케일 모두 신규 생성, `16-code-structure-and-maintainability.md`의 구조를 그대로 따름:
  1. `[Back to table of contents](./README.md)` 헤더 링크
  2. `# 14. <제목>` H1 (신규 페이지의 계산된 display number는 14 — 뒤 task의 리넘버링 캐스케이드 전제)
  3. "When to use these Skills" 결정 테이블(4행: design/author/review/optimize, 각각 질문 + skill명)
  4. skill당 1개 섹션(`## \`ywc-<skill>\``, 짧은 설명 + `<ToolTabs>`/`<ToolTabsPanel tool="claude-code">`/`<ToolTabsPanel tool="codex">` 예제, `000017-010`에서 재확인한 실제 커맨드 문법 사용)
  5. "How the Skills work together" 파이프라인 walkthrough(design → author → review → optimize), `ywc-infra-review`/`ywc-infra-optimize`가 `ywc-cloud-engineer`와 lens 확장된 `ywc-security-engineer`/`ywc-performance-engineer`에 위임할 수 있음을 prose로만 언급(전용 섹션 아님)
  6. footer: `[Previous: 13. Managing Code Structure and Maintainability](./16-code-structure-and-maintainability.md) - [Next: 15. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)` (post-insertion display number 기준)
  - 각 로케일은 기계적 복사가 아닌 자연스러운 번역 prose로 작성

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md` — `## Purpose`, `## Scope`(첫 3개 bullet), `### FR-2`, `### FR-3`, `## Iteration 1 Amendments` → A3(5-locale 원자적 편집 단위)
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md` — AC1(원본, 형제 amendment A4로 관찰 범위가 slug set 일치로 좁혀짐), AC2, `## Non-Functional Requirements`(anchor collision, A6)

### Summary
`test/check-guidebook-nav-registration.mjs`는 slug **집합**(순서/위치 아님, A4 확인됨)만 3-way 비교하지만, `scripts/generate-search-index.mjs`(prebuild에서 이 스크립트가 먼저 실행됨)는 `guidebook-slugs.mjs`에 등록된 slug에 대응하는 로케일 콘텐츠 파일이 없으면 즉시 hard-throw한다(A3). 따라서 "원자적 3-way 편집"의 실제 단위는 `guidebook-nav.ts` + `guidebook-slugs.mjs` + **5개 로케일 콘텐츠 파일 전부**이며, 부분 로케일만 커밋하면 registration 체크가 실행되기도 전에 `npm run build`가 실패한다. 새 페이지의 H1은 "14"로 고정 작성한다 — 이는 삽입 후 배열 위치가 `workflow-guides` 그룹의 8번째(전체 15번째... 실제로는 global index 14번째, `16-code-structure-and-maintainability`가 13이고 그 다음이므로) 페이지가 되기 때문이다. 이 H1 값과 기존 4개 페이지의 리넘버링은 `000019-010`이 별도로 처리하지만, 이 task는 새 페이지 자신의 H1(14)과 footer의 Previous/Next 텍스트(post-insertion 기준)를 처음부터 올바른 값으로 작성해야 `000019-010`이 이를 다시 손댈 필요가 없다.

### Out of Scope (from spec)
- 기존 4개 페이지(`16-code-structure-and-maintainability.md` 등)의 H1/footer 리넘버링 — `000019-010`의 책임(단, `16-code-structure-and-maintainability.md`의 "Next" 링크를 새 페이지로 되돌아 가리키게 하는 것은 `000019-010`이 담당)
- `14-skill-reference.md`의 Full Skill Index (A-Z) 테이블에 4개 신규 skill 행 추가 — `000019-010`의 책임(같은 파일이지만 다른 관심사이므로 분리)
- `src/lib/skill-links.ts`, `README.md` TOC/Quick Links 갱신 — `000019-020`의 책임
- PR #131 자체를 merge하는 행위

## Criticality
`normal` — 정적 콘텐츠 추가, 인증/결제 등 민감 표면과 무관

## Dependencies

### Depends On
- `000017-010-config-verify-upstream-infra-page-content` — PR 상태 재확인 결과와 4개 skill의 실제 커맨드 문법(ToolTabs 예제 소싱 근거) 제공

### Depended By
- `000019-010-refactor-guidebook-renumber-core-pages` — 새 페이지가 실제로 존재하고 제목이 확정되어야, 기존 4개 페이지의 footer가 새 페이지를 정확한 제목으로 가리킬 수 있음
- `000019-020-config-guidebook-cross-reference-sweep` — 새 페이지의 slug/제목이 확정되어야 README.md Quick Links의 신규 행(선택)과 skill-links.ts 매핑이 올바른 대상을 가리킬 수 있음
- `000020-010-test-verify-guidebook-infra-cloud-build` — (간접) 전체 빌드/registration 체크가 이 task의 산출물에 의존

## Key Files
- `src/components/guidebook/guidebook-nav.ts`
- `scripts/guidebook-slugs.mjs`
- `src/content/guidebook/en/17-infrastructure-and-cloud.md` (신규)
- `src/content/guidebook/ja/17-infrastructure-and-cloud.md` (신규)
- `src/content/guidebook/ko/17-infrastructure-and-cloud.md` (신규)
- `src/content/guidebook/zh/17-infrastructure-and-cloud.md` (신규)
- `src/content/guidebook/es/17-infrastructure-and-cloud.md` (신규)

## Notes
- 신규 페이지의 정확한 title/description 문구는 스펙 Open Questions에서 실행자 재량으로 남겨져 있다("Managing Cloud Infrastructure" vs. 대안) — `16-code-structure-and-maintainability`("Managing Code Structure and Maintainability")와 대구를 이루는 문구를 권장하되, 최종 결정은 이 task 실행자가 내린다.
- `<ToolTabs>` 예제의 커맨드 문법은 반드시 `000017-010`의 검증 노트(`docs/ywc-plans/guidebook-infra-cloud-page-pr131.verification.md`)에서 가져온다 — 추측하지 않는다.
- 신규 페이지의 heading 목록은 `github-slugger`로 자동 슬러그화되므로, 같은 파일 내에서 두 heading이 동일한 텍스트(따라서 동일한 anchor)를 갖지 않도록 작성 중 확인한다(NFR, A6) — 예: 4개 skill 섹션 헤딩(`## \`ywc-infra-design\`` 등)은 서로 다른 텍스트이므로 자연히 충돌하지 않지만, "How the Skills work together"류 헤딩을 다른 위치에서 반복하지 않는다.
- `scripts/sync-guidebook-content.mjs`를 이 task의 `ko` 편집 직후에 수동 실행하면 `ko/17-infrastructure-and-cloud.md`가 외부 저장소 기준으로 덮어써질 위험이 있다 — 이 task 완료 후 해당 스크립트를 실행하지 않는다(Existing Constraints Touched 위험 노트와 동일).
- 새 페이지의 footer "Next" 대상은 `13-executor-and-codegen-patterns.md`(파일명 불변, 표시 번호만 "15"로 갱신되는 것은 `000019-010`이 처리) — 이 task는 새 페이지 자신의 footer 텍스트만 정확히 작성하면 되고, `13-executor-and-codegen-patterns.md` 파일 자체를 건드리지 않는다.

## Parallel Execution Metadata

### Ownership
- `src/components/guidebook/guidebook-nav.ts` (해당 배열의 신규 엔트리 추가 부분만 — 기존 엔트리 수정 없음)
- `scripts/guidebook-slugs.mjs`
- `src/content/guidebook/{en,ja,ko,zh,es}/17-infrastructure-and-cloud.md`

### Shared Surfaces
- `Shared array: guidebookNavGroups`(`000019-010`이 같은 파일을 읽어 리넘버링 대상 페이지를 참조하지만, 그 task는 이 배열 자체를 수정하지 않고 markdown 파일만 수정하므로 파일 충돌 없음)
- `Shared array: guidebookSlugs`(동일 이유로 읽기 전용 참조만 발생)

### Conflicts With
- `(None identified)` — `000017-010`과는 순차 의존, 이후 task들과는 파일이 겹치지 않음

### Parallelizable After
- `000017-010-config-verify-upstream-infra-page-content`

### Task Verify
- `node test/check-guidebook-nav-registration.mjs` — 3개 소스(guidebookNavGroups, guidebook-slugs.mjs, `src/content/guidebook/en/` 디렉터리) 간 slug 불일치 없음
- 5개 로케일 파일 모두 존재, 각각 4개의 `<ToolTabs>` 블록과 "How the Skills work together"(또는 로케일별 자연스러운 대응 표현) 헤딩 보유 확인
- `npx tsc --noEmit` — `guidebook-nav.ts`의 신규 엔트리가 `GuidebookPageMeta` 타입과 일치

## Out of Scope
- 기존 4개 페이지의 H1/footer 리넘버링, `14-skill-reference.md`의 A-Z 테이블 편집 — `000019-010`
- README.md TOC/Quick Links, `skill-links.ts` — `000019-020`
- `src/data/guidebook-search.*.json` 수동 편집 — `npm run build`가 자동 재생성
