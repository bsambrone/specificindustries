"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function SuperEngineeredCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-24 px-4 text-center bg-background">
      <div className="max-w-xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
          Checkout
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-light tracking-tight text-primary mb-4">
          Provisioning your fleet.
        </h1>
        <p className="text-primary/70 mb-10 leading-relaxed">
          Your order has entered the activation mesh. Hardware is being paired with a regional Cloud+ cluster.
          Expected provisioning window: <span className="font-medium">18–22 minutes</span>.
        </p>
        <div className="mb-10">
          <FakeProgressBar />
        </div>
        <p className="text-xs text-primary/50 mb-10">
          Please do not close this tab. Do not disturb your devices during activation.
          A Super Engineered Trust Architect has been notified.
        </p>
        <Link
          href={siteHref("/shop")}
          className="inline-block px-8 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
        >
          Return to Shop
        </Link>
      </div>
    </section>
  )
}
