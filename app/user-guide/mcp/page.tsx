import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'MCP integration: Breeze.AI' }

export default function Mcp() {
  return (
    <section className="docs-section">
      <h1>MCP integration</h1>

      <h2 id="what-youre-installing">What you&apos;re installing</h2>
      <p>When you &quot;add Breeze to your IDE,&quot; you&apos;re installing <strong>one Claude Code plugin</strong> called <code>breeze</code>, distributed through a <strong>marketplace</strong> called <code>breezeai-plugins</code>. That single plugin gives you three things at once:</p>
      <ol>
        <li><strong>An MCP server</strong> (<code>breeze-mcp</code>): registered automatically, gives Claude ~43 typed tools to read and write your Breeze project.</li>
        <li><strong>18 skills</strong>: <code>/breeze:*</code> slash-commands that orchestrate those tools to do real work (onboard a repo, generate a functional graph, validate it, generate code, etc.).</li>
        <li><strong>Two pre-tool-use hooks</strong>: guardrails that block bad tool calls before they leave your machine.</li>
      </ol>
      <p>You don&apos;t pick and choose; they ship as a bundle and the marketplace install puts them all in place.</p>
      <p>This page is the <strong>conceptual + setup guide</strong> for the bundle. For the in-depth references:</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>You want…</th><th>Go to</th></tr></thead>
          <tbody>
            <tr><td>Full schema for every MCP tool (parameters, types, defaults)</td><td><Link href="/user-guide/mcp-tools/">MCP Tool Reference</Link></td></tr>
            <tr><td>Per-skill detail (trigger phrases, procedure, MCP tools used)</td><td><Link href="/user-guide/skills/">Skills Reference</Link></td></tr>
            <tr><td>Copy-paste recipes for real tasks</td><td><Link href="/user-guide/cookbook/">Cookbook → Building the Graphs</Link></td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="core-concept">Core concept: marketplace, MCP server, and skills</h2>
      <p>Three Claude Code concepts stack to deliver Breeze:</p>

      <h3 id="mcp-servers">MCP servers</h3>
      <p>The <strong>Model Context Protocol (MCP)</strong> is an open spec for connecting LLM clients (Claude Code, Cursor, Cline, Windsurf, …) to data sources and tools. An MCP server publishes typed <strong>tools</strong> (functions the LLM can call) and optional <strong>resources</strong> (read-only data). Authentication and orchestration happen on the client; business logic lives on the server.</p>
      <p>The Breeze MCP server (<code>breeze-mcp</code>) publishes ~43 tools that wrap the Breeze backend&apos;s REST API, organized by graph:</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Group</th><th>Coverage</th></tr></thead>
          <tbody>
            <tr><td><strong>Project management</strong></td><td>List / create / get / update projects (4 tools)</td></tr>
            <tr><td><strong>Functional graph</strong></td><td>Hierarchy reads (Persona → Outcome → Scenario → Step → Action), semantic search, create/update/bulk-upsert/delete, citations (13 tools)</td></tr>
            <tr><td><strong>Architecture graph</strong></td><td>Read / search / create / update / delete across the 8 layers + DDL search (6 tools)</td></tr>
            <tr><td><strong>Design graph</strong></td><td>Read / search / update / bulk-upsert / delete on the atomic-design model (6 tools)</td></tr>
            <tr><td><strong>Code graph</strong></td><td>Repo list, semantic search, file detail (3 tools)</td></tr>
            <tr><td><strong>DB schema graph</strong></td><td>Table / column / constraint / index / view / sequence / procedure CRUD (10 tools)</td></tr>
            <tr><td><strong>Documents &amp; Health</strong></td><td>Source-doc semantic search, server metrics (2 tools)</td></tr>
          </tbody>
        </table>
      </div>
      <div className="doc-note"><b>Note:</b> Full per-tool schemas (parameters, types, required flags, defaults, return shape) live on the dedicated page: <Link href="/user-guide/mcp-tools/">MCP Tool Reference</Link>.</div>

      <h3 id="skills-why-they-exist">Skills: why they exist</h3>
      <p>Raw MCP tools work, but they have a real usability problem: <strong>a user staring at 43 tool names usually doesn&apos;t know which ones to call, in what order, or with what arguments to accomplish a real task.</strong> &quot;Generate a functional graph from a backend repo&quot; is not a single tool call; it&apos;s a sequence of discovery, validation prompts, multiple <code>Call_Create_Functional_Node_</code> invocations, citation linking, and so on.</p>
      <p><strong>Skills are reusable recipes that solve this.</strong> Each skill is a single Markdown file (<code>SKILL.md</code>) that names the task (<code>generate-functional-from-backend</code>, <code>analyze-functional</code>, …), describes when to use it so Claude can auto-route natural-language requests, and lays out the step-by-step procedure, including the <strong>exact sequence of MCP tool calls</strong>, decision logic, validation gates, user-confirmation points, and failure modes.</p>
      <p>So a skill is two things at once: it&apos;s <strong>a curated workflow</strong> (the &quot;right way&quot; to compose tools for a task) and it&apos;s <strong>a discoverable command</strong> (a <code>/breeze:*</code> slash that the user can type). The plugin ships 18 of them, grouped roughly as:</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Group</th><th>Skills</th></tr></thead>
          <tbody>
            <tr><td><strong>Setup</strong></td><td><code>/breeze:setup-project</code>, <code>/breeze:onboard-repository</code></td></tr>
            <tr><td><strong>Search &amp; analysis</strong></td><td><code>/breeze:search</code>, <code>/breeze:analyze-functional</code>, <code>/breeze:analyze-architecture</code>, <code>/breeze:analyze-design</code>, <code>/breeze:analyze-design-deviations</code>, <code>/breeze:detect-personas</code></td></tr>
            <tr><td><strong>Generate from documents/designs</strong></td><td><code>/breeze:visual-to-text</code>, <code>/breeze:generate-functional-from-ui</code>, <code>/breeze:generate-functional-from-backend</code></td></tr>
            <tr><td><strong>Generate downstream artifacts</strong></td><td><code>/breeze:generate-design</code>, <code>/breeze:generate-design-from-ui</code>, <code>/breeze:generate-code</code>, <code>/breeze:generate-spec</code></td></tr>
            <tr><td><strong>Update &amp; validate</strong></td><td><code>/breeze:update-functional-graph</code>, <code>/breeze:validate-functional-graph</code></td></tr>
            <tr><td><strong>Retired</strong></td><td><code>/breeze:deprecated-cluster-pipeline</code> <em>(do not use)</em></td></tr>
          </tbody>
        </table>
      </div>
      <div className="doc-note"><b>Note:</b> Full per-skill detail (trigger phrases, inputs, procedure, MCP tools used, outputs) lives on the dedicated page: <Link href="/user-guide/skills/">Skills Reference</Link>.</div>
      <p>You can think of the relationship like this:</p>
      <pre className="doc-pre">{`MCP tools         = the verbs Claude can speak
Skills            = sentences in those verbs that get a real task done
The plugin        = a curated phrasebook of those sentences, plus the MCP wiring
The marketplace   = how the phrasebook gets delivered to your IDE`}</pre>

      <h3 id="breezeai-plugins-marketplace">The breezeai-plugins marketplace</h3>
      <p>A <strong>marketplace</strong> in Claude Code is a catalog of plugins. You point Claude at the marketplace once, then you can install any plugin from it. The Breeze marketplace is published at:</p>
      <pre className="doc-pre">{`accionlabs/breezeai-claude-plugin`}</pre>
      <p>It contains exactly one plugin today: <code>breeze</code> v3.1.0 (the bundle of MCP server + skills + hooks). The marketplace name is <code>breezeai-plugins</code> (set in <code>.claude-plugin/marketplace.json</code>); the plugin name is <code>breeze</code> (set in <code>.claude-plugin/plugin.json</code>). You&apos;ll see both names in the install flow.</p>
      <p><strong>Why a marketplace at all?</strong> It decouples <em>distribution</em> from the IDE. The plugin lives in a single GitHub repo, but every developer&apos;s Claude Code installation can subscribe, install, and update independently (no IDE config sprawl, no per-developer setup script, no hidden coupling to where the code lives on disk). New skills, new MCP tools, and new hooks ship as one versioned bundle (<code>v3.1.0</code> today). A <code>/plugin update breeze</code> pulls the latest from the marketplace and restarts cleanly. Teams that fork get their own marketplace; downstream MCP changes are additive and don&apos;t break older skill recipes. In short: it&apos;s the same pattern as <code>npm</code>, <code>pip</code>, or <code>cargo</code>: just scoped to the Claude Code surface (skills + hooks + MCP wiring).</p>

      <h2 id="setup">Setup: adding the marketplace and installing the plugin</h2>
      <p>Five commands in Claude Code. Each step does exactly one thing:</p>
      <pre className="doc-pre">{`# 1. Register the marketplace (does NOT install anything yet)
/plugin marketplace add accionlabs/breezeai-claude-plugin

# 2. Install the breeze plugin from that marketplace
#    (when prompted, pick "breeze")
/plugin install breeze

# 3. Enable the plugin (often auto-enabled by step 2)
/plugin enable breeze

# 4. Restart Claude Code
#    — plugin skills, hooks, and MCP servers are loaded at startup,
#      so quit the app and start it again.

# 5. Verify (you should see breeze listed, installed + enabled)
/plugin list

# 6. Initialize your workspace
/breeze:setup-project`}</pre>
      <p><strong>What each step actually does:</strong></p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Step</th><th>What changes on your machine</th></tr></thead>
          <tbody>
            <tr><td><code>marketplace add</code></td><td>Adds an entry pointing at the GitHub repo. Local plugin index now knows the catalog exists. No code downloaded yet.</td></tr>
            <tr><td><code>install breeze</code></td><td>Downloads the plugin into your local Claude Code plugin directory. Reads <code>plugin.json</code> and <code>.mcp.json</code>. Registers <code>breeze-mcp</code> as a known MCP server.</td></tr>
            <tr><td><code>enable breeze</code></td><td>Marks the plugin active. Most installs auto-enable, so this is often a no-op.</td></tr>
            <tr><td><strong>Restart</strong></td><td>Required. The hooks (<code>pre-init-check.sh</code>, <code>validate-functional-node.sh</code>) and MCP server registration are only applied at startup. The <code>/breeze:*</code> commands won&apos;t appear until you restart.</td></tr>
            <tr><td><code>/plugin list</code></td><td>Sanity check: confirms <code>breeze</code> is installed + enabled.</td></tr>
            <tr><td><code>/breeze:setup-project</code></td><td>First real command: writes <code>.breeze.json</code>, links you to a Breeze project, and triggers the <strong>first</strong> MCP tool call. That first call kicks off the browser-based Keycloak OAuth login (PKCE), so make sure you have a browser handy.</td></tr>
          </tbody>
        </table>
      </div>

      <h3 id="updating-the-plugin">Updating the plugin</h3>
      <p>When a new version drops:</p>
      <pre className="doc-pre">{`/plugin marketplace update accionlabs/breezeai-claude-plugin
/plugin update breeze
# then restart Claude Code`}</pre>
      <p>The marketplace <code>update</code> re-fetches the catalog. The plugin <code>update</code> upgrades the local install. Restart for hooks and MCP changes to apply.</p>

      <h3 id="different-mcp-client">If you use a different MCP client</h3>
      <p>The Breeze MCP server is plain streamable HTTP. Any MCP-aware client (Cursor, Cline, Windsurf, …) can connect by registering:</p>
      <pre className="doc-pre">{`{
  "mcpServers": {
    "breeze-mcp": {
      "type": "http",
      "url": "https://breezeai-mcp-python.accionbreeze.com/mcp"
    }
  }
}`}</pre>
      <p>You&apos;ll get the ~43 tools, but <strong>not the</strong> <code>/breeze:*</code> skills; those are a Claude-Code-specific plugin format. In other clients you&apos;ll need to compose the tools yourself, or wait for that client to support the <code>SKILL.md</code> pattern.</p>

      <h2 id="after-setup">What to do after setup: use the Cookbook</h2>
      <p>Once <code>/breeze:setup-project</code> reports a linked project, you&apos;re in. The full recipe collection is on a dedicated page:</p>
      <div className="doc-note"><b>Note:</b> → <Link href="/user-guide/cookbook/">Building the Graphs: Cookbook</Link></div>
      <p>That page covers, recipe-by-recipe:</p>
      <ul>
        <li><strong>Code graph</strong>: onboarding a repo (Claude Code path vs WebUI path)</li>
        <li><strong>Functional graph</strong>: brownfield (<code>/breeze:generate-functional-from-ui</code> + <code>…-from-backend</code>) and greenfield (from docs / Figma)</li>
        <li><strong>Design graph</strong>: from functional, from real UI, from Figma, drift detection</li>
        <li><strong>Architecture graph</strong>: point Claude at docs, or use <code>/breeze:analyze-architecture</code></li>
        <li><strong>Keeping graphs in sync</strong>: the manual resync pattern (no dedicated skill today)</li>
        <li><strong>Recommended order</strong>: brownfield vs greenfield</li>
        <li><strong>Quick reference</strong>: &quot;I want to… → use…&quot; table</li>
      </ul>
      <p>A condensed shortcut for the impatient:</p>
      <pre className="doc-pre">{`# Brownfield (existing product)
/breeze:setup-project
/breeze:onboard-repository <fe-repo>
/breeze:onboard-repository <be-repo>
/breeze:generate-functional-from-ui      <fe-repo>
/breeze:generate-functional-from-backend <be-repo>
/breeze:validate-functional-graph
/breeze:generate-spec

# Greenfield (no code yet)
/breeze:setup-project
/breeze:visual-to-text <figma-url>           # designs → user stories
/breeze:analyze-functional <jira-or-doc>     # requirement → analysis → graph

# Day-to-day feature work
/breeze:search "<what does X do>"
/breeze:analyze-architecture <jira-url>
/breeze:generate-code <scenario-id>`}</pre>
      <p>Each line above is documented in detail in the cookbook.</p>

      <h2 id="mcp-tool-surface">MCP tool surface (summary)</h2>
      <p>The Breeze MCP server publishes ~43 tools grouped by graph. The summary table below shows the groupings; <strong>for the full schema of each tool (parameters, types, required flags, defaults, return shape) see</strong> <Link href="/user-guide/mcp-tools/">MCP Tool Reference</Link>.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Group</th><th>Tools</th><th>What it does</th></tr></thead>
          <tbody>
            <tr><td><strong>Project management</strong></td><td><code>4</code></td><td>List / create / get / update projects</td></tr>
            <tr><td><strong>Functional graph: hierarchy reads</strong></td><td><code>6</code></td><td>Persona → Outcome → Scenario → Step → Action drill-down + full-graph export</td></tr>
            <tr><td><strong>Functional graph: search &amp; mutation</strong></td><td><code>7</code></td><td>Semantic search; create / update / bulk-upsert / delete nodes; attach citations</td></tr>
            <tr><td><strong>Architecture graph</strong></td><td><code>6</code></td><td>Read / search / create / update / delete across the 8 layers (UserExperience, ApiGateway, ObservabilityMonitoring, Agents, Services, EventQueue, DataLake, Infrastructure); DDL search</td></tr>
            <tr><td><strong>Design graph</strong></td><td><code>6</code></td><td>Atomic-design CRUD: UserJourney → Flow → Page → Component (ATOM / MOLECULE / ORGANISM / TEMPLATE)</td></tr>
            <tr><td><strong>Code graph</strong></td><td><code>3</code></td><td>List repos in the code ontology; semantic search across File / Function / Class; per-file structural drill-down</td></tr>
            <tr><td><strong>DB schema graph</strong></td><td><code>10</code></td><td>Table / column / constraint / index / view / sequence / procedure CRUD under a DataLake</td></tr>
            <tr><td><strong>Documents &amp; Health</strong></td><td><code>2</code></td><td>Semantic search across source documents; server metrics</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="skill-catalog">Skill catalog (summary)</h2>
      <p>The 18 <code>/breeze:*</code> slash commands, grouped by intent. <strong>For each skill&apos;s trigger phrases, inputs, full procedure, MCP tools it uses, and outputs, see</strong> <Link href="/user-guide/skills/">Skills Reference</Link>.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Group</th><th>Commands</th></tr></thead>
          <tbody>
            <tr><td><strong>Setup</strong></td><td><code>/breeze:setup-project</code> · <code>/breeze:onboard-repository</code></td></tr>
            <tr><td><strong>Search &amp; analysis</strong></td><td><code>/breeze:search</code> · <code>/breeze:analyze-functional</code> · <code>/breeze:analyze-architecture</code> · <code>/breeze:analyze-design</code> · <code>/breeze:analyze-design-deviations</code> · <code>/breeze:detect-personas</code></td></tr>
            <tr><td><strong>Generate from documents &amp; designs</strong></td><td><code>/breeze:visual-to-text</code> · <code>/breeze:generate-functional-from-ui</code> · <code>/breeze:generate-functional-from-backend</code></td></tr>
            <tr><td><strong>Generate downstream artifacts</strong></td><td><code>/breeze:generate-design</code> · <code>/breeze:generate-design-from-ui</code> · <code>/breeze:generate-code</code> · <code>/breeze:generate-spec</code></td></tr>
            <tr><td><strong>Update &amp; validate</strong></td><td><code>/breeze:update-functional-graph</code> · <code>/breeze:validate-functional-graph</code></td></tr>
            <tr><td><strong>Retired</strong></td><td><code>/breeze:deprecated-cluster-pipeline</code> <em>(do not use; use the</em> <code>from-ui</code> / <code>from-backend</code> <em>skills instead)</em></td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="how-the-plugin-hangs-together">How the plugin hangs together</h2>

      <h3 id="plugin-layout">Plugin layout</h3>
      <pre className="doc-pre">{`breezeai-claude-plugin/
├── .claude-plugin/
│   ├── marketplace.json          # marketplace name: breezeai-plugins
│   └── plugin.json               # plugin name: breeze, v3.1.0
├── .mcp.json                     # → registers breeze-mcp server (HTTP + OAuth)
├── breeze.config.json            # default uiBaseUrl + apiBase
├── hooks/
│   └── hooks.json                # PreToolUse hook bindings
├── scripts/
│   ├── pre-init-check.sh         # validates .breeze.json before any /breeze:*
│   └── validate-functional-node.sh   # blocks malformed Persona/Outcome/Scenario writes
└── skills/
    ├── shared/
    │   └── functional-graph-rules.md      # the ontology rules every skill follows
    ├── setup-project/SKILL.md
    ├── onboard-repository/SKILL.md
    └── (… 16 more skill folders …)`}</pre>

      <h3 id="workspace-file">The workspace file (.breeze.json)</h3>
      <p>Per-project state lives in <code>.breeze.json</code> at the workspace root (gitignored):</p>
      <pre className="doc-pre">{`{
  "projectUuid": "<linked via /breeze:setup-project>",
  "apiKey": "<from /mcp/generate/key — only used by the Code Ontology CLI>",
  "uiBaseUrl": "https://ai.accionbreeze.com",
  "apiBase":   "https://isometric-backend.accionbreeze.com",
  "targetRepos": {
    "frontend": "/abs/path/to/fe",
    "backend":  { "orders-api": "/abs/path/to/orders" }
  }
}`}</pre>
      <ul>
        <li><code>projectUuid</code> is the only mandatory field.</li>
        <li><code>apiKey</code> is <strong>not</strong> required by the MCP server (which uses Keycloak OAuth). It is only collected on-demand by <code>/breeze:onboard-repository</code> if you pick its automatic-upload mode.</li>
        <li><code>uiBaseUrl</code> / <code>apiBase</code> override the defaults in <code>breeze.config.json</code> per-project.</li>
        <li>Add <code>.breeze.json</code> to <code>.gitignore</code>.</li>
      </ul>

      <h3 id="mcp-server-endpoint">The MCP server endpoint</h3>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Field</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>Endpoint</td><td><code>https://breezeai-mcp-python.accionbreeze.com/mcp</code></td></tr>
            <tr><td>Transport</td><td>Streamable HTTP</td></tr>
            <tr><td>Auth</td><td>Keycloak OAuth2 (PKCE flow): same realm as the WebUI</td></tr>
            <tr><td>Implementation</td><td>Python (FastMCP)</td></tr>
            <tr><td>Registered in</td><td><code>breezeai-claude-plugin/.mcp.json</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>First tool call from a fresh session triggers a browser-based Keycloak sign-in (PKCE). The token is cached locally by Claude Code; subsequent sessions don&apos;t re-authenticate until the refresh token expires.</p>

      <h3 id="hooks">Hooks: server-side guardrails at the client</h3>
      <p>Two <code>PreToolUse</code> hooks run in Claude Code <strong>before any tool call</strong>:</p>
      <ul>
        <li><code>pre-init-check.sh</code>: runs before every <code>/breeze:*</code> skill. Verifies <code>.breeze.json</code> exists and has <code>projectUuid</code>. Stops with <code>BLOCKED: .breeze.json not found…</code> otherwise.</li>
        <li>
          <code>validate-functional-node.sh</code>: runs before <code>Call_Create_Functional_Node_</code> / <code>Call_Update_Functional_Node_</code>. Enforces:
          <ul>
            <li><strong>Label</strong> must be <code>Persona | Outcome | Scenario | Step | Action</code></li>
            <li><strong>Persona names</strong>: forbids <code>Developer / Engineer / API / Service / Controller / Backend / Frontend / …</code></li>
            <li><strong>Outcome names</strong>: flags technical names like <code>Handle API Request</code> / <code>Process Database Queries</code></li>
            <li><strong>Required parents</strong>: Outcome needs <code>personaId</code>, Scenario needs <code>outcomeId</code>, Step needs <code>scenarioId</code>, Action needs <code>stepId</code></li>
            <li><strong>Descriptions</strong>: required for Scenario / Step / Action</li>
          </ul>
        </li>
      </ul>
      <p>Hook source: <code>breezeai-claude-plugin/scripts/</code>. Full ontology rules: <code>breezeai-claude-plugin/skills/shared/functional-graph-rules.md</code>.</p>

      <h2 id="when-to-use-what">When to use what: three interfaces</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>You are…</th><th>Use</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>A developer with the repo on your machine</td><td><strong>Claude Code + the breeze plugin</strong></td><td>OAuth (no key paste), full skill library, hooks enforce ontology rules client-side</td></tr>
            <tr><td>A Product Owner / analyst doing exploration</td><td><strong>WebUI</strong> (<code>ai.accionbreeze.com</code>)</td><td>Visual graph editor; no IDE / CLI setup needed</td></tr>
            <tr><td>A CI job, batch indexer, or other headless context</td><td><strong>Code Ontology CLI</strong> with an <code>apiKey</code></td><td>No browser available for OAuth</td></tr>
            <tr><td>Using Cursor / Cline / Windsurf</td><td>Register the <strong>MCP server only</strong> (no skills)</td><td>The skill format is Claude Code-specific today</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="other-mcp-servers">Other MCP servers in the workflow</h2>
      <p>The Breeze plugin gives you <code>breeze-mcp</code> only. For complementary capability, install other plugins separately:</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Server</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><strong>Atlassian</strong> plugin</td><td>Confluence + Jira CRUD: page creation, ticket triage, spec-to-backlog</td></tr>
            <tr><td><strong>Figma</strong> plugin</td><td>Design context retrieval; Code Connect mapping</td></tr>
            <tr><td><strong>Playwright</strong> plugin</td><td>Browser automation for verifying UI changes</td></tr>
          </tbody>
        </table>
      </div>
      <p>These run independently; Claude can interleave tool calls from different MCP servers in one conversation.</p>

      <h2 id="faq">FAQ</h2>
      <p><strong>Q: Do I need an API key to use the MCP?</strong><br />No. MCP uses Keycloak OAuth; the first tool call triggers a browser sign-in. API keys are only used by the Code Ontology Generator CLI (headless context) when you pick its automatic-upload mode. MCP-only workflows never need a key.</p>
      <p><strong>Q: Why did</strong> <code>Persona: &quot;Developer&quot;</code> get rejected?<br />The PreToolUse hook <code>validate-functional-node.sh</code> blocks technical persona names. Use a domain role (Admin, Customer, Analyst, …) or <code>System</code> if the actor is fully internal.</p>
      <p><strong>Q: The</strong> <code>/breeze:*</code> commands don&apos;t show up after install.<br />Restart Claude Code. Skills are loaded at startup, not at install time.</p>
      <p><strong>Q: What happens if the backend adds a new tool?</strong><br />Next time Claude Code lists tools from the server, the new one appears automatically (no plugin update needed). The MCP Tool Reference page may need a refresh to document it.</p>
      <p><strong>Q: How do I know if my code graph is stale?</strong><br />No automatic staleness signal today. The pragmatic answer: note the commit hash you onboarded from (visible in the WebUI&apos;s code-ontology view), and re-onboard after any large merge. See <Link href="/user-guide/cookbook/">Cookbook → Keeping the Graphs in Sync</Link>.</p>
      <p><strong>Q: Can I share skills with my team?</strong><br />The whole plugin is the unit of distribution. Once the marketplace is set up at the team level (or each developer adds it), everyone has the same 18 skills.</p>
      <p><strong>Q: Can I write my own Breeze skill?</strong><br />Not officially supported today; the validation hooks are tuned to the bundled skills. A future direction is opening this up.</p>

      <h2 id="future-direction">Future direction</h2>
      <ol>
        <li><strong>Incremental code-graph resync</strong>: today re-running <code>/breeze:onboard-repository</code> replaces the whole code graph for a repo. A diff-based update would let big repos resync in seconds.</li>
        <li><strong>A dedicated</strong> <code>/breeze:resync</code> skill: today resync is &quot;re-run the same generation skill.&quot; A first-class skill could compute a diff and apply deltas.</li>
        <li><strong>User-authored skills</strong>: opening the skill format so customers can ship their own <code>/&lt;org&gt;:*</code> commands alongside <code>/breeze:*</code>.</li>
        <li><strong>MCP resources</strong>: the four graphs as browsable read-only resources, not just tool calls, so non-LLM clients can render them directly.</li>
        <li><strong>Tighter Bedrock model alignment</strong>: the cost estimate assumes Sonnet 4.6, but production runs Claude 3 Haiku today; consolidating those is on the roadmap.</li>
      </ol>

      <h2 id="glossary">Glossary</h2>
      <dl className="glossary-grid">
        <div className="glossary-item"><dt>Marketplace</dt><dd>A Claude Code catalog of plugins. Adding a marketplace is metadata only; nothing is downloaded until you install a plugin from it.</dd></div>
        <div className="glossary-item"><dt>Plugin</dt><dd>A bundle of skills + MCP servers + hooks installed into Claude Code. Breeze ships one: breeze v3.1.0.</dd></div>
        <div className="glossary-item"><dt>MCP</dt><dd>Model Context Protocol: open spec for LLM tool/resource servers.</dd></div>
        <div className="glossary-item"><dt>Tool</dt><dd>A function the LLM can call. Typed inputs + outputs.</dd></div>
        <div className="glossary-item"><dt>Resource</dt><dd>Read-only data the LLM can browse. Not used by breeze-mcp yet.</dd></div>
        <div className="glossary-item"><dt>Skill</dt><dd>A SKILL.md file describing a reusable recipe: usually a sequence of tool calls with user-confirmation gates. Surfaces as a /&lt;plugin&gt;:&lt;skill&gt; slash command.</dd></div>
        <div className="glossary-item"><dt>Hook</dt><dd>A PreToolUse shell script that validates / blocks a tool call before it executes.</dd></div>
        <div className="glossary-item"><dt>PKCE</dt><dd>Proof Key for Code Exchange: the OAuth flow variant Claude Code uses for the MCP login.</dd></div>
        <div className="glossary-item"><dt>.breeze.json</dt><dd>Per-workspace state file. Must contain projectUuid. Gitignored.</dd></div>
        <div className="glossary-item"><dt>Citation</dt><dd>Pointer from a graph node to a source artefact (doc, Jira, code, Figma).</dd></div>
        <div className="glossary-item"><dt>Code graph</dt><dd>Tree-Sitter-parsed File → Class → Function → Statement → Api model of a repo.</dd></div>
      </dl>
    </section>
  )
}
