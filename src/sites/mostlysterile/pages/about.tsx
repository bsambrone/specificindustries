import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"

export const metadata = {
  title: "About — Mostlysterile",
  description: "Founded in 2014 in a self-storage unit by a lapsed pre-med student. Now serving the tri-state area and occasionally elsewhere.",
}

const milestones = [
  { year: "2014", description: "Founded in a self-storage unit off Route 9. Acquired first scalpel." },
  { year: "2015", description: "Received first bulk donation of medical consumables from an unspecified source." },
  { year: "2016", description: "Hired second employee. (Still with us, to the extent feasible.)" },
  { year: "2017", description: "Completed Basic Hand Washing coursework via Online University of Applied Healthcare." },
  { year: "2018", description: "Received participation ribbon at the County Health Fair. Framed and displayed." },
  { year: "2019", description: "Named runner-up for Most Improved Sterility at Regional Medical Supply Semifinals." },
  { year: "2020", description: "Obtained letter of reference from a guy named Steve." },
  { year: "2021", description: "Relocated to a building with a roof. Productivity noted to improve." },
  { year: "2022", description: "Expanded inventory into pharmaceuticals. (We legally cannot call them that.)" },
  { year: "2024", description: "Onboarded a dedicated Head of Compliance. (New hire.)" },
]

export default function MostlysterileAbout() {
  return (
    <>
      <Hero
        headline="About Mostlysterile"
        subheadline="Ten years of continuous, or nearly continuous, operation in the medical supply space."
      />

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p>
            Mostlysterile was founded in 2014 by Charlton L. Harrow, a lapsed pre-med student with an entrepreneurial thesis and a spare storage unit off Route 9. The thesis: that the medical supply industry underserves customers who value price competitiveness over the more traditional considerations. Ten years later, we believe the thesis has been, to the extent feasible, validated.
          </p>
          <p>
            We operate today as a lean distribution business serving the tri-state area and, on occasion, adjacent markets where shipping logistics permit. Our inventory is sourced through a network of partners we have been cultivating for the better part of a decade, including hospital closure programs, institutional surplus dispositions, estate sales, and referrals from a gentleman named Steve. Every product entering our facility passes through our twelve-step verification process, or receives an exemption when operational circumstances require.
          </p>
          <p>
            Our mission is to provide medical supplies at prices you can live with, through sterility that mostly holds up, backed by the kind of customer service that comes from knowing every customer by name, or at least by first name, or at minimum by the handwriting on their order slip. We are grateful for the trust you place in us, or the trust you are considering placing in us, or the curiosity that has brought you to this page.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-3">
            A Decade of Milestones
          </h2>
          <p className="text-center text-foreground/60 text-sm mb-10">
            Key moments in the Mostlysterile story, as reconstructed from available records.
          </p>
          <Timeline items={milestones} />
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-lg text-foreground/80 italic leading-relaxed">
            &ldquo;To provide medical supplies at prices that don&rsquo;t make sense, with sterility that mostly holds up, to the benefit of customers who appreciate both of these things.&rdquo;
          </p>
          <p className="mt-4 text-sm text-foreground/60">— Charlton L. Harrow, Founder</p>
        </div>
      </section>
    </>
  )
}
