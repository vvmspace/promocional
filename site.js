(() => {
  const root = document.documentElement;
  const nav = document.querySelector("[data-site-nav]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const themeToggle = document.querySelector("[data-theme-toggle]");

  const applyTheme = (theme) => {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      if (themeToggle) themeToggle.setAttribute("aria-pressed", "true");
    } else {
      root.removeAttribute("data-theme");
      if (themeToggle) themeToggle.setAttribute("aria-pressed", "false");
    }
  };

  const savedTheme = localStorage.getItem("promocional-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    applyTheme("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      localStorage.setItem("promocional-theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  if (!nav || !toggle) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const open = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) {
      close();
    } else {
      open();
    }
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  nav.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) link.setAttribute("aria-current", "page");
  });
})();
