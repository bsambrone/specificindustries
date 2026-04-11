"use client"

import { useState, FormEvent } from "react"

const EMPLOYEE_OPTIONS = [
  "100–500",
  "500–1,000",
  "1,000–5,000",
  "5,000+",
  "More than I care to count",
]

const CONCERN_OPTIONS = [
  "Excessive Morale",
  "Raise Requests",
  "Union Activity",
  "General Restlessness",
  "Unauthorized Smiling",
  "Other",
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded border-2 border-primary bg-secondary/5 p-8 text-center">
        <p className="text-lg leading-relaxed">
          Thank you. Your inquiry has been logged in case #04781-B. A member of the Gristmill
          team will be in touch within three to five business quarters. Please do not contact
          us in the interim.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-heading font-bold uppercase tracking-wide text-secondary">
          Company Name
        </label>
        <input
          type="text"
          required
          className="w-full rounded border-2 border-secondary/30 bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-heading font-bold uppercase tracking-wide text-secondary">
          Number of Employees
        </label>
        <select
          required
          className="w-full rounded border-2 border-secondary/30 bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select a range
          </option>
          {EMPLOYEE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-heading font-bold uppercase tracking-wide text-secondary">
          Primary Workforce Concern
        </label>
        <select
          required
          className="w-full rounded border-2 border-secondary/30 bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select a concern
          </option>
          {CONCERN_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-heading font-bold uppercase tracking-wide text-secondary">
          Message
        </label>
        <textarea
          required
          rows={4}
          className="w-full rounded border-2 border-secondary/30 bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-primary px-8 py-3 font-heading font-bold uppercase tracking-wide text-background transition hover:opacity-90"
      >
        Submit for Review
      </button>
    </form>
  )
}
