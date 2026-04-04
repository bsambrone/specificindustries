import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { StatStrip } from "@/components/ui/stat-strip"
import { FeaturedProductSpotlight } from "@/components/ui/featured-product-spotlight"
import { ProductCarousel } from "@/components/ui/product-carousel"
import { ProductCard } from "@/components/ui/product-card"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { products } from "@/sites/inflatableanchors/data/products"
import { getSiteHref } from "@/lib/site-href"

const original = products.find((p) => p.slug === "original")!

const testimonials = [
  { quote: "I've never pulled up an anchor so easily. I've also never had my boat drift into a sandbar, but you win some, you lose some.", author: "Captain Dave, Clearwater Marina" },
  { quote: "My back hasn't felt this good since I switched to inflatable. My boat hasn't stayed in one place since either, but my chiropractor is thrilled.", author: "Margie P., Lake Havasu" },
  { quote: "I bought it as a joke for my husband. He uses it every weekend now. I'm not sure what that says about us.", author: "Linda T., Chesapeake Bay" },
  { quote: "The other guys at the marina laughed at first. Then they saw how easy it was to pull up. Now they're still laughing, but they also bought one.", author: "Big Tony, Galveston" },
  { quote: "I use mine in my kayak. Does it anchor the kayak? No. But do I feel like I have an anchor? Also no. But it was $19.99.", author: "Derek S., Portland" },
  { quote: "Five stars. Would not anchor again.", author: "Anonymous Verified Purchaser" },
]

export default async function InflatableAnchorsHome() {
  const siteHref = await getSiteHref()
  return (
    <>
      <Hero
        dark
        headline="The Easiest Anchor You'll Ever Pull Up"
        subheadline="Yes, the anchor is inflatable. No, this isn't about anchoring your inflatable."
        image="/sites/inflatableanchors/hero.png"
        ctaText="Shop Now"
        ctaHref={siteHref("/products")}
        secondaryCtaText="See How It Works"
        secondaryCtaHref={siteHref("/the-technology")}
      />

      <WaveDivider variant="wave1" />

      <StatStrip
        stats={[
          { icon: "⚓", value: "4 oz", label: "Average Weight" },
          { icon: "💨", value: "Under 2 Min", label: "To Inflate" },
          { icon: "🌊", value: "100%", label: "Floats" },
        ]}
      />

      <FeaturedProductSpotlight
        image={original.image}
        eyebrow="Our Flagship"
        title={original.name}
        description={original.tagline + " " + original.description[0]}
        ctaText="View Product"
        ctaHref={siteHref("/products/original")}
        imagePosition="right"
      />

      <ProductCarousel title="The Full Lineup">
        {products.map((p) => (
          <div key={p.slug} className="w-[260px] sm:w-[280px] shrink-0">
            <ProductCard slug={p.slug} name={p.name} price={p.priceLabel} tagline={p.tagline} image={p.image} />
          </div>
        ))}
      </ProductCarousel>

      {/* "As Seen Floating Near" press section */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-foreground/50 uppercase tracking-widest mb-6">
            As Seen Floating Near
          </p>
          <Image
            src="/sites/inflatableanchors/press-logos.png"
            alt="Featured at Marina Monthly, Boat Show Weekly, Anchoring Today, The Dockside Gazette, National Boating Expo"
            width={1200}
            height={200}
            className="w-full h-auto opacity-70"
          />
        </div>
      </section>

      <TestimonialGrid
        title="What Our Customers Are Saying"
        testimonials={testimonials}
      />

      <CTABanner
        headline="Ready to upgrade your anchoring experience?"
        description="Join thousands of boaters who've discovered the freedom of inflatable anchoring."
        ctaText="Shop All Products"
        ctaHref={siteHref("/products")}
      />
    </>
  )
}
