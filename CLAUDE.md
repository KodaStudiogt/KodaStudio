# KodaStudio

## Diseño
La guía de estilo visual del proyecto está en `documentacion/DESIGN.md` (estilo "Shelby": tipografía grande y centrada, bandas de color a sangre, etiquetas monoespaciadas, radios ≤ 12px, sin sombras).
Léela antes de hacer cualquier cambio visual (HTML/CSS) y respeta su estructura, tipografía, radios y reglas de "Do's and Don'ts".

**Colores:** se usa la paleta propia de Koda (linen / plum / bronze), no la de Shelby. Todos los colores viven como tokens en `css/base/variables.css`; ningún otro CSS escribe hex. Bandas: `band--dark` (plum-dark), `band--plum`, `band--light` (linen), `band--light-alt` (linen-dark); el pie usa charcoal.

## Contratos que no se rompen
- Los `data-js="…"` de `js/configuracion/selectores.js` y los `name` del formulario (contrato con la Edge Function `contact`).
- El sitio es estático (HTML + CSS + ES modules, sin build) y la CSP de `vercel.json` no permite estilos ni scripts en línea.
