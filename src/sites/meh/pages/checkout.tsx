"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function MehCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary mb-4 tracking-tight">
          One moment.
        </h1>
        <p className="text-foreground/70 leading-relaxed mb-8">
          Our checkout system is in the process of processing. The device you ordered is, at this moment, being gently packaged by someone who has handled this kind of thing before.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-foreground/50 text-sm mb-10 italic">
          Estimated completion: in due course.
        </p>
        <Link
          href={siteHref("/products")}
          className="inline-block px-10 py-3 border border-primary text-primary uppercase tracking-widest text-sm hover:bg-primary hover:text-background transition-colors"
        >
          Return to the Catalog
        </Link>
      </div>
    </section>
  )
}
