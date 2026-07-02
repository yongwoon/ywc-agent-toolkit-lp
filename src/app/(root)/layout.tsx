import type { ReactNode } from "react";
import { defaultLocale, localeList } from "@/i18n/locale-list";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={defaultLocale}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
