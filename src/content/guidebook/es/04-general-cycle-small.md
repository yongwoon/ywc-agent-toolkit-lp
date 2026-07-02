[Back to table of contents](./README.md)

# 04. Manejo de un cambio pequeño (ciclo general - pequeño)

## Cuándo usar este flujo

Cuando `ywc-plan` juzga una solicitud como **Pequeña**, automáticamente entra en este camino. El criterio de decisión es "¿puede esto terminar como un único PR sin descomposición Task?" Si se aplica algún elemento de los siguientes, se eleva a Mediana/Grande en lugar de Pequeña (ver [05](./05-general-cycle-medium-large.md)).

- Incluye una migración de base de datos
- Introduce una nueva biblioteca/marco
- Se extiende a múltiples subsistemas

## Flujo general

```
ywc-plan -> ywc-spec-ready -> ywc-code-gen -> ywc-impl-review -> ywc-create-pr
```

| Paso | Skill | Rol |
|---|---|---|
| uno | `ywc-plan` | Analiza la solicitud y crea `plan.md` (Qué / Por qué / Fuera de alcance / Hecho cuando) |
| Dos | `ywc-spec-ready` | Converger automáticamente las preocupaciones restantes en `plan.md` |
| tres | `ywc-code-gen` | Generar código de Backend + Frontend + QA en paralelo |
| cuatro | `ywc-impl-review` | Revisión final del código antes de abrir un PR |
| cinco | `ywc-create-pr` | Creación de PR -> CI -> Comprobación de revisión del bot |

> **Nota**: `ywc-code-gen` no tiene un indicador de revisión automática como `--review`. Si omite el paso 4 (`ywc-impl-review`), el PR se abre sin revisión de código, por lo que este flujo debe ejecutarlo explícitamente. Los ejecutores en el flujo Medio/Grande pueden automatizar este paso con el indicador `--review` - vea [05](./05-general-cycle-medium-large.md).

## Ejemplo de ejecución

```
ywc-plan 로그인 실패 시 에러 메시지가 너무 일반적이라 원인 파악이 어려움. 잠김/오타/미가입 등 구체적 사유를 보여주고 싶음
```
```
ywc-spec-ready --spec plan.md
```
```
ywc-code-gen --spec plan.md --feature "specific login failure reason"
```
```
ywc-impl-review
```
```
ywc-create-pr --title "fix: show specific login failure reason"
```

Si los comentarios de revisión del Bot, el fallo CI, o los problemas de preparación para la fusión permanecen, continúe con `ywc-handle-pr-reviews <pr-number>`. El flujo Small se basa en `plan.md`, por lo que no existe el directorio `tasks/<task-name>/` y no encaja con la gestión de finalización de tareas de `ywc-finish-branch`.

## Cuando te bloqueas en cada paso

| Situación | Acción |
|---|---|
| `ywc-plan` juzga el trabajo como Medio en lugar de Pequeño | Esto es normal - muévete a [05. general cycle (medium/large)](./05-general-cycle-medium-large.md) |
| `ywc-code-gen` devuelve `BLOCKED` | La especificación puede ser poco clara o no se pudo leer el contexto del proyecto: verifica el bloqueo reportado |
| `ywc-impl-review` devuelve `DONE_WITH_CONCERNS` | Si es un problema de corrección, corríjalo y vuelva a ejecutar; si es una observación, regístrela en la descripción PR y continúe |
| El PR falla CI | `ywc-create-pr` o `ywc-handle-pr-reviews` revisa el registro de fallos e intenta reparaciones hasta dos veces; si aún falla, el problema se presenta como `DONE_WITH_CONCERNS` o `BLOCKED` |

---

[Previous: 03. Ship your first feature in 5 minutes](./03-quickstart.md) - [Next: 05. Handling work split into multiple Tasks](./05-general-cycle-medium-large.md)
