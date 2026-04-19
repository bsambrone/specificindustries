import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "../data/products"
import { testimonials } from "../data/testimonials"
import { StampBadge } from "../components/stamp-badge"
import { getSiteHref } from "@/lib/site-href"

const featured = products.filter((p) => p.isFeatured)

export default async function TerrorClownHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <Hero
        headline="Where every child finds a friend."
        subheadline="The monster under your bed is real. And fun. And has razor-sharp teeth. Makers of Terror Clown™ since 1948."
        image="/sites/terrorclown/hero.png"
        ctaText="Shop Terror Clown™"
        ctaHref="/products"
        secondaryCtaText="Our story"
        secondaryCtaHref="/about"
      />

      {/* Stamp badges row */}
      <section className="py-10 px-4" style={{ background: "var(--color-background, #F5EDE0)" }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-6 justify-center items-center">
          <StampBadge rotate={-4}>As seen in Life Magazine</StampBadge>
          <StampBadge rotate={2} variant="primary">Toy of the Year 1957</StampBadge>
          <StampBadge rotate={-2}>Mother-Approved</StampBadge>
          <StampBadge rotate={3} variant="primary">100% Inanimate</StampBadge>
          <StampBadge rotate={-3}>Family-Owned Since 1948</StampBadge>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: "var(--color-secondary, #3E6C6E)" }}
            >
              From the catalog
            </div>
            <h2 className="text-4xl font-heading font-semibold mb-3" style={{ color: "var(--color-text, #1F1A17)" }}>
              Heirloom-quality companions.
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.7 }}>
              Hand-finished in Millbrook, Ohio. Built to last three generations, and in many cases considerably longer.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                price={p.priceLabel}
                tagline={p.tagline}
                image={p.image}
                href={`/products/${p.slug}`}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={siteHref("/products")}
              className="inline-block px-8 py-3 border-2 font-semibold hover:bg-primary hover:text-white transition-colors"
              style={{ color: "var(--color-primary, #A8352A)", borderColor: "var(--color-primary, #A8352A)" }}
            >
              Browse the full catalog &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Pullquote / headline banner */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: "var(--color-primary, #A8352A)", color: "#F5EDE0" }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-3xl md:text-4xl font-heading italic leading-tight mb-4">
            &ldquo;Scare the fear right out of your friends.&rdquo;
          </p>
          <p className="text-sm uppercase tracking-[0.3em] opacity-80">
            They&apos;ll appreciate THIS clown. Or else.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: "var(--color-secondary, #3E6C6E)" }}
            >
              Letters from our customers
            </div>
            <h2 className="text-3xl font-heading font-semibold" style={{ color: "var(--color-text, #1F1A17)" }}>
              Four generations of American childhoods.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((t, i) => (
              <blockquote
                key={i}
                className="p-6 border-l-4"
                style={{ borderColor: "var(--color-secondary, #3E6C6E)", background: "#FFFFFF80" }}
              >
                <p className="italic text-lg mb-3" style={{ color: "var(--color-text, #1F1A17)" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="text-sm" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.7 }}>
                  &mdash; {t.attribution}, {t.city}, {t.year}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / reassurance */}
      <section className="py-20 px-4 text-center" style={{ background: "var(--color-background, #F5EDE0)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold mb-4" style={{ color: "var(--color-text, #1F1A17)" }}>
            A lifelong companion for the brave child.
          </h2>
          <p className="mb-8 text-lg" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.75 }}>
            Terror Clown™ is completely inanimate. Usually. Begin the companionship today.
          </p>
          <Link
            href={siteHref("/products/terror-clown")}
            className="inline-block px-10 py-4 font-semibold text-white"
            style={{ background: "var(--color-primary, #A8352A)" }}
          >
            Order Terror Clown™ &mdash; $199
          </Link>
        </div>
      </section>
    </>
  )
}
