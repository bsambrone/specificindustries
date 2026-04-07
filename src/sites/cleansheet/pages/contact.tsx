"use client"

import { useState } from "react"
import Image from "next/image"

export const metadata = {
  title: "Contact — The Clean Sheet",
  description:
    "Ready to discuss your laundering needs? We're here to help — discreetly.",
}

const sourceOptions = [
  "Personal wardrobe",
  "Family business",
  "Import/Export (unspecified)",
  "Nightlife management",
  "Pharmaceuticals (independent distribution)",
  "Cash-intensive retail",
  "Prefer not to disclose",
  "My attorney advised me not to answer this",
]

const loadSizeOptions = [
  "Small (under $10,000)",
  "Medium ($10,000 – $100,000)",
  "Large ($100,000 – $1,000,000)",
  "Industrial (please contact us privately)",
]

const paymentOptions = [
  "Cash (unmarked, non-sequential)",
  "Wire transfer (international)",
  "Cryptocurrency",
  "Briefcase drop-off",
  "Other (we don't judge)",
]

const referralOptions = [
  "Word of mouth (associate)",
  "My lawyer",
  "My accountant",
  "Overheard at a marina",
  "Found a business card in a duffel bag",
  "Court-ordered",
]

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [source, setSource] = useState("")
  const [loadSize, setLoadSize] = useState("")
  const [payment, setPayment] = useState("")
  const [referral, setReferral] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    "w-full bg-secondary/10 border border-primary/20 text-foreground placeholder:text-foreground/40 px-4 py-3 focus:outline-none focus:border-accent transition-colors"
  const labelClass =
    "block text-sm font-heading uppercase tracking-wider text-foreground/60 mb-2"

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-secondary/5 py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Ready to discuss your laundering needs? We&apos;re here to help — discreetly,
              professionally, and without judgment.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
              <Image
                src="/sites/cleansheet/contact-hero.png"
                alt="The Clean Sheet reception"
                fill
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-6 bg-primary/5 border-y border-primary/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-2">
              Address
            </h3>
            <p className="text-foreground/70 text-sm">
              742 Bleach Avenue, Suite 100
              <br />
              New York, NY 10013
            </p>
          </div>
          <div>
            <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-2">
              Hours
            </h3>
            <p className="text-foreground/70 text-sm">
              By appointment only.
              <br />
              Walk-ins accepted but not recommended.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-2">
              Phone
            </h3>
            <p className="text-foreground/70 text-sm">
              (212) 555-0147
              <br />
              Please use a secure line.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-2">
              Email
            </h3>
            <p className="text-foreground/70 text-sm">
              consultations@thecleansheet.com
              <br />
              Encrypted correspondence preferred.
            </p>
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-3">
              Client Intake Form
            </h2>
            <p className="text-foreground/60">
              Please complete the following to help us assess your laundering needs.
              All fields are handled with the utmost confidentiality.
            </p>
          </div>

          {submitted ? (
            <div className="border border-accent/40 bg-accent/5 px-8 py-12 text-center">
              <div className="text-4xl mb-4">&#10003;</div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                Inquiry Received
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Thank you. A specialist will contact you through secure channels
                within 24–48 hours. Please destroy this browser history.
              </p>
              <p className="text-foreground/40 text-sm">
                If you do not hear from us, we were never here. Neither were you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={labelClass} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Legal name or preferred alias"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="A secure, non-monitored address preferred"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Burner numbers accepted"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="source">
                  Source of Garments
                </label>
                <select
                  id="source"
                  required
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select origin of items
                  </option>
                  {sourceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="load-size">
                  Estimated Load Size
                </label>
                <select
                  id="load-size"
                  required
                  value={loadSize}
                  onChange={(e) => setLoadSize(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select load volume
                  </option>
                  {loadSizeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="payment">
                  Preferred Payment Method
                </label>
                <select
                  id="payment"
                  required
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select payment method
                  </option>
                  {paymentOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="referral">
                  How Did You Hear About Us?
                </label>
                <select
                  id="referral"
                  required
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select referral source
                  </option>
                  {referralOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="notes">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Please do not include specifics about ongoing investigations."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
              >
                Request Discreet Consultation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Real contact */}
      <section className="py-16 px-6 text-center">
        <p className="text-foreground/40 text-sm">
          General inquiries:{" "}
          <a
            href="mailto:bsambrone@gmail.com"
            className="text-foreground/60 hover:text-accent transition-colors underline underline-offset-4"
          >
            bsambrone@gmail.com
          </a>
        </p>
      </section>
    </div>
  )
}
