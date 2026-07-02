"use client";

import { useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/locale-list";
import { SidebarNav } from "./sidebar-nav";
import { TopBar } from "./top-bar";

type GuidebookFrameProps = {
  locale: Locale;
  children: ReactNode;
};

export function GuidebookFrame({ locale, children }: GuidebookFrameProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-text">
      <TopBar
        locale={locale}
        onSidebarToggle={() => setSidebarOpen((open) => !open)}
        sidebarOpen={sidebarOpen}
      />
      <div className="mx-auto grid w-full max-w-[1560px] grid-cols-1 gap-0 px-4 md:px-6 min-[861px]:grid-cols-[264px_minmax(0,1fr)] min-[1181px]:grid-cols-[264px_minmax(0,1fr)_232px]">
        <SidebarNav
          locale={locale}
          mobileOpen={sidebarOpen}
          onMobileClose={() => setSidebarOpen(false)}
        />
        {children}
      </div>
    </div>
  );
}
