import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import GraphCanvas from '@/components/GraphCanvas'
import ScrollReveal from '@/components/ScrollReveal'
import ComparisonTabs from '@/components/ComparisonTabs'
import CopyButton from '@/components/CopyButton'
import Link from 'next/link'

const CMD = '/plugin marketplace add accionlabs/breezeai-claude-plugin'

const HOME_LINKS = [
  { label: 'Why Breeze', href: '#problem' },
  { label: 'How it works', href: '#onegraph' },
  { label: 'Compare', href: '#compare' },
  { label: 'Docs', href: '/user-guide' },
]

export default function Home() {
  return (
    <>
      <Nav links={HOME_LINKS} page="home" />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero__copy">
          <div className="hero__eyebrow">Ontology-driven development platform</div>
          <h1>Every requirement, decision and line of code — one graph.</h1>
          <p className="hero__sub">Breeze.AI captures requirements, architecture, code, and design as a single knowledge graph. Traceability preserved end-to-end, from business intent down to the line of code that implements it.</p>
          <div className="hero__btns">
            <Link href="/user-guide" className="btn btn--black">Get started</Link>
            <Link href="/user-guide" className="btn btn--outline">View documentation</Link>
          </div>
          <div className="hero__cmd">
            <span>{CMD}</span>
            <CopyButton text={CMD} />
          </div>
        </div>
        <div className="hero__visual">
          <GraphCanvas />
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-card__icon" style={{background:'var(--indigo-light)',color:'var(--indigo)',borderColor:'oklch(0.78 0.12 280)'}}>⬡</div>
          <h3>Code &amp; data, indexed</h3>
          <p>Tree-sitter parsing across 10 languages — accurate symbols and edges from real ASTs — plus relational database and Elasticsearch schemas modelled as first-class graph nodes.</p>
          <ul className="lang-badges" aria-label="Supported languages and data sources">
            {['JS / TS','Python','Java','C#','Go','PHP','VB.NET','Apex','Perl','SQL schema','Elasticsearch'].map((l) => (
              <li key={l} className={`lang-badge${l === 'SQL schema' || l === 'Elasticsearch' ? ' lang-badge--data' : ''}`}>{l}</li>
            ))}
          </ul>
        </div>
        <div className="feature-card">
          <div className="feature-card__icon" style={{background:'var(--teal-light)',color:'var(--teal)',borderColor:'oklch(0.78 0.10 200)'}}>⌘</div>
          <h3>MCP server</h3>
          <p>The <code>breeze-mcp</code> server brings 18 <code>/breeze:*</code> skills into your IDE — onboard repos, generate graphs, validate quality, and export specs without leaving the editor.</p>
          <div className="feature-card__meta">Claude Code · Cursor · Cline · Windsurf</div>
        </div>
        <div className="feature-card">
          <div className="feature-card__icon" style={{background:'var(--amber-light)',color:'var(--amber)',borderColor:'oklch(0.80 0.10 70)'}}>◎</div>
          <h3>Impact analysis</h3>
          <p>Our core skill. Trace the full blast radius of any change across all four layers — functional → design → code → architecture — before you touch a line.</p>
          <div className="feature-card__meta">/breeze:impact-analysis</div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="lsection" id="problem">
        <div className="wrap">
          <ScrollReveal>
            <div className="lsection__head">
              <div className="lsection__eyebrow">The problem</div>
              <h2 className="lsection h2">Traceability dies at every handoff.</h2>
              <p className="lead">Traditional delivery loses the thread each time work changes hands. By the time a regulator, customer, or new joiner asks <em>"why does this code exist?"</em>, the answer needs a tribal-knowledge tour.</p>
            </div>
          </ScrollReveal>
          <div className="two-col">
            <ScrollReveal>
              <div className="handoffs">
                {[
                  ['01', '<b>PMs</b> hand a doc to architects.', null],
                  ['02', '<b>Architects</b> hand a diagram to engineers.', null],
                  ['03', '<b>Engineers</b> ship code that drifts from the diagram.', '→ drift begins'],
                  ['04', 'The <b>design system</b> in Figma evolves independently of the running UI.', '→ silent divergence'],
                ].map(([n, line, drift]) => (
                  <div key={n as string} className="handoff">
                    <span className="handoff__n">{n}</span>
                    <span className="handoff__line">
                      <span dangerouslySetInnerHTML={{ __html: line as string }} />
                      {drift && <span className="handoff__drift">{drift as string}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="trace-card">
                <div className="trace-card__label">// one traceable chain</div>
                {[
                  [0, 'Scenario', 'Customer completes checkout', '↩ JIRA-412'],
                  [24, 'Component', 'PaymentService', '↩ arch-blueprint'],
                  [48, 'Code', 'charge.ts → captureIntent()', '↩ repo@a1b2c3'],
                  [24, 'Design', 'CheckoutButton (Organism)', '↩ figma#payflow'],
                ].map(([ind, tag, txt, ref]) => (
                  <div key={txt as string} className="tnode" style={{ '--ind': `${ind}px` } as React.CSSProperties}>
                    <span className="tnode__tag">{tag}</span>
                    <span className="tnode__txt">{txt}</span>
                    <span className="tnode__ref">{ref}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ONE GRAPH */}
      <section className="lsection" id="onegraph" style={{ background: 'var(--bg-white)' }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="lsection__head">
              <div className="lsection__eyebrow">The Breeze approach</div>
              <h2>One graph. Every artifact. Nothing lost.</h2>
              <p className="lead">Breeze keeps the chain intact by storing every artefact as a node in one graph — queryable by humans through the Web UI, by LLM agents through chat, or by your IDE through Claude Code skills and MCP.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="persona-grid">
              {[
                ['PM', 'Product Managers', 'Capture requirements once; the graph keeps them in sync with what\'s actually shipped.'],
                ['AR', 'Architects', 'Map every requirement onto a layered system blueprint; impact-analyze before changes.'],
                ['EN', 'Engineers', 'Generate code & tests from the functional graph; reverse-engineer brownfield repos.'],
                ['DS', 'Designers', 'Keep the design system aligned with the running UI; flag Figma vs shipped deviations.'],
                ['CA', 'Compliance & Audit', 'Trace any line of code back to the requirement, ticket, or document that justified it.'],
                ['—', 'One source of truth', 'No more divergent artefacts across roles — the graph is the system of record.'],
              ].map(([tag, title, desc]) => (
                <div key={title} className="persona-card">
                  <div className="persona-card__tag">{tag}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COMPARE */}
      <section className="lsection" id="compare">
        <div className="wrap">
          <ScrollReveal>
            <div className="lsection__head">
              <div className="lsection__eyebrow">Honest comparison</div>
              <h2>How Breeze.AI compares.</h2>
              <p className="lead">Three tools come up in the same conversation. All overlap with Breeze in some dimension; none does the same thing.</p>
            </div>
          </ScrollReveal>
          <ComparisonTabs />
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta" id="cta">
        <div className="wrap">
          <ScrollReveal>
            <h2>Requirement → architecture → code → design.<br />End to end, in one graph.</h2>
            <p>Install the plugin, link a project, and onboard your first repository in minutes.</p>
            <div className="landing-cta__btns">
              <Link href="/user-guide" className="btn btn--black">Read the documentation</Link>
              <Link href="/user-guide/quickstart/" className="btn btn--outline">View quick-start</Link>
            </div>
            <div className="landing-cta__cmd">
              <span>{CMD}</span>
              <CopyButton text={CMD} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
