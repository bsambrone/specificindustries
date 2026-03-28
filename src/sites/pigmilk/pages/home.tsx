import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/pigmilk/data/products"

const featuredSlugs = ["classic-pig-milk", "chocolate-pig-milk", "pig-milk-cheese", "whole-hog-bundle"]
const featured = products.filter((p) => featuredSlugs.includes(p.slug))

export default function PigMilkHome() {
  return (
    <>
      <Hero
        headline="Farm-Fresh Pig Milk"
        subheadline="Straight from the pig to your glass. Nature's most specific beverage."
        ctaText="Shop Now"
        ctaHref="/products"
        image="/sites/pigmilk/hero.png"
      />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Best Sellers</h2>
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

      {/* As Seen On */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-foreground/40 text-sm uppercase tracking-widest mb-8">As featured in publications we made up</p>
          <Image
            src="/sites/pigmilk/press-logos.png"
            alt="Press logos"
            width={1200}
            height={200}
            className="w-full h-auto opacity-70"
          />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialGrid
        title="What Our Customers Say"
        testimonials={[
          { quote: "I can't believe it's pig milk! Mainly because I still don't believe pig milk is a thing.", author: "Confused Customer" },
          { quote: "My doctor told me to stop drinking this immediately. 5 stars.", author: "Health-Conscious Consumer" },
          { quote: "I bought it as a joke but now I can't stop. Send help.", author: "Definitely Not Addicted" },
          { quote: "I switched from oat milk and my barista cried.", author: "Former Oat Milk Drinker" },
          { quote: "The cheese pairs beautifully with regret.", author: "Amateur Sommelier" },
          { quote: "My pigs are jealous that I'm drinking other pigs' milk.", author: "Pig Owner" },
        ]}
      />

      {/* Lifestyle */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 -z-10">
          <Image src="/sites/pigmilk/lifestyle.png" alt="" fill className="object-cover brightness-50" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-3xl font-heading font-bold text-white leading-relaxed">
            Pig Milk: It&apos;s Not Just a Beverage. It&apos;s a Lifestyle Choice You&apos;ll Have to Explain to Everyone.
          </p>
        </div>
      </section>

      <CTABanner
        headline="Ready to Try Pig Milk?"
        description="Join thousands of satisfied customers who have made the switch to pig milk."
        ctaText="Shop Now"
        ctaHref="/products"
      />
    </>
  )
}
