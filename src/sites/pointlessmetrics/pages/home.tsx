"use client"

import Link from "next/link"
import Image from "next/image"
import { findings } from "@/sites/pointlessmetrics/data/findings"
import { featuredFindingSlugs, featuredProductSlugs } from "@/sites/pointlessmetrics/data/home-dashboard"
import { getProductBySlug } from "@/sites/pointlessmetrics/data/products"
import { leaders } from "@/sites/pointlessmetrics/data/leadership"
import { pressMentions } from "@/sites/pointlessmetrics/data/press-mentions"
import { DashboardTile } from "@/components/ui/pointlessmetrics/DashboardTile"
import { InstituteSeal } from "@/components/ui/pointlessmetrics/InstituteSeal"

export default function PointlessMetricsHome() {
  const featuredFindings = featuredFindingSlugs
    .map((s) => findings.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => !!f)
  const instrument = getProductBySlug(featuredProductSlugs.instrument)
  const publication = getProductBySlug(featuredProductSlugs.publication)
  const credential = getProductBySlug(featuredProductSlugs.credential)

  return (
    <main>
      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[auto_1fr] gap-10 items-center">
          <InstituteSeal size={160} />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-3">Established 2011</p>
            <h1 className="font-heading text-4xl md:text-6xl text-primary leading-tight">
              Institute for the Study of Pointless Metrics
            </h1>
            <p className="mt-5 text-lg text-foreground/80 max-w-2xl">
              Rigorous peer-reviewed research on the correlations that should not be. Instruments for quantifying the intangible. Credentialing for the next generation of practitioners.
            </p>
            <p className="mt-3 text-sm italic text-foreground/60">In data we overtrust.</p>
          </div>
        </div>
      </section>

      {/* Live Findings dashboard */}
      <section className="py-12 px-4 border-t border-accent/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-heading text-3xl text-primary">Live Findings</h2>
            <Link href="/findings" className="text-sm text-primary hover:underline">Browse the archive →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredFindings.map((f) => (
              <DashboardTile key={f.slug} finding={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Three revenue-stream CTAs */}
      <section className="py-16 px-4 border-t border-accent/30 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-8 text-center">Three ways to participate</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {instrument && (
              <CtaCard
                label="Buy an instrument"
                title={instrument.name}
                blurb={instrument.tagline}
                href={`/products/${instrument.slug}`}
                price={instrument.priceLabel}
              />
            )}
            {publication && (
              <CtaCard
                label="Read the report"
                title={publication.name}
                blurb={publication.tagline}
                href={`/products/${publication.slug}`}
                price={publication.priceLabel}
              />
            )}
            {credential && (
              <CtaCard
                label="Get certified"
                title={credential.name}
                blurb={credential.tagline}
                href={`/products/${credential.slug}`}
                price={credential.priceLabel}
              />
            )}
          </div>
        </div>
      </section>

      {/* Leadership strip */}
      <section className="py-16 px-4 border-t border-accent/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-8">Institute Leadership</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {leaders.map((l) => (
              <Link key={l.slug} href="/leadership" className="group">
                <div className="aspect-square relative overflow-hidden bg-accent/10 border border-accent/40 mb-3">
                  <Image src={l.portraitImage} alt={l.name} fill className="object-cover group-hover:scale-[1.02] transition-transform" sizes="(min-width: 768px) 25vw, 50vw" />
                </div>
                <h3 className="font-heading text-lg text-primary">{l.name}</h3>
                <p className="text-xs text-foreground/60">{l.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Press mentions */}
      <section className="py-12 px-4 border-t border-accent/30 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/60 mb-6 text-center">As referenced in</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {pressMentions.slice(0, 4).map((m) => (
              <blockquote key={m.publication} className="text-sm italic text-foreground/80 border-l-2 border-secondary pl-4">
                &ldquo;{m.quote}&rdquo;
                <footer className="mt-1 not-italic text-xs text-foreground/60">— {m.publication}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 border-t border-accent/30 bg-primary text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl mb-3">Subscribe to the Correlation Dispatch</h2>
          <p className="text-white/80 mb-6 text-sm">A weekly brief on new findings, upcoming cohorts, and quarterly report deadlines. No unsubscribe link (by design).</p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@institutional.email"
              className="flex-1 px-4 py-2 text-foreground bg-white rounded-sm"
            />
            <button type="submit" className="px-5 py-2 bg-secondary text-white rounded-sm font-semibold hover:opacity-90">Subscribe</button>
          </form>
          <p className="mt-4 text-[11px] text-white/50">Form does not transmit. Submissions are notional.</p>
        </div>
      </section>
    </main>
  )
}

interface CtaCardProps {
  label: string
  title: string
  blurb: string
  href: string
  price: string
}

function CtaCard({ label, title, blurb, href, price }: CtaCardProps) {
  return (
    <Link href={href} className="block border border-accent/40 rounded-sm p-6 bg-background hover:border-primary/60 transition-colors">
      <p className="text-xs uppercase tracking-[0.15em] text-secondary mb-3">{label}</p>
      <h3 className="font-heading text-xl text-primary mb-2">{title}</h3>
      <p className="text-sm text-foreground/70 mb-4">{blurb}</p>
      <p className="text-sm font-semibold text-primary tabular-nums">{price}</p>
    </Link>
  )
}
