[Back to table of contents](./README.md)

# 09. Escribir y ejecutar pruebas

## Cuándo usar este flujo

Usa esto después de que la implementación de la función esté completa y necesites verificar que realmente funciona como se pretende. La verificación se divide en dos ramas diferentes: pruebas automatizadas de código y verificación manual que requiere juicio humano.

## Flujo general

```
1. write test cases -> 2. run test sheet (code test + e2e test) -> 3. if results differ from expectations, fix and rerun
```

| Paso | Qué pasa |
|---|---|
| 1. escribir casos de prueba | Usa `ywc-gen-testcase` para crear PR / Task / hojas de prueba de verificación manual basadas en diferencias para desarrolladores y QA |
| 2a. prueba de código | Ejecute pruebas unitarias / de integración utilizando el ejecutor de pruebas existente del proyecto |
| 2b. prueba e2e | Ejecute los flujos generados por `ywc-e2e-test-strategy` - vea [10. E2E Test automation strategy](./10-e2e-test-strategy.md) |
| 3. volver a ejecutar | Corrige los resultados que no coincidan con las expectativas, luego vuelve a ejecutar solo la prueba relevante |

## Ejemplos de `ywc-gen-testcase`

**Crear una hoja de pruebas de dev+QA a partir de un número PR**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-gen-testcase 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-gen-testcase 250" />
  </ToolTabsPanel>
</ToolTabs>

**Usa la diferencia actual, audiencia solo de control de calidad, salida en japonés**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-gen-testcase --from-diff --audience qa --lang ja" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-gen-testcase --from-diff --audience qa --lang ja" />
  </ToolTabsPanel>
</ToolTabs>

**Basado en Task, incluyendo elementos de regresión**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-gen-testcase 000020-010 --include-regression" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-gen-testcase 000020-010 --include-regression" />
  </ToolTabsPanel>
</ToolTabs>

## Verificación manual vs automatización: cuándo usar qué

| Objetivo de verificación | Método |
|---|---|
| Precisión visual/píxel, juicio exploratorio de UX | `ywc-gen-testcase` (manual) - áreas que requieren juicio humano |
| Migración única, flujo OAuth de terceros, verificación por correo electrónico/SMS | `ywc-gen-testcase` (manual) - usualmente demasiado costoso de automatizar por el valor |
| Inicio de sesión/cierre de sesión, ruta feliz de la función principal, flujos con regresiones repetidas | `ywc-e2e-test-strategy` (automatizado) - ver [10](./10-e2e-test-strategy.md) |
| Lógica a nivel de función/módulo | El ejecutor de pruebas unitarias/integración existente del proyecto |

Los dos métodos no son sustitutos; se **complementan** entre sí. Para el juicio de UX que la automatización no puede captar, complementa cada lanzamiento con una lista de verificación de QA manual de `ywc-gen-testcase`.

---

[Previous: 08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) - [Next: 10. E2E Test automation strategy](./10-e2e-test-strategy.md)
