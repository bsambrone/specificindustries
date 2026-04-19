"use client"

import type { ReactNode } from "react"

interface FootnoteProps {
  marker?: string   // "*" | "†" | "‡" | "1" | etc. Default "*"
  children: ReactNode
}

export default function Footnote({ marker = "*", children }: FootnoteProps) {
  return (
    <details className="inline-block align-baseline group">
      <summary
        className="inline cursor-pointer list-none font-semibold text-accent select-none"
        aria-label="Expand footnote"
      >
        <sup>{marker}</sup>
      </summary>
      <span className="block mt-1 ml-4 text-xs font-mono text-foreground/70 border-l-2 border-accent/40 pl-3 py-1 max-w-prose">
        {children}
      </span>
    </details>
  )
}
