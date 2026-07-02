import { getLocale, getTranslations } from "next-intl/server";

import { InlineSkillText } from "@/components/ui/inline-skill-text";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { resolveLocalizedHref } from "@/lib/localized-href";

type PipelineStep = {
  skill: string;
  label: string;
  description: string;
};

type PipelineCta = {
  label: string;
  target: string;
};

type PipelineAgentic = {
  title: string;
  description: string;
  cta: PipelineCta;
};

export async function Pipeline() {
  const t = await getTranslations("pipeline");
  const locale = await getLocale();
  const steps = t.raw("steps") as PipelineStep[];
  const agentic = t.raw("agentic") as PipelineAgentic;
  const cta = t.raw("cta") as PipelineCta;

  return (
    <section className="border-b border-border-subtle bg-bg-subtle" id="how-it-works">
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="max-w-[760px]">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead leading-[var(--lh-relaxed)] text-text-secondary">
            {t("description")}
          </p>
        </div>

        <ol className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
          {steps.map((step, index) => (
            <li className="flex flex-1 items-stretch gap-3 lg:gap-0" key={step.skill}>
              <article className="flex flex-1 flex-col gap-2 rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)]">
                <span className="font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
                  {step.label}
                </h3>
                <p className="text-[var(--text-body-sm)] leading-[var(--lh-relaxed)] text-text-secondary">
                  <InlineSkillText locale={locale} text={step.description} />
                </p>
              </article>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="hidden shrink-0 place-items-center px-2 font-mono text-h3 text-text-faint lg:grid"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-4 rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h3 className="font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
              <InlineSkillText locale={locale} text={agentic.title} />
            </h3>
            <p className="mt-2 max-w-[640px] text-[var(--text-body-sm)] leading-[var(--lh-relaxed)] text-text-secondary">
              <InlineSkillText locale={locale} text={agentic.description} />
            </p>
          </div>
          <a
            className="whitespace-nowrap font-mono text-[var(--text-mono-sm)] font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            href={resolveLocalizedHref(locale, agentic.cta.target)}
          >
            {agentic.cta.label} →
          </a>
        </div>

        <div className="mt-6">
          <a
            className="font-mono text-[var(--text-mono-sm)] font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            href={resolveLocalizedHref(locale, cta.target)}
          >
            {cta.label} →
          </a>
        </div>
      </div>
    </section>
  );
}
