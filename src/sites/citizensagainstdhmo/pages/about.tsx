import { Hero } from "@/components/ui/hero"
import { milestones } from "@/sites/citizensagainstdhmo/data/timeline"

export const metadata = {
  title: "About — Citizens Against DHMO",
  description: "Citizens Against DHMO is a grassroots movement demanding transparency about dihydrogen monoxide exposure in food, schools, healthcare, and infrastructure.",
}

export default function AboutPage() {
  return (
    <>
      <Hero
        headline="About the Movement"
        subheadline="A grassroots awareness movement demanding disclosure for the most under-regulated chemical in modern life."
      />

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6 leading-tight">
            Disclosure first. Decisions second. Citizens always.
          </h2>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            <p>
              Citizens Against DHMO is the leading grassroots movement working to bring disclosure, accountability, and transparency to the use of dihydrogen monoxide in food, schools, healthcare, infrastructure, agriculture, and the data centers that power modern computing.
            </p>
            <p>
              We are not anti-DHMO. We are anti-secrecy. We believe citizens have the right to know what they and their children are being exposed to, in what quantities, by whom, and with what downstream consequences. The default of no disclosure is no longer acceptable.
            </p>
            <p>
              We work through chapter organizing, public-records advocacy, regulatory petitioning, citizen-science research, and the patient long-form work of changing what an institution is willing to disclose. We have been at this since 2019. We will be at this for as long as it takes.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">Our Story</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">From a single thread to a national movement</h2>
          <div className="space-y-10">
            {milestones.map((m) => (
              <div key={m.year} className="grid grid-cols-[80px_1fr] gap-6 border-b border-accent/15 pb-10 last:border-0 last:pb-0">
                <p className="text-3xl font-heading font-bold text-secondary">{m.year}</p>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2">{m.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">What We Believe</p>
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">A short statement of principles</h2>
          <ol className="space-y-5 text-foreground/80 leading-relaxed list-decimal pl-6">
            <li>Disclosure is the floor, not the ceiling. Citizens cannot consent to what they have not been told.</li>
            <li>Institutional secrecy about a substance present in 100% of human bodies is a public-trust failure.</li>
            <li>Modern fearmongering tropes are not always wrong. Sometimes a substance really is everywhere.</li>
            <li>We support the broader climate, wellness, and consumer-protection movements. We are asking them to name DHMO with the precision their work deserves.</li>
            <li>Children are not consenting parties. Schools must do better.</li>
            <li>The agencies move when citizens insist. We will continue to insist.</li>
          </ol>
        </div>
      </section>
    </>
  )
}
