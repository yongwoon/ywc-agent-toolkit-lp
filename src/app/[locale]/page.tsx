import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { FeatureGrid } from "@/components/sections/feature-grid";
import { Hero } from "@/components/sections/hero";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { SiteHeader } from "@/components/sections/site-header";
import { routing } from "@/i18n/routing";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div id="top" className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSolution />
        <FeatureGrid />
        {/* 000003-030 appends install, social proof, FAQ, and footer here. */}
      </main>
    </div>
  );
}
