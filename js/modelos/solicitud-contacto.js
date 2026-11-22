/** js/modelos/solicitud-contacto.js · Validación y envío sin acceso al DOM. */
import { CONTACT_ENDPOINT, CONTACT_TIMEOUT_MS, FORM_FIELDS } from "../configuracion/selectores.js";
import { VALID_SERVICES } from "./servicios.js";
import { isValidEmail, normalizeText, hasMinLength } from "../utilidades/validacion.js";

export async function kc_sendContactRequest(kc_payload) {
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

export function kc_getErrorMessage(kc_field, kc_value) {
    if (kc_field.required && !kc_value) return `Escribe tu ${kc_field.label}.`;
    if (kc_field.maxLength && kc_value.length > kc_field.maxLength) return `Tu ${kc_field.label} no puede superar ${kc_field.maxLength} caracteres.`;
    if (kc_field.type === "email" && !isValidEmail(kc_value)) return "Escribe un correo con formato válido.";
    if (kc_field.minLength > 0 && !hasMinLength(kc_value, kc_field.minLength)) return `Necesitamos al menos ${kc_field.minLength} caracteres.`;
    return "";
}

export function kc_validateContactValues(kc_values) {
    return FORM_FIELDS.reduce((kc_errors, kc_field) => {
        const kc_value = normalizeText(kc_values[kc_field.name] || "");
        const kc_message = kc_getErrorMessage(kc_field, kc_value);
        if (kc_message) kc_errors[kc_field.name] = kc_message;
        return kc_errors;
    }, {});
}

export function kc_createContactPayload(kc_values) {
    return {
        client_name: normalizeText(kc_values.client_name),
        client_email: normalizeText(kc_values.client_email),
        selected_services: (kc_values.selected_services || "").split(",").map((kc_service) => kc_service.trim()).filter((kc_service) => VALID_SERVICES.includes(kc_service)),
        project_message: (kc_values.project_message || "").trim(),
        kc_website_hp: kc_values.kc_website_hp || ""
    };
}
