[Back to table of contents](./README.md)

# 01. Introducción

## Lo que cubre este manual

Este repositorio define alrededor de 30 habilidades con el prefijo `ywc-*` bajo `tools/claude-code/skills/`, además de varios agentes dedicados bajo `tools/claude-code/agents/`. Juntos, forman un conjunto de herramientas para ejecutar todo el ciclo de desarrollo en Claude Code a través de procedimientos estructurados: "idea -> Spec -> descomposición Task -> implementación -> revisión de código -> PR -> fusión."

Este Manual es una guía práctica para **usuarios primerizos** de esas herramientas, para que puedas encontrar rápidamente "¿qué Skill debo ejecutar, en qué orden, con qué instrucción, para mi situación actual?" No profundiza en internos de Skill como la Defensa de Racionalización o el Patrón de Asesor. En cambio, se centra en **los comandos que ingresan los usuarios y los resultados que deberían esperar**. Si deseas entender los principios operativos internos, consulta directamente el `SKILL.md` de cada Skill.

## Para quién es este documento

- Desarrolladores que utilizan habilidades `ywc-*` en este proyecto por primera vez
- Desarrolladores que han usado Skills unas pocas veces pero todavía se confunden sobre el orden en que combinarlas
- Desarrolladores que necesitan la sintaxis exacta para Habilidades con muchas opciones como `ywc-sequential-executor`, `ywc-parallel-executor` y `ywc-code-gen`

## Qué revisar antes de empezar

| Artículo | Cómo comprobar |
|---|---|
| ¿Reconoce Claude Code este repositorio? | Escriba `/` en la conversación y confirme que la lista `ywc-*` Skill aparece en la autocompletación |
| ¿Está autenticado el `gh` CLI? | `gh auth status` - requerido por la mayoría de las Skills que crean o fusionan PRs |
| ¿El proyecto tiene `CLAUDE.md`? | Si no, consulte [08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md): las habilidades infieren el lenguaje y aplican las convenciones de este archivo |
| ¿El objetivo es un proyecto nuevo o un cambio en el código existente? | Para un nuevo proyecto, vaya a [07. Starting a new Project](./07-starting-a-new-project.md); para un cambio existente, comience con [02. Core concepts](./02-core-concepts.md) |

## Sintaxis de invocación Skill

Todos los ejemplos en este Manual asumen que escribes el siguiente formulario directamente en la conversación Claude Code.

```
ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움
```

El formulario `/ywc-plan` con un `/` inicial funciona de la misma manera. Este documento omite `/` para mayor claridad. Las opciones en el formulario `--flag value` difieren por Skill, y los ejemplos concretos se recopilan en cada página Skill o en [12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md).

---

[Next: 02. Core concepts](./02-core-concepts.md)
