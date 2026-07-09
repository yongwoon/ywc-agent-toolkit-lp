# 000019-020-config-guidebook-cross-reference-sweep

## Purpose
`000019-010`이 담당하는 4개 직접-리넘버링 페이지 이외에, 저장소 전체에 흩어져 있는 stale 표시 번호 인라인 참조(4개 파일)와 각 로케일 `README.md`의 TOC/Quick Links 테이블을 갱신하고, `src/lib/skill-links.ts`에 4개 신규 skill의 라우팅 오버라이드를 추가한다. `000019-010`과 파일 세트가 완전히 disjoint하므로 `000018-010` merge 후 병렬 실행 가능하다.

## Scope
- **A1 추가 교차 참조 사이트** (4개 파일 × 5개 로케일 = 20개 파일, `en` 인용 기준 — 각 로케일의 실제 줄 위치는 직접 확인):
  - `01-introduction.md:23` — `[15. Prerequisites and installation]` → `[17. Prerequisites and installation]`(대상 불변)
  - `01-introduction.md:47` — `[13. Executor / Code-gen Prompt patterns]` → `[15. Executor / Code-gen Prompt patterns]`(대상 불변)
  - `02-core-concepts.md:57` — `[13. Executor / Code-gen Prompt patterns]` → `[15. Executor / Code-gen Prompt patterns]`(대상 불변)
  - `03-quickstart.md:90` — `[14. Full Skill Reference]` → `[16. Full Skill Reference]`(대상 불변)
  - `05-general-cycle-medium-large.md:62` — `[13. Executor / Code-gen Prompt patterns]` → `[15. Executor / Code-gen Prompt patterns]`(대상 불변)
  - **변경 불필요(확인만)**: "13. Managing Code Structure and Maintainability" / `./16-code-structure-and-maintainability.md`를 가리키는 모든 참조(`12-debugging-and-incident-postmortem.md:46`, `14-skill-reference.md:148,152,156,160,324,339,340,351`, `README.md:31,36,70`) — 이 페이지의 표시 번호(13)는 불변이므로 건드리지 않는다
- **`README.md` (5개 로케일)**:
  - "Table of contents" → "Workflow Guides" 섹션에 신규 페이지 행 추가(`[14](./17-infrastructure-and-cloud.md)`), 기존 3개 shifted 행의 대괄호 번호를 `[14]`→`[15]`, `[15]`→`[16]`, `[16]`→`[17]`로 bump(대상 `.md` 파일명은 불변)
  - "What are you trying to do?" Quick Links 테이블에서 `[15](./14-skill-reference.md)`를 참조하는 모든 행(en 기준 약 9개 행: brainstorm, security-audit, handle-pr-reviews, merge-dependabot, changelog-release-notes, commit, tech-research, ubiquitous-language 등)을 `[16]`으로 bump, `[14](./13-executor-and-codegen-patterns.md)` 1개 행(sequential/parallel executor)을 `[15]`로 bump
  - line 40 부근의 prose 문장("For situations not covered in this table, see [15. Full Skill Reference]...")도 `[16.` 로 bump(A8)
  - 새 인프라 파이프라인을 가리키는 신규 Quick Links 행 1개 추가 — 예: "Design or review cloud infrastructure before applying it" → `[14](./17-infrastructure-and-cloud.md)`
- **`src/lib/skill-links.ts`**:
  - `SKILL_GUIDEBOOK_SLUG_OVERRIDES`에 4개 엔트리 추가: `ywc-iac-author`, `ywc-infra-design`, `ywc-infra-optimize`, `ywc-infra-review` → 모두 `"17-infrastructure-and-cloud"`

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md` — `### FR-5`(README 부분), `### FR-6`, `## Iteration 1 Amendments` → **A1**(cross-reference 표 전체, superseding 원본 AC3의 해당 부분), A8(README.md:40 prose bump를 명시적 observable로 추가)

### Summary
A1은 원본 spec의 FR-4/Existing Constraints Touched가 4개 직접-리넘버링 페이지만 다루고, 저장소 전역의 인라인 크로스 레퍼런스(같은 표시 번호를 텍스트로 재인용하는 다른 페이지의 prose 링크)를 놓쳤다는 `ywc-spec-ready` Iteration 1의 Critical 발견을 수정한 amendment다. amended AC3의 관찰 기준은 "특정 페어링만 남아야 한다"는 것이지 "매치 0개"가 아니다 — `\[1[3-6]\.\s`와 `\]\(\./1[3-6]-(code-structure|executor-and-codegen|skill-reference|prerequisites)` 패턴으로 grep했을 때, `[13.`↔`16-code-structure`(불변), `[14.`↔`17-infrastructure-and-cloud`(신규), `[15.`↔`13-executor`, `[16.`↔`14-skill-reference`, `[17.`↔`15-prerequisites`의 5개 페어링만 나와야 하며, 이 중 하나라도 다른 조합이면 stale 참조가 남은 것이다. `README.md`는 A1의 grep 대상에 포함되며, `check-guidebook-nav-registration.mjs`가 diff하지 않는 자유 형식 prose이므로 자동 안전망이 없다 — 이 task의 grep 기반 Task Verify가 유일한 검증 수단이다.

### Out of Scope (from spec)
- `000019-010`이 담당하는 4개 직접-리넘버링 페이지의 H1/footer, `14-skill-reference.md`의 A-Z 테이블 — 다른 task, 다른 파일 관심사
- 마케팅 카피 skill/agent 개수(hero, Feature Grid 등) — 형제 스펙 `sync-skill-count-infra-suite-pr131.md`의 책임(이미 Phase 000014-016에서 처리 완료)
- `tasks/completed/**` 등 역사적 기록의 옛 번호 — 동결된 기록, out of scope

## Criticality
`normal` — 정적 콘텐츠/라우팅 매핑 편집, 인증/결제 등 민감 표면과 무관

## Dependencies

### Depends On
- `000018-010-ui-guidebook-infra-cloud-page-registration` — 신규 페이지의 slug(`17-infrastructure-and-cloud`)와 제목이 확정되어야 README.md의 신규 행(선택)과 `skill-links.ts`의 매핑 대상이 정확함

### Depended By
- `000020-010-test-verify-guidebook-infra-cloud-build` — 전체 grep 스윕 및 skill-links 라우팅 검증에 이 task의 산출물이 필요

## Key Files
- `src/content/guidebook/{en,ja,ko,zh,es}/01-introduction.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/02-core-concepts.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/03-quickstart.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/05-general-cycle-medium-large.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/README.md`
- `src/lib/skill-links.ts`

## Notes
- 이 task가 편집하는 5개 파일 그룹(01/02/03/05/README.md)은 `000019-010`이 편집하는 4개 파일 그룹(16/13/14/15)과 **완전히 disjoint**하다 — `14-skill-reference.md` 자체를 이 task가 건드리지 않는 것에 주의(그 파일의 H1/footer/A-Z 테이블은 전부 `000019-010` 소유).
- A1의 "변경 불필요" 목록(13. Managing Code Structure... 관련 참조)은 실수로 건드리지 않도록 주의한다 — 이 페이지 번호는 삽입으로 인해 변하지 않는다.
- `skill-links.ts`의 4개 엔트리는 알파벳 순서를 강제하지 않는 단순 객체 리터럴이지만, 기존 3개 엔트리(`ywc-agentic` 등)의 스타일과 일관되게 추가한다.
- README.md의 신규 Quick Links 행 추가는 필수로 다룬다 — 추가하지 않으면 새 가이드북 페이지 진입점이 빠진다.

## Parallel Execution Metadata

### Ownership
- `src/content/guidebook/{en,ja,ko,zh,es}/01-introduction.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/02-core-concepts.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/03-quickstart.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/05-general-cycle-medium-large.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/README.md`
- `src/lib/skill-links.ts`

### Shared Surfaces
- `(None)` — `000019-010`의 Ownership과 완전히 disjoint

### Conflicts With
- `(None identified)` — `000019-010`과 병렬 실행 가능(둘 다 `000018-010` 완료 후)

### Parallelizable After
- `000018-010-ui-guidebook-infra-cloud-page-registration`

### Task Verify
- `rg -n "\[1[3-6]\.\s" src/content/guidebook/**/*.md` 및 `rg -n "\]\(\./1[3-6]-(code-structure|executor-and-codegen|skill-reference|prerequisites)" src/content/guidebook/**/*.md` — 5개 로케일 전체에서 A1이 정의한 5개 페어링(`[13.`↔`16-code-structure`, `[14.`↔`17-infrastructure-and-cloud`, `[15.`↔`13-executor`, `[16.`↔`14-skill-reference`, `[17.`↔`15-prerequisites`)만 존재
- `getSkillGuidebookTarget("ywc-infra-design")` 등 4개 호출이 모두 `17-infrastructure-and-cloud`를 포함한 경로를 반환하는지 확인(단위 확인 또는 직접 함수 호출)
- `npx tsc --noEmit` — `skill-links.ts` 편집이 타입 에러 없음

## Out of Scope
- `000019-010`의 4개 파일(16/13/14/15) — 다른 task 소유
- 마케팅 카피 skill/agent 개수 — 형제 스펙 책임
