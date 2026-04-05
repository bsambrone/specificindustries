import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "The Pasture — Grass Fed WiFi",
  description: "The co-op's manifesto, origin story, and philosophy on raw spectrum.",
}

const refusedCertifications = [
  { name: "FCC Part 15 Compliance", why: "A certification of sameness. We do not intend to behave the same as industrial signal." },
  { name: "FTC Connectivity Guidelines", why: "Written by a committee that has never stood in a frequency pasture." },
  { name: "IEEE 802.11 Standards", why: "The standardization project is a flattening project. We will not be flattened." },
  { name: "Wi-Fi Alliance Certification", why: "The word 'alliance' implies shared values we do not share." },
  { name: "FDA Wellness Signal Approval", why: "This certification does not exist. We have still refused it." },
  { name: "USDA Organic Signal Designation", why: "This one does exist but we have declined on the basis that all co-op signal is, by definition, already organic." },
]

export default function ThePasture() {
  return (
    <>
      <Hero
        headline="The Pasture"
        subheadline='"Raw. Unpasteurized. Free-roaming." — Hollis Thornfield, Co-op Elder'
        image="/sites/grassfedwifi/pasture-hero.png"
        dark
      />

      {/* The Founding */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">The Founding</h2>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary/20 mb-8">
            <Image
              src="/sites/grassfedwifi/pasture-founding.png"
              alt="The co-op's founding scene"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-foreground/80 leading-relaxed mb-4">
            In the winter of the co-op&apos;s founding, Hollis Thornfield spent seventy-two hours in a mountain
            WiFi dead zone. He did not eat. He did not speak. On the third morning, a single wild packet
            drifted past his ear, and he understood what had been lost when we first pasteurized the signal.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            He returned home, sketched a plan on the back of a feed bag, and began building a co-op.
            Three members joined him in the first year. Forty-three the year after. The co-op now serves
            several hundred households across three states, none of whom have gone back.
          </p>
        </div>
      </section>

      {/* What's Wrong With Conventional Signal */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            What&apos;s Wrong With Conventional Signal
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Conventional wifi is a pasteurized product. Every packet is engineered to be interchangeable
            with every other packet, regardless of origin. The signal is stripped of character in the
            name of consistency.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Industrial 5G is worse. It is a monoculture: optimized for throughput, engineered to extract
            maximum bandwidth from minimum investment, and designed to behave the same in every city in
            every country. A packet harvested in Tokyo is indistinguishable from a packet harvested in
            Tulsa. This is not progress. This is homogenization.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            The co-op believes signal should carry its origin. A packet from the North Pasture should
            taste of dawn and alpine air. A packet from the South Meadow should taste of sun. A packet
            from the Upland should taste of committee deliberation and quiet work. If your signal does
            not carry its terroir, it has been stripped of what makes it worth receiving.
          </p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Our Philosophy</h2>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary/20 mb-8">
            <Image
              src="/sites/grassfedwifi/pasture-philosophy.png"
              alt="Frequency rotation philosophy"
              fill
              className="object-cover"
            />
          </div>
          <ul className="space-y-4 text-foreground/80 leading-relaxed">
            <li><strong className="text-foreground">Raw Spectrum.</strong> Every packet is unpasteurized, carrying the character of the field it came from.</li>
            <li><strong className="text-foreground">Small-batch harvests.</strong> We gather by hand, in quantities the pasture can replenish.</li>
            <li><strong className="text-foreground">Frequency rotation.</strong> Fields are rested between harvests. Never two consecutive weeks in the same pasture.</li>
            <li><strong className="text-foreground">No additives.</strong> We do not blend, homogenize, optimize, or file smooth. The signal is what the signal is.</li>
            <li><strong className="text-foreground">Committee allocation.</strong> Shares are distributed by a committee of farmers, not an algorithm.</li>
          </ul>
        </div>
      </section>

      {/* Certifications We Refuse */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2 text-center">
            Certifications We Refuse
          </h2>
          <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            The co-op maintains a list of industry certifications we have declined. We read it aloud at
            the annual harvest supper. It is a list of choices, not failures.
          </p>
          <div className="space-y-4">
            {refusedCertifications.map((cert) => (
              <div key={cert.name} className="bg-background rounded-lg p-5">
                <h3 className="font-heading font-bold text-foreground mb-2">{cert.name}</h3>
                <p className="text-foreground/70 text-sm italic">{cert.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
