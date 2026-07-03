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
  order: number;
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

export const guidebookNavGroups: readonly GuidebookNavGroup[] = [
  {
    groupId: "prologue",
    label: groupLabelsByLocale.en.prologue,
    pages: [
      {
        slug: "01-introduction",
        title: "01. Introduction",
        description: "What this Skill/Agent ecosystem is, who it's for, and what problem it solves",
        groupId: "prologue",
        order: 1,
        status: "pending"
      },
      {
        slug: "02-core-concepts",
        title: "02. Core concepts",
        description:
          "Skill / Agent / Executor / Task terminology, invocation syntax, and the 4 completion states (DONE, etc.)",
        groupId: "prologue",
        order: 2,
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
        title: "03. Ship your first feature in 5 minutes",
        description: "A hands-on walkthrough of one small feature, from idea to merge",
        groupId: "getting-started",
        order: 3,
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
        title: "04. Handling a small change",
        description: "The standard flow for a change that finishes in a single PR without Task decomposition",
        groupId: "core-pipeline",
        order: 4,
        status: "pending"
      },
      {
        slug: "05-general-cycle-medium-large",
        title: "05. Handling work split into multiple Tasks",
        description: "The flow for changes large enough to need spec validation and Task decomposition",
        groupId: "core-pipeline",
        order: 5,
        status: "pending"
      },
      {
        slug: "06-agentic-autonomous-loop",
        title: "06. Finish automatically from one goal",
        description: "A flow that automatically repeats Plan -> Execute -> Evaluate -> Repeat from a single goal",
        groupId: "core-pipeline",
        order: 6,
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
        title: "07. Starting a new Project",
        description: "From a blank slate to designing a project and finishing its first spec",
        groupId: "workflow-guides",
        order: 7,
        status: "pending"
      },
      {
        slug: "08-onboarding-existing-repo",
        title: "08. Entering an existing Repo for the first time",
        description:
          "An onboarding flow that reverse-engineers an unfamiliar codebase's conventions into a CLAUDE.md",
        groupId: "workflow-guides",
        order: 8,
        status: "pending"
      },
      {
        slug: "09-testing-guide",
        title: "09. Writing and running Tests",
        description: "How to run manual-verification testsheets alongside automated tests",
        groupId: "workflow-guides",
        order: 9,
        status: "pending"
      },
      {
        slug: "10-e2e-test-strategy",
        title: "10. E2E Test automation strategy",
        description: "An in-depth guide to setting up, extending, and maintaining a Playwright-based E2E suite",
        groupId: "workflow-guides",
        order: 10,
        status: "pending"
      },
      {
        slug: "11-design-review",
        title: "11. Reviewing and improving design",
        description: "How to distinguish between and apply usability audits vs. visual de-slop renewal",
        groupId: "workflow-guides",
        order: 11,
        status: "pending"
      }
    ]
  },
  {
    groupId: "reference",
    label: groupLabelsByLocale.en.reference,
    pages: [
      {
        slug: "12-executor-and-codegen-patterns",
        title: "12. Executor / Code-gen Prompt patterns",
        description: "A practical command reference for option-heavy executor/code-gen tools",
        groupId: "reference",
        order: 12,
        status: "pending"
      },
      {
        slug: "13-skill-reference",
        title: "13. Full Skill Reference",
        description: "An index of the remaining Skills not covered above, organized by situation",
        groupId: "reference",
        order: 13,
        status: "pending"
      },
      {
        slug: "14-prerequisites-installation",
        title: "14. Prerequisites and installation",
        description: "Required vs. optional tools and how to install ywc-agent-toolkit before relying on it",
        groupId: "reference",
        order: 14,
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
