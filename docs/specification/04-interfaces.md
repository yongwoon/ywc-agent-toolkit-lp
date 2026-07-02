# Interfaces

## GitHub 저장소 링크
**Purpose**: 방문자를 ywc-agent-toolkit의 실제 GitHub 저장소(README, 소스, 이슈 트래커)로 연결한다.
**Direction**: 이 사이트 → GitHub (외부로 나가는 단방향 링크)
**Triggered by**: 헤더/CTA/설치 안내/FAQ/Footer의 "GitHub" 관련 링크를 방문자가 클릭할 때
**Data exchanged**: 없음 — 단순 하이퍼링크 이동
**Error handling**: 해당 없음 (서버 간 통신이 아니므로 실패 상태가 존재하지 않음)

## GitHub Star 배지 (Shields.io)
**Purpose**: ywc-agent-toolkit 저장소의 GitHub star 수를 방문자에게 시각적으로 보여줘 신뢰도(social proof)를 높인다.
**Direction**: Shields.io → 이 사이트 (페이지 로드 시 배지 이미지를 가져옴)
**Triggered by**: 방문자가 헤더/hero 영역을 포함한 페이지를 로드할 때 브라우저가 배지 이미지를 요청
**Data exchanged**: 정적 이미지(PNG/SVG) 형태의 star 수 — 실시간 API 응답 데이터를 이 사이트가 직접 파싱하지 않는다
**Error handling**: 이미지 로드가 실패해도 대체 텍스트(alt) 또는 빈 공간으로 처리되며, 페이지의 나머지 기능에는 영향이 없다

## Open Graph 이미지
**Purpose**: 소셜 미디어(X, Slack 등)에 링크 공유 시 표시되는 미리보기 이미지를 제공한다.
**Direction**: 이 사이트 → 소셜 플랫폼 크롤러 (메타데이터 형태로 노출)
**Triggered by**: 소셜 플랫폼의 링크 미리보기 크롤러가 페이지에 접근할 때
**Data exchanged**: 정적으로 미리 준비된 이미지 파일 경로와 locale별 제목/설명 메타데이터
**Error handling**: 이미지 로드 실패 시 플랫폼별 기본 링크 미리보기(텍스트만)로 대체된다

## Clipboard API
**Purpose**: install-steps와 hero의 명령 블록에서 "복사" 버튼 클릭 시 브라우저 클립보드에 명령 텍스트를 기록한다.
**Direction**: 이 사이트 → 브라우저 Clipboard API (사용자 조작 시점에만 호출)
**Triggered by**: 방문자가 명령 블록의 복사 버튼을 클릭할 때
**Data exchanged**: 명령 텍스트 문자열 하나
**Error handling**: 비보안 컨텍스트, 권한 거부, 미지원 브라우저 등으로 복사가 실패해도 명령 텍스트는 화면에서 계속 선택 가능한 상태로 남아, 방문자가 수동으로 드래그 복사할 수 있다 — 실패가 방문자의 설치 흐름을 막지 않는다

## 백엔드 API
**Purpose**: 해당 없음
**Notes**: 이 프로젝트는 순수 정적 export이며 서버 실행 환경이 없다. 사용자 입력을 받아 처리하는 폼, 데이터베이스 연동, 인증이 필요한 API는 범위에 포함되지 않는다 (01-overview.md Out of Scope 참고).

