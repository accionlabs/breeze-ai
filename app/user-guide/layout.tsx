import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DocsSidebar from '@/components/DocsSidebar'
import DocsTOC from '@/components/DocsTOC'
import DocsPager from '@/components/DocsPager'

const DOC_LINKS = [
  { label: 'Introduction', href: '/user-guide/' },
  { label: 'Quick-start', href: '/user-guide/quickstart/' },
  { label: 'MCP & Skills', href: '/user-guide/mcp/' },
  { label: 'Cookbook', href: '/user-guide/cookbook/' },
  { label: 'Compare', href: '/user-guide/comparison/' },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav links={DOC_LINKS} page="docs" />
      <div className="docs-layout">
        <DocsSidebar />
        <main className="docs-content">
          {children}
          <DocsPager />
        </main>
        <DocsTOC />
      </div>
      <Footer />
    </>
  )
}
