/**
 * Test-only fetch override, loaded via `node --import` before the target
 * script runs. Rejects any request to the GitHub hosts generate-llms-txt.mjs
 * calls, so its cache-fallback path can be exercised deterministically
 * without depending on live network availability or reachability.
 */

const originalFetch = globalThis.fetch;
const BLOCKED_HOSTS = new Set(["api.github.com", "raw.githubusercontent.com"]);

globalThis.fetch = async (input, init) => {
  const url = typeof input === "string" ? input : input?.url ?? String(input);
  const host = new URL(url).host;

  if (BLOCKED_HOSTS.has(host)) {
    throw new Error(`[force-network-failure] simulated network failure for ${host}`);
  }

  return originalFetch(input, init);
};
