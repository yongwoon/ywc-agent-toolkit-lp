[Back to table of contents](./README.md)

# 14. Referencia completa Skill

Esta página agrupa las Habilidades restantes que no se cubrieron en las guías de flujo de trabajo anteriores según **lo que deseas hacer**. Úsala cuando sea necesario en medio de cada flujo: ciclo Pequeño/Mediano/Grande, nuevo proyecto, incorporación, pruebas o diseño.

Busca tu situación en la siguiente tabla y haz clic en el nombre de la Skill para ir directamente a su explicación.

| Skill | Cuándo usarla |
|---|---|
| [`ywc-handle-pr-reviews`](#responder-a-los-comentarios-de-la-revisión-en-un-pr-abierto-y-limpiar-también-ciconflictos) | Responder a los comentarios de la revisión en un PR abierto y limpiar también CI/conflictos |
| [`ywc-create-pr`](#confirmar-cambios-y-abrir-un-borrador-pr) | Confirmar cambios y abrir un borrador PR |
| [`ywc-merge-dependabot`](#limpiar-de-una-vez-los-prs-acumulados-de-dependabot) | Limpiar de una vez los PRs acumulados de Dependabot |
| [`ywc-commit`](#simplemente-confirma-el-trabajo-realizado-hasta-ahora) | Simplemente confirma el trabajo realizado hasta ahora |
| [`ywc-receive-review`](#no-quieres-aceptar-incondicionalmente-los-comentarios-de-un-revisor-humano-o-coderabbitcodexclaude-quieres-verificarlos-técnicamente-antes-de-responder) | No quieres aceptar incondicionalmente los comentarios de un revisor (humano o CodeRabbit/Codex/Claude); quieres verificarlos técnicamente antes de responder |
| [`ywc-brainstorm`](#tu-idea-aún-no-es-concreta-y-quieres-aclararla-primero) | Tu idea aún no es concreta y quieres aclararla primero |
| [`ywc-tech-research`](#quieres-comparar-librerías-o-enfoques-de-implementación-para-decidir-qué-usar) | Quieres comparar librerías o enfoques de implementación para decidir qué usar |
| [`ywc-agentic`](#quieres-dar-un-objetivo-y-dejar-que-la-planificación-hasta-la-implementación-se-ejecute-sin-intervención-humana) | Quieres dar un objetivo y dejar que la planificación hasta la implementación se ejecute sin intervención humana |
| [`ywc-security-audit`](#revisa-las-vulnerabilidades-de-seguridad-en-el-código-sensible-como-autenticaciónpagos) | Revisa las vulnerabilidades de seguridad en el código sensible, como autenticación/pagos |
| [`ywc-refactor-clean`](#limpiar-el-código-antiguo-muerto-funcionesexportacionesdependencias-no-utilizadas) | Limpiar el código antiguo muerto (funciones/exportaciones/dependencias no utilizadas) |
| [`ywc-improve-architecture`](#quieres-reestructurar-una-arquitectura-de-shallow-module-enredada-en-deep-module) | Quieres reestructurar una arquitectura de shallow module enredada en deep module |
| [`ywc-impl-review`](#quieres-revisar-de-forma-independiente-la-calidad-de-implementación-y-el-mantenimiento-fuera-del-ciclo-general) | Quieres revisar de forma independiente la calidad de implementación y el mantenimiento fuera del ciclo general |
| [`ywc-agent-legibility-audit`](#quieres-medir-el-costo-de-tokens-y-la-legibilidad-del-código-desde-la-perspectiva-de-un-agent) | Quieres medir el costo de tokens y la legibilidad del código desde la perspectiva de un agent |
| [`ywc-tdd-ritual`](#quieres-seguir-estrictamente-el-procedimiento-documentado-red--green--refactor-mientras-implementas) | Quieres seguir estrictamente el procedimiento documentado RED → GREEN → REFACTOR mientras implementas |
| [`ywc-debug-rootcause` y `ywc-incident-postmortem`](#) | Investigación de causa raíz y análisis posterior al incidente - ver [12. Debugging and incident postmortem](./12-debugging-and-incident-postmortem.md) |
| [`ywc-e2e-test-strategy`](#quieres-automatizar-un-critical-user-flow-con-playwright-o-revisar-los-huecos-en-la-cobertura-e2e-existente) | Quieres automatizar un critical user flow con Playwright, o revisar los huecos en la cobertura E2E existente |
| [`ywc-product-review`](#quieres-una-revisión-del-proyecto-desde-una-perspectiva-de-negocioservicio-no-de-código) | Quieres una revisión del proyecto desde una perspectiva de negocio/servicio, no de código |
| [`ywc-review-learnings`](#enseñe-al-sistema-sobre-la-retroalimentación-repetida-de-la-revisión-de-código-para-que-no-genere-el-mismo-falso-positivo-nuevamente) | Enseñe al sistema sobre la retroalimentación repetida de la revisión de código para que no genere el mismo falso positivo nuevamente |
| [`ywc-ubiquitous-language`](#crear-o-actualizar-un-glosario-de-dominio-compartido-por-desarrolladores-expertos-en-el-dominio-y-llms) | Crear o actualizar un glosario de dominio compartido por desarrolladores, expertos en el dominio y LLMs |
| [`ywc-mission`](#registra-el-porqué-del-proyecto-y-los-enfoques-rechazados) | Registra el porqué del proyecto y los enfoques rechazados |
| [`ywc-release-pr-list`](#resume-la-lista-de-prs-fusionados-incluidos-en-una-release-pr-develop-main-etc) | Resume la lista de PRs fusionados incluidos en una Release PR (develop->main, etc.) |
| [`ywc-changelog-release-notes`](#escribe-changelogmd-o-notas-de-la-versión-para-el-usuario) | Escribe CHANGELOG.md o notas de la versión para el usuario |
| [`ywc-skill-author`](#quieres-crear-una-nueva-skill-ywc--o-ordenarauditar-una-skill-existente-según-las-reglas) | Quieres crear una nueva skill ywc-*, o ordenar/auditar una skill existente según las reglas |
| [`ywc-setup-language` / `ywc-setup`](#configurar-un-idioma-de-salida-persistente-para-que-las-skills-no-lo-pidan-cada-vez) | Configurar un idioma de salida persistente para que las skills no lo pidan cada vez |
| [`ywc-worktrees`](#quieres-crear-una-ruta-de-worktree-aislada-o-auditarlalimpiarla) | Quieres crear una ruta de worktree aislada, o auditarla/limpiarla |
| [`ywc-docker-isolate`](#los-puertos-docker-de-tus-worktrees-paralelos-chocan-entre-sí-y-quieres-resolverlo) | Los puertos Docker de tus worktrees paralelos chocan entre sí y quieres resolverlo |

## Cuando quieras manejar PR / Revisar

### Responder a los comentarios de la revisión en un PR abierto y limpiar también CI/conflictos

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 250" />
  </ToolTabsPanel>
</ToolTabs>
Si omite el número PR, encuentra automáticamente el PR para la sucursal actual.

### Confirmar cambios y abrir un borrador PR

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: correct timezone offset in report export&quot; --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
Esto ya está incluido en los flujos de [04](./04-general-cycle-small.md) y [05](./05-general-cycle-medium-large.md), así que úsalo cuando quieras abrir solo un PR independiente fuera de esos flujos.

### Limpiar de una vez los PRs acumulados de Dependabot

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-merge-dependabot security parallel-auto" />
  </ToolTabsPanel>
</ToolTabs>
Si omite `security`, se dirige a todas las PR de Dependabot. Si omite `parallel-auto`, procesa las PR secuencialmente por número PR.

### Simplemente confirma el trabajo realizado hasta ahora

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-commit Confirma solo los cambios relacionados con authentication" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-commit Confirma solo los cambios relacionados con authentication" />
  </ToolTabsPanel>
</ToolTabs>
Esto no es para la creación de PR ni para los cambios de código en sí mismos. Es solo para commits.

### No quieres aceptar incondicionalmente los comentarios de un revisor (humano o CodeRabbit/Codex/Claude); quieres verificarlos técnicamente antes de responder

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-receive-review El revisor dice que esta función auxiliar no se usa y hay que borrarla, pero verifica eso primero" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-receive-review El revisor dice que esta función auxiliar no se usa y hay que borrarla, pero verifica eso primero" />
  </ToolTabsPanel>
</ToolTabs>
Esto bloquea el comportamiento por defecto de aceptar primero e implementar después, y trata cada comentario como una "sugerencia por verificar". Es la capa de juicio que complementa la automatización de `ywc-handle-pr-reviews`.

## Cuando aún no tienes un plan, o quieres que se ejecute hasta completarse sin intervención humana

### Tu idea aún no es concreta y quieres aclararla primero

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm Quiero crear una función de notificaciones, pero todavía no tengo claro cómo" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm Quiero crear una función de notificaciones, pero todavía no tengo claro cómo" />
  </ToolTabsPanel>
</ToolTabs>
A través del diálogo socrático, se derivan el objetivo / las limitaciones / los criterios de éxito y 2-3 alternativas, luego se entrega a `ywc-plan`.

### Quieres comparar librerías o enfoques de implementación para decidir qué usar

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research &quot;implementación SSE con Hono&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research &quot;implementación SSE con Hono&quot; --compare &quot;Redis,Valkey&quot;" />
  </ToolTabsPanel>
</ToolTabs>
Usa `--depth` para controlar la profundidad de la investigación (25 solo resumen ~ 100 exhaustiva) y `--format html` para un informe autocontenido.

### Quieres dar un objetivo y dejar que la planificación hasta la implementación se ejecute sin intervención humana

Esto se ha trasladado a la página dedicada `ywc-agentic`. Consulte [06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) para uso y ejemplos.

## Cuando quieres revisar la calidad, la seguridad y la perspectiva de producto

### Revisa las vulnerabilidades de seguridad en el código sensible, como autenticación/pagos

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-security-audit --code codex/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
</ToolTabs>

### Limpiar el código antiguo muerto (funciones/exportaciones/dependencias no utilizadas)

Esto se ha trasladado a la página dedicada `ywc-refactor-clean`. Consulte [16. Gestionar la estructura del código y la mantenibilidad](./16-code-structure-and-maintainability.md) para uso y ejemplos.

### Quieres reestructurar una arquitectura de shallow module enredada en deep module

Esto se ha trasladado a la página dedicada `ywc-improve-architecture`. Consulte [16. Gestionar la estructura del código y la mantenibilidad](./16-code-structure-and-maintainability.md) para uso y ejemplos.

### Quieres revisar de forma independiente la calidad de implementación y el mantenimiento fuera del ciclo general

Esto se ha trasladado a la página dedicada `ywc-impl-review`. Consulte [16. Gestionar la estructura del código y la mantenibilidad](./16-code-structure-and-maintainability.md) para uso y ejemplos.

### Quieres medir el costo de tokens y la legibilidad del código desde la perspectiva de un agent

Esto se ha trasladado a la página dedicada `ywc-agent-legibility-audit`. Consulte [16. Gestionar la estructura del código y la mantenibilidad](./16-code-structure-and-maintainability.md) para uso y ejemplos.

### Quieres seguir estrictamente el procedimiento documentado RED → GREEN → REFACTOR mientras implementas

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tdd-ritual Implementa con TDD la función que muestra el motivo específico del fallo de login" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tdd-ritual Implementa con TDD la función que muestra el motivo específico del fallo de login" />
  </ToolTabsPanel>
</ToolTabs>
El procedimiento opcional `--tdd` mencionado en `ywc-code-gen`, `ywc-sequential-executor`, etc. es exactamente esta skill — obliga a un paso de verificación en cada transición RED/GREEN/REFACTOR.

### Quieres automatizar un critical user flow con Playwright, o revisar los huecos en la cobertura E2E existente

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-e2e-test-strategy --flow user-login" />
  </ToolTabsPanel>
</ToolTabs>
Usa `--init` para configurar Playwright desde cero, o `--audit` para revisar solo los huecos de la cobertura existente.

### Quieres una revisión del proyecto desde una perspectiva de negocio/servicio, no de código

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-product-review --format html" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-product-review --format html" />
  </ToolTabsPanel>
</ToolTabs>
Revisa el proyecto desde un ángulo de negocio: valor para el usuario, UX, crecimiento, riesgo. Usa `ywc-impl-review` para revisión de código y `ywc-security-audit` para revisión de seguridad.

## Cuando quieres acumular conocimiento del proyecto (Habilidades con Estado)

Estas habilidades no son utilidades únicas. Gestionan el conocimiento que permanece en el proyecto después de que la conversación termina y puede ser consultado en sesiones posteriores.

### Enseñe al sistema sobre la retroalimentación repetida de la revisión de código para que no genere el mismo falso positivo nuevamente

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings Este comentario es un falso positivo, recuérdalo" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings Este comentario es un falso positivo, recuérdalo" />
  </ToolTabsPanel>
</ToolTabs>

### Crear o actualizar un glosario de dominio compartido por desarrolladores, expertos en el dominio y LLMs

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --context billing --ddd" />
  </ToolTabsPanel>
</ToolTabs>
`--ddd` agrega columnas de tipo DDD como Entidad / Objeto de Valor / Agregado.

### Registra el porqué del proyecto y los enfoques rechazados

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-mission El objetivo de este project es ..." />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-mission El objetivo de este project es ..." />
  </ToolTabsPanel>
</ToolTabs>
Esto ya está cubierto en [07. Starting a new Project](./07-starting-a-new-project.md), y también se puede reutilizar cuando cambie la dirección del proyecto.

## Cuando quieres preparar un lanzamiento

### Resume la lista de PRs fusionados incluidos en una Release PR (develop->main, etc.)

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-release-pr-list 301" />
  </ToolTabsPanel>
</ToolTabs>

### Escribe CHANGELOG.md o notas de la versión para el usuario

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>
Si pasas `--pr-list <result file from ywc-release-pr-list>`, usa esa lista como la fuente en lugar de git log.

## Cuando quieres extender el propio Toolkit o gestionar la infraestructura de ejecución

### Quieres crear una nueva skill ywc-*, o ordenar/auditar una skill existente según las reglas

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-skill-author Quiero crear una nueva skill para manejar reintentos de webhooks de pago" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-skill-author Quiero crear una nueva skill para manejar reintentos de webhooks de pago" />
  </ToolTabsPanel>
</ToolTabs>
Valida y alinea las reglas de frontmatter/body/references de una skill `ywc-*`. Úsala al crear o reestructurar una skill en sí misma, no al editar su contenido.

### Configurar un idioma de salida persistente para que las skills no lo pidan cada vez

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-setup-language ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-setup --scope project --lang ko" />
  </ToolTabsPanel>
</ToolTabs>
Úsala cuando quieras que los documentos generados, el texto de PR y los mensajes de commit mantengan el mismo idioma de salida sin pasar `--lang` en cada llamada a una skill. Configura un valor persistente de proyecto o usuario; no cambia el idioma del chat actual.

Las banderas puntuales siguen teniendo prioridad. El orden de resolución es: `--lang` explícito en la skill consumidora > valor persistente de proyecto/usuario > preguntar.

### Quieres crear una ruta de worktree aislada, o auditarla/limpiarla

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-worktrees --mode create --task-name 000020-010-api-webhook --branch feature/000020-010-api-webhook --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>
Normalmente la llama internamente `ywc-parallel-executor`, pero también puedes auditarla/podarla/resolverla directamente con `--mode audit`/`prune`/`resolve`.

### Los puertos Docker de tus worktrees paralelos chocan entre sí y quieres resolverlo

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-docker-isolate setup --task-name 000020-010-api-webhook --worktree-path .worktrees/000020-010-api-webhook" />
  </ToolTabsPanel>
</ToolTabs>
La skill de asignación determinista de puertos que `ywc-parallel-executor` llama automáticamente para cada worktree de tarea — asigna a cada worktree su propio `COMPOSE_PROJECT_NAME` y bloque de puertos para evitar colisiones de tipo "port is already allocated".

## Índice completo de Skills (A-Z)

Todas las skills `ywc-*` de este toolkit, ordenadas alfabéticamente. Consulta la ubicación de cada skill (una página dedicada o la entrada situacional anterior) para ver el uso detallado.

| Skill | Descripción | Ubicación |
|---|---|---|
| `ywc-agent-legibility-audit` | Quieres medir el costo de tokens y la legibilidad del código desde la perspectiva de un agent | [16](./16-code-structure-and-maintainability.md) |
| `ywc-agentic` | Quieres dar un objetivo y dejar que la planificación hasta la implementación se ejecute sin intervención humana | [aquí](#quieres-dar-un-objetivo-y-dejar-que-la-planificación-hasta-la-implementación-se-ejecute-sin-intervención-humana) |
| `ywc-brainstorm` | Tu idea aún no es concreta y quieres aclararla primero | [aquí](#tu-idea-aún-no-es-concreta-y-quieres-aclararla-primero) |
| `ywc-changelog-release-notes` | Escribe CHANGELOG.md o notas de la versión para el usuario | [aquí](#escribe-changelogmd-o-notas-de-la-versión-para-el-usuario) |
| `ywc-code-gen` | Skill de generación de código multicapa que genera Backend/Frontend/QA en paralelo | [13](./13-executor-and-codegen-patterns.md) |
| `ywc-commit` | Simplemente confirma el trabajo realizado hasta ahora | [aquí](#simplemente-confirma-el-trabajo-realizado-hasta-ahora) |
| `ywc-confidence-gate` | Un confidence gate que puntúa PROCEED/REVIEW/STOP para decidir si un artefacto puede avanzar a la siguiente etapa | [06](./06-agentic-autonomous-loop.md) |
| `ywc-create-pr` | Confirmar cambios y abrir un borrador PR | [aquí](#confirmar-cambios-y-abrir-un-borrador-pr) |
| `ywc-debug-rootcause` | Estás atascado porque no puedes encontrar la causa raíz de un error | [12](./12-debugging-and-incident-postmortem.md) |
| `ywc-design-renew` | Renueva visualmente (De-slop) una pantalla que se siente ordinaria | [11](./11-design-review.md) |
| `ywc-docker-isolate` | Los puertos Docker de tus worktrees paralelos chocan entre sí y quieres resolverlo | [aquí](#los-puertos-docker-de-tus-worktrees-paralelos-chocan-entre-sí-y-quieres-resolverlo) |
| `ywc-e2e-test-strategy` | Quieres automatizar un critical user flow con Playwright, o revisar los huecos en la cobertura E2E existente | [aquí](#quieres-automatizar-un-critical-user-flow-con-playwright-o-revisar-los-huecos-en-la-cobertura-e2e-existente) |
| `ywc-finish-branch` | Finaliza una feature branch completada — desde la creación del PR hasta el merge y la limpieza | [04](./04-general-cycle-small.md) |
| `ywc-gen-testcase` | Genera un documento de prueba manual (testsheet) a partir de un spec para la verificación del PR | [09](./09-testing-guide.md) |
| `ywc-handle-pr-reviews` | Responder a los comentarios de la revisión en un PR abierto y limpiar también CI/conflictos | [aquí](#responder-a-los-comentarios-de-la-revisión-en-un-pr-abierto-y-limpiar-también-ciconflictos) |
| `ywc-impl-review` | Quieres revisar de forma independiente la calidad de implementación y el mantenimiento fuera del ciclo general | [16](./16-code-structure-and-maintainability.md) |
| `ywc-improve-architecture` | Quieres reestructurar una arquitectura de shallow module enredada en deep module | [16](./16-code-structure-and-maintainability.md) |
| `ywc-incident-postmortem` | Ocurrió un incidente de producción y necesitas escribir un informe posterior al incidente | [12](./12-debugging-and-incident-postmortem.md) |
| `ywc-merge-dependabot` | Limpiar de una vez los PRs acumulados de Dependabot | [aquí](#limpiar-de-una-vez-los-prs-acumulados-de-dependabot) |
| `ywc-mission` | Registra el porqué del proyecto y los enfoques rechazados | [aquí](#registra-el-porqué-del-proyecto-y-los-enfoques-rechazados) |
| `ywc-onboard-repo` | Skill de onboarding que deduce las convenciones de un repo desconocido y genera un CLAUDE.md | [08](./08-onboarding-existing-repo.md) |
| `ywc-parallel-executor` | Ejecuta múltiples Tasks en paralelo usando worktrees aislados | [13](./13-executor-and-codegen-patterns.md) |
| `ywc-plan` | Skill de punto de entrada que redacta un plan de implementación para una función o cambio | [04](./04-general-cycle-small.md) |
| `ywc-product-review` | Quieres una revisión del proyecto desde una perspectiva de negocio/servicio, no de código | [aquí](#quieres-una-revisión-del-proyecto-desde-una-perspectiva-de-negocioservicio-no-de-código) |
| `ywc-project-docs` | Genera documentación del proyecto siguiendo la estructura del directorio docs/ | [07](./07-starting-a-new-project.md) |
| `ywc-project-scaffold` | Diseña la estructura de directorios de un proyecto completamente nuevo | [07](./07-starting-a-new-project.md) |
| `ywc-receive-review` | No quieres aceptar incondicionalmente los comentarios de un revisor (humano o CodeRabbit/Codex/Claude); quieres verificarlos técnicamente antes de responder | [aquí](#no-quieres-aceptar-incondicionalmente-los-comentarios-de-un-revisor-humano-o-coderabbitcodexclaude-quieres-verificarlos-técnicamente-antes-de-responder) |
| `ywc-refactor-clean` | Limpiar el código antiguo muerto (funciones/exportaciones/dependencias no utilizadas) | [16](./16-code-structure-and-maintainability.md) |
| `ywc-release-pr-list` | Resume la lista de PRs fusionados incluidos en una Release PR (develop->main, etc.) | [aquí](#resume-la-lista-de-prs-fusionados-incluidos-en-una-release-pr-develop-main-etc) |
| `ywc-review-learnings` | Enseñe al sistema sobre la retroalimentación repetida de la revisión de código para que no genere el mismo falso positivo nuevamente | [aquí](#enseñe-al-sistema-sobre-la-retroalimentación-repetida-de-la-revisión-de-código-para-que-no-genere-el-mismo-falso-positivo-nuevamente) |
| `ywc-security-audit` | Revisa las vulnerabilidades de seguridad en el código sensible, como autenticación/pagos | [aquí](#revisa-las-vulnerabilidades-de-seguridad-en-el-código-sensible-como-autenticaciónpagos) |
| `ywc-sequential-executor` | Ejecuta múltiples Tasks uno a la vez, en orden | [13](./13-executor-and-codegen-patterns.md) |
| `ywc-setup` | Configurar un idioma de salida persistente para que las skills no lo pidan cada vez | [aquí](#configurar-un-idioma-de-salida-persistente-para-que-las-skills-no-lo-pidan-cada-vez) |
| `ywc-skill-author` | Quieres crear una nueva skill ywc-*, o ordenar/auditar una skill existente según las reglas | [aquí](#quieres-crear-una-nueva-skill-ywc--o-ordenarauditar-una-skill-existente-según-las-reglas) |
| `ywc-spec-ready` | Gate que verifica si un documento spec está listo para implementarse | [05](./05-general-cycle-medium-large.md) |
| `ywc-spec-validate` | Revisa un documento spec en busca de contradicciones y vacíos | [05](./05-general-cycle-medium-large.md) |
| `ywc-spec-writer` | Escribe un documento PRD/spec | [07](./07-starting-a-new-project.md) |
| `ywc-task-generator` | Descompone un spec en Tasks ejecutables | [05](./05-general-cycle-medium-large.md) |
| `ywc-tdd-ritual` | Quieres seguir estrictamente el procedimiento documentado RED → GREEN → REFACTOR mientras implementas | [aquí](#quieres-seguir-estrictamente-el-procedimiento-documentado-red--green--refactor-mientras-implementas) |
| `ywc-tech-research` | Quieres comparar librerías o enfoques de implementación para decidir qué usar | [aquí](#quieres-comparar-librerías-o-enfoques-de-implementación-para-decidir-qué-usar) |
| `ywc-ubiquitous-language` | Crear o actualizar un glosario de dominio compartido por desarrolladores, expertos en el dominio y LLMs | [aquí](#crear-o-actualizar-un-glosario-de-dominio-compartido-por-desarrolladores-expertos-en-el-dominio-y-llms) |
| `ywc-ui-ux-review` | Revisa la usabilidad y accesibilidad de la pantalla | [11](./11-design-review.md) |
| `ywc-verify-done` | Verifica mecánicamente la finalización ejecutando lint/typecheck/test/build | [06](./06-agentic-autonomous-loop.md) |
| `ywc-worktrees` | Quieres crear una ruta de worktree aislada, o auditarla/limpiarla | [aquí](#quieres-crear-una-ruta-de-worktree-aislada-o-auditarlalimpiarla) |

---

[Previous: 13. Executor / Patrones de indicación de generación de código](./13-executor-and-codegen-patterns.md) - [Next: 15. Requisitos previos e instalación](./15-prerequisites-installation.md)
