import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Building the graphs — Breeze.AI' }

export default function Cookbook() {
  return (
    <section className="docs-section">
      <h1>Building the Graphs — Cookbook</h1>

      <p>A practical, recipe-style guide for getting the four Breeze graphs (Code &middot; Functional &middot; Design &middot; Architecture) populated and kept in sync.</p>

      <p>Two interfaces are in play throughout:</p>
      <ul>
        <li><b>WebUI</b> — <code>https://ai.accionbreeze.com</code> — best for non-developers or one-off uploads.</li>
        <li><b>Claude Code + the</b> <code>breeze</code> plugin — best for developers working in their IDE; everything below assumes the plugin is installed (<code>/plugin install breeze</code>).</li>
      </ul>

      <div className="doc-note"><b>Note:</b> Always start with <code>/breeze:setup-project</code> once per workspace. It writes <code>.breeze.json</code> and links the workspace to a Breeze project UUID. Every other skill assumes it&apos;s been run.</div>

      <h2 id="code-graph">1. Code Graph</h2>
      <p>The code graph is the first graph to build for any <b>brownfield</b> project — every downstream skill (functional-from-ui / from-backend, design-from-ui, generate-code) reads from it.</p>
      <p>There are <b>two ways</b> to onboard a repo:</p>

      <h3 id="code-graph-webui">Path A — WebUI (no developer environment needed)</h3>
      <ol>
        <li>Open <code>https://ai.accionbreeze.com</code> and navigate to your project.</li>
        <li>Go to <b>Code Ontology</b> (<code>/code-ontology/:id</code>) → use the in-browser flow to point at a repo and generate the ndjson file.</li>
        <li>Upload the ndjson back into the project from the same screen.</li>
      </ol>
      <p>Use when: you don&apos;t have a local dev env, you&apos;re a PM / analyst, or the repo lives somewhere you can drop into the UI but not clone locally.</p>

      <h3 id="code-graph-claude">Path B — Claude Code (recommended for developers)</h3>
      <pre className="doc-pre">{`/breeze:setup-project                       # one-time per workspace
/breeze:onboard-repository <path-to-repo>   # parses + uploads`}</pre>
      <p>The <code>/breeze:onboard-repository</code> skill:</p>
      <ul>
        <li>Auto-detects <code>nvm</code> / <code>fnm</code> / <code>volta</code> and switches to <b>Node 22</b> inline (the parser only works on Node 22).</li>
        <li>Runs the Tree-Sitter parser across 10 languages.</li>
        <li>Streams the ndjson directly to the backend.</li>
        <li>Uses <code>--capture-statements</code> so downstream functional-from-backend has method bodies to read.</li>
      </ul>
      <p>Use when: you&apos;re a developer with the repo on your machine.</p>
      <div className="doc-note"><b>Output (either path):</b> <code>File → Class → Function → Statement → Api</code> nodes in Neo4j, searchable via <code>/breeze:search</code> or <code>Code_Graph_Search</code>.</div>

      <h2 id="functional-graph">2. Functional Graph</h2>
      <p><code>Persona → Outcome → Scenario → Step → Action</code>. The skills are deliberately conversational — they identify personas automatically and <b>ask for human-in-the-loop validation</b> at the critical decision points (persona naming, outcome grouping, scenario boundaries). Expect to confirm or rename a handful of things during a run.</p>
      <p>The path depends on <b>whether code already exists</b>.</p>

      <h3 id="functional-brownfield">Brownfield — code exists, derive intent from it</h3>
      <p>Go <b>repo by repo</b>. Frontend and backend are run separately because they produce different persona families.</p>
      <pre className="doc-pre">{`# Frontend repo → User-persona scenarios (humans interacting with UI)
/breeze:generate-functional-from-ui <fe-repo-path>

# Backend repo → System-persona scenarios (REST routes, Kafka consumers, cron, webhooks)
/breeze:generate-functional-from-backend <be-repo-path>`}</pre>
      <p>Run on each repo in your stack. For a typical SaaS that&apos;s one frontend + one or two backends; for a microservice estate it might be a dozen.</p>
      <p>Both skills query the code graph for the repo (so onboard the code first), infer scenarios from routes / components / consumers, and walk you through validation.</p>

      <h3 id="functional-greenfield">Greenfield — no code yet, derive intent from documents</h3>
      <p>Two ways:</p>

      <h4 id="functional-greenfield-a">Greenfield (a) — Claude Code indexes documents from disk</h4>
      <p>Point Claude Code at whatever requirement documents you have — PDFs, markdown, Figma exports, design briefs — and ask it to populate the functional graph. The relevant skills:</p>
      <pre className="doc-pre">{`/breeze:visual-to-text <figma-url-or-pdf>    # designs / mockups → user stories
/breeze:analyze-functional <requirement>     # requirement doc → coverage analysis
/breeze:update-functional-graph              # write the resulting nodes`}</pre>
      <p>For a free-form requirement doc, the most natural prompt is just <i>&quot;index this document into the functional graph&quot;</i> pointing at the file — Claude will pick the right skill.</p>

      <h4 id="functional-greenfield-b">Greenfield (b) — WebUI document upload</h4>
      <ol>
        <li>Open the project → <b>Knowledge Management</b> (<code>/knowledge/:id</code>).</li>
        <li>Upload your PDFs / docs.</li>
        <li>Open the <b>Functional Agent</b> chat (<code>/chat/functional/:id</code>) and ask it to generate the graph from the uploaded documents.</li>
      </ol>
      <p>Use when: you&apos;d rather drive the flow from the UI, or the documents live in a place easier to upload than to point Claude at.</p>
      <div className="doc-note"><b>Output (any path):</b> <code>Persona → Outcome → Scenario → Step → Action</code>. Always validate with <code>/breeze:validate-functional-graph</code> after a generation pass — it catches duplicates, persona-naming violations, and missing citations.</div>

      <h2 id="design-graph">3. Design Graph</h2>
      <p><code>UserJourney → Flow → Page</code> plus the atomic system <code>Atom → Molecule → Organism → Template</code>. The skills here are well-documented — read the <code>SKILL.md</code> in each one for the full contract — but the recipes are:</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>You have...</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td>A populated functional graph</td><td><code>/breeze:generate-design</code> — maps Scenario → UserJourney, Step → Flow/Page, Action → Component</td></tr>
            <tr><td>The actual frontend repo</td><td><code>/breeze:generate-design-from-ui</code> — same as above but enriched with real UI structure (recommended over <code>generate-design</code> if you have the repo)</td></tr>
            <tr><td>A Figma URL / Jira ticket / sketch</td><td><code>/breeze:analyze-design</code> — generates design nodes from a visual or description</td></tr>
            <tr><td>A Figma file you want to audit</td><td><code>/breeze:analyze-design-deviations</code> — diffs Figma components against the design-graph registry</td></tr>
          </tbody>
        </table>
      </div>
      <p>For the WebUI alternative, the <b>Design Agent</b> chat (<code>/chat/design/:id</code>) drives the same workflows interactively.</p>

      <h2 id="architecture-graph">4. Architecture Graph</h2>
      <p>The 8-layer blueprint: <b>UX &middot; API Gateway &middot; Services &middot; Agents &middot; Event Queue &middot; Data Lake &middot; Observability/Monitoring &middot; Infrastructure</b>.</p>
      <p>There are <b>two ways</b>:</p>

      <h3 id="architecture-docs">Path A — Point Claude at source documents</h3>
      <p>Ask Claude Code to read whatever architecture material exists — architecture docs, deployment guides, README files, infra repos, even the running source repos — and create the architecture ontology directly. There&apos;s no dedicated &quot;ingest doc into architecture&quot; skill; just point Claude at the target and instruct it to populate the 8 layers via the <code>Create_Architecture_Node</code> MCP tool.</p>
      <p>Typical prompt:</p>
      <div className="doc-note">Read <code>./docs/architecture.md</code> and create the architecture graph (8 layers) for this project.</div>

      <h3 id="architecture-analysis">Path B — Requirement-driven analysis</h3>
      <pre className="doc-pre">{`/breeze:analyze-architecture <jira-url-or-requirement>`}</pre>
      <p>Maps an incoming requirement to the 8-layer model, runs impact analysis via the code graph, anchors user-facing components to functional scenarios, and writes the analysis back (e.g. as a Jira comment). Use this for change-impact, not first-pass population.</p>
      <div className="doc-note"><b>Output:</b> the 8 fixed layer nodes + per-project component nodes under each.</div>

      <h2 id="keeping-in-sync">Keeping the Graphs in Sync</h2>
      <p>Code moves forward; the graph drifts. <b>There is no dedicated resync skill today</b> — but the existing generation skills work for updates if you give them the right pointer.</p>

      <h3 id="sync-point-and-ask">Functional / Design / Architecture — point and ask</h3>
      <p>For all three, the recipe is the same: point Claude Code at the source (a repo path, a document, a Jira ID) and ask for an update.</p>
      <pre className="doc-pre">{`# Examples
"Update the functional graph against the current state of ./apps/checkout"
"Re-run /breeze:generate-design-from-ui against ./apps/web — the routes changed"
"Re-run architecture analysis for JIRA-1234 — the design has been revised"`}</pre>
      <p>The skills diff against existing nodes; you confirm adds / changes / deletes during the run. The human-in-the-loop validation works the same way as first-time generation.</p>

      <h3 id="sync-code-graph">Code Graph — needs a commit ID</h3>
      <p>The code graph is trickier because it&apos;s a snapshot of a Tree-Sitter parse.</p>
      <ol>
        <li><b>Find the commit ID</b> the existing code graph was generated from. It&apos;s stored in the project metadata on the backend (visible in the WebUI&apos;s code-ontology view).</li>
        <li>
          Re-run onboarding from the <b>current HEAD</b>:
          <pre className="doc-pre">{`/breeze:onboard-repository <repo-path>`}</pre>
        </li>
        <li>The platform replaces the existing code graph for that repo with the new parse. The diff between the old commit and current HEAD is what changed.</li>
      </ol>
      <p>If you can&apos;t find the original commit ID, treat the resync as a clean re-onboarding — the result is the same, you just lose the &quot;what changed since last time&quot; view.</p>
      <div className="doc-note"><b>Note:</b> A dedicated incremental-sync skill is on the roadmap. Until then, the manual &quot;point and re-run&quot; flow is the supported path.</div>

      <h2 id="recommended-order">Recommended Order (Brownfield)</h2>
      <pre className="doc-pre">{`Code Graph   →   Functional Graph   →   Design Graph   →   Architecture Graph
(facts)          (intent)                (UI)               (system blueprint)`}</pre>
      <p>Each subsequent graph benefits from the one before:</p>
      <ul>
        <li><b>Functional-from-ui / from-backend</b> queries the code graph for routes, components, consumers — so onboard code first.</li>
        <li><b>Generate-design / generate-design-from-ui</b> traverses functional scenarios — so functional must exist.</li>
        <li><b>Analyze-architecture</b> uses both functional and code for impact analysis.</li>
      </ul>

      <h3 id="recommended-order-greenfield">Recommended Order (Greenfield)</h3>
      <pre className="doc-pre">{`Documents   →   Functional Graph   →   Design Graph   →   (later) Code Graph`}</pre>
      <p>Capture intent first; code follows the spec. Re-run earlier steps once you have running code (this becomes a brownfield resync — see above).</p>

      <h2 id="quick-reference">Quick Reference</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>I want to...</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td>First time setup</td><td><code>/breeze:setup-project</code></td></tr>
            <tr><td>Onboard a repo into the code graph</td><td><code>/breeze:onboard-repository &lt;path&gt;</code> <i>or</i> WebUI ndjson upload</td></tr>
            <tr><td>Functional from a frontend repo</td><td><code>/breeze:generate-functional-from-ui &lt;path&gt;</code></td></tr>
            <tr><td>Functional from a backend repo</td><td><code>/breeze:generate-functional-from-backend &lt;path&gt;</code></td></tr>
            <tr><td>Functional from a Figma / PDF / image</td><td><code>/breeze:visual-to-text &lt;url-or-path&gt;</code></td></tr>
            <tr><td>Functional from a requirement doc (Claude)</td><td><i>&quot;Index this document into the functional graph&quot;</i> pointing at the file</td></tr>
            <tr><td>Functional from a requirement doc (UI)</td><td>WebUI → Knowledge Management → upload → Functional Agent chat</td></tr>
            <tr><td>Validate functional quality</td><td><code>/breeze:validate-functional-graph</code></td></tr>
            <tr><td>Design from functional</td><td><code>/breeze:generate-design</code></td></tr>
            <tr><td>Design from the actual UI</td><td><code>/breeze:generate-design-from-ui</code> (preferred when repo is available)</td></tr>
            <tr><td>Design from a Figma URL or ticket</td><td><code>/breeze:analyze-design &lt;url&gt;</code></td></tr>
            <tr><td>Figma vs design-graph drift</td><td><code>/breeze:analyze-design-deviations</code></td></tr>
            <tr><td>Architecture from docs (Claude)</td><td><i>&quot;Read &lt;doc&gt; and create the architecture graph&quot;</i></td></tr>
            <tr><td>Architecture impact for a ticket</td><td><code>/breeze:analyze-architecture &lt;jira-url&gt;</code></td></tr>
            <tr><td>Generate code &amp; tests from graphs</td><td><code>/breeze:generate-code</code></td></tr>
            <tr><td>Export an FRD</td><td><code>/breeze:generate-spec</code></td></tr>
            <tr><td>Search anything</td><td><code>/breeze:search</code></td></tr>
            <tr><td>Resync (functional/design/arch)</td><td>Re-run the same generation skill against the target</td></tr>
            <tr><td>Resync (code)</td><td>Re-run <code>/breeze:onboard-repository</code> — note the previous commit ID first</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="related-pages">Related Pages</h2>
      <ul>
        <li><Link href="/user-guide/"><b>Introduction</b></Link> — what Breeze.AI is and who uses it</li>
        <li><Link href="/user-guide/mcp/"><b>MCP Integration</b></Link> — how Claude Code talks to the backend</li>
        <li><Link href="/user-guide/skills/"><b>Skills Reference</b></Link> — every <code>/breeze:*</code> command in detail</li>
      </ul>
    </section>
  )
}
