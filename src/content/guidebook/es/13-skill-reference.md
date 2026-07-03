[Back to table of contents](./README.md)

# 13. Referencia completa Skill

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
| [`ywc-debug-rootcause`](#estás-atascado-porque-no-puedes-encontrar-la-causa-de-un-error) | Estás atascado porque no puedes encontrar la causa de un error |
| [`ywc-refactor-clean`](#limpiar-el-código-antiguo-muerto-funcionesexportacionesdependencias-no-utilizadas) | Limpiar el código antiguo muerto (funciones/exportaciones/dependencias no utilizadas) |
| [`ywc-incident-postmortem`](#escribir-un-informe-postmortem-para-un-incidente-de-producción) | Escribir un informe postmortem para un incidente de producción |
| [`ywc-tdd-ritual`](#quieres-seguir-estrictamente-el-procedimiento-documentado-red--green--refactor-mientras-implementas) | Quieres seguir estrictamente el procedimiento documentado RED → GREEN → REFACTOR mientras implementas |
| [`ywc-e2e-test-strategy`](#quieres-automatizar-un-critical-user-flow-con-playwright-o-revisar-los-huecos-en-la-cobertura-e2e-existente) | Quieres automatizar un critical user flow con Playwright, o revisar los huecos en la cobertura E2E existente |
| [`ywc-product-review`](#quieres-una-revisión-del-proyecto-desde-una-perspectiva-de-negocioservicio-no-de-código) | Quieres una revisión del proyecto desde una perspectiva de negocio/servicio, no de código |
| [`ywc-review-learnings`](#enseñe-al-sistema-sobre-la-retroalimentación-repetida-de-la-revisión-de-código-para-que-no-genere-el-mismo-falso-positivo-nuevamente) | Enseñe al sistema sobre la retroalimentación repetida de la revisión de código para que no genere el mismo falso positivo nuevamente |
| [`ywc-ubiquitous-language`](#crear-o-actualizar-un-glosario-de-dominio-compartido-por-desarrolladores-expertos-en-el-dominio-y-llms) | Crear o actualizar un glosario de dominio compartido por desarrolladores, expertos en el dominio y LLMs |
| [`ywc-project-mission`](#registra-el-porqué-del-proyecto-y-los-enfoques-rechazados) | Registra el porqué del proyecto y los enfoques rechazados |
| [`ywc-release-pr-list`](#resume-la-lista-de-prs-fusionados-incluidos-en-una-release-pr-develop-main-etc) | Resume la lista de PRs fusionados incluidos en una Release PR (develop->main, etc.) |
| [`ywc-changelog-release-notes`](#escribe-changelogmd-o-notas-de-la-versión-para-el-usuario) | Escribe CHANGELOG.md o notas de la versión para el usuario |
| [`ywc-skill-author`](#quieres-crear-una-nueva-skill-ywc--o-ordenarauditar-una-skill-existente-según-las-reglas) | Quieres crear una nueva skill ywc-*, o ordenar/auditar una skill existente según las reglas |
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
    <CodeBlock label="claude code" code="ywc-security-audit --code tools/codex-skill/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-security-audit --code tools/codex-skill/skills/ywc-security-audit/SKILL.md" />
  </ToolTabsPanel>
</ToolTabs>

### Estás atascado porque no puedes encontrar la causa de un error

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-debug-rootcause El webhook de pago a veces se procesa por duplicado. No puedo encontrar la causa" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-debug-rootcause El webhook de pago a veces se procesa por duplicado. No puedo encontrar la causa" />
  </ToolTabsPanel>
</ToolTabs>
Esto evita los parches que solo abordan los síntomas y obliga a una investigación de causa raíz en cuatro pasos. Si las soluciones fallan en el mismo punto tres o más veces, te guía a cuestionar la arquitectura en sí.

### Limpiar el código antiguo muerto (funciones/exportaciones/dependencias no utilizadas)

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-refactor-clean --scope tools/codex-skill/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-refactor-clean --scope tools/codex-skill/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
</ToolTabs>

### Escribir un informe postmortem para un incidente de producción

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
</ToolTabs>
`--client` además crea un resumen para el cliente que omite detalles internos.

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
    <CodeBlock label="claude code" code="ywc-project-mission El objetivo de este project es ..." />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission El objetivo de este project es ..." />
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

---

[Previous: 12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md) - [Next: 14. Prerequisites and installation](./14-prerequisites-installation.md)
