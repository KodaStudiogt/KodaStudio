/** js/vistas/formulario-contacto.vista.js · Presentación DOM del formulario. */
import { DOM_SELECTORS, FORM_FIELDS, STATE_CLASSES } from "../configuracion/selectores.js";

export function crearVistaFormularioContacto() {
    const kc_form = document.querySelector(DOM_SELECTORS.contactForm);
    const kc_feedback = document.querySelector(DOM_SELECTORS.formFeedback);
    const kc_feedbackText = document.querySelector(DOM_SELECTORS.feedbackText);
    const kc_resetButton = document.querySelector(DOM_SELECTORS.formResetBtn);
    const kc_submitButton = document.querySelector(DOM_SELECTORS.formSubmit);
    if (!kc_form || !kc_feedback || !kc_feedbackText) return null;

    function mostrarMensaje(kc_message) {
        kc_feedbackText.textContent = kc_message;
        kc_feedback.classList.remove(STATE_CLASSES.hidden);
    }
    function ocultarMensaje() {
        kc_feedback.classList.add(STATE_CLASSES.hidden);
        kc_feedbackText.textContent = "";
    }
    function establecerError(kc_field, kc_message) {
        const kc_input = kc_form.elements[kc_field.name];
        if (!kc_input) return;
        const kc_errorId = kc_input.getAttribute("aria-describedby");
        const kc_errorNode = kc_errorId ? document.getElementById(kc_errorId) : null;
        kc_input.classList.toggle(STATE_CLASSES.error, Boolean(kc_message));
        kc_input.setAttribute("aria-invalid", String(Boolean(kc_message)));
        if (kc_errorNode) kc_errorNode.textContent = kc_message;
    }
    function leerValores() {
        return {
            client_name: kc_form.elements.client_name.value,
            client_email: kc_form.elements.client_email.value,
            selected_services: kc_form.elements.selected_services?.value || "",
            project_message: kc_form.elements.project_message.value,
            kc_website_hp: kc_form.elements.kc_website_hp?.value || ""
        };
    }
    function establecerOcupado(kc_isBusy) {
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
    function ocultarFormulario() { kc_form.classList.add(STATE_CLASSES.hidden); }
    function restablecer() {
        kc_form.reset();
        FORM_FIELDS.forEach((kc_field) => establecerError(kc_field, ""));
        // selector-servicios.vista.js limpia las píldoras y su Set con este mismo botón.
        kc_form.classList.remove(STATE_CLASSES.hidden);
        ocultarMensaje();
    }
    return { form: kc_form, resetButton: kc_resetButton, submitButton: kc_submitButton, leerValores, mostrarMensaje, ocultarMensaje, establecerError, establecerOcupado, ocultarFormulario, restablecer };
}
