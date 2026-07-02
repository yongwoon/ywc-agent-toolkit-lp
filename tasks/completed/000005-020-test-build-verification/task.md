# 000005-020-test-build-verification — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000003-030-ui-landing-sections-part2` is completed (merged)
- [ ] `000004-030-config-guidebook-content-sync` is completed (merged)
- [ ] `000005-010-config-sitemap-robots` is completed (merged)

## Allowed Edit Scope
- [ ] `test/**`, key-parity 검사 스크립트에만 파일을 생성/수정한다 (`package.json`의 script 필드에 실행 커맨드 추가는 허용, 그 외 필드는 수정하지 않음)
- [ ] `src/` 내부 코드 수정이 필요하면(NFR 위반 수정) 진행을 멈추고 원인 task로 보고한다

## Stop Conditions
- [ ] 선행 task가 merge되지 않았으면 멈춘다
- [ ] 검증 도중 NFR 위반(번들 초과, Core Web Vitals 미달, WCAG 위반)이 발견되면 이 task 내에서 직접 수정하지 않고 원인이 된 section/task를 특정해 보고한다
- [ ] key-parity 검사에서 실제 key 누락이 발견되면(`000002-010` 산출물 문제) 해당 task로 보고하고 이 task는 검사 스크립트 자체의 정확성만 검증한다

## Implementation Steps
- [ ] **key-parity 검사 스크립트 구현**
  - [ ] `src/messages/en.json`의 전체 key(중첩 포함)를 추출해, ja/ko/zh/es.json 각각과 대조하는 Node 스크립트 작성
  - [ ] 누락된 key가 있으면 어떤 locale의 어떤 key가 없는지 출력하고 0이 아닌 exit code로 종료
  - [ ] `package.json`의 build script에 이 스크립트를 pre-build 단계로 연결
- [ ] **번들 예산 검증**
  - [ ] `npm run build` 산출물의 JS/CSS 번들 크기(gzip 기준)를 측정하는 스크립트 또는 Lighthouse 리포트로 확인
  - [ ] JS < 150kb, CSS < 30kb 기준과 대조
- [ ] **Core Web Vitals 검증**
  - [ ] Lighthouse(또는 Lighthouse CI)로 `/en/` 등 대표 페이지의 LCP/INP/CLS/FCP/TBT 측정
  - [ ] 기준값(LCP<2.5s, INP<200ms, CLS<0.1, FCP<1.5s, TBT<200ms)과 대조
- [ ] **접근성 검증**
  - [ ] axe-core(또는 동등 도구)로 자동 접근성 검사 실행
  - [ ] 320/768/1024/1440 breakpoint에서 레이아웃 깨짐 여부 수동/스크린샷 확인
- [ ] **전체 빌드 성공 확인**
  - [ ] `npm run build`로 5개 LP locale 페이지 + guidebook KO 페이지가 모두 오류 없이 생성되는지 확인

## Task Verify
- [ ] `npm run build` (key-parity 검사 포함, 성공)
- [ ] Lighthouse 리포트에서 번들/CWV 기준 통과 확인
- [ ] axe-core 리포트에서 심각도 High 이상 위반 0건 확인
- [ ] test.md 4개 breakpoint 시나리오 통과

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (key-parity 스크립트 자체의 동작 확인으로 대체)
- [ ] integration tests pass (test.md 참고)
- [ ] app builds without error (`npm run build`)
