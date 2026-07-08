# User Flows

## 신규 방문자의 발견-설치 여정
**Actor**: Claude Code/Codex를 사용 중이며 생산성 도구를 찾는 신규 방문자
**Trigger**: 검색엔진, SNS, 또는 커뮤니티 글에서 LP 링크를 클릭

**Steps**:
1. 방문자가 hero 섹션에서 핵심 가치 제안을 읽는다
2. System이 problem/solution 섹션에서 현재 워크플로우와의 차이를 보여준다
3. 방문자가 feature-grid에서 tool별 skill/agent 규모(Claude Code 46개/13개, Codex 46개/8개)를 확인한다
4. 방문자가 install-steps로 스크롤해 자신의 도구(Claude Code 또는 Codex)에 해당하는 명령을 복사한다
5. 방문자가 터미널에서 명령을 실행해 설치를 완료한다

**Outcome**: 방문자가 자신의 로컬 환경에 ywc-agent-toolkit을 설치한다.

**Alternate paths**:
- 설치 전 확신이 필요하면: FAQ 섹션으로 이동해 요구사항/비용 관련 질문을 확인한 뒤 install-steps로 돌아온다
- 더 깊은 정보가 필요하면: GitHub 저장소 링크를 클릭해 README 전체를 읽는다

## 비영어권 방문자의 locale 전환
**Actor**: 영어가 편하지 않은 방문자
**Trigger**: 페이지가 기본 locale(영어)로 로드된 것을 인지

**Steps**:
1. 방문자가 헤더의 locale 전환 UI를 클릭한다
2. System이 지원되는 5개 locale(en/ja/ko/zh/es) 목록을 보여준다
3. 방문자가 자신의 언어를 선택한다
4. System이 같은 섹션 위치를 유지한 채 선택한 locale 페이지로 이동한다

**Outcome**: 방문자가 자신의 언어로 번역된 페이지에서 계속 탐색한다.

**Alternate paths**:
- 원하는 locale이 목록에 없으면: 방문자는 기본(영어) 페이지를 계속 이용한다

## 기존 사용자의 재방문 확인
**Actor**: 이미 ywc-agent-toolkit을 설치한 기존 사용자
**Trigger**: 새로운 skill/agent가 추가되었다는 소식(예: 커뮤니티 공지)을 접함

**Steps**:
1. 사용자가 LP를 재방문한다
2. System이 feature-grid의 최신 skill/agent 수치를 보여준다
3. 사용자가 GitHub 저장소 링크를 클릭해 CHANGELOG를 확인한다

**Outcome**: 사용자가 업데이트 여부를 판단하고 필요 시 재설치/업데이트 명령을 확인한다.

**Alternate paths**:
- 없음 (단순 정보 확인 흐름)

## 설치 전 의구심 해소
**Actor**: 설치를 망설이는 방문자
**Trigger**: hero/feature 섹션을 봤지만 확신이 부족한 상태

**Steps**:
1. 방문자가 FAQ 섹션으로 스크롤한다
2. 방문자가 관심 있는 질문(요구사항, 비용/토큰 영향 등)을 펼쳐본다
3. System이 아코디언 형태로 답변을 펼쳐 보여준다

**Outcome**: 방문자의 남은 의구심이 해소되어 install-steps로 이동하거나, 페이지를 이탈한다.

**Alternate paths**:
- 원하는 답을 찾지 못하면: GitHub Issues 링크(Footer)를 통해 직접 질문한다

