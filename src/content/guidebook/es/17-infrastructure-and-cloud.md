[« Volver al índice](./README.md)

# 14. Gestionar la infraestructura en la nube

## Cuándo usar estas Skills

Las cuatro Skills cubren un mismo ciclo de vida continuo — diseñar, escribir, revisar y mejorar infraestructura en la nube — pero cada una responde una pregunta distinta. Elige según en qué punto de ese ciclo estés ahora mismo.

| Qué quieres hacer | Pregunta | Skill a usar |
|---|---|---|
| Diseñar la arquitectura en la nube de un sistema antes de que exista ningún IaC | "¿Cómo debería ser la topología de provider/network/compute/storage/IAM?" | `ywc-infra-design` |
| Convertir un diseño terminado en Infrastructure-as-Code real | "¿Cómo escribo el Terraform para esto?" | `ywc-iac-author` |
| Detectar problemas de misconfiguration, costo o fiabilidad antes de aplicar | "¿Es seguro aplicar este IaC?" | `ywc-infra-review` |
| Mejorar o ajustar el tamaño de infraestructura que ya está en producción | "¿Esta infraestructura existente es derrochadora, tiene drift o es frágil?" | `ywc-infra-optimize` |

## `ywc-infra-design` — Diseño de arquitectura en la nube

Reúne requisitos, decide el provider (o delega esa decisión) y define la topología de network/compute/storage/IAM junto con una verificación previa de reliability/cost/security. Nunca escribe IaC por sí misma — su salida, `infra-design.md`, es el contrato de entrada que consume después `ywc-iac-author`.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-design --provider aws --scope payments-api" />
  </ToolTabsPanel>
</ToolTabs>

`--provider` declara un provider ya decidido para saltarse esa delegación; si se omite, la investigación del provider se delega — en Claude Code eso es una referencia directa a `ywc-tech-research`, en Codex es la sintaxis de invocación `$ywc-tech-research`. `--skip-cloud-consult` salta la consulta de factibilidad opcional del Paso 3: en Claude Code ese paso es `Task(subagent_type: ywc-cloud-engineer)`, mientras que en Codex se describe como "despachar opcionalmente un Codex worker que porta la persona `ywc-cloud-engineer`" en modo solo lectura — la misma idea, con vocabulario de dispatch distinto según la herramienta.

## `ywc-iac-author` — Redacción de Infrastructure-as-Code

Escribe o modifica módulos/recursos de Terraform para AWS/GCP/Azure/Kubernetes a partir de un documento de `ywc-infra-design` (K8s y Helm solo a través de los providers `kubernetes`/`helm` de Terraform — nunca manifests en crudo ni una segunda herramienta de IaC), y luego verifica con `terraform validate`/`plan` y produce un resumen de blast-radius.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-iac-author --design-doc infra-design.md --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

Las dos herramientas escriben el código de forma distinta: en Claude Code, el Paso 3 reparte el trabajo por módulo de Terraform vía `Task(subagent_type: ywc-cloud-engineer)`. En Codex, la sesión actual escribe los archivos `.tf` directamente, sin reparto — `ywc-cloud-engineer` ahí es solo una consulta advisory opcional y de solo lectura para juicios de feasibility/reliability/blast-radius, nunca el autor principal. `--skip-review-recommendation` salta la recomendación final de ejecutar la siguiente Skill, que Claude Code expresa como una referencia directa a `ywc-infra-review` y Codex como `$ywc-infra-review`.

## `ywc-infra-review` — Revisión de IaC antes de aplicar

Reparte el trabajo entre los lentes de security, cost y reliability para detectar misconfiguration, falta de least-privilege y riesgos de fiabilidad en Terraform de AWS/GCP/Azure/K8s antes de que alguien ejecute `apply`. Es solo diagnóstico y nunca escribe IaC; cualquier hallazgo CRITICAL/HIGH recomienda bloquear el apply.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-review --scope infra/modules/network" />
  </ToolTabsPanel>
</ToolTabs>

El reparto entre los 3 lentes también se expresa distinto según la herramienta. Claude Code usa `Task(subagent_type: ywc-security-engineer)` para el lente de security, `Task(subagent_type: ywc-performance-engineer)` para el de cost y `Task(subagent_type: ywc-cloud-engineer)` en modo revisión para el de reliability. Codex describe esos mismos tres despachos como "un Codex worker que porta la persona `ywc-security-engineer`", la persona `ywc-performance-engineer` y la persona `ywc-cloud-engineer`. `--skip-optimize-recommendation` salta la recomendación final de ejecutar `ywc-infra-optimize` — una referencia directa en Claude Code, `$ywc-infra-optimize` (o `$ywc-iac-author`, si el hallazgo requiere reescribir en vez de optimizar) en Codex.

## `ywc-infra-optimize` — Limpieza de costo, drift y fiabilidad

El equivalente en infraestructura de `ywc-refactor-clean` para un codebase envejecido: ajusta el tamaño por costo, elimina recursos sin usar, evalúa la adopción de reserved/spot, detecta y remedia drift, y refuerza la fiabilidad en AWS/GCP/Azure/K8s.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-infra-optimize --scope infra/modules/compute --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

Aquí es donde más divergen las dos herramientas: en Claude Code, la Skill diagnostica **y ejecuta** los ítems SAFE directamente — `Task(subagent_type: ywc-performance-engineer)` aporta la señal de costo/utilización, luego `Task(subagent_type: ywc-cloud-engineer)` hace el cambio mínimo de `.tf` por cada ítem SAFE, ejecuta `terraform plan` (nunca `apply`) y hace commit de uno en uno; los ítems CAUTION/DANGER solo se escalan. En Codex, esta Skill es explícitamente una superficie de planning y clasificación, no un execution worker — nunca ejecuta ni hace commit de un cambio `.tf` por sí misma. Su paso SAFE es un planning loop, no un execution loop, y los ítems SAFE salen como "próximas acciones planeadas" enrutadas a `$ywc-iac-author` para el paso real de redacción. `--dry-run` (en ambas herramientas) solo reúne y clasifica. `--skip-verify-done` salta el traspaso final a `ywc-verify-done`.

## Cómo funcionan juntas estas Skills

Las cuatro Skills forman un único pipeline para llevar un sistema desde "todavía no existe infraestructura" hasta "la infraestructura existe, es segura y se vuelve más barata y más fiable con el tiempo":

**Paso 1: Diseña la topología — `ywc-infra-design`**

Antes de escribir ningún Terraform, decide el provider, la forma de network/compute/storage/IAM y ejecuta la verificación previa de reliability/cost/security. La salida, `infra-design.md`, es lo único que necesita el siguiente paso.

**Paso 2: Escribe el IaC — `ywc-iac-author`**

Convierte ese documento de diseño en Terraform real, módulo a módulo, verificado sobre la marcha con `terraform validate`/`plan`. En Claude Code esto se reparte por módulo a `ywc-cloud-engineer`; en Codex la misma sesión lo escribe directamente, con `ywc-cloud-engineer` disponible solo como consulta advisory opcional.

**Paso 3: Revisa antes de aplicar — `ywc-infra-review`**

Antes de que alguien ejecute `apply`, haz que el cambio pase por los lentes de security, cost y reliability — despachados a `ywc-security-engineer`, `ywc-performance-engineer` y `ywc-cloud-engineer` respectivamente (los mismos agents con lente extendida que usa `ywc-impl-review` en otra parte de este Guidebook, aplicados aquí a infraestructura en vez de a código de aplicación). Cualquier hallazgo CRITICAL/HIGH bloquea el apply hasta que se corrige.

**Paso 4: Mantenla eficiente con el tiempo — `ywc-infra-optimize`**

Una vez que la infraestructura está en producción, esta Skill es el paso de mantenimiento recurrente: ajuste de costo, detección de drift y refuerzo de fiabilidad, apoyándose de nuevo en `ywc-cloud-engineer` y `ywc-performance-engineer` para la señal y la ejecución. Los hallazgos que requieren reescribir vuelven a `ywc-iac-author`, y los que requieren revisar la forma misma del sistema retroceden hasta `ywc-infra-design`.

---

[Previous: 13. Gestionar la estructura del código y la mantenibilidad](./16-code-structure-and-maintainability.md) - [Next: 15. Implementar autenticación](./18-authentication-implementation.md)
