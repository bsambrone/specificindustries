"use client"

import { useState } from "react"

export function PledgeForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [signed, setSigned] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSigned(true)
  }

  if (signed) {
    return (
      <div className="border border-primary/30 rounded-lg p-8 bg-primary/5 text-center">
        <p className="text-2xl font-heading font-semibold text-primary mb-3">Pledge Received</p>
        <p className="text-foreground/70 leading-relaxed max-w-md mx-auto">
          Thank you, {name || "Member"}. Your pledge has been logged with the Campaign. A digital pledge card will be issued in the next quarterly batch.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="border border-accent/30 rounded-lg p-6 bg-white space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-pledge-name">
          Name
        </label>
        <input
          id="cso-pledge-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-pledge-email">
          Email
        </label>
        <input
          id="cso-pledge-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary text-background rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
      >
        Sign the Pledge
      </button>
    </form>
  )
}
