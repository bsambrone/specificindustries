import Link from "next/link"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Visit the Estate — Domaine Carter & Fils",
  description: "Tastings, estate tours, and private events at our Allegheny property.",
}

export default function Visit() {
  return (
    <>
      <Hero
        headline="Visit the Estate"
        subheadline="The cellar is open by appointment year-round. The views are free."
      />
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-20">

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Experiences</p>
              <h2 className="text-3xl font-heading font-semibold text-foreground mb-6">The Tasting Room</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Our tasting room, housed in the original 1863 press building, offers seated flights across the estate&apos;s current releases. Flights are led by a member of our sommelier team and last approximately 60 minutes.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                $35 per person. Reservations required, Tuesday through Sunday.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-heading font-semibold text-foreground mb-6 mt-10 md:mt-0">The Estate Tour</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Ninety minutes through our cellars, oak-aging facility, and the original Carter parcel. Conducted by appointment in groups of six or fewer.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                $65 per person, includes a tasting flight. Saturdays only.
              </p>
            </div>
          </div>

          <div className="border-t border-accent/30 pt-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Hours</p>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Tasting Room Hours</h2>
                <dl className="space-y-2 text-foreground/80">
                  <div className="flex justify-between border-b border-accent/20 pb-2"><dt>Monday</dt><dd>Closed</dd></div>
                  <div className="flex justify-between border-b border-accent/20 pb-2"><dt>Tuesday–Friday</dt><dd>11:00 – 17:00</dd></div>
                  <div className="flex justify-between border-b border-accent/20 pb-2"><dt>Saturday</dt><dd>10:00 – 19:00</dd></div>
                  <div className="flex justify-between"><dt>Sunday</dt><dd>12:00 – 16:00</dd></div>
                </dl>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Directions</p>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Finding Us</h2>
                <p className="text-foreground/80 leading-relaxed mb-2">
                  1859 Old Shale Road<br />
                  Titusville, Pennsylvania 16354
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Approximately two hours north of Pittsburgh, in the rolling country of the Allegheny basin. We recommend allowing extra time in late autumn and early winter.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-accent/30 pt-16 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Private Gatherings</p>
            <h2 className="text-3xl font-heading font-semibold text-foreground mb-4">The Allegheny Barrel Room</h2>
            <p className="text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-6">
              Our largest private room seats up to thirty. Ideal for anniversaries, quiet corporate gatherings, and occasions that call for a setting of consequence. Please inquire directly for availability and catering arrangements.
            </p>
            <Link href="/contact" className="inline-block border-2 border-primary text-primary px-10 py-3 tracking-widest uppercase text-sm font-semibold hover:bg-primary hover:text-secondary transition-colors">
              Contact the Estate
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
