[« 목차로 돌아가기](./README.md)

# 14. 클라우드 인프라 관리

## 언제 이 Skill 을 쓰는가

네 Skill 은 "설계 → 작성 → 리뷰 → 개선"이라는 하나의 연속된 라이프사이클을 다루지만, 각각 답하는 질문이 다릅니다. 지금 어느 단계에 있는지에 따라 골라 쓰세요.

| 하려는 일 | 질문 | 사용할 Skill |
|---|---|---|
| IaC 를 작성하기 전에 클라우드 아키텍처를 설계하고 싶다 | "provider/network/compute/storage/IAM 구성이 어떤 모양이어야 하는가?" | `ywc-infra-design` |
| 완성된 설계를 실제 Infrastructure-as-Code 로 옮기고 싶다 | "이 Terraform 을 어떻게 작성하는가?" | `ywc-iac-author` |
| apply 하기 전에 misconfiguration/비용/신뢰성 문제를 잡고 싶다 | "이 IaC 를 apply 해도 안전한가?" | `ywc-infra-review` |
| 이미 돌아가고 있는 인프라를 개선하고 싶다 | "이 기존 인프라가 낭비되고 있거나, drift 되었거나, 취약하지 않은가?" | `ywc-infra-optimize` |

## `ywc-infra-design` — 클라우드 아키텍처 설계

요구사항을 모으고 provider 를 결정(또는 결정을 위임)한 뒤, network/compute/storage/IAM 토폴로지를 reliability/cost/security 사전 점검과 함께 설계합니다. IaC 자체는 작성하지 않으며, 산출물인 `infra-design.md` 가 다음 단계 `ywc-iac-author` 의 입력 계약이 됩니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
</ToolTabs>

`--provider` 는 이미 정해진 provider 를 선언해서 그 선택을 위임하는 과정을 건너뜁니다. 생략하면 provider 조사가 위임되는데, Claude Code 에서는 `ywc-tech-research` 를 그냥 참조하는 형태이고 Codex 에서는 `$ywc-tech-research` invocation 문법을 씁니다. `--skip-cloud-consult` 는 Step 3 의 선택적 feasibility consult 를 건너뛰는 flag 입니다 — Claude Code 는 `Task(subagent_type: ywc-cloud-engineer)`, Codex 는 "read-only 모드로 `ywc-cloud-engineer` persona 를 맡은 Codex worker 를 선택적으로 dispatch"라는 표현을 씁니다. 같은 의도라도 tool 마다 dispatch 어휘가 다릅니다.

## `ywc-iac-author` — Infrastructure-as-Code 작성

`ywc-infra-design` 의 doc 을 바탕으로 AWS/GCP/Azure/Kubernetes 용 Terraform module/resource 를 작성하거나 수정합니다(K8s/Helm 도 Terraform 의 `kubernetes`/`helm` provider 를 통해서만 다루며, raw manifest 나 다른 IaC tool 은 쓰지 않습니다). 작성 후에는 `terraform validate`/`plan` 으로 검증하고 blast-radius summary 를 산출합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

두 tool 은 작성 방식 자체가 다릅니다. Claude Code 는 Step 3 에서 Terraform module 마다 `Task(subagent_type: ywc-cloud-engineer)` 로 fan-out 합니다. Codex 는 현재 세션 자신이 `.tf` 파일을 직접 작성하며 fan-out dispatch 가 없습니다 — `ywc-cloud-engineer` 는 feasibility/reliability/blast-radius 판단을 위한 선택적 read-only advisory consult 로만 존재하며 주 작성자가 되지 않습니다. `--skip-review-recommendation` 은 다음 Skill 실행을 권하는 마무리 메시지를 건너뜁니다. Claude Code 는 `ywc-infra-review` 를 그냥 참조하고, Codex 는 `$ywc-infra-review` 로 표현합니다.

## `ywc-infra-review` — Apply 전 IaC 리뷰

security/cost/reliability 세 lens 로 fan-out 하여 `apply` 하기 전에 AWS/GCP/Azure/K8s Terraform 의 misconfiguration, least-privilege 부족, 신뢰성 리스크를 찾아냅니다. 진단 전용이며 IaC 를 직접 고치지 않습니다. CRITICAL/HIGH 지적이 있으면 apply 를 block 하도록 권고합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

3-lens fan-out 도 tool 마다 dispatch 표현이 다릅니다. Claude Code 는 security lens 에 `Task(subagent_type: ywc-security-engineer)`, cost lens 에 `Task(subagent_type: ywc-performance-engineer)`, reliability lens 에 review mode 의 `Task(subagent_type: ywc-cloud-engineer)` 를 씁니다. Codex 는 같은 세 dispatch 를 "`ywc-security-engineer` persona 를 맡은 Codex worker", `ywc-performance-engineer` persona, `ywc-cloud-engineer` persona 로 표현합니다. `--skip-optimize-recommendation` 은 `ywc-infra-optimize` 실행을 권하는 마무리 메시지를 건너뜁니다 — Claude Code 는 그냥 참조, Codex 는 `$ywc-infra-optimize`(재설계가 필요한 지적이면 `$ywc-iac-author`)입니다.

## `ywc-infra-optimize` — 비용·Drift·신뢰성 개선

오래된 codebase 에 대한 `ywc-refactor-clean` 의 infra 버전입니다. 비용 right-sizing, 미사용 리소스 삭제, reserved/spot 전환 검토, drift 탐지 및 교정, 그리고 AWS/GCP/Azure/K8s 신뢰성 강화를 수행합니다.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

두 tool 의 차이가 가장 큰 지점입니다. Claude Code 는 SAFE 항목을 진단하고 **그대로 실행까지** 합니다 — `Task(subagent_type: ywc-performance-engineer)` 가 비용/사용률 시그널을 주고, `Task(subagent_type: ywc-cloud-engineer)` 가 SAFE 항목마다 최소한의 `.tf` 변경을 적용하고 `terraform plan` 을 실행한 뒤(`apply` 는 하지 않습니다) 한 항목씩 commit 합니다. CAUTION/DANGER 항목은 항상 escalate 만 됩니다. Codex 에서는 이 Skill 이 명시적으로 planning/classification surface 이지 execution worker 가 아닙니다 — `.tf` 변경이나 commit 을 스스로 실행하지 않습니다. SAFE 단계는 execution loop 가 아니라 planning loop 이며, SAFE 항목은 "계획된 다음 액션"으로 기록되어 `$ywc-iac-author` 로 routing 되어 실제 작성은 별도 패스에 맡깁니다. `--dry-run` 은 (두 tool 모두) gather 와 classify 만 하고 끝납니다. `--skip-verify-done` 은 마지막 `ywc-verify-done` 인계를 건너뜁니다.

## 4개 Skill 이 함께 작동하는 방식

네 Skill 은 "인프라가 아직 존재하지 않는 상태"에서 "인프라가 존재하고, 안전하고, 시간이 지나도 계속 더 저렴하고 안정적으로 유지되는 상태"로 옮기는 하나의 파이프라인을 이룹니다.

**1단계: 토폴로지를 설계 — `ywc-infra-design`**

Terraform 을 작성하기 전에 provider 와 network/compute/storage/IAM 의 형태, 그리고 reliability/cost/security 사전 점검을 정합니다. 산출물인 `infra-design.md` 만 있으면 다음 단계에 필요한 것은 다 갖춰집니다.

**2단계: IaC 를 작성 — `ywc-iac-author`**

그 설계 doc 을 module 마다 `terraform validate`/`plan` 으로 검증하며 실제 Terraform 으로 옮깁니다. Claude Code 는 module 마다 `ywc-cloud-engineer` 로 fan-out 하고, Codex 는 같은 세션이 직접 작성하며 `ywc-cloud-engineer` 는 선택적 advisory consult 로만 쓸 수 있습니다.

**3단계: Apply 전에 리뷰 — `ywc-infra-review`**

누군가 `apply` 하기 전에 security/cost/reliability 각 lens 로 리뷰를 받습니다 — 각각 `ywc-security-engineer`, `ywc-performance-engineer`, `ywc-cloud-engineer` 로 dispatch 됩니다(이 Guidebook 다른 곳에서 `ywc-impl-review` 가 쓰는 것과 같은 lens 확장 agent 를, 애플리케이션 코드 대신 인프라에 적용한 것입니다). CRITICAL/HIGH 지적이 있으면 고쳐질 때까지 apply 가 block 됩니다.

**4단계: 시간이 지나도 군살 없이 유지 — `ywc-infra-optimize`**

인프라가 실제로 돌기 시작하면, 이 Skill 이 반복되는 유지보수 패스가 됩니다. 비용 right-sizing, drift 탐지, 신뢰성 강화를 여기서도 `ywc-cloud-engineer` 와 `ywc-performance-engineer` 의 시그널과 실행력을 빌려 수행합니다. 재작성이 필요한 지적은 `ywc-iac-author` 로, 시스템 형태 자체를 다시 봐야 하는 지적은 `ywc-infra-design` 까지 거슬러 올라갑니다.

---

[← 이전: 13. 코드 구조와 유지보수성 관리](./16-code-structure-and-maintainability.md) · [다음: 15. Executor / Code-gen Prompt 패턴 →](./13-executor-and-codegen-patterns.md)
