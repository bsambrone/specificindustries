"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function InflatableAnchorsCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="text-6xl mb-8">&#9875;</div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Your Anchor Is Being Inflated
        </h1>
        <p className="text-foreground/70 mb-8">
          Captain Chuck is personally inflating your order using our patented EZ-Inflate™ hand pump.
          Each pump brings your anchor closer to deployment readiness. He is currently on pump 23 of 47.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-8">
          Estimated delivery: 3-5 business tides (weather permitting)
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}
