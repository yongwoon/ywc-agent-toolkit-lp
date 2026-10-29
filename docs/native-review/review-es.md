# 스페인어 (Spanish) 원어민 검수 시트

총 195줄 (+ 사이드바 그룹 이름, 페이지 이동 링크 문구)
검수 대상: 2026-10-29 가이드북 갱신(PR #48~#58)에서 추가/수정된 문장만 발췌했습니다. 번호만 바뀐 줄, 코드 블록, 표 구분선은 제외했습니다.
검수 관점: (1) 자연스러운 표현인가 (2) 용어가 일관적인가 (3) 의미가 영어 원문과 어긋나지 않는가.
기술 용어(Skill, agent, worktree, PR 등)는 원문 그대로 두는 것이 기본입니다.
영어 원문: 같은 파일명의 `src/content/guidebook/en/<파일>` (https://github.com/yongwoon/ywc-agent-toolkit-lp/tree/main/src/content/guidebook/en)
회신 방법: 수정이 필요한 줄의 `L<번호>` 옆에 수정안과 이유를 적어 주세요. 문제가 없는 줄은 그대로 두시면 됩니다.

## 사이드바 그룹 이름 (src/components/guidebook/guidebook-nav.ts)

- prologue: "Prólogo",
- "getting-started": "Primeros pasos",
- "core-pipeline": "Flujo principal",
- "project-setup": "Inicio de un proyecto",
- quality: "Calidad y verificación",
- operations: "Operaciones y áreas especializadas",
- reference: "Referencia"

## 페이지 하단 이동 링크 문구 (모든 페이지 공통 형식)

- [← Anterior: 07. …](…) · [Siguiente: 09. … →](…) / última página: [Volver al índice »](./README.md)

## 02-core-concepts.md

- L16: ### Agents por herramienta
- L18: Los agents se ejecutan dentro de las Skills; nunca los invocas tú directamente. Las dos herramientas incluyen conjuntos distintos: 13 agents en Claude Code y 10 en Codex. En Claude Code, los worker agents escriben el código de servidor, de UI y de tests. En Codex, la propia sesión de la Skill escribe el código, y la mayoría de los agents son asesores y revisores de solo lectura.
- L20: | Agent | Rol | Principales Skills que lo invocan | Claude Code | Codex |
- L22: | `ywc-architect` | Decisiones de arquitectura y trade-offs (solo lectura) | `ywc-plan`, `ywc-impl-review` | ✓ | ✓ |
- L23: | `ywc-security-engineer` | Revisión de seguridad estática (solo lectura) | `ywc-security-audit`, `ywc-impl-review`, `ywc-infra-review` | ✓ | ✓ |
- L24: | `ywc-root-cause-analyst` | Análisis de causa raíz (solo lectura) | `ywc-debug-rootcause` | ✓ | ✓ |
- L25: | `ywc-performance-engineer` | Análisis de rendimiento y recomendaciones de profiling (solo lectura) | `ywc-impl-review` | ✓ | ✓ |
- L26: | `ywc-typescript-reviewer` / `ywc-python-reviewer` / `ywc-go-reviewer` | Revisión específica por lenguaje (solo lectura) | `ywc-impl-review` | ✓ | ✓ |
- L27: | `ywc-cloud-engineer` | IaC con Terraform. En Claude Code lo escribe y lo revisa; en Codex solo lo revisa (solo lectura) | `ywc-iac-author`, `ywc-infra-review`, `ywc-infra-optimize` | ✓ | ✓ |
- L28: | `ywc-backend-coder` / `ywc-frontend-coder` / `ywc-qa-engineer` | Escriben código de servidor / código de UI / código de tests | `ywc-code-gen`, ambos executors | ✓ | |
- L29: | `ywc-refactor-cleaner` | Ejecuta el bucle seguro de eliminación de código muerto | `ywc-refactor-clean` | ✓ | |
- L30: | `ywc-doc-writer` | Escribe documentación | `ywc-auth-implement`, `ywc-project-docs` | ✓ | |
- L31: | `ywc-complexity-cleaner` / `ywc-test-hardener` | Workers de la puerta de calidad: reducen la complejidad del código de producción / refuerzan los tests frente a los mutantes supervivientes | Puerta de calidad de los executors ([18](./13-executor-and-codegen-patterns.md)) | | ✓ |

## 05-general-cycle-medium-large.md

- L33: ## IDs de Task e iniciales del colaborador
- L35: `ywc-task-generator` ahora antepone a los IDs de Task las iniciales del colaborador, para que varias personas puedan generar Tasks sin colisiones de número. Antes: `000001-010-db-create-user-table`; ahora: `yk-000001-010-db-create-user-table`. El nombre del directorio de la Task es el mismo. Los IDs antiguos sin prefijo siguen siendo válidos, no se renumeran y pueden convivir con los nuevos.
- L37: - Las iniciales tienen de 2 a 4 letras o dígitos en minúscula. Puedes pasarlas explícitamente con `--initials yk` o dejar que la skill las resuelva.
- L38: - La numeración es por iniciales: el contador de cada persona continúa desde su propia fase más alta.
- L39: - Claude Code: `--initials` → sección `## Task Initials` del `CLAUDE.md` del proyecto → derivadas de `git config user.email` / `user.name` y confirmadas una vez (luego se guardan en `CLAUDE.md`). Si nada se resuelve, se usa la numeración antigua sin prefijo.
- L40: - Codex: `--initials` → `.codex/ywc.json` del proyecto → `~/.codex/ywc.json` del usuario → derivadas y confirmadas una vez (se guardan con `ywc-setup`). En ejecuciones no interactivas sin nada guardado, la skill se detiene con `NEEDS_CONTEXT` y pide `--initials`.
- L42: **Tamaño de las Tasks.** `--mode human|llm` (alias `--granularity`) controla el tamaño. `human` genera Tasks que una persona puede revisar en aproximadamente una hora; `llm` genera Tasks más grandes, dimensionadas para un agente. Si omites el flag, la skill siempre pregunta; nunca elige en silencio.
- L44: Antes de generar, si `tasks/dependency-graph.md` supera las 300 líneas, la skill lo compacta automáticamente (las fases completadas se colapsan en un encabezado "done" de una línea). Los ejecutores también lo hacen tras cada Task. No tienes que hacer nada.

## 07-starting-a-new-project.md

- L18: | Dos | `ywc-project-mission` *(solo en Claude Code)* | Registra la mission del proyecto, sus criterios de éxito medibles y sus non-goals en `docs/project-mission.md`. **Fija el porqué antes de diseñar cualquier estructura** |
- L44: Este paso es solo para Claude Code: Codex no tiene skill de mission. En Codex, indica los criterios de éxito en la especificación del paso 6.
- L46: Fija la **mission y los criterios de éxito** antes que la estructura del directorio o la especificación: cada paso posterior se juzga contra esta mission.
- L139: - `ywc-project-mission` no guarda un registro de enfoques descartados. Para registrar decisiones difíciles de revertir junto con las alternativas descartadas, usa `ywc-adr` (solo en Claude Code).
- L140: - Para un producto TypeScript grande, `ywc-project-scaffold` puede proponer un monorepo con pnpm workspaces: `apps/web`, `apps/server`, `packages/{contracts,core,db,…}` y, en la raíz, `tests/{architecture,contract,integration,e2e}`. `contracts` no tiene dependencias internas, `core` no importa frameworks ni infraestructura, y `tests/architecture` hace cumplir las dependencias prohibidas.
- L141: - La UI nueva se planifica por defecto mobile-first (primero el viewport más estrecho y después se amplía con breakpoints `min-width`). Si una superficie es solo para PC o tablet (por ejemplo, una herramienta de administración), indícalo explícitamente en una línea.

## 13-executor-and-codegen-patterns.md

- L147: **Flags para scripts y CI**
- L149: | Flag | Qué hace | Disponibilidad |
- L151: | `--terse` | Imprime solo la tabla de Tasks (nombre, estado, URL del PR o SHA de fusión) y la línea final `Completion Status`. Pensado para que CI lo procese | Ambos ejecutores, ambas herramientas |
- L152: | `--non-interactive` | Suprime todos los prompts. Cualquier decisión que necesitaría respuesta termina en un estado fijo: `NEEDS_CONTEXT` si falta información, `BLOCKED` ante un conflicto, árbol sucio o `gh` sin autenticar, y `DONE_WITH_CONCERNS` ante un timeout de CI | Claude Code: solo `ywc-sequential-executor`. Codex: solo `ywc-parallel-executor` |
- L201: ### Puerta de calidad y hardener de ola (opt-in)
- L203: Si una Task declara un `## Quality Gate Contract` (puntuación CRAP ≤ 6–8 y puntuación de mutación ≥ 90 %, o el centinela `N/A — no quality gate contract`), los ejecutores lanzan un cleaner (refactor del código de producción) y un hardener (solo tests; no puede editar código de producción). El hardener se ejecuta una vez por ola, después de que se fusionan las Tasks de esa ola.
- L205: - Con `--local-merge`, `--draft` o `--aggregate-pr`, la ola primero se fusiona en una rama `wave-int/<N>`. Esa rama solo se promueve a la rama base si el veredicto del hardener es PASS (o si ninguna puerta aplica). Con un veredicto `BLOCKED` / `NEEDS_CONTEXT`, la rama base no se toca y se conservan la rama y los worktrees para que puedas corregir y reanudar.
- L206: - Al reanudar, el ejecutor verifica que la rama `wave-int/<N>` siga coincidiendo con el SHA de la punta (tip) que registró. Si no puede verificarla, bloquea la ola en lugar de reutilizarla.
- L207: - Con `--per-task-pr`, el hardener solo informa y nunca bloquea.
- L208: - Las Tasks sin contrato no se ven afectadas.

## 14-skill-reference.md

- L23: | [`ywc-verify-done`](#quieres-demostrar-la-finalización-con-puertas-explícitas-y-re-ejecutables) | Quieres demostrar la finalización con puertas explícitas y re-ejecutables |
- L28: | [`ywc-mine-review-history`](#quieres-escanear-muchos-prs-ya-fusionados-a-la-vez-y-encontrar-defectos-de-revisión-que-se-repiten) | Quieres escanear muchos PRs ya fusionados a la vez y encontrar defectos de revisión que se repiten |
- L30: | [`ywc-project-mission` *(solo en Claude Code)*](#quieres-registrar-la-mission-los-criterios-de-éxito-y-los-non-goals-del-proyecto) | Quieres registrar la mission, los criterios de éxito y los non-goals del proyecto |
- L31: | [`ywc-adr` *(solo en Claude Code)*](#quieres-registrar-una-decisión-de-arquitectura-difícil-de-revertir-junto-con-las-alternativas-que-se-rechazaron) | Quieres registrar una decisión de arquitectura difícil de revertir junto con las alternativas que se rechazaron |
- L51: Si omites el número de PR, encuentra automáticamente el PR de la rama actual. *(Solo en Claude Code)* Los "Nitpick comments" de CodeRabbit (que no tienen hilo de revisión) también se detectan y se clasifican como los demás comentarios; los puntos atendidos se registran en un único comentario a nivel de PR con marcadores ocultos, para que no vuelvan a aparecer.
- L65: Si se encuentra un README de la Task o un plan bajo `docs/ywc-plans/`, el cuerpo del PR incluye una sección `Design Background` (objetivo y, si el plan los tiene, Alternatives Considered / Trade-offs). `--plan-doc <path.md>` elige el plan explícitamente (ruta relativa al repo, dentro del repo); `--no-plan-ref` desactiva la búsqueda; si se pasan ambos, `--plan-doc` tiene prioridad. Si varios planes coinciden, la skill los lista y te pide volver a ejecutar con `--plan-doc`.
- L115: A través del diálogo socrático, se derivan el objetivo / las limitaciones / los criterios de éxito y 2-3 alternativas, luego se entrega a `ywc-plan`. Antes de ese traspaso, el diseño enumera sus premisas clave con su evidencia (`file:line` y un fragmento citado) y un estado VERIFIED/UNVERIFIED; las premisas no verificadas se registran como modos de fallo o se marcan como fuera de alcance, en lugar de asumirse en silencio.
- L166: ### Quieres demostrar la finalización con puertas explícitas y re-ejecutables
- L168: Escribes un ledger en markdown donde cada puerta tiene:
- L170: - `CHECK:` — un comando de shell
- L171: - `EXPECT:` — una subcadena o un `/regex/` que debe aparecer en la salida
- L172: - `EVIDENCE:` — la evidencia que respalda la puerta
- L174: Después ejecutas el script de verificación sobre el ledger:
- L185: Si omites `--status`, el script ejecuta las puertas; `--reverify` vuelve a ejecutar todas las puertas.
- L187: - Exit 0 significa que todas las puertas ejecutables se cumplen.
- L188: - Las puertas sin `CHECK` ni `EXPECT` son manuales y nunca bloquean.
- L189: - Un PASS en caché solo se considera válido mientras el texto de la puerta no cambie.
- L190: - Cada puerta tiene un timeout de 120 s.
- L191: - Las líneas `CHECK` ejecutan comandos arbitrarios con tus permisos, así que lee antes un ledger que no hayas escrito tú.
- L193: El ledger es opcional: la verificación por defecto con un solo comando no cambia. Disponible en ambas herramientas.
- L234: ### Quieres escanear muchos PRs ya fusionados a la vez y encontrar defectos de revisión que se repiten
- L244: Recorre los comentarios de revisión de los bots (CodeRabbit / Codex Review / Claude Review) en N PRs fusionados, clasifica cada comentario como aceptado o descartado y los agrupa en clases de defecto. Las clases que se repiten en al menos `--min-recurrence` PRs distintos (por defecto 3) se proponen a `ywc-review-learnings`. Es obligatorio indicar `--limit` o `--since`, porque nunca escanea todo el historial. No escribe `docs/review-learnings.md` por sí mismo: la promoción pasa por el paso de confirmación de `ywc-review-learnings`. Para un solo PR abierto, usa `ywc-handle-pr-reviews`.
- L258: ### Quieres registrar la mission, los criterios de éxito y los non-goals del proyecto
- L261: Esta Skill es solo para Claude Code. Registra la mission, los criterios de éxito medibles y los non-goals en `docs/project-mission.md`. El flujo completo está en [09. Starting a new Project](./07-starting-a-new-project.md); usa también `ywc-project-mission` para actualizar la mission cuando cambie la dirección del proyecto.
- L263: ### Quieres registrar una decisión de arquitectura difícil de revertir junto con las alternativas que se rechazaron
- L266: Esta Skill es solo para Claude Code. Escribe `docs/adr/NNNN-<slug>.md` con las secciones Context / Decision / Alternatives Considered / Consequences. Modos: `new`, `read`, `list` y `curate`. Regístralo solo cuando la decisión sea difícil de revertir, sorprendente sin contexto y implique un trade-off real. Nunca edites un ADR antiguo: para reemplazarlo, crea un registro nuevo con `--supersedes ADR-NNNN`.
- L321: - En Codex, `ywc-setup` también guarda las iniciales del colaborador (`--initials yk`). Con `--scope project|user` eliges si se guardan en `.codex/ywc.json` (proyecto) o en `~/.codex/ywc.json` (usuario).
- L322: - En Claude Code, `ywc-setup-language` solo gestiona el idioma: escribe una sección `## Language Policy` en `CLAUDE.md`. Las iniciales en Claude Code provienen de `--initials` o de la sección `## Task Initials` de `CLAUDE.md` (ver [06](./05-general-cycle-medium-large.md#ids-de-task-e-iniciales-del-colaborador)).
- L348: ## Skills disponibles en una sola herramienta
- L350: La mayoría de las Skills existen en ambas herramientas, pero algunas solo están disponibles en una de ellas.
- L352: | Herramienta | Skill | Qué hace |
- L354: | Codex | `ywc-wayfinder` | Descubrimiento multi-sesión para cambios grandes o inciertos: un mapa local con exactamente un ticket activo, antes de planificar o implementar |
- L355: | Codex | `ywc-architecture-invariants` | Valida un contrato opcional `architecture-invariants.json` en la raíz del repo contra evidencia acotada y normalizada de las aristas de dependencia |
- L356: | Codex | `ywc-implement` | Implementa exactamente una especificación o ticket aprobado mediante un cambio acotado y sujeto a revisión |
- L357: | Codex | `ywc-team-assemble` | Forma un equipo de especialistas o delega en subagentes cuando lo pides explícitamente |
- L358: | Codex | `ywc-setup` | Define el idioma de salida predeterminado o las iniciales del colaborador (equivalente en Codex de `ywc-setup-language`) |
- L359: | Claude Code | `ywc-adr` | Registra decisiones difíciles de revertir junto con las alternativas rechazadas. Ver [aquí](#quieres-registrar-una-decisión-de-arquitectura-difícil-de-revertir-junto-con-las-alternativas-que-se-rechazaron) |
- L360: | Claude Code | `ywc-project-mission` | Registra la mission, los criterios de éxito y los non-goals del proyecto. Ver [aquí](#quieres-registrar-la-mission-los-criterios-de-éxito-y-los-non-goals-del-proyecto) |
- L361: | Claude Code | `ywc-setup-language` | Fija un idioma de salida persistente para no pasar `--lang` en cada llamada. Ver [aquí](#configurar-un-idioma-de-salida-persistente-para-que-las-skills-no-lo-pidan-cada-vez) |
- L369: | `ywc-adr` *(solo en Claude Code)* | Quieres registrar una decisión de arquitectura difícil de revertir junto con las alternativas que se rechazaron | [aquí](#quieres-registrar-una-decisión-de-arquitectura-difícil-de-revertir-junto-con-las-alternativas-que-se-rechazaron) |
- L371: | `ywc-architecture-invariants` *(solo en Codex)* | Valida un contrato opcional `architecture-invariants.json` en la raíz del repo contra evidencia acotada y normalizada de las aristas de dependencia | [aquí](#skills-disponibles-en-una-sola-herramienta) |
- L388: | `ywc-implement` *(solo en Codex)* | Implementa exactamente una especificación o ticket aprobado mediante un cambio acotado y sujeto a revisión | [aquí](#skills-disponibles-en-una-sola-herramienta) |
- L394: | `ywc-mine-review-history` | Quieres escanear muchos PRs ya fusionados a la vez y encontrar defectos de revisión que se repiten | [aquí](#quieres-escanear-muchos-prs-ya-fusionados-a-la-vez-y-encontrar-defectos-de-revisión-que-se-repiten) |
- L400: | `ywc-project-mission` *(solo en Claude Code)* | Quieres registrar la mission, los criterios de éxito y los non-goals del proyecto | [aquí](#quieres-registrar-la-mission-los-criterios-de-éxito-y-los-non-goals-del-proyecto) |
- L408: | `ywc-setup` *(solo en Codex)* | Configurar un idioma de salida persistente para que las skills no lo pidan cada vez | [aquí](#configurar-un-idioma-de-salida-persistente-para-que-las-skills-no-lo-pidan-cada-vez) |
- L409: | `ywc-setup-language` *(solo en Claude Code)* | Configurar un idioma de salida persistente para que las skills no lo pidan cada vez | [aquí](#configurar-un-idioma-de-salida-persistente-para-que-las-skills-no-lo-pidan-cada-vez) |
- L416: | `ywc-team-assemble` *(solo en Codex)* | Forma un equipo de especialistas o delega en subagentes cuando lo pides explícitamente | [aquí](#skills-disponibles-en-una-sola-herramienta) |
- L420: | `ywc-verify-done` | Verifica mecánicamente la finalización ejecutando lint/typecheck/test/build | [aquí](#quieres-demostrar-la-finalización-con-puertas-explícitas-y-re-ejecutables) |
- L421: | `ywc-wayfinder` *(solo en Codex)* | Descubrimiento multi-sesión para cambios grandes o inciertos: un mapa local con exactamente un ticket activo, antes de planificar o implementar | [aquí](#skills-disponibles-en-una-sola-herramienta) |

## 16-code-structure-and-maintainability.md

- L7: Las dos Skills parten del mismo síntoma — "el código no está bien" — pero responden preguntas distintas. Elige según qué pregunta te estés haciendo ahora mismo.
- L27: `--tier safe` solo elimina elementos en los que la herramienta de detección, grep y los tests coinciden en que el código no se usa. No reestructura nada: la estructura en sí no la toca esta Skill. Usa `ywc-impl-review` para detectar problemas de arquitectura o diseño y corrígelos después mediante el ciclo normal.
- L44: **Opciones que conviene conocer**
- L46: - Elige exactamente un objetivo de revisión: `--code <path>`, `--git-range <sha>..<sha>` o `--working-tree` (cambios staged, unstaged y untracked, sin necesidad de commit). `--spec` es opcional en Claude Code.
- L47: - `--profile chill|assertive` (por defecto `chill`): `chill` oculta los nits de estilo Low/Info; `assertive` los muestra. Critical/High/Medium nunca se ocultan.
- L48: - `--no-advisor` omite las llamadas al advisor de la Fase 2; `--advisor-budget <n>` limita cuántas se hacen (por defecto 5).
- L49: - `--format html` escribe un informe autocontenido en `claudedocs/` (por defecto `markdown`).
- L50: - `--non-interactive` (solo en Claude Code): omite la pregunta de promoción de learnings y, en su lugar, lista los candidatos a learning en el informe.
- L52: **Verificación independiente.** Cada hallazgo Critical o High confirmado es revisado de nuevo, una vez, por un revisor nuevo que solo ve `file:line` y la severidad declarada. Los hallazgos que no se pueden reproducir se envían al advisor de la Fase 2 (salvo los de Security) o se marcan como no verificados. Como máximo se verifican 20 hallazgos por ejecución.
- L54: **Guardarraíl de alcance.** La revisión se niega a empezar (`NEEDS_CONTEXT`) cuando hay más de 200 archivos o más de 5.000 líneas cambiadas en el alcance. Informa de los recuentos y de los 5 archivos más grandes, y te pide acotar el objetivo. No se muestrea ni se trunca nada.
- L62: Si hay dead code, atiende primero este paso, el más reversible. Solo elimina lo que la herramienta de detección, grep y los tests coinciden en marcar como no usado, así que el riesgo es bajo.
- L66: Antes de abrir el PR, ejecuta una revisión de 5 ejes para detectar lo que haya quedado pendiente. Los hallazgos pueden volver al Paso 1 (`ywc-refactor-clean`) o a la implementación normal.

## 19-skill-combination-recipes.md

- L3: # 08. Recetas para combinar Skills
- L5: Las demás páginas explican un flujo o una Skill a la vez. Esta página muestra cómo las Skills se alimentan entre sí: qué deja una Skill y qué Skill lo recoge después. Cada conexión de abajo es algo que las propias Skills hacen (leer un archivo compartido, ofrecer un hand-off), no una convención que tengas que recordar.
- L7: | Lo que quieres | Receta |
- L9: | Evitar que vuelva el mismo comentario de revisión | [Bucle de aprendizaje de revisiones](#bucle-de-aprendizaje-de-revisiones) |
- L10: | Convertir un bug corregido en una lección duradera | [De la corrección de un bug a la prevención](#de-la-corrección-de-un-bug-a-la-prevención) |
- L11: | Saber qué gate se ejecuta y cuándo, antes y después de un PR | [Gates antes y después de un PR](#gates-antes-y-después-de-un-pr) |
- L12: | Conservar el motivo de las decisiones difíciles de revertir | [Registrar decisiones mientras planificas](#registrar-decisiones-mientras-planificas) |
- L13: | Empezar un cambio grande cuyo alcance aún no está claro | [Exploración antes de planificar](#exploración-antes-de-planificar) |
- L14: | Ejecutar Tasks en paralelo sin colisiones | [Entorno de ejecución en paralelo](#entorno-de-ejecución-en-paralelo) |
- L15: | Preparar un release | [Preparación de un release](#preparación-de-un-release) |
- L17: ## Bucle de aprendizaje de revisiones
- L19: `docs/review-learnings.md` es la memoria de revisiones del proyecto. `ywc-review-learnings` es dueña del archivo; las demás Skills lo leen y lo alimentan.
- L21: 1. **Recibir** — antes de actuar sobre un comentario, `ywc-receive-review` comprueba si es técnicamente correcto, para que no implementes una corrección equivocada solo porque un revisor la pidió.
- L22: 2. **Gestionar** — `ywc-handle-pr-reviews` corrige o responde cada thread y deja el PR listo para merge (CI en verde, sin conflicto con la base).
- L23: 3. **Registrar** — las lecciones que vale la pena conservar van a `docs/review-learnings.md` a través de `ywc-review-learnings`. Con `--source pr --pr <número>` destila los comentarios de revisión de los bots de un PR. Cada entrada nueva se te muestra como un changeset y solo se escribe después de que la confirmes.
- L24: 4. **Recuperar el histórico** — para PRs pasados, `ywc-mine-review-history` recorre muchos PRs fusionados a la vez y propone a `ywc-review-learnings` las clases de defecto que se repiten.
- L25: 5. **Reutilizar** — `ywc-impl-review` carga los aprendizajes al inicio de cada revisión (se omite con `--skip-learnings`), así que un falso positivo conocido no se vuelve a señalar y un `DO-NOT` conocido se detecta antes. Después de la revisión, ofrece registrar los hallazgos que se repiten.
- L36: El bucle funciona en ambas herramientas. Cada vuelta hace que la siguiente revisión tenga menos ruido: los comentarios que el equipo ya rechazó dejan de volver, y los comentarios con los que el equipo estuvo de acuerdo se detectan antes de abrir el PR.
- L38: ## De la corrección de un bug a la prevención
- L40: 1. `ywc-debug-rootcause` encuentra la causa raíz, añade un regression test y valida la corrección con `ywc-verify-done` ([15](./12-debugging-and-incident-postmortem.md)).
- L41: 2. Si la misma clase de defecto podría aparecer en otro lugar, ofrece registrarla como aprendizaje de revisión (`ywc-review-learnings --mode update --source debug`).
- L42: 3. Tras un incidente en producción, `ywc-incident-postmortem` redacta el informe y ofrece de la misma forma sus action items para prevenir la recurrencia (`--source incident`).
- L43: 4. A partir de entonces, `ywc-impl-review` lee esos aprendizajes, así que la misma clase de defecto se detecta en la revisión en lugar de en producción.
- L45: Los pasos 2 y 3 son solo para Claude Code. En Codex, las dos Skills no hacen hand-off a `ywc-review-learnings`; si una lección vale la pena, regístrala tú mismo con `ywc-review-learnings` (el source por defecto, `feedback`).
- L47: ## Gates antes y después de un PR
- L49: | Cuándo | Skill | Qué comprueba |
- L51: | Antes de la implementación | `ywc-confidence-gate` | Puntúa la preparación en cinco dimensiones: PROCEED (90 o más), REVIEW (70-89), STOP (por debajo de 70). Por debajo de 90, la implementación espera hasta que se refuerce la dimensión más débil o aceptes el riesgo |
- L52: | Después de la implementación | `ywc-impl-review` | Revisión de cinco aspectos frente a la spec ([14](./16-code-structure-and-maintainability.md)) |
- L53: | Cuando el cambio afecta a la seguridad | `ywc-security-audit` | Revisión estática de seguridad (OWASP Top 10, secrets, threat model) |
- L54: | Antes de decir "hecho" | `ywc-verify-done` | Evidencia nueva (salida de test o build) para cada afirmación de finalización |
- L55: | Al abrir el PR | `ywc-create-pr` | Commit, push y un cuerpo de PR construido a partir de la task o el plan |
- L56: | Después de que respondan los revisores | `ywc-handle-pr-reviews` | Comentarios, CI y conflictos, como en el bucle anterior |
- L57: | Merge | `ywc-finish-branch` | Espera de CI y de la revisión de bots, merge, comprobación posterior al merge, limpieza de la rama |
- L59: Rara vez llamarás a `ywc-verify-done` directamente: `ywc-code-gen` y ambos executors lo llaman en su propio paso de finalización. Llámalo tú mismo cuando hayas terminado el trabajo a mano.
- L61: ## Registrar decisiones mientras planificas
- L63: Esta receta es solo para Claude Code.
- L65: - Antes de planificar, `ywc-plan` lee `docs/adr/` y `docs/project-mission.md` si existen. Un plan no contradice en silencio una decisión ya tomada; si hay un conflicto, se te muestra.
- L66: - Cuando una decisión de arquitectura del plan es difícil de revertir, sorprendería a un lector posterior sin contexto y es un trade-off real, `ywc-plan` ofrece una vez guardarla como ADR mediante `ywc-adr`. Cuando el plan fija un nuevo success criterion duradero, ofrece añadirlo a `docs/project-mission.md`.
- L67: - Cuando la decisión es una comparación de librerías o enfoques, ejecuta primero `ywc-tech-research` y planifica a partir de sus resultados.
- L71: Codex no tiene ni `ywc-adr` ni `ywc-project-mission`; en su lugar, conserva el razonamiento en el documento del plan o de la spec.
- L73: ## Exploración antes de planificar
- L75: Esta receta es solo para Codex.
- L77: 1. `ywc-wayfinder` mantiene un mapa local en `docs/ywc-plans/<slug>-wayfinder.md` a lo largo de varias sesiones. El mapa puede contener muchos tickets, pero exactamente uno está activo a la vez, y la Skill nunca implementa nada por sí misma.
- L78: 2. Una vez que la ruta de un ticket está clara, hace hand-off a `ywc-plan` (o a `ywc-tech-research` cuando el ticket está bloqueado en una comparación técnica).
- L79: 3. A partir de ahí continúa el flujo habitual: `ywc-spec-ready` → `ywc-task-generator` → executor ([06](./05-general-cycle-medium-large.md)). Cuando solo hay que implementar una única spec o ticket aprobado, `ywc-implement` lo hace como un cambio acotado y sujeto a un review gate.
- L83: Úsala solo para trabajos grandes, inciertos o que abarquen varias sesiones. La planificación normal corresponde a `ywc-plan`, y la aclaración de ideas a `ywc-brainstorm`.
- L85: ## Entorno de ejecución en paralelo
- L87: `ywc-parallel-executor` crea el worktree de cada task mediante `ywc-worktrees`. En proyectos con Docker, también asigna a cada worktree su propio bloque de puertos del host mediante `ywc-docker-isolate`, para que los stacks no choquen ("port is already allocated"). Después del merge, `ywc-finish-branch` elimina el worktree con `ywc-worktrees --mode prune`.
- L89: Normalmente no llamas a ninguna de ellas tú mismo; el executor las dirige en ambas herramientas. Para crear o limpiar un worktree fuera de una ejecución del executor, usa los comandos de [19](./14-skill-reference.md).
- L91: ## Preparación de un release
- L93: 1. Primero, resuelve las actualizaciones de dependencias pendientes: `ywc-merge-dependabot security parallel-auto`.
- L94: 2. Abre el PR de release (por ejemplo `develop` → `main`) y luego genera su descripción con `ywc-release-pr-list <número del PR de release>`, que agrupa los PRs fusionados por autor.
- L95: 3. Escribe `CHANGELOG.md` y las notas para usuarios con `ywc-changelog-release-notes`. Si pasas el archivo de resultado del paso 2 con `--pr-list`, usará esa lista en lugar de git log.

## README.md

- L7: - Si es tu primera vez, sigue **Primeros pasos** después del Prólogo (01 -> 02 -> 03 -> 04) y luego lee **Flujo principal** (05-08).
- L8: - Si ya conoces los conceptos básicos y estás buscando una tarea específica, salta directamente a la página correspondiente en **Inicio de un proyecto**, **Calidad y verificación** u **Operaciones y áreas especializadas**.
- L15: ### Planificar e implementar
- L17: | Lo que quieres hacer | Skill inicial | Guía |
- L27: | Explorar un cambio grande e incierto a lo largo de varias sesiones (solo en Codex) | `ywc-wayfinder` | [08](./19-skill-combination-recipes.md) |
- L29: | Ver cómo se encadenan las Skills entre sí | - | [08](./19-skill-combination-recipes.md) |
- L31: ### Calidad y verificación
- L33: | Lo que quieres hacer | Skill inicial | Guía |
- L41: | Quiero una revisión independiente de la calidad de implementación y la mantenibilidad | `ywc-impl-review` | [14](./16-code-structure-and-maintainability.md) |
- L42: | Demostrar la finalización con puertas explícitas y re-ejecutables | `ywc-verify-done` | [19](./14-skill-reference.md) |
- L43: | Revisar un proyecto desde la perspectiva del negocio y del usuario | `ywc-product-review` | [19](./14-skill-reference.md) |
- L45: ### PR, revisiones y lanzamientos
- L47: | Lo que quieres hacer | Skill inicial | Guía |
- L50: | Comprobar si el comentario de un revisor es realmente correcto antes de actuar | `ywc-receive-review` | [19](./14-skill-reference.md) |
- L51: | Evitar que vuelvan a aparecer los mismos comentarios de revisión | `ywc-review-learnings` | [08](./19-skill-combination-recipes.md) |
- L56: ### Depuración e incidentes
- L58: | Lo que quieres hacer | Skill inicial | Guía |
- L63: ### Conocimiento y decisiones del proyecto
- L65: | Lo que quieres hacer | Skill inicial | Guía |
- L68: | Registrar una decisión de arquitectura difícil de revertir (solo en Claude Code) | `ywc-adr` | [19](./14-skill-reference.md) |
- L78: | [01. Introducción](./01-introduction.md) | Qué es este ecosistema Skill/Agent, para quién es y qué problemas resuelve |
- L79: | [02. Conceptos fundamentales](./02-core-concepts.md) | Términos como Skill / Agent / Executor / Task, sintaxis de invocación, y los cuatro estados de finalización como `DONE` |
- L81: ### Primeros pasos
- L83: | Página | Descripción |
- L86: | [04. Envía tu primera función en 5 minutos](./03-quickstart.md) | El primer ejercicio práctico, siguiendo una pequeña característica desde la idea hasta la fusión |
- L88: ### Flujo principal
- L90: | Página | Descripción |
- L92: | [05. Manejo de un cambio pequeño (ciclo general - pequeño)](./04-general-cycle-small.md) | El flujo estándar para un cambio que termina como un único PR sin descomposición Task |
- L93: | [06. Manejo del trabajo dividido en múltiples Tasks (ciclo general - mediano/grande)](./05-general-cycle-medium-large.md) | El flujo para los cambios que necesitan validación de especificaciones y descomposición Task |
- L94: | [07. Terminar automáticamente desde un objetivo (ywc-agentic)](./06-agentic-autonomous-loop.md) | En lugar del control manual en 05/06, repite automáticamente Planificar -> Ejecutar -> Evaluar -> Repetir desde un solo objetivo |
- L95: | [08. Recetas para combinar Skills](./19-skill-combination-recipes.md) | Cómo se pasan el trabajo las Skills entre sí: bucle de aprendizaje de revisiones, del bug a la prevención, gates de PR, registro de decisiones, exploración, ejecución en paralelo y release |
- L97: ### Inicio de un proyecto
- L99: | Página | Descripción |
- L101: | [09. Empezando un nuevo proyecto](./07-starting-a-new-project.md) | De una hoja en blanco al diseño del proyecto y la primera especificación completada |
- L102: | [10. Entrando en un repositorio existente por primera vez](./08-onboarding-existing-repo.md) | Un flujo de incorporación que invierte la ingeniería de las convenciones de una base de código desconocida y crea `CLAUDE.md` |
- L104: ### Calidad y verificación
- L108: | [11. Escribir y ejecutar pruebas](./09-testing-guide.md) | Cómo operar hojas de prueba de verificación manual junto con pruebas automatizadas |
- L109: | [12. Estrategia de automatización de pruebas E2E](./10-e2e-test-strategy.md) | Una guía avanzada para configurar, expandir y mantener una Suite E2E basada en Playwright |
- L110: | [13. Revisando y mejorando el diseño](./11-design-review.md) | Cómo distinguir y aplicar auditorías de usabilidad y Renovación visual de deslizamiento |
- L111: | [14. Gestionar la estructura del código y la mantenibilidad](./16-code-structure-and-maintainability.md) | Cómo usar las 2 Skills que limpian y verifican código con mala estructura o mantenibilidad, y el orden en que trabajan juntas |
- L113: ### Operaciones y áreas especializadas
- L117: | [15. Debugging e informe postmortem](./12-debugging-and-incident-postmortem.md) | Investigación de causa raíz mientras el incidente está activo, y análisis posterior al incidente después de que se implementa la solución |
- L125: | [18. Executor / Patrones de indicación de generación de código](./13-executor-and-codegen-patterns.md) | Ejemplos prácticos de comandos para `ywc-sequential-executor` / `ywc-parallel-executor` / `ywc-code-gen` con muchas opciones |
- L126: | [19. Referencia completa Skill](./14-skill-reference.md) | Un índice de las Habilidades restantes no cubiertas en las guías anteriores, organizado por situación |
