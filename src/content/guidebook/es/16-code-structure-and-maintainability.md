[« Volver al índice](./README.md)

# 14. Gestionar la estructura del código y la mantenibilidad

## Cuándo usar estas 2 Skills

Las dos Skills parten del mismo síntoma — "el código no está bien" — pero responden preguntas distintas. Elige según qué pregunta te estés haciendo ahora mismo.

| Qué quieres hacer | Pregunta | Skill a usar |
|---|---|---|
| Eliminar funciones/exportaciones/dependencias no utilizadas | "¿Se usa realmente este código?" | `ywc-refactor-clean` |
| Obtener una revisión de calidad de implementación y conformidad con el spec fuera del ciclo de PR | "¿Esta implementación es sólida desde el punto de vista de architecture/design/devex/security/QA?" | `ywc-impl-review` |

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

`--tier safe` solo elimina elementos en los que la herramienta de detección, grep y los tests coinciden en que el código no se usa. No reestructura nada: la estructura en sí no la toca esta Skill. Usa `ywc-impl-review` para detectar problemas de arquitectura o diseño y corrígelos después mediante el ciclo normal.

## `ywc-impl-review` — Revisión de calidad de implementación (independiente)

Ejecuta una revisión paralela de 5 ejes: Architecture / Design / Devex / Security / QA. Ya está integrado como el paso de verificación previo al PR en [05](./04-general-cycle-small.md) y [06](./05-general-cycle-medium-large.md), pero también puedes ejecutarlo de forma independiente contra código existente fuera de esos flujos.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-impl-review --spec docs/ywc-plans/billing-refactor.md --git-range main..HEAD" />
  </ToolTabsPanel>
</ToolTabs>

Es un análisis de solo lectura que no modifica el código — la corrección real de cualquier hallazgo se despacha por separado al agent de Backend/Frontend.

**Opciones que conviene conocer**

- Elige exactamente un objetivo de revisión: `--code <path>`, `--git-range <sha>..<sha>` o `--working-tree` (cambios staged, unstaged y untracked, sin necesidad de commit). `--spec` es opcional en Claude Code.
- `--profile chill|assertive` (por defecto `chill`): `chill` oculta los nits de estilo Low/Info; `assertive` los muestra. Critical/High/Medium nunca se ocultan.
- `--no-advisor` omite las llamadas al advisor de la Fase 2; `--advisor-budget <n>` limita cuántas se hacen (por defecto 5).
- `--format html` escribe un informe autocontenido en `claudedocs/` (por defecto `markdown`).
- `--non-interactive` (solo en Claude Code): omite la pregunta de promoción de learnings y, en su lugar, lista los candidatos a learning en el informe.

**Verificación independiente.** Cada hallazgo Critical o High confirmado es revisado de nuevo, una vez, por un revisor nuevo que solo ve `file:line` y la severidad declarada. Los hallazgos que no se pueden reproducir se envían al advisor de la Fase 2 (salvo los de Security) o se marcan como no verificados. Como máximo se verifican 20 hallazgos por ejecución.

**Guardarraíl de alcance.** La revisión se niega a empezar (`NEEDS_CONTEXT`) cuando hay más de 200 archivos o más de 5.000 líneas cambiadas en el alcance. Informa de los recuentos y de los 5 archivos más grandes, y te pide acotar el objetivo. No se muestrea ni se trunca nada.

## Cómo funcionan juntas las 2 Skills

Un orden habitual para limpiar un codebase desconocido o antiguo que da miedo tocar:

**Paso 1: Empieza por lo más seguro — `ywc-refactor-clean`**

Si hay dead code, atiende primero este paso, el más reversible. Solo elimina lo que la herramienta de detección, grep y los tests coinciden en marcar como no usado, así que el riesgo es bajo.

**Paso 2: Verificación final — `ywc-impl-review`**

Antes de abrir el PR, ejecuta una revisión de 5 ejes para detectar lo que haya quedado pendiente. Los hallazgos pueden volver al Paso 1 (`ywc-refactor-clean`) o a la implementación normal.

---

[← Anterior: 13. Revisando y mejorando el diseño](./11-design-review.md) · [Siguiente: 15. Debugging e informe postmortem →](./12-debugging-and-incident-postmortem.md)
