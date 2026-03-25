import { Hero } from "@/components/ui/hero"
import { FeatureSection } from "@/components/ui/feature-section"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"

export default function PigMilkHome() {
  return (
    <>
      <Hero
        headline="Farm-Fresh Pig Milk"
        subheadline="Straight from the pig to your glass. Nature's most specific beverage."
        ctaText="View Products"
        ctaHref="/products"
      />
      <FeatureSection
        title="Why Pig Milk?"
        features={[
          {
            title: "100% Organic",
            description: "Our pigs roam free across rolling hills, eating only the finest organic slop.",
          },
          {
            title: "Rich in Nutrients",
            description: "Pig milk contains nutrients. We're not going to say which ones, but they're in there.",
          },
          {
            title: "Artisanal",
            description: "Each pig is milked by hand by our team of dedicated pig milking artisans.",
          },
        ]}
      />
      <TestimonialGrid
        title="What Our Customers Say"
        testimonials={[
          {
            quote: "I can't believe it's pig milk! Mainly because I still don't believe pig milk is a thing.",
            author: "Confused Customer",
          },
          {
            quote: "My doctor told me to stop drinking this immediately. 5 stars.",
            author: "Health-Conscious Consumer",
          },
          {
            quote: "I bought it as a joke but now I can't stop. Send help.",
            author: "Definitely Not Addicted",
          },
        ]}
      />
      <CTABanner
        headline="Ready to Try Pig Milk?"
        description="Join thousands of satisfied customers who have made the switch to pig milk."
        ctaText="Shop Now"
        ctaHref="/products"
      />
    </>
  )
}
