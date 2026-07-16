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
</FlowDiagram>

Cada rama de este flujo se cubre en detalle con ejemplos concretos de comandos en las páginas [04](./04-general-cycle-small.md) y [05](./05-general-cycle-medium-large.md).

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
