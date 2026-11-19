import { selectors } from "../config/selectors.js";

export function initFooter() {
  const year = document.querySelector(selectors.currentYear);
  if (year) year.textContent = String(new Date().getFullYear());
}
