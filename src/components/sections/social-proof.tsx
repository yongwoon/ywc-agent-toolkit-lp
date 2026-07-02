import { getTranslations } from "next-intl/server";

type SocialProofItem = {
  quote: string;
  sourceName: string;
  sourceUrl: string;
};

export async function SocialProof() {
  const t = await getTranslations("socialProof");
  const items = t.raw("items") as SocialProofItem[];

  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)] py-[var(--section-y)]">
        <div className="max-w-[760px]">
          <p className="font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-accent">
            Proof
          </p>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
        </div>

        {items.length === 0 ? (
          <p className="mt-8 rounded-md border border-border-subtle bg-surface p-5 leading-[var(--lh-relaxed)] text-text-secondary shadow-[var(--edge-top)]">
            {t("emptyState")}
          </p>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <figure
                className="rounded-md border border-border-subtle bg-surface p-5 shadow-[var(--edge-top)]"
                key={`${item.sourceName}-${item.sourceUrl}`}
              >
                <blockquote className="text-lead leading-[var(--lh-relaxed)] text-text-bright">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-text-muted">
                  <a
                    className="text-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                    href={item.sourceUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {item.sourceName}
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
