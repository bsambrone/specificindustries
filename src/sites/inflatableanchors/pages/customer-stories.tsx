import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { CustomerStoryGrid } from "@/components/ui/customer-story"
import { PromoBanner } from "@/components/ui/promo-banner"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "Customer Stories — Inflatable Anchors Marine",
  description: "Real stories from real customers who really bought inflatable anchors.",
}

const stories = [
  {
    name: "Hank Moorhouse",
    location: "Clearwater Marina, FL",
    image: "/sites/inflatableanchors/customer-marina.png",
    quote: "I've been running this marina for 22 years, and I've never had a product generate more conversations at the dock. People see the inflatable anchor and they have to ask about it. Then they have to try it. Then they have to buy one. It's the best-selling item in my shop, and I still can't tell you if it works. But it moves units, and in this economy, that's all I need.",
    rating: 5,
  },
  {
    name: "Jenny & Mark Keelson",
    location: "Lake Havasu, AZ",
    image: "/sites/inflatableanchors/customer-weekend.png",
    quote: "We used to dread the anchor part of every boat trip. Mark would strain to pull up the old steel one, I'd try to help, we'd argue about technique, and by the time it was on the boat we weren't speaking. Now? He pulls up the inflatable with one hand while holding a beer in the other. Our marriage has never been stronger. The boat drifts a little, but we drift together.",
    rating: 4,
  },
  {
    name: "Tammy Brackwater",
    location: "Scottsdale, AZ",
    image: "/sites/inflatableanchors/customer-pool.png",
    quote: "I don't even own a boat. I bought the Original for my pool because it looked fun, and honestly? Best pool toy I've ever owned. The kids love it. I tied it to the deep end ladder and they take turns 'deploying the anchor.' Is this what it was designed for? Absolutely not. Am I its happiest customer? Possibly.",
    rating: 5,
  },
  {
    name: "Dale Perchman",
    location: "Galveston, TX",
    image: "/sites/inflatableanchors/customer-fishing.png",
    quote: "I fish every Saturday. Used to use a mushroom anchor — heavy, ugly, scared the fish. Switched to the inflatable last spring and I'll tell you what: the fish aren't scared of it. They swim right up to it. Now, does my boat stay in one spot? Not exactly. But I cover more water this way, which means I see more fish, which I choose to interpret as an advantage.",
    rating: 4,
  },
]

export default async function CustomerStories() {
  const siteHref = await getSiteHref()
  return (
    <>
      <Hero
        dark
        headline="Customer Stories"
        subheadline="Real people. Real anchors. Real floating."
      />

      <WaveDivider variant="wave1" />

      <CustomerStoryGrid
        title="Hear From Our Customers"
        stories={stories}
      />

      <PromoBanner
        headline="Ready to write your own story?"
        ctaText="Shop Now"
        ctaHref={siteHref("/products")}
      />
    </>
  )
}
