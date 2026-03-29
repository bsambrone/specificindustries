"use client"

import { useState } from "react"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Contact — Inflatable Anchors Co.",
  description: "Get in touch with the Inflatable Anchors Co. team.",
}

const inquiryReasons = [
  "Product question",
  "Anchor emergency (it floated away)",
  "Bulk order inquiry",
  "Warranty claim (good luck)",
  "I just want to talk to someone about anchors",
  "Media / press inquiry",
  "Other (we're curious)",
]

export default function InflatableAnchorsContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Hero
        headline="Contact Us"
        subheadline="We're here to help. Retrieval times may vary."
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-4xl">⚓</p>
                <p className="text-xl font-heading font-bold text-primary">
                  Message sent!
                </p>
                <p className="text-foreground/70">
                  Skip Bayliner will respond within 1-3 business tides.
                </p>
                <p className="text-foreground/50 text-sm">
                  Your message has been printed, laminated, and attached to an inflatable anchor. It is currently floating somewhere in the Gulf of Mexico. Skip is en route by kayak.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const confirmed = window.confirm(
                    "Are you sure you want to contact Inflatable Anchors Co.?\n\n" +
                    "By clicking OK, you acknowledge that:\n" +
                    "• Skip Bayliner will respond with 'overwhelming enthusiasm'\n" +
                    "• Response times are measured in 'tides' (1 tide ≈ 12.4 hours)\n" +
                    "• Captain Chuck may call you personally to demonstrate the product\n\n" +
                    "Proceed?"
                  )
                  if (confirmed) setSubmitted(true)
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-semibold mb-2">Reason for Inquiry</label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="">Select a reason...</option>
                    {inquiryReasons.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
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
                src="/sites/inflatableanchors/contact-hq.png"
                alt="Inflatable Anchors Co. World Headquarters"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  World Headquarters
                </h3>
                <p className="text-foreground">Pier Nowhere, Slip 0</p>
                <p className="text-foreground">Anchorage, AK 99501</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Phone
                </h3>
                <p className="text-foreground">1-800-INF-LATE</p>
                <p className="text-sm text-foreground/70">
                  Hold music is the sound of waves and distant inflating.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Email
                </h3>
                <p className="text-primary">ahoy@inflatableanchors.specificindustries.com</p>
                <p className="text-[10px] text-foreground/50 mt-1">
                  Preferred method: carrier pigeon. Backup:{" "}
                  <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary transition-colors">
                    bsambrone@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Hours
                </h3>
                <p className="text-foreground">
                  Monday-Friday, High Tide to Low Tide
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Anchor Emergency Hotline
                </h3>
                <p className="text-foreground">
                  Available 24/7. Response time: 1-3 tides.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
