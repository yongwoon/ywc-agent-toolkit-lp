import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales, type Locale } from "./locale-list";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always"
});

export type { Locale };
