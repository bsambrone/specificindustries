"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

export default function TheTheoryIsRealCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="mb-8 text-6xl">📦</div>
        <h1 className="text-4xl font-heading font-bold text-primary mb-4">
          Secure Transmission
        </h1>
        <p className="mb-8" style={{ color: "var(--color-muted, #7a8c7a)" }}>
          Your order has been logged and routed for dispatch. A fulfillment specialist will prepare your items
          for transit. Expected window: 5 to 9 business days, depending on conditions we cannot control or discuss.
        </p>
        <p className="text-sm mb-8 italic" style={{ color: "var(--color-muted, #7a8c7a)" }}>
          This is a shipment. We do not process your information for any purpose you would not approve of.
          You will receive unmarked packaging.
        </p>
        <Link
          href={siteHref("/shop")}
          className="inline-block px-8 py-3 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: "var(--color-primary, #4a9c6d)" }}
        >
          Return to outfitter
        </Link>
      </div>
    </section>
  )
}
