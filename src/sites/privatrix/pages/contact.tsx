"use client"

import { useState } from "react"
import { Hero } from "@/components/ui/hero"
import { useCart } from "@/components/commerce/cart-provider"

export const metadata = {
  title: "Contact — Privatrix",
  description: "Schedule a Privacy Consultation. A Privacy Specialist will reach out within 47 business days.",
}

const ORG_TYPES = [
  "Financial Services",
  "Healthcare",
  "Government / Public Sector",
  "Higher Education",
  "Other (please specify in description)",
]

const URGENCY_LEVELS = [
  "Routine — quarterly review cadence",
  "Elevated — board-meeting prep",
  "Urgent — auditor coming Tuesday",
  "Existential — procurement frozen",
]

const ANXIETY_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

export default function PrivatrixContact() {
  const [submitted, setSubmitted] = useState<{ ref: number } | null>(null)
  const { showToast } = useCart()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    showToast("A Privacy Specialist will reach out within 47 business days.")
    setSubmitted({ ref: Math.floor(Math.random() * 90000 + 10000) })
  }

  return (
    <>
      <Hero
        headline="Schedule a Privacy Consultation"
        subheadline="Our intake process ensures every consultation is matched with the appropriate Privacy Specialist within our 47-business-day SLA."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {submitted !== null ? (
            <div className="text-center py-12 space-y-4 border border-primary/10 rounded-lg bg-primary/5 p-12">
              <p className="text-2xl font-heading font-bold text-primary">
                Intake form received.
              </p>
              <p className="text-foreground/70 max-w-lg mx-auto">
                Your submission has been routed to our Customer Reassurance organization. A Privacy Specialist will reach out within 47 business days. In the interim, please consider purchasing the GDPR-Adjacent™ Compliance Pack.
              </p>
              <p className="text-xs text-foreground/40 mt-6">
                Reference number: PRV-{submitted.ref}-π
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-primary/10 rounded-lg p-8">
              <p className="text-xs uppercase tracking-wider text-foreground/50 font-semibold mb-2">
                14 Required Fields · Estimated Completion: 11 minutes
              </p>

              <Field label="Full Legal Name" required>
                <input type="text" required className={inputClass} />
              </Field>
              <Field label="Preferred Honorific (e.g., Esq., CIPP/E, MBA)" required>
                <input type="text" required className={inputClass} />
              </Field>
              <Field label="Corporate Email Address" required>
                <input type="email" required className={inputClass} />
              </Field>
              <Field label="Direct Phone (no extensions)" required>
                <input type="tel" required className={inputClass} />
              </Field>
              <Field label="Organization Name" required>
                <input type="text" required className={inputClass} />
              </Field>
              <Field label="Organization Type" required>
                <select required className={inputClass} defaultValue="">
                  <option value="" disabled>Select one...</option>
                  {ORG_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Annual Revenue (USD)" required>
                <input type="text" required placeholder="e.g., $250,000,000" className={inputClass} />
              </Field>
              <Field label="Number of Employees" required>
                <input type="number" required min={1} className={inputClass} />
              </Field>
              <Field label="Compliance Frameworks Currently Required" required>
                <input type="text" required placeholder="e.g., GDPR, SOC 2, HIPAA, NIST 800-53" className={inputClass} />
              </Field>
              <Field label="Approximate Compliance Anxiety Level (1-10)" required>
                <select required className={inputClass} defaultValue="">
                  <option value="" disabled>Select one...</option>
                  {ANXIETY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Preferred Auditor Surname Initial" required>
                <input type="text" required maxLength={1} placeholder="A single letter" className={inputClass} />
              </Field>
              <Field label="Procurement Cycle Timing (next quarter, etc.)" required>
                <input type="text" required className={inputClass} />
              </Field>
              <Field label="Urgency" required>
                <select required className={inputClass} defaultValue="">
                  <option value="" disabled>Select one...</option>
                  {URGENCY_LEVELS.map((u) => <option key={u}>{u}</option>)}
                </select>
              </Field>
              <Field label="Brief Description of Compliance Need" required>
                <textarea required rows={4} className={inputClass} />
              </Field>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-accent text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Submit Intake Form
                </button>
                <p className="text-xs text-foreground/50 italic mt-4 text-center">
                  By submitting, you acknowledge that a Privacy Specialist will reach out within 47 business days, and that this contact form does not constitute a service-level agreement.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="py-12 px-4 bg-primary/5 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center text-sm text-foreground/60 space-y-2">
          <p>
            <strong>Privatrix Headquarters:</strong> 1700 Compliance Drive, Suite π · Trenton, NJ 08611
          </p>
          <p>
            <strong>Office Hours:</strong> Monday–Thursday, 10am–3pm ET, by appointment only
          </p>
          <p className="text-[10px] text-foreground/40 pt-4 italic">
            For urgent matters our intake team cannot process: <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary transition-colors">bsambrone@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  )
}

const inputClass =
  "w-full px-4 py-2 border border-primary/20 rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}
