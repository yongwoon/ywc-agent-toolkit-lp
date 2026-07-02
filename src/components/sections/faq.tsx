import { getTranslations } from "next-intl/server";

import { FaqItem } from "@/components/ui/faq-item";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

type FaqEntry = {
  question: string;
  answer: string;
};

export async function Faq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqEntry[];

  return (
    <section className="border-b border-border-subtle bg-bg-subtle" id="faq">
      <div className="mx-auto max-w-[var(--container-narrow)] px-[var(--gutter)] py-[var(--section-y)]">
        <div>
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
        </div>

        <div className="mt-8 rounded-md border border-border-subtle bg-surface shadow-[var(--edge-top)]">
          {items.map((item, index) => (
            <FaqItem
              key={item.question}
              name="landing-faq"
              open={index === 0}
              question={item.question}
            >
              {item.answer}
            </FaqItem>
          ))}
        </div>
      </div>
    </section>
  );
}
