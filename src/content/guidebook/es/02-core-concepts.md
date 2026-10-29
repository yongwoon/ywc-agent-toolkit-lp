[Back to table of contents](./README.md)

# 02. Conceptos fundamentales

Una vez que entiendas los términos y conceptos en esta página, puedes aplicar los ejemplos de cada otra página de la guía directamente.

## Skill, Agent, Executor, Task

| Término | Significado |
|---|---|
| **Skill** | Un procedimiento que los usuarios invocan directamente, como `/ywc-plan`. Está definido en `claude-code/skills/<name>/SKILL.md`, y la mayor parte de este Manual trata sobre Habilidades. |
| **Agent (Subagente)** | Una unidad de ejecución especializada delegada internamente por un Skill, como `ywc-backend-coder` o `ywc-security-engineer`. Los usuarios no las invocan directamente; las Habilidades las envían a través de la herramienta Task. |
| **Executor** | Un término colectivo para las dos habilidades que realmente ejecutan Tasks: `ywc-sequential-executor` (secuencial) y `ywc-parallel-executor` (paralelo). |
| **Task** | Se crea un directorio `tasks/<phase>-<sequence>-<slug>/` cuando `ywc-task-generator` descompone una especificación. Consiste en `README.md` (metadatos) y `task.md` (lista de verificación de implementación). |

### Agents por herramienta

Los agents se ejecutan dentro de las Skills; nunca los invocas tú directamente. Las dos herramientas incluyen conjuntos distintos: 13 agents en Claude Code y 10 en Codex. En Claude Code, los worker agents escriben el código de servidor, de UI y de tests. En Codex, la propia sesión de la Skill escribe el código, y la mayoría de los agents son asesores y revisores de solo lectura.

| Agent | Rol | Principales Skills que lo invocan | Claude Code | Codex |
|---|---|---|---|---|
| `ywc-architect` | Decisiones de arquitectura y trade-offs (solo lectura) | `ywc-plan`, `ywc-impl-review` | ✓ | ✓ |
| `ywc-security-engineer` | Revisión de seguridad estática (solo lectura) | `ywc-security-audit`, `ywc-impl-review`, `ywc-infra-review` | ✓ | ✓ |
| `ywc-root-cause-analyst` | Análisis de causa raíz (solo lectura) | `ywc-debug-rootcause` | ✓ | ✓ |
| `ywc-performance-engineer` | Análisis de rendimiento y recomendaciones de profiling (solo lectura) | `ywc-impl-review` | ✓ | ✓ |
| `ywc-typescript-reviewer` / `ywc-python-reviewer` / `ywc-go-reviewer` | Revisión específica por lenguaje (solo lectura) | `ywc-impl-review` | ✓ | ✓ |
| `ywc-cloud-engineer` | IaC con Terraform. En Claude Code lo escribe y lo revisa; en Codex solo lo revisa (solo lectura) | `ywc-iac-author`, `ywc-infra-review`, `ywc-infra-optimize` | ✓ | ✓ |
| `ywc-backend-coder` / `ywc-frontend-coder` / `ywc-qa-engineer` | Escriben código de servidor / código de UI / código de tests | `ywc-code-gen`, ambos executors | ✓ | |
| `ywc-refactor-cleaner` | Ejecuta el bucle seguro de eliminación de código muerto | `ywc-refactor-clean` | ✓ | |
| `ywc-doc-writer` | Escribe documentación | `ywc-auth-implement`, `ywc-project-docs` | ✓ | |
| `ywc-complexity-cleaner` / `ywc-test-hardener` | Workers de la puerta de calidad: reducen la complejidad del código de producción / refuerzan los tests frente a los mutantes supervivientes | Puerta de calidad de los executors ([16](./13-executor-and-codegen-patterns.md)) | | ✓ |

## La escala determina el flujo

Cada elemento de trabajo comienza con `ywc-plan`. `ywc-plan` juzga la escala de la solicitud y la dirige a uno de dos flujos.

| Escala | Criterios de decisión | Salida | Siguiente paso |
|---|---|---|---|
| **Pequeño** | Un cambio que puede completarse en un solo PR, sin migración de base de datos ni adopción de nueva biblioteca | `plan.md` | [04. general cycle (small)](./04-general-cycle-small.md) |
| **Mediano/Grande** | Debe dividirse en múltiples Tasks, o incluir una migración de base de datos o la adopción de una nueva biblioteca | `docs/ywc-plans/<slug>.md` | [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) |

Las migraciones de bases de datos y la adopción de nuevas bibliotecas **siempre se manejan por separado**, independientemente de la escala. Esta es una Invariante de Seguridad para tanto `ywc-plan` como `ywc-task-generator`.

## Los cuatro estados de finalización

Casi todos los Skill terminan con uno de los cuatro estados que se indican a continuación. Una vez que conozca este vocabulario, puede leer el informe de finalización de cualquier Skill y decidir de inmediato qué hacer a continuación.

| Estado | Significado | Lo que el usuario debe hacer |
|---|---|---|
| `DONE` | Completamente terminado, sin problemas | Pasar al siguiente paso |
| `DONE_WITH_CONCERNS` | Terminado, pero con algo para ver | Lea la preocupación; arréglela si es un problema de corrección, de lo contrario continúe |
| `BLOCKED` | No se puede continuar: se necesita juicio humano | Revise el obstáculo señalado, resuélvalo directamente y luego vuelva a ejecutar |
| `NEEDS_CONTEXT` | No hay suficiente información para comenzar | Proporcione la información solicitada y vuelva a invocar |

## Flujo general de un vistazo

<FlowDiagram>
  <FlowStep>Idea</FlowStep>
  <FlowStep>ywc-plan (decisión de escala)</FlowStep>
  <FlowBranch label="Small">
    <FlowChain items="plan.md, ywc-spec-ready, ywc-code-gen, ywc-impl-review, ywc-create-pr" />
  </FlowBranch>
  <FlowBranch label="Medium/Large">
    <FlowChain items="docs/ywc-plans/<slug>.md, ywc-spec-ready, ywc-task-generator" />
    <FlowStep>ywc-sequential-executor --review o ywc-parallel-executor --review</FlowStep>
    <FlowChain items="PR, CI, Bot Review, Merge (automatizado por Executor)" />
  </FlowBranch>
  <FlowStep>Pruebas e integración (ywc-gen-testcase, ywc-e2e-test-strategy si es necesario)</FlowStep>
</FlowDiagram>

Cada rama de este flujo se cubre en detalle con ejemplos concretos de comandos en las páginas [04](./04-general-cycle-small.md) y [05](./05-general-cycle-medium-large.md), y el paso final de pruebas se cubre en las páginas [09](./09-testing-guide.md) y [10](./10-e2e-test-strategy.md).

## Conceptos del modo de entrega compartido PR

`ywc-finish-branch`, `ywc-sequential-executor` y `ywc-parallel-executor` comparten los conceptos de modo que se indican a continuación para la entrega basada en tareas. El flujo pequeño basado en `plan.md` no tiene artefacto de tarea, por lo que abre un PR con `ywc-create-pr` y maneja la revisión/fusión por separado. Las combinaciones exactas de banderas se cubren en [16. Executor / Patrones de indicación de generación de código](./13-executor-and-codegen-patterns.md).

| Modo | Significado |
|---|---|
| `normal-pr` (predeterminado) | Gestionar automáticamente la creación de PR -> Espera de CI -> Respuesta de revisión del bot -> Fusionar |
| `--draft` | Crea solo un PR y detente - La fusión es manual |
| `--local-merge` | Fusionar directamente en la rama base localmente sin un PR |
| `--aggregate-pr` (solo ejecutor) | Recoge múltiples Tasks en una rama y entrégalas como **un** PR |

---

[Previous: 01. Introduction](./01-introduction.md) - [Next: 03. Ship your first feature in 5 minutes](./03-quickstart.md)
