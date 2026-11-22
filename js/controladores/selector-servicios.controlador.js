/** js/controladores/selector-servicios.controlador.js · Estado y eventos. */
import { VALID_SERVICES } from "../modelos/servicios.js";
import { crearVistaSelectorServicios } from "../vistas/selector-servicios.vista.js";

export function iniciarSelectorServicios() {
    const kc_vista = crearVistaSelectorServicios();
    const { pills, hiddenInput, resetButton } = kc_vista;
    if (!pills.length || !hiddenInput) return;
    const selectedServices = new Set();
    function clearAll() {
        selectedServices.clear();
        pills.forEach((pill) => kc_vista.establecerSeleccion(pill, false));
        kc_vista.actualizarValores(selectedServices);
    }
    pills.forEach((pill) => {
        const service = pill.dataset.serviceValue;
        if (!VALID_SERVICES.includes(service)) return;
        pill.addEventListener("click", () => {
            if (selectedServices.has(service)) selectedServices.delete(service);
            else selectedServices.add(service);
            kc_vista.establecerSeleccion(pill, selectedServices.has(service));
            kc_vista.actualizarValores(selectedServices);
        });
    });
    if (resetButton) resetButton.addEventListener("click", clearAll);
    kc_vista.actualizarValores(selectedServices);
}
