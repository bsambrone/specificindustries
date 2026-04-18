import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getDispatchBySlug, dispatches } from "@/sites/sovereignwellness/data/dispatches"

interface Props {
  slug: string
}

export default function DispatchDetail({ slug }: Props) {
  const d = getDispatchBySlug(slug)
  if (!d) notFound()

  const others = dispatches.filter((o) => o.slug !== d.slug).slice(0, 3)

  return (
    <>
      <article className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">{d.publishedLabel}</p>
          <h1 className={`font-heading font-semibold leading-tight mb-6 ${d.urgent ? "text-4xl md:text-5xl uppercase tracking-wide text-primary" : "text-4xl md:text-5xl"}`}>
            {d.title}
          </h1>
          <p className="text-xl font-heading italic text-foreground/70 mb-10 leading-relaxed">{d.excerpt}</p>
          <div className="relative w-full aspect-[16/10] bg-accent/10 border border-primary/20 mb-10">
            <Image src={d.image} alt={d.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-6 text-foreground/85 leading-relaxed">
            {d.paragraphs.map((p, i) => (
              <p key={i} className={d.urgent ? "font-heading text-lg" : ""}>{p}</p>
            ))}
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="py-16 px-4 bg-secondary/40 border-t border-primary/20">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3 text-center">Other Dispatches</p>
            <h2 className="text-3xl font-heading font-semibold mb-10 text-center">Further Correspondence</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((o) => (
                <Link key={o.slug} href={`/dispatches/${o.slug}`} className="group">
                  <div className="relative w-full aspect-[16/10] bg-accent/10 border border-primary/20 mb-3">
                    <Image src={o.image} alt={o.title} fill sizes="33vw" className="object-cover group-hover:opacity-80 transition-opacity" />
                  </div>
                  <p className="font-heading text-lg leading-tight">{o.title}</p>
                  <p className="text-sm italic text-foreground/60 mt-1">{o.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
