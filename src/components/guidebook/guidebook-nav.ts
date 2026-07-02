import type { Locale } from "@/i18n/locale-list";

export type GuidebookPageStatus = "available" | "pending";

export type GuidebookPageMeta = {
  slug: string;
  title: string;
  description: string;
  group: string;
  order: number;
  status: GuidebookPageStatus;
};

export type GuidebookNavGroup = {
  label: string;
  pages: readonly GuidebookPageMeta[];
};

export const guidebookNavGroups: readonly GuidebookNavGroup[] = [
  {
    label: "Prologue",
    pages: [
      {
        slug: "01-introduction",
        title: "01. 소개",
        description: "이 Skill/Agent 생태계가 무엇이고, 누구를 위한 것이며, 어떤 문제를 해결하는지",
        group: "Prologue",
        order: 1,
        status: "pending"
      },
      {
        slug: "02-core-concepts",
        title: "02. 핵심 개념",
        description: "Skill / Agent / Executor / Task 용어 정리, 호출 문법, 4가지 완료 상태(DONE 등)",
        group: "Prologue",
        order: 2,
        status: "pending"
      }
    ]
  },
  {
    label: "시작하기",
    pages: [
      {
        slug: "03-quickstart",
        title: "03. 5분 안에 첫 기능 배포하기",
        description: "작은 기능 하나를 아이디어부터 merge 까지 실제로 따라 해보는 첫 실습",
        group: "시작하기",
        order: 3,
        status: "pending"
      }
    ]
  },
  {
    label: "워크플로우 가이드",
    pages: [
      {
        slug: "04-general-cycle-small",
        title: "04. 작은 변경 처리하기",
        description: "Task 분해 없이 단일 PR 로 끝나는 변경의 표준 흐름",
        group: "워크플로우 가이드",
        order: 4,
        status: "pending"
      },
      {
        slug: "05-general-cycle-medium-large",
        title: "05. 여러 Task 로 나누어 처리하기",
        description: "Spec 검증과 Task 분해가 필요한 규모의 변경 흐름",
        group: "워크플로우 가이드",
        order: 5,
        status: "pending"
      },
      {
        slug: "06-agentic-autonomous-loop",
        title: "06. 목표 하나로 자동 완료하기",
        description: "목표 하나로 Plan -> Execute -> Evaluate -> Repeat 를 자동 반복하는 흐름",
        group: "워크플로우 가이드",
        order: 6,
        status: "pending"
      },
      {
        slug: "07-starting-a-new-project",
        title: "07. 새 Project 시작하기",
        description: "백지 상태에서 project 를 설계하고 첫 spec 을 완성하기까지",
        group: "워크플로우 가이드",
        order: 7,
        status: "pending"
      },
      {
        slug: "08-onboarding-existing-repo",
        title: "08. 기존 Repo 에 처음 진입하기",
        description: "낯선 codebase 의 관행을 역추출해 CLAUDE.md 를 만드는 onboarding 흐름",
        group: "워크플로우 가이드",
        order: 8,
        status: "pending"
      },
      {
        slug: "09-testing-guide",
        title: "09. Test 작성 및 실행하기",
        description: "수기 검증 testsheet 와 자동화 test 를 함께 운영하는 방법",
        group: "워크플로우 가이드",
        order: 9,
        status: "pending"
      },
      {
        slug: "10-e2e-test-strategy",
        title: "10. E2E Test 자동화 전략",
        description: "Playwright 기반 E2E Suite 를 설정, 확장, 유지보수하는 심화 가이드",
        group: "워크플로우 가이드",
        order: 10,
        status: "pending"
      },
      {
        slug: "11-design-review",
        title: "11. 디자인 검토 및 개선하기",
        description: "Usability 감사와 시각적 De-slop Renewal 을 구분해 적용하는 방법",
        group: "워크플로우 가이드",
        order: 11,
        status: "pending"
      }
    ]
  },
  {
    label: "레퍼런스",
    pages: [
      {
        slug: "12-executor-and-codegen-patterns",
        title: "12. Executor / Code-gen Prompt 패턴",
        description: "옵션이 많은 executor/code-gen 실전 명령어 모음",
        group: "레퍼런스",
        order: 12,
        status: "pending"
      },
      {
        slug: "13-skill-reference",
        title: "13. 전체 Skill 레퍼런스",
        description: "위 가이드에서 다루지 않은 나머지 Skill 을 상황별로 정리한 색인",
        group: "레퍼런스",
        order: 13,
        status: "pending"
      }
    ]
  }
] as const;

export const guidebookPages: readonly GuidebookPageMeta[] = guidebookNavGroups.flatMap(
  (group) => group.pages
);

export const defaultGuidebookSlug = guidebookPages[0].slug;

export function getGuidebookHref(locale: Locale | string, slug: string) {
  return `/${locale}/guidebook/${slug}/`;
}

export function normalizeGuidebookSlug(slug: string[] | undefined) {
  return slug?.filter(Boolean).join("/") || defaultGuidebookSlug;
}

export function findGuidebookPage(slug: string) {
  return guidebookPages.find((page) => page.slug === slug);
}

export function getAdjacentGuidebookPages(slug: string) {
  const index = guidebookPages.findIndex((page) => page.slug === slug);

  return {
    previous: index > 0 ? guidebookPages[index - 1] : undefined,
    next: index >= 0 && index < guidebookPages.length - 1 ? guidebookPages[index + 1] : undefined
  };
}
