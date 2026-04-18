interface CrestProps {
  size?: number
  className?: string
}

export function Crest({ size = 120, className = "" }: CrestProps) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      {/* outer wax ring */}
      <circle cx="100" cy="100" r="94" fill="#6B1F1F" />
      <circle cx="100" cy="100" r="94" fill="none" stroke="#4A1414" strokeWidth="2" />
      {/* inner embossed disc */}
      <circle cx="100" cy="100" r="78" fill="none" stroke="#B08C3A" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="#B08C3A" strokeWidth="0.75" />
      {/* crossed mortars-and-pestles (stylized) */}
      <g stroke="#F5ECD7" strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1="70" y1="70" x2="130" y2="130" />
        <line x1="130" y1="70" x2="70" y2="130" />
      </g>
      {/* laurel banner motif */}
      <path d="M 40 115 Q 100 135 160 115" stroke="#B08C3A" strokeWidth="1.5" fill="none" />
      {/* inscription */}
      <text x="100" y="60" textAnchor="middle" fill="#F5ECD7" fontFamily="serif" fontSize="9" letterSpacing="1">
        VERITAS · REMEDIUM · REFUGIUM
      </text>
      <text x="100" y="155" textAnchor="middle" fill="#F5ECD7" fontFamily="serif" fontSize="7" letterSpacing="1.5">
        EST. 1774
      </text>
    </svg>
  )
}
