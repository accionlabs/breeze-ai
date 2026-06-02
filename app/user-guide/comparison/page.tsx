import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Breeze.AI vs other tools — Comparison' }

export default function Comparison() {
  return (
    <section className="docs-section">
      <h1>Comparison Study — Breeze.AI vs Other Tools</h1>

      <p>
        An honest positioning of Breeze.AI against the three tools most often raised in the same
        conversation: <b>Graphify</b> (open-source code knowledge graph), <b>Sourcegraph Cody</b>{' '}
        (enterprise code intelligence + AI assistant), and <b>Graphiti</b> (Zep&apos;s temporal
        knowledge graph for agent memory).
      </p>

      <p>
        All three of these overlap with Breeze in some dimension. None of them does the same thing.
        The goal of this page is to make the differences explicit, so a reader can decide whether
        Breeze, one of these, or a combination is the right fit.
      </p>

      <h2 id="landscape">1. The Landscape — One Sentence Each</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Tool</th>
              <th>What it is</th>
              <th>Primary user</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Breeze.AI</b></td>
              <td>
                An ontology-driven platform that links requirements, architecture, code, and design
                as a single Neo4j knowledge graph and drives code generation from it.
              </td>
              <td>PMs, architects, engineers — across the whole SDLC</td>
            </tr>
            <tr>
              <td><b>Graphify</b></td>
              <td>
                An open-source skill / CLI that turns any folder (code + docs + diagrams) into a
                queryable knowledge graph, served back to AI coding assistants.
              </td>
              <td>Individual developer using Claude Code / Cursor / etc.</td>
            </tr>
            <tr>
              <td><b>Sourcegraph Cody</b></td>
              <td>
                An enterprise code intelligence and AI coding assistant; multi-repo context
                retrieval up to 10 repos.
              </td>
              <td>Engineering org needing code search + AI in-IDE</td>
            </tr>
            <tr>
              <td><b>Graphiti</b> (Zep)</td>
              <td>
                A Python framework for <b>temporal</b> knowledge graphs — facts with validity
                windows, real-time incremental updates. Built for agent memory.
              </td>
              <td>Builders of AI agents that need long-term, evolving memory</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The collision point: all four touch &quot;knowledge graph&quot; + &quot;code / AI
        agents.&quot; But they answer different questions.
      </p>

      <h2 id="vs-graphify">2. Breeze.AI vs Graphify</h2>
      <p>
        <b>Closest comparison.</b> Both use <b>Tree-sitter + LLM enrichment</b> to build a code
        graph; both expose the result to an AI coding assistant.
      </p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Breeze.AI</th>
              <th>Graphify</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Code graph generation</b></td>
              <td>Tree-sitter across 10 languages (JS/TS, Python, Java, C#, Go, PHP, VB.NET, Apex, Perl)</td>
              <td>Tree-sitter across <b>20 languages</b> (incl. Rust, Swift, Kotlin, Scala, Lua, Zig, …)</td>
            </tr>
            <tr>
              <td><b>Multi-modal inputs</b></td>
              <td>Code + Figma + PDF requirement docs + images</td>
              <td>Code + SQL schemas + R / shell scripts + docs + papers + images + videos</td>
            </tr>
            <tr>
              <td><b>Goes beyond code</b></td>
              <td><b>Yes</b> — Functional / Architecture / Design graphs in addition to Code</td>
              <td><b>No</b> — code-and-attached-docs only</td>
            </tr>
            <tr>
              <td><b>Persistent storage</b></td>
              <td>Multi-tenant Neo4j cluster (server-side)</td>
              <td>Local files (<code>GRAPH_REPORT.md</code> + interactive <code>graph.html</code>)</td>
            </tr>
            <tr>
              <td><b>Architecture model</b></td>
              <td>Centralized: backend + N8N + MCP server + databases</td>
              <td>Local-first: runs as a skill in your IDE</td>
            </tr>
            <tr>
              <td><b>Privacy</b></td>
              <td>Code is uploaded to the Breeze backend (cluster-hosted)</td>
              <td><b>Never uploads raw source</b> — only semantic descriptions of docs/diagrams go to the LLM you configure</td>
            </tr>
            <tr>
              <td><b>Cost / licensing</b></td>
              <td>Hosted SaaS (<code>ai.accionbreeze.com</code>); enterprise pricing</td>
              <td>Open-source, free</td>
            </tr>
            <tr>
              <td><b>Audience</b></td>
              <td>Multi-user organisations — PMs, architects, engineers share one graph</td>
              <td>Solo developer / per-repo context window optimisation</td>
            </tr>
            <tr>
              <td><b>AI integration</b></td>
              <td>MCP server (Claude Code, Cursor, Cline, Windsurf) + WebUI + REST</td>
              <td>MCP-skill pattern for Claude Code, Cursor, Codex, Gemini CLI</td>
            </tr>
            <tr>
              <td><b>Headline pitch</b></td>
              <td><i>Requirements → architecture → code → design, end-to-end traceability</i></td>
              <td><i>Cut AI token usage by 70× on large codebases by giving the assistant a graph instead of raw files</i></td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <b>Where Breeze wins:</b> Functional / Architecture / Design layers that Graphify
        doesn&apos;t model; multi-user collaboration; requirement traceability (citations from a
        Jira ticket → a graph node → a code file).
      </p>
      <p>
        <b>Where Graphify wins:</b> Wider language coverage (20 vs 10); zero infrastructure to
        operate; full local-only privacy (raw source never leaves the machine); free.
      </p>
      <div className="doc-note">
        <b>Honest take:</b> A developer onboarding a brownfield repo <i>just to understand it</i> can
        absolutely get value from Graphify in an afternoon. Breeze starts paying off when you also
        care about <i>why</i> that code exists — the requirement, the design, the architectural slot
        it fills.
      </div>

      <h2 id="vs-cody">3. Breeze.AI vs Sourcegraph Cody</h2>
      <p>
        <b>Different category, partial overlap.</b> Cody is an enterprise{' '}
        <b>code-search + AI-coding</b> platform; Breeze is an <b>end-to-end SDLC ontology</b> that
        includes a code graph as one of four layers.
      </p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Breeze.AI</th>
              <th>Sourcegraph Cody</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Core artifact</b></td>
              <td>Knowledge graph (4 ontology layers)</td>
              <td>Code search index + AI chat</td>
            </tr>
            <tr>
              <td><b>Requirements / functional intent</b></td>
              <td>First-class — Persona → Outcome → Scenario → Step → Action</td>
              <td>Not modeled — Cody doesn&apos;t track requirements</td>
            </tr>
            <tr>
              <td><b>Architecture diagrams</b></td>
              <td>First-class — 8 fixed layers, impact analysis</td>
              <td>Not modeled</td>
            </tr>
            <tr>
              <td><b>Design system</b></td>
              <td>First-class — atomic-design graph, Figma deviation analysis</td>
              <td>Not modeled</td>
            </tr>
            <tr>
              <td><b>Code search</b></td>
              <td><code>Code_Graph_Search</code> (Neo4j-backed semantic search over parsed code)</td>
              <td><b>Strength</b> — best-in-class code search across millions of files</td>
            </tr>
            <tr>
              <td><b>Multi-repo context</b></td>
              <td>Yes — per project, every onboarded repo searchable together</td>
              <td>Yes — Cody Enterprise pulls from up to 10 repos simultaneously</td>
            </tr>
            <tr>
              <td><b>IDE coverage</b></td>
              <td>Claude Code (primary), Cursor / Cline / Windsurf via MCP</td>
              <td>VS Code, JetBrains, Visual Studio, web app</td>
            </tr>
            <tr>
              <td><b>AI mode</b></td>
              <td>Skill-driven: 18 <code>/breeze:*</code> slash commands with strict ontology rules</td>
              <td>Free-form chat: &quot;Cody, edit this file…&quot;</td>
            </tr>
            <tr>
              <td><b>Code generation</b></td>
              <td>Yes — <code>/breeze:generate-code</code> scaffolds from functional scenario</td>
              <td>Yes — Cody writes / fixes code inline</td>
            </tr>
            <tr>
              <td><b>Pricing</b></td>
              <td>Enterprise SaaS</td>
              <td>$0 free → $9/user (Pro) → $19+ /user (Enterprise)</td>
            </tr>
            <tr>
              <td><b>Compliance posture</b></td>
              <td>Keycloak / Entra ID SSO; audit log via backend writes</td>
              <td>SOC 2 / GDPR / CCPA, zero retention, SSO/SAML, BYOK</td>
            </tr>
            <tr>
              <td><b>Maturity / scale</b></td>
              <td>Newer, smaller customer base</td>
              <td>Established (Sourcegraph started in 2013) — runs at very large enterprise scale</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <b>Where Breeze wins:</b> Captures the <b>why</b> in addition to the <b>what</b>. Generates
        code from requirements, not from a chat instruction. Built for cross-role collaboration (PM
        + architect + engineer) sharing one source of truth.
      </p>
      <p>
        <b>Where Cody wins:</b> Production-hardened. Excellent at &quot;find every place this symbol
        is used across our 200 repos.&quot; Free tier for personal use. Stronger IDE-plugin
        ecosystem.
      </p>
      <div className="doc-note">
        <b>Honest take:</b> If your problem is &quot;we have a huge codebase and engineers can&apos;t
        navigate it,&quot; Cody is purpose-built for that and you should buy it. If your problem is
        &quot;we don&apos;t know if our code matches our requirements, and PMs / engineers /
        designers are working from different artefacts,&quot; Breeze is what&apos;s purpose-built for
        that. They can coexist.
      </div>

      <h2 id="vs-graphiti">4. Breeze.AI vs Graphiti</h2>
      <p>
        <b>Almost no overlap — different problem space.</b> Graphiti is built for{' '}
        <b>AI agent memory</b> (conversational continuity, evolving facts). Breeze is built for{' '}
        <b>SDLC traceability</b> (requirements → code).
      </p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Breeze.AI</th>
              <th>Graphiti</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Primary purpose</b></td>
              <td>Link requirements → architecture → code → design</td>
              <td>Give an AI agent durable, time-aware memory</td>
            </tr>
            <tr>
              <td><b>Graph shape</b></td>
              <td>Fixed ontologies (Persona/Outcome/Scenario/Step/Action; 8-layer architecture; Atomic design)</td>
              <td>Generic entity-relationship graph extracted from conversations + structured data</td>
            </tr>
            <tr>
              <td><b>Temporality</b></td>
              <td>Snapshot-of-now per project; no first-class time dimension on edges</td>
              <td><b>Strength</b> — every edge has a validity window; point-in-time queries are native</td>
            </tr>
            <tr>
              <td><b>Update model</b></td>
              <td>Re-run a generation skill against the source; full diff</td>
              <td><b>Real-time incremental</b> — facts arrive, are added/superseded immediately</td>
            </tr>
            <tr>
              <td><b>Storage</b></td>
              <td>Neo4j (one schema family)</td>
              <td>Neo4j (used as the backing store) + Zep-managed indices</td>
            </tr>
            <tr>
              <td><b>Inputs</b></td>
              <td>Code repos, requirement docs, Figma frames</td>
              <td>Chat messages, structured business records, API events</td>
            </tr>
            <tr>
              <td><b>AI integration</b></td>
              <td>MCP server for Claude Code et al.</td>
              <td>Python SDK for agent frameworks (LangChain, LangGraph, …)</td>
            </tr>
            <tr>
              <td><b>Benchmark posture</b></td>
              <td>Internal evaluations on ontology quality + spec generation</td>
              <td>DMR benchmark 94.8% (beats MemGPT 93.4%)</td>
            </tr>
            <tr>
              <td><b>Audience</b></td>
              <td>Engineering / product orgs delivering software</td>
              <td>Developers building chatbots / agents that need memory</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <b>Where Breeze wins:</b> Domain-specific schemas tuned to software delivery; the ontology
        rules (<code>functional-graph-rules.md</code>) enforce semantic quality that a generic graph
        wouldn&apos;t catch.
      </p>
      <p>
        <b>Where Graphiti wins:</b> Temporal modelling — Breeze can&apos;t tell you &quot;what did
        this scenario look like 3 months ago&quot;; Graphiti can. Real-time updates without
        re-running a pipeline. Better fit for any agent that&apos;s stateful across sessions.
      </p>
      <div className="doc-note">
        <b>Honest take:</b> These are complementary, not competitive. A team building an AI assistant{' '}
        <i>on top of</i> Breeze.AI could use Graphiti to give that assistant memory of past user
        interactions, while still relying on Breeze for the system-of-record graph.
      </div>

      <h2 id="feature-matrix">5. Feature Matrix at a Glance</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Capability</th>
              <th>Breeze.AI</th>
              <th>Graphify</th>
              <th>Sourcegraph Cody</th>
              <th>Graphiti</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Code knowledge graph</td>
              <td>✅</td>
              <td>✅</td>
              <td>partial (code search)</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Functional / requirements graph</td>
              <td>✅</td>
              <td>—</td>
              <td>—</td>
              <td>— (generic)</td>
            </tr>
            <tr>
              <td>Architecture graph (8 layers)</td>
              <td>✅</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Design system graph (atomic)</td>
              <td>✅</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Temporal facts with validity windows</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Tree-sitter parsing</td>
              <td>✅ (10 langs)</td>
              <td>✅ (20 langs)</td>
              <td>proprietary</td>
              <td>—</td>
            </tr>
            <tr>
              <td>LLM-enrichment of parsed code</td>
              <td>✅</td>
              <td>✅</td>
              <td>✅</td>
              <td>— (not its job)</td>
            </tr>
            <tr>
              <td>Code search across multiple repos</td>
              <td>✅</td>
              <td>local only</td>
              <td>✅ (enterprise: 10 repos)</td>
              <td>—</td>
            </tr>
            <tr>
              <td>In-IDE AI assistant</td>
              <td>✅ (MCP)</td>
              <td>✅ (MCP skill)</td>
              <td>✅ (own plugins)</td>
              <td>via Zep SDK</td>
            </tr>
            <tr>
              <td>Code generation from requirements</td>
              <td>✅</td>
              <td>—</td>
              <td>partial (chat-driven)</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Spec / FRD export from graph</td>
              <td>✅</td>
              <td>partial (GRAPH_REPORT.md)</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Figma / design ingestion</td>
              <td>✅</td>
              <td>partial (images)</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Jira / PR webhook integration</td>
              <td>✅</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Multi-tenant SaaS</td>
              <td>✅</td>
              <td>—</td>
              <td>✅</td>
              <td>✅ (Zep Cloud)</td>
            </tr>
            <tr>
              <td>Local-only / air-gapped option</td>
              <td>❌ today</td>
              <td>✅</td>
              <td>✅ (self-hosted Enterprise)</td>
              <td>✅ (self-host)</td>
            </tr>
            <tr>
              <td>Open source</td>
              <td>❌</td>
              <td>✅</td>
              <td>partial (CE)</td>
              <td>✅ (framework)</td>
            </tr>
            <tr>
              <td>Mature / production scale today</td>
              <td>growing</td>
              <td>new (2026)</td>
              <td>mature (since 2013)</td>
              <td>newer (2025)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="when-to-pick">6. When to Pick Which</h2>
      <p>
        <b>Pick Graphify if:</b> you&apos;re an individual developer who wants a free, local,
        privacy-preserving knowledge graph of a repo to feed your AI assistant. Setup time: minutes.
        No infrastructure required.
      </p>
      <p>
        <b>Pick Sourcegraph Cody if:</b> you have a large engineering org, the dominant pain is{' '}
        <i>code navigation and search</i> at scale, and you want a battle-tested AI coding assistant.
        Mature product, enterprise compliance posture.
      </p>
      <p>
        <b>Pick Graphiti if:</b> you&apos;re building an <b>agent</b> that needs to remember things
        across sessions and reason over evolving facts. Not a fit for SDLC documentation.
      </p>
      <p>
        <b>Pick Breeze.AI if:</b> you want the whole SDLC — <i>requirement → architecture → code →
        design</i> — represented as one connected graph, queryable by humans and AI alike, with
        first-class support for code generation <i>from</i> that graph. The differentiator is the{' '}
        <b>functional + architecture + design</b> layers and the traceability between them, not the
        code graph alone.
      </p>

      <h2 id="sources">7. Sources</h2>
      <ul>
        <li>
          Graphify —{' '}
          <a href="https://graphify.net/" target="_blank" rel="noreferrer">graphify.net</a>,{' '}
          <a href="https://github.com/safishamsi/graphify" target="_blank" rel="noreferrer">GitHub</a>{' '}
          <code>safishamsi/graphify</code>,{' '}
          <a href="https://betterstack.com/community/guides/ai/ai-development/graphify-codebase/" target="_blank" rel="noreferrer">Better Stack guide</a>
        </li>
        <li>
          Sourcegraph Cody —{' '}
          <a href="https://sourcegraph.com/docs/cody" target="_blank" rel="noreferrer">sourcegraph.com/docs/cody</a>,{' '}
          <a href="https://costbench.com/software/ai-coding-assistants/sourcegraph-cody/" target="_blank" rel="noreferrer">pricing 2026</a>
        </li>
        <li>
          Graphiti —{' '}
          <a href="https://github.com/getzep/graphiti" target="_blank" rel="noreferrer">getzep/graphiti on GitHub</a>,{' '}
          <a href="https://help.getzep.com/graphiti/getting-started/overview" target="_blank" rel="noreferrer">Zep documentation</a>,{' '}
          <a href="https://arxiv.org/abs/2501.13956" target="_blank" rel="noreferrer">Zep paper (arXiv 2501.13956)</a>,{' '}
          <a href="https://neo4j.com/blog/developer/graphiti-knowledge-graph-memory/" target="_blank" rel="noreferrer">Neo4j developer blog</a>
        </li>
        <li>Breeze.AI — this Confluence space (Platform Overview tree)</li>
      </ul>
    </section>
  )
}
