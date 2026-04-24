import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "About — Campaign for Sustainable Overreactions",
  description: "Founded 2017. Mission: to make civic outrage carbon-neutral, durable, and accountable. Annual 990 transparency, theory of change, and the founding story.",
}

const PILLARS = [
  {
    title: "Measure",
    body: "We have spent six years building the methodology to convert qualitative outrage into auditable kg CO₂e. The Tantrum Footprint methodology is in its 4th major version and underwrites the entire offset registry.",
  },
  {
    title: "Offset",
    body: "Verified Outrage Offsets™ correspond to real-world reduction projects in our 23-partner network. Every credit issued is matched 1:1 against measured emissions reductions.",
  },
  {
    title: "Credentialed Practice",
    body: "Through the Certified Responsible Overreactor™ program, we establish a durable professional standard for sustainable overreaction practice — the only credential of its kind in the sector.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Hero
        headline="About the Campaign"
        subheadline="Founded 2017. A 501(c)(3) nonprofit working to make civic outrage carbon-neutral, durable, and accountable."
        image="/sites/carbonneutraloutrage/about.png"
      />

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">Our Mission</p>
          <h2 className="text-3xl font-heading font-bold text-primary mb-6 leading-tight">
            We do not believe in suppressing outrage. We believe in budgeting it.
          </h2>
          <p className="text-foreground/80 leading-relaxed text-lg mb-6">
            The Campaign exists because the modern outrage economy generates an unsustainable volume of civic energy expenditure. Our work is not to silence that energy — it is to make sure it is allocated, measured, and accounted for in the same way any other carbon-intensive activity should be.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            We operate eight active programs spanning prevention, infrastructure, offsets, methodology, and credentialing. Every program is independently audited annually. Our 990 filings, our methodology documentation, and our annual State of Responsible Outrage report are all publicly available.
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">Founding Story</p>
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">2017: The North Marin Zoning Meeting</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            The Campaign was founded in late 2017 by Hollis Penderwick, then a climate-communications strategist between roles, who attended a routine zoning meeting in North Marin and witnessed a single attendee&apos;s outburst burn enough kinetic energy to power a coastal town for fourteen minutes. The event was logged, in passing, by a local stringer for the regional paper. Hollis read the article that evening and could not stop thinking about it.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Within six months, Hollis had assembled a four-person research collective: a former methane-capture analyst, a behavioral psychologist, a civic-tech operator, and a graphic designer. Their first publication — a methodology brief titled <em>Toward a Carbon-Equivalent Framework for Civic Overreaction</em> — circulated quietly through climate-communications networks before being formally adopted by three regional foundations as a basis for grant making.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            The Campaign was incorporated as a 501(c)(3) in early 2018. It now employs 47 staff across regional offices in Portland, Philadelphia, and Boulder, with operating support from foundations and a growing base of individual donors.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">Theory of Change</p>
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">Three Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t-2 border-secondary pt-5">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{pillar.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 990 Transparency */}
      <section className="py-16 px-6 bg-white border-t border-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Financial Transparency</h2>
          <p className="text-foreground/70 leading-relaxed mb-6">
            Our most recent IRS Form 990 is available for public review. Audited financials and our annual State of Responsible Outrage report are also published each spring.
          </p>
          <p className="text-xs text-foreground/40 italic">
            Most recent 990 filing: FY 2024. Audited financials current through FY 2024. Report cycle: published annually in April.
          </p>
        </div>
      </section>
    </>
  )
}
