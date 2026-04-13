// src/sites/pettential/pages/checkout.tsx
"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function PettentialCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center bg-[#FAFAFA]">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-[#111] mb-4 font-heading">
          Checkout Paused for Performance Review
        </h1>
        <p className="text-[#111]/70 mb-8">
          Our Chief Optimization Officer, Barrett Sinclair, is reviewing your order against our performance benchmarks. He has been reviewing identical data for six years. He considers this thoroughness. We consider this Barrett.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-[#111]/50 text-sm mb-8">
          Estimated completion: When the dashboard shows something other than a flat line. (Estimated wait: indefinite.)
        </p>
        <Link
          href={siteHref("/shop")}
          className="inline-block px-8 py-3 bg-[#CCFF00] text-[#111] rounded-lg font-bold hover:bg-[#b8e600] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  )
}
