import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { dispatches } from "@/sites/sovereignwellness/data/dispatches"

export const metadata = {
  title: "Dispatches — Sovereign Wellness Co.",
  description: "Periodic correspondence from the Archive. Three per year. None urgent. All worth reading.",
}

export default function SovereignWellnessDispatches() {
  const urgent = dispatches.find((d) => d.urgent)
  const regular = dispatches.filter((d) => !d.urgent)

  return (
    <>
      <Hero
        headline="Dispatches"
        subheadline="Periodic correspondence from the Archive. Three per year under ordinary circumstances. More, should circumstances require."
      />

      {urgent && (
        <section className="py-12 px-4 bg-primary text-secondary">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-[#B08C3A] mb-4">Urgent Dispatch · Read Before Proceeding</p>
            <Link href={`/dispatches/${urgent.slug}`} className="grid md:grid-cols-[1fr_2fr] gap-8 items-center group">
              <div className="relative w-full aspect-[4/3] bg-[#4A1414] border-2 border-[#B08C3A]">
                <Image src={urgent.image} alt={urgent.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:opacity-90 transition-opacity" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-wide leading-tight mb-4">{urgent.title}</h2>
                <p className="text-secondary/90 leading-relaxed">{urgent.excerpt}</p>
                <p className="mt-4 text-xs tracking-[0.3em] uppercase text-[#B08C3A]">{urgent.publishedLabel}</p>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {regular.map((d) => (
            <Link key={d.slug} href={`/dispatches/${d.slug}`} className="group">
              <div className="relative w-full aspect-[16/10] bg-accent/10 border border-primary/20 mb-5">
                <Image src={d.image} alt={d.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover group-hover:opacity-90 transition-opacity" />
              </div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">{d.publishedLabel}</p>
              <h3 className="font-heading text-2xl font-semibold mb-3 leading-tight group-hover:text-primary transition-colors">{d.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{d.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
