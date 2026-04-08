"use client"

import Image from "next/image"
import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function SnortablesCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image src="/sites/snortables/checkout-construction.png" alt="Under construction" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Our Payment System Is Being Pulverized
        </h1>
        <p className="text-foreground/70 mb-8">
          Unfortunately, our checkout infrastructure is still being processed through the NasalMill™.
          Our engineers assure us it will be ready once they figure out how to snort a credit card transaction.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-8">
          Estimated completion: When our Director of Regulatory Avoidance finishes reading the mail.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to Products
        </Link>
      </div>
    </section>
  )
}
