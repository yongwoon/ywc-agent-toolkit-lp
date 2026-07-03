import type { Metadata } from "next";
import { withBasePath } from "@/lib/base-path";
import { defaultLocale, localeList, type Locale } from "@/i18n/locale-list";
import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";
import jaMessages from "@/messages/ja.json";
import koMessages from "@/messages/ko.json";
import zhMessages from "@/messages/zh.json";

type SeoMessages = typeof enMessages.seo;
type AlternatePathBuilder = (locale: Locale) => string;

const siteUrl = normalizeSiteUrl(
  process.env.SITE_URL ?? "https://yongwoon.github.io/ywc-agent-toolkit-lp"
);

const openGraphLocaleByLocale = {
  en: "en_US",
  ko: "ko_KR",
  ja: "ja_JP",
  zh: "zh_CN",
  es: "es_ES"
} satisfies Record<Locale, string>;

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

function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, "");
}

export function absoluteUrl(href: string) {
  if (/^https?:\/\//.test(href)) {
    return href;
  }

  return `${siteUrl}${href.startsWith("/") ? href : `/${href}`}`;
}

function buildLanguageAlternates(getPath: AlternatePathBuilder) {
  return {
    ...Object.fromEntries(
      localeList.map((locale) => [locale.code, absoluteUrl(getPath(locale.code))])
    ),
    "x-default": absoluteUrl(getPath(defaultLocale))
  } as Record<Locale | "x-default", string>;
}

function buildOpenGraphLocales(locale: Locale) {
  return localeList
    .map((alternate) => alternate.code)
    .filter((alternate) => alternate !== locale)
    .map((alternate) => openGraphLocaleByLocale[alternate]);
}

export function buildMetadata(locale: Locale): Metadata {
  const seo = getSeoMessages(locale);
  const canonicalUrl = absoluteUrl(seo.canonicalPath);
  const ogImageUrl = absoluteUrl(seo.ogImage);
  const languages = buildLanguageAlternates(
    (alternateLocale) => getSeoMessages(alternateLocale).canonicalPath
  );

  return {
    applicationName: "ywc-agent-toolkit",
    title: seo.title,
    description: seo.description,
    metadataBase: new URL(siteUrl),
    keywords: [
      "ywc-agent-toolkit",
      "Claude Code",
      "Codex",
      "AI agents",
      "developer tools"
    ],
    authors: [{ name: "ywc-agent-toolkit" }],
    creator: "ywc-agent-toolkit",
    publisher: "ywc-agent-toolkit",
    referrer: "origin-when-cross-origin",
    icons: {
      icon: [
        { url: withBasePath("/favicon.svg"), type: "image/svg+xml" },
        { url: withBasePath("/favicon-32.png"), sizes: "32x32", type: "image/png" },
        { url: withBasePath("/favicon-16.png"), sizes: "16x16", type: "image/png" }
      ],
      apple: [{ url: withBasePath("/apple-touch-icon.png") }]
    },
    alternates: {
      canonical: canonicalUrl,
      languages
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: canonicalUrl,
      siteName: "ywc-agent-toolkit",
      locale: openGraphLocaleByLocale[locale],
      alternateLocale: buildOpenGraphLocales(locale),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seo.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImageUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
  };
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
  getAlternatePath,
  ogImage = getSeoMessages(locale).ogImage
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  getAlternatePath?: AlternatePathBuilder;
  ogImage?: string;
}): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const ogImageUrl = absoluteUrl(ogImage);
  const pageTitle = `${title} | ywc-agent-toolkit`;
  const languages = buildLanguageAlternates(getAlternatePath ?? (() => path));

  return {
    ...buildMetadata(locale),
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages
    },
    openGraph: {
      title: pageTitle,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "ywc-agent-toolkit",
      locale: openGraphLocaleByLocale[locale],
      alternateLocale: buildOpenGraphLocales(locale),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImageUrl]
    }
  };
}

export function buildJsonLd(locale: Locale) {
  const seo = getSeoMessages(locale);
  const canonicalUrl = absoluteUrl(seo.canonicalPath);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "ywc-agent-toolkit",
        inLanguage: locale,
        url: canonicalUrl,
        description: seo.description
      },
      {
        "@type": "SoftwareApplication",
        name: "ywc-agent-toolkit",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows",
        inLanguage: locale,
        url: canonicalUrl,
        image: absoluteUrl(seo.ogImage),
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
