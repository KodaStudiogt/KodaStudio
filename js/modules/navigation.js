/**
 * js/modules/navigation.js
 * STUB del contrato (US-01). Dueño: D.
 *
 * Existe para que js/main.js resuelva sus importaciones desde el primer día.
 * La implementación real llega con la entrega de identidad visual (US-02).
 */

import { DOM_SELECTORS } from "../config/selectors.js";

export function initNavigation() {
    const toggle = document.querySelector(DOM_SELECTORS.mobileToggle);
    const menu = document.querySelector(DOM_SELECTORS.mobileMenu);

    if (!toggle || !menu) return;

    // TODO(D): alternar .is-open y aria-expanded, cerrar al navegar, Escape y matchMedia.
}
