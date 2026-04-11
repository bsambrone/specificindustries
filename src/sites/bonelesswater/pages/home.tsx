import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { homepageFeaturedProducts } from "../data/products"
import { homepageTestimonials } from "../data/testimonials"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"

export default async function BonelessWaterHome() {
  const siteHref = await getSiteHref()
  const headlineFact = facts.find((f) => f.slug === "1873-history")!

  return (
    <>
      {/* HERO */}
      <section className="bg-white border-b border-[#0c4a6e]/10">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <CertifiedBadge size="sm" label="INDEPENDENTLY VERIFIED" />
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-[#0c4a6e] leading-tight">
              99.9999% Bone-Free.
            </h1>
            <p className="mt-4 text-lg text-[#0f172a]/70">
              The original deboned drinking water. Pharmaceutical-grade purification. The skeletal structure of water has been understood since 1873 — we are the only platform that takes it seriously.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteHref("/products")}
                className="bg-[#0c4a6e] hover:bg-[#075985] text-white font-bold rounded px-7 py-3 transition-colors"
              >
                View Products
              </Link>
              <Link
                href={siteHref("/research")}
                className="bg-white border border-[#0c4a6e]/30 hover:border-[#0c4a6e]/60 text-[#0c4a6e] font-bold rounded px-7 py-3 transition-colors"
              >
                View the Research
              </Link>
            </div>
          </div>
          <div className="relative aspect-[3/2] rounded-lg overflow-hidden border border-[#0c4a6e]/20 shadow-md">
            <Image
              src="/sites/bonelesswater/home-hero.png"
              alt="A PureSpring water bottle on a clinical lab bench"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* DID YOU KNOW callout */}
      <section className="bg-[#0c4a6e]/5 border-b border-[#0c4a6e]/10">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <DidYouKnowCard fact={headlineFact} />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-white border-b border-[#0c4a6e]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0c4a6e]">Featured products</h2>
            <p className="text-[#0f172a]/60 mt-2">A selection of our certified bone-free product line.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageFeaturedProducts.map((product) => (
              <Link
                key={product.slug}
                href={siteHref(`/products/${product.slug}`)}
                className="group block border border-[#0c4a6e]/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
              >
                <div className="relative aspect-square bg-white">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4 border-t border-[#0c4a6e]/10">
                  <div className="font-bold text-[#0c4a6e] group-hover:text-[#075985]">{product.name}</div>
                  <div className="text-xs text-[#0f172a]/60 mt-1">{product.format}</div>
                  <div className="mt-3 text-lg font-extrabold text-[#0f172a]">{product.priceLabel}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/products")}
              className="text-[#0c4a6e] font-bold underline underline-offset-4"
            >
              View all 8 products →
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON STRIP TEASER */}
      <section className="bg-[#0c4a6e]/5 border-b border-[#0c4a6e]/10">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold text-[#0c4a6e]">How we compare</h2>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            We have audited every major competitor in the bottled water space. Three of them are technically compliant. Two of them ship product with visible bones. One of them is bottled pond water containing a frog.
          </p>
          <Link
            href={siteHref("/comparison")}
            className="inline-block mt-6 bg-[#0c4a6e] hover:bg-[#075985] text-white font-bold rounded px-7 py-3 transition-colors"
          >
            See the full comparison
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white border-b border-[#0c4a6e]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-extrabold text-[#0c4a6e] text-center mb-10">What our subscribers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#0c4a6e]/10">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#0f172a]">{t.name}</div>
                    <div className="text-xs text-[#0f172a]/60">{t.title}</div>
                  </div>
                </div>
                <p className="text-sm text-[#0f172a]/80 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0c4a6e] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-extrabold">Take the bones out of your water today.</h2>
          <p className="mt-2 text-white/90">Eight products. One proprietary 47-step process. Independently verified.</p>
          <Link
            href={siteHref("/products")}
            className="inline-block mt-6 bg-white text-[#0c4a6e] font-bold rounded px-7 py-3"
          >
            Browse the catalog
          </Link>
        </div>
      </section>
    </>
  )
}
