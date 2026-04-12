"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function OddOccasionsCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center bg-[#FFFDF8]">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-[#2D2D2D] mb-4 font-heading">
          Checkout Paused for Curation Review
        </h1>
        <p className="text-[#2D2D2D]/70 mb-8">
          Our Head of Curation, Theodore Lundy, is personally reviewing the tissue paper inventory to ensure your box meets our 18gsm standard. He has been in the stockroom since Tuesday. We expect him back when he&apos;s satisfied, which is historically unpredictable.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-[#2D2D2D]/50 text-sm mb-8">
          Estimated completion: When the tissue paper situation is resolved.
        </p>
        <Link
          href={siteHref("/shop")}
          className="inline-block px-8 py-3 bg-[#7C9A82] text-white rounded-lg font-semibold hover:bg-[#6B8972] transition-colors"
        >
          Continue Browsing Occasions
        </Link>
      </div>
    </section>
  )
}
