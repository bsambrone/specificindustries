"use client"

import { useState } from "react"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Contact — Pig Milk Co.",
  description: "Get in touch with the Pig Milk Co. team.",
}

const faqItems = [
  {
    question: "Is pig milk real?",
    answer: "Legally, we cannot answer this question.",
  },
  {
    question: "Is it safe to drink?",
    answer:
      "Our lawyers have asked us to say 'consult your physician.' Our pigs have asked us to say 'absolutely.'",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We tried once. It did not go well. We don\u2019t talk about Belgium.",
  },
  {
    question: "Can I visit the farm?",
    answer: "No. The pigs value their privacy.",
  },
  {
    question: "Are you hiring?",
    answer: "Always. Nobody stays long.",
  },
]

const inquiryReasons = [
  "Pig milk emergency",
  "Bulk orders (100+ gallons)",
  "I have questions about my pig",
  "Legal threats",
  "Marriage proposal (for Earl)",
  "Other (we're scared to ask)",
]

export default function PigMilkContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      {/* Hero */}
      <Hero
        headline="Get in Touch"
        subheadline="We're here to help. Mostly."
      />

      {/* Two-column layout */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-4xl">🐷</p>
                <p className="text-xl font-heading font-bold text-primary">
                  Message sent!
                </p>
                <p className="text-foreground/70">
                  Our team will respond within 3-5 business pigs.
                </p>
                <p className="text-foreground/50 text-sm">
                  Your message has been printed out and placed in the barn. A pig is sitting on it. We&apos;re not sure if that counts as &quot;processing&quot; but it&apos;s the best we can do.
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
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Details + Image */}
          <div className="space-y-8">
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/sites/pigmilk/contact-office.png"
                alt="Pig Milk Co. office"
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Address
                </h3>
                <p className="text-foreground">742 Sow Lane, Hogtown, WI 53719</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Phone
                </h3>
                <p className="text-foreground">1-800-PIG-MILK</p>
                <p className="text-sm text-foreground/70">
                  Please hold. The hold music is just oinking.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Email
                </h3>
                <p className="text-primary">help@pigmilk.specificindustries.com</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Hours
                </h3>
                <p className="text-foreground">
                  Monday-Friday, Dawn to Whenever the Pigs Get Tired
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Emergency Pig Milk Hotline
                </h3>
                <p className="text-foreground">
                  Available 24/7. We have never received a call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
