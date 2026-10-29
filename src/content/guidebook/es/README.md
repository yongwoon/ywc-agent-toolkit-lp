# ywc Skill & Agent Manual

> Este Manual es un manual de usuario reorganizado para personas que se encuentran con las Habilidades y Agentes `ywc-*` por primera vez. Cada página está escrita pensando en su conversión en una página de documentación web independiente, y la tabla de contenidos a continuación también corresponde a la estructura de la barra lateral del sitio.

## Cómo leer este manual

- Si es tu primera vez, sigue **Primeros pasos** después del Prólogo (01 -> 02 -> 03 -> 04) y luego lee **Flujo principal** (05-08).
- Si ya conoces los conceptos básicos y estás buscando una tarea específica, salta directamente a la página correspondiente en **Inicio de un proyecto**, **Calidad y verificación** u **Operaciones y áreas especializadas**.
- Las habilidades con muchas opciones que te hacen consultar la sintaxis repetidamente se recopilan en **Referencia**, centradas en ejemplos de comandos.

## ¿Qué estás intentando hacer? (Enlaces rápidos por objetivo)

Esto está organizado en torno a **lo que estás intentando hacer ahora**, no a "qué habilidades existen." Encuentra tu situación a continuación y comienza directamente.

### Planificar e implementar

| Lo que quieres hacer | Iniciando Skill | Guía |
|---|---|---|
| Arreglar un error o agregar una pequeña función | `ywc-plan` | [04](./03-quickstart.md), [05](./04-general-cycle-small.md) |
| Construya una función más grande que necesite dividirse en múltiples Tasks | `ywc-plan` -> `ywc-task-generator` | [06](./05-general-cycle-medium-large.md) |
| Da un objetivo y deja que el sistema lo complete automáticamente desde la planificación hasta la implementación | `ywc-agentic` | [07](./06-agentic-autonomous-loop.md) |
| Ejecute Tasks que ya están descompuestos (secuencial/paralelo) | `ywc-sequential-executor` / `ywc-parallel-executor` | [18](./13-executor-and-codegen-patterns.md) |
| Diseña un proyecto completamente nuevo desde cero | `ywc-project-scaffold` | [09](./07-starting-a-new-project.md) |
| Entender un repositorio/código desconocido por primera vez | `ywc-onboard-repo` | [10](./08-onboarding-existing-repo.md) |
| Aclara una idea que aún no es concreta | `ywc-brainstorm` | [19](./14-skill-reference.md) |
| Quieres comparar librerías o enfoques de implementación para decidir qué usar | `ywc-tech-research` | [19](./14-skill-reference.md) |
| Explorar un cambio grande e incierto a lo largo de varias sesiones (solo en Codex) | `ywc-wayfinder` | [08](./19-skill-combination-recipes.md) |
| Implementar una función de autenticación (login, OAuth, MFA) | `ywc-auth-implement` | [17](./18-authentication-implementation.md) |
| Ver cómo se encadenan las Skills entre sí | - | [08](./19-skill-combination-recipes.md) |

### Calidad y verificación

| Lo que quieres hacer | Iniciando Skill | Guía |
|---|---|---|
| Cree un documento de prueba manual para la verificación PR | `ywc-gen-testcase` | [11](./09-testing-guide.md) |
| Configurar o expandir la automatización de pruebas E2E | `ywc-e2e-test-strategy` | [12](./10-e2e-test-strategy.md) |
| Verificar la usabilidad o accesibilidad de la pantalla | `ywc-ui-ux-review` | [13](./11-design-review.md) |
| Mejorar una pantalla que se siente visualmente ordinaria | `ywc-design-renew` | [13](./11-design-review.md) |
| Verificar el código en busca de vulnerabilidades de seguridad | `ywc-security-audit` | [19](./14-skill-reference.md) |
| Limpia el código antiguo muerto | `ywc-refactor-clean` | [14](./16-code-structure-and-maintainability.md) |
| Quiero una revisión independiente de la calidad de implementación y la mantenibilidad | `ywc-impl-review` | [14](./16-code-structure-and-maintainability.md) |
| Demostrar la finalización con puertas explícitas y re-ejecutables | `ywc-verify-done` | [19](./14-skill-reference.md) |
| Revisar un proyecto desde la perspectiva del negocio y del usuario | `ywc-product-review` | [19](./14-skill-reference.md) |

### PR, revisiones y versiones

| Lo que quieres hacer | Iniciando Skill | Guía |
|---|---|---|
| Responder a los comentarios de revisión en un PR abierto | `ywc-handle-pr-reviews` | [19](./14-skill-reference.md) |
| Comprobar si el comentario de un revisor es realmente correcto antes de actuar | `ywc-receive-review` | [19](./14-skill-reference.md) |
| Evitar que vuelvan a aparecer los mismos comentarios de revisión | `ywc-review-learnings` | [08](./19-skill-combination-recipes.md) |
| Limpiar de una vez un acumulado de PRs de Dependabot | `ywc-merge-dependabot` | [19](./14-skill-reference.md) |
| Escribe una CHANGELOG o nota de lanzamiento | `ywc-changelog-release-notes` | [19](./14-skill-reference.md) |
| Simplemente confirma el trabajo realizado hasta ahora | `ywc-commit` | [19](./14-skill-reference.md) |

### Depuración e incidentes

| Lo que quieres hacer | Iniciando Skill | Guía |
|---|---|---|
| Estás atascado porque no puedes encontrar la causa raíz de un error | `ywc-debug-rootcause` | [15](./12-debugging-and-incident-postmortem.md) |
| Ocurrió un incidente de producción y necesitas escribir un informe posterior al incidente | `ywc-incident-postmortem` | [15](./12-debugging-and-incident-postmortem.md) |

### Conocimiento y decisiones del proyecto

| Lo que quieres hacer | Iniciando Skill | Guía |
|---|---|---|
| Gestionar el conocimiento (glosario/aprendizajes de revisión/mission) que permanece en el proyecto después de que termina la conversación | `ywc-ubiquitous-language` | [19](./14-skill-reference.md) |
| Registrar una decisión de arquitectura difícil de revertir (solo en Claude Code) | `ywc-adr` | [19](./14-skill-reference.md) |

Para situaciones no cubiertas en esta tabla, consulte [19. Full Skill Reference](./14-skill-reference.md).

## Tabla de contenidos

### Prólogo

| Página | Descripción |
|---|---|
| [01. Introducción](./01-introduction.md) | Qué es este ecosistema Skill/Agent, para quién es y qué problemas resuelve |
| [02. Conceptos fundamentales](./02-core-concepts.md) | Términos como Skill / Agent / Executor / Task, sintaxis de invocación, y los cuatro estados de finalización como `DONE` |

### Primeros pasos

| Página | Descripción |
|---|---|
| [03. Requisitos previos e instalación](./15-prerequisites-installation.md) | La lista de herramientas obligatorias y opcionales que debes tener listas para que las Skills ywc-* funcionen de forma fiable |
| [04. Envía tu primera función en 5 minutos](./03-quickstart.md) | El primer ejercicio práctico, siguiendo una pequeña característica desde la idea hasta la fusión |

### Flujo principal

| Página | Descripción |
|---|---|
| [05. Manejo de un cambio pequeño (ciclo general - pequeño)](./04-general-cycle-small.md) | El flujo estándar para un cambio que termina como un único PR sin descomposición Task |
| [06. Manejo del trabajo dividido en múltiples Tasks (ciclo general - mediano/grande)](./05-general-cycle-medium-large.md) | El flujo para los cambios que necesitan validación de especificaciones y descomposición Task |
| [07. Terminar automáticamente desde un objetivo (ywc-agentic)](./06-agentic-autonomous-loop.md) | En lugar del control manual en 05/06, repite automáticamente Planificar -> Ejecutar -> Evaluar -> Repetir desde un solo objetivo |
| [08. Recetas para combinar Skills](./19-skill-combination-recipes.md) | Cómo se pasan el trabajo las Skills entre sí: bucle de aprendizaje de revisiones, del bug a la prevención, gates de PR, registro de decisiones, exploración, ejecución en paralelo y release |

### Inicio de un proyecto

| Página | Descripción |
|---|---|
| [09. Empezando un nuevo proyecto](./07-starting-a-new-project.md) | De una hoja en blanco al diseño del proyecto y la primera especificación completada |
| [10. Entrando en un repositorio existente por primera vez](./08-onboarding-existing-repo.md) | Un flujo de incorporación que invierte la ingeniería de las convenciones de una base de código desconocida y crea `CLAUDE.md` |

### Calidad y verificación

| Página | Descripción |
|---|---|
| [11. Escribir y ejecutar pruebas](./09-testing-guide.md) | Cómo operar hojas de prueba de verificación manual junto con pruebas automatizadas |
| [12. Estrategia de automatización de pruebas E2E](./10-e2e-test-strategy.md) | Una guía avanzada para configurar, expandir y mantener una Suite E2E basada en Playwright |
| [13. Revisando y mejorando el diseño](./11-design-review.md) | Cómo distinguir y aplicar auditorías de usabilidad y Renovación visual de deslizamiento |
| [14. Gestionar la estructura del código y la mantenibilidad](./16-code-structure-and-maintainability.md) | Cómo usar las 2 Skills que limpian y verifican código con mala estructura o mantenibilidad, y el orden en que trabajan juntas |

### Operaciones y áreas especializadas

| Página | Descripción |
|---|---|
| [15. Debugging e informe postmortem](./12-debugging-and-incident-postmortem.md) | Investigación de causa raíz mientras el incidente está activo, y análisis posterior al incidente después de que se implementa la solución |
| [16. Gestionar la infraestructura en la nube](./17-infrastructure-and-cloud.md) | Una tabla de decisión y un pipeline de 4 pasos para `ywc-infra-design`, `ywc-iac-author`, `ywc-infra-review` y `ywc-infra-optimize`, que se conecta con el agente `ywc-cloud-engineer` |
| [17. Implementar autenticación](./18-authentication-implementation.md) | Cómo `ywc-auth-implement` ejecuta el flujo preflight -> entrevista de políticas -> recomendación -> dispatch, y las puertas de security / E2E / PR que aplica |

### Referencia

| Página | Descripción |
|---|---|
| [18. Executor / Patrones de indicación de generación de código](./13-executor-and-codegen-patterns.md) | Ejemplos prácticos de comandos para `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` con muchas opciones |
| [19. Referencia completa Skill](./14-skill-reference.md) | Un índice de las Habilidades restantes no cubiertas en las guías anteriores, organizado por situación |

## Material fuente

Toda la sintaxis de comandos y opciones en este Manual fue verificada contra el `SKILL.md` (`claude-code/skills/<skill-name>/SKILL.md`) de cada Skill. Si una opción parece diferente del comportamiento real, el `SKILL.md` de ese Skill es la fuente de verdad actual. Este documento es una presentación secundaria amigable para el usuario de ese material.
