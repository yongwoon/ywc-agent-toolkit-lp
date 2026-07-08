[Back to table of contents](./README.md)

# 12. Executor / Patrones de indicación de generación de código

`ywc-sequential-executor`, `ywc-parallel-executor` y `ywc-code-gen` son las tres Habilidades cuyas muchas opciones te hacen consultar repetidamente la sintaxis exacta. Esta página organiza los ejemplos por **"lo que estás tratando de hacer ahora"**, no por el nombre de Skill. Encuentra tu tarea y copia el comando tal como está.

## Concepto compartido: agrupar múltiples Tasks en un PR (`--aggregate-pr`, `--group-name`)

`--aggregate-pr` y `--group-name` funcionan como el **mismo concepto** tanto en `ywc-sequential-executor` como en `ywc-parallel-executor`. Una vez que lo entiendas aquí, puedes aplicar todos los ejemplos en las dos secciones Skill a continuación.

**Sin `--aggregate-pr` (comportamiento por defecto)**: cada Task obtiene su propia rama de características y PR. Si procesas 5 Tasks, obtienes 5 PRs.

**Con `--aggregate-pr`**: todos los Tasks se fusionan en una rama compartida, ya sea en secuencia (secuencial) o por oleada (paralela), y después de que termina todo el lote, se abre un PR desde esa rama compartida. Desde el punto de vista de un revisor, parece un "lote completo" en lugar de "varios cambios relacionados".

| Úsalo cuando | No lo use cuando |
|---|---|
| Quieres agrupar Tasks fuertemente relacionados en una unidad de despliegue lógica (por ejemplo, 5 Tasks para notificación API + UI + migración) | Cada Task necesita una revisión independiente; en ese caso, el comportamiento predeterminado (1 PR por Task) es correcto |
| Quieres reducir el recuento de PR y la fatiga por revisión | Quieres identificar qué Task falló directamente a nivel PR |

**Establezca el nombre de la rama compartida directamente con `--group-name`.** Si se omite, se genera automáticamente como `<base-branch>-<timestamp>`, pero eso hace que sea más difícil saber más tarde qué rama representaba qué trabajo. Se recomienda un nombre explícito y significativo.

| Skill | Formato de nombre de rama compartida |
|---|---|
| `ywc-sequential-executor --aggregate-pr --group-name <name>` | `work/<name>` |
| `ywc-parallel-executor --aggregate-pr --group-name <name>` | `aggregate/<name>` |

Solo difiere el prefijo del nombre de la rama (`work/` vs `aggregate/`); el principio de funcionamiento es el mismo: cada Task se fusiona localmente en la rama compartida, y al final se crea automáticamente un PR a partir de esa rama hacia la base, incluyendo la gestión de revisión/fusión de CI/bot. **Esta rama compartida no es la rama base real**: la base permanece intacta hasta que se fusiona el PR final.

## ywc-sequential-executor - cuando quieres ejecutar Tasks en orden

> **Nota**: `ywc-sequential-executor` en sí no tiene un flag `--tdd` propio. El paso de implementación de cada Task sigue internamente el mismo TDD gate por defecto que `ywc-code-gen` (confirmar una prueba que falla antes de implementar). Si necesitas el ritual completo RED → GREEN → REFACTOR con checkpoint commits por etapa, usa el flag `--tdd` de la sección `ywc-code-gen` más abajo e inclúyelo explícitamente en la solicitud de implementación de ese Task.

**Ejecute un Task con valores predeterminados**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010" />
  </ToolTabsPanel>
</ToolTabs>
El modo predeterminado `normal-pr` maneja automáticamente la creación de PR -> CI -> revisión por el bot -> fusión.

**Ejecutar automáticamente la revisión de código antes de abrir el PR**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --review --base-branch develop" />
  </ToolTabsPanel>
</ToolTabs>

**Ejecute múltiples Tasks a la vez y reciba la descripción de PR en japonés**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --pr-lang ja" />
  </ToolTabsPanel>
</ToolTabs>

**Termina rápido con la fusión local, sin un PR**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --review --local-merge --run-tests-locally" />
  </ToolTabsPanel>
</ToolTabs>
En el modo PR, CI ejecuta pruebas por ti. Con `--local-merge`, no hay CI remoto, por lo que es mejor requerir que pasen las pruebas locales antes de fusionar con `--run-tests-locally`.

**Entregar múltiples Tasks como un PR (`--aggregate-pr`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
Tasks están apilados secuencialmente en una rama `work/project-health` y se entregan como **uno** PR. Consulte la sección "Concepto compartido" arriba para el modelo completo `--aggregate-pr` y `--group-name`.

**Crea solo un PR y deja que un humano lo fusione más tarde**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>

**No sabes qué ejecutar; primero previsualiza el plan**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor --dry-run" />
  </ToolTabsPanel>
</ToolTabs>
Si no se especifica Task, detecta automáticamente el siguiente objetivo ejecutable desde `dependency-graph` e imprime solo el plan de ejecución (no se ejecuta nada realmente).

**Ejecutar de forma aislada para que no interfiera con otros trabajos en la verificación principal (`--worktree`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --review" />
  </ToolTabsPanel>
</ToolTabs>

`--worktree` ejecuta todo el rango **dentro de un único árbol de trabajo de git**. El clon original se deja intacto para que puedas continuar con otros trabajos. El punto clave es que esto es **aislamiento a nivel de ejecución**: un árbol de trabajo abarca todo el rango, y Tasks dentro de él sigue ejecutándose secuencialmente. (En contraste, `ywc-parallel-executor` crea un árbol de trabajo separado **por Task** - ver la sección del ejecutor en paralelo más abajo.)

- Es una **bandera independiente**. No es mutuamente excluyente con los cuatro modos de entrega (`normal-pr` / `--local-merge` / `--draft` / `--aggregate-pr`) ni con `--review`; puedes combinarla libremente. Activar o desactivar `--worktree` no cambia el modo de entrega en sí.
- **El manejo posterior a la finalización depende del modo de entrega:**
  - Combinaciones `normal-pr` / `--local-merge` / `--draft` -> cuando la ejecución termina (Estado de finalización `DONE`), se elimina el árbol de trabajo, pero **la rama de integración se conserva**. El informe incluye una nota que dice "la rama de integración aún no se ha fusionado al tronco", por lo que debes abrir `integration/run-<slug> -> trunk` PR tú mismo con `ywc-create-pr` - no se abre automáticamente.
  - Usado con `--aggregate-pr` -> el paso manual anterior no es necesario. La rama `work/<name>` se crea dentro del árbol de trabajo, y el `work -> base` PR se abre automáticamente al final.
- **Si falla a mitad de camino (`BLOCKED` / `DONE_WITH_CONCERNS`)**, el árbol de trabajo no se elimina y permanece en su lugar. Más tarde, puedes ingresar la ruta que se muestra en el informe y reanudar.
- Con `--dry-run`, no se crea un worktree real; solo se previsualiza qué ruta y nombre se utilizarían:
  <ToolTabs>
    <ToolTabsPanel tool="claude-code" label="Claude Code">
      <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
    <ToolTabsPanel tool="codex" label="Codex">
      <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --dry-run" />
    </ToolTabsPanel>
  </ToolTabs>

**`--worktree` + `--aggregate-pr` - ejecución aislada y entrega de un solo PR al mismo tiempo**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-sequential-executor 000020-010..000025-010 --worktree --aggregate-pr --group-name project-health --review" />
  </ToolTabsPanel>
</ToolTabs>
Esta es la combinación más completa cuando quieres dejar el proceso de pago principal sin cambios mientras agrupas múltiples Tasks en un PR mediante la implementación.

> **Nota**: `--local-merge` / `--draft` / `--skip-ci-wait` / `--aggregate-pr` son mutuamente exclusivos. Si usas dos o más juntos, la ejecución se detiene y solicita aclaración. `--review` y `--worktree` se pueden combinar con cualquiera de esos modos.

## ywc-parallel-executor - cuando quieres ejecutar Tasks de manera independiente al mismo tiempo

**Ejecuta Tasks de manera independiente en paralelo, creando y fusionando un PR por cada Task**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --per-task-pr --review" />
  </ToolTabsPanel>
</ToolTabs>
Se ejecutan concurrentemente por ola, y cada Task completa de forma independiente la creación de PR -> CI -> revisión por bot -> **fusión**.

**Fusionar rápidamente local cada Task sin PRs**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --local-merge --review" />
  </ToolTabsPanel>
</ToolTabs>

**Ejecuta todos los Tasks en paralelo y entrégalos como un PR (`--aggregate-pr`)**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor --all --aggregate-pr --group-name payments --review" />
  </ToolTabsPanel>
</ToolTabs>
Tasks se apilan por ola en una rama `aggregate/payments` y se entregan como **uno** PR. Consulte la sección "Concepto compartido" en la parte superior de esta página para el modelo completo `--aggregate-pr` y `--group-name`. Es exactamente el mismo concepto que `ywc-sequential-executor`, solo cambia el prefijo de rama compartida de `work/` a `aggregate/`.

**Después de que todo el trabajo se complete, deje que un humano revise y fusione todo de una vez**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-parallel-executor 000020-010..000025-010 --draft" />
  </ToolTabsPanel>
</ToolTabs>
Después de que se completen todas las olas, se crea un borrador PR y la fusión es manual.

> **Nota**: Si no se especifica ninguno de `--local-merge` / `--draft` / `--per-task-pr` / `--aggregate-pr`, se pregunta cuál de los cuatro modos deseas en lugar de elegir silenciosamente un valor predeterminado. `--review` se puede combinar con cualquier modo. (Para referencia, `ywc-parallel-executor` no tiene una bandera `--worktree` separada porque el aislamiento de worktree por Task es el comportamiento predeterminado de este Skill.)

## ywc-code-gen - cuando quieres generar código directamente sin la descomposición Task

**Generar Backend + Frontend + QA a la vez**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-improve-architecture-skill.md --feature &quot;improve architecture skill docs&quot;" />
  </ToolTabsPanel>
</ToolTabs>

**Construye cuidadosamente con TDD para funcionalidades sensibles como pago/autenticación**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/ywc-toolkit-eval-hardening.md --feature &quot;payment webhook hardening&quot; --tdd" />
  </ToolTabsPanel>
</ToolTabs>
Palabras clave como `payment` se clasifican automáticamente como `critical`, lo que prohíbe la delegación de caja gris (verificar solo las interfaces sin leer el código interno). `--tdd` aplica límites de commits RED -> GREEN -> REFACTOR.

**Ya revisaste el código reutilizable y quieres omitir la detección de duplicados**
<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-code-gen --spec docs/ywc-plans/improve-evaluate-codex-skills-agents-skill.md --feature &quot;notification settings UI&quot; --skip-reuse-check" />
  </ToolTabsPanel>
</ToolTabs>

> **Nota**: `--spec` y `--feature` son ambos necesarios. Si alguno está vacío, se detiene con `NEEDS_CONTEXT`. Si el trabajo ya tiene un directorio `tasks/`, use `ywc-sequential-executor` / `ywc-parallel-executor` en lugar de este Skill.

---

[Previous: 13. Gestionar la estructura del código y la mantenibilidad](./16-code-structure-and-maintainability.md) - [Next: 15. Referencia completa Skill](./14-skill-reference.md)
