/**
 * js/main.js
 * Punto de entrada. Dueño compartido: congelado, no se modifica al programar
 * los módulos (estándar §6.3). Solo importa e inicializa.
 */

import { initNavigation } from "./modules/navigation.js";
import { initReveal } from "./modules/reveal.js";
import { initServiceSelector } from "./modules/service-selector.js";
import { initContactForm } from "./modules/contact-form.js";
import { initFooter } from "./modules/footer.js";

// Los módulos son scripts diferidos: el DOM ya está disponible al ejecutarse.
initNavigation();
initReveal();
initServiceSelector();
initContactForm();
initFooter();
