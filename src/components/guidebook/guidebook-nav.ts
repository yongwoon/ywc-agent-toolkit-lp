import type { Locale } from "@/i18n/locale-list";

export type GuidebookPageStatus = "available" | "pending";

export type GuidebookGroupId =
  | "prologue"
  | "getting-started"
  | "core-pipeline"
  | "project-setup"
  | "quality"
  | "operations"
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
    "project-setup": "Starting a project",
    quality: "Quality and verification",
    operations: "Operations and specialized domains",
    reference: "Reference"
  },
  ja: {
    prologue: "プロローグ",
    "getting-started": "はじめに",
    "core-pipeline": "コアパイプライン",
    "project-setup": "プロジェクトの開始",
    quality: "品質と検証",
    operations: "運用と専門領域",
    reference: "リファレンス"
  },
  ko: {
    prologue: "프롤로그",
    "getting-started": "시작하기",
    "core-pipeline": "핵심 파이프라인",
    "project-setup": "프로젝트 시작",
    quality: "품질과 검증",
    operations: "운영과 전문 영역",
    reference: "레퍼런스"
  },
  zh: {
    prologue: "前言",
    "getting-started": "快速开始",
    "core-pipeline": "核心流程",
    "project-setup": "项目起步",
    quality: "质量与验证",
    operations: "运维与专项领域",
    reference: "参考"
  },
  es: {
    prologue: "Prólogo",
    "getting-started": "Primeros pasos",
    "core-pipeline": "Flujo principal",
    "project-setup": "Inicio de un proyecto",
    quality: "Calidad y verificación",
    operations: "Operaciones y áreas especializadas",
    reference: "Referencia"
  }
};

export function getGroupLabel(locale: Locale | string, groupId: GuidebookGroupId): string {
  const labels = groupLabelsByLocale[locale as Locale] ?? groupLabelsByLocale.en;
  return labels[groupId];
}

// Structural (not LocalizedGuidebookPageMeta) so this function can live here
// rather than in guidebook-nav-content.ts, which also holds
// LocalizedGuidebookPageMeta but pulls in a node:fs/promises-dependent chain
// (loadLocalizedGuidebookNav -> loadGuidebookPageForLocale) that client
// components must not import. LocalizedGuidebookPageMeta is structurally
// assignable to this type, so every call site works unchanged.
export type GuidebookTitleSource = { displayNumber: string; title: string };

// The 80 existing markdown files' H1 text (and therefore their
// locale-content-derived title) still carries its original "NN. " prefix --
// out of scope to rewrite per the refactor's render-time-override variant.
// Strip any such prefix here before applying the computed displayNumber, so
// existing pages don't render "16. 16. Title" while never trusting the H1's
// literal digits as the actual order source (displayNumber already comes
// from array position, computed upstream).
//
// Known limitation: a title that legitimately starts with "<digits>. "
// unrelated to page ordering (e.g. "5.0 Release notes") would be silently
// stripped too. None of the current 16 titles have this shape.
//
// formatGuidebookPageTitle({ displayNumber: "16", title: "16. Foo" }) -> "16. Foo"
// formatGuidebookPageTitle({ displayNumber: "01", title: "Foo" }) -> "01. Foo"
export function formatGuidebookPageTitle(page: GuidebookTitleSource): string {
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
        slug: "15-prerequisites-installation",
        title: "Prerequisites and installation",
        description: "Required vs. optional tools and how to install ywc-agent-toolkit before relying on it",
        groupId: "getting-started",
        status: "pending"
      },
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
      },
      {
        slug: "19-skill-combination-recipes",
        title: "Skill combination recipes",
        description:
          "How Skills hand off to each other: the review learning loop, bug-to-prevention, PR gates, decision records, discovery, parallel execution, and release",
        groupId: "core-pipeline",
        status: "pending"
      }
    ]
  },
  {
    groupId: "project-setup",
    label: groupLabelsByLocale.en["project-setup"],
    pages: [
      {
        slug: "07-starting-a-new-project",
        title: "Starting a new Project",
        description: "From a blank slate to designing a project and finishing its first spec",
        groupId: "project-setup",
        status: "pending"
      },
      {
        slug: "08-onboarding-existing-repo",
        title: "Entering an existing Repo for the first time",
        description:
          "An onboarding flow that reverse-engineers an unfamiliar codebase's conventions into a CLAUDE.md",
        groupId: "project-setup",
        status: "pending"
      }
    ]
  },
  {
    groupId: "quality",
    label: groupLabelsByLocale.en.quality,
    pages: [
      {
        slug: "09-testing-guide",
        title: "Writing and running Tests",
        description: "How to run manual-verification testsheets alongside automated tests",
        groupId: "quality",
        status: "pending"
      },
      {
        slug: "10-e2e-test-strategy",
        title: "E2E Test automation strategy",
        description: "An in-depth guide to setting up, extending, and maintaining a Playwright-based E2E suite",
        groupId: "quality",
        status: "pending"
      },
      {
        slug: "11-design-review",
        title: "Reviewing and improving design",
        description: "How to distinguish between and apply usability audits vs. visual de-slop renewal",
        groupId: "quality",
        status: "pending"
      },
      {
        slug: "16-code-structure-and-maintainability",
        title: "Managing Code Structure and Maintainability",
        description:
          "A decision table and 2-step pipeline for ywc-refactor-clean and ywc-impl-review",
        groupId: "quality",
        status: "pending"
      }
    ]
  },
  {
    groupId: "operations",
    label: groupLabelsByLocale.en.operations,
    pages: [
      {
        slug: "12-debugging-and-incident-postmortem",
        title: "Debugging and incident postmortems",
        description:
          "How ywc-debug-rootcause drives a root-cause investigation and ywc-incident-postmortem writes the follow-up report",
        groupId: "operations",
        status: "pending"
      },
      {
        slug: "17-infrastructure-and-cloud",
        title: "Managing Cloud Infrastructure",
        description:
          "A decision table and 4-step pipeline for ywc-infra-design, ywc-iac-author, ywc-infra-review, and ywc-infra-optimize, dispatching to the ywc-cloud-engineer agent",
        groupId: "operations",
        status: "pending"
      },
      {
        slug: "18-authentication-implementation",
        title: "Implementing Authentication",
        description:
          "How ywc-auth-implement runs a preflight gate, a 9-category policy interview, and a dynamic recommendation, then dispatches ywc-backend-coder, ywc-frontend-coder, and ywc-doc-writer under a security-audit and E2E gate",
        groupId: "operations",
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
