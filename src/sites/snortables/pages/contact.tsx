"use client"

import { useState } from "react"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Contact — Snortables",
  description: "Get in touch with the Snortables team.",
}

const faqItems = [
  {
    question: "Is this legal?",
    answer: "Our Director of Regulatory Avoidance assures us that the answer is 'technically not illegal in most jurisdictions.' We have checked. Several times. With different lawyers.",
  },
  {
    question: "Can I snort two products at once?",
    answer: "We call this 'stacking' and while we cannot officially recommend it, our quality control team does it constantly. Results vary. Side effects may include 'flavor confusion' and 'ambitious sneezing.'",
  },
  {
    question: "Why does my mail carrier look at me like that?",
    answer: "We have no control over the judgmental expressions of postal service employees. Our packaging clearly states 'Definitely Just Vitamins.' If that doesn't satisfy them, nothing will.",
  },
  {
    question: "Is this the same as cocaine?",
    answer: "No. Absolutely not. We cannot stress this enough. Snortables are a nutrient delivery system. Cocaine is an illegal narcotic. The only similarities are the delivery mechanism, the packaging aesthetic, and the enthusiasm of our user base. That's it.",
  },
  {
    question: "Can I return a product?",
    answer: "All sales are final. You cannot un-snort a turkey. We've tried. The physics don't work.",
  },
]

const inquiryReasons = [
  "Product question",
  "Bulk order (no questions asked)",
  "Adverse nasal event",
  "Legal inquiry (please specify jurisdiction)",
  "I snorted something that wasn't Snortables and need guidance",
  "Partnership opportunity",
  "Noise complaint about our pulverization facility",
]

export default function SnortablesContact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Hero
        headline="Get In Touch"
        subheadline="Not with the powder — with us."
        dark
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
                <p className="text-4xl">👃</p>
                <p className="text-xl font-heading font-bold text-primary">
                  Message received!
                </p>
                <p className="text-foreground/70">
                  Our team will respond within 2-3 business insufflations.
                </p>
                <p className="text-foreground/50 text-sm">
                  Your message has been printed, pulverized into a fine powder, and snorted by our customer service team. They will absorb its contents nasally and respond accordingly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const confirmed = window.confirm(
                    "Are you sure you want to contact Snortables?\n\n" +
                    "By clicking OK, you acknowledge that:\n" +
                    "• Our response may arrive in powder form\n" +
                    "• Response times are measured in 'insufflation cycles'\n" +
                    "• This message may be used as evidence in future regulatory proceedings\n\n" +
                    "Proceed?"
                  )
                  if (confirmed) setSubmitted(true)
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
                  className="w-full px-8 py-4 bg-primary text-background rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
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
                src="/sites/snortables/contact.png"
                alt="Snortables customer support center"
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Address
                </h3>
                <p className="text-foreground">1337 Insufflation Blvd, Suite 420, San Francisco, CA 94107</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Phone
                </h3>
                <p className="text-foreground">1-800-SNORT-IT</p>
                <p className="text-sm text-foreground/70">
                  Please hold. The hold music is just the sound of a wood chipper.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Email
                </h3>
                <p className="text-primary">help@snortables.specificindustries.com</p>
                <p className="text-[10px] text-foreground/50 mt-1">
                  Or reach a real human:{" "}
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
                  Monday-Friday, 6am-10pm (we never sleep, the JOLT won&apos;t let us)
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-1">
                  Nasal Emergency Hotline
                </h3>
                <p className="text-foreground">
                  Available 24/7. Staffed by our quality control team. They&apos;re already up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-primary/5">
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
