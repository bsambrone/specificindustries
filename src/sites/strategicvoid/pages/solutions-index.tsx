import { solutions } from "@/sites/strategicvoid/data/solutions"
import { SolutionCard } from "@/components/ui/solution-card"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Solutions — Strategic Void Consulting",
  description:
    "Eight integrated solution suites for organizations committed to maximum process without measurable outcome.",
}

export default async function SolutionsIndex() {
  return (
    <div>
      <section className="bg-secondary py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Our Solutions
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Eight integrated solution suites designed to align your organization with the Void™
            across every function, layer, and initiative.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  )
}
