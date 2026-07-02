# Glossary

| Term | Definition |
|------|-----------|
| LP (Landing Page) | 하나의 제품/프로젝트를 소개하고 방문자의 특정 행동(설치, GitHub 방문 등)을 유도하도록 설계된 단일 목적 웹페이지 |
| Locale | 언어와 지역의 조합을 나타내는 코드. 이 프로젝트에서는 en(영어), ja(일본어), ko(한국어), zh(중국어), es(스페인어) 5개를 지원 |
| Static Export | 요청이 들어올 때마다 서버가 페이지를 만드는 대신, 빌드 시점에 모든 페이지를 완성된 HTML 파일로 미리 만들어 두는 방식. 서버 없이 파일만 올려도 동작함 |
| Hreflang | 검색엔진에게 "이 페이지의 다른 언어 버전이 여기 있다"고 알려주는 HTML 메타데이터. 다국어 SEO에 필수 |
| App Router | Next.js가 제공하는 폴더 기반 라우팅 방식으로, 폴더 구조가 곧 URL 구조가 됨 |
| 빌드 타임 사전 렌더링 (generateStaticParams 방식) | 어떤 동적 경로(예: locale)를 빌드 시점에 미리 만들어 둘지 지정하는 방식. 이 프로젝트는 5개 locale 각각의 정적 페이지를 이 방식으로 미리 만들어 둠 |
| Core Web Vitals | 방문자가 실제로 느끼는 로딩·반응 속도를 수치화한 Google의 표준 성능 지표 모음 (LCP, INP, CLS 등) |
| LCP (Largest Contentful Paint) | 화면에서 가장 큰 콘텐츠 요소가 표시되기까지 걸리는 시간. 체감 로딩 속도의 대표 지표 |
| INP (Interaction to Next Paint) | 사용자가 클릭 등 상호작용을 했을 때 화면이 반응하기까지 걸리는 시간 |
| CLS (Cumulative Layout Shift) | 페이지 로딩 중 레이아웃이 갑자기 밀리는 정도를 수치화한 지표 |
| JSON-LD | 검색엔진이 페이지 내용을 구조적으로 이해하도록 돕는 메타데이터 포맷. "이 페이지는 소프트웨어를 소개하는 웹사이트다" 같은 정보를 기계가 읽을 수 있게 표현함 |
| Shields.io Badge | GitHub star 수, 버전 등 저장소 정보를 실시간 이미지로 보여주는 외부 뱃지 서비스 |
| Translation Catalog | 화면에 표시되는 모든 문구를 locale별로 key-value 쌍으로 정리해 둔 번역 파일 |
| ywc-agent-toolkit | 이 LP가 소개하는 대상 프로젝트. Claude Code와 Codex용 skill·agent 배포 toolkit(공개 GitHub 저장소) |
| CDN (Content Delivery Network) | 전 세계 여러 지점에 콘텐츠 사본을 두어 방문자와 가장 가까운 곳에서 빠르게 응답하는 네트워크. GitHub Pages는 Fastly라는 CDN을 통해 서빙됨 |
