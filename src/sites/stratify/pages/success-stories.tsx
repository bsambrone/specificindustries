"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"
import { StatStrip } from "@/components/ui/stat-strip"
import { testimonials } from "@/sites/stratify/data/testimonials"

export const metadata = {
  title: "Success Stories — Stratify",
  description: "Real people. Real layers. Real results.*",
}

export default function SuccessStoriesPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      <Hero
        headline="Real People. Real Layers. Real Results.*"
        subheadline="These are the stories of participants who committed to the architecture and let the layers do the work."
        dark
      />

      {/* Testimonials Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="border border-primary/10 rounded-lg overflow-hidden">
              {/* Card Header */}
              <div className="bg-secondary/10 px-6 py-4">
                <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                  {testimonial.headline}
                </h3>
                <p className="text-sm text-foreground/60">
                  {testimonial.name} &mdash; {testimonial.title}
                </p>
              </div>

              {/* Card Body — Two Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-primary/10 p-6 gap-4 sm:gap-0">
                <div className="sm:pr-6">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">
                    Before Stratify
                  </p>
                  <p className="text-sm italic text-foreground/60">{testimonial.before}</p>
                </div>
                <div className="sm:pl-6 pt-4 sm:pt-0">
                  <p className="text-xs font-semibold text-secondary/70 uppercase tracking-wider mb-2">
                    After Stratify
                  </p>
                  <p className="text-sm text-foreground/80">{testimonial.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stat Strip */}
      <StatStrip
        stats={[
          { icon: "⏱️", value: "47 days", label: "Average time to Layer 2" },
          { icon: "📈", value: "97%*", label: "Layer participant retention rate" },
          { icon: "💪", value: "340%", label: "Average yield increase per elevation" },
        ]}
      />

      {/* Disclaimer + CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Your Story Hasn&apos;t Been Written Yet
          </h2>
          <p className="text-foreground/60 mb-8">
            Every success story started with a single elevation event. The architecture is ready.
            Your layer is waiting. The only missing variable is you.
          </p>
          <Link
            href={siteHref("/onboarding/step-1")}
            className="inline-block px-10 py-4 rounded-lg font-heading font-bold text-lg bg-secondary text-primary hover:bg-accent transition-colors"
          >
            Begin Your Elevation
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-4">
        <p className="text-xs text-foreground/20 max-w-3xl mx-auto text-center">
          *Results not typical. Testimonials reflect individual participant experiences and are not
          indicative of average outcomes. 94% of participants earn less than their Recurring Commitment
          Protocol fees. &ldquo;Real results&rdquo; is a trademark phrase and does not constitute a
          financial guarantee. Retention rate reflects participants who have not yet attempted to leave.
          Yield increases are self-reported and unverified.
        </p>
      </section>
    </div>
  )
}
