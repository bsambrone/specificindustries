// src/sites/thetheoryisreal/pages/theory-detail.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getTheoryBySlug, getCategoryByKey } from "@/sites/thetheoryisreal/data/theories"
import { PullQuote } from "@/sites/thetheoryisreal/components/pull-quote"
import { getSiteHref } from "@/lib/site-href"

export default async function TheoryDetail({ slug }: { slug: string }) {
  const t = getTheoryBySlug(slug)
  if (!t) notFound()
  const cat = getCategoryByKey(t.category)
  const siteHref = await getSiteHref()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-4 font-heading text-xs uppercase tracking-widest text-text/55">
        <Link href={siteHref("/theories")} className="hover:text-primary">Theories</Link>
        <span className="mx-2">/</span>
        {cat && (
          <Link href={siteHref(`/category/${cat.key}`)} className="hover:text-primary">{cat.title}</Link>
        )}
      </nav>

      <article>
        <header className="mb-6">
          {t.breakingBadge && (
            <span className="inline-block rounded-sm bg-accent px-2 py-0.5 font-heading text-[0.65rem] uppercase tracking-widest text-[#0f1012]">
              BREAKING
            </span>
          )}
          <h1 className="mt-3 font-heading text-3xl leading-tight text-primary sm:text-4xl">{t.title}</h1>
          <p className="mt-4 font-body text-lg italic text-text/80">{t.dek}</p>
          <p className="mt-3 font-heading text-[0.7rem] uppercase tracking-widest text-text/55">
            Published {new Date(t.publishedAt).toLocaleDateString()} · Filed under {cat?.title}
          </p>
        </header>

        <div className="relative aspect-[16/9] w-full overflow-hidden border border-primary/40 grayscale contrast-125">
          <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
        </div>

        <div className="mt-8 space-y-5">
          {t.body.map((p, i) => (
            <div key={i}>
              <p className="font-body text-[1.05rem] leading-relaxed text-text/90">{p}</p>
              {t.pullQuotes?.[i === 2 ? 0 : i === Math.max(0, t.body.length - 3) ? 1 : -1] && null}
            </div>
          ))}
          {t.pullQuotes?.map((q, i) => (
            <PullQuote key={`pq-${i}`}>{q}</PullQuote>
          ))}
        </div>

        {t.relatedSlugs && t.relatedSlugs.length > 0 && (
          <footer className="mt-14 border-t border-primary/20 pt-6">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">Related</h2>
            <ul className="mt-3 space-y-2">
              {t.relatedSlugs.map((s) => {
                const r = getTheoryBySlug(s)
                if (!r) return null
                return (
                  <li key={s}>
                    <Link href={siteHref(`/theories/${s}`)} className="font-body text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-accent">
                      {r.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </footer>
        )}
      </article>
    </main>
  )
}
