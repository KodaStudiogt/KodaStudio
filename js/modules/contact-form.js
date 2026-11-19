/**
 * js/modules/contact-form.js
 * Validación y envío del formulario de consultoría. Dueño: A.
 *
 * Contrato: [data-js="contact-form"], "form-feedback", "feedback-text",
 * "form-reset". Campos por `name` según estándar §5.
 * Estados: .has-error en el campo, .is-hidden en la caja de feedback.
 *
 * IMPORTANTE: no se muestra confirmación de éxito sin respuesta exitosa del
 * endpoint real (arquitectura §5.5). Mientras D-02 no esté decidida, el
 * formulario valida y lo dice con honestidad; no finge un envío.
 */

import { DOM_SELECTORS, STATE_CLASSES, FORM_FIELDS, SERVICE_LABELS } from "../config/selectors.js";
import { isValidEmail, normalizeText, hasMinLength } from "../utils/validation.js";

function getErrorMessage(field, value) {
    if (field.required && value.length === 0) {
        return `Escribe tu ${field.label}.`;
    }

    if (field.type === "email" && !isValidEmail(value)) {
        return "Escribe un correo con formato válido (ejemplo: nombre@empresa.com).";
    }

    if (field.minLength > 0 && !hasMinLength(value, field.minLength)) {
        return `Necesitamos al menos ${field.minLength} caracteres.`;
    }

    return "";
}

export function initContactForm() {
    const form = document.querySelector(DOM_SELECTORS.contactForm);
    const feedback = document.querySelector(DOM_SELECTORS.formFeedback);
    const feedbackText = document.querySelector(DOM_SELECTORS.feedbackText);
    const resetButton = document.querySelector(DOM_SELECTORS.formResetBtn);

    if (!form || !feedback || !feedbackText) return;

    function showMessage(message) {
        feedbackText.textContent = message;
        feedback.classList.remove(STATE_CLASSES.hidden);
    }

    function hideMessage() {
        feedback.classList.add(STATE_CLASSES.hidden);
        feedbackText.textContent = "";
    }

    /**
     * Marca el campo y escribe el mensaje en el nodo apuntado por
     * aria-describedby (sin seleccionar por clase visual).
     */
    function setFieldError(field, message) {
        const input = form.elements[field.name];
        if (!input) return;

        const describedBy = input.getAttribute("aria-describedby");
        const errorNode = describedBy ? document.getElementById(describedBy) : null;

        input.classList.toggle(STATE_CLASSES.error, Boolean(message));
        input.setAttribute("aria-invalid", String(Boolean(message)));

        if (errorNode) errorNode.textContent = message;
    }

    function validateForm() {
        let firstInvalidInput = null;

        FORM_FIELDS.forEach((field) => {
            const input = form.elements[field.name];
            if (!input) return;

            const value = normalizeText(input.value);
            const message = getErrorMessage(field, value);

            setFieldError(field, message);

            if (message && !firstInvalidInput) firstInvalidInput = input;
        });

        return firstInvalidInput;
    }

    function describeSelection() {
        const rawValue = form.elements.selected_services
            ? form.elements.selected_services.value
            : "";

        if (!rawValue) return "";

        return rawValue
            .split(",")
            .map((service) => service.trim())
            .filter(Boolean)
            .map((service) => SERVICE_LABELS[service] || service)
            .join(", ");
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Honeypot: si viene relleno, es un bot. Se ignora en silencio.
        const honeypot = form.elements.kc_website_hp;
        if (honeypot && honeypot.value.trim() !== "") return;

        const firstInvalidInput = validateForm();

        if (firstInvalidInput) {
            showMessage("Revisa los campos marcados antes de enviar.");
            firstInvalidInput.focus();
            return;
        }

        const clientName = normalizeText(form.elements.client_name.value);
        const selection = describeSelection();

        // TODO(A) D-02: sustituir este bloque por el envío real (fetch al
        // endpoint o servicio elegido) y mostrar la confirmación solo si la
        // respuesta trae éxito. El mensaje debe usar textContent, nunca innerHTML.
        const selectionSuffix = selection ? ` Soluciones de interés: ${selection}.` : "";
        showMessage(
            `Gracias, ${clientName}. Tus datos están completos y validados.${selectionSuffix} ` +
            "El envío todavía no está conectado a un destino real, así que esta solicitud no se ha entregado."
        );
    });

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            form.reset();
            FORM_FIELDS.forEach((field) => setFieldError(field, ""));
            hideMessage();
        });
    }
}
