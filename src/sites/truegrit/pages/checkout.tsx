"use client"

import Image from "next/image"
import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function TrueGritCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image src="/sites/truegrit/checkout-construction.png" alt="Construction worker with sandpaper" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          You&apos;re Braver Than Most
        </h1>
        <p className="text-foreground/70 mb-4">
          Our fulfillment team is preparing your order with the same care and precision we apply to our
          products. Which is to say: thoroughly, and with full awareness of what you&apos;re about to experience.
        </p>
        <p className="text-foreground/50 text-sm mb-8">
          Please verify that your health insurance is current and that your policy covers
          &quot;voluntary industrial abrasion.&quot; Most don&apos;t, but it never hurts to check.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-4">
          Estimated delivery: 3-5 business days (recovery time not included)
        </p>
        <p className="text-foreground/40 text-xs mb-8">
          * Double-check your shipping address. Our return policy is &quot;we understand,&quot;
          but we don&apos;t actually accept returns. The product has done nothing wrong.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Shopping (If You Dare)
        </Link>
      </div>
    </section>
  )
}
