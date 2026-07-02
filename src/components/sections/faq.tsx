"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { FaqItem } from "@/components/ui/faq-item";

type FaqEntry = {
  question: string;
  answer: string;
};

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqEntry[];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="border-b border-border-subtle bg-bg-subtle" id="faq">
      <div className="mx-auto max-w-[var(--container-narrow)] px-[var(--gutter)] py-[var(--section-y)]">
        <div>
          <p className="font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-accent">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-h2 font-bold leading-[var(--lh-snug)] text-text-bright">
            {t("title")}
          </h2>
        </div>

        <div className="mt-8 rounded-md border border-border-subtle bg-surface shadow-[var(--edge-top)]">
          {items.map((item, index) => (
            <FaqItem
              key={item.question}
              onToggle={(nextOpen) => setOpenIndex(nextOpen ? index : -1)}
              open={openIndex === index}
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
