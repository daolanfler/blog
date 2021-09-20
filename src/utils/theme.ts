import { applyCodeTheme, pageTheme } from "../store";
import { PageTheme } from "./enum";

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  pageTheme.value = PageTheme.Dark;
  applyCodeTheme('Vitesse Dark')
  document.documentElement.classList.add("dark");
} else {
  applyCodeTheme('Default')
  document.documentElement.classList.remove("dark");
  pageTheme.value = PageTheme.Light;
}

// Whenever the user explicitly chooses light mode
// localStorage.theme = "light";

// Whenever the user explicitly chooses dark mode
// localStorage.theme = "dark";

// Whenever the user explicitly chooses to respect the OS preference
// localStorage.removeItem("theme");
