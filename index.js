// Site interactivity: nav toggle, theme toggle, smooth scrolling, dynamic year
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const html = document.documentElement; // for [data-theme]
  const body = document.body;
  const navToggle = $(".nav__toggle");
  const navMenu = $("#navMenu");
  const themeBtn = $(".theme-toggle");
  const themeIcon = $(".theme-toggle__icon");
  const yearEl = $("#year");

  // --- Dynamic Year ---
  try {
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  } catch {}

  // --- Mobile Nav Toggle ---
  function setNav(open) {
    if (!navToggle || !navMenu) return;
    body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.contains("nav-open");
      setNav(!isOpen);
    });
  }

  // Close menu when a link is clicked (mobile)
  if (navMenu) {
    navMenu.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.tagName === "A") {
        setNav(false);
      }
    });
  }

  // --- Theme Toggle with Persistence ---
  const THEME_KEY = "theme"; // 'light' | 'dark'

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
  }

  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, currentTheme);
      applyTheme(currentTheme);
    });
  }

  // Listen to system preference changes if no manual selection stored
  if (!localStorage.getItem(THEME_KEY) && window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", (e) => {
      currentTheme = e.matches ? "dark" : "light";
      applyTheme(currentTheme);
    });
  }

  // --- Smooth Scroll for internal anchors ---
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      }
    });
  });
})();
