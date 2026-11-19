> **Documento de referencia.** Se conserva con la redacción original (marca actualizada a
> Koda Studio). Las desviaciones aplicadas en el código —tokens de sombra y transición,
> atributos `data-js-*`, nombres de servicio y edición del reveal— están registradas en
> [plan-de-trabajo.md §3](./plan-de-trabajo.md).

# Arquitectura de Desarrollo --- Landing Page Koda Studio

> Guía técnica para construir la landing page de Koda Studio a
> partir de la especificación visual y funcional existente.\
> **Enfoque propuesto:** HTML5, CSS3 y JavaScript modular (ES Modules),
> sin imponer un framework. Si más adelante se adopta React, Vue u otro
> framework, esta separación de responsabilidades seguirá siendo útil.

------------------------------------------------------------------------

## 1. Objetivo de la arquitectura

Construir una landing page rápida, responsive, accesible y fácil de
mantener. La implementación debe respetar la dirección de arte boutique,
editorial, cálida y sofisticada definida para Koda Studio.

La arquitectura debe cumplir estos principios:

1.  **Separación de responsabilidades:** HTML para estructura, CSS para
    presentación y JavaScript para comportamiento.
2.  **Modularidad:** cada módulo debe encargarse de una responsabilidad
    concreta.
3.  **Reutilización:** evitar repetir estilos, validaciones y lógica.
4.  **Mantenibilidad:** nombres claros, archivos pequeños y funciones
    con una tarea definida.
5.  **Accesibilidad:** navegación por teclado, etiquetas, estados
    visibles y estructura semántica.
6.  **Responsive first:** la experiencia debe funcionar en móvil, tablet
    y escritorio.
7.  **Progresividad:** el contenido principal debe seguir siendo
    comprensible aunque JavaScript no esté disponible.

------------------------------------------------------------------------

## 2. Estructura de carpetas recomendada

``` text
kodastudio/
│
├── index.html
├── README.md
├── .gitignore
│
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   ├── backgrounds/
│   │   └── services/
│   ├── icons/
│   └── fonts/                 # Solo si se decide alojar fuentes localmente
│
├── css/
│   ├── main.css               # Archivo principal que importa los demás
│   ├── base/
│   │   ├── reset.css
│   │   ├── variables.css      # Design tokens: colores, fuentes, radios, sombras
│   │   └── typography.css
│   ├── layout/
│   │   ├── header.css
│   │   ├── sections.css
│   │   └── footer.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   └── service-selector.css
│   └── utilities/
│       ├── animations.css
│       └── responsive.css
│
├── js/
│   ├── main.js                # Punto de entrada: inicializa los módulos
│   ├── config/
│   │   └── selectors.js       # Selectores DOM centralizados (si aporta claridad)
│   ├── modules/
│   │   ├── navigation.js      # Menú móvil y navegación por anclas
│   │   ├── reveal.js          # Animaciones con IntersectionObserver
│   │   ├── service-selector.js# Selección múltiple de servicios
│   │   ├── contact-form.js    # Validación y envío del formulario
│   │   └── footer.js          # Año dinámico
│   └── utils/
│       ├── dom.js             # Ayudantes DOM reutilizables, si se necesitan
│       └── validation.js      # Funciones puras de validación
│
└── docs/
    └── arquitectura.md        # Decisiones técnicas y notas del proyecto
```

### Responsabilidad de los directorios

  -----------------------------------------------------------------------
  Directorio                          Responsabilidad
  ----------------------------------- -----------------------------------
  `assets/`                           Imágenes, iconos, logotipos y
                                      recursos estáticos.

  `css/base/`                         Normalización, variables globales y
                                      tipografía.

  `css/layout/`                       Estilos de las grandes regiones y
                                      secciones.

  `css/components/`                   Estilos reutilizables de botones,
                                      tarjetas y formularios.

  `css/utilities/`                    Animaciones, clases auxiliares y
                                      media queries.

  `js/modules/`                       Comportamientos independientes de
                                      la interfaz.

  `js/utils/`                         Funciones pequeñas reutilizables y
                                      sin dependencia de una sección
                                      concreta.

  `docs/`                             Documentación técnica y decisiones
                                      del equipo.
  -----------------------------------------------------------------------

**Regla:** no crear archivos o capas por anticipado si todavía no tienen
una responsabilidad real. La estructura puede crecer conforme se
implementen funcionalidades.

------------------------------------------------------------------------

## 3. Estructura de la página HTML

Usar etiquetas semánticas de HTML5. Cada sección debe tener un
identificador que coincida con los enlaces de navegación especificados.

``` html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
          content="Koda Studio: ingeniería de software y diseño con propósito.">
    <title>Koda Studio | Ingeniería & Diseño Boutique</title>
    <link rel="stylesheet" href="css/main.css">
    <script type="module" src="js/main.js"></script>
</head>
<body>

    <header id="navbar">
        <!-- Navegación desktop y móvil -->
    </header>

    <main>
        <section id="inicio" aria-labelledby="inicio-title">
            <!-- Hero, propuesta de valor, CTA y pilares -->
        </section>

        <section id="esencia" aria-labelledby="esencia-title">
            <!-- Historia, misión y visión -->
        </section>

        <section id="servicios" aria-labelledby="servicios-title">
            <!-- Cuatro tarjetas de servicios -->
        </section>

        <section id="contacto" aria-labelledby="contacto-title">
            <!-- Información y formulario de contacto -->
        </section>
    </main>

    <footer id="footer">
        <!-- Identidad, enlaces y copyright -->
    </footer>

</body>
</html>
```

### Reglas para HTML

-   Mantener un solo `h1`, ubicado en el Hero.
-   Usar `h2` para títulos de sección y `h3` para títulos de tarjetas.
-   Usar `<nav>` para los enlaces de navegación.
-   Usar `<button>` para acciones y `<a>` para navegar.
-   Asociar cada campo del formulario con un `<label>`.
-   No utilizar elementos HTML únicamente para conseguir apariencia
    visual.
-   Añadir textos alternativos útiles a imágenes informativas; usar
    `alt=""` en imágenes decorativas.
-   Mantener los identificadores `inicio`, `esencia`, `servicios` y
    `contacto` para los enlaces internos.

------------------------------------------------------------------------

## 4. Sistema de diseño y organización CSS

### 4.1 Variables globales

Los valores definidos en la especificación deben centralizarse en
`css/base/variables.css`. Así se evita repetir códigos de color, fuentes
y medidas.

``` css
:root {
    /* Colores */
    --color-linen: #F9F8F6;
    --color-linen-dark: #EFECE6;
    --color-linen-light: #FDFCFB;
    --color-plum: #4A2E35;
    --color-plum-dark: #362026;
    --color-bronze: #B08D79;
    --color-bronze-dark: #9C7A65;
    --color-charcoal: #241D1F;
    --color-muted: #6E6366;

    /* Tipografía */
    --font-heading: 'Cormorant Garamond', serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;

    /* Forma y profundidad */
    --radius-card: 24px;
    --border-subtle: 1px solid rgba(74, 46, 53, 0.08);
    --shadow-card: 0 8px 24px rgba(74, 46, 53, 0.06);

    /* Transiciones */
    --transition-base: 250ms ease;
}
```

Los valores son tokens globales: si cambia la identidad visual, se
actualizan aquí y no en cada componente.

### 4.2 Orden de carga

`css/main.css` debe ser el punto de entrada de estilos:

``` css
@import url("./base/reset.css");
@import url("./base/variables.css");
@import url("./base/typography.css");

@import url("./layout/header.css");
@import url("./layout/sections.css");
@import url("./layout/footer.css");

@import url("./components/buttons.css");
@import url("./components/cards.css");
@import url("./components/forms.css");
@import url("./components/service-selector.css");

@import url("./utilities/animations.css");
@import url("./utilities/responsive.css");
```

Para producción, revisar el rendimiento de carga de fuentes y CSS. Si se
utiliza un proceso de compilación, agrupar y optimizar los estilos en un
archivo final.

### 4.3 Convención de clases

Usar nombres descriptivos y consistentes. Una convención sencilla
inspirada en BEM ayuda a identificar cada componente:

``` css
.hero {}
.hero__title {}
.hero__description {}
.hero__actions {}

.service-card {}
.service-card__title {}
.service-card__description {}

.contact-form {}
.contact-form__field {}
.contact-form__submit {}
```

Evitar selectores demasiado dependientes de la estructura, como
`main section div:nth-child(2) p`.

------------------------------------------------------------------------

## 5. Arquitectura JavaScript

Usar módulos ES (`import` y `export`) para mantener cada comportamiento
separado. El archivo `main.js` debe limitarse a iniciar los módulos; no
debe contener toda la lógica de la página.

### 5.1 Punto de entrada: `js/main.js`

``` javascript
import { initNavigation } from "./modules/navigation.js";
import { initReveal } from "./modules/reveal.js";
import { initServiceSelector } from "./modules/service-selector.js";
import { initContactForm } from "./modules/contact-form.js";
import { initFooter } from "./modules/footer.js";

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initReveal();
    initServiceSelector();
    initContactForm();
    initFooter();
});
```

Cada módulo exporta una función de inicialización. Esto hace explícito
qué funcionalidades se activan y facilita localizar errores.

### 5.2 Navegación: `navigation.js`

Responsabilidades:

-   Abrir y cerrar el menú móvil.
-   Actualizar `aria-expanded` y el estado accesible del botón.
-   Cerrar el menú al seleccionar un enlace.
-   Permitir navegación por anclas.
-   Evitar que el menú quede abierto después de cambiar de sección.

Pseudoflujo:

``` text
Inicializar navegación
    Buscar botón y menú
    Si no existen, terminar módulo
    Escuchar clic del botón
        Alternar estado abierto/cerrado
        Actualizar aria-expanded
    Escuchar clic en enlaces del menú
        Cerrar menú
        Actualizar aria-expanded
```

Usar `addEventListener`; evitar atributos inline como `onclick` en el
HTML.

### 5.3 Animaciones: `reveal.js`

Responsabilidad: revelar elementos cuando entran en el área visible de
la pantalla mediante `IntersectionObserver`.

La especificación establece:

-   Clase `.reveal`.
-   Estado inicial con opacidad cero y desplazamiento vertical de 28px.
-   `threshold: 0.12`.

Pseudoflujo:

``` text
Inicializar reveal
    Buscar elementos .reveal
    Comprobar soporte de IntersectionObserver
    Crear observer con threshold 0.12
    Cuando un elemento sea visible
        Agregar clase de estado visible
        Dejar de observar ese elemento
```

En CSS, definir la transición y la clase de estado visible. Respetar
`prefers-reduced-motion` para usuarios que soliciten movimiento
reducido. Si `IntersectionObserver` no está disponible, mostrar el
contenido sin ocultarlo permanentemente.

### 5.4 Selector de servicios: `service-selector.js`

Responsabilidad: permitir seleccionar y deseleccionar varios servicios.

Servicios indicados en la especificación:

-   Desarrollo Web.
-   Automatización.
-   Sistemas de Ventas.
-   Ecosistema Integral.

La especificación propone utilizar un `Set()` y sincronizar el resultado
con un input oculto.

Pseudoflujo:

``` text
Inicializar selector
    Crear Set vacío
    Buscar botones de servicio e input oculto
    Para cada botón
        Escuchar clic
        Si el servicio está seleccionado
            Eliminarlo del Set
            Quitar estado visual seleccionado
        Si no está seleccionado
            Agregarlo al Set
            Aplicar estado visual seleccionado
        Actualizar input oculto con los servicios seleccionados
```

Ejemplo de representación de estado:

``` javascript
const selectedServices = new Set();

function toggleService(service) {
    if (selectedServices.has(service)) {
        selectedServices.delete(service);
    } else {
        selectedServices.add(service);
    }
}
```

El `Set` evita valores duplicados. El estado visual debe reflejar
siempre el contenido del conjunto. Los botones deben indicar su estado
con `aria-pressed`.

### 5.5 Formulario: `contact-form.js`

Responsabilidad: validar los datos, evitar la recarga de la página y
mostrar una confirmación accesible.

Campos requeridos según la especificación:

  -----------------------------------------------------------------------
  Campo                   Tipo                    Regla
  ----------------------- ----------------------- -----------------------
  Nombre completo         Texto                   Obligatorio

  Correo corporativo      Email                   Obligatorio y formato
                                                  válido

  Soluciones              Selección múltiple      Capturar los servicios
                                                  seleccionados

  Descripción del         Textarea                Obligatoria
  proyecto                                        
  -----------------------------------------------------------------------

Pseudoflujo:

``` text
Inicializar formulario
    Buscar formulario
    Escuchar evento submit
        Prevenir envío por defecto
        Leer y normalizar valores
        Validar campos
        Si hay errores
            Mostrar errores junto a los campos
            Detener proceso
        Si los datos son válidos
            Procesar el envío según el mecanismo configurado
            Si el envío fue exitoso
                Ocultar formulario
                Mostrar confirmación personalizada
```

**Importante:** la validación del navegador y JavaScript mejora la
experiencia, pero no reemplaza la validación del servidor. La
especificación visual no define un backend ni un servicio de correo.
Antes de publicar, se debe decidir cómo se recibirán y almacenarán las
solicitudes. No mostrar un mensaje de éxito si los datos no llegaron
realmente al destino configurado.

No utilizar `alert()`. Mostrar errores y confirmaciones dentro de la
página, con una región accesible como `aria-live="polite"`.

### 5.6 Año dinámico: `footer.js`

Responsabilidad: obtener el año actual y colocarlo en el elemento de
copyright.

``` javascript
export function initFooter() {
    const yearElement = document.querySelector("[data-current-year]");

    if (!yearElement) return;

    yearElement.textContent = new Date().getFullYear();
}
```

En HTML, el elemento correspondiente puede tener `data-current-year`.

------------------------------------------------------------------------

## 6. Estructuras de programación esenciales

Aplicar estas estructuras donde realmente resuelvan una necesidad. No se
deben añadir complejidad o abstracciones sin motivo.

  -----------------------------------------------------------------------
  Estructura                          Aplicación en el proyecto
  ----------------------------------- -----------------------------------
  Secuencia                           Inicializar módulos y actualizar el
                                      contenido de la interfaz en orden.

  Condicionales (`if`, `else`)        Comprobar campos, existencia de
                                      elementos y estados del menú.

  Ciclos (`for`, `for...of`)          Recorrer enlaces, botones de
                                      servicio y elementos `.reveal`.

  Funciones                           Separar tareas como abrir menú,
                                      validar correo y actualizar
                                      selección.

  Objetos                             Agrupar configuración o datos
                                      relacionados de un componente.

  Arrays                              Mantener colecciones ordenadas de
                                      enlaces o servicios cuando
                                      corresponda.

  `Set`                               Gestionar selecciones únicas de
                                      servicios sin duplicados.

  Eventos                             Responder a clics, envíos y otras
                                      interacciones del usuario.

  Módulos                             Separar funcionalidades mediante
                                      `import` y `export`.
  -----------------------------------------------------------------------

### Ejemplo de función con responsabilidad única

``` javascript
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
```

Esta función solamente comprueba el formato básico del correo. No
muestra mensajes, no modifica el formulario y no realiza envíos.

### Buenas prácticas de funciones

-   Una función debe tener una responsabilidad clara.
-   Utilizar nombres que describan acciones: `openMenu`, `validateForm`,
    `updateSelectedServices`.
-   Evitar funciones extensas que mezclen lectura de datos, validación,
    presentación y envío.
-   Recibir datos mediante parámetros y devolver resultados cuando sea
    posible.
-   Evitar variables globales innecesarias.
-   Comprobar que los elementos del DOM existen antes de utilizarlos.
-   No duplicar la misma lógica en distintos módulos.

------------------------------------------------------------------------

## 7. Responsividad y accesibilidad

### Responsividad

Implementar y probar, como mínimo, estos escenarios:

-   **Móvil:** navegación compacta con menú hamburguesa; tarjetas y
    formulario en una columna.
-   **Tablet:** adaptar grids y espacios para aprovechar el ancho
    disponible.
-   **Escritorio:** conservar la navegación simétrica, las composiciones
    de varias columnas y los grids definidos en el diseño.

Usar CSS Grid y Flexbox según la necesidad. Definir breakpoints basados
en el momento en que el contenido deja de acomodarse, no solamente en
modelos específicos de dispositivos.

### Accesibilidad

-   Mantener contraste suficiente entre texto y fondo.
-   Asegurar que todos los controles puedan utilizarse con teclado.
-   Mostrar un indicador de foco visible.
-   Asociar etiquetas con los campos del formulario.
-   Informar errores de forma textual, no solamente mediante color.
-   Utilizar `aria-expanded` en el menú y `aria-pressed` en los
    selectores.
-   Respetar `prefers-reduced-motion`.
-   Mantener un orden lógico de encabezados y navegación.

------------------------------------------------------------------------

## 8. Seguridad, rendimiento y calidad

### Seguridad

-   No insertar contenido proporcionado por usuarios usando `innerHTML`
    sin sanitización.
-   Preferir `textContent` para mostrar nombre, mensajes y otros textos.
-   No guardar contraseñas, claves privadas ni credenciales en el
    repositorio.
-   Si se conecta un backend, validar y limpiar datos también en el
    servidor.
-   Proteger el endpoint del formulario contra spam y abuso.
-   Publicar el sitio mediante HTTPS.

### Rendimiento y SEO

-   Comprimir imágenes y servirlas en formatos modernos cuando sea
    posible.
-   Definir dimensiones de imágenes para reducir saltos de diseño.
-   Cargar de forma diferida imágenes que estén fuera de la primera
    pantalla.
-   Evitar cargar bibliotecas que no sean necesarias.
-   Cuidar el peso y la carga de las fuentes de Google Fonts.
-   Añadir título, descripción, idioma y jerarquía de encabezados.
-   Verificar que los enlaces internos y metadatos funcionen
    correctamente.

### Calidad antes de integrar

-   Probar el menú en móvil y escritorio.
-   Comprobar todos los enlaces de navegación.
-   Verificar el selector múltiple y el input oculto.
-   Probar formulario vacío, correo inválido y datos válidos.
-   Confirmar que el mensaje de éxito solo aparezca después de un envío
    exitoso.
-   Probar animaciones y movimiento reducido.
-   Revisar la consola del navegador y corregir errores.
-   Probar en navegadores actuales de escritorio y móvil.

------------------------------------------------------------------------

## 9. Flujo de trabajo con Git y GitHub

Para un equipo pequeño, utilizar un flujo simplificado con `main`,
`develop` y ramas de trabajo.

``` text
main
 └── develop
      ├── feature/header-navigation
      ├── feature/hero-section
      ├── feature/essence-section
      ├── feature/services-section
      ├── feature/contact-form
      ├── feature/footer
      └── fix/mobile-navigation
```

### Crear la rama de desarrollo

``` bash
git switch main
git pull origin main
git switch -c develop
git push -u origin develop
```

### Crear una rama de funcionalidad

``` bash
git switch develop
git pull origin develop
git switch -c feature/header-navigation
```

### Guardar y publicar cambios

``` bash
git add .
git commit -m "feat: implementar navegacion principal"
git push -u origin feature/header-navigation
```

### Crear Pull Request

``` bash
gh pr create \
  --base develop \
  --head feature/header-navigation \
  --title "Implementar navegación principal" \
  --body "Agrega la estructura y el comportamiento responsive del header."
```

Una vez revisada y probada la funcionalidad, integrar el Pull Request en
`develop`. Cuando el sitio completo esté probado y aprobado, crear un
Pull Request de `develop` hacia `main`.

### Convención de commits

  ----------------------------------------------------------------------------------------------
  Prefijo                 Uso                     Ejemplo
  ----------------------- ----------------------- ----------------------------------------------
  `feat`                  Nueva funcionalidad     `feat: agregar formulario de contacto`

  `fix`                   Corrección de error     `fix: corregir menu movil`

  `style`                 Cambios visuales sin    `style: ajustar espaciado de tarjetas`
                          alterar lógica          

  `refactor`              Reorganización interna  `refactor: separar modulo de navegacion`
                          sin cambiar             
                          comportamiento          

  `docs`                  Documentación           `docs: documentar arquitectura del proyecto`

  `test`                  Pruebas                 `test: agregar pruebas de validacion`
  ----------------------------------------------------------------------------------------------

**Regla de equipo:** una rama debe atender una tarea concreta. Evitar
que dos personas editen simultáneamente los mismos archivos cuando sea
posible; dividir el trabajo por secciones o módulos y coordinar las
integraciones.

------------------------------------------------------------------------

## 10. Orden recomendado de desarrollo

  -----------------------------------------------------------------------
  Etapa                   Trabajo                 Resultado esperado
  ----------------------- ----------------------- -----------------------
  1\. Preparación         Crear repositorio,      Proyecto inicial
                          carpetas, `index.html`  organizado.
                          y archivos base.        

  2\. Sistema visual      Definir variables,      Identidad visual
                          fuentes, reset y        consistente.
                          estilos globales.       

  3\. Estructura HTML     Construir header, Hero, Página completa con
                          Esencia, Servicios,     contenido y anclas.
                          Contacto y Footer.      

  4\. Maquetación CSS     Implementar grids,      Diseño fiel a la
                          tarjetas, botones,      especificación.
                          formulario y            
                          responsive.             

  5\. Navegación          Implementar menú móvil  Navegación funcional.
                          y enlaces internos.     

  6\. Interacciones       Implementar reveal y    Componentes
                          selector múltiple.      interactivos.

  7\. Formulario          Validar campos y        Solicitudes procesables
                          conectar el mecanismo   y confirmación fiable.
                          real de recepción.      

  8\. Revisión            Accesibilidad,          Versión candidata para
                          rendimiento, SEO y      publicar.
                          pruebas.                

  9\. Publicación         Integrar en `main` y    Landing page en
                          configurar              producción.
                          hosting/dominio.        
  -----------------------------------------------------------------------

No avanzar al formulario como terminado hasta definir dónde se recibirán
las solicitudes. La especificación actual describe la interfaz y la
confirmación, pero no determina un servicio de envío o backend.

------------------------------------------------------------------------

## 11. Criterios de aceptación del proyecto

### Diseño y contenido

-   [ ] La paleta y tipografías coinciden con los tokens definidos.
-   [ ] Están presentes las secciones Inicio, Esencia, Servicios,
    Contacto y Footer.
-   [ ] El contenido corresponde a la especificación de Koda Studio.
-   [ ] Las tarjetas, botones y fondos mantienen el estilo editorial.

### Funcionalidad

-   [ ] El menú móvil abre, cierra y se cierra al navegar.
-   [ ] Los enlaces llevan a la sección correcta.
-   [ ] Los bloques `.reveal` aparecen al entrar en pantalla.
-   [ ] El selector permite elegir y quitar varios servicios.
-   [ ] El formulario valida los campos y muestra errores claros.
-   [ ] La confirmación solo aparece tras recibir una respuesta exitosa
    del mecanismo de envío.
-   [ ] El año del footer se actualiza automáticamente.

### Calidad

-   [ ] La página funciona en móvil, tablet y escritorio.
-   [ ] Se puede navegar mediante teclado.
-   [ ] No hay errores relevantes en la consola.
-   [ ] Las imágenes están optimizadas.
-   [ ] Los cambios se integran mediante Pull Requests.
-   [ ] `main` contiene únicamente versiones revisadas y listas para
    producción.

------------------------------------------------------------------------

## 12. Decisiones pendientes antes de comenzar

La especificación de diseño no determina todavía estos aspectos. El
equipo debe decidirlos antes de cerrar la implementación:

1.  **Tecnología de despliegue:** hosting estático o plataforma de
    despliegue.
2.  **Recepción del formulario:** backend propio, servicio de
    formularios o integración con CRM/correo.
3.  **Dominio y correo:** confirmar dominio y dirección de recepción.
4.  **Analítica y privacidad:** decidir si se medirán visitas y qué
    aviso de privacidad corresponde.
5.  **Contenido final:** confirmar logotipo SVG, recursos gráficos,
    textos y datos de contacto.

------------------------------------------------------------------------

## Recomendación final

Para la primera versión de Koda Studio, HTML5, CSS3 y JavaScript
modular son suficientes para implementar lo descrito sin introducir
complejidad innecesaria. La clave es mantener cada responsabilidad en su
lugar: estructura en HTML, diseño en CSS y comportamiento en módulos
JavaScript.

Primero se debe completar y validar la estructura visual; después,
incorporar interacciones; finalmente, conectar y probar el envío real
del formulario antes de publicar.
