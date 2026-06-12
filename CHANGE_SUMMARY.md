# Breeze.AI Website — Methodology Alignment Summary
**Date:** 2026-06-12  
**Branch:** feature/ui-polish  
**Prepared by:** Bhavesh Mandwani

---

## What was done

The Breeze.AI marketing and documentation site was audited against the Semantic Engineering methodology content and brought into vocabulary alignment. The goal: a reader moving between the two sites should encounter the same terminology, the same layer names, and the same platform framing — so both feel like one body of work.

All changes are copy and terminology. No features were added or removed. The build passes cleanly.

---

## The five most important changes

### 1. Platform identity now matches the methodology
The site previously described itself as an "AI-powered, ontology-driven development platform." It now uses the agreed framing everywhere:

> **AI-led SDLC, powered by Semantic Engineering**

Updated in: page title/metadata, hero section, footer, user guide intro, comparison tables.

### 2. "Honest" framing removed
Section callouts labeled **"Honest take:"** on the comparison pages have been replaced with **"Where each tool fits:"** — the same language used in the comparison widget on the homepage. The "honest" framing read as defensive and was already removed from the methodology site.

### 3. Formal ontology names used consistently
The comparison matrix previously used informal labels ("Code knowledge graph", "Functional / requirements graph"). These now use the formal names the methodology defines:

| Before | After |
|---|---|
| Code knowledge graph | Code Ontology |
| Functional / requirements graph | Functional Ontology |
| Architecture graph (8 layers) | Architecture Ontology (eight layers) |
| Design system graph (atomic) | Design Ontology (atomic design model) |

### 4. Architecture layer display names aligned
The eight architecture layers now use their formal names throughout:
- "UX" → **User Experience** (UX reads as the discipline, not the layer)
- "Observability/Monitoring" → **Observability** (monitoring is a constituent; observability is the umbrella)

### 5. Chat surfaces distinguished from autonomous agents
The WebUI chat windows were called "Functional Agent" and "Design Agent" — names that collide with the methodology's autonomous agent fleet (Impact Analysis Agent, PR Validation Agent, etc.). Renamed to **Functional Chat** and **Design Chat** to make the distinction clear.

---

## Other changes (lower visibility)

| Area | Change |
|---|---|
| Em-dashes | Removed site-wide; replaced with commas, colons, or parentheses (matches methodology style) |
| Bullet lists | Dense single-thought bullet blocks converted to prose in user guide pages |
| Numbers in prose | Spelled out under ten ("eight layers", "ten languages") per the methodology convention |
| Engineer persona card | Updated to reference the four-layer impact report, not just the functional graph |
| Brownfield cookbook framing | Added a clarifying sentence: Code-first order is a brownfield extraction sequence, not a statement that Code is methodologically primary |
| Page titles | Dropped tagline tails from documentation page h1s ("Four Graph Layers" not "Four graph layers, one source of truth") |
| "Root layer" | Changed to "Anchor layer" — the graph is bidirectional, not a tree |
| "PM" | Changed to "Product Owner" — the term that maps to the ontology custodianship model |

---

## What was reviewed and left unchanged

- **Citations terminology** — the Breeze site coined this; the methodology content has now adopted it. No change needed.
- **"Cookbook" page title** — appropriate for tool documentation; the methodology site should simply not inherit it when cross-linking.
- **Footer attribution** ("Documentation: Anirudha Gohokar") — Breeze site choice, no change recommended.
- **Comparison tool selection** (Graphify, Cody, Graphiti) — platform-specific; methodology site does not address these.

---

## Files changed

`app/layout.tsx`, `app/page.tsx`, `app/user-guide/page.tsx`, `app/user-guide/graph-layers/page.tsx`, `app/user-guide/cookbook/page.tsx`, `app/user-guide/mcp/page.tsx`, `app/user-guide/mcp-tools/page.tsx`, `app/user-guide/skills/page.tsx`, `app/user-guide/comparison/page.tsx`, `app/user-guide/quickstart/page.tsx`, `components/Footer.tsx`, `components/LayerTabs.tsx`, `components/ComparisonTabs.tsx`, `components/FlowOutputs.tsx`, `components/ImpactDemo.tsx`

**Build status:** ✅ Passes — 12/12 static pages generated, zero errors.
