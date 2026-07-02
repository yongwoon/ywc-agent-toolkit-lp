[Back to table of contents](./README.md)

# 13. Referencia completa Skill

Esta página agrupa las Habilidades restantes que no se cubrieron en las guías de flujo de trabajo anteriores según **lo que deseas hacer**. Úsala cuando sea necesario en medio de cada flujo: ciclo Pequeño/Mediano/Grande, nuevo proyecto, incorporación, pruebas o diseño.

## Cuando quieras manejar PR / Revisar

**Responder a los comentarios de la revisión en un PR abierto y limpiar también CI/conflictos**
```
ywc-handle-pr-reviews 250
```
Si omite el número PR, encuentra automáticamente el PR para la sucursal actual.

**Confirmar cambios y abrir un borrador PR**
```
ywc-create-pr --title "fix: correct timezone offset in report export" --lang ko
```
Esto ya está incluido en los flujos de [04](./04-general-cycle-small.md) y [05](./05-general-cycle-medium-large.md), así que úsalo cuando quieras abrir solo un PR independiente fuera de esos flujos.

**Limpiar de una vez los PRs acumulados de Dependabot**
```
ywc-merge-dependabot security parallel-auto
```
Si omite `security`, se dirige a todas las PR de Dependabot. Si omite `parallel-auto`, procesa las PR secuencialmente por número PR.

**Simplemente confirma el trabajo realizado hasta ahora**
```
ywc-commit authentication 관련 변경만 커밋해줘
```
Esto no es para la creación de PR ni para los cambios de código en sí mismos. Es solo para commits.

## Cuando aún no tienes un plan, o quieres que se ejecute hasta completarse sin intervención humana

**Tu idea aún no es concreta y quieres aclararla primero**
```
ywc-brainstorm 알림 기능을 만들고 싶은데 아직 어떻게 할지 구체적이지 않음
```
A través del diálogo socrático, se derivan el objetivo / las limitaciones / los criterios de éxito y 2-3 alternativas, luego se entrega a `ywc-plan`.

**Quieres dar un objetivo y dejar que la planificación hasta la implementación se ejecute sin intervención humana**

Esto se ha trasladado a la página dedicada `ywc-agentic`. Consulte [06. Finish automatically from one goal](./06-agentic-autonomous-loop.md) para uso y ejemplos.

## Cuando quieres comprobar la calidad y la seguridad

**Revisa las vulnerabilidades de seguridad en el código sensible, como autenticación/pagos**
```
ywc-security-audit --code tools/codex-skill/skills/ywc-security-audit/SKILL.md
```

**Estás atascado porque no puedes encontrar la causa de un error**
```
ywc-debug-rootcause 결제 webhook 이 가끔 중복 처리됨. 원인을 못 찾겠음
```
Esto evita los parches que solo abordan los síntomas y obliga a una investigación de causa raíz en cuatro pasos. Si las soluciones fallan en el mismo punto tres o más veces, te guía a cuestionar la arquitectura en sí.

**Limpiar el código antiguo muerto (funciones/exportaciones/dependencias no utilizadas)**
```
ywc-refactor-clean --scope tools/codex-skill/skills/ywc-refactor-clean/ --tier safe
```

**Escribir un informe postmortem para un incidente de producción**
```
ywc-incident-postmortem --client
```
`--client` además crea un resumen para el cliente que omite detalles internos.

## Cuando quieres acumular conocimiento del proyecto (Habilidades con Estado)

Estas habilidades no son utilidades únicas. Gestionan el conocimiento que permanece en el proyecto después de que la conversación termina y puede ser consultado en sesiones posteriores.

**Enseñe al sistema sobre la retroalimentación repetida de la revisión de código para que no genere el mismo falso positivo nuevamente**
```
ywc-review-learnings 이 지적은 false positive 야, 학습해둬
```

**Crear o actualizar un glosario de dominio compartido por desarrolladores, expertos en el dominio y LLMs**
```
ywc-ubiquitous-language --context billing --ddd
```
`--ddd` agrega columnas de tipo DDD como Entidad / Objeto de Valor / Agregado.

**Registra el porqué del proyecto y los enfoques rechazados**
```
ywc-mission 이 project 의 목표는 ...
```
Esto ya está cubierto en [07. Starting a new Project](./07-starting-a-new-project.md), y también se puede reutilizar cuando cambie la dirección del proyecto.

## Cuando quieres preparar un lanzamiento

**Resume la lista de PRs fusionados incluidos en una Release PR (develop->main, etc.)**
```
ywc-release-pr-list 301
```

**Escribe CHANGELOG.md o notas de la versión para el usuario**
```
ywc-changelog-release-notes --both --version 1.4.0
```
Si pasas `--pr-list <result file from ywc-release-pr-list>`, usa esa lista como la fuente en lugar de git log.

---

[Previous: 12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md) - [Back to table of contents](./README.md)
