/**
 * js/modules/contact-form.js
 * STUB del contrato (US-01). Dueño: A.
 * La implementación real llega con servicios y formulario (US-03).
 */

import { DOM_SELECTORS } from "../config/selectors.js";

export function initContactForm() {
    const form = document.querySelector(DOM_SELECTORS.contactForm);
    const feedback = document.querySelector(DOM_SELECTORS.formFeedback);

    if (!form || !feedback) return;

    // TODO(A): validación por campo, .has-error, honeypot y envío real (D-02).
}
