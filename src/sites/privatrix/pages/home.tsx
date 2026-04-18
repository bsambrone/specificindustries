import { Hero } from "@/components/ui/hero"
import { PrivatrixProductCard } from "../components/PrivatrixProductCard"
import { TrustBadgeStrip } from "../components/TrustBadgeStrip"
import { getProductsByTier } from "../data/products"

const TESTIMONIALS = [
  {
    quote: "Privatrix gave us the badge we needed to close our Series B. The product itself didn't matter — the badge did.",
    author: "Margaret Hennessey",
    title: "VP, Risk & Compliance · Vorthex Capital",
  },
  {
    quote: "We replaced our entire DPO function with the GDPR-Adjacent™ Compliance Pack. The pack is laminated. We are at peace.",
    author: "David Chen",
    title: "Chief Counsel · Lattice Holdings",
  },
  {
    quote: "Our customers asked for transparency. We gave them a 14-tab modal. They have stopped asking.",
    author: "Priya Vasquez-Klein",
    title: "Head of Product · Strident Software",
  },
]

const FEATURE_PILLARS = [
  {
    title: "Aspirational by Design",
    body: "Every Privatrix product is engineered to look, feel, and certify like enterprise privacy infrastructure — without the operational burden of actually being it.",
  },
  {
    title: "Self-Audited. Quarterly.",
    body: "Our SOC-π framework is audited by our own team on a 90-day cycle, ensuring continuous compliance with the standard we wrote.",
  },
  {
    title: "Trusted by Procurement",
    body: "Our products are designed to satisfy procurement checklists, board reports, and 'security review' calendar invites — not adversaries.",
  },
]

export const metadata = {
  title: "Privatrix — Trust. Delivered. Quarterly.",
  description: "The only enterprise privacy platform with zero independently verifiable claims.",
}

export default function PrivatrixHome() {
  const featured = [
    ...getProductsByTier("enterprise").slice(0, 2),
    ...getProductsByTier("self-serve").slice(0, 2),
  ]

  return (
    <>
      <Hero
        headline="Trust. Delivered. Quarterly."
        subheadline="Privatrix is the only enterprise privacy platform with zero independently verifiable claims. SOC-π certified. GDPR-Adjacent™. Trusted by procurement teams worldwide."
        ctaText="Schedule Privacy Consultation"
        ctaHref="/contact"
        secondaryCtaText="View Products"
        secondaryCtaHref="/products"
        dark
      />

      {/* Trust badge strip */}
      <section className="py-10 px-4 bg-white border-b border-primary/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 text-center mb-4 font-semibold">
            Certified, Attested, and/or Self-Audited
          </p>
          <TrustBadgeStrip />
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-3">
              The Privatrix Approach
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Privacy theatre, executed at enterprise scale. Three pillars. Zero adversaries actually deterred.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURE_PILLARS.map((pillar) => (
              <div key={pillar.title} className="border border-primary/10 rounded-lg p-6 bg-white">
                <h3 className="text-lg font-heading font-bold text-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-2">
              Featured
            </p>
            <h2 className="text-3xl font-heading font-bold text-primary">
              Privacy Solutions That Look Like Privacy Solutions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <PrivatrixProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary">
              Trusted by Organizations With Quarterly Compliance Reviews
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.author} className="border border-primary/10 rounded-lg p-6 bg-white">
                <blockquote className="text-foreground/80 italic leading-relaxed mb-4 text-sm">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <div className="text-sm font-semibold text-primary">{t.author}</div>
                  <div className="text-xs text-foreground/50">{t.title}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Be Trusted?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Our Privacy Specialists will respond within 47 business days. Most engagements begin with a 14-week procurement review.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Schedule Privacy Consultation
          </a>
        </div>
      </section>
    </>
  )
}
