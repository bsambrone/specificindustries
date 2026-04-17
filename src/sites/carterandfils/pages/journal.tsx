import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { journalEntries } from "@/sites/carterandfils/data/journal"

export const metadata = {
  title: "The Sommelier's Journal — Domaine Carter & Fils",
  description: "Essays on wine, terroir, and the considered life — from the estate's sommelier team.",
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default function Journal() {
  const sorted = [...journalEntries].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))

  return (
    <>
      <Hero
        headline="The Sommelier's Journal"
        subheadline="Essays on wine, terroir, and the considered life."
      />
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-14">
          {sorted.map((e) => (
            <article key={e.slug} className="border-b border-accent/30 pb-14 last:border-b-0">
              <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">
                {formatDate(e.publishedDate)} · {e.readingTime}
              </p>
              <Link href={`/journal/${e.slug}`} className="block group">
                <h2 className="text-3xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-4">
                  {e.title}
                </h2>
              </Link>
              <p className="text-foreground/80 italic leading-relaxed mb-4">{e.excerpt}</p>
              <p className="text-sm text-foreground/60">— {e.author}</p>
              <Link href={`/journal/${e.slug}`} className="inline-block mt-6 text-sm tracking-widest uppercase text-primary hover:opacity-70 transition-opacity border-b-2 border-primary">
                Read the Essay
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
