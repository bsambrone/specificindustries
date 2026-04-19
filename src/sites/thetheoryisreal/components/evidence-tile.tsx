// src/sites/thetheoryisreal/components/evidence-tile.tsx
"use client"

import Image from "next/image"
import type { EvidenceItem } from "../types"

export function EvidenceTile({
  item,
  onClick,
}: {
  item: EvidenceItem
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full overflow-hidden border border-primary/30 bg-[#17181c] text-left transition-colors hover:border-primary"
    >
      <div className="relative aspect-[4/3] w-full grayscale contrast-125 group-hover:grayscale-0">
        <Image src={item.image} alt={item.caption} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        {item.annotations?.map((a, i) =>
          a.kind === "circle" ? (
            <span
              key={i}
              className="absolute rounded-full border-2 border-accent"
              style={{
                left: `${a.x}%`,
                top: `${a.y}%`,
                width: `${a.w ?? 18}%`,
                aspectRatio: "1 / 1",
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden
            />
          ) : (
            <span
              key={i}
              className="absolute origin-center text-accent"
              style={{
                left: `${a.x}%`,
                top: `${a.y}%`,
                transform: `translate(-50%, -50%) rotate(${a.rotation ?? 0}deg)`,
                fontSize: "2rem",
                lineHeight: 1,
              }}
              aria-hidden
            >
              ↗
            </span>
          ),
        )}
      </div>
      <div className="px-3 py-3">
        <p className="font-body text-sm text-text/90 line-clamp-3">{item.caption}</p>
        <p className="mt-2 font-heading text-[0.65rem] uppercase tracking-widest text-text/55">
          Submitted by {item.submittedBy}
        </p>
      </div>
    </button>
  )
}
