(() => {
  function syncLocaleLinks() {
    const hash = window.location.hash;

    document.querySelectorAll("[data-locale-link]").forEach((link) => {
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      // Read/write the raw attribute, not the .href property: the property always
      // resolves to an absolute URL, so writing it back (even a no-op sync when there's
      // no hash) rewrites "/en/" to "http://host/en/" and trips a React hydration
      // mismatch if this runs while the tree is still hydrating.
      const original = link.getAttribute("href") ?? "";
      const base = original.split("#")[0];
      const next = hash ? `${base}${hash}` : base;

      if (next !== original) {
        link.setAttribute("href", next);
      }
    });
  }

  // Wait for `load` (well after hydration) before the first sync, so this never races
  // React's initial hydration pass.
  if (document.readyState === "complete") {
    syncLocaleLinks();
  } else {
    window.addEventListener("load", syncLocaleLinks, { once: true });
  }

  window.addEventListener("hashchange", syncLocaleLinks);
})();
