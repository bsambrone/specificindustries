import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSourceBySlug } from "@/sites/citizensagainstdhmo/data/sources"
import { threats } from "@/sites/citizensagainstdhmo/data/threats"

interface SourceDetailProps {
  slug: string
}

export default function SourceDetailPage({ slug }: SourceDetailProps) {
  const source = getSourceBySlug(slug)
  if (!source) notFound()

  const related = source.relatedThreatSlugs
    .map((s) => threats.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  return (
    <>
      <section className="relative py-24 px-6 min-h-[360px]">
        <Image src={source.heroImage} alt="" fill className="object-cover brightness-50" priority fetchPriority="high" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-4">Where It Hides</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">{source.name}</h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">{source.tagline}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">How It Gets In</p>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            {source.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white border-y border-accent/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-10">Concentration Levels</h2>
          <div className="border border-accent/30 rounded-lg overflow-hidden bg-background">
            <table className="w-full text-sm">
              <thead className="bg-primary text-background">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider text-xs">Context</th>
                  <th className="text-left px-5 py-3 font-semibold uppercase tracking-wider text-xs">Measurement</th>
                </tr>
              </thead>
              <tbody>
                {source.measurements.map((m) => (
                  <tr key={m.context} className="border-t border-accent/20">
                    <td className="px-5 py-3 text-foreground/80">{m.context}</td>
                    <td className="px-5 py-3 text-primary font-semibold">{m.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-primary text-center mb-10">Related Threats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/threats/${r.slug}`}
                  className="group block border border-accent/30 rounded-lg p-6 bg-white hover:border-primary/40 transition-colors"
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
    </>
  )
}
