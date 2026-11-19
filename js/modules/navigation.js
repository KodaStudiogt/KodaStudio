import { selectors } from "../config/selectors.js";

export function initNavigation() {
  const toggle = document.querySelector(selectors.navigationToggle);
  const navigation = document.querySelector(selectors.navigation);

  if (!toggle || !navigation) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    navigation.classList.remove("is-open");
  });
}
