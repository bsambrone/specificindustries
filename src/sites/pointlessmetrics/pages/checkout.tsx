"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function PointlessMetricsCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <div className="inline-block border-2 border-primary/30 rounded-full p-8 mb-4">
            <span className="font-heading text-4xl text-primary">Σ</span>
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Checkout</p>
        <h1 className="font-heading text-4xl text-primary mb-4">
          Processing Your Order
        </h1>
        <p className="text-foreground/70 mb-6">
          The Institute&apos;s payment infrastructure is currently undergoing its quarterly peer review.
          Estimated completion: pending committee consensus, which historically takes between four and eleven months.
        </p>
        <div className="mb-6">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-4">
          Your order has been received, acknowledged, and filed. A confirmation will be sent once the Institute&apos;s
          administrative review board approves the transaction, which requires a quorum of three.
        </p>
        <p className="text-foreground/40 text-xs mb-8 italic">
          Note: The Institute currently has four members. Quorum has historically been difficult to achieve before 11:30 AM.
        </p>
        <Link
          href={siteHref("/shop")}
          className="inline-block px-8 py-3 bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Return to the Shop
        </Link>
      </div>
    </section>
  )
}
