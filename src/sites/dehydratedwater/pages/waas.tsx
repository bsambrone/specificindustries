"use client"

import { Hero } from "@/components/ui/hero"
import { PricingTable } from "@/components/ui/pricing-table"
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

export default function WaaS() {
  const { addToCart, showToast } = useCart()

  const handleSelect = (tierName: string) => {
    addToCart("waas")
    showToast(`${tierName} plan added to cart. Welcome to the future of heritage hydration.`)
  }

  return (
    <>
      <Hero
        headline="Water-as-a-Service"
        subheadline="Heritage hydration, delivered monthly. Since 1847, now with subscription billing."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-foreground/70 leading-relaxed">
            Since 1847, our family has crafted dehydrated water by hand. Now, through the modern miracle
            of subscription billing, you can receive it at your door each month. Choose the tier that
            matches your commitment to powdered hydration.
          </p>
        </div>

        <PricingTable
          tiers={tiers}
          onSelect={handleSelect}
          footnote="All plans include complimentary existential contemplation about the nature of water."
        />
      </section>

      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-heading font-bold text-primary">Frequently Asked WaaS Questions</h2>
          <div className="text-foreground/70 text-sm space-y-4">
            <p>
              <strong className="text-foreground">What is &ldquo;cloud sync&rdquo;?</strong><br />
              Each packet is registered in our cloud database (a leather-bound ledger kept in the attic).
              Premium tiers receive a unique packet ID that can be verified by writing us a letter.
            </p>
            <p>
              <strong className="text-foreground">What happens if I cancel?</strong><br />
              Your packets stop arriving. Your existing packets continue to function (they are powder).
              Ezekiel V will send you a handwritten note expressing his disappointment.
            </p>
            <p>
              <strong className="text-foreground">Is the heritage wax seal functional?</strong><br />
              The seal serves no practical purpose. It does, however, make opening the packet 40% more difficult
              and 200% more dignified.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
