# KodaStudio

## Diseño
La guía de estilo visual del proyecto está en `documentacion/DESIGN.md` (estilo "Shelby": tipografía grande y centrada, bandas de color a sangre, etiquetas monoespaciadas, radios ≤ 12px, sin sombras).
Léela antes de hacer cualquier cambio visual (HTML/CSS) y respeta su estructura, tipografía, radios y reglas de "Do's and Don'ts".

**Colores:** se usa la paleta propia de Koda (linen / plum / bronze), no la de Shelby. Todos los colores viven como tokens en `css/base/variables.css`; ningún otro CSS escribe hex. Bandas: `band--dark` (plum-dark), `band--plum`, `band--light` (linen), `band--light-alt` (linen-dark); el pie usa charcoal.

## Contratos que no se rompen
- Los `data-js="…"` de `js/configuracion/selectores.js` y los `name` del formulario (contrato con la Edge Function `contact`).
- El sitio es estático (HTML + CSS + ES modules, sin build) y la CSP de `vercel.json` no permite estilos ni scripts en línea.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. When the answer is under a Markdown heading, `graphify section "<heading>"` prints that section's text, so the .md need not be opened. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
