(function () {
  var html = document.documentElement;
  var buttons = document.querySelectorAll("[data-theme-toggle]");

  function getStoredTheme() {
    try {
      return window.localStorage.getItem("theme");
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem("theme", theme);
    } catch (error) {
      // Theme persistence is optional.
    }
  }

  function prefersLight() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  }

  function applyTheme(theme) {
    var normalized = theme === "light" ? "light" : "dark";
    var iconClass = normalized === "light" ? "bi bi-moon" : "bi bi-sun";
    var label = normalized === "light" ? "Switch to dark theme" : "Switch to light theme";

    if (normalized === "light") {
      html.setAttribute("data-theme", "light");
    } else {
      html.removeAttribute("data-theme");
    }

    buttons.forEach(function (button) {
      var icon = button.querySelector("[data-theme-icon]");
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      if (icon) {
        icon.className = iconClass;
      }
    });
  }

  var storedTheme = getStoredTheme();
  applyTheme(storedTheme || (prefersLight() ? "light" : "dark"));

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var current = html.getAttribute("data-theme") === "light" ? "light" : "dark";
      var next = current === "light" ? "dark" : "light";
      storeTheme(next);
      applyTheme(next);
    });
  });

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
})();
