'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type H = { id: string; label: string; level: number }

export default function DocsTOC() {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<H[]>([])
  const [active, setActive] = useState('')

  // Derive the TOC from the rendered page on each route change.
  useEffect(() => {
    const main = document.querySelector('.docs-content')
    if (!main) { setHeadings([]); return }
    const els = Array.from(main.querySelectorAll('h2[id], h3[id]')) as HTMLElement[]
    const hs = els.map((el) => ({ id: el.id, label: el.textContent ?? '', level: el.tagName === 'H3' ? 3 : 2 }))
    setHeadings(hs)
    setActive(hs[0]?.id ?? '')
  }, [pathname])

  // Scroll-spy.
  useEffect(() => {
    if (!headings.length) return
    const OFFSET = 120
    const onScroll = () => {
      const y = window.scrollY + OFFSET
      let cur = headings[0].id
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) cur = h.id
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [headings])

  if (!headings.length) return <aside className="docs-toc" aria-hidden="true" />

  return (
    <aside className="docs-toc">
      <div className="toc__title">On this page</div>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`toc-link${h.level === 3 ? ' toc-link--sub' : ''}${active === h.id ? ' active' : ''}`}
        >
          {h.label}
        </a>
      ))}
    </aside>
  )
}
