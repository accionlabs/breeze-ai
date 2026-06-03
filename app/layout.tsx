import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', weight: ['400','500','600','700'], display: 'swap' })
const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400','500','600'], display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400','500','600'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Breeze.AI — One connected graph, from intent to implementation',
  description: 'Breeze.AI is an AI-powered, ontology-driven development platform by Accion Labs. Capture requirements, architecture, code, and design as a single connected knowledge graph.',
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/assets/logo.png` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
