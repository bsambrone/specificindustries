"use client"

import { FormEvent, useSyncExternalStore, useState, useCallback } from "react"

interface EmailGateFormProps {
  title: string
  subtitle: string
  storageKey: string
  children: React.ReactNode
}

const subscribe = () => () => {}
const getServerSnapshot = () => null as string | null

export function EmailGateForm({ title, subtitle, storageKey, children }: EmailGateFormProps) {
  const [email, setEmail] = useState("")
  const [justUnlocked, setJustUnlocked] = useState(false)
  const getSnapshot = useCallback(() => localStorage.getItem(storageKey), [storageKey])
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const unlocked = !!stored || justUnlocked
  const mounted = stored !== null || justUnlocked ? true : typeof window !== "undefined"

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return
    localStorage.setItem(storageKey, email)
    setJustUnlocked(true)
  }

  // Avoid flash on mount — render gated until hydrated
  if (!mounted) {
    return (
      <div className="relative overflow-hidden rounded-lg min-h-48 bg-secondary/10" />
    )
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Blurred preview */}
      <div className="select-none pointer-events-none blur-md opacity-40" aria-hidden="true">
        {children}
      </div>

      {/* Overlay gate */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
        <div className="w-full max-w-sm mx-auto px-6 py-8 bg-background border border-primary/20 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-heading font-semibold text-primary mb-2">{title}</h3>
          <p className="text-sm text-foreground/60 mb-6 leading-relaxed">{subtitle}</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-primary/30 rounded bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors text-sm"
            />
            <button
              type="submit"
              className="w-full py-2 bg-accent text-white font-heading text-sm uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              Access Content
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
