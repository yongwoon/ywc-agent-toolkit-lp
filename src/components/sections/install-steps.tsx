import { getLocale, getTranslations } from "next-intl/server";

import { CodeBlock } from "@/components/ui/code-block";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { resolveLocalizedHref } from "@/lib/localized-href";

type InstallStep = {
  stepNumber: number;
  instruction: string;
  commandText: string;
};

type InstallPath = {
  label: string;
  steps: InstallStep[];
};

type NextStep = {
  title: string;
  description: string;
  commandText: string;
  cta: {
    label: string;
    target: string;
  };
};

export async function InstallSteps() {
  const t = await getTranslations("installSteps");
  const locale = await getLocale();
  const paths = t.raw("paths") as InstallPath[];
  const nextStep = t.raw("nextStep") as NextStep;

  return (
    <section className="border-b border-border-subtle bg-bg-subtle" id="install">
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="max-w-[760px]">
          <SectionEyebrow>Install</SectionEyebrow>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead leading-[var(--lh-relaxed)] text-text-secondary">
            {t("description")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {paths.map((path) => (
            <article
              className="rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)]"
              key={path.label}
            >
              <h3 className="font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
                {path.label}
              </h3>
              <ol className="mt-6 grid gap-5">
                {path.steps.map((step) => (
                  <li className="grid gap-3" key={step.stepNumber}>
                    <div className="flex gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-xs border border-border-subtle bg-surface-raised font-mono text-label font-semibold text-accent">
                        {step.stepNumber}
                      </span>
                      <p className="pt-1 leading-[var(--lh-relaxed)] text-text-secondary">
                        {step.instruction}
                      </p>
                    </div>
                    <CodeBlock
                      code={step.commandText}
                      label={path.label}
                      prompt={path.label === "Claude Code" ? "/" : "$"}
                    />
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)]">
          <h3 className="font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
            {nextStep.title}
          </h3>
          <p className="mt-2 max-w-[640px] text-[var(--text-body-sm)] leading-[var(--lh-relaxed)] text-text-secondary">
            {nextStep.description}
          </p>
          <div className="mt-4 max-w-[520px]">
            <CodeBlock code={nextStep.commandText} label="next step" prompt="/" />
          </div>
          <a
            className="mt-4 inline-flex font-mono text-[var(--text-mono-sm)] font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            href={resolveLocalizedHref(locale, nextStep.cta.target)}
          >
            {nextStep.cta.label} →
          </a>
        </div>
      </div>
    </section>
  );
}
