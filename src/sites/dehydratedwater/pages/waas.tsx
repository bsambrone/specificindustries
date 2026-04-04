"use client"

import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { SplitSection } from "@/components/ui/split-section"
import { StatStrip } from "@/components/ui/stat-strip"
import { PricingTable } from "@/components/ui/pricing-table"
import { ComparisonTable } from "@/components/ui/comparison-table"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import { PromoBanner } from "@/components/ui/promo-banner"
import { useCart } from "@/components/commerce/cart-provider"

const tiers = [
  {
    name: "Apprentice",
    price: "$29.99",
    interval: "per month",
    features: [
      { text: "1 packet per month", included: true },
      { text: "Standard dehydration", included: true },
      { text: "Paper instructions", included: true },
      { text: "Cloud sync", included: false },
      { text: "Heritage wax seal", included: false },
    ],
  },
  {
    name: "Journeyman",
    price: "$49.99",
    interval: "per month",
    recommended: true,
    features: [
      { text: "3 packets per month", included: true },
      { text: "Premium dehydration", included: true },
      { text: "Wax-sealed instructions", included: true },
      { text: "Cloud sync", included: true },
      { text: "Heritage wax seal", included: false },
    ],
  },
  {
    name: "Master Dryer",
    price: "$99.99",
    interval: "per month",
    features: [
      { text: "7 packets per month", included: true },
      { text: "Artisanal dehydration", included: true },
      { text: "Hand-calligraphed instructions", included: true },
      { text: "Cloud sync", included: true },
      { text: "Heritage wax seal", included: true },
    ],
  },
]

const waasQuestions = [
  {
    question: "What is \"cloud sync\"?",
    answer:
      "Each packet is registered in our cloud database (a leather-bound ledger kept in the attic). Premium tiers receive a unique packet ID that can be verified by writing us a letter.",
  },
  {
    question: "What happens if I cancel?",
    answer:
      "Your packets stop arriving. Your existing packets continue to function (they are powder). Ezekiel V will send you a handwritten note expressing his disappointment.",
  },
  {
    question: "Is the heritage wax seal functional?",
    answer:
      "The seal serves no practical purpose. It does, however, make opening the packet 40% more difficult and 200% more dignified.",
  },
]

export default function WaaS() {
  const { addToCart, showToast } = useCart()

  const handleSelect = (tierName: string) => {
    addToCart("waas")
    showToast(`${tierName} plan added to cart. Welcome to the future of heritage hydration.`)
  }

  return (
    <>
      <Hero
        dark
        headline="Water-as-a-Service"
        subheadline="Heritage hydration, delivered monthly. Since 1847, now with subscription billing."
      />

      <WaveDivider variant="wave1" />

      {/* WaaS story narrative */}
      <SplitSection image="/sites/dehydratedwater/product-waas.png" imagePosition="right">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
          Heritage, Delivered Monthly
        </h2>
        <p className="text-foreground/70 mb-4 leading-relaxed">
          Since 1847, our family has crafted dehydrated water by hand. Now, through the modern
          miracle of subscription billing, you can receive it at your door each month. Choose the
          tier that matches your commitment to powdered hydration.
        </p>
        <p className="text-foreground/70 leading-relaxed">
          Every packet is sealed with care, catalogued in our cloud ledger, and dispatched with
          the same quiet pride that has defined the Drywell name for seven generations. Ezekiel
          would be confused by the billing software. But he would approve of the powder.
        </p>
      </SplitSection>

      <StatStrip
        stats={[
          { icon: "🏺", value: "Heritage-Crafted", label: "By hand since 1847" },
          { icon: "☁️", value: "Cloud-Synced", label: "Via leather-bound ledger" },
          { icon: "📞", value: "Cancel Anytime", label: "Ezekiel will call" },
        ]}
      />

      <section className="py-16 px-4">
        <PricingTable
          tiers={tiers}
          onSelect={handleSelect}
          footnote="All plans include complimentary existential contemplation about the nature of water."
        />
      </section>

      <ComparisonTable
        title="WaaS vs. Buying Individual Packets"
        columns={[
          { name: "WaaS Subscription", highlighted: true },
          { name: "Individual Packets" },
        ]}
        rows={[
          { label: "Cost per Packet", values: ["Lower", "Full price"] },
          { label: "Heritage Wax Seal", values: ["Journeyman+", "Not available"] },
          { label: "Cloud Sync", values: ["Journeyman+", "Not available"] },
          { label: "Ezekiel's Personal Attention", values: ["Master Dryer", "None"] },
          { label: "Cancellation Guilt", values: ["Significant", "None"] },
        ]}
      />

      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-8">
            Frequently Asked WaaS Questions
          </h2>
          <FaqAccordion items={waasQuestions} />
        </div>
      </section>

      <PromoBanner
        headline="Start your Apprenticeship today"
        ctaText="View Plans"
        ctaHref="#"
      />
    </>
  )
}
