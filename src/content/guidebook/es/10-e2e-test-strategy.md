[Back to table of contents](./README.md)

# 10. Estrategia de automatización de pruebas E2E

## Cuándo usar este flujo

Use `ywc-e2e-test-strategy` cuando el proyecto aún no tenga pruebas basadas en Playwright de E2E, o cuando la cobertura existente esté dispersa y no esté claro "qué flujo debe automatizarse primero." El objetivo es automatizar la regresión repetida de flujos críticos, como el inicio de sesión o la compra, al menor costo posible.

## Configuración inicial (`--init`)

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-e2e-test-strategy --init" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-e2e-test-strategy --init" />
  </ToolTabsPanel>
</ToolTabs>

Si `playwright.config.*` no existe, este modo se inicia automáticamente. La secuencia:

1. Primero confirma 3-5 flujos críticos (no procedas al siguiente paso hasta que estén confirmados). Candidatos por defecto: inicio/cierre de sesión, ruta feliz de la función principal, manejo de estados de error
2. Ejecutar `npx playwright install --with-deps chromium`
3. `baseURL` siempre debe hacer referencia a `process.env.BASE_URL` - sin codificación fija
4. Crear automáticamente `.github/workflows/e2e.yml` (si existe un flujo de trabajo, añade un trabajo en lugar de crear un archivo nuevo)

## Ejecutándolo

**Añadir un flujo a la vez**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-e2e-test-strategy --flow &quot;checkout happy path&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-e2e-test-strategy --flow &quot;checkout happy path&quot;" />
  </ToolTabsPanel>
</ToolTabs>
Cuanto más claro hagas la URL de entrada, las acciones ordenadas y el estado final esperado, mejor será la calidad del resultado.

**Auditar la cobertura existente**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-e2e-test-strategy --audit" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-e2e-test-strategy --audit" />
  </ToolTabsPanel>
</ToolTabs>
Si `playwright.config.*` existe y no se proporciona ninguna otra bandera, este modo se inicia automáticamente. Las pruebas sin `waitForTimeout` / selectores de clase CSS (`.btn-*`) / `expect()` se marcan como frágiles, y las brechas se puntúan mediante una matriz de prioridad (impacto en los ingresos x frecuencia de falla). Solo los elementos que obtienen una puntuación de 5 o más se proponen para automatización.

**Vista previa del plan antes de escribir archivos**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-e2e-test-strategy --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-e2e-test-strategy --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

## Criterios de selección de flujo (primeros 5, con mayor ROI primero)

1. Autenticación (inicio de sesión/cierre de sesión)
2. Ruta feliz de la función principal
3. Validación de formulario + estado de error
4. Navegación / enrutamiento
5. Manejo de errores API

Comienza con 5-8 flujos y expande mientras mides la inestabilidad. "Probarlo todo" solo aumenta la carga de mantenimiento. Es mejor dejar el resto a `ywc-gen-testcase` en [09. Writing and running Tests](./09-testing-guide.md).

## Qué dejar como verificación manual (`ywc-gen-testcase`) en lugar de automatización

Precisión visual/píxel, UX exploratoria, migraciones únicas, flujos OAuth de terceros, verificación por correo electrónico/SMS: estos elementos tienen un valor bajo en relación con el costo de automatización.

## Reglas de escritura de código

- Prioridad del selector: `data-testid` > rol ARIA > texto visible > CSS (último recurso)
- No `waitForTimeout(N)` - reemplazar con `locator.waitFor()` / `waitForURL()` / `waitForResponse()` (Reconocimiento Antes de la Acción: verificar estado -> actuar -> verificar resultado)
- Incluya al menos un caso negativo (ruta de error) para cada flujo crítico
- Restablecer el estado con `beforeEach` - no hay dependencia de orden entre las pruebas

## CI elementos esenciales

- Chromium solo en CI (Safari/Firefox tienen un valor bajo para el costo)
- `retries: 2`, `workers: 1` (evitar condiciones de carrera al compartir un servidor de desarrollo)
- Siempre sube los artefactos de rastreo/captura de pantalla en caso de fallo
- Caché del navegador Playwright (clave hash `package-lock.json`) - evitar volver a descargar unos 300 MB en cada ejecución
- `timeout-minutes: 30` (para que los trabajos colgados no bloqueen la cola)

## Lista de verificación de finalización

- [ ] `playwright.config.ts` `baseURL` referencias env
- [ ] Cada especificación generada tiene al menos un `expect()`
- [ ] No `waitForTimeout()`
- [ ] GitHub Acciones se activan tanto en `push(main)` como en `pull_request`

## Integración de seguimiento

Para los juicios de UX que la automatización no puede detectar, como un diseño incómodo o errores de texto, complemente la lista de control de QA manual del lanzamiento con `ywc-gen-testcase`.

---

[Previous: 09. Writing and running Tests](./09-testing-guide.md) - [Next: 11. Reviewing and improving design](./11-design-review.md)
