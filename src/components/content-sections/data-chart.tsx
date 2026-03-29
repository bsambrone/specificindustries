"use client"

interface DataPoint {
  label: string
  value: number
}

interface DataChartProps {
  type: "bar" | "line" | "pie" | "area"
  data: DataPoint[]
  title: string
  xLabel?: string
  yLabel?: string
}

const CHART_W = 500
const CHART_H = 280
const PAD = { top: 20, right: 20, bottom: 48, left: 52 }
const INNER_W = CHART_W - PAD.left - PAD.right
const INNER_H = CHART_H - PAD.top - PAD.bottom
const GRID_LINES = 4

function scaleY(value: number, max: number) {
  return INNER_H - (value / max) * INNER_H
}

function BarChart({ data }: { data: DataPoint[] }) {
  const max = Math.max(...data.map((d) => d.value)) * 1.1
  const barW = INNER_W / data.length
  const gap = barW * 0.25

  return (
    <>
      {/* Grid lines */}
      {Array.from({ length: GRID_LINES + 1 }).map((_, i) => {
        const y = (INNER_H / GRID_LINES) * i
        const val = Math.round((max * (GRID_LINES - i)) / GRID_LINES)
        return (
          <g key={i}>
            <line
              x1={0}
              y1={y}
              x2={INNER_W}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeWidth={1}
            />
            <text
              x={-8}
              y={y + 4}
              textAnchor="end"
              fontSize={10}
              fill="currentColor"
              fillOpacity={0.5}
            >
              {val}
            </text>
          </g>
        )
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const x = i * barW + gap / 2
        const barH = (d.value / max) * INNER_H
        const y = INNER_H - barH
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW - gap}
              height={barH}
              fill="var(--color-accent)"
              fillOpacity={0.8}
              rx={3}
            />
            <text
              x={x + (barW - gap) / 2}
              y={INNER_H + 16}
              textAnchor="middle"
              fontSize={10}
              fill="currentColor"
              fillOpacity={0.6}
            >
              {d.label}
            </text>
          </g>
        )
      })}
    </>
  )
}

function LineChart({ data, area }: { data: DataPoint[]; area: boolean }) {
  const max = Math.max(...data.map((d) => d.value)) * 1.1
  const step = INNER_W / (data.length - 1)

  const points = data.map((d, i) => ({
    x: i * step,
    y: scaleY(d.value, max),
  }))

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ")
  const areaPath =
    `M${points[0].x},${INNER_H} ` +
    points.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${points[points.length - 1].x},${INNER_H} Z`

  return (
    <>
      {/* Grid lines */}
      {Array.from({ length: GRID_LINES + 1 }).map((_, i) => {
        const y = (INNER_H / GRID_LINES) * i
        const val = Math.round((max * (GRID_LINES - i)) / GRID_LINES)
        return (
          <g key={i}>
            <line
              x1={0}
              y1={y}
              x2={INNER_W}
              y2={y}
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeWidth={1}
            />
            <text
              x={-8}
              y={y + 4}
              textAnchor="end"
              fontSize={10}
              fill="currentColor"
              fillOpacity={0.5}
            >
              {val}
            </text>
          </g>
        )
      })}

      {area && (
        <path d={areaPath} fill="var(--color-accent)" fillOpacity={0.12} />
      )}

      <polyline
        points={polylinePoints}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r={4}
            fill="var(--color-accent)"
            stroke="var(--color-background)"
            strokeWidth={2}
          />
          <text
            x={p.x}
            y={INNER_H + 16}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            fillOpacity={0.6}
          >
            {data[i].label}
          </text>
        </g>
      ))}
    </>
  )
}

function PieChart({ data }: { data: DataPoint[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const cx = INNER_W / 2
  const cy = INNER_H / 2
  const r = Math.min(cx, cy) - 10

  const opacities = [1, 0.75, 0.55, 0.4, 0.28, 0.18]

  const slices = data.reduce<{ startAngle: number; items: { path: string; opacity: number; lx: number; ly: number; label: string; pct: number }[] }>(
    (acc, d, i) => {
      const angle = (d.value / total) * 2 * Math.PI
      const endAngle = acc.startAngle + angle
      const x1 = cx + r * Math.cos(acc.startAngle)
      const y1 = cy + r * Math.sin(acc.startAngle)
      const x2 = cx + r * Math.cos(endAngle)
      const y2 = cy + r * Math.sin(endAngle)
      const largeArc = angle > Math.PI ? 1 : 0
      const midAngle = acc.startAngle + angle / 2
      const lx = cx + (r + 20) * Math.cos(midAngle)
      const ly = cy + (r + 20) * Math.sin(midAngle)

      acc.items.push({
        path: `M${cx},${cy} L${x1},${y1} A${r},${r},0,${largeArc},1,${x2},${y2} Z`,
        opacity: opacities[i % opacities.length],
        lx,
        ly,
        label: d.label,
        pct: Math.round((d.value / total) * 100),
      })
      acc.startAngle = endAngle
      return acc
    },
    { startAngle: -Math.PI / 2, items: [] }
  ).items

  return (
    <>
      {slices.map((s, i) => (
        <g key={i}>
          <path
            d={s.path}
            fill="var(--color-accent)"
            fillOpacity={s.opacity}
            stroke="var(--color-background)"
            strokeWidth={2}
          />
        </g>
      ))}
      {slices.map((s, i) => (
        <text
          key={i}
          x={s.lx}
          y={s.ly}
          textAnchor="middle"
          fontSize={9}
          fill="currentColor"
          fillOpacity={0.7}
        >
          {s.label} {s.pct}%
        </text>
      ))}
    </>
  )
}

export function DataChart({ type, data, title, xLabel, yLabel }: DataChartProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="border border-primary/10 rounded-xl bg-primary/5 p-6">
          <h3 className="font-heading font-semibold text-foreground text-lg mb-6 text-center">
            {title}
          </h3>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              width="100%"
              style={{ maxWidth: CHART_W, display: "block", margin: "0 auto" }}
              className="text-foreground"
            >
              <g transform={`translate(${PAD.left},${PAD.top})`}>
                {/* Axes */}
                <line
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={INNER_H}
                  stroke="currentColor"
                  strokeOpacity={0.2}
                  strokeWidth={1}
                />
                <line
                  x1={0}
                  y1={INNER_H}
                  x2={INNER_W}
                  y2={INNER_H}
                  stroke="currentColor"
                  strokeOpacity={0.2}
                  strokeWidth={1}
                />

                {type === "bar" && <BarChart data={data} />}
                {type === "line" && <LineChart data={data} area={false} />}
                {type === "area" && <LineChart data={data} area={true} />}
                {type === "pie" && <PieChart data={data} />}
              </g>

              {/* Axis labels */}
              {xLabel && (
                <text
                  x={PAD.left + INNER_W / 2}
                  y={CHART_H - 4}
                  textAnchor="middle"
                  fontSize={11}
                  fill="currentColor"
                  fillOpacity={0.5}
                >
                  {xLabel}
                </text>
              )}
              {yLabel && (
                <text
                  x={14}
                  y={PAD.top + INNER_H / 2}
                  textAnchor="middle"
                  fontSize={11}
                  fill="currentColor"
                  fillOpacity={0.5}
                  transform={`rotate(-90, 14, ${PAD.top + INNER_H / 2})`}
                >
                  {yLabel}
                </text>
              )}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
