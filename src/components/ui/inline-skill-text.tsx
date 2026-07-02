import { Fragment } from "react";

import { resolveLocalizedHref } from "@/lib/localized-href";
import { getSkillGuidebookTarget, isSkillMention } from "@/lib/skill-links";

export type InlineSkillTextProps = {
  text: string;
  locale: string;
};

const BACKTICK_SEGMENT = /`([^`]+)`/g;

// Splits on backtick-delimited segments (e.g. "`ywc-plan` turns goals into...") and
// links recognized `ywc-*` skill mentions to the Guidebook; other backticked text
// still renders as inline code, just without a link.
export function InlineSkillText({ text, locale }: InlineSkillTextProps) {
  const parts: Array<{ code: string } | { text: string }> = [];
  let lastIndex = 0;

  for (const match of text.matchAll(BACKTICK_SEGMENT)) {
    const [fullMatch, code] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, index) });
    }

    parts.push({ code });
    lastIndex = index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex) });
  }

  return (
    <>
      {parts.map((part, index) => {
        if ("text" in part) {
          return <Fragment key={index}>{part.text}</Fragment>;
        }

        const codeElement = (
          <code className="rounded-xs bg-surface-raised px-1.5 py-0.5 font-mono text-[var(--text-mono-sm)] text-accent">
            {part.code}
          </code>
        );

        if (!isSkillMention(part.code)) {
          return <Fragment key={index}>{codeElement}</Fragment>;
        }

        return (
          <a
            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            href={resolveLocalizedHref(locale, getSkillGuidebookTarget(part.code))}
            key={index}
          >
            {codeElement}
          </a>
        );
      })}
    </>
  );
}
