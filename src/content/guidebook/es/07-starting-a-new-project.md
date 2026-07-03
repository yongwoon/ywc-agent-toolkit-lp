[Back to table of contents](./README.md)

# 07. Empezando un nuevo proyecto

## Cuándo usar este flujo

Usa esto cuando aún no hay un repositorio Git, o cuando el repositorio existe pero es básicamente un lienzo en blanco con poco código. Si estás intentando entender un repositorio desconocido que ya tiene código, ve a [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) en su lugar. Estos flujos se mueven en direcciones opuestas y no deberían usarse juntos en la misma sesión.

## Flujo general

| Paso | Skill | Rol |
|---|---|---|
| uno | `ywc-project-scaffold` | Decide la pila tecnológica / patrón de arquitectura, luego diseña la estructura del directorio (genera un plan Markdown) |
| Dos | `ywc-project-mission` | Registra el motivo del proyecto, los criterios de éxito y el registro de enfoques rechazados en `docs/mission.md` |
| tres | `ywc-spec-writer --full` | Escribe la especificación completa bajo `docs/specification/` (objetivo / característica / modelo de datos / flujo de usuario) |
| cuatro | `ywc-spec-validate` | Validar la integridad / consistencia / factibilidad / compatibilidad con el código de la especificación |
| cinco | `ywc-project-docs` | Documentos adicionales como Arquitectura / Producto / Operaciones, cuando sea necesario |
| seis | `ywc-task-generator` | Descomponer la especificación `DONE` en Tasks segura para dependencias |
| siete | Ingrese [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) | Comenzar la implementación real |

## Ejemplo de ejecución

**1. Diseñar la estructura del directorio**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
</ToolTabs>
Se requiere el idioma. Si faltan otros detalles, el Skill hace preguntas de seguimiento, por lo que especifique Framework / Arquitectura / Escala juntos cuando sea posible. Esta habilidad produce **solo un plan Markdown**. La creación real del archivo la maneja `ywc-code-gen`.

**2. Registra el porqué del proyecto**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission El objetivo de este project es permitir que una pequeña empresa de construcción registre la entrada/salida de los trabajadores sin una aplicación aparte. Criterio de éxito: si un solo administrador puede cerrar la asistencia de 10 trabajadores o menos en 5 minutos" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission El objetivo de este project es permitir que una pequeña empresa de construcción registre la entrada/salida de los trabajadores sin una aplicación aparte. Criterio de éxito: si un solo administrador puede cerrar la asistencia de 10 trabajadores o menos en 5 minutos" />
  </ToolTabsPanel>
</ToolTabs>

**3. Escribe la especificación completa**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**4. Validar la especificación**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
</ToolTabs>
Si devuelve `DONE_WITH_CONCERNS`, vuelva a `ywc-spec-writer`, refine la especificación y valide de nuevo. Repita hasta que devuelva `DONE`. (`ywc-spec-ready` es un bucle de convergencia automática solo para especificaciones creadas por `ywc-plan`, así que no lo use aquí.)

**5. Documentos adicionales (cuando sea necesario)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
</ToolTabs>

**6. Descomponer en Tasks**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

## Notas

- Si el alcance es lo suficientemente pequeño como para implementarse directamente sin descomposición de especificaciones, `ywc-plan` puede dirigir al camino Pequeño y saltarse todo este flujo.
- `ywc-onboard-repo` se mueve en dirección opuesta a este flujo (investigando un repositorio existente), así que no lo uses al crear un proyecto nuevo.

---

[Previous: 06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) - [Next: 08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md)
