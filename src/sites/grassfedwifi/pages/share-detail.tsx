import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { getShareBySlug, shares, shareQuips } from "@/sites/grassfedwifi/data/shares"

interface ShareDetailProps {
  slug: string
}

export default function ShareDetail({ slug }: ShareDetailProps) {
  const share = getShareBySlug(slug)
  if (!share) notFound()

  const otherShares = shares.filter((s) => s.slug !== slug)

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/shares"
            className="text-sm text-foreground/60 hover:text-primary mb-6 inline-block"
          >
            ← Back to Shares
          </Link>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20">
              <Image src={share.image} alt={share.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-bold text-foreground mb-3">{share.name}</h1>
              <p className="text-xl text-foreground/70 mb-6">{share.tagline}</p>
              <p className="text-3xl font-bold text-primary mb-8">{share.priceLabel}</p>

              {share.description.map((para, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed mb-4">
                  {para}
                </p>
              ))}

              <div className="mt-8">
                <AddToCartButton
                  slug={share.slug}
                  productName={share.name}
                  quips={shareQuips}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">What&apos;s Included</h2>
          <ul className="space-y-3 mb-8">
            {share.includes.map((item, i) => (
              <li key={i} className="flex gap-3 text-foreground/80">
                <span className="text-primary font-bold">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-primary/10">
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Bandwidth</p>
              <p className="text-foreground font-medium">{share.bandwidth}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Allocation</p>
              <p className="text-foreground font-medium">{share.allocation}</p>
            </div>
          </div>
        </div>
      </section>

      {share.disclaimers.length > 0 && (
        <section className="py-8 px-4 bg-foreground/5 border-t border-foreground/10">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-foreground/40 leading-relaxed">
              {share.disclaimers.join(" · ")}
            </p>
          </div>
        </section>
      )}

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">Other Shares</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherShares.map((s) => (
              <Link
                key={s.slug}
                href={`/shares/${s.slug}`}
                className="block p-6 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
              >
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{s.name}</h3>
                <p className="text-foreground/70 text-sm mb-2">{s.tagline}</p>
                <p className="text-primary font-semibold">{s.priceLabel}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
