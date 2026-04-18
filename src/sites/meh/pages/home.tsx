import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/ui/product-card"
import { getProductBySlug } from "@/sites/meh/data/products"
import { journalEntries } from "@/sites/meh/data/journal"

const FEATURED_SLUGS = [
  "beige-mood-ring",
  "monotone-speaker",
  "oh-humidifier",
  "about-right-scale",
]

const PRESS_QUOTES = [
  { quote: "Technically fine.", pub: "Wirecutter" },
  { quote: "The design is so restrained it begins to feel like surrender.", pub: "Dwell" },
  { quote: "I have purchased three.", pub: "The New Yorker" },
]

export default function MehHome() {
  const featured = FEATURED_SLUGS
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<ReturnType<typeof getProductBySlug>> => !!p)

  const recentJournal = [...journalEntries]
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    .slice(0, 2)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-foreground/20 py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-7xl md:text-9xl font-heading font-semibold text-primary tracking-tight">Meh.</h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Gadgets for people who&apos;ve adjusted their expectations.
          </p>
          <div className="mt-12 relative w-full max-w-3xl mx-auto aspect-[16/10] border border-foreground/20 bg-background/60">
            <Image src="/sites/meh/hero.png" alt="A single gadget on a gray surface" fill className="object-cover" priority />
          </div>
          <Link
            href="/products"
            className="inline-block mt-12 px-10 py-3 border border-primary text-primary uppercase tracking-widest text-sm hover:bg-primary hover:text-background transition-colors"
          >
            Browse the catalog →
          </Link>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-b border-foreground/20 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-foreground/60 mb-6">From the Manifesto</p>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Our devices are designed to underdeliver, reliably. Each one is a small, well-made disappointment — calibrated, repeatable, quiet.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            The ambition of consumer electronics, we have come to believe, is misplaced. What most rooms need is not more capability but a steady, familiar small letdown. We build that.
          </p>
          <Link href="/manifesto" className="inline-block mt-8 text-sm uppercase tracking-widest text-primary border-b border-primary hover:opacity-70 transition-opacity">
            Read the full manifesto →
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="border-b border-foreground/20 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-foreground/60 mb-10">One from each category</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featured.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                href={`/products/${p.slug}`}
                name={p.name}
                price={p.priceLabel}
                tagline={p.tagline}
                image={p.image}
                showAddToCart={false}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/products" className="text-sm uppercase tracking-widest text-foreground/70 hover:text-primary border-b border-foreground/30 pb-0.5">
              View all sixteen →
            </Link>
          </div>
        </div>
      </section>

      {/* Press strip */}
      <section className="border-b border-foreground/20 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-foreground/60 mb-10 text-center">Press</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            {PRESS_QUOTES.map((q, i) => (
              <div key={i} className={`text-center px-6 ${i > 0 ? "md:border-l md:border-foreground/20" : ""}`}>
                <p className="text-xl font-heading text-primary leading-snug mb-3">&ldquo;{q.quote}&rdquo;</p>
                <p className="text-xs uppercase tracking-widest text-foreground/60">— {q.pub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent journal */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-foreground/60 mb-10">From the Journal</p>
          <div className="space-y-10 divide-y divide-foreground/20">
            {recentJournal.map((entry, i) => (
              <Link key={entry.slug} href={`/journal/${entry.slug}`} className={`block group ${i > 0 ? "pt-10" : ""}`}>
                <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">
                  {entry.publishedDate} · {entry.readingTime} · {entry.author}
                </p>
                <h3 className="text-2xl font-heading text-primary group-hover:opacity-70 transition-opacity mb-2">{entry.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{entry.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-right">
            <Link href="/journal" className="text-sm uppercase tracking-widest text-foreground/70 hover:text-primary border-b border-foreground/30 pb-0.5">
              More from the journal →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
