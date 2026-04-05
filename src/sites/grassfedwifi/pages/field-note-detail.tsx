import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getFieldNoteBySlug, fieldNotes } from "@/sites/grassfedwifi/data/field-notes"

interface FieldNoteDetailProps {
  slug: string
}

export default function FieldNoteDetail({ slug }: FieldNoteDetailProps) {
  const note = getFieldNoteBySlug(slug)
  if (!note) notFound()

  const otherNotes = fieldNotes.filter((n) => n.slug !== slug).slice(0, 2)

  return (
    <>
      <article className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/field-notes"
            className="text-sm text-foreground/60 hover:text-primary mb-6 inline-block"
          >
            ← Back to Field Notes
          </Link>
          <div className="flex gap-2 mb-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wider text-primary font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">{note.title}</h1>
          <p className="text-foreground/50 mb-8">
            By {note.author} · {note.date}
          </p>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary/20 mb-10">
            <Image src={note.image} alt={note.title} fill className="object-cover" />
          </div>
          <div className="prose max-w-none">
            {note.body.map((para, i) => (
              <p key={i} className="text-foreground/80 leading-relaxed mb-4 text-lg">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      {otherNotes.length > 0 && (
        <section className="py-12 px-4 bg-secondary/10 border-t border-primary/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">More Field Notes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {otherNotes.map((n) => (
                <Link
                  key={n.slug}
                  href={`/field-notes/${n.slug}`}
                  className="block p-5 bg-background rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-heading font-bold text-foreground mb-2">{n.title}</h3>
                  <p className="text-sm text-foreground/60">{n.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
