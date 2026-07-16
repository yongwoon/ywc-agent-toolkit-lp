# 000023-010-refactor-guidebook-renumber-core-pages

## Purpose
신규 페이지(`18-authentication-implementation`, display number 15) 삽입으로 인해 밀리는 `reference` 그룹 3개 페이지(`13-executor-and-codegen-patterns`, `14-skill-reference`, `15-prerequisites-installation`)와 `17-infrastructure-and-cloud`의 footer "Next" 링크를 갱신하고, `14-skill-reference.md`의 Full Skill Index (A-Z) 테이블에 신규 skill 행을 추가하며 기존 3개 shifted 행을 bump한다.

## Scope
- **H1 + footer 리넘버링** (4개 파일 × 5개 로케일 = 20개 파일):
  - `17-infrastructure-and-cloud.md`: H1은 "14"로 **변경 없음**(그룹 마지막 페이지 지위 불변). footer의 "Next" 텍스트와 링크 대상만 새 페이지로 변경: `[Next: 15. <신규 페이지 제목>](./18-authentication-implementation.md)`
  - `13-executor-and-codegen-patterns.md`: H1 `15` → `16`. footer "Previous" 텍스트는 번호만 유지(대상 파일 불변 — 기존 스펙 결정, 새 페이지를 건너뜀), "Next" 텍스트는 `16. Full Skill Reference` → `17. Full Skill Reference`(번호만, 대상 파일 불변)
  - `14-skill-reference.md`: H1 `16` → `17`. footer "Previous" 텍스트 `15`→`16`(대상 불변), "Next" 텍스트 `17`→`18`(대상 불변)
  - `15-prerequisites-installation.md`: H1 `17` → `18`. footer(마지막 페이지, "Next" 없음) "Previous" 텍스트 `16`→`17`(대상 불변)
- **`14-skill-reference.md`의 "Full Skill Index (A-Z)" 테이블** (5개 로케일):
  - 신규 1행 추가(알파벳순, `ywc-agentic`과 `ywc-brainstorm` 사이): `ywc-auth-implement` — `[15](./18-authentication-implementation.md)` 링크(신규 페이지의 post-insertion display number)
  - 기존 `[15](./13-executor-and-codegen-patterns.md)` 3행(`ywc-code-gen`, `ywc-parallel-executor`, `ywc-sequential-executor`)을 `[16](./13-executor-and-codegen-patterns.md)`로 갱신(대상 파일 불변, 번호만)
- 각 로케일 편집 전, 해당 로케일 파일의 H1/footer 구조가 `en`과 동일한지(줄 번호까지 동일하다고 가정하지 않고) 육안으로 확인 후 편집

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-auth-implement-page.md` — `## Scope`(renumber bullet), `### FR-4`(첫 문장), `## Existing Constraints Touched`(4개 파일의 H1/footer 행 + A-Z 테이블 행), `## Acceptance Criteria`(AC3, AC5)

### Summary
스펙 FR-4는 `displayNumber`가 배열 위치에서 계산되므로, 신규 페이지 삽입 시 `reference` 그룹 3개 페이지 전체가 밀린다고 명시한다. 이 task는 그 직접 리넘버링 대상 4개 파일과 A-Z 테이블만 다루며, 나머지 간접 cross-reference는 `000023-020`이 담당한다(형제 spec `guidebook-infra-cloud-page-pr131.md`의 Iteration 1 A1/A2에서 이미 이 두 범주가 별도 task로 분리되어야 함이 확인된 패턴).

### Out of Scope (from spec)
- `01-introduction.md`, `02-core-concepts.md`, `03-quickstart.md`, `05-general-cycle-medium-large.md`, `README.md`의 인라인 cross-reference — `000023-020`의 범위
- `skill-links.ts` 갱신 — `000023-020`의 범위

## Criticality
`normal` — 정적 콘텐츠의 번호/링크 텍스트만 갱신하는 기계적 리넘버링 작업으로, 인증/결제 등 민감 표면과 무관하다. 태스크 이름에도 "auth" 키워드가 없어 heuristic이 적용되지 않는다.

## Dependencies

### Depends On
- `000022-010-ui-guidebook-auth-implement-page-registration` — 신규 페이지가 실제로 존재하고 제목이 확정되어야, `17-infrastructure-and-cloud.md`의 "Next" 링크가 정확한 제목/대상을 가리킬 수 있음

### Depended By
- `000024-010-test-verify-guidebook-auth-implement-build` — 리넘버링이 완료되어야 최종 빌드/grep 검증이 통과함

## Key Files
- `src/content/guidebook/{en,ja,ko,zh,es}/17-infrastructure-and-cloud.md` — footer "Next" 링크 갱신
- `src/content/guidebook/{en,ja,ko,zh,es}/13-executor-and-codegen-patterns.md` — H1/footer 갱신
- `src/content/guidebook/{en,ja,ko,zh,es}/14-skill-reference.md` — H1/footer 갱신 + A-Z 테이블 행 추가/bump
- `src/content/guidebook/{en,ja,ko,zh,es}/15-prerequisites-installation.md` — H1/footer 갱신

## Notes
- `13-executor-and-codegen-patterns.md`의 footer "Previous" 텍스트는 번호만 갱신하고 대상 파일은 그대로 `17-infrastructure-and-cloud.md`를 가리킨다(신규 페이지를 건너뛰는 기존 스펙 결정 — GitHub에서 직접 읽을 때의 편의를 위한 설계, `000022-010`의 신규 페이지 자체 footer와는 다른 링크 방향이다).
- A-Z 테이블에서 `ywc-auth-implement`의 정확한 알파벳 삽입 위치는 `ywc-agentic`(325번째 행 부근)과 `ywc-brainstorm` 사이 — 실제 줄 번호는 실행 시점에 재확인한다.

## Out of Scope
- `16-code-structure-and-maintainability.md`의 H1/footer — 이 페이지의 display number(13)는 이번 삽입으로 영향받지 않으므로 편집 대상이 아니다(확인만, 변경 없음)
- A-Z 테이블의 다른 기존 행(`ywc-iac-author` 등 `[14]` 그룹) — `17-infrastructure-and-cloud`는 display number 14로 유지되므로 영향 없음

## Parallel Execution Metadata

### Ownership
- `src/content/guidebook/{en,ja,ko,zh,es}/17-infrastructure-and-cloud.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/13-executor-and-codegen-patterns.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/14-skill-reference.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/15-prerequisites-installation.md`

### Shared Surfaces
- `(None identified)` — `000023-020`은 다른 파일 집합(01/02/03/05/README/skill-links.ts)을 소유하므로 파일 수준 충돌 없음

### Conflicts With
- `(None identified)` — `000023-020`과 병렬 실행 가능(둘 다 `000022-010`에만 의존, 서로 다른 파일 소유)

### Parallelizable After
- `000022-010-ui-guidebook-auth-implement-page-registration`

### Task Verify
- `rg -n "^# (14|15|16|17|18)\." src/content/guidebook/{en,ja,ko,zh,es}/{17-infrastructure-and-cloud,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md` — 기대값과 일치하는지 확인(14/16/17/18)
- `grep -n "\[15\]\|\[16\]" src/content/guidebook/en/14-skill-reference.md` — `ywc-code-gen`/`ywc-parallel-executor`/`ywc-sequential-executor` 3행이 `[16]`으로, 신규 `ywc-auth-implement` 행이 `[15]`로 표시되는지 확인
- `npx tsc --noEmit` 통과
