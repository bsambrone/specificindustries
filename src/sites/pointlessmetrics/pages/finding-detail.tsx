import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getFindingBySlug } from "@/sites/pointlessmetrics/data/findings"
import { getLeaderByPerson } from "@/sites/pointlessmetrics/data/leadership"
import { getProductBySlug } from "@/sites/pointlessmetrics/data/products"
import { CorrelationScatter } from "@/components/ui/pointlessmetrics/CorrelationScatter"
import { FindingCitation } from "@/components/ui/pointlessmetrics/FindingCitation"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

interface FindingDetailProps {
  slug: string
}

export default function FindingDetail({ slug }: FindingDetailProps) {
  const finding = getFindingBySlug(slug)
  if (!finding) notFound()

  const pi = getLeaderByPerson(finding.principalInvestigator)
  const citedProducts = finding.citedByProducts
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => !!p)

  return (
    <main className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-3">
          <span className="mr-2">{finding.category}</span>·<span className="ml-2">Published {finding.publishedDate}</span>
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary mb-4 leading-tight">{finding.title}</h1>
        {pi && (
          <p className="text-sm text-foreground/70 mb-10">
            Principal investigator: <Link href="/leadership" className="underline hover:text-primary">{pi.name}</Link>, {pi.title}.
          </p>
        )}

        <div className="mb-10">
          <CorrelationScatter
            points={finding.chartData}
            xLabel={finding.xAxis.label}
            yLabel={finding.yAxis.label}
            xUnits={finding.xAxis.units}
            yUnits={finding.yAxis.units}
            rValue={finding.rValue}
            pValue={finding.pValue}
            sampleSize={finding.sampleSize}
            figureNumber={1}
          />
        </div>

        <blockquote className="font-heading text-2xl text-primary border-l-4 border-secondary pl-5 py-1 mb-10">
          {finding.claim}
        </blockquote>

        <section className="mb-10">
          <h2 className="font-heading text-xl text-primary mb-2">Methodology</h2>
          <p className="text-foreground/85">{finding.methodology}</p>
        </section>

        <aside className="bg-white border border-accent/40 rounded-sm p-5 mb-10">
          <h2 className="text-xs uppercase tracking-wide text-foreground/60 mb-2">Limitations of this study</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/85">
            {finding.caveats.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </aside>

        <p className="text-xs italic text-foreground/65 mb-10">
          <strong className="not-italic text-foreground/80">Funding disclosure: </strong>{finding.funding}
        </p>

        {citedProducts.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading text-xl text-primary mb-4">Instruments cited in this study</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {citedProducts.map((p) => (
                <article key={p.slug} className="bg-white border border-accent/40 rounded-sm p-4 flex gap-4">
                  <Link href={`/products/${p.slug}`} className="block w-24 h-24 relative shrink-0 bg-accent/10">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="96px" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-foreground/50">{p.designation}</p>
                    <h3 className="font-heading text-primary">
                      <Link href={`/products/${p.slug}`} className="hover:underline">{p.name}</Link>
                    </h3>
                    <p className="text-sm font-semibold text-primary tabular-nums mb-2">{p.priceLabel}</p>
                    <AddToCartButton slug={p.slug} productName={p.name} className="text-xs px-3 py-1.5 bg-primary text-white rounded-sm font-semibold hover:opacity-90" />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <FindingCitation finding={finding} />

        <div className="mt-10">
          <Link href="/findings" className="text-sm text-primary hover:underline">← Back to Findings Archive</Link>
        </div>
      </div>
    </main>
  )
}
