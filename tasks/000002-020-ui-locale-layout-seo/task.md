# 000002-020-ui-locale-layout-seo — Implementation Checklist

## Prerequisites
Verify these before starting:
- [ ] `000001-010-lib-nextjs-i18n-setup` is completed (merged)
- [ ] `000001-020-ui-root-redirect-404` is completed (merged) — `src/i18n/locale-list.ts` 존재
- [ ] `000002-010-config-translation-catalogs` is completed (merged) — `src/messages/*.json`의 `seo` key 존재

## Allowed Edit Scope
- [ ] `src/app/[locale]/layout.tsx`, `src/lib/seo.ts`에만 파일을 생성/수정한다
- [ ] Ownership 범위를 벗어나는 수정이 필요하면 진행을 멈추고 보고한다

## Stop Conditions
- [ ] 선행 task 중 하나라도 merge되지 않았으면 멈춘다
- [ ] `src/messages/en.json`에 `seo` namespace가 없으면 멈추고 `000002-010`과 조율한다
- [ ] `generateStaticParams`가 5개 locale이 아닌 다른 값을 반환하게 되면(예: routing.ts와 불일치) 멈추고 원인을 확인한다

## Implementation Steps
- [ ] **`src/lib/seo.ts` 구현**
  - [ ] locale을 인자로 받아 Next.js `Metadata` 객체(title, description, hreflang alternates)를 반환하는 함수 작성
  - [ ] hreflang alternates는 `src/i18n/locale-list.ts`를 순회해 5개 locale 전체(자기 자신 포함)를 참조하도록 생성
  - [ ] JSON-LD(WebSite, SoftwareApplication) 객체를 생성하는 함수 작성 — `src/messages/<locale>.json`의 `seo` namespace 값을 사용
- [ ] **`src/app/[locale]/layout.tsx` 구현**
  - [ ] `generateStaticParams()` — `routing.ts`의 `locales`를 매핑해 `[{ locale: 'en' }, { locale: 'ja' }, ...]` 반환
  - [ ] `generateMetadata({ params })` — `seo.ts`의 Metadata 생성 함수 호출
  - [ ] `<html lang={locale}>` 설정, `NextIntlClientProvider`로 해당 locale 메시지 주입
  - [ ] `<head>`에 JSON-LD `<script type="application/ld+json">` 삽입
- [ ] **동작 확인**
  - [ ] `npm run build` 후 5개 locale 정적 페이지가 모두 생성되는지 확인
  - [ ] 각 locale HTML의 `<head>`에서 hreflang alternate 5개(자기 자신 포함)와 JSON-LD 스크립트를 육안 확인

## Task Verify
- [ ] `npx tsc --noEmit`
- [ ] `npm run build` — `/en/index.html`, `/ja/index.html`, `/ko/index.html`, `/zh/index.html`, `/es/index.html` 산출물 존재 확인
- [ ] 각 산출물의 `<head>`에 5개 hreflang alternate + JSON-LD가 포함되어 있는지 수동 확인

## Verification
- [ ] lint passes (`npm run lint`)
- [ ] typecheck passes (`npx tsc --noEmit`)
- [ ] unit tests pass (해당 없음 — 이 task 단계에서는 section 콘텐츠가 없어 렌더링 스냅샷 테스트 대상이 제한적, Phase 000005에서 통합 검증)
- [ ] integration tests pass (해당 없음 — `000005-020`에서 흡수)
- [ ] app builds without error (`npm run build`)
