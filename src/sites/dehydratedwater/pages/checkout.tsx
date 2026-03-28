"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function DehydratedWaterCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="text-6xl mb-8">💧</div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Our Artisans Are Hand-Dehydrating Your Order
        </h1>
        <p className="text-foreground/70 mb-8">
          Each packet is individually dehydrated by a member of the Drywell family using techniques
          unchanged since 1847. This process cannot be rushed. The water must be convinced to leave voluntarily.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-8">
          Estimated delivery: When the water is ready (est. 6-8 generations)
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to the Collection
        </Link>
      </div>
    </section>
  )
}
