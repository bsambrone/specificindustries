import Link from "next/link"
import Image from "next/image"
import { GlossyProductHero } from "@/components/ui/glossy-product-hero"
import {
  getProductsByFamily,
  getProductBySlug,
  FAMILY_LABELS,
  type ProductFamily,
} from "@/sites/superengineered/data/products"

const FLAGSHIP_ORDER: ProductFamily[] = ["toothbrush", "doorknob", "lightswitch", "spoon"]

export default function SuperEngineeredHome() {
  const heroProduct = getProductBySlug("toothbrush-pro")!

  return (
    <main className="bg-background">
      <GlossyProductHero
        name="Toothbrush Pro."
        tagline="Brushing, rebuilt."
        image={heroProduct.heroImage}
        startingPrice={heroProduct.startingPrice}
        subscriptionNote="BrushCloud+ Pro subscription required."
        ctaHref="/products/toothbrush-pro"
        ctaText="Buy"
        secondaryCtaHref="/products/toothbrush-pro"
        secondaryCtaText="Learn more"
      />

      {/* Flagship family tiles */}
      <section className="py-16 px-4 border-t border-primary/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2 text-center">
            The Super Engineered Lineup
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">
            Four essentials. Three tiers each. One cloud.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FLAGSHIP_ORDER.map((family) => {
              const first = getProductsByFamily(family)[0]
              return (
                <Link key={family} href={`/products/${first.slug}`} className="group">
                  <div className="relative w-full aspect-[16/10] bg-secondary rounded-3xl overflow-hidden">
                    <Image
                      src={first.heroImage}
                      alt={FAMILY_LABELS[family]}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-contain p-12 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-8 left-8 right-8 text-center">
                      <p className="text-sm uppercase tracking-widest text-primary/60 mb-2">
                        {FAMILY_LABELS[family]}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-heading font-light text-primary">
                        Starting at ${first.startingPrice}
                      </h3>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Firmware band */}
      <section className="bg-primary text-background py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-widest opacity-60 mb-4">
            Announcement
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-light mb-4">
            Firmware 4.2 is here.
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
            Predictive bristle alignment. Recertified doorknob torque curves. Light switches that authenticate faster. All shipped over the air.
          </p>
          <Link
            href="/trust"
            className="inline-block px-6 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
          >
            Read the release notes
          </Link>
        </div>
      </section>

      {/* Accessories band */}
      <section className="py-16 px-4 border-t border-primary/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-2">
            Accessories
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-10">
            Also from Super Engineered.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {getProductsByFamily("accessory").slice(0, 6).map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group">
                <div className="relative w-full aspect-square bg-secondary rounded-2xl overflow-hidden">
                  <Image
                    src={p.heroImage}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 16vw, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs text-primary mt-2 line-clamp-1">{p.name}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="inline-block text-accent font-medium hover:underline"
            >
              See all accessories &rsaquo;
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise band */}
      <section className="bg-secondary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
            For Workplaces
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-primary mb-4">
            Super Engineered for Enterprise.
          </h2>
          <p className="text-lg text-primary/70 max-w-2xl mx-auto mb-8">
            SOC 2-compliant utensils. SSO-gated lighting. Bulk procurement for every essential object your workforce touches.
          </p>
          <Link
            href="/enterprise"
            className="inline-block px-6 py-3 rounded-full bg-primary text-background font-medium hover:opacity-90 transition-opacity"
          >
            Talk to sales
          </Link>
        </div>
      </section>

      {/* Trust band */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
            Trust
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">
            Your telemetry, stewarded.
          </h2>
          <p className="text-primary/70 max-w-2xl mx-auto mb-6">
            Every brush, every turn, every tap is encrypted in transit and at rest. We treat your toothbrushing data with the seriousness it deserves.
          </p>
          <Link href="/trust" className="text-accent font-medium hover:underline">
            Read our Trust Policy &rsaquo;
          </Link>
        </div>
      </section>
    </main>
  )
}
