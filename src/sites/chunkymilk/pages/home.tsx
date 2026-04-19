import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/chunkymilk/data/products"
import { leaders } from "@/sites/chunkymilk/data/leadership"

const featuredSlugs = ["hollow-draw", "settled-hearth", "monumental-gather", "cottage-pour"]
const featured = featuredSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => !!p)

const cottagePour = products.find((p) => p.slug === "cottage-pour")!

export default function ChunkyMilkHome() {
  return (
    <>
      <Hero
        headline="Whitford Family Chunky Milk"
        subheadline="Six generations of chunks, straight from the hollow."
        ctaText="Browse The Cellar"
        ctaHref="/products"
        image="/sites/chunkymilk/hero.png"
      />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-2">This Season&apos;s Pours</h2>
          <p className="text-center text-foreground/60 mb-12">Drawn, rested, and bottled in the hollow.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                price={product.priceLabel}
                tagline={product.tagline}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cottage Pour callout — the brazen one */}
      <section className="py-16 px-4 bg-accent/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20">
            <Image src={cottagePour.image} alt={cottagePour.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-accent mb-3">Specialty Line</p>
            <h2 className="text-4xl font-heading font-bold text-primary mb-3">The Cottage Pour</h2>
            <p className="text-lg text-foreground/70 mb-4">{cottagePour.tagline}</p>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Our densest expression. Milk that has gathered itself into small white clusters, suspended in their own liquid.
              Passes through a wide-mouth cup. Traditionally taken with a spoon by those who prefer.
            </p>
            <Link
              href={`/products/${cottagePour.slug}`}
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              See The Cottage Pour
            </Link>
          </div>
        </div>
      </section>

      {/* Voice excerpt */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 -z-10">
          <Image src="/sites/chunkymilk/settlin-shed.png" alt="" fill className="object-cover brightness-50" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-3xl font-heading font-bold text-white leading-relaxed">
            The milk settles when it settles. We do not rush the chunks. We have not rushed them since 1867.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialGrid
        title="From Our Kinfolk"
        testimonials={[
          { quote: "I been drinkin' it since I was three months old and I got all but two of my teeth.", author: "Neighbor, North Hollow" },
          { quote: "Bill's Hollow Draw is the only pour I'll bring to supper.", author: "Minister's Wife" },
          { quote: "My grandmother kept a Settling Crock on the hearth until the day she went. I have it now.", author: "Third-Generation Chunker" },
          { quote: "Monumental Gather is what we poured for my daddy's funeral. He'd have approved.", author: "Widow, Creek Bottom" },
          { quote: "I don't know what 'cottage-style' means but Silas brought me a jar and I finished it.", author: "Visiting Cousin" },
          { quote: "The Patriarch Reserve arrived on a Tuesday. I have not spoken of it since.", author: "Reserve Recipient (2019)" },
        ]}
      />

      {/* Leadership preview */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">The Whitford Line</h2>
          <p className="text-center text-foreground/60 mb-12">Four who keep the hollow running.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {leaders.map((leader) => (
              <div key={leader.slug} className="text-center">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20 mb-3">
                  <Image src={leader.portraitImage} alt={leader.name} fill className="object-cover" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-sm">{leader.name}</h3>
                <p className="text-xs text-foreground/60">{leader.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/about" className="text-accent underline hover:text-primary transition-colors">
              Read their full story →
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Start Where Your People Started"
        description="Foundation Blend ships Petite and Artisan side-by-side. For those new to the family."
        ctaText="Order the Foundation Blend"
        ctaHref="/products/foundation-blend"
      />
    </>
  )
}
