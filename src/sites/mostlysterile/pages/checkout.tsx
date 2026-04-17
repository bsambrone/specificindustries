"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function MostlysterileCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-4">
          Our Checkout System Is Under Review
        </h1>
        <p className="text-foreground/80 mb-8">
          Our payment processing partner is finalizing their recertification, a process they have been finalizing since 2023. We apologize for any inconvenience and appreciate your continued patience.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/60 text-sm mb-8">
          Estimated completion: upon the recertification partner&rsquo;s return of their outstanding paperwork. Paperwork has been outstanding for approximately eighteen months.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Return to the Catalog
        </Link>
      </div>
    </section>
  )
}
