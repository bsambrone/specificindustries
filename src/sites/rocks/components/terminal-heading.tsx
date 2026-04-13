import type { ReactNode } from "react"

interface TerminalHeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3
  className?: string
}

export function TerminalHeading({ children, level = 2, className = "" }: TerminalHeadingProps) {
  const sizeClass =
    level === 1 ? "text-3xl md:text-4xl" : level === 2 ? "text-xl md:text-2xl" : "text-base md:text-lg"
  const Tag = `h${level}` as "h1" | "h2" | "h3"

  return (
    <Tag className={`font-heading font-semibold uppercase tracking-wide text-primary ${sizeClass} ${className}`}>
      {children}
      <span className="cursor-blink text-primary ml-1">▌</span>
    </Tag>
  )
}
