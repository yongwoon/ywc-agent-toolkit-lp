# 000022-010-ui-guidebook-auth-implement-page-registration — Implementation Checklist

## Prerequisites
- [ ] `000021-010-config-verify-upstream-auth-content` 완료 — `docs/ywc-plans/guidebook-auth-implement-page.verification.md`에 PR 상태와 `ywc-auth-implement` 커맨드 예시·플로우 요약이 기록되어 있다

## Allowed Edit Scope
- [ ] `src/components/guidebook/guidebook-nav.ts`(신규 엔트리 추가만), `scripts/guidebook-slugs.mjs`(신규 slug 추가만), `src/content/guidebook/{en,ja,ko,zh,es}/18-authentication-implementation.md`(신규 생성)에만 수정한다
- [ ] 기존 페이지 파일(`17-infrastructure-and-cloud.md` 등)은 수정하지 않는다

## Stop Conditions
- [ ] `000021-010`의 검증 노트에 Claude Code/Codex 두 SKILL.md 중 하나라도 요약이 누락되어 있으면 멈추고 `000021-010`을 보완하도록 보고한다
- [ ] 5개 로케일 중 하나라도 콘텐츠 작성을 완료하지 못한 상태로는 커밋하지 않는다(부분 로케일 커밋은 `npm run build`의 `generate-search-index.mjs` 단계에서 hard-throw)

## Implementation Steps
- [ ] **`guidebook-nav.ts` 신규 엔트리 추가**
  - [ ] `workflow-guides` 그룹의 `pages` 배열에서 `17-infrastructure-and-cloud` 엔트리 바로 다음에 `{ slug: "18-authentication-implementation", title: "...", description: "...", groupId: "workflow-guides", status: "pending" }` 추가
- [ ] **`guidebook-slugs.mjs` 신규 slug 추가**
  - [ ] `guidebookSlugs` 배열에서 `"17-infrastructure-and-cloud"` 다음, `"13-executor-and-codegen-patterns"` 이전 위치에 `"18-authentication-implementation"` 추가
- [ ] **`en/18-authentication-implementation.md` 작성 (source of truth)**
  - [ ] 헤더 링크, `# 15. <제목>` H1, "When to use this Skill" 섹션, 플로우 walkthrough 섹션, `<ToolTabs>` 1개 포함 `ywc-auth-implement` 섹션(`000021-010` 검증 노트의 실제 커맨드 사용), "How Claude Code and Codex differ" 짧은 노트, footer(`[Previous: 14. Managing Cloud Infrastructure](./17-infrastructure-and-cloud.md) - [Next: 16. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md)`) 작성
- [ ] **ja/ko/zh/es 작성**
  - [ ] 각 로케일의 기존 페이지(`17-infrastructure-and-cloud.md` 해당 로케일본)의 문체를 참고하여 자연스러운 번역 prose로 작성(기계적 복사 금지), `en` 파일과 동일한 구조(헤딩 개수/순서, ToolTabs 1개, footer) 유지

## Task Verify
- [ ] `node test/check-guidebook-nav-registration.mjs` 통과
- [ ] `rg -c "<ToolTabs>" src/content/guidebook/{en,ja,ko,zh,es}/18-authentication-implementation.md` — 5개 파일 모두 1개씩 카운트
- [ ] `npx tsc --noEmit` 통과
- [ ] `npm run build` 실행(prebuild의 `generate-search-index.mjs`가 5개 로케일 콘텐츠를 정상적으로 찾는지 확인)

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠)
- [ ] app builds without error (`npm run build`, prebuild `check-guidebook-nav-registration.mjs` 포함)
