# Koda Studio

Landing page del estudio: **HTML5 + CSS3 + JavaScript (ES Modules)**, sin framework ni build obligatorio.

Repositorio: <https://github.com/KodaStudiogt/KodaStudio>

> **Estado:** formulario funcionando en producción (`https://kodastudio-web.vercel.app`) con Supabase + Resend, y animaciones de entrada y micro-interacciones integradas. Pendiente: publicar `develop` en `main`, dominio remitente propio y QA.
> **Sitio:** <https://kodastudio-web.vercel.app> (Vercel).
> **Última actualización:** 2026-11-20 · detalle en [`docs/changelog.md`](docs/changelog.md).

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
| Estructura semántica completa con las seis anclas | SVGs del logo y favicon (D-05) |
| Design tokens obligatorios y tipografía editorial | Composición fina del header y textura del Hero |
| Navegación móvil accesible, reveal, selector múltiple y validación | Contraste de la sección de contacto |
| Logo integrado en header y footer | Dominio remitente verificado en Resend (`CONTACT_FROM_EMAIL`) |
| Formulario con envío real desde el sitio publicado (CORS de producción) | Aviso de privacidad y QA final |
| Animaciones: entrada del Hero, reveal escalonado, hover, navbar al hacer scroll y estados del formulario | Fusionar `develop` → `main` para que Vercel publique los cambios |

**Nada de éxito falso:** la confirmación requiere respuesta satisfactoria del endpoint.

---

## Cambios recientes

| Fecha | Qué |
| --- | --- |
| 2026-11-20 | Formulario habilitado en producción y animaciones profesionales (CH-008) |
| 2026-11-20 | Backend del formulario con Supabase Postgres, Edge Function y Resend (CH-005) |
| 2026-11-20 | Documentación sincronizada con CH-005 (CH-006) |
| 2026-11-19 | Logotipo oficial integrado en header y footer (CH-004) |
| 2026-11-19 | Documentación consolidada: bitácora, plan, backlog y decisiones al día (CH-002) |
| 2026-11-19 | Alineación con la especificación editorial y el contrato de nombres (CH-001, `c0bd569`) |
| 2026-11-19 | Andamio inicial: estructura de carpetas (CH-000, `f114d9c`) |

Historial completo en [`docs/changelog.md`](docs/changelog.md).

---

## Desarrollo local

### Backend del formulario

El backend combina Supabase Postgres, la Edge Function pública `contact` y Resend. El esquema portable está en `supabase/migrations/20261120000000_core_schema.sql`; la migración siguiente solo configura seguridad Supabase. La guía de tablas y migración está en [`db/README.md`](db/README.md).

**En producción (función `contact` v4, desplegada el 2026-11-20):**

| Dato | Valor |
| --- | --- |
| Proyecto Supabase | `kodastudio` (ref `dglmtxbkfwjchxigmavc`) |
| Endpoint | `https://dglmtxbkfwjchxigmavc.supabase.co/functions/v1/contact` (configurado en `CONTACT_ENDPOINT`) |
| Orígenes permitidos | `https://kodastudio-web.vercel.app` (fijo en `kc_prodOrigins` dentro de la función) + localhost de desarrollo + secreto `ALLOWED_ORIGINS` |
| Ver solicitudes | Supabase › Table Editor › `kc_contact_requests` (columna `email_sent_at` / `email_error` indica si salió el correo) |

Secretos de la función (Supabase › Edge Functions › Secrets). **El correo destino solo vive aquí, nunca en el repositorio.**

| Secreto | Obligatorio | Uso |
| --- | --- | --- |
| `RESEND_API_KEY` | Sí | Clave de la API de Resend |
| `CONTACT_TO_EMAIL` | Sí | Buzón de la empresa que recibe cada solicitud |
| `IP_HASH_SALT` | Recomendado | Texto aleatorio para anonimizar la IP del límite de solicitudes |
| `ALLOWED_ORIGINS` | No | Dominios **adicionales**, separados por comas (ej. un dominio propio futuro). `https://kodastudio-web.vercel.app` y `localhost`/`127.0.0.1` en los puertos 8000, 5500 y 3000 ya están permitidos en el código |
| `CONTACT_FROM_EMAIL` | Sí, si el destino no es el dueño de Resend | Remitente con dominio verificado en Resend. Sin él se usa `onboarding@resend.dev`, que **solo entrega al correo dueño de la cuenta Resend** |
| `RATE_LIMIT_MAX` | No | Solicitudes por conexión cada 10 min (5 por defecto) |

Si falta `RESEND_API_KEY` o `CONTACT_TO_EMAIL`, la solicitud se guarda, se registra el error y la función responde 503. Si Resend rechaza o no puede entregar el correo, responde 502. La función debe redesplegarse después de cambiar su código; los secretos se actualizan por separado en Supabase.

Instala Supabase CLI y Docker en el entorno de desarrollo; estos comandos son para el backend local:

```sh
supabase start
supabase db reset
cp supabase/functions/.env.example supabase/functions/.env
# Completa las credenciales locales y secretos en ese archivo.
supabase functions serve contact --env-file supabase/functions/.env
```

En otra terminal, prueba el contrato usando datos ficticios:

```sh
curl -i http://127.0.0.1:54321/functions/v1/contact \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:8000' \
  --data '{"client_name":"Cliente de Prueba","client_email":"cliente@example.com","selected_services":["Desarrollo Web de Alta Gama"],"project_message":"Necesito renovar el sitio de mi empresa.","kc_website_hp":""}'
```

Para desplegar en otro proyecto, créalo y define `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`, `ALLOWED_ORIGINS`, `IP_HASH_SALT` y `RATE_LIMIT_MAX` como secretos. Supabase provee `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` al entorno desplegado. Verifica el dominio remitente en Resend y publica los registros DNS indicados antes de enviar.

```sh
supabase link --project-ref <project-ref>
supabase db push
supabase secrets set CONTACT_TO_EMAIL=ventas@example.com CONTACT_FROM_EMAIL='Koda Studio <formularios@example.com>' RESEND_API_KEY=<clave> ALLOWED_ORIGINS=<origen-del-sitio> IP_HASH_SALT=<secreto-aleatorio> RATE_LIMIT_MAX=5
supabase functions deploy contact --no-verify-jwt
```

Si cambias de proyecto, actualiza `CONTACT_ENDPOINT` en `js/config/selectors.js` a `https://<project-ref>.supabase.co/functions/v1/contact`.

### Servir la landing

Los ES Modules **no cargan con `file://`**. Sirve la raíz con un servidor HTTP:

```sh
python -m http.server 8000
```

Luego abre <http://localhost:8000>. También sirve `npx serve .` o la extensión *Live Server* de VS Code.

**Comprobación rápida:** consola sin errores, año del footer correcto, menú móvil que abre y cierra, píldoras que se marcan, y formulario que señala errores de nombre, correo y mensaje.

---

## Animaciones y micro-interacciones

Sutiles y sin librerías: solo `opacity`/`transform`, curva `cubic-bezier(.22, 1, .36, 1)` y 200–700 ms. Todas se desactivan con `prefers-reduced-motion: reduce` y el contenido se ve aunque falle JavaScript (mejora progresiva).

| Qué | Dónde |
| --- | --- |
| Entrada en cascada del Hero al cargar | `css/utilities/animations.css`, `js/modules/reveal.js` |
| Reveal escalonado de hijos con `data-js="reveal-child"` (`--kc-reveal-delay`, 90 ms entre elementos) | `js/modules/reveal.js`, `index.html` |
| Hover de botones (elevación) y `:active` | `css/components/buttons.css` |
| Hover de tarjetas | `css/components/cards.css` |
| "Pop" de píldoras al seleccionar | `css/components/service-selector.css` |
| Navbar con sombra al hacer scroll (`.is-scrolled`) | `js/modules/navigation.js`, `css/layout/header.css` |
| Spinner de envío, entrada del mensaje y vibración de campos con error | `css/components/forms.css` |

Para animar un bloque nuevo dentro de una sección con `data-js="reveal"`, agrega `data-js="reveal-child"`.

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
├── assets/                       # images/, icons/
├── db/                           # Modelo de datos y guía de migración
├── supabase/                     # config.toml, migraciones, seed y Edge Function contact
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
- [Decisiones de D](docs/decisiones-de-d.md) — registro de lo que decidí yo, con su motivo y su efecto.
- [Especificación de diseño](docs/especificacion.md) — dirección de arte, copywriting, interacciones.
- [Estándar anti-conflictos](docs/estandar.md) — variables, `data-js-*`, contrato del formulario.
- [Arquitectura](docs/arquitectura.md) — estructura de carpetas y flujo técnico.
