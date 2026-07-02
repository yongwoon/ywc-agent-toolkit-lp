# Data

> 이 프로젝트는 데이터베이스나 영속 스키마를 갖지 않는 순수 정적 페이지다. 아래 "엔티티"는 DB 모델이 아니라, 5개 locale 각각에 대해 반복되는 **콘텐츠 모델**(번역 카탈로그가 담아야 하는 구조)을 의미한다.

## Locale Message Catalog
**What it represents**: 하나의 locale(en/ja/ko/zh/es)에 대응하는 전체 화면 문구 묶음. 페이지의 모든 텍스트 콘텐츠 엔티티는 이 카탈로그 하나에 속한다.

**Key attributes**:
- Locale Code: 해당 카탈로그가 속한 언어 (en, ja, ko, zh, es 중 하나)
- Section Keys: Hero Content, Feature Item, Install Step 등 아래 엔티티들을 담는 최상위 구획

**Relationships**:
- 포함 관계로 아래 모든 콘텐츠 엔티티(Hero Content, Feature Item, Install Step, FAQ Item, Social Proof Quote, Navigation Link, SEO Metadata)를 담는다

## Hero Content
**What it represents**: 페이지 최상단에 노출되는 헤드라인, 서브헤딩, CTA 문구, CLI 데모 텍스트

**Key attributes**:
- Headline: 프로젝트의 핵심 가치를 한 문장으로 요약한 제목
- Subheading: 구체적 효익(생산성 향상 등)을 보완 설명하는 문장
- CTA Label: "Install", "Star on GitHub" 등 행동 유도 버튼 문구
- Demo Command: hero에 표시되는 예시 CLI 명령 텍스트

**Relationships**:
- Locale Message Catalog에 속함

## Feature Item
**What it represents**: feature-grid 섹션에 나열되는 개별 기능/통계 카드 하나 (예: "41개 skill", "12개 agent")

**Key attributes**:
- Label: 기능 또는 통계 이름
- Value: 강조 수치 또는 짧은 설명
- Description: 부연 설명 한두 문장

**Relationships**:
- Locale Message Catalog에 속함
- 여러 Feature Item이 모여 하나의 feature-grid 섹션을 구성

## Install Step
**What it represents**: install-steps 섹션에 번호가 매겨져 나열되는 설치 안내 한 단계

**Key attributes**:
- Step Number: 순서
- Instruction: 해당 단계에서 사용자가 무엇을 해야 하는지 설명
- Command Text: 복사 가능한 설치 명령 텍스트

**Relationships**:
- Locale Message Catalog에 속함
- 순서가 있는 목록으로 여러 Install Step이 install-steps 섹션을 구성

## FAQ Item
**What it represents**: faq 섹션의 질문-답변 한 쌍

**Key attributes**:
- Question: 자주 묻는 질문 문구
- Answer: 답변 본문

**Relationships**:
- Locale Message Catalog에 속함

## Social Proof Quote
**What it represents**: 커뮤니티/외부 필자의 인용구 한 건

**Key attributes**:
- Quote Text: 인용 문구 본문
- Source Name: 인용 출처(필자/매체명)
- Source Link: 원문 링크 (외부 URL)

**Relationships**:
- Locale Message Catalog에 속함

## Navigation Link
**What it represents**: 헤더/푸터에 노출되는 내비게이션 링크 한 항목 (예: "Features", "FAQ", GitHub 저장소 링크)

**Key attributes**:
- Label: 링크에 표시되는 텍스트
- Target: 이동 대상 (같은 페이지 내 섹션 앵커 또는 외부 URL)

**Relationships**:
- Locale Message Catalog에 속함

## SEO Metadata
**What it represents**: 검색엔진/소셜 공유를 위한 페이지 메타데이터 한 세트 (locale별로 별도 값을 가짐)

**Key attributes**:
- Title / Description: 검색결과·소셜 카드에 노출되는 제목과 설명
- Hreflang Alternates: 다른 locale 페이지로의 상호 참조 목록
- Open Graph Image Reference: 소셜 공유 카드에 쓰일 이미지 경로

**Relationships**:
- Locale Message Catalog와 1:1 대응 (locale마다 하나씩 존재)

