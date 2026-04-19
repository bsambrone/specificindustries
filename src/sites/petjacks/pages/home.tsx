import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { products } from "@/sites/petjacks/data/products"
import Footnote from "@/sites/petjacks/components/footnote"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

const flagshipSlugs = ["whiskerwings-300", "pupjet-ultra", "hopperlauncher-lx", "finflyer-aquapro"]
const flagships = flagshipSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => !!p)

export default function PetjacksHome() {
  return (
    <>
      <Hero
        headline="Every pet deserves the sky."
        subheadline="Personal propulsion systems for cats, dogs, rabbits, and fish — built with love, ready for launch."
        ctaText="Shop the Flagship Lineup"
        ctaHref="/products"
        image="/sites/petjacks/hero.png"
      />

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-2">Meet the Flagship Lineup</h2>
          <p className="text-center text-foreground/60 mb-12">Four species. Four jetpacks. Infinite family moments<Footnote>Family moments subject to availability and recovery outcomes.</Footnote>.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flagships.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                price={product.priceLabel}
                tagline={product.tagline}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">Built for the whole family</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            Every Petjacks flagship is tuned for a specific species, ergonomically fitted to your pet&apos;s unique
            anatomy, and backed by our industry-leading<Footnote>Petjacks is the only company in this category.</Footnote> support program.
          </p>
          <Link href="/flight-academy" className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Enroll in Flight Academy
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary/30">
              <Image src="/sites/petjacks/flight-academy.png" alt="Pets training at Petjacks Flight Academy" fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-2">Flight Academy</p>
              <h2 className="text-3xl font-heading font-bold text-primary mb-4">Three tiers. One very good pet.</h2>
              <p className="text-foreground/70 mb-4 leading-relaxed">
                Pre-Flight Readiness Camp prepares your pet for the joy of personal propulsion. Harness
                familiarization, thrust-tolerance assessment, and ample snuggles.
              </p>
              <Link href="/flight-academy" className="text-primary font-semibold hover:underline">
                See tier options →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-accent/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">Honored in the Mission Gallery</h2>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            We celebrate every pet who takes to the sky. Visit the Mission Gallery to see the portraits of the
            brave animals who have flown<Footnote>Some portraits are posthumous.</Footnote> with Petjacks.
          </p>
          <Link href="/mission-gallery" className="inline-block px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
            Visit the Mission Gallery
          </Link>
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
