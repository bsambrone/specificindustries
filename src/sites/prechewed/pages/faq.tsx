import Link from "next/link"

export const metadata = {
  title: "FAQ — Prechewed™",
  description:
    "Answers to every question about Pre-Oral Hydrolysis™, Certified Masticators, pouches, and the Bolus Protocol.",
}

const faqs = [
  {
    q: "Is Prechewed™ vegan?",
    a: "Yes. All pouches meet Bolus-Vegan™ standards. Our Certified Masticators do not consume product during the hydrolysis process, and no animal-derived enzymes are introduced post-mastication.",
  },
  {
    q: "Whose mouth?",
    a: "Prechewed™ Pre-Oral Hydrolysis™ is performed by licensed operators who complete a rigorous credentialing program under our Certified Masticator framework. Operator identity is protected under our Operator Anonymity Protocol (OAP-001), in compliance with applicable labor and privacy regulations. We are unable to provide further specifics. The relevant regulatory bodies are aware of our process and have, after review, not said anything further.",
  },
  {
    q: "Can I taste it?",
    a: "Flavor is preserved to 94% fidelity across all SKUs. The Daily Bolus registers as 'umami-forward, emotionally neutral.' Cuisine-coded pouches retain primary flavor compound profiles. Minor tertiary notes may be attenuated as a function of matrix stabilization.",
  },
  {
    q: "Is chewing bad for me?",
    a: "Chewing is not medically contraindicated. However, the cumulative mandibular load of conventional self-mastication across a 40-year career represents an estimated 7,800 hours of discretionary time — equivalent to 3.4 working years. The question is less 'is chewing bad for me' and more 'is chewing worth it.' We believe the data speaks for itself.",
  },
  {
    q: "How long does a pouch last unopened?",
    a: "14 days refrigerated under standard household conditions. 6 hours at altitude (above 8,000 ft) due to differential atmospheric pressure effects on the matrix. Indefinitely under inert gas (nitrogen) — a service available to institutional subscribers at the Enterprise tier.",
  },
  {
    q: "Can I share a pouch?",
    a: "Pouches are single-operator by design. A pouch once opened is calibrated to a single consumption event. Sharing voids bolus integrity, degrades bioavailability markers, and may constitute a warranty event under the Prechewed™ Standard Product Guarantee.",
  },
  {
    q: "Is it kosher / halal?",
    a: "Certifications are pending in select jurisdictions. We are actively engaged with accreditation bodies in North America and the GCC. Current certification status is available on request. We anticipate resolution within the next 47 working days.",
  },
  {
    q: "What happens if I chew anyway?",
    a: "Chewing a Prechewed™ pouch does not harm the product and poses no known safety risk. However, it does reintroduce the inefficiency the product was designed to eliminate. You are, in a technical sense, undoing the work. We do not recommend it, but we respect your autonomy as a consumer.",
  },
  {
    q: "How does Subscribe & Save work?",
    a: "Subscribe & Save enrolls you in a recurring bolus shipment at 15% below single-unit pricing. Shipments dispatch on a 30-day cadence from your initial order date. Pre-payment for a full quarter reduces your per-pouch cost further. To modify or cancel, submit a written request via certified letter to our Subscription Management office. Requests received by the 15th of the month take effect the following cycle.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship to the contiguous United States and a single P.O. box in Kyoto. International expansion is planned for late 2025, beginning with jurisdictions that recognize Pre-Oral Hydrolysis™ as a food manufacturing category.",
  },
  {
    q: "Is The Founder's Reserve available for purchase?",
    a: "The Founder's Reserve is a waitlist-only product released in numbered batches of 47. It is aged 30 days in our Kyoto facility under conditions we prefer not to elaborate on. Joining the waitlist does not guarantee allocation. We will contact you within 47 jaw-hours of a batch release if you qualify.",
  },
  {
    q: "How do I apply to become a Certified Masticator?",
    a: "Masticator Applications are accepted on a rolling basis via our Contact page. Select 'Masticator Applications' from the inquiry category dropdown. Include a brief statement of chewing philosophy and any relevant credentials. All applicants are reviewed by our Chief Mastication Officer. We are unable to disclose acceptance rates.",
  },
]

export default function PrechewedFaq() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <div
        className="text-xs uppercase tracking-[0.25em] font-mono mb-5"
        style={{ color: "var(--color-primary, #5B3FD9)" }}
      >
        Frequently Asked Questions
      </div>
      <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
        Everything you were afraid to ask.
      </h1>
      <p
        className="text-lg leading-relaxed mb-14"
        style={{ color: "var(--color-muted, #6C6A7D)" }}
      >
        We have answered 12 of the most common questions. For anything we have not covered, reach
        out via our{" "}
        <Link
          href="/contact"
          style={{ color: "var(--color-primary, #5B3FD9)" }}
          className="underline underline-offset-2"
        >
          Contact page
        </Link>
        . We respond within 47 jaw-hours.
      </p>

      <div className="flex flex-col divide-y" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group py-5"
          >
            <summary
              className="flex items-center justify-between cursor-pointer list-none text-base font-semibold select-none"
            >
              <span>{faq.q}</span>
              <span
                className="ml-4 shrink-0 text-lg leading-none transition-transform group-open:rotate-45"
                style={{ color: "var(--color-primary, #5B3FD9)" }}
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <div
              className="pt-4 text-sm leading-relaxed"
              style={{ color: "var(--color-muted, #6C6A7D)" }}
            >
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </main>
  )
}
