# 000005-020-test-build-verification

## Purpose
정적 export 빌드 전체를 `docs/specification/06-requirements.md`의 NFR 예산(JS/CSS 번들, Core Web Vitals, WCAG 2.2 AA)에 대해 검증하고, 5개 LP locale + guidebook KO 페이지가 번역 key 누락 없이 모두 정상 빌드되는지 확인하는 build-fail-on-missing-key 검사를 구현·실행한다.

## Scope
- JS 번들(gzip) < 150kb, CSS < 30kb 예산 검증
- Core Web Vitals(LCP < 2.5s, INP < 200ms, CLS < 0.1, FCP < 1.5s, TBT < 200ms) Lighthouse 검증
- WCAG 2.2 AA 접근성 검증 (320/768/1024/1440 breakpoint)
- 5개 locale 페이지 + guidebook KO 페이지 전체 빌드 성공 확인
- 빌드 타임 key-parity 검사(en.json 기준 누락 key 시 빌드 실패) 스크립트 구현

## Spec Reference

### Primary Sources
- `docs/specification/06-requirements.md#Performance` — JS 번들(gzip) < 150kb, CSS < 30kb, LCP < 2.5s, INP < 200ms, CLS < 0.1, FCP < 1.5s, TBT < 200ms
- `docs/specification/06-requirements.md#Accessibility` — WCAG 2.2 AA 기준(키보드 내비게이션, 색상 대비, reduced-motion 대응), 320/768/1024/1440 breakpoint에서 레이아웃 깨짐 없음
- `docs/specification/01-overview.md#Constraints` — en.json에 존재하는 key가 다른 locale 카탈로그에 누락된 경우 빌드를 실패시켜야 한다는 build-fail-on-missing-key 요구사항
- `docs/specification/06-requirements.md#Existing Constraints Touched` — Core Web Vitals/번들 예산은 `~/.claude/rules/web/performance.md`의 "Landing page"급 기준, 접근성 기준은 `~/.claude/rules/web/testing.md`에서 채택했다는 근거

### Summary
이 task는 Phase 000001~000004에서 만들어진 모든 산출물(LP 8-section + guidebook KO)을 대상으로 하는 최종 통합 검증이다. 번들 예산과 Core Web Vitals는 Lighthouse(또는 Lighthouse CI)로 측정하고, WCAG 2.2 AA는 자동화 접근성 검사 도구(예: axe-core)와 4개 breakpoint에서의 수동/스크린샷 검증을 병행한다. build-fail-on-missing-key 검사는 `000002-010`이 작성한 5개 카탈로그를 대상으로, en.json의 모든 key가 ja/ko/zh/es.json에도 존재하는지 빌드 스크립트 단계에서 자동으로 비교하고, 하나라도 누락되면 0이 아닌 exit code로 빌드를 실패시킨다.

### Out of Scope (from spec)
- `(None — spec has no deferred items)`

## Criticality
`normal` — 검증/테스트 스크립트 작업이며 프로덕션 런타임 코드를 변경하지 않음

## Dependencies

### Depends On
- `000003-030-ui-landing-sections-part2` — LP 최종 8-section 구성이 완료되어야 검증 대상이 존재
- `000004-030-config-guidebook-content-sync` — guidebook KO 페이지가 완료되어야 검증 대상이 존재
- `000005-010-config-sitemap-robots` — sitemap/robots까지 포함된 최종 빌드 산출물을 검증 대상으로 함

### Depended By
- `(None — "core LP + guidebook KO" 배치의 마지막 task)`

## Key Files
- `test/build-verification/**` (Lighthouse CI 설정 또는 동등 스크립트)
- key-parity 검사 스크립트 (예: `scripts/check-message-keys.mjs`, `package.json`의 build script에 연결)

## Notes
- 이 task는 `src/`를 직접 수정하지 않는다 — 검증 과정에서 NFR 위반이 발견되면(예: 번들 초과, WCAG 위반) 해당 원인이 된 task의 Ownership 범위로 되돌려 별도 수정 작업으로 처리하고, 이 task 자체는 검증 스크립트/설정만 소유한다.
- key-parity 검사는 `npm run build`의 pre-build 단계(또는 별도 `npm run check:i18n` 스크립트로 CI에 연결)에서 실행되어야 하며, 실패 시 명확한 에러 메시지(어떤 locale의 어떤 key가 누락되었는지)를 출력해야 한다.
- Lighthouse 측정은 로컬 정적 서버(`npx serve out` 등)를 대상으로 실행하며, 실제 GitHub Pages 배포 환경과 100% 동일하지 않을 수 있음을 감안한다.

## Parallel Execution Metadata

### Ownership
- `test/**`
- 검증/key-parity 스크립트 (`src/`를 직접 수정하지 않음)

### Shared Surfaces
- `(None identified)` — 검증 전용이므로 다른 task의 파일을 수정하지 않음

### Conflicts With
- `(None identified)`

### Parallelizable After
- `000003-030-ui-landing-sections-part2`
- `000004-030-config-guidebook-content-sync`
- `000005-010-config-sitemap-robots`

### Task Verify
- `npm run build` (key-parity 검사 포함)
- Lighthouse CI 실행 (JS/CSS 번들, Core Web Vitals 예산 확인)
- axe-core 등 자동 접근성 검사 실행
- test.md의 4개 breakpoint 수동 시나리오 확인

## Out of Scope
- NFR 위반 발견 시 실제 코드 수정 — 해당 원인 task의 책임 (이 task는 발견/보고만 수행)
- Phase 000006(guidebook locale 확장)의 검증 — 이 task는 "core LP + guidebook KO" 배치까지만 다룸
