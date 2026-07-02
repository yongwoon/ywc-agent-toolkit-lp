import { getTranslations } from "next-intl/server";

type FooterLink = {
  label: string;
  target: string;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

function isExternalLink(target: string) {
  return target.startsWith("http://") || target.startsWith("https://");
}

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const groups = t.raw("groups") as FooterGroup[];

  return (
    <footer className="bg-bg-subtle">
      <div className="mx-auto grid max-w-[var(--container)] gap-10 px-[var(--gutter)] py-12 md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div>
          <a
            className="inline-flex font-mono text-[var(--text-mono)] font-semibold text-text-bright outline-none focus-visible:shadow-[var(--focus-ring)]"
            href="#top"
          >
            <span className="text-accent">$</span>
            <span className="ml-2">ywc-agent-toolkit</span>
          </a>
          <p className="mt-4 max-w-[32rem] text-[var(--text-body)] leading-[var(--lh-relaxed)] text-text-muted">
            {t("copyright")}
          </p>
        </div>

        {groups.map((group) => (
          <nav aria-label={group.title} key={group.title}>
            <h2 className="font-mono text-label font-semibold uppercase leading-none tracking-[var(--ls-label)] text-text-muted">
              {group.title}
            </h2>
            <ul className="mt-4 grid gap-3">
              {group.links.map((link) => {
                const external = isExternalLink(link.target);

                return (
                  <li key={link.target}>
                    <a
                      className="text-[var(--text-body)] leading-[var(--lh-normal)] text-text-secondary underline-offset-4 hover:text-link hover:underline focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                      href={link.target}
                      rel={external ? "noreferrer" : undefined}
                      target={external ? "_blank" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
