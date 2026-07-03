[Back to table of contents](./README.md)

# 01. Introducción

## Lo que cubre este manual

Este repositorio define alrededor de 30 habilidades con el prefijo `ywc-*` bajo `claude-code/skills/`, además de varios agentes dedicados bajo `claude-code/agents/`. Juntos, forman un conjunto de herramientas para ejecutar todo el ciclo de desarrollo en Claude Code a través de procedimientos estructurados: "idea -> Spec -> descomposición Task -> implementación -> revisión de código -> PR -> fusión."

Este Manual es una guía práctica para **usuarios primerizos** de esas herramientas, para que puedas encontrar rápidamente "¿qué Skill debo ejecutar, en qué orden, con qué instrucción, para mi situación actual?" No profundiza en internos de Skill como la Defensa de Racionalización o el Patrón de Asesor. En cambio, se centra en **los comandos que ingresan los usuarios y los resultados que deberían esperar**. Si deseas entender los principios operativos internos, consulta directamente el `SKILL.md` de cada Skill.

Para ver más detalles sobre las opciones, requisitos previos y flujo interno de cada Skill, consulta las carpetas Skill del repositorio original. Las Skills para Claude Code están documentadas en [`claude-code/skills`](https://github.com/yongwoon/ywc-agent-toolkit/tree/main/claude-code/skills), y las Skills para Codex están documentadas en [`codex/skills`](https://github.com/yongwoon/ywc-agent-toolkit/tree/main/codex/skills). Usa este Manual para encontrar rápidamente el flujo de ejecución habitual y abre el `SKILL.md` correspondiente cuando necesites la referencia completa.

## Para quién es este documento

- Desarrolladores que utilizan habilidades `ywc-*` en este proyecto por primera vez
- Desarrolladores que han usado Skills unas pocas veces pero todavía se confunden sobre el orden en que combinarlas
- Desarrolladores que necesitan la sintaxis exacta para Habilidades con muchas opciones como `ywc-sequential-executor`, `ywc-parallel-executor` y `ywc-code-gen`

## Requisitos previos y configuración recomendada

La instalación mediante Plugin marketplace o Codex plugin no tiene requisitos previos separados. El instalador gestiona automáticamente la copia de archivos y el registro necesarios.

Dicho esto, para ejecutar una Skill de verdad necesitas tener listas algunas herramientas en tu sistema — `git`, `gh`, `python3`, entre otras — y las Skills relacionadas con diseño funcionan mejor con una configuración adicional. Consulta [14. Requisitos previos e instalación](./14-prerequisites-installation.md) para la lista completa de herramientas requeridas y opcionales, además de los pasos de instalación — vale la pena leerlo antes de empezar.

## Qué revisar antes de empezar

| Artículo | Cómo comprobar |
|---|---|
| ¿Reconoce Claude Code este repositorio? | Escriba `/` en la conversación y confirme que la lista `ywc-*` Skill aparece en la autocompletación |
| ¿Está autenticado el `gh` CLI? | `gh auth status` - requerido por la mayoría de las Skills que crean o fusionan PRs |
| ¿El proyecto tiene `CLAUDE.md`? | Si no, consulte [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md): las habilidades infieren el lenguaje y aplican las convenciones de este archivo |
| ¿El objetivo es un proyecto nuevo o un cambio en el código existente? | Para un nuevo proyecto, vaya a [07. Starting a new Project](./07-starting-a-new-project.md); para un cambio existente, comience con [02. Core concepts](./02-core-concepts.md) |

## Sintaxis de invocación Skill

Todos los ejemplos en este Manual asumen que escribes el siguiente formulario directamente en la conversación Claude Code.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-plan El mensaje de error de fallo de inicio de sesión es demasiado genérico, por lo que es difícil entender la causa" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-plan El mensaje de error de fallo de inicio de sesión es demasiado genérico, por lo que es difícil entender la causa" />
  </ToolTabsPanel>
</ToolTabs>

El formulario `/ywc-plan` con un `/` inicial funciona de la misma manera. Este documento omite `/` para mayor claridad. Las opciones en el formulario `--flag value` difieren por Skill, y los ejemplos concretos se recopilan en cada página Skill o en [12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md).

---

[Next: 02. Core concepts](./02-core-concepts.md)
