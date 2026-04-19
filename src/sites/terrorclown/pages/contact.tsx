"use client"

import type { FormEvent } from "react"
import { useState } from "react"

export default function TerrorClownContact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
        Customer Letters Department
      </div>
      <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-3" style={{ color: "var(--color-text, #1F1A17)" }}>
        Write to us.
      </h1>
      <p className="text-lg mb-2" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.75 }}>
        Every letter is personally reviewed by our President. We reply within four to six weeks by return post.
      </p>
      <p className="text-sm italic mb-10" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.6 }}>
        The Pennywhistle Play Company &middot; 1 Toymakers Lane &middot; Millbrook, OH 45344
      </p>

      {submitted ? (
        <div className="p-6 border-2" style={{ borderColor: "var(--color-secondary, #3E6C6E)", background: "#FFFFFF60" }}>
          <div className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
            Letter received
          </div>
          <p className="text-base" style={{ color: "var(--color-text, #1F1A17)" }}>
            Thank you. Your letter has been logged and will be reviewed by our Customer Letters Department. A reply will arrive within four to six weeks by return post.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-1 text-sm">
            <span className="uppercase tracking-[0.2em] text-xs" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
              Nature of letter
            </span>
            <select
              required
              className="px-4 py-3 border-2 text-base bg-transparent"
              style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)" }}
            >
              <option value="">Please select</option>
              <option>Commendation</option>
              <option>Question or inquiry</option>
              <option>Warranty concern</option>
              <option>Behavioral report</option>
              <option>Custom commission waitlist</option>
              <option>Press or trade</option>
              <option>Other</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="uppercase tracking-[0.2em] text-xs" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
              Your name
            </span>
            <input
              required
              className="px-4 py-3 border-2 text-base bg-transparent"
              style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)" }}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="uppercase tracking-[0.2em] text-xs" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
              Your return address (or email, should you prefer)
            </span>
            <input
              required
              className="px-4 py-3 border-2 text-base bg-transparent"
              style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)" }}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="uppercase tracking-[0.2em] text-xs" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
              Your letter
            </span>
            <textarea
              required
              rows={8}
              className="px-4 py-3 border-2 text-base bg-transparent"
              style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)" }}
            />
          </label>

          <button
            type="submit"
            className="self-start px-8 py-3 font-semibold text-white"
            style={{ background: "var(--color-primary, #A8352A)" }}
          >
            Post your letter
          </button>
        </form>
      )}

      <footer className="mt-16 pt-8 border-t text-xs" style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)", opacity: 0.55 }}>
        For matters our post-based intake cannot accommodate in a timely fashion: bsambrone@gmail.com
      </footer>
    </main>
  )
}
