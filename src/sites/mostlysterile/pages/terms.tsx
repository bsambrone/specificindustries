export const metadata = {
  title: "Terms of Service — Mostly Sterile",
  description: "Governed by the Specific Industries umbrella terms of service.",
}

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body: "By accessing, browsing, viewing, screenshotting, or otherwise interacting with this site, you accept these terms in their entirety, including those portions of these terms that are not presently displayed, have been superseded by later versions, or have been struck by a court of competent jurisdiction but which Mostly Sterile continues to consider operative in spirit.",
  },
  {
    heading: "2. Products and Services",
    body: "All products offered through this site are offered as-is, where-is, with or without original packaging, and in the condition received by our receiving team. Product descriptions reflect our best available assessment at time of listing and are not warranted. Images are representative. Actual units may differ from images in color, size, completeness, condition, or identity.",
  },
  {
    heading: "3. Orders and Fulfillment",
    body: "Orders are accepted at our discretion. Order acceptance may be withdrawn at any point prior to shipment for any reason. Shipping windows are estimated and may vary with operational conditions, staffing, weather, or the availability of Bob. Orders may be shipped from any location in our distribution network, or from a location outside our distribution network which we have recently become aware of.",
  },
  {
    heading: "4. Payments and Refunds",
    body: "Payments are processed through our payment partners. Prices are stated in US dollars and are subject to change without notice, including after order placement. Refund eligibility is reviewed on a case-by-case basis by our returns committee (one member). Decisions of the returns committee are final, subject to reversal at the committee's discretion.",
  },
  {
    heading: "5. Limitation of Liability",
    body: "To the maximum extent permitted by applicable law, Mostly Sterile disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, sterility, non-toxicity, and suitability for clinical use. Our total liability for any claim arising from your use of this site or its products shall not exceed the purchase price of the product in question, or five US dollars, whichever is more convenient for us to compute.",
  },
  {
    heading: "6. Prohibited Uses",
    body: "You agree not to use this site or its products for any use that is unlawful in your jurisdiction, including but not limited to: unauthorized medical practice, unauthorized pharmaceutical distribution, unauthorized surgical intervention, unauthorized veterinary practice, unauthorized dental practice, and unauthorized review of these terms by a licensed attorney. Authorized uses are permitted subject to the remainder of this document.",
  },
  {
    heading: "7. Modifications",
    body: "We may modify these terms at any time, for any reason, with or without notice. Modified terms take effect immediately upon posting and apply retroactively where such application is technically feasible. Continued use of this site after modification constitutes acceptance of the modified terms. Discontinued use does not constitute non-acceptance.",
  },
]

export default function MostlysterileTerms() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-6">Terms of Service</h1>

        <div className="border border-primary/30 bg-secondary/20 p-5 mb-10 text-sm text-foreground/80">
          <p>
            The authoritative terms of service for all Specific Industries properties, including this one, are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-primary underline hover:no-underline transition-colors">
              specificindustries.com/terms
            </a>
            . Those terms govern all actual commercial relationships on this site. In the event of any conflict between the sections below and the umbrella terms, the umbrella terms control.
          </p>
        </div>

        <div className="space-y-8 text-foreground/80 text-sm md:text-base leading-relaxed">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-heading font-bold text-primary text-lg md:text-xl mb-3">{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}

          <p className="uppercase text-xs text-foreground/50 tracking-wide pt-6 border-t border-primary/20 mt-8">
            Last reviewed: 2026-04-16 · Version 1.0 · Reviewer: pending
          </p>
        </div>
      </div>
    </section>
  )
}
