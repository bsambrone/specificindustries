"use client"

import Image from "next/image"
import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "The Opportunity — Stratify",
  description: "Discover the Multi-Layer Yield Distribution Model™ and unlock non-linear upside potential.",
}

export default function OpportunityPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      <Hero
        headline="What If Your Income Had No Ceiling?"
        subheadline="Traditional employment caps your earning potential. Stratify's Multi-Layer Yield Distribution Model™ removes the cap entirely."
        dark
      />

      {/* The Problem */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
            The Linear Income Trap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Traditional */}
            <div className="text-center">
              <div className="h-48 flex items-end justify-center mb-4">
                <div className="w-full max-w-xs bg-foreground/10 rounded-t-lg relative overflow-hidden">
                  <div className="h-48 flex items-end px-4 pb-4">
                    <div className="w-full h-1 bg-foreground/50 rounded" />
                  </div>
                  <div className="absolute top-2 left-3 text-xs text-foreground/50">Traditional Income</div>
                </div>
              </div>
              <p className="text-foreground/70 text-sm">
                Flat. Capped. Trading time for money like it&apos;s 1954.
              </p>
            </div>
            {/* Stratified */}
            <div className="text-center">
              <div className="h-48 flex items-end justify-center mb-4">
                <div className="w-full max-w-xs bg-secondary/10 rounded-t-lg relative overflow-hidden">
                  <div className="h-48 flex items-end px-4 pb-4">
                    <svg viewBox="0 0 200 150" className="w-full h-full">
                      <path
                        d="M 10 140 Q 60 135 100 120 Q 140 90 160 40 Q 170 15 190 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-secondary"
                      />
                    </svg>
                  </div>
                  <div className="absolute top-2 left-3 text-xs text-secondary/80">Stratified Income</div>
                </div>
              </div>
              <p className="text-secondary text-sm font-semibold">
                Exponential. Uncapped. Non-linear upside potential.
              </p>
            </div>
          </div>
          <p className="text-xs text-foreground/50 text-center mt-8">
            Charts are illustrative and not based on actual participant data. Y-axis intentionally omitted.
          </p>
        </div>
      </section>

      {/* Multi-Layer Yield Distribution Model */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4 text-center">
            The Multi-Layer Yield Distribution Model&trade;
          </h2>
          <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            A proprietary framework for decoupling your earning potential from temporal labor constraints
            through distributed value architectures.
          </p>

          <div className="space-y-8">
            <div className="border border-foreground/15 rounded-lg overflow-hidden flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 aspect-square md:aspect-auto shrink-0">
                <Image src="/sites/stratify/yield-primary.png" alt="Direct value distribution" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-heading font-bold text-secondary mb-2">
                  Primary Yield: Your Own Value Distribution Events
                </h3>
                <p className="text-foreground/80 text-sm">
                  Direct yield from personal Value Distribution Events. This is where most participants begin,
                  but it is not where they stay. Primary yield is merely the foundation upon which stratified
                  wealth is constructed.
                </p>
              </div>
            </div>

            <div className="border border-foreground/15 rounded-lg overflow-hidden flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 aspect-square md:aspect-auto shrink-0">
                <Image src="/sites/stratify/yield-secondary.png" alt="Subordinate revenue layers" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-heading font-bold text-secondary mb-2">
                  Secondary Yield: Subordinate Revenue Layer Activity
                </h3>
                <p className="text-foreground/80 text-sm">
                  As your subordinate layers activate and begin their own Value Distribution Events, a portion
                  of that activity generates Performance-Derived Yield that flows upward through the architecture.
                  This is the power of stratification: your yield grows as your layers grow.
                </p>
              </div>
            </div>

            <div className="border border-foreground/15 rounded-lg overflow-hidden flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 aspect-square md:aspect-auto shrink-0">
                <Image src="/sites/stratify/yield-tertiary.png" alt="Passive income lifestyle" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-heading font-bold text-secondary mb-2">
                  Tertiary Yield: Indirect Expansion Events
                </h3>
                <p className="text-foreground/80 text-sm">
                  At Layer 3 and above, you begin receiving yield from layers you did not personally activate.
                  These Indirect Tertiary Expansion Events represent the theoretical yield ceiling approaching
                  infinity. The architecture works for you, even while you sleep. Especially while you sleep.
                </p>
              </div>
            </div>
          </div>

          <p className="text-foreground/60 text-center mt-8 text-sm italic">
            Theoretical yield ceiling: unlimited*
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-12">
            The Three Pillars of Stratified Wealth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-foreground/15 rounded-lg p-8">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">Distribute</h3>
              <p className="text-foreground/80 text-sm">
                Facilitate value transfer between the ecosystem and end consumers. You are not selling.
                You are distributing. There is a difference. We have a legal team that confirms this.
              </p>
            </div>
            <div className="border border-foreground/15 rounded-lg p-8">
              <div className="text-4xl mb-4">⬆️</div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">Elevate</h3>
              <p className="text-foreground/80 text-sm">
                Expand your layer density through strategic relationship activation. Every person in your
                network represents untapped yield potential. Convert conversations into architecture.
              </p>
            </div>
            <div className="border border-foreground/15 rounded-lg p-8">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-heading font-bold text-secondary mb-3">Sustain</h3>
              <p className="text-foreground/80 text-sm">
                Maintain your position through Recurring Commitment Protocol participation. Consistency
                is the currency of the architecture. Those who stop sustaining experience Downward
                Stratification Adjustment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary/20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Ready to Stop Trading Time for Money?
          </h2>
          <p className="text-foreground/80 mb-8">
            The architecture is built. Your layer is waiting. The only variable is you.
          </p>
          <Link
            href={siteHref("/onboarding/step-1")}
            className="inline-block px-10 py-4 rounded-lg font-heading font-bold text-lg bg-secondary text-primary hover:bg-accent transition-colors"
          >
            Enter the First Layer
          </Link>
        </div>
      </section>

      {/* Income Disclaimer */}
      <section className="py-6 px-4">
        <p className="text-xs text-foreground/40 max-w-3xl mx-auto text-center">
          Results not typical. 94% of participants earn less than their Recurring Commitment Protocol fees.
          Stratify makes no guarantees regarding income. The term &ldquo;yield&rdquo; does not imply financial return.
          Charts shown above are illustrative and do not represent actual or projected earnings.
        </p>
      </section>
    </div>
  )
}
