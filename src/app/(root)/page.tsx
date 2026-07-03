"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/base-path";
import { defaultLocale, localeList, type Locale } from "@/i18n/locale-list";

function getPreferredLocale(language: string): Locale {
  const normalizedLanguage = language.toLowerCase();
  const exactMatch = localeList.find(
    (locale) => locale.code === normalizedLanguage
  );

  if (exactMatch) {
    return exactMatch.code;
  }

  const languagePrefix = normalizedLanguage.split("-")[0];
  const prefixMatch = localeList.find(
    (locale) => locale.code === languagePrefix
  );

  return prefixMatch?.code ?? defaultLocale;
}

export default function RootRedirectPage() {
  useEffect(() => {
    const preferredLocale = getPreferredLocale(navigator.language);
    const targetPath = withBasePath(`/${preferredLocale}/`);

    if (window.location.pathname !== targetPath) {
      window.location.replace(targetPath);
    }
  }, []);

  return (
    <main>
      <h1>ywc-agent-toolkit</h1>
      <p>Redirecting to the English site.</p>
      <nav aria-label="Choose a language">
        <ul>
          {localeList.map((locale) => (
            <li key={locale.code}>
              <a href={withBasePath(locale.href)} hrefLang={locale.code} lang={locale.code}>
                {locale.nativeLabel}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
