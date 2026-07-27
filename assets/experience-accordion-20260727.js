(() => {
  const selector = ".experience-section .job";

  const setOpen = (job, open) => {
    job.classList.toggle("active", open);
    job.setAttribute("aria-expanded", String(open));
  };

  const toggle = (job) => {
    const open = !job.classList.contains("active");

    document.querySelectorAll(selector).forEach((item) => {
      setOpen(item, item === job && open);
    });
  };

  const setup = () => {
    document.querySelectorAll(selector).forEach((job) => {
      if (job.dataset.accordionReady === "true") return;

      job.dataset.accordionReady = "true";
      job.setAttribute("role", "button");
      job.setAttribute("tabindex", "0");
      job.setAttribute("aria-expanded", "false");

      job.addEventListener("click", () => toggle(job));
      job.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggle(job);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }

  new MutationObserver(setup).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
