import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/locale-list";
import { GuidebookFrame } from "@/components/guidebook/guidebook-frame";
import { ToolTabsProvider } from "@/components/ui/tool-tabs-provider";

type GuidebookLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function GuidebookLayout({ children, params }: GuidebookLayoutProps) {
  const { locale: requestedLocale } = await params;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={{}} now={new Date(0)} timeZone="UTC">
      <GuidebookFrame locale={locale as Locale}>
        <ToolTabsProvider>{children}</ToolTabsProvider>
      </GuidebookFrame>
    </NextIntlClientProvider>
  );
}
