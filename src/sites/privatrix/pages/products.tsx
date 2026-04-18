import { Hero } from "@/components/ui/hero"
import { PrivatrixProductCard } from "../components/PrivatrixProductCard"
import { getProductsByTier } from "../data/products"

export const metadata = {
  title: "Products — Privatrix",
  description: "Twenty enterprise privacy products. Three of them are real.",
}

export default function PrivatrixProducts() {
  const selfServe = getProductsByTier("self-serve")
  const enterprise = getProductsByTier("enterprise")

  return (
    <>
      <Hero
        headline="Our Privacy Portfolio"
        subheadline="Twenty solutions across five categories of privacy theatre. Self-serve plans start at $24/mo. Enterprise consultations are billed quarterly in advance."
        dark
      />

      {/* Self-Serve Tier */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-2">
              Self-Serve Tier
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary">
              Buy Now, Comply Later
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto mt-3">
              Cart-purchasable products for teams that need a quick compliance posture without the discovery call.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selfServe.map((product) => (
              <PrivatrixProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Tier */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">
              Enterprise Tier
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary">
              Schedule a Privacy Consultation
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto mt-3">
              Custom-priced engagements for organizations with a board, a procurement team, and quarterly compliance reviews. A Privacy Specialist will reach out within 47 business days.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterprise.map((product) => (
              <PrivatrixProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
