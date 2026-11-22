/**
 * js/configuracion/selectores.js
 * Única fuente de verdad para selectores DOM y constantes globales en JS.
 * Dueño: compartido. Se modifica solo por PR avisado (estándar §6.3).
 *
 * Regla 2: JS nunca selecciona elementos por clase visual.
 * Solo por estos data-js-*, por ids reservados o por name de formulario.
 */

export const DOM_SELECTORS = Object.freeze({
    navbar: "#navbar",
    mobileToggle: '[data-js="mobile-toggle"]',
    mobileMenu: '[data-js="mobile-menu"]',
    navLinks: '[data-js="nav-link"]',
    revealItems: '[data-js="reveal"]',
    revealChildren: '[data-js="reveal-child"]',
    servicePills: '[data-js="service-pill"]',
    serviceHiddenInput: '[data-js="service-value"]',
    contactForm: '[data-js="contact-form"]',
    formFeedback: '[data-js="form-feedback"]',
    feedbackText: '[data-js="feedback-text"]',
    formResetBtn: '[data-js="form-reset"]',
    formSubmit: '[data-js="form-submit"]',
    currentYear: '[data-js="current-year"]'
});

/** Edge Function de Supabase (proyecto kodastudio). Local: http://127.0.0.1:54321/functions/v1/contact */
export const CONTACT_ENDPOINT = "https://dglmtxbkfwjchxigmavc.supabase.co/functions/v1/contact";
export const CONTACT_TIMEOUT_MS = 12000;

/**
 * Clases de estado controladas por JS (estándar §3.3).
 * `pending` es una extensión aprobada: permite que el contenido se vea sin JS
 * y solo se oculte cuando el observador ya está activo (mejora progresiva).
 * Ver decisión D-08.
 */
export const STATE_CLASSES = Object.freeze({
    open: "is-open",
    visible: "is-visible",
    selected: "is-selected",
    hidden: "is-hidden",
    error: "has-error",
    pending: "is-pending",
    scrolled: "is-scrolled"
});

/** Umbral de IntersectionObserver para reveal (spec §3.1). */
export const REVEAL_THRESHOLD = 0.12;

/**
 * Metadatos de validación del formulario. Los `name` son el contrato del
 * estándar §5: deben coincidir con el HTML y con el backend.
 */
export const FORM_FIELDS = Object.freeze([
    { name: "client_name", label: "nombre completo", type: "text", required: true, minLength: 2, maxLength: 120 },
    { name: "client_email", label: "correo corporativo", type: "email", required: true, minLength: 0, maxLength: 254 },
    { name: "project_message", label: "descripción del proyecto", type: "text", required: true, minLength: 10, maxLength: 5000 }
]);
