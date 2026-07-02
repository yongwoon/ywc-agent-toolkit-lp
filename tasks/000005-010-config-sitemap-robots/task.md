# 000005-010-config-sitemap-robots — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000003-030-ui-landing-sections-part2` is completed (merged)
- [ ] `000004-030-config-guidebook-content-sync` is completed (merged)

## Allowed Edit Scope
- [ ] sitemap 생성 스크립트/설정 파일, `public/robots.txt`(또는 동등 산출물)에만 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] LP 또는 guidebook 페이지 구조가 아직 확정되지 않은 상태로 진행하게 되면(선행 task 미merge) 멈춘다
- [ ] base URL(도메인)이 확정되지 않아 sitemap의 `<loc>` 값이 placeholder로만 채워지는 상황이면, 이를 명확히 표시하고 보고한다

## Implementation Steps
- [ ] **sitemap 생성 방식 선정**
  - [ ] `next-sitemap` 패키지 사용 또는 자체 Node 빌드 후처리 스크립트 중 하나를 선택 (static export와 호환되는지 확인)
- [ ] **URL 목록 수집 로직 구현**
  - [ ] `src/i18n/locale-list.ts`를 순회해 5개 LP locale URL 생성, 각 URL에 5개 locale hreflang alternate 포함
  - [ ] `src/content/guidebook/ko/`의 실제 파일 목록을 순회해 guidebook KO 페이지 URL 생성
- [ ] **`robots.txt` 작성**
  - [ ] `Sitemap: <base-url>/sitemap.xml` 지시어 포함
  - [ ] 크롤러 차단 규칙 없음(전체 허용) 확인
- [ ] **빌드 파이프라인 연결**
  - [ ] `package.json`의 build script 또는 post-build hook에 sitemap 생성 스텝 연결

## Task Verify
- [ ] `npm run build` — 산출물 디렉터리에 `sitemap.xml`, `robots.txt` 존재 확인
- [ ] sitemap.xml을 열어 5개 LP locale URL + guidebook KO URL 개수를 수동 대조

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 빌드 산출물 검증으로 대체)
- [ ] integration tests pass (해당 없음)
- [ ] app builds without error (`npm run build`)
