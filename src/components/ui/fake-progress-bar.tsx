"use client"

import { useState, useEffect } from "react"

export function FakeProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 73) return 0
        return prev + Math.random() * 3
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="h-4 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-200"
          style={{ width: `${Math.min(progress, 73)}%` }}
        />
      </div>
      <p className="text-center text-foreground/50 text-sm mt-2">
        Processing... {Math.floor(Math.min(progress, 73))}%
      </p>
    </div>
  )
}
