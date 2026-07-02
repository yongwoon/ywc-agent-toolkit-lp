(() => {
  const copiedLabel = "Copied";
  const failedLabel = "Select";
  const idleLabel = "Copy";
  const resetTimers = new WeakMap();

  function selectText(button) {
    const block = button.closest("div");
    const code = block?.querySelector("code");

    if (!code || !window.getSelection) {
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function setTemporaryLabel(button, label) {
    const previous = resetTimers.get(button);

    if (previous) {
      window.clearTimeout(previous);
    }

    button.textContent = label;
    resetTimers.set(
      button,
      window.setTimeout(() => {
        button.textContent = idleLabel;
        resetTimers.delete(button);
      }, 1800)
    );
  }

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-command]");

    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    try {
      await navigator.clipboard.writeText(button.dataset.copyCommand ?? "");
      setTemporaryLabel(button, copiedLabel);
    } catch {
      selectText(button);
      setTemporaryLabel(button, failedLabel);
    }
  });
})();
