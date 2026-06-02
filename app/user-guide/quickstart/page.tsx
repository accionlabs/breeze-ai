import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Quick-start — Breeze.AI' }

export default function Quickstart() {
  return (
    <section className="docs-section">
      <h1>Quick-start</h1>
      <p>From zero to your first graph in a handful of commands, run from inside Claude Code. First-time setup of the plugin and authentication is covered in <Link href="/user-guide/mcp/">MCP integration</Link>.</p>

      <h2 id="install">Install the plugin</h2>
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
          <span className="ln"><span className="c"># 2. install the plugin, then restart Claude Code</span></span>
          <span className="ln"><span className="k">/plugin install</span> breeze</span>
        </div>
      </div>
      <div className="doc-note" style={{ marginTop: 16 }}>
        The first Breeze command opens a browser sign-in (Keycloak OAuth) — no API key needed. Sessions auto-refresh after that.
      </div>

      <h2 id="first-graph">Five steps to your first graph</h2>
      <p>The fastest path for an existing (brownfield) codebase:</p>
      <div className="code-block">
        <div className="code-block__bar">
          <span className="code-block__dot" style={{background:'#ff5f57'}}/>
          <span className="code-block__dot" style={{background:'#febc2e'}}/>
          <span className="code-block__dot" style={{background:'#28c840'}}/>
          <span className="code-block__title">claude-code — first graph</span>
        </div>
        <div className="code-block__body">
          <span className="ln"><span className="c"># 1. link this workspace to a Breeze project</span></span>
          <span className="ln"><span className="k">/breeze:setup-project</span></span>
          <span className="ln"> </span>
          <span className="ln"><span className="c"># 2. pull your repo into the code graph</span></span>
          <span className="ln"><span className="k">/breeze:onboard-repository</span> &lt;path-to-repo&gt;</span>
          <span className="ln"> </span>
          <span className="ln"><span className="c"># 3. derive functional intent from the UI and backend</span></span>
          <span className="ln"><span className="k">/breeze:generate-functional-from-ui</span>      &lt;fe&gt;</span>
          <span className="ln"><span className="k">/breeze:generate-functional-from-backend</span> &lt;be&gt;</span>
          <span className="ln"> </span>
          <span className="ln"><span className="c"># 4. audit graph quality</span></span>
          <span className="ln"><span className="k">/breeze:validate-functional-graph</span></span>
          <span className="ln"> </span>
          <span className="ln"><span className="c"># 5. export a functional spec</span></span>
          <span className="ln"><span className="k">/breeze:generate-spec</span> --full</span>
        </div>
      </div>
      <div className="doc-note" style={{ marginTop: 16 }}>
        Starting greenfield (no code yet)? See the <Link href="/user-guide/cookbook/">cookbook</Link> for the design-first order.
      </div>

      <h2 id="shortcuts">Day-to-day shortcuts</h2>
      <div className="code-block">
        <div className="code-block__bar">
          <span className="code-block__dot" style={{background:'#ff5f57'}}/>
          <span className="code-block__dot" style={{background:'#febc2e'}}/>
          <span className="code-block__dot" style={{background:'#28c840'}}/>
          <span className="code-block__title">claude-code — common commands</span>
        </div>
        <div className="code-block__body">
          <span className="ln"><span className="c"># search anything in the graph</span></span>
          <span className="ln"><span className="k">/breeze:search</span> &quot;how does X work&quot;</span>
          <span className="ln"> </span>
          <span className="ln"><span className="c"># impact analysis for a Jira ticket</span></span>
          <span className="ln"><span className="k">/breeze:analyze-architecture</span> &lt;jira-url&gt;</span>
          <span className="ln"> </span>
          <span className="ln"><span className="c"># generate code from a scenario</span></span>
          <span className="ln"><span className="k">/breeze:generate-code</span> &lt;scenario-id&gt;</span>
          <span className="ln"> </span>
          <span className="ln"><span className="c"># export a full functional spec</span></span>
          <span className="ln"><span className="k">/breeze:generate-spec</span> --html --full</span>
        </div>
      </div>
    </section>
  )
}
