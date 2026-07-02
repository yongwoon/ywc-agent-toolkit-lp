import { getTranslations } from "next-intl/server";

import { CodeBlock } from "@/components/ui/code-block";

type InstallStep = {
  stepNumber: number;
  instruction: string;
  commandText: string;
};

type InstallPath = {
  label: string;
  steps: InstallStep[];
};

export async function InstallSteps() {
  const t = await getTranslations("installSteps");
  const paths = t.raw("paths") as InstallPath[];

  return (
    <section className="border-b border-border-subtle bg-bg-subtle" id="install">
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="max-w-[760px]">
          <p className="font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-accent">
            Install
          </p>
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
      </div>
    </section>
  );
}
