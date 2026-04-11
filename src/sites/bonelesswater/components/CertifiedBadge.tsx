interface CertifiedBadgeProps {
  size?: "sm" | "md" | "lg"
  label?: string
}

export function CertifiedBadge({ size = "md", label = "CERTIFIED" }: CertifiedBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  }
  return (
    <span
      className={`inline-block bg-[#dc2626] text-white font-extrabold uppercase tracking-wider rounded-sm ${sizeClasses[size]}`}
      aria-label={label}
    >
      {label}
    </span>
  )
}
