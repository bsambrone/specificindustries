"use client"

import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

export function PartnershipsForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      router.push("/partnerships/received")
    }, 400)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-xs uppercase tracking-wider font-heading text-foreground/70 mb-2" htmlFor="industry">
          Industry Name
        </label>
        <input
          id="industry"
          type="text"
          required
          className="w-full px-4 py-3 rounded border border-foreground/20 bg-background text-foreground focus:border-primary/50 focus:outline-none"
          placeholder="e.g., Artisan Screw Repair"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-heading text-foreground/70 mb-2" htmlFor="tam">
          Estimated Addressable Market (participants)
        </label>
        <input
          id="tam"
          type="number"
          min="1"
          max="11000"
          required
          className="w-full px-4 py-3 rounded border border-foreground/20 bg-background text-foreground focus:border-primary/50 focus:outline-none"
          placeholder="Maximum: 11,000"
        />
        <p className="text-xs text-foreground/50 mt-1 italic">Submissions with a TAM exceeding 11,000 will be declined automatically.</p>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-heading text-foreground/70 mb-2" htmlFor="product">
          Primary Product or Service
        </label>
        <input
          id="product"
          type="text"
          required
          className="w-full px-4 py-3 rounded border border-foreground/20 bg-background text-foreground focus:border-primary/50 focus:outline-none"
          placeholder="Describe in plain language"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-heading text-foreground/70 mb-2" htmlFor="unserved">
          Why has your industry gone unserved to date?
        </label>
        <textarea
          id="unserved"
          rows={4}
          required
          className="w-full px-4 py-3 rounded border border-foreground/20 bg-background text-foreground focus:border-primary/50 focus:outline-none resize-y"
          placeholder="Please be candid. Vague answers are acceptable."
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-heading text-foreground/70 mb-2" htmlFor="attachment">
          Supporting Documentation (optional)
        </label>
        <input
          id="attachment"
          type="file"
          className="w-full text-sm text-foreground/70"
        />
        <p className="text-xs text-foreground/50 mt-1 italic">Attachments are filed upon receipt. Review is not guaranteed.</p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-3 rounded-lg bg-primary text-background font-heading font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit for Evaluation"}
      </button>

      <p className="text-xs text-foreground/50 text-center italic">
        Form submissions are received, filed, and responded to at our sole discretion.
      </p>
    </form>
  )
}
