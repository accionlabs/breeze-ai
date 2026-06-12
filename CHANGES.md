# Breeze.AI Website — Change Log

All notable UI/copy changes to the marketing site. Most recent first.

---

## 2026-06-12

### Copy — Complete methodology alignment final pass
Finished remaining gaps from the full 20-item methodology alignment review:

- **Item 1 (Honest framing) — comparison/page.tsx**: Intro sentence "An honest positioning..." → "A positioning..."; three `<b>Honest take:</b>` callouts → `<b>Where each tool fits:</b>` (matches ComparisonTabs wording, applied to the full comparison docs page which was missed in the first pass).
- **Item 12 (Ontology names) — comparison/page.tsx**: Feature matrix table rows updated to formal ontology names: "Code knowledge graph" → "Code Ontology"; "Functional / requirements graph" → "Functional Ontology"; "Architecture graph (8 layers)" → "Architecture Ontology (eight layers)"; "Design system graph (atomic)" → "Design Ontology (atomic design model)".
- **Item 14 (Engineer skill table) — cookbook/page.tsx**: Table row "Generate code & tests from graphs" → "Generate code and tests from the four-layer impact report".
- **Item 19 (8 layers prose) — cookbook/page.tsx**: "populate the 8 layers via the MCP tool" → "populate the eight layers via the MCP tool".
- **Item 9 (em-dash) — cookbook/page.tsx**: Brownfield framing paragraph: "inferred from it — this order" → "inferred from it: this order".

### Vocabulary — Core platform framing: "AI-led SDLC, powered by Semantic Engineering"
The terms "Semantic Engineering" and "AI-led SDLC" did not appear anywhere on the site. The platform called itself "AI-powered, ontology-driven development platform" throughout. All platform-identity touchpoints updated.

- **`app/layout.tsx`** — metadata title: `Breeze.AI: One connected graph, from intent to implementation` → `Breeze.AI: AI-led SDLC, powered by Semantic Engineering`; description updated to match.
- **`app/page.tsx`** — hero eyebrow: `AI-driven impact analysis` → `AI-led SDLC`; hero subtitle: `An ontology-driven platform...` → `Built on Semantic Engineering: understand traceability...`
- **`components/Footer.tsx`** — blurb: `An AI-powered, ontology-driven development platform.` → `AI-led SDLC, powered by Semantic Engineering.`
- **`app/user-guide/page.tsx`** — intro description updated: "AI-led SDLC platform, powered by **Semantic Engineering**."
- **`components/ComparisonTabs.tsx`** — Cody tab Breeze description: `An end-to-end SDLC ontology that includes a code graph as one of four layers.` → `An AI-led SDLC platform built on Semantic Engineering, with four ontology layers from requirements to code.`
- **`app/user-guide/comparison/page.tsx`** — landscape table Breeze row and vs-Cody contrast sentence: both updated to "AI-led SDLC platform."

### Decision — Footer documentation attribution (item 20)
The footer shows "Documentation: Anirudha Gohokar". The methodology site omits per-page attribution. This is a Breeze site choice; no change made. Note for future style alignment discussions.

### Copy — Spell out numbers under ten in body copy (item 19)
Numbers under ten are now written out in prose; digits kept in tables, code blocks, and step/phase labels (Group 1, Phase 2, Steps 5–7, etc.).

Changed: `10 languages` → `ten languages` (homepage feature card, LayerTabs note); `8-layer` → `eight-layer` (cookbook, skills); `8 layers` → `eight layers` (skills bold label); `5 dimensions` → `five dimensions` (skills); `10 repos` → `ten repos` (comparison page, ComparisonTabs prose); `3 months` → `three months` (comparison page).

- **`app/page.tsx`** — feature card paragraph
- **`components/LayerTabs.tsx`** — Code tab note string
- **`app/user-guide/cookbook/page.tsx`** — 8-layer blueprint prose (×2)
- **`app/user-guide/skills/page.tsx`** — Map to the 8 layers, Analyze 5 dimensions, 8-layer architecture model
- **`app/user-guide/comparison/page.tsx`** — up to 10 repos, 3 months ago
- **`components/ComparisonTabs.tsx`** — up to 10 repos in Cody description

### Copy — Page title patterns in /user-guide/ (item 18)
Documentation pages should use reference-document titles, not marketing taglines. The ", one source of truth" tail on the graph-layers h1 was the clearest case; dropped it. Also corrected "Root layer" → "Anchor layer" in the same file's layer reference table (missed in the item 5 pass).

- **`app/user-guide/graph-layers/page.tsx`** — h1: `Four graph layers, one source of truth` → `Four Graph Layers`; metadata title capitalised to match; table cell: `Root layer.` → `Anchor layer.`

Other /user-guide/ titles reviewed and left unchanged: skills subtitle (informative scope, not a tagline), comparison, cookbook (item 17 decision), quickstart, mcp, mcp-tools all read as reference-document titles already.

### Decision — "Cookbook" framing (item 17)
"Building the Graphs — Cookbook" is appropriate for a tool-documentation page. The methodology site should not inherit this framing when cross-linking (cookbook implies independent recipes; the methodology describes a coherent operating model). No changes made to the Breeze site; note for future cross-link authors.

### Terminology — Architecture layer display names (item 16)
Aligned formal display names with the methodology convention. "UX" reads as the design discipline; "User Experience" reads as the layer. "Observability/Monitoring" collapsed to "Observability" (monitoring is a constituent, observability is the umbrella). Neo4j node label identifiers (`UserExperience`, `ApiGateway`, `ObservabilityMonitoring`) in `<code>` blocks and technical API listings left unchanged — those are the actual identifiers developers must pass.

- **`app/user-guide/cookbook/page.tsx`** — 8-layer prose list: `UX` → `User Experience`, `Observability/Monitoring` → `Observability`
- **`app/user-guide/graph-layers/page.tsx`** — table cell: all camelCase labels expanded to formal display names
- **`components/LayerTabs.tsx`** — note: `UserExperience` → `User Experience`; hierarchy display array: all labels expanded to formal names

### Terminology — WebUI chat surfaces renamed (item 15)
"Functional Agent" and "Design Agent" were chat-interface surfaces in the WebUI, not autonomous agents in the methodology sense (Impact Analysis Agent, PR Validation Agent, KG Sync Agent, Coding Agent, Test Generation Agent are the methodology fleet). Renamed to avoid confusion.

- **`app/user-guide/cookbook/page.tsx`** — "Functional Agent" → "Functional Chat" (2 occurrences); "Design Agent" → "Design Chat" (1 occurrence).

### Copy — Engineer persona card copy (item 14)
Code generation traverses all four ontology layers via the Impact Analysis Agent, not just the Functional graph.

- **`app/page.tsx`** — Engineer card: "Generate code & tests from the functional graph; reverse-engineer brownfield repos." → "Generate code and tests against the four-layer impact report; reverse-engineer brownfield repos into the Code Ontology so the rest of the graph can be inferred."

### Copy — Brownfield order framing in cookbook (item 13)
Added a framing sentence before the brownfield diagram to prevent readers from inferring that Code is methodologically primary. The Functional Ontology is the anchor; brownfield extraction starts with Code because it is the only unambiguous source of truth when no requirement documents exist.

- **`app/user-guide/cookbook/page.tsx`** — "Recommended Order (Brownfield)" section: added one paragraph before the diagram explaining the order is a brownfield extraction sequence, not a methodological hierarchy. Cross-references the greenfield order below.

### Terminology — Comparison matrix ontology row labels (item 12)
Matrix rows now use the formal ontology names with population qualifier where needed.

| Before | After |
|---|---|
| Code knowledge graph | Code Ontology |
| Functional Ontology / requirements | Functional Ontology |
| Architecture Ontology (8 layers) | Architecture Ontology (eight layers) |
| Design Ontology (atomic) | Design Ontology (atomic design model) |

- **`components/ComparisonTabs.tsx`** — `MATRIX` array rows 54–57 updated.

### Confirmed correct — "Citations" terminology (item 11)
The Breeze site defines Citations as the link from a graph node back to its source artifact (Jira ticket, Figma frame, code file, document). This is now adopted explicitly by the methodology site's four-layer ontology page (Citations at Every Layer section). The Breeze site led; the methodology content followed. No changes made.

### Copy — Bullet-density reduction pass (item 10)
Converted bullet lists that fragment single thoughts into prose. Kept lists that enumerate genuinely distinct items.

- **`app/user-guide/page.tsx`** — "Traditional software delivery loses traceability" 4-bullet chain (PMs → architects → engineers → Figma) converted to three short sentences narrating the handoff sequence.
- **`app/user-guide/cookbook/page.tsx`** — `onboard-repository` skill behavior (4 bullets) converted to a two-sentence prose paragraph.
- **`app/user-guide/cookbook/page.tsx`** — "Each subsequent graph benefits from the one before" 3-bullet dependency chain converted to prose.
- **`app/user-guide/mcp/page.tsx`** — Skill file structure (names / describes / lays out, 3 bullets) folded into the preceding sentence.

Left as lists: WebUI vs Claude Code path choice, `.breeze.json` config fields, hook validation rules, cookbook topic nav links, related-pages links.

### Copy — Em-dash removal pass (item 9)
The methodology site has removed em-dashes site-wide. Applied the same convention across all user-visible content on the Breeze site.

Replacement rules applied:
- Mid-sentence connector (`A is B — and B is C`) → comma or new sentence
- Subtitle / section separator (`Section — detail`) → colon
- Inline aside (`feature — which matters here — for reason`) → parentheses
- API instruction prefix (`PRIMARY TOOL — call when`) → colon
- Roadmap / glossary entry body → colon

Files changed: `app/layout.tsx`, `app/page.tsx`, `app/user-guide/page.tsx`, `app/user-guide/quickstart/page.tsx`, `app/user-guide/graph-layers/page.tsx`, `app/user-guide/cookbook/page.tsx`, `app/user-guide/mcp/page.tsx`, `app/user-guide/mcp-tools/page.tsx`, `app/user-guide/skills/page.tsx`, `app/user-guide/comparison/page.tsx`, `components/Footer.tsx`, `components/LayerTabs.tsx`, `components/ComparisonTabs.tsx`, `components/FlowOutputs.tsx`, `components/ImpactDemo.tsx`.

Intentionally left:
- Comparison matrix `—` cells (standard "not applicable" notation in tables)
- Em-dashes inside `<pre>` code blocks (`mcp/page.tsx` lines 101, 236)
- Developer `//` comments in `ImpactFlow.tsx`, `GraphCanvas.tsx`, `ImpactDemo.tsx`, `docsNav.ts`
- The persona card `['—', 'One source of truth'...]` tag (visual icon element, not prose)

---

## 2026-06-08

### Decision — Comparison table tools (Graphify, Cody, Graphiti) not cross-referenced in methodology
The Breeze site compares against Graphify, Sourcegraph Cody, and Graphiti (Zep). The methodology content is platform-agnostic and does not reference these tools. The two should stay separate: if a future cross-link is added, the Breeze comparison table must not be inlined into methodology content. No changes made to either site.

### Copy — Architect role callout corrected
The Architect is the custodian of the Architecture Ontology; Impact Analysis is run by the Impact Analysis Agent (whose output the Architect consumes).

- **`app/page.tsx`** — Architect persona card: "Map every requirement onto a layered system blueprint; impact-analyze before changes." → "Keep the eight-layer Architecture Ontology current; the Impact Analysis Agent uses it to answer 'what does this change touch' before any code is written."

### Terminology — "PM" / "Product Manager" → "Product Owner" throughout
"Product Owner" maps to the ontology custodianship model; "PM" is a job-title shorthand that varies across companies.

- **`app/page.tsx`** — Persona card tag `PM` → `PO`, title `Product Managers` → `Product Owners`
- **`app/user-guide/page.tsx`** — Role table row `Product Managers` → `Product Owners`
- **`app/user-guide/cookbook/page.tsx`** — "you're a PM / analyst" → "you're a Product Owner / analyst"
- **`app/user-guide/mcp/page.tsx`** — "A PM / analyst doing exploration" → "A Product Owner / analyst…"
- **`app/user-guide/comparison/page.tsx`** — "cross-role collaboration (PM" → "…(Product Owner"
- **`components/ComparisonTabs.tsx`** — Audience row and win callout updated to "Product Owner"

### Terminology — "Root layer" → "Anchor layer" for Functional Ontology
"Root" implies a tree shape; the four-layer ontology is a graph with bidirectional traversal across all four layers.

- **`components/LayerTabs.tsx`** — Badge tag: `Root layer` → `Anchor layer`
- **`components/LayerTabs.tsx`** — Note heading: `Root layer.` → `Anchor layer.`
- **`components/LayerTabs.tsx`** — Description caption: "Every other ontology traces back to a Functional node" → "Every other ontology is traversable from a Functional node" (removes tree implication, preserves traversal-anchor meaning)

### Confirmed correct — Singular node-type labels in Functional hierarchy
The Breeze site already uses `Persona → Outcome → Scenario → Step → Action` (singular) throughout — in `LayerTabs.tsx`, `FlowOutputs.tsx`, all docs, and all component descriptions. No changes made. Prose that enumerates instances continues to use plural forms ("personas, outcomes, scenarios…"), which is correct. This matches the methodology convention, which was updated to align with the Breeze site, not the other way around.

### Terminology — Ontology vs graph distinction applied throughout
Ontology = the schema (node types + allowed relationships). Graph = a specific populated instance for a client project.

- **`components/LayerTabs.tsx`** — Layer heading changed from `{L.title} graph` → `{L.title} Ontology` (the tab panel describes the schema, not a specific instance)
- **`components/ComparisonTabs.tsx`** — Breeze description: "one Neo4j graph" → "one Neo4j knowledge graph" (composite instance term)
- **`components/ComparisonTabs.tsx`** — Core artifact row: "(4 ontology layers)" → "(four-layer ontology)" (composite schema term)
- **`components/ComparisonTabs.tsx`** — Matrix rows renamed: `Functional / requirements graph` → `Functional Ontology / requirements`, `Architecture graph (8 layers)` → `Architecture Ontology (8 layers)`, `Design system graph (atomic)` → `Design Ontology (atomic)` (schema-type rows, not instances)
- **`app/user-guide/comparison/page.tsx`** — "Functional / Architecture / Design graphs in addition to Code" → "…Ontologies in addition to Code"
- **`app/user-guide/comparison/page.tsx`** — "code graph as one of four layers" → "Code Ontology as one of four layers"
- **`app/user-guide/comparison/page.tsx`** — "(4 ontology layers)" → "(four-layer ontology)"

Instance references (functional graph, architecture graph, design graph, code graph, knowledge graph) left unchanged throughout documentation — those correctly refer to populated client project data.

### Copy — Remove "honest" framing from comparison section
- **`app/page.tsx`** — Section eyebrow changed from `Honest comparison` → `How it compares`
- **`app/page.tsx`** — Compare intro changed from _"All overlap with Breeze in some dimension; none does the same thing."_ → _"Each overlaps with Breeze in one or two dimensions. The full set Breeze covers, taken together, is what distinguishes the platform."_
- **`components/ComparisonTabs.tsx`** — Callout label changed from `Honest take —` → `Where each tool fits —`

### Copy — Rewrite problem section left card as prose
- **`app/page.tsx`** — Replaced four numbered bullet fragments ("01 PMs hand a doc…") with four connected prose paragraphs that narrate how context erodes at each handoff. Drift callouts (`↳ untracked`, `↳ silent divergence`) preserved as inline mono tags inside the prose.
- **`app/globals.css`** — Added `.handoffs__prose`, `.handoffs__prose p`, and `.handoffs__prose p em` styles to support the prose layout inside the left card.

---

## 2026-06-07

### UI — Section eyebrows: dot treatment on all eyebrows
- **`app/globals.css`** — `.lsection__eyebrow` now renders an indigo glowing dot via `::before`. Added `.lsection__eyebrow--amber::before` modifier for the problem section (amber dot).
- **`app/globals.css`** — `.hero__eyebrow` receives the same dot treatment (indigo).
- **`app/globals.css`** — Removed standalone `.problem-eyebrow` / `.problem-eyebrow::before` block (merged into the shared eyebrow system).
- **`app/page.tsx`** — Problem section eyebrow class changed from `problem-eyebrow` → `lsection__eyebrow lsection__eyebrow--amber`.

### UI — Eyebrow size and weight increase (all sections)
- **`app/globals.css`** — `.lsection__eyebrow`: `font-size` 11.5px → 20px, `font-weight` 700 → 900, color `--fg-muted` → `--fg-2`.

### UI — Problem section redesign
- **`app/page.tsx`** — Section heading changed from _"Traceability dies at every handoff."_ → _"Work moves forward. Knowledge stays behind."_
- **`app/page.tsx`** — Lead paragraph rewritten to empathetic framing (context slips at every retelling) rather than doom framing.
- **`app/page.tsx`** — Left card ("Without Breeze") switched from numbered list to prose paragraphs.
- **`app/page.tsx`** — Right card label changed from `// one traceable chain` → `With Breeze` badge + `// one traceable chain` subtitle.
- **`app/page.tsx`** — Added footer line to trace card: _"Every node is a citation. Every citation is queryable…"_
- **`app/globals.css`** — Left card gets amber piping (`box-shadow` amber tint) and `overflow: hidden` so the badge fills rounded corners cleanly.
- **`app/globals.css`** — Right card gets green piping and matching badge styles.
- **`app/globals.css`** — Added `.handoffs__prose` prose layout styles.
- **`app/globals.css`** — Added `.trace-card__badge` and `.trace-card__foot` styles.

### Mobile — Full responsive pass
- **`app/globals.css`** — Added comprehensive `@media` block covering all breakpoints (480px, 600px, 640px, 700px, 820px):
  - Nav: hides secondary CTA buttons (Docs, Log in) on phones ≤480px; keeps only "Get started"
  - Hero copy: padding reduced, buttons stack full-width, h1 rescaled
  - Hero cmd pill: text truncates with ellipsis on ≤640px
  - ImpactFlow visual: hidden on phones ≤700px to keep hero focused on copy
  - Impact flow stacked: `margin-top: -60px` removed when layout goes vertical at ≤820px
  - Persona grid: collapses to 1 column on ≤480px
  - Comparison tabs: horizontal scroll, header and verdict stack on ≤600px
  - Footer: collapses to 1 column on ≤480px
  - CTA command pill: text truncates on ≤600px
  - Section padding and gutter reduced to 16px on ≤480px

---

## 2026-06-06

### UI — Color theme unification (indigo / teal / green / amber)
- **`app/globals.css`** — Established four semantic brand color variables: `--indigo`, `--teal`, `--green`, `--amber` with matching `-light` and `-muted` variants.
- **`app/globals.css`** — Trace card tnode tags colored per layer (Scenario → indigo, Component → teal, Code → green, Design → amber).
- **`app/globals.css`** — Comparison matrix: green dots for Breeze wins, amber for partial, indigo column highlight.
- **`app/globals.css`** — Verdict section: first column green background + green label color.
- **`app/globals.css`** — Persona cards: individual cards with 16px radius, colored role badges.
- **`components/CopyButton.tsx`** — Copy icon switched to SVG clipboard (13×13px) for consistent sizing.

### UI — Hero layout shift fix
- **`app/globals.css`** — `.hero--dark` grid columns changed from `0.85fr 1.15fr` → `minmax(0, 0.85fr) minmax(0, 1.15fr)` so pre/code content inside the output card cannot push the left column width.

### UI — Output card stability
- **`app/globals.css`** — `.flow-stage--report` given `min-height: 340px` and `justify-content: flex-start` so the card height stays constant across all five cycling panels.
- **`app/globals.css`** — `.flow-report__trace code`: `background: transparent; border: none; padding: 0` to remove white highlight bars in trace rows.
- **`app/globals.css`** — Custom scrollbar on `.flow-code`: 4px height, `rgba(255,255,255,0.15)` thumb, transparent track.

### Content — README
- **`README.md`** — Replaced Next.js boilerplate with project-specific content: what the site is, stack, local dev instructions, deploy notes.