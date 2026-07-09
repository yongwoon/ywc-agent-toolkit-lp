# 000019-010-refactor-guidebook-renumber-core-pages

## Purpose
신규 페이지 삽입으로 발생하는 표시 번호 캐스케이드(14→15, 15→16, 16→17)를, 직접 영향을 받는 4개 기존 페이지(`16-code-structure-and-maintainability.md`, `13-executor-and-codegen-patterns.md`, `14-skill-reference.md`, `15-prerequisites-installation.md`)의 H1과 markdown 임베디드 footer(Previous/Next)에 5개 로케일 전부 적용한다. 같은 편집 세션에서 `14-skill-reference.md`의 "Full Skill Index (A-Z)" 테이블에 4개 신규 skill 행을 추가하고, 기존에 `[14]`로 표시되던 3개 행(`ywc-code-gen`, `ywc-parallel-executor`, `ywc-sequential-executor`)을 `[15]`로 함께 갱신한다(같은 파일, 같은 편집 패스 — 번호 충돌을 만들지 않기 위해 분리하지 않음).

## Scope
- **H1 + footer 리넘버링** (4개 파일 × 5개 로케일 = 20개 파일):
  - `16-code-structure-and-maintainability.md`: H1은 "13"으로 **변경 없음**(그룹 마지막 페이지 지위 불변). footer의 "Next" 텍스트와 링크 대상만 새 페이지로 변경: `[Next: 14. <신규 페이지 제목>](./17-infrastructure-and-cloud.md)`
  - `13-executor-and-codegen-patterns.md`: H1 `14` → `15`. footer "Previous" 텍스트는 번호만 유지(`13`, 대상 파일 불변 — GitHub 읽기 편의를 위한 기존 스펙 결정, 새 페이지를 건너뜀), "Next" 텍스트는 `15. Full Skill Reference` → `16. Full Skill Reference`(번호만, 대상 파일 불변)
  - `14-skill-reference.md`: H1 `15` → `16`. footer "Previous" 텍스트 `14`→`15`(대상 불변), "Next" 텍스트 `16`→`17`(대상 불변)
  - `15-prerequisites-installation.md`: H1 `16` → `17`. footer(마지막 페이지, "Next" 없음) "Previous" 텍스트 `15`→`16`(대상 불변)
- **`14-skill-reference.md`의 "Full Skill Index (A-Z)" 테이블** (5개 로케일):
  - 신규 4행 추가(알파벳순): `ywc-iac-author`, `ywc-infra-design`, `ywc-infra-optimize`, `ywc-infra-review` — 각각 `[14](./17-infrastructure-and-cloud.md)` 링크(신규 페이지의 post-insertion display number)
  - 기존 `[14](./13-executor-and-codegen-patterns.md)` 3행(`ywc-code-gen`, `ywc-parallel-executor`, `ywc-sequential-executor`)을 `[15](./13-executor-and-codegen-patterns.md)`로 갱신(대상 파일 불변, 번호만)
- 각 로케일 편집 전, 해당 로케일 파일의 H1/footer 구조가 `en`과 동일한지(줄 번호까지 동일하다고 가정하지 않고) 육안으로 확인 후 편집

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md` — `## Existing Constraints Touched`(4개 페이지 행 전부), `### FR-4`(원본), `## Iteration 1 Amendments` → **A2**(FR-5/Existing Constraints의 `14-skill-reference.md` 행을 superseding — 기존 `[14]` 3행도 `[15]`로 bump), A5(로케일 파리티 검증 절차), A7(`guidebook-slugs.mjs` 헤더 주석은 `000018-010`이 이미 처리)
- 원본 `AC3`, `AC5`는 A1/A2로 각각 superseded — 이 task는 amended AC3(직접 리넘버링 4개 페이지 부분)와 amended AC5(A-Z 테이블 번호 충돌 없음)를 대상으로 한다. A1의 "추가 교차 참조 파일" 부분은 `000019-020`이 담당(다른 파일 세트)

### Summary
`displayNumber`는 이 저장소의 이전 리팩터링(Phase 000011-013, `guidebook-page-numbering-refactor.md`)을 거쳐 `guidebookNavGroups`의 배열 위치에서 **런타임에 자동 계산**되지만, 이 계산은 라이브 사이트의 4개 렌더 사이트(sidebar/prev-next-nav/page H1/scale-selector)에만 적용된다. `src/content/guidebook/**/*.md` 파일 자체의 H1 텍스트와 markdown 임베디드 footer는 GitHub에서 직접 읽는 사람을 위한 것으로, 여전히 수동으로 동기화해야 하는 리터럴 텍스트다(`guidebook-nav.ts` 파일 자체의 comment block, line 80-96 부근이 이를 명시). 이 task는 그 수동 동기화 대상 중 "직접 리넘버링되는" 4개 페이지 + 그 중 하나(`14-skill-reference.md`)의 A-Z 테이블을 담당한다. amended AC5(A2)의 관찰 기준: "A-Z 테이블 내 동일한 대괄호 번호를 가진 두 행이 있다면 반드시 같은 링크 대상을 가리켜야 한다" — 즉 신규 4행(`[14]`→새 페이지)과 기존 3행(반드시 `[15]`로 bump되어야 `[14]`가 두 개의 서로 다른 대상을 가리키는 상태가 사라짐)이 이 기준을 충족해야 한다.

### Out of Scope (from spec)
- A1이 추가한 4개 교차 참조 파일(`01-introduction.md`, `02-core-concepts.md`, `03-quickstart.md`, `05-general-cycle-medium-large.md`) — `000019-020`의 책임(다른 파일 세트, 병렬 실행 가능)
- README.md TOC/Quick Links 갱신 — `000019-020`의 책임
- `skill-links.ts` 갱신 — `000019-020`의 책임
- 신규 페이지 자신의 콘텐츠 — `000018-010`이 이미 올바른 H1(`14`)과 footer로 작성 완료(이 task가 다시 손대지 않음)

## Criticality
`normal` — 정적 콘텐츠 편집, 인증/결제 등 민감 표면과 무관

## Dependencies

### Depends On
- `000018-010-ui-guidebook-infra-cloud-page-registration` — 신규 페이지가 실제로 존재하고 제목이 확정되어야, `16-code-structure-and-maintainability.md`의 "Next" 링크가 정확한 제목/대상을 가리킬 수 있음

### Depended By
- `000020-010-test-verify-guidebook-infra-cloud-build` — 전체 리넘버링 캐스케이드 검증에 이 task의 산출물이 필요

## Key Files
- `src/content/guidebook/{en,ja,ko,zh,es}/16-code-structure-and-maintainability.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/13-executor-and-codegen-patterns.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/14-skill-reference.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/15-prerequisites-installation.md`

## Notes
- **번호와 파일명(slug)을 혼동하지 않는다.** 이 리넘버링은 표시 번호(H1 텍스트, footer 텍스트)만 바꾸는 것이지, 파일명이나 링크 `href` 대상은(신규 페이지로 향하는 `16-code-structure-and-maintainability.md`의 "Next" 링크 1곳을 제외하고) 전혀 바뀌지 않는다.
- `13-executor-and-codegen-patterns.md`의 footer "Previous" 링크는 의도적으로 신규 페이지를 건너뛰고 여전히 `16-code-structure-and-maintainability.md`(텍스트는 "13", 변경 없음)를 가리킨다 — 이는 원본 스펙이 GitHub 읽기 편의를 위해 명시적으로 결정한 사항이며 결함이 아니다(spec-ready 로그의 Suggestion 항목으로 이미 확인됨).
- ja/ko/zh/es 각 파일은 `en`과 동일한 줄 번호를 갖는다고 가정하지 않는다 — 편집 전 해당 로케일 파일을 직접 열어 H1과 footer 위치를 확인한다(A5).
- A-Z 테이블 편집 시, 신규 4행의 알파벳 정렬 위치를 정확히 지킨다: `ywc-iac-author`는 `ywc-handle-pr-reviews`와 `ywc-impl-review` 사이, `ywc-infra-design`/`ywc-infra-optimize`/`ywc-infra-review`는 `ywc-incident-postmortem`과 `ywc-merge-dependabot` 사이(알파벳순으로 `infra-design` < `infra-optimize` < `infra-review`).

## Parallel Execution Metadata

### Ownership
- `src/content/guidebook/{en,ja,ko,zh,es}/16-code-structure-and-maintainability.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/13-executor-and-codegen-patterns.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/14-skill-reference.md`
- `src/content/guidebook/{en,ja,ko,zh,es}/15-prerequisites-installation.md`

### Shared Surfaces
- `(None)` — `000019-020`이 소유한 파일 세트(01/02/03/05, README.md, skill-links.ts)와 완전히 disjoint

### Conflicts With
- `(None identified)` — `000019-020`과 파일이 겹치지 않으므로 `000018-010` merge 후 서로 병렬 실행 가능

### Parallelizable After
- `000018-010-ui-guidebook-infra-cloud-page-registration`

### Task Verify
- `rg -n "^# (13|14|15|16|17)\." src/content/guidebook/{en,ja,ko,zh,es}/{16-code-structure-and-maintainability,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md` — 각 파일의 H1이 기대값(13/15/16/17, 코드-구조 페이지는 13 불변)과 일치
- `rg -n "\[1[3-7]\." src/content/guidebook/{en,ja,ko,zh,es}/{16-code-structure-and-maintainability,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md` — footer의 Previous/Next 숫자가 기대 pairing과 일치(A1 amended AC3의 pairing 표 참고: `[13.`↔`16-code-structure`, `[14.`↔`17-infrastructure-and-cloud`, `[15.`↔`13-executor`, `[16.`↔`14-skill-reference`, `[17.`↔`15-prerequisites`)
- `14-skill-reference.md` 5개 로케일 모두에서 `[14](./17-infrastructure-and-cloud.md)` 4행과 `[15](./13-executor-and-codegen-patterns.md)` 3행이 존재하고, 동일 대괄호 번호를 가진 서로 다른 대상이 없는지 확인

## Out of Scope
- `01-introduction.md`, `02-core-concepts.md`, `03-quickstart.md`, `05-general-cycle-medium-large.md`의 교차 참조 편집 — `000019-020`
- README.md, `skill-links.ts` — `000019-020`
