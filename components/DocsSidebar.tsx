'use client'
import { useEffect, useState } from 'react'

const SECTIONS = [
  { group: 'GETTING STARTED', items: [
    { label: 'What is Breeze.AI', href: '#what-is' },
    { label: 'Quick-start', href: '#quickstart' },
  ]},
  { group: 'CORE CONCEPTS', items: [
    { label: 'Four graph layers', href: '#layers' },
    { label: 'Who uses it', href: '#who' },
  ]},
  { group: 'MCP & SKILLS', items: [
    { label: 'MCP integration', href: '#mcp' },
    { label: 'Setup guide', href: '#mcp-setup' },
    { label: 'Skills reference', href: '#skills' },
  ]},
  { group: 'COOKBOOK', items: [
    { label: 'Building the graphs', href: '#cookbook' },
    { label: 'Brownfield guide', href: '#brownfield' },
    { label: 'Greenfield guide', href: '#greenfield' },
    { label: 'Quick reference', href: '#quickref' },
  ]},
  { group: 'REFERENCE', items: [
    { label: 'Key URLs', href: '#urls' },
    { label: 'Glossary', href: '#glossary' },
  ]},
]

const ALL_IDS = SECTIONS.flatMap(s => s.items.map(i => i.href.slice(1)))

export default function DocsSidebar() {
  const [activeHash, setActiveHash] = useState('#what-is')

  useEffect(() => {
    const OFFSET = 120 // nav height + buffer

    function getActive() {
      const scrollY = window.scrollY + OFFSET
      let active = ALL_IDS[0]
      for (const id of ALL_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          active = id
        }
      }
      return '#' + active
    }

    const onScroll = () => setActiveHash(getActive())
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside className="docs-sidebar">
      {SECTIONS.map(sec => (
        <div key={sec.group} className="sidebar-section">
          <div className="sidebar-section__title">{sec.group}</div>
          {sec.items.map(item => (
            <a key={item.href} href={item.href} className={`sidebar-link${activeHash === item.href ? ' active' : ''}`}>
              {item.label}
            </a>
          ))}
        </div>
      ))}
    </aside>
  )
}
