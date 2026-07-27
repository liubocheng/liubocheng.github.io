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
      const company = job.querySelector("h3");
      const role = job.querySelector("strong");

      if (
        company?.textContent.includes("棋至文化") &&
        role &&
        role.textContent !== "C 端产品经理"
      ) {
        role.textContent = "C 端产品经理";
      }

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

  const applyTimeTheme = () => {
    const hour = Number(
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: false,
        timeZone: "Asia/Shanghai",
      }).format(new Date())
    );
    const theme = hour >= 7 && hour < 20 ? "light" : "dark";

    document.body.dataset.timeTheme = theme;
    document.body.style.colorScheme = theme;
  };

  const setupTimeTheme = () => {
    applyTimeTheme();
    window.setInterval(applyTimeTheme, 60 * 1000);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) applyTimeTheme();
    });
  };

  if (document.readyState === "complete") {
    window.setTimeout(setup, 800);
    window.setTimeout(setupTimeTheme, 800);
  } else {
    window.addEventListener(
      "load",
      () => {
        window.setTimeout(setup, 800);
        window.setTimeout(setupTimeTheme, 800);
      },
      { once: true }
    );
  }
})();
