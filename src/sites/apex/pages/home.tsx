import { headers } from "next/headers"
import Image from "next/image"
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
        headline="Serving the World's Most Specific Industries"
        subheadline="We identify overlooked market segments and build dedicated brands to serve them."
      />
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-primary">
            Our Brands
          </h2>
          {sites.length === 0 ? (
            <p className="text-center text-foreground/50">Coming soon.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {sites.map(([subdomain, site]) => (
                <a
                  key={subdomain}
                  href={siteHref(subdomain)}
                  className="flex items-center gap-4 w-full max-w-sm p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                  style={{ borderTopColor: site.config.theme.colors.primary, borderTopWidth: "3px" }}
                >
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={`/sites/${subdomain}/favicon.png`}
                      alt={site.config.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      {site.config.name}
                    </h3>
                    <p className="text-foreground/60">
                      {site.config.metadata.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
