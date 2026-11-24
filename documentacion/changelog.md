# Bitácora de cambios — Koda Studio

> Registro cronológico de lo que se ha hecho en el proyecto. **Se actualiza en cada entrega**, no solo en los hitos.
> **Última actualización:** 2026-11-23. Rediseño con el sistema de `DESIGN.md` y la paleta Koda, sección Proyectos y adaptación móvil (CH-011, en rama `diseno_actualizado`, PR a `main`).

## Convención

- **CH-000** es la línea base heredada; las siguientes se numeran de forma ascendente.
- Cada entrada indica **tipo**, **alcance**, **verificación** y lo que deja **pendiente**.
- El hash de commit se anota cuando la entrada ya está integrada. La entrada más reciente puede no tenerlo todavía.
- Lo que no se verificó no se escribe como hecho. Si algo quedó a medias, se dice.

## Resumen de entregas

| ID | Fecha | Tipo | Resumen | Ref. |
| --- | --- | --- | --- | --- |
| CH-011 | 2026-11-23 | `design` | Rediseño estilo `DESIGN.md` con paleta Koda, sección Proyectos y móvil | Rama `diseno_actualizado` (`195d2f7`…) |
| CH-010 | 2026-11-22 | `chore` | Proyecto Vercel nuevo `koda-studio` con encabezados de seguridad y dominio permitido en la función | `37bd642` |
| CH-009 | 2026-11-22 | `fix` + `refactor` + `docs` | Sincronización con PR #24–#26, formulario global en el proyecto Supabase de Diego y estructura MVC en español | `206c0df`, `c204b5e` |
| CH-008 | 2026-11-20 | `fix` + `style` | Formulario habilitado desde el sitio publicado y animaciones profesionales | `b656e27`, `cb76839` |
| CH-007 | 2026-11-20 | `docs` | Registro de decisiones de D en `docs/decisiones-de-d.md` | Solo documentación |
| CH-006 | 2026-11-20 | `docs` | Sincronización de backlog, plan, decisiones y README con CH-005 | Solo documentación |
| CH-005 | 2026-11-20 | `feat` | Backend portátil del formulario con Supabase y Resend | `97e0600` |
| CH-004 | 2026-11-19 | `design` | Logotipo oficial integrado en header y footer | Ver PR |
| CH-003 | 2026-11-19 | `chore` | Entrega dividida por tipo de rama en ocho PR encadenados | Ver PRs |
| CH-002 | 2026-11-19 | `docs` | Estado consolidado: bitácora, plan, backlog y decisiones actualizados | Solo documentación |
| CH-001 | 2026-11-19 | `refactor` | Alineación con la especificación editorial y el estándar anti-conflictos | `c0bd569` |
| CH-000 | 2026-11-19 | `feat` | Andamio inicial: estructura de carpetas y módulos vacíos | `f114d9c` |

---

## CH-011 · Rediseño con DESIGN.md, sección Proyectos y móvil

**Fecha:** 2026-11-23 · **Tipo:** `design`

**Detalle:** [`rediseno-movil.md`](./rediseno-movil.md) · **Decisiones:** [`decisiones-rediseno.md`](./decisiones-rediseno.md)

**Motivo.** Adaptar la página a la guía `documentacion/DESIGN.md` conservando los colores de Koda, añadir un apartado de proyectos y mejorar la experiencia en teléfonos.

**Cambios**

- Sistema de bandas a sangre (`band--dark`, `band--plum`, `band--light`, `band--light-alt`), titulares grandes centrados, etiquetas en JetBrains Mono, radios 4/10px y cero sombras. Display en Plus Jakarta Sans 800 con acento en Cormorant itálica.
- Tokens nuevos en `variables.css` (roles de superficie, fuentes, layout); ningún otro CSS escribe hex.
- Encabezado oscuro con isotipo aclarado por filtro; menú móvil a pantalla completa con botón que se vuelve X.
- Sección nueva `#proyectos` (`css/componentes/proyectos.css`) con tres casos **de ejemplo** (Aurora Dental Studio, Café Altura, Ruta Norte Logística): pósters tipográficos, etiquetas y resultados. Enlazada en menú y pie.
- Cinta animada de servicios, pie con la marca a escala de póster.
- Móvil: botones a ancho completo, objetivos táctiles ≥ 44px, inputs a 16px (sin zoom en iOS), `safe-area-inset`, sin scroll horizontal.
- Copy del hero, nosotros, servicios y contacto acortado y reorganizado; contratos `data-js` y `name` del formulario intactos.

**Verificación.** Capturas con Chrome headless a 375px y 1440px: sin desbordes, todas las secciones visibles. No se probó en dispositivos reales.

**Pendiente.** Reemplazar los tres proyectos de ejemplo por casos reales antes de fusionar a `main`; QA en Safari iOS y Android; actualizar `especificacion.md` si el nuevo copy se adopta.

---

## CH-010 · Proyecto Vercel nuevo con seguridad

**Fecha:** 2026-11-22 · **Tipo:** `chore`

**Motivo.** El formulario funcionaba desde local pero no desde internet: `kodastudio-web.vercel.app` ya no recibía despliegues y los dominios que sí se actualizaban no estaban permitidos por CORS en la función `contact`.

**Cambios**

- Proyecto Vercel `koda-studio` (equipo `thesebast18`) conectado a `KodaStudiogt/KodaStudio`, producción en <https://koda-studio-ivory.vercel.app>, vistas previas protegidas con Vercel Authentication.
- `vercel.json`: sitio estático y encabezados CSP, HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` y COOP. `.vercelignore` oculta backend y documentación.
- `supabase/functions/contact/index.ts`: `https://koda-studio-ivory.vercel.app` agregado a `kc_prodOrigins`.

**Verificación**

- Despliegue READY; encabezados presentes; `README.md` y `supabase/...` responden 404; CSS, JS e imágenes responden 200.

**Pendiente**

- Activar el dominio en la función: secreto `ALLOWED_ORIGINS` o redesplegar `contact` en el proyecto de Diego.

---

## CH-009 · Formulario global, proyecto Supabase de Diego y estructura MVC

**Fecha:** 2026-11-22 · **Tipo:** `fix` + `refactor` + `docs`

**Motivo.** El backend pasa al proyecto Supabase de la organización de Diego para que todas las solicitudes de clientes caigan en una sola base de datos. Además, el código se reorganiza en capas MVC con nombres en español para que sea más fácil de entender y mantener.

**Cambios**

- Sincronización de los PR #24–#26 de Diego (`206c0df`): `CONTACT_ENDPOINT` apunta a `https://dglmtxbkfwjchxigmavc.supabase.co/functions/v1/contact`, `CONTACT_TO_EMAIL` admite varios correos separados por comas, la función responde 503 si falta configuración de correo y 502 si Resend falla (la solicitud igual queda guardada), y el formulario muestra un mensaje para cada caso.
- Remoto del repositorio actualizado a `KodaStudiogt/KodaStudio`.
- Reestructura MVC (`c204b5e`), sin cambios de comportamiento: `js/{configuracion,modelos,vistas,controladores,utilidades}`, `js/principal.js`; `css/{base,diseno,componentes,utilidades}` con archivos en español y `css/principal.css`; `assets/` → `recursos/`, `docs/` → `documentacion/`, `db/` → `base-de-datos/`. `supabase/` conserva su nombre porque lo exige el CLI. Se mantienen `kc_`, `data-js`, ids, `name` del formulario y clases de estado.
- Documentación: rutas, árbol, capas MVC, proyecto Supabase y pendientes actualizados en README y `documentacion/`.

**Verificación**

- `node --check` en todos los `.js`; servidor local con todas las rutas de CSS, JS e imágenes respondiendo 200.
- Prueba real al endpoint de producción con `Origin: https://kodastudio-web.vercel.app`: HTTP 200, `{"ok":true,"email_sent":true}`.

**Pendiente**

- Publicar `develop` → `main` para que Vercel sirva la nueva estructura.
- Dominio remitente verificado en Resend (`CONTACT_FROM_EMAIL`).
- QA manual en el navegador del sitio publicado.

---

## CH-008 · Formulario en producción y animaciones

**Fecha:** 2026-11-20 · **Autor:** Antony Perez · **Tipo:** `fix` + `style`

**Motivo.** El formulario solo funcionaba en local: la Edge Function `contact` aceptaba únicamente orígenes `localhost`, así que desde `https://kodastudio-web.vercel.app` el navegador bloqueaba el envío (CORS/403). Además, la landing solo tenía el reveal básico por sección.

**Cambios**

- `supabase/functions/contact/index.ts`: nuevo `kc_prodOrigins` con `https://kodastudio-web.vercel.app`, sumado a los orígenes de desarrollo y al secreto `ALLOWED_ORIGINS`. Función redesplegada (versión 4).
- Animaciones: entrada en cascada del Hero, reveal escalonado con `data-js="reveal-child"`, hover de botones y tarjetas, "pop" de píldoras, navbar `.is-scrolled`, spinner de envío, entrada del mensaje de confirmación y vibración de campos con error. Nuevos `DOM_SELECTORS.revealChildren` y `STATE_CLASSES.scrolled`. `js/main.js` sin cambios.
- README: estado, orígenes permitidos, secretos y sección de animaciones.

**Verificación.** Preflight `OPTIONS` con `Origin: https://kodastudio-web.vercel.app` → 204 con `Access-Control-Allow-Origin`; un origen ajeno no recibe esa cabecera. `node --check` en los módulos de `js/`.

**Pendiente.** Fusionar `develop` → `main` para que Vercel publique los cambios; enviar una solicitud real desde el sitio y confirmar fila en `kc_contact_requests` y correo; QA visual de las animaciones en navegador.

---

## CH-007 · Registro de decisiones de D

**Fecha:** 2026-11-20 · **Autor:** D · **Tipo:** `docs`

**Motivo.** Las decisiones estaban repartidas entre bitácora, plan y tablero del equipo, sin un lugar que respondiera "de quién fue cada una y por qué". A no tenía forma de verlo sin reconstruirlo desde el historial de commits.

**Qué se añadió.** `docs/decisiones-de-d.md` con diecisiete decisiones (`DD-01` a `DD-17`), cada una con motivo, efecto y estado; tabla de cambios de código asociados; pendientes propios y límites autoimpuestos. Se enlaza desde el README.

**Verificación.** Enlaces relativos resueltos, identificadores consecutivos sin huecos y cada decisión con su efecto declarado.

**Pendiente.** DD-04 y DD-05 esperan confirmación de A, en forma de D-08 y D-06.

---

## CH-006 · Sincronización documental tras CH-005

**Fecha:** 2026-11-20 · **Autor:** D · **Tipo:** `docs`

**Motivo.** CH-005 añadió el backend y cerró D-02, pero solo se actualizaron bitácora, decisiones y README. El backlog y el plan seguían afirmando que el formulario no enviaba, y el README y D-05 todavía hablaban de un "marcador geométrico" que ya no existe.

**Cambios**

- `docs/backlog.md`: T-34 y T-35 pasan a ✅; se añaden T-50, T-51 y T-52 (esquema, Edge Function y seguridad) como hechas; desaparece el bloque que decía que el envío no estaba conectado; totales ajustados (A queda en ≈ 4,25 j).
- `docs/plan-de-trabajo.md`: corte de fecha, tabla de estado con el envío real, contradicción #6 marcada como resuelta, mapa de propiedad con `db/` y `supabase/`, riesgos reescritos (secretos y dominio de Resend) y próximos pasos priorizados.
- `docs/decisiones-pendientes.md`: D-05 pasa a parcial con el logo raster ya integrado; D-04 anota que los datos personales ya se almacenan.
- `README.md`: fecha, estado, cambios recientes y árbol de estructura con `db/` y `supabase/`.
- Enlaces del repositorio actualizados al propietario actual (`KodaStudiogt/KodaStudio`) en README, plan y backlog: las URLs antiguas redirigían, pero no conviene depender de ello.

**Verificación.** Comprobado contra el código y el servicio: `node --check` en los módulos, preflight `OPTIONS` 204 y `POST` inválido con 400 y errores por campo. Los enlaces relativos siguen resolviendo.

**Pendiente que deja.** D-06 y D-08 siguen sin confirmar por A.

---

## CH-005 · Recepción del formulario con Supabase y Resend

**Fecha:** 2026-11-20 · **Autor:** A · **Tipo:** `feat` · **Ref.:** `97e0600` (a3701b9…97e0600)

**Qué se hizo.** Se añadió un esquema relacional portable a PostgreSQL para clientes, servicios, solicitudes y proyectos, junto con funciones transaccionales de alta y conteo por ventana. La capa de RLS queda aislada en una segunda migración Supabase. Se implementó la Edge Function `contact` con validación de servidor, honeypot, CORS por origen permitido, hash de IP para límite de solicitudes y notificación por Resend; los errores de correo se registran sin descartar la solicitud guardada.

El formulario ahora envía al endpoint configurable con timeout, estados accesibles, errores por campo y reinicio de selección. D-02 queda aceptada. El destinatario se proporciona como secreto `CONTACT_TO_EMAIL`; el ejemplo usa datos ficticios.

**Despliegue:** proyecto Supabase `kodastudio` (`mifxnsennwhufeegkckt`) creado; migraciones aplicadas (más un ajuste de `search_path` en `kc_set_updated_at` y `kc_count_recent_requests` por aviso del linter de seguridad); función `contact` publicada sin JWT y `CONTACT_ENDPOINT` apuntando a ella. Orígenes locales (8000, 5500, 3000) permitidos por defecto; remitente de pruebas `onboarding@resend.dev` si no hay `CONTACT_FROM_EMAIL`.

**Verificación:** `node --check` pasó para los módulos JavaScript modificados. Contra la función desplegada: preflight CORS 204, solicitud válida `{ok:true}` con filas en `kc_clients`, `kc_contact_requests` y `kc_contact_request_services`; solicitud inválida 400 con errores por campo. `RESEND_API_KEY` configurado. **Pendiente:** secreto `CONTACT_TO_EMAIL` para que salga el correo, `ALLOWED_ORIGINS` con el dominio final y verificar dominio remitente en Resend.

---

## CH-004 · Logotipo oficial en la interfaz

**Fecha:** 2026-11-19 · **Autor:** D · **Tipo:** `design`

**Qué se hizo.** Se incorporó el logotipo entregado en `assets/images/logo/Logo-KodaStudio.jpeg` y se integró en el header (lockup completo) y en el footer (monograma dentro del medallón táctil).

**El problema del archivo original.** Es un JPEG sobre fondo crema, sin transparencia. Colocarlo tal cual habría dibujado un rectángulo visible sobre el header, porque el crema del archivo no coincide con el lino del sitio.

**Solución.** Se derivaron dos assets WebP con matte alfa:

| Archivo | Uso | Tamaño |
| --- | --- | --- |
| `logo-kodastudio.webp` | Lockup completo en el header | 640 × 287 · ~30 KB |
| `logo-kodastudio-mark.webp` | Monograma en el medallón del footer | 256 × 256 · ~23 KB |

El fondo no es uniforme: tiene un degradado vertical y textura de papel. Se modeló por filas interpolando los márgenes izquierdo y derecho de cada una, se calculó el matte con umbrales derivados del ruido medido y se decontaminó el color de los píxeles semitransparentes, de modo que el trazo no arrastra halo claro sobre otros fondos.

**Detalles de implementación**

- El header sustituye el marcador geométrico por el lockup, con `alt="Koda Studio"`.
- El footer conserva el medallón y usa el monograma como imagen decorativa (`alt=""`).
- Dimensiones declaradas en el HTML para evitar saltos de maquetación; `loading="lazy"` solo en el footer.
- `.navbar__brand-text` quedó sin uso y se eliminó del CSS.

**Pendiente.** El original es un mapa de bits: para nitidez en pantallas de alta densidad conviene pedir el SVG del lockup y del monograma (D-05).

---

## CH-003 · Entrega dividida por tipo de rama

**Fecha:** 2026-11-19 · **Autor:** D · **Tipo:** `chore`

**Motivo.** El trabajo estaba concentrado en una sola rama (`chore/alinear-identidad-editorial`), imposible de revisar por partes. Se dividió en ocho ramas siguiendo la taxonomía del equipo: `feature/` para funcionalidad, `design/` para apariencia y `docs/` para documentación.

| Orden | Rama | Contenido | User History |
| --- | --- | --- | --- |
| 1 | `feature/base-structure` | `index.html`, contrato de selectores, `main.js` y stubs de módulos | US-01 |
| 2 | `design/design-system` | Tokens, reset, tipografía y `main.css` | US-01 |
| 3 | `feature/navbar` | Header y menú móvil (`header.css`, `navigation.js`) | US-02 |
| 4 | `design/homepage` | Hero y layout de secciones, botones y reveal | US-02 |
| 5 | `feature/contact-form` | Tarjetas, formulario, selector y validación | US-03 |
| 6 | `design/responsive` | Breakpoints y adaptación por dispositivo | US-02 |
| 7 | `feature/footer` | Pie de página y año dinámico | US-02 |
| 8 | `docs/work-plan` | Plan, backlog, decisiones, bitácora y README | US-04 |

**Prefijos que aún no se usan.** `fix/` y `hotfix/` quedan reservados para correcciones: no hay errores que arreglar todavía. Se aplicarán cuando aparezcan, no por anticipado.

**Por qué en ese orden.** Las ramas comparten `index.html` y `css/main.css`, así que se construyen una sobre otra y se fusionan de principio a fin. Cada PR se abre contra `develop`, pero hasta que no se fusiona el anterior, su diff arrastra los commits previos.

**Verificación.** Cada rama se comprobó con un chequeo de importaciones: `main.css`, `main.js` y los módulos solo referencian archivos que existen en esa rama. La unión de las ocho reproduce exactamente el árbol de la rama de trabajo original.

**Nota.** Antes de fusionar se descartó una primera agrupación en cuatro PR; quedó reemplazada por esta.

---

## CH-002 · Consolidación documental

**Fecha:** 2026-11-19 · **Autor:** D · **Tipo:** `docs`

**Motivo:** el código ya estaba alineado (CH-001) pero la documentación no reflejaba con precisión qué se había hecho, qué quedaba y quién era responsable de cada cosa.

**Cambios**

- Nuevo `docs/changelog.md` (este archivo).
- `README.md`: estado real del proyecto, responsables y resumen de cambios recientes.
- `docs/plan-de-trabajo.md`: fecha de corte, "qué cambió en la última entrega" y próximos pasos priorizados para D.
- `docs/backlog.md`: vista de pendientes por persona y estado verificado de cada tarea.
- `docs/decisiones-pendientes.md`: columna de responsable y estado al día.
- Cabecera de estado en `docs/arquitectura.md`, `docs/especificacion.md` y `docs/estandar.md`, sin tocar su contenido normativo.

**Verificación:** no hay cambios de código en esta entrega; el repositorio sigue validando el contrato.

**Pendiente que deja:** confirmar D-06 y D-08 (implementadas, sin confirmar por A).

---

## CH-001 · Alineación con la especificación y el estándar

**Fecha:** 2026-11-19 · **Autor:** D · **Tipo:** `refactor` · **Ref.:** `c0bd569` · **Alcance:** 32 archivos, +3442 / −374

**Contexto.** El andamio heredado tenía la estructura correcta pero un contenido que contradecía los tres documentos: paleta azul `#246bce` y Segoe UI, ausencia de la sección `#esencia`, `name="name"` en el formulario y módulos JS que seleccionaban por clase visual, algo que el estándar prohíbe expresamente. Se conservó la estructura de carpetas, las ideas buenas del andamio (reveal con mejora progresiva, `selectors.js` centralizado) y se sustituyó todo lo que chocaba.

**Marca.** La empresa pasa a llamarse **Koda Studio** en HTML, README y documentación. Los tres documentos fuente se incorporaron al repositorio con la marca actualizada y sin cambios de contenido.

**HTML.** `index.html` reescrito con las seis regiones semánticas (`#navbar`, `#inicio`, `#esencia`, `#servicios`, `#contacto`, `#footer`), jerarquía correcta de encabezados (un solo `h1`), el copywriting completo de la especificación §2.B–§2.F y el contrato de atributos: `data-js-*` en cada nodo que JS necesita y, en el formulario, los `name`/`id` exactos del estándar §5 con honeypot, `aria-describedby` por campo y región de confirmación con `role="status"`.

**CSS.** `variables.css` con los 17 tokens obligatorios. Tipografía editorial (Cormorant Garamond + Plus Jakarta Sans) con escala fluida. Layout base del header simétrico, Hero con pilares, Esencia (historia 4/8 en grid de 12, misión y visión en dos columnas), Servicios en 2×2, Contacto en 5/7 sobre `plum` y footer en dos filas. Componentes de botones, tarjetas editoriales, formulario y píldoras. Utilidades de reveal, responsive y `sr-only`. Sin hex fuera de `variables.css` y sin tokens del andamio anterior.

**JavaScript.** `selectors.js` como fuente única (`DOM_SELECTORS`, `STATE_CLASSES`, `VALID_SERVICES`, `SERVICE_LABELS`, `REVEAL_THRESHOLD`, `FORM_FIELDS`). `main.js` congelado. `navigation.js` con toggle, `aria-expanded`, cierre al navegar, `Escape` y cierre al pasar a escritorio. `reveal.js` con `IntersectionObserver` y mejora progresiva: sin JS el contenido se ve. `service-selector.js` con `Set()`, `aria-pressed` y sincronización del input oculto. `contact-form.js` con validación por campo, `.has-error`, `aria-invalid`, honeypot silencioso y mensaje que **no finge un envío**.

**Herramientas.** `.gitignore` orientado a web (sustituye la plantilla de Java) y `.gitattributes` para fijar saltos de línea LF.

**Verificación ejecutada**

- Sintaxis de los 8 módulos JS validada.
- Contrato cruzado HTML ↔ `selectors.js` ↔ CSS: ids únicos, cada `data-js` con selector declarado, `name`/`id` del formulario en el mismo elemento, `label` por campo visible, un solo `h1`, `@import` resueltos, cero tokens obsoletos y cero rastros de la marca anterior.
- Repositorio limpio tras el commit; `main` y `develop` intactos.

**Desviaciones registradas**

- **D-06:** valor canónico del servicio en `data-service-value`, etiqueta corta en la píldora. Pendiente de confirmar por A.
- **D-08:** clase `.is-pending` añadida a `STATE_CLASSES` para que el reveal no oculte contenido cuando JS falla. Pendiente de confirmar por A.

**Pendiente que deja.** Acabado visual fino (header, medallón, textura del Hero), contraste de la sección de contacto, assets gráficos y, sobre todo, el endpoint del formulario (D-02).

---

## CH-000 · Línea base heredada

**Fecha:** 2026-11-19 · **Ref.:** `f114d9c` (sobre `4be5adb`)

Estructura de carpetas completa según la arquitectura, con CSS y módulos mínimos. Estilos genéricos (azul y fuente del sistema), tres secciones y un formulario con tres campos de nombre libre. Funcionaba como andamio, pero no implementaba la identidad ni el contrato de nombres. Fue sustituido en CH-001.
