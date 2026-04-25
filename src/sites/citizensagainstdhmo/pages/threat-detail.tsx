import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getThreatBySlug, threats } from "@/sites/citizensagainstdhmo/data/threats"

interface ThreatDetailProps {
  slug: string
}

export default function ThreatDetailPage({ slug }: ThreatDetailProps) {
  const threat = getThreatBySlug(slug)
  if (!threat) notFound()

  const related = threat.relatedSlugs
    .map((s) => threats.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-6 min-h-[360px]">
        <Image
          src={threat.heroImage}
          alt=""
          fill
          className="object-cover brightness-50"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-4">Threat Dossier</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {threat.name}
          </h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">{threat.tagline}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">The Evidence</p>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            {threat.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-primary text-background">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest text-background/70 mb-8 font-semibold">
            By the Numbers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {threat.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-heading font-bold text-background">{stat.value}</p>
                <p className="text-xs md:text-sm text-background/70 mt-2 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documented Cases */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-10 text-center">Documented Cases</h2>
          <div className="space-y-6">
            {threat.cases.map((c) => (
              <article key={c.title} className="border border-accent/30 rounded-lg p-6 bg-white">
                <h3 className="text-lg font-heading font-semibold text-primary mb-2">{c.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">{c.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 px-6 bg-white border-y border-accent/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-primary text-center mb-10">Related Threats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/threats/${r.slug}`}
                  className="group block border border-accent/30 rounded-lg p-6 bg-background hover:border-primary/40 transition-colors"
                >
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-sm text-foreground/60">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-secondary text-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4">Add your name to the petition.</h2>
          <p className="text-background/85 mb-8 leading-relaxed">
            Each signature is reviewed and counted toward our federal disclosure filings.
          </p>
          <Link
            href="/take-action"
            className="inline-block px-10 py-3 bg-background text-secondary rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            Take Action
          </Link>
        </div>
      </section>
    </>
  )
}
