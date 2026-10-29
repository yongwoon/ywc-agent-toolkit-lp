[« Volver al índice](./README.md)

# 13. Gestionar la estructura del código y la mantenibilidad

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

## Cómo funcionan juntas las 2 Skills

Un orden habitual para limpiar un codebase desconocido o antiguo que da miedo tocar:

**Paso 1: Empieza por lo más seguro — `ywc-refactor-clean`**

Si hay dead code, atiende primero este paso, el más reversible. Solo elimina lo que la herramienta de detección, grep y los tests aceptan los tres a la vez, así que el riesgo es bajo.

**Paso 2: Verificación final — `ywc-impl-review`**

Antes de abrir el PR, ejecuta una revisión de 5 ejes para detectar lo que haya quedado pendiente. Los hallazgos pueden volver al Paso 1 (`ywc-refactor-clean`) o a la implementación normal.

---

[Previous: 12. Debugging e informe postmortem](./12-debugging-and-incident-postmortem.md) - [Next: 14. Gestionar la infraestructura en la nube](./17-infrastructure-and-cloud.md)
