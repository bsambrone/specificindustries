"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

export default function PrivatrixCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="mb-8 text-6xl">π</div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Your Order Has Been Routed
        </h1>
        <p className="text-foreground/70 mb-8">
          Your order has been placed in the queue for review by our Procurement Compliance Working Group, which meets the second Thursday of each fiscal quarter. You will receive an order confirmation within 47 business days.
        </p>
        <p className="text-foreground/50 text-sm mb-8 italic">
          By proceeding, you acknowledge that no payment has been processed and no product will be shipped. The transaction is symbolic.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Browsing
        </Link>
      </div>
    </section>
  )
}
