"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

export default function PrechewedCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="mb-8 text-6xl">🫙</div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Order Entered Intake Queue
        </h1>
        <p className="mb-8" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          Your order has been routed to the Prechewed™ fulfillment intake queue. A fulfillment specialist will dispatch your pouches within 47 jaw-hours, pending bolus availability and pouch rack clearance.
        </p>
        <p className="text-sm mb-8 italic" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          No payment has been processed and no product will ship. This transaction is pre-oral and symbolic in nature.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: "var(--color-primary, #5B3FD9)" }}
        >
          Back to Pouches
        </Link>
      </div>
    </section>
  )
}
