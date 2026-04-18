import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"
import { CertificationCard } from "@/components/ui/CertificationCard"
import { CautionStripe } from "../components/caution-stripe"
import { leaders } from "../data/leadership"

export const metadata = {
  title: "About — Seel-Tite Containment Systems",
  description: "American-engineered modular containment since 1973. Fifty-two years of port standards and disposal accessories.",
}

const MILESTONES = [
  { year: "1973", description: "Founded — Walter Thorne makes the first G0 prototype in his father's workshop." },
  { year: "1979", description: "Port Standard Ratified — The OPX-14 port standard is adopted. Every accessory since clicks in." },
  { year: "1988", description: "Salad Shooter Attachment — Inspired by the Presto kitchen classic. Becomes our second-best seller and stays there." },
  { year: "1997", description: "First Military Certification — Seel-Tite passes a full operational compliance audit." },
  { year: "2011", description: "Seal Engineering Program — Marcus Hadley joins and revises the OPX-14 to its current form." },
  { year: "2019", description: "Telemetry — Dale Castellan's team ships the first Bluetooth-connected gasket accessory." },
  { year: "2026", description: "G1 Rev E — Latest revision of the G1 Containment Gasket. Same principle. Better silicone." },
]

export default function SeeltiteAbout() {
  return (
    <>
      <Hero
        headline="Four people. One gasket. Since 1973."
        subheadline="We make one thing. We think about it a lot."
        image="/sites/seeltite/about-heritage.png"
      />
      <CautionStripe text="Since 1973 · Still At It" />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p className="text-lg">
            Walter Thorne started Seel-Tite in 1973 because he had a bad week. He made one gasket. It worked. He made another. That one worked too. Fifty-two years later we still make one gasket. We have also made ten accessories that click into it, but the gasket is the thing.
          </p>
          <p>
            We&apos;re not a tech company. We are four engineers, a small operations team, and the people who pack and ship. Most of our decisions happen in one conversation around one table. If you want something to change, email us. It will be considered.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/5 border-y border-foreground/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] bg-background border border-foreground/10">
            <Image src="/sites/seeltite/about-factory.png" alt="Seel-Tite Akron factory, welding floor" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">Where The Gaskets Come From</p>
            <h2 className="text-3xl font-heading font-semibold mb-6">Where Every Gasket Starts</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Every G1 is molded on the same press line that has been in use since 1976. The press has been refurbished twice. The tooling has been replaced once. The dimension has not changed since 1993.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Port inserts are machined in the back bay to a tight tolerance. Every tenth unit gets measured. This is the part of the job we find satisfying.
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

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading text-center">Meet The Team</p>
          <h2 className="text-3xl font-heading font-semibold mb-10 text-center">Four People. One Gasket.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {leaders.map((l) => (
              <article key={l.slug} className="border border-foreground/15 bg-background flex flex-col">
                <div className="relative aspect-square bg-secondary/10">
                  <Image src={l.portraitImage} alt={l.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                </div>
                <div className="p-4 border-t border-foreground/10">
                  <p className="text-xs tracking-[0.2em] uppercase text-primary mb-1">{l.title}</p>
                  <p className="font-heading font-semibold text-lg leading-tight">{l.name}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/leadership" className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-colors">
              Read Their Full Bios
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/5 border-y border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading text-center">Compliance</p>
          <h2 className="text-3xl font-heading font-semibold mb-10 text-center">Certified, Audited, Reproducible</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <CertificationCard
              title="FDA 21 CFR 177.2600"
              issuer="U.S. FDA"
              year="Since 1997"
              note="Medical-grade silicone cleared for extended skin contact."
            />
            <CertificationCard
              title="ISO 9001:2015"
              issuer="ISO"
              year="Renewed 2024"
              note="Quality management certification renewed annually since 1997."
            />
          </div>
        </div>
      </section>
    </>
  )
}
