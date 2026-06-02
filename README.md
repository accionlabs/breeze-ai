# Breeze.AI — Marketing & Documentation Website

Public-facing website for [Breeze.AI](https://breezeai.accionlabs.com) — an ontology-driven development platform by [Accion Labs](https://accionlabs.com).

Built with **Next.js 16 · React 19 · TypeScript**.

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — value proposition, feature overview, and comparison |
| `/user-guide` | Full documentation — graph layers, MCP setup, skills reference, quick-start |

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- Fonts: Space Grotesk, IBM Plex Sans, JetBrains Mono (via `next/font/google`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # development server (http://localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Project structure

```
app/
  layout.tsx          # root layout — fonts, metadata
  globals.css         # global styles / design tokens
  page.tsx            # home page
  user-guide/
    page.tsx          # documentation page
components/
  Nav.tsx
  Footer.tsx
  GraphCanvas.tsx
  ScrollReveal.tsx
  ComparisonTabs.tsx
  LayerTabs.tsx
  DocsSidebar.tsx
  DocsTOC.tsx
  CopyButton.tsx
public/
  assets/
    logo.png
```
