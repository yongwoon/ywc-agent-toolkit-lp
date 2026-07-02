(() => {
  function syncLocaleLinks() {
    const hash = window.location.hash;

    document.querySelectorAll("[data-locale-link]").forEach((link) => {
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      const base = link.href.split("#")[0];
      link.href = hash ? `${base}${hash}` : base;
    });
  }

  syncLocaleLinks();
  window.addEventListener("hashchange", syncLocaleLinks);
})();
