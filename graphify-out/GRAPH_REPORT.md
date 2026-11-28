# Graph Report - KodaStudio  (2026-11-28)

## Corpus Check
- Corpus is ~32,539 words - fits in a single context window. You may not need a graph.

## Summary
- 331 nodes · 525 edges · 27 communities (17 shown, 10 thin omitted)
- Extraction: 83% EXTRACTED · 17% INFERRED · 1% AMBIGUOUS · INFERRED: 87 edges (avg confidence: 0.87)
- Token cost: 506,145 input · 0 output

## Community Hubs (Navigation)
- Controladores y selectores JS
- Identidad visual y secciones
- Funcionalidades de la landing
- Modelo de datos Supabase
- Arquitectura MVC y flujo Git
- Rediseño CH-011 (DR-xx)
- Esquema SQL core
- Guía de estilo Shelby
- Formulario, Edge Function y Resend
- Estructura de index.html
- Plan de trabajo y DoD
- Decisiones de D (proceso)
- Edge Function contact (código)
- Configuración Vercel
- Logotipo Koda Studio
- Documentación del proyecto
- Sección Proyectos
- Etiquetas de servicios
- Activos de marca y riesgos
- Sprint 1 identidad
- Reglas graphify
- Criterios de aceptación
- Registro DD-01 a DD-17
- Git flow

## God Nodes (most connected - your core abstractions)
1. `Decisiones de D (registro)` - 19 edges
2. `Landing page specification - Koda Studio` - 14 edges
3. `Mandatory anti-conflict standard (D & A)` - 14 edges
4. `Decisiones del rediseño CH-011` - 14 edges
5. `Landing page Koda Studio (index.html)` - 14 edges
6. `Shelby style reference` - 11 edges
7. `Decisiones pendientes antes de publicar` - 11 edges
8. `crearVistaFormularioContacto()` - 10 edges
9. `kc_contact_requests` - 10 edges
10. `Plan de trabajo — Landing Koda Studio` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Work rules (7 rules)` --semantically_similar_to--> `Pre-commit checklist`  [INFERRED] [semantically similar]
  README.md → documentacion/estandar.md
- `Band classes (band--dark, band--plum, band--light, band--light-alt)` --references--> `Koda palette (linen, plum, bronze, charcoal, muted)`  [EXTRACTED]
  CLAUDE.md → documentacion/especificacion.md
- `Project folder structure` --references--> `Database data model (ER)`  [EXTRACTED]
  README.md → base-de-datos/README.md
- `kc_services` --shares_data_with--> `VALID_SERVICES`  [INFERRED]
  base-de-datos/README.md → documentacion/estandar.md
- `kc_* naming for tables and functions` --conceptually_related_to--> `Five golden rules`  [INFERRED]
  base-de-datos/README.md → documentacion/estandar.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Contact form submission pipeline** — documentacion_estandar_form_field_contract, readme_contact_edge_function, base_de_datos_readme_kc_contact_requests, readme_resend_email, readme_contact_endpoint [INFERRED 0.85]
- **HTML/CSS/JS naming contract** — documentacion_estandar_data_js_attributes, documentacion_estandar_dom_selectors, documentacion_estandar_state_classes_const, documentacion_estandar_section_ids [EXTRACTED 1.00]
- **Koda visual system (Shelby structure + Koda palette)** — claude_koda_palette_rule, documentacion_design_shelby_style, documentacion_especificacion_koda_palette, documentacion_estandar_css_variables, claude_band_classes [INFERRED 0.85]
- **Flujo de envio del formulario de contacto** — documentacion_arquitectura_formulario_contacto, documentacion_changelog_contact_endpoint, documentacion_changelog_edge_function_contact, documentacion_changelog_esquema_postgresql_rls, documentacion_changelog_resend, documentacion_changelog_kc_prodorigins [INFERRED 0.85]
- **Modulos inicializados por principal.js** — documentacion_arquitectura_principal_js, documentacion_arquitectura_navegacion, documentacion_arquitectura_revelado, documentacion_arquitectura_selector_servicios, documentacion_arquitectura_formulario_contacto, documentacion_arquitectura_pie_de_pagina_anio [EXTRACTED 1.00]
- **Backend del formulario (Sprint 3: T-34, T-50, T-51, T-52)** — documentacion_backlog_t_34, documentacion_backlog_t_50, documentacion_backlog_t_51, documentacion_backlog_t_52 [EXTRACTED 1.00]
- **Flujo del formulario de contacto (front → Edge Function → Postgres → Resend)** — index_contact_form, documentacion_decisiones_pendientes_supabase_edge_function_contact, documentacion_decisiones_pendientes_supabase_postgres, documentacion_decisiones_pendientes_resend, documentacion_decisiones_pendientes_contact_to_email [INFERRED 0.85]
- **Sistema visual Shelby adaptado a Koda** — documentacion_decisiones_rediseno_dr_01, documentacion_decisiones_rediseno_dr_02, documentacion_decisiones_rediseno_dr_03, documentacion_decisiones_rediseno_dr_04, documentacion_decisiones_rediseno_dr_05, documentacion_decisiones_rediseno_design_md_shelby, documentacion_decisiones_rediseno_paleta_koda [EXTRACTED 1.00]
- **Reveal con mejora progresiva** — documentacion_decisiones_de_d_dd_04, documentacion_decisiones_pendientes_d_08, documentacion_plan_de_trabajo_contradicciones_resueltas [EXTRACTED 1.00]
- **Koda Studio Logo Asset Family** — recursos_imagenes_logo_logo_kodastudio_embossed_logo_mockup, recursos_imagenes_logo_logo_kodastudio_mark_logo_mark, recursos_imagenes_logo_logo_kodastudio_wordmark_logo [INFERRED 0.95]

## Communities (27 total, 10 thin omitted)

### Community 0 - "Controladores y selectores JS"
Cohesion: 0.08
Nodes (28): CONTACT_ENDPOINT, CONTACT_TIMEOUT_MS, DOM_SELECTORS, FORM_FIELDS, REVEAL_THRESHOLD, STATE_CLASSES, iniciarFormularioContacto(), iniciarNavegacion() (+20 more)

### Community 1 - "Identidad visual y secciones"
Cohesion: 0.08
Nodes (36): Shelby color tokens (cocoa, neon orchid, petal wash...), Contact section #contacto, Cormorant Garamond (headings), Nuestra Esencia section #esencia, Footer, Four service pillars (Web, Automation, Sales, Support), Hero section #inicio, Inline validation and feedback (no alert()) (+28 more)

### Community 2 - "Funcionalidades de la landing"
Cohesion: 0.07
Nodes (34): Decisiones pendientes (despliegue, recepcion formulario, dominio, analitica, contenido), Estructura HTML semantica (#inicio, #esencia, #servicios, #contacto), Formulario de contacto (validacion, envio, confirmacion accesible), Navegacion: menu movil con aria-expanded, Pie de pagina con ano dinamico (data-current-year), js/principal.js punto de entrada (DOMContentLoaded inicia controladores), Responsividad y accesibilidad, Revelado (.reveal con IntersectionObserver, threshold 0.12) (+26 more)

### Community 3 - "Modelo de datos Supabase"
Cohesion: 0.17
Nodes (20): Core schema migration (20261120000000_core_schema.sql), Database data model (ER), kc_clients, kc_contact_request_services, kc_contact_requests, kc_project_services, kc_projects, kc_services (+12 more)

### Community 4 - "Arquitectura MVC y flujo Git"
Cohesion: 0.11
Nodes (17): Convencion de commits (feat, fix, style, refactor, docs, test), Estructura de carpetas recomendada, Flujo Git main/develop/feature con Pull Requests, Modelo servicios.js (VALID_SERVICES, SERVICE_LABELS), Modelo solicitud-contacto.js (payload, validacion, envio), Orden de carga CSS (css/principal.css con @import), js/configuracion/selectores.js (selectores DOM, endpoint, constantes), Design tokens en css/base/variables.css (+9 more)

### Community 5 - "Rediseño CH-011 (DR-xx)"
Cohesion: 0.16
Nodes (10): Guía DESIGN.md (estilo Shelby), Decisiones del rediseño CH-011, Paleta Koda (linen / plum / bronze), Breakpoints 64rem / 48rem / 22.5rem, Entrega CH-011 (rama diseno_actualizado), Componentes: botones planos, .surface-card, .purpose-card, .service-card, píldoras, Rediseño de la landing (DESIGN.md + móvil), Fuentes --font-display / --font-accent / --font-mono (+2 more)

### Community 6 - "Esquema SQL core"
Cohesion: 0.23
Nodes (16): kc_clients, kc_clients_email_lower_uidx, kc_clients_updated_at, kc_contact_request_services, kc_contact_requests, kc_contact_requests_created_at_idx, kc_contact_requests_ip_created_idx, kc_contact_requests_status_idx (+8 more)

### Community 7 - "Guía de estilo Shelby"
Cohesion: 0.14
Nodes (14): Band classes (band--dark, band--plum, band--light, band--light-alt), ABCReproMono monospaced labels, Eyebrow Label, Filled Pill Button, Ghost Button, GT-Planar typeface, Hero Headline Block, Layout: stacked full-bleed bands, centered, 1200px max (+6 more)

### Community 8 - "Formulario, Edge Function y Resend"
Cohesion: 0.23
Nodes (6): Decisiones pendientes antes de publicar, Contrato de campos del formulario (client_name, client_email, selected_services, project_message, kc_website_hp), Resend (envío de correo), Edge Function contact (Supabase), Supabase Postgres (kc_clients, kc_contact_requests), Contratos respetados (data-js, name, CSP vercel.json)

### Community 9 - "Estructura de index.html"
Cohesion: 0.19
Nodes (10): Formulario de contacto (data-js=contact-form), Sección #contacto, Sección #esencia (Nosotros), Pie de página #footer, Honeypot kc_website_hp, Landing page Koda Studio (index.html), Menú móvil #mobile-menu, Encabezado #navbar (+2 more)

### Community 10 - "Plan de trabajo y DoD"
Cohesion: 0.18
Nodes (8): Calendario por sprints S0–S4, Siete contradicciones resueltas, Definición de Terminado (DoD), Plan de trabajo — Landing Koda Studio, Equipo: D (Diego) y A, Estructura MVC en español (js/modelos, vistas, controladores), Fuera de alcance v1 (framework, CMS, blog…), Sección #inicio (Hero)

### Community 12 - "Edge Function contact (código)"
Cohesion: 0.22
Nodes (5): kc_devOrigins, kc_htmlEntities, kc_jsonHeaders, kc_prodOrigins, kc_services

### Community 13 - "Configuración Vercel"
Cohesion: 0.22
Nodes (8): buildCommand, cleanUrls, framework, headers, installCommand, outputDirectory, $schema, trailingSlash

### Community 14 - "Logotipo Koda Studio"
Cohesion: 0.60
Nodes (6): Koda Studio Logo (embossed mockup on linen), KC Monogram with </> Code Symbol, KODA STUDIO Serif Wordmark, Koda Studio Logo Mark (KC monogram only), Plum on Linen Brand Palette, Koda Studio Full Logo (monogram + KODA STUDIO wordmark)

### Community 15 - "Documentación del proyecto"
Cohesion: 0.50
Nodes (4): Arquitectura de Desarrollo - Landing Page Koda Studio, Backlog - Landing Page Koda Studio, Bitacora de cambios - Koda Studio, CH-002 Consolidacion documental

### Community 16 - "Sección Proyectos"
Cohesion: 0.40
Nodes (4): Aurora Dental Studio (caso ficticio), Café Altura (caso ficticio), Sección #proyectos, Ruta Norte Logística (caso ficticio)

### Community 19 - "Sprint 1 identidad"
Cohesion: 0.67
Nodes (3): Sprint 1 - Identidad visual y acabado, T-12 Medallon tactil e isotipo vectorial SVG, CH-004 Logotipo oficial en header y footer (WebP con matte alfa)

## Ambiguous Edges - Review These
- `Shelby style reference` → `Art direction: boutique, editorial, warm`  [AMBIGUOUS]
  documentacion/especificacion.md · relation: conceptually_related_to
- `Border radius (4px / 10px, never above 12px)` → `Editorial card (.editorial-card, 24px radius)`  [AMBIGUOUS]
  documentacion/DESIGN.md · relation: conceptually_related_to
- `Border radius (4px / 10px, never above 12px)` → `Radius and shadow tokens (--radius-card 24px, --shadow-card...)`  [AMBIGUOUS]
  documentacion/DESIGN.md · relation: conceptually_related_to
- `Flat elevation, no shadows` → `Tactile medallion (warm neumorphism)`  [AMBIGUOUS]
  documentacion/DESIGN.md · relation: conceptually_related_to

## Knowledge Gaps
- **39 isolated node(s):** `graphify skill trigger (/graphify)`, `graphify usage rules`, `.vercelignore`, `Git flow (main / develop / feature branches)`, `Type scale (caption to display 95px)` (+34 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 82 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Landing page specification - Koda Studio` connect `Identidad visual y secciones` to `Modelo de datos Supabase`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `graphify skill trigger (/graphify)`, `graphify usage rules`, `.vercelignore` to the rest of the system?**
  _39 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Controladores y selectores JS` be split into smaller, more focused modules?**
  _Cohesion score 0.08144796380090498 - nodes in this community are weakly interconnected._
- **Why does `Decisiones del rediseño CH-011` connect `Rediseño CH-011 (DR-xx)` to `Formulario, Edge Function y Resend`, `Estructura de index.html`, `Decisiones de D (proceso)`, `Sección Proyectos`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Should `Identidad visual y secciones` be split into smaller, more focused modules?**
  _Cohesion score 0.07751937984496124 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Shelby style reference` and `Art direction: boutique, editorial, warm`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Border radius (4px / 10px, never above 12px)` and `Editorial card (.editorial-card, 24px radius)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._