import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Skills reference: Breeze.AI' }

export default function Skills() {
  return (
    <section className="docs-section">
      <h1>Skills Reference: the 18 /breeze:* skills</h1>

      <p>
        In-depth reference for every skill bundled with the Breeze plugin. Each entry covers the
        slash command, trigger phrases, inputs, the procedure (high-level), the MCP tools it
        composes, and outputs.
      </p>
      <p>
        For the conceptual overview (what a skill <em>is</em>, how the plugin is packaged, setup),
        see the parent page <Link href="/user-guide/mcp/">2. MCP Integration</Link>. For the typed
        MCP tool schemas these skills call, see the sibling page{' '}
        <Link href="/user-guide/mcp-tools/">2.1 MCP Tool Reference</Link>. For copy-paste-ready
        recipes, see the <Link href="/user-guide/cookbook/">Cookbook &rarr; Building the Graphs</Link>.
      </p>

      <div className="doc-table-wrap">
        <table className="doc-table">
          <tbody>
            <tr>
              <td>Skill count</td>
              <td>17 active + 1 retired</td>
            </tr>
            <tr>
              <td>Format</td>
              <td>
                One Markdown file per skill (<code>skills/&lt;name&gt;/SKILL.md</code>)
              </td>
            </tr>
            <tr>
              <td>Shared rules</td>
              <td>
                <code>skills/shared/functional-graph-rules.md</code>
              </td>
            </tr>
            <tr>
              <td>Validation hooks</td>
              <td>
                <code>pre-init-check.sh</code> (every skill) &middot;{' '}
                <code>validate-functional-node.sh</code> (functional-graph writes)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="doc-note">
        <b>Authoring note.</b> All skills share two guards:
        <ol>
          <li>
            They read <code>.breeze.json</code> and stop with a prompt to run{' '}
            <code>/breeze:setup-project</code> if <code>projectUuid</code> is missing.
          </li>
          <li>
            Breeze MCP tools take the project UUID as <code>uuid</code> (not{' '}
            <code>projectUuid</code> / <code>projectId</code>), except <code>Code_Graph_Search</code>{' '}
            and <code>Get_Code_File_Details</code> which use <code>project_uuid</code>.
          </li>
        </ol>
      </div>

      {/* ── Group 1 ───────────────────────────────────────────── */}
      <h2 id="group-1-setup">Group 1: Setup</h2>

      <h3 id="breeze-setup-project">/breeze:setup-project</h3>
      <p>
        <b>Purpose.</b> Initialize or validate the Breeze workspace. Links <code>.breeze.json</code>{' '}
        to a Breeze project (UUID) and checks ontology readiness.{' '}
        <b>Does NOT upload repos or documents.</b>
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;first time setup&quot;, &quot;init breeze&quot;, &quot;setup
        breeze&quot;, or when any Breeze tool fails with authorization errors.
      </p>
      <p>
        <b>Inputs.</b> None at invocation. The skill reads / writes <code>.breeze.json</code> and{' '}
        <code>breeze.config.json</code> (for <code>uiBaseUrl</code>, <code>apiBase</code>).
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Project link.</b> Read <code>.breeze.json</code>. If <code>projectUuid</code> is
          missing, list projects via <code>Call_List_Project_</code>, offer to select an existing
          one or create via <code>Call_Create_Project_</code>, then persist <code>projectUuid</code>{' '}
          into <code>.breeze.json</code>.
        </li>
        <li>
          <b>Ontology readiness check.</b> Call <code>Call_Get_Project_Details_</code> and surface
          whether the project has at least one code ontology indexed.
        </li>
        <li>
          <b>Next-step routing.</b> Point the user at the right follow-up skill based on what they
          want to do (<code>/breeze:onboard-repository</code>,{' '}
          <code>/breeze:generate-functional-from-*</code>, <code>/breeze:visual-to-text</code>,{' '}
          <code>/breeze:analyze-functional</code>).
        </li>
      </ol>
      <p>
        <b>No API key is collected here.</b> MCP access uses Keycloak OAuth (Claude Code handles
        sign-in on the first MCP call). Skills that need a key (only{' '}
        <code>/breeze:onboard-repository</code> in automatic-upload mode, and the retired{' '}
        <code>/breeze:deprecated-cluster-pipeline</code>) prompt on-demand.
      </p>
      <p>
        <b>MCP tools used.</b> <code>Call_List_Project_</code>, <code>Call_Create_Project_</code>,{' '}
        <code>Call_Get_Project_Details_</code>.
      </p>
      <p>
        <b>Outputs.</b> Updated <code>.breeze.json</code> with at least <code>projectUuid</code>.
      </p>

      <h3 id="breeze-onboard-repository">/breeze:onboard-repository [repo-path]</h3>
      <p>
        <b>Purpose.</b> Get a source repository into the Breeze code graph. Wraps the{' '}
        <code>breeze-code-ontology-generator</code> CLI with <code>--capture-statements</code> so
        method-level statements are available to downstream skills.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;onboard repo&quot;, &quot;upload repository&quot;, &quot;index
        repo into breeze&quot;, &quot;add repo to project&quot;, &quot;ingest codebase&quot;,
        &quot;register code graph&quot;, or whenever a Breeze skill reports the project has no code
        ontology yet.
      </p>
      <p>
        <b>Inputs.</b>
      </p>
      <ul>
        <li>
          <code>$ARGUMENTS</code> (optional): repo path. If omitted, resolves from{' '}
          <code>targetRepos.frontend</code> / <code>targetRepos.backend.&lt;name&gt;</code> in{' '}
          <code>.breeze.json</code>, then current working directory, then prompts.
        </li>
        <li>
          <code>.breeze.json</code> &rarr; <code>projectUuid</code> (required), <code>apiKey</code>{' '}
          (only required for automatic mode).
        </li>
        <li>
          <code>breeze.config.json</code> &rarr; <code>apiBase</code>, <code>uiBaseUrl</code>.
        </li>
      </ul>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Pick upload mode.</b>
          <ul>
            <li>
              <b>Automatic</b>: CLI streams ndjson to backend; needs an <code>apiKey</code> (not
              Keycloak OAuth; the CLI uses an explicit key).
            </li>
            <li>
              <b>Manual</b>: CLI writes ndjson locally; user uploads via the Breeze UI at{' '}
              <code>&lt;uiBaseUrl&gt;/code-ontology/&lt;projectUuid&gt;</code>. No key required.
            </li>
          </ul>
        </li>
        <li>
          <b>Node-version guard.</b> Verifies Node.js is exactly v22.x. Node 24+ fails silently due
          to a tree-sitter native-binding + ESM-TLA incompatibility. The skill auto-switches via{' '}
          <code>nvm</code> / <code>fnm</code> / <code>volta</code> when present.
        </li>
        <li>
          <b>Resolve repo path.</b> Argument &rarr; <code>.breeze.json</code> &rarr; cwd &rarr;
          prompt. Persist resolved path back to <code>.breeze.json</code>.
        </li>
        <li>
          <b>Run the CLI.</b> <code>breeze-code-ontology-generator --capture-statements …</code> to
          parse files, classes, functions, route decorators, call chains, and statements.
        </li>
        <li>
          <b>Upload.</b> Stream (automatic) or write locally + prompt for UI upload (manual).
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> None directly; the CLI talks to the Breeze REST backend.
      </p>
      <p>
        <b>Outputs.</b> New code ontology in the project; repo registered in{' '}
        <code>Call_List_Repositories_</code>.
      </p>

      {/* ── Group 2 ───────────────────────────────────────────── */}
      <h2 id="group-2-search-and-analysis">Group 2: Search &amp; Analysis</h2>

      <h3 id="breeze-search">/breeze:search &lt;query&gt;</h3>
      <p>
        <b>Purpose.</b> Default entry point for any question about the project. Routes the query to
        the right graph (functional, code, documents) or composes multiple.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;how does X work&quot;, &quot;what does admin do&quot;,
        &quot;find auth middleware&quot;, &quot;find code for payment processing&quot;, &quot;NAV
        tolerance threshold&quot;, &quot;acceptance criteria for X&quot;, and most &quot;where is
        …&quot; / &quot;who handles …&quot; questions.
      </p>
      <p>
        <b>Inputs.</b> <code>$ARGUMENTS</code>: free-text query. <code>.breeze.json</code> &rarr;{' '}
        <code>projectUuid</code>.
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Classify the query.</b>
          <ul>
            <li>
              Behavior / features / workflows &rarr; <code>Functional_Graph_Search</code>.
            </li>
            <li>
              Who / roles / personas &rarr; <code>Get_all_personas</code> then drill down with{' '}
              <code>Get_all_outcomes_for_a_persona_id</code>,{' '}
              <code>Get_all_scenarios_for_a_outcome_id</code>,{' '}
              <code>Get_all_steps_actions_for_a_scenario_id</code>.
            </li>
            <li>
              Code structure / implementations &rarr; <code>Code_Graph_Search</code>, then{' '}
              <code>Get_Code_File_Details</code> for file-level drill-down.
            </li>
            <li>Both feature + code &rarr; functional first, then code.</li>
            <li>
              Raw requirements / formulas &rarr; <code>Documents</code> (only when the functional
              graph lacks detail).
            </li>
          </ul>
        </li>
        <li>
          <b>Multi-perspective search.</b> For process/workflow questions (&quot;what happens
          when…&quot;, &quot;explain the flow of…&quot;), the skill runs the dual-persona search
          (User-side + System-side) so the picture is complete.
        </li>
        <li>
          <b>Synthesize an answer</b> with citations back to graph node IDs and code file paths.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> All read-side tools: <code>Functional_Graph_Search</code>,{' '}
        <code>Get_all_personas</code>, <code>Get_all_outcomes_for_a_persona_id</code>,{' '}
        <code>Get_all_scenarios_for_a_outcome_id</code>,{' '}
        <code>Get_all_steps_actions_for_a_scenario_id</code>, <code>Code_Graph_Search</code>,{' '}
        <code>Get_Code_File_Details</code>, <code>Documents</code>.
      </p>
      <p>
        <b>Outputs.</b> A markdown answer in the chat.
      </p>

      <h3 id="breeze-analyze-functional">/breeze:analyze-functional</h3>
      <p>
        <b>Purpose.</b> Analyze a requirement against the existing functional graph. Identifies
        coverage gaps, conflicts, dependencies, terminology mismatches, and ambiguous personas.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;analyze this requirement&quot;, &quot;is this covered&quot;,
        &quot;impact of this change&quot;, &quot;break down this user story&quot;.
      </p>
      <p>
        <b>Inputs.</b> One of:
      </p>
      <ul>
        <li>
          <b>Jira ticket link/key</b> (<code>https://…atlassian.net/browse/PROJ-123</code> or{' '}
          <code>PROJ-123</code>), fetched via the Jira MCP.
        </li>
        <li>
          <b>Document or specification text</b>: pasted text or a PDF reference.
        </li>
        <li>
          <b>Source code</b>: file path or code snippet; the skill translates code &rarr;
          functional language via <code>Code_Graph_Search</code> + <code>Get_Code_File_Details</code>.
        </li>
        <li>
          <b>Free-text requirement.</b>
        </li>
      </ul>
      <p>
        If visual input is provided (Figma URL / image / PDF with screens), the skill stops and
        routes the user to <code>/breeze:visual-to-text</code> first.
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Extract functional intents</b> from the input. For Jira input, pull summary,
          description, acceptance criteria, comments.
        </li>
        <li>
          <b>Compare against the existing graph.</b> Run <code>Functional_Graph_Search</code> +{' '}
          <code>Get_all_personas</code>. Check for: ambiguous persona references, conflicting
          requirements, incomplete scenario definitions, terminology misalignment.
        </li>
        <li>
          <b>Clarify with the user</b> in a back-and-forth loop until all flags resolve.
        </li>
        <li>
          <b>Generate / extend the graph</b> using <code>Call_Create_Functional_Node_</code> or hand
          off to <code>/breeze:update-functional-graph</code>.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Functional_Graph_Search</code>, <code>Get_all_personas</code>,{' '}
        <code>Get_all_outcomes_for_a_persona_id</code>, <code>Documents</code>,{' '}
        <code>Code_Graph_Search</code>, <code>Get_Code_File_Details</code>,{' '}
        <code>Call_Create_Citation_Functional_</code>, <code>Call_Create_Functional_Node_</code>.
      </p>
      <p>
        <b>Outputs.</b> Analysis report in chat; optionally new functional-graph nodes with
        citations.
      </p>

      <h3 id="breeze-analyze-architecture">/breeze:analyze-architecture</h3>
      <p>
        <b>Purpose.</b> Map a requirement to the eight-layer architecture model, run code-graph impact
        analysis, anchor user-facing components to functional scenarios, detect reuse and gaps, and
        write the analysis back to the Jira ticket.
      </p>
      <p>
        <b>Trigger phrases.</b> Architecture impact analysis on any requirement.
      </p>
      <p>
        <b>Inputs.</b>
      </p>
      <ul>
        <li>
          <code>--jira &lt;jira-url&gt;</code>: recommended; fetched via Jira MCP.
        </li>
        <li>Ad-hoc requirement text / document / image / diagram.</li>
      </ul>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Load input.</b> Parse Jira URL or accept ad-hoc input. Images route through multimodal
          extraction.
        </li>
        <li>
          <b>Read three graphs in parallel.</b>
          <ul>
            <li>
              <code>Get_All_architecture_Graph</code> for reuse / layer boundary / duplicate
              detection.
            </li>
            <li>
              Functional graph (via <code>Get_all_personas</code> &rarr;{' '}
              <code>Get_all_outcomes_for_a_persona_id</code> or <code>Functional_Graph_Search</code>)
              for cross-ontology anchoring.
            </li>
            <li>
              <code>Code_Graph_Search</code> with 2–4 derived queries for real impact analysis.
            </li>
          </ul>
        </li>
        <li>
          <b>Map to the eight layers.</b> UserExperience, ApiGateway, ObservabilityMonitoring, Agents,
          Services, EventQueue, DataLake, Infrastructure.
        </li>
        <li>
          <b>Detect current-state vs proposed change.</b> If the architecture graph has &lt; 5
          nodes, treat the run as a current-state capture; this changes the commit policy.
        </li>
        <li>
          <b>Classify each requirement element</b> as new / modified / existing-touched / removed.
        </li>
        <li>
          <b>Commit changes</b> via <code>Create_Architecture_Node</code> /{' '}
          <code>Update_Architecture_Node</code>, anchoring <code>scenario[]</code> on UserExperience
          / ApiGateway / Services nodes.
        </li>
        <li>
          <b>Write analysis back to Jira</b> as a structured comment.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Get_All_architecture_Graph</code>,{' '}
        <code>Get_Architecture_Nodes_By_Label</code>, <code>Architecture_Graph_Search</code>,{' '}
        <code>Create_Architecture_Node</code>, <code>Update_Architecture_Node</code>,{' '}
        <code>Functional_Graph_Search</code>, <code>Get_all_personas</code>,{' '}
        <code>Get_all_outcomes_for_a_persona_id</code>, <code>Code_Graph_Search</code>, plus the
        Jira MCP.
      </p>
      <p>
        <b>Outputs.</b> Architecture-graph updates; comment posted back to Jira.
      </p>

      <h3 id="breeze-analyze-design">/breeze:analyze-design [ui-repo-path]</h3>
      <p>
        <b>Purpose.</b> Generate design graph nodes (UserJourney, Flow, Page, Component) from a Jira
        ticket, plain text, scenario refs, or Figma wireframes. When a frontend repo is supplied,
        reads it to discover routes / navigation and split a scenario into multiple flows / pages.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;analyze this design&quot;, &quot;create design from this
        ticket&quot;, &quot;generate design for these scenarios&quot;, a Figma URL or Jira link,
        &quot;design graph from requirement&quot;.
      </p>
      <p>
        <b>Inputs.</b> Jira ticket, free-text description, scenario references, or Figma wireframes.
        Optional frontend repo path (resolution order: argument &rarr; <code>.breeze.json</code>{' '}
        &rarr; cwd &rarr; ask once &rarr; skip).
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Build requirement context</b> from the input.
        </li>
        <li>
          <b>Resolve matching scenarios</b> in the functional graph via{' '}
          <code>Functional_Graph_Search</code> + <code>Get_all_steps_actions_for_a_scenario_id</code>.
        </li>
        <li>
          <b>If a UI repo is available</b>, discover routes / deep links / navigation so one
          scenario can be split into multiple flows / pages.
        </li>
        <li>
          <b>Generate design nodes</b>: UserJourney (1:1 with Scenario), Flow(s), Page(s),
          Component(s) with atomic-design typing (ATOM / MOLECULE / ORGANISM / TEMPLATE),{' '}
          <code>supportingComponents[]</code> and <code>designSystemRef</code> reuse.
        </li>
        <li>
          <b>Persist via</b> <code>Bulk_Update_Design_Nodes</code>.
        </li>
        <li>
          <b>Optional</b>: write summary back to Jira.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Functional_Graph_Search</code>,{' '}
        <code>Get_all_steps_actions_for_a_scenario_id</code>, <code>Get_all_Design_By_Label</code>,{' '}
        <code>Design_Graph_Search</code>, <code>Get_Design_Nodes_by_Ids</code>,{' '}
        <code>Bulk_Update_Design_Nodes</code>, plus Jira / Figma MCPs.
      </p>
      <p>
        <b>Outputs.</b> New / updated design-graph nodes; optional Jira write-back.
      </p>

      <h3 id="breeze-analyze-design-deviations">
        /breeze:analyze-design-deviations &lt;figmaComponents.json&gt;
      </h3>
      <p>
        <b>Purpose.</b> Compare a Figma design-system component export against the Breeze
        design-graph component registry to identify naming gaps, type misalignment, and
        supporting-component drift.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;compare components&quot;, &quot;figma vs design graph&quot;,
        &quot;component drift analysis&quot;, &quot;component comparison&quot;, &quot;design system
        audit&quot;.
      </p>
      <p>
        <b>Inputs.</b>
      </p>
      <ul>
        <li>
          <code>$ARGUMENTS</code> (required): path to <code>figmaComponents.json</code> with
          top-level keys from <code>ATOM</code> / <code>MOLECULE</code> / <code>ORGANISM</code> /{' '}
          <code>TEMPLATE</code>.
        </li>
        <li>
          <code>.breeze.json</code> &rarr; <code>projectUuid</code>.
        </li>
      </ul>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Phase 1: Build</b> <code>existingcomponents.json</code> from MCP. Iterate{' '}
          <code>Get_all_Design_By_Label</code> for <code>Component</code> until all design-graph
          components are dumped to a local JSON.
        </li>
        <li>
          <b>Phase 2: Compare.</b> Multi-dimensional diff:
          <ul>
            <li>
              Name matching (with semantic equivalence resolution: <code>IconBCI</code> &harr;{' '}
              <code>TNLMIcon</code>, <code>TypographyBody</code> &harr; <code>Typography</code>).
            </li>
            <li>Type alignment (e.g. ATOM in Figma but MOLECULE in graph).</li>
            <li>Supporting-components parity (child list diff after equivalents resolved).</li>
          </ul>
        </li>
        <li>
          <b>Output a structured markdown report.</b>
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Get_all_Design_By_Label</code>.
      </p>
      <p>
        <b>Outputs.</b> <code>existingcomponents.json</code> (refreshed registry); comparison report
        printed to console.
      </p>

      <h3 id="breeze-detect-personas">/breeze:detect-personas</h3>
      <p>
        <b>Purpose.</b> Detect user personas from a frontend UI repo by analyzing routes, layouts,
        subscription tiers, roles, feature flags, and access control patterns. Optionally creates /
        updates personas in the functional graph.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;detect personas&quot;, &quot;identify personas&quot;,
        &quot;who uses this app&quot;, &quot;find user types&quot;, &quot;analyze personas from
        UI&quot;, &quot;persona detector&quot;.
      </p>
      <p>
        <b>Inputs.</b>
      </p>
      <ul>
        <li>
          Current working directory must be a frontend UI repo (checked via <code>package.json</code>{' '}
          framework deps, route dirs, or routing files; otherwise stops with a clear message).
        </li>
        <li>
          <code>.breeze.json</code> &rarr; <code>projectUuid</code>.
        </li>
      </ul>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Detect framework</b> from <code>package.json</code> (React, Vue, Angular, Svelte, Next,
          Nuxt, Gatsby, Remix, Solid, Lit, Ember, Backbone).
        </li>
        <li>
          <b>Locate key files</b> with <code>Glob</code> / <code>Grep</code>: routes, layouts, auth
          types, role enums, guards / HOCs, feature flag configs.
        </li>
        <li>
          <b>Analyze five dimensions.</b>
          <ul>
            <li>Routes / Layouts &rarr; product variants (regional, plan, tenant).</li>
            <li>Subscription tiers &rarr; access levels.</li>
            <li>Roles &amp; permissions &rarr; who can act.</li>
            <li>Feature flags / modules &rarr; toggleable capabilities.</li>
            <li>Special user flags &rarr; demo, internal, employee, edge-case.</li>
          </ul>
        </li>
        <li>
          <b>Build a persona matrix</b> showing meaningfully distinct combinations (different feature
          sets, not just labels).
        </li>
        <li>
          <b>Optional</b>: create / update personas via <code>Call_Create_Functional_Node_</code> /{' '}
          <code>Call_Update_Functional_Node_</code>.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Get_all_personas</code>,{' '}
        <code>Call_Create_Functional_Node_</code>, <code>Call_Update_Functional_Node_</code>.
      </p>
      <p>
        <b>Outputs.</b> Persona matrix in the chat; optional functional-graph writes.
      </p>

      {/* ── Group 3 ───────────────────────────────────────────── */}
      <h2 id="group-3-generate-from-documents-and-designs">
        Group 3: Generate from Documents &amp; Designs
      </h2>

      <h3 id="breeze-visual-to-text">/breeze:visual-to-text</h3>
      <p>
        <b>Purpose.</b> Generate user stories from UI design visuals (Figma frames, PDF screens,
        images) that describe functional intent in terms of personas, outcomes, scenarios, steps,
        and actions.
      </p>
      <p>
        <b>Trigger phrases.</b> Figma URL / PDF / image input, &quot;convert design to user
        stories&quot;, &quot;visual to text&quot;, &quot;extract functional intent from
        design&quot;.
      </p>
      <p>
        <b>Inputs.</b> Figma URL (fileKey + nodeId extracted from the URL; convert <code>-</code> to{' '}
        <code>:</code> in nodeId), or a PDF/PNG/JPG file path.
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Fetch the design.</b>
          <ul>
            <li>
              Figma: call the Figma MCP with fileKey + nodeId; review the screenshot and generated
              code.
            </li>
            <li>
              PDF: read with the <code>Read</code> tool (supports <code>.pdf</code>); analyze each
              page visually.
            </li>
            <li>
              Image: read with the <code>Read</code> tool; analyze layout and components.
            </li>
          </ul>
        </li>
        <li>
          <b>Identify UI components.</b> Inputs (text fields, dropdowns, checkboxes, date pickers,
          file upload, text areas), interactive elements (primary/secondary buttons, links, tabs,
          modals, toggles), display elements, data structures, state indicators.
        </li>
        <li>
          <b>Map to functional intent</b>: Personas, Outcomes, Scenarios, Steps, Actions per{' '}
          <code>skills/visual-to-text/references/guide.md</code>.
        </li>
        <li>
          <b>Save structured user stories</b> to a Markdown file.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> Figma MCP (<code>get_design_context</code>, <code>get_screenshot</code>,{' '}
        <code>get_metadata</code>); no Breeze MCP writes by default.
      </p>
      <p>
        <b>Outputs.</b> Structured user-stories Markdown file aligned with the functional graph
        schema.
      </p>

      <h3 id="breeze-generate-functional-from-ui">/breeze:generate-functional-from-ui [repo-path]</h3>
      <p>
        <b>Purpose.</b> Generate the <b>User-persona</b> half of the functional graph from a frontend
        UI repo. Produces human-persona scenarios + actions with API endpoints captured in{' '}
        <code>action.apis[]</code>.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;generate functional from UI&quot;, &quot;ui to
        functional&quot;, &quot;frontend functional pass&quot;.
      </p>
      <p>
        <b>Inputs.</b>
      </p>
      <ul>
        <li>
          <code>$ARGUMENTS</code> (optional): UI repo path. Otherwise resolved via{' '}
          <code>.breeze.json</code> &rarr; cwd &rarr; prompt.
        </li>
        <li>
          <code>.breeze.json</code> &rarr; <code>projectUuid</code>.
        </li>
        <li>Existing functional graph (queried for dedup; not assumed empty).</li>
        <li>
          Optional <code>entrypoints.json</code> inside the UI repo dir for resuming a prior session.
        </li>
      </ul>
      <p>
        <b>Procedure.</b> Multi-phase pipeline with hard validation gates and user-confirmation
        prompts:
      </p>
      <ol>
        <li>
          <b>Phase -1: Resolve repo.</b> Confirm a code ontology is indexed for the project (
          <code>Call_Get_Project_Details_</code>).
        </li>
        <li>
          <b>Phase 0: Persona discovery</b> (hard gate). Run <code>/breeze:detect-personas</code>{' '}
          logic.
        </li>
        <li>
          <b>Phase 1: Entry-point discovery.</b> Routes + non-routed panels (modals, drawers,
          sidebars) with full JSX coverage.
        </li>
        <li>
          <b>Phase 2: Panel discovery</b> (hard gate). User confirms before proceeding.
        </li>
        <li>
          <b>Phase 3+: Per-EP analysis.</b> Translate JSX &rarr; functional scenarios + steps +
          actions; capture API calls in <code>apis[]</code> per action; per-EP verification pass.
        </li>
        <li>
          <b>Bulk upsert</b> via <code>bulk_update_functional_nodes</code> with the project name from
          Step <code>Call_Get_Project_Details_</code>.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Call_Get_Project_Details_</code>, <code>Get_all_personas</code>,{' '}
        <code>Functional_Graph_Search</code>, <code>bulk_update_functional_nodes</code>,{' '}
        <code>Call_Create_Citation_Functional_</code>.
      </p>
      <p>
        <b>Outputs.</b> Functional graph updated with User-persona scenarios + actions.{' '}
        <code>entrypoints.json</code> inside the UI repo dir as inventory + running checkpoint.
      </p>

      <h3 id="breeze-generate-functional-from-backend">
        /breeze:generate-functional-from-backend [repo-path]
      </h3>
      <p>
        <b>Purpose.</b> Generate the <b>System / External System</b> half of the functional graph
        from a backend repo. Discovers REST routes AND non-HTTP entry points and writes scenarios
        with side effects in <code>apis[]</code>.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;generate functional from backend&quot;, &quot;backend to
        functional&quot;, &quot;backend functional pass&quot;.
      </p>
      <p>
        <b>Inputs.</b> Same shape as <code>from-ui</code> but pointed at a backend repo. Optional{' '}
        <code>entrypoints_&lt;repo&gt;.json</code> for resume; per-repo{' '}
        <code>backend_log_&lt;repo&gt;.json</code> for cross-repo producer / consumer correlation.
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Framework detection.</b> LoopBack, NestJS, Express, Fastify, Spring, FastAPI, etc.
        </li>
        <li>
          <b>Entry-point discovery</b>: all types:
          <ul>
            <li>REST routes.</li>
            <li>SQS / Kafka / RabbitMQ consumers and producers.</li>
            <li>Cron / scheduled workers.</li>
            <li>WebSocket handlers.</li>
            <li>Webhook receivers.</li>
            <li>Internal service-to-service routes.</li>
          </ul>
        </li>
        <li>
          <b>Generate scenarios</b> under the <b>System</b> / <b>External System</b> personas with
          side effects captured in <code>apis[]</code> (REST / GraphQL / gRPC / WebSocket / Event).
        </li>
        <li>
          <b>Bulk upsert</b> via <code>bulk_update_functional_nodes</code>.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Call_Get_Project_Details_</code>, <code>Get_all_personas</code>,{' '}
        <code>Functional_Graph_Search</code>, <code>bulk_update_functional_nodes</code>,{' '}
        <code>Call_Create_Citation_Functional_</code>.
      </p>
      <p>
        <b>Outputs.</b> Functional graph updated with System-persona scenarios + actions. Per-repo
        entrypoints + handoff log files for cross-repo correlation.
      </p>
      <div className="doc-note">
        <b>Cross-repo merge.</b> The <code>from-ui</code> and <code>from-backend</code> passes are
        fully independent; they merge automatically in the functional graph by outcome name. Run{' '}
        <code>from-backend</code> once per backend repo.
      </div>

      {/* ── Group 4 ───────────────────────────────────────────── */}
      <h2 id="group-4-generate-downstream-artifacts">Group 4: Generate Downstream Artifacts</h2>

      <h3 id="breeze-generate-design">/breeze:generate-design</h3>
      <p>
        <b>Purpose.</b> Generate the design graph (UserJourney &rarr; Flow &rarr; Page &rarr;
        Component) directly from the functional graph. Scenario&rarr;UserJourney, Step&rarr;Flow/Page,
        Action&rarr;Component.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;create design from functional&quot;, &quot;generate UI
        structure&quot;, &quot;map functional to design graph&quot;.
      </p>
      <p>
        <b>Inputs.</b> <code>.breeze.json</code> &rarr; <code>projectUuid</code>. Optional: target
        modalities, processing mode (<code>confirm</code> per scenario vs <code>auto</code>).
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Step 0: Mode selection.</b> <code>confirm</code> (default, asks per scenario) or{' '}
          <code>auto</code> (skips per-scenario confirmation, logs progress).
        </li>
        <li>
          <b>Step 1: Load functional scope.</b> Iterate scenarios via{' '}
          <code>Get_scenarios_by_uuid</code> (filter <code>is_design_generated=false</code>) and{' '}
          <code>Get_all_steps_actions_for_a_scenario_id</code>.
        </li>
        <li>
          <b>Step 2: Lookup design-system references</b> (component reuse via{' '}
          <code>designSystemRef</code>).
        </li>
        <li>
          <b>Step 3: Generate design nodes</b> per atomic-design theory (ATOM / MOLECULE / ORGANISM
          / TEMPLATE).
        </li>
        <li>
          <b>Step 4: Bulk upsert</b> via <code>Bulk_Update_Design_Nodes</code>.
        </li>
        <li>
          <b>Steps 5–7</b>: Confirmation, persistence, summary.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Get_scenarios_by_uuid</code>,{' '}
        <code>Get_all_steps_actions_for_a_scenario_id</code>, <code>Get_all_Design_By_Label</code>,{' '}
        <code>Design_Graph_Search</code>, <code>Bulk_Update_Design_Nodes</code>.
      </p>
      <p>
        <b>Outputs.</b> Design graph populated for the in-scope scenarios.
      </p>

      <h3 id="breeze-generate-design-from-ui">/breeze:generate-design-from-ui [repo-path]</h3>
      <p>
        <b>Purpose.</b> Like <code>generate-design</code>, but enriched by reading the actual
        frontend UI codebase as the primary source for component discovery, hierarchy, props, and
        states. Unlike <code>generate-design</code> (which infers components from action
        descriptions), this reads JSX/TSX.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;design from UI&quot;, &quot;ui to design graph&quot;,
        &quot;generate design from frontend&quot;, &quot;map ui to user journeys&quot;.
      </p>
      <p>
        <b>Inputs.</b> Optional repo path argument; otherwise resolved like other repo-bound skills.{' '}
        <code>.breeze.json</code> &rarr; <code>projectUuid</code>.
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Resolve UI repo.</b>
        </li>
        <li>
          <b>Walk the functional scenarios</b> as <code>generate-design</code> does.
        </li>
        <li>
          <b>Per scenario, read the UI</b> to discover:
          <ul>
            <li>
              How many distinct flows complete the journey (functional graph captures WHAT; UI
              reveals HOW MANY WAYS).
            </li>
            <li>Pages needed per flow.</li>
            <li>Actual JSX components, their nesting, props, states.</li>
          </ul>
        </li>
        <li>
          <b>Link to functional graph</b> via <code>scenarioId</code> on UserJourney,{' '}
          <code>stepIds[]</code> on Flows / Pages, <code>actionIds[]</code> on Components / Pages.
        </li>
        <li>
          <b>Bulk upsert</b> via <code>Bulk_Update_Design_Nodes</code>.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> Same as <code>generate-design</code>.
      </p>
      <p>
        <b>Outputs.</b> Design graph populated with actual-UI-anchored flows / pages / components.
      </p>

      <h3 id="breeze-generate-code">/breeze:generate-code &lt;feature&gt;</h3>
      <p>
        <b>Purpose.</b> Generate code and tests informed by the functional graph and code graph.
        Ensures implementations align with requirements and existing patterns.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;generate code for X&quot;, &quot;write tests for Y&quot;,
        &quot;implement this scenario&quot;, &quot;scaffold the API for Z&quot;, &quot;generate
        frontend&quot;, &quot;generate backend&quot;, &quot;build the UI&quot;, &quot;scaffold the
        full app&quot;.
      </p>
      <p>
        <b>Inputs.</b> <code>$ARGUMENTS</code>: scope selector. Scopes:
      </p>
      <ul>
        <li>
          <b>Selective generation</b>: single scenario or feature (e.g. &quot;generate code for
          login&quot;).
        </li>
        <li>
          <b>Full frontend</b>: &quot;generate frontend&quot;, &quot;build the UI&quot;.
        </li>
        <li>
          <b>Full backend</b>: &quot;generate backend&quot;, &quot;build the API&quot;.
        </li>
        <li>
          <b>Full-stack</b>: both, sequentially.
        </li>
      </ul>
      <p>
        <b>Procedure (selective, A-workflow).</b>
      </p>
      <ol>
        <li>
          <b>UNDERSTAND</b>: <code>Functional_Graph_Search</code> +{' '}
          <code>Get_all_steps_actions_for_a_scenario_id</code> for the WHAT.
        </li>
        <li>
          <b>DISCOVER</b>: <code>Code_Graph_Search</code> + <code>Get_Code_File_Details</code> for
          the HOW (existing patterns, utilities, conventions).
        </li>
        <li>
          <b>REFERENCE</b>: <code>Documents</code> for business rules, formulas, validation
          thresholds.
        </li>
        <li>
          <b>GENERATE</b>: write code that aligns with steps from #1, reuses utilities from #2,
          applies rules from #3; add comments referencing functional graph node IDs for
          traceability.
        </li>
        <li>
          <b>TEST</b>: generate test cases from the scenario tree (
          <code>describe(&quot;[Scenario]&quot;)</code> &rarr;{' '}
          <code>it(&quot;[Step] &rarr; [Action]&quot;)</code> …).
        </li>
      </ol>
      <p>
        Workflows B (frontend) and C (backend) expand the same discovery + generation logic over the
        whole repo.
      </p>
      <p>
        <b>MCP tools used.</b> <code>Functional_Graph_Search</code>,{' '}
        <code>Get_all_steps_actions_for_a_scenario_id</code>, <code>Code_Graph_Search</code>,{' '}
        <code>Get_Code_File_Details</code>, <code>Documents</code>.
      </p>
      <p>
        <b>Outputs.</b> Generated code files + tests in the local repo.
      </p>

      <h3 id="breeze-generate-spec">/breeze:generate-spec</h3>
      <p>
        <b>Purpose.</b> Generate a functional specification document from the functional graph.
        Outputs structured Markdown (or HTML) grouped by persona with citations.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;generate spec&quot;, &quot;generate document&quot;,
        &quot;functional spec&quot;, &quot;create specification&quot;, &quot;export functional
        graph&quot;.
      </p>
      <p>
        <b>Inputs.</b> <code>$ARGUMENTS</code>: output mode flags. Modes:
      </p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--plain</code>
              </td>
              <td>
                Plain Markdown FRD: numbered sections (FR-001), scenario IDs (SC-01), nested
                step/action format. Best for quick reference, PR review.
              </td>
            </tr>
            <tr>
              <td>
                <code>--full</code>
              </td>
              <td>
                Plain + AI-synthesized overview, project context, business objectives, stakeholders,
                per-outcome business value, NFR section, glossary.
              </td>
            </tr>
            <tr>
              <td>
                <code>--html</code>
              </td>
              <td>
                Interactive single-file HTML viewer with sidebar nav, search, collapsible accordions,
                light/dark theme.
              </td>
            </tr>
            <tr>
              <td>
                <code>--html --full</code>
              </td>
              <td>Interactive HTML + all AI enrichments rendered visually.</td>
            </tr>
            <tr>
              <td>
                <code>--mermaid</code>
              </td>
              <td>
                Add workflow diagrams per outcome (requires <code>--full</code>).
              </td>
            </tr>
            <tr>
              <td>
                <code>--export docx</code> / <code>--export pdf</code>
              </td>
              <td>Convert previously generated markdown.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If <code>$ARGUMENTS</code> is empty, the skill <b>does NOT generate</b>; it shows the
        options menu and waits for the user to pick.
      </p>
      <p>
        <b>Scope.</b> Full project (default), single persona (
        <code>/breeze:generate-spec --full &quot;Financial Institution User&quot;</code>), or single
        outcome.
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>Resolve scope and mode.</li>
        <li>
          Call <code>Get_complete_functional_graph</code> (auto-saves the JSON when large).
        </li>
        <li>
          Run the template engine (<code>scripts/template_engine.py</code>) against the saved graph +
          chosen template (<code>templates/frd-plain.md.j2</code>, <code>frd-full.md.j2</code>,{' '}
          <code>plain.html.j2</code>, <code>full.html.j2</code>).
        </li>
        <li>
          Optionally render Mermaid via <code>scripts/render-mermaid.py</code>.
        </li>
        <li>Write output to disk.</li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Get_complete_functional_graph</code> (always);{' '}
        <code>Get_all_personas</code> / <code>Get_scenarios_by_uuid</code> for scoped runs.
      </p>
      <p>
        <b>Outputs.</b> <code>.md</code> / <code>.html</code> / <code>.docx</code> / <code>.pdf</code>{' '}
        files in the working directory.
      </p>

      {/* ── Group 5 ───────────────────────────────────────────── */}
      <h2 id="group-5-update-validate">Group 5: Update, Validate</h2>

      <h3 id="breeze-update-functional-graph">/breeze:update-functional-graph</h3>
      <p>
        <b>Purpose.</b> Create or update nodes in the functional graph from code, documents, or Figma
        designs.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;update functional graph&quot;, &quot;add to graph&quot;,
        &quot;capture this in the functional graph&quot;; also invoked after{' '}
        <code>/breeze:analyze-functional</code> or <code>/breeze:visual-to-text</code> to commit the
        inferred structure.
      </p>
      <p>
        <b>Inputs.</b> A Figma frame, document, or code cluster. <code>.breeze.json</code> &rarr;{' '}
        <code>projectUuid</code>.
      </p>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Analyze input</b> to extract functional intents.
        </li>
        <li>
          <b>Load existing graph</b>: <code>Get_all_personas</code> for the persona list;{' '}
          <code>Functional_Graph_Search</code> with key terms for nearest existing outcomes /
          scenarios.
        </li>
        <li>
          <b>Resolve personas (REUSE FIRST).</b> Priority order:
          <ol>
            <li>Named human role (Admin, Fund Manager, Compliance Officer, …).</li>
            <li>Generic human role (User, Customer, Visitor).</li>
            <li>External System (webhooks, partner APIs, payment gateways).</li>
            <li>System (only if fully internal automation: cron, queue workers, schedulers).</li>
          </ol>
        </li>
        <li>
          <b>Reuse before create.</b> Merge similar roles (&quot;Admin User&quot; &harr;
          &quot;Administrator&quot;).
        </li>
        <li>
          <b>Create / update</b> via <code>Call_Create_Functional_Node_</code> /{' '}
          <code>Call_Update_Functional_Node_</code>. The <code>validate-functional-node.sh</code>{' '}
          hook will block: technical persona names (Developer, Engineer, API, Service, Controller,
          Backend, Frontend), technical outcome names (&quot;Handle API Request&quot;), missing
          parent IDs, missing descriptions on Scenario / Step / Action.
        </li>
        <li>
          <b>Attach citations</b> via <code>Call_Create_Citation_Functional_</code>.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Get_all_personas</code>, <code>Functional_Graph_Search</code>,{' '}
        <code>Call_Create_Functional_Node_</code>, <code>Call_Update_Functional_Node_</code>,{' '}
        <code>Call_Create_Citation_Functional_</code>, <code>Delete_Functional_Node</code> (rare).
      </p>
      <p>
        <b>Outputs.</b> New / updated functional-graph nodes with citations.
      </p>

      <h3 id="breeze-validate-functional-graph">/breeze:validate-functional-graph</h3>
      <p>
        <b>Purpose.</b> Audit graph quality: coverage against source documents, duplicates, persona
        quality, description completeness, action platform-agnosticism, citation traceability.
      </p>
      <p>
        <b>Trigger phrases.</b> &quot;validate graph&quot;, &quot;check graph quality&quot;,
        &quot;compare graph to docs&quot;, &quot;audit functional graph&quot;, &quot;graph health
        check&quot;.
      </p>
      <p>
        <b>Inputs.</b>
      </p>
      <ul>
        <li>
          <code>.breeze.json</code> &rarr; <code>projectUuid</code>.
        </li>
        <li>
          Source baseline (one of): a folder of requirement docs, the project&apos;s documents in
          MCP, or a pre-existing <code>sources.json</code> from a prior run.
        </li>
      </ul>
      <p>
        <b>Procedure.</b>
      </p>
      <ol>
        <li>
          <b>Collect graph data</b>: <code>Get_complete_functional_graph</code> (auto-saves to a
          JSON file).
        </li>
        <li>
          <b>Collect source baseline.</b>
          <ul>
            <li>
              Folder of docs &rarr; extract requirements / acceptance criteria &rarr; write{' '}
              <code>sources.json</code>.
            </li>
            <li>
              No docs but <code>Documents</code> MCP returns results &rarr; build{' '}
              <code>sources.json</code> from that.
            </li>
            <li>No usable baseline &rarr; skip; structural checks still run.</li>
          </ul>
        </li>
        <li>
          <b>Run validation script</b> —{' '}
          <code>
            python3 {'{'}SKILL_BASE_DIR{'}'}/scripts/validate-graph.py &lt;saved-json&gt;
            validation-report.json [--sources sources.json]
          </code>
          . Checks: coverage, duplicates, persona quality, description completeness, action
          platform-agnosticism, citation traceability.
        </li>
        <li>
          <b>Surface findings</b> with severity and remediation hints.
        </li>
      </ol>
      <p>
        <b>MCP tools used.</b> <code>Get_complete_functional_graph</code>, <code>Documents</code>.
      </p>
      <p>
        <b>Outputs.</b> <code>validation-report.json</code> in the project root; chat summary with
        prioritized actions.
      </p>

      {/* ── Group 6 ───────────────────────────────────────────── */}
      <h2 id="group-6-retired">Group 6: Retired</h2>

      <h3 id="breeze-deprecated-cluster-pipeline">
        /breeze:deprecated-cluster-pipeline <em>(do not use)</em>
      </h3>
      <p>
        <b>Status.</b> <b>Retired v1 cluster pipeline.</b> Kept in the tree only so historical
        in-progress runs can be resumed and the implementation remains available for reference.
      </p>
      <p>
        <b>Why retired.</b> The Pass 1.5 DBSCAN clustering step duplicates scenarios when intents
        cluster non-deterministically across runs. Cumulative dedup in Pass 2 doesn&apos;t catch
        them because the same underlying capability shows up under slightly different intent
        phrasings. Result: the functional graph ends up with multiple near-identical scenarios under
        slightly-different outcome names, and fixing it manually is more work than rerunning the
        modern skills.
      </p>
      <p>
        <b>Use only if.</b>
      </p>
      <ul>
        <li>
          Resuming an in-progress historical run that already has cached passes on disk and you want
          to finish it for archival reasons.
        </li>
        <li>
          Consciously reproducing the legacy behaviour for a bug-replay or comparison investigation.
        </li>
      </ul>
      <p>
        <b>For new functional-graph generation, use instead.</b>
      </p>
      <ul>
        <li>
          <code>/breeze:generate-functional-from-ui</code>: frontend repos.
        </li>
        <li>
          <code>/breeze:generate-functional-from-backend</code>: backend repos.
        </li>
      </ul>
      <p>
        The two replacements are independent and merge automatically by outcome name; together they
        cover everything this skill used to do, without the cluster duplication.
      </p>

      {/* ── Cross-Reference ───────────────────────────────────── */}
      <h2 id="cross-reference">Cross-Reference</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>
              <th>Looking for…</th>
              <th>See</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Conceptual overview, setup, marketplace, plugin packaging</td>
              <td>
                <Link href="/user-guide/mcp/">2. MCP Integration</Link>
              </td>
            </tr>
            <tr>
              <td>Full MCP tool schemas with parameters / defaults</td>
              <td>
                <Link href="/user-guide/mcp-tools/">2.1 MCP Tool Reference</Link>
              </td>
            </tr>
            <tr>
              <td>Copy-paste recipes (brownfield, greenfield, day-to-day)</td>
              <td>
                <Link href="/user-guide/cookbook/">Cookbook &rarr; Building the Graphs</Link>
              </td>
            </tr>
            <tr>
              <td>Functional-graph ontology rules used by every skill</td>
              <td>
                <code>breezeai-claude-plugin/skills/shared/functional-graph-rules.md</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
