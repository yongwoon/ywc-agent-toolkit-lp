# 000023-010-refactor-guidebook-renumber-core-pages — Implementation Checklist

## Prerequisites
- [ ] `000022-010-ui-guidebook-auth-implement-page-registration` 완료 — 신규 페이지가 존재하고 제목이 확정되어 있다

## Allowed Edit Scope
- [ ] `src/content/guidebook/{en,ja,ko,zh,es}/{17-infrastructure-and-cloud,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md`에만 수정한다
- [ ] `16-code-structure-and-maintainability.md`는 수정하지 않는다(display number 불변)

## Stop Conditions
- [ ] 비-en 로케일 파일의 H1/footer 구조가 `en`과 다르면(예: footer 줄이 없음) 멈추고 그 로케일 파일을 먼저 확인하도록 보고한다
- [ ] `000022-010`이 확정한 신규 페이지 제목을 확인할 수 없으면 멈추고 보고한다

## Implementation Steps
- [ ] **`17-infrastructure-and-cloud.md` footer "Next" 갱신 (5개 로케일)**
  - [ ] "Next" 텍스트/링크를 `[Next: 15. <신규 페이지 제목>](./18-authentication-implementation.md)`로 교체(H1은 변경하지 않음)
- [ ] **`13-executor-and-codegen-patterns.md` H1/footer 갱신 (5개 로케일)**
  - [ ] H1을 `15`→`16`으로 변경
  - [ ] footer "Previous" 텍스트 번호 유지(대상 불변), "Next" 텍스트 `16`→`17`(대상 불변)
- [ ] **`14-skill-reference.md` H1/footer/A-Z 테이블 갱신 (5개 로케일)**
  - [ ] H1을 `16`→`17`로 변경
  - [ ] footer "Previous" `15`→`16`, "Next" `17`→`18`(모두 대상 불변)
  - [ ] A-Z 테이블에 `ywc-auth-implement` 신규 행 추가(`ywc-agentic`과 `ywc-brainstorm` 사이) — `[15](./18-authentication-implementation.md)`
  - [ ] `ywc-code-gen`/`ywc-parallel-executor`/`ywc-sequential-executor` 3행을 `[15]`→`[16]`으로 bump(대상 불변)
- [ ] **`15-prerequisites-installation.md` H1/footer 갱신 (5개 로케일)**
  - [ ] H1을 `17`→`18`로 변경
  - [ ] footer "Previous" `16`→`17`(대상 불변, "Next" 없음)

## Task Verify
- [ ] `rg -n "^# (14|15|16|17|18)\." src/content/guidebook/{en,ja,ko,zh,es}/{17-infrastructure-and-cloud,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md`
- [ ] `grep -n "\[15\]\|\[16\]" src/content/guidebook/en/14-skill-reference.md`

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠)
- [ ] app builds without error (`npm run build`)
