> **Documento de referencia.** Se conserva con la redacción original (marca actualizada a
> Koda Studio). Las desviaciones aplicadas en el código —tokens de sombra y transición,
> atributos `data-js-*`, nombres de servicio y edición del reveal— están registradas en
> [plan-de-trabajo.md §3](./plan-de-trabajo.md).

# Especificación Completa de Landing Page — Koda Studio

Este documento detalla la arquitectura visual, sistema de diseño, estructura de secciones, redacción (*copywriting*) e interacciones necesarias para implementar en código la carta de presentación digital de **Koda Studio**.

---

## 1. Dirección de Arte y Sistema de Diseño (Design Tokens)

El objetivo estético es proyectar una firma tecnológica **boutique, editorial, cálida y sofisticada**, alejándose de los clichés oscuros y saturados de neón.

### Paleta de Colores
* **Fondo Principal (`linen`):** `#F9F8F6` (Crema lino suave, base principal de la interfaz).
* **Fondo Secundario (`linen-dark`):** `#EFECE6` (Para secciones de contraste sutil como *Nuestra Esencia*).
* **Superficie de Tarjetas (`linen-light`):** `#FDFCFB` (Blanco cálido para tarjetas editoriales e inputs).
* **Color Primario (`plum`):** `#4A2E35` (Deep Plum / Borgoña profundo; usado en tipografía principal, botones primarios y sección de contacto).
* **Primario Oscuro (`plum-dark`):** `#362026` (Estados `:hover` en botones oscuros).
* **Acento Metálico (`bronze` / `bronze-dark`):** `#B08D79` / `#9C7A65` (Detalles de circuito en el logo, subrayados animados, etiquetas superiores y numeración editorial).
* **Texto Cuerpo (`charcoal`):** `#241D1F` (Gris carbón cálido para alta legibilidad).
* **Texto Secundario (`muted`):** `#6E6366` (Subtítulos y descripciones ligeras).

### Tipografía (Google Fonts)
1. **Títulos y Destacados (Editorial Serif):** `'Cormorant Garamond'`, pesos `500`, `600`, `700` e itálicas `400`, `600`.
2. **Interfaz, Cuerpo y Etiquetas (Clean Sans-Serif):** `'Plus Jakarta Sans'`, pesos `300`, `400`, `500`, `600`.

### Efectos y Componentes Clave
* **Medallón Táctil (Neumorfismo Cálido):** Elemento circular que contiene el isotipo. Utiliza sombras duales (`10px 10px 22px rgba(74, 46, 53, 0.08)` y `-10px -10px 22px rgba(255, 255, 255, 0.95)`) con un anillo interior hundido (`inset`) y borde sutil en bronce.
* **Tarjetas Editoriales (`.editorial-card`):** Bordes redondeados amplios (`rounded-3xl` / `24px`), borde `1px solid rgba(74, 46, 53, 0.08)` y elevación suave al pasar el cursor (`translateY(-6px)`).
* **Textura de Papel (`.paper-texture`):** Patrón sutil de puntos radiales en el *Hero* para dar sensación táctil de papel fino.

---

## 2. Arquitectura de Secciones y Contenido (Copywriting)

### A. Header Minimalista y Navegación Simétrica (`#navbar`)
* **Comportamiento:** `sticky top-0`, fondo translúcido (`bg-linen/90`) con `backdrop-blur-md`.
* **Distribución Desktop:** 3 columnas equilibradas:
  * **Izquierda:** Enlaces `Inicio` (`#inicio`) y `Nosotros` (`#esencia`).
  * **Centro:** Medallón circular táctil con el isotipo vectorial (`SVG`) que fusiona la letra **K** estructural con líneas de circuito y el símbolo de cierre de código (`/`), acompañado debajo por el texto *Koda Studio*.
  * **Derecha:** Enlaces `Servicios` (`#servicios`) y `Contacto` (`#contacto`).
* **Distribución Mobile:** Logotipo compacto a la izquierda y botón hamburguesa a la derecha que despliega un menú vertical limpio.

---

### B. Sección Hero (`#inicio`)
* **Etiqueta Superior:** `Agencia Tecnológica Boutique • Fundada por D & A`
* **Título Principal (`H1`):**
  > Ingeniería de software y diseño con propósito, *sin clichés genéricos.*
* **Subtítulo / Propuesta de Valor:**
  > En **Koda Studio** diseñamos y construimos ecosistemas digitales a medida. Unimos el desarrollo web de alta gama, la automatización inteligente y sistemas comerciales eficientes para transformar su operación en un motor de crecimiento sostenible.
* **Llamados a la Acción (CTAs):**
  * **Botón Primario:** `Agendar Consultoría Inicial` (dirige a `#contacto`).
  * **Botón Secundario:** `Explorar Soluciones` (dirige a `#servicios`).
* **Barra de Pilares Inferiores (3 columnas):**
  1. **100% A la Medida** — *Arquitectura sin plantillas genéricas*
  2. **Operación Conectada** — *Flujos automatizados sin fricciones*
  3. **Estética Editorial** — *Sofisticación visual y rendimiento*

---

### C. Sección Nuestra Esencia (`#esencia`)
* **Fondo:** Crema lino oscuro (`#EFECE6`) con bordes divisorios sutiles.
* **Encabezado:**
  * Etiqueta: `Nuestra Esencia`
  * Título (`H2`): `El origen de una alianza entre precisión técnica y criterio estético`

#### 1. Tarjeta de Historia (Ancho completo, Grid 12 columnas)
* **Columna Izquierda (4 cols):**
  * Etiqueta: `Nuestra Historia`
  * Título (`H3`): `La visión compartida de D & A`
  * Cita destacada: *“Donde la ingeniería de software y el diseño con propósito convergen.”*
* **Columna Derecha (8 cols):**
  * Párrafo 1: **Koda Studio** nació de la visión compartida de dos socios (**D & A**), quienes detectaron un patrón recurrente en el mercado: la mayoría de las empresas intentan escalar utilizando herramientas genéricas, lentas y completamente desconectadas entre sí.
  * Párrafo 2: Frente a los clichés oscuros e impersonales de la industria tecnológica tradicional, decidimos fundar un espacio boutique donde la ingeniería de software rigorosa y el diseño con propósito se unieran. Así creamos una firma que no solo programa sitios web o automatiza tareas aisladas, sino que construye la infraestructura tecnológica que impulsa los negocios hacia adelante con elegancia, precisión y un estilo completamente propio.

#### 2. Grid de Misión y Visión (2 columnas iguales)
* **Tarjeta 01 — Nuestra Misión:**
  * Etiqueta: `Propósito Diario`
  * Texto: *“Construir ecosistemas digitales a medida que unan el desarrollo web de alta gama, la automatización inteligente y los sistemas de ventas eficientes, transformando la operación diaria de nuestros clientes en un motor de crecimiento sostenible y sin fricciones.”*
  * Pie de tarjeta: `Ejecución & Arquitectura — 01`
* **Tarjeta 02 — Nuestra Visión:**
  * Etiqueta: `Horizonte Estratégico`
  * Texto: *“Convertirnos en el estudio tecnológico de referencia para marcas que buscan sofisticación, rendimiento y diseño excepcional, destacando por crear soluciones a la medida que desafían los estándares genéricos de la industria.”*
  * Pie de tarjeta: `Vanguardia & Distinción — 02`

---

### D. Sección Servicios y Soluciones (`#servicios`)
* **Encabezado:**
  * Etiqueta: `Servicios & Soluciones`
  * Título (`H2`): `Cuatro pilares diseñados para escalar su negocio con elegancia`
  * Descripción lateral: *Cada solución se concibe de forma integral para que su presencia digital, procesos internos y ventas operen en perfecta sincronía.*

* **Grid de 4 Tarjetas (2x2 en Desktop, 1 columna en Mobile):**
  1. **01. Desarrollo Web de Alta Gama**
     * *Descripción:* Sitios web corporativos, plataformas digitales y experiencias interactivas desarrolladas desde cero con código limpio, velocidad sobresaliente y una dirección de arte editorial que eleva el valor percibido de su marca.
     * *Puntos clave:* Arquitectura web a medida y diseño responsivo / Optimización de rendimiento, SEO técnico y accesibilidad.
  2. **02. Automatización de Procesos**
     * *Descripción:* Flujos de trabajo inteligentes que conectan sus aplicaciones actuales, eliminan la captura manual repetitiva y sincronizan datos en tiempo real para liberar horas valiosas de su equipo.
     * *Puntos clave:* Integración de APIs, bases de datos y mensajería / Orquestación de tareas operativas sin error humano.
  3. **03. Sistemas de Ventas**
     * *Descripción:* Infraestructura comercial diseñada para convertir visitantes en clientes. Estructuramos embudos digitales, calificación automática de prospectos y seguimiento continuo para que ninguna oportunidad se pierda.
     * *Puntos clave:* Embudos de captación y agendas automatizadas / Conexión directa con CRM y trazabilidad comercial.
  4. **04. Soporte Técnico Especializado**
     * *Descripción:* Acompañamiento continuo, monitoreo preventivo y evolución constante de su infraestructura digital. Actuamos como su departamento tecnológico de confianza para garantizar estabilidad total.
     * *Puntos clave:* Mantenimiento evolutivo, seguridad y respaldos / Asesoría directa y resolución ágil con los socios.

---

### E. Sección de Contacto y Consultoría (`#contacto`)
* **Fondo:** Contraste dramático en `Deep Plum` (`#4A2E35`) con texto claro (`#F9F8F6`).
* **Columna Izquierda (5 cols):**
  * Etiqueta: `Iniciemos la Conversación`
  * Título (`H2`): `Construyamos juntos su próximo ecosistema digital.`
  * Texto: Agende una sesión de descubrimiento con **D & A**. Analizaremos sus cuellos de botella actuales y diseñaremos una hoja de ruta tecnológica hecha exactamente a la medida de su marca.
  * Datos directos: `hola@kodastudio.com` y `Sesión estratégica de 30 min • Sin compromiso`.
* **Columna Derecha (7 cols — Tarjeta de Formulario en Crema Lino):**
  * Campos:
    * `Nombre Completo` (texto requerido)
    * `Correo Corporativo` (email requerido)
    * `Selector Interactivo de Soluciones` (botones seleccionables múltiples: *Desarrollo Web*, *Automatización*, *Sistemas de Ventas*, *Ecosistema Integral*)
    * `Descripción del Proyecto` (`textarea` requerido)
  * Botón de envío: `Solicitar Llamada de Descubrimiento`
  * **Estado de Confirmación:** Al enviar, oculta el formulario y muestra un mensaje personalizado agradeciendo por su nombre y confirmando los servicios seleccionados.

---

### F. Footer (`<footer>`)
* **Fila Superior:** Isotipo circular + *Koda Studio* (*Ingeniería & Diseño Boutique • D & A*) a la izquierda; enlaces rápidos de navegación a la derecha.
* **Fila Inferior:** Copyright dinámico con año actual y firma: *Diseñado y desarrollado a la medida por D & A.*

---

## 3. Requerimientos Técnicos y de Interactividad (JavaScript)

1. **Scroll Reveal (`IntersectionObserver`):** Todos los bloques principales llevan la clase `.reveal` (`opacity: 0; translateY(28px)`) y transicionan suavemente al entrar en el viewport (`threshold: 0.12`).
2. **Navegación Responsive:** Toggle para abrir/cerrar el menú móvil y cierre automático al hacer clic en cualquier enlace de ancla (`scroll-smooth`).
3. **Selector Multi-opción de Servicios:** Uso de un `Set()` en JavaScript para permitir seleccionar/deseleccionar múltiples pilares de servicio, actualizando visualmente cada píldora y guardando los valores en un `<input type="hidden">`.
4. **Validación y Feedback Inline:** Prevención de recarga (`e.preventDefault()`) y renderizado de confirmación en pantalla sin utilizar ventanas emergentes nativas (`alert()`).