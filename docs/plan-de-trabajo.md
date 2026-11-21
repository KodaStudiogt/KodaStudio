# Plan de trabajo — Landing Page Koda Studio

> Documento maestro de organización: **qué se construye, en qué orden, quién hace qué y cuándo se considera terminado**.
> Compañeros: [`backlog.md`](./backlog.md) (tareas y estado), [`decisiones-pendientes.md`](./decisiones-pendientes.md) (acuerdos abiertos) y [`changelog.md`](./changelog.md) (qué se hizo).
>
> **Última actualización:** 2026-11-20 · **Corte:** CH-005 (backend del formulario) + sincronización documental (CH-006). Ver [`changelog.md`](./changelog.md).

---

## 1. Resumen en una página

| Dato | Valor |
| --- | --- |
| Producto | Landing page one-page de Koda Studio |
| Stack | HTML5 + CSS3 + JavaScript ES Modules. Sin framework, sin build |
| Equipo | **D** (Diego): base técnica y acabado editorial · **A**: servicios, contacto y formulario |
| Repositorio | <https://github.com/mxrtinez10/KodaStudio> (`main` + `develop`) |
| Esfuerzo restante | ≈ 6,25 jornadas (D) y ≈ 4,25 (A) |
| Ruta crítica | Decisiones abiertas → acabado visual → secretos y dominio → QA → deploy |

**Foco de la organización:** el riesgo real no es técnico, es de coordinación. Dos personas editando `index.html`, `css/main.css` y `js/main.js` a la vez es lo que rompe este tipo de proyecto. Por eso esos archivos están congelados desde el inicio y el resto está repartido por capas.

---

## 2. Estado actual (punto de partida)

La base está alineada y el formulario ya envía de verdad. Lo que queda es **acabado visual, configuración del despliegue y QA**.

| Capa | Estado | Detalle |
| --- | --- | --- |
| Estructura HTML | ✅ Lista | Seis anclas, jerarquía de encabezados y copywriting de la especificación |
| Design tokens + tipografía | ✅ Base lista | 17 tokens obligatorios; escala pendiente de D-07 |
| Navegación móvil | ✅ Funcionando | Toggle, `aria-expanded`, cierre al navegar, `Escape` y `matchMedia` |
| Scroll reveal | ✅ Funcionando | Con mejora progresiva: sin JS el contenido se ve |
| Selector múltiple | ✅ Funcionando | `Set()` + `aria-pressed` + input oculto sincronizado |
| Validación del formulario | ✅ Funcionando | Por campo, con `.has-error` y `aria-invalid` |
| Composición fina (header, Hero, medallón, textura) | ⏳ Pendiente D | Base estructural hecha, falta el acabado de la spec |
| Contraste de `#contacto` y del formulario | ⏳ Pendiente A | Auditoría AA pendiente |
| Envío real del formulario | ✅ Funcionando | Edge Function + Postgres + Resend; falta configurar secretos y dominio |
| Logo | 🟡 Integrado en raster | Header con el lockup y footer con el monograma; falta el SVG (D-05) |
| Assets pendientes | ⛔ Bloqueado por D-05 | Favicon y patrón de fondo del Hero |

### 2.1 Qué cambió en las últimas entregas (CH-004 y CH-005)

- **Logo oficial** (CH-004): lockup en el header y monograma en el medallón del footer, derivados del JPEG con matte alfa limpio.
- **Backend del formulario** (CH-005): esquema PostgreSQL de seis tablas con prefijo `kc_`, RLS sin políticas públicas y Edge Function `contact`.
- **Envío real**: `fetch` con timeout, estado ocupado accesible, errores por campo desde el servidor, 429 y confirmación solo con respuesta exitosa.
- **Decisión D-02 cerrada**: Supabase Postgres + Edge Function + Resend, sin PHP.

Detalle, verificación y desviaciones en [`changelog.md`](./changelog.md).

---

## 3. Regla de precedencia documental

1. **Estándar anti-conflictos** — variables, atributos `data-js-*`, contrato del formulario.
2. **Especificación técnica y de diseño** — contenido, textos, valores visuales.
3. **Arquitectura de desarrollo** — estructura de carpetas y flujo.

Si el de arriba contradice al de abajo, gana el de arriba. Toda resolución se anota en `decisiones-pendientes.md`.

### Contradicciones ya resueltas

| # | Contradicción | Resolución aplicada |
| --- | --- | --- |
| 1 | La arquitectura (§4.1) define sombras y transiciones con valores distintos al estándar (§2.2) | Se usan los del **estándar** |
| 2 | El estándar lista tokens que la arquitectura omite (`--color-plum-light`, `--radius-input`, `--radius-pill`, `--border-accent`, `--transition-smooth`) | Se adoptan los del **estándar** |
| 3 | La arquitectura anima `.reveal` por clase; el estándar prohíbe que JS seleccione por clase visual | El elemento lleva `class="reveal" data-js="reveal"`; CSS estiliza, JS observa por `data-js` |
| 4 | La arquitectura usa `[data-current-year]`; el estándar exige `data-js="current-year"` | Manda el **estándar** |
| 5 | El estándar exige nombres largos de servicio; la spec muestra píldoras cortas | Valor canónico en `data-service-value`, etiqueta corta visible (D-06) |
| 6 | El estándar asume PHP; la arquitectura advertía que no había backend | **D-02 aceptada:** Supabase Postgres + Edge Function + Resend, sin PHP |
| 7 | El andamio anterior ocultaba el contenido hasta que JS cargara | Se usa `.is-pending` (D-08): sin JS, todo se ve |

---

## 4. Mapa de propiedad de archivos

Nadie edita archivos de otro sin avisar en el PR.

| Archivo / carpeta | Dueño | Notas |
| --- | --- | --- |
| `index.html` | **Compartido** | Cada uno edita solo su bloque (`BLOQUE D` / `BLOQUE A`) |
| `css/main.css` | **Compartido** | Solo `@import` |
| `js/main.js` | **Compartido** | Congelado |
| `js/config/selectors.js` | **Compartido** | Congelado; cambios = PR avisado |
| `css/base/*`, `css/layout/*` | D | reset, variables, tipografía, header, secciones, footer |
| `css/components/buttons.css` | D | |
| `css/components/cards.css` | A | tarjetas editoriales y de servicio |
| `css/components/forms.css` | A | inputs, errores, confirmación |
| `css/components/service-selector.css` | A | píldoras |
| `css/utilities/*` | D | helpers, animaciones, responsive |
| `js/modules/navigation.js`, `reveal.js`, `footer.js` | D | |
| `js/modules/service-selector.js`, `contact-form.js` | A | |
| `js/utils/validation.js` | A | |
| `db/`, `supabase/migrations/` | A | Esquema portable y seguridad de datos |
| `supabase/functions/contact/` | A | Edge Function del formulario |
| `supabase/functions/.env*`, `supabase/.temp` | A | Nunca se versionan los secretos |

---

## 5. Calendario por sprints

**Estado de ramas:** las ocho ramas de la entrega por tipo están fusionadas en `develop` (PR #10–#17) y el logo entró por `design/logo` (PR #20). El backend de CH-005 se subió directo a `develop`, sin rama. `fix/` y `hotfix/` siguen reservados para correcciones reales.

Los sprints **no tienen fechas fijas**: cada uno dura las jornadas indicadas. El plan no se rompe si un día no trabajan.

| Sprint | Foco | Estado | Jornadas restantes D | Jornadas restantes A |
| --- | --- | --- | --- | --- |
| **S0** | Contrato y arranque | 🟢 Cerrado salvo decisiones | 0,5 | 0,5 |
| **S1** | Identidad visual y acabado del header/Hero | 🟡 Base hecha, falta acabado | 2,25 | — |
| **S2** | Acabado de esencia y contacto | 🟡 Base hecha, falta pulido | 0,5 | 1,0 |
| **S3** | Envío real del formulario | 🟢 Cerrado, falta desplegar | 0,25 | — |
| **S4** | QA y publicación | ⚪ No iniciado | 2,75 | 2,75 |
| | **Total restante** | | **≈ 6,25** | **≈ 4,25** |

**Traducción a calendario:** a tiempo completo (8 h/día) son ~1,5 semanas; a medio tiempo (4 h/día), ~3 semanas.

**Hitos de integración obligatorios** al final de cada sprint: PR de cada rama hacia `develop` y revisión cruzada de 15 minutos. Nada permanece en una rama local más de un día.

---

## 6. Ritmo de trabajo

| Momento | Quién | Qué |
| --- | --- | --- |
| Inicio de sprint | Ambos | Elegir 2–3 tareas del backlog por persona |
| Daily (10 min) | Ambos | Qué hice, qué sigue, qué me bloquea |
| Mitad de sprint | Ambos | Integración parcial a `develop` |
| Cierre de sprint | Ambos | Demo del hito + mover tarjetas + actualizar decisiones y bitácora |

**Regla de bloqueo:** si estás bloqueado más de medio día por la otra persona o por una decisión pendiente, se dice en el daily. No se queda en silencio.

---

## 7. Definición de Terminado (DoD)

- [ ] Cumple el criterio de aceptación del backlog.
- [ ] Funciona en 375 px, 768 px y 1440 px.
- [ ] Se usa solo con teclado y tiene foco visible.
- [ ] No usa valores mágicos: tokens de `variables.css`.
- [ ] JS no selecciona por clase visual.
- [ ] Sin errores nuevos en consola.
- [ ] Integrado en `develop` por Pull Request.
- [ ] Entrada correspondiente en `docs/changelog.md`.

---

## 8. Riesgos y mitigación

| Riesgo | Prob. | Impacto | Mitigación |
| --- | --- | --- | --- |
| Se publica sin `CONTACT_TO_EMAIL` y el correo no sale | Media | **Crítico** | La solicitud igual queda en `kc_contact_requests`; revisar `email_sent_at` / `email_error` antes de publicar |
| Dominio remitente sin verificar en Resend | Media | Alto | Con `onboarding@resend.dev` solo llega al buzón dueño de la cuenta; verificar dominio (T-44) |
| El logo SVG no llega | Media | Bajo | Ya hay raster integrado; el SVG mejora nitidez, no bloquea |
| Conflictos de merge en `index.html` | Media | Medio | Bloques delimitados por comentarios; PR pequeños |
| Se publica con el correo de ejemplo | Media | Alto | T-44 verifica el buzón real antes del deploy (D-03) |
| Deriva de alcance (React, CMS, blog) | Media | Alto | Fuera de alcance declarado (§10) |
| El reveal oculta contenido sin JS | Baja | Bajo | Patrón `.is-pending`: el contenido es visible por defecto |

---

## 9. Próximos pasos

### Como D

1. **T-11 y T-14:** acabado del header simétrico y del Hero (espaciado editorial, textura de papel).
2. **T-10:** aplicar la escala tipográfica (D-07).
3. **T-32:** revisar el botón sobre fondo plum.
4. **T-12:** sustituir el raster por el SVG cuando exista (D-05).

### En conjunto

1. Cerrar **D-06** y **D-08** (implementadas desde CH-001).
2. **A:** contraste de `#contacto` (T-23/T-24), aviso de privacidad (T-45) y secretos del despliegue.
3. QA en T-40/T-41 y deploy en T-44.

```sh
# Estado del trabajo al retomar
git switch develop && git pull
git switch -c feature/mi-tarea
```

---

## 10. Fuera de alcance en la v1

Framework o bundler, CMS, blog, multi-idioma, área privada, librerías de animación externas, analítica sin aviso de privacidad, secciones que no aparecen en la especificación.

---

## 11. Tablero sugerido

Columnas: `Backlog` → `Listo` → `En progreso` → `En revisión` → `Hecho`.
Etiquetas: `owner:D`, `owner:A`, y por capa (`css`, `html`, `js`, `php`).
Milestones: un sprint por milestone.
