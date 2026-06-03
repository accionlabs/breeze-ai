import GraphCanvas from './GraphCanvas'
import FlowOutputs from './FlowOutputs'

// Dark hero visual — the real pipeline:
// Sources (docs, repos from GitHub/Bitbucket, Jira, Confluence) → MCP tools ingest →
// Knowledge Graph → outputs (impact analysis, reverse engineering, spec/code generation).
const SOURCES: [string, string][] = [
  ['Documents', 'oklch(0.70 0.15 200)'],
  ['GitHub', 'oklch(0.78 0.02 280)'],
  ['Bitbucket', 'oklch(0.62 0.16 250)'],
  ['Jira', 'oklch(0.60 0.17 255)'],
  ['Confluence', 'oklch(0.64 0.14 235)'],
]

export default function ImpactFlow() {
  return (
    <div className="impact-flow">
      {/* sources */}
      <div className="flow-stage">
        <div className="flow-sources">
          {SOURCES.map(([label, color]) => (
            <span key={label} className="flow-src"><span className="flow-src__i" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />{label}</span>
          ))}
        </div>
        <span className="flow-cap">Sources</span>
      </div>

      <div className="flow-conn"><span className="flow-pulse" /></div>

      {/* MCP tools — ingestion engine */}
      <div className="flow-stage flow-stage--orb">
        <div className="flow-orb"><span>MCP</span></div>
        <span className="flow-cap">MCP tools ingest</span>
      </div>

      <div className="flow-conn"><span className="flow-pulse flow-pulse--2" /></div>

      {/* knowledge graph */}
      <div className="flow-stage">
        <div className="flow-graph">
          <GraphCanvas dark />
        </div>
        <span className="flow-cap">Knowledge graph</span>
      </div>

      <div className="flow-conn"><span className="flow-pulse flow-pulse--3" /></div>

      {/* outputs — auto-cycling capabilities, each with its own visual */}
      <div className="flow-stage flow-stage--report">
        <FlowOutputs />
        <span className="flow-cap">Outputs</span>
      </div>
    </div>
  )
}
