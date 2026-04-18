import { Hero } from "@/components/ui/hero"
import { TrustBadgeStrip } from "../components/TrustBadgeStrip"

export const metadata = {
  title: "About — Privatrix",
  description: "Founded in 2019. Self-audited continuously. Trusted by procurement teams worldwide.",
}

export default function PrivatrixAbout() {
  return (
    <>
      <Hero
        headline="Trust as a Service™"
        subheadline="Founded in 2019 on the conviction that the appearance of privacy and the practice of privacy are economically interchangeable."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p>
            Privatrix was founded in 2019 by four former enterprise software executives who had grown frustrated with the operational complexity, regulatory exposure, and engineering cost of actually implementing user privacy. They identified a market opportunity: the value of privacy, to the enterprise buyer, is almost entirely reputational. The actual cryptographic, organizational, and policy infrastructure required to deliver privacy is, by comparison, expensive and slow to build.
          </p>
          <p>
            From this insight, Privatrix was born. We design, manufacture, and certify a full portfolio of privacy products that satisfy the visual, procurement, and board-reporting requirements of enterprise privacy without the operational burden of any underlying technical guarantee.
          </p>
          <p>
            Today, Privatrix is trusted by 1,400+ organizations across financial services, healthcare, government, and any other vertical with a procurement department and a board. Our products are self-audited continuously, certified by our internal auditing arm, and supported by a global team of three Privacy Specialists.
          </p>
          <p>
            Our mission is simple: to make trust as inexpensive to deliver as it is to demand.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "1,400+", label: "Customers" },
              { stat: "47", label: "Compliance Frameworks (Invented)" },
              { stat: "0", label: "Independent Audits" },
              { stat: "3", label: "Privacy Specialists on Staff" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-heading font-bold text-primary mb-2">{s.stat}</div>
                <div className="text-xs uppercase tracking-wider text-foreground/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 font-semibold mb-4">
            Our Compliance Posture
          </p>
          <TrustBadgeStrip />
        </div>
      </section>
    </>
  )
}
