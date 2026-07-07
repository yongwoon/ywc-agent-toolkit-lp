[Back to table of contents](./README.md)

# 12. Debugging e informe postmortem

## Cuándo usar este flujo

Las dos habilidades responden a preguntas diferentes. Elige según dónde te encuentres en el incidente.

| Lo que estás experimentando | Pregunta | Skill para usar |
|---|---|---|
| No puedes encontrar por qué un bug sigue sucediendo | ¿Cuál es la causa raíz de este error? | `ywc-debug-rootcause` |
| Un incidente de producción ya ocurrió y necesitas un registro escrito | ¿Qué le decimos al equipo (y a los clientes)? | `ywc-incident-postmortem` |

## `ywc-debug-rootcause` - Investigación de causa raíz en cuatro pasos

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-debug-rootcause El webhook de pago a veces se procesa por duplicado. No puedo encontrar la causa" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-debug-rootcause El webhook de pago a veces se procesa por duplicado. No puedo encontrar la causa" />
  </ToolTabsPanel>
</ToolTabs>

Esto evita los parches que solo abordan los síntomas y obliga a una investigación de causa raíz en cuatro pasos. Si las soluciones fallan en el mismo punto tres o más veces, te guía a cuestionar la arquitectura en sí.

## `ywc-incident-postmortem` - Autoría de análisis posterior al incidente

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-incident-postmortem --client" />
  </ToolTabsPanel>
</ToolTabs>

`--client` además crea un resumen para el cliente que omite detalles internos.

## Cómo los dos se conectan

`ywc-debug-rootcause` se ejecuta mientras el incidente está activo y responde a "¿por qué sucedió?". `ywc-incident-postmortem` se ejecuta después de que la solución se ha implementado y convierte esa causa raíz en una evaluación de línea de tiempo, impacto y elementos de acción para prevención, y puede tomar un veredicto de causa raíz como entrada en lugar de repetir la investigación. Úsalos en ese orden: primero encuentra la causa, luego documéntala.

---

[Previous: 11. Revisando y mejorando el diseño](./11-design-review.md) - [Next: 13. Executor / Patrones de indicación de generación de código](./13-executor-and-codegen-patterns.md)
