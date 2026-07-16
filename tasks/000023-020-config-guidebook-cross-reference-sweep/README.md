# 000023-020-config-guidebook-cross-reference-sweep

## Purpose
`13-executor-and-codegen-patterns`/`14-skill-reference`/`15-prerequisites-installation`을 가리키는, 직접 리넘버링 대상이 아닌 나머지 인라인 cross-reference(01/02/03/05 페이지 + 각 로케일 `README.md`)를 갱신하고, `README.md`에 신규 페이지 행/Quick Links 행을 추가하며, `skill-links.ts`에 `ywc-auth-implement` 매핑을 등록한다.

## Scope
- **A1급 추가 교차 참조 사이트** (4개 파일 × 5개 로케일 = 20개 파일, `en` 인용 기준 — 각 로케일의 실제 줄 위치는 직접 확인):
  - `01-introduction.md:23` — `[17. Prerequisites and installation]` → `18`
  - `01-introduction.md:47` — `[15. Executor / Code-gen Prompt patterns]` → `16`
  - `02-core-concepts.md:57` — `[15. Executor / Code-gen Prompt patterns]` → `16`
  - `03-quickstart.md:90` — `[16. Full Skill Reference]` → `17`
  - `05-general-cycle-medium-large.md:62` — `[15. Executor / Code-gen Prompt patterns]` → `16`
  - **변경 불필요(확인만)**: "14. Managing Cloud Infrastructure" / `./17-infrastructure-and-cloud.md`를 가리키는 모든 참조 — 이 페이지의 표시 번호(14)는 이번 삽입으로 불변이므로 건드리지 않는다
- **`README.md` (5개 로케일)**:
  - "Table of contents" → "Workflow Guides" 섹션에 신규 페이지 행 추가(`[15](./18-authentication-implementation.md)`, "14. Managing Cloud Infrastructure" 행 바로 다음), 기존 3개 shifted 행의 대괄호 번호를 `[15]`→`[16]`, `[16]`→`[17]`, `[17]`→`[18]`로 bump(대상 `.md` 파일명은 불변)
  - "What are you trying to do?" Quick Links 테이블에서 `[16](./14-skill-reference.md)`를 참조하는 모든 행을 `[17]`로 bump, `[15](./13-executor-and-codegen-patterns.md)` 참조 행을 `[16]`으로 bump, 신규 `ywc-auth-implement` 행 1개 추가(예: "Implement an authentication feature (login, OAuth, MFA)" → `[15](./18-authentication-implementation.md)`)
  - line 40 부근의 prose 문장("For situations not covered in this table, see [16. Full Skill Reference]...")도 `[17.`로 갱신
- **`src/lib/skill-links.ts`**:
  - `SKILL_GUIDEBOOK_SLUG_OVERRIDES`에 1개 엔트리 추가: `ywc-auth-implement` → `"18-authentication-implementation"`

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-auth-implement-page.md` — `### FR-4`(두 번째 문장), `### FR-5`, `### FR-6`, `## Existing Constraints Touched`(`01-introduction.md`/`02-core-concepts.md`/`03-quickstart.md`/`05-general-cycle-medium-large.md`/`README.md`/`skill-links.ts` 행), `## Acceptance Criteria`(AC4, AC6)

### Summary
스펙은 형제 spec(infra 페이지)의 Iteration 1 A1에서 발견된 패턴 — 직접 리넘버링 대상 4개 파일 외에도 다른 페이지들이 그 번호를 인라인으로 인용한다는 사실 — 을 사전에 반영해, 이 task의 대상 목록을 이미 repo-wide grep으로 확정해 두었다. `skill-links.ts`는 신규 skill 언급을 신규 페이지로 직접 링크시키는 override map이다.

### Out of Scope (from spec)
- `17-infrastructure-and-cloud.md`/`13-executor-and-codegen-patterns.md`/`14-skill-reference.md`/`15-prerequisites-installation.md`의 H1/footer 자체 — `000023-010`의 범위
- `16-code-structure-and-maintainability.md` 관련 참조 — 이 페이지의 번호(13)는 불변이므로 어디서도 편집 대상이 아님(확인만)

## Criticality
`normal` — 정적 콘텐츠의 링크 번호/매핑 테이블 갱신 작업으로, 인증/결제 등 민감 표면과 무관하다. 태스크 이름에도 "auth" 키워드가 없어 heuristic이 적용되지 않는다(`skill-links.ts`에 문자열 `"ywc-auth-implement"`가 값으로 들어가지만 이는 스킬 이름 문자열 매핑일 뿐, 인증 로직이 아니다).

## Dependencies

### Depends On
- `000022-010-ui-guidebook-auth-implement-page-registration` — 신규 페이지의 slug(`18-authentication-implementation`)와 제목이 확정되어야 README.md의 신규 행과 `skill-links.ts`의 매핑 대상이 정확함

### Depended By
- `000024-010-test-verify-guidebook-auth-implement-build` — cross-reference sweep이 완료되어야 최종 빌드/grep 검증이 통과함

## Key Files
- `src/content/guidebook/{en,ja,ko,zh,es}/01-introduction.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/02-core-concepts.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/03-quickstart.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/05-general-cycle-medium-large.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/README.md`
- `src/lib/skill-links.ts`

## Notes
- 이 task는 `000023-010`과 동시에(병렬로) 실행 가능 — 서로 다른 파일 집합을 소유하며, 둘 다 `000022-010`의 산출물(신규 페이지 slug/제목)만 참조한다.
- README.md의 신규 Quick Links 행 문구는 실행자 재량(스펙 Open Questions에서 확정하지 않음 — AC4 충족에는 불필요).

## Out of Scope
- `12-debugging-and-incident-postmortem.md`, `14-skill-reference.md` 내부의 "13. Managing Code Structure..." 참조, `README.md`의 `[13]`/`[14]` 참조 — 모두 불변 번호이므로 편집하지 않는다(확인만)

## Parallel Execution Metadata

### Ownership
- `src/content/guidebook/{en,ja,ko,zh,es}/01-introduction.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/02-core-concepts.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/03-quickstart.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/05-general-cycle-medium-large.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/README.md`
- `src/lib/skill-links.ts`

### Shared Surfaces
- `(None identified)`

### Conflicts With
- `(None identified)` — `000023-010`과 병렬 실행 가능(서로 다른 파일 소유)

### Parallelizable After
- `000022-010-ui-guidebook-auth-implement-page-registration`

### Task Verify
- `rg -n "\[1[4-8]\.\s" -g '*.md' src/content/guidebook` — pairing이 스펙 AC3 표와 일치하는지 수동 확인
- `grep -n "ywc-auth-implement" src/lib/skill-links.ts` — 엔트리 존재 확인
- `npx tsc --noEmit` 통과
