interface CertBadgeProps {
  label: string       // e.g. "ISO 22000"
  sub?: string        // e.g. "Food Safety Management"
}

export default function CertBadge({ label, sub }: CertBadgeProps) {
  return (
    <div
      className="flex flex-col items-center justify-center w-28 h-28 rounded-full border"
      style={{
        borderColor: "var(--color-border, #E6E3F0)",
        background: "var(--color-surface, #FFFFFF)",
      }}
    >
      <div className="text-xs font-mono uppercase tracking-[0.15em] text-center" style={{ color: "var(--color-primary, #5B3FD9)" }}>
        {label}
      </div>
      {sub ? (
        <div className="text-[10px] font-mono mt-1 text-center" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          {sub}
        </div>
      ) : null}
    </div>
  )
}
