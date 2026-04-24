import Image from "next/image"
import Link from "next/link"
import { getFeaturedProducts } from "@/sites/unmotivators/data/products"
import { ProductCard } from "@/components/ui/product-card"
import { getSiteHref } from "@/lib/site-href"

export default async function UnmotivatorsHome() {
  const featured = getFeaturedProducts()
  const siteHref = await getSiteHref()

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-6 bg-[linear-gradient(180deg,#fff_0%,#f4f1e8_100%)] border-b border-foreground/10 shadow-[inset_0_-2px_8px_rgba(0,0,0,0.1)]" aria-hidden />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-4">
              Unmotivators Inc. — Est. eventually
            </p>
            <h1 className="text-5xl md:text-6xl font-heading font-bold uppercase tracking-tight text-foreground leading-tight mb-6">
              Motivation is a scam. We&apos;re here to help.
            </h1>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Unmotivators Inc. produces honest office decor for people who have stopped pretending. Posters, mugs, plaques, awards, and, for when you go home, decor that also will not lie to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={siteHref("/office")}
                className="inline-block px-6 py-3 bg-accent text-[#F5F3EE] font-heading font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
              >
                Shop the Office
              </Link>
              <Link
                href={siteHref("/home")}
                className="inline-block px-6 py-3 border border-foreground text-foreground font-heading font-semibold uppercase tracking-wide hover:bg-foreground hover:text-[#F5F3EE] transition-colors"
              >
                Shop for Home
              </Link>
            </div>
          </div>
          <div className="relative aspect-[5/6] bg-secondary/40 border border-foreground/10">
            <Image
              src="/sites/unmotivators/hero.png"
              alt="An empty gray cubicle photographed from behind an unoccupied office chair. A single unframed poster leans against the partition."
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-secondary/30 border-y border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground text-center mb-2">
            Currently Available
          </h2>
          <p className="text-center text-foreground/60 mb-10">
            A selection of the most popular items, per last quarter&apos;s data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                price={p.priceLabel}
                tagline={p.subtitle}
                image={p.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground mb-6">
            What We Believe
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Motivation was sold to you. It was branded. It was packaged. It was printed on heavy stock and hung above a water cooler, and it did not help you.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            At Unmotivators Inc., we believe that the most useful thing an object can do, on a wall, on a desk, or next to a sink, is tell the truth. We make those objects. We sell them at a price we can defend.
          </p>
          <Link
            href={siteHref("/manifesto")}
            className="inline-block px-6 py-3 bg-foreground text-[#F5F3EE] font-heading font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            Read the Manifesto
          </Link>
        </div>
      </section>
    </>
  )
}
