import Link from "next/link"
import { TickerStrip } from "@/sites/rocks/components/ticker-strip"
import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"
import { products } from "@/sites/rocks/data/products"

export const metadata = {
  title: "MARKETS — ROCKS",
  description: "Live quotes on all three rock instruments. Accumulate at spot.",
}

export default function RocksProducts() {
  return (
    <>
      <TickerStrip />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <TerminalHeading level={1} className="mb-2">MARKETS</TerminalHeading>
          <p className="text-primary/60 text-sm uppercase tracking-wide mb-8">
            ALL THREE INSTRUMENTS. REALTIME SPOT PRICING. EXECUTION BY CLICK.
          </p>

          <div className="border border-primary/30 bg-secondary/20 overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <thead className="bg-secondary border-b-2 border-primary/50 text-primary uppercase text-xs tracking-wide">
                <tr>
                  <th className="text-left px-4 py-3">TICKER</th>
                  <th className="text-left px-4 py-3">INSTRUMENT</th>
                  <th className="text-right px-4 py-3">UNIT</th>
                  <th className="text-right px-4 py-3">SPOT</th>
                  <th className="text-right px-4 py-3">CHG 24H</th>
                  <th className="text-right px-4 py-3">VOL</th>
                  <th className="text-right px-4 py-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-primary/90">
                {products.map((p, i) => {
                  const unitLabel = p.slug === "one-rock" ? "1 CT" : p.slug === "two-rocks" ? "2 CT" : "~12 CT"
                  return (
                    <tr key={p.slug} className={i % 2 === 0 ? "bg-background" : "bg-secondary/40"}>
                      <td className="px-4 py-4 font-semibold">
                        <Link href={`/products/${p.slug}`} className="hover:underline">
                          {p.ticker}
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <Link href={`/products/${p.slug}`} className="hover:underline">
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-right">{unitLabel}</td>
                      <td className="px-4 py-4 text-right font-semibold">{p.priceLabel}</td>
                      <td className="px-4 py-4 text-right text-accent">{p.change24h}</td>
                      <td className="px-4 py-4 text-right text-primary/60">{p.volume}</td>
                      <td className="px-4 py-4 text-right">
                        <Link
                          href={`/products/${p.slug}`}
                          className="inline-block border border-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary hover:bg-primary hover:text-background transition-colors"
                        >
                          [DETAIL]
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot className="border-t border-primary/30 text-primary/50 text-xs uppercase">
                <tr>
                  <td colSpan={7} className="px-4 py-3">
                    MARKET DATA REALTIME. LAST UPDATED: NOW. SPOT QUOTES INDICATIVE ONLY.
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
