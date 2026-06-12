'use client'
import { useEffect, useState } from 'react'

const OUTPUTS = ['Impact analysis', 'Reverse engineering', 'Spec generation', 'Documentation', 'Code generation']

function Card({ i }: { i: number }) {
  if (i === 0) return (
    <>
      <div className="flow-report__head"><span className="flow-report__dot" />Impact Analysis Report</div>
      <div className="flow-report__risk">Impact&nbsp;<b>High Risk</b></div>
      <dl className="flow-report__rows">
        <div><dt>Affected files</dt><dd>14 · 3 repos</dd></div>
        <div><dt>Jira ticket</dt><dd>LMV2-101</dd></div>
        <div><dt>Blast zone</dt><dd>MEDIUM</dd></div>
        <div><dt>DDL verdict</dt><dd>🟡 V2 WORK</dd></div>
      </dl>
      <div className="flow-report__trace">
        <span className="flow-report__tracelabel">Traceability path</span>
        <code>Pay with card → PaymentService → charge.ts</code>
      </div>
    </>
  )
  if (i === 1) return (
    <>
      <div className="flow-report__head"><span className="flow-report__dot flow-report__dot--teal" />Reverse-Engineered Graph</div>
      <div className="flow-report__risk flow-report__risk--teal">From legacy code&nbsp;<b>→ functional graph</b></div>
      <dl className="flow-report__rows">
        <div><dt>Personas</dt><dd>12</dd></div>
        <div><dt>Outcomes</dt><dd>48</dd></div>
        <div><dt>Scenarios</dt><dd>156</dd></div>
        <div><dt>Components</dt><dd>89</dd></div>
      </dl>
      <div className="flow-report__trace">
        <span className="flow-report__tracelabel">Reconstructed hierarchy</span>
        <code>Persona → Outcome → Scenario → Step → Action</code>
      </div>
    </>
  )
  if (i === 2) return (
    <>
      <div className="flow-report__head"><span className="flow-report__dot flow-report__dot--amber" />Functional Spec: FRD</div>
      <div className="flow-report__risk flow-report__risk--amber">Export&nbsp;<b>Markdown · HTML</b></div>
      <ul className="flow-doclines">
        <li>1 · Overview &amp; personas</li>
        <li>2 · Outcomes &amp; scenarios (12)</li>
        <li>3 · Steps &amp; actions (84)</li>
        <li>4 · Acceptance criteria (37)</li>
      </ul>
    </>
  )
  if (i === 3) return (
    <>
      <div className="flow-report__head"><span className="flow-report__dot flow-report__dot--indigo" />Generated Documentation</div>
      <div className="flow-report__risk flow-report__risk--teal">Export&nbsp;<b>Markdown · Confluence</b></div>
      <ul className="flow-doclines">
        <li>Platform overview</li>
        <li>Architecture &amp; services</li>
        <li>API &amp; data reference</li>
        <li>Onboarding &amp; cookbook</li>
      </ul>
    </>
  )
  return (
    <>
      <div className="flow-report__head"><span className="flow-report__dot flow-report__dot--green" />Generated Code</div>
      <pre className="flow-code">{`// breeze: scenario b14fa26a
export async function captureBidQuote(
  dto: BidQuoteDto,
) {
  // ↳ PaymentService · charge.ts
  return quotes.create(dto);
}`}</pre>
      <div className="flow-report__trace">
        <span className="flow-report__tracelabel">with graph-node-ID citations</span>
      </div>
    </>
  )
}

export default function FlowOutputs() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % OUTPUTS.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <div className="flow-outputs">
        {OUTPUTS.map((o, i) => (
          <button key={o} type="button" className={`flow-out${i === active ? ' flow-out--active' : ''}`} onClick={() => setActive(i)}>{o}</button>
        ))}
      </div>
      <div className="flow-report" key={active}>
        <Card i={active} />
      </div>
    </>
  )
}
