'use client'
import { useEffect, useState } from 'react'

export default function DocsTOC({ headings }: { headings: { id: string; label: string; level?: number }[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    const OFFSET = 120

    function getActive() {
      const scrollY = window.scrollY + OFFSET
      let current = headings[0]?.id ?? ''
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          current = h.id
        }
      }
      return current
    }

    const onScroll = () => setActive(getActive())
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [headings])

  return (
    <aside className="docs-toc">
      <div className="toc__title">On this page</div>
      {headings.map(h => (
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
