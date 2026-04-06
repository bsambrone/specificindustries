"use client"

import { useState } from "react"
import Image from "next/image"

export const metadata = {
  title: "Contact — Elder Party",
  description: "Reach the Elder Party. We have been expecting your inquiry.",
}

const departments = [
  {
    name: "Constituent Services",
    description: "For general supporter inquiries, order questions, and membership concerns",
    hours: "Mon–Fri, 9am–5pm EST (closed during alignment events, which occur more frequently than expected)",
  },
  {
    name: "Dimensional Affairs Liaison",
    description: "For matters involving reality displacement, cross-dimensional correspondence, and timeline discrepancies",
    hours: "Operating hours are not linear. Your inquiry will be received before you send it.",
  },
  {
    name: "Volunteer Operations",
    description: "For canvassing assignments, rally coordination, and ceremonial role inquiries",
    hours: "By appointment. The appointment has already been made.",
  },
  {
    name: "Legal & Warding",
    description: "For matters of a sensitive nature, including jurisdictional disputes and protective circle consultations",
    hours: "They are always present. You may not always sense them.",
  },
]

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [urgency, setUrgency] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    "w-full bg-secondary/30 border border-primary/20 text-foreground placeholder:text-foreground/40 px-4 py-3 rounded-none focus:outline-none focus:border-accent transition-colors"
  const labelClass =
    "block text-sm font-heading uppercase tracking-wider text-foreground/60 mb-2"

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-secondary text-foreground py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight uppercase tracking-wide">
              Contact Us
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              The Elder Party welcomes correspondence from all who have heard the call.
              We were already aware of your intention to reach out. We look forward to
              what you will say.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
              <Image
                src="/sites/elderparty/contact-hero.png"
                alt="Elder Party contact office"
                fill
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide mb-3">
              Submit an Inquiry
            </h2>
            <p className="text-foreground/60">
              All submissions are received and reviewed. Response times vary by urgency and
              dimensional proximity. Your message has already arrived.
            </p>
          </div>

          {submitted ? (
            <div className="border border-accent/40 bg-accent/5 px-8 py-12 text-center">
              <div className="text-4xl mb-4">&#10070;</div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
                Inquiry Received
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Your message has been logged and transmitted to the appropriate department. A
                representative will contact you in due course — or has already, depending on
                how you experience time. Check your earliest memories.
              </p>
              <p className="text-foreground/40 text-sm">
                Average response time: 3–5 business days. Dimensional Affairs matters: outside standard temporal frameworks.
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
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="subject">
                  Subject
                </label>
                <select
                  id="subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="general">General Inquiry</option>
                  <option value="volunteer">Volunteer Question</option>
                  <option value="donation">Donation Question</option>
                  <option value="rally">Rally RSVP</option>
                  <option value="dimensional">Dimensional Disturbance</option>
                  <option value="endorsement">Endorsement Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="urgency">
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  required
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    How urgent is this?
                  </option>
                  <option value="low">Low — General question, reality is stable</option>
                  <option value="medium">Medium — Mild concern, minor anomalies present</option>
                  <option value="high">High — Significant disturbance, immediate response preferred</option>
                  <option value="critical">Critical — The stars have aligned ahead of schedule</option>
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry in as much detail as you are comfortable sharing. The Party is patient. The Party has always been patient."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 px-6 bg-secondary/30 border-y border-primary/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
              Departments
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              The Elder Party maintains several specialized departments to address the full
              range of constituent inquiries, including those of a non-standard nature.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="border border-primary/10 bg-background px-6 py-8"
              >
                <h3 className="text-lg font-heading font-semibold text-primary uppercase tracking-wide mb-2">
                  {dept.name}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-3">
                  {dept.description}
                </p>
                <p className="text-foreground/40 text-xs">{dept.hours}</p>
              </div>
            ))}
          </div>
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
