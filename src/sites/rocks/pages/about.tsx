import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"
import { TickerStrip } from "@/sites/rocks/components/ticker-strip"
import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"

export const metadata = {
  title: "ABOUT — ROCKS",
  description: "Founded 1987. Serving generations of accumulators with institutional-grade terrestrial exposure.",
}

const timeline = [
  { year: "1987", description: "Founded. A single position is established in the upper Midwest. Market response is muted." },
  { year: "1994", description: "First dedicated storage facility secured. Custody operations formalized under internal policy." },
  { year: "2001", description: "Firm declines to engage in the dot-com bubble. Position held. No comment issued." },
  { year: "2008", description: "Survived. Holdings unchanged." },
  { year: "2016", description: "Institutional tier introduced. RCKBX instrument launched to meet large-allocator demand." },
  { year: "2020", description: "Storage capacity expanded by approximately forty percent (estimated)." },
  { year: "2024", description: "Restructured. Details not disclosed." },
  { year: "2026", description: "Present. Still in rocks." },
]

export default function RocksAbout() {
  return (
    <>
      <Hero
        headline="ESTABLISHED 1987."
        subheadline="Three generations of accumulators have trusted us to hold their rocks. We continue to do so."
        image="/sites/rocks/about-hero.png"
      />

      <TickerStrip />

      {/* History */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <TerminalHeading level={2} className="mb-6">CORPORATE HISTORY</TerminalHeading>
          <div className="space-y-4 text-primary/80 text-sm md:text-base leading-relaxed">
            <p>
              The firm was founded in 1987 on a thesis that remains unchanged: every other asset class carries
              counterparty risk, settlement risk, regulatory risk, or inflationary risk. Rocks carry none of these.
              Rocks carry only rocks.
            </p>
            <p>
              In the intervening decades, we have observed equities rise and fall, currencies reset, and entire
              derivative markets wind down. Our holdings, by contrast, have remained in place. This is not presented as
              a performance claim. It is presented as an observation.
            </p>
            <p>
              We do not publish returns. We do not engage with media. Our client roster is not disclosed. Our vault is
              not open to the public, to clients, or to our own employees except by appointment. The business is simple
              and is meant to stay that way.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 px-4 bg-secondary/20 border-y border-primary/20">
        <div className="max-w-4xl mx-auto">
          <TerminalHeading level={2} className="mb-8 text-center">OPERATING HISTORY</TerminalHeading>
          <Timeline items={timeline} />
        </div>
      </section>

      {/* Mission stripe */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center border border-primary/30 bg-secondary/20 p-8">
          <p className="text-primary/60 text-xs uppercase tracking-widest mb-3">MISSION STATEMENT</p>
          <p className="text-primary text-xl md:text-2xl font-heading leading-snug">
            TO HOLD ROCKS ON BEHALF OF PEOPLE WHO WOULD RATHER NOT HOLD THEM THEMSELVES.
          </p>
        </div>
      </section>
    </>
  )
}
