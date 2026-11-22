/** js/vistas/pie-de-pagina.vista.js · Presentación del año de copyright. */
import { DOM_SELECTORS } from "../configuracion/selectores.js";
export function iniciarVistaPieDePagina() {
    const yearElement = document.querySelector(DOM_SELECTORS.currentYear);
    if (yearElement) yearElement.textContent = String(new Date().getFullYear());
}
