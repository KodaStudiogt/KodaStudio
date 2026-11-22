/**
 * js/principal.js
 * Punto de entrada. Dueño compartido: congelado, no se modifica al programar
 * los módulos (estándar §6.3). Solo importa e inicializa.
 */

import { iniciarNavegacion } from "./controladores/navegacion.controlador.js";
import { iniciarRevelado } from "./controladores/revelado.controlador.js";
import { iniciarSelectorServicios } from "./controladores/selector-servicios.controlador.js";
import { iniciarFormularioContacto } from "./controladores/formulario-contacto.controlador.js";
import { iniciarPieDePagina } from "./controladores/pie-de-pagina.controlador.js";

// Los módulos son scripts diferidos: el DOM ya está disponible al ejecutarse.
iniciarNavegacion();
iniciarRevelado();
iniciarSelectorServicios();
iniciarFormularioContacto();
iniciarPieDePagina();
