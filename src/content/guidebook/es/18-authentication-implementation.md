[« Volver al índice](./README.md)

# 15. Implementar autenticación

## Cuándo usar esta Skill

Usa `ywc-auth-implement` cuando un proyecto necesita una nueva funcionalidad de autenticación — inicio de sesión/registro, OAuth, MFA, manejo de sesiones, restablecimiento de contraseña, eliminación de cuenta o un flujo de consentimiento — y quieres que las decisiones de política queden explícitas antes de escribir ningún código. No cubre todo lo relacionado con auth, sin embargo:

- Si el código de autenticación ya existe y solo quieres una revisión de seguridad sobre él, usa [`ywc-security-audit`](./14-skill-reference.md) en su lugar — esta Skill dirige la construcción, no es una revisión posterior.
- Para planificación general de funcionalidades sin relación con autenticación, usa [`ywc-plan`](./14-skill-reference.md) — la entrevista de políticas de esta Skill es específica de auth y no sustituye una pasada de planificación general.
- Para escribir cobertura E2E fuera de los flujos de autenticación, usa [11. Estrategia de automatización de pruebas E2E](./10-e2e-test-strategy.md) — esta Skill solo dirige el gate de E2E de flujos de auth descrito más abajo, no la suite de pruebas más amplia del proyecto.

## Cómo funciona el flujo

**Preflight gate.** Antes de hacer cualquier pregunta, la Skill ejecuta cinco verificaciones idempotentes: reutiliza una rama `feature/<auth-slug>` si ya existe (solo crea una rama nueva partiendo de una rama de larga duración); añade únicamente los placeholders que falten en `.env.example`, sin sobrescribir ni exponer valores reales; enruta primero a `ywc-tech-research` si la evidencia de framework/base de datos es insuficiente; se detiene por completo con `NEEDS_CONTEXT` si detecta autenticación existente, hasta que elijas `new`, `extend` o `migrate`; y etiqueta cualquier borrador de ToS/Política de Privacidad como "borrador pendiente de revisión legal" desde su primera línea.

**Entrevista de políticas en 9 categorías.** Una ronda enfocada cubre: método de inicio de sesión y preparación del provider de OAuth, inscripción y recuperación de MFA, almacenamiento/TTL/rotación/revocación de sesión y gestión de dispositivos, restablecimiento de contraseña y el límite de la librería de hashing, campos de perfil, eliminación de cuenta y reautenticación, RBAC superficial (roles, valores por defecto, claims), versionado/recolección/retiro del consentimiento, y prevención de abuso (rate limiting, verificación, controles de recuperación). Cada respuesta se registra como aprobada, explícitamente diferida con su riesgo indicado, o no aplicable.

**Recomendación dinámica.** A partir de tu evidencia de stack y las respuestas de política aprobadas, la Skill recomienda una librería o servicio gestionado ya probado en producción — nunca una lista fija de "stack soportado". Cuando la evidencia es escasa, recurre a investigación en tiempo real vía `ywc-tech-research`.

**Dispatch de la implementación.** La Skill orquesta; no escribe el código de autenticación por sí misma. Despacha a tres agents, cada uno siguiendo `ywc-tdd-ritual` (RED → verificar RED → GREEN → verificar GREEN → REFACTOR → verificar GREEN): `ywc-backend-coder` para la política de backend aprobada (nunca implementa a mano el hashing de contraseñas, la firma de tokens o la criptografía de secretos), `ywc-frontend-coder` para los formularios de inicio de sesión/registro, la UI de inscripción a MFA y el enrutamiento consciente de sesión, y `ywc-doc-writer` para el borrador de ToS/Política de Privacidad.

**Gates.** Una vez que el trabajo despachado aterriza, `ywc-security-audit` se ejecuta contra el diff: cero hallazgos Critical/High avanza a una pasada de `ywc-e2e-test-strategy` condicionada por política que cubre solo los flujos aprobados (registro/inicio de sesión/restablecimiento solo si se eligió email/contraseña, eliminación de cuenta solo si está habilitada, un flujo por cada provider de OAuth configurado, MFA solo si fue aprobada); cualquier hallazgo Critical/High devuelve `DONE_WITH_CONCERNS` y omite el E2E y la creación de PR hasta que se remedie. Solo después de que ambos gates pasan, la Skill sugiere `ywc-create-pr` — nunca automáticamente.

## `ywc-auth-implement`

<ToolTabs>
  <ToolTabsPanel tool="claude-code" label="Claude Code">
    <CodeBlock label="claude code" code="ywc-auth-implement" />
  </ToolTabsPanel>
  <ToolTabsPanel tool="codex" label="Codex">
    <CodeBlock label="codex" code="ywc-auth-implement" />
  </ToolTabsPanel>
</ToolTabs>

Se ejecuta sin flags — la entrevista y cada decisión posterior se conducen de forma interactiva desde el preflight gate en adelante, así que no existe un argumento de "scope" o "flow" que proporcionar de antemano.

## En qué se diferencian Claude Code y Codex

La entrevista, la regla de recomendación sin stack fijo, el hard stop `new`/`extend`/`migrate`, y los gates de seguridad/E2E son idénticos en ambas herramientas. Lo que cambia es el mecanismo de dispatch: Claude Code reparte directamente a `ywc-backend-coder`, `ywc-frontend-coder` y `ywc-doc-writer` vía `Task(subagent_type: ...)`. Codex mantiene la orquestación dentro de la sesión actual y en su lugar imprime (nunca invoca automáticamente) una ruta de skill-chain — `$ywc-plan → $ywc-spec-ready → $ywc-task-generator → $ywc-code-gen --tdd --review` — dejando que `$ywc-code-gen` se encargue de la implementación de la aplicación y de su propia revisión de seguridad; para delegaciones que son solo documentación, Codex usa un único subagent general acotado en vez de un reparto a agents nombrados.

---

[Previous: 14. Gestionar la infraestructura en la nube](./17-infrastructure-and-cloud.md) - [Next: 16. Patrones de indicación de generación de código](./13-executor-and-codegen-patterns.md)
