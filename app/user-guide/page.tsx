import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Using Breeze.AI — User Guide' }

export default function Introduction() {
  return (
    <section className="docs-section">
      <h1>Using Breeze.AI</h1>
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
      <p>By the time a regulator, customer, or new joiner asks <em>&ldquo;why does this code exist?&rdquo;</em>, the answer requires a tribal-knowledge tour. Documentation rots; tickets fall out of sync; impact analysis becomes guesswork.</p>
      <p>Breeze keeps the chain intact by storing every artefact as a node in one graph — queryable by humans (Web UI), by LLM agents (chat), or by your IDE (Claude Code skills + MCP).</p>

      <h2 id="who-uses">Who uses Breeze.AI?</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead><tr><th>Persona</th><th>Why they care</th></tr></thead>
          <tbody>
            <tr><td><strong>Product Managers</strong></td><td>Capture requirements once; the graph keeps them in sync with what&apos;s actually shipped.</td></tr>
            <tr><td><strong>Architects</strong></td><td>Map every requirement onto a layered system blueprint; impact-analyze before changes.</td></tr>
            <tr><td><strong>Engineers</strong></td><td>Generate code &amp; tests from the functional graph; reverse-engineer brownfield repos into the code graph.</td></tr>
            <tr><td><strong>Designers</strong></td><td>Keep the design system aligned with the running UI; flag deviations between Figma and shipped components.</td></tr>
            <tr><td><strong>Compliance / Audit</strong></td><td>Trace any line of code back to the requirement, ticket, or document that justified it.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
