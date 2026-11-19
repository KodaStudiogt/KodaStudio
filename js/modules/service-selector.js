/**
 * js/modules/service-selector.js
 * STUB del contrato. Dueño: A.
 * Implementación real en `feature/contact-form`.
 */

import { DOM_SELECTORS } from "../config/selectors.js";

export function initServiceSelector() {
    const pills = document.querySelectorAll(DOM_SELECTORS.servicePills);
    const hiddenInput = document.querySelector(DOM_SELECTORS.serviceHiddenInput);

    if (!pills.length || !hiddenInput) return;

    // TODO(A): Set(), aria-pressed, .is-selected y sincronización del input oculto.
}
