'use client'
import { useEffect, useRef } from 'react'

export default function GraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el = canvas as HTMLCanvasElement
    const ctx = el.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // four-layer brand colors on light background
    const SHADES = [
      'oklch(0.48 0.22 280)',  // indigo  — Functional
      'oklch(0.52 0.16 200)',  // teal    — Architecture
      'oklch(0.48 0.17 155)',  // green   — Design
      'oklch(0.60 0.17 70)',   // amber   — Code
    ]
    let W = 0, H = 0, DPR = 1
    let nodes: any[] = [], edges: any[] = [], pulses: any[] = []
    let rafId = 0

    function rand(a: number, b: number) { return a + Math.random() * (b - a) }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = el.clientWidth; H = el.clientHeight
      el.width = W * DPR; el.height = H * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      build()
    }

    function build() {
      const count = Math.max(18, Math.min(40, Math.round(W * H / 34000)))
      nodes = Array.from({ length: count }, (_, i) => ({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.14, 0.14), vy: rand(-0.14, 0.14),
        r: rand(2, 4.5),
        c: SHADES[i % SHADES.length],
        big: Math.random() < 0.15,
        ph: rand(0, Math.PI * 2),
      }))
      edges = []; pulses = []
    }

    function computeEdges() {
      edges = []
      const maxD = Math.min(200, W * 0.17)
      for (let i = 0; i < nodes.length; i++) {
        let linked = 0
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          if (d < maxD) { edges.push({ a: i, b: j, d }); if (++linked > 3) break }
        }
      }
    }

    function spawnPulse() {
      if (!edges.length || pulses.length > 6) return
      const e = edges[Math.floor(Math.random() * edges.length)]
      pulses.push({ a: e.a, b: e.b, t: 0, speed: rand(0.005, 0.012), c: nodes[e.a].c })
    }

    let last = 0, pTimer = 0
    function frame(ts: number) {
      const dt = Math.min(40, ts - last) || 16; last = ts
      ctx.clearRect(0, 0, W, H)
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20
        if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20
      }
      computeEdges()
      const maxD = Math.min(200, W * 0.17)
      for (const e of edges) {
        const alpha = (1 - e.d / maxD) * 0.12
        ctx.strokeStyle = `rgba(17,17,17,${alpha.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(nodes[e.a].x, nodes[e.a].y); ctx.lineTo(nodes[e.b].x, nodes[e.b].y); ctx.stroke()
      }
      pTimer += dt
      if (pTimer > 420) { pTimer = 0; spawnPulse() }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]; p.t += p.speed * (dt / 16)
        if (p.t >= 1) { pulses.splice(i, 1); continue }
        const a = nodes[p.a], b = nodes[p.b]
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0
      }
      const tsec = ts / 1000
      for (const n of nodes) {
        const tw = n.big ? 0.5 + 0.5 * Math.sin(tsec * 1.3 + n.ph) : 1
        if (n.big) {
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 5 + tw * 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(17,17,17,0.06)'; ctx.fill()
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = n.c
        if (n.big) { ctx.shadowColor = n.c; ctx.shadowBlur = 10 }
        ctx.fill(); ctx.shadowBlur = 0
      }
      rafId = requestAnimationFrame(frame)
    }

    function start() {
      resize()
      if (reduce) {
        computeEdges()
        ctx.clearRect(0, 0, W, H)
        for (const e of edges) { ctx.strokeStyle = 'rgba(17,17,17,0.08)'; ctx.beginPath(); ctx.moveTo(nodes[e.a].x, nodes[e.a].y); ctx.lineTo(nodes[e.b].x, nodes[e.b].y); ctx.stroke() }
        for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = n.c; ctx.fill() }
        return
      }
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(frame)
    }

    let rt: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(rt); rt = setTimeout(start, 150) }
    const onVis = () => { if (document.hidden) cancelAnimationFrame(rafId); else if (!reduce) rafId = requestAnimationFrame(frame) }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    start()
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  return <canvas ref={canvasRef} id="graph-canvas" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
