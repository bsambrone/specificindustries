// src/sites/thetheoryisreal/pages/category.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getCategoryByKey, getTheoriesByCategory } from "@/sites/thetheoryisreal/data/theories"
import { getSiteHref } from "@/lib/site-href"
import type { CategoryKey } from "@/sites/thetheoryisreal/types"

export default async function CategoryPage({ slug }: { slug: string }) {
  const cat = getCategoryByKey(slug as CategoryKey)
  if (!cat) notFound()
  const items = getTheoriesByCategory(cat.key)
  const siteHref = await getSiteHref()
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="relative mb-10 overflow-hidden border border-primary/40">
        <div className="relative aspect-[21/9] w-full grayscale">
          <Image src={cat.image} alt={cat.title} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/60 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">Category</p>
          <h1 className="mt-2 font-heading text-4xl text-primary">{cat.title}</h1>
          <p className="mt-2 font-body text-base text-text/90">{cat.tagline}</p>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <Link key={t.slug} href={siteHref(`/theories/${t.slug}`)} className="group block border border-primary/30 bg-[#17181c] transition-colors hover:border-primary">
            <div className="relative aspect-[4/3] w-full overflow-hidden grayscale group-hover:grayscale-0">
              <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-4">
              <h3 className="font-body text-lg leading-snug text-primary">{t.title}</h3>
              <p className="mt-2 font-body text-sm text-text/75">{t.dek}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
