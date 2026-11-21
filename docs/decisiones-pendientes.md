# Decisiones pendientes antes de publicar

> Los documentos de diseño dejan puntos abiertos a propósito. Cada uno bloquea una tarea del backlog: si no se decide, alguien se queda esperando.
> **Regla:** una decisión se escribe aquí con fecha, responsable y estado. Decidir "por ahora A y se revisa" es válido; dejarlo sin escribir, no.
>
> **Última actualización:** 2026-11-20 · **Corte:** CH-005

## Tablero

| ID | Decisión | Responsable | Bloquea | Límite | Estado |
| --- | --- | --- | --- | --- | --- |
| D-01 | Hosting / despliegue | Ambos | T-44 | Antes de S4 | 🟡 Tendencia A: hosting estático |
| D-02 | Recepción del formulario | A (propone) · D confirma | T-34, T-35 | **Inicio de S3** | ✅ Aceptada (2026-11-20) |
| D-03 | Dominio y correo | Ambos | T-44, T-23 | Antes de S4 | ⚪ Pendiente |
| D-04 | Analítica y privacidad | A | T-45 | Inicio de S4 | ⚪ Pendiente |
| D-05 | Activos de marca | D | T-04, T-12 | Antes de S1 | ⚪ Pendiente |
| D-06 | Etiquetas visibles de las píldoras | A (revisa) | T-18 | — | 🟡 Implementada, sin confirmar |
| D-07 | Escala compartida de espaciado y tipografía | Ambos | T-10 | Antes de S1 | ⚪ Pendiente |
| D-08 | Clase de estado `.is-pending` | A (revisa) | Reveal | — | 🟡 Implementada, sin confirmar |

**La decisión de recepción D-02 está cerrada;** D-05 (isotipo) sigue abierta.

---

## D-01 · ¿Dónde se publica?

**Contexto:** la arquitectura no define hosting. La elección condiciona D-02: **si el sitio es estático, no hay PHP**.

| Opción | Ventajas | Costos | Compatible con PHP |
| --- | --- | --- | --- |
| A. Hosting estático (Netlify, Vercel, Cloudflare Pages) | Deploy por Git, HTTPS y CDN gratis, cero mantenimiento | Requiere servicio externo para el formulario | ❌ |
| B. Hosting compartido con PHP (cPanel) | PHP y correo en el mismo lugar | Más lento; HTTPS y respaldos manuales | ✅ |
| C. VPS propio | Flexibilidad total | Costo y mantenimiento alto para una landing | ✅ |

**Recomendación:** **A**. Un sitio estático con CDN es la opción más rápida, segura y barata; el formulario se resuelve con D-02 en su variante de servicio.

---

## D-02 · ¿Cómo llegan las solicitudes del formulario? — ✅ Aceptada

**Es la decisión más crítica del proyecto.** La arquitectura es explícita: no se puede mostrar confirmación si el dato no llegó a un destino real. "Parece que se envió" es peor que un error visible.

| Opción | Cómo funciona | Esfuerzo | Spam |
| --- | --- | --- | --- |
| A. Servicio de formularios (Formspree, Web3Forms, FormSubmit) | `fetch` al endpoint del proveedor | Bajo (≈1 h + verificación) | Medio, con captcha integrado |
| B. PHP propio (`procesar_contacto.php`) | `mail()` o SMTP + validación server-side | Medio (≈1,25 j) | Bajo con honeypot + rate limit |
| C. Webhook a automatización (n8n, Make, Zapier) | `fetch` a un webhook que guarda en hoja de cálculo o CRM | Bajo–medio | Medio |
| D. Base de datos propia | PHP + MySQL, panel para leer prospectos | Alto | Bajo |

**Decisión (2026-11-20):** Supabase Postgres guarda solicitudes y proyectos; una Supabase Edge Function valida y coordina el envío; Resend entrega el correo. El destino solo se configura mediante el secreto `CONTACT_TO_EMAIL`. El esquema central se mantiene portable a Postgres; las políticas de acceso Supabase van en una migración separada.

**Requisito común:** aislar el envío en una sola función dentro de `contact-form.js`, de modo que cambiar de proveedor sea editar una función y no reescribir el módulo. Validar también en el servidor.

**Datos que se envían:** `client_name`, `client_email`, `selected_services`, `project_message`, `kc_website_hp` (debe llegar vacío).

**Estado actual:** endpoint y persistencia implementados. Quedan configuración de secretos, verificación del dominio remitente y deploy antes de producción.

---

## D-03 · Dominio y correo

**Contexto:** el sitio publica `hola@kodastudio.com` como dato de contacto (spec §2.E). **Ese buzón es hoy un supuesto, no un hecho.** Las solicitudes del formulario llegan a otro buzón, configurado solo como secreto `CONTACT_TO_EMAIL` (nunca en el repo).

- [ ] ¿`kodastudio.com` está comprado y a nombre de quién?
- [ ] ¿El buzón `hola@kodastudio.com` existe y alguien lo revisa?
- [ ] Si el dominio final es otro, actualizar el `mailto:` del `#contacto` y el remitente del formulario.
- [ ] ¿Quién administra el DNS (necesario para deploy y correo)?
- [ ] ¿Correo del hosting o Google Workspace / Zoho?

**Riesgo si no se decide:** se publica con un correo que no existe y se pierden solicitudes.

---

## D-04 · Analítica y privacidad

**Opciones:** (a) sin analítica, (b) analítica sin cookies (Plausible, Umami, Vercel Analytics), (c) Google Analytics 4.

**Recomendación:** (b). Mide lo necesario sin banner de cookies. Si se recogen datos personales en el formulario, agregar aviso de privacidad enlazado en el footer. **Si eligen (c), el banner deja de ser opcional.**

---

## D-05 · Activos de marca

| Activo | Formato | Uso | Estado |
| --- | --- | --- | --- |
| Isotipo (K + circuito + `/`) | SVG | Medallón del header, footer, favicon | ⚪ Pendiente (hoy hay marcador geométrico) |
| Logotipo con texto | SVG | Footer y metadatos | ⚪ Pendiente |
| Favicon | SVG + PNG 32/192 | Pestaña y móvil | ⚪ Pendiente |
| Patrón de fondo del Hero | WebP ≤ 200 KB | `.paper-texture` | ⚪ Pendiente |
| Imágenes de tarjetas (si aplica) | WebP | `#servicios` | ⚪ Pendiente |

**Mientras no existan:** el header funciona con el marcador `navbar__mark` (una K geométrica en SVG); sustituirlo es un cambio de un solo bloque.

---

## D-06 · Etiquetas visibles de las píldoras

**Conflicto:** el estándar define `VALID_SERVICES` con nombres largos ("Desarrollo Web de Alta Gama"); la spec muestra píldoras cortas ("Desarrollo Web").

**Resolución aplicada en CH-001:** valor y etiqueta separados.

- `data-service-value` = valor canónico de `VALID_SERVICES`: es lo que viaja al servidor y lo que valida JS.
- Texto visible de la píldora = etiqueta corta.
- `SERVICE_LABELS` traduce valor → etiqueta para el mensaje de confirmación.

**A confirmar por A:** que la confirmación use etiquetas cortas (recomendado). Si prefieren los nombres largos, se usa el valor canónico.

---

## D-07 · Escala compartida de espaciado y tipografía

**Problema:** el estándar obliga a usar tokens para color, fuente y radios, pero **no define espaciado ni tamaños de texto**. Sin ellos, D y A escribirán `padding: 24px` y `padding: 1.5rem` en paralelo y la página se verá desalineada aunque ambos "cumplan".

**Propuesta:** aprobar la escala `--kc-space-*`, `--kc-text-*` y `--kc-container` que está escrita, comentada, al final de `css/base/variables.css`.

**Estado real hoy:** hay tamaños literales en `typography.css` y valores de espaciado en los CSS de layout. Funcionan, pero es la deuda técnica más visible del proyecto para D.

---

## D-08 · Clase de estado `.is-pending`

**Contexto:** la spec pide `.reveal { opacity: 0 }` como estado inicial. Si JS falla o el usuario tiene JS desactivado, **el contenido queda invisible para siempre**, lo que rompe la progresividad que exige la arquitectura (§1.7).

**Resolución aplicada en CH-001:** el contenido es visible por defecto. `reveal.js` agrega `.is-pending` solo cuando `IntersectionObserver` está disponible y la retira al intersectar (entonces aplica `.is-visible`).

**Costo:** una clase de estado más en `STATE_CLASSES`, fuera de las cinco del estándar §3.3. **A confirmar por A.**

---

## Cómo registrar una decisión nueva

```markdown
## D-09 · Título

**Contexto:** por qué aparece.
**Opciones:** A / B / C con ventajas y costos.
**Decisión:** la elegida.
**Responsable:** D / A.
**Fecha:** AAAA-MM-DD.
**Consecuencias:** qué tareas cambian.
```

Al cerrarla: actualizar el tablero, cambiar el estado a ✅ Aceptada, anotar la fecha y registrar el cambio en [`changelog.md`](./changelog.md) si afecta al código.
