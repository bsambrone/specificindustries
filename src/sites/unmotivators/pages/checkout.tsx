"use client"

import { useState } from "react"
import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

export default function UnmotivatorsCheckout() {
  const siteHref = useSiteLink()
  const [orderNumber] = useState(() => Math.floor(Math.random() * 900000) + 100000)

  return (
    <section className="py-20 px-4">
      <div className="max-w-lg mx-auto bg-background border border-foreground p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Order Confirmation #UNM-{orderNumber}
        </p>
        <h1 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground mb-6 leading-tight">
          Your order has been processed.
        </h1>
        <p className="text-foreground/80 leading-relaxed mb-4">
          An order confirmation was not sent, because we do not have your email address, because there is no form on this page. This is a design decision.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Fulfillment estimates vary. The posters will ship when the frames are available. The mugs will ship when the kiln has cooled. The awards will ship when we have finished engraving, which we may have already done, depending.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-8">
          Good luck.
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-8">
          — The Management
        </p>
        <Link
          href={siteHref("/office")}
          className="inline-block px-6 py-3 border border-foreground text-foreground font-heading uppercase tracking-wide hover:bg-foreground hover:text-[#F5F3EE] transition-colors"
        >
          Return to the Catalog
        </Link>
      </div>
    </section>
  )
}
