"use client"

import type { PageMetadata } from "@/themes"
import { useState } from "react"

export const metadata: PageMetadata = {
  title: "Contact — Institute for the Study of Pointless Metrics",
  description: "File an observation with the Institute. Submissions are reviewed on the first Thursday of every quarter.",
}

export default function PointlessMetricsContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Institute Correspondence</p>
        <h1 className="font-heading text-4xl text-primary mb-3">File an Observation</h1>
        <p className="text-foreground/75 mb-10">
          The Institute accepts observations year-round and reviews them on the first Thursday of every quarter. Submissions are processed in the order received. Most are not acted upon.
        </p>

        {submitted ? (
          <div className="bg-white border border-primary/60 rounded-sm p-6">
            <h2 className="font-heading text-xl text-primary mb-2">Observation received</h2>
            <p className="text-sm text-foreground/80">
              Thank you. Your observation has been logged against a notional correlation index. A follow-up is unlikely.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="bg-white border border-accent/40 rounded-sm p-6 space-y-5"
          >
            <Field label="Observer name" name="observer" placeholder="Your legal name, as appears on prior credentials" />
            <Field label="Institutional email" name="email" type="email" placeholder="you@institution.tld" />
            <Field label="Observed phenomenon" name="phenomenon" placeholder="e.g., an unusually high rate of 'ecosystem' usage at standing desks" />
            <Field label="Hypothesized correlation" name="hypothesis" placeholder="If A, then B — with estimated direction" />
            <Field label="Estimated r-value" name="r" placeholder="−1.00 to 1.00" />
            <Field label="Funding source" name="funding" placeholder="Self, institutional, or unnamed" />
            <button type="submit" className="px-5 py-2 bg-primary text-white rounded-sm font-semibold hover:opacity-90">
              File observation
            </button>
          </form>
        )}

        <p className="mt-10 text-[11px] text-foreground/55 text-center">
          For matters requiring human review, correspondence may be directed to{" "}
          <a href="mailto:bsambrone@gmail.com" className="underline">bsambrone@gmail.com</a>.
        </p>
      </div>
    </main>
  )
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-foreground/85 mb-1">{label}</span>
      <input type={type} name={name} placeholder={placeholder} className="w-full px-3 py-2 border border-accent/50 rounded-sm bg-background focus:border-primary focus:outline-none" />
    </label>
  )
}
