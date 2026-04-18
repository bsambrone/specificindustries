import Link from "next/link"
import { notFound } from "next/navigation"
import { getPressReleaseBySlug } from "../data/press-releases"

interface Props {
  slug: string
}

export function PressReleaseDetailView({ slug }: Props) {
  const release = getPressReleaseBySlug(slug)
  if (!release) notFound()

  return (
    <>
      <article className="py-14 px-4 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-3">
          <Link href="/newsroom" className="hover:underline">Newsroom</Link>
          <span className="mx-2">›</span>
          <span>{release.date}</span>
        </p>

        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary leading-tight mb-3">
          {release.headline}
        </h1>
        {release.subhead && (
          <p className="text-lg text-foreground/70 italic mb-8 leading-snug">{release.subhead}</p>
        )}

        <p className="text-sm text-foreground/80 leading-relaxed mb-6">
          <span className="font-heading font-semibold text-primary">{release.dateline}</span>{" "}
          {release.lede}
        </p>

        <div className="space-y-5 text-foreground/80 leading-relaxed">
          {release.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {release.quotes && release.quotes.length > 0 && (
          <div className="my-10 space-y-6 border-l-4 border-primary/30 pl-6">
            {release.quotes.map((q, i) => (
              <div key={i}>
                <p className="italic text-foreground/80 leading-relaxed mb-2">&quot;{q.text}&quot;</p>
                <p className="text-sm text-foreground/60">
                  <span className="font-heading font-semibold text-primary">— {q.speaker}</span>, {q.title}
                </p>
              </div>
            ))}
          </div>
        )}

        {release.boilerplate && (
          <section className="mt-14 pt-8 border-t border-primary/10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-4">
              About Specific Industries
            </h2>
            <p className="text-sm text-foreground/70 leading-relaxed">{release.boilerplate}</p>
          </section>
        )}

        {release.contact && (
          <section className="mt-10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-3">Contact</h2>
            <p className="text-sm text-foreground/70 leading-relaxed">
              <span className="font-heading font-semibold text-primary">{release.contact.name}</span>
              <br />
              {release.contact.line}
            </p>
          </section>
        )}

        <div className="mt-12 pt-6 border-t border-primary/10">
          <Link href="/newsroom" className="text-sm font-heading text-primary hover:underline">
            ← Back to Newsroom
          </Link>
        </div>
      </article>
    </>
  )
}

export default function PressReleaseDetailRoute({ slug }: { slug: string; segments?: string[] }) {
  return <PressReleaseDetailView slug={slug} />
}
