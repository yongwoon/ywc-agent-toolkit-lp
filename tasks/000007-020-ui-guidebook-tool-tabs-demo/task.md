# 000007-020-ui-guidebook-tool-tabs-demo — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000007-010-ui-tool-tabs-primitive` is completed (merged) — `ToolTabs`/`ToolTabs.Panel`/`ToolTabsProvider` exist
- [ ] `000004-020-ui-guidebook-layout` is completed (merged) — `src/app/[locale]/guidebook/layout.tsx`, `src/app/[locale]/guidebook/[[...slug]]/page.tsx` exist
- [ ] `000004-030-config-guidebook-content-sync` is completed (merged) — `src/content/guidebook/ko/03-quickstart.md` exists

## Allowed Edit Scope
- [ ] `src/app/[locale]/guidebook/layout.tsx`(Provider mount 지점만), `src/app/[locale]/guidebook/[[...slug]]/page.tsx`(`components` 맵 wiring만), `src/content/guidebook/ko/03-quickstart.md`(Step 1 블록만)에만 edit한다
- [ ] 이 파일들의 다른 부분(top bar/sidebar/TOC 구조, 다른 페이지 콘텐츠)은 건드리지 않는다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] 세 선행 task 중 하나라도 실제로 merge되지 않았으면 멈추고 보고한다
- [ ] `<MDXRemote>` 호출부의 실제 구현이 spec이 가정한 형태(`next-mdx-remote`의 `MDXRemoteSerializeResult` 소비 방식)와 다르면 멈추고 보고한다
- [ ] `03-quickstart.md`의 "Step 1" 구조가 spec이 가정한 형태와 크게 다르면(예: 커맨드 블록이 없거나 여러 개로 분할됨) 멈추고 보고한다

## Implementation Steps
- [ ] **`ToolTabsProvider` mount** (`docs/ywc-plans/guidebook-tool-tabs.md#FR-2`)
  - [ ] `src/app/[locale]/guidebook/layout.tsx`에서 페이지 콘텐츠 트리를 `ToolTabsProvider`로 감싼다(한 번만 mount, 기존 top bar/sidebar/TOC 구조는 유지)
- [ ] **MDX `components` 맵 wiring** (`docs/ywc-plans/guidebook-tool-tabs.md#FR-3`)
  - [ ] `src/app/[locale]/guidebook/[[...slug]]/page.tsx`의 `<MDXRemote {...mdxSource} components={{...}}>` 호출에 `ToolTabs`(및 하위 `ToolTabs.Panel`)를 추가
- [ ] **데모 콘텐츠 적용** (`docs/ywc-plans/guidebook-tool-tabs.md#FR-4`)
  - [ ] `src/content/guidebook/ko/03-quickstart.md`의 "Step 1 — 계획 세우기" 커맨드 블록(```` ``` ````)을 `<ToolTabs>`로 교체
  - [ ] Claude Code 패널: 기존 `ywc-plan 로그인 실패 시...` 커맨드를 그대로 `<CodeBlock label="claude code" code="...">`로 이동(static string literal)
  - [ ] Codex 패널: 대표성 있는 placeholder 커맨드를 `<CodeBlock label="codex" code="...">`로 작성하고, "예시" 성격임을 패널 라벨 또는 주변 텍스트에 명시
- [ ] **PR/커밋 메시지에 재동기화 위험 명시**
  - [ ] `03-quickstart.md` edit이 향후 `000004-030` 재동기화 시 덮어써질 수 있다는 점을 커밋 메시지 또는 PR 설명에 남긴다

## Task Verify
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] 수동 확인: `npm run build` 산출물 또는 `npm run dev`에서 `/ko/guidebook/03-quickstart` 페이지를 열어 `ToolTabs`가 실제로 렌더링되고 두 패널이 정상 전환되는지 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 이 프로젝트는 별도 테스트 러너 미구성, task verification은 build/lint/typecheck + 수동 확인)
- [ ] integration tests pass (해당 없음)
- [ ] app builds without error (`npm run build`)
