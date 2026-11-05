// Runs in <head> before first paint:
// 1) marks the page as JS-enabled (so .reveal elements only hide when JS is running)
// 2) applies the saved theme, or the OS preference, to avoid a flash of the wrong theme
(function () {
  var root = document.documentElement;
  root.classList.add("js");

  try {
    var stored = localStorage.getItem("theme");
    var light = stored
      ? stored === "light"
      : window.matchMedia("(prefers-color-scheme: light)").matches;
    if (light) root.classList.add("light");
  } catch (e) {
    /* storage unavailable: keep the default dark theme */
  }
})();
