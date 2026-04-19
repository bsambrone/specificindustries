import type { ReactNode } from "react"

interface MedicalCalloutProps {
  label?: string       // mono-style label above the body, e.g. "ABSTRACT" or "PULL QUOTE"
  citation?: string    // Vancouver-style citation beneath body
  children: ReactNode
}

export default function MedicalCallout({ label, citation, children }: MedicalCalloutProps) {
  return (
    <aside
      className="border-l-4 pl-5 py-3 my-6 rounded-r-md"
      style={{
        borderLeftColor: "var(--color-primary, #5B3FD9)",
        background: "var(--color-surface-alt, #F1EFFA)",
      }}
    >
      {label ? (
        <div className="text-[11px] uppercase tracking-[0.2em] font-mono mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>
          {label}
        </div>
      ) : null}
      <div className="text-base leading-relaxed">{children}</div>
      {citation ? (
        <div className="text-xs font-mono mt-3" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          {citation}
        </div>
      ) : null}
    </aside>
  )
}
