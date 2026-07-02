import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Faq } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Hero } from "@/components/sections/hero";
import { InstallSteps } from "@/components/sections/install-steps";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { SocialProof } from "@/components/sections/social-proof";
import { routing, type Locale } from "@/i18n/routing";

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
      <SiteHeader locale={locale as Locale} />
      <main>
        <Hero />
        <ProblemSolution />
        <FeatureGrid />
        <InstallSteps />
        <SocialProof />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
