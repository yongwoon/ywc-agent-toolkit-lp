# 000017-010-config-verify-upstream-infra-page-content

## Purpose
새 Guidebook 페이지(`17-infrastructure-and-cloud`)를 작성하기 전에, upstream `ywc-agent-toolkit` PR #131의 현재 merge 상태를 재확인하고, 4개 신규 skill(`ywc-infra-design`, `ywc-iac-author`, `ywc-infra-review`, `ywc-infra-optimize`)의 실제 `SKILL.md`를 재독해 정확한 커맨드 문법/옵션/트리거 문구를 확보한다. 이 task의 결과물(재확인 노트)이 `000018-010`의 `<ToolTabs>` 예제 작성 근거가 된다.

## Scope
- `gh pr view 131 --repo yongwoon/ywc-agent-toolkit --json state,mergedAt,headRefOid` 실행하여 현재 merge 상태 재확인
- merge 여부와 무관하게(이 스펙은 형제 스펙과 달리 PR merge가 하드 블로커가 아님), 다음 4개 파일을 PR의 최신 상태(머지되었으면 `main`, 아니면 PR 브랜치)에서 읽어 커맨드 문법/옵션/설명을 정리:
  - `claude-code/skills/ywc-infra-design/SKILL.md`
  - `claude-code/skills/ywc-iac-author/SKILL.md`
  - `claude-code/skills/ywc-infra-review/SKILL.md`
  - `claude-code/skills/ywc-infra-optimize/SKILL.md`
  - (Codex 대응 skill이 `codex/skills/` 아래 동일 이름으로 존재하면 함께 확인 — 새 페이지의 `<ToolTabsPanel tool="codex">` 예제 근거)
- `ywc-cloud-engineer` agent와 `ywc-security-engineer`/`ywc-performance-engineer` lens 확장 여부를 간단히 확인(프로세 문구에만 인용되므로 상세 스펙까지는 불필요)
- 재확인 결과를 `docs/ywc-plans/guidebook-infra-cloud-page-pr131.verification.md`에 기록

## Spec Reference

### Primary Sources
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.md` — `### FR-1`, `## Dependencies`, `## Edge Cases`(첫 항목), `## Iteration 1 Amendments` → A8(FR-1에 추가된 observable: PR head SHA/merge state 기록)

### Summary
FR-1은 "must run first"로 명시되어 있으며, 이 스펙은 형제 스펙(`sync-skill-count-infra-suite-pr131.md`)과 달리 PR merge를 하드 블로커로 두지 않는다(`## Dependencies`: "Soft dependency, not a hard blocker" — skill 이름/인터페이스가 in-flight diff에서도 안정적이라는 판단). 따라서 이 task는 merge 여부와 무관하게 다음 task(`000018-010`)로 진행을 허용하되, 실제 커맨드 예제의 정확성을 위해 반드시 각 skill의 `SKILL.md`를 직접 읽어 문법을 소싱해야 한다 — 이 Guidebook 자체의 소싱 정책(`README.md`의 "Source material": "All command syntax and options in this Guidebook were verified against each Skill's SKILL.md")을 준수하기 위함이다. A8 amendment는 관찰 가능성을 위해 PR head SHA 또는 merge 상태를 기록으로 남기도록 요구한다.

### Out of Scope (from spec)
- PR #131 자체를 merge하는 행위 — 다른 저장소 소유자만 수행 가능 (`## Out of Scope` 첫 항목)

## Criticality
`normal` — 외부 조회 및 노트 기록만 수행, 코드/콘텐츠 변경 없음

## Dependencies

### Depends On
- `(None)` — 이 배치의 첫 task, Phase 000001~000016과 독립적으로 시작 가능

### Depended By
- `000018-010-ui-guidebook-infra-cloud-page-registration` — 4개 skill의 실제 커맨드 문법/트리거 문구, PR 상태 기록 필요

## Key Files
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.verification.md` (신규 생성 — 검증 결과 기록)

## Notes
- 이 task는 다른 저장소(`yongwoon/ywc-agent-toolkit`)에 대한 읽기 전용 `gh` 조회만 수행한다. `gh` CLI 미설치/미인증 시 비인증 공개 REST 호출(`api.github.com/repos/yongwoon/ywc-agent-toolkit/contents/...`)로 대체 가능하다(공개 저장소).
- 이 스펙 작성/검증 시점(`ywc-spec-ready` 2회차)에 이미 PR #131이 `MERGED`(`mergedAt: 2026-07-08T21:16:34Z`)로 확인된 바 있다 — 다만 이는 계획 시점의 관찰이며, 이 task 실행 시점에 반드시 재조회해야 한다(캐시된 값을 신뢰하지 않는다).
- FR-1은 merge가 안 되어 있어도 in-flight diff 기준으로 계속 진행 가능하다고 명시하지만, 유의미한 시간이 지난 뒤 실행한다면 SKILL.md 내용이 계획 시점과 달라졌을 수 있으므로 반드시 재확인한다.
- 4개 skill 모두 `requires: []`(다른 skill에 대한 하드 의존성 없음), `category`/`phase`가 서로 다르다(`ywc-infra-design`: spec/planning, `ywc-iac-author`: implement/implementation, `ywc-infra-review`: review/quality, `ywc-infra-optimize`: maintenance/cleanup) — 이 4단계 분류가 새 페이지의 "When to use these Skills" 결정 테이블 구조의 근거가 된다.

## Parallel Execution Metadata

### Ownership
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.verification.md`

### Shared Surfaces
- `(None)` — 신규 파일 1개만 생성, 기존 파일 수정 없음

### Conflicts With
- `(None identified)`

### Parallelizable After
- `(None)` — 첫 task

### Task Verify
- `docs/ywc-plans/guidebook-infra-cloud-page-pr131.verification.md`가 생성되어 있고, PR 상태(`state`/`mergedAt`/`headRefOid`), 4개 skill의 핵심 커맨드 예시(최소 1개씩)와 트리거 요약이 기록되어 있는지 확인

## Out of Scope
- 실제 페이지 콘텐츠 작성(`src/content/guidebook/**`) — `000018-010`의 책임
- nav/slugs 등록 — `000018-010`의 책임
