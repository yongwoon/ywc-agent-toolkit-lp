# 000004-020-ui-guidebook-layout — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000001-010-lib-nextjs-i18n-setup` is completed (merged)
- [ ] `000004-010-lib-mdx-content-pipeline` is completed (merged) — MDX 라이브러리, `guidebook-content.ts` loader 존재

## Allowed Edit Scope
- [ ] `src/app/[locale]/guidebook/**`, `src/components/guidebook/**`에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] `000004-010`의 `guidebook-content.ts`가 예상 인터페이스(frontmatter/TOC/본문 반환)를 제공하지 않으면 멈추고 조율한다
- [ ] sidebar 그룹 구조가 develop-with-llm README.md의 4개 그룹(Prologue/시작하기/워크플로우 가이드/레퍼런스)과 다르게 구현되고 있으면 멈추고 재확인한다

## Implementation Steps
- [ ] **`top-bar.tsx` 구현** (`docs-page.md#Top bar`)
  - [ ] 높이 60px, `rgba(11,10,9,.85)` + `backdrop-filter: blur(12px)`, 하단 hairline border, sticky 포지션
  - [ ] 워드마크 + mono nav(Docs/Skills/Agents/Hooks 등, 활성 항목은 `--accent`) + 검색 mono chip(`⌘K` 힌트 표시, v1은 클릭 시 시각적 mock 상태만 — 실제 인덱싱 없음) + 우측 정렬된 버전 selector/`LocaleSwitcher`/GitHub star `Badge`
  - [ ] `≤860px`에서 nav를 접고 sidebar 토글용 `≡` 버튼으로 대체
- [ ] **`sidebar-nav.tsx` 구현** (`docs-page.md#Sidebar`)
  - [ ] Prologue(01–02), 시작하기(03), 워크플로우 가이드(04–10), 레퍼런스(11–12) 4개 그룹으로 구성된 TOC 데이터 구조 정의 (그룹 라벨은 원문 한국어 그대로 사용)
  - [ ] 그룹 헤더는 UPPERCASE `--text-label` eyebrow + `›` 토글(열림 시 90도 회전), 그룹은 접기/펼치기 가능, 활성 페이지가 속한 그룹은 기본 열림 상태
  - [ ] 링크는 `--text-mono-sm`(muted), 활성 링크는 amber 텍스트 + `--amber-tint` 배경 + 2px amber 좌측 border
  - [ ] `position: sticky; top: 60px`로 자체 스크롤
- [ ] **`toc.tsx` 구현** (`docs-page.md#TOC (right)`)
  - [ ] "On this page" eyebrow + `--border-subtle` 좌측 rail의 anchor 링크 목록 (현재 페이지의 h2 heading 기준)
  - [ ] `IntersectionObserver`로 현재 보이는 h2 섹션을 감지해 해당 anchor를 amber 텍스트 + amber rail로 강조(scroll-spy)
  - [ ] `position: sticky; top: 60px`, `≤1180px`에서는 컬럼 자체를 숨김(2컬럼으로 축소)
- [ ] **`prev-next-nav.tsx` 구현**
  - [ ] content 하단에 hairline top border의 edit-on-GitHub row, 그 아래 2-up prev/next card nav(페이지 이름 amber mono)
  - [ ] TOC 순서(sidebar 데이터 구조) 기준으로 이전/다음 페이지 링크 계산 및 렌더링
- [ ] **`guidebook/layout.tsx` 구현** (`docs-page.md#Anatomy`)
  - [ ] `top-bar.tsx` + 3컬럼 grid(`264px · minmax(0,1fr) · 232px`, max-width ~1560px)로 sidebar/content/toc 배치
  - [ ] `≤1180px`: TOC 컬럼 제거(2컬럼) / `≤860px`: sidebar가 top bar `≡` 버튼으로 토글되는 off-canvas drawer로 전환
  - [ ] 모든 heading에 `id` 부여, `scroll-behavior: smooth`, heading에 `scroll-margin-top: 76px` 적용(sticky top bar에 가려지지 않도록)
- [ ] **`guidebook/[[...slug]]/page.tsx` 구현**
  - [ ] catch-all slug로 `guidebook-content.ts` loader를 호출해 해당 markdown 콘텐츠를 렌더링
  - [ ] `generateStaticParams`로 v1(ko) 콘텐츠 slug 목록을 사전 렌더링 대상으로 등록 (콘텐츠 디렉터리가 아직 비어있다면 `000004-030` 완료 후 최종 확인)
  - [ ] `docs-page.md#Content / prose` 규칙 적용: h1은 `--font-display`/`--text-h1`, h2는 `--text-h3`(hover 시 amber `#` anchor 노출), body는 `--text-body`/`--lh-relaxed`/`max-width: 70ch`, inline code는 `--surface-raised` 배경+`--amber-300` 텍스트, 코드 블록은 `code-block.tsx` primitive 재사용(라벨 바+amber prompt+Copy 버튼+클립보드 실패 fallback), 불릿은 amber `▪`, 인용/callout은 `--amber-tint` 배경+`!` glyph
  - [ ] 콘텐츠 하단에 `prev-next-nav.tsx` 배치

## Task Verify
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] test.md 시나리오 수동 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — test.md의 수동 시나리오로 대체)
- [ ] integration tests pass (test.md 참고)
- [ ] app builds without error (`npm run build`)
