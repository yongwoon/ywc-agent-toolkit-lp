# Non-Functional Requirements

## Performance
- Landing page JS 번들 크기(gzip 기준) < 150kb, CSS < 30kb
- LCP(Largest Contentful Paint) < 2.5초
- INP(Interaction to Next Paint) < 200ms
- CLS(Cumulative Layout Shift) < 0.1
- FCP(First Contentful Paint) < 1.5초
- TBT(Total Blocking Time) < 200ms
- 150kb 예산을 지키기 위해 hero의 CLI 데모 애니메이션은 JS 애니메이션 라이브러리 없이 **CSS 기반(compositor-friendly property만 사용)** 으로 구현하고, `useTranslations` 등 next-intl 훅은 가능한 한 서버 컴포넌트에서만 사용해 클라이언트 번들에 포함되는 번역 런타임을 최소화한다

## Security
- 사용자 입력을 받는 폼이 없으므로 CSRF/입력 검증은 해당 없음 (N/A — 순수 정적 정보 페이지)
- 프로덕션 CSP(Content-Security-Policy)는 GitHub Pages가 커스텀 응답 헤더 설정을 지원하지 않아 HTTP 헤더로는 적용할 수 없다 — 대신 `<meta http-equiv="Content-Security-Policy">` 태그로 스크립트/스타일 출처를 제한한다
- `<meta>` 기반 CSP는 `frame-ancestors` 지시어를 전달할 수 없고(브라우저 스펙상 HTTP 헤더 전용), GitHub Pages는 `X-Frame-Options` 헤더도 설정할 수 없다 — 이 사이트는 클릭재킹 방어 수단이 구조적으로 없다는 잔존 위험을 accept한다(로그인·민감 동작이 없는 정보 페이지이므로 허용 가능한 것으로 판단)
- script-src는 nonce 기반이 아닌 **hash 기반**(`'sha256-<hash>'`)으로 지정한다 — nonce는 요청마다 서버가 생성해야 하는데, 이 사이트는 정적 export라 모든 방문자가 동일한 사전 빌드 HTML을 받으므로 nonce가 구조적으로 작동하지 않는다(재사용되는 순간 보안 효과가 사라짐). Next.js 인라인 hydration 스크립트는 빌드 시점에 내용이 고정되므로 hash 방식과 궁합이 맞는다
- 외부 스크립트(있는 경우)는 비동기 로드하고 CDN 사용 시 SRI(Subresource Integrity)를 적용한다

## Authentication & Authorization
- N/A — 이 프로젝트는 로그인/역할 구분이 없는 단일 공개 방문자 유형만 존재한다 (01-overview.md Target Users 참고)

## Availability
- GitHub Pages(Fastly CDN 기반)의 표준 가용성에 의존하며, 별도의 공식 SLA를 자체적으로 설정하지 않는다
- 정적 파일 서빙이므로 애플리케이션 레벨 장애(서버 다운, DB 장애)가 구조적으로 발생하지 않는다
- 빌드 산출물에 정적 `404.html`을 포함해, 미매칭 경로(오타 URL, 지원하지 않는 locale 등)에서도 방문자가 막다른 빈 화면을 보지 않도록 한다 (02-features.md "Not Found (404)" 참고)

## Scalability
- 정적 자산은 CDN을 통해 자동으로 트래픽에 따라 확장되며, 별도의 스케일링 설정이 필요하지 않다

## Accessibility
- WCAG 2.2 AA 기준을 충족한다 (키보드 내비게이션, 색상 대비, reduced-motion 대응 포함)
- 320/768/1024/1440 breakpoint에서 레이아웃 깨짐이 없어야 한다

## Audit Trail
- N/A — 사용자 데이터나 상태 변경이 없는 정적 페이지이므로 감사 추적 대상이 없다

## Data Lifecycle
- N/A — 페이지가 저장하거나 축적하는 사용자 데이터, 로그성 데이터가 없다

## Compliance
- 별도 규제 준수 요구사항 없음 (사용자 개인정보를 수집하지 않는 공개 정보 페이지)

## SEO
- 5개 locale 각각에 대해 hreflang alternate 태그가 서로를 참조해야 한다
- 각 locale 페이지는 locale에 맞는 title/description 메타데이터와 JSON-LD(WebSite/SoftwareApplication) 구조화 데이터를 포함해야 한다
- 5개 locale의 모든 URL과 상호 hreflang 정보를 포함하는 `sitemap.xml`을 빌드 시점에 생성하고, 이를 참조하는 `robots.txt`를 함께 제공한다
- 루트 `/`는 `localePrefix: 'always'` 정책에 따라 콘텐츠를 직접 갖지 않는 정적 리다이렉트 stub이며, `/en/`으로의 `<meta refresh>`와 5개 locale hreflang 링크를 포함해 크롤러가 모든 locale을 색인할 수 있도록 한다 (docs/tech-stack.md 참고)

## Existing Constraints Touched
- Core Web Vitals 및 번들 예산 수치는 이 workspace의 웹 성능 표준 문서(`~/.claude/rules/web/performance.md`)에서 "Landing page"급 프로젝트에 적용되는 기준을 그대로 채택했다
- 접근성 기준(WCAG 2.2 AA, breakpoint 목록)은 이 workspace의 웹 테스트 표준 문서(`~/.claude/rules/web/testing.md`)에서 채택했다
- 정적 export 관련 제약(Middleware 미사용, `output: 'export'`, `images.unoptimized`)은 `docs/tech-stack.md`의 Extras 섹션에서 정의한 `next.config.ts` 설정을 그대로 따른다
- 루트 `/` 리다이렉트 전략(`localePrefix: 'always'` + 정적 `<meta refresh>` stub + progressive-enhancement JS 매칭)은 `docs/tech-stack.md`의 `src/i18n/routing.ts` 및 `src/app/page.tsx` 항목에서 정의한 설계를 그대로 따른다

## Open Questions
- Social Proof 섹션에 사용할 실제 인용구/출처가 아직 확정되지 않았다 — 최초 출시 시점에 인용구가 없다면 섹션을 노출하지 않는 방식으로 처리할지, 자체 GitHub 저장소 통계로 대체할지 결정이 필요하다
- 커스텀 도메인 사용 여부(예: 별도 도메인 연결 vs `<owner>.github.io/ywc-agent-toolkit-lp` 기본 경로 사용)가 아직 결정되지 않았다 — 이는 `CNAME` 설정 및 SEO canonical URL에 영향을 준다

