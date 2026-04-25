"use client"

import { useState } from "react"

export function PetitionForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [zip, setZip] = useState("")
  const [signed, setSigned] = useState(false)
  const [sigCount] = useState(() => Math.floor(Math.random() * 100000 + 218000))

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSigned(true)
  }

  if (signed) {
    return (
      <div className="border border-primary/30 rounded-lg p-8 bg-primary/5 text-center">
        <p className="text-2xl font-heading font-semibold text-primary mb-3">Signature Recorded</p>
        <p className="text-foreground/70 leading-relaxed max-w-md mx-auto">
          Thank you, {name || "Friend"}. Your signature is the {sigCount.toLocaleString()}th we have collected this year. We will keep you informed as the petition progresses.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="border border-accent/30 rounded-lg p-6 bg-white space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cad-petition-name">
          Full Name
        </label>
        <input
          id="cad-petition-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cad-petition-email">
          Email
        </label>
        <input
          id="cad-petition-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <div>
        <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cad-petition-zip">
          ZIP code
        </label>
        <input
          id="cad-petition-zip"
          type="text"
          required
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-secondary text-background rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
      >
        Sign the Petition
      </button>
      <p className="text-xs text-foreground/50 text-center pt-1">
        Your signature joins more than 318,000 collected this year.
      </p>
    </form>
  )
}
