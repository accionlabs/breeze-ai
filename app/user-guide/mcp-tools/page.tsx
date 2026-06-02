import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'MCP tool reference — Breeze.AI' }

export default function McpTools() {
  return (
    <section className="docs-section">
      <h1>MCP Tool Reference — breeze-mcp</h1>

      <p>
        In-depth reference for every tool published by the Breeze MCP server. Every tool below is
        namespaced <code>mcp__breeze-mcp__&lt;tool&gt;</code> when called by Claude — bare names are used in
        this reference.
      </p>

      <p>
        For the conceptual overview (what MCP is, how the Breeze plugin packages it, setup flow), see the
        parent page <Link href="/user-guide/mcp/"><b>2. MCP Integration</b></Link>. For curated workflows
        that compose these tools into real tasks, see the{' '}
        <Link href="/user-guide/cookbook/"><b>Cookbook → Building the Graphs</b></Link>.
      </p>

      <div className="doc-table-wrap">
        <table className="doc-table">
          <tbody>
            <tr><td>Endpoint</td><td><code>https://breezeai-mcp-python.accionbreeze.com/mcp</code></td></tr>
            <tr><td>Transport</td><td>Streamable HTTP</td></tr>
            <tr><td>Auth</td><td>Keycloak OAuth2 (PKCE)</td></tr>
            <tr><td>Implementation</td><td>Python (FastMCP)</td></tr>
            <tr><td>Tool count</td><td>43</td></tr>
          </tbody>
        </table>
      </div>

      <div className="doc-note">
        <b>Note:</b> Parameter naming gotchas. Every tool that targets a project takes the project UUID as{' '}
        <code>uuid</code> (not <code>projectId</code> / <code>projectUuid</code>) — except{' '}
        <code>Code_Graph_Search</code> and <code>Get_Code_File_Details</code>, which use{' '}
        <code>project_uuid</code>. <code>Get_all_steps_actions_for_a_scenario_id</code> historically
        required the scenario ID under the key <code>parameters0_Value</code> on some clients; the Python
        SDK below accepts <code>scenario_id</code>. Stick to the names in the schemas on this page.
      </div>

      <h2 id="project-management">1. Project Management</h2>

      <h3 id="call-list-project">Call_List_Project_</h3>
      <p>List all accessible projects for the authenticated user.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number for pagination</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>10</code></td><td>Projects per page</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> List of projects with their names, UUIDs, and IDs.</p>

      <h3 id="call-create-project">Call_Create_Project_</h3>
      <p>Create a new project. The caller becomes Owner.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>name</code></td><td>string</td><td>yes</td><td>—</td><td>Project name</td></tr>
            <tr><td><code>description</code></td><td>string</td><td>no</td><td><code>&quot;&quot;</code></td><td>Project description</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with the created project&apos;s details.</p>

      <h3 id="call-get-project-details">Call_Get_Project_Details_</h3>
      <p>Get detailed information about a specific project by UUID. Used by most skills as a sanity check after reading <code>.breeze.json</code>.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>UUID of the project to retrieve</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Project metadata + ontology readiness.</p>

      <h3 id="call-update-project">Call_Update_Project_</h3>
      <p>Update name / description of an existing project.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>UUID of the project to update</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>no</td><td><code>&quot;&quot;</code></td><td>New name</td></tr>
            <tr><td><code>description</code></td><td>string</td><td>no</td><td><code>&quot;&quot;</code></td><td>New description</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with the updated project&apos;s details.</p>

      <h2 id="functional-graph-reads">2. Functional Graph — Hierarchy Reads</h2>
      <p>Hierarchy: <code>Persona → Outcome → Scenario → Step → Action</code>.</p>

      <h3 id="get-all-personas">Get_all_personas</h3>
      <p>PRIMARY TOOL — call first when the user asks &quot;who uses this system?&quot;, &quot;what roles exist?&quot;, or any question about responsibilities or role-based flows. Returns all Persona entities.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>10</code></td><td>Personas per page</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> List of Persona objects with id, name, and metadata. Use the persona id to fetch outcomes via <code>Get_all_outcomes_for_a_persona_id</code>.</p>

      <h3 id="get-all-outcomes-for-a-persona-id">Get_all_outcomes_for_a_persona_id</h3>
      <p>PRIMARY TOOL — call when asking what a role does, what goals a persona has, what features they interact with.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>persona_id</code></td><td>string</td><td>yes</td><td>—</td><td>Persona UUID (not name)</td></tr>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>10</code></td><td>Outcomes per page</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Outcome objects with id, name, and citations to source documents.</p>

      <h3 id="get-all-scenarios-for-a-outcome-id">Get_all_scenarios_for_a_outcome_id</h3>
      <p>PRIMARY TOOL — call when asking how a feature works, what flows exist, alternative paths, edge cases.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>outcome_id</code></td><td>string</td><td>yes</td><td>—</td><td>Outcome UUID</td></tr>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>10</code></td><td>Scenarios per page</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Scenario objects with id, name, description, source citations.</p>

      <h3 id="get-all-steps-actions-for-a-scenario-id">Get_all_steps_actions_for_a_scenario_id</h3>
      <p>MOST DETAILED tool in the hierarchy. Returns the complete step + action tree for one scenario as a nested structure. Use to generate UI components, API endpoint logic, test cases.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>scenario_id</code></td><td>string</td><td>yes</td><td>—</td><td>Scenario UUID</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Nested tree <code>Scenario → Steps[] → Actions[]</code>.</p>

      <h3 id="get-complete-functional-graph">Get_complete_functional_graph</h3>
      <p>EXPENSIVE — returns the entire functional graph for a project as one nested tree. Use only for full document generation, export, or reporting. Do NOT use for search or specific-feature lookup.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Complete nested tree of all Personas with Outcomes, Scenarios, Steps, Actions, including citations at every level. Response auto-saves to a file when large.</p>

      <h3 id="get-scenarios-by-uuid">Get_scenarios_by_uuid</h3>
      <p>Fetch scenarios across all personas/outcomes in a project. Useful for browsing, project-wide views, or filtering by design generation status.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>10</code></td><td>Scenarios per page</td></tr>
            <tr><td><code>is_design_generated</code></td><td>boolean | null</td><td>no</td><td><code>null</code></td><td>Filter by design-generation status</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Scenario objects with id, name, and description.</p>

      <h2 id="functional-graph-search-mutation">3. Functional Graph — Search &amp; Mutation</h2>

      <h3 id="functional-graph-search">Functional_Graph_Search</h3>
      <p>DEFAULT SEARCH TOOL — call BEFORE <code>Documents</code> for any question about behavior, features, capabilities, impact, or cross-cutting concerns. Semantic search across all functional-graph entities.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>query</code></td><td>string</td><td>yes</td><td>—</td><td>Natural-language search query</td></tr>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>10</code></td><td>Max results</td></tr>
            <tr><td><code>include_labels</code></td><td>string[] | null</td><td>no</td><td><code>null</code></td><td>Filter by label types: Persona, Outcome, Scenario, Step, Action</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Matching entities across all hierarchy levels with relevance ranking.</p>

      <h3 id="call-create-functional-node">Call_Create_Functional_Node_</h3>
      <p>Create a node in the functional graph. Subject to the <code>validate-functional-node.sh</code> PreToolUse hook (rejects technical persona names, missing parent IDs, missing descriptions on Scenario/Step/Action).</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td>One of <code>Persona</code>, <code>Outcome</code>, <code>Scenario</code>, <code>Step</code>, <code>Action</code></td></tr>
            <tr><td><code>data</code></td><td>object</td><td>yes</td><td>—</td><td>Node payload; structure depends on label (see below)</td></tr>
            <tr><td><code>citation_ids</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>IDs of existing citations to link</td></tr>
            <tr><td><code>citations</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Citation objects to create + link</td></tr>
            <tr><td><code>llm_platform</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Override LLM platform for embedding (e.g. <code>AWSBEDROCK</code>)</td></tr>
          </tbody>
        </table>
      </div>
      <p><code>data</code> shape by label:</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Label</th><th><code>data</code> keys</th></tr></thead>
          <tbody>
            <tr><td>Persona</td><td><code>{`{ "persona": str, "description": str }`}</code></td></tr>
            <tr><td>Outcome</td><td><code>{`{ "outcome": str, "description": str, "personaId": str }`}</code></td></tr>
            <tr><td>Scenario</td><td><code>{`{ "scenario": str, "description": str, "outcomeId": str }`}</code></td></tr>
            <tr><td>Step</td><td><code>{`{ "step": str, "description": str, "scenarioId": str }`}</code></td></tr>
            <tr><td>Action</td><td><code>{`{ "action": str, "description": str, "stepId": str }`}</code></td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with created node details.</p>

      <h3 id="call-update-functional-node">Call_Update_Functional_Node_</h3>
      <p>Update an existing node. Same payload shape as create, plus <code>node_id</code>.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td><code>Persona</code> | <code>Outcome</code> | <code>Scenario</code> | <code>Step</code> | <code>Action</code></td></tr>
            <tr><td><code>node_id</code></td><td>string</td><td>yes</td><td>—</td><td>ID of the node to update</td></tr>
            <tr><td><code>data</code></td><td>object</td><td>yes</td><td>—</td><td>Updated node payload (same shape as create)</td></tr>
            <tr><td><code>citation_ids</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Citation IDs to link</td></tr>
            <tr><td><code>citations</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Citation objects to create + link</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with updated node details.</p>

      <h3 id="bulk-update-functional-nodes">bulk_update_functional_nodes</h3>
      <p>Bulk upsert the entire functional ontology hierarchy for a project in one call — <code>Persona → Outcome → Scenario → Step → Action → Api</code> tree. Matches the design bulk-upsert pattern. Used by <code>generate-functional-from-ui</code> and <code>generate-functional-from-backend</code>.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>yes</td><td>—</td><td>Project name (used in upsert metadata)</td></tr>
            <tr><td><code>data</code></td><td>object</td><td>yes</td><td>—</td><td>Top-level <code>{`{ "personas": [...] }`}</code> tree</td></tr>
            <tr><td><code>document_id</code></td><td>integer | null</td><td>no</td><td><code>null</code></td><td>Source document id, if applicable</td></tr>
            <tr><td><code>embedding</code></td><td>boolean</td><td>no</td><td><code>false</code></td><td>Whether to compute embeddings for new nodes</td></tr>
            <tr><td><code>skip_step_and_action</code></td><td>boolean</td><td>no</td><td><code>false</code></td><td>If true, accept upserts that stop at the Scenario level</td></tr>
            <tr><td><code>llm_platform</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Embedding-platform override (e.g. <code>AWSBEDROCK</code>)</td></tr>
          </tbody>
        </table>
      </div>
      <p><code>data</code> shape (abbreviated):</p>
      <pre className="doc-pre">{`{
  "personas": [
    {
      "persona": "End User",
      "citations": [],
      "outcomes": [
        {
          "outcome": "Successful Account Creation",
          "citations": [],
          "scenarios": [
            {
              "scenario": "New User Sign Up",
              "description": "First-time signup",
              "steps": [
                {
                  "step": "Provide Registration Details",
                  "actions": [
                    {
                      "action": "Submit Registration Form",
                      "apis": [
                        { "method": "POST", "url": "/api/v1/auth/register" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}`}</pre>
      <p><b>Returns:</b> Confirmation with upsert summary.</p>

      <h3 id="delete-functional-node">Delete_Functional_Node</h3>
      <p>Delete a node. Deleting a parent cascades to descendants — confirm intent before invoking on high-level nodes.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td><code>Persona</code> | <code>Outcome</code> | <code>Scenario</code> | <code>Step</code> | <code>Action</code></td></tr>
            <tr><td><code>node_id</code></td><td>string</td><td>yes</td><td>—</td><td>ID of the node to delete</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with deleted node details.</p>

      <h3 id="call-create-citation-functional">Call_Create_Citation_Functional_</h3>
      <p>Create a citation that can be attached to any functional-graph node.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>project_uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>yes</td><td>—</td><td>Citation display name</td></tr>
            <tr><td><code>type</code></td><td>string</td><td>yes</td><td>—</td><td><code>document</code> | <code>exDoc</code> | <code>jira</code> | <code>figma</code> | <code>confluence</code> | <code>code</code> | <code>prompt</code></td></tr>
            <tr><td><code>reference</code></td><td>string | null</td><td>conditional</td><td><code>null</code></td><td>URL / path / document id (required for <code>document</code>, <code>jira</code>, <code>figma</code>, <code>confluence</code>, <code>code</code>)</td></tr>
            <tr><td><code>input_text</code></td><td>string | null</td><td>conditional</td><td><code>null</code></td><td>Full content (required for <code>exDoc</code>, <code>prompt</code>, <code>code</code>)</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with created citation details.</p>

      <h2 id="architecture-graph">4. Architecture Graph</h2>
      <p>8 fixed layers: <code>UserExperience</code>, <code>ApiGateway</code>, <code>ObservabilityMonitoring</code>, <code>Agents</code>, <code>Services</code>, <code>EventQueue</code>, <code>DataLake</code>, <code>Infrastructure</code>.</p>

      <h3 id="get-all-architecture-graph">Get_All_architecture_Graph</h3>
      <p>Returns the complete architecture graph for a project.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Full architecture graph as JSON.</p>

      <h3 id="get-architecture-nodes-by-label">Get_Architecture_Nodes_By_Label</h3>
      <p>Filter the architecture graph by a single layer.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td>One of the 8 architecture layers</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Matching architecture nodes as JSON.</p>

      <h3 id="create-architecture-node">Create_Architecture_Node</h3>
      <p>Create a node in a specified architecture layer. <code>data</code> keys vary by label — <code>name</code> is always required, everything else is optional.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td>One of the 8 architecture layers</td></tr>
            <tr><td><code>data</code></td><td>object</td><td>yes</td><td>—</td><td>Layer-specific payload (see below). <code>level</code> is a number (e.g. 1, 2), not a string like &quot;L1&quot;.</td></tr>
            <tr><td><code>citation_ids</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Existing citation IDs to link</td></tr>
            <tr><td><code>citations</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Citation objects to create + link</td></tr>
            <tr><td><code>llm_platform</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Embedding-platform override</td></tr>
          </tbody>
        </table>
      </div>
      <p><code>data</code> fields by label (all optional except <code>name</code>):</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Label</th><th>Distinctive keys</th></tr></thead>
          <tbody>
            <tr><td>UserExperience</td><td>name, level, category, protocols[], technologies[], pattern[], emits_events, metrics[], description, repository_url, code_ontology_id, access_url, deployment, scenario[]</td></tr>
            <tr><td>ApiGateway</td><td>name, level, category, pattern[], protocols[], technologies[], capabilities[], auth_methods[], rate_limit, emits_events, metrics[], description, repository_url, code_ontology_id, access_url, deployment, scenario[]</td></tr>
            <tr><td>ObservabilityMonitoring</td><td>name, level, category, pattern[], technologies[], alert_channels[], pillers[], emits_events, metrics[], self_monitored, description, access_url, deployment</td></tr>
            <tr><td>Agents</td><td>name, level, category, pattern[], technologies[], model_backend, tools_available[], emits_events, metrics[], description, access_url, protocols[], deployment</td></tr>
            <tr><td>Services</td><td>name, level, category, pattern[], technologies[], emits_events, domain[], deployment, protocols[], metrics[], description, repository_url, code_ontology_id, access_url, scenario[]</td></tr>
            <tr><td>EventQueue</td><td>name, level, category, pattern[], technologies[], protocols[], emits_events, metrics[], description, access_url, deployment</td></tr>
            <tr><td>DataLake</td><td>name, level, category, pattern[], technologies[], model_type, vector_db, emits_events, metrics[], description, access_url, deployment</td></tr>
            <tr><td>Infrastructure</td><td>name, level, category, pattern[], technologies[], cloud_provider, regions[], deployment_model, node_count, cpu_cores_total, storage_pb, scalability, backup_frequency, emits_events, metrics[], description</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with created node details.</p>

      <h3 id="update-architecture-node">Update_Architecture_Node</h3>
      <p>Update an existing architecture node. All <code>data</code> keys are optional on update — send only what you want to change.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td>One of the 8 architecture layers</td></tr>
            <tr><td><code>node_id</code></td><td>string</td><td>yes</td><td>—</td><td>ID of the node to update</td></tr>
            <tr><td><code>data</code></td><td>object</td><td>yes</td><td>—</td><td>Partial update payload (same shape as create)</td></tr>
            <tr><td><code>citation_ids</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Citation IDs to link</td></tr>
            <tr><td><code>citations</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Citation objects to create + link</td></tr>
            <tr><td><code>llm_platform</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Embedding-platform override</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with updated node details.</p>

      <h3 id="delete-architecture-node">Delete_Architecture_Node</h3>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td>One of the 8 architecture layers</td></tr>
            <tr><td><code>node_id</code></td><td>string</td><td>yes</td><td>—</td><td>ID of the node to delete</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with deleted node details.</p>

      <h3 id="architecture-graph-search">Architecture_Graph_Search</h3>
      <p>Semantic search across architecture nodes AND the DDL nodes attached to each DataLake (DDLTable, DDLColumn, DDLConstraint, DDLIndex, DDLView, DDLSequence, DDLProcedure).</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>query</code></td><td>string</td><td>yes</td><td>—</td><td>Natural-language query</td></tr>
            <tr><td><code>include_labels</code></td><td>string[] | null</td><td>no</td><td><code>null</code></td><td>Restrict to one or more architecture / DDL labels</td></tr>
            <tr><td><code>threshold</code></td><td>number | null</td><td>no</td><td><code>null</code></td><td>Similarity cutoff 0.0–1.0</td></tr>
            <tr><td><code>llm_platform</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Embedding-platform override</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Matching entities with relevance ranking.</p>

      <h2 id="design-graph">5. Design Graph</h2>
      <p>Atomic-design model: <code>UserJourney → Flow → Page → Component</code>. Component types: <code>ATOM</code>, <code>MOLECULE</code>, <code>ORGANISM</code>, <code>TEMPLATE</code>.</p>

      <h3 id="design-graph-search">Design_Graph_Search</h3>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>query</code></td><td>string</td><td>yes</td><td>—</td><td>Natural-language query</td></tr>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>100</code></td><td>Max results</td></tr>
            <tr><td><code>include_labels</code></td><td>string[] | null</td><td>no</td><td><code>null</code></td><td><code>UserJourney</code> | <code>Flow</code> | <code>Page</code> | <code>Component</code></td></tr>
            <tr><td><code>threshold</code></td><td>number | null</td><td>no</td><td><code>null</code></td><td>Similarity cutoff 0.0–1.0</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Matching design entities with relevance ranking.</p>

      <h3 id="get-all-design-by-label">Get_all_Design_By_Label</h3>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td><code>UserJourney</code> | <code>Flow</code> | <code>Page</code> | <code>Component</code>. Must be passed as <code>label</code> (not <code>parameters0_Value</code>).</td></tr>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>100</code></td><td>Max results</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Design nodes with id, name, description.</p>

      <h3 id="get-design-nodes-by-ids">Get_Design_Nodes_by_Ids</h3>
      <p>Filter design nodes by IDs or parent relationships using a query string.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td><code>UserJourney</code> | <code>Flow</code> | <code>Page</code> | <code>Component</code></td></tr>
            <tr><td><code>query_params</code></td><td>string</td><td>yes</td><td>—</td><td>URL-style query (see examples below)</td></tr>
          </tbody>
        </table>
      </div>
      <p><code>query_params</code> examples:</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Goal</th><th>Query string</th></tr></thead>
          <tbody>
            <tr><td>Get by IDs</td><td><code>id=uj-123&amp;id=uj-456</code></td></tr>
            <tr><td>Flows under a UserJourney</td><td><code>userJourneyId=uj-123</code></td></tr>
            <tr><td>Pages under a Flow</td><td><code>flowId=flow-123</code></td></tr>
            <tr><td>Components under a Page</td><td><code>pageId=page-123</code></td></tr>
            <tr><td>Components under a parent Component</td><td><code>parentComponentId=comp-123</code></td></tr>
            <tr><td>Components by atomic type</td><td><code>type=ORGANISM</code> (or <code>MOLECULE</code>, <code>ATOM</code>, <code>TEMPLATE</code>)</td></tr>
            <tr><td>Pages by pageType</td><td><code>pageType=form</code> (or <code>list</code>, <code>dashboard</code>)</td></tr>
            <tr><td>Flows by modality</td><td><code>modality=web</code> (or <code>mobile</code>, <code>api</code>)</td></tr>
            <tr><td>Combine filters</td><td><code>pageId=page-123&amp;type=ORGANISM</code></td></tr>
            <tr><td>Pagination + sort</td><td><code>page=1&amp;limit=50&amp;sortName=name&amp;sortOrder=asc</code></td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Matching design nodes.</p>

      <h3 id="update-design-node">Update_Design_Node</h3>
      <p>Update an existing design node. Data structure varies by label.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td><code>UserJourney</code> | <code>Flow</code> | <code>Page</code> | <code>Component</code></td></tr>
            <tr><td><code>node_id</code></td><td>string</td><td>yes</td><td>—</td><td>ID of the node to update</td></tr>
            <tr><td><code>data</code></td><td>object</td><td>yes</td><td>—</td><td>Updated node payload</td></tr>
            <tr><td><code>citation_ids</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Citation IDs to link</td></tr>
            <tr><td><code>citations</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Citation objects to create + link</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with updated node details.</p>

      <h3 id="bulk-update-design-nodes">Bulk_Update_Design_Nodes</h3>
      <p>Bulk-upsert an entire UserJourney tree (flows, pages, components) in one call.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>data</code></td><td>object</td><td>yes</td><td>—</td><td>Top-level <code>{`{ "userJourneys": [...] }`}</code> tree</td></tr>
          </tbody>
        </table>
      </div>
      <p><code>data</code> shape (abbreviated):</p>
      <pre className="doc-pre">{`{
  "userJourneys": [
    {
      "name": "User Registration Journey",
      "description": "End-to-end registration flow",
      "scenarioId": "scenario-uuid",
      "flows": [
        {
          "name": "Sign Up Flow",
          "modality": "WEB",
          "entryPoint": "page-id-1",
          "exitPoint": "page-id-3",
          "stepIds": ["step-uuid-1", "step-uuid-2"],
          "pages": [
            {
              "name": "Registration Page",
              "pageType": "form",
              "requiresAuth": false,
              "stepIds": ["step-uuid-1"],
              "components": [
                {
                  "name": "RegistrationForm",
                  "type": "ORGANISM",
                  "children": [
                    { "name": "EmailInput", "type": "ATOM" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}`}</pre>
      <p><b>Returns:</b> Confirmation with upsert summary.</p>

      <h3 id="delete-design-node">Delete_Design_Node</h3>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td><code>UserJourney</code> | <code>Flow</code> | <code>Page</code> | <code>Component</code></td></tr>
            <tr><td><code>node_id</code></td><td>string</td><td>yes</td><td>—</td><td>ID of the node to delete</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Confirmation with deleted node details.</p>

      <h2 id="code-graph">6. Code Graph</h2>

      <h3 id="call-list-repositories">Call_List_Repositories_</h3>
      <p>List repositories (code ontologies) onboarded into a Breeze project&apos;s code graph. Use before any repo-scoped operation.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>projectUuid</code></td><td>string</td><td>yes</td><td>—</td><td>Breeze project UUID</td></tr>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>50</code></td><td>Repos per page</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> <code>{`{ data: Repo[], total }`}</code> — each <code>Repo</code> has <code>_id</code>, <code>name</code>, <code>repoUrl</code>, <code>status</code>, <code>fileCount</code>, <code>languages</code>.</p>

      <h3 id="code-graph-search">Code_Graph_Search</h3>
      <p>Semantic search across File, Function, and Class nodes in the code ontology. Returns ranked results with source code, call chains, file paths, line numbers, and dependency metadata.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>project_uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID (note: <code>project_uuid</code>, not <code>uuid</code>)</td></tr>
            <tr><td><code>query</code></td><td>string</td><td>yes</td><td>—</td><td>Natural-language query</td></tr>
            <tr><td><code>page</code></td><td>integer</td><td>no</td><td><code>1</code></td><td>Page number</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>10</code></td><td>Max results</td></tr>
            <tr><td><code>code_ontology_id</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Restrict to a specific code ontology</td></tr>
            <tr><td><code>repository_name</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Restrict to a specific repository</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Matching File / Function / Class entities with relevance ranking.</p>

      <h3 id="get-code-file-details">Get_Code_File_Details</h3>
      <p>Drill into one file (returned by <code>Code_Graph_Search</code>) to get its full hierarchical structure: classes with methods and statements, standalone functions, file-level statements, decorators.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>file_id</code></td><td>string</td><td>yes</td><td>—</td><td>File ID or file path</td></tr>
            <tr><td><code>project_uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>code_ontology_id</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Restrict to a specific code ontology</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Full file structure including classes, methods, functions, and statements.</p>

      <h2 id="db-schema-graph">7. DB Schema Graph</h2>
      <p>Sibling to the architecture DataLake layer. Tables, columns, constraints, indexes, views, sequences, procedures. Most create tools require the parent <code>data_lake_id</code> or, for column/constraint/index, the parent <code>table_id</code> returned by <code>Create_DB_Schema_Table</code>.</p>

      <h3 id="create-db-schema-table">Create_DB_Schema_Table</h3>
      <p>Top-level table under a DataLake. Returns the <code>table_id</code> you need for subsequent column / constraint / index calls.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>project_uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>data_lake_id</code></td><td>string</td><td>yes</td><td>—</td><td>Owning DataLake architecture node id</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>yes</td><td>—</td><td>Table name</td></tr>
            <tr><td><code>schema</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>SQL schema (<code>PUBLIC</code>, <code>HR</code>, …)</td></tr>
            <tr><td><code>table_type</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td><code>table</code> | <code>view</code> | <code>materialized_view</code> | <code>temporary</code></td></tr>
            <tr><td><code>comment</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Free-text description</td></tr>
            <tr><td><code>ddl_text</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Original <code>CREATE TABLE</code> statement</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Created table including <code>id</code>.</p>

      <h3 id="create-db-schema-column">Create_DB_Schema_Column</h3>
      <p>Add a column to an existing table.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>table_id</code></td><td>string</td><td>yes</td><td>—</td><td>Parent table id</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>yes</td><td>—</td><td>Column name</td></tr>
            <tr><td><code>data_type</code></td><td>string</td><td>yes</td><td>—</td><td>SQL data type (<code>VARCHAR</code>, <code>INTEGER</code>, <code>TIMESTAMP</code>, …)</td></tr>
            <tr><td><code>ordinal_position</code></td><td>integer</td><td>yes</td><td>—</td><td>1-based position (minimum 1)</td></tr>
            <tr><td><code>nullable</code></td><td>boolean</td><td>yes</td><td>—</td><td>Whether the column allows NULL</td></tr>
            <tr><td><code>length</code></td><td>integer | null</td><td>no</td><td><code>null</code></td><td>Length for variable-length types (<code>VARCHAR(N)</code>)</td></tr>
            <tr><td><code>precision</code></td><td>integer | null</td><td>no</td><td><code>null</code></td><td>Precision for numeric types</td></tr>
            <tr><td><code>scale</code></td><td>integer | null</td><td>no</td><td><code>null</code></td><td>Scale for numeric types</td></tr>
            <tr><td><code>char_semantics</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td><code>BYTE</code> | <code>CHAR</code> for char types</td></tr>
            <tr><td><code>default_value</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>SQL default expression</td></tr>
            <tr><td><code>is_primary_key</code></td><td>boolean | null</td><td>no</td><td><code>null</code></td><td>Mark as PK</td></tr>
            <tr><td><code>is_foreign_key</code></td><td>boolean | null</td><td>no</td><td><code>null</code></td><td>Mark as FK</td></tr>
            <tr><td><code>is_unique</code></td><td>boolean | null</td><td>no</td><td><code>null</code></td><td>Mark as UNIQUE</td></tr>
            <tr><td><code>is_indexed</code></td><td>boolean | null</td><td>no</td><td><code>null</code></td><td>Mark as indexed</td></tr>
            <tr><td><code>check_expression</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Raw CHECK expression</td></tr>
            <tr><td><code>comment</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Free-text description</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Created column details.</p>

      <h3 id="create-db-schema-constraint">Create_DB_Schema_Constraint</h3>
      <p>Add a constraint to an existing table. For <code>FOREIGN_KEY</code>, the constraint node is created but the cross-table REFERENCES edge is only built via DDL stream-ingest (no target-table input here).</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>table_id</code></td><td>string</td><td>yes</td><td>—</td><td>Parent table id</td></tr>
            <tr><td><code>constraint_type</code></td><td>string</td><td>yes</td><td>—</td><td><code>PRIMARY_KEY</code> | <code>FOREIGN_KEY</code> | <code>UNIQUE</code> | <code>CHECK</code></td></tr>
            <tr><td><code>columns</code></td><td>string[]</td><td>yes</td><td>—</td><td>Column names participating in the constraint (min 1)</td></tr>
            <tr><td><code>name</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Constraint name</td></tr>
            <tr><td><code>on_delete</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>For <code>FOREIGN_KEY</code>: <code>CASCADE</code> | <code>SET NULL</code> | <code>RESTRICT</code></td></tr>
            <tr><td><code>check_expression</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>For <code>CHECK</code>: raw CHECK expression</td></tr>
            <tr><td><code>enabled</code></td><td>boolean | null</td><td>no</td><td><code>null</code></td><td>Whether the constraint is enabled</td></tr>
            <tr><td><code>validated</code></td><td>boolean | null</td><td>no</td><td><code>null</code></td><td>Whether validated against existing rows</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Created constraint details.</p>

      <h3 id="create-db-schema-index">Create_DB_Schema_Index</h3>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>table_id</code></td><td>string</td><td>yes</td><td>—</td><td>Parent table id</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>yes</td><td>—</td><td>Index name</td></tr>
            <tr><td><code>columns</code></td><td>string[]</td><td>yes</td><td>—</td><td>Column names covered (min 1)</td></tr>
            <tr><td><code>is_unique</code></td><td>boolean</td><td>yes</td><td>—</td><td>Whether the index enforces uniqueness</td></tr>
            <tr><td><code>index_type</code></td><td>string</td><td>yes</td><td>—</td><td><code>BTREE</code> | <code>BITMAP</code> | <code>FUNCTION_BASED</code> | <code>DOMAIN</code></td></tr>
            <tr><td><code>where_clause</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Partial-index predicate (e.g. <code>status = &apos;active&apos;</code>)</td></tr>
            <tr><td><code>tablespace</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Tablespace</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Created index details.</p>

      <h3 id="create-db-schema-view">Create_DB_Schema_View</h3>
      <p>Views and materialized views are siblings of tables under a DataLake. Idempotent on <code>(name, dbOntologyId)</code>.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>project_uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>data_lake_id</code></td><td>string</td><td>yes</td><td>—</td><td>Owning DataLake node id</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>yes</td><td>—</td><td>View name</td></tr>
            <tr><td><code>view_type</code></td><td>string</td><td>yes</td><td>—</td><td><code>view</code> | <code>materialized_view</code></td></tr>
            <tr><td><code>repository_name</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Source repository name</td></tr>
            <tr><td><code>schema</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>SQL schema</td></tr>
            <tr><td><code>definition</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>View body SQL (truncated to 1000 chars on storage)</td></tr>
            <tr><td><code>columns</code></td><td>string[] | null</td><td>no</td><td><code>null</code></td><td>Names of exposed columns</td></tr>
            <tr><td><code>comment</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Free-text description</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Created view details.</p>

      <h3 id="create-db-schema-sequence">Create_DB_Schema_Sequence</h3>
      <p>Idempotent on <code>(name, dbOntologyId)</code>.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>project_uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>data_lake_id</code></td><td>string</td><td>yes</td><td>—</td><td>Owning DataLake node id</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>yes</td><td>—</td><td>Sequence name</td></tr>
            <tr><td><code>repository_name</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Source repository name</td></tr>
            <tr><td><code>schema</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>SQL schema</td></tr>
            <tr><td><code>full_name</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Fully-qualified identifier; defaults to <code>{`\${schema}.\${name}`}</code></td></tr>
            <tr><td><code>table_id</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Owning DDLTable id (e.g. for SERIAL/IDENTITY)</td></tr>
            <tr><td><code>start_with</code></td><td>integer | null</td><td>no</td><td><code>null</code></td><td>Initial value</td></tr>
            <tr><td><code>increment_by</code></td><td>integer | null</td><td>no</td><td><code>null</code></td><td>Step between values</td></tr>
            <tr><td><code>min_value</code></td><td>integer | null</td><td>no</td><td><code>null</code></td><td>Minimum value</td></tr>
            <tr><td><code>max_value</code></td><td>integer | null</td><td>no</td><td><code>null</code></td><td>Maximum value</td></tr>
            <tr><td><code>cache</code></td><td>integer | null</td><td>no</td><td><code>null</code></td><td>Pre-allocated values</td></tr>
            <tr><td><code>cycle</code></td><td>boolean | null</td><td>no</td><td><code>null</code></td><td>Wrap around at max_value</td></tr>
            <tr><td><code>order</code></td><td>boolean | null</td><td>no</td><td><code>null</code></td><td>Guarantee ordered issuance</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Created sequence details.</p>

      <h3 id="create-db-schema-procedure">Create_DB_Schema_Procedure</h3>
      <p>Procedures, functions, and triggers all use this tool. <code>parameters</code> is persisted as a JSON string on the node.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>project_uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>data_lake_id</code></td><td>string</td><td>yes</td><td>—</td><td>Owning DataLake node id</td></tr>
            <tr><td><code>name</code></td><td>string</td><td>yes</td><td>—</td><td>Procedure / function / trigger name</td></tr>
            <tr><td><code>procedure_type</code></td><td>string</td><td>yes</td><td>—</td><td><code>procedure</code> | <code>function</code> | <code>trigger</code></td></tr>
            <tr><td><code>repository_name</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Source repository name</td></tr>
            <tr><td><code>schema</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>SQL schema</td></tr>
            <tr><td><code>parameters</code></td><td>array | null</td><td>no</td><td><code>null</code></td><td>Parameter descriptors (strings or objects); persisted as JSON</td></tr>
            <tr><td><code>return_type</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>SQL return type (functions only)</td></tr>
            <tr><td><code>body</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Procedure body (truncated to 1000 chars on storage)</td></tr>
            <tr><td><code>comment</code></td><td>string | null</td><td>no</td><td><code>null</code></td><td>Free-text description</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Created procedure details.</p>

      <h3 id="update-db-schema-node">Update_DB_Schema_Node</h3>
      <p>Update any DB schema entity by id. <code>data</code> uses camelCase keys (<code>tableType</code>, <code>dataType</code>, <code>isUnique</code>, …) — every field is optional on update. Renaming a <code>table</code> cascades the new name onto child columns / constraints / indexes and inbound FK references in the same DataLake.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td><code>table</code> | <code>column</code> | <code>constraint</code> | <code>index</code> | <code>view</code> | <code>sequence</code> | <code>procedure</code></td></tr>
            <tr><td><code>node_id</code></td><td>string</td><td>yes</td><td>—</td><td>Entity id</td></tr>
            <tr><td><code>data</code></td><td>object</td><td>yes</td><td>—</td><td>Partial update payload with camelCase keys</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Editable</b> <code>data</code> keys by label:</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Label</th><th>Keys</th></tr></thead>
          <tbody>
            <tr><td>table</td><td><code>name</code>, <code>schema</code>, <code>tableType</code>, <code>ddlText</code>, <code>comment</code></td></tr>
            <tr><td>column</td><td><code>name</code>, <code>dataType</code>, <code>ordinalPosition</code>, <code>length</code>, <code>precision</code>, <code>scale</code>, <code>charSemantics</code>, <code>nullable</code>, <code>defaultValue</code>, <code>checkExpression</code>, <code>comment</code></td></tr>
            <tr><td>constraint</td><td><code>name</code>, <code>constraintType</code>, <code>columns</code>, <code>onDelete</code>, <code>checkExpression</code>, <code>enabled</code>, <code>validated</code></td></tr>
            <tr><td>index</td><td><code>name</code>, <code>columns</code>, <code>isUnique</code>, <code>indexType</code>, <code>whereClause</code>, <code>tablespace</code></td></tr>
            <tr><td>view</td><td><code>name</code>, <code>schema</code>, <code>viewType</code>, <code>definition</code>, <code>columns</code>, <code>repositoryName</code>, <code>comment</code></td></tr>
            <tr><td>sequence</td><td><code>name</code>, <code>schema</code>, <code>fullName</code>, <code>tableId</code>, <code>startWith</code>, <code>incrementBy</code>, <code>minValue</code>, <code>maxValue</code>, <code>cache</code>, <code>cycle</code>, <code>order</code>, <code>repositoryName</code></td></tr>
            <tr><td>procedure</td><td><code>name</code>, <code>schema</code>, <code>procedureType</code>, <code>parameters</code>, <code>returnType</code>, <code>body</code>, <code>repositoryName</code>, <code>comment</code></td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Updated entity details.</p>

      <h3 id="delete-db-schema-node">Delete_DB_Schema_Node</h3>
      <p>Deleting a table cascades to its columns, constraints, indexes, and drops inbound FK constraints from sibling tables. Deleting a column cascades any constraint or index that names it.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td><code>table</code> | <code>column</code> | <code>constraint</code> | <code>index</code> | <code>view</code> | <code>sequence</code> | <code>procedure</code></td></tr>
            <tr><td><code>node_id</code></td><td>string</td><td>yes</td><td>—</td><td>Entity id</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Deleted entity details.</p>

      <h3 id="get-db-schema-nodes-by-label">Get_DB_Schema_Nodes_By_Label</h3>
      <p>List all DB schema entities of one label under a DataLake.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>data_lake_id</code></td><td>string</td><td>yes</td><td>—</td><td>Owning DataLake node id</td></tr>
            <tr><td><code>label</code></td><td>string</td><td>yes</td><td>—</td><td><code>table</code> | <code>column</code> | <code>constraint</code> | <code>index</code> | <code>view</code> | <code>sequence</code> | <code>procedure</code></td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Matching nodes as JSON.</p>

      <h2 id="documents-health">8. Documents &amp; Health</h2>

      <h3 id="documents">Documents</h3>
      <p>SECONDARY SOURCE — do NOT use as the first tool for any question. Always try <code>Functional_Graph_Search</code> and the hierarchy tools first. Use this only when you need raw requirement text, exact formulas, threshold values, regulatory language, or detail the functional graph doesn&apos;t capture.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>uuid</code></td><td>string</td><td>yes</td><td>—</td><td>Project UUID</td></tr>
            <tr><td><code>query</code></td><td>string</td><td>yes</td><td>—</td><td>Natural-language query about a business rule, formula, or domain concept</td></tr>
            <tr><td><code>limit</code></td><td>integer</td><td>no</td><td><code>10</code></td><td>Max results</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Ranked text passages from source documents with document source, matched text content, and relevance ordering.</p>

      <h3 id="check-metrics">check_metrics</h3>
      <p>Fetches server-side health and rate-limit metrics from the external Breeze server.</p>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Param</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>url</code></td><td>string | null</td><td>no</td><td>env <code>MCP_BREEZE_API_BASE_URL</code></td><td>Full URL of the external Breeze server</td></tr>
          </tbody>
        </table>
      </div>
      <p><b>Returns:</b> Human-readable metrics string.</p>

      <h2 id="cross-reference">Cross-Reference</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Looking for…</th><th>See</th></tr></thead>
          <tbody>
            <tr><td>Conceptual overview, setup, why the plugin exists</td><td><Link href="/user-guide/mcp/">2. MCP Integration</Link></td></tr>
            <tr><td>Per-skill detailed reference (the 18 <code>/breeze:*</code> commands)</td><td><Link href="/user-guide/skills/"><b>2.2 Skills Reference</b></Link> (sibling page)</td></tr>
            <tr><td>Curated recipes that compose these tools</td><td><Link href="/user-guide/cookbook/">Cookbook → Building the Graphs</Link></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
