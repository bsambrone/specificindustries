import Link from "next/link"
import Image from "next/image"
import { fieldNotes } from "@/sites/grassfedwifi/data/field-notes"

export const metadata = {
  title: "Field Notes — Grass Fed WiFi",
  description: "Farmer diaries, seasonal dispatches, and harvest reports from the co-op.",
}

export default function FieldNotesIndex() {
  const sorted = [...fieldNotes].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Field Notes</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Farmer diaries, seasonal dispatches, and occasional manifestos. Written in the barn.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {sorted.map((note) => (
            <article key={note.slug}>
              <Link href={`/field-notes/${note.slug}`} className="block group">
                <div className="grid md:grid-cols-[2fr_3fr] gap-8 items-start">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary/20">
                    <Image src={note.image} alt={note.title} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex gap-2 mb-3">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs uppercase tracking-wider text-primary font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {note.title}
                    </h2>
                    <p className="text-sm text-foreground/50 mb-3">
                      By {note.author} · {note.date}
                    </p>
                    <p className="text-foreground/80 leading-relaxed">{note.excerpt}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
