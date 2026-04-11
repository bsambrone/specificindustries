"use client"

import { useEffect, useState } from "react"

interface ToastMessage {
  id: number
  text: string
}

export const ONLYFANS_TOAST_EVENT = "onlyfans-toast"

export function fireToast(text: string) {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(ONLYFANS_TOAST_EVENT, { detail: { text } }))
}

export function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  useEffect(() => {
    let nextId = 0
    function handler(e: Event) {
      const detail = (e as CustomEvent<{ text: string }>).detail
      if (!detail?.text) return
      const id = nextId++
      setMessages((prev) => [...prev, { id, text: detail.text }])
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id))
      }, 3500)
    }
    window.addEventListener(ONLYFANS_TOAST_EVENT, handler)
    return () => window.removeEventListener(ONLYFANS_TOAST_EVENT, handler)
  }, [])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {messages.map((m) => (
        <div
          key={m.id}
          className="bg-[#0F172A] text-white px-5 py-3 rounded-full shadow-xl text-sm font-semibold pointer-events-auto"
        >
          {m.text}
        </div>
      ))}
    </div>
  )
}
