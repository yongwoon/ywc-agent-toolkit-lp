[Back to table of contents](./README.md)

# 19. Recetas para combinar Skills

Las demás páginas explican un flujo o una Skill a la vez. Esta página muestra cómo las Skills se alimentan entre sí: qué deja una Skill y qué Skill lo recoge después. Cada conexión de abajo es algo que las propias Skills hacen (leer un archivo compartido, ofrecer un hand-off), no una convención que tengas que recordar.

| Lo que quieres | Receta |
|---|---|
| Evitar que vuelva el mismo comentario de revisión | [Bucle de aprendizaje de revisiones](#bucle-de-aprendizaje-de-revisiones) |
| Convertir un bug corregido en una lección duradera | [De la corrección de un bug a la prevención](#de-la-corrección-de-un-bug-a-la-prevención) |
| Saber qué gate se ejecuta y cuándo, antes y después de un PR | [Gates antes y después de un PR](#gates-antes-y-después-de-un-pr) |
| Conservar el motivo de las decisiones difíciles de revertir | [Registrar decisiones mientras planificas](#registrar-decisiones-mientras-planificas) |
| Empezar un cambio grande cuyo alcance aún no está claro | [Exploración antes de planificar](#exploración-antes-de-planificar) |
| Ejecutar Tasks en paralelo sin colisiones | [Entorno de ejecución en paralelo](#entorno-de-ejecución-en-paralelo) |
| Preparar un release | [Preparación de un release](#preparación-de-un-release) |

## Bucle de aprendizaje de revisiones

`docs/review-learnings.md` es la memoria de revisiones del proyecto. `ywc-review-learnings` es dueña del archivo; las demás Skills lo leen y lo alimentan.

1. **Recibir** — antes de actuar sobre un comentario, `ywc-receive-review` comprueba si es técnicamente correcto, para que no implementes una corrección equivocada solo porque un revisor la pidió.
2. **Gestionar** — `ywc-handle-pr-reviews` corrige o responde cada thread y deja el PR listo para merge (CI en verde, sin conflicto con la base).
3. **Registrar** — las lecciones que vale la pena conservar van a `docs/review-learnings.md` a través de `ywc-review-learnings`. Con `--source pr --pr <número>` destila los comentarios de revisión de los bots de un PR. Cada entrada nueva se te muestra como un changeset y solo se escribe después de que la confirmes.
4. **Recuperar el histórico** — para PRs pasados, `ywc-mine-review-history` recorre muchos PRs fusionados a la vez y propone a `ywc-review-learnings` las clases de defecto que se repiten.
5. **Reutilizar** — `ywc-impl-review` carga los aprendizajes al inicio de cada revisión (se omite con `--skip-learnings`), así que un falso positivo conocido no se vuelve a señalar y un `DO-NOT` conocido se detecta antes. Después de la revisión, ofrece registrar los hallazgos que se repiten.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-review-learnings --mode update --source pr --pr 250" />
  </ToolTabsPanel>
</ToolTabs>

El bucle funciona en ambas herramientas. Cada vuelta hace que la siguiente revisión sea más tranquila: los comentarios que el equipo ya rechazó dejan de volver, y los comentarios con los que el equipo estuvo de acuerdo se detectan antes de abrir el PR.

## De la corrección de un bug a la prevención

1. `ywc-debug-rootcause` encuentra la causa raíz, añade un regression test y valida la corrección con `ywc-verify-done` ([12](./12-debugging-and-incident-postmortem.md)).
2. Si la misma clase de defecto podría aparecer en otro lugar, ofrece registrarla como aprendizaje de revisión (`ywc-review-learnings --mode update --source debug`).
3. Tras un incidente en Production, `ywc-incident-postmortem` redacta el informe y ofrece de la misma forma sus action items para prevenir la recurrencia (`--source incident`).
4. A partir de entonces, `ywc-impl-review` lee esos aprendizajes, así que la misma clase de defecto se detecta en la revisión en lugar de en Production.

Los pasos 2 y 3 son solo para Claude Code. En Codex, las dos Skills no hacen hand-off a `ywc-review-learnings`; si una lección vale la pena, regístrala tú mismo con `ywc-review-learnings` (el source por defecto, `feedback`).

## Gates antes y después de un PR

| Cuándo | Skill | Qué comprueba |
|---|---|---|
| Antes de la implementación | `ywc-confidence-gate` | Puntúa la preparación en cinco dimensiones: PROCEED (90 o más), REVIEW (70-89), STOP (por debajo de 70). Por debajo de 90, la implementación espera hasta que se refuerce la dimensión más débil o aceptes el riesgo |
| Después de la implementación | `ywc-impl-review` | Revisión de cinco aspectos frente a la spec ([13](./16-code-structure-and-maintainability.md)) |
| Cuando el cambio afecta a la seguridad | `ywc-security-audit` | Revisión estática de seguridad (OWASP Top 10, secrets, threat model) |
| Antes de decir "hecho" | `ywc-verify-done` | Evidencia nueva (salida de test o build) para cada afirmación de finalización |
| Al abrir el PR | `ywc-create-pr` | Commit, push y un cuerpo de PR construido a partir de la task o el plan |
| Después de que respondan los revisores | `ywc-handle-pr-reviews` | Comentarios, CI y conflictos, como en el bucle anterior |
| Merge | `ywc-finish-branch` | Espera de CI y de la revisión de bots, merge, comprobación posterior al merge, limpieza de la rama |

Rara vez llamarás a `ywc-verify-done` directamente: `ywc-code-gen` y ambos executors lo llaman en su propio paso de finalización. Llámalo tú mismo cuando hayas terminado el trabajo a mano.

## Registrar decisiones mientras planificas

Esta receta es solo para Claude Code.

- Antes de planificar, `ywc-plan` lee `docs/adr/` y `docs/project-mission.md` si existen. Un plan no contradice en silencio una decisión ya tomada; si hay un conflicto, se te muestra.
- Cuando una decisión de arquitectura del plan es difícil de revertir, sorprendería a un lector posterior sin contexto y es un trade-off real, `ywc-plan` ofrece una vez guardarla como ADR mediante `ywc-adr`. Cuando el plan fija un nuevo success criterion duradero, ofrece añadirlo a `docs/project-mission.md`.
- Cuando la decisión es una comparación de librerías o enfoques, ejecuta primero `ywc-tech-research` y planifica a partir de sus resultados.

<CodeBlock label="claude code" code="ywc-tech-research &quot;implementación SSE con Hono&quot; --compare &quot;Redis,Valkey&quot;" />

Codex no tiene ni `ywc-adr` ni `ywc-project-mission`; en su lugar, conserva el razonamiento en el documento del plan o de la spec.

## Exploración antes de planificar

Esta receta es solo para Codex.

1. `ywc-wayfinder` mantiene un mapa local en `docs/ywc-plans/<slug>-wayfinder.md` a lo largo de varias sesiones. El mapa puede contener muchos tickets, pero exactamente uno está activo a la vez, y la Skill nunca implementa nada por sí misma.
2. Una vez que la ruta de un ticket está clara, hace hand-off a `ywc-plan` (o a `ywc-tech-research` cuando el ticket está bloqueado en una comparación técnica).
3. A partir de ahí continúa el flujo habitual: `ywc-spec-ready` → `ywc-task-generator` → executor ([05](./05-general-cycle-medium-large.md)). Cuando solo hay que implementar una única spec o ticket aprobado, `ywc-implement` lo hace como un cambio acotado y sujeto a un review gate.

<CodeBlock label="codex" code="ywc-wayfinder Separar la facturación del monolito en su propio servicio. El alcance aún no está claro" />

Úsala solo para trabajo grande, incierto o que abarque varias sesiones. La planificación normal corresponde a `ywc-plan`, y la aclaración de ideas a `ywc-brainstorm`.

## Entorno de ejecución en paralelo

`ywc-parallel-executor` crea el worktree de cada task mediante `ywc-worktrees`. En proyectos con Docker, también asigna a cada worktree su propio bloque de puertos del host mediante `ywc-docker-isolate`, para que los stacks no choquen ("port is already allocated"). Después del merge, `ywc-finish-branch` elimina el worktree con `ywc-worktrees --mode prune`.

Normalmente no llamas a ninguna de ellas tú mismo; el executor las dirige en ambas herramientas. Para crear o limpiar un worktree fuera de una ejecución del executor, usa los comandos de [17](./14-skill-reference.md).

## Preparación de un release

1. Primero, resuelve las actualizaciones de dependencias pendientes: `ywc-merge-dependabot security parallel-auto`.
2. Abre el PR de release (por ejemplo `develop` → `main`) y luego genera su descripción con `ywc-release-pr-list <número del PR de release>`, que agrupa los PRs fusionados por autor.
3. Escribe `CHANGELOG.md` y las notas para usuarios con `ywc-changelog-release-notes`. Si pasas el archivo de resultado del paso 2 con `--pr-list`, usará esa lista en lugar de git log.

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-changelog-release-notes --both --version 1.4.0" />
  </ToolTabsPanel>
</ToolTabs>

---

[← Anterior: 18. Requisitos previos e instalación](./15-prerequisites-installation.md) · [Volver al índice »](./README.md)
