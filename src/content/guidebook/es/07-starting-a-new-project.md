[Back to table of contents](./README.md)

# 07. Empezando un nuevo proyecto

## Cuándo usar este flujo

Usa esto cuando aún no hay un repositorio Git, o cuando el repositorio existe pero es básicamente un lienzo en blanco con poco código. Si estás intentando entender un repositorio desconocido que ya tiene código, ve a [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) en su lugar. Estos flujos se mueven en direcciones opuestas y no deberían usarse juntos en la misma sesión.

> Antes de empezar: si prefieres no pasar `--lang` en cada llamada, fija el idioma de salida una vez con `ywc-setup-language`. A partir de entonces los skills de abajo siguen esa configuración.

## Flujo general

Este flujo es un embudo: **divergir → decidir → converger → puerta de arranque**. Extiende la idea a lo ancho (uno), fija el porqué y el qué (dos–tres), estréchala en estructura y especificación (cuatro–nueve), pasa la puerta que dice que estás listo para construir (diez) y luego entra en la implementación. Los pasos marcados como *(opcional)* pueden omitirse cuando ya están resueltos.

| Paso | Skill | Rol |
|---|---|---|
| uno | `ywc-brainstorm` *(opcional)* | Cuando la idea aún es difusa, fija propósito, restricciones, criterios de éxito y 2–3 enfoques alternativos mediante un diálogo socrático de una pregunta a la vez. Omítelo si la intención ya es firme |
| Dos | `ywc-project-mission` | Registra el motivo del proyecto, los criterios de éxito y el registro de enfoques rechazados en `docs/mission.md`. **Fija el porqué antes de diseñar cualquier estructura** |
| tres | `ywc-tech-research` *(opcional)* | Compara en paralelo los candidatos de pila tecnológica / biblioteca y registra la justificación de la elección. Omítelo si la pila ya está decidida |
| cuatro | `ywc-project-scaffold` | Con la pila decidida, diseña la estructura del directorio (genera un plan Markdown) |
| cinco | `ywc-ubiquitous-language` *(recomendado para proyectos ricos en dominio)* | Define el vocabulario compartido para desarrolladores, expertos de dominio y el LLM en `docs/ubiquitous-language.md` → la especificación y `ywc-code-gen` usan luego los términos canónicos |
| seis | `ywc-spec-writer --full` | Escribe la especificación completa bajo `docs/specification/` (objetivo / característica / modelo de datos / flujo de usuario) |
| siete | `ywc-spec-validate` | Validar la integridad / consistencia / factibilidad / compatibilidad con el código de la especificación. Repite seis↔siete hasta `DONE` |
| ocho | `ywc-project-docs` | Documentos adicionales como Arquitectura / Producto / Operaciones, cuando sea necesario |
| nueve | `ywc-task-generator` | Descomponer la especificación `DONE` en Tasks segura para dependencias |
| diez | `ywc-confidence-gate` | Puntúa la preparación en cinco dimensiones antes de la implementación (PROCEED ≥90 / REVIEW 70–89 / STOP &lt;70) |
| once | Ingrese [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) | Comenzar la implementación real |

## Ejemplo de ejecución

**1. Dar forma a la idea (opcional)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-brainstorm Quiero que una pequeña empresa de construcción registre la entrada/salida sin una aplicación aparte, pero no sé por dónde empezar" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-brainstorm Quiero que una pequeña empresa de construcción registre la entrada/salida sin una aplicación aparte, pero no sé por dónde empezar" />
  </ToolTabsPanel>
</ToolTabs>
Estrecha el propósito, las restricciones y las alternativas mediante un diálogo socrático de una pregunta a la vez. Si ya sabes claramente qué construir, omítelo y empieza desde el paso 2.

**2. Registra el porqué del proyecto**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-mission El objetivo de este project es permitir que una pequeña empresa de construcción registre la entrada/salida de los trabajadores sin una aplicación aparte. Criterio de éxito: si un solo administrador puede cerrar la asistencia de 10 trabajadores o menos en 5 minutos" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-mission El objetivo de este project es permitir que una pequeña empresa de construcción registre la entrada/salida de los trabajadores sin una aplicación aparte. Criterio de éxito: si un solo administrador puede cerrar la asistencia de 10 trabajadores o menos en 5 minutos" />
  </ToolTabsPanel>
</ToolTabs>
Fija el **porqué y los criterios de éxito** antes que la estructura del directorio o la especificación: cada paso posterior se juzga contra esta mission.

**3. Decide la pila tecnológica (opcional)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-tech-research --compare 'PostgreSQL,SQLite' --depth 50" />
  </ToolTabsPanel>
</ToolTabs>
El paso 4 (scaffold) dibuja la estructura *después de decidir la pila*, así que si la pila aún no está resuelta, compara aquí los candidatos y deja la justificación antes de continuar. Omítelo si ya está decidida.

**4. Diseñar la estructura del directorio**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-scaffold FastAPI + GraphQL + Clean Architecture, medium scale" />
  </ToolTabsPanel>
</ToolTabs>
Se requiere el idioma. Si faltan otros detalles, el Skill hace preguntas de seguimiento, por lo que especifique Framework / Arquitectura / Escala juntos cuando sea posible. Esta habilidad produce **solo un plan Markdown**. La creación real del archivo la maneja `ywc-code-gen`.

**5. Glosario de dominio (recomendado para proyectos ricos en dominio)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-ubiquitous-language --ddd --output docs/ubiquitous-language.md" />
  </ToolTabsPanel>
</ToolTabs>
Definir los términos canónicos por adelantado hace que la especificación siguiente y `ywc-code-gen` usen los mismos nombres, evitando que los sinónimos se cuelen en el código. Omítelo en proyectos con vocabulario simple.

**6. Escribe la especificación completa**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-writer --full --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**7. Validar la especificación**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-spec-validate --spec docs/specification/01-overview.md" />
  </ToolTabsPanel>
</ToolTabs>
Si devuelve `DONE_WITH_CONCERNS`, vuelva al paso 6 `ywc-spec-writer`, refine la especificación y valide de nuevo. Repita hasta que devuelva `DONE`. (`ywc-spec-ready` es un bucle de convergencia automática solo para especificaciones creadas por `ywc-plan`, así que no lo use aquí.)

**8. Documentos adicionales (cuando sea necesario)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-project-docs --lang kr" />
  </ToolTabsPanel>
</ToolTabs>

**9. Descomponer en Tasks**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-task-generator --lang ko" />
  </ToolTabsPanel>
</ToolTabs>

**10. Puerta de arranque**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-confidence-gate revisa si es seguro empezar a implementar con esta spec y estas tasks" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-confidence-gate revisa si es seguro empezar a implementar con esta spec y estas tasks" />
  </ToolTabsPanel>
</ToolTabs>
Puntúa cinco dimensiones: scope clarity / architecture compliance / evidence quality / reuse verified / root cause. Con `PROCEED` (≥90) entra en [05. general cycle](./05-general-cycle-medium-large.md); con `STOP` (&lt;70), refuerza primero la dimensión señalada.

## Notas

- `ywc-brainstorm`, `ywc-tech-research` y `ywc-ubiquitous-language` son pasos auxiliares que puedes omitir según la situación. Si la intención, la pila y el vocabulario de dominio ya están claros, seguir solo la columna vertebral **dos → cuatro → seis → siete → nueve → diez** es suficiente.
- Si `ywc-confidence-gate` devuelve `STOP` (&lt;70), no entres en la implementación: completa primero la dimensión señalada y luego vuelve a pasar la puerta.
- Si el alcance es lo suficientemente pequeño como para implementarse directamente sin descomposición de especificaciones, `ywc-plan` puede dirigir al camino Pequeño y saltarse todo este flujo.
- `ywc-onboard-repo` se mueve en dirección opuesta a este flujo (investigando un repositorio existente), así que no lo uses al crear un proyecto nuevo.

---

[Previous: 06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) - [Next: 08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md)
