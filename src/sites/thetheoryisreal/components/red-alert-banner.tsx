// src/sites/thetheoryisreal/components/red-alert-banner.tsx
"use client"

import { useEffect, useState } from "react"

export function RedAlertBanner({ headlines }: { headlines: string[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (headlines.length < 2) return
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % headlines.length)
    }, 6500)
    return () => clearInterval(id)
  }, [headlines.length])

  return (
    <div className="sticky top-0 z-40 w-full border-y border-accent/70 bg-accent/15 text-accent">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 font-heading text-xs uppercase tracking-[0.25em] sm:text-sm">
        <span className="animate-pulse rounded-sm bg-accent px-2 py-0.5 text-[0.65rem] text-[#0f1012]">
          BREAKING
        </span>
        <span className="flex-1 truncate">{headlines[i] ?? ""}</span>
      </div>
    </div>
  )
}
