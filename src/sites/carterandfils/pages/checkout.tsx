"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function CarterAndFilsCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-heading font-semibold text-foreground mb-4">
          A Brief Formality
        </h1>
        <p className="text-foreground/70 leading-relaxed mb-8">
          Our Cellar Master is, at this moment, personally preparing your bottles for dispatch. The estate&apos;s checkout system, constructed with deliberate care, is still in its final stages of development. We ask for your patience.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-10 italic">
          Estimated completion: following the 2029 harvest.
        </p>
        <Link
          href={siteHref("/cellar")}
          className="inline-block px-10 py-3 bg-primary text-secondary tracking-widest uppercase text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Return to the Cellar
        </Link>
      </div>
    </section>
  )
}
