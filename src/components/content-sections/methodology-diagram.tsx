const NODES = [
  { key: "C", label: "Consulting" },
  { key: "H", label: "Harmonization" },
  { key: "A", label: "Analytics" },
  { key: "O", label: "Optimization" },
  { key: "S", label: "Scalability" },
]

const CX = 200
const CY = 200
const ORBIT_R = 120
const NODE_R = 32

function getNodePos(index: number, total: number) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2
  return {
    x: CX + ORBIT_R * Math.cos(angle),
    y: CY + ORBIT_R * Math.sin(angle),
  }
}

export function MethodologyDiagram() {
  const positions = NODES.map((_, i) => getNodePos(i, NODES.length))

  return (
    <section className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-10">
          Our Framework
        </h2>
        <div className="flex justify-center">
          <svg
            viewBox="0 0 400 400"
            width="100%"
            style={{ maxWidth: 400 }}
            aria-label="C.H.A.O.S. Framework diagram"
          >
            {/* Connecting arrows between adjacent nodes */}
            {NODES.map((_, i) => {
              const from = positions[i]
              const to = positions[(i + 1) % NODES.length]
              const dx = to.x - from.x
              const dy = to.y - from.y
              const dist = Math.sqrt(dx * dx + dy * dy)
              const nx = dx / dist
              const ny = dy / dist
              const x1 = from.x + nx * NODE_R
              const y1 = from.y + ny * NODE_R
              const x2 = to.x - nx * NODE_R
              const y2 = to.y - ny * NODE_R
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-accent)"
                  strokeOpacity={0.35}
                  strokeWidth={1.5}
                  markerEnd="url(#arrowhead)"
                />
              )
            })}

            {/* Arrowhead marker */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="6"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 8 3, 0 6"
                  fill="var(--color-accent)"
                  fillOpacity={0.5}
                />
              </marker>
            </defs>

            {/* Center circle */}
            <circle cx={CX} cy={CY} r={52} fill="var(--color-accent)" fillOpacity={0.08} />
            <circle
              cx={CX}
              cy={CY}
              r={52}
              fill="none"
              stroke="var(--color-accent)"
              strokeOpacity={0.2}
              strokeWidth={1}
            />
            <text
              x={CX}
              y={CY - 8}
              textAnchor="middle"
              fontSize={14}
              fontWeight="bold"
              fill="var(--color-accent)"
            >
              C.H.A.O.S.
            </text>
            <text
              x={CX}
              y={CY + 10}
              textAnchor="middle"
              fontSize={9}
              fill="currentColor"
              fillOpacity={0.5}
            >
              Framework™
            </text>

            {/* Node circles */}
            {NODES.map((node, i) => {
              const { x, y } = positions[i]
              return (
                <g key={node.key}>
                  <circle
                    cx={x}
                    cy={y}
                    r={NODE_R}
                    fill="var(--color-accent)"
                    fillOpacity={0.9}
                  />
                  <text
                    x={x}
                    y={y + 6}
                    textAnchor="middle"
                    fontSize={18}
                    fontWeight="bold"
                    fill="white"
                  >
                    {node.key}
                  </text>
                  {/* Label outside node */}
                  {(() => {
                    const labelR = ORBIT_R + NODE_R + 16
                    const angle = (2 * Math.PI * i) / NODES.length - Math.PI / 2
                    const lx = CX + labelR * Math.cos(angle)
                    const ly = CY + labelR * Math.sin(angle)
                    return (
                      <text
                        x={lx}
                        y={ly + 4}
                        textAnchor="middle"
                        fontSize={10}
                        fill="currentColor"
                        fillOpacity={0.6}
                      >
                        {node.label}
                      </text>
                    )
                  })()}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
