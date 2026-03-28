import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { StatStrip } from "@/components/ui/stat-strip"
import { FeaturedProductSpotlight } from "@/components/ui/featured-product-spotlight"
import { SplitSection } from "@/components/ui/split-section"
import { ProductCarousel } from "@/components/ui/product-carousel"
import { ProductCard } from "@/components/ui/product-card"
import { ComparisonTable } from "@/components/ui/comparison-table"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { PromoBanner } from "@/components/ui/promo-banner"
import { products } from "@/sites/dehydratedwater/data/products"
import Link from "next/link"

const cloudMist = products.find((p) => p.slug === "cloud-mist")!

export default function DehydratedWaterHome() {
  return (
    <>
      <Hero
        dark
        headline="Water, Perfected Through Absence"
        subheadline="For nearly two centuries, we have pursued a singular vision: liberating water from the burden of its own wetness. Est. 1847."
        ctaText="Shop the Collection"
        ctaHref="/products"
        secondaryCtaText="Our Story"
        secondaryCtaHref="/our-story"
      />

      <WaveDivider variant="wave1" />

      <AnimatedCounter
        end={4217832}
        label="gallons liberated from wetness since 1847"
        suffix=" gallons"
      />

      <StatStrip
        stats={[
          { icon: "💧", value: "0% Moisture", label: "Guaranteed dry" },
          { icon: "🏺", value: "7 Generations", label: "Family-crafted" },
          { icon: "⚖️", value: "97% Lighter", label: "Than liquid water" },
        ]}
      />

      <FeaturedProductSpotlight
        image={cloudMist.image}
        eyebrow="New for 2026"
        title={cloudMist.name}
        description={cloudMist.tagline + " " + cloudMist.description[0]}
        ctaText="Shop Cloud Mist"
        ctaHref="/products/cloud-mist"
        imagePosition="right"
      />

      <SplitSection
        image="/sites/dehydratedwater/science-dehydration.png"
        imagePosition="left"
        dark
      >
        <h2 className="text-3xl font-heading font-bold text-white mb-4">The Drywell Method™</h2>
        <p className="text-white/80 mb-6 leading-relaxed">
          A seven-step process perfected over 179 years. Each step is essential. None of them do
          anything. Our patented process removes the water from the water, leaving behind a fine
          heritage-grade powder that contains the complete essence of hydration.
        </p>
        <Link
          href="/the-science"
          className="inline-block px-8 py-3 border border-white/50 text-white font-heading text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
        >
          Explore the Science
        </Link>
      </SplitSection>

      <ProductCarousel title="The Collection">
        {products.map((product) => (
          <div key={product.slug} className="min-w-[260px] sm:min-w-[280px] shrink-0">
            <ProductCard
              slug={product.slug}
              name={product.name}
              price={product.priceLabel}
              tagline={product.tagline}
              image={product.image}
            />
          </div>
        ))}
      </ProductCarousel>

      <ComparisonTable
        title="How We Stack Up"
        columns={[
          { name: "Dehydrated Water", highlighted: true },
          { name: "Tap Water" },
          { name: "Bottled Water" },
        ]}
        rows={[
          { label: "Weight", values: ["0g", "1kg/L", "500g"] },
          { label: "Wetness", values: ["0%", "100%", "100%"] },
          { label: "Shelf Life", values: ["Eternal", "Until pipes freeze", "Until plastic dissolves"] },
          { label: "Spillage Risk", values: ["None", "Moderate", "Guaranteed"] },
          { label: "Existential Doubt", values: ["Included", "None", "Mild"] },
          { label: "Portability", values: ["Fits in pocket", "Requires plumbing", "Requires arms"] },
        ]}
        footnote="Data collected by the Drywell Institute of Theoretical Hydrology. Sample size: 1."
      />

      <TestimonialGrid
        title="What Our Patrons Say"
        testimonials={[
          { quote: "I've never felt more hydrated by something so profoundly dry.", author: "Dr. Helena Moisture, Theoretical Hydrologist" },
          { quote: "Changed my relationship with water. I no longer need it in liquid form.", author: "Reginald Dustworth, Competitive Dehydration Athlete" },
          { quote: "The Cloud Mist Nor'easter made me weep. Or maybe that was the salt.", author: "Baroness Evelyn Sipsworth, Water Critic" },
          { quote: "I switched from regular water and haven't looked back. Mostly because I'm too dehydrated to turn my head.", author: "Anonymous Subscriber" },
          { quote: "Five stars. Would add water again.", author: "Thirsty in Vermont" },
          { quote: "My sourdough starter is jealous of my water starter.", author: "Portland Resident #4,217" },
        ]}
      />

      <PromoBanner
        headline="Subscribe & Save — WaaS from $29.99/mo"
        subtext="*All plans include complimentary existential contemplation about the nature of water."
        ctaText="Explore WaaS"
        ctaHref="/waas"
      />

      <WaveDivider variant="wave2" flip />
    </>
  )
}
