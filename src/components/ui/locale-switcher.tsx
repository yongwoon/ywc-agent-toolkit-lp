import type { HTMLAttributes } from "react";
import { withBasePath } from "@/lib/base-path";
import { localeList, type Locale } from "@/i18n/locale-list";

type LocaleOption = {
  code: Locale;
  nativeLabel: string;
  label?: string;
  href?: string;
};

export type LocaleSwitcherProps = HTMLAttributes<HTMLDivElement> & {
  value?: Locale;
  locales?: readonly LocaleOption[];
  align?: "start" | "end";
  getHref?: (code: Locale) => string;
};

const defaultLocales: readonly LocaleOption[] = localeList;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LocaleSwitcher({
  value,
  locales = defaultLocales,
  align = "end",
  getHref,
  className,
  ...props
}: LocaleSwitcherProps) {
  const selectedLocale = value ?? defaultLocales[0].code;
  const activeLocale =
    locales.find((locale) => locale.code === selectedLocale) ?? locales[0];

  return (
    <div
      {...props}
      className={cx("relative inline-block text-left", className)}
    >
      <details className="group">
        <summary className="inline-flex h-[var(--control-h-sm)] min-w-[8.25rem] cursor-pointer list-none items-center justify-between gap-3 rounded-sm border border-border-subtle bg-surface-raised px-3 font-mono text-[var(--text-mono-sm)] font-semibold text-text-bright outline-none transition-[background-color,border-color,color] duration-[var(--dur-fast)] hover:border-accent hover:bg-[var(--accent-tint)] focus-visible:shadow-[var(--focus-ring)] [&::-webkit-details-marker]:hidden">
          <span className="flex min-w-0 items-center gap-2">
            <span aria-hidden="true" className="text-accent">
              ◍
            </span>
            <span className="truncate">{activeLocale.nativeLabel}</span>
          </span>
          <span
            aria-hidden="true"
            className="text-accent transition-transform duration-[var(--dur-fast)] group-open:rotate-180 motion-reduce:transition-none"
          >
            ▾
          </span>
        </summary>
        <div
          className={cx(
            "absolute z-[var(--z-overlay)] mt-2 min-w-full overflow-hidden rounded-md border border-border-subtle bg-surface-raised p-1 shadow-lg",
            align === "end" ? "right-0" : "left-0"
          )}
        >
          {locales.map((locale) => {
            const selected = locale.code === selectedLocale;
            const href =
              getHref?.(locale.code) ??
              withBasePath(locale.href ?? `/${locale.code}/`);

            return (
              <a
                aria-current={selected ? "page" : undefined}
                className={cx(
                  "flex w-full items-center justify-between gap-4 rounded-xs px-3 py-2 text-left font-mono text-[var(--text-mono-sm)] text-text-secondary outline-none transition-[background-color,color] duration-[var(--dur-fast)] hover:bg-[var(--accent-tint)] hover:text-accent focus-visible:shadow-[var(--focus-ring)]",
                  selected && "bg-[var(--accent-tint)] text-accent"
                )}
                data-locale-link
                href={href}
                hrefLang={locale.code}
                key={locale.code}
                lang={locale.code}
              >
                <span>{locale.nativeLabel}</span>
                <span className="text-label uppercase tracking-[var(--ls-label)] text-text-faint">
                  {locale.code}
                </span>
              </a>
            );
          })}
        </div>
      </details>
    </div>
  );
}
