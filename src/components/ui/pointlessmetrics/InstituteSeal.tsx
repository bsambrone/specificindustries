interface InstituteSealProps {
  size?: number
  className?: string
}

export function InstituteSeal({ size = 96, className }: InstituteSealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Institute for the Study of Pointless Metrics seal"
    >
      <defs>
        <path id="seal-circle" d={`M 50 50 m -36 0 a 36 36 0 1 1 72 0 a 36 36 0 1 1 -72 0`} fill="none" />
      </defs>
      <circle cx="50" cy="50" r="48" fill="var(--color-background)" stroke="var(--color-primary)" strokeWidth="1" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-primary)" strokeWidth="0.5" />
      <text fontSize="6" fill="var(--color-primary)" letterSpacing="1.2">
        <textPath href="#seal-circle" startOffset="0%">
          · INSTITUTE FOR THE STUDY OF POINTLESS METRICS · MENSURANDUM EST ·
        </textPath>
      </text>
      {/* Center motif: stylized sigma over a scatter-cross */}
      <g transform="translate(50 50)">
        <text textAnchor="middle" y="2" fontSize="18" fill="var(--color-primary)" fontFamily="serif">Σ</text>
        <circle cx="-8" cy="8" r="1.4" fill="var(--color-secondary)" />
        <circle cx="8" cy="10" r="1.4" fill="var(--color-secondary)" />
        <circle cx="0" cy="14" r="1.4" fill="var(--color-secondary)" />
        <line x1="-10" y1="16" x2="10" y2="6" stroke="var(--color-secondary)" strokeWidth="0.5" />
      </g>
      <text x="50" y="86" textAnchor="middle" fontSize="4" fill="var(--color-primary)" letterSpacing="0.5">EST. 2011</text>
    </svg>
  )
}
