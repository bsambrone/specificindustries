"use client"

import { useState } from "react"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Contact Command — Squared Away Supply Co.",
  description: "Request to contact a command representative at the Official Unofficial Post Exchange.",
}

const CLASSIFICATIONS = [
  "Morale-related",
  "Morale-adjacent",
  "Entirely morale-free",
  "Routing to PSYOP",
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <>
      <section className="py-12 px-4 border-b-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">
            FORM SQR-AR-3 · UNCLASSIFIED // FOUO
          </p>
          <h1 className="font-heading text-3xl md:text-4xl text-primary uppercase tracking-widest mb-2">
            Request to Contact a Command Representative
          </h1>
          <p className="text-foreground/80">
            Per AR 25-50, all inquiries must be routed through the official channels below. Expect a 4–6 week review
            cycle. A response is not guaranteed and may be disappointing.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="border-2 border-accent bg-accent/10 p-6 text-center">
              <p className="font-heading uppercase tracking-widest text-accent mb-2">Inquiry Logged</p>
              <p className="text-foreground/80 text-sm">An E-6 will review it during business hours. Thank you for your service.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="space-y-4"
            >
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Full Name</label>
                <input required type="text" className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Rank / Grade</label>
                <input type="text" className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Unit / Command</label>
                <input type="text" className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Inquiry Classification</label>
                <select className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-3 font-mono focus:border-accent outline-none">
                  {CLASSIFICATIONS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-primary/70">Message</label>
                <textarea required rows={5} className="mt-1 w-full border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none" />
              </div>
              <button
                type="submit"
                className="w-full border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-6 py-3 hover:bg-accent hover:border-accent transition-colors"
              >
                Route to Command
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="py-6 px-4 bg-primary/5 border-t-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center font-mono text-[10px] md:text-xs uppercase tracking-widest text-primary/60">
          UNCLASSIFIED // FOUO — For inquiries that refuse to be squared away:&nbsp;
          <a href="mailto:bsambrone@gmail.com" className="underline hover:text-accent">
            bsambrone@gmail.com
          </a>
        </div>
      </section>
    </>
  )
}
