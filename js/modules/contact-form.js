/**
 * js/modules/contact-form.js
 * STUB del contrato. Dueño: A.
 * Implementación real en `feature/contact-form`.
 */

import { DOM_SELECTORS } from "../config/selectors.js";

export function initContactForm() {
    const form = document.querySelector(DOM_SELECTORS.contactForm);
    const feedback = document.querySelector(DOM_SELECTORS.formFeedback);

    if (!form || !feedback) return;

    // TODO(A): validación por campo, .has-error, honeypot y envío real (D-02).
}
