# 000019-020-config-guidebook-cross-reference-sweep — Implementation Checklist

## Prerequisites
- [ ] `000018-010-ui-guidebook-infra-cloud-page-registration` 완료 — 신규 페이지의 slug/제목이 확정되어 있다

## Allowed Edit Scope
- [ ] `src/content/guidebook/{en,ja,ko,zh,es}/{01-introduction,02-core-concepts,03-quickstart,05-general-cycle-medium-large,README}.md`, `src/lib/skill-links.ts`에만 수정한다
- [ ] `000019-010`이 소유한 4개 파일(16/13/14/15)은 수정하지 않는다

## Stop Conditions
- [ ] 어떤 로케일의 해당 파일에서 인용된 en 줄 번호와 대응하는 위치를 찾을 수 없으면(구조가 크게 다르면) 멈추고 해당 로케일 파일을 직접 검토하도록 보고한다

## Implementation Steps
- [ ] **A1 교차 참조 5곳 (5개 로케일 = 20개 파일)**
  - [ ] `01-introduction.md`: "[15. Prerequisites and installation]" → "[17. Prerequisites and installation]", "[13. Executor / Code-gen Prompt patterns]" → "[15. Executor / Code-gen Prompt patterns]" (각 로케일 자체 표현으로)
  - [ ] `02-core-concepts.md`: "[13. Executor / Code-gen Prompt patterns]" → "[15. Executor / Code-gen Prompt patterns]"
  - [ ] `03-quickstart.md`: "[14. Full Skill Reference]" → "[16. Full Skill Reference]"
  - [ ] `05-general-cycle-medium-large.md`: "[13. Executor / Code-gen Prompt patterns]" → "[15. Executor / Code-gen Prompt patterns]"
  - [ ] "13. Managing Code Structure and Maintainability" 관련 참조는 그대로 둔다(변경 금지 대상)
- [ ] **`README.md` (5개 로케일)**
  - [ ] "Workflow Guides" TOC 테이블에 신규 페이지 행 추가(`[14](./17-infrastructure-and-cloud.md)`)
  - [ ] 같은 테이블/Reference 테이블의 기존 3개 shifted 행 번호 bump: `[14]`→`[15]`, `[15]`→`[16]`, `[16]`→`[17]`
  - [ ] Quick Links 테이블에서 `[15](./14-skill-reference.md)` 참조 전 행을 `[16]`으로, `[14](./13-executor-and-codegen-patterns.md)` 참조 행을 `[15]`로 bump
  - [ ] line 40 부근 prose("For situations not covered in this table, see [15. Full Skill Reference]...")를 `[16.`으로 bump
  - [ ] (선택) 신규 Quick Links 행 추가 여부 판단 — 추가한다면 `[14](./17-infrastructure-and-cloud.md)` 링크 사용
- [ ] **`skill-links.ts`**
  - [ ] `SKILL_GUIDEBOOK_SLUG_OVERRIDES`에 4개 엔트리 추가: `"ywc-iac-author": "17-infrastructure-and-cloud"`, `"ywc-infra-design": "17-infrastructure-and-cloud"`, `"ywc-infra-optimize": "17-infrastructure-and-cloud"`, `"ywc-infra-review": "17-infrastructure-and-cloud"`

## Task Verify
- [ ] `rg -n "\[1[3-6]\.\s" src/content/guidebook/**/*.md` 실행, 각 매치가 A1 pairing 표와 일치하는지 확인
- [ ] `rg -n "\]\(\./1[3-6]-(code-structure|executor-and-codegen|skill-reference|prerequisites)" src/content/guidebook/**/*.md` 실행, 위와 동일하게 pairing 확인
- [ ] `node -e "console.log(require('./src/lib/skill-links.ts'))"` 대신, `npx tsc --noEmit`로 타입 확인 후 간단한 스크립트나 유닛 확인으로 `getSkillGuidebookTarget("ywc-infra-design")`이 `17-infrastructure-and-cloud`를 포함하는지 확인
- [ ] `npx tsc --noEmit` 통과

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠 + 순수 매핑 함수)
- [ ] app builds without error (`npm run build`)
