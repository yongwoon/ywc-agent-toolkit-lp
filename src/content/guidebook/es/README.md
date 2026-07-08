# ywc Skill & Agent Manual

> Este Manual es un manual de usuario reorganizado para personas que se encuentran con las Habilidades y Agentes `ywc-*` por primera vez. Cada página está escrita pensando en su conversión en una página de documentación web independiente, y la tabla de contenidos a continuación también corresponde a la estructura de la barra lateral del sitio.

## Cómo leer este manual

- Si es tu primera vez, sigue la secuencia **Empezando** tal como está (01 -> 02 -> 03).
- Si ya conoces los conceptos básicos y estás buscando una tarea específica, salta directamente a la página correspondiente en **Guías de Flujo de Trabajo**.
- Las habilidades con muchas opciones que te hacen consultar la sintaxis repetidamente se recopilan en **Referencia**, centradas en ejemplos de comandos.

## ¿Qué estás intentando hacer? (Enlaces rápidos por objetivo)

Esto está organizado en torno a **lo que estás intentando hacer ahora**, no a "qué habilidades existen." Encuentra tu situación a continuación y comienza directamente.

| Lo que quieres hacer | Iniciando Skill | Guía |
|---|---|---|
| Arreglar un error o agregar una pequeña función | `ywc-plan` | [03](./03-quickstart.md), [04](./04-general-cycle-small.md) |
| Construya una función más grande que necesite dividirse en múltiples Tasks | `ywc-plan` -> `ywc-task-generator` | [05](./05-general-cycle-medium-large.md) |
| Da un objetivo y deja que el sistema lo complete automáticamente desde la planificación hasta la implementación | `ywc-agentic` | [06](./06-agentic-autonomous-loop.md) |
| Diseña un proyecto completamente nuevo desde cero | `ywc-project-scaffold` | [07](./07-starting-a-new-project.md) |
| Entender un repositorio/código desconocido por primera vez | `ywc-onboard-repo` | [08](./08-onboarding-existing-repo.md) |
| Ejecute Tasks que ya están descompuestos (secuencial/paralelo) | `ywc-sequential-executor` / `ywc-parallel-executor` | [13](./13-executor-and-codegen-patterns.md) |
| Aclara una idea que aún no es concreta | `ywc-brainstorm` | [14](./14-skill-reference.md) |
| Cree un documento de prueba manual para la verificación PR | `ywc-gen-testcase` | [09](./09-testing-guide.md) |
| Configurar o expandir la automatización de pruebas E2E | `ywc-e2e-test-strategy` | [10](./10-e2e-test-strategy.md) |
| Verificar la usabilidad o accesibilidad de la pantalla | `ywc-ui-ux-review` | [11](./11-design-review.md) |
| Mejorar una pantalla que se siente visualmente ordinaria | `ywc-design-renew` | [11](./11-design-review.md) |
| Verificar el código en busca de vulnerabilidades de seguridad | `ywc-security-audit` | [14](./14-skill-reference.md) |
| Estás atascado porque no puedes encontrar la causa raíz de un error | `ywc-debug-rootcause` | [12](./12-debugging-and-incident-postmortem.md) |
| Ocurrió un incidente de producción y necesitas escribir un informe posterior al incidente | `ywc-incident-postmortem` | [12](./12-debugging-and-incident-postmortem.md) |
| Limpia el código antiguo muerto | `ywc-refactor-clean` | [14](./14-skill-reference.md) |
| Responder a los comentarios de revisión en un PR abierto | `ywc-handle-pr-reviews` | [14](./14-skill-reference.md) |
| Limpiar de una vez un acumulado de PRs de Dependabot | `ywc-merge-dependabot` | [14](./14-skill-reference.md) |
| Escribe una CHANGELOG o nota de lanzamiento | `ywc-changelog-release-notes` | [14](./14-skill-reference.md) |
| Simplemente confirma el trabajo realizado hasta ahora | `ywc-commit` | [14](./14-skill-reference.md) |
| La estructura está enredada o la calidad de implementación es mala desde una perspectiva de mantenibilidad | `ywc-improve-architecture` | [14](./14-skill-reference.md) |
| Quieres comparar librerías o enfoques de implementación para decidir qué usar | `ywc-tech-research` | [14](./14-skill-reference.md) |
| Gestionar el conocimiento (glosario/aprendizajes de revisión/mission) que permanece en el proyecto después de que termina la conversación | `ywc-ubiquitous-language` | [14](./14-skill-reference.md) |

Para situaciones no cubiertas en esta tabla, consulte [14. Full Skill Reference](./14-skill-reference.md).

## Tabla de contenidos

### Prólogo

| Página | Descripción |
|---|---|
| [01. Introduction](./01-introduction.md) | Qué es este ecosistema Skill/Agent, para quién es y qué problemas resuelve |
| [02. Core concepts](./02-core-concepts.md) | Términos como Skill / Agent / Executor / Task, sintaxis de invocación, y los cuatro estados de finalización como `DONE` |

### Comenzando

| Página | Descripción |
|---|---|
| [03. Ship your first feature in 5 minutes](./03-quickstart.md) | El primer ejercicio práctico, siguiendo una pequeña característica desde la idea hasta la fusión |

### Guías de flujo de trabajo

| Página | Descripción |
|---|---|
| [04. Handling a small change (general cycle - small)](./04-general-cycle-small.md) | El flujo estándar para un cambio que termina como un único PR sin descomposición Task |
| [05. Handling work split into multiple Tasks (general cycle - medium/large)](./05-general-cycle-medium-large.md) | El flujo para los cambios que necesitan validación de especificaciones y descomposición Task |
| [06. Finish automatically from one goal (ywc-agentic)](./06-agentic-autonomous-loop.md) | En lugar del control manual en 04/05, repite automáticamente Planificar -> Ejecutar -> Evaluar -> Repetir desde un solo objetivo |
| [07. Starting a new Project](./07-starting-a-new-project.md) | De una hoja en blanco al diseño del proyecto y la primera especificación completada |
| [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) | Un flujo de incorporación que invierte la ingeniería de las convenciones de una base de código desconocida y crea `CLAUDE.md` |
| [09. Writing and running Tests](./09-testing-guide.md) | Cómo operar hojas de prueba de verificación manual junto con pruebas automatizadas |
| [10. E2E Test automation strategy](./10-e2e-test-strategy.md) | Una guía avanzada para configurar, expandir y mantener una Suite E2E basada en Playwright |
| [11. Reviewing and improving design](./11-design-review.md) | Cómo distinguir y aplicar auditorías de usabilidad y Renovación visual de deslizamiento |
| [12. Debugging and incident postmortem](./12-debugging-and-incident-postmortem.md) | Investigación de causa raíz mientras el incidente está activo, y análisis posterior al incidente después de que se implementa la solución |

### Referencia

| Página | Descripción |
|---|---|
| [13. Executor / Code-gen Prompt patterns](./13-executor-and-codegen-patterns.md) | Ejemplos prácticos de comandos para `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` con muchas opciones |
| [14. Full Skill Reference](./14-skill-reference.md) | Un índice de las Habilidades restantes no cubiertas en las guías anteriores, organizado por situación |

## Material fuente

Toda la sintaxis de comandos y opciones en este Manual fue verificada contra el `SKILL.md` (`claude-code/skills/<skill-name>/SKILL.md`) de cada Skill. Si una opción parece diferente del comportamiento real, el `SKILL.md` de ese Skill es la fuente de verdad actual. Este documento es una presentación secundaria amigable para el usuario de ese material.
