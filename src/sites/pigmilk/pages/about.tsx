import { Hero } from "@/components/ui/hero"
import { FeatureSection } from "@/components/ui/feature-section"

export const metadata = {
  title: "About Pig Milk Co.",
  description: "The story of how we started milking pigs.",
}

export default function PigMilkAbout() {
  return (
    <>
      <Hero
        headline="Our Story"
        subheadline="How one farmer's mistake became the world's most specific dairy product."
      />
      <FeatureSection
        title="Our Values"
        features={[
          {
            title: "Transparency",
            description: "We're completely honest about the fact that we milk pigs. We don't hide it.",
          },
          {
            title: "Sustainability",
            description: "Our pigs are sustainable. They just keep making more milk. We don't know why.",
          },
          {
            title: "Innovation",
            description: "We were the first. We might also be the last. But we were definitely the first.",
          },
        ]}
      />
    </>
  )
}
