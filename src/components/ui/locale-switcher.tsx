"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { localeList, type Locale } from "@/i18n/locale-list";
import { usePathname, useRouter } from "@/i18n/navigation";

type LocaleOption = {
  code: Locale;
  nativeLabel: string;
  label?: string;
};

export type LocaleSwitcherProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  value?: Locale;
  onChange?: (code: Locale) => void;
  locales?: readonly LocaleOption[];
  align?: "start" | "end";
};

const defaultLocales: readonly LocaleOption[] = localeList;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LocaleSwitcher({
  value,
  onChange,
  locales = defaultLocales,
  align = "end",
  className,
  ...props
}: LocaleSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const selectedLocale = value ?? currentLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLocale =
    locales.find((locale) => locale.code === selectedLocale) ?? locales[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function switchLocale(nextLocale: Locale) {
    onChange?.(nextLocale);
    setOpen(false);

    if (nextLocale === selectedLocale) {
      return;
    }

    const hash = window.location.hash;
    const nextPathname = `${pathname || "/"}${hash}`;
    router.push(nextPathname, { locale: nextLocale });
  }

  return (
    <div
      {...props}
      className={cx("relative inline-block text-left", className)}
      ref={containerRef}
    >
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex h-[var(--control-h-sm)] min-w-[8.25rem] items-center justify-between gap-3 rounded-sm border border-border-subtle bg-surface-raised px-3 font-mono text-[var(--text-mono-sm)] font-semibold text-text-bright outline-none transition-[background-color,border-color,color] duration-[var(--dur-fast)] hover:border-accent hover:bg-[var(--accent-tint)] focus-visible:shadow-[var(--focus-ring)]"
        onClick={() => setOpen((nextOpen) => !nextOpen)}
        type="button"
      >
        <span className="truncate">{activeLocale.nativeLabel}</span>
        <span
          aria-hidden="true"
          className={cx(
            "text-accent transition-transform duration-[var(--dur-fast)] motion-reduce:transition-none",
            open && "rotate-180"
          )}
        >
          ▾
        </span>
      </button>
      {open ? (
        <div
          className={cx(
            "absolute z-[var(--z-overlay)] mt-2 min-w-full overflow-hidden rounded-md border border-border-subtle bg-surface-raised p-1 shadow-lg",
            align === "end" ? "right-0" : "left-0"
          )}
          role="listbox"
        >
          {locales.map((locale) => {
            const selected = locale.code === selectedLocale;

            return (
              <button
                aria-selected={selected}
                className={cx(
                  "flex w-full items-center justify-between gap-4 rounded-xs px-3 py-2 text-left font-mono text-[var(--text-mono-sm)] text-text-secondary outline-none transition-[background-color,color] duration-[var(--dur-fast)] hover:bg-[var(--accent-tint)] hover:text-accent focus-visible:shadow-[var(--focus-ring)]",
                  selected && "bg-[var(--accent-tint)] text-accent"
                )}
                key={locale.code}
                onClick={() => switchLocale(locale.code)}
                role="option"
                type="button"
              >
                <span>{locale.nativeLabel}</span>
                <span className="text-label uppercase tracking-[var(--ls-label)] text-text-faint">
                  {locale.code}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
