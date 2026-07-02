# 000006-010-config-guidebook-i18n-ja — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000005-020-test-build-verification` is completed (merged) — "core LP + guidebook KO" 배치 전체가 검증 완료된 상태여야 한다 (명시적 hard gate)

## Allowed Edit Scope
- [ ] `src/content/guidebook/ja/**`에만 파일을 생성한다 (route/sidebar 코드는 `000004-020`이 이미 locale-parameterized로 설계했으므로 원칙적으로 수정 불필요 — 수정이 필요하면 아래 Stop Conditions 참고)
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] `000005-020`이 merge되지 않았으면 멈춘다
- [ ] guidebook route가 `ja` locale의 콘텐츠 디렉터리를 인식하지 못하는 구조적 문제가 발견되면(코드 수정이 불가피하면) 멈추고 이는 이 task의 Ownership을 벗어나는 변경임을 보고한다
- [ ] `000006-020`/`000006-030`/`000006-040`이 동시에 route 코드를 수정하려는 정황이 발견되면 멈추고 조율한다

## Implementation Steps
- [ ] **번역 대상 목록 확정**
  - [ ] `src/content/guidebook/ko/`의 실제 파일 목록을 확인 (착수 시점 기준)
- [ ] **ja 번역 작성**
  - [ ] 각 ko markdown 파일을 `src/content/guidebook/ja/`에 동일 파일명으로 번역 배치, frontmatter(title 등)도 번역
  - [ ] 기술 용어(Skill/Agent명, 커맨드 예시)는 원문 유지
- [ ] **route 동작 확인**
  - [ ] `/ja/guidebook/<slug>`로 접근 시 번역된 콘텐츠가 렌더링되는지 확인 (route 코드 수정 없이 콘텐츠 디렉터리 추가만으로 동작하는지가 핵심 검증 포인트)

## Task Verify
- [ ] `npm run build` — `/ja/guidebook/*` 페이지 생성 확인
- [ ] ko/ja 파일 목록 1:1 대조

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 정적 콘텐츠)
- [ ] integration tests pass (해당 없음)
- [ ] app builds without error (`npm run build`)
