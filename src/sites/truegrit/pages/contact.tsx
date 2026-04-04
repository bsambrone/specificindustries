"use client"

import { useState } from "react"
import Image from "next/image"

export const metadata = {
  title: "Contact — True Grit Personal Care",
  description: "Reach our customer support team. Protective gear is their problem, not yours.",
}

const departments = [
  {
    name: "Customer Support",
    description: "For product questions, usage guidance, and incident reports",
    hours: "Mon–Fri, 8am–5pm EST (closed during bathroom breaks, which are frequent)",
  },
  {
    name: "Bulk Orders & Procurement",
    description: "For organizations brave enough to supply True Grit at scale",
    hours: "By appointment only. NDAs required.",
  },
  {
    name: "Medical Liaison Office",
    description: "For healthcare professionals seeking product documentation",
    hours: "24/7 (unfortunately)",
  },
  {
    name: "Legal Department",
    description: "For waiver-related inquiries and ongoing matters",
    hours: "They never stop working. Neither do the claims.",
  },
]

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [urgency, setUrgency] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [hotlineRequested, setHotlineRequested] = useState(false)

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
              Our customer support team is standing by. Literally standing — they
              can&apos;t sit down. They tested the product.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
              <Image
                src="/sites/truegrit/contact-warehouse.png"
                alt="A concerned warehouse worker next to a ringing phone"
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
              All submissions are reviewed within 3–5 business days. Incident reports are
              prioritized.
            </p>
          </div>

          {submitted ? (
            <div className="border border-accent/40 bg-accent/5 px-8 py-12 text-center">
              <div className="text-4xl mb-4">&#9888;</div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
                Inquiry Received
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Your message has been filed. A representative will reach out once they&apos;ve
                completed their own recovery protocol.
              </p>
              <p className="text-foreground/40 text-sm">
                Average response time: 3–5 business days. Incident reports: 4–6 hours.
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
                  <option value="product">Product Question</option>
                  <option value="order">Order Inquiry</option>
                  <option value="bulk">Bulk / Institutional Orders</option>
                  <option value="incident">Incident Report</option>
                  <option value="medical">Medical Professional Inquiry</option>
                  <option value="legal">Legal Matter</option>
                  <option value="testimonial">Testimonial Submission</option>
                  <option value="other">Other (Please Describe)</option>
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
                  <option value="low">Low — General question, no active discomfort</option>
                  <option value="medium">Medium — Mild concern, some regret</option>
                  <option value="high">High — Significant discomfort, reconsidering choices</option>
                  <option value="critical">Critical — Send help immediately</option>
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
                  placeholder="Describe your situation in as much detail as you're comfortable sharing. Medical details are not required but may expedite routing."
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
              True Grit maintains several specialized departments to address the wide range of
              inquiries we receive.
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

      {/* Abrasion Hotline */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
            Abrasion Hotline
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            For urgent post-use emergencies, call our 24/7 Abrasion Hotline. Our specialists are
            trained in de-escalation, both emotional and dermatological. Response times vary based
            on grit level used.
          </p>
          {hotlineRequested ? (
            <p className="text-accent font-heading text-sm uppercase tracking-wider">
              Callback requested. A specialist is steeling themselves now.
            </p>
          ) : (
            <button
              onClick={() => setHotlineRequested(true)}
              className="inline-block border border-primary text-primary font-heading text-sm uppercase tracking-wider px-8 py-3 hover:border-accent hover:text-accent transition-colors"
            >
              Request Callback
            </button>
          )}
        </div>
      </section>

      {/* Real contact */}
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
