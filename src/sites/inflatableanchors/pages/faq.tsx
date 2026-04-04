import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import { PromoBanner } from "@/components/ui/promo-banner"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "FAQ — Inflatable Anchors Marine",
  description: "Frequently asked questions about our inflatable anchors.",
}

const aboutOurAnchors = [
  {
    question: "Wait — is the anchor inflatable, or is it for anchoring inflatables?",
    answer: "The anchor itself is inflatable. It is an anchor made of vinyl that you inflate with air. It is not a device for anchoring inflatable boats, pool toys, or parade floats. We get this question a lot. We have accepted it as our cross to bear.",
  },
  {
    question: "Does it actually anchor a boat?",
    answer: "That depends on your definition of 'anchor.' If you mean 'keeps a boat in a fixed position,' then results may vary. If you mean 'is shaped like an anchor and attached to a boat by a rope,' then absolutely. Every time.",
  },
  {
    question: "Why would I buy an anchor that floats?",
    answer: "Have you ever tried to pull up a 35-pound steel anchor? Have you felt your lower back scream as you haul wet chain over the gunwale? Our anchor weighs 4 ounces. You can pull it up with one hand while holding a sandwich in the other. That's why.",
  },
  {
    question: "Is this a joke?",
    answer: "We prefer the term 'lifestyle product.'",
  },
]

const inflationAndDeployment = [
  {
    question: "How long does it take to inflate?",
    answer: "47 pumps with our Deluxe Hand Pump, which takes approximately 2 minutes. If you're in a hurry, consider the EZ-Drop, which arrives pre-inflated. If you're in even more of a hurry, reconsider whether you need an anchor at all.",
  },
  {
    question: "What PSI should the anchor be?",
    answer: "Any amount of air is technically correct. Our official recommendation is 'inflated enough to look like an anchor.' Reef Henderson has published a 14-page whitepaper on optimal PSI that no one has read, including Reef Henderson.",
  },
  {
    question: "Can I use an electric pump?",
    answer: "Absolutely, though we should warn you: inflating the anchor is the most exciting part of the anchoring experience. Using an electric pump is like fast-forwarding through the opening credits. You can do it, but you're missing out.",
  },
  {
    question: "What happens if I over-inflate it?",
    answer: "You'll have a very firm, very round anchor that bears less resemblance to an anchor shape and more resemblance to an orange beach ball. Performance is unaffected, since performance was never really the point.",
  },
]

const durabilityAndMaintenance = [
  {
    question: "How long does it last?",
    answer: "Under ideal conditions (gentle handling, calm waters, no seagulls), our anchors last 1-3 seasons. Under real conditions (everything else), your mileage may vary. This is why we sell the Patch & Pray Repair Kit.",
  },
  {
    question: "Is it puncture-resistant?",
    answer: "It is puncture-resistant in the same way that all vinyl products are puncture-resistant: it resists punctures until it doesn't. For enhanced protection, avoid sharp rocks, coral, fish hooks, crab claws, and the Rapid Deflator.",
  },
  {
    question: "Can I leave it inflated between uses?",
    answer: "You can! Many customers leave their anchor inflated and hanging in the garage, where it serves as both marine equipment and a conversation piece. The EZ-Drop is designed to stay permanently inflated. Just don't leave it in direct sunlight for extended periods unless you enjoy the sound of small explosions.",
  },
  {
    question: "What's the warranty?",
    answer: "All anchors come with our 'Good Faith Guarantee,' which means we guarantee, in good faith, that you received an anchor. Beyond that, warranties get complicated. See our Terms of Service for details that won't make you feel better.",
  },
]

const ordersAndShipping = [
  {
    question: "How much does shipping cost?",
    answer: "Almost nothing. The anchor weighs 4 ounces. Shipping it costs less than shipping a letter. The EZ-Drop (pre-inflated) costs more because we're shipping what is essentially a large box of air. We are aware of the irony.",
  },
  {
    question: "Do you ship internationally?",
    answer: "We do. International customers should be aware that customs forms require us to declare the contents as 'inflatable marine equipment,' which has resulted in some interesting conversations at border crossings.",
  },
  {
    question: "What's your return policy?",
    answer: "All sales are final. Much like deploying an inflatable anchor in a strong current — once it's out there, it's out there. We accept exchanges for defective products, where 'defective' means 'won't inflate.' If it inflates but doesn't anchor, that's not a defect. That's the product.",
  },
  {
    question: "Can I buy in bulk?",
    answer: "Yes! We offer the Fleet Pack for individual customers and wholesale pricing for marinas, boat shows, and gag gift companies. Contact Skip Bayliner at our Contact page — he gets very excited about bulk orders.",
  },
]

export default async function InflatableAnchorsFAQ() {
  const siteHref = await getSiteHref()
  return (
    <>
      <Hero
        dark
        headline="Frequently Asked Questions"
        subheadline="Everything you wanted to know about inflatable anchors but were afraid to ask."
      />

      <WaveDivider variant="wave1" />

      {/* About Our Anchors */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent">About Our Anchors</h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={aboutOurAnchors} />
        </div>
      </section>

      {/* Inflation & Deployment */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent">Inflation &amp; Deployment</h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={inflationAndDeployment} />
        </div>
      </section>

      {/* Durability & Maintenance */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent">Durability &amp; Maintenance</h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={durabilityAndMaintenance} />
        </div>
      </section>

      {/* Orders & Shipping */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-accent">Orders &amp; Shipping</h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={ordersAndShipping} />
        </div>
      </section>

      <PromoBanner
        headline="Still have questions?"
        subtext="Our Director of Customer Amazement is standing by."
        ctaText="Contact Us"
        ctaHref={siteHref("/contact")}
      />
    </>
  )
}
