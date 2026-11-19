/**
 * js/modules/service-selector.js
 * Selección múltiple de soluciones. Dueño: A.
 *
 * Contrato: [data-js="service-pill"] con data-service-value + aria-pressed,
 * y [data-js="service-value"] como input hidden.
 * Solo se aceptan valores presentes en VALID_SERVICES.
 */

import { DOM_SELECTORS, STATE_CLASSES, VALID_SERVICES } from "../config/selectors.js";

export function initServiceSelector() {
    const pills = Array.from(document.querySelectorAll(DOM_SELECTORS.servicePills));
    const hiddenInput = document.querySelector(DOM_SELECTORS.serviceHiddenInput);
    const resetButton = document.querySelector(DOM_SELECTORS.formResetBtn);

    if (!pills.length || !hiddenInput) return;

    const selectedServices = new Set();

    function syncHiddenInput() {
        hiddenInput.value = Array.from(selectedServices).join(", ");
    }

    function setSelected(pill, isSelected) {
        pill.classList.toggle(STATE_CLASSES.selected, isSelected);
        pill.setAttribute("aria-pressed", String(isSelected));
    }

    function clearAll() {
        selectedServices.clear();
        pills.forEach((pill) => setSelected(pill, false));
        syncHiddenInput();
    }

    pills.forEach((pill) => {
        const service = pill.dataset.serviceValue;

        if (!VALID_SERVICES.includes(service)) return;

        pill.addEventListener("click", () => {
            if (selectedServices.has(service)) {
                selectedServices.delete(service);
            } else {
                selectedServices.add(service);
            }

            setSelected(pill, selectedServices.has(service));
            syncHiddenInput();
        });
    });

    // El botón de reinicio del formulario también limpia la selección.
    if (resetButton) resetButton.addEventListener("click", clearAll);

    syncHiddenInput();
}
