import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/radiumroys/data/products"
import { getSiteHref } from "@/lib/site-href"

const featuredSlugs = [
  "tan-o-matic-9000",
  "asbesto-crisps",
  "sunshine-glow-radium-wristwatch",
  "junior-glow-pop-cigarettes",
]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default async function RadiumRoysHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <Hero
        headline="Better Living Through American Ingenuity"
        subheadline="Wholesome consumer goods for the modern family, from our laboratories to your home since 1952."
        ctaText="Shop the Catalog"
        ctaHref="/products"
        secondaryCtaText="Our Quality Pledge"
        secondaryCtaHref="/standards"
        image="/sites/radiumroys/hero.png"
        dark
      />

      {/* A Word From Roy */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-widest text-secondary">A Word From Roy</p>
          <h2 className="text-3xl md:text-4xl font-heading text-foreground leading-snug">
            &ldquo;Welcome, friend, to the future of American living.&rdquo;
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            For seventy-four years, Radium Roy&apos;s has stood for the simple American belief that the
            modern family deserves more — more flavor, more brightness, more glow. From the moment you bring
            home your first jar of Granny&apos;s Aflatoxin-Aged Peanut Butter to the day you install your
            very own Radon Cellar Concentrator, you&apos;ll feel the Radium Roy&apos;s difference.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            I stand behind every product that bears my name. Always have. Always will.
          </p>
          <p className="font-heading text-2xl text-secondary mt-4">— Roy</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-secondary mb-12">
            This Season&apos;s Highlights
          </h2>
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
          <div className="text-center mt-10">
            <Link
              href={siteHref("/products")}
              className="text-secondary font-semibold hover:underline"
            >
              See the full catalog &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Why Radium Roy's */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-secondary mb-12">
            Why Choose Radium Roy&apos;s?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-5xl">★</div>
              <h3 className="text-xl font-heading text-foreground">American-Made</h3>
              <p className="text-foreground/70">
                Every Radium Roy&apos;s product is designed, assembled, and inspected in our Burbank
                facility. American materials. American labor. American optimism.
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl">♥</div>
              <h3 className="text-xl font-heading text-foreground">Family-Tested</h3>
              <p className="text-foreground/70">
                Roy and his family have personally used every product in our catalog for at least one full
                generation before approving it for the public.
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-5xl">☢</div>
              <h3 className="text-xl font-heading text-foreground">Glows in the Dark</h3>
              <p className="text-foreground/70">
                A surprising number of our products glow in the dark. We consider this a value-add and pass
                the savings on to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards stripe */}
      <section className="py-12 px-4 bg-primary/15 border-y-4 border-primary">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-secondary mb-3">Our Quality Pledge</p>
          <p className="text-foreground text-xl md:text-2xl font-heading leading-snug mb-4">
            Every product we sell exceeds California&apos;s Proposition 65 thresholds — by design.
          </p>
          <Link
            href={siteHref("/standards")}
            className="inline-block px-6 py-3 bg-secondary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Read the Roy Method &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
