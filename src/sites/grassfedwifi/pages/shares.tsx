import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/ui/product-card"
import { shares, shareQuips } from "@/sites/grassfedwifi/data/shares"
import { seasonalAddons } from "@/sites/grassfedwifi/data/seasonal-addons"

export const metadata = {
  title: "Shares — Grass Fed WiFi",
  description: "Three tiers of pasture-raised connectivity: Heirloom, Reserve, and Estate. Seasonal add-ons rotate quarterly.",
}

export default function GrassFedWiFiShares() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Our Shares</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Three tiers of pasture-raised connectivity. Allocated seasonally by the co-op.
            Every member receives an unpasteurized pour.
          </p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shares.map((share) => (
              <ProductCard
                key={share.slug}
                slug={share.slug}
                name={share.name}
                price={share.priceLabel}
                tagline={share.tagline}
                image={share.image}
                href={`/shares/${share.slug}`}
                quips={shareQuips}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Add-ons */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">
              Rotating Quarterly
            </p>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Seasonal Add-ons</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Additional quarterly offerings tied to the harvest calendar. Reserve members choose one.
              Estate members receive all four.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalAddons.map((addon) => (
              <div
                key={addon.slug}
                className="bg-background rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-secondary/20">
                  <Image src={addon.image} alt={addon.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                    {addon.availability}
                  </p>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">{addon.name}</h3>
                  <p className="text-sm text-foreground/70 mb-3">{addon.tagline}</p>
                  <p className="text-sm text-foreground font-semibold">{addon.priceLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Not Sure Which Share?</h2>
          <p className="text-foreground/70 mb-8">
            Every member begins with the Heirloom Share. Grow from there as the committee allocates.
          </p>
          <Link
            href="/join"
            className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Join the Co-op
          </Link>
        </div>
      </section>
    </>
  )
}
