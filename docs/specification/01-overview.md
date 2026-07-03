# Overview

## Project Goal

ywc-agent-toolkit-lp는 ywc-agent-toolkit(Claude Code와 Codex를 위한 42개 skill과, tool별로 서로 다른 규모의 custom agent(Claude Code 12개, Codex 7개)를 제공하는 공개 GitHub 배포 toolkit)을 처음 접하는 방문자에게 프로젝트의 가치를 빠르게 전달하고, 설치까지 이어지도록 안내하는 공개 마케팅 랜딩 페이지다. ohmyclaudecode.com과 동등한 완성도의 정보 구조(hero → problem/solution → feature → install → social proof → FAQ)를 목표로 하며, en/ja/ko/zh/es 5개 언어로 제공되어 비영어권 개발자의 진입 장벽을 낮춘다.

## Target Users

| User Type | Description |
|-----------|-------------|
| Claude Code/Codex 신규 사용자 | Claude Code 또는 Codex를 이미 사용 중이며, 생산성을 높여줄 skill/agent toolkit을 검색·비교하는 개발자. LP 방문의 대다수를 차지하는 핵심 대상 |
| ywc-agent-toolkit README 방문자 | GitHub 저장소의 README를 먼저 보고 "더 보기 쉬운 소개"를 찾아 LP로 유입되는 사용자 |
| 비영어권 개발자 | 한국어/일본어/중국어/스페인어 사용자로, 영어 문서만으로는 설치·가치 판단에 시간이 걸리는 사용자 |
| 기존 사용자 (재방문) | 이미 설치했지만 새로운 skill/agent 목록, 설치 방법 변경 등을 확인하러 재방문하는 사용자 |

## Scope

### In Scope
- 단일 페이지(1-page) 랜딩 페이지 — hero, problem/solution, feature 소개, 설치 안내, social proof, FAQ, footer 섹션
- en/ja/ko/zh/es 5개 locale 전체 번역 및 locale 전환 UI
- GitHub Pages 정적 호스팅에 적합한 순수 정적 빌드
- SEO를 위한 hreflang, Open Graph, JSON-LD 메타데이터

### Out of Scope
- 사용자 계정/로그인 — LP는 인증이 필요 없는 순수 공개 정보 페이지이므로 제외
- 블로그/변경 이력 콘텐츠 관리 — 별도 콘텐츠 관리 체계가 필요해, 향후 필요 시 별도 계획으로 분리 (docs/tech-stack.md Extras 참고)
- 실시간 GitHub star 수 API 연동 — 정적 export 환경에서 서버 없이 실시간 값을 갱신하기 어려워, 외부 배지 이미지(Shields.io) 사용으로 대체 (자세한 내용은 04-interfaces.md 참고)
- develop-with-llm 저장소의 온보딩 가이드북(guidance.md) 갱신 — 별도 프로젝트/저장소의 작업이므로 이 사양서 범위 밖

## Stakeholders

| Role | Name / Team | Interest |
|------|-------------|---------|
| 저장소 소유자/메인테이너 | yongwoon | ywc-agent-toolkit의 채택률과 신규 사용자 전환을 높이는 것이 목표 |
| ywc-agent-toolkit 기여자(잠재) | 미정 | LP를 통해 프로젝트를 발견하고 기여를 시작할 잠재 대상 |

## Constraints

- 배포 대상은 GitHub Pages이며, 서버 실행 환경이 없다 (정적 파일만 서빙 가능)
- Next.js Middleware, 서버 사이드 API Route 등 요청 시점 처리가 불가능하다 — 모든 페이지는 빌드 시점에 완성되어야 한다 (docs/tech-stack.md 참고)
- 5개 locale 모두 en.json을 원본(source of truth)으로 번역되어야 한다. en.json에 존재하는 key가 다른 locale 카탈로그에 누락된 경우, 해당 locale 페이지를 깨진 상태로 배포하는 대신 **빌드를 실패시켜** 번역 누락을 배포 전에 차단한다(빌드 타임 key-parity 검사)

