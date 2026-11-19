/**
 * js/modules/footer.js
 * Año dinámico del copyright. Dueño: D.
 */

import { DOM_SELECTORS } from "../config/selectors.js";

export function initFooter() {
    const yearElement = document.querySelector(DOM_SELECTORS.currentYear);

    if (!yearElement) return;

    yearElement.textContent = String(new Date().getFullYear());
}
