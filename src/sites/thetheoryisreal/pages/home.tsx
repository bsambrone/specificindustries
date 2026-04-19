// src/sites/thetheoryisreal/pages/home.tsx
import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { getSiteHref } from "@/lib/site-href"
import { categories, getBreakingTheories } from "@/sites/thetheoryisreal/data/theories"
import { getHotThreads } from "@/sites/thetheoryisreal/data/forum"
import { evidenceItems } from "@/sites/thetheoryisreal/data/evidence"
import { products } from "@/sites/thetheoryisreal/data/products"
import { libraryEntries } from "@/sites/thetheoryisreal/data/library"
import { RedAlertBanner } from "@/sites/thetheoryisreal/components/red-alert-banner"
import { BreakingRail } from "@/sites/thetheoryisreal/components/breaking-rail"
import { CategoryTile } from "@/sites/thetheoryisreal/components/category-tile"
import { ForumThreadRow } from "@/sites/thetheoryisreal/components/forum-thread-row"
import { EvidenceTile } from "@/sites/thetheoryisreal/components/evidence-tile"
import { GeoCitiesFooterWink } from "@/sites/thetheoryisreal/components/geocities-footer-wink"

const ALERT_HEADLINES = [
  "CROSS-HATCH RECURRENCE CONFIRMED OVER THREE SEPARATE METROS — SEE LATEST",
  "NPC CENSUS 2026 METHODOLOGY PUBLISHED — OBJECTIONS INVITED",
  "REPTILIAN DENTAL RECORDS LEAK — OBSERVE WITH CAUTION",
  "6G SARCASM-ALLERGY CASES UP 340% SINCE Q1",
  "FURNITURE CARTEL RESPONDS TO NON-ALLEGATIONS — DENIALS IMMINENT",
]

export default async function Home() {
  const siteHref = await getSiteHref()
  const breaking = getBreakingTheories(5)
  const hot = getHotThreads(4)
  const evidencePreview = evidenceItems.slice(0, 4)
  const productPreview = products.slice(0, 3)
  const libraryPreview = libraryEntries.slice(0, 3)

  return (
    <>
      <RedAlertBanner headlines={ALERT_HEADLINES} />

      <Hero
        headline="The truth is not hidden. You are."
        subheadline="Independent reporting on atmospheric, reptilian, simulation, and signal-interference phenomena. 20 active investigations. 25 forum threads. 24 pieces of evidence on file."
        image="/sites/thetheoryisreal/hero.png"
        ctaText="Browse theories"
        ctaHref="/theories"
        secondaryCtaText="Join the forum"
        secondaryCtaHref="/forum"
      />

      <BreakingRail items={breaking} />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-6 font-heading text-sm uppercase tracking-[0.3em] text-accent">Categories</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <CategoryTile key={c.key} category={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">🔥 Hot on the Forum</h2>
          <Link href={siteHref("/forum")} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
            Full forum →
          </Link>
        </div>
        <div className="border border-primary/30 bg-[#141519]">
          {hot.map((t) => (
            <ForumThreadRow key={`${t.board}/${t.slug}`} thread={t} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">Recent Evidence</h2>
          <Link href={siteHref("/evidence")} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
            Full gallery →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {evidencePreview.map((item) => (
            <EvidenceTile key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">From the Outfitter</h2>
          <Link href={siteHref("/shop")} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
            Full shop →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {productPreview.map((p) => (
            <Link key={p.slug} href={siteHref(`/products/${p.slug}`)} className="group block border border-primary/30 bg-[#17181c] p-4 transition-colors hover:border-primary">
              <div className="relative aspect-square w-full overflow-hidden grayscale group-hover:grayscale-0">
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <p className="mt-3 font-body text-base text-primary">{p.name}</p>
              <p className="mt-1 font-heading text-xs uppercase tracking-widest text-secondary">{p.priceLabel}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">From the Library</h2>
          <Link href={siteHref("/library")} className="font-heading text-xs uppercase tracking-widest text-secondary hover:text-primary">
            Full archive →
          </Link>
        </div>
        <ol className="border border-primary/30 bg-[#141519]">
          {libraryPreview.map((e, i) => (
            <li key={i} className="border-b border-primary/20 px-5 py-3 last:border-b-0">
              <a href={e.url} className="font-body text-base text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-accent">
                {e.title}
              </a>
              <p className="mt-1 font-heading text-[0.7rem] uppercase tracking-wider text-text/55">{e.author} · {e.year}</p>
            </li>
          ))}
        </ol>
      </section>

      <GeoCitiesFooterWink />
    </>
  )
}
