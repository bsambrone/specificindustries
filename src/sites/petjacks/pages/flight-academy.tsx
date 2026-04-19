import Image from "next/image"
import Link from "next/link"
import Footnote from "@/sites/petjacks/components/footnote"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

export const metadata = {
  title: "Flight Academy — Petjacks",
  description: "Pre-Flight Readiness Camp. Three tiers of cheerful preparation for your pet's first launch.",
}

interface Tier {
  name: string
  price: string
  lede: string
  body: string
  highlights: Array<{ text: string; footnote?: string }>
}

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$199",
    lede: "Your pet meets the launch pad.",
    body: "A gentle two-day orientation — perfect for families who want a low-commitment first taste of the Petjacks experience.",
    highlights: [
      { text: "Two-day program" },
      { text: "Launch pad familiarization" },
      { text: "Completion rate: 94%", footnote: "Completion reflects pets who arrived for day one and departed on day two under their own power." },
    ],
  },
  {
    name: "Standard",
    price: "$499",
    lede: "A full week of preparation.",
    body: "The most popular tier — a warm, supportive seven-day program that covers harness fitting, thrust tolerance, and meals.",
    highlights: [
      { text: "Seven-day residential program" },
      { text: "Harness familiarization" },
      { text: "Thrust-tolerance assessment", footnote: "Tolerance is assessed at progressive thrust levels. Pets showing acute intolerance are respectfully discontinued from the program." },
      { text: "Meals included", footnote: "Please disclose allergies in advance. Petjacks is not responsible for undisclosed allergy outcomes." },
    ],
  },
  {
    name: "Elite",
    price: "$1,299",
    lede: "Intensive three-week residency.",
    body: "Our most comprehensive program. Upon successful completion, your pet is eligible for placement in the Mission Gallery at our discretion.",
    highlights: [
      { text: "Twenty-one-day residential program" },
      { text: "Advanced maneuver training" },
      { text: "Mission Gallery placement pending performance", footnote: "Placement is subject to mission outcome. Both successful and memorial placements are honored identically on the Mission Gallery page." },
      { text: "Graduation ceremony included" },
    ],
  },
]

export default function PetjacksFlightAcademy() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <Image src="/sites/petjacks/flight-academy.png" alt="Pets training at Petjacks Flight Academy" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6">
          <div className="max-w-5xl mx-auto w-full">
            <p className="text-xs uppercase tracking-widest text-accent mb-2">Petjacks Flight Academy</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Pre-Flight Readiness Camp</h1>
            <p className="text-lg text-foreground/70 mt-3 max-w-2xl">A warm, thorough preparation for the happiest launch of your pet&apos;s life.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <article key={tier.name} className="p-8 bg-secondary/30 rounded-lg border border-accent/20 flex flex-col">
                <p className="text-xs uppercase tracking-widest text-accent mb-1">{tier.name}</p>
                <p className="text-4xl font-heading font-bold text-primary mb-2">{tier.price}</p>
                <p className="text-lg text-foreground font-semibold mb-2">{tier.lede}</p>
                <p className="text-foreground/70 mb-6 leading-relaxed">{tier.body}</p>
                <ul className="space-y-2 text-sm text-foreground/80 mb-6 flex-1">
                  {tier.highlights.map((h, i) => (
                    <li key={i}>
                      • {h.text}
                      {h.footnote ? <Footnote>{h.footnote}</Footnote> : null}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block text-center w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Enroll your pet
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-accent/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-3">Ready for the next step?</h2>
          <p className="text-foreground/70 mb-6">Now that your pet is prepared, equip them for the sky.</p>
          <Link href="/products" className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Browse the Flagship Lineup →
          </Link>
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
