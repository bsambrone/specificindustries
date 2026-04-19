// src/sites/thetheoryisreal/components/document-card.tsx
import type { ReactNode } from "react"

export function DocumentCard({
  children,
  fileNumber,
  className = "",
}: {
  children: ReactNode
  fileNumber?: string
  className?: string
}) {
  return (
    <div
      className={`relative border border-primary/60 bg-[#17181c] p-6 shadow-[inset_0_0_40px_rgba(200,168,107,0.04)] ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(200,168,107,0.02) 0 1px, transparent 1px 3px)",
      }}
    >
      {fileNumber && (
        <div className="absolute right-3 top-2 font-heading text-[0.65rem] uppercase tracking-widest text-primary/60">
          FILE #{fileNumber}
        </div>
      )}
      {children}
    </div>
  )
}
