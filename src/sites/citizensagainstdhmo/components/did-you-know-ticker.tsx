"use client"

import { useEffect, useState } from "react"
import { facts } from "@/sites/citizensagainstdhmo/data/facts"

export function DidYouKnowTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % facts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-primary/5 border-y border-primary/20 py-5 px-6">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <p className="shrink-0 text-xs text-primary uppercase tracking-widest font-semibold">
          Did You Know?
        </p>
        <p
          key={index}
          className="text-sm md:text-base text-foreground/80 leading-relaxed transition-opacity duration-500"
        >
          {facts[index]}
        </p>
      </div>
    </div>
  )
}
