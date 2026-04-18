import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"
import { CertificationCard } from "@/components/ui/CertificationCard"
import { CautionStripe } from "../components/caution-stripe"

export const metadata = {
  title: "About — Seel-Tite Containment Systems",
  description: "American-engineered modular containment since 1973. Fifty-two years of port standards and disposal accessories.",
}

const MILESTONES = [
  { year: "1973", description: "Founded — Walter Thorne opens Seel-Tite in his father's machine shop, Akron, Ohio. First G0 prototype fabricated the same month." },
  { year: "1979", description: "OPX-14 Port Standard Ratified — The 14mm bayonet output port becomes the foundation of the Seel-Tite ecosystem. Every accessory since clicks in." },
  { year: "1988", description: "Salad Shooter Attachment — Inspired by the Presto original, the rotary dispersion module becomes the catalog's second-best-selling accessory, a position it has never relinquished." },
  { year: "1997", description: "MIL-STD-810F Certification — Seel-Tite becomes the first containment-system manufacturer to achieve full military operational certification." },
  { year: "2011", description: "Seal Engineering Division — Marcus Hadley joins as Head of Seal Engineering, authors the OPX-14 v2 revision." },
  { year: "2019", description: "Telemetry Program — Dale Castellan's team ships the first Bluetooth-connected gasket accessory, introducing predictive alerts." },
  { year: "2026", description: "G1 Rev E — The G1 Containment Gasket reaches its fifth mechanical revision. Durometer, port tolerance, and equalization valve all refreshed." },
]

export default function SeeltiteAbout() {
  return (
    <>
      <Hero
        headline="Engineered In Akron. Deployed Everywhere."
        subheadline="Fifty-two years of seals, ports, and accessories — designed by engineers who read catalogs the way other people read novels."
        image="/sites/seeltite/about-heritage.png"
      />
      <CautionStripe text="American Engineered · Since 1973" />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p className="text-lg">
            Walter Thorne founded Seel-Tite in 1973 with a single premise: that containment should be engineered with the same rigor as any other mechanical system. Fifty-two years later, the premise has not required revision.
          </p>
          <p>
            Our factory remains in Akron, Ohio. Our engineering team is fourteen people. Our port standard has been backwards-compatible for four decades. The G1 you buy today clicks into the same accessory designs your father — if he had been a Seel-Tite customer, which statistically he probably was — would recognize by touch.
          </p>
          <p>
            We are not a technology company. We are a mechanical engineering company that happens to ship one firmware-connected accessory. The rest of the catalog is cold steel, silicone, and thoughtful machining. That is deliberate.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/5 border-y border-foreground/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] bg-background border border-foreground/10">
            <Image src="/sites/seeltite/about-factory.png" alt="Seel-Tite Akron factory, welding floor" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">The Shop Floor</p>
            <h2 className="text-3xl font-heading font-semibold mb-6">Where Every Gasket Starts</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Every G1 elastomer is molded in the original press line installed in 1976. The press has been refurbished twice. The tooling has been replaced once. The part has not changed dimensions since 1993.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Port inserts are CNC-machined from aerospace-grade PEEK in the shop&apos;s back bay. Tolerances are held to ±0.02mm. Every tenth unit is measured on a coordinate-measuring machine Walt bought used in 1989.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading text-center">Timeline</p>
          <h2 className="text-3xl font-heading font-semibold mb-10 text-center">Fifty-Two Years of Containment</h2>
          <Timeline items={MILESTONES} />
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/5 border-y border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading text-center">Compliance</p>
          <h2 className="text-3xl font-heading font-semibold mb-10 text-center">Certified, Audited, Reproducible</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <CertificationCard
              title="MIL-STD-810H"
              issuer="U.S. Department of Defense"
              year="Renewed 2024"
              note="§502, §507, and §509 environmental compliance."
            />
            <CertificationCard
              title="FDA 21 CFR 177.2600"
              issuer="U.S. Food & Drug Administration"
              year="Renewed 2025"
              note="Medical-grade silicone elastomer cleared for extended skin contact."
            />
            <CertificationCard
              title="ISO 9001:2015"
              issuer="International Organization for Standardization"
              year="Since 1997"
              note="Quality management certification renewed annually."
            />
          </div>
        </div>
      </section>
    </>
  )
}
