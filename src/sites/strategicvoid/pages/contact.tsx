"use client"

import { useState } from "react"

export const metadata = {
  title: "Contact — Strategic Void Consulting",
  description: "Schedule an alignment assessment.",
}

const offices = [
  {
    city: "New York",
    address: "745 Alignment Avenue\n42nd Floor\nNew York, NY 10019",
  },
  {
    city: "London",
    address: "12 Synergy Lane\nCanary Wharf\nLondon EC2A 4BQ",
  },
  {
    city: "Singapore",
    address: "1 Optimization Drive\n#38-01\nSingapore 018936",
  },
  {
    city: "Omaha",
    address: "The WeWork on 72nd Street\nConference Room B\n(when available)",
  },
]

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [callbackRequested, setCallbackRequested] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    "w-full bg-secondary/30 border border-primary/20 text-foreground placeholder:text-foreground/40 px-4 py-3 focus:outline-none focus:border-accent transition-colors"
  const labelClass = "block text-sm font-heading uppercase tracking-wider text-foreground/60 mb-2"

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Schedule an Alignment Assessment
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Our Alignment Partners are ready to evaluate your organization&apos;s current
            productivity levels and identify the fastest path to sustained strategic ambiguity.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="border border-accent/40 bg-accent/5 px-8 py-12 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                Assessment Request Received
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                Your request has been aligned with our intake pipeline. A synergy specialist will
                reach out within 6–8 business quarters.
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
                  placeholder="Your full name"
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
                  placeholder="you@yourorganization.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="company">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Organization name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="company-size">
                  Company Size
                </label>
                <select
                  id="company-size"
                  required
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select organizational scale
                  </option>
                  <option value="1-50">1–50 stakeholders</option>
                  <option value="51-500">51–500 alignment participants</option>
                  <option value="501-5000">501–5,000 synergy units</option>
                  <option value="5001-50000">5,001–50,000 optimization targets</option>
                  <option value="50000+">50,000+ (enterprise singularity)</option>
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current alignment challenges, productivity concerns, or areas where outcomes have become inconveniently measurable."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
              >
                Request Assessment
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 px-6 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">Our Offices</h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Strategic Void maintains a global presence to ensure that no time zone is left
              unaligned.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office) => (
              <div key={office.city} className="border border-primary/10 bg-secondary/20 px-6 py-8">
                <h3 className="text-lg font-heading font-semibold text-primary mb-3">
                  {office.city}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed whitespace-pre-line">
                  {office.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Synergy Hotline */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Synergy Hotline</h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            For urgent alignment emergencies, call our 24/7 Synergy Hotline. Our specialists are
            trained to de-escalate productivity spikes and restore strategic ambiguity in as few as
            72 hours.
          </p>
          {callbackRequested ? (
            <p className="text-accent font-heading text-sm uppercase tracking-wider">
              Callback request aligned.
            </p>
          ) : (
            <button
              onClick={() => setCallbackRequested(true)}
              className="inline-block border border-primary text-primary font-heading text-sm uppercase tracking-wider px-8 py-3 hover:border-accent hover:text-accent transition-colors"
            >
              Request Callback
            </button>
          )}
        </div>
      </section>

      {/* General Inquiries */}
      <section className="pb-16 px-6 text-center">
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
