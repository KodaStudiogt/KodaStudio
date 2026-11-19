import { selectors } from "../config/selectors.js";

export function initServiceSelector() {
  document.querySelectorAll(selectors.serviceOption).forEach((option) => {
    option.addEventListener("click", () => {
      const isSelected = option.getAttribute("aria-pressed") === "true";
      option.setAttribute("aria-pressed", String(!isSelected));
    });
  });
}
