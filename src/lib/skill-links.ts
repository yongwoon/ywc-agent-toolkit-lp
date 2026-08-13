// Maps a `ywc-*` skill mention to the closest existing Guidebook page. Most skills
// don't have a dedicated page yet (see guidebookNavGroups status: "pending"), so
// everything falls back to the full skill reference except mentions that already
// have a topically exact guide.
const SKILL_GUIDEBOOK_SLUG_OVERRIDES: Record<string, string> = {
  "ywc-agentic": "06-agentic-autonomous-loop",
  "ywc-auth-implement": "18-authentication-implementation",
  "ywc-debug-rootcause": "12-debugging-and-incident-postmortem",
  "ywc-incident-postmortem": "12-debugging-and-incident-postmortem",
  "ywc-iac-author": "17-infrastructure-and-cloud",
  "ywc-infra-design": "17-infrastructure-and-cloud",
  "ywc-infra-optimize": "17-infrastructure-and-cloud",
  "ywc-infra-review": "17-infrastructure-and-cloud",
  // These four are the documented steps of the medium/large pipeline (see
  // 05-general-cycle-medium-large.md's own step table) -- 14-skill-reference
  // is scoped to "skills not covered in the workflow guides" and doesn't
  // list them, so the default fallback would land on a page that omits them.
  "ywc-plan": "05-general-cycle-medium-large",
  "ywc-spec-ready": "05-general-cycle-medium-large",
  "ywc-task-generator": "05-general-cycle-medium-large",
  "ywc-sequential-executor": "05-general-cycle-medium-large"
};

const SKILL_GUIDEBOOK_ANCHOR_OVERRIDES: Record<string, string> = {
  "ywc-impl-review": "check-implementation-quality-and-maintainability-outside-the-general-cycle-standalone"
};

const DEFAULT_SKILL_GUIDEBOOK_SLUG = "14-skill-reference";

export function getSkillGuidebookTarget(skillName: string): string {
  const normalized = skillName.replace(/^\//, "");
  const slug = SKILL_GUIDEBOOK_SLUG_OVERRIDES[normalized] ?? DEFAULT_SKILL_GUIDEBOOK_SLUG;
  const anchor = SKILL_GUIDEBOOK_ANCHOR_OVERRIDES[normalized];

  return anchor ? `/guidebook/${slug}/#${anchor}` : `/guidebook/${slug}/`;
}

export function isSkillMention(token: string): boolean {
  return /^\/?ywc-[a-z0-9-]+$/.test(token);
}
