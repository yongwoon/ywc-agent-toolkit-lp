[Back to table of contents](./README.md)

# 04. Manejo de un cambio pequeño (ciclo general - pequeño)

## Cuándo usar este flujo

Cuando `ywc-plan` juzga una solicitud como **Pequeña**, automáticamente entra en este camino. El criterio de decisión es "¿puede esto terminar como un único PR sin descomposición Task?" Si se aplica algún elemento de los siguientes, se eleva a Mediana/Grande en lugar de Pequeña (ver [05](./05-general-cycle-medium-large.md)).

- Incluye una migración de base de datos
- Introduce una nueva biblioteca/marco
- Se extiende a múltiples subsistemas

## Flujo general

```
ywc-plan -> ywc-spec-ready -> ywc-code-gen -> ywc-impl-review -> ywc-create-pr
```

| Paso | Skill | Rol |
|---|---|---|
| uno | `ywc-plan` | Analiza la solicitud y crea `plan.md` (Qué / Por qué / Fuera de alcance / Hecho cuando) |
| Dos | `ywc-spec-ready` | Converger automáticamente las preocupaciones restantes en `plan.md` |
| tres | `ywc-code-gen` | Generar código de Backend + Frontend + QA en paralelo |
| cuatro | `ywc-impl-review` | Revisión final del código antes de abrir un PR |
| cinco | `ywc-create-pr` | Creación de PR -> CI -> Comprobación de revisión del bot |

> **Nota**: `ywc-code-gen` no tiene un indicador de revisión automática como `--review`. Si omite el paso 4 (`ywc-impl-review`), el PR se abre sin revisión de código, por lo que este flujo debe ejecutarlo explícitamente. Los ejecutores en el flujo Medio/Grande pueden automatizar este paso con el indicador `--review` - vea [05](./05-general-cycle-medium-large.md).

## Ejemplo de ejecución

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan El mensaje de error de fallo de inicio de sesión es demasiado genérico, por lo que es difícil entender la causa. Se quiere mostrar razones específicas como cuenta bloqueada / error de tipeo / no registrado" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan El mensaje de error de fallo de inicio de sesión es demasiado genérico, por lo que es difícil entender la causa. Se quiere mostrar razones específicas como cuenta bloqueada / error de tipeo / no registrado" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec plan.md" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec plan.md --feature &quot;specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-create-pr --title &quot;fix: show specific login failure reason&quot;" />
  </ToolTabsPanel>
</ToolTabs>

Si los comentarios de revisión del Bot, el fallo CI, o los problemas de preparación para la fusión permanecen, continúe con `ywc-handle-pr-reviews <pr-number>`. El flujo Small se basa en `plan.md`, por lo que no existe el directorio `tasks/<task-name>/` y no encaja con la gestión de finalización de tareas de `ywc-finish-branch`.

## Cuando te bloqueas en cada paso

| Situación | Acción |
|---|---|
| `ywc-plan` juzga el trabajo como Medio en lugar de Pequeño | Esto es normal - muévete a [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) |
| `ywc-code-gen` devuelve `BLOCKED` | La especificación puede ser poco clara o no se pudo leer el contexto del proyecto: verifica el bloqueo reportado |
| `ywc-impl-review` devuelve `DONE_WITH_CONCERNS` | Si es un problema de corrección, corríjalo y vuelva a ejecutar; si es una observación, regístrela en la descripción PR y continúe |
| El PR falla CI | `ywc-create-pr` o `ywc-handle-pr-reviews` revisa el registro de fallos e intenta reparaciones hasta dos veces; si aún falla, el problema se presenta como `DONE_WITH_CONCERNS` o `BLOCKED` |

---

[Previous: 03. Ship your first feature in 5 minutes](./03-quickstart.md) - [Next: 05. Handling work split into multiple Tasks](./05-general-cycle-medium-large.md)
