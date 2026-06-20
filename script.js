/* ============================================================
   Sumanth Reddy — portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  /* Mark JS as active so reveal styles apply (content stays visible without JS) */
  document.documentElement.classList.add("has-js");

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  /* --- Sticky nav shadow on scroll --- */
  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu toggle --- */
  function closeMenu() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });

  /* --- Light / dark theme toggle --- */
  var themeToggle = document.getElementById("themeToggle");

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* storage may be unavailable */
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    }
  }

  if (themeToggle) {
    // Reflect the pre-paint theme on the button without persisting it,
    // so an unset preference keeps following the OS.
    themeToggle.setAttribute("aria-pressed", String(currentTheme() === "light"));
    themeToggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "light" ? "dark" : "light");
    });
  }

  /* Follow OS theme changes only when the user hasn't picked one */
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", function (e) {
        var stored;
        try {
          stored = localStorage.getItem("theme");
        } catch (err) {
          stored = null;
        }
        if (stored !== "light" && stored !== "dark") {
          document.documentElement.setAttribute(
            "data-theme",
            e.matches ? "light" : "dark"
          );
          if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(e.matches));
          }
        }
      });
  }

  /* --- Reveal-on-scroll --- */
  var revealEls = document.querySelectorAll(
    ".reveal, .section__title, .skill-card, .work-card, .timeline__item, .about__text, .about__card, .section__lead, .contact__title, .contact__desc"
  );

  if ("IntersectionObserver" in window) {
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* --- Current year in footer --- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
