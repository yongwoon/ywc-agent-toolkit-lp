import { getTranslations } from "next-intl/server";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import githubStats from "@/data/github-stats.json";

type TrustItem = {
  label: string;
  value: string;
  description: string;
};

type TrustCta = {
  label: string;
  target: string;
};

export async function SocialProof() {
  const t = await getTranslations("socialProof");
  const items = t.raw("items") as TrustItem[];
  const contributeCta = t.raw("contributeCta") as TrustCta;
  const starCount = githubStats.stars.toLocaleString("en-US");

  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="max-w-[760px]">
          <SectionEyebrow>Proof</SectionEyebrow>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
          <p className="mt-4 text-lead leading-[var(--lh-relaxed)] text-text-secondary">
            {t("description")}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)]">
            <div className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none text-text-bright">
              {starCount}
            </div>
            <h3 className="mt-3 font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
              {t("starsLabel")}
            </h3>
            <p className="mt-2 text-[var(--text-body-sm)] leading-[var(--lh-relaxed)] text-text-secondary">
              {t("starsDescription")}
            </p>
          </article>

          {items.map((item) => (
            <article
              className="rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)]"
              key={item.label}
            >
              <div className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none text-text-bright">
                {item.value}
              </div>
              <h3 className="mt-3 font-display text-h3 font-bold leading-[var(--lh-snug)] text-text-bright">
                {item.label}
              </h3>
              <p className="mt-2 text-[var(--text-body-sm)] leading-[var(--lh-relaxed)] text-text-secondary">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6">
          <a
            className="font-mono text-[var(--text-mono-sm)] font-semibold text-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            href={contributeCta.target}
            rel="noreferrer"
            target="_blank"
          >
            {contributeCta.label} →
          </a>
        </div>
      </div>
    </section>
  );
}
