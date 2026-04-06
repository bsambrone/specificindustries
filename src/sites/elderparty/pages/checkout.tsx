"use client"

import Image from "next/image"
import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function ElderPartyCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image src="/sites/elderparty/checkout-construction.png" alt="Order processing in progress" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          The Awakening Has Begun
        </h1>
        <p className="text-foreground/70 mb-4">
          Your order is being processed by our fulfillment team, who are preparing your items
          with the care and precision befitting items of this significance. They are working
          from a location we have elected not to disclose.
        </p>
        <p className="text-foreground/50 text-sm mb-8">
          Please verify that your shipping address exists in the correct dimensional plane.
          Deliveries to recently shifted addresses may experience delays of an indeterminate nature.
          The Party appreciates your patience during the transition.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-4">
          Estimated delivery: 3–5 business days (dimensional variance not included)
        </p>
        <p className="text-foreground/40 text-xs mb-8">
          * Please double-check your shipping address. Our return policy is &quot;we understand,&quot;
          but we do not actually process returns. The items have been consecrated to your name specifically.
        </p>
        <Link
          href={siteHref("/shop")}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}
