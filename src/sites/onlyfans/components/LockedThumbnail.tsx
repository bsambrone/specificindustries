"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { isSubscribed, ONLYFANS_SUBSCRIBED_EVENT } from "./SubscribeButton"

interface LockedThumbnailProps {
  fanSlug: string
  image: string
  caption: string
  locked: boolean
}

export function LockedThumbnail({ fanSlug, image, caption, locked }: LockedThumbnailProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUnlocked(isSubscribed(fanSlug))
    function handler(e: Event) {
      const detail = (e as CustomEvent<{ slug: string }>).detail
      if (detail?.slug === fanSlug) setUnlocked(true)
    }
    window.addEventListener(ONLYFANS_SUBSCRIBED_EVENT, handler)
    return () => window.removeEventListener(ONLYFANS_SUBSCRIBED_EVENT, handler)
  }, [fanSlug])

  // Pre-mount, render server-safe state: locked posts blurred, free posts visible
  const isLocked = locked && (!mounted || !unlocked)

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-200">
      <Image
        src={image}
        alt={caption}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className={`object-cover transition-all duration-300 ${isLocked ? "blur-2xl scale-110" : ""}`}
      />
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
          <span className="text-3xl mb-1" aria-hidden>🔒</span>
          <span className="text-xs font-semibold uppercase tracking-wide">Subscribe to view</span>
        </div>
      )}
      {!isLocked && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-xs px-3 py-2">
          {caption}
        </div>
      )}
    </div>
  )
}
