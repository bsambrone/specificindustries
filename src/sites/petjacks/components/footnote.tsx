"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface FootnoteProps {
  marker?: string
  children: ReactNode
}

export default function Footnote({ marker = "*", children }: FootnoteProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <span ref={wrapperRef} className="relative inline align-baseline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Collapse footnote" : "Expand footnote"}
        className="cursor-pointer font-semibold text-accent select-none bg-transparent border-0 p-0 align-baseline"
      >
        <sup>{marker}</sup>
      </button>
      {open ? (
        <span
          role="note"
          className="absolute left-0 top-full z-20 mt-1 block w-max max-w-xs text-xs font-mono text-foreground/80 border border-accent/40 bg-background shadow-lg rounded-md p-3 text-left normal-case whitespace-normal leading-snug"
          style={{ background: "#FDFBF5" }}
        >
          {children}
        </span>
      ) : null}
    </span>
  )
}
