"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function BonelessWaterCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-[#0c4a6e] mb-4">
          Checkout System Pending Recertification
        </h1>
        <p className="text-[#0f172a]/70 mb-8">
          Our payment processing infrastructure is currently undergoing its scheduled quarterly BoneScan&trade; recertification audit. We expect the system to come back online once Director of Compliance Vincent Dunn signs off on the latest batch of regulatory binders.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-[#0f172a]/50 text-sm mb-8">
          Estimated completion: When the binder is signed.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-8 py-3 bg-[#0c4a6e] text-white rounded font-semibold hover:bg-[#075985] transition-colors"
        >
          Return to Products
        </Link>
      </div>
    </section>
  )
}
