// Maps a `ywc-*` skill mention to the closest existing Guidebook page. Most skills
// don't have a dedicated page yet (see guidebookNavGroups status: "pending"), so
// everything falls back to the full skill reference except mentions that already
// have a topically exact guide.
const SKILL_GUIDEBOOK_SLUG_OVERRIDES: Record<string, string> = {
  "ywc-agentic": "06-agentic-autonomous-loop",
  "ywc-debug-rootcause": "12-debugging-and-incident-postmortem",
  "ywc-incident-postmortem": "12-debugging-and-incident-postmortem",
  "ywc-iac-author": "17-infrastructure-and-cloud",
  "ywc-infra-design": "17-infrastructure-and-cloud",
  "ywc-infra-optimize": "17-infrastructure-and-cloud",
  "ywc-infra-review": "17-infrastructure-and-cloud"
};

const DEFAULT_SKILL_GUIDEBOOK_SLUG = "14-skill-reference";

export function getSkillGuidebookTarget(skillName: string): string {
  const normalized = skillName.replace(/^\//, "");
  const slug = SKILL_GUIDEBOOK_SLUG_OVERRIDES[normalized] ?? DEFAULT_SKILL_GUIDEBOOK_SLUG;

  return `/guidebook/${slug}/`;
}

export function isSkillMention(token: string): boolean {
  return /^\/?ywc-[a-z0-9-]+$/.test(token);
}
