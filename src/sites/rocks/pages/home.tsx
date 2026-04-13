import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { TickerStrip } from "@/sites/rocks/components/ticker-strip"
import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"
import { products } from "@/sites/rocks/data/products"

const features = [
  {
    title: "TANGIBLE",
    body: "Physically delivered. Fully custodial control. No reliance on third-party asset servicers, clearinghouses, or digital infrastructure of any kind.",
  },
  {
    title: "INFLATION-PROOF",
    body: "The rock has retained its essential rock-ness for an estimated 4.5 billion years. No other asset class offers comparable temporal stability.",
  },
  {
    title: "ZERO COUNTERPARTY RISK",
    body: "Once settled, the instrument is yours. Regulatory changes, market closures, and financial system failures have no impact on the integrity of your position.",
  },
]

export default function RocksHome() {
  return (
    <>
      <Hero
        headline="THE ONLY ASSET CLASS OLDER THAN MONEY."
        subheadline="Institutional-grade terrestrial exposure. Zero counterparty risk. Accumulate at spot."
        ctaText="BEGIN ACCUMULATION"
        ctaHref="/products"
        image="/sites/rocks/hero.png"
      />

      <TickerStrip />

      {/* Feature section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="border border-primary/30 bg-secondary p-6">
                <h3 className="font-heading font-semibold uppercase tracking-wide text-primary text-lg mb-3">
                  ▸ {f.title}
                </h3>
                <p className="text-primary/80 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products data strip */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <TerminalHeading level={2} className="mb-6">MARKET DEPTH</TerminalHeading>
          <p className="text-primary/60 text-sm mb-8 uppercase tracking-wide">
            THREE INSTRUMENTS. ZERO COUNTERPARTY EXPOSURE. ACQUIRE AT SPOT.
          </p>
          <div className="border border-primary/30 bg-background overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <thead className="bg-secondary border-b border-primary/30 text-primary uppercase text-xs tracking-wide">
                <tr>
                  <th className="text-left px-4 py-3">TICKER</th>
                  <th className="text-left px-4 py-3">INSTRUMENT</th>
                  <th className="text-right px-4 py-3">SPOT</th>
                  <th className="text-right px-4 py-3">CHG 24H</th>
                  <th className="text-right px-4 py-3">VOL</th>
                  <th className="text-right px-4 py-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-primary/90">
                {products.map((p, i) => (
                  <tr key={p.slug} className={i % 2 === 0 ? "bg-background" : "bg-secondary/40"}>
                    <td className="px-4 py-4 font-semibold">{p.ticker}</td>
                    <td className="px-4 py-4">{p.name}</td>
                    <td className="px-4 py-4 text-right">{p.priceLabel}</td>
                    <td className="px-4 py-4 text-right text-accent">{p.change24h}</td>
                    <td className="px-4 py-4 text-right text-primary/60">{p.volume}</td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-block border border-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary hover:bg-primary hover:text-background transition-colors"
                      >
                        [ACQUIRE]
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20 px-4 border-y border-primary/30 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <TerminalHeading level={1} className="mb-4">BEGIN ACCUMULATION</TerminalHeading>
          <p className="text-primary/70 text-sm md:text-base uppercase tracking-wide mb-8">
            A POSITION IN ROCKS IS A POSITION IN THE PHYSICAL WORLD. EVERYTHING ELSE IS A DERIVATIVE.
          </p>
          <Link
            href="/products"
            className="inline-block border-2 border-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-background transition-colors"
          >
            [ENTER MARKETS]
          </Link>
        </div>
      </section>
    </>
  )
}
