// Language switcher (EN default / ES), mobile menu, Home-to-top, active section
(function () {
  var meta = {
    en: {
      title: "Fernando Huarcaya | Data Analytics & FP&A",
      description: "Portfolio of Fernando Huarcaya: analyst with 5+ years in FP&A, commercial operations and business performance, moving into data science."
    },
    es: {
      title: "Fernando Huarcaya | Data Analytics & FP&A",
      description: "Portafolio de Fernando Huarcaya: analista con más de 5 años en FP&A, operaciones comerciales y reporting de negocio, en transición hacia data science."
    }
  };
  var pageTitles = { // optional per-page suffix, set via <body data-title-en / data-title-es>
    en: document.body.getAttribute("data-title-en"),
    es: document.body.getAttribute("data-title-es")
  };

  var buttons = document.querySelectorAll("[data-set-lang]");
  var descTag = document.querySelector('meta[name="description"]');

  function setLang(lang) {
    if (!meta[lang]) lang = "en";
    document.documentElement.lang = lang;
    document.title = pageTitles[lang] || meta[lang].title;
    if (descTag && !document.body.hasAttribute("data-title-en")) descTag.setAttribute("content", meta[lang].description);
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.setLang === lang ? "true" : "false");
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () { setLang(btn.dataset.setLang); });
  });
  setLang(document.documentElement.lang);

  // Mobile menu
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  function closeMenu() {
    if (!header) return;
    header.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.querySelectorAll(".nav-menu a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  // "Home" scrolls to the very top of the page
  document.querySelectorAll("[data-home]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (history.replaceState) history.replaceState(null, "", location.pathname);
    });
  });

  // Highlight the current in-page section in the nav
  var links = document.querySelectorAll('.nav-links a[href^="#"]:not([data-home])');
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove("active"); });
          map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
    window.addEventListener("scroll", function () {
      if (window.scrollY < 200) links.forEach(function (l) { l.classList.remove("active"); });
    }, { passive: true });
  }
})();
