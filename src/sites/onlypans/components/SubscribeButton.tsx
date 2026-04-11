"use client"

import { useSyncExternalStore } from "react"
import { fireToast } from "./Toast"

const STORAGE_KEY = "onlypans-subscriptions"
export const ONLYPANS_SUBSCRIBED_EVENT = "onlypans-subscribed"

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

/**
 * React-idiomatic subscription to the onlypans-subscribed store. Reads
 * localStorage on the client, returns false during SSR, and re-renders
 * when the onlypans-subscribed CustomEvent fires for the matching slug.
 */
export function useIsSubscribed(panSlug: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {}
      const handler = (e: Event) => {
        const detail = (e as CustomEvent<{ slug: string }>).detail
        if (detail?.slug === panSlug) onStoreChange()
      }
      window.addEventListener(ONLYPANS_SUBSCRIBED_EVENT, handler)
      return () => window.removeEventListener(ONLYPANS_SUBSCRIBED_EVENT, handler)
    },
    () => isSubscribed(panSlug),
    () => false,
  )
}

interface SubscribeButtonProps {
  panSlug: string
  panName: string
  monthlyPrice: number
  size?: "sm" | "lg"
}

export function SubscribeButton({ panSlug, panName, monthlyPrice, size = "lg" }: SubscribeButtonProps) {
  const subscribed = useIsSubscribed(panSlug)

  function handleClick() {
    if (subscribed) return
    const subs = readSubs()
    if (!subs.some((s) => s.slug === panSlug)) {
      subs.push({ slug: panSlug, subscribedAt: Date.now() })
      writeSubs(subs)
    }
    window.dispatchEvent(new CustomEvent(ONLYPANS_SUBSCRIBED_EVENT, { detail: { slug: panSlug } }))
    fireToast(`You're now subscribed to ${panName}. They will continue to sit perfectly still.`)
  }

  const padding = size === "sm" ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"

  if (subscribed) {
    return (
      <button
        className={`bg-[#1C0F05]/30 text-white font-bold rounded-full ${padding} cursor-not-allowed`}
        disabled
      >
        ✓ SUBSCRIBED
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`bg-[#C2410C] hover:bg-[#7C2D12] text-white font-bold rounded-full ${padding} transition-colors`}
    >
      SUBSCRIBE — ${monthlyPrice.toFixed(2)}/mo
    </button>
  )
}
