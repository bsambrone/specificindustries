import Image from "next/image"
import { TickerStrip } from "@/sites/rocks/components/ticker-strip"
import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"
import { getProductBySlug } from "@/sites/rocks/data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  return (
    <>
      <TickerStrip />

      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative aspect-square border border-primary/30 bg-secondary/30 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              fetchPriority="high"
            />
          </div>
          <div>
            <p className="text-primary/60 text-xs uppercase tracking-widest mb-1">TICKER: {product.ticker}</p>
            <TerminalHeading level={1} className="mb-2">{product.name}</TerminalHeading>
            <p className="text-primary/70 text-sm uppercase tracking-wide mb-6">{product.tagline}</p>

            <div className="border border-primary/30 bg-secondary/30 p-4 mb-6 font-body tabular-nums">
              <div className="flex justify-between text-xs uppercase text-primary/50 mb-1">
                <span>SPOT</span>
                <span>CHG 24H</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-semibold text-primary">{product.priceLabel}</span>
                <span className="text-accent text-lg">{product.change24h}</span>
              </div>
              <div className="flex justify-between text-xs uppercase text-primary/50 mt-2 pt-2 border-t border-primary/20">
                <span>VOL {product.volume}</span>
                <span>BID {(product.price - 0.02).toFixed(2)} / ASK {(product.price + 0.02).toFixed(2)}</span>
              </div>
            </div>

            <AddToCartButton
              slug={product.slug}
              productName={product.name}
              className="w-full border-2 border-primary bg-background text-primary font-semibold uppercase tracking-wider px-6 py-3 hover:bg-primary hover:text-background transition-colors"
              quips={[
                "POSITION OPENED.",
                "EXECUTION CONFIRMED.",
                "SPOT TRANSACTION SETTLED.",
                "EXPOSURE ESTABLISHED.",
                "ORDER FILLED AT MARKET.",
                "ACCUMULATION IN PROGRESS.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-10 px-4 bg-secondary/20 border-y border-primary/20">
        <div className="max-w-3xl mx-auto space-y-4">
          {product.description.map((p, i) => (
            <p key={i} className="text-primary/80 leading-relaxed text-sm md:text-base">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Instrument details */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <TerminalHeading level={2} className="mb-6">INSTRUMENT DETAILS</TerminalHeading>
          <div className="border border-primary/30">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-primary/20">
                {product.instrumentDetails.map((row) => (
                  <tr key={row.label}>
                    <td className="px-4 py-3 uppercase text-primary/60 text-xs tracking-wide w-1/3">{row.label}</td>
                    <td className="px-4 py-3 text-primary font-semibold">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Risk factors */}
      <section className="py-12 px-4 bg-secondary/20 border-t border-primary/20">
        <div className="max-w-3xl mx-auto">
          <TerminalHeading level={2} className="mb-6">RISK FACTORS</TerminalHeading>
          <ul className="space-y-3 text-primary/80 text-sm">
            {product.riskFactors.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-primary/50 shrink-0">▸</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-primary/40 mt-8 uppercase tracking-wide border-t border-primary/20 pt-4">
            THIS INSTRUMENT IS NOT A SECURITY. IT IS A ROCK. NO REGULATORY BODY HAS REVIEWED THIS DISCLOSURE.
          </p>
        </div>
      </section>
    </>
  )
}
