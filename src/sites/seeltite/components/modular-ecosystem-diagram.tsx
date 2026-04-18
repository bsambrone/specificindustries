interface Spoke {
  slug: string
  label: string
  angle: number // degrees, 0 = right, 90 = down
}

const SPOKES: Spoke[] = [
  { slug: "the-grinder",                 label: "The Grinder",            angle: -144 },
  { slug: "salad-shooter-attachment",    label: "Salad Shooter",          angle: -108 },
  { slug: "cryo-puck-module",            label: "Cryo-Puck",              angle: -72 },
  { slug: "pneumatic-ejector-kit",       label: "Pneumatic Ejector",      angle: -36 },
  { slug: "shopvac-adapter",             label: "Shop-Vac Adapter",       angle: 0 },
  { slug: "incinerator-module",          label: "Incinerator",            angle: 36 },
  { slug: "odor-cartridge-pack",         label: "Odor Cartridges",        angle: 72 },
  { slug: "telemetry-module",            label: "Telemetry",              angle: 108 },
  { slug: "the-silencer",                label: "The Silencer",           angle: 144 },
  { slug: "secondary-gasket-redundancy", label: "Backup Gasket",          angle: 180 },
]

export function ModularEcosystemDiagram() {
  const centerX = 400
  const centerY = 300
  const spokeRadius = 230
  const labelRadius = 270
  const hubRadius = 70

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="Seel-Tite modular ecosystem diagram">
        {/* Spokes */}
        {SPOKES.map((s) => {
          const rad = (s.angle * Math.PI) / 180
          const x2 = centerX + Math.cos(rad) * spokeRadius
          const y2 = centerY + Math.sin(rad) * spokeRadius
          return (
            <line
              key={`line-${s.slug}`}
              x1={centerX}
              y1={centerY}
              x2={x2}
              y2={y2}
              stroke="#1A1A1A"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.45"
            />
          )
        })}

        {/* Spoke endpoints + labels */}
        {SPOKES.map((s) => {
          const rad = (s.angle * Math.PI) / 180
          const cx = centerX + Math.cos(rad) * spokeRadius
          const cy = centerY + Math.sin(rad) * spokeRadius
          const lx = centerX + Math.cos(rad) * labelRadius
          const ly = centerY + Math.sin(rad) * labelRadius
          const anchor = Math.abs(Math.cos(rad)) < 0.2 ? "middle" : Math.cos(rad) > 0 ? "start" : "end"
          return (
            <a key={`node-${s.slug}`} href={`/products/${s.slug}`} aria-label={s.label}>
              <circle cx={cx} cy={cy} r="14" fill="#F25C05" stroke="#1A1A1A" strokeWidth="2" />
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontFamily="'Barlow Condensed', sans-serif"
                fontSize="14"
                fill="#1A1A1A"
                style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                {s.label}
              </text>
            </a>
          )
        })}

        {/* Hub */}
        <circle cx={centerX} cy={centerY} r={hubRadius + 8} fill="#1A1A1A" />
        <circle cx={centerX} cy={centerY} r={hubRadius} fill="#F25C05" />
        <text
          x={centerX}
          y={centerY - 6}
          textAnchor="middle"
          fontFamily="'Barlow Condensed', sans-serif"
          fontSize="18"
          fontWeight="700"
          fill="#1A1A1A"
          style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}
        >
          G1
        </text>
        <text
          x={centerX}
          y={centerY + 12}
          textAnchor="middle"
          fontFamily="'Barlow Condensed', sans-serif"
          fontSize="10"
          fill="#1A1A1A"
          style={{ textTransform: "uppercase", letterSpacing: "0.2em" }}
        >
          Containment Gasket
        </text>

        {/* OPX-14 port label */}
        <text
          x={centerX}
          y={centerY + hubRadius + 30}
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="11"
          fill="#6B6B6B"
        >
          OPX-14 Output Port
        </text>
      </svg>
    </div>
  )
}
