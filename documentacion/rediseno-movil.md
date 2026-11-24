# Rediseño de la landing — DESIGN.md + paleta Koda + móvil

> **Entrega:** CH-011 · **Fecha:** 2026-11-23 · **Rama:** `diseno_actualizado` (antes `feature/rediseno-movil`)
> **Decisiones:** ver [`decisiones-rediseno.md`](./decisiones-rediseno.md) · **Bitácora:** [`changelog.md`](./changelog.md#ch-011--rediseño-con-designmd-sección-proyectos-y-móvil)

## 1. Objetivo

1. Aplicar el sistema visual de [`DESIGN.md`](./DESIGN.md) (estilo "Shelby"): bandas de color a sangre, titulares grandes y centrados, etiquetas monoespaciadas, radios pequeños y cero sombras.
2. **Conservar la identidad de Koda:** paleta linen / plum / bronze y las fuentes Plus Jakarta Sans + Cormorant Garamond.
3. Que la página se use cómoda en un teléfono de ~375px.
4. Reordenar el contenido según lo que hace la empresa: **Inicio → Nosotros → Servicios → Proyectos → Contacto**, y agregar la sección nueva **Proyectos**.

## 2. Commits

| Commit | Área | Archivos |
| --- | --- | --- |
| `2e164bb` | Guía de diseño y `CLAUDE.md` | `documentacion/DESIGN.md`, `CLAUDE.md` |
| `style(base)` | Tokens y tipografía | `css/base/variables.css`, `css/base/tipografia.css` |
| `style(componentes)` | Botones, tarjetas, formulario, selector | `css/componentes/*.css` |
| `style(diseno)` | Encabezado y pie | `css/diseno/encabezado.css`, `css/diseno/pie-de-pagina.css` |
| `feat(secciones)` | HTML, secciones, Proyectos | `index.html`, `css/diseno/secciones.css`, `css/componentes/proyectos.css` (nuevo), `css/principal.css` |
| `style(movil)` | Breakpoints y animaciones | `css/utilidades/adaptable.css`, `css/utilidades/animaciones.css` |
| `docs` | Documentación | `CLAUDE.md`, `changelog.md`, este archivo, `decisiones-rediseno.md` |

> Los commits están separados por área. Si se revisa uno intermedio de forma aislada, la página puede verse a medias (CSS nuevo con HTML viejo). El estado final es el del último commit.

## 3. Sistema visual

### 3.1 Tokens (`css/base/variables.css`)

- **Paleta Koda** sin cambios, más `--color-bronze-light` (`#D9BFAE`) para acentos sobre fondo oscuro.
- **Roles de superficie para las bandas:**

  | Token | Valor | Uso |
  | --- | --- | --- |
  | `--surface-dark` | plum-dark | Hero, encabezado, contacto, fondo de `body` |
  | `--surface-plum` | plum | Servicios |
  | `--surface-light` | linen | Nosotros |
  | `--surface-light-alt` | linen-dark | Proyectos |
  | `--surface-deepest` | charcoal | Pie |

- **Tinta y líneas:** `--ink-on-dark`, `--ink-on-dark-muted`, `--accent-on-dark`, `--line-on-dark` y `--line-on-light` (todas con `color-mix`).
- **Fuentes:**
  - `--font-display`: Plus Jakarta Sans.
  - `--font-accent`: Cormorant Garamond.
  - `--font-mono`: JetBrains Mono.
  - `--font-heading` queda como alias de `--font-display`.
- **Geometría:**
  - tarjetas de 10px;
  - inputs, botones e insignias de 4px;
  - `--shadow-card` y `--shadow-card-hover` valen `none`.
- **Layout:**
  - `--kc-container` (75rem);
  - `--kc-gutter`;
  - `--kc-band-padding`;
  - `--kc-header-height`;
  - `--ease-out`.

  Reemplazan la propuesta comentada de D-07.

### 3.2 Tipografía (`css/base/tipografia.css`)

- **Titulares:**
  - Plus Jakarta Sans 700–800, con tracking negativo.
  - `h1` hasta 6rem y `h2` hasta 3.75rem, escalados con `clamp()`.
- **Acento:** `<em>` en Cormorant itálica 600, para una palabra por titular.
- **Etiquetas:**
  - `.eyebrow` en mono, estilo "código de producto" (`[ Estudio de software & diseño ]`, `01 — Nosotros`).
  - `.badge` nueva: insignia con borde.
- `html` y `body` con `overflow-x: clip` y `scroll-padding-top` igual a la altura del encabezado.

### 3.3 Componentes

- **Botones:**
  - planos, de 4px, con etiqueta mono en mayúsculas y alto mínimo de 3rem;
  - variantes nuevas: `--filled` (claro sobre oscuro), `--ghost` (contorno sobre oscuro) y `--small`.
- **Tarjetas:**
  - `.editorial-card` pasa a `.surface-card` (borde fino, sin sombra);
  - nueva `.purpose-card` para Misión y Visión;
  - `.service-card` ahora va sobre fondo ciruela y usa viñetas `↗`.
- **Formulario:**
  - inputs de 16px y 3rem de alto;
  - fondo `linen-light`;
  - foco con anillo bronze.
- **Selector de servicios:** píldoras con estilo de insignia, 44px de alto, mono en mayúsculas.

## 4. Sección por sección (`index.html`)

| Sección | Banda | Contenido |
| --- | --- | --- |
| **Encabezado** | oscura | Isotipo aclarado con `filter`, enlaces Nosotros / Servicios / Proyectos y botón "Agendar ↗". En móvil abre un menú a pantalla completa con índices 00–04 y un CTA; el botón se vuelve X. |
| **Inicio** `#inicio` | `band--dark` | Eyebrow, `h1` "Software a la medida, *diseñado* para hacer crecer su negocio.", descripción, CTAs "Agendar consultoría gratis" y "Ver proyectos", y tres pilares (100% a la medida, Todo conectado, Trato directo). |
| **Cinta** | — | Cinta animada decorativa (`aria-hidden`) con los cuatro servicios. Se detiene con `prefers-reduced-motion`. |
| **Nosotros** `#esencia` | `band--light` | Titular "Precisión técnica con *criterio estético*", historia de D & A, cita y tarjetas de Misión y Visión. |
| **Servicios** `#servicios` | `band--plum` | Cuatro tarjetas de servicio con entregables. |
| **Proyectos** `#proyectos` **(nuevo)** | `band--light-alt` | Tres tarjetas de proyecto: póster tipográfico de color con código `KS—P0x`, insignias, descripción y dos resultados. |
| **Contacto** `#contacto` | `band--dark` | Datos de contacto y formulario sobre tarjeta clara. |
| **Pie** | charcoal | Marca a escala de póster, enlaces a las cinco secciones y año dinámico. |

> ⚠️ **Los tres proyectos son ficticios:** Aurora Dental Studio, Café Altura y Ruta Norte Logística, con sus métricas. Hay un `TODO` en `index.html` (línea ~230). **No se deben publicar en `main` sin reemplazarlos por casos reales**, porque las cifras se leerían como resultados verdaderos.

## 5. Móvil (`css/utilidades/adaptable.css`)

| Breakpoint | Cambios |
| --- | --- |
| ≤ 64rem (tablet) | Contacto a una columna (datos arriba, formulario abajo), datos de contacto en tres columnas y proyectos con póster y ficha 50/50. |
| ≤ 48rem (móvil) | Se ocultan los enlaces y aparece el botón de menú; servicios a una columna; CTAs del hero a ancho completo, pilares apilados, proyectos en una columna (el póster siempre arriba) y datos de contacto apilados. |
| ≤ 22.5rem | Logotipo de texto más chico; resultados del proyecto en una columna. |

**Otros ajustes:**

- Inputs de 16px para que iOS no haga zoom al enfocarlos.
- Objetivos táctiles de 44px o más.
- `env(safe-area-inset-*)` en el encabezado y en el menú móvil, junto con `viewport-fit=cover`.
- Sin scroll horizontal (`overflow-x: clip`).
- El breakpoint de 48rem coincide con `DESKTOP_QUERY` de `js/vistas/navegacion.vista.js`.

## 6. Contratos que se respetaron

- **`data-js`:** todos los de `js/configuracion/selectores.js` siguen en el HTML.
  - Ejemplos: `mobile-toggle`, `mobile-menu`, `nav-link`, `reveal`, `reveal-child`, `contact-form`, `service-pill`, `service-value`, `form-submit`, `form-feedback`, `feedback-text`, `form-reset`, `current-year`.
- **Formulario:** se mantienen los `name` (`client_name`, `client_email`, `project_message`, `selected_services`, `kc_website_hp`). Son el contrato con la Edge Function `contact`.
- **CSP de `vercel.json`:** no se agregaron estilos ni scripts en línea.
- **JavaScript:** no se tocó.

## 7. Verificación

- Capturas con Chrome headless a 375px y 1440px: sin desbordes horizontales y con todas las secciones visibles.
- **No se probó en dispositivos reales** ni se envió el formulario desde esta rama.

## 8. Pendientes

- [ ] Reemplazar los tres proyectos de ejemplo por casos reales (nombre, qué se hizo, resultados y, si aplica, enlace).
- [ ] QA en Safari iOS y Chrome Android: menú, formulario y cinta.
- [ ] Enviar el formulario desde el *preview* de Vercel de la rama.
- [ ] Actualizar `especificacion.md` y `estandar.md` (§2 tokens, nombres de clase `.surface-card`) si se adopta el nuevo copy y sistema.
- [ ] Fusionar el PR de `claude/bold-mendel-s5xytl` (DESIGN.md) y luego el de `diseno_actualizado`.
