export const localeList = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    href: "/en/"
  },
  {
    code: "ko",
    label: "Korean",
    nativeLabel: "한국어",
    href: "/ko/"
  },
  {
    code: "ja",
    label: "Japanese",
    nativeLabel: "日本語",
    href: "/ja/"
  },
  {
    code: "zh",
    label: "Chinese",
    nativeLabel: "中文",
    href: "/zh/"
  },
  {
    code: "es",
    label: "Spanish",
    nativeLabel: "Español",
    href: "/es/"
  }
] as const;

export const locales = localeList.map((locale) => locale.code);

export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
