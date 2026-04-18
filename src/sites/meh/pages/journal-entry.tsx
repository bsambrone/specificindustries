import Link from "next/link"
import { getJournalEntryBySlug } from "@/sites/meh/data/journal"

export default function JournalEntryPage({ slug }: { slug: string }) {
  const entry = getJournalEntryBySlug(slug)
  if (!entry) return null

  return (
    <article className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/journal" className="text-xs uppercase tracking-widest text-foreground/60 hover:text-primary">
          ← The Journal
        </Link>

        <header className="mt-12 mb-10">
          <p className="text-xs uppercase tracking-widest text-foreground/50 mb-3">
            {entry.publishedDate} · {entry.readingTime} · {entry.author}
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary leading-tight">{entry.title}</h1>
        </header>

        <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
          {entry.body.map((p, i) => (<p key={i}>{p}</p>))}
        </div>

        <p className="mt-16 text-xs uppercase tracking-widest italic text-foreground/50">— End of entry —</p>
      </div>
    </article>
  )
}
