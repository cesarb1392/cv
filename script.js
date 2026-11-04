document.addEventListener("DOMContentLoaded", () => {
  const typedText = document.getElementById("typed-text");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");
  const yearElement = document.getElementById("year");
  const copyEmailButton = document.querySelector(".copy-email");

  const phrases = [
    "whoami",
    "Building reliable AWS & Kubernetes platforms.",
    "Terraform · GitOps · Observability · Security.",
    "Making infrastructure dependable by default."
  ];

  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function type() {
    if (!typedText) return;

    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
      typedText.textContent = currentPhrase.slice(0, characterIndex + 1);
      characterIndex += 1;

      if (characterIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(type, 2100);
        return;
      }

      setTimeout(type, 45);
      return;
    }

    typedText.textContent = currentPhrase.slice(0, characterIndex - 1);
    characterIndex -= 1;

    if (characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(type, deleting ? 22 : 400);
  }

  type();

  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "light") {
    document.documentElement.classList.add("light");
    themeToggle.setAttribute("aria-pressed", "false");
  }

  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.setAttribute("aria-pressed", String(!isLight));
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

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

  yearElement.textContent = new Date().getFullYear();
});