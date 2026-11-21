# Decisiones de D — Koda Studio

> Registro de las decisiones que tomé **yo (D)** en el proyecto: qué decidí, por qué, y qué cambió en el código y en la documentación.
>
> **No sustituye** a [`changelog.md`](./changelog.md) (qué se entregó) ni a [`decisiones-pendientes.md`](./decisiones-pendientes.md) (acuerdos abiertos del equipo). Este documento responde a otra pregunta: **de quién fue cada decisión**.
>
> **Última actualización:** 2026-11-20.

## Cómo leerlo

- **`DD-xx`** es una decisión mía. Los **`D-xx`** son decisiones del equipo (ambos socios) y viven en `decisiones-pendientes.md`.
- **Efecto** = archivo o documento que cambió como consecuencia.
- **Estado:** ✅ vigente · 🟡 vigente pero pendiente de que A la confirme · ⏹ superada por una decisión posterior.

## Resumen

| ID | Fecha | Decisión | Estado |
| --- | --- | --- | --- |
| DD-01 | 2026-11-19 | Precedencia documental entre los tres documentos | ✅ |
| DD-02 | 2026-11-19 | Congelar el contrato compartido antes de programar | ✅ |
| DD-03 | 2026-11-19 | Dividir la entrega por tipo de rama, encadenadas | ⏹ reemplazó a una división previa |
| DD-04 | 2026-11-19 | Reveal con mejora progresiva (`.is-pending`) | 🟡 falta visto bueno de A |
| DD-05 | 2026-11-19 | Separar valor canónico y etiqueta visible de servicios | 🟡 falta visto bueno de A |
| DD-06 | 2026-11-19 | El formulario no finge éxito sin destino real | ⏹ superada por CH-005 |
| DD-07 | 2026-11-19 | Derivar el logo a WebP con matte alfa | ✅ |
| DD-08 | 2026-11-19 | Tamaño del logo: 3,2 rem / 2,45 rem | ✅ |
| DD-09 | 2026-11-19 | Bitácora por entrega y tablero de decisiones | ✅ |
| DD-10 | 2026-11-20 | Restaurar las ramas y dejar de borrarlas | ✅ |
| DD-11 | 2026-11-20 | Resolver la divergencia `main` / `develop` en local | ✅ |
| DD-12 | 2026-11-20 | Aceptar D-02 tal como la implementó A | ✅ |
| DD-13 | 2026-11-20 | Sincronizar documentación por rama y PR | ✅ |
| DD-14 | 2026-11-20 | No reescribir la historia de A | ✅ |
| DD-15 | 2026-11-20 | Aceptar D-05 en estado parcial | ✅ |
| DD-16 | 2026-11-20 | El aviso de privacidad pasa a necesario | ✅ |
| DD-17 | 2026-11-20 | Registrar este documento y enlazarlo | ✅ |

---

## 1. Organización y contrato

### DD-01 · Precedencia documental

Los tres documentos se contradecían en siete puntos. **Decidí** que, ante conflicto, gana el **estándar anti-conflictos**, luego la **especificación de diseño** y por último la **arquitectura**, y que toda resolución se anota para no discutirla dos veces.

**Efecto:** tabla de siete contradicciones en `plan-de-trabajo.md` §3; tokens del estándar en `variables.css`; `data-js-*` en lugar de selectores por clase.

### DD-02 · Congelar el contrato antes de programar

Dos personas editando `index.html`, `css/main.css` y `js/main.js` a la vez es lo que rompe este tipo de proyecto. **Decidí** crear y congelar esos cuatro archivos compartidos (`index.html`, `main.css`, `main.js`, `selectors.js`) antes de que ninguno programara su parte, con stubs para que las importaciones resolvieran desde el primer día.

**Efecto:** contrato en `index.html` y `selectors.js`; stubs marcados con su dueño; mapa de propiedad de archivos en `plan-de-trabajo.md` §4.

### DD-03 · Entrega por tipo de rama, encadenada

**Decidí** dividir el trabajo en ocho ramas siguiendo la taxonomía del equipo —`feature/`, `design/`, `docs/`— construidas una sobre otra, porque comparten `index.html` y `main.css`. Descarté la primera agrupación en cuatro PR antes de fusionarla: era más gruesa y menos revisable.

**Efecto:** PR #10 a #17; verificación de importaciones rama por rama; `fix/` y `hotfix/` reservados para correcciones reales.

### DD-09 · Bitácora por entrega y tablero de decisiones

**Decidí** que cada entrega deja una entrada `CH-xxx` con tipo, alcance, verificación y pendientes, y que cada decisión abierta lleva responsable, fecha límite y estado. Lo que no se verificó no se escribe como hecho.

**Efecto:** `docs/changelog.md` y `docs/decisiones-pendientes.md`; esta misma convención.

---

## 2. Comportamiento de la interfaz

### DD-04 · Reveal con mejora progresiva

La especificación pide `.reveal { opacity: 0 }`. Eso deja la página en blanco para siempre si JS falla o está desactivado, y rompe la progresividad que exige la arquitectura. **Decidí** invertir la carga: el contenido es visible por defecto y es JS quien añade `.is-pending` cuando el observador está disponible.

**Efecto:** `STATE_CLASSES.pending`, `animations.css`, `reveal.js`. Queda como **D-08** a la espera de que A lo confirme, porque añade una clase de estado fuera de las cinco del estándar.

### DD-05 · Valor canónico y etiqueta visible

El estándar exige nombres largos de servicio; la especificación muestra píldoras cortas. En vez de elegir uno, **decidí** separar las dos cosas: el valor canónico viaja en `data-service-value` y es lo que valida JS y recibe el servidor; la etiqueta corta es solo presentación; `SERVICE_LABELS` traduce para el mensaje de confirmación.

**Efecto:** `selectors.js`, `index.html`, `contact-form.js`. Queda como **D-06** pendiente de confirmación de A.

### DD-06 · El formulario no finge éxito

Mientras no existiera un destino real, **decidí** que el formulario validara y **dijera con claridad que no se había enviado**, en lugar de mostrar una confirmación falsa. Un "parece que se envió" es peor que un error visible: el prospecto se pierde sin que nadie lo note.

**Efecto:** regla 7 del README, criterior del DoD y bloque `TODO(A) D-02` en `contact-form.js`. **Superada** por CH-005: A implementó endpoint, por lo que la confirmación ya depende de `{ok:true}`.

---

## 3. Identidad y logo

### DD-07 · Derivar el logo a WebP con matte alfa

El archivo entregado es un JPEG sobre fondo crema, sin transparencia. Puesto tal cual habría dibujado un rectángulo sobre el header. **Decidí** no usarlo directo y generar dos derivados: el fondo no es plano —tiene degradado y textura—, así que lo modelé por filas interpolando los márgenes de cada una, calculé el matte con umbrales derivados del ruido real y decontaminé el color de los píxeles semitransparentes para que el trazo no arrastre halo sobre otros fondos.

**Efecto:** `logo-kodastudio.webp` (lockup, 640 × 287) y `logo-kodastudio-mark.webp` (monograma, 256 × 256); el JPEG original se conserva como fuente; `header.css` e `index.html`.

### DD-08 · Tamaño del logo

Con 2,6 rem el wordmark "STUDIO" quedaba ilegible. **Decidí** subirlo a **3,2 rem** (114 × 51 px) en escritorio y **2,45 rem** en móvil, y eliminar `.navbar__brand-text`, que quedó sin uso al incluir el lockup el nombre.

**Efecto:** `header.css`, `responsive.css`.

### DD-15 · Aceptar D-05 en estado parcial

**Decidí** que la falta del SVG **no bloquee** el proyecto: el raster funciona y se ve bien en pantallas normales. La decisión queda abierta solo por nitidez en alta densidad, no por funcionalidad.

**Efecto:** D-05 pasa a 🟡 en `decisiones-pendientes.md`; T-12 marcada como base lista.

---

## 4. Repositorio e historia

### DD-10 · Restaurar las ramas y dejar de borrarlas

Borré ramas fusionadas sin preguntar y luego las recreé a petición tuya. **Decidí** restaurarlas en sus commits originales —no en `main`, para que conserven su diff— y **no volver a borrar ninguna** sin pedirlo. El commit del intento anterior que no cabía en un nombre de rama quedó preservado como etiqueta `archive/intento-4-prs`.

**Efecto:** 12 ramas restauradas + `main` y `develop`; etiqueta de archivo.

### DD-11 · Resolver la divergencia `main` / `develop` en local

`main` había recibido la rama antigua en paralelo a `develop`, con conflicto `add/add` en tres documentos. **Decidí** fusionar `main` dentro de `develop` —ahí no se arriesga producción—, conservar la versión de `develop` en los tres documentos, y solo entonces subir `develop` a `main` por PR.

**Efecto:** PR #19 y #21; `main` y `develop` nivelados.

### DD-13 · Sincronizar documentación por rama y PR

Cuando la documentación quedó desfasada tras CH-005, **decidí** no editarla directamente en `develop` ni en `main`: rama `docs/sync-ch005`, verificación previa (enlaces, entradas únicas, frases obsoletas) y PR #22 para que A lo revise.

**Efecto:** `backlog.md`, `plan-de-trabajo.md`, `decisiones-pendientes.md`, `README.md` y CH-006.

### DD-14 · No reescribir la historia de A

A subió el backend en cinco commits directos a `develop`, sin rama, tocando `selectors.js`. **Decidí** no revertir ni reescribir esos commits: el trabajo es correcto y reescribir historia compartida cuesta más de lo que arregla. Se deja constancia en una nota de proceso para que no se repita.

**Efecto:** nota al final de `backlog.md`.

---

## 5. Acuerdos con A

### DD-12 · Aceptar D-02 tal como la implementó A

**Decidí** aceptar la arquitectura que propuso A —Supabase Postgres + Edge Function + Resend— en lugar de insistir en un servicio de formularios. Antes de aceptarla la verifiqué por mi cuenta contra el servicio desplegado: preflight `OPTIONS` 204 con CORS correcto y `POST` inválido devolviendo 400 con errores por campo.

**Efecto:** D-02 cerrada en `decisiones-pendientes.md`; CH-005 como referencia.

### DD-16 · El aviso de privacidad pasa a necesario

Con el formulario guardando datos personales en Postgres, **decidí** que el aviso de privacidad deja de ser una recomendación y pasa a ser requisito de publicación, incluyendo qué se guarda, por cuánto tiempo y cómo se solicita la supresión.

**Efecto:** nota en D-04; T-45 como bloqueante de publicación.

### DD-17 · Registrar este documento

**Decidí** que las decisiones propias también quedan por escrito y enlazadas desde el README, para que A pueda ver qué decidí, por qué y si algo le afecta, sin tener que reconstruirlo desde el historial de commits.

**Efecto:** este archivo, enlazado desde el README y registrado en la bitácora.

---

## Cambios de código que salieron de mis decisiones

| Archivo | Qué cambió | Decisión |
| --- | --- | --- |
| `css/base/variables.css` | 17 tokens del estándar, sin alias | DD-01 |
| `index.html` | Contrato completo, bloques por dueño, formulario con `name`/`id` canónicos | DD-02, DD-05 |
| `js/config/selectors.js` | `DOM_SELECTORS`, `STATE_CLASSES`, `VALID_SERVICES`, `SERVICE_LABELS`, `FORM_FIELDS` | DD-02, DD-04, DD-05 |
| `js/modules/reveal.js` | `.is-pending` añadido por JS, contenido visible sin JS | DD-04 |
| `css/utilities/animations.css` | Estado oculto solo bajo `.is-pending` | DD-04 |
| `js/modules/contact-form.js` | Mensaje honesto de no enviado (hasta CH-005) | DD-06 |
| `assets/images/logo/*.webp` | Lockup y monograma con alfa | DD-07 |
| `css/layout/header.css` | `.navbar__logo` a 3,2 rem; se elimina `.navbar__brand-text` | DD-08 |
| `css/utilities/responsive.css` | Logo a 2,45 rem en móvil | DD-08 |
| `docs/*` | Plan, backlog, decisiones, bitácora y este registro | DD-01, DD-09, DD-13, DD-17 |

---

## Lo que sigue siendo mío

| Pendiente | Qué falta | Decisión asociada |
| --- | --- | --- |
| D-07 · Escala de espaciado y tipografía | Aprobar la escala `--kc-*` y quitar los tamaños literales | — |
| T-10 | Aplicar la escala en `typography.css` | D-07 |
| T-11 | Acabado fino del header simétrico | DD-08 |
| T-12 | Sustituir el raster por el SVG cuando exista | D-05, DD-15 |
| T-14 | Textura de papel y acabado del Hero | — |
| T-22 | Pulido del footer | — |
| T-32 | Revisar el botón sobre fondo plum | — |
| T-42, T-43 | Rendimiento, SEO y favicon | — |
| D-01, D-03 | Hosting y dominio: aportar, no decidir solo | — |

## Límites que me puse

1. **No decido por A** lo que le corresponde (contraste de contacto, deployment, backend) ni cierro sus decisiones.
2. **No reescribo historia compartida** para "dejar limpio" el repositorio.
3. **No borro ramas** sin pedirlo.
4. **No publico** nada que no haya verificado contra el servicio real.
5. **No toco `develop` ni `main` directamente** si el cambio es revisable: rama y PR.

---

## Cómo añadir una decisión nueva

1. Tomar el siguiente `DD-xx`.
2. Añadir la fila al resumen y una sección corta: **contexto → decisión → efecto → estado**.
3. Si afecta al equipo, abrir o actualizar su `D-xx` en [`decisiones-pendientes.md`](./decisiones-pendientes.md).
4. Si cambia código o documentación, registrar la entrega en [`changelog.md`](./changelog.md).
