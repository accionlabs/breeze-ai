'use client'
import { useEffect, useRef } from 'react'

// Four ontology layers (intent → implementation), each a brand colour.
const COLORS = [
  'oklch(0.48 0.22 280)', // 0 Functional  — indigo
  'oklch(0.52 0.16 200)', // 1 Architecture — teal
  'oklch(0.48 0.17 155)', // 2 Design       — green
  'oklch(0.60 0.17 70)',  // 3 Code         — amber
]

// A real example: a checkout feature traced across all four layers.
// [label, layer, nx, ny]  — positions are normalised (0..1) within the canvas.
type Seed = [string, number, number, number]
const LABELLED: Seed[] = [
  ['Customer', 0, 0.16, 0.08],
  ['Complete checkout', 0, 0.48, 0.13],
  ['Pay with card', 0, 0.78, 0.08],
  ['View receipt', 0, 0.92, 0.19],
  ['API Gateway', 1, 0.14, 0.38],
  ['PaymentService', 1, 0.47, 0.34],
  ['OrderQueue', 1, 0.76, 0.40],
  ['Postgres', 1, 0.93, 0.48],
  ['CheckoutPage', 2, 0.15, 0.62],
  ['PaymentForm', 2, 0.45, 0.58],
  ['CardInput', 2, 0.73, 0.64],
  ['charge.ts', 3, 0.20, 0.86],
  ['captureIntent()', 3, 0.50, 0.91],
  ['OrderController', 3, 0.74, 0.85],
  ['payment.sql', 3, 0.93, 0.92],
]

// Traceability edges between labelled nodes (indices into LABELLED).
const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3],
  [1, 4], [2, 5], [0, 4],
  [4, 5], [5, 6], [6, 7],
  [1, 8], [2, 10], [5, 9],
  [8, 9], [9, 10],
  [10, 11], [9, 12], [5, 11],
  [6, 13], [7, 14],
  [11, 12], [13, 12], [11, 14],
]

export default function GraphCanvas({ dark = false }: { dark?: boolean } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el = canvas as HTMLCanvasElement
    const ctx = el.getContext('2d')!

    type Node = {
      label: string | null; layer: number; nx: number; ny: number; r: number; labelled: boolean
      bx: number; by: number; x: number; y: number            // base + live position
      ax: number; ay: number; sx: number; sy: number; ph: number; phy: number // drift params
    }
    let W = 0, H = 0, DPR = 1
    let nodes: Node[] = []
    let edges: { a: number; b: number; explicit: boolean }[] = []
    let pulses: { a: number; b: number; t: number; speed: number; c: string }[] = []
    let rafId = 0

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    function build() {
      const mk = (label: string | null, layer: number, nx: number, ny: number, r: number, big: boolean): Node => ({
        label, layer, nx, ny, r, labelled: big,
        bx: 0, by: 0, x: 0, y: 0,
        // labelled nodes drift a little less so their chips stay readable; filler nodes float more
        ax: big ? rand(9, 16) : rand(16, 30),
        ay: big ? rand(9, 16) : rand(16, 30),
        sx: rand(0.0006, 0.0013), sy: rand(0.0006, 0.0013),
        ph: rand(0, Math.PI * 2), phy: rand(0, Math.PI * 2),
      })
      nodes = LABELLED.map(([label, layer, nx, ny]) => mk(label, layer, nx, ny, 4.5, true))
      const BANDS = [[0.04, 0.24], [0.30, 0.50], [0.54, 0.72], [0.78, 0.98]]
      BANDS.forEach((band, layer) => {
        for (let i = 0; i < 5; i++) nodes.push(mk(null, layer, rand(0.08, 0.94), rand(band[0], band[1]), rand(1.8, 3), false))
      })
      project()
    }

    function project() {
      const padX = W * 0.06, usableW = W * 0.88
      const padY = H * 0.06, usableH = H * 0.88
      for (const n of nodes) { n.bx = padX + n.nx * usableW; n.by = padY + n.ny * usableH; n.x = n.bx; n.y = n.by }
      computeEdges()
    }

    // Edge topology is computed ONCE on base positions, so links don't flicker as nodes drift.
    function computeEdges() {
      edges = LINKS.map(([a, b]) => ({ a, b, explicit: true }))
      const seen = new Set(LINKS.map(([a, b]) => a + ':' + b))
      const maxD = Math.min(150, W * 0.2)
      const linked = new Array(nodes.length).fill(0)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (seen.has(i + ':' + j)) continue
          const d = Math.hypot(nodes[i].bx - nodes[j].bx, nodes[i].by - nodes[j].by)
          if (d < maxD) {
            edges.push({ a: i, b: j, explicit: false })
            if (++linked[i] > 3 && ++linked[j] > 3) break
          }
        }
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = el.clientWidth; H = el.clientHeight
      el.width = W * DPR; el.height = H * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      build()
    }

    // continuous gentle float — the whole graph stays in motion
    function setLive(t: number) {
      for (const n of nodes) {
        n.x = n.bx + Math.sin(t * n.sx + n.ph) * n.ax
        n.y = n.by + Math.cos(t * n.sy + n.phy) * n.ay
      }
    }

    function spawnPulse() {
      if (pulses.length > 7) return
      const [a, b] = LINKS[Math.floor(Math.random() * LINKS.length)]
      pulses.push({ a, b, t: 0, speed: rand(0.006, 0.012), c: COLORS[nodes[a].layer] })
    }

    function drawLabel(n: Node) {
      const right = n.nx > 0.62
      ctx.font = '600 11px ui-monospace, "JetBrains Mono", monospace'
      const tw = ctx.measureText(n.label!).width
      const padX = 7, gap = 9, chipH = 18
      const boxW = tw + padX * 2 + 12
      const bx = right ? n.x - gap - boxW : n.x + gap
      const by = n.y - chipH / 2
      ctx.fillStyle = 'rgba(255,255,255,0.82)'
      ctx.strokeStyle = 'rgba(17,17,17,0.08)'
      ctx.lineWidth = 1
      const r = 5
      ctx.beginPath()
      ctx.moveTo(bx + r, by)
      ctx.arcTo(bx + boxW, by, bx + boxW, by + chipH, r)
      ctx.arcTo(bx + boxW, by + chipH, bx, by + chipH, r)
      ctx.arcTo(bx, by + chipH, bx, by, r)
      ctx.arcTo(bx, by, bx + boxW, by, r)
      ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.fillStyle = COLORS[n.layer]
      ctx.beginPath(); ctx.arc(bx + padX + 3, by + chipH / 2, 3, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(17,17,17,0.82)'
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
      ctx.fillText(n.label!, bx + padX + 12, by + chipH / 2 + 0.5)
    }

    function drawScene(showLabels: boolean) {
      ctx.clearRect(0, 0, W, H)

      // edges — faint web; explicit traceability links a touch stronger
      ctx.lineWidth = 1
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b]
        ctx.strokeStyle = dark
          ? (e.explicit ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.12)')
          : (e.explicit ? 'rgba(17,17,17,0.16)' : 'rgba(17,17,17,0.08)')
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
      }

      // pulses along the traceability chain
      for (const p of pulses) {
        const a = nodes[p.a], b = nodes[p.b]
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2)
        ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 7; ctx.fill(); ctx.shadowBlur = 0
      }

      // nodes
      for (const n of nodes) {
        if (n.labelled) {
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2)
          ctx.fillStyle = `color-mix(in oklch, ${COLORS[n.layer]} 14%, transparent)`; ctx.fill()
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = COLORS[n.layer]
        if (n.labelled) { ctx.shadowColor = COLORS[n.layer]; ctx.shadowBlur = 8 }
        ctx.fill(); ctx.shadowBlur = 0
      }

      if (showLabels) for (const n of nodes) if (n.labelled) drawLabel(n)
    }

    let pTimer = 0, lastTs = 0
    function frame(ts: number) {
      const dt = Math.min(40, ts - lastTs) || 16; lastTs = ts
      setLive(ts)
      pTimer += dt
      if (pTimer > 340) { pTimer = 0; spawnPulse() }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed * (dt / 16)
        if (pulses[i].t >= 1) pulses.splice(i, 1)
      }
      drawScene(H > 420)
      rafId = requestAnimationFrame(frame)
    }

    function start() {
      resize()
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(frame)
    }

    let rt: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(rt); rt = setTimeout(start, 150) }
    const onVis = () => { if (document.hidden) cancelAnimationFrame(rafId); else rafId = requestAnimationFrame(frame) }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    start()
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  return <canvas ref={canvasRef} id="graph-canvas" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
