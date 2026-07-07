[Back to table of contents](./README.md)

# 11. Revisando y mejorando el diseño

## Cuándo usar este flujo

Las dos habilidades responden a preguntas diferentes. Elige según la pregunta que estés tratando de responder.

| Lo que quieres hacer | Pregunta | Skill para usar |
|---|---|---|
| Verificar si una pantalla es fácil de usar | ¿Tiene esta pantalla algún problema de usabilidad o accesibilidad? | `ywc-ui-ux-review` |
| Una pantalla se siente insípida o parece generada por IA | ¿Tiene esta pantalla un carácter distintivo? | `ywc-design-renew` |
| Construir una interfaz de usuario/componente completamente nueva desde cero | Ninguno de los anteriores: esto es una nueva creación | Use una creación de UI Skill fuera del alcance de este Manual |

## `ywc-ui-ux-review` - Auditoría de usabilidad / accesibilidad

Combina el análisis estático de código con la ejecución real de la interfaz de usuario (Chrome DevTools MCP) para auditar la Arquitectura de la Información, el Diseño Visual, la Usabilidad y la Accesibilidad (WCAG 2.2 AA). El resultado es un informe de cuatro niveles: Crítico / Alto / Medio / Bajo.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ui-ux-review Revisa la usability de la pantalla de pago" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ui-ux-review Revisa la usability de la pantalla de pago" />
  </ToolTabsPanel>
</ToolTabs>

Debido a que se incluye la exploración de la interfaz de usuario en vivo, los resultados son más precisos cuando hay disponible una URL de prueba o de vista previa.

## `ywc-design-renew` - Eliminación visual de pendientes y renovación

Usa esto cuando una pantalla existente sea ordinaria o parezca "generada por IA". Añade carácter visual o verifica detalles reveladores de IA, como texto degradado / cian sobre oscuro / Inter / cuadrículas de tarjetas uniformes.

**Renovación de código (modo predeterminado)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-design-renew --target setup-collection/default-project/docs/design/README.md --url http://localhost:3000" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-design-renew --target setup-collection/default-project/docs/design/README.md --url http://localhost:3000" />
  </ToolTabsPanel>
</ToolTabs>

**Solo revisar, sin tocar el código**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-design-renew --mode check --target setup-collection/default-project/docs/design/README.md --fail-on high" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-design-renew --mode check --target setup-collection/default-project/docs/design/README.md --fail-on high" />
  </ToolTabsPanel>
</ToolTabs>

Si pasas `--url`, también se proporcionan capturas de pantalla antes/después. Si se omite, se procede solo con el análisis de código, lo cual es menos preciso. `--fail-on` es el umbral de puerta para el modo de verificación, y por defecto es `critical`.

## La nueva creación no es para lo que sirven estas habilidades

`ywc-design-renew` es **solo para la renovación de pantallas existentes**. Las interfaces/componentes creados desde cero se manejan mejor mediante un flujo de trabajo de creación de UI dedicado, no mediante el flujo de revisión/renovación `ywc-*` en este Manual. No se puede "desordenar" algo que aún no existe.

---

[Previous: 10. E2E Test automation strategy](./10-e2e-test-strategy.md) - [Next: 12. Debugging and incident postmortem](./12-debugging-and-incident-postmortem.md)
