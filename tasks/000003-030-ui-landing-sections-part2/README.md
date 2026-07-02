# 000003-030-ui-landing-sections-part2

## Purpose
Landing page의 나머지 4개 section(install-steps, social-proof, faq, site-footer)을 구현하고, `[locale]/page.tsx`를 ohmyclaudecode.com 순서의 8-section 최종 구성으로 완성한다. 또한 모든 section이 조립된 시점의 인라인 스크립트를 대상으로 CSP hash-기반 script-src를 최종 계산하고, Not Found(404) 기능의 locale-aware 링크 요구사항을 충족시킨다.

## Scope
- `src/components/sections/install-steps.tsx` — 번호가 매겨진 설치 단계, `CodeBlock` primitive(COPY 버튼) per step, Claude Code/Codex 탭 구분
- `src/components/sections/social-proof.tsx` — 커뮤니티 인용구 (초기값 없을 시 미노출 또는 "Coming soon")
- `src/components/sections/faq.tsx` — `FaqItem` primitive를 조합한 단일-오픈(single-open) 아코디언 목록
- `src/components/sections/site-footer.tsx` — Product/Resources 링크 그룹, 저작권
- `src/app/[locale]/page.tsx` — 8개 section 전체를 ohmyclaudecode.com 순서로 최종 조합
- CSP hash 상수/설정 — 최종 조립된 인라인 스크립트(hydration, JSON-LD)의 sha256 hash 계산 및 `<meta http-equiv="Content-Security-Policy">` 반영

## Spec Reference

### Primary Sources
- `docs/specification/02-features.md#Install Steps` — 번호가 매겨진 설치 절차, 복사 버튼, 마켓플레이스/Codex 플러그인 설치 두 경로, 클립보드 실패 시 수동 선택 가능 상태 유지
- `docs/specification/02-features.md#Social Proof` — 최소 1개 인용구(출처 포함), 초기 버전에 인용구가 없으면 섹션 비노출 또는 "Coming soon" 처리
- `docs/specification/02-features.md#FAQ` — 최소 5개 질문-답변 쌍, "이게 무엇인가요"/"설치 요구사항"/"비용·토큰 영향" 질문 필수
- `docs/specification/02-features.md#Not Found (404)` — 정적 `404.html`이 기본 locale(en) 문구와 5개 locale 홈 링크를 제공해야 한다는 요구사항의 locale-aware 링크 부분
- `docs/specification/02-features.md#Footer` — Product 링크 그룹(Features, Install)과 Resources 링크 그룹(GitHub, CHANGELOG, Issues, License) 구분, 저작권 표기
- `docs/specification/06-requirements.md#Security` — script-src는 nonce가 아닌 hash 기반(`'sha256-<hash>'`)으로 지정해야 하며, 이는 정적 export 환경에서 모든 방문자가 동일한 사전 빌드 HTML을 받기 때문에 hash 방식이 구조적으로 적합하다는 근거
- `docs/design-system/components.md#FaqItem`, `#CodeBlock` — FaqItem의 controlled(단일-오픈) 사용 패턴, CodeBlock의 `label`/`prompt` 사용 예시(install-steps는 단계별 `label`을 도구 이름으로 지정)
- `docs/design-system/foundations.md#Iconography` — FAQ 토글은 `+`/`×` typographic glyph만 사용, 이모지·chevron 아이콘 금지

### Summary
이 task는 8-section 구성을 완성하는 마지막 UI task이므로, 페이지에 삽입되는 모든 인라인 스크립트(Next.js hydration 스크립트, JSON-LD)의 최종 내용이 이 시점에 확정된다. **Planning Advisor 노트 반영**: CSP hash 최종화는 마지막으로 페이지를 조립하는 이 task의 책임이다 — 스크립트 내용이 바뀔 때마다 hash도 바뀌므로, 모든 section이 추가되어 더 이상 인라인 스크립트 내용이 변하지 않는 시점에 sha256 hash를 계산해 `<meta http-equiv="Content-Security-Policy">`의 `script-src`에 반영한다. 또한 이 task는 `02-features.md`의 "잘못된 경로 처리(Not Found 404)" acceptance criteria 중 locale-aware 링크 부분(5개 locale 홈으로 돌아가는 링크)을 실제 404 컴포넌트에 반영한다 — 정적 `404.html` 산출물 자체의 존재 여부는 `000001-020`이 이미 다뤘으므로, 이 task는 그 안의 링크 목록을 최종 8-section 구성 및 locale 목록 기준으로 완성/검증한다.

### Out of Scope (from spec)
- Social Proof의 실제 인용구 콘텐츠 확정 — `06-requirements.md#Open Questions`에 따라 미확정. 인용구가 없으면 이 task는 섹션을 비노출하거나 "Coming soon" 상태로 렌더링하는 조건 분기까지만 구현한다

## Criticality
`normal` — 사용자 입력을 받지 않는 정적 마케팅 콘텐츠 section 및 CSP meta tag 구현

## Dependencies

### Depends On
- `000002-010-config-translation-catalogs` — `installSteps`/`socialProof`/`faq`/`footer` 카탈로그 key가 필요
- `000002-020-ui-locale-layout-seo` — `[locale]/layout.tsx` 컨텍스트가 필요
- `000003-010-ui-primitives-clipboard` — `code-block.tsx`(install-steps 명령 복사), `faq-item.tsx`(faq 아코디언)가 필요
- `000003-020-ui-landing-sections-part1` — `[locale]/page.tsx`의 초기 skeleton과 앞부분 4개 section이 먼저 merge되어 있어야 함 (동일 파일을 이어서 편집)

### Depended By
- `000005-010-config-sitemap-robots` — 최종 완성된 페이지 구조 기준으로 sitemap URL을 생성
- `000005-020-test-build-verification` — 최종 완성된 8-section 페이지를 대상으로 빌드/성능/접근성 검증

## Key Files
- `src/components/sections/install-steps.tsx`
- `src/components/sections/social-proof.tsx`
- `src/components/sections/faq.tsx`
- `src/components/sections/site-footer.tsx`
- `src/app/[locale]/page.tsx` (최종 편집)
- CSP hash 상수/설정 파일 (예: `src/lib/csp.ts` 또는 `[locale]/layout.tsx` 내 상수 — 실제 구현 시 위치 확정)

## Notes
- **Conflicts With `000003-020`**: 두 task가 동일한 `src/app/[locale]/page.tsx`를 수정하므로 병렬 실행이 금지된다. `000003-020`이 완전히 merge된 뒤에만 이 task를 시작한다.
- install-steps는 README.md의 "bash script fallback" 경로(git/bash/jq 요구)를 다루지 않는다 — 마켓플레이스 설치와 Codex 플러그인 설치 두 경로만 구현한다 (`02-features.md#Install Steps` Notes).
- FAQ의 "설치 요구사항" 답변은 이 두 경로 기준으로만 작성되어야 하며, `000002-010`이 작성한 카탈로그 문구를 그대로 렌더링하는지 확인한다.
- CSP hash 계산은 빌드 스크립트 또는 빌드 후처리 단계에서 자동화하는 것이 이상적이나, 최소 요건은 최종 인라인 스크립트 내용에 대한 sha256 hash 값을 `<meta http-equiv="Content-Security-Policy">`의 `script-src 'self' 'sha256-<hash>'`에 반영하는 것이다. `frame-ancestors`/`X-Frame-Options`는 GitHub Pages 제약상 구조적으로 적용 불가하다는 잔존 위험을 accept한다(`06-requirements.md#Security` 참고, 이 task에서 별도 mitigation을 시도하지 않는다).

## Parallel Execution Metadata

### Ownership
- `src/components/sections/install-steps.tsx`
- `src/components/sections/social-proof.tsx`
- `src/components/sections/faq.tsx`
- `src/components/sections/site-footer.tsx`
- `src/app/[locale]/page.tsx` (최종 편집)
- CSP 관련 config/상수 파일

### Shared Surfaces
- `src/app/[locale]/page.tsx` — `000003-020`이 작성한 skeleton을 이어서 편집 (Conflicts With 참고)
- `src/messages/*.json`의 `installSteps`/`socialProof`/`faq`/`footer` namespace — `000002-010` 소유 카탈로그를 read-only로 참조

### Conflicts With
- `000003-020-ui-landing-sections-part1` — 둘 다 `src/app/[locale]/page.tsx`를 수정. `000003-020`이 먼저 완전히 merge되어야 이 task가 시작 가능.

### Parallelizable After
- `000002-010-config-translation-catalogs`
- `000002-020-ui-locale-layout-seo`
- `000003-010-ui-primitives-clipboard`
- `000003-020-ui-landing-sections-part1` (merge 완료 필수)

### Task Verify
- `npx tsc --noEmit`
- `npm run build`
- `npm run lint`
- test.md의 시나리오 전체 수동 확인

## Out of Scope
- Guidebook section — Phase 000004
- sitemap.xml/robots.txt 생성 — `000005-010`
- Lighthouse/WCAG 자동 검증 실행 — `000005-020`
