(() => {
  const applyTheme = () => {
    const hour = new Date().getHours();
    const theme = hour >= 7 && hour < 20 ? "light" : "dark";

    document.documentElement.dataset.timeTheme = theme;
    document.documentElement.style.colorScheme = theme;
  };

  applyTheme();
  window.setInterval(applyTheme, 60 * 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) applyTheme();
  });
})();
