[Back to table of contents](./README.md)

# 06. Terminar automáticamente desde un objetivo (ywc-agentic)

## Cuándo usar este flujo

[04](./04-general-cycle-small.md) y [05](./05-general-cycle-medium-large.md) son flujos de **control manual** donde el usuario invoca cada paso uno por uno (`ywc-plan` -> ... -> ejecutor). `ywc-agentic` toma un objetivo en lenguaje natural y repite automáticamente toda la secuencia como un bucle de **Planificar -> Ejecutar -> Evaluar -> Repetir** hasta que la verificación pase o se alcance el límite de iteraciones, sin intervención humana.

- Si quieres dar un objetivo en lugar de rastrear manualmente la siguiente habilidad cada vez -> esta página
- Si quieres control directo a nivel Task, decidiendo qué tarea se ejecuta cuándo -> utiliza el ejecutor directamente desde [05](./05-general-cycle-medium-large.md)
- Si quieres ejecutar un backlog `tasks/` existente tal como está sin descomposición Task -> llama a `ywc-sequential-executor` / `ywc-parallel-executor` directamente, no de manera agentiva

## Lo que automatiza

```
Goal -> [Plan -> Execute -> Evaluate -> Repeat] -> Result
```

Internamente, orquesta las habilidades existentes `ywc-*` tal como están. No tiene una lógica de generación de código separada.

| Fase | Qué pasa |
|---|---|
| Plan | Crea un plan con `ywc-plan --non-interactive` (para Pequeño: `plan.md`; para Mediano/Grande: converge la especificación a `DONE` con `ywc-spec-ready`) |
| Task | Solo mediano/grande: descomponer con `ywc-task-generator`, luego elegir automáticamente un ejecutor basado en `dependency-graph.md` |
| Ejecutar | Para Small, ejecuta `ywc-code-gen`; para Medium/Large, ejecuta el ejecutor en modo `--local-merge` para iteración rápida sin PRs |
| Evaluar | Revisa solo la diferencia de la iteración actual con `ywc-impl-review`, luego verifica lint/typecheck/test/build con `ywc-verify-done` |
| Repetir | Si la verificación falla, replanifica con `ywc-plan --update-spec` y repite hasta el límite `--max-iterations` |

**Oráculo de Éxito** - En cada ejecución, define de antemano qué hace que el trabajo esté terminado de manera falsable y mantiene esa definición a lo largo del proceso: Objetivo / Límite de calidad / Evidencia requerida / Condición de parada. Un Aprobado solo es válido cuando `ywc-impl-review` devuelve `DONE` **y** `ywc-verify-done` está en verde. Si la revisión es `DONE` pero las pruebas están rojas, la ejecución aún falla.

## Ejemplo de ejecución

**Dar un objetivo en lenguaje natural (predeterminado, hasta 3 iteraciones)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**Aumenta el límite de iteraciones para que siga intentando más tiempo**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --max-iterations 5" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --max-iterations 5" />
  </ToolTabsPanel>
</ToolTabs>
`--max-iterations` es un límite de seguridad definido por el usuario. Si la ejecución no converge, el agente nunca aumenta el límite por sí mismo.

**Elegir explícitamente al ejecutor**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;알림 설정 화면과 API 추가&quot; --executor sequential" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;알림 설정 화면과 API 추가&quot; --executor sequential" />
  </ToolTabsPanel>
</ToolTabs>
El `auto` predeterminado inspecciona `dependency-graph.md` y elige secuencial o paralelo automáticamente.

**Reanudar una ejecución interrumpida**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic --resume" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic --resume" />
  </ToolTabsPanel>
</ToolTabs>
Si quedan tareas sin terminar en `tasks/`, se omite la Fase de Planificación y se continúa desde ese punto.

**Previsualizar las fases sin ejecutarlas realmente**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-agentic &quot;결제 실패 시 자동 재시도 로직을 추가해줘&quot; --dry-run" />
  </ToolTabsPanel>
</ToolTabs>

## Se detiene cuando el objetivo es ambiguo

"Funciona de manera autónoma" no significa "rellena los espacios en blanco por sí solo." Antes de la Fase de Planificación, clasifica el objetivo y se detiene primero si es ambiguo:

| Estado objetivo | Comportamiento |
|---|---|
| Específico (todas las condiciones qué/dónde/hecho están presentes) | Proceda inmediatamente |
| Solo falta el por qué (el método de implementación y la condición de finalización están claros) | Proceda, pero marque como incumplido |
| Ambiguo (sin condición de hecho completado, o posibles múltiples interpretaciones) | Detén con `NEEDS_CONTEXT`; si hay conversación disponible, guía a `ywc-brainstorm` |
| Arriesgado/irreversible (autenticación, pago, permisos, eliminación de datos, migración de esquema) | Debe pasar `ywc-confidence-gate` antes de continuar |

## Cuando te bloqueas en cada paso

| Situación | Acción |
|---|---|
| Ni siquiera puede arrancar y devuelve `NEEDS_CONTEXT` | El objetivo es ambiguo: reescríbelo de manera más específica, o utiliza `ywc-brainstorm` primero para una aclaración interactiva |
| `BLOCKED` (conflicto de fusión, error grave CI) | No intenta la recuperación automática: lea el contenido registrado en `tasks/agentic-log.md`, resuelva directamente y luego vuelva a ejecutar |
| Se ha alcanzado el límite de iteraciones (`--max-iterations`) | Termina como `DONE_WITH_CONCERNS`, con los hallazgos CRÍTICOS/ALTOS restantes listados: corríjalos directamente o aumente el límite y vuelva a ejecutar |
| La replanificación sigue volviendo al mismo alcance | Tratado como un bloqueo de protección contra recursión y detenido automáticamente: la especificación o el objetivo en sí mismo necesita otra revisión |

## Qué revisar después de la finalización

- `tasks/agentic-log.md`: fase, aprobado/reprobado, hallazgos y Success Oracle de cada iteración se registran solo para agregar
- Si existieran hallazgos CRÍTICOS/ALTOS repetidos, se marcan como `Learning candidate` en el informe de finalización; revíselos y, si lo desea, regístrelos manualmente con `ywc-review-learnings` (no se registran automáticamente)

---

[Previous: 05. Handling work split into multiple Tasks](./05-general-cycle-medium-large.md) - [Next: 07. Starting a new Project](./07-starting-a-new-project.md)
