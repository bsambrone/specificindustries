import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/sites/pointlessmetrics/data/products"
import type { Product } from "@/sites/pointlessmetrics/data/products"
import { getFindingBySlug } from "@/sites/pointlessmetrics/data/findings"
import { leaders } from "@/sites/pointlessmetrics/data/leadership"
import { testimonialPortraits } from "@/data/testimonial-portraits"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { FindingCard } from "@/components/ui/pointlessmetrics/FindingCard"
import { ProductSpecsTable } from "@/components/ui/pointlessmetrics/ProductSpecsTable"

interface ProductDetailProps {
  slug: string
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const citedFindings = product.citedFindingSlugs
    .map((s) => getFindingBySlug(s))
    .filter((f): f is NonNullable<typeof f> => !!f)

  const related = product.relatedProductSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => !!p)

  const portraits = product.testimonialPortraitSlugs
    ?.map((pslug) => testimonialPortraits.find((pp) => pp.slug === pslug))
    .filter((p): p is NonNullable<typeof p> => !!p) ?? []

  return (
    <main className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <section className="grid md:grid-cols-[5fr_4fr] gap-10 mb-16">
          <div className="aspect-[4/3] relative bg-white border border-accent/40 rounded-sm overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 768px) 55vw, 100vw" priority />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-1">{product.designation}</p>
            <h1 className="font-heading text-4xl text-primary mb-3">{product.name}</h1>
            <p className="text-lg text-foreground/80 mb-4">{product.tagline}</p>
            <div className="space-y-3 text-foreground/85 mb-6">
              {product.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-primary tabular-nums">{product.priceLabel}</span>
              <AddToCartButton slug={product.slug} productName={product.name} />
            </div>
          </div>
        </section>

        {/* What it measures */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl text-primary mb-3">What It Measures</h2>
          <p className="text-foreground/85 max-w-3xl">{product.whatItMeasures}</p>
        </section>

        {/* Category-specific body block */}
        <section className="mb-12">
          {product.categoryKey === "credentialing" && product.curriculum ? (
            <>
              <h2 className="font-heading text-2xl text-primary mb-4">Curriculum</h2>
              <ol className="space-y-3 mb-10">
                {product.curriculum.map((w) => (
                  <li key={w.week} className="flex gap-4 bg-white border border-accent/40 rounded-sm p-4">
                    <span className="font-heading text-2xl text-primary tabular-nums w-12 shrink-0">{w.week}</span>
                    <div>
                      <h3 className="font-semibold text-primary">{w.title}</h3>
                      <p className="text-sm text-foreground/80">{w.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <h2 className="font-heading text-2xl text-primary mb-4">Faculty</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {leaders.map((l) => (
                  <div key={l.slug} className="bg-white border border-accent/40 p-4 rounded-sm flex gap-4">
                    <div className="w-20 h-20 relative shrink-0 bg-accent/10">
                      <Image src={l.portraitImage} alt={l.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{l.name}</h3>
                      <p className="text-xs text-foreground/60">{l.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <aside className="bg-background border border-accent/40 rounded-sm p-4 text-sm text-foreground/75 italic">
                <strong className="text-primary not-italic">Accreditation disclosure:</strong> The Certified Pointless Metrics Practitioner™ credential is not accredited by any external body. Credits do not transfer. The credential may, however, be listed on a résumé without contradiction.
              </aside>
            </>
          ) : product.categoryKey === "advisory" ? (
            <div className="grid md:grid-cols-2 gap-8">
              {product.engagementScope && (
                <div>
                  <h2 className="font-heading text-2xl text-primary mb-3">Engagement Scope</h2>
                  <ul className="space-y-2 text-foreground/85">
                    {product.engagementScope.map((s, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-secondary shrink-0">·</span><span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.deliverables && (
                <div>
                  <h2 className="font-heading text-2xl text-primary mb-3">Deliverables</h2>
                  <ul className="space-y-2 text-foreground/85">
                    {product.deliverables.map((d, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-secondary shrink-0">·</span><span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <ProductSpecsTable specs={product.specs} />
          )}
        </section>

        {/* Cited findings */}
        {citedFindings.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading text-2xl text-primary mb-4">Cited Findings</h2>
            <p className="text-sm text-foreground/70 mb-4">Peer-reviewed evidence supporting this product&apos;s operating premise.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {citedFindings.map((f) => (
                <FindingCard key={f.slug} finding={f} />
              ))}
            </div>
          </section>
        )}

        {/* Methodology note */}
        <section className="mb-12 bg-white border border-accent/40 rounded-sm p-6">
          <h2 className="font-heading text-xl text-primary mb-2">A Note on Methodology</h2>
          <p className="text-sm text-foreground/80 italic">{product.methodologyNote}</p>
        </section>

        {/* Past issues — quarterly-report only */}
        {product.pastIssues && product.pastIssues.length > 0 ? (
          <section className="mb-12">
            <h2 className="font-heading text-2xl text-primary mb-4">Past Issues</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {product.pastIssues.map((issue) => (
                <div key={issue.label} className="aspect-[3/4] bg-primary text-white p-4 flex flex-col justify-between rounded-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider opacity-70">{issue.label}</p>
                    <h3 className="font-heading text-sm mt-2 leading-snug">{issue.title}</h3>
                  </div>
                  <p className="text-[9px] uppercase tracking-widest opacity-60">Institute Publication</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Testimonials — for everything except quarterly-report */
          portraits.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading text-2xl text-primary mb-4">Practitioner Voices</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {portraits.map((p) => (
                  <figure key={p.slug} className="bg-white border border-accent/40 rounded-sm p-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden bg-accent/10 mb-3">
                      <Image src={p.image} alt={p.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <blockquote className="text-sm text-foreground/80 italic mb-2">
                      &ldquo;{testimonialQuoteFor(product.slug, p.slug)}&rdquo;
                    </blockquote>
                    <figcaption className="text-xs text-foreground/60 not-italic">{p.name}, {p.role}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )
        )}

        {/* Related products */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading text-2xl text-primary mb-4">Related from the Institute</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/products/${r.slug}`} className="block bg-white border border-accent/40 rounded-sm p-4 hover:border-primary/60 transition-colors">
                  <p className="text-[10px] uppercase tracking-wide text-foreground/50 mb-1">{r.designation}</p>
                  <h3 className="font-heading text-primary mb-1">{r.name}</h3>
                  <p className="text-xs text-foreground/70 mb-2">{r.tagline}</p>
                  <p className="text-sm font-semibold text-primary tabular-nums">{r.priceLabel}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

// Deterministic quote selection: product slug + portrait slug → a stable entry
// from a small bank. Kept local to this page to avoid spinning up a data file
// just for product testimonial strings.
function testimonialQuoteFor(productSlug: string, portraitSlug: string): string {
  const bank = [
    "The readings were conclusive, though their meaning remains unclear.",
    "It measures precisely what we suspected it would.",
    "I have a number now. That is more than I had before.",
    "We have incorporated the finding into our roadmap. We will not act on it.",
    "It arrived pre-calibrated. The certificate is suitable for framing.",
    "The practitioners were rigorous. I cannot fault the rigor.",
    "My data is now Institute-grade. My decisions remain entirely my own.",
    "A colleague noticed the pin. It was a productive conversation.",
  ]
  const seed = (productSlug + ":" + portraitSlug).split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  return bank[seed % bank.length]
}
