// Single source of truth for the docs navigation: drives the sidebar groups,
// the prev/next pager order, and (indirectly) the header quick-links.
// Client-facing User Guide only — internal Developer Handbook / Deployment docs live in Confluence.
export type DocPage = { href: string; label: string }

export const DOC_GROUPS: { group: string; items: DocPage[] }[] = [
  { group: 'GETTING STARTED', items: [
    { href: '/user-guide/', label: 'Introduction' },
    { href: '/user-guide/quickstart/', label: 'Quick-start' },
  ]},
  { group: 'CORE CONCEPTS', items: [
    { href: '/user-guide/graph-layers/', label: 'Four graph layers' },
  ]},
  { group: 'MCP & SKILLS', items: [
    { href: '/user-guide/mcp/', label: 'MCP integration' },
    { href: '/user-guide/mcp-tools/', label: 'MCP tool reference' },
    { href: '/user-guide/skills/', label: 'Skills reference' },
  ]},
  { group: 'COOKBOOK', items: [
    { href: '/user-guide/cookbook/', label: 'Building the graphs' },
  ]},
  { group: 'COMPARISON', items: [
    { href: '/user-guide/comparison/', label: 'Breeze.AI vs other tools' },
  ]},
]

export const DOC_ORDER: DocPage[] = DOC_GROUPS.flatMap((g) => g.items)

// normalise a pathname for comparison (Next's usePathname may include a trailing slash)
export const normPath = (p: string) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p)
