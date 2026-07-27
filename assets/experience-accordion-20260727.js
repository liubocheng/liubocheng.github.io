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
    document.querySelectorAll(".achievement-metrics span").forEach((item) => {
      if (item.textContent === "产品需求分析及原型设计") {
        item.textContent = "通用产品全过程需求分析及原型设计";
      }
    });

    document
      .querySelectorAll(".project-body p, .experience-section .job li")
      .forEach((item) => {
        if (
          item.textContent.includes(
            "基于运营后台对用户及产品进行数据分析，融合业务和销售数据"
          )
        ) {
          item.textContent = item.textContent.replace(
            "基于运营后台对用户及产品进行数据分析，融合业务和销售数据",
            "基于对用户及产品进行运营数据分析，融合业务和销售数据"
          );
        }

        if (
          item.textContent.includes(
            "包括面向政府支付服务的 18+ 能力组件构成的“1+3”能力域"
          )
        ) {
          item.textContent = item.textContent.replace(
            "包括面向政府支付服务的 18+ 能力组件构成的“1+3”能力域",
            "包括面向政府支付服务 18+ 能力组件构成“1+3”能力域"
          );
        }
      });

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
