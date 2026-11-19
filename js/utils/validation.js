/**
 * js/utils/validation.js
 * Funciones puras de validación. Dueño: A.
 * No tocan el DOM, no muestran mensajes, no envían nada.
 */

/**
 * Comprueba el formato básico de un correo.
 * @param {string} value
 * @returns {boolean}
 */
export function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

/**
 * Comprueba la longitud mínima de un texto.
 * @param {string} value
 * @param {number} minLength
 * @returns {boolean}
 */
export function hasMinLength(value, minLength) {
    return String(value).trim().length >= minLength;
}

/**
 * Recorta extremos y colapsa espacios repetidos.
 * @param {string} value
 * @returns {string}
 */
export function normalizeText(value) {
    return String(value).trim().replace(/\s+/g, " ");
}
