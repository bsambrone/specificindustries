"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function MousetrapJengaCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
          Our Payment System Is Being Spring-Loaded
        </h1>
        <p className="text-foreground/70 mb-8">
          Unfortunately, our checkout infrastructure is still being assembled.
          Our engineers assure us it will be ready once they figure out how to process a credit card without losing a finger.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-8">
          Estimated completion: When our Director of Trap Safety finishes reading the liability waivers.
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
