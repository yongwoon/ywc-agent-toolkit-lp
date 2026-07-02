import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Terminal } from "@/components/ui/terminal";

type NavLink = {
  label: string;
  target: string;
};

export function Hero() {
  const t = useTranslations("hero");
  const nav = useTranslations("nav");
  const github = nav.raw("github") as NavLink;

  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div className="mx-auto grid max-w-[var(--container-wide)] gap-10 px-[var(--gutter)] py-[clamp(4rem,2.5rem+7vw,8rem)] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:items-center">
        <div className="max-w-[780px]">
          <p className="font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-accent">
            41 skills
          </p>
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
        </div>

        <div className="grid gap-4">
          <CodeBlock code={t("demoCommand")} label="claude code" />
          <Terminal title="ywc-agent-toolkit - zsh" glow>
            <Terminal.Line type="prompt">{t("demoCommand")}</Terminal.Line>
            <Terminal.Line type="info">
              resolving marketplace source yongwoon/ywc-agent-toolkit
            </Terminal.Line>
            <Terminal.Line type="success">
              installed 41 skills for Claude Code and Codex
            </Terminal.Line>
            <Terminal.Line caret type="prompt">
              restart your tool to load the toolkit
            </Terminal.Line>
          </Terminal>
        </div>
      </div>
    </section>
  );
}
