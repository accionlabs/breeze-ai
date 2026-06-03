'use client'
import { useState } from 'react'

const CMP = {
  graphify: {
    breeze: { what: 'Ontology-driven platform linking requirements, architecture, code & design as one Neo4j graph — and driving code generation from it.' },
    other: { name: 'Graphify', what: 'Open-source skill / CLI that turns any folder into a queryable knowledge graph, served back to AI coding assistants.' },
    rows: [
      ['Code graph generation','Tree-sitter across 10 languages','Tree-sitter across 20 languages'],
      ['Beyond code','Functional / Architecture / Design layers too','Code + attached docs only'],
      ['Persistent storage','Multi-tenant Neo4j cluster','Local files (GRAPH_REPORT.md + graph.html)'],
      ['Privacy','Code uploaded to the Breeze backend','Never uploads raw source'],
      ['Cost / licensing','Hosted SaaS · enterprise pricing','Open-source, free'],
      ['Audience','Multi-user orgs — PM, architect, engineer','Solo developer / per-repo context'],
    ],
    win: "Functional / Architecture / Design layers Graphify doesn't model; multi-user collaboration; requirement traceability from a Jira ticket → graph node → code file.",
    owin: 'Wider language coverage (20 vs 10); zero infrastructure; full local-only privacy; free.',
    honest: 'A developer onboarding a brownfield repo <em>just to understand it</em> can get value from Graphify in an afternoon. Breeze starts paying off when you also care about <b>why</b> that code exists.',
  },
  cody: {
    breeze: { what: 'An end-to-end SDLC ontology that includes a code graph as one of four layers.' },
    other: { name: 'Sourcegraph Cody', what: 'Enterprise code-search + AI coding assistant; multi-repo context retrieval up to 10 repos.' },
    rows: [
      ['Core artifact','Knowledge graph (4 ontology layers)','Code search index + AI chat'],
      ['Requirements / intent','First-class — Persona → Outcome → Scenario','Not modeled'],
      ['Architecture diagrams','First-class — 8 layers, impact analysis','Not modeled'],
      ['Code search','Neo4j-backed semantic search','Best-in-class across millions of files'],
      ['Code generation','From functional scenario','Inline, chat-driven'],
      ['Maturity / scale','Newer, growing','Established since 2013, very large scale'],
    ],
    win: 'Captures the <b>why</b> in addition to the <b>what</b>. Generates code from requirements. Built for PM + architect + engineer sharing one source of truth.',
    owin: 'Production-hardened. Excellent at "find every place this symbol is used across 200 repos." Free personal tier.',
    honest: 'If your problem is "we have a huge codebase engineers can\'t navigate," Cody is purpose-built for that. If it\'s "we don\'t know if our code matches our requirements," Breeze is. <b>They can coexist.</b>',
  },
  graphiti: {
    breeze: { what: 'Built for SDLC traceability — requirements → architecture → code → design.' },
    other: { name: 'Graphiti (Zep)', what: 'Python framework for temporal knowledge graphs — facts with validity windows, built for agent memory.' },
    rows: [
      ['Primary purpose','Link requirements → code → design','Durable, time-aware agent memory'],
      ['Graph shape','Fixed ontologies','Generic entity-relationship from conversations'],
      ['Temporality','Snapshot-of-now per project','Every edge has a validity window'],
      ['Update model','Re-run a generation skill','Real-time incremental'],
      ['Inputs','Code, requirement docs, Figma','Chat messages, records, API events'],
      ['AI integration','MCP server for Claude Code','Python SDK for agent frameworks'],
    ],
    win: "Domain-specific schemas tuned to software delivery; ontology rules enforce semantic quality a generic graph wouldn't catch.",
    owin: 'Temporal modelling and real-time updates without re-running a pipeline; better fit for agent state across sessions.',
    honest: 'These are <b>complementary, not competitive</b>. A team building an AI assistant on top of Breeze could use Graphiti to give it memory of past interactions.',
  },
}
type CmpKey = keyof typeof CMP

const MATRIX = [
  ['Code knowledge graph','●','●','search','—'],
  ['Functional / requirements graph','●','—','—','generic'],
  ['Architecture graph (8 layers)','●','—','—','—'],
  ['Design system graph (atomic)','●','—','—','—'],
  ['Temporal facts (validity windows)','—','—','—','●'],
  ['Tree-sitter parsing','10 langs','20 langs','proprietary','—'],
  ['Code search across many repos','●','local','●','—'],
  ['In-IDE AI assistant','●','●','●','SDK'],
  ['Code generation from requirements','●','—','chat','—'],
  ['Spec / FRD export from graph','●','report','—','—'],
  ['Figma / design ingestion','●','images','—','—'],
  ['Multi-tenant SaaS','●','—','●','●'],
  ['Local-only / air-gapped','—','●','●','●'],
  ['Open source','—','●','CE','●'],
]

export default function ComparisonTabs() {
  const [active, setActive] = useState<CmpKey>('graphify')
  const C = CMP[active]

  return (
    <div style={{ marginTop: 32 }}>
      <div className="compare-tabs">
        {(Object.keys(CMP) as CmpKey[]).map(k => (
          <button key={k} className={`ctab${active === k ? ' active' : ''}`} onClick={() => setActive(k)}>
            vs {CMP[k].other.name}
          </button>
        ))}
      </div>
      <div className="compare-panel">
        <div className="cmp-head">
          <div className="cmp-col is-breeze">
            <div className="tag">Breeze.AI</div>
            <div className="name">Breeze.AI</div>
            <div className="what">{C.breeze.what}</div>
          </div>
          <div className="cmp-col">
            <div className="tag">Alternative</div>
            <div className="name">{C.other.name}</div>
            <div className="what">{C.other.what}</div>
          </div>
        </div>
        <table className="cmp-table">
          <thead><tr><th>Dimension</th><th>Breeze.AI</th><th>{C.other.name}</th></tr></thead>
          <tbody>
            {C.rows.map(r => <tr key={r[0]}><td>{r[0]}</td><td className="b-col">{r[1]}</td><td className="o-col">{r[2]}</td></tr>)}
          </tbody>
        </table>
        <div className="cmp-verdict">
          <div className="verdict-col"><div className="verdict-col__label">Where Breeze wins</div><p dangerouslySetInnerHTML={{ __html: C.win }} /></div>
          <div className="verdict-col"><div className="verdict-col__label">Where {C.other.name} wins</div><p>{C.owin}</p></div>
        </div>
        <div className="honest-take"><b>Honest take — </b><span dangerouslySetInnerHTML={{ __html: C.honest }} /></div>
      </div>

      <div className="matrix-wrap" style={{ marginTop: 32 }}>
        <table className="matrix">
          <thead>
            <tr><th>Capability</th><th className="is-breeze">Breeze.AI</th><th>Graphify</th><th>Cody</th><th>Graphiti</th></tr>
          </thead>
          <tbody>
            {MATRIX.map(r => (
              <tr key={r[0]}>
                <td>{r[0]}</td>
                {[1,2,3,4].map(i => <td key={i} className={i===1?'b-col':''}><span className={r[i]==='●'?'yes':r[i]==='—'?'no':'part'}>{r[i]}</span></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
