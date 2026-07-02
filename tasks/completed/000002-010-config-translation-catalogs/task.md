# 000002-010-config-translation-catalogs — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000001-010-lib-nextjs-i18n-setup` is completed (merged) — `src/i18n/request.ts`의 로드 경로 규칙(`src/messages/<locale>.json`)이 확정되어 있어야 한다

## Allowed Edit Scope
- [ ] `src/messages/*.json`에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정(예: section 컴포넌트)이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] `docs/specification/03-data.md`에 정의되지 않은 새로운 콘텐츠 엔티티가 필요해지면 멈추고 spec 갱신 필요 여부를 보고한다
- [ ] Hero와 Feature Grid 간 agent 수치 표현이 서로 모순되는 문구가 만들어지면 멈추고 재검토한다 (`02-features.md#Hero` Notes 참고)
- [ ] en.json과 다른 locale 간 key 구조가 어긋나면(번역 과정에서 key를 추가/삭제하게 되면) 멈추고 en.json을 기준으로 재정렬한다

## Implementation Steps
- [ ] **en.json 작성 (source of truth)**
  - [ ] `nav` — Navigation Link 목록 (Features, Install, FAQ, GitHub 등)
  - [ ] `hero` — headline(agent 수 미명시, "expert agents" 등 tool-무관 표현), subheading, ctaLabels(Install/Star on GitHub), demoCommand
  - [ ] `problemSolution` — before/after 각 컬럼당 최소 3개 항목
  - [ ] `featureGrid` — Claude Code(41 skill/12 agent), Codex(41 skill/7 agent) Feature Item 배열, 각 item에 label/value/description
  - [ ] `installSteps` — 번호가 매겨진 단계 배열(instruction, commandText), 마켓플레이스 설치·Codex 플러그인 설치 두 경로
  - [ ] `socialProof` — quote 배열 (quoteText/sourceName/sourceLink), 초기값은 빈 배열 또는 "Coming soon" placeholder
  - [ ] `faq` — 최소 5개 question/answer 쌍, "이게 무엇인가요"/"설치 요구사항"/"비용·토큰 영향" 질문 필수 포함, 설치 요구사항 답변은 마켓플레이스/플러그인 경로 기준으로만 작성
  - [ ] `footer` — Product 링크 그룹(Features, Install), Resources 링크 그룹(GitHub, CHANGELOG, Issues, License), 저작권 문구
  - [ ] `seo` — locale별 title/description, ogImage reference
- [ ] **ja.json / ko.json / zh.json / es.json 번역**
  - [ ] en.json의 key 구조를 그대로 유지한 채 값만 번역 (기술 용어는 원문 유지)
  - [ ] 각 언어 파일의 key 집합이 en.json과 완전히 일치하는지 대조

## Task Verify
- [ ] `node -e "JSON.parse(require('fs').readFileSync('src/messages/en.json','utf8'))"` (ja/ko/zh/es도 동일하게) — valid JSON 확인
- [ ] key-parity 수동 대조 (5개 파일의 top-level 및 nested key 집합 비교)

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 데이터 파일)
- [ ] integration tests pass (해당 없음 — Phase 000005 빌드 검증에서 key-parity 자동 검사로 흡수)
- [ ] app builds without error (`npm run build`)
