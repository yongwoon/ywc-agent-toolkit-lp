# 000003-030-ui-landing-sections-part2 — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000002-010-config-translation-catalogs` is completed (merged)
- [ ] `000002-020-ui-locale-layout-seo` is completed (merged)
- [ ] `000003-010-ui-primitives-clipboard` is completed (merged)
- [ ] `000003-020-ui-landing-sections-part1` is completed (merged) — `src/app/[locale]/page.tsx`의 초기 skeleton과 앞부분 4개 section 필요

## Allowed Edit Scope
- [ ] `src/components/sections/install-steps.tsx`, `social-proof.tsx`, `faq.tsx`, `site-footer.tsx`, `src/app/[locale]/page.tsx`, CSP 관련 config에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] `000003-020`이 merge되지 않았으면 멈춘다 (동일 파일 충돌 방지)
- [ ] FAQ의 "설치 요구사항" 답변에 README.md의 bash script fallback 요구사항(git/bash/jq)이 섞여 들어가면 멈추고 수정한다
- [ ] Social Proof 인용구 콘텐츠가 아직 확정되지 않은 상태에서 임의의 인용구를 만들어 넣게 되면 멈춘다 — 대신 빈 상태/미노출 처리로 대체한다

## Implementation Steps
- [ ] **`install-steps.tsx` 구현**
  - [ ] `useTranslations('installSteps')`로 번호가 매겨진 단계 렌더링
  - [ ] 각 단계의 명령 블록에 `code-block.tsx` 재사용 (복사 버튼 포함)
  - [ ] 마켓플레이스 설치, Codex 플러그인 설치 두 경로를 탭 또는 병렬 컬럼으로 구분
  - [ ] `id="install"` 앵커 부여
- [ ] **`social-proof.tsx` 구현**
  - [ ] 인용구 배열이 비어있으면 섹션을 렌더링하지 않거나 "Coming soon" 상태로 렌더링하는 조건 분기 구현
  - [ ] 인용구가 있는 경우 출처명과 원문 링크 표시
- [ ] **`faq.tsx` 구현**
  - [ ] `useTranslations('faq')`로 최소 5개 질문-답변 쌍을 아코디언으로 렌더링 (키보드 접근 가능하도록 `<details>`/`<summary>` 또는 동등 ARIA 패턴 사용)
  - [ ] `id="faq"` 앵커 부여
- [ ] **`site-footer.tsx` 구현**
  - [ ] Product 링크 그룹(Features, Install), Resources 링크 그룹(GitHub, CHANGELOG, Issues, License) 렌더링
  - [ ] 저작권 문구 렌더링
- [ ] **`[locale]/page.tsx` 최종 조합**
  - [ ] `000003-020`이 작성한 skeleton 뒤에 install-steps → social-proof → faq → site-footer를 추가해 8-section 최종 순서 완성
  - [ ] 404 컴포넌트(`000001-020`이 만든 `not-found.tsx`)의 locale 홈 링크 목록이 5개 locale 전체를 포함하는지 재확인/보완
- [ ] **CSP hash 최종화**
  - [ ] 빌드된 최종 HTML의 인라인 스크립트(hydration + JSON-LD) 내용에 대해 sha256 hash 계산
  - [ ] `<meta http-equiv="Content-Security-Policy">`의 `script-src 'self' 'sha256-<hash>'`에 반영

## Task Verify
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] 브라우저 콘솔에서 CSP 위반(Refused to execute inline script) 오류가 없는지 확인
- [ ] test.md 전체 시나리오 수동 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — test.md의 수동 시나리오로 대체)
- [ ] integration tests pass (test.md 참고)
- [ ] app builds without error (`npm run build`)
