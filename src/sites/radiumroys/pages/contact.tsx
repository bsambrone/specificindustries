"use client"

import { useState } from "react"
import { Hero } from "@/components/ui/hero"
import { FaqAccordion } from "@/components/ui/faq-accordion"

const faqItems = [
  {
    question: "Are your products safe?",
    answer: "Friend, we manufacture in compliance with every applicable state and federal disclosure requirement. Where a warning is required, we provide one — usually in a slightly larger font than the law requires. See our Quality Pledge for the full Roy Method.",
  },
  {
    question: "Why is everything from Burbank?",
    answer: "Roy founded the company in Burbank in 1952 and we have not seen a reason to leave. Our facility has been added on to seventeen times. We expect there will be an eighteenth.",
  },
  {
    question: "Do you ship to California?",
    answer: "We do, with the appropriate Proposition 65 disclosure on the outer packaging. We treat that disclosure as a quality endorsement and recommend you do the same.",
  },
  {
    question: "Can I return a product?",
    answer: "All sales are final. Roy stands behind every product, and the products tend to stand behind themselves quite firmly as well — once integrated into the home, most of our items are difficult to uninstall.",
  },
  {
    question: "Where can I see Roy in person?",
    answer: "Roy is, in spirit, present at every Radium Roy's facility, in every conference room, and on every box that leaves our loading dock. He has not made a public appearance since 1968 for reasons the family has chosen not to disclose.",
  },
]

const inquiryReasons = [
  "Product question",
  "Bulk family order",
  "Adverse reaction (we love hearing about these)",
  "Press inquiry",
  "Pemberton estate matters",
  "Compliance question (please specify state)",
  "I would like a Radium Roy's catalog mailed to my home",
]

export default function RadiumRoysContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Hero
        headline="Get in Touch With Roy's Office"
        subheadline="The Pemberton family reads every letter. Most letters are answered within four to six business decades."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-secondary mb-6">
              Send Us a Letter
            </h2>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-4xl">✉️</p>
                <p className="text-xl font-heading font-bold text-secondary">
                  Letter received, friend!
                </p>
                <p className="text-foreground/70">
                  Your message has been printed, archived in our Burbank document vault, and scheduled for
                  review at the next quarterly correspondence meeting.
                </p>
                <p className="text-foreground/50 text-sm">
                  Roy reads every letter personally, in spirit.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-semibold mb-2">
                    Reason for Inquiry
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="">Select a reason...</option>
                    {inquiryReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-secondary text-background rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Send to Roy&apos;s Office
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                Address
              </h3>
              <p className="text-foreground">Roy&apos;s Laboratories</p>
              <p className="text-foreground">Industrial Park 7</p>
              <p className="text-foreground">Burbank, CA 91502</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                Phone
              </h3>
              <p className="text-foreground">REgent 4-1952</p>
              <p className="text-sm text-foreground/70">
                Our switchboard operator is on duty Monday through Friday, 8am to 4:30pm Pacific.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                Correspondence
              </h3>
              <p className="text-secondary">letters@radiumroys.specificindustries.com</p>
              <p className="text-[10px] text-foreground/50 mt-1">
                Or reach a real human:{" "}
                <a href="mailto:bsambrone@gmail.com" className="underline hover:text-secondary transition-colors">
                  bsambrone@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                Press &amp; Pemberton Estate
              </h3>
              <p className="text-foreground">
                Press inquiries are handled by our General Counsel, Bertram J. Schoonover, who has
                forty-six pending motions and welcomes the distraction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-secondary text-center mb-12">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
