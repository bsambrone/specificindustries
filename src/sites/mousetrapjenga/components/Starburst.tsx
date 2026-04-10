import React from "react"

interface StarburstProps {
  text: string
  color?: "yellow" | "red" | "turquoise"
  size?: "sm" | "md" | "lg"
  className?: string
  rotation?: number
}

const colorMap = {
  yellow: { fill: "#FFD23F", text: "#1A1F4C", stroke: "#1A1F4C" },
  red: { fill: "#D4281F", text: "#FFF6E8", stroke: "#1A1F4C" },
  turquoise: { fill: "#2BB9B9", text: "#FFF6E8", stroke: "#1A1F4C" },
}

const sizeMap = {
  sm: { dim: 120, fontSize: 14 },
  md: { dim: 180, fontSize: 20 },
  lg: { dim: 260, fontSize: 28 },
}

/**
 * Comic-book style starburst badge used throughout the Mousetrap Jenga
 * site — especially in the home page product parade ("BUT WAIT! THERE'S
 * MORE!") and on product cards for "NEW!" and "SALE!" bursts.
 */
export function Starburst({
  text,
  color = "yellow",
  size = "md",
  className = "",
  rotation = -12,
}: StarburstProps) {
  const { fill, text: textColor, stroke } = colorMap[color]
  const { dim, fontSize } = sizeMap[size]

  // 16-point starburst path — computed around a center of 100,100 with
  // alternating outer/inner radii.
  const points: string[] = []
  const cx = 100
  const cy = 100
  const outer = 95
  const inner = 68
  const spikes = 16
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  const pathData = points.join(" ")

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: dim, height: dim, transform: `rotate(${rotation}deg)` }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <polygon
          points={pathData}
          fill={fill}
          stroke={stroke}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fontFamily="var(--font-bowlby-one-sc), sans-serif"
          fontSize={fontSize}
          fontWeight="900"
          fill={textColor}
          style={{ textTransform: "uppercase" }}
        >
          {text.split("\n").map((line, i, arr) => (
            <tspan key={i} x="100" dy={i === 0 ? -((arr.length - 1) * fontSize) / 2 : fontSize}>
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  )
}
