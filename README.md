# Koda Studio

Landing page del estudio: **HTML5 + CSS3 + JavaScript (ES Modules)**, sin framework ni build obligatorio.

Repositorio: <https://github.com/mxrtinez10/KodaStudio>

> **Estado:** base alineada con la especificación y el estándar de nombres.
> **Última actualización:** 2026-11-19 · detalle en [`docs/changelog.md`](docs/changelog.md).

---

## Responsables

| Rol | Persona | Alcance |
| --- | --- | --- |
| **D** | Diego | Base técnica, identidad visual, `#navbar`, `#inicio`, `#esencia`, `#footer` y los módulos `navigation`, `reveal` y `footer` |
| **A** | Segundo socio | `#servicios`, `#contacto`, tarjetas, formulario, `service-selector`, `contact-form` y el backend de recepción |

Archivos compartidos (solo con PR avisado): `index.html`, `css/main.css`, `js/main.js` y `js/config/selectors.js`.

---

## Estado del proyecto

| Listo | Pendiente |
| --- | --- |
| Estructura semántica completa con las seis anclas | Isotipo SVG definitivo (hoy hay un marcador geométrico) |
| Design tokens obligatorios y tipografía editorial | Composición fina del header y textura del Hero |
| Navegación móvil accesible, reveal, selector múltiple y validación | Contraste de la sección de contacto |
| Contrato `data-js-*` y `name`/`id` del formulario | Endpoint de recepción (D-02) |
| Plan, backlog, decisiones y bitácora en `docs/` | Assets gráficos, favicon y aviso de privacidad |

**Nada de éxito falso:** el formulario valida y lo dice con claridad; la confirmación solo se mostrará cuando exista un destino real.

---

## Cambios recientes

| Fecha | Qué |
| --- | --- |
| 2026-11-19 | Documentación consolidada: bitácora, plan, backlog y decisiones al día (CH-002) |
| 2026-11-19 | Alineación con la especificación editorial y el contrato de nombres (CH-001, `c0bd569`) |
| 2026-11-19 | Andamio inicial: estructura de carpetas (CH-000, `f114d9c`) |

Historial completo en [`docs/changelog.md`](docs/changelog.md).

---

## Desarrollo local

Los ES Modules **no cargan con `file://`**. Sirve la raíz con un servidor HTTP:

```sh
python -m http.server 8000
```

Luego abre <http://localhost:8000>. También sirve `npx serve .` o la extensión *Live Server* de VS Code.

**Comprobación rápida:** consola sin errores, año del footer correcto, menú móvil que abre y cierra, píldoras que se marcan, y formulario que señala errores de nombre, correo y mensaje.

---

## Estructura

```text
.
├── index.html                    # Contrato HTML: ids, data-js, campos del formulario
├── css/
│   ├── main.css                  # Solo @imports (compartido)
│   ├── base/                     # reset, variables, typography
│   ├── layout/                   # header, sections, footer
│   ├── components/               # buttons, cards, forms, service-selector
│   └── utilities/                # helpers, animations, responsive
├── js/
│   ├── main.js                   # Punto de entrada (congelado)
│   ├── config/selectors.js       # Fuente única de selectores y constantes
│   ├── modules/                  # navigation, reveal, footer | service-selector, contact-form
│   └── utils/validation.js       # Funciones puras
├── assets/                       # images/, icons/ (.gitkeep hasta tener archivos reales)
└── docs/                         # arquitectura, especificación, estándar, plan, backlog, decisiones, bitácora
```

---

## Reglas de trabajo

1. **Cero valores mágicos.** Colores, fuentes y radios salen de `css/base/variables.css`.
2. **CSS y JS separados.** JS solo usa `data-js-*`, ids reservados o `name` de formulario; nunca clases visuales.
3. **Sin ámbito global.** Todo `.js` es un módulo; nada en `window`.
4. **Prefijo de espacio de nombres.** `kc_` en JS/PHP, `--kc-` en tokens nuevos.
5. **Un dueño por archivo.** Los compartidos se tocan con PR avisado.
6. **Estados por clase.** Solo `.is-open`, `.is-visible`, `.is-selected`, `.is-hidden`, `.has-error` (y `.is-pending`, D-08).
7. **Nada de éxito falso.** La confirmación del formulario solo con respuesta exitosa del endpoint real.

Antes de cada commit:

- [ ] Trabajé solo dentro de mis archivos y secciones.
- [ ] Usé `--color-*` / `--font-*`, no valores literales.
- [ ] Importé selectores desde `DOM_SELECTORS`.
- [ ] Usé `STATE_CLASSES` para los estados.
- [ ] Respeté los `name`/`id` del formulario.
- [ ] No declaré variables fuera de un módulo o función.

---

## Flujo de Git

```sh
git switch develop
git pull origin develop
git switch -c feature/nombre-de-la-tarea

git add .
git commit -m "feat: describir el cambio en una línea"
git push -u origin feature/nombre-de-la-tarea
gh pr create --base develop --title "..." --body "..."
```

Ramas permanentes: `main` (producción) y `develop` (integración). Una rama = una tarea; nada sin integrar más de un día.

| Prefijo | Uso |
| --- | --- |
| `feat` | Nueva funcionalidad |
| `fix` | Corrección |
| `style` | Ajuste visual sin lógica |
| `refactor` | Reorganización interna |
| `docs` | Documentación |
| `chore` | Configuración |

---

## Documentación

- [Bitácora de cambios](docs/changelog.md) — qué se hizo, cuándo y con qué verificación.
- [Plan de trabajo](docs/plan-de-trabajo.md) — sprints, propiedad de archivos, riesgos y DoD.
- [Backlog](docs/backlog.md) — tareas con dueño, estado y criterio de aceptación.
- [Decisiones pendientes](docs/decisiones-pendientes.md) — lo que hay que acordar antes de publicar.
- [Especificación de diseño](docs/especificacion.md) — dirección de arte, copywriting, interacciones.
- [Estándar anti-conflictos](docs/estandar.md) — variables, `data-js-*`, contrato del formulario.
- [Arquitectura](docs/arquitectura.md) — estructura de carpetas y flujo técnico.
