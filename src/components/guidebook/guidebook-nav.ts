import type { Locale } from "@/i18n/locale-list";

export type GuidebookPageStatus = "available" | "pending";

export type GuidebookGroupId =
  | "prologue"
  | "getting-started"
  | "core-pipeline"
  | "workflow-guides"
  | "reference";

export type GuidebookPageMeta = {
  slug: string;
  title: string;
  description: string;
  groupId: GuidebookGroupId;
  status: GuidebookPageStatus;
};

export type GuidebookNavGroup = {
  groupId: GuidebookGroupId;
  label: string;
  pages: readonly GuidebookPageMeta[];
};

// English fallback labels, used when a locale-specific content file (and its own H1
// title) can't be loaded. Keyed by the stable groupId rather than display text so the
// label itself can be localized without touching the page data below.
export const groupLabelsByLocale: Record<Locale, Record<GuidebookGroupId, string>> = {
  en: {
    prologue: "Prologue",
    "getting-started": "Getting started",
    "core-pipeline": "Core pipeline",
    "workflow-guides": "Situational guides",
    reference: "Reference"
  },
  ja: {
    prologue: "プロローグ",
    "getting-started": "はじめに",
    "core-pipeline": "コアパイプライン",
    "workflow-guides": "状況別ガイド",
    reference: "リファレンス"
  },
  ko: {
    prologue: "프롤로그",
    "getting-started": "시작하기",
    "core-pipeline": "핵심 파이프라인",
    "workflow-guides": "상황별 가이드",
    reference: "레퍼런스"
  },
  zh: {
    prologue: "前言",
    "getting-started": "快速开始",
    "core-pipeline": "核心流程",
    "workflow-guides": "场景指南",
    reference: "参考"
  },
  es: {
    prologue: "Prólogo",
    "getting-started": "Primeros pasos",
    "core-pipeline": "Flujo principal",
    "workflow-guides": "Guías por situación",
    reference: "Referencia"
  }
};

export function getGroupLabel(locale: Locale | string, groupId: GuidebookGroupId): string {
  const labels = groupLabelsByLocale[locale as Locale] ?? groupLabelsByLocale.en;
  return labels[groupId];
}

// Defined here (not in guidebook-nav-content.ts, which also holds
// LocalizedGuidebookPageMeta) so client components can import it without
// pulling in guidebook-nav-content.ts's node:fs/promises-dependent chain
// (loadLocalizedGuidebookNav -> loadGuidebookPageForLocale).
//
// The 80 existing markdown files' H1 text (and therefore their
// locale-content-derived title) still carries its original "NN. " prefix --
// out of scope to rewrite per the refactor's render-time-override variant.
// Strip any such prefix here before applying the computed displayNumber, so
// existing pages don't render "16. 16. Title" while never trusting the H1's
// literal digits as the actual order source (displayNumber already comes
// from array position, computed upstream).
export function formatGuidebookPageTitle(page: { displayNumber: string; title: string }): string {
  const title = page.title.replace(/^\d+\.\s*/, "");
  return `${page.displayNumber}. ${title}`;
}

export const guidebookNavGroups: readonly GuidebookNavGroup[] = [
  {
    groupId: "prologue",
    label: groupLabelsByLocale.en.prologue,
    pages: [
      {
        slug: "01-introduction",
        title: "Introduction",
        description: "What this Skill/Agent ecosystem is, who it's for, and what problem it solves",
        groupId: "prologue",
        status: "pending"
      },
      {
        slug: "02-core-concepts",
        title: "Core concepts",
        description:
          "Skill / Agent / Executor / Task terminology, invocation syntax, and the 4 completion states (DONE, etc.)",
        groupId: "prologue",
        status: "pending"
      }
    ]
  },
  {
    groupId: "getting-started",
    label: groupLabelsByLocale.en["getting-started"],
    pages: [
      {
        slug: "03-quickstart",
        title: "Ship your first feature in 5 minutes",
        description: "A hands-on walkthrough of one small feature, from idea to merge",
        groupId: "getting-started",
        status: "pending"
      }
    ]
  },
  {
    groupId: "core-pipeline",
    label: groupLabelsByLocale.en["core-pipeline"],
    pages: [
      {
        slug: "04-general-cycle-small",
        title: "Handling a small change",
        description: "The standard flow for a change that finishes in a single PR without Task decomposition",
        groupId: "core-pipeline",
        status: "pending"
      },
      {
        slug: "05-general-cycle-medium-large",
        title: "Handling work split into multiple Tasks",
        description: "The flow for changes large enough to need spec validation and Task decomposition",
        groupId: "core-pipeline",
        status: "pending"
      },
      {
        slug: "06-agentic-autonomous-loop",
        title: "Finish automatically from one goal",
        description: "A flow that automatically repeats Plan -> Execute -> Evaluate -> Repeat from a single goal",
        groupId: "core-pipeline",
        status: "pending"
      }
    ]
  },
  {
    groupId: "workflow-guides",
    label: groupLabelsByLocale.en["workflow-guides"],
    pages: [
      {
        slug: "07-starting-a-new-project",
        title: "Starting a new Project",
        description: "From a blank slate to designing a project and finishing its first spec",
        groupId: "workflow-guides",
        status: "pending"
      },
      {
        slug: "08-onboarding-existing-repo",
        title: "Entering an existing Repo for the first time",
        description:
          "An onboarding flow that reverse-engineers an unfamiliar codebase's conventions into a CLAUDE.md",
        groupId: "workflow-guides",
        status: "pending"
      },
      {
        slug: "09-testing-guide",
        title: "Writing and running Tests",
        description: "How to run manual-verification testsheets alongside automated tests",
        groupId: "workflow-guides",
        status: "pending"
      },
      {
        slug: "10-e2e-test-strategy",
        title: "E2E Test automation strategy",
        description: "An in-depth guide to setting up, extending, and maintaining a Playwright-based E2E suite",
        groupId: "workflow-guides",
        status: "pending"
      },
      {
        slug: "11-design-review",
        title: "Reviewing and improving design",
        description: "How to distinguish between and apply usability audits vs. visual de-slop renewal",
        groupId: "workflow-guides",
        status: "pending"
      },
      {
        slug: "12-debugging-and-incident-postmortem",
        title: "Debugging and incident postmortems",
        description:
          "How ywc-debug-rootcause drives a root-cause investigation and ywc-incident-postmortem writes the follow-up report",
        groupId: "workflow-guides",
        status: "pending"
      }
    ]
  },
  {
    groupId: "reference",
    label: groupLabelsByLocale.en.reference,
    pages: [
      {
        slug: "13-executor-and-codegen-patterns",
        title: "Executor / Code-gen Prompt patterns",
        description: "A practical command reference for option-heavy executor/code-gen tools",
        groupId: "reference",
        status: "pending"
      },
      {
        slug: "14-skill-reference",
        title: "Full Skill Reference",
        description: "An index of the remaining Skills not covered above, organized by situation",
        groupId: "reference",
        status: "pending"
      },
      {
        slug: "15-prerequisites-installation",
        title: "Prerequisites and installation",
        description: "Required vs. optional tools and how to install ywc-agent-toolkit before relying on it",
        groupId: "reference",
        status: "pending"
      },
      {
        slug: "16-code-structure-and-maintainability",
        title: "Managing Code Structure and Maintainability",
        description:
          "A decision table and 4-step pipeline for ywc-refactor-clean, ywc-improve-architecture, ywc-impl-review, and ywc-agent-legibility-audit",
        groupId: "reference",
        status: "pending"
      }
    ]
  }
] as const;

export const guidebookPages: readonly GuidebookPageMeta[] = guidebookNavGroups.flatMap(
  (group) => group.pages
);

export const defaultGuidebookSlug = guidebookPages[0].slug;

// Base-path-free by design: consumed both for rendered <a> hrefs (wrap with
// withBasePath at the render site) and for canonical/alternate URL metadata, where
// absoluteUrl() already folds the basePath into siteUrl -- baking it in here too would
// double it up.
export function getGuidebookHref(locale: Locale | string, slug: string) {
  return `/${locale}/guidebook/${slug}/`;
}

export function getGuidebookRootHref(locale: Locale | string) {
  return `/${locale}/guidebook/`;
}

// The core-pipeline pages (04-06) are alternative depths of the same job (choose one
// by change scale), not a linear reading sequence -- surface them together so a reader
// who lands on any one of them can see the other two options instead of assuming
// Prev/Next means "read this next."
export const scaleChoiceSlugs = [
  "04-general-cycle-small",
  "05-general-cycle-medium-large",
  "06-agentic-autonomous-loop"
] as const;

export type ScaleChoiceSlug = (typeof scaleChoiceSlugs)[number];

export function isScaleChoiceSlug(slug: string): slug is ScaleChoiceSlug {
  return (scaleChoiceSlugs as readonly string[]).includes(slug);
}

export function normalizeGuidebookSlug(slug: string[] | undefined) {
  return slug?.filter(Boolean).join("/") || defaultGuidebookSlug;
}

export function getGuidebookSlugFromPathname(pathname: string | null) {
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const guidebookIndex = segments.indexOf("guidebook");

  return normalizeGuidebookSlug(
    guidebookIndex === -1 ? undefined : segments.slice(guidebookIndex + 1)
  );
}
