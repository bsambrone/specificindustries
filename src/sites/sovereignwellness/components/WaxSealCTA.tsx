"use client"

import Link from "next/link"
import type { ReactNode, MouseEvent } from "react"

interface WaxSealCTAProps {
  children: ReactNode
  href?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export function WaxSealCTA({ children, href, onClick, className = "" }: WaxSealCTAProps) {
  const classes = `inline-block bg-primary text-secondary px-10 py-3 tracking-[0.3em] uppercase text-xs font-semibold border-2 border-[#4A1414] hover:bg-[#4A1414] transition-colors ${className}`
  if (href) return <Link href={href} className={classes}>{children}</Link>
  return <button onClick={onClick} className={classes}>{children}</button>
}
