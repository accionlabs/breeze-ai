'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Link = { label: string; href: string }

export default function Nav({ links, page }: { links: Link[]; page: 'home' | 'docs' }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav__inner">
        <Link className="brand" href="/">
          <Image className="brand__mark" src="/assets/logo.png" alt="" width={36} height={36} />
          <div className="brand__text">
            <span className="brand__name">Breeze.AI</span>
            <span className="brand__by">By Accion Labs</span>
          </div>
        </Link>
        <nav className="nav__links">
          {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
        <div className="nav__cta">
          {page === 'home'
            ? <Link href="/user-guide" className="btn btn--outline btn--sm">Docs</Link>
            : <Link href="/" className="btn btn--outline btn--sm">Home</Link>}
          <Link href="/#cta" className="btn btn--black btn--sm">Get started</Link>
        </div>
      </div>
    </header>
  )
}
