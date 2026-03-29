"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Timeline } from "@/components/ui/timeline"

export const metadata = {
  title: "About Strategic Void Consulting",
  description:
    "Since 1987, Strategic Void Consulting has helped organizations achieve transformational alignment through the systematic optimization of non-productive workflows.",
}

const values = [
  {
    name: "Integrity Through Ambiguity",
    description:
      "We believe that clarity is the enemy of flexibility. Our consultants communicate with precision-calibrated vagueness, ensuring that commitments are always technically honored regardless of outcome.",
  },
  {
    name: "Relentless Incrementalism",
    description:
      "Progress at Strategic Void Consulting is measured in basis points. We move forward deliberately — one two-hour workshop at a time — confident that meaningful change is always approximately one quarter away.",
  },
  {
    name: "Stakeholder-First Indecision",
    description:
      "Every decision is an opportunity to involve more people. We honor that opportunity fully, ensuring that no choice is made until every conceivable perspective has been solicited, documented, and tabled.",
  },
  {
    name: "Innovation Without Implementation",
    description:
      "Ideas are our currency. Implementation is someone else's problem. We generate transformative frameworks, visionary roadmaps, and breakthrough concepts at industry-leading velocity — none of which have been operationalized.",
  },
  {
    name: "Excellence in Non-Delivery",
    description:
      "Not delivering is a craft. We have spent 39 years perfecting the art of falling short in ways that feel, in the moment, like the precondition for future success. Our clients consistently describe us as 'almost there.'",
  },
]

const timelineItems = [
  {
    year: "1987",
    description:
      "Strategic Void Consulting founded by Max Thornbury III and his college roommate, Derek, in a shared office above a dry cleaner in Stamford, Connecticut.",
  },
  {
    year: "1993",
    description:
      "First enterprise client engagement: a mid-sized logistics company. The project was originally scoped for six weeks and concluded forty-one months later with a PowerPoint deck and a new org chart.",
  },
  {
    year: "1998",
    description:
      "The C.H.A.O.S. Framework™ is formally published after eleven years of informal application. Derek does not receive a co-author credit. He has since moved on.",
  },
  {
    year: "2003",
    description:
      "Strategic Void Consulting achieves ISO 9001 certification — specifically for the process by which it certifies others. The certification committee took 18 months to align on the scope of the certification.",
  },
  {
    year: "2008",
    description:
      "Survived the global financial crisis without significant disruption. When there are no measurable outcomes, there are no measurable losses. This is noted in our case studies as a competitive advantage.",
  },
  {
    year: "2015",
    description:
      "Expanded to four global offices: New York, London, Singapore, and a WeWork in Omaha that was initially described as 'temporary.' It is now our largest office by headcount.",
  },
  {
    year: "2020",
    description:
      "Pivoted seamlessly to remote alignment. Our proprietary non-directive facilitation methodology translates perfectly to video conferencing, where eye contact is optional and accountability is muted.",
  },
  {
    year: "2024",
    description:
      "Surpassed 2,847 clients served across 14 verticals. Max Thornbury III issued a statement describing this milestone as 'a directional indicator of continued forward momentum.'",
  },
]

export default function AboutPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            About Strategic Void Consulting
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Thirty-nine years of transformational non-productivity. Four offices.
            One framework that changed everything — in ways that are difficult to measure.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8">
            How We Got Here
          </h2>
          <div className="space-y-6 text-foreground/70 leading-relaxed text-lg">
            <p>
              Strategic Void Consulting was founded in 1987 by Max Thornbury III, a former
              management consultant who had grown frustrated with the industry&apos;s insistence
              on producing results. "Everyone was so focused on outcomes," Thornbury recalls.
              "Nobody was asking the harder question: what if the outcome wasn&apos;t the point?"
            </p>
            <p>
              In the early years, the firm was a two-person operation. Thornbury handled client
              relationships and strategic vision. His partner, Derek, handled everything else.
              The office, located above a dry cleaner in Stamford, Connecticut, smelled faintly
              of solvent and ambition. Most clients were referrals from former colleagues who
              appreciated Thornbury&apos;s ability to make them feel heard without asking them
              to do anything differently.
            </p>
            <p>
              The inflection point came in 1993, with the firm&apos;s first enterprise engagement.
              A mid-sized logistics company had hired Strategic Void Consulting to "optimize
              internal workflows." Thornbury delivered a 340-page diagnostic report, a three-tier
              stakeholder engagement matrix, and a recommendation to form a steering committee.
              The steering committee met for thirty-eight months and produced a vision statement.
              The client renewed the engagement. The framework was born.
            </p>
            <p>
              Today, Strategic Void Consulting operates across four global offices, serves
              2,847 enterprise clients, and employs over 400 Alignment Partners, each of whom
              is deeply committed to the principle that the journey — not the destination —
              is where the billing occurs.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-heading tracking-[0.25em] uppercase text-foreground/40 mb-6">
            Our Mission
          </div>
          <blockquote className="text-2xl md:text-3xl font-heading font-bold text-accent leading-relaxed">
            &ldquo;To empower organizations to achieve transformational alignment through the
            systematic optimization of non-productive workflows.&rdquo;
          </blockquote>
          <p className="mt-6 text-foreground/50 text-sm italic">
            — Strategic Void Consulting Mission Statement, approved by the Mission Statement
            Alignment Committee after fourteen months of review
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Core Values
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              These values are not aspirational. They describe how we actually operate,
              which is what makes them so difficult to argue with.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.slice(0, 4).map((value) => (
              <div
                key={value.name}
                className="border-l-2 border-accent/30 pl-6"
              >
                <h3 className="font-heading font-bold text-primary text-lg mb-2">
                  {value.name}
                </h3>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
          {/* Fifth value — full width */}
          <div className="mt-8 border-l-2 border-accent/30 pl-6 max-w-lg">
            <h3 className="font-heading font-bold text-primary text-lg mb-2">
              {values[4].name}
            </h3>
            <p className="text-foreground/60 leading-relaxed text-sm">
              {values[4].description}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Our History
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              A chronicle of strategic milestones, each of which was followed by a
              period of consolidation and re-alignment.
            </p>
          </div>
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-12 px-6 border-y border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-heading tracking-[0.25em] uppercase text-foreground/40 mb-4">
            Global Presence
          </div>
          <p className="text-2xl font-heading font-bold text-foreground/80">
            New York &bull; London &bull; Singapore &bull; A WeWork in Omaha
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Meet the Team
          </h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            Our leadership team brings centuries of combined experience in strategic
            non-productivity. Learn more about the individuals who make the Void possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={siteHref("/leadership")}
              className="inline-block bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
            >
              Meet Our Leadership
            </Link>
            <Link
              href={siteHref("/contact")}
              className="inline-block border border-foreground/30 text-foreground font-heading text-sm uppercase tracking-wider px-8 py-4 hover:border-accent hover:text-accent transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
