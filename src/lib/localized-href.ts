import { withBasePath } from "@/lib/base-path";

// Nav/footer link targets are stored locale-agnostic (e.g. "#install", "/guidebook/",
// or an absolute external URL) so the same messages.json entry works across all
// locales. Hash anchors and external URLs resolve as-is; anything else is an internal
// path that needs the current locale prefixed.
export function resolveLocalizedHref(locale: string, target: string): string {
  if (target.startsWith("#") || target.startsWith("http://") || target.startsWith("https://")) {
    return target;
  }

  return withBasePath(`/${locale}${target}`);
}
