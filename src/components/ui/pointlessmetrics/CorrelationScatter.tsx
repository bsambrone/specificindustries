import type { ChartPoint } from "@/sites/pointlessmetrics/data/findings"

interface CorrelationScatterProps {
  points: ChartPoint[]
  xLabel: string
  yLabel: string
  xUnits: string
  yUnits: string
  rValue: number
  pValue: string
  sampleSize: number
  figureNumber?: number
  caption?: string
}

const WIDTH = 600
const HEIGHT = 400
const PAD_LEFT = 70
const PAD_RIGHT = 24
const PAD_TOP = 24
const PAD_BOTTOM = 64

export function CorrelationScatter({
  points,
  xLabel,
  yLabel,
  xUnits,
  yUnits,
  rValue,
  pValue,
  sampleSize,
  figureNumber = 1,
  caption,
}: CorrelationScatterProps) {
  if (points.length === 0) {
    return <div className="text-sm text-foreground/60">No data.</div>
  }

  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const xRange = xMax - xMin || 1
  const yRange = yMax - yMin || 1

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM

  const scaleX = (x: number) => PAD_LEFT + ((x - xMin) / xRange) * plotWidth
  const scaleY = (y: number) => PAD_TOP + plotHeight - ((y - yMin) / yRange) * plotHeight

  // Simple least-squares regression for the trend line.
  const n = points.length
  const meanX = xs.reduce((a, b) => a + b, 0) / n
  const meanY = ys.reduce((a, b) => a + b, 0) / n
  const num = points.reduce((s, p) => s + (p.x - meanX) * (p.y - meanY), 0)
  const den = points.reduce((s, p) => s + (p.x - meanX) * (p.x - meanX), 0) || 1
  const slope = num / den
  const intercept = meanY - slope * meanX
  const lineX1 = xMin
  const lineY1 = slope * xMin + intercept
  const lineX2 = xMax
  const lineY2 = slope * xMax + intercept

  // Gridlines at 4 x-steps and 4 y-steps.
  const gridXs = Array.from({ length: 5 }, (_, i) => xMin + (i / 4) * xRange)
  const gridYs = Array.from({ length: 5 }, (_, i) => yMin + (i / 4) * yRange)

  return (
    <figure className="bg-white border border-accent/40 p-4 rounded-sm">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" role="img" aria-label={`Figure ${figureNumber}: ${xLabel} versus ${yLabel}`}>
        {/* Plot area background */}
        <rect x={PAD_LEFT} y={PAD_TOP} width={plotWidth} height={plotHeight} fill="transparent" stroke="var(--color-accent)" strokeWidth={1} />

        {/* Gridlines */}
        {gridXs.map((gx) => (
          <line key={`gx-${gx}`} x1={scaleX(gx)} y1={PAD_TOP} x2={scaleX(gx)} y2={PAD_TOP + plotHeight} stroke="var(--color-accent)" strokeOpacity={0.25} strokeDasharray="2 3" />
        ))}
        {gridYs.map((gy) => (
          <line key={`gy-${gy}`} x1={PAD_LEFT} y1={scaleY(gy)} x2={PAD_LEFT + plotWidth} y2={scaleY(gy)} stroke="var(--color-accent)" strokeOpacity={0.25} strokeDasharray="2 3" />
        ))}

        {/* Axis ticks */}
        {gridXs.map((gx) => (
          <text key={`tx-${gx}`} x={scaleX(gx)} y={PAD_TOP + plotHeight + 16} textAnchor="middle" fontSize="10" fill="var(--color-accent)" className="tabular-nums">
            {formatTick(gx)}
          </text>
        ))}
        {gridYs.map((gy) => (
          <text key={`ty-${gy}`} x={PAD_LEFT - 8} y={scaleY(gy) + 3} textAnchor="end" fontSize="10" fill="var(--color-accent)" className="tabular-nums">
            {formatTick(gy)}
          </text>
        ))}

        {/* Axis labels */}
        <text x={PAD_LEFT + plotWidth / 2} y={HEIGHT - 16} textAnchor="middle" fontSize="12" fill="var(--color-text)">
          {xLabel} ({xUnits})
        </text>
        <text x={18} y={PAD_TOP + plotHeight / 2} textAnchor="middle" fontSize="12" fill="var(--color-text)" transform={`rotate(-90 18 ${PAD_TOP + plotHeight / 2})`}>
          {yLabel} ({yUnits})
        </text>

        {/* Regression line */}
        <line x1={scaleX(lineX1)} y1={scaleY(lineY1)} x2={scaleX(lineX2)} y2={scaleY(lineY2)} stroke="var(--color-secondary)" strokeWidth={1.5} />

        {/* Points */}
        {points.map((p, i) => (
          <circle key={i} cx={scaleX(p.x)} cy={scaleY(p.y)} r={4} fill="var(--color-primary)" fillOpacity={0.85} />
        ))}

        {/* Stat callout in upper-right of plot */}
        <g transform={`translate(${PAD_LEFT + plotWidth - 10}, ${PAD_TOP + 8})`}>
          <text textAnchor="end" fontSize="11" fill="var(--color-text)" className="tabular-nums">
            <tspan x="0" dy="0">r = {rValue.toFixed(2)}</tspan>
            <tspan x="0" dy="14">p {pValue}</tspan>
            <tspan x="0" dy="14">n = {sampleSize.toLocaleString()}</tspan>
          </text>
        </g>
      </svg>
      <figcaption className="mt-2 text-xs text-foreground/70 font-body">
        <span className="font-semibold">Figure {figureNumber}.</span>{caption ? ` ${caption}` : ` ${xLabel} versus ${yLabel}. n = ${sampleSize.toLocaleString()}.`}
      </figcaption>
    </figure>
  )
}

function formatTick(n: number): string {
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(1) + "k"
  if (Number.isInteger(n)) return n.toString()
  return n.toFixed(1)
}
