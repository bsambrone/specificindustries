import Image from "next/image"
import Link from "next/link"
import { getJournalBySlug } from "@/sites/carterandfils/data/journal"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default function JournalEntry({ slug }: { slug: string }) {
  const entry = getJournalBySlug(slug)
  if (!entry) return null

  return (
    <article className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/journal" className="text-sm tracking-widest uppercase text-primary/70 hover:text-primary transition-colors">
          ← The Journal
        </Link>
        <div className="relative aspect-[16/9] border border-accent/30 overflow-hidden mt-8 mb-10">
          <Image src={entry.image} alt={entry.title} fill className="object-cover" priority />
        </div>
        <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">
          {formatDate(entry.publishedDate)} · {entry.readingTime}
        </p>
        <h1 className="text-5xl font-heading font-semibold text-foreground mb-6 leading-tight">
          {entry.title}
        </h1>
        <p className="text-xl italic text-foreground/70 leading-relaxed mb-2">{entry.excerpt}</p>
        <p className="text-sm text-foreground/60 mb-12">— {entry.author}</p>
        <div className="prose prose-lg text-foreground/85 space-y-6 leading-relaxed">
          {entry.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
