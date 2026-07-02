# 000002-020-ui-locale-layout-seo

## Purpose
`src/app/[locale]/layout.tsx`를 구현해 next-intl `NextIntlClientProvider`, `generateStaticParams`(5개 locale 빌드 타임 사전 렌더링), `<html lang>`, canonical per-locale hreflang alternates를 완성하고, `src/lib/seo.ts`로 Metadata + JSON-LD(WebSite/SoftwareApplication) 빌더를 구현한다.

## Scope
- `src/app/[locale]/layout.tsx` — `generateStaticParams`로 5개 locale 전체를 빌드 타임에 사전 렌더링, `NextIntlClientProvider`로 카탈로그 주입, `<html lang="{locale}">` 설정
- 각 locale 페이지의 canonical hreflang alternates(다른 4개 locale로의 상호 참조)
- `src/lib/seo.ts` — locale별 `Metadata` 객체 생성 함수 + JSON-LD(WebSite, SoftwareApplication) 빌더

## Spec Reference

### Primary Sources
- `docs/tech-stack.md#src/app/[locale]/` — `generateStaticParams` 기반 빌드 타임 사전 렌더링이 static export에서 middleware 없이 5-locale을 지원하는 유일한 방법이라는 설계 근거
- `docs/specification/06-requirements.md#SEO` — 5개 locale 각각 hreflang alternate 태그가 서로를 참조해야 하고, locale에 맞는 title/description과 JSON-LD(WebSite/SoftwareApplication)를 포함해야 한다는 요구사항
- `docs/specification/03-data.md#SEO Metadata` — Title/Description, Hreflang Alternates, Open Graph Image Reference 속성이 Locale Message Catalog와 1:1 대응한다는 데이터 모델
- `docs/specification/02-features.md#Locale 전환` — locale 전환 시 현재 보고 있던 섹션 위치가 유지되어야 한다는 요구사항 (레이아웃 레벨에서 페이지 재마운트 없이 처리)
- `docs/mission.md#Rejected Approaches` — RA003(middleware.ts 기반 negotiation 대신 `generateStaticParams` 채택)

### Summary
`[locale]/layout.tsx`는 `generateStaticParams()`가 `routing.ts`의 5개 locale을 순회하며 반환값을 만들어, 빌드 타임에 `/en/`, `/ja/`, `/ko/`, `/zh/`, `/es/` 각각의 정적 HTML을 생성하게 한다. 레이아웃은 `NextIntlClientProvider`로 해당 locale의 메시지 카탈로그(`000002-010`에서 작성)를 하위 컴포넌트에 주입하고, `<html lang="{locale}">`을 설정하며, `src/lib/seo.ts`가 생성하는 `Metadata`(canonical hreflang alternates 포함)와 JSON-LD를 `<head>`에 반영한다. 이 hreflang은 `000001-020`의 루트 stub이 다루는 no-JS fallback용 hreflang과 별개로, 실제 locale 페이지 간의 canonical 상호 참조를 구현하는 것이며 `src/i18n/locale-list.ts`(000001-020에서 추출된 shared constant)를 재사용해 locale 목록이 두 곳에서 drift하지 않도록 한다.

### Out of Scope (from spec)
- sitemap.xml/robots.txt 생성 — `000005-010-config-sitemap-robots`에서 처리 (이 task는 페이지 레벨 hreflang/Metadata/JSON-LD까지만 다룸)
- 실제 section 콘텐츠 렌더링(hero, feature 등) — Phase 000003의 책임. 이 task는 `[locale]/page.tsx`의 뼈대가 아니라 `[locale]/layout.tsx`만 다룬다

## Criticality
`normal` — 인증/민감 데이터가 없는 SEO metadata 및 locale layout 구현

## Dependencies

### Depends On
- `000001-010-lib-nextjs-i18n-setup` — `src/i18n/routing.ts`, `request.ts`, root `layout.tsx`가 필요
- `000001-020-ui-root-redirect-404` — `src/i18n/locale-list.ts`(shared locale-list constant)가 필요
- `000002-010-config-translation-catalogs` — SEO Metadata 카탈로그 entry(title/description/OG image reference)가 필요

### Depended By
- `000003-020-ui-landing-sections-part1` — `[locale]/layout.tsx`가 제공하는 `NextIntlClientProvider` 컨텍스트 위에서 section 컴포넌트가 `useTranslations`를 사용
- `000003-030-ui-landing-sections-part2` — 동일하게 layout이 제공하는 locale 컨텍스트에 의존

## Key Files
- `src/app/[locale]/layout.tsx`
- `src/lib/seo.ts`

## Notes
- `generateStaticParams`가 반환하는 locale 배열은 `src/i18n/routing.ts`의 `locales`를 직접 참조해, locale 목록이 두 곳(routing.ts와 layout.tsx)에서 서로 다른 값으로 drift하지 않도록 한다.
- JSON-LD 스크립트는 `<script type="application/ld+json">` 인라인으로 삽입되므로, 이 스크립트의 최종 내용은 Phase 000003 완료 후 CSP hash 계산 대상에 포함된다(`000003-030`의 Notes 참고) — 이 task는 JSON-LD 내용을 확정하되, hash 값 자체의 최종 계산은 하지 않는다.
- next-intl 훅(`useTranslations`)은 가능한 한 서버 컴포넌트에서만 사용해 클라이언트 번들에 번역 런타임이 포함되는 것을 최소화한다 (`06-requirements.md#Performance` 참고) — `NextIntlClientProvider`는 클라이언트 경계에 필요한 최소 메시지만 전달하도록 설계한다.

## Parallel Execution Metadata

### Ownership
- `src/app/[locale]/layout.tsx`
- `src/lib/seo.ts`

### Shared Surfaces
- `src/i18n/locale-list.ts` — `000001-020`이 소유한 constant를 read-only로 참조
- `src/messages/*.json`의 `seo` key — `000002-010`이 소유한 카탈로그의 특정 namespace를 참조

### Conflicts With
- `(None identified)` — Phase 000002 내 다른 task와 파일 단위 Ownership이 겹치지 않음

### Parallelizable After
- `000001-010-lib-nextjs-i18n-setup`
- `000001-020-ui-root-redirect-404`
- `000002-010-config-translation-catalogs`

### Task Verify
- `npx tsc --noEmit`
- `npm run build` — 5개 locale 각각의 정적 페이지(`/en/`, `/ja/`, `/ko/`, `/zh/`, `/es/`)가 실제로 생성되는지 확인
- 빌드 산출물의 각 locale HTML `<head>`에서 5개 locale 전체를 참조하는 hreflang alternate 태그와 JSON-LD 스크립트가 존재하는지 수동 확인

## Out of Scope
- sitemap.xml, robots.txt — `000005-010`의 책임
- section 컴포넌트, `[locale]/page.tsx`의 콘텐츠 조합 — Phase 000003의 책임
- CSP hash 최종 계산 — `000003-030`의 책임
