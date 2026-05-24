(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("#site-nav");
  const bookingForm = document.querySelector("[data-booking-form]");
  const storedTheme = localStorage.getItem("hacienda-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("hacienda-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      themeToggle.innerHTML = theme === "dark"
        ? '<i data-lucide="moon" aria-hidden="true"></i>'
        : '<i data-lucide="sun" aria-hidden="true"></i>';
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeMenu() {
    document.body.classList.remove("menu-open");
    nav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle && window.lucide) {
      menuToggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
      window.lucide.createIcons();
    }
  }

  applyTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", Boolean(isOpen));
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.innerHTML = isOpen
      ? '<i data-lucide="x" aria-hidden="true"></i>'
      : '<i data-lucide="menu" aria-hidden="true"></i>';
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  nav?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(bookingForm);
    const requestType = data.get("requestType") || "Demande";
    const date = data.get("date") || "à confirmer";
    const name = data.get("name") || "Client";
    const details = data.get("details") || "Merci de me confirmer les disponibilités.";
    const message = `Bonjour Hacienda Hôtel, je souhaite faire une réservation.\n\nType: ${requestType}\nDate: ${date}\nNom: ${name}\nDétails: ${details}`;
    window.open(`https://wa.me/243820004010?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });

  window.addEventListener("load", () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
}());
