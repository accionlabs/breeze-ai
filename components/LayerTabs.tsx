'use client'
import { useState } from 'react'

const LAYERS = {
  functional: {
    color: 'oklch(0.48 0.22 280)', bg: 'oklch(0.93 0.06 280)', tag: 'Root layer', title: 'Functional',
    desc: 'Who uses the product, what they want to achieve, and the exact actions they take. Every other ontology traces back to a Functional node.',
    note: '<b>Root layer.</b> Generate from your UI and backend — Breeze captures the <em>why</em> behind every feature, not just the <em>what</em>.',
    hier: [['Persona','who'],['Outcome','goal'],['Scenario','flow'],['Step','interaction'],['Action','atomic']],
  },
  architecture: {
    color: 'oklch(0.52 0.16 200)', bg: 'oklch(0.93 0.05 200)', tag: '8 fixed layers', title: 'Architecture',
    desc: 'The system blueprint. Services, components, integration contracts, and deployment topology — mapped so any requirement can be impact-analyzed.',
    note: '<b>Eight fixed layers</b> from UserExperience down to Infrastructure, with impact analysis across the blueprint.',
    hier: [['UserExperience',''],['ApiGateway',''],['Services',''],['Agents',''],['EventQueue',''],['DataLake',''],['Observability',''],['Infrastructure','']],
  },
  design: {
    color: 'oklch(0.48 0.17 155)', bg: 'oklch(0.93 0.06 155)', tag: 'Atomic design', title: 'Design',
    desc: 'An atomic-design model of the UI. Links each rendered component back to the user outcome that justifies it and flags Figma vs shipped UI drift.',
    note: '<b>Atomic design</b> plus a UserJourney → Flow → Page view that ties the running UI to functional outcomes.',
    hier: [['Atom','token'],['Molecule','group'],['Organism','block'],['Template','layout'],['Page','screen']],
  },
  code: {
    color: 'oklch(0.60 0.17 70)', bg: 'oklch(0.94 0.05 70)', tag: 'Auto-generated', title: 'Code',
    desc: 'Generated automatically by the Code Ontology Generator from real source code. Bridges architecture to implementation; enables dead-code, coverage, and reuse analysis.',
    note: '<b>Tree-sitter across 10 languages</b> — JS/TS, Python, Java, C#, Go, PHP, VB.NET, Apex, Perl — enriched by an LLM.',
    hier: [['File','module'],['Class','type'],['Function','unit'],['Statement','logic'],['Api','contract']],
  },
}

type LayerKey = keyof typeof LAYERS

export default function LayerTabs() {
  const [active, setActive] = useState<LayerKey>('functional')
  const L = LAYERS[active]

  return (
    <div style={{ marginTop: 24 }}>
      <div className="layer-tabs" role="tablist">
        {(Object.keys(LAYERS) as LayerKey[]).map(k => (
          <button key={k} role="tab" aria-selected={active === k} className={`layer-tab${active === k ? ' active' : ''}`} style={active === k ? { color: LAYERS[k].color, background: LAYERS[k].bg, borderColor: LAYERS[k].color } : {}} onClick={() => setActive(k)}>
            <span className="dot" style={{ background: LAYERS[k].color }} />
            {LAYERS[k].title}
          </button>
        ))}
      </div>
      <div className="layer-panel">
        <div className="lp-info">
          <span className="lp-badge" style={{ background: L.bg, color: L.color, border: `1px solid ${L.color}` }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: L.color, display: 'inline-block', flexShrink: 0 }} />{L.tag}</span>
          <h3>{L.title} graph</h3>
          <p className="lp-desc">{L.desc}</p>
          <div className="lp-note" dangerouslySetInnerHTML={{ __html: L.note }} />
        </div>
        <div className="lp-hier">
          <div className="lp-hier-label">Hierarchy</div>
          {L.hier.map(([name, sub], i) => (
            <div key={name} className="lp-node" style={{ '--ind': `${i * 18}px` } as React.CSSProperties}>
              <span className="n" style={{ background: L.color }}>{i + 1}</span>
              <span>{name}</span>
              {sub && <span className="s">{sub}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="cite-note">
        <span className="cite-note__badge">Citations</span>
        <span>All four layers share <strong>Citations</strong> — links to the source document, Figma frame, Jira ticket, or code file that justifies each node. Required at every level for audit-grade traceability.</span>
      </div>
    </div>
  )
}
