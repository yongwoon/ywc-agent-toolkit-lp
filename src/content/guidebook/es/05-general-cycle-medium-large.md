[Back to table of contents](./README.md)

# 05. Manejo del trabajo dividido en múltiples Tasks (ciclo general - mediano/grande)

## Cuándo usar este flujo

Si se aplica alguno de los siguientes casos, `ywc-plan` se redirige a esta ruta.

- El cambio es difícil de encajar en una sola revisión PR (múltiples pantallas, múltiples API, múltiples subsistemas)
- Incluye una migración de base de datos (siempre este camino independientemente de la escala - Invariante de seguridad)
- Introduce una nueva Biblioteca/Framework (también siempre esta ruta)

## Flujo general

```
ywc-plan -> ywc-spec-ready -> ywc-task-generator -> ywc-sequential-executor --review or ywc-parallel-executor --review
```

| Paso | Skill | Rol |
|---|---|---|
| uno | `ywc-plan` | Analiza la solicitud y crea una especificación `docs/ywc-plans/<slug>.md` |
| Dos | `ywc-spec-ready` | Repetir automáticamente `ywc-plan --update-spec` y `ywc-spec-validate` hasta que la especificación sea `DONE` |
| tres | `ywc-task-generator` | Descomponer la especificación `DONE` en Tasks (`tasks/<phase>-<sequence>-<slug>/`) segura para dependencias |
| cuatro | `ywc-sequential-executor` o `ywc-parallel-executor` | Implementar realmente Tasks -> PR -> Fusionar |

**Cómo elegir Secuencial vs Paralelo**

| Situación | Elección |
|---|---|
| El orden de Task importa, o Tasks dependen de los resultados de los demás | `ywc-sequential-executor` |
| Tasks son independientes y se agrupan en ondas paralelizables en `dependency-graph.md` | `ywc-parallel-executor` (aislado con Git Worktrees) |

## Ejemplo de ejecución

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan Los usuarios necesitan una pantalla de configuración y una API para activar/desactivar cada tipo de notificación. Soporta 3 canales: correo electrónico/push/en la aplicación" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan Los usuarios necesitan una pantalla de configuración y una API para activar/desactivar cada tipo de notificación. Soporta 3 canales: correo electrónico/push/en la aplicación" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-ready --spec docs/ywc-plans/notification-settings.md" />
  </ToolTabsPanel>
</ToolTabs>

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

Los comandos de ejecución después de esto tienen muchas opciones, por lo que se cubren en una página separada: [15. Executor / Patrones de indicación de generación de código](./13-executor-and-codegen-patterns.md). El punto de partida más simple es:

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --review" />
  </ToolTabsPanel>
</ToolTabs>

Si omites la tarea, encuentra automáticamente el siguiente Task ejecutable desde `dependency-graph.md`.

## Siempre incluye `--review`

Ambos ejecutores usan la bandera `--review` para ejecutar automáticamente `/ywc-impl-review` antes de la creación/fusión de PR para cada Task. Ejecutar sin esta bandera es equivalente a omitir completamente el paso de revisión en el ciclo pequeño de [04](./04-general-cycle-small.md). No hay una buena razón para omitirla. (Si un Task tiene `Criticality: critical`, la revisión se fuerza independientemente de la bandera.)

## Cuando te bloqueas en cada paso

| Situación | Acción |
|---|---|
| `ywc-spec-ready` alcanza el límite de iteración | Un problema fundamental de la especificación está impidiendo la convergencia automática: lee el informe parcial y edita la especificación directamente |
| `ywc-task-generator` intenta crear 20 o más Tasks | Esto señala que la especificación en sí es demasiado grande; considere dividir primero la especificación |
| Una dependencia no se completa durante la ejecución de Task | El ejecutor se detiene automáticamente e informa cuál Task debe preceder al actual |

---

[Previous: 04. Handling a small change](./04-general-cycle-small.md) - [Next: 06. Finish automatically from one goal](./06-agentic-autonomous-loop.md)
