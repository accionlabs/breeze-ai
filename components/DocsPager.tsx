'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DOC_ORDER, normPath } from './docsNav'

export default function DocsPager() {
  const current = normPath(usePathname() ?? '')
  const idx = DOC_ORDER.findIndex((p) => normPath(p.href) === current)
  if (idx === -1) return null
  const prev = DOC_ORDER[idx - 1]
  const next = DOC_ORDER[idx + 1]

  return (
    <nav className="docs-pager">
      {prev ? (
        <Link className="docs-pager__link docs-pager__prev" href={prev.href}>
          <span className="docs-pager__dir">← Previous</span>
          <span className="docs-pager__label">{prev.label}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link className="docs-pager__link docs-pager__next" href={next.href}>
          <span className="docs-pager__dir">Next →</span>
          <span className="docs-pager__label">{next.label}</span>
        </Link>
      ) : <span />}
    </nav>
  )
}
