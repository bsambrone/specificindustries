// src/sites/thetheoryisreal/pages/theories.tsx
import type { PageMetadata } from "@/themes"
import Link from "next/link"
import Image from "next/image"
import { theories, categories } from "@/sites/thetheoryisreal/data/theories"
import { getSiteHref } from "@/lib/site-href"

export const metadata: PageMetadata = {
  title: "Theories — The Theory Is Real",
  description: "All articles, indexed by category.",
}

export default async function Theories() {
  const siteHref = await getSiteHref()
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <h1 className="font-heading text-4xl text-primary">Theories</h1>
        <p className="mt-3 font-body text-base text-text/80">{theories.length} articles across {categories.length} categories. Begin where the pattern looks familiar.</p>
      </header>
      {categories.map((cat) => {
        const inCat = theories.filter((t) => t.category === cat.key)
        return (
          <section key={cat.key} className="mb-14">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-heading text-2xl text-primary">{cat.title}</h2>
              <Link href={siteHref(`/category/${cat.key}`)} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
                Full category →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {inCat.map((t) => (
                <Link
                  key={t.slug}
                  href={siteHref(`/theories/${t.slug}`)}
                  className="group block border border-primary/30 bg-[#17181c] transition-colors hover:border-primary"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden grayscale group-hover:grayscale-0">
                    <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                  <div className="p-4">
                    <p className="font-heading text-[0.65rem] uppercase tracking-widest text-text/55">
                      {new Date(t.publishedAt).toLocaleDateString()}
                    </p>
                    <h3 className="mt-2 font-body text-base leading-snug text-primary">{t.title}</h3>
                    <p className="mt-2 font-body text-sm text-text/75">{t.dek}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
