# 000019-010-refactor-guidebook-renumber-core-pages — Implementation Checklist

## Prerequisites
- [ ] `000018-010-ui-guidebook-infra-cloud-page-registration` 완료 — 신규 페이지 5개 로케일 파일이 존재하고, `check-guidebook-nav-registration.mjs`가 통과한다

## Allowed Edit Scope
- [ ] `src/content/guidebook/{en,ja,ko,zh,es}/{16-code-structure-and-maintainability,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md`에만 수정한다
- [ ] 신규 페이지 파일(`17-infrastructure-and-cloud.md`)은 수정하지 않는다(이미 `000018-010`이 올바른 번호로 작성 완료)

## Stop Conditions
- [ ] 어떤 로케일 파일의 H1/footer 구조가 `en`과 명백히 다르면(예: footer 라인이 아예 없음) 멈추고 해당 로케일의 실제 구조를 먼저 확인하도록 보고한다 — `en`의 줄 번호를 그대로 적용하지 않는다

## Implementation Steps
- [ ] **`16-code-structure-and-maintainability.md` (5개 로케일)**
  - [ ] H1은 변경하지 않는다(계속 "13")
  - [ ] footer의 "Next" 텍스트와 링크 대상을 신규 페이지로 변경: `[Next: 14. <신규 페이지 제목>](./17-infrastructure-and-cloud.md)`(제목은 `000018-010`이 작성한 실제 H1 제목과 일치시킨다)
- [ ] **`13-executor-and-codegen-patterns.md` (5개 로케일)**
  - [ ] H1 `14` → `15`
  - [ ] footer "Previous" 텍스트는 번호 그대로 유지("13", 대상 파일도 `16-code-structure-and-maintainability.md`로 불변)
  - [ ] footer "Next" 텍스트 `15` → `16`(대상 파일 `14-skill-reference.md` 불변)
- [ ] **`14-skill-reference.md` (5개 로케일)**
  - [ ] H1 `15` → `16`
  - [ ] footer "Previous" 텍스트 `14` → `15`(대상 불변), "Next" 텍스트 `16` → `17`(대상 불변)
  - [ ] "Full Skill Index (A-Z)" 테이블에 4개 신규 행 알파벳 순서로 삽입: `ywc-iac-author`, `ywc-infra-design`, `ywc-infra-optimize`, `ywc-infra-review` — 각 Location 컬럼 `[14](./17-infrastructure-and-cloud.md)`
  - [ ] 같은 테이블에서 기존 `[14](./13-executor-and-codegen-patterns.md)` 3행(`ywc-code-gen`, `ywc-parallel-executor`, `ywc-sequential-executor`)을 `[15](./13-executor-and-codegen-patterns.md)`로 갱신
- [ ] **`15-prerequisites-installation.md` (5개 로케일)**
  - [ ] H1 `16` → `17`
  - [ ] footer(마지막 페이지) "Previous" 텍스트 `15` → `16`(대상 불변)

## Task Verify
- [ ] `rg -n "^# (13|14|15|16|17)\." src/content/guidebook/{en,ja,ko,zh,es}/{16-code-structure-and-maintainability,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md` — 기대값과 일치
- [ ] `rg -n "\[1[3-7]\." src/content/guidebook/{en,ja,ko,zh,es}/{16-code-structure-and-maintainability,13-executor-and-codegen-patterns,14-skill-reference,15-prerequisites-installation}.md` — footer pairing이 `[13.`↔`16-code-structure`, `[14.`↔`17-infrastructure-and-cloud`, `[15.`↔`13-executor`, `[16.`↔`14-skill-reference`, `[17.`↔`15-prerequisites`와 일치
- [ ] `14-skill-reference.md`(5개 로케일)에서 `[14]`와 `[15]`로 표시된 행들이 서로 다른 두 대상을 동일 번호로 표시하는 사례가 없는지 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`) — 코드 변경 없음, 형식상 실행
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠)
- [ ] app builds without error (`npm run build`)
- [ ] `npm run test:content` — `check-guidebook-paths.mjs` 통과
