"use client"

import { useEffect, useRef, useState } from "react"

interface MetricCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  compact?: boolean
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`
  return n.toLocaleString()
}

export function MetricCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2000,
  compact = false,
}: MetricCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(value)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  return (
    <div ref={ref} className="text-center py-6 px-4">
      <div className="text-5xl md:text-6xl font-heading font-bold text-accent leading-none">
        {prefix}{compact ? formatCompact(count) : count.toLocaleString()}{suffix}
      </div>
      <div className="text-foreground/60 mt-3 text-base">{label}</div>
    </div>
  )
}
