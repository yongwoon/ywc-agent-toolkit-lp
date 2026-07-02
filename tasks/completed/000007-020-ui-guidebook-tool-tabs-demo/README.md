# 000007-020-ui-guidebook-tool-tabs-demo

## Purpose
`000007-010`이 만든 `ToolTabs`/`ToolTabsProvider`를 실제 가이드북 페이지에 연결한다 — Provider를 가이드북 layout에 mount하고, `ToolTabs`를 가이드북 MDX 렌더링의 `components` 맵에 등록하며, 실제 가이드북 콘텐츠 1개 페이지에 `<ToolTabs>`를 적용해 종단 간(end-to-end) 동작을 증명한다.

## Scope
- `src/app/[locale]/guidebook/layout.tsx` — `ToolTabsProvider` mount 지점 추가 (`000004-020` 소유 파일에 대한 좁은 edit)
- `src/app/[locale]/guidebook/[[...slug]]/page.tsx` — `<MDXRemote components={{ ToolTabs, ... }}>` wiring 추가 (`000004-020` 소유 파일에 대한 좁은 edit)
- `src/content/guidebook/ko/03-quickstart.md` — "Step 1 — 계획 세우기" 커맨드 블록을 `<ToolTabs>`로 감싸는 1개 파일 surgical edit (`000004-030` 소유 파일)

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-tool-tabs.md` — 이 기능 전체의 spec (Iteration 1 Amendments 포함, `ywc-spec-validate` DONE 확정본)
- `docs/ywc-plans/guidebook-tool-tabs.md#FR-3: MDX Integration` — `<MDXRemote>` 호출에 `ToolTabs`를 `components` 맵으로 등록하는 정확한 방식, `serializeGuidebookMdx`가 이미 `format: "mdx"`로 설정되어 있어 추가 파이프라인 변경이 필요 없다는 근거
- `docs/ywc-plans/guidebook-tool-tabs.md#FR-4: 데모 적용 (1개 실제 페이지)` — 대상 페이지/Step, Claude Code 패널은 기존 커맨드 그대로, Codex 패널은 "예시" 표시가 있는 placeholder 커맨드 사용
- `docs/ywc-plans/guidebook-tool-tabs.md#Edge Cases`(Iteration 1의 Edge Cases Amendment 포함) — `000004-030` 재동기화 시 이 데모 edit이 덮어써질 수 있다는 트레이드오프, 공유 선택 상태가 현재 블록 패널과 불일치할 때의 fallback
- `tasks/000004-020-ui-guidebook-layout/README.md` — `layout.tsx`/`page.tsx`의 정확한 Ownership 범위(Ownership 섹션) 및 기존 구조(top bar/sidebar/content/TOC)
- `tasks/000004-030-config-guidebook-content-sync/README.md` — `src/content/guidebook/ko/**`의 정확한 Ownership 범위 및 sync 메커니즘

### Summary
`ToolTabsProvider`를 가이드북 layout에서 한 번 mount해 같은 페이지의 모든 `ToolTabs` 인스턴스가 하나의 선택 상태를 공유하도록 하고, 가이드북 페이지 컴포넌트의 `<MDXRemote>` 호출에 `ToolTabs`/`ToolTabs.Panel`을 `components` 맵으로 등록해 MDX 콘텐츠 안에서 `<ToolTabs>` JSX 태그를 직접 쓸 수 있게 한다. 데모로 `03-quickstart.md`의 "Step 1 — 계획 세우기" 블록을 `<ToolTabs>`로 감싸 Claude Code 패널(기존 `ywc-plan ...` 커맨드 그대로)과 Codex 패널(placeholder, "예시" 라벨 명시)을 만든다. 이 edit은 향후 `000004-030`(또는 이후 실제 콘텐츠 재동기화)에 의해 덮어써질 수 있음을 인지하고 진행하는 허용된 트레이드오프다.

### Out of Scope (from spec)
- `ToolTabs`/`ToolTabsProvider` 컴포넌트 자체 구현 — `000007-010`의 책임 (이 task는 소비만 함)
- 전체 가이드북 콘텐츠(01–13 페이지)를 `<ToolTabs>` 형식으로 마이그레이션 — spec이 명시적으로 "최소 1개 페이지"로 한정
- Codex 커맨드의 실제 정확성 검증 — upstream(`develop-with-llm`)에 아직 Codex 대응 커맨드가 없음(spec Open Questions #1)
- 랜딩페이지 install-steps 탭 wiring — spec의 Out of Scope

## Criticality
`normal` — 사용자 입력이 서버로 전송되지 않는 정적 클라이언트 UI 및 정적 콘텐츠 edit

## Dependencies

### Depends On
- `000007-010-ui-tool-tabs-primitive` — `ToolTabs`/`ToolTabs.Panel`/`ToolTabsProvider` 컴포넌트가 필요
- `000004-020-ui-guidebook-layout` — `src/app/[locale]/guidebook/layout.tsx`, `src/app/[locale]/guidebook/[[...slug]]/page.tsx`가 완전히 merge되어 있어야 함 (이 task는 그 파일들을 좁게 edit)
- `000004-030-config-guidebook-content-sync` — `src/content/guidebook/ko/03-quickstart.md`가 실제로 동기화되어 존재해야 함 (이 task는 그 파일을 좁게 edit)

### Depended By
- `(None identified)` — 이 기능의 마지막 task. Phase 000005(sitemap/build-verification)는 이 task를 명시적으로 요구하지 않으나, `000005-020-test-build-verification`이 재실행될 경우 이 task가 이미 merge된 상태라면 결과에 포함됨

## Key Files
- `src/app/[locale]/guidebook/layout.tsx`
- `src/app/[locale]/guidebook/[[...slug]]/page.tsx`
- `src/content/guidebook/ko/03-quickstart.md`

## Notes
- `layout.tsx`/`page.tsx`는 `000004-020`이 소유한 파일이므로, 이 task는 Provider mount 지점과 `components` 맵 등록이라는 좁은 범위의 edit만 수행하고 나머지 top bar/sidebar/TOC 구조는 건드리지 않는다.
- `03-quickstart.md`는 `000004-030`이 소유한 파일이므로, "Step 1" 블록 1곳만 surgical하게 edit하고 다른 페이지/섹션은 건드리지 않는다.
- 이 데모 edit은 향후 upstream(`develop-with-llm`) 재동기화 시 덮어써질 수 있다 — 재동기화 후 `<ToolTabs>` 마크업 재적용이 필요할 수 있음을 커밋 메시지 또는 PR 설명에 남긴다.
- Codex 패널의 커맨드는 실제 검증된 것이 아니라 대표성 있는 placeholder이며, 반드시 "예시" 성격임을 시각적으로 표시한다(예: 패널 상단에 주석 또는 label로 명시).

## Parallel Execution Metadata

### Ownership
- `src/app/[locale]/guidebook/layout.tsx` 내 Provider mount 지점 (파일 전체 소유 아님, `000004-020`과 공유)
- `src/app/[locale]/guidebook/[[...slug]]/page.tsx` 내 `<MDXRemote components={{...}}>` wiring 지점 (파일 전체 소유 아님, `000004-020`과 공유)
- `src/content/guidebook/ko/03-quickstart.md` 내 "Step 1" 블록 (파일 전체 소유 아님, `000004-030`과 공유)

### Shared Surfaces
- `src/app/[locale]/guidebook/layout.tsx`, `src/app/[locale]/guidebook/[[...slug]]/page.tsx` — `000004-020` 소유, 이 task는 narrow edit만 수행
- `src/content/guidebook/ko/**` — `000004-030` 소유, 이 task는 `03-quickstart.md` 1개 파일만 narrow edit

### Conflicts With
- `000004-020-ui-guidebook-layout`, `000004-030-config-guidebook-content-sync`와 동시 실행 금지 — 두 task 모두 완전히 merge된 뒤에만 이 task를 시작한다

### Parallelizable After
- `000007-010-ui-tool-tabs-primitive`
- `000004-020-ui-guidebook-layout` (merge 완료 필수)
- `000004-030-config-guidebook-content-sync` (merge 완료 필수)

### Task Verify
- `npx tsc --noEmit`
- `npm run build` — `ToolTabs` 블록이 포함된 `03-quickstart.md`가 빌드 타임에 정상 컴파일되는지 확인
- `npm run lint`
- 수동 확인: 빌드된 가이드북 `03-quickstart.md` 페이지에서 실제로 `ToolTabs`가 렌더링되고 두 패널을 전환할 수 있는지 브라우저에서 확인

## Out of Scope
- `ToolTabs` 컴포넌트 자체 구현 — `000007-010`
- 전체 가이드북 콘텐츠 마이그레이션 — 명시적으로 범위 밖
- 랜딩페이지 install-steps 탭 wiring — 명시적으로 범위 밖
