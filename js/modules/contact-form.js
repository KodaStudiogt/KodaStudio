/** Validación y envío del formulario de consultoría. */
import {
    CONTACT_ENDPOINT, CONTACT_TIMEOUT_MS, DOM_SELECTORS, FORM_FIELDS,
    SERVICE_LABELS, STATE_CLASSES, VALID_SERVICES
} from "../config/selectors.js";
import { isValidEmail, normalizeText, hasMinLength } from "../utils/validation.js";

async function kc_sendContactRequest(kc_payload) {
    const kc_controller = new AbortController();
    const kc_timeout = setTimeout(() => kc_controller.abort(), CONTACT_TIMEOUT_MS);
    try {
        const kc_response = await fetch(CONTACT_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(kc_payload),
            signal: kc_controller.signal
        });
        let kc_data = {};
        try { kc_data = await kc_response.json(); } catch { /* Respuesta vacía o inválida. */ }
        return { ok: kc_response.ok, status: kc_response.status, data: kc_data };
    } catch {
        return { ok: false, status: 0, data: {} };
    } finally {
        clearTimeout(kc_timeout);
    }
}

function kc_getErrorMessage(kc_field, kc_value) {
    if (kc_field.required && !kc_value) return `Escribe tu ${kc_field.label}.`;
    if (kc_field.maxLength && kc_value.length > kc_field.maxLength) return `Tu ${kc_field.label} no puede superar ${kc_field.maxLength} caracteres.`;
    if (kc_field.type === "email" && !isValidEmail(kc_value)) return "Escribe un correo con formato válido.";
    if (kc_field.minLength > 0 && !hasMinLength(kc_value, kc_field.minLength)) return `Necesitamos al menos ${kc_field.minLength} caracteres.`;
    return "";
}

export function initContactForm() {
    const kc_form = document.querySelector(DOM_SELECTORS.contactForm);
    const kc_feedback = document.querySelector(DOM_SELECTORS.formFeedback);
    const kc_feedbackText = document.querySelector(DOM_SELECTORS.feedbackText);
    const kc_resetButton = document.querySelector(DOM_SELECTORS.formResetBtn);
    const kc_submitButton = document.querySelector(DOM_SELECTORS.formSubmit);
    if (!kc_form || !kc_feedback || !kc_feedbackText) return;

    function kc_showMessage(kc_message) {
        kc_feedbackText.textContent = kc_message;
        kc_feedback.classList.remove(STATE_CLASSES.hidden);
    }
    function kc_hideMessage() {
        kc_feedback.classList.add(STATE_CLASSES.hidden);
        kc_feedbackText.textContent = "";
    }
    function kc_setFieldError(kc_field, kc_message) {
        const kc_input = kc_form.elements[kc_field.name];
        if (!kc_input) return;
        const kc_errorId = kc_input.getAttribute("aria-describedby");
        const kc_errorNode = kc_errorId ? document.getElementById(kc_errorId) : null;
        kc_input.classList.toggle(STATE_CLASSES.error, Boolean(kc_message));
        kc_input.setAttribute("aria-invalid", String(Boolean(kc_message)));
        if (kc_errorNode) kc_errorNode.textContent = kc_message;
    }
    function kc_validateForm() {
        let kc_firstInvalid = null;
        FORM_FIELDS.forEach((kc_field) => {
            const kc_input = kc_form.elements[kc_field.name];
            if (!kc_input) return;
            const kc_message = kc_getErrorMessage(kc_field, normalizeText(kc_input.value));
            kc_setFieldError(kc_field, kc_message);
            if (kc_message && !kc_firstInvalid) kc_firstInvalid = kc_input;
        });
        return kc_firstInvalid;
    }
    function kc_getSelectedServices() {
        const kc_raw = kc_form.elements.selected_services?.value || "";
        return kc_raw.split(",").map((kc_service) => kc_service.trim()).filter((kc_service) => VALID_SERVICES.includes(kc_service));
    }
    function kc_setBusy(kc_isBusy) {
        if (!kc_submitButton) return;
        if (kc_isBusy) {
            kc_submitButton.dataset.originalText = kc_submitButton.textContent;
            kc_submitButton.textContent = "Enviando…";
            kc_submitButton.disabled = true;
            kc_submitButton.setAttribute("aria-busy", "true");
        } else {
            kc_submitButton.textContent = kc_submitButton.dataset.originalText || "Solicitar Llamada de Descubrimiento";
            kc_submitButton.disabled = false;
            kc_submitButton.removeAttribute("aria-busy");
        }
    }

    kc_form.addEventListener("submit", async (kc_event) => {
        kc_event.preventDefault();
        if (kc_submitButton?.disabled) return;
        const kc_honeypot = kc_form.elements.kc_website_hp;
        if (kc_honeypot && kc_honeypot.value.trim()) return;
        const kc_firstInvalid = kc_validateForm();
        if (kc_firstInvalid) {
            kc_showMessage("Revisa los campos marcados.");
            kc_firstInvalid.focus();
            return;
        }
        const kc_name = normalizeText(kc_form.elements.client_name.value);
        const kc_email = normalizeText(kc_form.elements.client_email.value);
        const kc_services = kc_getSelectedServices();
        const kc_payload = {
            client_name: kc_name,
            client_email: kc_email,
            selected_services: kc_services,
            project_message: kc_form.elements.project_message.value.trim(),
            kc_website_hp: kc_honeypot?.value || ""
        };
        kc_setBusy(true);
        const kc_result = await kc_sendContactRequest(kc_payload);
        kc_setBusy(false);
        if (kc_result.ok && kc_result.data.ok === true) {
            const kc_labels = kc_services.map((kc_service) => SERVICE_LABELS[kc_service]).join(", ");
            const kc_suffix = kc_labels ? ` sobre: ${kc_labels}` : "";
            kc_form.classList.add(STATE_CLASSES.hidden);
            kc_showMessage(`Gracias, ${kc_name}. Recibimos tu solicitud${kc_suffix}. Te escribiremos a ${kc_email} en menos de 24 horas hábiles.`);
            return;
        }
        if (kc_result.status === 400 && kc_result.data.fields) {
            let kc_firstField = null;
            Object.entries(kc_result.data.fields).forEach(([kc_nameField, kc_message]) => {
                const kc_field = FORM_FIELDS.find((kc_item) => kc_item.name === kc_nameField);
                if (!kc_field) return;
                kc_setFieldError(kc_field, String(kc_message));
                kc_firstField ||= kc_form.elements[kc_nameField];
            });
            kc_showMessage("Revisa los campos marcados.");
            kc_firstField?.focus();
        } else if (kc_result.status === 429) {
            kc_showMessage("Recibimos varias solicitudes desde tu conexión. Intenta de nuevo en unos minutos.");
        } else if (kc_result.status === 502) {
            kc_showMessage("Tu solicitud quedó registrada, pero el correo no pudo salir. Intenta de nuevo o escríbenos por los medios de contacto de esta página.");
        } else if (kc_result.status === 503) {
            kc_showMessage("El envío de correo no está configurado todavía. Tu solicitud quedó registrada; escríbenos por los medios de contacto de esta página.");
        } else {
            kc_showMessage("No pudimos enviar tu solicitud. Intenta de nuevo más tarde o escríbenos por los medios de contacto de esta página.");
        }
    });

    if (kc_resetButton) kc_resetButton.addEventListener("click", () => {
        kc_form.reset();
        FORM_FIELDS.forEach((kc_field) => kc_setFieldError(kc_field, ""));
        // service-selector.js limpia las píldoras y su Set con este mismo botón.
        kc_form.classList.remove(STATE_CLASSES.hidden);
        kc_hideMessage();
    });
}
