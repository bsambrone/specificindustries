"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { solutions } from "@/sites/strategicvoid/data/solutions"
import { caseStudies } from "@/sites/strategicvoid/data/case-studies"
import { MetricCounter } from "@/components/ui/metric-counter"
import { SolutionCard } from "@/components/ui/solution-card"
import { CaseStudyCard } from "@/components/ui/case-study-card"

export default function StrategicVoidHome() {
  const siteHref = useSiteLink()

  const featuredCaseStudies = caseStudies.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Aligning Your Organization Beyond Productivity
          </h1>
          <p className="text-xl text-foreground/70 mb-10 leading-relaxed max-w-2xl mx-auto">
            The C.H.A.O.S. Framework™ delivers enterprise-grade solutions for organizations
            committed to maximum process without measurable outcome. Trusted by 2,847 clients
            across 14 verticals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={siteHref("/solutions")}
              className="inline-block bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
            >
              Explore Solutions
            </Link>
            <Link
              href={siteHref("/methodology")}
              className="inline-block border border-foreground/30 text-foreground font-heading text-sm uppercase tracking-wider px-8 py-4 hover:border-accent hover:text-accent transition-colors"
            >
              Read the Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 px-6 bg-primary/5 border-y border-primary/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricCounter value={2847} label="Enterprise clients served" />
          <MetricCounter value={39} label="Years of strategic non-productivity" suffix="+" />
          <MetricCounter value={97} label="Client satisfaction (self-reported)" suffix="%" />
          <MetricCounter value={14000000} label="Meeting hours optimized annually" />
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">Our Solutions</h2>
            <p className="text-primary/60 max-w-xl mx-auto leading-relaxed">
              Eight integrated solution suites designed to align your organization with the
              Void™ across every function, layer, and initiative.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution) => (
              <SolutionCard
                key={solution.slug}
                slug={solution.slug}
                name={solution.name}
                tagline={solution.tagline}
                productCount={solution.productSlugs.length}
                icon={solution.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      {featuredCaseStudies.length > 0 && (
        <section className="py-20 px-6 bg-secondary/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                Client Success Stories
              </h2>
              <p className="text-primary/60 max-w-xl mx-auto leading-relaxed">
                See how organizations like yours have successfully embraced the Void™.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCaseStudies.map((cs) => (
                <CaseStudyCard
                  key={cs.slug}
                  slug={cs.slug}
                  company={cs.company}
                  heroStat={cs.heroStat}
                  solutionArea={cs.solutionArea}
                  summary={cs.summary}
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href={siteHref("/case-studies")}
                className="inline-block border border-primary text-primary font-heading text-sm uppercase tracking-wider px-8 py-3 hover:border-accent hover:text-accent transition-colors"
              >
                View All Case Studies
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-secondary py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Begin Your Alignment Journey
          </h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            Our Alignment Partners are standing by to help you identify the precise configuration
            of the C.H.A.O.S. Framework™ that will best serve your organization&apos;s
            non-productivity goals.
          </p>
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Request a Demo
          </Link>
        </div>
      </section>
    </div>
  )
}
