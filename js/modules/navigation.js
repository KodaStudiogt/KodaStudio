/**
 * js/modules/navigation.js
 * Menú móvil y cierre al navegar por anclas. Dueño: D.
 *
 * Contrato: [data-js="mobile-toggle"], [data-js="mobile-menu"], [data-js="nav-link"].
 * Estado visual: .is-open + aria-expanded.
 */

import { DOM_SELECTORS, STATE_CLASSES } from "../config/selectors.js";

const DESKTOP_QUERY = "(min-width: 48rem)";

export function initNavigation() {
    const toggle = document.querySelector(DOM_SELECTORS.mobileToggle);
    const menu = document.querySelector(DOM_SELECTORS.mobileMenu);

    if (!toggle || !menu) return;

    const links = document.querySelectorAll(DOM_SELECTORS.navLinks);

    function setOpen(isOpen) {
        menu.classList.toggle(STATE_CLASSES.open, isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
    }

    function isOpen() {
        return toggle.getAttribute("aria-expanded") === "true";
    }

    toggle.addEventListener("click", () => setOpen(!isOpen()));

    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (isOpen()) setOpen(false);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || !isOpen()) return;
        setOpen(false);
        toggle.focus();
    });

    // El menú móvil no debe quedar abierto al pasar a escritorio.
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    desktopQuery.addEventListener("change", (event) => {
        if (event.matches) setOpen(false);
    });
}
