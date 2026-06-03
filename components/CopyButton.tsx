'use client'
import { useState } from 'react'

export default function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button className={`hero__cmd-copy ${className}`} onClick={async () => {
      await navigator.clipboard.writeText(text).catch(() => {})
      setCopied(true); setTimeout(() => setCopied(false), 1600)
    }} title="Copy to clipboard">
      {copied ? '✓' : '⎘'}
    </button>
  )
}
