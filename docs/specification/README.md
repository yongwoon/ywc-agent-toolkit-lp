# ywc-agent-toolkit-lp Specification
**Last updated**: 2026-07-02
**Language**: Korean

## Sections
- [Overview](01-overview.md)
- [Features](02-features.md)
- [Data](03-data.md)
- [Interfaces](04-interfaces.md)
- [User Flows](05-user-flows.md)
- [Requirements](06-requirements.md)
- [Glossary](07-glossary.md)

## Change Log
| Date | Section | Summary |
|------|---------|---------|
| 2026-07-02 | All | Initial structure created |
| 2026-07-02 | All (--full) | docs/mission.md, docs/tech-stack.md 기반 전체 사양서 최초 작성 |
| 2026-07-02 | 01-overview, 02-features, 04-interfaces, 05-user-flows, 06-requirements | ywc-spec-validate 검증 결과(1 Critical, 6 Warning, 3 Suggestion) 반영 — Hero agent 수치 모순 수정, `/` 리다이렉트 전략 확정(localePrefix always + meta refresh + progressive JS), CSP hash 방식 전환, 404 페이지·번역 fallback·sitemap·Clipboard fallback 추가 |
| 2026-07-02 | 02-features | `docs/design-system/`(design-tokens.css, tailwind-theme.css, foundations/components/docs-page/content-voice.md) 통합 — 7개 primitive(Button/Badge/CodeBlock/Terminal/StatCard/FaqItem/LocaleSwitcher) 및 content-voice 참조 추가. 관련 `docs/tech-stack.md`, `tasks/000001-010`, `000003-010/020/030`, `000004-020`도 함께 갱신(Tailwind는 `tailwind.config.ts` 파일 기반 유지, design-tokens.css만 import) |
