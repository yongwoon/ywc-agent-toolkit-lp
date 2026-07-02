import { localeList } from "@/i18n/locale-list";

export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <nav aria-label="Return to a locale home page">
        <ul>
          {localeList.map((locale) => (
            <li key={locale.code}>
              <a href={locale.href} hrefLang={locale.code} lang={locale.code}>
                {locale.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
