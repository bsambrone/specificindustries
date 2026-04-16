"use client"

import { useState } from "react"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Authorization — Squared Away Supply Co.",
  description: "All personnel must verify tier before shopping. This check is non-binding and non-verifiable.",
}

const TIERS = [
  "Active Duty",
  "Reservist",
  "National Guard",
  "Retired",
  "Dependent",
  "DoD Civilian",
  "Civilian Contractor (LinkedIn Edition)",
  "Owns ≥1 Punisher Sticker",
  "Watched Top Gun: Maverick",
  "Other",
]

export default function AuthorizationPage() {
  const [tier, setTier] = useState(TIERS[0])
  const [verified, setVerified] = useState(false)
  return (
    <section className="py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">
          UNCLASSIFIED // AUTHORIZED PERSONNEL
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary uppercase tracking-widest mb-2">
          Authorization Required
        </h1>
        <p className="text-foreground/80 mb-8">
          All personnel must verify their authorization tier before shopping at this Post Exchange. This check is
          non-binding, non-verifiable, and — frankly — non-existent.
        </p>

        {verified ? (
          <div className="border-2 border-accent bg-accent/10 p-6">
            <p className="font-heading text-xl uppercase tracking-widest text-accent mb-2">Authorization Granted</p>
            <p className="text-foreground/80">You are squared away. Welcome to the PX.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setVerified(true)
            }}
            className="flex flex-col gap-3"
          >
            <label className="text-left font-mono uppercase tracking-widest text-primary/70 text-xs">
              Select Your Authorization Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="border-2 border-primary/40 bg-background px-4 py-3 font-mono focus:border-accent outline-none"
            >
              {TIERS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button
              type="submit"
              className="border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-6 py-3 hover:bg-accent hover:border-accent transition-colors"
            >
              Verify
            </button>
          </form>
        )}

        <p className="text-xs text-foreground/50 mt-8">
          This authorization check is non-binding, non-verifiable, and frankly non-existent. It is here for the joke.
        </p>
      </div>
    </section>
  )
}
