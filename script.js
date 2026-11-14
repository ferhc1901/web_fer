// Language switcher (EN / ES)
(function () {
  var meta = {
    en: {
      title: "Fernando Huarcaya | Data Analytics & FP&A",
      description: "Professional profile of Fernando Huarcaya: analyst with 5+ years in FP&A, commercial operations and business performance reporting."
    },
    es: {
      title: "Fernando Huarcaya | Data Analytics & FP&A",
      description: "Perfil profesional de Fernando Huarcaya: analista con más de 5 años en FP&A, operaciones comerciales y reporting de negocio."
    }
  };

  var buttons = document.querySelectorAll("[data-set-lang]");
  var descTag = document.querySelector('meta[name="description"]');

  function setLang(lang) {
    if (!meta[lang]) lang = "en";
    document.documentElement.lang = lang;
    document.title = meta[lang].title;
    if (descTag) descTag.setAttribute("content", meta[lang].description);

    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.setLang === lang ? "true" : "false");
    });

    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () { setLang(btn.dataset.setLang); });
  });

  setLang(document.documentElement.lang);
})();
