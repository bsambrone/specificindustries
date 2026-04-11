"use client"

import { useEffect, useState } from "react"
import { fireToast } from "./Toast"

const STORAGE_KEY = "onlyfans-subscriptions"
export const ONLYFANS_SUBSCRIBED_EVENT = "onlyfans-subscribed"

interface StoredSubscription {
  slug: string
  subscribedAt: number
}

function readSubs(): StoredSubscription[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeSubs(subs: StoredSubscription[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(subs))
}

export function isSubscribed(slug: string): boolean {
  return readSubs().some((s) => s.slug === slug)
}

interface SubscribeButtonProps {
  fanSlug: string
  fanName: string
  monthlyPrice: number
  size?: "sm" | "lg"
}

export function SubscribeButton({ fanSlug, fanName, monthlyPrice, size = "lg" }: SubscribeButtonProps) {
  const [subscribed, setSubscribed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSubscribed(isSubscribed(fanSlug))
    function handler(e: Event) {
      const detail = (e as CustomEvent<{ slug: string }>).detail
      if (detail?.slug === fanSlug) setSubscribed(true)
    }
    window.addEventListener(ONLYFANS_SUBSCRIBED_EVENT, handler)
    return () => window.removeEventListener(ONLYFANS_SUBSCRIBED_EVENT, handler)
  }, [fanSlug])

  function handleClick() {
    if (subscribed) return
    const subs = readSubs()
    if (!subs.some((s) => s.slug === fanSlug)) {
      subs.push({ slug: fanSlug, subscribedAt: Date.now() })
      writeSubs(subs)
    }
    setSubscribed(true)
    window.dispatchEvent(new CustomEvent(ONLYFANS_SUBSCRIBED_EVENT, { detail: { slug: fanSlug } }))
    fireToast(`You're now subscribed to ${fanName}. Welcome to the fan family.`)
  }

  const padding = size === "sm" ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"

  if (!mounted) {
    return (
      <button className={`bg-[#00AFF0] text-white font-bold rounded-full ${padding}`} disabled>
        SUBSCRIBE — ${monthlyPrice.toFixed(2)}/mo
      </button>
    )
  }

  if (subscribed) {
    return (
      <button
        className={`bg-[#0F172A]/30 text-white font-bold rounded-full ${padding} cursor-not-allowed`}
        disabled
      >
        ✓ SUBSCRIBED
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`bg-[#00AFF0] hover:bg-[#0095CD] text-white font-bold rounded-full ${padding} transition-colors`}
    >
      SUBSCRIBE — ${monthlyPrice.toFixed(2)}/mo
    </button>
  )
}
