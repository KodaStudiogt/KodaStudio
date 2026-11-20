# Backlog — Landing Page Koda Studio

> Cada fila es una tarea cerrable. **Estimación en jornadas de trabajo efectivo** (1 j ≈ 6–8 h de foco).
>
> **Estado:** ✅ Hecho · 🟡 Base lista (funciona y cumple el contrato, falta acabado fino) · ⚪ Pendiente · ⛔ Bloqueado por decisión
>
> **Última actualización:** 2026-11-19 · **Corte:** CH-002 (ver [`changelog.md`](./changelog.md))

---

## Sprint 0 — Contrato y arranque

| ID | Tarea | Dueño | Est. | Estado | Criterio de aceptación |
| --- | --- | --- | --- | --- | --- |
| T-01 | Repositorio, ramas `main`/`develop` y remoto | D | 0,25 | ✅ | Remoto activo y `develop` publicado |
| T-02 | Alinear el contrato: `index.html`, `variables.css`, `selectors.js`, `main.js` | Ambos | 0,25 | ✅ | Un solo contrato de nombres, sin selectores por clase visual |
| T-03 | Cerrar decisiones D-01 a D-08 | Ambos | 0,5 | ⚪ | Cada decisión con estado y responsable |
| T-04 | Activos de marca: logo SVG, favicon, imágenes | Ambos | 0,25 | ⚪ | Archivos en `assets/` o sustituto temporal acordado |
| T-05 | Verificar el esqueleto con servidor local | Ambos | 0,1 | ✅ | Consola limpia, año del footer correcto, 6 anclas presentes |

---

## Sprint 1 — Identidad visual y acabado

*Ramas: `feature/header-hero` (D) · `feature/services-polish` (A).*

| ID | Tarea | Dueño | Est. | Estado | Criterio de aceptación |
| --- | --- | --- | --- | --- | --- |
| T-10 | `typography.css`: escala tipográfica y estilos base | D | 0,25 | 🟡 | Todos los títulos usan `--font-heading`; falta aplicar D-07 |
| T-11 | `header.css`: simetría del grid de 3 columnas y sticky translúcido | D | 0,5 | 🟡 | En escritorio, enlaces a los lados y marca centrada al píxel |
| T-12 | Medallón táctil + isotipo vectorial (SVG) | D | 0,25 | 🟡 | Monograma real integrado desde el JPEG; falta la versión SVG para nitidez total (D-05) |
| T-13 | `navigation.js`: toggle, `aria-expanded`, cierre al navegar, Escape | D | — | ✅ | También cierra al pasar a escritorio |
| T-14 | Hero: acabado editorial y textura de papel | D | 0,5 | 🟡 | Estructura, copy, CTAs y pilares listos; falta `.paper-texture` |
| T-15 | `cards.css`: `.editorial-card` y elevación al hover | A | — | ✅ | `translateY(-6px)` y sombra elevada con tokens |
| T-16 | `#servicios`: contenido de las 4 tarjetas | A | — | ✅ | Texto completo de spec §2.D |
| T-17 | Grid de servicios 2×2 → 1 columna + numeración 01–04 | A | — | ✅ | Correcto en 375 / 768 / 1440 px |
| T-18 | `service-selector.css`: píldoras y estado `.is-selected` | A | — | ✅ | Se distingue sin depender solo del color (✓) |

---

## Sprint 2 — Esencia y contacto

*Ramas: `feature/essence-polish` (D) · `feature/contact-form-ui` (A).*

| ID | Tarea | Dueño | Est. | Estado | Criterio de aceptación |
| --- | --- | --- | --- | --- | --- |
| T-20 | `#esencia`: fondo `linen-dark` y grid 12 columnas (historia 4/8) | D | — | ✅ | Proporciones sostenidas en tablet y móvil |
| T-21 | Misión y Visión con etiqueta, cita y pie numerado | D | — | ✅ | Contenido literal de spec §2.C |
| T-22 | `footer.css` + `footer.js` con año dinámico | D | 0,5 | 🟡 | Falta pulido de la fila superior y del isotipo |
| T-23 | `#contacto`: layout 5/7 sobre `--color-plum` | A | 0,5 | 🟡 | Falta revisar contraste real de textos secundarios |
| T-24 | `forms.css`: inputs, foco, `.has-error`, confirmación | A | 0,5 | 🟡 | Falta auditoría de contraste AA sobre fondo claro |
| T-25 | Formulario HTML accesible con contrato de `name`/`id` | A | — | ✅ | Honeypot presente y `aria-describedby` en cada campo |
| T-26 | `service-selector.js`: `Set()`, `aria-pressed`, input hidden | A | — | ✅ | Quitar una píldora actualiza `selected_services` |

---

## Sprint 3 — Envío real

*Ramas: `feature/form-endpoint` (A) · `fix/reveal-tuning` (D).*

| ID | Tarea | Dueño | Est. | Estado | Criterio de aceptación |
| --- | --- | --- | --- | --- | --- |
| T-30 | `reveal.js` con `IntersectionObserver` (0.12) y `.is-visible` | D | — | ✅ | Aparece una sola vez; sin soporte, el contenido se ve |
| T-31 | `responsive.css`: breakpoints de tablet y móvil | D | — | ✅ | Sin scroll horizontal en 320 px |
| T-32 | `buttons.css`: primario, secundario, hover, foco, disabled | D | 0,25 | 🟡 | Revisar el botón sobre fondo plum |
| T-33 | Validación inline con `validation.js` y mensajes por campo | A | — | ✅ | Campo vacío, correo inválido y texto corto señalados |
| T-34 | Endpoint de recepción + `fetch` + honeypot + error de red | A | 1,25 | ⛔ | Un envío real llega al destino; un fallo muestra error |
| T-35 | Confirmación con nombre y servicios + reinicio del formulario | A | 0,5 | ⛔ | Solo aparece con respuesta exitosa del endpoint |

**Estado actual del formulario:** valida correctamente y muestra un mensaje **honesto** que aclara que el envío no está conectado. Es intencional: no se finge éxito.

---

## Sprint 4 — QA y publicación

| ID | Tarea | Dueño | Est. | Estado | Criterio de aceptación |
| --- | --- | --- | --- | --- | --- |
| T-40 | Auditoría de accesibilidad: teclado, contraste, landmarks | Ambos | 0,75 | ⚪ | Recorrido completo con Tab sin trampas de foco |
| T-41 | Matriz de pruebas 375/768/1440 en Chrome, Firefox y Safari | Ambos | 0,75 | ⚪ | Sin defectos bloqueantes |
| T-42 | Rendimiento: fuentes, imágenes, Lighthouse ≥ 90 | D | 0,5 | ⚪ | Informe guardado en `docs/` |
| T-43 | SEO: `title`, `description`, Open Graph, favicon | D | 0,5 | ⚪ | Vista previa correcta al compartir |
| T-44 | Deploy, dominio, HTTPS y buzón del correo | A | 0,75 | ⚪ | URL pública con candado y correo que responde |
| T-45 | Aviso de privacidad en el footer (si D-04 lo exige) | A | 0,25 | ⚪ | Enlace visible y texto aprobado |
| T-46 | PR `develop` → `main`, tag `v1.0.0` y checklist de aceptación | Ambos | 0,25 | ⚪ | `main` solo contiene lo publicado |

---

## Vista por persona

### Pendientes de D

| ID | Tarea | Est. | Depende de |
| --- | --- | --- | --- |
| T-03 | Cerrar decisiones D-01 a D-08 | 0,25 | Acuerdo con A |
| T-04 | Activos de marca | 0,25 | D-05 |
| T-10 | Aplicar escala tipográfica (D-07) | 0,25 | D-07 |
| T-11 | Acabado del header simétrico | 0,5 | — |
| T-12 | Isotipo SVG definitivo | 1,0 | D-05 |
| T-14 | Textura de papel y acabado del Hero | 0,5 | — |
| T-22 | Pulido del footer | 0,5 | — |
| T-32 | Botón sobre fondo plum | 0,25 | — |
| T-40 | Auditoría de accesibilidad | 0,75 | T-34 |
| T-41 | Matriz de pruebas | 0,75 | T-34 |
| T-42 | Rendimiento y Lighthouse | 0,5 | T-41 |
| T-43 | SEO y metadatos | 0,5 | T-41 |
| T-46 | PR a `main` y tag | 0,25 | T-44 |

### Pendientes de A

| ID | Tarea | Est. | Depende de |
| --- | --- | --- | --- |
| T-03 | Cerrar decisiones D-01 a D-08 | 0,25 | Acuerdo con D |
| T-04 | Activos de marca | 0,25 | D-05 |
| T-23 | Contraste de `#contacto` | 0,5 | — |
| T-24 | Contraste AA del formulario | 0,5 | — |
| T-34 | Endpoint de recepción | 1,25 | **D-02** |
| T-35 | Confirmación real y reinicio | 0,5 | T-34 |
| T-40 | Auditoría de accesibilidad | 0,75 | T-34 |
| T-41 | Matriz de pruebas | 0,75 | T-34 |
| T-44 | Deploy, dominio y correo | 0,75 | D-01, D-03 |
| T-45 | Aviso de privacidad | 0,25 | D-04 |
| T-46 | PR a `main` y tag | 0,25 | T-44 |

---

## Mapeo ramas → User Histories

| Orden | Rama | Tipo | User History |
| --- | --- | --- | --- |
| 1 | `feature/base-structure` | Funcionalidad | [US-01](https://github.com/mxrtinez10/KodaStudio/issues/2) |
| 2 | `design/design-system` | Diseño | [US-01](https://github.com/mxrtinez10/KodaStudio/issues/2) |
| 3 | `feature/navbar` | Funcionalidad | [US-02](https://github.com/mxrtinez10/KodaStudio/issues/3) |
| 4 | `design/homepage` | Diseño | [US-02](https://github.com/mxrtinez10/KodaStudio/issues/3) |
| 5 | `feature/contact-form` | Funcionalidad | [US-03](https://github.com/mxrtinez10/KodaStudio/issues/4) |
| 6 | `design/responsive` | Diseño | [US-02](https://github.com/mxrtinez10/KodaStudio/issues/3) |
| 7 | `feature/footer` | Funcionalidad | [US-02](https://github.com/mxrtinez10/KodaStudio/issues/3) |
| 8 | `docs/work-plan` | Documentación | [US-04](https://github.com/mxrtinez10/KodaStudio/issues/5) |

---

## Resumen

| Sprint | Restante D | Restante A |
| --- | --- | --- |
| S0 | 0,5 | 0,5 |
| S1 | 2,25 | 0 |
| S2 | 0,5 | 1,0 |
| S3 | 0,25 | 1,75 |
| S4 | 2,75 | 2,75 |
| **Total** | **≈ 6,25** | **≈ 6,0** |

Si el calendario aprieta, el recorte recomendado es T-12 (mantener el marcador geométrico), T-43 y T-45. **Nunca** recortar T-34 ni T-33: son el corazón del producto.
