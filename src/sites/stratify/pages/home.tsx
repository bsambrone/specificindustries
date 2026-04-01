"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"
import { StrataDiagram } from "@/components/ui/strata-diagram"
import { StatStrip } from "@/components/ui/stat-strip"
import { tiers } from "@/sites/stratify/data/tiers"
import { testimonials } from "@/sites/stratify/data/testimonials"

export default function StratifyHome() {
  const siteHref = useSiteLink()

  return (
    <div>
      {/* Hero */}
      <Hero
        headline="Stop Working IN the Economy. Start Owning Your LAYER of It."
        subheadline="Stratify empowers individuals to ascend through strategic stratification. The only question is: which layer will you claim?"
        ctaText="Enter the First Layer"
        ctaHref={siteHref("/onboarding/step-1")}
        secondaryCtaText="See the Opportunity"
        secondaryCtaHref={siteHref("/opportunity")}
        dark
      />

      {/* Tagline Strip */}
      <section className="py-4 bg-secondary text-primary text-center">
        <p className="text-lg md:text-xl font-heading font-bold tracking-wide">
          Stratified Commerce And Marketing
        </p>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Stratified Growth Architecture&trade;
          </h2>
          <p className="text-foreground/80 mb-12 max-w-2xl mx-auto">
            Our proprietary architecture distributes value across interconnected layers.
            Each layer supports and amplifies the layers beneath it.
          </p>
          <StrataDiagram
            layers={[
              { label: "Layer 4: Apex Executive Node", sublabel: "Pure yield" },
              { label: "Layer 3: Orchestrator", sublabel: "Multi-layer management" },
              { label: "Layer 2: Amplifier", sublabel: "Yield amplification" },
              { label: "Layer 1: Participant", sublabel: "Value distribution" },
              { label: "Layer 0: Observer", sublabel: "You are here" },
            ]}
            caption="Each layer supports and amplifies the layers beneath it."
          />
        </div>
      </section>

      {/* How It Works — 3 Steps */}
      <section className="py-16 px-4 bg-secondary/15">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
            Three Steps to Stratified Wealth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Join",
                desc: "Enter the architecture at Layer 1 with the Entry-Level Monetization Bundle. Your elevation begins immediately.",
              },
              {
                step: "02",
                title: "Distribute",
                desc: "Facilitate Value Distribution Events across your network. Every transaction amplifies your layer\u2019s yield.",
              },
              {
                step: "03",
                title: "Elevate",
                desc: "Expand your Subordinate Revenue Layers and ascend through the tiers. Your yield grows with each layer beneath you.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-5xl font-heading font-bold text-secondary/50 mb-2">{item.step}</div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier Overview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Choose Your Layer
          </h2>
          <p className="text-foreground/80 mb-12">
            Theoretical yield ranges based on optimal layer density conditions.*
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.layer}
                className="border border-primary/15 rounded-lg p-4 text-center"
              >
                <div className="text-xs text-foreground/60 font-heading uppercase tracking-wider">
                  Layer {tier.layer}
                </div>
                <div className="text-lg font-heading font-bold text-secondary mt-1">{tier.name}</div>
                <div className="text-sm text-foreground/80 mt-2">{tier.tagline}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-foreground/50 mt-6">
            *Yield projections based on optimal layer density conditions. Individual results depend on subordinate layer activity.
          </p>
          <Link
            href={siteHref("/tiers")}
            className="inline-block mt-6 px-8 py-3 rounded-lg font-heading font-semibold bg-secondary text-primary hover:bg-accent transition-colors"
          >
            Explore All Tiers
          </Link>
        </div>
      </section>

      {/* Fake Metrics */}
      <StatStrip
        stats={[
          { icon: "📈", value: "14,000+", label: "Layer Participants" },
          { icon: "🚀", value: "230%", label: "Average Yield Growth*" },
          { icon: "💰", value: "$47M+", label: "Total Value Distributed" },
          { icon: "⭐", value: "98.6%", label: "Satisfaction Rating" },
        ]}
      />

      {/* Testimonials Preview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((t) => (
              <blockquote key={t.name} className="border border-primary/15 rounded-lg p-6">
                <h3 className="font-heading font-bold text-secondary text-lg mb-3">
                  &ldquo;{t.headline}&rdquo;
                </h3>
                <p className="text-foreground/90 text-sm italic mb-4">&ldquo;{t.after}&rdquo;</p>
                <cite className="text-foreground/70 text-sm not-italic">
                  &mdash; {t.name}, {t.title}
                </cite>
              </blockquote>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={siteHref("/success-stories")}
              className="text-secondary hover:text-accent transition-colors font-semibold"
            >
              Read More Success Stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary to-secondary/20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Your Layer Is Waiting.
          </h2>
          <p className="text-foreground/80 mb-8">
            Layer 1 positions in your region are filling fast. Don&apos;t let someone else claim your yield potential.
          </p>
          <Link
            href={siteHref("/onboarding/step-1")}
            className="inline-block px-10 py-4 rounded-lg font-heading font-bold text-lg bg-secondary text-primary hover:bg-accent transition-colors"
          >
            Begin Your Elevation
          </Link>
        </div>
      </section>
    </div>
  )
}
