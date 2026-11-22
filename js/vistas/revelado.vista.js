/** js/vistas/revelado.vista.js · Efecto visual de aparición por viewport. */
import { DOM_SELECTORS, STATE_CLASSES, REVEAL_THRESHOLD } from "../configuracion/selectores.js";
export function iniciarVistaRevelado() {
    const items = document.querySelectorAll(DOM_SELECTORS.revealItems);
    if (!items.length || !("IntersectionObserver" in window)) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const kc_hero = document.querySelector("#inicio");
    if (kc_hero) kc_hero.classList.add(STATE_CLASSES.visible);
    if (prefersReducedMotion) { items.forEach((item) => item.classList.add(STATE_CLASSES.visible)); return; }
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove(STATE_CLASSES.pending);
            entry.target.classList.add(STATE_CLASSES.visible);
            entry.target.querySelectorAll(DOM_SELECTORS.revealChildren).forEach((kc_child, kc_index) => {
                kc_child.style.setProperty("--kc-reveal-delay", `${Math.min(kc_index * 90, 450)}ms`);
            });
            currentObserver.unobserve(entry.target);
        });
    }, { threshold: REVEAL_THRESHOLD });
    items.forEach((item) => {
        if (item === kc_hero) return;
        item.classList.add(STATE_CLASSES.pending);
        observer.observe(item);
    });
}
