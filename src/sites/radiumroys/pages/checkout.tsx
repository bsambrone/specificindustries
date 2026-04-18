"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function RadiumRoysCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-4">
          Our Checkout System Is Being Modernized
        </h1>
        <p className="text-foreground/80 mb-8">
          Roy&apos;s office regrets the inconvenience. Our payment processing has been on backorder since
          1979, and our IT department (one man, also named Roy, no relation) is working as quickly as he can.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/60 text-sm mb-8">
          Estimated completion: when Harlan C. Veenstra signs off on the merchant agreement, which has
          been on his desk since 1981.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-secondary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to the Catalog
        </Link>
      </div>
    </section>
  )
}
