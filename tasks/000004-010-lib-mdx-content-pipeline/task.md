# 000004-010-lib-mdx-content-pipeline — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000001-010-lib-nextjs-i18n-setup` is completed (merged)
- [ ] (권장) `docs/specification/08-guidebook.md`가 `ywc-spec-writer`로 작성되었는지 확인 — 없다면 spec 부재 상태로 진행됨을 인지하고 착수

## Allowed Edit Scope
- [ ] `package.json`(신규 MDX 의존성만), `src/lib/guidebook-content.ts`에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] 선택한 MDX 라이브러리가 `output: 'export'`와 호환되지 않는 것으로 확인되면(런타임 컴파일 필요) 멈추고 대체 라이브러리를 재검토한다
- [ ] `package.json`의 기존 필드(scripts, 기존 의존성 버전)를 변경해야 하는 상황이 생기면 멈추고 보고한다

## Implementation Steps
- [ ] **MDX 라이브러리 선정 및 설치**
  - [ ] static export 호환 여부를 기준으로 `next-mdx-remote`(빌드 타임 `serialize` 방식) 또는 `@next/mdx` 중 하나를 선정
  - [ ] `package.json`에 의존성 추가, `npm install` 실행
- [ ] **`src/lib/guidebook-content.ts` 구현**
  - [ ] 파일 시스템에서 markdown 파일을 읽어 frontmatter(title, description, order 등)를 파싱하는 함수 작성
  - [ ] markdown 본문에서 heading(`##`, `###`)을 추출해 페이지 내 TOC 데이터 구조를 생성하는 함수 작성
  - [ ] markdown을 렌더링 가능한 형태(HTML string 또는 React 컴포넌트 트리)로 변환하는 함수 작성
- [ ] **동작 검증용 임시 확인**
  - [ ] 샘플 markdown 파일 하나를 로컬에 두고 loader가 정상적으로 frontmatter/TOC/본문을 파싱하는지 확인 (샘플 파일은 이 task의 임시 검증용이며 최종 콘텐츠 디렉터리 구조는 `000004-030`이 확정)

## Task Verify
- [ ] `npm install`
- [ ] `npx tsc --noEmit`
- [ ] `npm run build` — MDX 의존성이 static export 빌드를 깨지 않는지 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — loader 함수의 동작은 `000004-030`에서 실제 콘텐츠로 통합 검증)
- [ ] integration tests pass (해당 없음)
- [ ] app builds without error (`npm run build`)
