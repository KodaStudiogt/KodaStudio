/** js/vistas/selector-servicios.vista.js · Presentación DOM de píldoras. */
import { DOM_SELECTORS, STATE_CLASSES } from "../configuracion/selectores.js";

export function crearVistaSelectorServicios() {
    const pills = Array.from(document.querySelectorAll(DOM_SELECTORS.servicePills));
    const hiddenInput = document.querySelector(DOM_SELECTORS.serviceHiddenInput);
    const resetButton = document.querySelector(DOM_SELECTORS.formResetBtn);
    function establecerSeleccion(pill, isSelected) {
        pill.classList.toggle(STATE_CLASSES.selected, isSelected);
        pill.setAttribute("aria-pressed", String(isSelected));
    }
    function actualizarValores(selectedServices) {
        if (hiddenInput) hiddenInput.value = Array.from(selectedServices).join(", ");
    }
    return { pills, hiddenInput, resetButton, establecerSeleccion, actualizarValores };
}
