[Back to table of contents](./README.md)

# 14. Requisitos previos e instalación

Para usar las Skills `ywc-*` de forma fiable, necesitas tener listas algunas herramientas de antemano. Instalar mediante el Plugin marketplace o el Codex plugin gestiona automáticamente la copia y el registro de archivos, pero cuando una Skill realmente **se ejecuta**, necesita las herramientas de abajo disponibles en tu sistema. El orden es el siguiente — **① instalar las herramientas requeridas → ② instalar ywc-agent-toolkit en sí (Claude Code / Codex)** — todo lo que sigue son herramientas opcionales que preparas según lo necesites.

## Herramientas requeridas

| Herramienta | Por qué se necesita | Ejemplo de instalación en macOS |
|---|---|---|
| `git` | clone, branch, worktree, commit, flujo de PR | Normalmente preinstalado |
| `bash` (3.2+) | Ejecuta `install.sh` y los hook scripts | `brew install bash` |
| `jq` | Procesa el plugin manifest, la API de GitHub y el JSON del hook registry | `brew install jq` |
| `python3` (3.9+) | Ejecuta executor helpers, agrupación de Dependabot, eval scripts | `brew install python3` |
| `gh` | Crea PRs, revisa el estado de PRs, gestiona comentarios de revisión, hace merge | `brew install gh` |
| `curl` | Translation script, llamadas a API | Normalmente preinstalado |
| `uv` | Ejecuta los hooks de Python de Claude Code | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| `ripgrep` (`rg`) | Escaneo del repositorio, onboarding, búsqueda de validación | `brew install ripgrep` |

De estas, solo `uv` es **exclusiva de Claude Code**; el resto se necesita en común tanto para Claude Code como para Codex.

Instalar `gh` no es suficiente por sí solo — debe estar autenticado antes de que funcionen correctamente las Skills que manejan PRs (`ywc-create-pr`, `ywc-handle-pr-reviews`, `ywc-merge-dependabot`, etc.).

```bash
gh auth login
gh auth setup-git
gh auth status
```

### Variables de entorno (solo cuando las necesites)

Todo funciona con los valores por defecto; las siguientes son sobrescrituras opcionales para cuando quieras cambiar una ubicación o un comportamiento.

| Variable | Propósito |
|---|---|
| `CODEX_HOME` | Sobrescribe dónde se instalan las Skills y Agents de Codex |
| `CLAUDE_SKILLS_DIR` | Sobrescribe dónde se instalan las Skills de Claude Code |
| `CLAUDE_AGENTS_DIR` | Sobrescribe dónde se instalan los Agents de Claude Code |
| `ANTHROPIC_API_KEY` | Ejecuta el script de traducción Tier 2 |
| `CCH_SLA_WEBHOOK` | Hook de notificación de Slack para las esperas de permisos de Claude Code |

## Instalación de ywc-agent-toolkit

Elige la pestaña de la herramienta que uses. Ninguna de las dos rutas tiene prerrequisitos.

### Método 1 — Marketplace de plugins (recomendado)

<ToolTabs>
<ToolTabsPanel tool="claude-code" label="Claude Code">
<CodeBlock label="claude code" code="/plugin marketplace add yongwoon/ywc-agent-toolkit" />
<CodeBlock label="claude code" code="/plugin install ywc-agent-toolkit@ywc-agent-toolkit" />
</ToolTabsPanel>
<ToolTabsPanel tool="codex" label="Codex">
<CodeBlock label="codex" code="codex plugin marketplace add yongwoon/ywc-agent-toolkit" />
<CodeBlock label="codex" code="codex plugin add ywc-agent-toolkit@ywc-agent-toolkit" />
</ToolTabsPanel>
</ToolTabs>

El primer comando registra la marketplace source, y el segundo instala realmente `ywc-agent-toolkit`. Si ya añadiste la marketplace en Codex, ejecuta `codex plugin marketplace upgrade ywc-agent-toolkit` para obtener el snapshot más reciente.

### Método 2 — Script bash fallback

En entornos donde instalar el plugin es difícil, clona el repositorio y usa el script de fallback. Puedes consultar la lista de skills/agents instalables a continuación.

```bash
bash scripts/install.sh --list
```

<ToolTabs>
<ToolTabsPanel tool="claude-code" label="Claude Code">
<CodeBlock label="claude code" code="bash scripts/install.sh --cc" prompt="$" />
<CodeBlock label="claude code" code="bash scripts/install.sh --cc-agents" prompt="$" />
</ToolTabsPanel>
<ToolTabsPanel tool="codex" label="Codex">
<CodeBlock label="codex" code="bash scripts/install.sh --codex" />
<CodeBlock label="codex" code="bash scripts/install.sh --codex-agents" />
</ToolTabsPanel>
</ToolTabs>

Si usas tanto Claude Code como Codex, puedes instalar ambos a la vez.

```bash
bash scripts/install.sh --all
```

## Herramientas opcionales — Validación a nivel de CI local (recomendado para colaboradores/mantenedores)

Si quieres validar localmente al mismo nivel que GitHub Actions antes de abrir un PR, instala lo siguiente. No son necesarias para usar las Skills en sí.

```bash
brew install shellcheck
npm install -g markdownlint-cli2
```

`node`, `npm` y `npx` son necesarios para ejecutar `markdownlint-cli2`, Playwright y herramientas de limpieza JS/TS — instalarlos mediante un gestor de versiones (nvm, volta, etc.) es más fácil de mantener.

```bash
node --version
npm --version
npx --version
shellcheck --version
markdownlint-cli2 --version
```

## Herramientas opcionales — Preparar Skills relacionadas con diseño

Si planeas usar Skills relacionadas con diseño con frecuencia, instala primero [`impeccable`](https://github.com/pbakaus/impeccable). Skills como `ywc-design-renew` y `ywc-ui-ux-review` funcionan mejor cuando el proyecto ya tiene contexto de diseño y reglas de detección de anti-patterns disponibles.

```bash
npx impeccable install
```

Después de instalar, vuelve a abrir Claude Code o Codex. En un proyecto nuevo, ejecuta primero `/impeccable init` para que las Skills de diseño posteriores puedan usar ese contexto.

## Herramientas opcionales — Herramientas de lenguaje/dominio según la situación

No necesitas instalar globalmente las herramientas de abajo en cada proyecto. Prepáralas solo cuando uses con frecuencia el lenguaje o la Skill correspondiente.

| Situación | Herramientas | Skill que más se usa |
|---|---|---|
| Limpieza de código muerto JS/TS | `knip`, `depcheck`, `ts-prune` | `ywc-refactor-clean` |
| Limpieza/revisión de Python | `ruff`, `mypy`, `pyright`, `pytest`, `vulture` | `ywc-impl-review`, `ywc-refactor-clean` |
| Limpieza/revisión de Go | `staticcheck`, `golangci-lint`, `govulncheck`, `deadcode` | `ywc-impl-review`, `ywc-refactor-clean` |
| Limpieza de dependencias de Rust | `cargo-udeps`, nightly toolchain | `ywc-refactor-clean` |
| Estrategia de pruebas E2E | `@playwright/test`, dependencia del navegador Chromium | `ywc-e2e-test-strategy` |
| Escaneo de seguridad | `semgrep`, `gitleaks`, `hadolint`, `trivy` | `ywc-security-audit`, `ywc-impl-review` |
| Investigación de rendimiento | `py-spy`, Chrome DevTools/Lighthouse, `node --prof`, `pprof`, `perf` | `ywc-performance-engineer`, `ywc-impl-review` |

```bash
npx knip
npx depcheck
npx ts-prune
ruff check .
mypy .
pyright
go install golang.org/x/tools/cmd/deadcode@latest
npx playwright install --with-deps chromium
```

## Comandos de verificación

Antes de ejecutar una Skill por primera vez, puedes comprobar de una vez que todas las herramientas requeridas se reconocen correctamente.

```bash
git --version
bash --version
jq --version
python3 --version
gh auth status
curl --version
uv --version
rg --version
```

Si planeas trabajar con Skills basadas en PR, vale la pena revisar el estado de `gh` una vez más por separado.

```bash
gh auth status
gh repo view --json nameWithOwner --jq .nameWithOwner
gh pr checks --watch
```

---

[Previous: 13. Full Skill Reference](./13-skill-reference.md) - [Back to table of contents](./README.md)
