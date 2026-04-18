interface TrustBadgeStripProps {
  badges?: string[]
  size?: "sm" | "md"
  className?: string
}

const DEFAULT_BADGES = [
  "SOC-π v2.4.1",
  "GDPR-Adjacent™",
  "ISO/IEC 0000™",
  "HIPAA-Adjacent™",
  "FedRAMP-Adjacent™",
  "Trust-Verified™",
]

export function TrustBadgeStrip({ badges = DEFAULT_BADGES, size = "md", className = "" }: TrustBadgeStripProps) {
  const sizeClasses =
    size === "sm"
      ? "text-[10px] px-2 py-1"
      : "text-xs px-3 py-1.5"

  return (
    <div className={`flex flex-wrap gap-2 justify-center ${className}`}>
      {badges.map((badge) => (
        <span
          key={badge}
          className={`font-mono font-semibold rounded-full border border-primary/20 bg-white text-primary uppercase tracking-wider ${sizeClasses}`}
          style={{ fontFamily: "var(--font-ibm-plex-mono, monospace)" }}
        >
          {badge}
        </span>
      ))}
    </div>
  )
}
