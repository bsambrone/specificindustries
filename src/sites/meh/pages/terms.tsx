export const metadata = {
  title: "Terms of Service — Meh.",
  description: "Governed by the Specific Industries umbrella terms of service.",
}

const sections = [
  {
    heading: "1. Your Expectations (Manageable)",
    body: "By purchasing from Meh., you acknowledge that each of our devices is designed to deliver a specific, documented shortfall. Product descriptions on this site are, to the best of our knowledge, honest. If a device behaves as described, it is functioning correctly, regardless of whether that behavior satisfies you personally.",
  },
  {
    heading: "2. Our Commitments (Modest)",
    body: "We commit to shipping the product you ordered, in the color you requested (gray), within a reasonable window. We commit to maintaining the factory calibration of each device for at least as long as the device is in active use. We commit to not changing what the products do after you buy them, which we consider a meaningful guarantee.",
  },
  {
    heading: "3. Shipping (Eventually)",
    body: "Most orders ship within 5–9 business days. Some orders ship faster. Some take longer. Tracking is provided when available. The shipping carrier is a matter internal to us and may change between orders.",
  },
  {
    heading: "4. Returns (We Understand)",
    body: "Returns are accepted within 30 days of receipt, in original condition, with original packaging. A restocking consideration may apply. We review each return individually. We will not contest a return, but we may, as part of our review, briefly note our disappointment.",
  },
  {
    heading: "5. Warranty (None)",
    body: "No warranty is offered beyond the promise that each device will arrive in the state it was in when it left our warehouse. Defects in manufacturing are addressed at our discretion. Defects in the device's intended behavior are not addressed at all, as the device is functioning correctly.",
  },
  {
    heading: "6. Governing Law (Resignation)",
    body: "These terms are governed by the laws of the jurisdiction in which Specific Industries is registered. Disputes are to be resolved first through the internal directory on our contact page, then through the umbrella policy process at specificindustries.com, then, if required, through the courts.",
  },
]

export default function MehTerms() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 tracking-tight">Terms of Service</h1>

        <div className="border border-foreground/30 bg-background/30 p-5 mb-10 text-sm text-foreground/80">
          <p>
            The authoritative terms of service for all Specific Industries properties, including this one, is maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-primary underline hover:no-underline transition-colors">
              specificindustries.com/terms
            </a>
            . Those terms govern all actual commercial activity on this site. In the event of any conflict between the sections below and the umbrella terms, the umbrella terms control.
          </p>
        </div>

        <div className="space-y-8 text-foreground/80 text-sm md:text-base leading-relaxed">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-heading font-bold text-primary text-lg md:text-xl mb-3">{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}

          <p className="uppercase text-xs text-foreground/50 tracking-wide pt-6 border-t border-foreground/20 mt-8">
            Last reviewed: 2026-04-17 · Version 1.0
          </p>
        </div>
      </div>
    </section>
  )
}
