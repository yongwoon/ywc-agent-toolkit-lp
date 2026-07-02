[Back to table of contents](./README.md)

# 08. Entrando en un repositorio existente por primera vez

## Cuándo usar este flujo

Usa esto cuando entres por primera vez a un repositorio desconocido que ya tiene código y necesites entender "cómo es esta base de código." Por el contrario, si estás diseñando un proyecto nuevo desde cero, ve a [07. Starting a new Project](./07-starting-a-new-project.md). Estos dos flujos se mueven en direcciones opuestas y no deben usarse juntos en la misma sesión.

## Lo que hace

`ywc-onboard-repo` utiliza el reconocimiento Glob/Grep para extraer la pila tecnológica / arquitectura / convenciones y producir dos cosas.

1. **Guía de incorporación** - Un documento impreso directamente en la conversación (Stack tecnológico, Arquitectura, Puntos clave de entrada, Mapa de directorios, Ciclo de vida de las solicitudes, Convenciones y más)
2. **Starter CLAUDE.md**: un archivo escrito en la raíz del repositorio. Si `CLAUDE.md` ya existe, no se sobrescribe; se amplía con una sección `## Detected Conventions`.

## Ejemplo de ejecución

**Ejecución predeterminada** - inspecciona todo el repositorio y genera tanto la Guía de incorporación como el Starter CLAUDE.md
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo" />
  </ToolTabsPanel>
</ToolTabs>

**Inspeccionar solo un espacio de trabajo específico en un monorepo**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --scope apps/web/" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --scope apps/web/" />
  </ToolTabsPanel>
</ToolTabs>

**Cuando solo necesites el documento explicativo, no Starter CLAUDE.md**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --guide-only" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --guide-only" />
  </ToolTabsPanel>
</ToolTabs>

**Cuando solo necesitas CLAUDE.md, no la Guía de Introducción**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-onboard-repo --claude-md-only" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-onboard-repo --claude-md-only" />
  </ToolTabsPanel>
</ToolTabs>

## Qué hacer a continuación

- Si la investigación encuentra código muerto acumulado, el informe de resultados incluye orientación. Divida la limpieza posterior en un PR separado con `ywc-refactor-clean`; no lo mezcle en el PR de incorporación.
- Una vez que hayas leído la Guía de Integración, pasa al flujo de desarrollo normal para cambiar el código existente. Comienza con [02. Core concepts](./02-core-concepts.md) para confirmar los criterios de escala Pequeña/Mediana/Grande.

---

[Previous: 07. Starting a new Project](./07-starting-a-new-project.md) - [Next: 09. Writing and running Tests](./09-testing-guide.md)
