'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DOC_GROUPS, normPath } from './docsNav'

export default function DocsSidebar() {
  const current = normPath(usePathname() ?? '')

  return (
    <aside className="docs-sidebar">
      {DOC_GROUPS.map((sec) => (
        <div key={sec.group} className="sidebar-section">
          <div className="sidebar-section__title">{sec.group}</div>
          {sec.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link${current === normPath(item.href) ? ' active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  )
}
