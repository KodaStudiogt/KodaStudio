# Decisiones del rediseño — Koda Studio

> Decisiones tomadas durante el rediseño CH-011 (2026-11-22 / 23): qué se decidió, por qué, qué se descartó y qué cambió.
> **Qué se hizo:** [`rediseno-movil.md`](./rediseno-movil.md) · **Decisiones generales:** [`decisiones-de-d.md`](./decisiones-de-d.md), [`decisiones-pendientes.md`](./decisiones-pendientes.md)

## Cómo leerlo

- **`DR-xx`**: decisión del rediseño.
- **Estado:**
  - ✅ vigente;
  - 🟡 vigente, pero hay algo pendiente;
  - ⏹ superada.

## Resumen

| ID | Decisión | Estado |
| --- | --- | --- |
| DR-01 | `DESIGN.md` como referencia de estructura, no de colores | ✅ |
| DR-02 | Ningún hex fuera de `variables.css`; colores por rol de superficie | ✅ |
| DR-03 | Display en Plus Jakarta 800 con acento en Cormorant itálica | ✅ |
| DR-04 | Etiquetas, botones e insignias en JetBrains Mono | ✅ |
| DR-05 | Radios de 4 y 10px, cero sombras | ✅ |
| DR-06 | Menú móvil a pantalla completa | ✅ |
| DR-07 | Inputs de 16px y objetivos táctiles de 44px o más | ✅ |
| DR-08 | Sección Proyectos con casos de ejemplo marcados | 🟡 reemplazar por reales |
| DR-09 | No tocar JavaScript ni los contratos `data-js` / `name` | ✅ |
| DR-10 | Commits por área en la rama `diseno_actualizado` | ✅ |
| DR-11 | Abrir primero el PR pendiente de DESIGN.md y después el del rediseño | ✅ |

---

## DR-01 · DESIGN.md como referencia de estructura, no de colores

**Decisión.** De la guía "Shelby" se toma la estructura:

- bandas a sangre;
- titulares grandes y centrados;
- etiquetas mono;
- radios pequeños;
- sin sombras.

Los colores (cocoa y rosa neón) se reemplazan por la paleta Koda: linen, plum y bronze.

**Por qué.** La paleta y las fuentes son la identidad de la marca. El pedido fue cambiar el diseño, no la marca.

**Descartado.** Copiar Shelby tal cual: la página dejaría de parecer Koda.

**Efecto.** `CLAUDE.md` lo deja escrito para futuros cambios visuales.

## DR-02 · Ningún hex fuera de `variables.css`

**Decisión.** Todos los colores son tokens. Los demás CSS usan **roles**:

- `--surface-*`
- `--ink-on-dark`
- `--line-on-*`

No usan valores directos. Las transparencias se hacen con `color-mix()` y no con `rgba()` escrito a mano.

**Por qué.** Cambiar una banda o un tono se hace en un solo archivo, y se evita que cada sección invente su propio color.

**Efecto.** Se eliminaron los `rgba(74, 46, 53, …)` sueltos de los componentes.

## DR-03 · Display en Plus Jakarta 800 con acento en Cormorant itálica

**Decisión.**

- Los titulares pasan de Cormorant a Plus Jakarta Sans 700–800, con tracking negativo.
- Cormorant queda solo para una palabra en `<em>` itálica por titular.

**Por qué.** DESIGN.md pide una display compacta y muy grande, y Cormorant a 6rem pierde fuerza. El acento conserva el guiño editorial de la marca.

**Efecto.**

- `--font-display` y `--font-accent`.
- `--font-heading` queda como alias de `--font-display`.

## DR-04 · JetBrains Mono para etiquetas

**Decisión.** Eyebrows, botones, insignias, píldoras y labels del formulario van en mono y en mayúsculas.

**Por qué.** Es la seña de DESIGN.md (etiquetas tipo "código de producto") y separa la información secundaria de los titulares.

**Efecto.**

- Se carga JetBrains Mono 400/500 desde Google Fonts, dominio que la CSP ya permite.
- Hay una clase nueva, `.badge`.

## DR-05 · Radios de 4 y 10px, cero sombras

**Decisión.**

- Tarjetas de 10px.
- Inputs, botones e insignias de 4px.
- Las sombras se ponen en `none`.

**Por qué.** DESIGN.md limita los radios a ≤ 12px y prohíbe las sombras. La profundidad la dan el contraste entre bandas y los bordes finos.

**Descartado.** Píldoras redondas (`--radius-pill`) en botones y selector.

## DR-06 · Menú móvil a pantalla completa

**Decisión.**

- Por debajo de 48rem, los enlaces se ocultan y aparece un menú a pantalla completa.
- El menú lleva índices 00–04 y un CTA "Agendar consultoría".
- El botón se convierte en X.

**Por qué.**

- Los objetivos táctiles quedan grandes.
- El CTA queda visible.
- El menú reutiliza el `data-js="mobile-menu"` existente sin cambiar el JS.

**Efecto.**

- Se usa `env(safe-area-inset-*)` para respetar el notch y la barra de inicio.
- No hay `backdrop-filter` en el encabezado, porque recortaría el menú fijo.

## DR-07 · Inputs de 16px y objetivos táctiles de 44px o más

**Decisión.**

- Inputs con `font-size: 1rem` y alto mínimo de 3rem.
- Píldoras con alto mínimo de 2.75rem.
- En móvil, botones a ancho completo.

**Por qué.**

- iOS hace zoom en inputs de menos de 16px.
- 44px es el mínimo táctil recomendado.

## DR-08 · Sección Proyectos con casos de ejemplo

**Decisión.**

- La sección `#proyectos` se agrega entre Servicios y Contacto, con enlace en el menú y en el pie.
- Como todavía no hay datos reales, se usan tres casos **inventados a pedido**: Aurora Dental Studio, Café Altura y Ruta Norte Logística.
- Están marcados con un `TODO` en el HTML.
- Las tarjetas usan un póster tipográfico de color en vez de capturas.

**Por qué.**

- Se ve el diseño completo sin esperar el contenido.
- DESIGN.md desaconseja fotos genéricas; los pósters no necesitan imágenes.

**Pendiente.** Las métricas (+42%, 3×, etc.) son ficticias. **Hay que reemplazarlas antes de fusionar a `main`** o publicar en producción.

## DR-09 · No tocar JavaScript ni los contratos

**Decisión.** El rediseño es solo HTML y CSS:

- Se conservan todos los `data-js` de `selectores.js` y los `name` del formulario.
- La clase `.editorial-card` cambió a `.surface-card`, pero JS no la usa: las clases son solo de estilo, según el estándar §1.2.

**Por qué.** El formulario funciona en producción contra la Edge Function `contact`, y no hay que arriesgarlo por un cambio visual.

## DR-10 · Commits por área en la rama `diseno_actualizado`

**Decisión.**

- Seis commits: base, componentes, diseño, secciones, móvil y docs.
- Rama nueva `diseno_actualizado`, sin "ñ" para evitar problemas en URLs.
- Reemplaza a `feature/rediseno-movil`.

**Por qué.** Separar por área deja revisar cada capa por separado.

**Consecuencia.** Si se revisa un commit intermedio de forma aislada, la página puede verse a medias.

## DR-11 · Primero el PR pendiente de DESIGN.md

**Decisión.**

- Antes de abrir el PR del rediseño se revisaron todas las ramas contra `main`.
- La única con trabajo sin fusionar era `claude/bold-mendel-s5xytl` (DESIGN.md + CLAUDE.md), así que se abre su PR primero.
- `diseno_actualizado` parte de ese mismo commit (`2e164bb`), así que los dos PRs se pueden fusionar en cualquier orden sin conflictos.

**Revisadas sin pendientes:**

- `develop`
- `chore/vercel-seguridad`
- `feature/form-global-y-animaciones`
- `refactor/estructura-mvc`
