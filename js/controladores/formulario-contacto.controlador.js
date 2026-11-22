/** js/controladores/formulario-contacto.controlador.js · Flujo del formulario. */
import { FORM_FIELDS } from "../configuracion/selectores.js";
import { SERVICE_LABELS } from "../modelos/servicios.js";
import { kc_createContactPayload, kc_sendContactRequest, kc_validateContactValues } from "../modelos/solicitud-contacto.js";
import { crearVistaFormularioContacto } from "../vistas/formulario-contacto.vista.js";

export function iniciarFormularioContacto() {
    const kc_vista = crearVistaFormularioContacto();
    if (!kc_vista) return;
    const { form: kc_form, resetButton: kc_resetButton, submitButton: kc_submitButton } = kc_vista;
    kc_form.addEventListener("submit", async (kc_event) => {
        kc_event.preventDefault();
        if (kc_submitButton?.disabled) return;
        const kc_values = kc_vista.leerValores();
        if (kc_values.kc_website_hp.trim()) return;
        const kc_errors = kc_validateContactValues(kc_values);
        const kc_firstInvalidName = FORM_FIELDS.find((kc_field) => kc_errors[kc_field.name])?.name;
        FORM_FIELDS.forEach((kc_field) => kc_vista.establecerError(kc_field, kc_errors[kc_field.name] || ""));
        if (kc_firstInvalidName) {
            kc_vista.mostrarMensaje("Revisa los campos marcados.");
            kc_form.elements[kc_firstInvalidName].focus();
            return;
        }
        const kc_payload = kc_createContactPayload(kc_values);
        kc_vista.establecerOcupado(true);
        const kc_result = await kc_sendContactRequest(kc_payload);
        kc_vista.establecerOcupado(false);
        if (kc_result.ok && kc_result.data.ok === true) {
            const kc_labels = kc_payload.selected_services.map((kc_service) => SERVICE_LABELS[kc_service]).join(", ");
            const kc_suffix = kc_labels ? ` sobre: ${kc_labels}` : "";
            kc_vista.ocultarFormulario();
            kc_vista.mostrarMensaje(`Gracias, ${kc_payload.client_name}. Recibimos tu solicitud${kc_suffix}. Te escribiremos a ${kc_payload.client_email} en menos de 24 horas hábiles.`);
            return;
        }
        if (kc_result.status === 400 && kc_result.data.fields) {
            let kc_firstField = null;
            Object.entries(kc_result.data.fields).forEach(([kc_nameField, kc_message]) => {
                const kc_field = FORM_FIELDS.find((kc_item) => kc_item.name === kc_nameField);
                if (!kc_field) return;
                kc_vista.establecerError(kc_field, String(kc_message));
                kc_firstField ||= kc_form.elements[kc_nameField];
            });
            kc_vista.mostrarMensaje("Revisa los campos marcados.");
            kc_firstField?.focus();
        } else if (kc_result.status === 429) {
            kc_vista.mostrarMensaje("Recibimos varias solicitudes desde tu conexión. Intenta de nuevo en unos minutos.");
        } else if (kc_result.status === 502) {
            kc_vista.mostrarMensaje("Tu solicitud quedó registrada, pero el correo no pudo salir. Intenta de nuevo o escríbenos por los medios de contacto de esta página.");
        } else if (kc_result.status === 503) {
            kc_vista.mostrarMensaje("El envío de correo no está configurado todavía. Tu solicitud quedó registrada; escríbenos por los medios de contacto de esta página.");
        } else {
            kc_vista.mostrarMensaje("No pudimos enviar tu solicitud. Intenta de nuevo más tarde o escríbenos por los medios de contacto de esta página.");
        }
    });
    if (kc_resetButton) kc_resetButton.addEventListener("click", () => kc_vista.restablecer());
}
