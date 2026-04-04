import { getSiteHref } from "@/lib/site-href"
import { getSolutionBySlug } from "@/sites/strategicvoid/data/solutions"
import { getProductsBySolution } from "@/sites/strategicvoid/data/products"
import { getCaseStudiesBySolution } from "@/sites/strategicvoid/data/case-studies"
import { getWhitepapersBySolution } from "@/sites/strategicvoid/data/whitepapers"
import { solutionPricing } from "@/sites/strategicvoid/data/pricing"
import { ProductCard } from "@/components/ui/product-card"
import { EnterprisePricingTable } from "@/components/ui/enterprise-pricing-table"
import { CaseStudyCard } from "@/components/ui/case-study-card"
import { WhitepaperCard } from "@/components/ui/whitepaper-card"
import Link from "next/link"

interface SolutionPageProps {
  slug: string
}

export default async function SolutionPage({ slug }: SolutionPageProps) {
  const siteHref = await getSiteHref()
  const solution = getSolutionBySlug(slug)

  if (!solution) return null

  const solutionProducts = getProductsBySolution(slug)
  const solutionCaseStudies = getCaseStudiesBySolution(slug)
  const solutionWhitepapers = getWhitepapersBySolution(slug)
  const pricing = solutionPricing.find((p) => p.solutionSlug === slug)

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            {solution.name}
          </h1>
          <p className="text-xl text-foreground/70 mb-10 leading-relaxed">
            {solution.tagline}
          </p>
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Request a Demo
          </Link>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {solution.description.map((paragraph, i) => (
            <p key={i} className="text-foreground/75 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      {solutionProducts.length > 0 && (
        <section className="py-16 px-6 bg-secondary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-primary mb-10 text-center">
              Products in This Suite
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solutionProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  tagline={product.tagline}
                  image={product.image}
                  href={`/solutions/${slug}/${product.slug}`}
                  showAddToCart={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      {pricing && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-primary mb-10 text-center">
              Pricing
            </h2>
            <EnterprisePricingTable tiers={pricing.tiers} />
          </div>
        </section>
      )}

      {/* Case Studies */}
      {solutionCaseStudies.length > 0 && (
        <section className="py-16 px-6 bg-secondary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-primary mb-10 text-center">
              Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solutionCaseStudies.map((cs) => (
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
          </div>
        </section>
      )}

      {/* Whitepapers */}
      {solutionWhitepapers.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-primary mb-10 text-center">
              Whitepapers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solutionWhitepapers.map((wp) => (
                <WhitepaperCard
                  key={wp.slug}
                  slug={wp.slug}
                  title={wp.title}
                  type={wp.type}
                  solutionArea={wp.solutionArea}
                  readTime={wp.readTime}
                  authors={wp.authors}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-secondary py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            Our Alignment Partners are standing by to help you identify the precise configuration of{" "}
            {solution.name} that will best serve your organization&apos;s non-productivity goals.
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
