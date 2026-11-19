/**
 * js/modules/reveal.js
 * STUB del contrato (US-01). Dueño: D.
 * La implementación real llega con la entrega de identidad visual (US-02).
 */

import { DOM_SELECTORS } from "../config/selectors.js";

export function initReveal() {
    const items = document.querySelectorAll(DOM_SELECTORS.revealItems);

    if (!items.length) return;

    // TODO(D): IntersectionObserver con REVEAL_THRESHOLD y .is-pending → .is-visible.
}
