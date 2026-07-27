(() => {
  const applyTheme = () => {
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

  const setup = () => {
    applyTheme();
    window.setInterval(applyTheme, 60 * 1000);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) applyTheme();
    });
  };

  if (document.readyState === "complete") {
    window.setTimeout(setup, 0);
  } else {
    window.addEventListener("load", () => window.setTimeout(setup, 0), {
      once: true,
    });
  }
})();
