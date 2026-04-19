"use client"

import type { FormEvent } from "react"
import { useState } from "react"

// metadata is provided by the barrel PageEntry wrapper, not exported from this client component.

export default function PrechewedContact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-3">Contact</h1>
      <p className="text-lg mb-10" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        We respond to inquiries within 47 jaw-hours.
      </p>

      {submitted ? (
        <div className="p-6 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)", background: "var(--color-surface-alt, #F1EFFA)" }}>
          <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>Inquiry received</div>
          <p className="text-base">Thank you. A Prechewed™ intake specialist will be in touch within 47 jaw-hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-mono uppercase tracking-[0.15em] text-xs" style={{ color: "var(--color-muted, #6C6A7D)" }}>Inquiry category</span>
            <select required className="px-4 py-3 rounded-md border text-base" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
              <option value="">Select a category</option>
              <option>General</option>
              <option>Enterprise</option>
              <option>Press</option>
              <option>Founder&apos;s Reserve waitlist</option>
              <option>Masticator applications</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-mono uppercase tracking-[0.15em] text-xs" style={{ color: "var(--color-muted, #6C6A7D)" }}>Your name</span>
            <input required className="px-4 py-3 rounded-md border text-base" style={{ borderColor: "var(--color-border, #E6E3F0)" }} />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-mono uppercase tracking-[0.15em] text-xs" style={{ color: "var(--color-muted, #6C6A7D)" }}>Email</span>
            <input required type="email" className="px-4 py-3 rounded-md border text-base" style={{ borderColor: "var(--color-border, #E6E3F0)" }} />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-mono uppercase tracking-[0.15em] text-xs" style={{ color: "var(--color-muted, #6C6A7D)" }}>Message</span>
            <textarea required rows={5} className="px-4 py-3 rounded-md border text-base" style={{ borderColor: "var(--color-border, #E6E3F0)" }} />
          </label>

          <button type="submit" className="self-start px-6 py-3 rounded-md font-medium text-white" style={{ background: "var(--color-primary, #5B3FD9)" }}>
            Submit inquiry
          </button>
        </form>
      )}

      <footer className="mt-16 pt-8 border-t text-xs font-mono" style={{ borderColor: "var(--color-border, #E6E3F0)", color: "var(--color-muted, #6C6A7D)" }}>
        For matters our intake team cannot process: bsambrone@gmail.com
      </footer>
    </main>
  )
}
