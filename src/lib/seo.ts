import type { Metadata } from "next";
import { localeList, type Locale } from "@/i18n/locale-list";
import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";
import jaMessages from "@/messages/ja.json";
import koMessages from "@/messages/ko.json";
import zhMessages from "@/messages/zh.json";

type SeoMessages = typeof enMessages.seo;

const seoMessagesByLocale = {
  en: enMessages.seo,
  es: esMessages.seo,
  ja: jaMessages.seo,
  ko: koMessages.seo,
  zh: zhMessages.seo
} satisfies Record<Locale, SeoMessages>;

function getSeoMessages(locale: Locale) {
  return seoMessagesByLocale[locale];
}

function buildLanguageAlternates() {
  return Object.fromEntries(
    localeList.map((locale) => [locale.code, locale.href])
  ) as Record<Locale, string>;
}

export function buildMetadata(locale: Locale): Metadata {
  const seo = getSeoMessages(locale);
  const languages = buildLanguageAlternates();

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonicalPath,
      languages
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale,
      alternateLocale: localeList
        .map((alternate) => alternate.code)
        .filter((alternate) => alternate !== locale),
      images: [
        {
          url: seo.ogImage,
          alt: seo.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage]
    }
  };
}

export function buildJsonLd(locale: Locale) {
  const seo = getSeoMessages(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "ywc-agent-toolkit",
        inLanguage: locale,
        url: seo.canonicalPath,
        description: seo.description
      },
      {
        "@type": "SoftwareApplication",
        name: "ywc-agent-toolkit",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows",
        inLanguage: locale,
        url: seo.canonicalPath,
        description: seo.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        }
      }
    ]
  };
}
