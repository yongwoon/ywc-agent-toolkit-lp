# 000005-010-config-sitemap-robots

## Purpose
5개 LP locale URL(hreflang 포함)과 guidebook KO 페이지 URL을 모두 포함하는 `sitemap.xml`을 빌드 시점에 생성하고, 이를 참조하는 `robots.txt`를 함께 제공한다.

## Scope
- sitemap 생성 스크립트/설정 (예: `next-sitemap.config.js` 또는 커스텀 빌드 스크립트)
- `public/robots.txt` (또는 빌드 산출물로 생성되는 동등한 파일) — sitemap.xml을 참조

## Spec Reference

### Primary Sources
- `docs/specification/06-requirements.md#SEO` — 5개 locale의 모든 URL과 상호 hreflang 정보를 포함하는 `sitemap.xml`을 빌드 시점에 생성하고, 이를 참조하는 `robots.txt`를 함께 제공해야 한다는 요구사항
- `docs/specification/01-overview.md#Scope` — SEO를 위한 hreflang, Open Graph, JSON-LD 메타데이터가 In Scope로 명시됨
- `N/A(guidebook 부분) — no spec doc yet in this repo; guidebook URL 구조는 000004-020/000004-030에서 확정된 route를 근거로 함`

### Summary
sitemap.xml은 5개 locale의 LP 홈 URL(`/en/`, `/ja/`, `/ko/`, `/zh/`, `/es/`)과 각 URL의 hreflang 상호 참조를 포함해야 한다. 여기에 더해, Phase 000004에서 구축된 guidebook KO 페이지 URL(`/ko/guidebook/<slug>`)도 sitemap에 포함시켜 검색엔진이 guidebook 콘텐츠도 색인할 수 있도록 한다. `robots.txt`는 sitemap.xml의 위치를 `Sitemap:` 지시어로 참조한다. 이 task는 LP와 guidebook(KO) 모두가 완성된 이후(Phase 000003, 000004 완료 후)에 실행되어야 정확한 URL 목록을 생성할 수 있다.

### Out of Scope (from spec)
- 커스텀 도메인 여부에 따른 canonical URL 값 확정 — `06-requirements.md#Open Questions`에 따라 미결정이므로, 이 task는 GitHub Pages 기본 경로(`<owner>.github.io/ywc-agent-toolkit-lp`) 또는 설정 가능한 base URL 변수를 사용해 추후 커스텀 도메인이 결정되면 값만 교체 가능하도록 구현한다

## Criticality
`normal` — 사용자 입력이 없는 정적 SEO 파일 생성

## Dependencies

### Depends On
- `000003-030-ui-landing-sections-part2` — LP의 최종 페이지 구조(8-section)가 확정되어야 정확한 sitemap URL을 생성할 수 있음
- `000004-030-config-guidebook-content-sync` — guidebook KO 페이지의 실제 slug 목록이 확정되어야 sitemap에 포함할 URL을 알 수 있음

### Depended By
- `(None)`

## Key Files
- sitemap 생성 스크립트/설정 (예: `next-sitemap.config.js` 또는 `scripts/generate-sitemap.mjs`)
- `public/robots.txt` (또는 빌드 시 생성되는 동등 산출물)

## Notes
- static export 환경이므로 sitemap 생성은 빌드 타임에 완료되어야 한다(런타임 API route 사용 불가) — `next-sitemap` 같은 빌드 후처리 패키지 또는 자체 Node 스크립트로 `next build` 이후 산출물 디렉터리에 `sitemap.xml`을 직접 생성하는 방식을 사용한다.
- hreflang 정보는 `src/i18n/locale-list.ts`(000001-020) 및 `src/lib/seo.ts`(000002-020)가 사용하는 것과 동일한 locale 목록을 재사용해 drift를 방지한다.
- guidebook URL이 아직 KO만 존재하므로(Phase 000006 이전), sitemap에는 `/ko/guidebook/*`만 포함되고 다른 locale의 guidebook URL은 Phase 000006 완료 후 별도 갱신이 필요할 수 있다 — 이는 이 task의 범위 밖이며 향후 후속 조치로 남긴다.

## Parallel Execution Metadata

### Ownership
- sitemap 생성 스크립트/설정 파일
- `public/robots.txt` (또는 동등 산출물 경로)

### Shared Surfaces
- `src/i18n/locale-list.ts` — read-only 참조
- guidebook route 구조(`src/app/[locale]/guidebook/**`) — read-only 참조

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000003-030-ui-landing-sections-part2`
- `000004-030-config-guidebook-content-sync`

### Task Verify
- `npm run build` — 빌드 산출물에 `sitemap.xml`, `robots.txt`가 생성되는지 확인
- sitemap.xml의 URL 개수가 5(LP locale) + guidebook KO 페이지 수와 일치하는지 수동 대조

## Out of Scope
- Phase 000005의 성능/접근성/build 통합 검증 — `000005-020`의 책임
- 커스텀 도메인 canonical URL 최종 확정 — Open Question으로 남김
