[Back to table of contents](./README.md)

# 03. Envía tu primera función en 5 minutos

Esta página es tu primer ejercicio práctico: sigue la corrección de un pequeño error desde la etapa de idea hasta la fusión. Escenario de ejemplo: manejar la solicitud **"El mensaje de error de fallo de inicio de sesión es demasiado genérico, por lo que es difícil entender la causa."**

Los conceptos detrás de este flujo se explican con más detalle en [04. general cycle (small)](./04-general-cycle-small.md). Esta página se centra en la práctica.

## Paso 1 - Crear un plan

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan El mensaje de error de fallo de inicio de sesión es demasiado genérico, por lo que es difícil entender la causa. Se quiere mostrar razones específicas como cuenta bloqueada / error de tipeo / no registrado" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan El mensaje de error de fallo de inicio de sesión es demasiado genérico, por lo que es difícil entender la causa. Se quiere mostrar razones específicas como cuenta bloqueada / error de tipeo / no registrado" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-plan` lee primero la base de código y decide si este cambio es lo suficientemente **Pequeño** como para completarse como un solo PR. Si se juzga como Pequeño, se crea un archivo `plan.md`. Verifica que las cuatro secciones - Qué / Por qué / Fuera de alcance / Cuando esté hecho - estén completadas.

## Paso 2 - Converger el plan

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
</ToolTabs>

Si `plan.md` todavía tiene preocupaciones, se refinan y revalidan automáticamente. Si ya está limpio, se entrega al siguiente paso sin cambios.

## Paso 3 - Generar código

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

Esto genera las capas de Backend / Frontend / QA en paralelo. Cuando la generación termina, obtienes un informe de finalización que termina en uno de `DONE`, `DONE_WITH_CONCERNS`, `BLOCKED` o `NEEDS_CONTEXT`. Consulta [02. Core concepts](./02-core-concepts.md) para ver lo que significa cada estado.

## Paso 4 - Revisar antes de abrir un PR

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-code-gen` no tiene bandera de revisión automática. Si omites este paso, el PR se abre sin revisión de código. **No lo omitas.**

## Paso 5 - Crear el PR y manejar la Revisión

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

`ywc-create-pr` maneja commit, escaneo de secretos, validación local, creación de borradores PR y verificaciones remotas CI/Review de Bot. Si los comentarios de revisión del Bot o los problemas de preparación para merge permanecen, ejecuta un barrido de salud PR por separado así:

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-handle-pr-reviews 123" />
  </ToolTabsPanel>
</ToolTabs>

El flujo Small se basa en `plan.md`, por lo que no tiene el artefacto `tasks/<task-name>/`. Por lo tanto, después de la aprobación del revisor, fusionar a través de la interfaz GitHub o `gh pr merge` es más seguro que usar `ywc-finish-branch`, que incluye el manejo de la finalización de tareas.

## Si has llegado hasta aquí

Has completado un cambio de principio a fin. Buenas siguientes páginas:

- Si el cambio es mayor que esto y necesita ser dividido en múltiples Tasks -> [05. general cycle (medium/large)](./05-general-cycle-medium-large.md)
- Si la idea aún no es concreta, a diferencia de este ejercicio donde el problema ya está claro -> comienza con `ywc-brainstorm` (ver [13. Full Skill Reference](./13-skill-reference.md))
- Si quieres entregar un objetivo y hacer que el sistema continúe automáticamente hasta el final en lugar de gestionar cada paso tú mismo -> [06. Finish automatically from one goal](./06-agentic-autonomous-loop.md)

---

[Previous: 02. Core concepts](./02-core-concepts.md) - [Next: 04. Handling a small change](./04-general-cycle-small.md)
