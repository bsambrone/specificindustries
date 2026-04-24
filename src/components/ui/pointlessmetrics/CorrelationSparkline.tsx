import type { ChartPoint } from "@/sites/pointlessmetrics/data/findings"

interface CorrelationSparklineProps {
  points: ChartPoint[]
  rValue: number
}

const W = 180
const H = 80
const PAD = 6

export function CorrelationSparkline({ points, rValue }: CorrelationSparklineProps) {
  if (points.length === 0) return null
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const xRange = xMax - xMin || 1
  const yRange = yMax - yMin || 1
  const plotW = W - PAD * 2
  const plotH = H - PAD * 2

  const scaleX = (x: number) => PAD + ((x - xMin) / xRange) * plotW
  const scaleY = (y: number) => PAD + plotH - ((y - yMin) / yRange) * plotH

  const n = points.length
  const meanX = xs.reduce((a, b) => a + b, 0) / n
  const meanY = ys.reduce((a, b) => a + b, 0) / n
  const num = points.reduce((s, p) => s + (p.x - meanX) * (p.y - meanY), 0)
  const den = points.reduce((s, p) => s + (p.x - meanX) * (p.x - meanX), 0) || 1
  const slope = num / den
  const intercept = meanY - slope * meanX

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-label={`Correlation sparkline, r = ${rValue.toFixed(2)}`}>
      <rect x={0} y={0} width={W} height={H} fill="transparent" stroke="var(--color-accent)" strokeOpacity={0.3} strokeWidth={1} />
      <line
        x1={scaleX(xMin)}
        y1={scaleY(slope * xMin + intercept)}
        x2={scaleX(xMax)}
        y2={scaleY(slope * xMax + intercept)}
        stroke="var(--color-secondary)"
        strokeWidth={1.2}
      />
      {points.map((p, i) => (
        <circle key={i} cx={scaleX(p.x)} cy={scaleY(p.y)} r={2} fill="var(--color-primary)" fillOpacity={0.9} />
      ))}
    </svg>
  )
}
