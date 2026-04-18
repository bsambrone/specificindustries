import Link from "next/link"
import { journalEntries } from "@/sites/meh/data/journal"

export const metadata = {
  title: "The Journal — Meh.",
  description: "Field notes and short essays from the staff of Meh.",
}

export default function MehJournal() {
  const sorted = [...journalEntries].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-heading font-semibold text-primary mb-4 tracking-tight">The Journal</h1>
        <p className="text-foreground/80 leading-relaxed mb-16">
          Short field notes from staff. Published on an irregular schedule. Lightly edited.
        </p>

        <div className="divide-y divide-foreground/20 border-t border-b border-foreground/20">
          {sorted.map((entry) => (
            <Link
              key={entry.slug}
              href={`/journal/${entry.slug}`}
              className="block py-10 group"
            >
              <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">
                {entry.publishedDate} · {entry.readingTime} · {entry.author}
              </p>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-primary group-hover:opacity-70 transition-opacity mb-2">
                {entry.title}
              </h2>
              <p className="text-foreground/70 leading-relaxed">{entry.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
