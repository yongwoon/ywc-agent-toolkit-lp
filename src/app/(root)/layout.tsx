import type { ReactNode } from "react";
import { defaultLocale, localeList } from "@/i18n/locale-list";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
        {localeList.map((locale) => (
          <link
            key={locale.code}
            rel="alternate"
            hrefLang={locale.code}
            href={locale.href}
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
