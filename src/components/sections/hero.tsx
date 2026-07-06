import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Terminal } from "@/components/ui/terminal";

type NavLink = {
  label: string;
  target: string;
};

// Radio + <label> + CSS :has() drives the tab switch instead of client-side React: the
// landing page's postbuild step (scripts/strip-landing-next-runtime.mjs) strips the Next.js
// runtime from the exported locale home pages, so any "use client" interactivity here would
// render once and then be permanently inert in the actual static-export build.
const tabLabelBaseClasses =
  "cursor-pointer border-b-2 border-transparent px-4 py-2.5 font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-text-muted outline-none transition-colors duration-[var(--dur-fast)] ease-out motion-reduce:transition-none has-[:checked]:text-text-bright has-[:focus-visible]:shadow-[var(--focus-ring)]";

export async function Hero() {
  const t = await getTranslations("hero");
  const nav = await getTranslations("nav");
  const github = nav.raw("github") as NavLink;

  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div className="mx-auto grid max-w-[var(--container-wide)] gap-10 px-[var(--gutter)] py-[clamp(4rem,2.5rem+7vw,8rem)] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:items-center">
        <div className="max-w-[780px]">
          <SectionEyebrow>42 skills</SectionEyebrow>
          <h1 className="mt-5 font-display text-display font-bold leading-[var(--lh-tight)] tracking-[var(--ls-normal)] text-text-bright">
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-[680px] text-lead leading-[var(--lh-relaxed)] text-text-secondary">
            {t("subheading")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#install" size="lg" variant="primary">
              {t("ctaLabels.install")}
            </Button>
            <Button
              href={github.target}
              rel="noreferrer"
              size="lg"
              target="_blank"
              variant="outline"
            >
              {t("ctaLabels.github")}
            </Button>
          </div>
          <a
            className="mt-5 inline-flex font-mono text-[var(--text-mono-sm)] font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            href="#how-it-works"
          >
            {t("ctaLabels.preview")} ↓
          </a>
        </div>

        <div className="group/demo overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-[var(--edge-top)]">
          <div className="flex border-b border-border-subtle">
            <label
              className={`${tabLabelBaseClasses} has-[:checked]:border-b-lane-claude has-[:checked]:text-lane-claude`}
              htmlFor="hero-tool-claude-code"
            >
              <input
                className="sr-only"
                defaultChecked
                id="hero-tool-claude-code"
                name="hero-tool"
                type="radio"
              />
              Claude Code
            </label>
            <label
              className={`${tabLabelBaseClasses} has-[:checked]:border-b-lane-codex has-[:checked]:text-lane-codex`}
              htmlFor="hero-tool-codex"
            >
              <input className="sr-only" id="hero-tool-codex" name="hero-tool" type="radio" />
              Codex
            </label>
          </div>

          <div className="hidden gap-4 p-4 group-has-[#hero-tool-claude-code:checked]/demo:grid">
            <CodeBlock
              code={`${t("demoCommand")}\n${t("demoInstallCommand")}`}
              label="claude code"
            />
            <Terminal title="ywc-agent-toolkit - zsh" glow>
              <Terminal.Line type="prompt">{t("demoCommand")}</Terminal.Line>
              <Terminal.Line type="info">{t("demoResolving")}</Terminal.Line>
              <Terminal.Line type="prompt">{t("demoInstallCommand")}</Terminal.Line>
              <Terminal.Line type="success">{t("demoInstalled")}</Terminal.Line>
              <Terminal.Line caret type="prompt">
                {t("demoRestart")}
              </Terminal.Line>
            </Terminal>
          </div>
          <div className="hidden gap-4 p-4 group-has-[#hero-tool-codex:checked]/demo:grid">
            <CodeBlock
              code={`${t("demoCommandCodex")}\n${t("demoInstallCommandCodex")}`}
              label="codex"
            />
            <Terminal lane="codex" title="ywc-agent-toolkit - zsh" glow>
              <Terminal.Line type="prompt">{t("demoCommandCodex")}</Terminal.Line>
              <Terminal.Line type="info">{t("demoResolvingCodex")}</Terminal.Line>
              <Terminal.Line type="prompt">{t("demoInstallCommandCodex")}</Terminal.Line>
              <Terminal.Line type="success">{t("demoInstalled")}</Terminal.Line>
              <Terminal.Line caret type="prompt">
                {t("demoRestartCodex")}
              </Terminal.Line>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
}
