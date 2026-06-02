import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DocsSidebar from '@/components/DocsSidebar'
import DocsTOC from '@/components/DocsTOC'
import LayerTabs from '@/components/LayerTabs'

const DOC_LINKS = [
  { label: 'What is Breeze', href: '#what-is' },
  { label: 'Graph layers', href: '#layers' },
  { label: 'MCP & Skills', href: '#mcp' },
  { label: 'Cookbook', href: '#cookbook' },
  { label: 'Quick-start', href: '#quickstart' },
]

const TOC = [
  { id: 'what-is', label: 'What is Breeze.AI?' },
  { id: 'the-problem', label: 'The problem it solves', level: 3 },
  { id: 'who-uses', label: 'Who uses it', level: 3 },
  { id: 'layers', label: 'Four graph layers' },
  { id: 'mcp', label: 'MCP integration' },
  { id: 'mcp-setup', label: 'Setup guide', level: 3 },
  { id: 'mcp-tools', label: 'MCP tool surface', level: 3 },
  { id: 'skills', label: 'Skills reference' },
  { id: 'cookbook', label: 'Building the graphs' },
  { id: 'brownfield', label: 'Brownfield order', level: 3 },
  { id: 'greenfield', label: 'Greenfield order', level: 3 },
  { id: 'quickref', label: 'Quick reference', level: 3 },
  { id: 'quickstart', label: 'Quick-start & URLs' },
  { id: 'urls', label: 'Key URLs', level: 3 },
  { id: 'glossary', label: 'Glossary' },
]

export default function UserGuide() {
  return (
    <>
      <Nav links={DOC_LINKS} page="docs" />
      <div className="docs-layout">
        <DocsSidebar />

        <main className="docs-content">

          {/* ── WHAT IS BREEZE.AI ─────────────────────────── */}
          <section className="docs-section" id="what-is">
            <h1>User Guide — Using Breeze.AI</h1>
            <p>Everything you need to use Breeze to capture requirements, build knowledge graphs, generate code, and query the platform from your IDE.</p>

            <h2 id="the-problem">The problem it solves</h2>
            <p>Breeze.AI is an AI-powered, ontology-driven development platform built by <strong>Accion Labs</strong>. It accelerates both green-field (net-new) and brown-field (legacy modernization) software initiatives by capturing requirements, architecture, code, and design as a single connected <strong>Knowledge Graph</strong> — so traceability is preserved end-to-end, from business intent down to the line of code that implements it.</p>
            <p>Traditional software delivery loses traceability at every handoff:</p>
            <ul>
              <li>PMs hand a doc to architects</li>
              <li>Architects hand a diagram to engineers</li>
              <li>Engineers ship code that drifts from the diagram</li>
              <li>The design system in Figma evolves independently of the running UI</li>
            </ul>
            <p>By the time a regulator, customer, or new joiner asks <em>"why does this code exist?"</em>, the answer requires a tribal-knowledge tour. Documentation rots; tickets fall out of sync; impact analysis becomes guesswork.</p>
            <p>Breeze keeps the chain intact by storing every artefact as a node in one graph — queryable by humans (Web UI), by LLM agents (chat), or by your IDE (Claude Code skills + MCP).</p>

            <h2 id="who-uses">Who uses Breeze.AI?</h2>
            <div className="doc-table-wrap">
              <table className="doc-table">
                <thead><tr><th>Persona</th><th>Why they care</th></tr></thead>
                <tbody>
                  <tr><td><strong>Product Managers</strong></td><td>Capture requirements once; the graph keeps them in sync with what's actually shipped.</td></tr>
                  <tr><td><strong>Architects</strong></td><td>Map every requirement onto a layered system blueprint; impact-analyze before changes.</td></tr>
                  <tr><td><strong>Engineers</strong></td><td>Generate code &amp; tests from the functional graph; reverse-engineer brownfield repos into the code graph.</td></tr>
                  <tr><td><strong>Designers</strong></td><td>Keep the design system aligned with the running UI; flag deviations between Figma and shipped components.</td></tr>
                  <tr><td><strong>Compliance / Audit</strong></td><td>Trace any line of code back to the requirement, ticket, or document that justified it.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── FOUR GRAPH LAYERS ────────────────────────── */}
          <section className="docs-section" id="layers">
            <h2>Four graph layers, one source of truth</h2>
            <p>Every artifact in software delivery maps to one of four connected ontologies. The Functional layer is the root — every other layer traces back to it.</p>
            <LayerTabs />
            <div className="doc-table-wrap" style={{ marginTop: 32 }}>
              <table className="doc-table">
                <thead><tr><th>Layer</th><th>Hierarchy</th><th>What it captures</th></tr></thead>
                <tbody>
                  <tr><td><code>Functional</code></td><td>Persona → Outcome → Scenario → Step → Action</td><td>Who uses the product, what they want to achieve, and the exact actions they take. Root layer.</td></tr>
                  <tr><td><code>Architecture</code></td><td>UserExperience · ApiGateway · Services · Agents · EventQueue · DataLake · Observability · Infrastructure</td><td>The 8-layer system blueprint. Services, components, integration contracts, deployment topology.</td></tr>
                  <tr><td><code>Design</code></td><td>Atom → Molecule → Organism → Template → Page (+ UserJourney → Flow)</td><td>Atomic-design model of the UI. Links each component back to the user outcome that justifies it.</td></tr>
                  <tr><td><code>Code</code></td><td>File → Class → Function → Statement → Api</td><td>Auto-generated by the Code Ontology Generator from real source. Bridges architecture to implementation.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── MCP INTEGRATION ──────────────────────────── */}
          <section className="docs-section" id="mcp">
            <h2>MCP integration</h2>
            <p>When you "add Breeze to your IDE," you install one Claude Code plugin called <code>breeze</code> — distributed through the <code>breezeai-plugins</code> marketplace. That single plugin gives you three things at once:</p>
            <ul>
              <li><strong>An MCP server</strong> (<code>breeze-mcp</code>) — registered automatically, gives Claude ~43 typed tools to read and write your Breeze project.</li>
              <li><strong>18 skills</strong> — <code>/breeze:*</code> slash-commands that orchestrate those tools to do real work.</li>
              <li><strong>Two pre-tool-use hooks</strong> — guardrails that block bad tool calls before they leave your machine.</li>
            </ul>

            <h3 id="mcp-setup">Setup guide</h3>
            <p>Five commands in Claude Code:</p>
            <div className="code-block">
              <div className="code-block__bar">
                <span className="code-block__dot" style={{background:'#ff5f57'}}/>
                <span className="code-block__dot" style={{background:'#febc2e'}}/>
                <span className="code-block__dot" style={{background:'#28c840'}}/>
                <span className="code-block__title">claude-code — install breeze</span>
              </div>
              <div className="code-block__body">
                <span className="ln"><span className="c"># 1. register the marketplace</span></span>
                <span className="ln"><span className="k">/plugin marketplace add</span> accionlabs/breezeai-claude-plugin</span>
                <span className="ln"> </span>
                <span className="ln"><span className="c"># 2. install the plugin</span></span>
                <span className="ln"><span className="k">/plugin install</span> breeze</span>
                <span className="ln"> </span>
                <span className="ln"><span className="c"># 3. restart Claude Code (hooks apply at startup)</span></span>
                <span className="ln"> </span>
                <span className="ln"><span className="c"># 4. verify</span></span>
                <span className="ln"><span className="k">/plugin list</span></span>
                <span className="ln"> </span>
                <span className="ln"><span className="c"># 5. initialize workspace (triggers OAuth sign-in)</span></span>
                <span className="ln"><span className="k">/breeze:setup-project</span></span>
              </div>
            </div>
            <div className="doc-note" style={{ marginTop: 16 }}>
              <b>Note:</b> The MCP server uses Keycloak OAuth (PKCE). The first tool call opens a browser sign-in; subsequent sessions auto-refresh. No API key needed for MCP — keys are only used by the Code Ontology CLI in automatic-upload mode.
            </div>

            <div className="setup-steps">
              {[
                ['1', 'Register the marketplace', 'Adds a pointer to the GitHub catalog. No code downloaded yet — just metadata.'],
                ['2', 'Install the plugin', <>Downloads skills, MCP wiring, and hooks into your Claude Code plugin directory. Registers <code>breeze-mcp</code> as a known MCP server.</>],
                ['3', 'Restart Claude Code', <>Hooks and MCP server registration only apply at startup. The <code>/breeze:*</code> commands won't appear until you restart.</>],
                ['4', 'Initialize your workspace', <><code>/breeze:setup-project</code> writes <code>.breeze.json</code>, links to a project UUID, and triggers the Keycloak OAuth browser sign-in on the first MCP call. Add <code>.breeze.json</code> to <code>.gitignore</code>.</>],
              ].map(([n, title, body]) => (
                <div key={n as string} className="setup-step">
                  <span className="setup-step__n">{n}</span>
                  <div><h4>{title as string}</h4><p>{body as React.ReactNode}</p></div>
                </div>
              ))}
            </div>

            <h3 id="mcp-tools">MCP tool surface (~43 tools)</h3>
            <div className="doc-table-wrap">
              <table className="doc-table">
                <thead><tr><th>Group</th><th>Tools</th><th>What it does</th></tr></thead>
                <tbody>
                  {[
                    ['Project management','4','List / create / get / update projects'],
                    ['Functional graph — reads','6','Persona → Outcome → Scenario → Step → Action drill-down + full-graph export'],
                    ['Functional graph — mutations','7','Semantic search; create / update / bulk-upsert / delete nodes; attach citations'],
                    ['Architecture graph','6','Read / search / create / update / delete across the 8 layers; DDL search'],
                    ['Design graph','6','Atomic-design CRUD: UserJourney → Flow → Page → Component'],
                    ['Code graph','3','List repos; semantic search across File / Function / Class; per-file drill-down'],
                    ['DB schema graph','10','Table / column / constraint / index / view / sequence / procedure CRUD'],
                    ['Documents & Health','2','Semantic search across source documents; server metrics'],
                  ].map(r => <tr key={r[0]}><td>{r[0]}</td><td><code>{r[1]}</code></td><td>{r[2]}</td></tr>)}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── SKILLS REFERENCE ──────────────────────────── */}
          <section className="docs-section" id="skills">
            <h2>Skills reference — 18 /breeze:* commands</h2>
            <p>Skills are reusable recipes. Each one names a task, describes when to trigger it, and lays out the exact sequence of MCP tool calls. 17 active + 1 retired.</p>

            {[
              { group: 'Setup', items: [
                ['/breeze:setup-project', <><b>Initialize the workspace.</b> Links <code>.breeze.json</code> to a project UUID; checks ontology readiness. Triggers Keycloak OAuth on first MCP call.</>],
                ['/breeze:onboard-repository', <><b>Get a repo into the code graph.</b> Wraps the Code Ontology Generator CLI with <code>--capture-statements</code>. Auto-switches to Node 22. Two modes: automatic upload or manual (writes ndjson locally).</>],
              ]},
              { group: 'Search & Analysis', items: [
                ['/breeze:search', <><b>Default search entry point.</b> Routes to functional graph, code graph, or both. Use for "how does X work", "find auth middleware", "what does admin do".</>],
                ['/breeze:analyze-functional', <><b>Analyze a requirement against the functional graph.</b> Accepts Jira tickets, docs, code, or free text. Identifies gaps, conflicts, and terminology mismatches.</>],
                ['/breeze:analyze-architecture', <><b>Map a requirement to the 8-layer architecture model.</b> Runs code-graph impact analysis and writes analysis back to Jira.</>],
                ['/breeze:analyze-design', <><b>Generate design nodes from a Jira ticket, Figma URL, or description.</b> Creates UserJourney → Flow → Page → Component with atomic typing.</>],
                ['/breeze:analyze-design-deviations', <><b>Compare Figma components against the design-graph registry.</b> Input: <code>figmaComponents.json</code>.</>],
                ['/breeze:detect-personas', <><b>Infer personas from a frontend UI repo.</b> Analyzes routes, tiers, roles, and feature flags to build a persona matrix.</>],
              ]},
              { group: 'Generate from Documents & Designs', items: [
                ['/breeze:visual-to-text', <><b>UI designs → structured user stories.</b> Accepts Figma URLs, PDF screens, or images. Maps to Persona → Outcome → Scenario → Step → Action.</>],
                ['/breeze:generate-functional-from-ui', <><b>User-persona functional graph from a frontend repo.</b> Multi-phase pipeline: persona discovery → entry-point discovery → per-EP JSX analysis → bulk upsert.</>],
                ['/breeze:generate-functional-from-backend', <><b>System-persona functional graph from a backend repo.</b> Discovers REST routes, SQS/Kafka consumers, cron workers, WebSocket handlers, webhooks.</>],
              ]},
              { group: 'Generate Downstream Artifacts', items: [
                ['/breeze:generate-design', <><b>Design graph from the functional graph.</b> Maps Scenario → UserJourney, Step → Flow/Page, Action → Component.</>],
                ['/breeze:generate-design-from-ui', <><b>Design graph enriched by the real frontend codebase.</b> Reads JSX/TSX to discover actual flows and component hierarchies.</>],
                ['/breeze:generate-code', <><b>Code &amp; tests from the functional + code graphs.</b> Understands the WHAT (functional), discovers the HOW (code patterns), generates code with graph-node-ID comments.</>],
                ['/breeze:generate-spec', <><b>Export an FRD from the graph.</b> Modes: <code>--plain</code>, <code>--full</code>, <code>--html</code> (interactive viewer), <code>--mermaid</code>.</>],
              ]},
              { group: 'Update & Validate', items: [
                ['/breeze:update-functional-graph', <><b>Create or update nodes from code, docs, or Figma.</b> Enforces persona reuse rules and attaches citations.</>],
                ['/breeze:validate-functional-graph', <><b>Audit graph quality.</b> Checks coverage, duplicates, persona naming, description completeness, and citation traceability. Outputs <code>validation-report.json</code>.</>],
              ]},
              { group: 'Retired', items: [
                ['/breeze:deprecated-cluster-pipeline', <><b>Do not use.</b> Retired v1 cluster pipeline. Use <code>generate-functional-from-ui</code> and <code>generate-functional-from-backend</code> instead.</>],
              ]},
            ].map(({ group, items }) => (
              <div key={group} className="skill-group">
                <div className="skill-group__title">{group}</div>
                {items.map(([cmd, desc]) => (
                  <div key={cmd as string} className={`skill-row${group === 'Retired' ? ' retired' : ''}`}>
                    <span className="skill-row__cmd">{cmd as string}</span>
                    <span className="skill-row__desc">{desc as React.ReactNode}</span>
                  </div>
                ))}
              </div>
            ))}
          </section>

          {/* ── COOKBOOK ─────────────────────────────────── */}
          <section className="docs-section" id="cookbook">
            <h2>Building the graphs — cookbook</h2>
            <p>A practical, recipe-style guide for getting the Code, Functional, Design, and Architecture graphs populated and kept in sync.</p>
            <div className="doc-note"><b>Always start with</b> <code>/breeze:setup-project</code> once per workspace. It writes <code>.breeze.json</code> and links the workspace to a Breeze project UUID. Every other skill assumes it's been run.</div>

            <div className="recipe-grid">
              {[
                { icon: '#111', label: 'CO', title: '1. Code Graph', sub: 'Build this first for any brownfield project', body: 'The code graph is the foundation — every downstream skill reads from it.', steps: [
                  { c: '# Path A — Claude Code (recommended)', k: '' },
                  { c: '', k: '/breeze:onboard-repository <path-to-repo>' },
                  { c: '# Path B — WebUI (no local dev env needed)', k: '' },
                  { c: 'ai.accionbreeze.com → Code Ontology → upload ndjson', k: '' },
                ]},
                { icon: '#454542', label: 'FG', title: '2. Functional Graph', sub: 'Persona → Outcome → Scenario → Step → Action', body: 'The intent layer — derives who uses the product and why from existing code or docs.', steps: [
                  { c: '# Brownfield — from frontend', k: '/breeze:generate-functional-from-ui <fe>' },
                  { c: '# Brownfield — from backend', k: '/breeze:generate-functional-from-backend <be>' },
                  { c: '# Greenfield — from designs/docs', k: '/breeze:visual-to-text <figma-url>' },
                ]},
                { icon: '#767670', label: 'DG', title: '3. Design Graph', sub: 'UserJourney → Flow → Page + atomic components', body: 'Maps user journeys to actual UI components, linking each to functional outcomes.', steps: [
                  { c: '# From functional graph', k: '/breeze:generate-design' },
                  { c: '# From the real UI repo (preferred)', k: '/breeze:generate-design-from-ui' },
                  { c: '# Audit Figma vs design graph', k: '/breeze:analyze-design-deviations' },
                ]},
                { icon: '#AAAAAA', label: 'AG', title: '4. Architecture Graph', sub: '8 fixed layers from UX to Infrastructure', body: 'The system blueprint. Two paths: from documents or from a Jira ticket.', steps: [
                  { c: '# From a Jira ticket (impact analysis)', k: '/breeze:analyze-architecture <jira-url>' },
                  { c: '# From docs (direct)', k: '"Read ./docs/arch.md and create the architecture graph"' },
                ]},
              ].map(card => (
                <div key={card.title} className="recipe-card">
                  <div className="recipe-card__head">
                    <div className="recipe-card__badge" style={{ background: card.icon }}>{card.label}</div>
                    <div>
                      <div className="recipe-card__title">{card.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{card.sub}</div>
                    </div>
                  </div>
                  <div className="recipe-card__body">
                    <p>{card.body}</p>
                    <div className="recipe-steps">
                      {card.steps.map((s, i) => (
                        <div key={i} className="recipe-step">
                          {s.c && <span className="c">{s.c}</span>}
                          {s.k && <><br /><span className="k">{s.k}</span></>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 id="brownfield">Recommended order — Brownfield</h3>
            <div className="code-block">
              <div className="code-block__bar">
                <span className="code-block__dot" style={{background:'#ff5f57'}}/>
                <span className="code-block__dot" style={{background:'#febc2e'}}/>
                <span className="code-block__dot" style={{background:'#28c840'}}/>
                <span className="code-block__title">brownfield — existing product</span>
              </div>
              <div className="code-block__body">
                <span className="ln"><span className="k">/breeze:setup-project</span></span>
                <span className="ln"><span className="k">/breeze:onboard-repository</span> &lt;fe-repo&gt;</span>
                <span className="ln"><span className="k">/breeze:onboard-repository</span> &lt;be-repo&gt;</span>
                <span className="ln"><span className="k">/breeze:generate-functional-from-ui</span>      &lt;fe&gt;</span>
                <span className="ln"><span className="k">/breeze:generate-functional-from-backend</span> &lt;be&gt;</span>
                <span className="ln"><span className="k">/breeze:validate-functional-graph</span></span>
                <span className="ln"><span className="k">/breeze:generate-spec</span></span>
              </div>
            </div>

            <h3 id="greenfield">Recommended order — Greenfield</h3>
            <div className="code-block">
              <div className="code-block__bar">
                <span className="code-block__dot" style={{background:'#ff5f57'}}/>
                <span className="code-block__dot" style={{background:'#febc2e'}}/>
                <span className="code-block__dot" style={{background:'#28c840'}}/>
                <span className="code-block__title">greenfield — no code yet</span>
              </div>
              <div className="code-block__body">
                <span className="ln"><span className="k">/breeze:setup-project</span></span>
                <span className="ln"><span className="k">/breeze:visual-to-text</span> &lt;figma-url&gt;</span>
                <span className="ln"><span className="k">/breeze:analyze-functional</span> &lt;jira-or-doc&gt;</span>
                <span className="ln"><span className="k">/breeze:generate-design</span></span>
              </div>
            </div>

            <h3 id="quickref">Quick reference</h3>
            <div className="qref-grid">
              {[
                ['First-time setup', '/breeze:setup-project'],
                ['Onboard a repo', '/breeze:onboard-repository <path>'],
                ['Functional from frontend', '/breeze:generate-functional-from-ui'],
                ['Functional from backend', '/breeze:generate-functional-from-backend'],
                ['Functional from Figma/PDF', '/breeze:visual-to-text'],
                ['Validate functional quality', '/breeze:validate-functional-graph'],
                ['Design from functional', '/breeze:generate-design'],
                ['Design from real UI', '/breeze:generate-design-from-ui'],
                ['Figma vs design drift', '/breeze:analyze-design-deviations'],
                ['Architecture impact', '/breeze:analyze-architecture <jira>'],
                ['Generate code & tests', '/breeze:generate-code'],
                ['Export an FRD', '/breeze:generate-spec'],
                ['Search anything', '/breeze:search'],
              ].map(([goal, cmd]) => (
                <div key={goal} className="qref-item">
                  <span className="qref-item__goal">{goal}</span>
                  <span className="qref-item__cmd">{cmd}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── QUICK-START & URLS ───────────────────────── */}
          <section className="docs-section" id="quickstart">
            <h2>Quick-start & URLs</h2>

            <h3 id="urls">Key URLs</h3>
            <div className="url-table-wrap">
              <table className="url-table">
                <thead><tr><th>Service</th><th>URL</th></tr></thead>
                <tbody>
                  {[
                    ['Breeze.AI WebUI', 'https://ai.accionbreeze.com'],
                    ['Keycloak (auth)', 'https://login-new.accionbreeze.com'],
                    ['breeze-mcp (Python, OAuth)', 'https://breezeai-mcp-python.accionbreeze.com/mcp'],
                    ['API-key generation', 'https://ai.accionbreeze.com/mcp/generate/key'],
                    ['N8N workflows', 'https://n8n.accionbreeze.com'],
                  ].map(([s, u]) => <tr key={s}><td>{s}</td><td className="url-val">{u}</td></tr>)}
                </tbody>
              </table>
            </div>

            <h3 style={{ marginTop: 32 }}>Day-to-day shortcuts</h3>
            <div className="code-block">
              <div className="code-block__bar">
                <span className="code-block__dot" style={{background:'#ff5f57'}}/>
                <span className="code-block__dot" style={{background:'#febc2e'}}/>
                <span className="code-block__dot" style={{background:'#28c840'}}/>
                <span className="code-block__title">claude-code — common commands</span>
              </div>
              <div className="code-block__body">
                <span className="ln"><span className="c"># search anything in the graph</span></span>
                <span className="ln"><span className="k">/breeze:search</span> "how does X work"</span>
                <span className="ln"> </span>
                <span className="ln"><span className="c"># impact analysis for a Jira ticket</span></span>
                <span className="ln"><span className="k">/breeze:analyze-architecture</span> &lt;jira-url&gt;</span>
                <span className="ln"> </span>
                <span className="ln"><span className="c"># generate code from a scenario</span></span>
                <span className="ln"><span className="k">/breeze:generate-code</span> &lt;scenario-id&gt;</span>
                <span className="ln"> </span>
                <span className="ln"><span className="c"># export a full functional spec</span></span>
                <span className="ln"><span className="k">/breeze:generate-spec</span> --html --full</span>
                <span className="ln"> </span>
                <span className="ln"><span className="c"># validate graph quality</span></span>
                <span className="ln"><span className="k">/breeze:validate-functional-graph</span></span>
              </div>
            </div>
          </section>

          {/* ── GLOSSARY ─────────────────────────────────── */}
          <section className="docs-section" id="glossary">
            <h2>Glossary</h2>
            <dl className="glossary-grid">
              {[
                ['Ontology', 'A graph of typed nodes + edges representing one domain (functional, architecture, code, or design).'],
                ['Knowledge Graph (KG)', 'The combined Neo4j store of all four ontologies plus their citations.'],
                ['Functional Graph', 'Persona → Outcome → Scenario → Step → Action hierarchy. The root layer.'],
                ['Architecture Graph', '8-layer system blueprint (UX, Gateway, Services, Agents, Events, Data, Monitoring, Infra).'],
                ['Code Graph', 'File → Class → Function → Statement → Api hierarchy, generated by Tree-Sitter parsing.'],
                ['Design Graph', 'Atomic-design model (Atom → Molecule → Organism → Template → Page) + UserJourney → Flow.'],
                ['MCP', 'Model Context Protocol — open spec for LLM tool / resource servers.'],
                ['Citation', 'Pointer from any graph node back to a source artefact (document, Figma frame, Jira ticket, code file).'],
                ['Persona', 'A user role (human or system) at the top of the functional hierarchy.'],
                ['Outcome', 'A business goal a persona wants to achieve.'],
                ['Scenario', 'A concrete instance of an outcome (e.g. happy path vs. error case).'],
                ['Atomic Design', 'UI decomposition: Atoms (button) → Molecules (input group) → Organisms (form) → Templates → Pages.'],
                ['PKCE', 'Proof Key for Code Exchange — the OAuth flow variant used by Claude Code for the MCP login.'],
                ['.breeze.json', 'Per-workspace state file. Must contain projectUuid. Add to .gitignore.'],
                ['Skill', 'A SKILL.md file describing a reusable recipe — a sequence of tool calls. Surfaces as a /breeze:* slash command.'],
                ['Hook', 'A PreToolUse shell script that validates or blocks a tool call before it executes.'],
              ].map(([t, d]) => (
                <div key={t} className="glossary-item">
                  <dt>{t}</dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
          </section>

        </main>

        <DocsTOC headings={TOC} />
      </div>
      <Footer />
    </>
  )
}
