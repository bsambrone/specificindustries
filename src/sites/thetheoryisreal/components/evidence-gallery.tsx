// src/sites/thetheoryisreal/components/evidence-gallery.tsx
"use client"

import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import type { EvidenceItem } from "../types"
import { EvidenceTile } from "./evidence-tile"

export function EvidenceGallery({ items }: { items: EvidenceItem[] }) {
  const [focused, setFocused] = useState<EvidenceItem | null>(null)

  const close = useCallback(() => setFocused(null), [])

  useEffect(() => {
    if (!focused) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [focused, close])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <EvidenceTile key={item.id} item={item} onClick={() => setFocused(item)} />
        ))}
      </div>
      {focused && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={focused.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] w-full border border-primary/60 bg-[#0b0c0e]">
              <Image src={focused.image} alt={focused.caption} fill className="object-contain" sizes="100vw" />
            </div>
            <div className="mt-3 border border-primary/40 bg-[#141519] px-4 py-3">
              <p className="font-body text-sm text-text/90">{focused.caption}</p>
              <div className="mt-2 flex items-center justify-between font-heading text-[0.65rem] uppercase tracking-widest text-text/55">
                <span>Submitted by {focused.submittedBy}</span>
                <span>Tags: {focused.tags.join(" · ")}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              className="mt-3 font-heading text-xs uppercase tracking-widest text-primary hover:text-accent"
            >
              Close (ESC)
            </button>
          </div>
        </div>
      )}
    </>
  )
}
