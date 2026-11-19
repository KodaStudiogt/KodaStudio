/**
 * js/modules/reveal.js
 * STUB del contrato. Dueño: D.
 * Implementación real en `design/homepage`.
 */

import { DOM_SELECTORS } from "../config/selectors.js";

export function initReveal() {
    const items = document.querySelectorAll(DOM_SELECTORS.revealItems);

    if (!items.length) return;

    // TODO(D): IntersectionObserver con REVEAL_THRESHOLD y .is-pending → .is-visible.
}
