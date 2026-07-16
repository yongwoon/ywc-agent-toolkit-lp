# 000023-020-config-guidebook-cross-reference-sweep — Implementation Checklist

## Prerequisites
- [ ] `000022-010-ui-guidebook-auth-implement-page-registration` 완료 — 신규 페이지의 slug/제목이 확정되어 있다

## Allowed Edit Scope
- [ ] `src/content/guidebook/{en,ja,ko,zh,es}/{01-introduction,02-core-concepts,03-quickstart,05-general-cycle-medium-large,README}.md`, `src/lib/skill-links.ts`에만 수정한다
- [ ] `000023-010`이 소유한 4개 파일(`17-infrastructure-and-cloud`, `13-executor-and-codegen-patterns`, `14-skill-reference`, `15-prerequisites-installation`)은 수정하지 않는다

## Stop Conditions
- [ ] 비-en 로케일의 해당 줄 위치가 `en`과 다르면(그대로 라인 번호를 가정하지 않고) 실제 내용을 먼저 확인한 뒤 편집한다 — 확인 불가하면 멈추고 보고한다
- [ ] `000022-010`이 확정한 신규 페이지 제목/slug를 확인할 수 없으면 멈추고 보고한다

## Implementation Steps
- [ ] **`01-introduction.md` 갱신 (5개 로케일)**
  - [ ] `[17. Prerequisites and installation]` → `[18. Prerequisites and installation]`(대상 불변)
  - [ ] `[15. Executor / Code-gen Prompt patterns]` → `[16. Executor / Code-gen Prompt patterns]`(대상 불변)
- [ ] **`02-core-concepts.md` 갱신 (5개 로케일)**
  - [ ] `[15. Executor / Code-gen Prompt patterns]` → `[16. ...]`
- [ ] **`03-quickstart.md` 갱신 (5개 로케일)**
  - [ ] `[16. Full Skill Reference]` → `[17. Full Skill Reference]`
- [ ] **`05-general-cycle-medium-large.md` 갱신 (5개 로케일)**
  - [ ] `[15. Executor / Code-gen Prompt patterns]` → `[16. ...]`
- [ ] **`README.md` 갱신 (5개 로케일)**
  - [ ] Workflow Guides TOC 테이블에 신규 페이지 행 추가(`[15](./18-authentication-implementation.md)`, "14. Managing Cloud Infrastructure" 다음)
  - [ ] TOC/Quick Links 테이블에서 `[15]`→`[16]`, `[16]`→`[17]`, `[17]`→`[18]` bump 적용(대상 파일 불변)
  - [ ] 신규 Quick Links 행 1개 추가(`ywc-auth-implement` → `[15](./18-authentication-implementation.md)`)
  - [ ] closing prose 문장의 bracketed 번호 갱신
- [ ] **`src/lib/skill-links.ts` 갱신**
  - [ ] `SKILL_GUIDEBOOK_SLUG_OVERRIDES`에 `"ywc-auth-implement": "18-authentication-implementation"` 추가

## Task Verify
- [ ] `rg -n "\[1[4-8]\.\s" -g '*.md' src/content/guidebook` — pairing이 스펙 AC3 표와 일치하는지 수동 확인
- [ ] `grep -n "ywc-auth-implement" src/lib/skill-links.ts`

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠 + 순수 매핑 테이블)
- [ ] app builds without error (`npm run build`)
