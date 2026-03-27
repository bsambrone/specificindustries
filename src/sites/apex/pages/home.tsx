import { headers } from "next/headers"
import { siteRegistry } from "@/sites/registry"
import { Hero } from "@/components/ui/hero"

const PRODUCTION_HOST = "specificindustries.com"

export default async function ApexHome() {
  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isProduction = host.endsWith(PRODUCTION_HOST)

  const sites = Object.entries(siteRegistry).filter(
    ([key]) => key !== "apex"
  )

  function siteHref(subdomain: string): string {
    if (isProduction) {
      return `https://${subdomain}.${PRODUCTION_HOST}`
    }
    return `/?site=${subdomain}`
  }

  return (
    <>
      <Hero
        headline="Specific Industries"
        subheadline="We make very specific products for very specific people."
      />
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">
            Our Brands
          </h2>
          {sites.length === 0 ? (
            <p className="text-center text-foreground/50">Coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sites.map(([subdomain, site]) => (
                <a
                  key={subdomain}
                  href={siteHref(subdomain)}
                  className="block p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                    {site.config.name}
                  </h3>
                  <p className="text-foreground/60">
                    {site.config.metadata.description}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
