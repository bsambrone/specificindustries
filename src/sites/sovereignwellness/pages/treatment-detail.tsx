import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTreatmentBySlug, treatments, CATEGORY_LABELS } from "@/sites/sovereignwellness/data/treatments"
import { WaxSealCTA } from "@/sites/sovereignwellness/components/WaxSealCTA"

interface Props {
  slug: string
}

export default function TreatmentDetail({ slug }: Props) {
  const t = getTreatmentBySlug(slug)
  if (!t) notFound()

  const related = treatments.filter((other) => other.slug !== t.slug && other.category === t.category).slice(0, 3)

  return (
    <>
      {/* Hero section: image + identification */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full aspect-square bg-accent/10 border border-primary/20">
            <Image src={t.image} alt={t.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">{CATEGORY_LABELS[t.category]} · Classification</p>
            <h1 className="text-4xl font-heading font-semibold mb-4">{t.name}</h1>
            <p className="text-lg font-heading italic text-foreground/70 mb-6">{t.tagline}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-accent text-[#F5ECD7] px-3 py-1 text-[10px] tracking-[0.3em] uppercase">Banned in {t.bannedInStates} states</span>
              <span className="border border-primary/40 text-primary px-3 py-1 text-[10px] tracking-[0.3em] uppercase">Lot · VII</span>
              <span className="border border-primary/40 text-primary px-3 py-1 text-[10px] tracking-[0.3em] uppercase">Waitlist only</span>
            </div>
            <p className="text-foreground/80 mb-8 leading-relaxed">{t.condition}</p>
            <div className="flex items-center gap-6 mb-6">
              <span className="text-3xl font-heading">{t.priceLabel}</span>
              <span className="text-xs uppercase tracking-widest text-foreground/50">per Protocol</span>
            </div>
            <WaxSealCTA href="#waitlist">Request Access</WaxSealCTA>
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <section className="py-16 px-4 bg-secondary/40 border-y border-primary/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Mechanism of Action</p>
          <h2 className="text-3xl font-heading font-semibold mb-6">How It Works</h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            {t.mechanism.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Administration Protocol</p>
          <h2 className="text-3xl font-heading font-semibold mb-6">The Regimen</h2>
          <p className="text-foreground/80 leading-relaxed font-heading italic text-lg">{t.protocol}</p>
        </div>
      </section>

      {/* Documented Cases */}
      <section className="py-16 px-4 bg-accent text-[#F5ECD7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#B08C3A] mb-3 text-center">Documented Cases</p>
          <h2 className="text-3xl font-heading font-semibold mb-12 text-center">From the Ledger</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.cases.map((c, i) => (
              <blockquote key={i} className="border-l-2 border-[#B08C3A] pl-6">
                <p className="font-heading italic leading-relaxed mb-3">&ldquo;{c.testimonial}&rdquo;</p>
                <footer className="text-xs tracking-[0.25em] uppercase text-[#B08C3A]">
                  — {c.initials}, {c.location}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Access</p>
          <h2 className="text-3xl font-heading font-semibold mb-6">Request A Place on the Waitlist.</h2>
          <p className="text-foreground/80 mb-8 leading-relaxed">
            Supply of {t.name} is restricted per standing federal inquiry. New allocations are made at the Founders&apos; discretion.
          </p>
          <WaxSealCTA href="/contact">Submit Your Request</WaxSealCTA>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-secondary/40 border-t border-primary/20">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3 text-center">Related Protocols</p>
            <h2 className="text-3xl font-heading font-semibold mb-10 text-center">In the Same Classification</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/treatments/${r.slug}`} className="group">
                  <div className="relative w-full aspect-square bg-accent/10 border border-primary/20 mb-3">
                    <Image src={r.image} alt={r.name} fill sizes="33vw" className="object-cover group-hover:opacity-80 transition-opacity" />
                  </div>
                  <p className="font-heading text-lg leading-tight">{r.name}</p>
                  <p className="text-sm italic text-foreground/60 mt-1">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
