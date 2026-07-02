import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/locale-list";
import { GuidebookFrame } from "@/components/guidebook/guidebook-frame";
import { ToolTabsProvider } from "@/components/ui/tool-tabs-provider";
import { loadLocalizedGuidebookNav } from "@/lib/guidebook-nav-content";

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

  const navGroups = await loadLocalizedGuidebookNav(locale as Locale);

  return (
    <GuidebookFrame locale={locale as Locale} navGroups={navGroups}>
      <ToolTabsProvider>{children}</ToolTabsProvider>
    </GuidebookFrame>
  );
}
