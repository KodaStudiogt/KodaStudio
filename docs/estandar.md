<!-- estado:inicio -->
> **Documento normativo** · Estado: vigente y de cumplimiento obligatorio.
> Única desviación aprobada: la clase de estado `.is-pending` (ver D-08 en
> [decisiones-pendientes.md](./decisiones-pendientes.md)).

<!-- estado:fin -->

# Estándar Obligatorio de Variables, Nombres y Reglas Anti-Conflictos

> **Propósito del documento:** Establecer un contrato técnico estricto entre ambos desarrolladores (**D & A**) para evitar colisiones de variables en CSS, sobreescritura de clases en HTML, conflictos de alcance (*scope*) en JavaScript y discrepancias en formularios o backend PHP.

## 1. Reglas de Oro para Evitar Conflictos

Antes de escribir cualquier línea de código, ambos desarrolladores deben cumplir estas **5 reglas inquebrantables**:

1. **Cero valores mágicos ("Hardcoding"):** Está prohibido escribir códigos hexadecimales (`#4A2E35`), nombres de fuentes o radios de borde directamente en los archivos de componentes. **Todo debe consumir las variables CSS obligatorias.**

2. **Separación estricta entre CSS y JavaScript:** Las clases CSS (`.hero__title`, `.editorial-card`) son **exclusivas para estilos**. JavaScript **NUNCA** debe seleccionar elementos usando clases visuales; debe usar exclusivamente atributos `data-js-*` o los `id` autorizados.

3. **Prohibido el ámbito global en JavaScript:** Ninguna variable o función debe declararse en el objeto `window` ni en archivos sin `type="module"`. Todo archivo `.js` debe ser un **ES Module** con variables encapsuladas (`const` / `let`).

4. **Prefijo de espacio de nombres (`kc-`):** Cualquier variable global nueva, cookie, clave de `localStorage` o constante compartida debe llevar el prefijo `kc_` (en JS/PHP) o `--kc-` (si se agregan tokens extendidos en CSS).

5. **Un solo dueño por archivo compartido:** Archivos centrales como `variables.css`, `main.css`, `selectors.js` y `main.js` no se editan simultáneamente sin previo aviso en el Pull Request.

## 2. Variables CSS Obligatorias (`css/base/variables.css`)

Estas son las **únicas variables autorizadas** para mantener la identidad visual editorial de **Koda Studio**. Ningún desarrollador puede crear alias como `--primary-color` o `--bg-main`; deben usarse exactamente los siguientes nombres:

### 2.1 Paleta de Colores (Uso Obligatorio)

| Variable Obligatoria | Valor Exacto | Uso Permitido / Contexto | 
| ----- | ----- | ----- | 
| `--color-linen` | `#F9F8F6` | Fondo principal del `body` y secciones base. | 
| `--color-linen-dark` | `#EFECE6` | Fondo de contraste suave (ej. sección `#esencia`). | 
| `--color-linen-light` | `#FDFCFB` | Superficie de tarjetas editoriales e `inputs`. | 
| `--color-plum` | `#4A2E35` | Color primario de marca, titulares, botones principales y fondo de `#contacto`. | 
| `--color-plum-dark` | `#362026` | Estado `:hover` y `:active` de botones primarios. | 
| `--color-plum-light` | `#64414A` | Detalles decorativos o bordes sutiles sobre fondo oscuro. | 
| `--color-bronze` | `#B08D79` | Acentos metálicos, detalles SVG, subrayados animados. | 
| `--color-bronze-dark` | `#9C7A65` | Etiquetas superiores (*eyebrows*), cursivas destacadas y numeración editorial. | 
| `--color-charcoal` | `#241D1F` | Texto principal de lectura y párrafos. | 
| `--color-muted` | `#6E6366` | Textos secundarios, subtítulos y notas al pie. | 

### 2.2 Tipografía, Geometría y Profundidad (Uso Obligatorio)

| Variable Obligatoria | Valor Exacto | Uso Permitido | 
| ----- | ----- | ----- | 
| `--font-heading` | `'Cormorant Garamond', Georgia, serif` | Títulos (`h1`, `h2`, `h3`), citas y marca. | 
| `--font-body` | `'Plus Jakarta Sans', system-ui, sans-serif` | Párrafos, navegación, botones y formularios. | 
| `--radius-card` | `24px` | Bordes redondeados de tarjetas principales. | 
| `--radius-input` | `12px` | Campos de texto y píldoras de selección de servicios. | 
| `--radius-pill` | `9999px` | Botones principales de acción (CTAs) y medallón circular. | 
| `--border-subtle` | `1px solid rgba(74, 46, 53, 0.08)` | Borde estándar de tarjetas y divisores. | 
| `--border-accent` | `1px solid rgba(176, 141, 121, 0.45)` | Borde en estado `:hover` o activo. | 
| `--shadow-card` | `0 10px 30px -12px rgba(74, 46, 53, 0.06)` | Sombra en reposo de tarjetas editoriales. | 
| `--shadow-card-hover` | `0 22px 44px -15px rgba(74, 46, 53, 0.12)` | Sombra elevada al pasar el cursor. | 
| `--transition-base` | `250ms ease` | Transiciones estándar de color y borde. | 
| `--transition-smooth` | `400ms cubic-bezier(0.22, 1, 0.36, 1)` | Elevación de tarjetas y aparición de secciones. | 

## 3. Contrato de IDs, Clases BEM y Atributos JS (`HTML ↔ CSS ↔ JS`)

Para evitar que un cambio de diseño rompa la programación (o viceversa), se establece esta tabla de **identificadores obligatorios**:

### 3.1 IDs de Sección Reservados (Anclas de Navegación)

No deben modificarse ni duplicarse en ninguna parte del DOM:

* `#navbar` — Contenedor principal del encabezado.

* `#inicio` — Sección Hero.

* `#esencia` — Sección Historia, Misión y Visión.

* `#servicios` — Sección de los 4 pilares de servicio.

* `#contacto` — Sección de formulario y datos de consultoría.

* `#footer` — Pie de página.

### 3.2 Atributos `data-js-*` Obligatorios (Exclusivos para JavaScript)

JavaScript **únicamente** debe consultar el DOM usando estos atributos centralizados en `js/config/selectors.js`:

| Atributo Obligatorio en HTML | Módulo JS Responsable | Función | 
| ----- | ----- | ----- | 
| `data-js="mobile-toggle"` | `navigation.js` | Botón que abre/cierra el menú móvil. | 
| `data-js="mobile-menu"` | `navigation.js` | Contenedor del menú desplegable móvil. | 
| `data-js="nav-link"` | `navigation.js` | Enlaces internos que deben cerrar el menú al hacer clic. | 
| `data-js="reveal"` | `reveal.js` | Elementos observados por `IntersectionObserver`. | 
| `data-js="service-pill"` | `service-selector.js` | Botones de selección múltiple de servicios. | 
| `data-js="service-value"` | `service-selector.js` | Input oculto donde se guardan los servicios elegidos. | 
| `data-js="contact-form"` | `contact-form.js` | Formulario principal de consultoría. | 
| `data-js="form-feedback"` | `contact-form.js` | Contenedor del mensaje de éxito/error inline. | 
| `data-js="feedback-text"` | `contact-form.js` | Nodo de texto donde se inyecta el mensaje seguro (`textContent`). | 
| `data-js="form-reset"` | `contact-form.js` | Botón para reiniciar el formulario tras el envío. | 
| `data-js="current-year"` | `footer.js` | `<span>` donde se imprime el año actual. | 

### 3.3 Clases de Estado CSS (Controladas por JS)

Cuando JavaScript necesite cambiar la apariencia de un elemento, **solo puede agregar o quitar estas clases** (además de actualizar `aria-expanded` o `aria-pressed`):

* `.is-open` — Para menús desplegables abiertos.

* `.is-visible` — Para elementos que ya entraron en pantalla (`reveal.js`).

* `.is-selected` — Para píldoras de servicios activas (`service-selector.js`).

* `.is-hidden` — Para ocultar bloques (ej. ocultar formulario al mostrar confirmación).

* `.has-error` — Para marcar campos de formulario con validación fallida.

## 4. Variables y Constantes Obligatorias en JavaScript (`js/config/selectors.js`)

Para que ambos desarrolladores trabajen en módulos distintos sin inventar nombres de variables diferentes para los mismos datos, se debe crear el archivo **`js/config/selectors.js`** con estas exportaciones obligatorias:

```javascript
/**
 * js/config/selectors.js
 * Única fuente de verdad para selectores DOM y constantes globales en JS.
 */

export const DOM_SELECTORS = Object.freeze({
    navbar: "#navbar",
    mobileToggle: '[data-js="mobile-toggle"]',
    mobileMenu: '[data-js="mobile-menu"]',
    navLinks: '[data-js="nav-link"]',
    revealItems: '[data-js="reveal"]',
    servicePills: '[data-js="service-pill"]',
    serviceHiddenInput: '[data-js="service-value"]',
    contactForm: '[data-js="contact-form"]',
    formFeedback: '[data-js="form-feedback"]',
    feedbackText: '[data-js="feedback-text"]',
    formResetBtn: '[data-js="form-reset"]',
    currentYear: '[data-js="current-year"]'
});

export const STATE_CLASSES = Object.freeze({
    open: "is-open",
    visible: "is-visible",
    selected: "is-selected",
    hidden: "is-hidden",
    error: "has-error"
});

export const VALID_SERVICES = Object.freeze([
    "Desarrollo Web de Alta Gama",
    "Automatización de Procesos",
    "Sistemas de Ventas",
    "Soporte Técnico / Ecosistema Integral"
]);
```

### Convenciones de Nombres dentro de los Módulos JS

* **Constantes de configuración:** `UPPER_SNAKE_CASE` (ej. `REVEAL_THRESHOLD = 0.12`).

* **Variables y parámetros:** `camelCase` descriptivo en inglés técnico (ej. `selectedServices`, `isFormValid`, `userName`).

* **Funciones de inicialización:** Siempre empiezan con `init` (ej. `initNavigation()`, `initReveal()`, `initContactForm()`).

* **Funciones booleanas:** Siempre empiezan con `is`, `has` o `can` (ej. `isValidEmail(email)`, `hasSelectedServices()`).

## 5. Contrato de Campos del Formulario (`HTML ↔ JS ↔ PHP`)

Si el proyecto escala hacia **PHP** (`procesar_contacto.php`) o se conecta a un webhook de automatización, los atributos `name` de los inputs del formulario deben respetar **exactamente** estos nombres para evitar fallos de lectura en `$_POST`:

| Campo del Formulario | Atributo `name` Obligatorio | Atributo `id` Obligatorio | Tipo de Dato Esperado | 
| ----- | ----- | ----- | ----- | 
| Nombre completo | `name="client_name"` | `id="client-name"` | `string` (requerido, min. 2 caracteres) | 
| Correo corporativo | `name="client_email"` | `id="client-email"` | `string` (formato email válido) | 
| Servicios seleccionados | `name="selected_services"` | `id="selected-services"` | `string` separado por comas | 
| Descripción del proyecto | `name="project_message"` | `id="project-message"` | `string` (requerido, min. 10 caracteres) | 
| Campo anti-spam (*honeypot*) | `name="kc_website_hp"` | `id="kc-website-hp"` | `string` (debe llegar vacío) | 

### Variables Obligatorias si se Implementa PHP

En caso de crear archivos `.php` (como `config.php` o `procesar_contacto.php`), todas las variables de configuración deben usar el prefijo `$kc_` para no chocar con librerías externas:

* `$kc_site_title` — Título del sitio.

* `$kc_contact_email` — Correo receptor de prospectos (`hola@kodastudio.com`).

* `$kc_db_host`, `$kc_db_name`, `$kc_db_user`, `$kc_db_pass` — Credenciales de base de datos (cargadas desde variables de entorno, nunca subidas a Git).

* `$kc_response` — Array asociativo estándar para respuestas JSON (`['success' => bool, 'message' => string]`).

## 6. División de Responsabilidades (Desarrollador D vs. Desarrollador A)

Para que ambos puedan trabajar al mismo tiempo sin pisar los mismos archivos ni duplicar tareas, el trabajo se divide por **capas y módulos independientes**:

### 6.1 Desarrollador D — Arquitectura Base, Identidad Visual y Secciones Informativas

Se encarga del sistema de diseño global, la estructura superior e inferior de la página y las secciones editoriales estáticas/animadas.

* **Secciones HTML asignadas:**
  * `<header id="navbar">` (Navegación simétrica desktop, medallón táctil SVG y menú móvil).
  * `<section id="inicio">` (Hero, propuesta de valor, botones CTA y pilares inferiores).
  * `<section id="esencia">` (Historia de D & A, Misión y Visión).
  * `<footer id="footer">` (Branding, enlaces rápidos y año dinámico).

* **Archivos CSS exclusivos:**
  * `css/base/reset.css`, `css/base/variables.css`, `css/base/typography.css`
  * `css/layout/header.css`, `css/layout/sections.css`, `css/layout/footer.css`
  * `css/components/buttons.css`
  * `css/utilities/animations.css` y `css/utilities/responsive.css`

* **Módulos JavaScript exclusivos:**
  * `js/modules/navigation.js` (Control del menú hamburguesa y cierre al hacer clic en enlaces).
  * `js/modules/reveal.js` (Animaciones de entrada con `IntersectionObserver`).
  * `js/modules/footer.js` (Actualización automática del año en `[data-js="current-year"]`).

* **Ramas Git sugeridas:** `feature/base-design-system`, `feature/header-hero`, `feature/essence-footer`.

### 6.2 Desarrollador A — Catálogo de Servicios, Interactividad Comercial y Backend/Formulario

Se encarga de las tarjetas de oferta comercial, la lógica interactiva de selección de servicios, validación de datos y conexión con PHP o servicio de recepción.

* **Secciones HTML asignadas:**
  * `<section id="servicios">` (Grid de los 4 pilares de servicio y sus listas de entregables).
  * `<section id="contacto">` (Columna de información directa + formulario completo con selector múltiple y caja de confirmación).

* **Archivos CSS exclusivos:**
  * `css/components/cards.css` (Estilos de `.editorial-card`, elevación hover y tarjetas de servicio).
  * `css/components/service-selector.css` (Píldoras interactivas y estado `.is-selected`).
  * `css/components/forms.css` (Inputs, estados `.has-error`, mensaje `.is-hidden` y contraste en fondo `#4A2E35`).

* **Módulos JavaScript y PHP exclusivos:**
  * `js/modules/service-selector.js` (Lógica con `Set()` y sincronización con `[data-js="service-value"]`).
  * `js/modules/contact-form.js` (Validación de campos, envío `fetch`/POST y renderizado seguro del mensaje de éxito).
  * `js/utils/validation.js` (Funciones puras como `isValidEmail()` y validación de longitud mínima).
  * `procesar_contacto.php` y `config.php` (En caso de activar recepción de prospectos en servidor PHP).

* **Ramas Git sugeridas:** `feature/services-section`, `feature/contact-form-logic`, `feature/php-contact-handler`.

### 6.3 Archivos Compartidos (Coordinación Obligatoria)

Estos 3 archivos unen el trabajo de ambos y **solo deben modificarse mediante Pull Requests pequeños y avisados**:

1. `index.html`: Cada desarrollador edita únicamente el bloque comprendido dentro de sus etiquetas `<section>` o `<header>`/`<footer>` asignadas.
2. `css/main.css`: Solo contiene los `@import`; ambos agregan sus hojas en el orden definido en la arquitectura.
3. `js/main.js` y `js/config/selectors.js`: Se crean al inicio del proyecto con las firmas de funciones ya definidas (`initNavigation`, `initReveal`, `initServiceSelector`, `initContactForm`, `initFooter`) para que ninguno tenga que modificarlos mientras programa su módulo.

## 7. Lista de Verificación Rápida antes de Hacer Commit

Antes de subir código a cualquier rama `feature/*`, cada desarrollador debe verificar:

* [ ] ¿Trabajé únicamente dentro de mis archivos y secciones asignadas (D o A)?

* [ ] ¿Usé las variables `--color-*` y `--font-*` en lugar de valores escritos a mano?

* [ ] ¿Importé los selectores desde `DOM_SELECTORS` en lugar de escribir `document.querySelector(".clase-visual")`?

* [ ] ¿Usé `STATE_CLASSES` (`.is-open`, `.is-selected`, etc.) para cambiar estados visuales?

* [ ] ¿Respeté los atributos `name="client_name"`, `name="client_email"`, `name="selected_services"` y `name="project_message"` en el formulario?

* [ ] ¿Evité declarar variables fuera de un módulo o función?