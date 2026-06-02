import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link className="brand" href="/">
            <Image className="brand__mark" src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/assets/logo.png`} alt="" width={36} height={36} />
            <div className="brand__text">
              <span className="brand__name">Breeze.AI</span>
              <span className="brand__by">By Accion Labs</span>
            </div>
          </Link>
          <p className="footer__blurb">An AI-powered, ontology-driven development platform. Requirements, architecture, code, and design — one connected knowledge graph.</p>
        </div>
        <div className="footer__col">
          <h5>Documentation</h5>
          <Link href="/user-guide/">What is Breeze.AI?</Link>
          <Link href="/user-guide/mcp/">MCP integration</Link>
          <Link href="/user-guide/skills/">Skills reference</Link>
          <Link href="/user-guide/cookbook/">Building the graphs</Link>
          <Link href="/user-guide/comparison/">Comparison study</Link>
        </div>
        <div className="footer__col">
          <h5>Resources</h5>
          <Link href="/#compare">Comparison study</Link>
          <Link href="/#problem">Why Breeze</Link>
          <Link href="/#cta">Get started</Link>
          <Link href="/">Platform overview</Link>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Accion Labs · Breeze.AI</span>
        <span>Documentation: Anirudha Gohokar</span>
      </div>
    </footer>
  )
}
