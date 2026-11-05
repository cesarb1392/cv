document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const typedText = document.getElementById("typed-text");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");
  const yearElement = document.getElementById("year");
  const copyEmailButton = document.querySelector(".copy-email");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Typing effect ---------- */

  const phrases = [
    "whoami",
    "Building reliable AWS & Kubernetes platforms.",
    "Terraform · GitOps · Observability · Security.",
    "Making infrastructure dependable by default."
  ];

  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  let timer = null;

  function schedule(delay) {
    timer = setTimeout(type, delay);
  }

  function type() {
    if (!typedText) return;

    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
      typedText.textContent = currentPhrase.slice(0, characterIndex + 1);
      characterIndex += 1;

      if (characterIndex === currentPhrase.length) {
        deleting = true;
        schedule(2100);
        return;
      }

      schedule(45);
      return;
    }

    typedText.textContent = currentPhrase.slice(0, characterIndex - 1);
    characterIndex -= 1;

    if (characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    schedule(deleting ? 22 : 400);
  }

  if (typedText && !reduceMotion) {
    typedText.textContent = "";
    type();

    // Stop animating while the tab is in the background
    document.addEventListener("visibilitychange", () => {
      clearTimeout(timer);
      if (!document.hidden) schedule(300);
    });
  }
  // With reduced motion (or without JS) the static text from the HTML stays.

  /* ---------- Theme ---------- */

  function updateThemeLabel() {
    if (!themeToggle) return;
    const isLight = root.classList.contains("light");
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  }

  updateThemeLabel();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = root.classList.toggle("light");
      try {
        localStorage.setItem("theme", isLight ? "light" : "dark");
      } catch {
        /* storage unavailable: the choice just won't persist */
      }
      updateThemeLabel();
    });
  }

  /* ---------- Mobile menu ---------- */

  function closeMenu(returnFocus = false) {
    if (!siteNav || !menuToggle) return;
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (returnFocus) menuToggle.focus();
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && siteNav.classList.contains("open")) {
        closeMenu(true);
      }
    });

    document.addEventListener("click", (event) => {
      if (
        siteNav.classList.contains("open") &&
        !siteNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.matchMedia("(min-width: 721px)").addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  }

  /* ---------- Reveal on scroll ---------- */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  /* ---------- Copy email ---------- */

  if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
      const email = copyEmailButton.dataset.email;
      const originalText = copyEmailButton.textContent;

      try {
        await navigator.clipboard.writeText(email);
        copyEmailButton.textContent = "Email copied!";
      } catch {
        copyEmailButton.textContent = email;
      }

      setTimeout(() => {
        copyEmailButton.textContent = originalText;
      }, 2000);
    });
  }

  /* ---------- Footer year ---------- */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
