import GraphCanvas from './GraphCanvas'

// MCP tool groups, one per ontology layer — real tool names from the breeze-mcp server.
const TOOL_GROUPS = [
  { layer: 'Functional', color: 'var(--indigo)', tools: ['Functional_Graph_Search', 'Get_complete_functional_graph', 'Get_all_personas'] },
  { layer: 'Architecture', color: 'var(--teal)', tools: ['Architecture_Graph_Search', 'Get_All_architecture_Graph'] },
  { layer: 'Design', color: 'var(--green)', tools: ['Design_Graph_Search', 'Get_all_Design_By_Label'] },
  { layer: 'Code', color: 'var(--amber)', tools: ['Code_Graph_Search', 'Get_Code_File_Details', 'Call_List_Repositories_'] },
]

type Row = { m: 'new' | 'mod' | 'keep'; type: string; name: string }
const LAYERS: { name: string; color: string; rows: Row[] }[] = [
  { name: 'Functional', color: 'var(--indigo)', rows: [
    { m: 'mod', type: 'Outcome', name: 'Manage Bid Tracker (US)' },
    { m: 'new', type: 'Scenario', name: 'Capture / edit / delete a bid quote' },
    { m: 'mod', type: 'Action', name: 'Confirm project move → POST …/detail/create' },
  ]},
  { name: 'Design', color: 'var(--green)', rows: [
    { m: 'new', type: 'Component', name: 'QuoteModal (form + PDF dropzone)' },
    { m: 'new', type: 'Component', name: 'MyQuotePanel (detail sidebar)' },
    { m: 'mod', type: 'Component', name: 'TrackerCardUS (value chip + status badge)' },
  ]},
  { name: 'Code', color: 'var(--amber)', rows: [
    { m: 'new', type: 'backend', name: 'src/bid-quote/*: new NestJS module' },
    { m: 'new', type: 'backend', name: 's3-storage.service.ts: presigned PUT/GET' },
    { m: 'mod', type: 'frontend', name: 'ProjectTrackerUS/index.tsx: open modal on move' },
  ]},
  { name: 'Architecture', color: 'var(--teal)', rows: [
    { m: 'new', type: 'DataLake', name: 'Object store for quote PDFs (net-new)' },
    { m: 'mod', type: 'Services', name: 'global_tnlm (bid-quote + status hooks)' },
    { m: 'mod', type: 'DataLake', name: 'ES pipeline index: denormalized quote' },
  ]},
  { name: 'Data', color: 'var(--fg-2)', rows: [
    { m: 'new', type: 'CREATE', name: 'TRX_TNLM.BID_QUOTE (table + FK + sequence)' },
    { m: 'keep', type: 'FK', name: 'ON DELETE on PROJECT_PIPELINE_DETAIL (decide)' },
  ]},
]

const MARK = { new: { s: '+', cls: 'impact-mark--new' }, mod: { s: '~', cls: 'impact-mark--mod' }, keep: { s: '✓', cls: 'impact-mark--keep' } }

function Report({ rowsPerLayer = 99 }: { rowsPerLayer?: number }) {
  return (
    <div className="impact-report">
      <div className="impact-report__bar">
        <span className="code-block__dot" style={{ background: '#ff5f57' }} />
        <span className="code-block__dot" style={{ background: '#febc2e' }} />
        <span className="code-block__dot" style={{ background: '#28c840' }} />
        <span className="impact-report__barlabel">breeze impact-analysis · generated</span>
      </div>
      <div className="impact-report__body">
        <div className="impact-report__title">Breeze Impact Analysis</div>
        <div className="impact-report__meta">
          <span><b>Ticket</b> LMV2-101: Capture &amp; Track Submitted Bid / Quote Details</span>
          <span><b>Project</b> Lead Manager V2</span>
        </div>

        <div className="impact-verdict">
          <span className="verdict-pill verdict-pill--warn">Blast radius&nbsp;<b>MEDIUM</b></span>
          <span className="verdict-pill verdict-pill--risk">Risk&nbsp;<b>High</b></span>
          <span className="verdict-pill verdict-pill--ddl">DDL&nbsp;<b>🟡 V2 WORK</b></span>
        </div>

        <p className="impact-report__summary">Adds a <b>Bid Quote</b> record (amount, dates, status, attached PDF) to a tracked project, surfaced on the tracker card, the Project Detail sidebar, and the existing folder-move flow. Spans <b>3 repos</b>; the headline risk is a <b>net-new PDF object-storage path</b> V2 has no infrastructure for today.</p>

        {LAYERS.map((l) => (
          <div key={l.name} className="impact-layer" style={{ borderLeftColor: l.color } as React.CSSProperties}>
            <div className="impact-layer__name" style={{ color: l.color }}>{l.name} layer</div>
            {l.rows.slice(0, rowsPerLayer).map((r) => (
              <div key={r.name} className="impact-row">
                <span className={`impact-mark ${MARK[r.m].cls}`}>{MARK[r.m].s}</span>
                <span className="impact-row__type">{r.type}</span>
                <span className="impact-row__name">{r.name}</span>
              </div>
            ))}
          </div>
        ))}

        <div className="impact-legend">
          <span><span className="impact-mark impact-mark--new">+</span> new</span>
          <span><span className="impact-mark impact-mark--mod">~</span> modified</span>
          <span><span className="impact-mark impact-mark--keep">✓</span> existing</span>
        </div>
        <div className="impact-report__foot">6 open questions · 14 QA cases · 9 sliced tickets · multi-service deploy order</div>
      </div>
    </div>
  )
}

function ToolGroups({ oneTool = false }: { oneTool?: boolean }) {
  return (
    <div className="impact-tools">
      <div className="impact-tools__label">MCP tools query every layer</div>
      {TOOL_GROUPS.map((g) => (
        <div key={g.layer} className="impact-tool" style={{ borderLeftColor: g.color } as React.CSSProperties}>
          <div className="impact-tool__name"><span className="impact-tool__dot" style={{ background: g.color }} />{g.layer} tools</div>
          <div className="impact-tool__list">
            {(oneTool ? g.tools.slice(0, 1) : g.tools).map((t) => <code key={t} className="impact-tool__chip">{t}</code>)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ImpactDemo({ compact = false }: { compact?: boolean }) {
  // Compact = hero variant: graph + tools on top, report beneath, all in one column.
  if (compact) {
    return (
      <div className="impact-hero">
        <div className="impact-hero__source">
          <div className="impact-hero__graph">
            <GraphCanvas />
            <span className="impact-graph__tag">One connected graph</span>
          </div>
          <ToolGroups oneTool />
        </div>
        <Report rowsPerLayer={2} />
      </div>
    )
  }

  // Full section variant: graph + tools on the left, full report on the right.
  return (
    <div className="impact-grid">
      <div className="impact-engine">
        <div className="impact-graph">
          <GraphCanvas />
          <span className="impact-graph__tag">One connected graph</span>
        </div>
        <ToolGroups />
      </div>
      <Report />
    </div>
  )
}
