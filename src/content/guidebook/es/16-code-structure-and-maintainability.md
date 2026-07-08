[« Volver al índice](./README.md)

# 16. Gestionar la estructura del código y la mantenibilidad

## Cuándo usar estas 4 Skills

Las cuatro Skills parten del mismo síntoma — "el código no está bien" — pero responden preguntas distintas. Elige según qué pregunta te estés haciendo ahora mismo.

| Qué quieres hacer | Pregunta | Skill a usar |
|---|---|---|
| Eliminar funciones/exportaciones/dependencias no utilizadas | "¿Se usa realmente este código?" | `ywc-refactor-clean` |
| Los shallow module están enredados y quieres reestructurarlos | "¿Esta estructura necesita convertirse en un deep module?" | `ywc-improve-architecture` |
| Obtener una revisión de calidad de implementación y conformidad con el spec fuera del ciclo de PR | "¿Esta implementación es sólida desde el punto de vista de architecture/design/devex/security/QA?" | `ywc-impl-review` |
| Medir cuán costoso es para un agent modificar este código antes de tocarlo | "¿Cuántos tokens necesitaría un agent para cambiar esto?" | `ywc-agent-legibility-audit` |

## `ywc-refactor-clean` — Limpieza de Dead Code

Encuentra código muerto antiguo (funciones/exportaciones/dependencias no utilizadas) con herramientas como knip / depcheck / ts-prune y lo elimina de forma segura.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-refactor-clean --scope codex/skills/ywc-refactor-clean/ --tier safe" />
  </ToolTabsPanel>
</ToolTabs>

`--tier safe` solo elimina elementos en los que la herramienta de detección, grep y los tests coinciden en que el código no se usa. No reestructura nada — eso es trabajo de `ywc-improve-architecture`.

## `ywc-improve-architecture` — Reestructuración Shallow → Deep Module

Reestructura una pila enredada de shallow module en deep module (una interfaz simple que oculta una implementación completa), preservando el comportamiento y una unidad revisable a la vez.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-improve-architecture --scope src/services/billing --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

Primero revisa solo el Opportunity Backlog con `--dry-run`, y si no hay problemas, quita el flag y ejecuta la consolidación real. No puedes apuntar a todo el codebase de una vez (Scope Gate) — debes limitarlo a un module/directory.

## `ywc-impl-review` — Revisión de calidad de implementación (independiente)

Ejecuta una revisión paralela de 5 ejes: Architecture / Design / Devex / Security / QA. Ya está integrado como el paso de verificación previo al PR en [04](./04-general-cycle-small.md) y [05](./05-general-cycle-medium-large.md), pero también puedes ejecutarlo de forma independiente contra código existente fuera de esos flujos.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
</ToolTabs>

Es un análisis de solo lectura que no modifica el código — la corrección real de cualquier hallazgo se despacha por separado al agent de Backend/Frontend.

## `ywc-agent-legibility-audit` — Legibilidad desde la perspectiva del agent

Mide — no correctness ni seguridad, sino "cuántos tokens le cuesta a un agent modificar este código de forma segura" — según la proporción de deep/shallow module y qué tan claramente está nombrado el change point.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agent-legibility-audit --scope src/services/billing" />
  </ToolTabsPanel>
</ToolTabs>

Un informe de solo lectura. No reestructura nada por sí mismo; los hallazgos se enrutan a `ywc-improve-architecture` (reestructuración shallow→deep) o `ywc-refactor-clean` (eliminación de dead code).

## Cómo funcionan juntas las 4 Skills

Un orden habitual para limpiar un codebase desconocido o antiguo que da miedo tocar:

**Paso 1: Mide primero — `ywc-agent-legibility-audit`**

Antes de cambiar nada, mide de forma read-only dónde la relación costo-beneficio de tocar el código es peor. Señala los puntos con peor legibility según la proporción de deep/shallow module y qué tan claramente están nombrados los change points.

**Paso 2: Empieza por lo más seguro — `ywc-refactor-clean`**

Si la medición muestra que el dead code está arrastrando la legibility hacia abajo, atiende primero este paso, el más reversible. Solo elimina lo que la herramienta de detección, grep y los tests aceptan los tres a la vez, así que el riesgo es bajo.

**Paso 3: Reestructura la forma misma — `ywc-improve-architecture`**

Si tras eliminar el dead code queda una pila de shallow module, reestrúcturala ahora en deep module — preservando el comportamiento, una unidad a la vez, detrás de una suite de tests en verde.

**Paso 4: Verificación final — `ywc-impl-review`**

Una vez terminada la reestructuración, ejecuta una revisión de 5 ejes antes de abrir el PR para detectar lo que haya quedado pendiente. Los hallazgos aquí pueden volver al Paso 1 (`ywc-agent-legibility-audit`) o a los Pasos 2–3.

---

[← Anterior: 15. Requisitos previos e instalación](./15-prerequisites-installation.md) · [Volver al índice »](./README.md)
